const {copyFile, deleteDir, moveFile} = require("../../utils/index");
const {executeCommand} = require('../../utils/bash')
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
const fs = require("fs");
const mkdirp = require("mkdirp");
const rootPath = path.dirname(require.main.filename);

const log = (str) => {
    console.log(chalk.blue(str));
};

const getFileLine = (arr) => {
    let line = 0;
    arr.map((item, index) => {
        if (item.search('import') != -1) {
            line = index + 1;
        }
    })
    return line;
}
const getFileRender = (arr) => {
    let line = 0;
    arr.map((item, index) => {
        if (item.search('render') != -1) {
            line = index + 1;
        }
    })
    return line;
}

// 重写package.json
// 修改package.json，可以在这做扩充，比如.eslint,.babel ...
const rewritePackage = ({targetDir, answers}) => {
    const packPath = path.join(targetDir, "package.json");

    let data = fs.readFileSync(packPath);
    let person = data.toString(); //将二进制的数据转换为字符串
    person = JSON.parse(person); //将字符串转换为json对象
    person.name = answers.author;
    person.description = answers.description;

    let str = JSON.stringify(person);
    fs.writeFileSync(packPath, str);
};

// 添加pm-ui
const rewriteMain = ({targetDir, answers}) => {
    const mainPath = path.join(targetDir, "src", "main.js");
    const data = fs.readFileSync(mainPath, "utf8");
    let person = data.split("\n");
    const setLine = (str) => {
        person.splice(getFileLine(person), 0, str);
    }
    if (answers.pmui) {
        setLine('import "pming-ui/style/index.less"')
        setLine('import PmUI from "pming-ui"')
        setLine("Vue.use(PmUI)")
    }
    if (answers.router) {
        setLine('import router from "./router"')
        person.splice(getFileRender(person), 0, 'router,')
    }
    if (answers.vuex.length) {
        setLine('import store from "./store"')
        person.splice(getFileRender(person), 0, 'store,')
    }
    let str = person.join("\n");
    fs.writeFileSync(mainPath, str, "utf8");
};

// 添加vuex
const addVuex = ({targetDir, answers}) => {
    const mainPath = path.join(targetDir, "src", "store");
    deleteDir(mainPath);

    if (answers.vuex.length === 3) {
        const _path = path.join(
            rootPath,
            answers.template,
            "src",
            "store",
            "vuex-namespace-persistedstate"
        );
        mkdirp.sync(mainPath);
        copyFile(_path, mainPath);
        return;
    }
    if (answers.vuex.length) {
        let selectData = answers.vuex[answers.vuex.length - 1];
        const _path = path.join(rootPath, answers.template, selectData);
        mkdirp.sync(mainPath);
        copyFile(_path, mainPath);
    }
};

// 添加vue-router
const addRouter = ({targetDir, answers}) => {
    if (!answers.router) {
        deleteDir(path.join(targetDir, "src", "router"));
        deleteDir(path.join(targetDir, "src", "views"));
    }
};

module.exports = function ({targetDir, answers}) {
    const _path = path.join(rootPath, answers.template);
    copyFile(_path, targetDir);
    rewritePackage({targetDir, answers});

    rewriteMain({targetDir, answers});
    addVuex({targetDir, answers});
    addRouter({targetDir, answers});
    log(`🎉  模板创建完成...`);
    console.log();
    log(` $ cd ${targetDir}`);
    log(` $ npm i && npm run dev`);
};

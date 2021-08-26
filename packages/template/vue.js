const {copyFile, deleteDir, moveFile} = require('../../utils/index')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const mkdirp = require('mkdirp')
const {templateVuex} = require('../config')

const log = (str) => {
    console.log(chalk.blue(str))
}

// 重写package.json
// 修改package.json，可以在这做扩充，比如.eslint,.babel ...
const rewritePackage = ({targetDir, answers}) => {
    const packPath = path.join(targetDir, 'package.json')

    let data = fs.readFileSync(packPath)
    let person = data.toString()//将二进制的数据转换为字符串
    person = JSON.parse(person)//将字符串转换为json对象
    person.name = answers.author
    person.description = answers.description

    let str = JSON.stringify(person)
    fs.writeFileSync(packPath, str)
}

// 添加pm-ui
const addPmui = ({targetDir}) => {
    const mainPath = path.join(targetDir, 'src', 'main.js')
    const data = fs.readFileSync(mainPath, 'utf8')
    let person = data.split('\n')
    person.splice(2, 0, 'import "pming-ui/style/index.less"')
    person.splice(3, 0, 'import PmUI from "pming-ui"')
    person.splice(4, 0, 'Vue.use(PmUI)')
    let str = person.join('\n')
    fs.writeFileSync(mainPath, str, 'utf8')
}

// 添加vuex
const addVuex = ({targetDir, answers}) => {
    const mainPath = path.join(targetDir, 'src', 'store')
    deleteDir(mainPath)
    if (answers.vuex.length === 3) {
        const _path = path.join(process.cwd(), answers.template, 'src', 'store', 'vuex-namespace-persistedstate');
        mkdirp.sync(mainPath)
        copyFile(_path, mainPath)
        return;
    }
    if (answers.vuex.length) {
        let selectData = answers.vuex[answers.vuex.length - 1];
        const _path = path.join(process.cwd(), answers.template, selectData);
        mkdirp.sync(mainPath)
        copyFile(_path, mainPath)
    }
}

module.exports = function ({targetDir, answers}) {
    const _path = path.join(process.cwd(), answers.template)
    copyFile(_path, targetDir)
    rewritePackage({targetDir, answers})

    if (answers.pmui) {
        addPmui({targetDir})
    }

    addVuex({targetDir, answers})

    log(`🎉  模板创建完成...`)
    console.log()
    log(` $ cd ${targetDir}`)
    log(` $ npm i && npm run dev`)
}
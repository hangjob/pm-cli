const { copyFile, deleteDir, moveFile } = require('../../utils/index')
const install = require('../../utils/bash')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const mkdirp = require('mkdirp')
const cheerio = require('cheerio')
const sd = require('silly-datetime')
const rootPath = path.dirname(require.main.filename)

const installPlugins = [];

const log = (str) => {
    console.log(chalk.blue(str));
};

const rewritePackage = ({ targetDir, answers }) => {
    const packPath = path.join(targetDir, "package.json");

    let data = fs.readFileSync(packPath);
    let person = data.toString(); //将二进制的数据转换为字符串
    person = JSON.parse(person); //将字符串转换为json对象
    person.name = answers.projectName;
    person.author = answers.author;
    person.description = answers.description;

    let str = JSON.stringify(person);
    fs.writeFileSync(packPath, str);
};


// 重写html
const rewriteHtml = ({ targetDir, answers }) => {
    const htmlPath = path.join(targetDir, 'public', 'index.html')
    const packPath = path.join(rootPath, 'package.json')
    const package = JSON.parse(fs.readFileSync(packPath).toString())
    const data = fs.readFileSync(htmlPath, 'utf8')
    const $ = cheerio.load(data)
    $('head').append(`<meta name="author" content="${answers.author}"/>`)
    $('head').append(`<meta name="des" content="${answers.description}"/>`)
    $('head').append(`<meta name="version" content="pm-cli.version.${package.version}"/>`)
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    $('head').append(`<meta name="time" content="${time}"/>`)
    let str = $.html();
    fs.writeFileSync(htmlPath, str)
}

module.exports = function ({ targetDir, answers, projectName }) {
    const _path = path.join(rootPath, answers.template);
    copyFile(_path, targetDir);
    rewritePackage({ targetDir, answers });
    rewriteHtml({ targetDir, answers });
    log(`🎉  模板创建完成...`);
    console.log();
    log(`⚙   PM-CLI正在安装依赖，需要段时间......`);
    console.log();
    install({ cwd: targetDir, args: installPlugins }).then(() => {
        console.log();
        console.log(
            chalk.yellow("🎉   "),
            "成功创建项目:",
            chalk.green(answers.projectName)
        );
        console.log(chalk.yellow("👉   "), "可以开始使用以下命令: ");
        console.log();
        console.log(chalk.cyan(`$ cd ${targetDir}`));
        console.log(chalk.cyan(`npm run serve`));
        console.log();
    });
};

const { copyFile } = require('../../utils/index')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const cheerio = require('cheerio')
const rootPath = path.dirname(require.main.filename)
const sd = require('silly-datetime');
const log = (str) => {
    console.log(chalk.blue(str))
}
// 重写html
const rewriteHtml = ({ targetDir, answers }) => {
    const _path = path.join(targetDir, 'index.html')
    fs.readFile(_path, function (err, data) {
        if (!err) {
            let person = data.toString()
            let $ = cheerio.load(person)
            $('meta[name="author"]').attr('content', answers.author)
            $('meta[name="des"]').attr('des', answers.description)
            const packPath = path.join(rootPath, 'package.json')
            const package = JSON.parse(fs.readFileSync(packPath).toString())
            $('head').append(`<meta name="version" content="pm-cli.version.${package.version}"/>`)
            const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            $('head').append(`<meta name="time" content="${time}"/>`)
            let str = $.html()
            fs.writeFile(_path, str, function (err) {
                if (!err) {
                    console.log(chalk.yellow('🎉   '), '成功创建项目:',
                        chalk.green(answers.projectName))
                    console.log(chalk.yellow('👉   '),
                        '可以开始使用以下命令: ')
                    console.log()
                    log(` $ cd ${targetDir}`)
                }
            })
        }
    })
}

module.exports = async function ({ targetDir, answers }) {
    const _path = path.join(rootPath, answers.template)
    await copyFile(_path, targetDir)
    rewriteHtml({ targetDir, answers })
}
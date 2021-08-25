const { copyFile } = require('../../utils/index')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')
const cheerio = require('cheerio')

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
            $('meta[name="description"]').
                attr('description', answers.description)
            let str = $.html()
            fs.writeFile(_path, str, function (err) {
                if (!err) {
                    log(`🎉  模板创建完成...`)
                    console.log()
                    log(` $ cd ${targetDir}`)
                }
            })
        }
    })
}

module.exports = async function ({ targetDir, answers }) {
    const _path = path.join(process.cwd(), answers.template)
    await copyFile(_path, targetDir)
    rewriteHtml({ targetDir, answers })
}
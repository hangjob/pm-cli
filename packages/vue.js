const { copyFile } = require('../utils/index')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')

const log = (str) => {
    console.log(chalk.blue(str))
}

module.exports = function ({ targetDir, answers }) {
    const _path = path.join(process.cwd(), answers.template)
    copyFile(_path, targetDir)

    // 修改package.json，可以在这做扩充，比如.eslint,.babel ...
    let packPath = targetDir + '/package.json'
    fs.readFile(packPath, function (err, data) {
        if (err) {
            return console.error(err)
        }
        let person = data.toString()//将二进制的数据转换为字符串
        person = JSON.parse(person)//将字符串转换为json对象
        person.name = answers.author
        person.description = answers.description
        let str = JSON.stringify(person)
        fs.writeFile(packPath, str, function (err) {
            if (err) {
                console.error(err)
            }
            else {
                log(`🎉  模板创建完成...`)
                console.log()
                log(` $ cd ${targetDir}`)
                log(` $ npm i && npm run dev`)
            }
        })
    })
}
const { copyFile } = require('../../utils/index')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs')

const log = (str) => {
    console.log(chalk.blue(str))
}

// 重写package.json
// 修改package.json，可以在这做扩充，比如.eslint,.babel ...
const rewritePackage = ({ targetDir, answers }) => {
    const packPath = path.join(targetDir, 'package.json')

    let data = fs.readFileSync(packPath)
    let person = data.toString()//将二进制的数据转换为字符串
    person = JSON.parse(person)//将字符串转换为json对象
    person.name = answers.author
    person.description = answers.description

    let str = JSON.stringify(person)
    fs.writeFileSync(packPath, str)

    log(`🎉  模板创建完成...`)
    console.log()
    log(` $ cd ${targetDir}`)
    log(` $ npm i && npm run dev`)
}

module.exports = function ({ targetDir, answers }) {
    const _path = path.join(process.cwd(), answers.template)
    copyFile(_path, targetDir)
    rewritePackage({ targetDir, answers })
}
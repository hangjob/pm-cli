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
    log(`🎉  模板创建完成...`)
    console.log()
    log(` $ cd ${targetDir}`)
}
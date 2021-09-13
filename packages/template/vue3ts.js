const { copyFile, deleteDir, moveFile } = require('../../utils/index')
const install = require('../../utils/bash')
const path = require('path')
const chalk = require('chalk')

const rootPath = path.dirname(require.main.filename)
const { rewriteHtml } = require('../common')
const log = (str) => {
    console.log(chalk.blue(str))
}

const installPlugins = []

module.exports = async function ({ targetDir, answers }) {
    const _path = path.join(rootPath, answers.template)
    await copyFile(_path, targetDir)
    rewriteHtml({ targetDir, answers })

    log(`🎉  模板创建完成...`)
    console.log()
    log(`⚙   PM-CLI正在安装依赖，需要段时间......`)
    console.log()
    install({ cwd: targetDir, args: installPlugins }).then(() => {
        console.log()
        console.log(chalk.yellow('🎉   '), '成功创建项目:',
            chalk.green(answers.projectName))
        console.log(chalk.yellow('👉   '),
            '可以开始使用以下命令: ')
        console.log()
        console.log(chalk.cyan(`$ cd ${targetDir}`))
        console.log(chalk.cyan(`npm run serve`))
        console.log()
    })
}
const path = require('path')
const mkdirp = require('mkdirp')
const inquirer = require('inquirer')
const { templateNames, templateVuex } = require('./config')
const chalk = require('chalk')
const createTemplate = require('./template')

module.exports = async function (name) {
    // 拼接成完整路径
    const _path = path.join(process.cwd(), name)
    const targetDir = await mkdirp(_path)
    if (targetDir) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'template',
                message: 'template: 请选择项目模板',
                choices: templateNames.map((v, i) => ({
                    key: i,
                    name: v.name,
                    value: v.dir,
                })),
            },
            {
                type: 'confirm',
                name: 'pmui',
                message: '是否需要安装pm-ui桌面端组件库？',
                when: function (answers) {
                    return answers.template === '/templates/vue'
                },
            },
            {
                type: 'checkbox',
                name: 'vuex',
                message: '是否需要安装vuex状态管理？',
                choices: templateVuex.map((v, i) => ({
                    key: i,
                    name: v.name,
                    value: v.value,
                })),
                when: function (answers) {
                    return answers.template === '/templates/vue'
                },
            },
            {
                type: 'input',
                name: 'author',
                message: 'author: 请输入你的名字',
                validate: function (value) {
                    return !!value
                },
                default: '羊先生',
            },
            {
                type: 'input',
                name: 'description',
                message: 'desc: 请输入项目描述',
                validate: function (value) {
                    return !!value
                },
                default: '写点描述...',
            },
        ])
        console.log(answers)
        console.log(chalk.blue(`🚀   开始创建...`))
        createTemplate({ targetDir, answers })
    }
    else {
        console.log('文件已存在，创建失败')
    }
}
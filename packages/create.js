const path = require('path')
const mkdirp = require('mkdirp')
const inquirer = require('inquirer')
const { templateNames, templateVuex } = require('./config')
const chalk = require('chalk')
const createTemplate = require('./template')
const { nodeVersion } = require('./common')
const os = require('os')
const userInfo = os.userInfo()

module.exports = async function (name) {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: 'template: 请选择项目模板',
            choices: templateNames.map((v, i) => ({
                key: i,
                name: v.name,
                value: v.dir,
                hide: v.hide,
            })).filter((res) => {
                return res.hide === true ? false : true
            }),
        },
        {
            type: 'confirm',
            name: 'pmui',
            message: '是否需要安装pm-ui桌面端组件库？',
            when: function (answers) {
                return answers.template === '/templates/vue'
            },
            default: false,
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
            type: 'confirm',
            name: 'router',
            message: '是否需要安装vue-router',
            when: function (answers) {
                return answers.template === '/templates/vue'
            },
            default: false,
        },
        {
            type: 'input',
            name: 'author',
            message: 'author: 请输入你的名字',
            validate: function (value) {
                return !!value
            },
            default: userInfo.username,
        },
        {
            type: 'input',
            name: 'description',
            message: '请输入项目描述',
            validate: function (value) {
                return !!value
            },
            default: 'Input project description',
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: '配置是否已完成？',
            default: true,
        },
    ])
    // 拼接成完整路径
    if (answers.confirm) {
        let find = templateNames.find(item => {
            if (item.dir && (item.dir === answers.template)) {
                return item.node_v = 8.9
            }
            else {
                return item.node_v = 12.0 // vite需要更高的版本
            }
        })
        nodeVersion(find.node_v)
        const _path = path.join(process.cwd(), name)
        const targetDir = await mkdirp(_path)
        if (targetDir) {
            console.log(chalk.blue(`🚀   开始创建...`))
            answers.projectName = name
            createTemplate({ targetDir, answers, projectName: name })
        }
        else {
            console.log(chalk.blue(`×   文件已存在，创建失败...`))
        }
    }
}

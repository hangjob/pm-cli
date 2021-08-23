#!/usr/bin/env node

const program = require('commander')
const version = require('./package.json').version

program.version(version, '-v, --version')

program.command('create <app-name>').
    description('使用 pm-cli 创建一个新的项目').
    option('-d --dir <dir>', '创建目录').
    action((name, command) => {
        const create = require('./packages/create')
        create(name)
    })

// 获取用户传递的参数
function cleanArgs (cmd) {
    console.log(cmd)
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        // 如果一个选项不存在，而命令有一个相同的方法
        // 名称它不应该被复制
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    console.log(args)
    return args
}

program.parse(process.argv)
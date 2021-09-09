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

const log = (str) => {
    console.log(chalk.blue(str))
}

const installPlugins = []

const getFileLine = (arr) => {
    let line = 0
    arr.map((item, index) => {
        if (item.search('import') != -1) {
            line = index + 1
        }
    })
    return line
}

// minjs返回行数
const getFileRender = (arr, str = 'render') => {
    let line = 0
    arr.map((item, index) => {
        if (item.search(str) != -1) {
            line = index + 1
        }
    })
    return line
}

// 重写文件
// 修改package.json，可以在这做扩充，比如.eslint,.babel ...
const rewritePackage = ({ targetDir, answers, projectName }) => {
    const packPath = path.join(targetDir, 'package.json')

    let data = fs.readFileSync(packPath)
    let person = data.toString() //将二进制的数据转换为字符串
    person = JSON.parse(person) //将字符串转换为json对象
    person.name = answers.projectName
    person.author = answers.author
    person.description = answers.description

    let str = JSON.stringify(person)
    fs.writeFileSync(packPath, str)
}

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

// 重写main.js
const rewriteMain = ({ targetDir, answers }) => {
    const mainPath = path.join(targetDir, 'src', 'main.js')
    const data = fs.readFileSync(mainPath, 'utf8')
    let person = data.split('\n')
    const setLine = (str) => {
        person.splice(getFileLine(person), 0, str)
    }
    if (answers.pmui) {
        setLine('import "pming-ui/style/index.less"')
        setLine('import PmUI from "pming-ui"')
        setLine('Vue.use(PmUI)')
        installPlugins.push('pming-ui')
    }
    if (answers.router) {
        setLine('import router from "./router"')
        person.splice(getFileRender(person), 0, 'router,')
        installPlugins.push('vue-router')
    }
    if (answers.vuex.length) {
        setLine('import store from "./store"')
        person.splice(getFileRender(person), 0, 'store,')
        installPlugins.push('vuex')
        installPlugins.push('secure-ls')
        installPlugins.push('vuex-persistedstate')
    }
    let str = person.join('\n')
    fs.writeFileSync(mainPath, str, 'utf8')
}

// 添加vuex
const addVuex = ({ targetDir, answers }) => {
    const mainPath = path.join(targetDir, 'src', 'store')
    deleteDir(mainPath)

    if (answers.vuex.length === 3) {
        const _path = path.join(rootPath, answers.template, 'src', 'store',
            'vuex-namespace-persistedstate')
        mkdirp.sync(mainPath)
        copyFile(_path, mainPath)
        return
    }
    if (answers.vuex.length) {
        let selectData = answers.vuex[answers.vuex.length - 1]
        const _path = path.join(rootPath, answers.template, selectData)
        mkdirp.sync(mainPath)
        copyFile(_path, mainPath)
    }
}

// 添加vue-router
const addRouter = ({ targetDir, answers }) => {
    if (!answers.router) {
        deleteDir(path.join(targetDir, 'src', 'router'))
        deleteDir(path.join(targetDir, 'src', 'views'))
    }
    else {
        const appPath = path.join(targetDir, 'src', 'App.vue')
        const data = fs.readFileSync(appPath, 'utf8')
        let person = data.split('\n')
        person.splice(2, 0,
            `<div class="nav"><router-link to="/home">Home</router-link>|<router-link to="/about">About</router-link></div> <router-view/>`)
        person.splice(person.length - 2, 0,
            `.nav {padding: 30px;}.nav a {font-weight: bold;color: #2c3e50;padding: 0 5px;}.nav a.router-link-exact-active {color: #42b983;}`)
        let str = person.join('\n')
        fs.writeFileSync(appPath, str, 'utf8')
    }
}

module.exports = function ({ targetDir, answers, projectName }) {
    const _path = path.join(rootPath, answers.template)
    copyFile(_path, targetDir)
    rewritePackage({ targetDir, answers })

    rewriteMain({ targetDir, answers })
    addVuex({ targetDir, answers })
    addRouter({ targetDir, answers })
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

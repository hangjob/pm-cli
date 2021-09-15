const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const sd = require('silly-datetime')

const rootPath = path.dirname(require.main.filename)
// 重写html
const rewriteHtml = ({ targetDir, answers }) => {
    const htmlPath = path.join(targetDir, 'public', 'index.html')
    const packPath = path.join(rootPath, 'package.json')
    const package = JSON.parse(fs.readFileSync(packPath).toString())
    const data = fs.readFileSync(htmlPath, 'utf8')
    const $ = cheerio.load(data, { decodeEntities: false, xmlMode: true })
    $('head').append(`<meta name="author" content="${answers.author}"/>`)
    $('head').append(`<meta name="des" content="${answers.description}"/>`)
    $('head').
        append(
            `<meta name="version" content="pm-cli.version.${package.version}"/>`)
    const time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    $('head').append(`<meta name="time" content="${time}"/>`)
    $('head').find('title').text('<%= htmlWebpackPlugin.options.title %>')
    let str = $.html()
    fs.writeFileSync(htmlPath, str)
}

// 判断node.js
const nodeVersion = (v)=>{
    let _v = process.versions.node.split('.')[0];
    if(parseInt(_v) < v){
       throw `node 当前版${process.version}本小于v${v}.0.0`
    }
}

module.exports = {
    rewriteHtml,
    nodeVersion
}
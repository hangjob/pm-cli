const path = require('path')
// 抽象模板
const config = require('./config')
module.exports = function ({ targetDir, answers }) {
    config.map(item => {
        if (item.dir === answers.template) {
            const _path = path.join(process.cwd(), item.method)
            const templateAction = require(_path)
            templateAction({ targetDir, answers })
        }
    })
}
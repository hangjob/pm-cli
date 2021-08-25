const path = require('path')
// 抽象模板
const { templateNames } = require('./config')
module.exports = function ({ targetDir, answers }) {
    templateNames.map(item => {
        if (item.dir === answers.template) {
            const _path = path.join(process.cwd(), item.method)
            const templateAction = require(_path)
            templateAction({ targetDir, answers, sourceDir: item.dir })
        }
    })
}
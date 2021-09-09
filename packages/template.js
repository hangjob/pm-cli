const path = require('path')
// 抽象模板
const { templateNames } = require('./config')
module.exports = function ({ targetDir, answers, projectName }) {
    templateNames.map(item => {
        if (item.dir === answers.template) {
            let rootPath = path.dirname(require.main.filename)
            const _path = path.join(rootPath, item.method)
            const templateAction = require(_path)
            templateAction({ targetDir, answers, projectName })
        }
    })
}
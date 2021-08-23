const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // less 变量覆盖 - 类似以下写法
                    // 'link-color': '#F5222D',
                },
                javascriptEnabled: true,
            },
        },
    },
    devServer: {},
}

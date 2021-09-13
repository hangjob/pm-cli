const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
    return path.join(__dirname, dir)
}

const proxys = {
    '/api/*': {
        target: 'http://xxx.xxx.xxx.xxx:xxx',
        changeOrigin: true,
        ws: true,
        secure: false,
    },
}
module.exports = {
    productionSourceMap: false, // 是否开启SourceMap，调试使用
    lintOnSave: false, // 是否在保存的时候检查代码
    publicPath: './',
    outputDir: 'dist', // 输出的文件名
    assetsDir: 'assets',
    parallel: require('os').cpus().length > 1,
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: (config) => {

    },
    css: {
        // 启用 CSS modules
        requireModuleExtension: false, // 早些版本 modules
        // 是否使用css分离
        extract: true,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
        loaderOptions: {
            less: {
                modifyVars: {
                    // less 变量覆盖 - 类似以下写法
                    // 'link-color': '#F5222D',
                },
                javascriptEnabled: true, // less-loader6.0.0以后写法
            },
        },
    },
    devServer: {
        port: 8090,
        host: '0.0.0.0',
        https: false,
        open: false,
        proxy: proxys,
    },
}

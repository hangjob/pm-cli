const templateNames = [
    {
        name: '安装普通html模板',
        dir: '/templates/html',
        method: '/packages/template/html.js',
    },
    {
        name: '安装品茗库vue2.0模板',
        dir: '/templates/vue', // 模板路径
        method: '/packages/template/vue.js', // 模板执行方法
    },
    {
        name: '安装品茗库vue3.0模板',
        dir: '/templates/vue3',
        method: '/packages/template/vue3.js',
    },
    {
        name: '安装品茗库App模板',
        dir: '/templates/app',
        method: '/packages/template/app.js',
    },
    {
        name: '安装品茗库大数据模板',
        dir: '/templates/app',
        method: '/packages/template/bigdata.js',
        hide: true,
    },
    {
        name: '安装品茗库vue3.0-typescript模板',
        dir: '/templates/vue3ts',
        method: '/packages/template/vue3ts.js',
    },
    {
        name: 'vite下一代脚手架',
        dir: '',
        method: '/packages/template/vite.js',
    },
]

const templateVuex = [
    { name: 'vuex', value: '/src/store/vuex' },
    { name: 'vuex-persistedstate', value: '/src/store/vuex-persistedstate' },
    { name: 'namespace', value: '/src/store/vuex-namespace' },
]

module.exports = {
    templateNames,
    templateVuex,
}
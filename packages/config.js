const templateNames = [
    {
        name: '安装普通html模板',
        dir: '/templates/html',
        method: '/packages/template/html.js',
    },
    {
        name: '安装品茗库vue2.0开发模板',
        dir: '/templates/vue', // 模板路径
        method: '/packages/template/vue.js', // 模板执行方法
    },
    {
        name: '安装品茗库vue3.0开发模板',
        dir: '/templates/vue-pm-ui',
        method: '/packages/template/vue-pm-ui.js',
    },
]

const templateVuex = [
    { name: 'vuex', value: '/src/store/vuex.js' },
    {
        name: 'vuex && vuex-persistedstate',
        value: '/src/store/vuex-persistedstate.js',
    },
    {
        name: 'vuex && namespace',
        value: '/src/store/namespace.js',
        modules: '/src/store/modules',
    },
]

module.exports = {
    templateNames,
    templateVuex,
}
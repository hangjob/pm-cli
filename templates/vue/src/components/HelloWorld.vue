<template>
    <div class="hello">
        <h1>欢迎使用pm-cli前端脚手架</h1>
        <p>模板名称：安装普通html模板</p>
        <h3>CLI-自带插件</h3>
        <ul>
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
                   rel="noopener">babel</a></li>
            <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
                   rel="noopener">eslint</a></li>
        </ul>
        <h3>vue社区</h3>
        <ul>
            <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
            <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
            <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
            <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
            <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
        </ul>
        <h3>生态系统</h3>
        <ul>
            <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
            <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
            <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank"
                   rel="noopener">vue-devtools</a>
            </li>
            <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
            <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
        </ul>
        <h3>精选插件</h3>
        <ul>
            <li><a href="https://lodash.com/" target="_blank" rel="noopener">lodash</a></li>
            <li><a href="https://api.jquery.com/" target="_blank" rel="noopener">jquery</a></li>
            <li><a href="//hilongjw.github.io/vue-progressbar/" target="_blank" rel="noopener">vue-progressbar</a></li>
            <li><a href="//axios-js.com/zh-cn/docs/index.html" target="_blank" rel="noopener">axios</a></li>
            <li><a href="https://dayjs.gitee.io/zh-CN/" target="_blank" rel="noopener">day.js</a></li>
        </ul>
        <h3>数据图表</h3>
        <ul>
            <li><a href="https://echarts.apache.org/zh/index.html" target="_blank" rel="noopener">ECharts</a></li>
            <li><a href="https://antv.vision/zh" target="_blank" rel="noopener">Antv</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
}
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
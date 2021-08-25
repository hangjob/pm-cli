import Vue from 'vue'
import Vuex from 'vuex'
// https://codesandbox.io/s/vuex-persistedstate-with-secure-ls-encrypted-data-7l9wb?fontsize=14&file=/index.js:48-188
import createPersistedState from 'vuex-persistedstate' // 数据持久化
import SecureLS from 'secure-ls' // 数据加密
const ls = new SecureLS({ isCompression: false })
import createLogger from 'vuex/dist/logger' // vuex日志

Vue.use(Vuex)

const state = {
    userInfo: {},
}

const getters = {
    userInfo: state => {
        return state.userInfo
    },
}

const mutations = {
    setUserInfo (state, data) {
        state.userInfo = data
    },
}

const actions = {
    async getUserInfo ({ commit }) {
        try {
            commit('setUserInfo', { name: '测试数据' })
        }
        catch (err) {
            console.log(err)
        }
    },
}

// 启用插件
const plugins = [
    createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key),
        },
    }),
    createLogger(),
]
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins,
    strict: debug,
})

export default store
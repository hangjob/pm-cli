import Vue from 'vue'
import Vuex from 'vuex'
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


const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})

export default store
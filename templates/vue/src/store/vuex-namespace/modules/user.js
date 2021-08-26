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

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
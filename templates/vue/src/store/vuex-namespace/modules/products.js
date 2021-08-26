const state = {
    all: {},
}

const getters = {
    all: state => {
        return state.all
    },
}

const mutations = {
    setProducts (state, products) {
        state.all = products
    },
}

const actions = {
    async getAllProducts ({ commit }) {
        try {
            commit('setProducts', { name: '测试数据' })
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
    mutations,
}
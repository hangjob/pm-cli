import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import products from './modules/products'
import createLogger from 'vuex/dist/logger' // vuex日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user,
        products
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
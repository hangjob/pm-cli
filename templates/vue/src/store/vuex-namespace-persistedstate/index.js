import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import createPersistedState from 'vuex-persistedstate' // 数据持久化
import SecureLS from 'secure-ls' // 数据加密
const ls = new SecureLS({isCompression: false})
import createLogger from 'vuex/dist/logger' // vuex日志
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const cartState = createPersistedState({
    key: "state",
    storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key),
    },
    reducer: (value) => {
        let data = {
            cart: {},
        };
        data.cart.id = value.cart.id; // 只存储指定的值
        return data;
    },
});

const plugins = [
    createLogger(),
    cartState,
];

export default new Vuex.Store({
    modules: {
        cart,
        products
    },
    plugins,
    strict: debug
})
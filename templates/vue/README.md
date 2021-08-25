# pm-cli

> 品茗前端脚手架

### 插件

#### secure-ls

> 加密storage,当我们在vuex中保存了用户信息，虽然使用起来方便了很多，但是为了解决vuex刷新页面数据丢失的问题，使用了vuex-persistedstate插件，vuex-persistedstate是没有加密的，用户的信息就暴露在缓存中, 非常的不安全，所以需要配合secure-ls来加密storage

```bash
npm install secure-ls
```

```js
import Vue from "vue";
import Vuex from "vuex";
import SecureLS from 'secure-ls';
import persistedState from "vuex-persistedstate";

const ls = new SecureLS({
    encodingType: "aes", // 加密方式
    isCompression: false, // 是否启用数据压缩
    encryptionSecret: "old-beauty" // 
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        persistedState({
            // key: "123123", // 存入storage是的key
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })],
    ...
});
```

#### vuex-persistedstate

> 核心原理，在本地存储中存入所有的vuex数据，页面刷新时到缓存中取数据，放到vuex中

```bash
npm install vuex-persistedstate -S
```

在store中引入插件

```js
import persistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
    // ...
    plugins: [persistedState()]
})
```

vuex-persistedstate默认使用localStorage储存，若想使用sessionStorage，可采用以下配置

```js
import persistedState from "vuex-persistedstate"

const store = new Vuex.Store({
    // ...
    plugins: [
        persistedState({
            storage: window.sessionStorage
        })]
})
```

若想使用cookie，可采用以下配置

```bash
npm install js-cookie -S
```

```js
import Cookies from 'js-cookie';
import persistedState from "vuex-persistedstate"

const store = new Vuex.Store({
    // ...
    plugins: [
        persistedState({
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value),
                removeItem: key => Cookies.remove(key)
            }
        })]
})
```
import { createStore } from 'vuex'

import editor from './modules/editor'

// 创建一个新的 store 实例
const store = createStore({
    strict: true,//关闭严格模式
    modules: {
        editor
    }
})

export default store
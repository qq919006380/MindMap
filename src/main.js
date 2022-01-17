import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import mitt from 'mitt'
import 'normalize.css'
import '../public/iconfont/iconfont.js'
import * as Icons from '@element-plus/icons-vue'
import "@antv/x6-vue-shape";
const emitter = mitt();
const app = createApp(App)
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})
app.config.globalProperties.$EventBus = emitter
app.use(router)
app.use(ElementPlus)
app.mount('#app')


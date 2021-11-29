import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import mitt from 'mitt'

import "@antv/x6-vue-shape";
const emitter = mitt();
const app = createApp(App)
app.config.globalProperties.$EventBus = emitter
app.use(router)
app.use(ElementPlus)
app.mount('#app')


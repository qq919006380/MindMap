import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import "@antv/x6-vue-shape";

const app = createApp(App).use(router)
app.use(ElementPlus)
app.mount('#app')

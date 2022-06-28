import { createApp } from "vue";
import store from './store'
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import "normalize.css";
import "./iconfont/iconfont.js";
import "@antv/x6-vue-shape";


const emitter = mitt();
const app = createApp(App);

 
app.config.globalProperties.$EventBus = emitter;
app.use(router);

app.use(store)// 将 store 实例作为插件安装
app.mount("#app");










import { createApp } from 'vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import js_cookie from 'js-cookie'
import lazyPlugin from 'vue3-lazy'

// 使用element-plus
import ElementPlus from 'element-plus';
import * as ElIconModules from '@element-plus/icons-vue'

import { Edit } from '@element-plus/icons-vue'
// import 'element-plus/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import './assets/css/global.css'


import App from './App.vue'
const app = createApp(App)
for (let iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
};

app.config.errorHandler = (err, vm, info) => {
    console.log(err, info);
}


app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(lazyPlugin, {
    loading: import ("./static/imgs/默认图片.png"),
    error: import ("./static/imgs/图片加载失败.png")
})
app.mount('#app')
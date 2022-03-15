import { createApp } from 'vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import js_cookie from 'js-cookie'
import lazyPlugin from 'vue3-lazy'

// 使用element-plus
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css'

import './assets/css/global.css'
import App from './App.vue'
const app = createApp(App)

//错误信息打印
app.config.errorHandler = (err, vm, info) => {
    console.log(err, info);
}
import loadingImg from './static/imgs/默认图片.png'
import errorImg from './static/imgs/图片加载失败.png'

  

// app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(lazyPlugin, {
    // loading: require ("./static/imgs/默认图片.png"),
    // error: require ("./static/imgs/图片加载失败.png")
    loading:loadingImg,
    errot:errorImg
})
app.mount('#app')
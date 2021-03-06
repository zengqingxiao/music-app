import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播图
import VueLazyload from 'vue-lazyload' // 图片懒加载
import 'lib-flexible' // 移动端的适配
import './assets/css/reset.css' // 页面的样式统一
import './assets/css/common.css' // 页面公共样式
import './assets/fonts/iconfont.css' // 字体图标
import 'swiper/dist/css/swiper.css' // 轮播图样式

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper /* { default global options } */) // 轮播图
// 配置
Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载高度比例
  loading: 'load.gif', // loading时候的图片
  error: 'user-bg.png' // 图像加载失败时的src
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

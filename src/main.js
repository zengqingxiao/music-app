import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import 'lib-flexible' // 移动端的适配
import './assets/css/reset.css' // 页面的样式统一
import './assets/fonts/iconfont.css' // 字体图标

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

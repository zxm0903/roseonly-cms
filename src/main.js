import Vue from 'vue'
import App from './App.vue'
// import Router from 'vue-router'
// import router from '@/router/index'
import router from './router'
import store from '@/store/index'
import ElementUI from 'element-ui'
import '@/assets/index.css'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);
//ajax 请求库
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = '192.168.2.220:8081'




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

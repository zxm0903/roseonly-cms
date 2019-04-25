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
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://172.16.7.81:8080'
// axios.defaults.headers = {'X-Custom-Header': 'foobar'}
// axios.defaults.headers.common['Authorization'] = 'Bearer ';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

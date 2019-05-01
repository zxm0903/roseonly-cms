import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import ElementUI from 'element-ui'
import '@/assets/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts


Vue.use(ElementUI);
//ajax 请求库
import axios from 'axios'
Vue.prototype.axios = axios
// Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://172.16.7.83:8080'
// axios.defaults.headers = {'X-Custom-Header': 'foobar'}
// axios.defaults.headers.common['Authorization'] = 'Bearer ';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['Content-Type'] = 'c';

// 引入qs
import qs from 'qs'
axios.interceptors.request.use(config => {
  if (config.type == 'formData' || config.method != 'post') {
    return config
  }
  config.data = qs.stringify(config.data)
  return config
}, (err) => {
  return Promise.reject(err);
})

// 引入打印
import Print from 'vue-print-nb'
Vue.use(Print)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

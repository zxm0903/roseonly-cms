import Vue from 'vue'
import Router from 'vue-router'
import  Home from '@/router/detal/Home.js'

import  Login from '@/router/detal/Login.js'

Vue.use(Router)

export default new Vue.Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    Home,
    Login
  ]
  

})
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LoginRouter = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login
      }  
    ]
  })

  export default LoginRouter
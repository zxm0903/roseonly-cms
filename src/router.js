import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '/ShopCondition',
          name: 'ShopCondition',
          component: () => import('@/views/statistics/ShopCondition.vue')
        },
        {
          path: '/ProductAnalysis',
          name: 'ProductAnalysis',
          component: () => import('@/views/statistics/ProductAnalysis.vue')
        },
        {
          path: '/CommodityAnalysis',
          name: 'CommodityAnalysis',
          component: () => import('@/views/statistics/CommodityAnalysis.vue')
        },
        {
          path: '/TransactionAnalysis',
          name: 'TransactionAnalysis',
          component: () => import('@/views/statistics/TransactionAnalysis.vue')
        },
        {
          path: '/VipDetail',
          name: 'VipDetail',
          component: () => import('@/views/vip/VipDetail.vue')
        }
       
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/findpass',
      name: 'findpass',
      component: () => import('@/views/Findpass')
    }
  ]
})
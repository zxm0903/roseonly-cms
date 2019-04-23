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
      children:[
        {
          path:'/addproduct',
          name:'addproduct',
          component:() => import('@/views/product/AddProduct')
        },
        {
          path:'/productmanagement',
          name:'productmanagement',
          component:() => import('@/views/product/ProductManagement')
        },
        {
          path:'/productcategories',
          name:'productcategories',
          component:() => import('@/views/product/ProductCategories')
        },
        {
          path:'/CommodityAnalysis',
          name:'CommodityAnalysis',
          component:() => import('@/views/statistics/CommodityAnalysis')
        },
        {
          path:'/ProductAnalysis',
          name:'ProductAnalysis',
          component:() => import('@/views/statistics/ProductAnalysis')
        },
        {
          path:'/ShopCondition',
          name:'ShopCondition',
          component:() => import('@/views/statistics/ShopCondition')
        },
        {
          path:'/TransactionAnalysis',
          name:'TransactionAnalysis',
          component:() => import('@/views/statistics/TransactionAnalysis')
        },
        {
          path:'/VipDetail',
          name:'VipDetail',
          component:() => import('@/views/vip/VipDetail')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/findpass',
      name: 'findpass',
      component: () => import('@/views/Findpass'),
    }
    

  ]
})
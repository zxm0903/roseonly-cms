import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
 
const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      meta:{
        auth:true
      },
      children:[
        {
          path:'/addproduct',
          name:'addproduct',
          component:() => import('@/views/product/AddProduct'),
          meta:{
            auth:true
          }
        },
        {
          path:'/productmanagement',
          name:'productmanagement',
          component:() => import('@/views/product/ProductManagement'),
          meta:{
            auth:true
          }
        },
        {
          path:'/productcategories',
          name:'productcategories',
          component:() => import('@/views/product/ProductCategories'),
          meta:{
            auth:true
          }
        },
        {
          path:'/ordermanagement',
          name:'ordermanagement',
          component:() => import('@/views/order/OrderManagement'),
          meta:{
            auth:true
          }
        },
        {
          path:'/CommodityAnalysis',
          name:'CommodityAnalysis',
          component:() => import('@/views/statistics/CommodityAnalysis'),
          meta:{
            auth:true
          }
        },
        {
          path:'/ProductAnalysis',
          name:'ProductAnalysis',
          component:() => import('@/views/statistics/ProductAnalysis'),
          meta:{
            auth:true
          }
        },
        {
          path:'/ShopCondition',
          name:'ShopCondition',
          component:() => import('@/views/statistics/ShopCondition'),
          meta:{
            auth:true
          }
        },
        {
          path:'/TransactionAnalysis',
          name:'TransactionAnalysis',
          component:() => import('@/views/statistics/TransactionAnalysis'),
          meta:{
            auth:true
          }
        },
        {
          path:'/Operate',
          name:'Operate',
          component:() => import('@/views/systemManagement/Operate'),
          meta:{
            auth:true
          }
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
    },
    
  ]
})


// // 路由拦截  全局路由钩子
// router.beforeEach((to,from,next)=>{
//   console.log('即将要跳转的路由：', to);
//   console.log('即将离开的路由：', from);
//   if(to.meta.auth){
//     next('/login')
//   }else{
//     next()
//   }
// })


export default router
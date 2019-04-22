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
        }
      ]
    }
    

  ]
})
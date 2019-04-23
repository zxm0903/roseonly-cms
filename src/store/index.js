import Vue from 'vue'
import Vuex from 'vuex'
import order from '@/store/moduls/order.js'
import product from '@/store/moduls/product.js'
import statistics from '@/store/moduls/statistics.js'
import login from '@/store/moduls/Login.js'
import vip from '@/store/moduls/vip.js'

Vue.use(Vuex)

export default new Vuex.Store({
    order,
    product,
    statistics,
    vip,
    login
})
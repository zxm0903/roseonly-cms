import Vue from 'vue'
import Vuex from 'vuex'
import state from '@/store/moduls/state.js'
import mutations from '@/store/moduls/mutations.js'
import actions from '@/store/moduls/actions.js'
import getters from '@/store/moduls/getters.js'


Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
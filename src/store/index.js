import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import getters from './getters'
import user from './modules/user'

export default new Vuex.Store({
  modules: {
    user,
    getters
  }
})

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import getters from './getters'
import user from './modules/user.js'
import app from './modules/app'
import theme from './modules/theme'
import permission from './modules/permission'

export default new Vuex.Store({
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
})

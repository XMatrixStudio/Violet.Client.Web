import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
const actions = {}
const getters = {}
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user
  }
})

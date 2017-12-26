import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import client from './modules/client'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const actions = {}
const getters = {}
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    client
  },
  plugins: [vuexLocal.plugin]
})

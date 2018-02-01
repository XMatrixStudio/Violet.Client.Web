// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import ax from '@/lib/axios'
import util from '@/lib/util'
import service from '@/lib/service'
import iView from 'iview'
import qs from 'qs'
Vue.use(Vuex)
Vue.use(iView)
Vue.use(service)
Vue.config.productionTip = false
Vue.prototype.$https = ax
Vue.prototype.$util = util
Vue.prototype.$qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

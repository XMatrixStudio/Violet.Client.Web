// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import ax from '@/lib/axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(Vuex)
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$https = ax

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

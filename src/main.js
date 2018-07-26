import Vue from 'vue'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import ax from '@/lib/axios'
import util from '@/lib/util'
import service from '@/lib/service'

Vue.use(require('iview'))
Vue.use(require('vue-cookies'))
Vue.use(service)

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.debug = false

Vue.prototype.$https = ax
Vue.prototype.$util = util

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

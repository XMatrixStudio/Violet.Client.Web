import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from './components/UserInfo.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user/:id',
      name: 'user',
      component: UserInfo
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '../../views/Home.vue'

import Login from './components/Login'
import Register from './components/Register'
import Reset from './components/Reset'
import ResetType from './components/ResetType'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register/',
      name: 'register',
      component: Register
    },
    {
      path: '/reset/',
      name: 'reset',
      component: Reset
    },
    {
      path: '/reset/type',
      name: 'resetType',
      component: ResetType
    }
  ]
})

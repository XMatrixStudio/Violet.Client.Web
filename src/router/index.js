import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/components/Index/Login'
import Register from '@/components/Index/Register'
import Reset from '@/components/Index/Reset'
import Verify from '@/components/Index/Verify'
import Auth from '@/components/Index/Auth'
import User from '@/pages/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: 'register',
      component: Register
    }, {
      path: '',
      component: Login
    }, {
      path: 'reset',
      component: Reset
    }, {
      path: 'verify',
      component: Verify
    }, {
      path: 'auth',
      component: Auth
    }]
  }, {
    path: '/:username',
    name: 'User',
    component: User
  }]
})

import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'
import Login from '@/components/Index/Login'
import Register from '@/components/Index/Register'
import Reset from '@/components/Index/Reset'
import Verify from '@/components/Index/Verify'
import Auth from '@/components/Index/Auth'

import User from '@/pages/User'
import Profile from '@/components/User/Profile'
import Website from '@/components/User/Website'
import Dev from '@/components/User/Dev'
import InfoSet from '@/components/User/InfoSet'

import Authorize from '@/pages/Authorize'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '',
    component: Index,
    children: [{
      path: 'register',
      name: 'register',
      component: Register
    }, {
      path: '',
      name: 'login',
      component: Login
    }, {
      path: 'reset',
      component: Reset
    }, {
      path: 'verify',
      name: 'verify',
      component: Verify
    }, {
      path: 'auth',
      name: 'auth',
      component: Auth
    }]
  }, {
    path: '/Verify/Authorize',
    name: 'Authorize',
    component: Authorize
  }, {
    path: '/:username',
    component: User,
    children: [{
      path: '',
      name: 'userInfo',
      component: Profile
    }, {
      path: 'website',
      component: Website
    }, {
      path: 'dev',
      component: Dev
    }, {
      path: 'infoSet',
      name: 'InfoSet',
      component: InfoSet
    }]
  }]
})

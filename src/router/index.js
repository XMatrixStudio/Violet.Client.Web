import Vue from 'vue'
import Router from 'vue-router'
import User from '@/pages/User'
import Login from '@/components/User/Login'
import Register from '@/components/User/Register'
import Reset from '@/components/User/Reset'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'User',
    component: User,
    children: [{
      path: 'register',
      name: 'Register',
      component: Register
    }, {
      path: '',
      name: 'Login',
      component: Login
    }, {
      path: 'reset',
      component: Reset
    }]
  }]
})

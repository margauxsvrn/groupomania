import Vue from 'vue'
import VueRouter from 'vue-router'

// J'importe mes pages
import Loginpage from '../views/LoginPage.vue'
import Home from '../views/Home.vue'
import Signup from '../views/SignUp.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Loginpage',
    component: Loginpage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
]

const router = new VueRouter({
  routes
})

export default router

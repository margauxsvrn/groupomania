import Vue from 'vue'
import VueRouter from 'vue-router'

// J'importe mes pages
import LoginPage from '../views/LoginPage.vue'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/User.vue'
import AdminPage from '../views/AdminPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  },
]

const router = new VueRouter({
  routes
})

export default router

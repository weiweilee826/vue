import VueRouter from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: Login
    },
  ]
})



export default router
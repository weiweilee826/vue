import VueRouter from 'vue-router'
import Login from './pages/Login'
import DashBoard from './pages/DashBoard'
import Product from './pages/Product'
import Home from './pages/Home'
import Order from './pages/Order'
import axios from 'axios'

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
      path: '/dashboard',
      component: DashBoard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'product',
          component: Product,
          meta: { requiresAuth: true }
        },
        {
          path: 'product/:page',
          component: Product,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          component: Order,
          meta: { requiresAuth: true }
        },
      ],
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const API = `${process.env.VUE_APP_HOST}/api/user/check`;
    axios.post(API)
      .then(function (response) {
        if (response.data.success) {
          next();
        } else {
          next('/login');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    next();
  }
})

export default router
import Login from './components/pages/Login.vue'
import Index from './components/Index.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Dashboard from './components/pages/Dashboard.vue'
import Product from './components/Product.vue'
import CustomerOrder from './components/pages/CustomerOrder.vue'


const routes = [
  {
    name: 'index',
    path: '/',
    component: Index,
    meta: { requiresAuth: true }
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'dashboard',
    path: '/admin',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        name: 'product',
        path: 'product',
        component: Product,
        // meta: { requiresAuth: true }
      },
      {
        name: 'product',
        path: 'product/:page',
        component: Product,
        // meta: { requiresAuth: true }
      }
    ]
  },
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard,
    children: [
      {
        name: 'CustomerOrder',
        path: 'customer_order',
        component: CustomerOrder,
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    axios.post(`${process.env.VUE_APP_HOST}/api/user/check`)
      .then(function (response) {
        if (response.data.success) {
          next();
        } else {
          next("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    next();
  }
})

export default router;
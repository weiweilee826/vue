import Login from './components/pages/Login.vue'
import Index from './components/Index.vue'
import VueRouter from 'vue-router'
import axios from 'axios'


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
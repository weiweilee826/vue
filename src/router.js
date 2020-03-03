import VueRouter from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'
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
      meta: { requiresAuth: true  }
    },
    {
      path: '/login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(111)
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
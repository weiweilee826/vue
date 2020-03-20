import VueRouter from "vue-router";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Coupon from "./pages/Coupon";
import axios from "axios";

const router = new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/",
      component: DashBoard,
      // meta: { requiresAuth: true },
      children: [
        {
          path: "product",
          component: Product
          // meta: { requiresAuth: true }
        },
        {
          path: "product/:page",
          component: Product
          // meta: { requiresAuth: true }
        },
        {
          path: "order",
          component: Order
          // meta: { requiresAuth: true }
        },
        {
          path: "cart",
          component: Cart
          // meta: { requiresAuth: true }
        },
        {
          path: "coupon",
          component: Coupon
          // meta: { requiresAuth: true }
        },
        {
          path: "coupon/:page",
          component: Coupon
          // meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const API = `${process.env.VUE_APP_HOST}/api/user/check`;
    axios
      .post(API)
      .then(function(response) {
        if (response.data.success) {
          next();
        } else {
          next("/login");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  } else {
    next();
  }
});

export default router;

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router.js'
import './assets/dashboard.css'
import Loading from 'vue-loading-overlay';

Vue.component('Loading',Loading)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

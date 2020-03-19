import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/dashboard.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import router from "./router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import price from "./filter/price";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/zh_TW.json";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.component("Loading", Loading);
Vue.prototype.$bus = new Vue();
Vue.filter("price", price);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/assets/addons/bootstrap-5.2.x/bootstrap-alt.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { BootstrapVue } from "bootstrap-vue";
// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

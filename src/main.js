import "@/assets/styles/index.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Toast from "@/components/Toast/index";
import Confrim from "@/components/ConfirmDialog/index";
Vue.prototype.$toast = Toast;
Vue.prototype.$confirm = Confrim;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

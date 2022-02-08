import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import http from "./http";
import "./plugins/index";
import { logger } from "@/utils/utils";
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$logger = logger;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount("#app");

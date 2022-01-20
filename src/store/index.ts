import Vue from "vue";
import Vuex from "vuex";
import { getStorage, setStorage } from "@/utils/storage";
Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    }
  },
  state: {
    token: getStorage("id_token") || "",
    username: getStorage("username") || ""
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
      setStorage("id_token", val);
    },
    setUserInfo(state, val) {
      console.log(val);
      state.username = val;
      setStorage("username", val);
    }
  },
  actions: {},
  modules: {}
});

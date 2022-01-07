import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
  },
  state: {
    token: getStorage('id_token') || ''
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      setStorage('id_token', val)
    }
  },
  actions: {},
  modules: {}
})

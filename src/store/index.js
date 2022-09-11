import Vue from 'vue'
import Vuex from 'vuex'
import cjps from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    cjps({
      key: 'HEIMA',
      storage: Window.sessionStorage,
      reducer(state) {
        const { tokenObj } = state
        return { tokenObj }
      }
    })
  ],
  state: {
    // tokenObj: JSON.parse(window.localStorage.getItem('HEIMA')) || {}
    tokenObj: ''
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      // window.localStorage.setItem('HEIMA', JSON.stringify(token))
    }
  }
})

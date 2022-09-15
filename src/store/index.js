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
        const { tokenObj, myChannels, histories } = state
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    // tokenObj: JSON.parse(window.localStorage.getItem('HEIMA')) || {}
    tokenObj: {},
    myChannels: [],
    histories: []
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
    },
    SET_MY_CHANNELS(state, channels) {
      state.mychannels = channels
    },
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 0,
    scrollTop: 0
  },
  mutations: {
    setScroll(state, payload) {
      state.page = payload.page;
      state.scrollTop = payload.scrollTop;
    },
  },
  actions: {

  }
})
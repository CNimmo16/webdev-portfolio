import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var pageColors = {
  0: "grey",
  1: "light",
  2: "grey",
  3: "light"
}

export default new Vuex.Store({
  state: {
    page: 0,
    scrollTop: 0,
    pageColor: pageColors[0]
  },
  mutations: {
    setScroll(state, {page, scrollTop}) {
      state.page = page;
      state.pageColor = pageColors[page]
      state.scrollTop = scrollTop;
    },
  },
  actions: {

  }
})
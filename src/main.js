import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.use(require('vue-moment'));

import './assets/css/main.scss'
import './assets/css/_variables.scss'

import typeit from 'typeit';
Object.defineProperty(Vue.prototype, '$typeit', { value: typeit });

import anime from 'animejs';
Object.defineProperty(Vue.prototype, '$anime', { value: anime });

import VueScrollTo from 'vue-scrollto';
import store from './store'
Vue.use(VueScrollTo, {
     container: "body",
     duration: 1000,
     easing: "ease",
     offset: 0,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/main.scss'
import './assets/css/_variables.scss'

import typeit from 'typeit';
Object.defineProperty(Vue.prototype, '$typeit', { value: typeit });

import anime from 'animejs';
Object.defineProperty(Vue.prototype, '$anime', { value: anime });

import smoothscroll from 'smooth-scroll';
Object.defineProperty(Vue.prototype, '$smooth', { value: smoothscroll });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

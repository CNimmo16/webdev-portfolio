import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/main.scss'
import './assets/css/_variables.scss'

// vee validate for contact form
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
Vue.component('VuePhoneNumberInput', VuePhoneNumberInput);

// Vue moment for date handling
Vue.use(require('vue-moment'));

// Typeit for typing animation animation
import typeit from 'typeit';
Object.defineProperty(Vue.prototype, '$typeit', { value: typeit });

// Anime for various animations
import anime from 'animejs';
Object.defineProperty(Vue.prototype, '$anime', { value: anime });

// Body scroll lock
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
Object.defineProperty(Vue.prototype, '$scrollLock.lock', { value: disableBodyScroll });
Object.defineProperty(Vue.prototype, '$scrollLock.unlock', { value: enableBodyScroll });
Object.defineProperty(Vue.prototype, '$scrollLock.clear', { value: clearAllBodyScrollLocks });

// Vue scroll to
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

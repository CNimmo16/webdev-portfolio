import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Blog from './views/Blog.vue'
// import IndoMap from './views/IndoMap.vue'
// import FormSentConfirm from './views/FormSentConfirm.vue'

const Ripple = () => import('./views/Ripple.vue');
const IndoMap = () => import('./views/IndoMap.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/blog',
    //   name: 'blog',
    //   component: Blog
    // },
    // Project pages
    {
      path: '/interactive-indonesia',
      name: 'IndoMap',
      component: IndoMap
    },
    {
      path: '/ripple-music',
      name: 'Ripple',
      component: Ripple
    },
    {
      path: '*',
      name: 'catch',
      redirect: "/"
    },
  ]
})

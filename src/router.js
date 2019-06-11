import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Blog from './views/Blog.vue'
import IndoMap from './views/IndoMap.vue'
import FormSentConfirm from './views/FormSentConfirm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/message-sent',
      name: 'FormSentConfirm',
      component: FormSentConfirm
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/interactive-indonesia',
      name: 'IndoMap',
      component: IndoMap
    },
    {
      path: '*',
      name: 'catch',
      redirect: "/"
    },
  ]
})

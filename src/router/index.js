import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Study from '@/components/Study'
import Game from '@/components/Game'
import Daily from '@/components/Daily'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Study',
      name: 'Study',
      component: Study,
      meta:{keepAlive:true}
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game,
      meta:{keepAlive:true}
    },
    {
      path: '/Daily',
      name: 'Daily',
      component: Daily,
      meta:{keepAlive:true} 
    },
  ]
})

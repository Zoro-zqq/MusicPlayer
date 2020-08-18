import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/recommend',
          name: 'recommend',
          component: ()=>import('../components/HomeComponents/recommend')
        },
        {
          path: '/artists',
          name: 'artists',
          component: ()=>import('../components/HomeComponents/artists'),
          children:[
            {
              path: ':id',
              name: 'artistsInfo',
              component: ()=>import('../components/details/artistsInfo')
            },
          ]
        },
        {
          path: '/playListView',
          name: 'playListView',
          component: ()=>import('../components/HomeComponents/playListView'),
          children: [
            {
              path: ':id',
              name: 'playListInfo',
              component: ()=>import('../components/details/playListInfo')
            },
          ]
        },
        {
          path: '/rank',
          name: 'rank',
          component: ()=>import('../components/HomeComponents/rank'),
          children: [{
              path: ':id',
              name: 'rankInfo',
              component: ()=>import('../components/details/rankInfo')
          }]
        },
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: ()=>import('../components/HomeComponents/search')
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: ()=>import('../components/HomeComponents/userCenter'),
      children: [
        {
          path: 'userHistory',
          name: 'userHistory',
          component: ()=>import('../components/user/userHistory')
        },
        {
          path: 'userLove',
          name: 'userLove',
          component: ()=>import('../components/user/userLove')
        },
        {
          path: 'userPlay',
          name: 'userPlay',
          component: ()=>import('../components/user/userPlay')
        },
      ]
    }
  ]
})

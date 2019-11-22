import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import PlayListView from '@/views/playListView.vue' // 全部歌单
import Recommend from '@/views/recommend.vue' // 每日推荐跳转
import Rank from '@/views/rank.vue' // 排行榜
import Artists from '@/views/artists' // 热们歌手
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playListView',
      name: 'playListView',
      component: PlayListView
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/artists',
      name: 'artists',
      component: Artists
    }

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue") // 懒加载
    // }
  ]
})

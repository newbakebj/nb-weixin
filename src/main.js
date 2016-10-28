import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import pullToRefresh from './directives/pullToRefresh'
import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import app from './app.vue'
/**
 * 使用webpack2.0采用下面的方式进行异步加载
 * webpack1.0的写法如下:
 * const Foo = resolve => require(['./Foo.vue'], resolve)
 **/
const Home = () => System.import('./views/home.vue');
const List = () => System.import('./views/list.vue');
const Task = () => System.import('./views/tasks.vue');
const User = () => System.import('./views/user.vue');
const More = () => System.import('./views/more.vue');
const Rank = () => System.import('./views/rank.vue');

const Invite = () => System.import('./views/invite.vue');
const UserTask = () => System.import('./views/user/tasks.vue');
const Userwithdraw = () => System.import('./views/user/withdraw.vue');
const Userprofile = () => System.import('./views/user/profile.vue');
const Userprofit = () => System.import('./views/user/profit.vue');
const UserprofitRecord = () => System.import('./views/user/profitRecord.vue');
const MoreFeedback = () => System.import('./views/more/feedback.vue');
const MoreAbout = () => System.import('./views/user/profile.vue');
const Welcome = resolve => require(['./views/welcome.vue'], resolve)
// Router
Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    // new navigation.
    // scroll to anchor
    if (to.hash) {
      return { anchor: true }
    }
    // explicitly control scroll position
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      return { x: 0, y: 0 }
    }
  }
}
const router = new VueRouter({
  mode: 'history',//去掉url中讨厌的#
  base: __dirname,
  scrollBehavior,
  routes:[

    {
      path: '/',
      component: Home
      // require('./views/welcome')
    },
    {
      path: '/home',
      component: Home
      // require('./views/home').default
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/invite',
      component:Invite
    },
    {
      path: '/tasks',
      component: Task
    },

    {
      path: '/user',
      component:User
    },
    {
      path: '/user/tasks',
      component:UserTask
    }
    ,
    {
      path: '/user/withdraw',
      component:Userwithdraw
    }
    ,
    {
      path: '/user/profile',
      component:Userprofile
    }
    ,
    {
      path: '/user/profit',
      component:Userprofit
    },
    {
      path: '/user/profit/record',
      component:UserprofitRecord
    },
    {
      path: '/more',
      component:More
    },
    {
      path: '/more/feedback',
      component:MoreFeedback
    },
    {
      path: '/more/about',
      component:MoreAbout
    }
  ]
});
// routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = 'src/assets/data';
Vue.http.options.emulateJSON = true

// Directive
Vue.directive('pullToRefresh', pullToRefresh)
Vue.directive('infiniteScroll', infiniteScroll)

// Filters
Vue.filter('date', filters.dateFilter)

new Vue({ // eslint-disable-line
  render: h => h(app),
  router
}).$mount('#app');


window.router = router

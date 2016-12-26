/**
 * 微网站入口
 * Created by ArthurZhang on 2016/11/27.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import store from './store';
import AwesomeSwiper from 'vue-awesome-swiper';
import App from './appNew.vue';
import MuseUI from 'muse-ui';  // 使用MuseUI
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-carbon.css';
import _ from 'lodash';

/*========== 定义所有视图模块 ==========*/
const Main = () => System.import('./views/main.vue');
const Community = () => System.import('./views/community.vue');
const ThreadDetail = () => System.import('./views/threadDetail.vue');
const Market = () => System.import('./views/market.vue');
const Cart = () => System.import('./views/cart.vue');
const Mine = () => System.import('./views/mine.vue');
const NotFounded = () => System.import('./views/notFounded.vue');
// 测试Vue
const Test = () => System.import('./views/test.vue');

/*========== vue-router组件配置 ==========*/
// Vue启用VueRouter
Vue.use(VueRouter);
// 路由History模式下的滚动处理
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        if (to.hash) {
            return { anchor: true };
        }
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return { x: 0, y: 0};
        }
    }
};
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [{
        path: '/',
        redirect: '/community'
    }, {
        name: 'index',
        path: '/',
        component: Main,
        children: [{
            name: 'community',
            path: 'community',
            component: Community
        }, {
            name: 'market',
            path: 'market',
            component: Market
        }, {
            name: 'cart',
            path: 'cart',
            component: Cart
        }, {
            name: 'mine',
            path: 'mine',
            component: Mine
        }]
    }, {
        name: 'threadDetail',
        path: '/thread/:id',
        component: ThreadDetail
    }, {
        name: 'test',
        path: '/test',
        component: Test
    }, {
        path: '*',
        component: NotFounded
    }]
});

/*========== vue-resource组件配置 ==========*/
// Vue启用VueResource
Vue.use(VueResource);
Vue.http.options.root = '/src/assets/dataNew';
Vue.http.options.emulateJSON = true;

/*========== MuseUI组件配置 ==========*/
Vue.use(MuseUI);

/*========== Vue-Awesome-Swipe组件配置 ==========*/
Vue.use(AwesomeSwiper);


/*========== 挂载Vue实例至EL ==========*/
new Vue({
    render: h => h(App),
    // 注入vue-router
    router,
    // 注入vuex的store
    store,
}).$mount('#app');

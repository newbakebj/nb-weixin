/**
 * 微网站入口
 * Created by ArthurZhang on 2016/11/27.
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './appNew.vue';
import MuseUI from 'muse-ui';  // 使用MuseUI
import 'muse-ui/dist/muse-ui.css';

/*========== 定义所有视图模块 ==========*/
const Community = () => System.import('./views/community.vue');
const Market = () => System.import('./views/market.vue');
const Cart = () => System.import('./views/cart.vue');
const Mine = () => System.import('./views/mine.vue');
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
        name: 'root',
        path: '/',
        component: Community
    }, {
        name: 'community',
        path: '/community',
        component: Community
    }, {
        name: 'market',
        path: '/market',
        component: Market
    }, {
        name: 'cart',
        path: '/cart',
        component: Cart
    }, {
        name: 'mine',
        path: '/mine',
        component: Mine
    }, {
        name: 'test',
        path: '/test',
        component: Test
    }]
});

/*========== vue-resource组件配置 ==========*/
// Vue启用VueResource
Vue.use(VueResource);
Vue.http.options.root = 'src/assets/data';
Vue.http.options.emulateJSON = true;

/*========== MuseUI组件配置 ==========*/
Vue.use(MuseUI);

/*========== 挂载Vue实例至EL ==========*/
new Vue({
    render: h => h(App),
    router
}).$mount('#app');
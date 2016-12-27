import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
// import community from './modules/community';

Vue.use(Vuex);
/*========== vue-resource组件配置 ==========*/
// Vue启用VueResource
Vue.use(VueResource);
Vue.http.options.root = '/src/assets/dataNew';
Vue.http.options.emulateJSON = true;

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        // community
    }
});
// 根域actions
import * as types from './mutation-types';
import Vue from 'vue';

export default {
    // 获取登录用户信息
    getAuth({commit}) {
        Vue.http.get('loginUserInfo.json')
            .then(response => {
                commit(types.SET_AUTH, response.data);
            });
    }
};
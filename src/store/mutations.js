// 根域Mutations

import * as types from './mutation-types';

export default {
    // 获取用户授权(登录信息)
    [types.SET_AUTH](state, userInfo) {
        state.loginUserInfo = userInfo;
    },
};
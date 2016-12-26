// 根域actions
import * as types from './mutation-types';

export default {
    // 显示/隐藏分享面板
    showOrHideShareSheet ({ commit }) {
        commit(types.SHOW_SHARE_SHEET);
    },
    // 显示/隐藏评论面板
    showOrHideCommentSheet ({ commit }) {
        commit(types.SHOW_COMMENT_SHEET);
    }
};
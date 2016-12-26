// 根域Mutations

import * as types from './mutation-types';

export default {
    // 显示/隐藏分享面板
    [types.SHOW_SHARE_SHEET](state) {
        state.isShareSheetShown = !state.isShareSheetShown;
    },
    // 显示/隐藏评论面板
    [types.SHOW_COMMENT_SHEET](state) {
        state.isCommentSheetShown = !state.isCommentSheetShown;
    }
};
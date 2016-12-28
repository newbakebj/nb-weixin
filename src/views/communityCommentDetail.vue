<!--评论详情页-->
<template>
    <div>
        <!--标题栏-->
        <div>
            <mu-appbar class="comment-comment-title-bar" title="评论详情">
                <mu-icon-button icon="navigate_before" slot="left" @click="$router.go(-1);"/>
                <mu-icon-menu icon="more_vert" slot="right">
                    <mu-menu-item title="关注" @click="focus(comment.author)"/>
                    <mu-menu-item title="拉黑" @click="block(comment.author)"/>
                </mu-icon-menu>
            </mu-appbar>
        </div>
        <!--根回复-->
        <div class="comment-comment">
            <mu-list>
                <mu-list-item :title="comment.author.name"
                              titleClass="comment-comment-title" :describeLine="5"
                              @click="peepRelatedComment(relatedComment)" disabled>
                    <div slot="leftAvatar" @click.stop="peepUser(comment.author)">
                        <mu-avatar :src="comment.author.avatar"/>
                    </div>
                    <div slot="describe">
                        <div>
                            {{ comment.content }}
                        </div>
                    </div>
                    <div>
                        <span class="comment-time">{{ comment.add_time | date(5) }}</span>
                    </div>
                    <div slot="right" class="comment-comment-replies"
                         :style="{color: (comment.like ? 'red' : '')}"
                         @click.stop="likeComment">
                        <mu-icon value="thumb_up" :size="14"/>
                        <span class="like-cnt">{{ comment.like_cnt }}</span>
                    </div>
                </mu-list-item>
            </mu-list>
        </div>
        <!--点赞人的头像列表-->
        <div class="comment-liker" v-show="0 != likers.total" @click.stop="peepLikers">
            <div class="liker-list">
                <span v-for="liker in likers.list">
                    <mu-avatar :src="liker.avatar"/>
                </span>
            </div>
            <div class="liker-total">
                <mu-flat-button :label="likers.total + '个人赞过'" icon="navigate_next" labelPosition="before"/>
            </div>
        </div>
        <!--针对回复的回复-->
        <div class="comment-comment" id="comment-comment">
            <mu-list>
                <mu-sub-header>全部评论</mu-sub-header>
                <mu-list-item :title="relatedComment.author.name" v-for="(relatedComment, index) in relatedComments"
                              titleClass="comment-comment-title" :describeLine="5"
                              @click="replyComment(relatedComment)">
                    <div slot="leftAvatar" @click.stop="peepUser(relatedComment.author)">
                        <mu-avatar :src="relatedComment.author.avatar"/>
                    </div>
                    <div slot="describe">
                        <div>
                            {{ relatedComment.content }}
                        </div>
                    </div>
                    <div class="comment-time">
                        <span>{{ relatedComment.add_time | date(5) }}</span>
                        ·
                        <span>{{ 0 == relatedComment.replies ? '回复' : relatedComment.replies + '条回复' }}</span>
                    </div>
                    <div slot="right" class="comment-comment-replies"
                         :style="{color: (relatedComment.like ? 'red' : '')}"
                         @click.stop="likeRelatedComment(relatedComment)">
                        <mu-icon value="thumb_up" :size="14"/>
                        <span class="like-cnt">{{ relatedComment.like_cnt }}</span>
                    </div>
                </mu-list-item>
            </mu-list>
        </div>
        <!--底部评论窗-->
        <div class="comment-comment-input">
            <div class="comment-input" @click="showCommentSheet">
                写评论...
            </div>
            <div class="comment-share">
                <span @click="likeComment(comment)">
                    <mu-avatar icon="thumb_up" :size="30" :style="{color: comment.like ? 'red' : ''}"/>
                </span>
                <span @click="isShareSheetShown = true;">
                    <mu-avatar icon="screen_share" :size="30"/>
                </span>
            </div>
        </div>

        <!--底部分享弹出面板-->
        <share-sheet :isShareSheetShown="isShareSheetShown" @closeShareSheet="isShareSheetShown = !isShareSheetShown;"/>

        <!--底部评论弹出窗-->
        <comment-sheet :isCommentSheetShown="isCommentSheetShown"
                       @closeCommentSheet="isCommentSheetShown = !isCommentSheetShown;"
                       @comment="commentComment" hintText="就知道你有意见..."/>
        <!--底部回复弹出窗-->
        <comment-sheet :isCommentSheetShown="isReplySheetShown"
                       @closeCommentSheet="isReplySheetShown = !isReplySheetShown;"
                       @comment="replyComment" hintText="回复..."/>
        <mu-dialog :open="isCommentDoneDialogShown"
                   :title="commentDoneMessage" @close="closeCommentDoneDialog"/>
    </div>
</template>

<script>
    import shareSheet from '../components/ShareSheet.vue';
    import commentSheet from '../components/CommentSheet.vue';

    export default {
        name: 'commentDetail',
        components: {
            'share-sheet': shareSheet,
            'comment-sheet': commentSheet
        },
        data() {
            return {
                comment: {
                    author: {}
                },
                likers: {
                    list: []
                },
                relatedComments: [],
                isCommentSheetShown: false,
                isCommentDoneDialogShown: false,
                isShareSheetShown: false,
                commentDoneMessage: null
            };
        },
        mounted() {
            this.queryCommentDetail();
            this.queryLikers();
            this.queryRelatedComment();
        },
        methods: {
            focus(user) {  // 关注用户
                user.focus = !user.focus;
                // TODO
                // 请求后台，增加关注记录或者变更关注记录
                console.log('focus: ');
                console.log(user);
            },
            block(user) {  // 拉黑用户
                user.block = !user.block;
                // TODO
                // 请求后台，增加关注记录或者变更关注记录
                console.log('block: ');
                console.log(user);
            },
            queryCommentDetail() {  // 根据ID获取评论详情
                this.$http.get('commentDetail.json', {
                    params: {
                        id: this.$route.params.id
                    }
                }).then((response) => {
                    this.comment = response.data;
                });
            },
            queryLikers() {  // 根据评论ID获取点赞人列表
                this.$http.get('commentLikers.json', {
                    params: {
                        id: this.$route.params.id
                    }
                }).then((response) => {
                    this.likers = response.data;
                });
            },
            peepLikers() {  // 查看当前评论的点赞人列表
                this.$router.push({
                    name: 'communityCommentLikerList',
                    params: {
                        id: this.$route.params.id
                    }
                });
            },
            queryRelatedComment() {  // 根据评论ID获取相关评论
                this.$http.get('commentRelatedComments.json', {
                    params: {
                        commentId: this.$route.params.id
                    }
                }).then((response) => {
                    this.relatedComments = response.data;
                })
            },
            likeComment() {
                this.comment.like = !this.comment.like;
                // TODO
                // 请求后台，增加点赞记录或者变更点赞记录
            },
            favoriteThread(comment) {
                comment.favorite = !comment.favorite;
                // TODO
                // 请求后台，增加收藏或者变更收藏记录
                console.log('favorite: ');
                console.log(comment);
            },
            replyComment(relatedComment) {  // 对某评论进行回复
                // TODO
                // 请求后台，增加回复记录
                console.log('reply comment: ');
                console.log(relatedComment)

            },
            peepUser(user) {
                // TODO
                // 打开用户空间页面
                console.log('user: ');
                console.log(user);
            },
            likeRelatedComment(relatedComment) {  // 对评论点赞
                relatedComment.like = !relatedComment.like;
                // TODO
                // 请求后台，增加点赞或者变更点赞记录
                console.log('like: ');
                console.log(relatedComment);
            },
            goCommentAnchor() {
                let anchor = this.$el.querySelector('#comment-comment');
                document.body.scrollTop = anchor.offsetTop;
            },
            showCommentSheet() {
                this.isCommentSheetShown = true;
            },
            commentComment(content) {
                let vm = this;
                vm.isCommentSheetShown = false;
                // TODO
                // 请求后台，增加评论记录
                let comment = {
                    id: "x",
                    thread_id: vm.comment.thread_id,
                    at_comment_id: vm.comment.id,
                    content: content,
                    add_time: new Date().getTime(),
                    author: this.$store.state.loginUserInfo,
                    replies: 0,
                    like_cnt: 0,
                    like: 0
                };
                vm.isCommentDoneDialogShown = true;
                vm.commentDoneMessage = '评论成功！';
                setTimeout(() => {
                    vm.closeCommentDoneDialog();
                }, 1500);
                vm.relatedComments.splice(0, 0, comment);
                vm.goCommentAnchor();
            },
            closeCommentDoneDialog() {
                this.isCommentDoneDialogShown = false;
            }
        }
    }
</script>

<style scoped>
    .comment-comment-title-bar {
        height: 48px;
    }

    .comment-liker {
        height: 60px;
        padding: 10px 10px;
        background: #e1e1e1;
    }
    .comment-liker .liker-list {
        width: 60%;
        height: 100%;
        float: left;
    }
    .comment-liker .liker-list span {
        display: inline-block;
        padding: 0 2px;
        height: 40px;
    }

    .comment-liker .liker-total {
        width: 40%;
        height: 100%;
        float: right;
        text-align: right;
        padding: 2px 0;
    }

    .comment-comment .comment-time {
        font-size: 12px;
        font-family: 宋体;
    }

    .comment-comment-replies {
        align-self: flex-start;
        padding-top: 13px;
    }

    .comment-comment-replies .like-cnt {
        display: inline-block;
        margin-left: 2px;
        float: right;
        line-height: 18px;
        font-size: 12px;
        font-family: 微软雅黑;
    }

    .comment-comment-input {
        height: 40px;
        position: fixed;
        bottom: 0;
        background: #e1e1e1;
        z-index: 1;
        padding: 5px 0 5px 20px;
        /*采用绝对定位，与相对定位冲突，需要单独处理宽度*/
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }

    .comment-comment-input .comment-input {
        width: 70%;
        float: left;
        border-radius: 30px;
        padding-left: 10px;
        background: #fff;
        line-height: 30px;
        height: 100%;
        color: #8e8e93;
    }

    .comment-comment-input .comment-share {
        width: 30%;
        float: right;
    }

    .comment-comment-input .comment-share span {
        margin-left: 5%;
        border-radius: 5px;
        display: inline-block;
        width: 45%;
        text-align: center;
    }

    .comment-comment-input .comment-share span:last-child {
        float: right;
    }

</style>

<style>
    .comment-comment-title-bar .mu-appbar-title {
        text-align: center;
    }

    .comment-comment {
        font-family: 黑体;
        margin-top: 10px;
    }

    .comment-comment-title {
        color: blue !important;
        font-weight: bold !important;
        font-size: 12px !important;
    }

    .comment-comment .mu-item-text {
        font-size: 13px;
        color: #000;
    }

    .comment-comment-input .comment-share em {
        top: 0;
    }
</style>
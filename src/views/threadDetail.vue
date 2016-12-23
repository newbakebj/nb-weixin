<!--主题帖子详情页-->
<template>
    <div>
        <div>
            <mu-appbar class="title-bar">
                <mu-icon-button icon="navigate_before" slot="left" @click="$router.go(-1);"/>
                <mu-icon-button icon="more_vert" slot="right" @click="$router.app.$emit('sharesheet', true);"/>
            </mu-appbar>
        </div>
        <div class="main-body">
            <!--主题详情-->
            <div>
                <div class="thread-title">{{ thread.title }}</div>
                <div class="thread-userinfo">
                    <div>
                        <mu-avatar :src="thread.author.avatar" :size="50"/>
                    </div>
                    <div class="thread-avatar-info">
                        <div>{{ thread.author.name }}</div>
                        <div>{{ thread.add_time }}</div>
                    </div>
                    <div class="focus">
                        <mu-raised-button label="关注" icon="add" primary/>
                    </div>
                </div>
                <div v-html="thread.content" class="thread-content"></div>
                <div class="thread-content-ps">
                    <p>本文来源于焙客<span class="author">{{ thread.author.name }}</span> | 未经许可禁止转载、摘编、复制及镜像等使用</p>
                    <p><span class="forward">欢迎转发、群发给你的朋友、朋友圈</span></p>
                    <p>本文为由牛焙网焙客发布，不代表牛焙网立场</p>
                </div>
                <div class="like-info">
                    <div>
                        <mu-raised-button :label="String(thread.like_cnt)" icon="thumb_up" class="feedback"
                                          :iconClass="{'checked': thread.like}" :labelClass="{'checked': thread.like}" @click="likeThread(thread)"/>
                    </div>
                    <div>
                        <mu-raised-button :label="String(thread.favorite_cnt)" icon="favorite" class="feedback"
                                          :iconClass="{'checked': thread.favorite}" :labelClass="{'checked': thread.favorite}" @click="favoriteThread(thread)"/>
                    </div>
                </div>
            </div>
            <mu-divider class="content-ad-divider"/>
            <!--相关商品-->
            <div class="related-good-swiper">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="relatedGood in relatedGoods">
                        <div>
                            <mu-grid-tile>
                                <img :src="relatedGood.image_src"/>
                                <span slot="title">{{ relatedGood.title }}</span>
                                <span slot="subTitle">{{ relatedGood.author }}</span>
                                <mu-icon-button icon="star_border" slot="action"/>
                            </mu-grid-tile>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!--主题回复-->
            <div class="thread-comment" id="thread-comment">
                <mu-list>
                    <mu-list-item :title="relatedComment.author.name" v-for="(relatedComment, index) in relatedComments"
                                  titleClass="thread-comment-title" :describeLine="5"
                                  @click="peepRelatedComment(relatedComment)">
                        <div slot="leftAvatar" @click.stop="peepUser(relatedComment.author)">
                            <mu-avatar :src="relatedComment.author.avatar"/>
                        </div>
                        <div slot="describe">
                            <div>
                                {{ relatedComment.content }}
                            </div>
                            <!--<div>-->
                            <!--一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前-->
                            <!--一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前一小时前-->
                            <!--</div>-->
                        </div>
                        <div slot="right" class="thread-comment-replies"
                             :style="{color: (relatedComment.like ? 'red' : '')}"
                             @click.stop="likeComment(relatedComment)">
                            <mu-icon value="thumb_up" :size="14"/>
                            <span class="like-cnt">{{ relatedComment.like_cnt }}</span>
                        </div>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>
        <!--底部评论窗-->
        <div class="thread-comment-input">
            <div class="comment-input" @click="comment(thread.id)">
                写评论...
            </div>
            <div class="comment-share">
                <!--<span><mu-avatar icon="comment" :size="30"/></span>-->
                <span @click.stop="goCommentAnchor">
                    <mu-badge content="10" secondary class="comment-badge">
                        <mu-avatar icon="comment" :size="30"/>
                    </mu-badge>
                </span>
                <span @click.stop="favoriteThread(thread)">
                    <mu-avatar icon="favorite" :size="30" :style="{color: thread.favorite ? 'red' : ''}"/>
                </span>
                <span @click.stop="$router.app.$emit('sharesheet', true);">
                    <mu-avatar icon="screen_share" :size="30"/>
                </span>
            </div>
        </div>

        <!--标题栏信息按钮弹出面板-->
        <share-sheet/>

        <!--评论弹出窗-->
        <comment-sheet/>
    </div>
</template>

<script>
    import shareSheet from '../components/ShareSheet.vue';
    import commentSheet from '../components/CommentSheet.vue';

    export default {
        name: 'threadDetail',
        components: {
            'share-sheet': shareSheet,
            'comment-sheet': commentSheet
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
//                vm.$router.app.$emit('bottomnav', false);
            });
        },
        data() {
            return {
                thread: {
                    // Vue嵌套对象需要对内部对象进行声明，否则不可进行响应式引用及使用
                    author: {}
                },
                author: {},
                relatedGoods: [],
                swiperOption: {
                    autoplay: 5000,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    mousewheelControl: true
                },
                relatedComments: []
            };
        },
        mounted() {
            this.queryThreadDetail();
            this.queryRelatedGood();
            this.queryRelatedComment();
        },
        methods: {
            queryThreadDetail() {  // 根据ID获取主题详情
                this.$http.get('threadDetail.json', {
                    params: {
                        id: this.$route.params.id
                    }
                }).then((response) => {
                    this.thread = response.data;
                    // 测试数据用，实际生产应该在发帖时将内容的HTML代码部分转义存储
                    this.thread.content = _.unescape(this.thread.content);
                });
            },
            queryRelatedGood() {  // 根据主题ID获取相关商品
                this.$http.get('relatedGoods.json', {
                    params: {
                        threadId: this.$route.params.id
                    }
                }).then((response) => {
                    this.relatedGoods = response.data;
                });
            },
            queryRelatedComment() {  // 根据主题ID获取相关评论
                this.$http.get('relatedComments.json', {
                    params: {
                        threadId: this.$route.params.id
                    }
                }).then((response) => {
                    this.relatedComments = response.data;
                })
            },
            likeThread(thread) {
                thread.like = !thread.like;
                // TODO
                // 请求后台，增加点赞记录或者变更点赞记录
            },
            favoriteThread(thread) {
                thread.favorite = !thread.favorite;
                // TODO
                // 请求后台，增加收藏或者变更收藏记录
                console.log('favorite: ' + thread);
            },
            peepRelatedComment(relatedComment) {  // 查看当前评论详情
                // TODO
                // 打开评论详情页面
                console.log('related comment: ' + relatedComment);
            },
            peepUser(user) {
                // TODO
                // 打开用户空间页面
                console.log('user: ' + user);
            },
            comment(threadId) {
                this.$router.app.$emit('commentsheet', true, threadId);
            },
            likeComment(relatedComment) {  // 对评论点赞
                relatedComment.like = !relatedComment.like;
                // TODO
                // 请求后台，增加点赞或者变更点赞记录
                console.log('like: ' + relatedComment);
            },
            goCommentAnchor() {
                let anchor = this.$el.querySelector('#thread-comment');
                document.body.scrollTop = anchor.offsetTop;
            }
        }
    }
</script>

<style scoped>
    .title-bar {
        height: 40px;
    }

    .main-body {
        padding: 0 14px 40px;
    }

    .thread-title {
        font-size: 22px;
        line-height: 24px;
        font-weight: bold;
        font-family: 微软雅黑;
        padding: 12px 0;
    }

    .thread-userinfo {
        padding: 5px 0 20px;
    }

    .thread-userinfo div:first-child {
        float: left;
        display: inline-block;
    }

    .thread-userinfo .thread-avatar-info {
        display: inline-block;
        margin-left: 5px;
    }

    .thread-userinfo .thread-avatar-info div:first-child {
        font-size: 16px;
        font-weight: bold;
        height: 30px;
        line-height: 35px;
        overflow: hidden;
    }

    .thread-userinfo .thread-avatar-info div:last-child {
        font-size: 10px;
    }

    .thread-userinfo .focus {
        float: right;
        line-height: 60px;
        overflow: hidden;
    }

    .thread-content {
        font-size: 14px;
        font-family: 黑体;
    }

    .thread-content-ps {
        margin-top: 30px;
        font-size: 12px;
    }

    .thread-content-ps .author {
        font-weight: bold;
        display: inline-block;
        padding: 0 5px;
    }

    .thread-content-ps .forward {
        font-weight: bold;
        display: inline-block;
        padding: 5px 0;
    }

    .thread-content-ps p:last-child {
        font-weight: 100;
    }

    .like-info {
        text-align: center;
        width: 100%;
    }

    .like-info div {
        width: 50%;
        margin: 20px 0;
    }

    .like-info div:first-child {
        float: left;
    }

    .like-info div:last-child {
        float: right;
    }

    .like-info .feedback {
        width: 100px;
        border-radius: 20px;
    }

    .content-ad-divider {
        height: 0;
    }

    .related-good-swiper {
        border: solid 1px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 12px;
        font-weight: bold;
        padding: 8px;
    }

    .related-good-swiper img {
        height: 150px;
        width: 100%;
        object-fit: cover
    }

    .thread-comment-replies {
        align-self: flex-start;
        padding-top: 13px;
    }

    .thread-comment-replies .like-cnt {
        display: inline-block;
        margin-left: 2px;
        float: right;
        line-height: 18px;
        font-size: 12px;
        font-family: 微软雅黑;
    }

    .thread-comment-input {
        width: 100%;
        height: 40px;
        position: fixed;
        bottom: 0;
        background: #e1e1e1;
        z-index: 1;
        padding: 5px 0 5px 20px;
    }

    .thread-comment-input .comment-input {
        width: 60%;
        float: left;
        border-radius: 30px;
        padding-left: 10px;
        background: #fff;
        line-height: 30px;
        height: 100%;
        color: #8e8e93;
    }
    .thread-comment-input .comment-share {
        width: 40%;
        float: right;
    }
    .thread-comment-input .comment-share span {
        margin-left: 2%;
        border-radius: 5px;
        display: inline-block;
        width: 25%;
        text-align: center;
    }
</style>
<style>
    .like-info .checked {
        color: red;
    }

    .thread-comment {
        font-family: 黑体;
        margin-top: 10px;
    }

    .thread-comment-title {
        color: blue !important;
        font-weight: bold !important;
        font-size: 12px !important;
    }

    .thread-comment .mu-item-text {
        font-size: 13px;
        color: #000;
    }
    .thread-comment-input .comment-share em{
        top: 0;
    }

</style>
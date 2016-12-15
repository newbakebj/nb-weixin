<template>
    <div class="m_width pb60">
        <div>
            <mu-appbar style="height: 40px">
                <mu-icon-button icon="navigate_before" slot="left" @click="$router.go(-1);"/>
                <mu-icon-button icon="more_vert" slot="right" @click="$router.app.$emit('popover', true);"/>
            </mu-appbar>
        </div>
        <div class="main_body">
            <!--主题详情-->
            <div>
                <div class="thread_title">{{ thread.title }}</div>
                <div class="thread_userinfo">
                    <div>
                        <mu-avatar :src="thread.author_avatar" :size="50"/>
                    </div>
                    <div class="thread_avatar_info">
                        <div>{{ thread.author_name }}</div>
                        <div>{{ thread.add_time }}</div>
                    </div>
                    <div class="focus">
                        <mu-raised-button label="关注" icon="add" primary/>
                    </div>
                </div>
                <div v-html="thread.content" class="thread_content"></div>
                <div class="thread_content_ps">
                    <p>本文来源于焙客<span class="author">{{ thread.author_name }}</span> | 未经许可禁止转载、摘编、复制及镜像等使用</p>
                    <p><span class="forward">欢迎转发、群发给你的朋友、朋友圈</span></p>
                    <p>本文为由牛焙网焙客发布，不代表牛焙网立场</p>
                </div>
                <div class="like_info">
                    <div>
                        <mu-raised-button :label="String(thread.like_cnt)" icon="thumb_up" class="like_btn"/>
                    </div>
                    <div>
                        <mu-raised-button :label="String(thread.favorite_cnt)" icon="favorite" class="like_btn"/>
                    </div>
                </div>
            </div>
            <mu-divider/>
            <!--相关商品-->
            <div>
                <swiper :options="swiperOption" class="related_good_swiper">
                    <swiper-slide v-for="relatedGood in relatedGoods">
                        <div>
                            <mu-grid-tile>
                                <img :src="relatedGood.image_src" style="width: 100%; height: 175px;"/>
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
            <div class="thread_comment">
                <mu-list>
                    <mu-list-item :title="relatedComment.author.name" v-for="(relatedComment, index) in relatedComments" titleClass="comment_title">
                        <mu-avatar :src="relatedComment.author.avatar" slot="leftAvatar"/>
                        <span slot="describe">
                            {{ relatedComment.content }}
                        </span>
                        <mu-icon-button slot="right" icon="thumb_up"/>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                thread: {},
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
                    this.$set(this.$data, 'thread', response.data);
                this.thread.content = _.unescape(this.thread.content);
            });
            },
            queryRelatedGood() {  // 根据主题ID获取相关商品
                this.$http.get('relatedGoods.json', {
                    params: {
                        threadId: this.$route.params.id
                    }
                }).then((response) => {
                    this.$set(this.$data, 'relatedGoods', response.data);
            });
            },
            queryRelatedComment() {  // 根据主题ID获取相关评论
                this.$http.get('relatedComments.json', {
                    params: {
                        threadId: this.$route.params.id
                    }
                }).then((response) => {
                    this.$set(this.$data, 'relatedComments', response.data);
            })
            }
        }
    }
</script>

<style scoped>
    .main_body {
        padding: 0 14px;
    }

    .thread_title {
        font-size: 22px;
        line-height: 24px;
        font-weight: bold;
        font-family: 微软雅黑;
        padding: 12px 0;
    }

    .thread_userinfo {
        padding: 5px 0 20px;
    }

    .thread_userinfo div:first-child {
        float: left;
        display: inline-block;
    }

    .thread_userinfo .thread_avatar_info {
        display: inline-block;
        margin-left: 5px;
    }

    .thread_userinfo .thread_avatar_info div:first-child {
        font-size: 16px;
        font-weight: bold;
        height: 30px;
        line-height: 35px;
        overflow: hidden;
    }

    .thread_userinfo .thread_avatar_info div:last-child {
        font-size: 10px;
    }

    .thread_userinfo .focus {
        float: right;
        line-height: 60px;
        overflow: hidden;
    }

    .thread_content {
        font-size: 14px;
        font-family: 黑体;
    }

    .thread_content_ps {
        margin-top: 30px;
        font-size: 12px;
    }

    .thread_content_ps .author {
        font-weight: bold;
        display: inline-block;
        padding: 0 5px;
    }

    .thread_content_ps .forward {
        font-weight: bold;
        display: inline-block;
        padding: 5px 0;
    }

    .thread_content_ps p:last-child {
        font-weight: 100;
    }

    .like_info {
        text-align: center;
        width: 100%;
    }

    .like_info div {
        width: 50%;
        margin: 20px 0;
    }

    .like_info div:first-child {
        float: left;
    }

    .like_info div:last-child {
        float: right;
    }

    .like_info .like_btn {
        width: 100px;
        border-radius: 20px;
    }

    .related_good_swiper {
        border: solid 1px rgba(0, 0, 0, 0.1);
        margin-top: 5px;
        font-size: 12px;
        font-weight: bold;
    }

    .related_good_swiper img {
        height: 150px;
        width: 100%;
        object-fit: cover
    }

    .comment_title {
        font-size: 14px !important;
        font-weight: bold !important;
        color: blue !important;
    }

</style>
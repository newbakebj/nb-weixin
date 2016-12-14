<template>
    <div class="m_width pb60">
        <div>
            <mu-appbar style="height: 40px">
                <mu-icon-button icon="navigate_before" slot="left"/>
                <mu-icon-button icon="more_vert" slot="right"/>
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

            </div>
            <!--相关商品-->
            <div></div>
            <!--主题回复-->
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                thread: {},
                relatedGoods: []
            };
        },
        mounted() {
            this.queryThreadDetail();
//            this.queryRelatedGood();
        },
        methods: {
            queryThreadDetail() {  // 根据ID获取主题详情
                this.$http.get('threadDetail.json', {
                    params: {
//                        id: this.$route.params.id
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
            }
        }
    }
</script>

<style scoped>
    .main_body {
        padding: 0 14px;
    }
    .thread_title {
        font-size: 20px; line-height: 24px; font-weight: bold; font-family: 微软雅黑; padding: 12px 0;
    }
    .thread_userinfo {
        padding: 5px 0 15px;
    }
    .thread_userinfo div:first-child {
        float: left; display: inline-block;
    }
    .thread_userinfo .thread_avatar_info {
        display: inline-block; margin-left: 5px;
    }
    .thread_userinfo .thread_avatar_info div:first-child {
        font-size: 16px; font-weight: bold; height: 30px; line-height: 35px; overflow: hidden;
    }
    .thread_userinfo .thread_avatar_info div:last-child {
        font-size: 10px;
    }
    .thread_userinfo .focus {
        float: right; line-height: 60px; overflow: hidden;
    }
    .thread_content {
        font-size: 14px;
        font-family: 黑体;
    }

</style>
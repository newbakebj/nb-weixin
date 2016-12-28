<!--评论的点赞人列表-->
<template>
    <div>
        <!--标题栏-->
        <div>
            <mu-appbar class="comment-liker-title-bar" title="赞过的人">
                <mu-icon-button icon="navigate_before" slot="left" @click="$router.go(-1);"/>
                <mu-icon-menu icon="" slot="right"/>
            </mu-appbar>
        </div>
        <!--点赞人列表-->
        <div class="comment-liker" id="likerList">
            <mu-list>
                <template v-for="liker in likers" >
                    <mu-list-item :title="liker.name" :describeLine="1" titleClass="comment-liker-title" @click="peepUser(liker)">
                        <mu-avatar :src="liker.avatar" slot="leftAvatar"/>
                        <span slot="describe">{{ liker.desc }}</span>
                    </mu-list-item>
                    <mu-divider/>
                </template>
            </mu-list>
        </div>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" loadingText="玩命加载中..." @load="loadMoreLiker"/>
    </div>
</template>

<script>
    export default {
        name: 'commentLiker',
        data() {
            return {
                likers: [],
                loading: false,
                scroller: null
            };
        },
        mounted() {
            this.$nextTick(function () {
                // 对响应级数据进行赋值将导致update响应(在本DOM)
                this.scroller = this.$el.querySelector('#likerList');
            });
            this.loadLiker();
        },
        methods: {
            loadLiker() {  // 根据评论ID获取点赞人列表
                this.$http.get('commentLikers.json', {  // 测试，暂时使用原commentLikers.json数据文件
                    params: {
                        id: this.$route.params.id
                    }
                }).then((response) => {
                    this.likers = response.data.list;
                });
            },
            loadMoreLiker() {
                this.loading = true;
                this.$http.get('commentLikersMore.json')
                    .then((response) => {
                        this.likers = this.likers.concat(response.data);
                        this.loading = false;
                    });
            },
            peepUser(user) {
                // TODO
                // 打开用户空间页面
                console.log('user: ');
                console.log(user);
            }
        }
    }
</script>

<style scoped>
    .comment-liker-title-bar {
        height: 48px;
    }

    .comment-liker {
        height: 1024px;
        overflow: auto;
        overflow-scrolling: touch;
    }
</style>

<style>
    .comment-liker-title-bar .mu-appbar-title {
        text-align: center;
    }

    .comment-liker-title {
        color: blue !important;
        font-weight: bold !important;
        font-size: 12px !important;
    }

    .comment-liker .mu-item-text {
        font-size: 13px;
        color: #000;
    }
</style>

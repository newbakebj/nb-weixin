<!--社区首页-->
<template>
    <div class="m_width pb60">
        <!--页头-->
        <div class="header m_width">
            <!--标题栏-->
            <mu-appbar>
                <mu-flat-button slot="left" :label="city" icon="arrow_drop_down" hoverColor="pink200" labelPosition="before"
                                class="city_choose" @click="selectCity"/>
                <mu-text-field slot="left" icon="search" hintText="寻找好帖" class="community_search"/>
                <mu-icon-button slot="right" icon="more_vert" @click="showSharePopup"/>
            </mu-appbar>
            <!--滑动容器，显示主要类目-->
            <swiper :options="swiperOption" class="category_swiper">
                <swiper-slide v-for="(category, index) in categories">
                    <a href="javascript:void(0);" :class="{ cur_swiper: (index == curSwiper) }"
                       @click="changeCategory(index, category.id)">{{ category.name }}</a>
                </swiper-slide>
            </swiper>
            <!--标题栏信息按钮弹出面板-->
            <mu-popup position="bottom" popupClass="share-to-popup m_width" :open="isShareToPopupShown"
                      @close="closeSharePopup">
                <table class="share_to_table">
                    <tr>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/wx_moments.png"/>
                            <br/>
                            <span>微信朋友圈</span>
                        </td>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/wx.png"/>
                            <br/>
                            <span>微信好友</span>
                        </td>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/qq.png"/>
                            <br/>
                            <span>QQ好友</span>
                        </td>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/qq_zone.png"/>
                            <br/>
                            <span>QQ空间</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/night.png"/>
                            <br/>
                            <span>夜间模式</span>
                        </td>
                        <td>
                            <img src="../../src/assets/img/bottom_popup/tip_off.png"/>
                            <br/>
                            <span>举报</span>
                        </td>
                    </tr>
                </table>
                <!--<mu-divider />-->
                <mu-raised-button label="取消" fullWidth @click="closeSharePopup"/>
            </mu-popup>
        </div>
        <!--帖子列表-->
        <div class="thread_list" id="threadList">
            <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refreshThread"/>
            <mu-list>
                <template v-for="thread in threads">
                    <mu-list-item @click="peepDetail(thread)">
                        <thread-formatter :thread="thread"/>
                    </mu-list-item>
                    <mu-divider class="thread_list_divider"/>
                </template>
            </mu-list>
            <mu-infinite-scroll :scroller="scroller" :loading="loading" loadingText="玩命加载中..." @load="loadMoreThread"/>
        </div>
    </div>
</template>
<script>
    import threadFormatter from '../components/ThreadFormatter.vue';

    export default {
        name: 'community',
        components: {
            'thread-formatter': threadFormatter
        },
        data() {
            return {
                city: '选择城市',
                isShareToPopupShown: false,
                swiperOption: {
                    autoHeight: true,
                    slidesPerView: 4,
                    spaceBetween: 2,
                    preventClickPropagation: true
                },
                curSwiper: 0,
                categories: [],
                threads: [],
                refreshing: false,
                trigger: null,
                loading: false,
                scroller: null,
                loadingText: '正在玩命加载...',
            };
        },
        mounted() {
            /*
             * 这里对父子Vue实例的生命周期理解不甚
             * 若直接对(DOM使用的)响应级成员进行赋值，如scroller、loading等，
             * 则会触发update，导致DOM更新
             * 但DOM更新时调用swiper的updated钩子
             * this.swiper为undefined
             * 因此在此将更新操作置于当前实例的nextTick中
             */
            this.$nextTick(function () {
                // 对响应级数据进行赋值将导致update响应(在本DOM)
                this.trigger = this.$el.querySelector('#threadList');
                this.scroller = this.$el.querySelector('#threadList');
            });
            this.loadCategory();
            this.loadThread();
        },
        methods: {
            selectCity() {
                alert('Selecting address.');
            },
            showSharePopup() {  // 显示Popover
                this.isShareToPopupShown = true;
            },
            closeSharePopup() {  // 关闭Popover
                this.isShareToPopupShown = false;
            },
            loadCategory() {  // 载入类目数据
                this.$http.get('categories.json')
                    .then((response) => {
                        this.$set(this.$data, 'categories', response.data);
                    });
            },
            changeCategory(index, categoryId) {  // 变更类目
                this.curSwiper = index;
            },
            loadThread() {  // 载入主题
                this.$http.get('threads.json')
                    .then((response) => {
                        this.$set(this.$data, 'threads', response.data);
                    });
            },
            refreshThread() {  // 下拉刷新
                this.refreshing = true;
//                loadThread();
                this.$http.get('threadsRecent.json')
                    .then((response) => {
                        let threadsNew = response.data;
                        this.$set(this.$data, 'threads', threadsNew.concat(this.threads));
                        this.refreshing = false;
                    });
            },
            loadMoreThread() {  // 加载更多主题
                this.loading = true;
                this.$http.get('threadsMore.json')
                    .then((response) => {
                        this.$set(this.$data, 'threads', this.threads.concat(response.data));
                        this.loading = false;
                    });
            },
            peepDetail(thread) {  // 查看详情
                this.$router.push({
                    name: 'threadDetail',
                    params: {
                        id: thread.id
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .header {
        position: fixed;
        top: 0;
        z-index: 1;
    }
    .city_choose {
        padding-left: 0;
        padding-right: 0 !important;
        color: #fff;
    }

    .city_choose .mu-flat-button-label {
        padding-left: 0;
        padding-right: 0 !important;
    }

    .community_search {
        font-size: 13px;
        width: 200px;
    }

    .community_search .mu-text-field-input {
        color: #fff;
    }

    .community_search i {
        margin-top: 5px;
    }

    .share-to-popup {
        color: red;
    }

    .share_to_table {
        width: 100%;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        color: #000;
    }

    .share_to_table td {
        padding: 5px 5px;
        height: 75px;
    }

    .share_to_table img {
        width: auto;
        height: auto;
        max-width: 95%;
        max-height: 95%;
        border-radius: 50%;
    }

    .share_to_table br {
        line-height: 0;
    }

    .share_to_table span {
        display: block;
        margin-top: -5px;
        font-size: 10px;
    }

    .category_swiper {
        padding: 10px 10px;
        text-align: center;
        font-size: 12px;
        background: #e4e4e4;
    }

    .category_swiper a {
        color: #000;
    }

    .cur_swiper {
        color: #ff5252 !important;
        font-weight: bold;
        border-bottom: #ff5252 1px solid;
    }

    .thread_list {
        margin-top: 100px;
        height: 1024px;
        overflow: auto;
        overflow-scrolling: touch;
    }
    .thread_list .mu-item {
        padding: 12px !important;
    }
    .thread_list .thread_list_divider {
        width: 97%;
        margin: auto !important;
    }
</style>
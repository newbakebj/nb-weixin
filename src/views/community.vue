<!--社区首页-->
<template>
    <div class="m_width">
        <!--标题栏-->
        <mu-appbar>
            <mu-flat-button slot="left" :label="city" icon="arrow_drop_down" hoverColor="pink200" labelPosition="before" class="city_choose" @click="selectCity"/>
            <mu-text-field slot="left" icon="search" hintText="寻找好帖" class="community_search"/>
            <mu-icon-button slot="right" icon="more_vert" @click="showSharePopup"/>
        </mu-appbar>
        <!--滑动容器，显示主要类目-->
        <swiper :options="swiperOption" class="category_swiper">
            <swiper-slide v-for="(category, index) in categories">
                <a href="javascript:void(0);" :class="{ cur_swiper: (index == curSwiper) }" @click="changeCategory(index, category.category_id)">{{ category.category_name }}</a>
            </swiper-slide>
        </swiper>
        <!--帖子列表-->
        <mu-list>
            <template v-for="post in posts">
                <mu-list-item>
                    <post-formatter :post="post"/>
                </mu-list-item>
                <mu-divider/>
            </template>
        </mu-list>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMorePost"/>

        <!--标题栏信息按钮弹出面板-->
        <mu-popup position="bottom" popupClass="share-to-popup m_width" :open="isShareToPopupShown" @close="closeSharePopup" >
            <table class="share_to_table">
                <tr>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/wx_moments.png" />
                        <br/>
                        <span>微信朋友圈</span>
                    </td>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/wx.png" />
                        <br/>
                        <span>微信好友</span>
                    </td>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/qq.png" />
                        <br/>
                        <span>QQ好友</span>
                    </td>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/qq_zone.png" />
                        <br/>
                        <span>QQ空间</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/night.png" />
                        <br/>
                        <span>夜间模式</span>
                    </td>
                    <td>
                        <img src="../../src/assets/img/bottom_popup/tip_off.png" />
                        <br/>
                        <span>举报</span>
                    </td>
                </tr>
            </table>
            <!--<mu-divider />-->
            <mu-raised-button label="取消" fullWidth @click="closeSharePopup" />
        </mu-popup>
    </div>
</template>
<script>
    import postFormatter from '../components/PostFormatter.vue';

    export default {
        name: 'community',
        components: {
            'post-formatter': postFormatter
        },
        data() {
            const posts = [{
                title: 'post1',
                content: '<h1>post1</h1>'
            }, {
                title: 'post2',
                content: '<h1>post2</h1>'
            }, {
                title: 'post3',
                content: '<h1>post3</h1>'
            }, {
                title: 'post4',
                content: '<h1>post4</h1>'
            }, {
                title: 'post5',
                content: '<h1>post5</h1>'
            }, {
                title: 'post6',
                content: '<h1>post6</h1>'
            }, {
                title: 'post7',
                content: '<h1>post7</h1>'
            }, {
                title: 'post8',
                content: '<h1>post8</h1>'
            }, {
                title: 'post9',
                content: '<h1>post9</h1>'
            }, {
                title: 'post10',
                content: '<h1>post10</h1>'
            }];

            return {
                city: '选择城市',
                isShareToPopupShown: false,
                swiperOption: {
                    grabCursor: true,
                    autoHeight: true,
                    slidesPerView: 4,
                    spaceBetween: 2,
                    preventClickPropagation: true
                },
                curSwiper: 0,
                categories: [{
                    category_id: 0,
                    category_name: '烘焙基础'
                }, {
                    category_id: 1,
                    category_name: '手法技巧'
                }, {
                    category_id: 2,
                    category_name: '最新菜谱'
                }, {
                    category_id: 3,
                    category_name: '经验心得'
                }, {
                    category_id: 4,
                    category_name: '烘焙基础'
                }, {
                    category_id: 5,
                    category_name: '手法技巧'
                }, {
                    category_id: 6,
                    category_name: '最新菜谱'
                }, {
                    category_id: 7,
                    category_name: '经验心得'
                }],
                posts : posts,
                loading: false,
                scroller: null
            };
        },
        mounted() {
            this.scroller = this.$el;
        },
        methods: {
            selectCity() {
                alert('Selecting address.');
            },
            showSharePopup() {
                this.isShareToPopupShown = true;
            },
            closeSharePopup() {
                this.isShareToPopupShown = false;
            },
            changeCategory(index, categoryId) {
                this.curSwiper = index;
            },
            loadMorePost() {
                this.loading = true;
                // TODO
                // 通过异步从后台获取列表数据
            }

        }
    }
</script>
<style>
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
        width: 160px;
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
        width:auto;
        height:auto;
        max-width:95%;
        max-height:95%;
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


</style>
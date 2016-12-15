<template>
    <mu-flexbox orient="vertical">
        <mu-flexbox-item>
            <!--主显示区-->
            <transition :name="transitionName">
                <router-view class="main-router-view"></router-view>
            </transition>
            <!--标题栏信息按钮弹出面板-->
            <mu-popup position="bottom" popupClass="share-to-popup m_width" :open="isShareToPopupShown"
                      @close="closeSharePopup">
                <table class="share_to_table">
                    <tr>
                        <td>
                            <img src="/src/assets/img/bottom_popup/wx_moments.png"/>
                            <br/>
                            <span>微信朋友圈</span>
                        </td>
                        <td>
                            <img src="/src/assets/img/bottom_popup/wx.png"/>
                            <br/>
                            <span>微信好友</span>
                        </td>
                        <td>
                            <img src="/src/assets/img/bottom_popup/qq.png"/>
                            <br/>
                            <span>QQ好友</span>
                        </td>
                        <td>
                            <img src="/src/assets/img/bottom_popup/qq_zone.png"/>
                            <br/>
                            <span>QQ空间</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="/src/assets/img/bottom_popup/night.png"/>
                            <br/>
                            <span>夜间模式</span>
                        </td>
                        <td>
                            <img src="/src/assets/img/bottom_popup/tip_off.png"/>
                            <br/>
                            <span>举报</span>
                        </td>
                    </tr>
                </table>
                <!--<mu-divider />-->
                <mu-raised-button label="取消" fullWidth @click="closeSharePopup"/>
            </mu-popup>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <!--底部导航栏-->
            <mu-paper class="bottom-nav m_width" id="bottomNav">
                <mu-bottom-nav :value="bottomNav" shift @change="changeBottomNav">
                    <mu-bottom-nav-item value="community" title="社区" icon="camera"/>
                    <mu-bottom-nav-item value="market" title="商城" icon="shopping_basket"/>
                    <mu-bottom-nav-item value="cart" title="购物车" icon="shopping_cart"/>
                    <mu-bottom-nav-item value="mine" title="我的" icon="account_circle"/>
                </mu-bottom-nav>
            </mu-paper>
        </mu-flexbox-item>
    </mu-flexbox>
</template>

<script>
    export default {
        data () {
            return {
                transitionName: 'slide-left',
                bottomNav: 'community',
                isShareToPopupShown: false
            };
        },
        mounted() {
            let vm = this;
            this.$router.app.$on('popover', function(show) {
                vm.isShareToPopupShown = show;
            });
        },
        methods: {
            changeBottomNav (val) {
                this.bottomNav = val;
                this.$router.push({ name: val });
            },
            showSharePopup(show) {
                this.isShareToPopupShown = show;
            },
            closeSharePopup() {  // 关闭Popover
                this.isShareToPopupShown = false;
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            }
        }
    }
</script>

<style>
    .bottom-nav {
        position: fixed;
        bottom: 0;
    }
    .main-router-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        transform: translate(-30px, 0);
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
</style>


<template>
    <mu-flexbox orient="vertical">
        <mu-flexbox-item>
            <!--主显示区-->
            <!--<div id="mainView"></div>-->
            <transition :name="transitionName">
                <router-view class="main-router-view"></router-view>
            </transition>
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
                bottomNav: 'mine'
            };
        },
        methods: {
            changeBottomNav (val) {
                this.bottomNav = val;
                this.$router.push({ name: val });
            }
        },
        watch: {
            '$route' (to, from) {
                console.log(to);
                console.log(from);
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
</style>


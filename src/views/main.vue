<!--首页路由区-->
<template>
    <div>
        <!--主显示区-->
        <transition :name="transitionName">
            <router-view class="main-router-view pb60"></router-view>
        </transition>

        <!--底部导航栏-->
        <mu-paper class="bottom-nav" id="bottomNav">
            <mu-bottom-nav :value="bottomNav" shift @change="changeBottomNav">
                <mu-bottom-nav-item value="community" title="社区" icon="camera"/>
                <mu-bottom-nav-item value="market" title="商城" icon="shopping_basket"/>
                <mu-bottom-nav-item value="cart" title="购物车" icon="shopping_cart"/>
                <mu-bottom-nav-item value="mine" title="我的" icon="account_circle"/>
            </mu-bottom-nav>
        </mu-paper>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: 'slide-right',
                bottomNav: 'community',
                navItems: {
                    community: 0,
                    market: 1,
                    cart: 2,
                    mine: 3
                }
            };
        },
        methods: {
            changeBottomNav (val) {
                let navItems = this.navItems;
                let bottomNav = this.bottomNav;
                this.transitionName = navItems[bottomNav] > navItems[val] ? 'slide-left' : 'slide-right';
                this.bottomNav = val;
                this.$router.push({name: val});
            },
        }
    }
</script>

<style scoped>
    .main-router-view {
        /*position: absolute;*/
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        transform: translate(-30px, 0);
    }

    .bottom-nav {
        position: fixed;
        bottom: 0;
        /*采用绝对定位，与相对定位冲突，需要单独处理宽度*/
        width: 100%;
        min-width: 320px;
        max-width: 750px;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
</style>



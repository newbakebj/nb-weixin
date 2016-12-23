<template>
    <div class="sys-container">
        <!--首级路由主区-->
        <transition :name="transitionName">
            <router-view class="index-router-view container"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-left'
            };
        },
        watch: {
            $route(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            }
        }
    }
</script>

<style>
    .index-router-view {
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
</style>


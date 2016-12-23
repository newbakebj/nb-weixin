<!--帖子格式化组件-->
<!--用于根据帖子内容分成视频帖、文字帖、图片帖-->
<template>
    <!--<div v-html="threadHtml"></div>-->
    <component :is="currentThreadType" :thread="thread"/>
</template>

<script>
    let textThreadComponent = {
        template: '' +
        '<div class="text-thread">' +
        '<div class="text-thread-title">' +
        '<table class="formatter-thread-title">' +
        '<tr><td>{{ thread.title }}</td></tr>' +
        '</table>' +
        '</div>' +
        '<div class="formatter-thread-avatar">' +
        '<div class="avatar">' +
        '<span><mu-avatar slot="left" :src="thread.author.avatar" :iconSize="21" :size="21" color="pink500"/></span>' +
        '<span>{{ thread.author.name }}</span>' +
        '</div>' +
        '<div class="likes"><span>{{ thread.like_cnt }}赞</span><span>{{ thread.replies }}评论</span></div>' +
        '</div>' +
        '</div>' ,
        /*
         * 若为运行时构建，则需要使用render而不是template
         * render中可引入插件babel-plugin-transform-vue-jsx
         * 实现类似于下面的jsx语法支持
         */
//        render(h) {
//            return '<div>{thread.title}</div>';
//        },
        props: ['thread']
    };
    let imageThreadComponent = {
        template: '' +
        '<div class="formatter-image-thread">' +
        '<div class="formatter-image-thread-left">' +
        '<div class="formatter-image-thread-title">' +
        '<table class="formatter-thread-title">' +
        '<tr><td>{{ thread.title }}</td></tr>' +
        '</table>' +
        '</div>' +
        '<div class="formatter-image-thread-avatar">' +
        '<div class="avatar">' +
        '<span><mu-avatar slot="left" :src="thread.author.avatar" :iconSize="21" :size="21" color="pink500"/></span>' +
        '<span>{{ thread.author.name }}</span>' +
        '</div>' +
        '<div class="likes"><span>{{ thread.like_cnt }}赞</span><span>{{ thread.replies }}评论</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="formatter-image-thread-right">' +
        '<img :src="thread.image_src" class="image"/>' +
        '<div class="image-cnt" v-show="1 < thread.image_cnt"><span>{{ thread.image_cnt }}图</span></div>' +
        '</div>' +
        '</div>' ,
        props: ['thread']
    };
    let videoThreadComponent = {
        template: '' +
        '<div class="video-thread">' +
        '<div class="formatter-video-thread-title">{{ thread.title }}</div>' +
        '<div class="formatter-video-thread-frame">' +
        '<video :src="thread.video_src" controls="controls" width="100%">您的浏览器不支持 video 标签。</video>' +
        '</div>' +
        '<div class="formatter-thread-avatar">' +
        '<div class="avatar">' +
        '<span><mu-avatar slot="left" :src="thread.author.avatar" :iconSize="21" :size="21" color="pink500"/></span>' +
        '<span>{{ thread.author.name }}</span>' +
        '</div>' +
        '<div class="likes"><span>{{ thread.like_cnt }}赞</span><span>{{ thread.replies }}评论</span></div>' +
        '</div>' +
        '</div>' ,
        props: ['thread']
    };
    let componentMap = {
        'text': 'textThreadComponent',
        'image': 'imageThreadComponent',
        'video': 'videoThreadComponent'
    };
    export default {
        name: 'threadFormatter',
        props: [
            'thread'
        ],
        data() {
            return {};
        },
        computed: {
//            threadHtml() {
//                let thread = this.thread;
//                let html = '';
//                switch (thread.type) {
//                    case 'text':
//                        html = '';
//                        break;
//                    case 'image':
//                        html = '';
//                        break;
//                    case 'video':
//                        html = '';
//                        break;
//                    default:
//                        break;
//                }
//                return html;
//            },
            currentThreadType() {
                return componentMap[this.thread.type];
            }
        },
        components: {
            textThreadComponent,
            imageThreadComponent,
            videoThreadComponent
        }
    }
</script>

<!--置于scoped范围后不可用，故不加scoped。只在所有样式加全局区分前缀-->
<style>
    .formatter-thread-title {
        height: 100%; font-size: 14px; font-weight: bold; line-height: 22px;
    }
    .formatter-thread-title td {
        vertical-align: middle;
    }
    .formatter-thread-avatar {
        margin-top: 5px; width: 100%;
    }
    .formatter-thread-avatar span {
        display: inline-block; line-height: 25px; height: 22px; overflow: hidden; font-size: 10px;
    }
    .formatter-thread-avatar .avatar {
        display: inline-block; float: left; width: 60%;
    }
    .formatter-thread-avatar .likes {
        display: inline-block; float: right; width: 20%;
    }
    .formatter-thread-avatar .likes span {
        display: inline-block; width: 50%; text-align: right;
    }
    .formatter-image-thread {
        height: 90px;
    }
    .formatter-image-thread-left {
        height: 100%; width: 60%; float: left;
    }
    .formatter-image-thread-title {
        height: 75%;
    }
    .formatter-image-thread-avatar {
        height: 20%; margin-top: 5px; width: 100%;
    }
    .formatter-image-thread-avatar span {
        display: inline-block; line-height: 25px; height: 22px; overflow: hidden; font-size: 10px;
    }
    .formatter-image-thread-avatar .avatar {
        display: inline-block; float: left; width: 60%;
    }
    .formatter-image-thread-avatar .likes {
        display: inline-block; float: right; width: 40%;
    }
    .formatter-image-thread-avatar .likes span {
        display: inline-block; width: 45%; text-align: right;
    }
    .formatter-image-thread-right {
        float: right; width: 35%;
    }
    .formatter-image-thread-right img {
        width: 100%; height: 90px; object-fit: cover
    }
    .formatter-image-thread-right .image-cnt {
        position: absolute;
        bottom: 30px;
        right: 30px;
        font-size: 11px;
        font-weight: bold;
        background-color: rgba(0,0,0,0.6);
        padding: 0 12px;
        border-radius: 10px;
    }
    .formatter-image-thread-right .image-cnt span {
        color: #fff;
    }
    .formatter-video-thread-title {
        font-size: 14px; font-weight: bold; line-height: 22px;
    }
    .formatter-video-thread-frame {
        width: 100%;
    }
</style>
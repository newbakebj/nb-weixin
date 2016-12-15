<!--帖子格式化组件-->
<!--用于根据帖子内容分成视频帖、文字帖、图片帖-->
<template>
    <!--<div v-html="threadHtml"></div>-->
    <component :is="currentThreadType" :thread="thread"/>
</template>

<script>
    let textThreadComponent = {
        template: '' +
        '<div class="text_thread">' +
        '<div class="text_thread_title">' +
        '<table class="thread_title">' +
        '<tr><td>{{ thread.title }}</td></tr>' +
        '</table>' +
        '</div>' +
        '<div class="thread_avatar">' +
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
        '<div class="image_thread">' +
        '<div class="image_thread_left">' +
        '<div class="image_thread_title">' +
        '<table class="thread_title">' +
        '<tr><td>{{ thread.title }}</td></tr>' +
        '</table>' +
        '</div>' +
        '<div class="image_thread_avatar">' +
        '<div class="avatar">' +
        '<span><mu-avatar slot="left" :src="thread.author.avatar" :iconSize="21" :size="21" color="pink500"/></span>' +
        '<span>{{ thread.author.name }}</span>' +
        '</div>' +
        '<div class="likes"><span>{{ thread.like_cnt }}赞</span><span>{{ thread.replies }}评论</span></div>' +
        '</div>' +
        '</div>' +
        '<div class="image_thread_right">' +
        '<img :src="thread.image_src" class="image"/>' +
        '<div class="image_cnt" v-show="1 < thread.image_cnt"><span>{{ thread.image_cnt }}图</span></div>' +
        '</div>' +
        '</div>' ,
        props: ['thread']
    };
    let videoThreadComponent = {
        template: '' +
        '<div class="video_thread">' +
        '<div class="video_thread_title">{{ thread.title }}</div>' +
        '<div class="video_thread_frame">' +
        '<video :src="thread.video_src" controls="controls" width="100%">您的浏览器不支持 video 标签。</video>' +
        '</div>' +
        '<div class="thread_avatar">' +
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

<style>
    .thread_title {
        height: 100%; font-size: 14px; font-weight: bold; line-height: 22px;
    }
    .thread_title td {
        vertical-align: middle;
    }
    .thread_avatar {
        margin-top: 5px; width: 100%;
    }
    .thread_avatar span {
        display: inline-block; line-height: 25px; height: 22px; overflow: hidden; font-size: 10px;
    }
    .thread_avatar .avatar {
        display: inline-block; float: left; width: 60%;
    }
    .thread_avatar .likes {
        display: inline-block; float: right; width: 20%;
    }
    .thread_avatar .likes span {
        display: inline-block; width: 50%; text-align: right;
    }
    .image_thread {
        height: 90px;
    }
    .image_thread_left {
        height: 100%; width: 60%; float: left;
    }
    .image_thread_title {
        height: 75%;
    }
    .image_thread_avatar {
        height: 20%; margin-top: 5px; width: 100%;
    }
    .image_thread_avatar span {
        display: inline-block; line-height: 25px; height: 22px; overflow: hidden; font-size: 10px;
    }
    .image_thread_avatar .avatar {
        display: inline-block; float: left; width: 60%;
    }
    .image_thread_avatar .likes {
        display: inline-block; float: right; width: 40%;
    }
    .image_thread_avatar .likes span {
        display: inline-block; width: 45%; text-align: right;
    }
    .image_thread_right {
        float: right; width: 35%;
    }
    .image_thread_right img {
        width: 100%; height: 90px; object-fit: cover
    }
    .image_thread_right .image_cnt {
        position: absolute;
        bottom: 30px;
        right: 30px;
        font-size: 11px;
        font-weight: bold;
        background-color: rgba(0,0,0,0.6);
        padding: 0 12px;
        border-radius: 10px;
    }
    .image_thread_right .image_cnt span {
        color: #fff;
    }
    .video_thread_title {
        font-size: 14px; font-weight: bold; line-height: 22px;
    }
    .video_thread_frame {
        width: 100%;
    }
</style>
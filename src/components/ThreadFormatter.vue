<!--帖子格式化组件-->
<!--用于根据帖子内容分成视频帖、文字帖、图片帖-->
<template>
    <!--<div v-html="threadHtml"></div>-->
    <component :is="currentThreadType" :thread="thread">
    </component>
</template>

<script>
    let textThreadComponent = {
        template: '' +
        '<div>' +
        '<div class="thread_title_text">' +
        '<div>{{ thread.title }}</div>' +
        '</div>' +
        '<div class="thread_brief">' +
        '<div class="thread_author_info">' +
        '<span class="thread_author_avatar"><mu-avatar slot="left" icon="folder" :size="20"/></span>' +
        '<span class="thread_author_name">{{ thread.author_name }}</span>' +
        '</div>' +
        '<div class="thread_replies_info">' +
        '<mu-icon value="thumb_up" :size="18"/>' +
        '<span class="thread_replies">{{ thread.replies }}</span>' +
        '</div>' +
        '<div class="thread_addtime_info">' +
        '<span class="thread_addtime">{{ thread.add_time }}</span>' +
        '</div>' +
        '</div>' +
        '</div>',
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
        '<div>' +
        '<div class="thread_title_image">' +
        '<div>{{ thread.title }}</div>' +
//        '<div><img :src="thread.image_src"/><span>{{ thread.image_cnt }}</span></div>' +
        '<div><img :src="thread.image_src"/></div>' +
        '</div>' +
        '<div class="thread_brief">' +
        '<div class="thread_author_info">' +
        '<span class="thread_author_avatar"><mu-avatar slot="left" icon="folder" :size="20"/></span>' +
        '<span class="thread_author_name">{{ thread.author_name }}</span>' +
        '</div>' +
        '<div class="thread_replies_info">' +
        '<mu-icon value="thumb_up" :size="18"/>' +
        '<span class="thread_replies">{{ thread.replies }}</span>' +
        '</div>' +
        '<div class="thread_addtime_info">' +
        '<span class="thread_addtime">{{ thread.add_time }}</span>' +
        '</div>' +
        '</div>' +
        '</div>',
        props: ['thread']
    };
    let videoThreadComponent = {
        template: '' +
        '<div>' +
        '<div class="thread_title_video">' +
        '<video><source :src="thread.video_src" type="video/mp4"/></video><span>{{ thread.image_cnt }}</span>' +
        '</div>' +
        '<div class="thread_brief">' +
        '<div class="thread_author_info">' +
        '<span class="thread_author_avatar"><mu-avatar slot="left" icon="folder" :size="20"/></span>' +
        '<span class="thread_author_name">{{ thread.author_name }}</span>' +
        '</div>' +
        '<div class="thread_replies_info">' +
        '<mu-icon value="thumb_up" :size="18"/>' +
        '<span class="thread_replies">{{ thread.replies }}</span>' +
        '</div>' +
        '<div class="thread_addtime_info">' +
        '<span class="thread_addtime">{{ thread.add_time }}</span>' +
        '</div>' +
        '</div>' +
        '</div>',
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
    .thread_title_text {
        min-height: 30px;
        max-height: 50px;
        width: 100%;
        font-size: 15px;
        font-weight: bold;
    }
    .thread_title_image div:first-child {
        font-size: 15px;
        font-weight: bold;
        width: 75%;
        float: left;
    }
    .thread_title_image  div:last-child {
        float: right;
        width: 25%;
    }
    .thread_title_image img {
        width: auto;
        max-width: 100%;
    }

    .thread_brief {
        width: 100%;
        display: inline-block;
    }
    .thread_author_info {
        width: 55%;
        float: left;
    }
    .thread_replies_info {
        width: 20%;
        float: left;
    }
    .thread_addtime_info {
        width: 20%;
        float: right;
        text-align: right;
    }

    .thread_replies {
        font-weight: bold;
    }


    .thread_brief span {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        font-size: 12px;
    }
    .thread_brief .thread_author_name {
        margin-left: 5px;
        font-size: 13px;
        font-weight: bold;
    }

</style>
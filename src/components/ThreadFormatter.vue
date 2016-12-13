<!--帖子格式化组件-->
<!--用于根据帖子内容分成视频帖、文字帖、图片帖-->
<template>
    <!--<div v-html="threadHtml"></div>-->
    <!--<component :is="currentThreadType" :thread="thread"/>-->

    <div style="height: 90px">
        <div style="height: 100%; width: 60%; float: left">
            <div style="height: 75%">
                <table style="height: 100%; font-size: 14px; font-weight: bold; line-height: 22px">
                    <tr><td style="vertical-align: middle">这是测试代码这是测试代码这是测试代码这是测试代码这是测试代码</td></tr>
                </table>
            </div>
            <div style="height: 20%; margin-top: 5px;">
                <span style="display: inline-block; margin-left: 5px;"><mu-avatar slot="left" icon="folder" :iconSize="18" :size="18" color="pink500"/></span>
                <span style="display: inline-block; line-height: 22px; height: 22px; overflow: hidden; font-size: 10px;">大轮明王鸠摩智是也</span>
                <span style="display: inline-block; float: right; line-height: 22px; height: 22px; overflow: hidden; font-size: 10px;">12评论</span></div>
        </div>
        <div style="float: right; width: 35%;">
            <img src="../assets/image/threadTest.jpg" style="width: 100%; height: 90px; object-fit: cover"/>
        </div>
    </div>

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
        '<div class="thread_image">' +
        '<div class="thread_image_left">' +
        '<div class="thread_image_title">' +
        '</div>' ,
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

</style>
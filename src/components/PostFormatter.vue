<!--帖子格式化组件-->
<!--用于根据帖子内容分成视频帖、文字帖、单图片帖、多图片帖-->
<template>
    <div>{{ post.content }}</div>
</template>

<script>
    export default {
        name: 'postFormatter',
        props: [
            'post'
        ]

    }
</script>

<style>

</style>
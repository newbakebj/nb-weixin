<!--社区评论底部弹出窗，用于输入评论-->
<template>
    <div>
        <!--评论弹出窗-->
        <mu-bottom-sheet :open="isCommentSheetShown" @close="closeCommentSheet">
            <div class="comment-sheet-sheet">
                <div class="comment">
                    <mu-text-field hintText="就知道你有意见..." fullWidth multiLine :rows="4" :rowsMax="6" v-model="content"/>
                </div>
            </div>
            <div class="comment-sheet-submit">
                <mu-raised-button label="发表" primary @click="comment"/>
            </div>
        </mu-bottom-sheet>
    </div>
</template>

<script>
    export default {
        name: 'commentSheet',
        props: [],
        data() {
            return {
                isCommentSheetShown: false,
                threadId: null,
                atCommentId: null,
                content: null,
            };
        },
        mounted() {
            let vm = this;
            this.$router.app.$on('commentsheet', function (show, threadId, atCommentId) {
                vm.isCommentSheetShown = show;
                vm.threadId = threadId;
                vm.atCommentId = atCommentId;
            });
        },
        methods: {
            showCommentSheet(show) {
                this.isCommentSheetShown = show;
            },
            closeCommentSheet() {  // 关闭commentSheet
                this.isCommentSheetShown = false;
            },
            comment() {  // 进行评论
                // TODO
                // 请求后台，增加评论，完成后通知
                console.log('threadId: ' + this.threadId + ', atCommentId: ' + this.atCommentId + ', content: ' + this.content);
            }
        }
    }
</script>

<style>
    .comment-sheet-sheet {
        padding: 10px;
        background: #e1e1e1;
    }

    .comment-sheet-sheet .comment {
        background: #fff;
        border-radius: 5px;
    }
    .comment-sheet-submit {
        background: #e1e1e1;
        float: right !important;
        width: 100%;
        padding-right: 10px;
        padding-bottom: 10px;
    }
    .comment-sheet-submit button {
        float: right;
    }
</style>
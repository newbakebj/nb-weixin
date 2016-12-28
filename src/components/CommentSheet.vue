<!--社区评论底部弹出窗，用于输入评论-->
<!--由于封装Muse-UI组件，暂时采用紧耦合。-->
<!--Required:-->
<!--Prop: isCommentSheetShown; Event: closeCommentSheet-->
<!--Others-->
<!--Event: comment-->
<template>
    <div>
        <!--评论弹出窗-->
        <mu-bottom-sheet :open="isCommentSheetShown" @close="closeCommentSheet">
            <div class="comment-sheet-sheet">
                <div class="comment">
                    <mu-text-field :hintText="hintText" fullWidth multiLine :rows="4" :rowsMax="6" v-model="content"/>
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
        props: [
            'isCommentSheetShown',
            'hintText'
        ],
        data() {
            return {
                /*commentInfo: null,*/
                content: null
            };
        },
        mounted() {
            // 由于组件局部化，父子传递。直接将相关属性作为Prop传递，而不采用事件
            /*let vm = this;
            this.$router.app.$on('commentsheet', function (show, commentInfo) {
                vm.isCommentSheetShown = show;
                vm.commentInfo = commentInfo;
            });*/
        },
        methods: {
            showCommentSheet(show) {
                this.isCommentSheetShown = show;
            },
            // Event: closeShareSheet
            closeCommentSheet() {  // 关闭commentSheet
                this.$emit('closeCommentSheet');
            },
            // Event: comment
            comment() {  // 进行评论
                this.$emit('comment', this.content);
                this.content = null;
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
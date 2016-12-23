<!--内容分享底部弹出窗，分享至朋友-->
<template>
    <div>
        <mu-bottom-sheet :open="isShareSheetShown" @close="closeShareSheet">
            <table class="share-sheet-table">
                <tr>
                    <td>
                        <img src="/src/assets/img/bottom_popup/wx_moments.png"/>
                        <br/>
                        <span>微信朋友圈</span>
                    </td>
                    <td>
                        <img src="/src/assets/img/bottom_popup/wx.png"/>
                        <br/>
                        <span>微信好友</span>
                    </td>
                    <td>
                        <img src="/src/assets/img/bottom_popup/qq.png"/>
                        <br/>
                        <span>QQ好友</span>
                    </td>
                    <td>
                        <img src="/src/assets/img/bottom_popup/qq_zone.png"/>
                        <br/>
                        <span>QQ空间</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="/src/assets/img/bottom_popup/night.png"/>
                        <br/>
                        <span>夜间模式</span>
                    </td>
                    <td>
                        <img src="/src/assets/img/bottom_popup/tip_off.png"/>
                        <br/>
                        <span>举报</span>
                    </td>
                </tr>
            </table>
            <!--<mu-divider />-->
            <mu-raised-button label="取消" fullWidth @click="closeShareSheet"/>
        </mu-bottom-sheet>
    </div>
</template>

<script>
    export default {
        name: 'shareSheet',
        props: [],
        data() {
            return {
                isShareSheetShown: false
            };
        },
        mounted() {
            // 考虑到后期应用扩大，将使用vuex而不是事件传送
            let vm = this;
            this.$router.app.$on('sharesheet', function (show) {
                vm.isShareSheetShown = show;
            });
        },
        methods: {
            showShareSheet(show) {
                this.isShareSheetShown = show;
            },
            closeShareSheet() {  // 关闭shareSheet
                this.isShareSheetShown = false;
            }
        }
    }
</script>

<style>
    .share-sheet-table {
        width: 100%;
        text-align: center;
        padding-left: 15px;
        padding-right: 15px;
        color: #000;
    }

    .share-sheet-table td {
        padding: 5px 5px;
        height: 75px;
    }

    .share-sheet-table img {
        width: auto;
        height: auto;
        max-width: 95%;
        max-height: 95%;
        border-radius: 50%;
    }

    .share-sheet-table br {
        line-height: 0;
    }

    .share-sheet-table span {
        display: block;
        margin-top: -5px;
        font-size: 10px;
    }
</style>
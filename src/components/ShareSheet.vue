<!--内容分享底部弹出窗，分享至朋友-->
<!--由于封装Muse-UI组件，暂时采用紧耦合。-->
<!--Required:-->
<!--Prop: isShareSheetShown; Event: closeShareSheet-->
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
        props: [
            'isShareSheetShown'
        ],
        data() {
            return {};
        },
        methods: {
            // Event: closeShareSheet
            closeShareSheet() {  // 关闭shareSheet
                /*
                 * 由于Muse-UI的封装模式：对其进行深入封装时，要求改变父组件传入的Prop
                 * 但根据Vue理论，不建议变更。只可使用事件进行响应
                 * 父组件需要对“closeShareSheet”进行响应，变更Prop传入的isShareSheetShown变量
                 */
                this.$emit('closeShareSheet');
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
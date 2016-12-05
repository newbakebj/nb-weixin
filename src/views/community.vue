<template>
    <div class="m_width">
        <mu-appbar>
            <mu-flat-button slot="left" :label="city" icon="arrow_drop_down" hoverColor="pink200" labelPosition="before" class="city-choose" @click="selectCity"/>
            <mu-text-field slot="left" icon="search" hintText="寻找好帖" class="community_search"/>
            <mu-icon-button slot="right" icon="more_vert" @click="showSharePopup"/>
        </mu-appbar>




        <mu-popup position="bottom" popupClass="share-to-popup m_width" :open="isShareToPopupShown" @close="closeSharePopup" >
            <table class="share-to-table">
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
            </table>
        </mu-popup>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                city: '选择城市',
                isShareToPopupShown: false
            }
        },
        methods: {
            selectCity() {
                alert('Selecting address.');
            },
            showSharePopup() {
                this.isShareToPopupShown = true;
            },
            closeSharePopup() {
                this.isShareToPopupShown = false;
            }

        }
    }
</script>
<style>
    .city-choose {
        padding-left: 0;
        padding-right: 0 !important;
        color: #fff;
    }
    .city-choose .mu-flat-button-label {
        padding-left: 0;
        padding-right: 0 !important;
    }
    .community_search {
        font-size: 13px;
        width: 200px;
    }
    .community_search .mu-text-field-input {
        color: #fff;
    }
    .community_search i {
        margin-top: 5px;
    }
    share-to-popup {
        color: red;
    }

</style>
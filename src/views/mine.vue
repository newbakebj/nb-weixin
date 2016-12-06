<!--用户中心首页-->
<template>
    <mu-flexbox orient="vertical" class="pb60">
        <mu-flexbox-item>
            <div id="profile" class="mine_top m_width text_c">
                <mu-flexbox orient="vertical">
                    <mu-flexbox-item>
                        <div class="mine_profile text_c">
                            <img src="../../src/assets/img/logo.png" alt="">
                            <span>张三</span>
                        </div>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <mu-flexbox class="mine_info">
                            <mu-flexbox-item class="info_1">
                                <ul>
                                    <li>
                                        <span class="val">100</span>
                                        <span class="inf">积分</span>
                                    </li>
                                    <li>
                                        <span class="val">100</span>
                                        <span class="inf">余额</span>
                                    </li>
                                    <li>
                                        <span class="val">100</span>
                                        <span class="inf">焙币</span>
                                    </li>
                                </ul>
                            </mu-flexbox-item>
                            <mu-flexbox-item class="info_2">
                                <mu-flat-button label="设置" icon="settings" class="mine_setting"></mu-flat-button>
                            </mu-flexbox-item>
                        </mu-flexbox>
                    </mu-flexbox-item>
                </mu-flexbox>
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div class="mine_order m_width">
                <mu-list>
                    <mu-list-item title="我的订单" disabled>
                        <mu-flat-button slot="after" labelPosition="before" icon="navigate_next" hoverColor="#fff" label="查看所有订单"/>
                    </mu-list-item>
                </mu-list>
                <mu-divider/>
                <div>
                    <table class="order_todo">
                        <tr>
                            <td>
                                <a href="#">
                                    <mu-badge content="1" circle secondary>
                                        <mu-icon value="credit_card"/>
                                        <br/>
                                        待支付
                                    </mu-badge>
                                </a>
                            </td>
                            <td>
                                <a href="#">
                                    <mu-badge content="2" circle secondary>
                                        <mu-icon value="airport_shuttle"/>
                                        <br/>
                                        待收货
                                    </mu-badge>
                                </a>
                            </td>
                            <td>
                                <a href="#">
                                    <mu-badge content="3" circle secondary>
                                        <mu-icon value="star_half"/>
                                        <br/>
                                        待评价
                                    </mu-badge>
                                </a>
                            </td>
                            <td>
                                <a href="#">
                                    <mu-badge content="4" circle secondary>
                                        <mu-icon value="label"/>
                                        <br/>
                                        标签
                                    </mu-badge>
                                </a>
                            </td>
                        </tr>
                    </table>
                    <mu-divider class="single_divider m_width"/>
                </div>
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div class="mine_item m_width">
                <mu-list>
                    <mu-list-item title="我的收货地址">
                        <mu-icon slot="left" value="place"/>
                        <mu-icon value="navigate_next" slot="right"/>
                    </mu-list-item>
                    <mu-divider/>
                    <mu-list-item title="我的收藏">
                        <mu-icon slot="left" value="favorite"/>
                        <mu-icon value="navigate_next" slot="right"/>
                    </mu-list-item>
                    <mu-divider/>
                    <mu-list-item title="我关注的烘焙师">
                        <mu-icon slot="left" value="face"/>
                        <mu-icon value="navigate_next" slot="right"/>
                    </mu-list-item>
                    <mu-divider/>
                    <mu-list-item title="意见反馈">
                        <mu-icon slot="left" value="message"/>
                        <mu-icon value="navigate_next" slot="right"/>
                    </mu-list-item>
                </mu-list>
            </div>
        </mu-flexbox-item>
    </mu-flexbox>
</template>
<script>
    export default {
        name: 'mine',
        data() {
            return {};
        }
    }
</script>
<style>
    .mine_top {
        background: #000000 center top;
        background-size: 100% auto;
    }

    .mine_profile {
        padding-top: 40px;
    }

    .mine_profile img {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    .mine_profile span {
        display: inline-block;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        background: url(../../src/assets/img/sex_male.png) right 0 no-repeat;
        background-size: auto 100%;
        padding: 0 15px;
        margin: 10px 0 15px;
    }

    .mine_info {
        clear: both;
    }

    .mine_info .info_1 {
        width: 75%;
    }

    .mine_info .info_1 {
        width: 25%;
    }

    .mine_info ul li {
        width: 55px;
        float: left;
        line-height: 20px;
        border-right: 1px solid #303030;
        margin-bottom: 5px;
    }

    .mine_info ul li:last-child {
        border-right: none;
    }

    .mine_info ul li span.val {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        display: block;
        width: 100%;
        text-align: center;
    }

    .mine_info ul li span.inf {
        display: inline-block;
        font-size: 12px;
        color: #888888;
        text-align: center;
        width: 100%;
    }

    .mine_setting {
        float: right;
        width: 25%;
        margin-right: 15px;
        color: #888;
    }

    .mine_order {
        margin-top: -8px;
    }

    .mine_order .mu-list {
        padding: 0;
    }

    .mine_order .mu-item {
        padding: 8px;
    }

    .mine_order table {
        margin-top: 15px;
        width: 100%;
    }

    .mine_order table td {
        width: 25%;
        text-align: center;
    }

    .single_divider {
        height: 15px;
        margin-top: 8px;
    }

    .mine_item {
        /*margin-bottom: 50px;*/
    }

    .mine_item .mu-list {
        margin-top: -5px;
        padding: 0;
    }


</style>
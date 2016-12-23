<!--用户中心首页-->
<template>
    <mu-flexbox orient="vertical" class="pb60">
        <mu-flexbox-item>
            <div id="profile" class="mine-top text-c">
                <mu-flexbox orient="vertical">
                    <mu-flexbox-item>
                        <div class="mine-profile text-c">
                            <img src="/src/assets/img/logo.png" alt="">
                            <span>张三</span>
                        </div>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <mu-flexbox class="mine-info">
                            <mu-flexbox-item class="info-1">
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
                            <mu-flexbox-item class="info-2">
                                <mu-flat-button label="设置" icon="settings" class="mine-setting"></mu-flat-button>
                            </mu-flexbox-item>
                        </mu-flexbox>
                    </mu-flexbox-item>
                </mu-flexbox>
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div class="mine-order">
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
                    <mu-divider class="single-divider"/>
                </div>
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div class="mine_item">
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
<style scoped>
    .mine-top {
        background: #000000 center top;
        background-size: 100% auto;
    }

    .mine-profile {
        padding-top: 40px;
    }

    .mine-profile img {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    .mine-profile span {
        display: inline-block;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        background: url(/src/assets/img/sex_male.png) right 0 no-repeat;
        background-size: auto 100%;
        padding: 0 15px;
        margin: 10px 0 15px;
    }

    .mine-info {
        clear: both;
    }

    .mine-info .info-1 {
        width: 75%;
    }

    .mine-info .info-1 {
        width: 25%;
    }

    .mine-info ul li {
        width: 55px;
        float: left;
        line-height: 20px;
        border-right: 1px solid #303030;
        margin-bottom: 5px;
    }

    .mine-info ul li:last-child {
        border-right: none;
    }

    .mine-info ul li span.val {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        display: block;
        width: 100%;
        text-align: center;
    }

    .mine-info ul li span.inf {
        display: inline-block;
        font-size: 12px;
        color: #888888;
        text-align: center;
        width: 100%;
    }

    .mine-setting {
        float: right;
        width: 25%;
        margin-right: 15px;
        color: #888;
    }

    .mine-order {
        margin-top: -8px;
    }

    .mine-order .mu-list {
        padding: 0;
    }

    .mine-order .mu-item {
        padding: 8px;
    }

    .mine-order table {
        margin-top: 15px;
        width: 100%;
    }

    .mine-order table td {
        width: 25%;
        text-align: center;
    }

    .single-divider {
        height: 15px;
        margin-top: 8px;
    }

    .mine-item .mu-list {
        margin-top: -5px;
        padding: 0;
    }

    /*
     * 测试代码：
     * 由于本style为scoped，则样式自动在最末选择器加data-v-*，即最终生成的选择器为“.mine div[data-v-*]”
     * 而由community.vue style部分的相关分析，引入的外来组件，只会对“根DOM”节点加data-v-*属性，内部节点均不包含该属性
     * 因此生成的目的DOM节点为“.mine_item div”
     * 故无法选中及生效样式
     * 若需要生效，则仿照community.vue中介绍设置为全局选择器。(如最下style所示)
     */
    .mine-item div {
        /*color: red !important;*/
    }

</style>
<style>
    .mine-item div {
        /*color: red !important;*/
    }
</style>
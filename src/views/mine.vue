<template>
    <mu-flexbox orient="vertical">
        <mu-flexbox-item>
            <div id="profile" class="mine_top text_c m_width" >
                <mu-flexbox orient="vertical">
                    <mu-flexbox-item>
                        <div class="mine_profile">
                            <img src="../../src/assets/img/logo.png" alt="">
                            <span>张三</span>
                        </div>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <div class="mine_info">
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
                            <mu-flat-button label="账户管理" labelPosition="before" icon="folder" primary></mu-flat-button>
                        </div>
                    </mu-flexbox-item>
                </mu-flexbox>
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div id="order">
                订单
            </div>
        </mu-flexbox-item>
        <mu-flexbox-item>
            <div id="myItem">
                我的收藏
            </div>
        </mu-flexbox-item>
    </mu-flexbox>
</template>
<script>

</script>
<style>
    .mine_top {
        background: #000000 center top;
        background-size: 100% auto;
    }
    .mine_profile {
        text-align: center;
        padding-top: 2.4rem;
    }
    .mine_profile img {
        width: 4rem;
        height: 4rem;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        border: 1px solid #fff;
    }
    .mine_profile span {
        display: inline-block;
        color: #fff;
        font-weight: bold;
        font-size: 1rem;
        height: 1.25rem;
        line-height: 1.25rem;
        background: url(../../src/assets/img/sex_male.png) right 0 no-repeat;
        background-size: auto 80%;
        padding: 0 1rem;
        margin: 0.5rem 0 1.25rem;
    }
    .mine_info {
        clear: both;
    }
    .mine_info ul li {
        width: 4.5rem;
        float: left;
        line-height: 1.25rem;
        border-right: 1px solid #303030;
        margin-bottom: 0.5rem;
    }
    .mine_info ul li:last-child {
        border-right: none;
    }
    .mine_info ul li span.val {
        color: #fff;
        font-weight: bold;
        font-size: 1rem;
        line-height: 1rem;
        display: block;
        width: 100%;
        text-align: center;
    }
    .mine_info ul li span.inf {
        display: inline-block;
        font-size: 0.8rem;
        color: #888888;
        text-align: center;
        width: 100%;
    }



</style>
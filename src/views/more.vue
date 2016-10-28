<template>
<div class="content more">
  <header class="bar bar-nav">
    <h1 class="title">更多</h1>
  </header>
  <div class="list-block">
    <ul>
      <li class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">使用教程</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">高阶攻略</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">宣传页面</div>
        </div>
      </li>
    </ul>
    <br>
    <ul>
      <li class="item-content item-link" @click="go('/more/feedback')">
        <div class="item-inner">
          <div class="item-title">意见反馈</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link" @click="go('/more/about')">
        <div class="item-inner">
          <div class="item-title">关于我们</div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</div>
</template>
<script>
  export default{
    methods:{
      go:function (url) {
        this.$router.replace(url);
      }
    }
  }


</script>
<style scoped>
.list-block {
  margin: 2.75rem 0;
  height: 2.9rem;
}
.list-block ul {
  height: 2.9rem;
}
.list-block .item-content {
  margin-top: .7rem;
  height: inherit;
}
</style>

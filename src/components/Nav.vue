<template>
  <nav class="bar bar-nav">
    <h1 class="title" v-text="title"></h1>
    <router-link  class="button button-link button-nav pull-left"
      :to="path"
      replace>
      <span class="icon icon-left"></span>
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    title: '',
    path: ''
  },
  methods:{
    go(url){
      this.$router.replace(url);

    }
  }
}
</script>

<style scoped>
.icon-left {
  width: 2rem;
}
</style>

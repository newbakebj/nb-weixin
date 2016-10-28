<template>
  <router-link class="tab-item" :to="path" activeClass="active" replace>
    <span class="icon" :class="iconClass"></span>
    <span class="tab-label" v-text="label"></span>
  </router-link>
</template>

<script>
export default {
  props: {
    path: '',
    icon: '',
    label: ''
  },
  computed: {
    iconClass () {
      return `icon-${this.icon}`
    }
  },
  methods:{
    go(url){
      this.$router.replace(url);
    }
  }
}
</script>

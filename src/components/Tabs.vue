<template>
<div :class="classes">
  <v-button-group
    :type="type">
    <v-button
      v-for="btn in tabBtn"
      :href="btn.href"
      :class="btn.status"
      :shape="shape"
      class-name="tab-link">
      {{btn.title}}
    </v-button>
  </v-button-group>
  <div class="tabs">
    <slot></slot>
  </div>
</div>
</template>

<script>
import VButtonGroup from './ButtonGroup'
import VButton from './Button'
import cx from 'classnames'
import Bus from '../util/Bus'
export default {
  props: {
    type: {
      type: String,
      require: true
    },
    shape: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tabBtn: []
    }
  },
  events: {

  },
  computed: {
    classes () {
      return cx({
        [this.className]: !!this.className
      })
    }
  },
  components: {
    VButton,
    VButtonGroup
  },
  created:function () {
    Bus.$on('setTabBtn',this.setTabBtn);
  },
  methods:{
    setTabBtn (data) {
      console.log('data is',data)
      this.tabBtn.push(data)
    }
  }
}
</script>

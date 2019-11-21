<template>
  <div class="header" :class="{'red': red}">
    <i class="iconfont icon-zuo" @click="goBack"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'm-header',
  props: {
    red: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    line-height: 90px;
    font-size: 34px;
    color: #fefefe;
    text-align: center;
    z-index: 999;

    &.red{
      background-color: #f2353c;
    }

    i{
      position: absolute;
      font-size: 50px;
      left: 20px;
    }
  }
</style>

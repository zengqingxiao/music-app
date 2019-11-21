<template>
  <div>
    <div class="top" :style="{'backgroundImage': `url(${img}?param=400y400)`}">
      <m-header :red="false">
        {{title}}
      </m-header>
      <img :src="`${img}?param=400y400`" alt="">
    </div>
    <count>{{count}}</count>
  </div>
</template>

<script>
import mHeader from './mHeader'
import Count from './count'

export default {
  name: 'top',
  components: {
    mHeader,
    Count
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .top {
    position: relative;
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;

    &:after {
      content: '';
      width: calc(100% + 80px);
      height: calc(100% + 80px);
      position: absolute;
      left: -40px;
      top: -40px;
      background: inherit;
      filter: blur(20px);
    }

    img {
      width: 120px;
      height: 120px;
      border: 10PX solid #9e8d7f;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 1;
    }
  }

</style>

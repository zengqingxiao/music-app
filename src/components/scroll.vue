<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  // 监听Data数据传进来的时候发生改变的时候
  watch: {
    data (val) {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  },
  mounted () {
    // 当我们组件的插槽中的DOM节点全部加载完了(组件会去计算内部高度后),那么就会执行initScroll()
    // 就可以开始滚动
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    // 定义声明
    initScroll () {
      if (!this.$refs.scrollWrapper) return
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        click: true
      })
    },
    // 当DOM结构发生改变的时候(数据)
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollToElement (el, time, offsetX, offsetY, easing) {
      // 用apply 只是为了在参数不确定去使用，其实下面的方法也可以
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      // this.scroll && this.scroll.scrollToElement(el, time, offsetX, offsetY, easing)
    },
    scrollTo (x, y, time, easing) {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      // this.scroll && this.scroll.scrollTo(x, y, time, easing)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

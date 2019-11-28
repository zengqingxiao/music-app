<template>
  <div id="app">
    <router-view />
    <player></player>
  </div>
</template>

<script>
import Player from '@/components/player'
import eruda from 'eruda'

export default {
  name: 'app',
  components: {
    Player
  },
  created () {
    const el = document.createElement('div')
    document.body.appendChild(el)
    eruda.init({
      container: el, // 所处的位置
      tool: ['console', 'elements'] // element的DOM结构
    })
  }
}
</script>

<style lang="scss">
</style>

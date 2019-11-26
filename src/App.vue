<template>
  <div id="app">
    <router-view />
    <player></player>
  </div>
</template>
<script>
import Player from '@/components/player'
export default {
  name: 'app',
  components: {
    Player
  }
}
</script>
<style lang="scss"></style>

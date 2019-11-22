<template>
<!-- 每日推荐 -->
  <div class="page">
    <top :title="title" :img="img" :count="formatData.length"></top>
    <Scroll :data="formatData" class="page-info-list">
      <song-list :data="formatData" @clickItem="addToPlay"></song-list>
    </Scroll>
  </div>
</template>

<script>
import infoMixin from '../common/js/infoMixin'
import PlayMixin from '../common/js/playMixin'
import axios from 'axios'
import { formatSongDetail } from '../common/js/util'

export default {
  name: 'recommend',
  mixins: [infoMixin, PlayMixin],
  created () {
    this.getNewSongs()
  },
  methods: {
    async getNewSongs () {
      const { data } = await axios.get('/api/personalized/newsong')
      if (data.code === 200) {
        this.formatData = formatSongDetail(data.result)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>

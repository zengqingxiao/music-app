<template>
<!-- 排行榜详情 -->
  <div class="page">
    <top :title="title" :img="img" :count="formatData.length"></top>
    <Scroll :data="formatData" class="page-info-list">
      <song-list :data="formatData" @clickItem="addToPlay"></song-list>
    </Scroll>
  </div>
</template>

<script>
import axios from 'axios'
import infoMixin from '@/common/js/infoMixin'
import playMixin from '@/common/js/playMixin'
import { formatSongDetail } from '@/common/js/util'

export default {
  name: 'rank-info',
  mixins: [infoMixin, playMixin],
  created () {
    this.getInfo(this.$route.params.id)
  },
  methods: {
    async getInfo (id) {
      const { data } = await axios.get(`/api/playlist/detail?id=${id}`)
      this.formatData = formatSongDetail(data.playlist.tracks)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

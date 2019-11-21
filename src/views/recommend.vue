<template>
  <div class="page">
    <Top :title="title" :img="img" :count="formatData.length"></Top>
    <Scroll :data="formatData" class="page-info-list">
      <song-list :data="formatData"></song-list>
    </Scroll>
  </div>
</template>

<script>
// import infoMixin from '../common/js/infoMixin'
// import PlayMixin from '../common/js/playMixin'
import axios from 'axios'
import { formatSongDetail } from '../common/js/util'

import Top from '@/components/top.vue'
import SongList from '@/components/songList.vue'
import Scroll from '@/components/scroll.vue'

export default {
  name: 'recommend',
  // mixins: [infoMixin, PlayMixin],
  components: {
    Top,
    SongList,
    Scroll
  },
  data () {
    return {
      formatData: []
    }
  },
  created () {
    this.getNewSongs()
  },
  computed: {
    title () {
      if (this.formatData.length > 0) {
        return this.formatData[0].name
      } else {
        return '暂无数据'
      }
    },
    img () {
      if (this.formatData.length > 0) {
        return this.formatData[0].al.picUrl
      } else {
        return ''
      }
    }
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

<style lang="scss" scoped>
</style>

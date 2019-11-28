<template>
  <div class="page">
    <div v-if="playListData.length">
      <m-header>
        全部歌单
      </m-header>

      <scroll :data="playListData" class="page-view-list">
        <div class="play-wrapper">
        <play-list :data="playListData" @clickItem="goToPlayListInfo"></play-list>
      </div>
      </scroll>
    </div>
    <loading v-else></loading>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import axios from 'axios'
import mHeader from '../components/mHeader'
import PlayList from '../components/playList'
import Scroll from '../components/scroll'
import Loading from '../components/loading'

export default {
  name: 'play-list-view',
  components: {
    mHeader,
    PlayList,
    Scroll,
    Loading
  },
  data () {
    return {
      playListData: [] // 全部歌单数据
    }
  },
  created () {
    this.getPlayList()
  },
  methods: {
    async getPlayList () {
      const { data } = await axios.get('/api/personalized')
      if (data.code === 200) {
        this.playListData = data.result
      }
    },
    goToPlayListInfo (item) {
      this.$router.push({
        name: 'playListInfo',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .play-wrapper {
    margin-top: 90px;
    background-color: white;
    padding: 30px 20px;
  }
</style>

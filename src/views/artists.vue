<template>
  <div class="page">
    <div v-if="artistsData.length">
      <m-header>全部歌手</m-header>
      <scroll :data="artistsData" class="page-view-list">
        <artist-list :data="artistsData" @clickItem="goToArtistsInfo" class="artists"></artist-list>
      </scroll>
    </div>
    <loading v-else></loading>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import mHeader from '@/components/mHeader'
import ArtistList from '@/components/artistList'
import axios from 'axios'
import Scroll from '@/components/scroll'
import Loading from '../components/loading'

export default {
  name: 'artists',
  components: {
    mHeader,
    ArtistList,
    Scroll,
    Loading
  },
  data () {
    return {
      artistsData: []
    }
  },
  created () {
    this.getArtists()
  },
  methods: {
    async getArtists () {
      const { data } = await axios.get('/api/top/artists')
      if (data.code === 200) {
        this.artistsData = data.artists
      }
    },
    goToArtistsInfo (item) {
      this.$router.push({
        name: 'ArtistsInfo',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.artists{
  margin-top: 90px;
  background-color: white;
  padding: 0 20px;
}
</style>

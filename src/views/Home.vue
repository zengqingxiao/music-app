<template>
<div>
  <div class="header">
    <div class="personal" @click="goToUserCenter">我的</div>
    <div>MIKO</div>
    <i class="iconfont icon-chaxun" @click="goToSearch"></i>
  </div>
  <div class="swiper-content home-item">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in newSongData" :key="index">
        <img :src="`${item.song.album.blurPicUrl}?param=400y400`" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="nav">
      <li @click="goToRecommend">
        <div class="icon-container">
          <i class="iconfont icon-date icon"></i>
        </div>
        <p>每日推荐</p>
      </li>
      <li @click="goToPlayList">
        <div class="icon-container">
          <i class="iconfont icon-music-list icon"></i>
        </div>
        <p>歌单</p>
      </li>
      <li @click="goToRank">
        <div class="icon-container">
          <i class="iconfont icon-rank icon"></i>
        </div>
        <p>排行榜</p>
      </li>
    </ul>
  </div>
  <div class="home-item">
    <div class="title-wrapper">
      <div class="title">
        每日推荐
      </div>
      <div class="more" @click="goToPlayList">
        <i class="iconfont icon-more"></i>
      </div>
    </div>
    <div class="play-list-wrapper">
      <play-list :data="playListData" @clickItem="goToPlayListInfo"></play-list>
    </div>
  </div>
  <div class="home-item">
    <div class="title-wrapper">
      <div class="title">
        热门歌手
      </div>
      <div class="more" @click="goToArtists">
        <i class="iconfont icon-more"></i>
      </div>
    </div>
    <artist-list :data="artistsData" @clickItem="goToArtistsInfo"></artist-list>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import PlayList from '../components/playList'
import ArtistList from '../components/artistList'
export default {
  name: 'home',
  components: {
    PlayList,
    ArtistList
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newSongData: [], // 头部轮播图
      playListData: [], // 每日推荐
      artistsData: [] // 热们歌手
    }
  },
  created () {
    this.getNewSongs()
    this.getPlayList()
    this.getArtists()
  },
  methods: {
    // 头部轮播图
    async getNewSongs () {
      const { data } = await axios.get('/api/personalized/newsong')
      if (data.code === 200) {
        this.newSongData = data.result
      }
    },
    // 每日推荐
    async getPlayList () {
      const { data } = await axios.get('/api/personalized')
      if (data.code === 200) {
        this.playListData = data.result.slice(0, 6)
      }
    },
    // 热们歌手
    async getArtists () {
      const { data } = await axios.get('/api/top/artists?limit=10')
      if (data.code === 200) {
        this.artistsData = data.artists
      }
    },
    // 每日推荐路由跳转
    goToRecommend () {
      this.$router.push({
        name: 'recommend'
      })
    },
    // 歌单
    goToPlayList () {
      this.$router.push({
        name: 'playListView'
      })
    },
    // 排行榜
    goToRank () {
      this.$router.push({
        name: 'rank'
      })
    },
    goToArtists () {
      this.$router.push({
        name: 'artists'
      })
    },
    goToPlayListInfo (item) {
      this.$router.push({
        name: 'playListInfo',
        params: {
          id: item.id
        }
      })
    },
    goToArtistsInfo (item) {
      this.$router.push({
        name: 'ArtistsInfo',
        params: {
          id: item.id
        }
      })
    },
    // 点击收索
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    // 点击我的
    goToUserCenter () {
      this.$router.push({
        name: 'userCenter'
      })
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
    background-color: #f2353c;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 36px;
    z-index: 9;

    .personal {
      color: #f9aeb0;
    }

    i {
      font-size: 36px;
    }
  }

  .home-item {
    padding: 20px;
    margin-bottom: 20px;
    background-color: white;

    .title-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 40px;

      .title {
        padding-left: 20px;
        font-size: 34px;
        border-left: 6px solid #f2353c;
        color: #4c4c4c;
        line-height: 38px;
      }

      .more {
        width: 50px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 25px;
        color: #bfbfbf;
        text-align: center;
        line-height: 38px;
      }
    }
  }

  .swiper-content {
    margin-top: 90px;

    .swiper-container {
      width: 100%;
      height: 350px;
      border-radius: 10px;

      img {
        width: 100%;
      }
    }
  }

  .nav {
    padding: 20px 30px 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    li {
      text-align: center;
    }

    .icon-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: red;
      margin-bottom: 20px;
      line-height: 120px;
    }

    .icon {
      font-size: 70px;
      color: white;
    }

    p{
      font-size: 24px;
    }
  }

  .play-list-wrapper{
    min-height: 650px;
  }

  .home-container{
    margin-top: 90px;
    height: calc(100vh - 200px);
    overflow: hidden;
  }
</style>

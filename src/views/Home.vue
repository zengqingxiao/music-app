<template>
<div>
    <div class="header">
      <div class="personal">我的</div>
      <div>MIKO</div>
      <i class="iconfont icon-chaxun"></i>
  </div>
  <div class="swiper-content home-item">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in newSongData" :key="index">
        <img :src="`${item.song.album.blurPicUrl}?param=400y400`" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
export default {
  name: 'home',
  components: {},
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newSongData: []
    }
  },
  created () {
    this.getNewSongs()
  },
  methods: {
    // 头部轮播图
    async getNewSongs () {
      const { data } = await axios.get('/api/personalized/newsong')
      if (data.code === 200) {
        this.newSongData = data.result
      }
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

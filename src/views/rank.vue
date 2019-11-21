<template>
  <div class="page">
    <div v-if="officeList.length">
      <m-header>排行榜</m-header>
      <scroll :data="officeList" class="page-view-list">
        <div>
          <div class="rank-wrapper">
            <div>
              <p class="rank-title">官方榜</p>
              <ul class="office-list">
                <li class="list-item" v-for="(item, index) in officeList" @click="goToRankInfo(item.id)" :key="index">
                  <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
                  <div>
                    <ul>
                      <li class="list-txt" v-for="(listItem, listIndex) in item.tracks"  :key="listIndex">
                        {{listIndex+1}}.{{listItem.first}}-{{listItem.second}}
                      </li>
                    </ul>
                    <i class="iconfont icon-zanting"></i>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <p class="rank-title">推荐榜</p>
              <ul class="rank-list">
                <li v-for="(item, index) in recommendList" :key="index" @click="goToRankInfo(item.id)">
                  <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
                  <p>{{item.name}}</p>
                  <i class="iconfont icon-zanting"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <!-- <loading v-else></loading> -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import axios from 'axios'
import mHeader from '@/components/mHeader.vue'
import Scroll from '@/components/scroll.vue'
// import loading from '@/components/loading.vue'

export default {
  name: 'rank',
  components: {
    mHeader,
    Scroll
    // loading
  },
  data () {
    return {
      officeList: [],
      recommendList: []
    }
  },
  created () {
    this.getTopList()
  },
  methods: {
    async getTopList () {
      const { data } = await axios.get('/api/toplist/detail')
      this.officeList = data.list.slice(0, 4)
      this.recommendList = data.list.slice(4, data.list.length)
    },
    goToRankInfo (id) {
      this.$router.push({
        name: 'RankInfo',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .rank-wrapper {
    margin-top: 90px;
  }

  .rank-title {
    padding: 30px 20px 10px 20px;
    font-size: 26px;
  }

  .office-list{
    background-color: white;

    .list-item{
      position: relative;
      padding: 30px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-bottom: 1PX solid #e6e6e6;

      img{
        width: 200px;
        height: 200px;
        margin-right: 50px;
      }

      i{
        position: absolute;
        right: 20px;
        top: 30px;
        font-size:50px;
        color: #808080;
      }
    }

    .list-txt{
      font-size: 22px;
      line-height: 1.5;
      color: #808080;
      padding: 10px 0;
    }
  }

  .rank-list{
    padding: 30px 20px;
    background-color: white;

    li{
      position: relative;
      display: inline-block;
      width: 220px;
      margin-right: 25px;
      margin-bottom: 40px;
      color: #333;
      vertical-align: top;
      line-height: 1.5;

      &:nth-child(3n) {
        margin-right: 0;
      }

      img{
        width: 100%;
        margin-bottom: 15px;
      }

      i{
        position: absolute;
        top: 150px;
        right: 20px;
        color: white;
        font-size: 40px;
      }
    }
  }
</style>

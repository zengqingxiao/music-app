<template>
  <div>
    <div v-show="!fullScreen" class="mini-player">
      <div class="player-info" @click="toggleShow(true)">
        <div class="player-img rotate" :class="rotateStop">
          <img :src="songImg" alt />
        </div>
        <div>
          <p class="player-name">{{songName}}</p>
          <p class="player-artists">
            <span v-for="(item, index) in songArtists" :key="index">{{item.name}}</span>
          </p>
        </div>
      </div>
      <div class="player-operate">
        <i class="iconfont icon-op" :class="playIcon" @click="togglePlay"></i>
        <i class="iconfont icon-xiayiqu" @clck="next"></i>
      </div>
      <div class="mini-progress" :style="{width: `${barPercent}`}"></div>
    </div>
    <transition name="player">
      <div class="player" v-show="fullScreen" :style="{'backgroundImage': `url(${songImg})`}">
        <div class="player-mask"></div>
        <div class="player-header">
          <i class="iconfont icon-xia" @click="toggleShow(false)"></i>
          <div class="header-info">
            <p>{{songName}}</p>
            <p class="header-artists">
              <span v-for="(item, index) in songArtists" :key="index">{{item.name}}</span>
            </p>
          </div>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide class="img-container">
            <img class="rotate" :class="rotateStop" :src="songImg" alt />
            <i class="iconfont icon-xiai" :class="{'icon-xiai-red': isLove}" @click="addToLove"></i>
          </swiper-slide>
          <swiper-slide class="lyric-container">
            <scroll ref="lyricScroll" class="lyric-scroll">
              <div>
                <ul v-if="lyricLines.length > 0">
                  <li
                    ref="lyricLine"
                    class="list-item"
                    :class="{'active': index === currentLineNumber}"
                    v-for="(item, index) in lyricLines"
                    :key="index"
                  >{{item.txt}}</li>
                </ul>
                <div v-else>暂无歌词</div>
              </div>
            </scroll>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="player-operate">
          <div class="operate-mask"></div>
          <div class="progress">
            <span class="time">{{formatTime(currentTime)}}</span>
            <div class="progress-bar" ref="progressBar" @click="progressClick">
              <div class="bar-moved" :style="{width: `${barPercent}`}"></div>
              <div
                class="bar-btn"
                :style="{left: `${barPercent}`}"
                @touchmove.prevent="progressMove"
                @touchend="progressEnd"
              ></div>
            </div>
            <span class="time">{{formatTime(overTime)}}</span>
          </div>
          <div class="operate-icon">
            <i class="iconfont ft-40" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont icon-shangyiqu ft-80" @click="prev"></i>
            <i class="iconfont ft-100" :class="playIcon" @click="togglePlay"></i>
            <i class="iconfont icon-xiayiqu ft-80" @click="next"></i>
            <i class="iconfont icon-more ft-40" @click="togglePlaylistShow"></i>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="playlistShow" @click="togglePlaylistShow" class="playlist-mask"></div>
    <transition name="playlist">
      <scroll v-if="playlistShow" class="playlist-scroll">
        <ul>
          <li v-for="(item, index) in playList" :key="index" @click="addToPlay(index)">
            <p>
              {{item.name}} -
              <span
                class="artists-name"
                v-for="(arItem, arIndex) in item.ar"
                :key="arIndex"
              >{{arItem.name}}</span>
            </p>
            <i class="iconfont icon-shanchu2" @click.stop="delFromPlayList(item)"></i>
          </li>
        </ul>
        <div class="close" @click="togglePlaylistShow">关闭</div>
      </scroll>
    </transition>
    <audio :src="musicData.url" ref="audio" @timeupdate="updateTime" @play="songLoad" @ended="end"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { playMode } from '../common/js/aliasConfig'
import axios from 'axios'
import Scroll from './scroll'

export default {
  name: 'player',
  components: {
    Scroll
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      musicData: {},
      lyricData: null,
      playing: false,
      loaded: false,
      currentTime: 0,
      overTime: 0,
      touchBarWillMove: false,
      lyricLines: [],
      currentLineNumber: 0,
      playlistShow: false
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'sequencesList',
      'currentIndex',
      'currentSong',
      'mode',
      'isLove'
    ]),
    songName () {
      return this.currentSong ? this.currentSong.name : '暂无播放歌曲'
    },
    songArtists () {
      return this.currentSong ? this.currentSong.ar : []
    },
    songImg () {
      return this.currentSong && this.currentSong.al.picUrl ? `${this.currentSong.al.picUrl}?param=400y400` : require('../assets/image/user-bg.png')
    },
    playIcon () {
      return this.playing ? 'icon-bofang' : 'icon-zanting'
    },
    modeIcon () {
      return this.mode === playMode.sequence ? 'icon-liebiaoxunhuan' : (this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suiji')
    },
    barPercent () {
      let p = this.currentTime / this.overTime
      if (p === 0) {
        return 0
      }
      p = Number(p * 100).toFixed()
      return `${p}%`
    },
    rotateStop () {
      return this.playing ? '' : 'rotate-stop'
    }
  },
  watch: {
    currentSong (newVal, oldVal) {
      if (oldVal === undefined || newVal.id !== oldVal.id) {
        this.getMusicUrl(newVal.id)
        this.getLyricData(newVal.id)
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_FULLSCREEN',
      'SET_CURRENT_INDEX',
      'SET_MODE',
      'SET_PLAY_LIST',
      'DEL_FROM_PLAY_LIST',
      'SET_HISTORY_LIST',
      'SET_LOVE_LIST',
      'DEL_FROM_LOVE_LIST'
    ]),
    toggleShow (val) {
      this.SET_FULLSCREEN(val)
    },
    async getMusicUrl (id) {
      const { data } = await axios.get(`/api/song/url?id=${id}`)
      if (data.code === 200 && data.data[0].code === 200) {
        this.musicData = data.data[0]
        this.$nextTick(() => {
          this.togglePlay(true)
          this.SET_HISTORY_LIST(this.currentSong)
        })
      }
    },
    async getLyricData (id) {
      const { data } = await axios.get(`/api/lyric?id=${id}`)
      if (data.code === 200 && data.lrc) {
        this.lyricData = data.lrc.lyric
        this.initLines()
      } else {
        this.lyricData = null
      }
    },
    togglePlay (val) {
      if (!this.currentSong) return
      if (val === true || val === false) {
        this.playing = val
      } else {
        this.playing = !this.playing
      }
      const audio = this.$refs.audio
      if (this.playing) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    prev () {
      if (!this.loaded) return
      this.loaded = false
      const len = this.playList.length
      let newIndex = this.currentIndex - 1
      if (newIndex < 0) {
        newIndex = len - 1
      }
      this.SET_CURRENT_INDEX(newIndex)
    },
    next () {
      if (!this.loaded) return
      this.loaded = false
      const len = this.playList.length
      let newIndex = this.currentIndex + 1
      if (newIndex === len) {
        newIndex = 0
      }
      this.SET_CURRENT_INDEX(newIndex)
    },
    changeMode () {
      const modeNumber = (this.mode + 1) % 3
      this.SET_MODE(modeNumber)
      let newPlayList = []
      if (this.mode === playMode.random) {
        newPlayList = this.getRandomList(this.sequencesList)
      } else {
        newPlayList = this.sequencesList
      };
      const newIndex = newPlayList.findIndex(item => item.id === this.currentSong.id)
      this.SET_PLAY_LIST(newPlayList)
      this.SET_CURRENT_INDEX(newIndex)
    },
    getRandomList (arr) {
      const newArr = [].concat(arr)
      return newArr.sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      const audio = this.$refs.audio
      audio.currenTime = 0
      audio.play()
    },
    songLoad () {
      this.loaded = true
    },
    updateTime (e) {
      if (!this.touchBarWillMove) {
        this.currentTime = e.target.currentTime
        this.overTime = e.target.duration
      }
      if (this.lyricData) {
        this.moveLyric()
      }
    },
    formatTime (val) {
      if (isNaN(val)) return '00:00'
      let m = Math.floor(val / 60)
      let s = Math.floor(val % 60)
      if (m < 10) {
        m = `0${m}`
      }
      if (s < 10) {
        s = `0${s}`
      }
      return `${m}:${s}`
    },
    progressMove (e) {
      this.touchBarWillMove = true
      const pageX = e.touches[0].pageX
      this.calcPercent(pageX)
    },
    progressClick (e) {
      this.touchBarWillMove = true
      const pageX = e.pageX
      this.calcPercent(pageX)
      this.resetPlayer()
    },
    calcPercent (x) {
      const offsetLeft = this.$refs.progressBar.offsetLeft
      const barWidth = this.$refs.progressBar.clientWidth
      let movedWidth = x - offsetLeft
      if (movedWidth > barWidth) movedWidth = barWidth
      if (movedWidth < 0) movedWidth = 0
      const p = movedWidth / barWidth
      this.currentTime = this.overTime * p
      this.moveLyric()
    },
    progressEnd () {
      this.resetPlayer()
    },
    resetPlayer () {
      this.$refs.audio.currentTime = this.currentTime
      this.togglePlay(true)
      this.touchBarWillMove = false
    },
    initLines () {
      this.lyricLines = []
      if (this.lyricData) {
        const lines = this.lyricData.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          const timeExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/g
          const result = timeExp.exec(line)
          console.log(result)
          if (result) {
            const time = Number(result[1] * 60 * 1000) + Number(result[2] * 1000)
            const txt = line.replace(timeExp, '').trim()
            this.lyricLines.push({
              time,
              txt
            })
          }
        }
      }
    },
    moveLyric () {
      this.currentLineNumber = this.findCurrentNumber(this.currentTime * 1000)
      if (this.currentLineNumber > 6) {
        this.$refs.lyricScroll.scrollToElement(this.$refs.lyricLine[this.currentLineNumber - 6], 1000)
      } else {
        this.$refs.lyricScroll.scrollTo(0, 0, 1000)
      }
    },
    findCurrentNumber (time) {
      for (let i = 0; i < this.lyricLines.length; i++) {
        if (time < this.lyricLines[i].time) {
          return i - 1
        }
      }
      return this.lyricLines.length - 1
    },
    togglePlaylistShow () {
      this.playlistShow = !this.playlistShow
    },
    addToPlay (index) {
      this.SET_CURRENT_INDEX(index)
      this.togglePlaylistShow()
    },
    delFromPlayList (item) {
      this.DEL_FROM_PLAY_LIST({
        delSong: item,
        curSong: this.currentSong
      })
    },
    addToLove () {
      if (this.isLove) {
        this.DEL_FROM_LOVE_LIST(this.currentSong)
      } else {
        this.SET_LOVE_LIST(this.currentSong)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #150a06;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 10px 30px 10px 20px;
  z-index: 9999;

  .player-info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .player-img {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #695945;
    margin-right: 20px;

    img {
      width: 100%;
    }
  }

  .player-name {
    font-size: 26px;
    margin-bottom: 10px;
    line-height: 30px;
  }

  .player-artists {
    font-size: 20px;
    color: #b2b2b2;
  }

  .player-operate {
    i {
      font-size: 65px;
      color: #c9c3c1;
    }

    .icon-op {
      margin-right: 50px;
    }
  }

  .mini-progress {
    height: 6px;
    background-color: #f2353c;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
.player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
  color: white;

  &:after {
    content: "";
    background: inherit;
    position: absolute;
    top: -40px;
    left: -40px;
    width: calc(100% + 80px);
    height: calc(100% + 80px);
    filter: blur(20px);
    z-index: -2;
  }

  .player-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: -1;
  }

  .player-header {
    height: 60px;
    padding: 30px;

    i {
      font-size: 46px;
      position: absolute;
      left: 30px;
      top: 30px;
    }

    .header-info {
      width: 70%;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 30px;
    }

    .header-artists {
      font-size: 18px;
      color: #b2b2b2;
      margin-top: 12px;
    }
  }

  .swiper-container {
    width: 100%;
    height: calc(100% - 360px);
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 20px solid #2b433c;
    }

    i {
      position: absolute;
      left: 30px;
      bottom: 30px;
      font-size: 50px;
      color: #c4b9bb;
    }
  }

  .player-operate {
    width: 100%;
    height: 300px;
    position: relative;

    .operate-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: -1;
    }
  }

  .progress {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 30px;

    .time {
      width: 60px;
    }

    .progress-bar {
      width: 560px;
      height: 4px;
      background-color: #7e7374;
      position: relative;
      margin: 0 30px;
    }

    .bar-moved {
      position: absolute;
      left: 0;
      top: 0;
      height: 4px;
      background-color: #f2353c;
    }

    .bar-btn {
      position: absolute;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: white;
      border: 5px solid #5d5759;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .operate-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    color: #c4b9bb;

    .ft-40 {
      font-size: 40px;
    }

    .ft-80 {
      font-size: 80px;
    }

    .ft-100 {
      font-size: 100px;
    }
  }
}

.player-enter-active,
.player-leave-active {
  transition: all 0.3s;
  opacity: 1;

  .player-header,
  .player-operate {
    transform: translate3d(0, 0, 0);
    transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}

.player-enter,
.player-leave-to {
  opacity: 0;

  .player-header {
    transform: translate3d(0, -100px, 0);
  }

  .player-operate {
    transform: translate3d(0, 100px, 0);
  }
}

.lyric-container {
  height: 100%;
  box-sizing: border-box;
  padding: 30px 30px 70px 30px;
  overflow: hidden;
}

.lyric-scroll {
  height: 100%;
  width: 100%;
  color: white;
  overflow: hidden;
  text-align: center;

  .list-item {
    font-size: 24px;
    line-height: 1.5;
    min-height: 50px;
    opacity: 0.5;

    &.active {
      opacity: 1;
    }
  }
}

.playlist-scroll {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 800px;
  overflow: hidden;
  z-index: 99999;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px 10px 0 0;

  ul {
    padding-bottom: 80px;

    li {
      padding: 30px 20px;
      font-size: 24px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .artists-name {
      font-size: 18px;
      color: #b3b3b3;
    }

    i {
      font-size: 24px;
      color: lightgray;
    }
  }

  .close {
    line-height: 80px;
    font-size: 30px;
    color: #333;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #e6e6e6;
    background-color: white;
  }
}

.playlist-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.4);
}

.playlist-enter-active,
.playlist-leave-active {
  transition: all 0.3s;
}

.playlist-enter,
.playlist-leave-to {
  transform: translate3d(0, 100%, 0);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: rotate 30s linear infinite;
}

.rotate-stop {
  animation-play-state: paused;
}
</style>

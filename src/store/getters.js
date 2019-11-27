// state 的计算属性
const getters = {
  // 计算 控制大小播放器的值
  fullScreen (state) {
    return state.fullScreen
  },
  // 播放器列表
  playList (state) {
    return state.playList
  },
  // 最开始的列表排序
  sequencesList (state) {
    return state.sequencesList
  },
  // 当前歌曲所在的位置
  currentIndex (state) {
    return state.currentIndex
  },
  // 播放的方式类型
  mode (state) {
    return state.mode
  },
  // 当前播放歌曲的数据信息
  currentSong (state) {
    return state.playList[state.currentIndex]
  },
  isLove (state) {
    let isLove = false
    const currentSong = state.playList[state.currentIndex]
    for (let i = 0; i < state.loveList.length; i += 1) {
      if (currentSong && state.loveList[i].id === currentSong.id) {
        isLove = true
        return isLove
      }
    }
    return isLove
  },
  searchText (state) {
    return state.searchText
  },
  historyList (state) {
    return state.historyList
  },
  loveList (state) {
    return state.loveList
  }
}
export default getters

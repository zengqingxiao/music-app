// 昨天数据
import { playMode } from '../common/js/aliasConfig'

const state = {
  fullScreen: false, // 控制大小播放器
  playList: [], // 传入播放列表,这个可以是通过sequencesList传进来的
  sequencesList: [], // 最开始的排序列
  currentIndex: 0, // 当前歌曲所在位置
  mode: playMode.sequence, // 播放的形式
  historyList: JSON.parse(localStorage.getItem('HistoryList')) || [], // 历史列表
  loveList: JSON.parse(localStorage.getItem('LoveList')) || [], // 喜欢列表
  searchText: JSON.parse(localStorage.getItem('SearchText')) || [] // 查询列表
}
export default state

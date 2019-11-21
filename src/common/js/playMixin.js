import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'SET_FULLSCREEN',
      'SET_PLAY_LIST',
      'SET_SEQUENCE_LIST',
      'SET_CURRENT_INDEX'
    ]),
    addToPlay (item, index) {
      this.SET_FULLSCREEN(true)
      this.SET_PLAY_LIST(this.formatData)
      this.SET_SEQUENCE_LIST(this.formatData)
      this.SET_CURRENT_INDEX(index)
    }
  }
}

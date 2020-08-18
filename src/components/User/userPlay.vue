<template>
    <div class="page1">
      <m-header>播放列表</m-header>
      <count class="mt90">{{playList.length}}</count>
      <scroll class="user-list-container">
        <song-list :data="playList" @clickTo="addToPlay"></song-list>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import SongList from "../common/songList";
    import Scroll from "../common/scroll";
    import Count from "../common/count";
    import MHeader from "../common/mHeader";
    import {mapGetters} from "vuex";
    import playMixin from "../../common/js/playMixin";

    export default {
        name: 'userPlay',
      mixins:[playMixin],
        data() {
            return {}
        },
      components: {SongList, Scroll, Count, MHeader},
      computed:{
        ...mapGetters({
          playList: 'player/playList'
        })
      },
      methods:{
        addToPlay(item,index){
          this.SET_FULLSCREEN(true)
          this.SET_PLAY_LIST(this.playList)
          this.SET_SEQUENCE_LIST(this.playList)
          this.SET_CURRENT_INDEX(index)
        }
      }
    }
</script>

<style scoped lang="less">
  .user-list-container{
    height: calc(~"100vh - 280px");
    overflow: hidden;
  }
</style>

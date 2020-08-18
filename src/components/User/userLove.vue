<template>
    <div class="page1">
      <m-header>我的收藏</m-header>
      <count class="mt90">{{loveList.length}}</count>
      <scroll class="user-list-container">
        <song-list :data="loveList" @clickTo="addToPlay"></song-list>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from "../common/mHeader";
  import Count from "../common/count";
  import Scroll from "../common/scroll";
  import SongList from "../common/songList";
  import {mapGetters} from "vuex"
  import playMixin from "../../common/js/playMixin";
    export default {
        name: 'userLove',
      mixins:[playMixin],
        data() {
            return {}
        },
      components: {SongList, Scroll, Count, MHeader},
      computed:{
        ...mapGetters({
          loveList: 'player/loveList'
        })
      },
      methods:{
        addToPlay(item,index){
          this.SET_FULLSCREEN(true)
          this.SET_PLAY_LIST(this.loveList)
          this.SET_SEQUENCE_LIST(this.loveList)
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

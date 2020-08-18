<template>
    <div class="page1">
        <div v-if="playListAll.length">
          <m-header>
            全部歌单
          </m-header>
          <scroll :data="playListAll" class="page-view-list">
            <div class="play-list-wrapper">
              <play-list :data="playListAll" @clickItem="goToPlayListInfo"></play-list>
            </div>
          </scroll>
        </div>
      <loading v-else></loading>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  import mHeader from "../common/mHeader";
  import playList from "./playList";
  import {mapState,mapActions} from 'vuex'
  import Scroll from "../common/scroll";
  import Loading from "../common/loading";
    export default {
        name: 'playListView',
        data() {
            return {}
        },
        components: {
          Loading,
          Scroll,
          mHeader,
          playList
        },
      created() {
          this.getPlayList()
      },
      computed:{
          ...mapState({
            playListAll: state=>state.index.playListAll
          })
        },
         methods:{
          ...mapActions({
            getPlayList: 'index/getPlayList'
          }),
           goToPlayListInfo(item){
             this.$router.push({
               name: 'playListInfo',
               params:{
                 id:item.id
               }
             })
           },
        }
    }
</script>

<style scoped lang="less">
  .play-list-wrapper{
    padding: 30px 20px;
    margin-top: 90px;
    background-color: white;
  }
</style>

<template>
    <div class="page1">
      <div v-if="artistsAll.length">
        <m-header>全部歌手</m-header>
        <scroll class="page-view-list" :data="artistsAll">
          <artists-list :data="artistsAll" class="artists-list" @clickItem="goToArtistsInfo"></artists-list>
        </scroll>
      </div>
      <loading v-else></loading>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
  import artistsList from "./artistsList";
  import mHeader from "../common/mHeader";
  import {mapState,mapActions} from 'vuex'
  import Scroll from "../common/scroll";
  import Loading from "../common/loading";
    export default {
        name: 'artists',
        data() {
            return {}
        },
        components: {
          Loading,
          Scroll,
          artistsList,
          mHeader
        },
      created() {
          this.getArtistsAll()
      },
      computed:{
          ...mapState({
              artistsAll:state=>state.index.artistsAll
          })
      },
      methods:{
          ...mapActions({
            getArtistsAll: 'index/getArtistsAll'
          }),
        goToArtistsInfo(item){
          this.$router.push({
            name: 'artistsInfo',
            params:{
              id:item.id
            }
          })
        }
      }
    }
</script>

<style scoped>
  .artists-list{
    margin-top: 90px;
    padding: 0 20px;
  }
</style>

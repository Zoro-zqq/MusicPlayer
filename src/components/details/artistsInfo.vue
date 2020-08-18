<template>
  <div class="page1">
    <Top :title="title" :img="img" :count="formatData.length"></Top>
    <scroll class="page-info-list" :data="formatData">
      <song-list :data="formatData" @clickTo="addToPlay">
      </song-list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions,mapState,mapMutations} from 'vuex'
  import infoMixin from "../../common/js/infoMixin";
  import {formatSongDetail} from "../../common/js/util";
  export default {
      name: 'artistsInfo',
      mixins: [infoMixin],
    computed: {
      ...mapState({
        artistsInfo: state => state.details.artistsInfo,
      }),
    },
    created() {
      this.getArtistsInfo({id:this.$route.params.id,success:()=>{
          this.formatData = formatSongDetail(this.artistsInfo)
        }})
    },
    methods:{
      ...mapActions({
        getArtistsInfo: 'details/getArtistsInfo'
      }),
      ...mapMutations({
        SET_FULLSCREEN: 'player/SET_FULLSCREEN',
        SET_PLAY_LIST: 'player/SET_PLAY_LIST',
        SET_SEQUENCE_LIST: 'player/SET_SEQUENCE_LIST',
        SET_CURRENT_INDEX: 'player/SET_CURRENT_INDEX',
      }),
      addToPlay(item,index){
        this.SET_FULLSCREEN(true)
        this.SET_PLAY_LIST(this.formatData)
        this.SET_SEQUENCE_LIST(this.formatData)
        this.SET_CURRENT_INDEX(index)
      }
    }
  }
</script>

<style scoped lang="less">
</style>

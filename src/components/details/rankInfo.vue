<template>
  <div class="page1">
    <Top :title="title" :img="img" :count="formatData.length"></Top>
    <scroll class="page-info-list" :data="formatData">
      <song-list :data="formatData" @clickTo="addToPlay"></song-list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions,mapState} from 'vuex'
  import infoMixin from "../../common/js/infoMixin";
  import {formatSongDetail} from "../../common/js/util";
  import playMixin from "../../common/js/playMixin";
  export default {
      name: 'rankInfo',
      mixins: [infoMixin,playMixin],
      computed: {
      ...mapState({
        rankInfo: state => state.details.rankInfo,
      }),
    },
    created() {
      this.getRankInfo({id:this.$route.params.id,success:()=>{
          this.formatData = formatSongDetail(this.rankInfo)
        }})
    },
    methods:{
      ...mapActions({
        getRankInfo: 'details/getRankInfo'
      })
    }
  }
</script>

<style scoped lang="less">
</style>

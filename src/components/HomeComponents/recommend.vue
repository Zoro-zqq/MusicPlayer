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
        name: 'recommend',
        mixins: [infoMixin,playMixin],
        created() {
          this.getSwiper({success:()=>{
              this.formatData = formatSongDetail(this.result)
            }
          })
        },
    computed: {
          ...mapState({
            result: state=>state.index.result,
          }),
        },
        methods:{
          ...mapActions({
            getSwiper: 'index/getSwiper',
          }),
        },
    }
</script>

<style scoped lang="less">
</style>

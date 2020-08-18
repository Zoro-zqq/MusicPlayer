<template>
  <div>
      <div class="header">
        <div class="personal" @click="goToUserCenter">我的</div>
        <div>QQ音乐</div>
        <i class="iconfont icon-chaxun" @click="goToSearch"></i>
      </div>
    <scroll :data="artists" class="home-container">
      <div>
        <div class="swiper-content home-item">
          <swiper :options="swiperOption" ref="mySwiper" >
            <!-- slides -->
            <swiper-slide v-for="(item,index) in result" :key="index">
              <img :src="`${item.song.album.blurPicUrl}?param=400y400`" ></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
          <ul class="nav">
            <li @click="goToRecommend()">
              <div class="icon-container">
                <i class="iconfont icon-date icon"></i>
              </div>
              <p>每日推荐</p>
            </li>
            <li @click="goToPlayListView()">
              <div class="icon-container">
                <i class="iconfont icon-music-list icon"></i>
              </div>
              <p>歌单</p>
            </li>
            <li @click="goToRank()">
              <div class="icon-container">
                <i class="iconfont icon-rank icon"></i>
              </div>
              <p>排行榜</p>
            </li>
          </ul>
        </div>
        <div class="home-item">
          <div class="title-wrapper">
            <div class="title">
              每日推荐
            </div>
            <div class="more" @click="goToPlayListView()">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <div class="play-list-wrapper">
            <play-list :data="playList" @clickItem="goToPlayListInfo"></play-list>
          </div>
        </div>
        <div class="home-item">
          <div class="title-wrapper">
            <div class="title">
              热门歌手
            </div>
            <div class="more" @click="goToArtists()">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <artists-list :data="artists" @clickItem="goToArtistsInfo"></artists-list>
        </div>
      </div>
    </scroll>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import {mapActions,mapState} from 'vuex'
  import playList from "./HomeComponents/playList";
  import artistsList from "./HomeComponents/artistsList";
  import Scroll from "./common/scroll";
  export default {
    name: 'Home',
    data() {
      return {
        swiperOption: {
          // 参数选项,显示小点
          pagination:'.swiper-pagination',
          //循环
          loop:true,
          //每张播放时长3秒，自动播放
          autoplay:3000,
          //滑动速度
          speed:1000,
        }
      }
    },
    components:{
      Scroll,
      playList,
      artistsList
    },
    created() {
      this.getSwiper({success:()=>{

        }})
      this.getPlayList()
      this.getArtists()
    },
    computed: {
      ...mapState({
        result: state=>state.index.result,
        playList: state=>state.index.playList,
        artists: state=>state.index.artists
      }),
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
      ...mapActions({
        getSwiper: 'index/getSwiper',
        getPlayList: 'index/getPlayList',
        getArtists: 'index/getArtists'
      }),
      goToRecommend(){
        this.$router.push({
          name: 'recommend'
        })
      },
      goToPlayListView(){
        this.$router.push({
          name: 'playListView'
        })
      },
      goToRank(){
        this.$router.push({
          name: 'rank'
        })
      },
      goToArtists(){
        this.$router.push({
          name: 'artists'
        })
      },
      goToPlayListInfo(item){
        this.$router.push({
          name: 'playListInfo',
          params:{
            id:item.id
          }
        })
      },
      goToArtistsInfo(item){
        this.$router.push({
          name: 'artistsInfo',
          params:{
            id:item.id
          }
        })
      },
      goToSearch(){
        this.$router.push({
          name: 'search'
        })
      },
      goToUserCenter(){
        this.$router.push({
          name: 'userCenter'
        })
      },

    },
    mounted() {

    }
  }
</script>

<style scoped >
  .page{
  }

  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    padding: 0 20px;
    background-color: #f2353c;
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 36px;
    color: white;
    z-index: 9;
  }
  .header .personal{
    color: #f9aeb0;
  }
  .header i{
    font-size: 36px;
  }

  .home-item{
    padding: 20px;
    margin-bottom: 20px;
    background-color: white;
  }
  .swiper-content {
    margin-top: 90px;
  }
  .swiper-container{
    border-radius: 10px;
    width: 100%;
    height: 350px;
  }

  img{
    width: 100%;
  }

  .nav{
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: white;
    margin-top: 20px;
  }
  .nav .icon-container{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: red;
    margin-bottom: 20px;
    line-height: 120px;
  }
  .nav .icon{
    font-size: 70px;
    color: white;
  }
  .nav li{
    text-align: center;
  }

  .title-wrapper{
    display: -webkit-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  .title-wrapper .title{
    font-size: 34px;
    padding-left: 20px;
    border-left: 6px solid #f2353c;
    text-align: center;
  }
  .title-wrapper .more{
    width: 50px;
    height: 38px;
    border: 1px solid #ccc;
    border-radius: 25px;
    color: #bfbfbf;
    text-align: center;
    line-height: 38px;
  }
  .play-list-wrapper{
    min-height: 650px;
  }

  .home-container{
    margin-top: 90px;
    height: calc(100vh - 200px);
    overflow: hidden;
  }
</style>

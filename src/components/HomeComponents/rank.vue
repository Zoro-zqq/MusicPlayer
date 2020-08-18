<template>
  <div class="page1">
    <m-header>排行榜</m-header>
    <div v-if="officeList.length">
      <scroll :data="officeList" class="page-view-list">
        <div>
          <div class="rank-wrapper">
            <div>
              <p class="rank-title">官方榜</p>
              <ul class="office-list">
                <li class="list-item" v-for="(item,index) in officeList" :key="index" @click="goToRankInfo(item)">
                  <img v-lazy="`${item.coverImgUrl}?param=400y400`">
                  <div>
                    <ul>
                      <li class="list-text" v-for="(listItem,listIndex) in item.tracks" :key="listIndex">
                        {{listIndex+1}}.{{listItem.first}}-{{listItem.second}}
                      </li>
                    </ul>
                    <i class="iconfont icon-zanting"></i>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <p class="rank-title">推荐榜</p>
              <ul class="recommend-list">
                <li v-for="(item2,index2) in recommendList" :key="index2" @click="goToRankInfo(item2)">
                  <img v-lazy="`${item2.coverImgUrl}?param=400y400`">
                  <p>{{item2.name}}</p>
                  <i class="icon-zanting iconfont"></i>
                </li>
              </ul>
            </div>
          </div>
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
  import {mapState, mapActions} from 'vuex'
  import mHeader from "../common/mHeader";
  import Loading from "../common/loading";
  import scroll from "../common/scroll";
  import Scroll from "../common/scroll";
  export default {
    name: 'rank',
    data() {
      return {}
    },
    components: {Scroll, Loading, mHeader},
    created() {
      this.getTopList()
    },
    computed:{
      ...mapState({
        officeList:state=>state.index.officeList,
        recommendList:state=>state.index.recommendList
      })
    },
    methods: {
      ...mapActions({
        getTopList: 'index/getTopList'
      }),
      goToRankInfo(item){
        this.$router.push({
          name: 'rankInfo',
          params:{
            id:item.id
          }
        })
      }
    }

  }
</script>

<style scoped lang="less">
  .rank-wrapper{
    margin-top: 90px;
    .rank-title{
      padding: 30px 20px 10px 20px;
      font-size: 26px;
    }
    .office-list{
      background-color: white;
      .list-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 30px 20px;
        border-bottom: 1PX solid #e6e6e6;
        position: relative;
        img{
          width: 200px;
          height: 200px;
          margin-right: 50px;
        }
        i{
          position: absolute;
          right: 20px;
          top: 30px;
          color: #808080;
          font-size: 50px;
        }
      }
      .list-text{
        font-size: 22px;
        color: #808080;
        margin: 10px 0;
        line-height: 1.5;
      }
    }
    .recommend-list{
      background-color: white;
      padding: 30px 20px;
      li{
        display: inline-block;
        width: 220px;
        margin-right: 25px;
        color: #333;
        vertical-align: top;
        line-height: 1.5;
        position: relative;
        margin-bottom: 40px;
        text-align: center;
        &:nth-of-type(3n){
          margin-right: 0;
        }
        img{
          width: 220px;
          margin-bottom: 15px;
        }
        i{
          font-size: 40px;
          color: white;
          position: absolute;
          right: 10px;
          top: 150px;
        }
      }
    }
  }
</style>

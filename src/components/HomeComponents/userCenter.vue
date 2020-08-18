<template>
    <div class="page1">
    <m-header :red="false">
      个人中心
    </m-header>
      <div class="user-bg">
        <img src="../../assets/image/yidu.jpg" alt="">
        <p>齐齐</p>
      </div>
      <ul class="user-list">
        <li @click="goToPage('userPlay')">
          <div class="icon-wrap">
            <i class="iconfont icon-music"></i> 播放列表
          </div>
          <i class="iconfont icon-you"></i>
        </li>
        <li class="split-item" @click="goToPage('userLove')">
          <div class="icon-wrap">
            <i class="iconfont icon-music"></i> 我的收藏
          </div>
          <i class="iconfont icon-you"></i>
        </li>
        <li @click="goToPage('userHistory')">
          <div class="icon-wrap">
            <i class="iconfont icon-music"></i> 最近听过
          </div>
          <i class="iconfont icon-you"></i>
        </li>
      </ul>
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">

    import MHeader from "../common/mHeader";
    export default {
        name: 'userCenter',
        data() {
            return {}
        },
        components: {MHeader},
      methods:{
        goToPage(path){
            this.$router.push({
              name: path
            })
        }
      }

    }
</script>

<style scoped lang="less">
  .user-bg{
    height: 400px;
    width: 100%;
    background-image: url("../../assets/image/yidu.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;

    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: 60px;
      margin-bottom: 20px;
    }
  }

  .user-list{
    padding-top: 30px;
      li{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        padding: 0 30px;
        font-size: 30px;
        color: #333;
        background-color: white;
        border-bottom: 1PX solid #e6e6e6;
      }

    i{
      font-size: 40px;
      color: #cccccc;
    }

    .icon-wrap{
      display: flex;
      align-items: center;

      i{
        margin-right: 20px;
      }
    }
    .split-item{
      margin-top: 30px;
    }
  }
</style>

<template>
    <div class="page">
      <div class="top" :style="{'backgroundImage': `url(${img}?param=400y400)`}">
        <m-header :red="false">{{title}}</m-header>
        <img :src="`${img}?param=400y400`" alt="">
      </div>
      <div class="count">
        共有{{count}}首歌
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from "./mHeader";
    export default {
        name: 'Top',
        data() {
            return {}
        },
        components: {
          MHeader
        },
      props:{
          title:{
            type: String,
            default: ''
          },
          count:{
            type: Number,
            default: 0
          },
          img:{
            type:String,
            default: ''
          }
      }
    }
</script>

<style scoped lang="less">
  .top{
    position: relative;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    &:after{
      content: '';
      width: calc(~"100% + 80px");
      height: calc(~"100% + 80px");
      position: absolute;
      left: -40px;
      top: -40px;
      background: inherit;
      filter: blur(20px);
    }
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 10PX solid #9e8d7f;
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      z-index: 1;
    }
  }
  .count{
    width: 100%;
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    color: #808080;
    font-size: 26px;
  }
</style>

<template>
    <div class="page">
      <div class="header" :class="{'red': red}">
        <i class="iconfont icon-zuo" @click="goBack()"></i>
        <slot></slot>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'mHeader',
        data() {
            return {}
        },
        props:{
          red:{
            type: Boolean,
            default: true
          }
        },
        components: {},
        methods:{
          goBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style lang="less" scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    height: 90px;
    font-size: 34px;
    color: #fefefe;
    width: 100%;
    line-height: 90px;
    text-align: center;
    z-index: 999;
    &.red{
      background-color: red;
    }
    i{
      font-size: 50px;
      position: absolute;
      left: 20px;
    }
  }
</style>

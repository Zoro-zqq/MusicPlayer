<template>
    <div class="page">
      <div >
        <ul class="play-list">
          <li v-for="(item,index) in data" :key="index" @click="handleClick(item)">
            <img v-lazy="`${item.picUrl}?param=400y400`" alt="">
            <i class="iconfont icon-zanting"></i>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'playList',
        data() {
            return {}
        },
        props:{
          data:{
            type: Array,
            default(){
              return []
            }
          }
        },
        components: {},
        methods:{
          handleClick(val){
            this.$emit('clickItem',val)
          }
        }
    }
</script>

<style scoped>
  .play-list{

  }
  .play-list  li{
    width: 220px;
    display: inline-block;
    margin-right: 25px;
    margin-bottom: 25px;
    vertical-align: top;
    font-size: 24px;
    color: #ccc;
    position: relative;
  }
  .play-list  li:nth-of-type(3n){
      margin-right: 0;
  }
  .play-list img{
    width: 220px;
    height: 220px;
    margin-bottom: 15px;
  }
  .play-list i{
    position: absolute;
    top: 170px;
    right: 10px;
    font-size: 40px;
    color: white;
  }

  .play-list p{
    color: black;
  }
</style>

<template>
    <div class="page">
      <ul class="artists-list">
        <li v-for="(item,index) in data" :key="index" @click="goToArtists(item)">
          <img v-lazy="`${item.picUrl}?param=400y400`" alt="">
          <div>
            <p class="name">{{item.name}}</p>
            <p class="size">专辑{{item.albumSize}}张,共{{item.musicSize}}首歌</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'artistsList',
        data() {
            return {}
        },
        components: {},
      props:{
          data:{
            type:Array,
            default(){
              return []
            }
          }
      },
      methods:{
        goToArtists(val){
          this.$emit('clickItem',val)
        }
      }
    }
</script>

<style scoped lang="less">
  .artists-list li{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px;
    border-top: 1PX solid #ccc;
    margin-left: -20px;
    margin-right: -20px;
  }
  .artists-list img{
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .artists-list .name{
    font-size: 30px;
    margin-bottom: 20px;
  }
  .artists-list .size{
    font-size: 24px;
    color: #ccc;
  }
</style>

<template>
    <div class="page">
      <ul class="song-list">
        <li v-for="(item,index) in data" :key="index" @click="handleClick(item,index)">
          <div>
            <img v-lazy="`${item.al.picUrl}?param=400y400`" alt="">
          </div>
          <div>
            <p>{{item.name}}</p>
            <p class="artists"><span v-for="(item2,index2) in item.ar" :key="index2">
              {{item2.name}}
            </span></p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'songList',
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
        handleClick(item,index){
          this.$emit('clickTo', item, index)
        }
      }
    }
</script>

<style scoped lang="less">
  .song-list{
    li{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 30px;
      border-bottom: 1PX solid #e6e6e6;
      background-color: white;
      font-size: 30px;
      img{
        width: 80px;
        height: 80px;
        margin-right: 20px;
      }
      .artists{
        font-size: 24px;
        color: #b2b2b2;
        margin-top: 10px;
      }
    }
  }
</style>

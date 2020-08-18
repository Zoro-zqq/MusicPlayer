<template>
    <div class="page1">
      <div class="search-header">
        <i class="iconfont icon-chaxun" @click="getSongs"></i>
        <input type="text" v-model="keyWord" @keyup.enter="getSongs" @focus="toggleResultShow(false)">
        <i class="iconfont icon-shanchu2" v-show="keyWord" @click="clearKeyWord"></i>
        <div class="cancel" @click="goBack">取消</div>
      </div>
      <scroll class="list-container history-list" v-show="!resultShow">
        <ul>
          <li class="list-title" v-if="searchText.length">搜索历史</li>
          <li class="list-item history-item" v-for="(item,index) in searchText" :key="index" @click="addToSearch(item)">
            {{item}} <i class="iconfont icon-shanchu1" @click.stop="delKeyWord(item)"></i>
          </li>
          <li class="list-title">热门搜索</li>
          <li class="list-item" v-for="(item2,index2) in hotWords" :key="`hot-${index2}`" @click="addToSearch(item2.first)">{{item2.first}}
          </li>
        </ul>
      </scroll>
      <div v-show="resultShow">
        <p class="list-count">共有{{resultData.length}}首歌曲</p>
        <scroll class="list-container result-list">
          <ul>
            <li v-for="(item,index) in resultData" :key="index" class="list-item" @click="addToPlay(item,index)">
              <p>{{item.name}}</p>
              <p class="artists-name">
                <span v-for="(item2,index2) in item.ar" :key="index2">
                  {{item2.name}}
                </span>
              </p>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from "../common/scroll";
    import {mapGetters,mapMutations} from 'vuex'
    import axios from 'axios';
    import API from '../../assets/js/api'
    import {formatSongDetail} from "../../common/js/util";
    import playMixin from "../../common/js/playMixin";
    export default {
        name: 'search',
      mixins:[playMixin],
        data() {
            return {
              resultShow: false,
              hotWords: [],
              resultData: [],
              keyWord:""
            }
        },
        components: {Scroll},
      created() {
          this.getHotWords()
      },
      computed:{
          ...mapGetters({
            'searchText': 'player/searchText'
          })
      },
      methods:{
          ...mapMutations({
            "SET_SEARCH_TEXT": "player/SET_SEARCH_TEXT",
            "DEL_FROM_SEARCH_TEXT": "player/DEL_FROM_SEARCH_TEXT"
          }),
        async getHotWords(){
            const { data } = await axios.get(API.baseApi+'/search/hot')
          if(data.code === 200){
            this.hotWords = data.result.hots
          }
        },
        async getSongs(){
            if(!this.keyWord.trim()) return;
            const { data } = await axios.get(API.baseApi+`/search?keywords=${this.keyWord}`)
          if(data.code === 200){
            this.resultData = formatSongDetail(data.result.songs)
          }
            this.SET_SEARCH_TEXT(this.keyWord)
          this.toggleResultShow(true)
        },
        toggleResultShow(val){
            this.resultShow = val
        },
        addToSearch(val){
            this.keyWord = val
          this.getSongs()
        },
        goBack(){
            this.$router.back()
        },
        delKeyWord(val){
            this.DEL_FROM_SEARCH_TEXT(val)
        },
        clearKeyWord(){
            this.keyWord = ''
        },
        addToPlay(item,index){
          this.SET_FULLSCREEN(true)
          this.SET_PLAY_LIST(this.resultData)
          this.SET_SEQUENCE_LIST(this.resultData)
          this.SET_CURRENT_INDEX(index)
        }
      }
    }
</script>

<style scoped lang="less">
  .search-header{
    padding: 15px 30px;
    background-color: #f2353c;
    height:60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    input{
      border-radius: 10px;
      height: 60px;
      font-size: 32px;
      color: #999;
      padding-left: 65px;
      box-sizing: border-box;
      flex: 1;
      outline: none;
    }

    .icon-chaxun{
      position: absolute;
      left: 45px;
      top: 29px;
      font-size: 32px;
      color: #999;
    }
    .icon-shanchu2{
      position: absolute;
      top: 29px;
      right: 130px;
      font-size: 32px;
      color: #999;
    }
    .cancel{
      font-size: 28px;
      margin-left: 30px;
      color: white;
    }
  }
  .history-list{
    height: calc(~'100vh - 200px');
  }
  .list-container{
    overflow: hidden;

    .list-title{
      padding: 0 30px;
      line-height: 65px;
      font-size: 24px;
      color: #989898;
    }

    .list-item{
      padding: 30px;
      font-size: 28px;
      color: #333;
      background-color: white;
      border-bottom: 1PX solid #e6e6e6;
    }

    .history-item{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .icon-shanchu1{
      font-size: 30px;
      color: #999;
    }
  }

  .list-count{
      padding: 0 30px;
    height: 80px;
    line-height: 80px;
    font-size: 26px;
    color: #808080;
  }

  .result-list{
    height: calc(~"100vh - 170px");
      .artists-name{
        margin-top: 10px;
        font-size: 20px;
        color: #b2b2b2;
      }
  }
</style>

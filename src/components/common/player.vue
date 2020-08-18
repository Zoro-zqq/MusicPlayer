<template>
  <div class="page">
    <div v-if="!fullScreen" class="mini-player">
      <div class="player-info" @click="toggleShow(true)">
        <div class="player-img rotate" :class="rotateStop">
          <img :src="songImg" alt="">
        </div>
        <div>
          <p class="player-name">{{songName}}</p>
          <p class="player-artists">
            <span v-for="(item,index) in songArtists" :key="index">{{item.name}}</span>
          </p>
        </div>
      </div>
      <div class="player-operate">
        <i class="iconfont icon-op" :class="playIcon" @click="togglePlay"></i>
        <i class="iconfont icon-xiayiqu" @click="next"></i>
      </div>
      <div class="player-process" :style="{width: `${barPercent}`}"></div>
    </div>
    <transition name="player">
      <div class="player" v-if="fullScreen" :style="{'backgroundImage': `url(${songImg})`}">
        <div class="player-mask"></div>
        <div class="player-header">
          <i class="iconfont icon-xia" @click="toggleShow(false)"></i>
          <div class="header-info">
            <p>{{songName}}</p>
            <p class="player-artists">
              <span v-for="(item,index) in songArtists" :key="index">{{item.name}}</span>
            </p>
          </div>
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide class="img-container">
            <img :src="songImg" class="rotate" :class="rotateStop">
            <i class="iconfont icon-xiai" :class="{'icon-xiai-red': isLove}" @click="addToLove"></i>
          </swiper-slide>
          <swiper-slide class="lyric-container">
            <scroll ref="lyricScroll" class="lyric-scroll">
              <ul v-if="lyricLines.length > 0">
                <li ref="lyricLine" class="list-item" :class="{'active': index === currentLineNumber}" v-for="(item,index) in lyricLines" :key="index">
                  {{item.txt}}
                </li>
              </ul>
              <div v-else>暂无歌词</div>
            </scroll>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="player-operate">
          <div class="operate-mask"></div>
          <div class="progress">
            <span class="time">{{formatTime(currentTime)}}</span>
            <div class="progress-bar" ref="processBar" @click="processClick">
              <div class="bar-moved" :style="{width: `${barPercent}`}"></div>
              <div class="bar-btn" :style="{left: `${barPercent}`}" @touchmove.prevent="processMove" @touchend="processEnd"></div>
            </div>
            <span class="time">{{formatTime(overTime)}}</span>
          </div>
          <div class="operate-icon">
            <i class="iconfont ft-40" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont icon-shangyiqu ft-80" @click="prev"></i>
            <i class="iconfont ft-100" :class="playIcon" @click="togglePlay"></i>
            <i class="iconfont icon-xiayiqu ft-80" @click="next"></i>
            <i class="iconfont icon-more ft-40" @click="changePlayListShow"></i>
          </div>
        </div>
      </div>
    </transition>
    <div class="playlist-mask" @click="changePlayListShow" v-if="playListShow"></div>
    <transition name="playlist" v-if="playListShow">
      <scroll class="playlist-scroll">
        <ul>
          <li v-for="(item,index) in playList" :key="index" @click="addToPlay(index)">
            <p>{{item.name}} - <span class="artists-name" v-for="(arItem,arIndex) in item.ar" :key="arIndex">{{arItem.name}}</span></p>
            <i class="iconfont icon-shanchu2" @click.stop="delFromPlayList(item)"></i>
          </li>
        </ul>
        <div class="close" @click="changePlayListShow">关闭</div>
      </scroll>
    </transition>
    <audio :src="musicData.url" ref="audio" @ended="end" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapState, mapActions} from 'vuex'
  import {playMode} from "../../common/js/aliasConfig";
  import scroll from "./scroll";

  export default {
    name: 'player',
    data() {
      return {
        swiperOption: {
          // 参数选项,显示小点
          pagination: '.swiper-pagination',
        },
        playing: false,
        currentTime:0,
        overTime: 0,
        TouchBarWillMove: false,
        lyricLines: [],
        currentLineNumber:0,
        playListShow: false
      }
    },
    components: {scroll},
    created() {

    },
    watch: {
      currentSong(newVal, oldVal) {
        if (oldVal === undefined || newVal.id !== oldVal.id) {
          this.getMusic({id:newVal.id,success: ()=>{
              this.$nextTick(()=>{
                this.togglePlay(true)
                this.SET_HISTORY_LIST(this.currentSong)
              })
            }})
          this.getLyric({id:newVal.id,success: ()=>{
            this.lyricLines = []
              if(this.lyricData){
                const lines = this.lyricData.split('\n')
                for(let i = 0; i < lines.length; i++){
                  const line = lines[i]
                  const timeExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/
                  const  result = timeExp.exec(line)
                  if(result){
                    const  time = Number(result[1]*60*1000) + Number(result[2]*1000)
                    const txt = line.replace(timeExp,'').trim()
                    this.lyricLines.push({
                      time,
                      txt
                    })
                  }
                }
              }
            }})
        }
      }
    },
    computed: {
      ...mapState({
        musicData: state => state.player.musicData,
        lyricData: state => state.player.lyricData
      }),
      ...mapGetters({
        currentSong: "player/currentSong",
        fullScreen: "player/fullScreen",
        playList: "player/playList",
        sequenceList: "player/sequenceList",
        currentIndex: "player/currentIndex",
        mode: "player/mode",
        isLove: "player/isLove"
      }),
      songName() {
        return this.currentSong ? this.currentSong.name : '暂无播放歌曲'
      },
      songArtists() {
        return this.currentSong ? this.currentSong.ar : []
      },
      songImg() {
        return this.currentSong ? `${this.currentSong.al.picUrl}?param=400y400` : require('../../assets/image/yidu.jpg')
      },
      playIcon(){
        return this.playing?'icon-bofang':'icon-zanting'
      },
      modeIcon(){
        return this.mode === playMode.sequence ? 'icon-liebiaoxunhuan' : (this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suiji')
      },
      barPercent(){
        let p = this.currentTime / this.overTime
        if(p === 0){
          return 0
        }
        p = Number(p * 100).toFixed()
        return `${p}%`
      },
      rotateStop(){
        return this.playing ? '' : 'rotate-stop'
      }
    },
    methods: {
      ...mapMutations({
        SET_FULLSCREEN: 'player/SET_FULLSCREEN',
        SET_CURRENT_INDEX: 'player/SET_CURRENT_INDEX',
        SET_MODE:'player/SET_MODE',
        SET_PLAY_LIST:'player/SET_PLAY_LIST',
        DEL_FROM_PLAY_LIST: 'player/DEL_FROM_PLAY_LIST',
        SET_HISTORY_LIST: 'player/SET_HISTORY_LIST',
        SET_LOVE_LIST: 'player/SET_LOVE_LIST',
        DEL_FROM_LOVE_LIST: 'player/DEL_FROM_LOVE_LIST'
      }),
      ...mapActions({
        getMusic: 'player/getMusic',
        getLyric: 'player/getLyric'
      }),
      toggleShow(val) {
        this.SET_FULLSCREEN(val)
      },
      togglePlay(val) {
        if (!this.currentSong) return;
        if (val === true || val === false) {
          this.playing = val
        } else {
          this.playing = !this.playing
        }
        const audio = this.$refs.audio
        if(this.playing){
          audio.play()
        }else {
          audio.pause()
        }
      },
      prev(){
        const len = this.playList.length
        let newIndex = this.currentIndex - 1
        if(newIndex < 0){
          newIndex = len - 1
        }
        this.SET_CURRENT_INDEX(newIndex)
      },
      next(){
        const len = this.playList.length
        let newIndex = this.currentIndex + 1
        if(newIndex === len){
          newIndex = 0
        }
        this.SET_CURRENT_INDEX(newIndex)
      },
      changeMode(){
        const modeNumber = (this.mode + 1) % 3
        this.SET_MODE({mode:modeNumber})
        let newPlayList = []
        if(this.mode === playMode.random){
          newPlayList = this.getRandomList(this.sequenceList)
        }else {
          newPlayList = this.sequenceList
        }
        const newIndex = newPlayList.findIndex(item => item.id === this.currentSong.id)
        this.SET_PLAY_LIST(newPlayList)
        this.SET_CURRENT_INDEX(newIndex)
      },
      getRandomList(arr){
        const  newArr = [].concat(arr)
        return newArr.sort((a,b) => (Math.random() > 0.5 ? -1 : 1))
      },
      end(){
        if(this.mode === playMode.loop){
          this.loop()
        }else {
          this.next()
        }
      },
      updateTime(e){
        if(!this.TouchBarWillMove){
          this.currentTime = e.target.currentTime
          this.overTime = e.target.duration
        }
        if(this.lyricData){
          this.moveLyric()
        }
      },
      formatTime(val){
        if(isNaN(val)) return '00:00';
        let m = Math.floor(val / 60)
        let s = Math.floor(val % 60)
        if(m < 10){
          m = `0${m}`
        }
        if(s < 10){
          s = `0${s}`
        }
        return `${m}:${s}`
      },
      processMove(e){
        this.TouchBarWillMove = true
        const pageX = e.touches[0].pageX
        this.calcPercent(pageX)
      },
      processClick(e){
        this.TouchBarWillMove = true
        const pageX = e.pageX
        this.calcPercent(pageX)
        this.resetPlayer()
      },
      calcPercent(x){
        const offsetLeft = this.$refs.processBar.offsetLeft
        const barWidth = this.$refs.processBar.clientWidth
        let moveWidth = x - offsetLeft
        if(moveWidth > barWidth){
          moveWidth = barWidth
        }
        if(moveWidth < 0){
          moveWidth = 0
        }
        let p = moveWidth/barWidth
        this.currentTime = this.overTime * p
        this.moveLyric()
      },
      processEnd(){
        this.resetPlayer()
      },
      resetPlayer(){
        this.$refs.audio.currentTime = this.currentTime
        this.togglePlay(true)
        this.TouchBarWillMove = false
      },
      moveLyric(){
        this.currentLineNumber = this.findCurrentNumber(this.currentTime * 1000)
        if(this.currentLineNumber > 6){
              this.$refs['lyricScroll'].scrollToElements(this.$refs.lyricLine[this.currentLineNumber - 6],1000)
        }else{
              this.$refs['lyricScroll'].scrollTos(0,0,1000)
        }
      },
      findCurrentNumber(time){
        for(let i = 0; i < this.lyricLines.length; i++){
          if(time < this.lyricLines[i].time){
            return i - 1
          }
        }
        return this.lyricLines.length - 1
      },
      changePlayListShow(){
        this.playListShow = !this.playListShow
      },
      addToPlay(index){
        this.SET_CURRENT_INDEX(index)
        this.changePlayListShow()
      },
      delFromPlayList(item){
          this.DEL_FROM_PLAY_LIST({
            'delSong': item,
            'curSong': this.currentSong
          })
      },
      addToLove(){
        if(this.isLove){
          this.DEL_FROM_LOVE_LIST(this.currentSong)
        }else {
          this.SET_LOVE_LIST(this.currentSong)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .mini-player {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px 10px 20px;
    background-color: #150a06;
    color: white;
    z-index: 9999;

    .player-info {
      display: flex;
      flex-direction: row;
      align-items: center;

      .player-img {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        border-radius: 50%;
        border: 4PX solid #695945;
        margin-right: 20px;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .player-name {
        font-size: 26px;
        margin-bottom: 10px;
        line-height: 30px;
      }

      .player-artists {
        font-size: 20px;
        color: #b2b2b2;
      }
    }

    .player-operate {
      i {
        font-size: 65px;
        color: #c9c3c1;
      }

      .icon-op {
        margin-right: 50px;
      }
    }

    .player-process {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 6px;
      background-color: #f2353c;
    }
  }

  .player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    color: white;
    z-index: 9999;

    &::after {
      content: '';
      width: calc(~"100% + 80px");
      height: calc(~"100% + 80px");
      position: absolute;
      left: -40px;
      top: -40px;
      background: inherit;
      filter: blur(20px);
      z-index: -2;
    }

    .player-mask {
      position: absolute;
      display: flex;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: .4;
    }

    .player-header {
      padding: 30px;
      height: 60px;

      i {
        font-size: 46px;
        position: absolute;
        left: 30px;
        height: 30px;
      }

      .header-info {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        font-size: 30px;
        overflow: hidden;
        text-overflow: ellipsis;

        .player-artists {
          font-size: 18px;
          margin-top: 12px;
          color: #b2b2b2;
        }
      }
    }

    .swiper-container {
      width: 100%;
      height: calc(~"100% - 360px");
    }

    .img-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 20PX solid #2b433c;
      }

      i {
        position: absolute;
        left: 30px;
        bottom: 30px;
        font-size: 50px;
        color: #c4b9bb;
      }
    }

    .player-operate {
      width: 100%;
      height: 300px;
      position: relative;

      .operate-mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .1);
        z-index: -1;
      }

      .progress {
        display: flex;
        padding: 30px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        .time {
          width: 60px;
        }

        .progress-bar {
          width: 560px;
          height: 4px;
          background-color: #7e7374;
          margin: 0 30px;
          position: relative;

          .bar-moved {
            height: 100%;
            background-color: #f2353c;
            position: absolute;
            top: 0;
            left: 0;
          }

          .bar-btn {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 5PX solid #5d5759;
            position: absolute;
            top: 0;
            background-color: white;
            transform: translate3d(-50%, -50%, 0);
          }
        }
      }

      .operate-icon {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        color: #c4b9bb;

        .ft-40 {
          font-size: 40px;
        }

        .ft-80 {
          font-size: 80px;
        }

        .ft-100 {
          font-size: 100px;
        }
      }
    }
  }

  .player-enter-active, .player-leave-active {
    transition: all .3s;
    opacity: 1;

    .player-header, .player-operate {
      transform: translate3d(0, 0, 0);
      transition: all .3s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }

  .player-enter, .player-leave-to {
    opacity: 0;

    .player-header {
      transform: translate3d(0, -100px, 0);
    }

    .player-operate {
      transform: translate3d(0, 100px, 0);
    }
  }

  .lyric-container{
    padding: 30px 30px 70px 30px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .lyric-scroll{
      width: 100%;
      height: 100%;
      color: white;
      text-align: center;
      overflow: hidden;
      .list-item{
        font-size: 24px;
        line-height: 1.5;
        min-height: 50px;
        opacity: .5;
        &.active{
          opacity: 1;
          font-size: 32px;
          margin-bottom: 15px;
        }
      }
    }
  }
  .playlist-scroll{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 800px;
    overflow: hidden;
    z-index: 99999;
    background-color: rgba(255,255,255,.95);
    border-radius: 10px 10px 0 0;
    ul{
      padding-bottom: 80px;
      li{
        padding: 30px 20px;
        font-size: 24px;
        border-bottom: 1PX solid #e6e6e6;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .artists-name{
        font-size: 18px;
        color: #b3b3b3;
      }
      i{
        font-size: 24px;
        color: lightgray;
      }
    }
    .close{
      line-height: 80px;
      font-size: 30px;
      color: #333;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1PX solid #e6e6e6;
      background-color: white;
    }
  }
  .playlist-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    background-color: rgba(0,0,0,.4);
  }

  .playlist-enter-active,.playlist-leave-active{
    transition: all .3s;
  }
  .playlist-enter,.playlist-leave-to{
    transform: translate3d(0,100%,0);
  }

  @keyframes rotate {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
  .rotate{
    animation: rotate 30s linear infinite;
  }

  .rotate-stop{
    animation-play-state: paused;
  }
</style>

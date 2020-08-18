import {playMode} from "../../common/js/aliasConfig";
import {getMusicData,getLyricData} from "../../api/details";

export default {
  namespaced:true,
  state:{
    fullScreen: false,
    playList:[],
    sequenceList: [],
    currentIndex: 0,
    mode: playMode.sequence,
    musicData: {},
    lyricData:null,
    historyList: JSON.parse(localStorage.getItem('HistoryList')) || [],
    loveList: JSON.parse(localStorage.getItem('LoveList')) || [],
    searchText: JSON.parse(localStorage.getItem('SearchText')) || [],
  },
  mutations:{
      ["SET_FULLSCREEN"](state,payload){
        state.fullScreen = payload
      },
    ["SET_PLAY_LIST"](state,payload){
      state.playList = payload
    },
    ["SET_SEQUENCE_LIST"](state,payload){
      state.sequenceList= payload
    },
    ["SET_CURRENT_INDEX"](state,payload){
      state.currentIndex = payload
    },
    ["SET_MODE"](state,payload){
      state.mode = payload.mode
    },
    ["SET_MUSIC"](state,payload){
      state.musicData = payload.musicData
    },
    ["SET_LYRIC"](state,payload){
      state.lyricData = payload
    },
    ["DEL_FROM_PLAY_LIST"](state,payload){
      const index = state.playList.findIndex(item => item.id === payload.delSong.id)
      state.playList.splice(index,1)
      if(payload.delSong.id !== payload.curSong.id){
        state.currentIndex = state.playList.findIndex(item => item.id === payload.curSong.id)
      }
    },
    ["SET_HISTORY_LIST"](state,payload){
        let haveHistory = false
      for(let i = 0;i < state.historyList.length; i += 1){
          if(state.historyList[i].id = payload.id){
            haveHistory = true
            return
          }
      }
      if(!haveHistory){
        state.historyList.push(payload)
      }
      localStorage.setItem('HistoryList',JSON.stringify(state.historyList))
    },
    ["SET_LOVE_LIST"](state,payload){
      let haveLove = false
      for(let i = 0;i < state.loveList.length; i += 1){
        if(state.loveList[i].id = payload.id){
          haveLove = true
          return
        }
      }
      if(!haveLove){
        state.loveList.push(payload)
      }
      localStorage.setItem('LoveList',JSON.stringify(state.loveList))
    },
    ["DEL_FROM_LOVE_LIST"](state,payload){
        const index =state.loveList.findIndex(item => item.id === payload.id)
        state.loveList.splice(index,1)
        localStorage.setItem('LoveList',JSON.stringify(state.loveList))
    },
    ["SET_SEARCH_TEXT"](state,payload){
      let haveText = false
      for(let i = 0;i < state.searchText.length; i += 1){
        if(state.searchText[i] = payload.trim()){
          haveText = true
          return
        }
      }
      if(!haveText){
        state.searchText.unshift(payload)
        state.searchText = state.searchText.slice(0,10)
      }
      localStorage.setItem('SearchText',JSON.stringify(state.searchText))
    },
    ["DEL_FROM_SEARCH_TEXT"](state,payload){
      for(let i = 0; i < state.searchText.length; i += 1){
        if(state.searchText[i] = payload.trim()){
          state.searchText.splice(i,1)
        }
      }
      localStorage.setItem('SearchText',JSON.stringify(state.searchText))
    },
  },
  actions:{
      getMusic(context,payload){
        getMusicData(payload.id).then(res=>{
          if(res.data.code === 200 && res.data.data[0].code === 200){
            context.commit("SET_MUSIC",{musicData:res.data.data[0]})
            if(payload.success){
              payload.success()
            }
          }
        })
      },
    getLyric(context,payload){
      getLyricData(payload.id).then(res=>{
        if(res.data.code === 200 && res.data.lrc.lyric){
          context.commit("SET_LYRIC",res.data.lrc.lyric)
          if(payload.success){
            payload.success()
          }
        }
      })
    }
  },
  getters:{
    currentSong(state){
      return state.playList[state.currentIndex]
    },
    fullScreen(state){
      return state.fullScreen
    },
    playList(state){
      return state.playList
    },
    sequenceList(state){
      return state.sequenceList
    },
    currentIndex(state){
      return state.currentIndex
    },
    mode(state){
      return state.mode
    },
    isLove(state){
      let isLove = false
      const currentSong = state.playList[state.currentIndex]
      for(let i = 0; i < state.loveList.length; i += 1){
        if(currentSong && state.loveList[i].id === currentSong.id){
          isLove = true
          return isLove
        }
      }
      return isLove
    },
    searchText(state){
      return state.searchText
    },
    historyList(state){
      return state.historyList
    },
    loveList(state){
      return state.loveList
    },
  }
}

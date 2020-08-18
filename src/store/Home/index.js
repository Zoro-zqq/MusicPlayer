import {getPlayListData, getSwiperData,getArtistsData,getTopListData,getArtistsAllData} from "../../api/Home";
let modules = {
  namespaced:true,
  state:{
    result:[],
    playList:[],
    artists:[],
    artistsAll:[],
    playListAll:[],
    recommendList:[],
    officeList:[],
  },
  mutations:{
    ['NewSong'](state,payload){
      state.result = payload.result
    },
    ["SETPLAYLIST"](state,payload){
      state.playList = payload.playList
      state.playListAll = payload.playListAll
    },
    ["SETARTISTS"](state,payload){
      state.artists = payload.artists
    },
    ["SETARTISTSALL"](state,payload){
      state.artistsAll = payload.artistsAll
    },
    ["SETTOPLIST"](state,payload){
      state.officeList = payload.officeList
      state.recommendList = payload.recommendList
    }
  },
  actions:{
      getSwiper(context,payload){
         getSwiperData().then(res=>{
           // console.log(res)
           if(res.code === 200){
             context.commit("NewSong",{result: res.result})
             if(payload.success){
               payload.success()
             }
           }
         })
      },
    getPlayList(context,payload){
      getPlayListData().then(res=>{
        // console.log(res.data)
        if(res.data.code === 200){
          // console.log(res.data.result.slice(0,6))
          context.commit("SETPLAYLIST",{playList: res.data.result.slice(0,6),playListAll: res.data.result})
        }
      })
    },
    getArtists(context,payload){
      getArtistsData().then(res=>{
        if(res.data.code === 200){
          context.commit("SETARTISTS",{artists: res.data.artists})
        }
      })
    },
    getArtistsAll(context,payload){
      getArtistsAllData().then(res=>{
        if(res.data.code === 200){
          context.commit("SETARTISTSALL",{artistsAll: res.data.artists})
        }
      })
    },
    getTopList(context){
        getTopListData().then(res=>{
          if(res.data.code === 200){
            context.commit("SETTOPLIST",{officeList:res.data.list.slice(0,4),
              recommendList: res.data.list.slice(4,res.data.list.length)})
          }
        })
    }
  }
}

export default modules

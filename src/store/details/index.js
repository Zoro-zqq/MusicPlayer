import {getArtistsInfoData, getPlayListInfoData, getRankInfoData} from "../../api/details";

export default {
  namespaced: true,
  state: {
    rankInfo: [],
    playListInfo: [],
    artistsInfo: []
  },
  mutations: {
    ["SETARTISTSINFO"](state, payload) {
      state.artistsInfo = payload.artistsInfo
    },
    ["SETPLAYLISTINFO"](state, payload) {
      state.playListInfo = payload.playListInfo
    },
    ["SETRANKINFO"](state, payload) {
      state.rankInfo = payload.rankInfo
    }
  },
  actions: {
    getArtistsInfo(context, payload) {
      getArtistsInfoData(payload.id).then(res => {
        if (res.data.code === 200) {
          context.commit("SETARTISTSINFO", {artistsInfo: res.data.hotSongs})
          if(payload.success){
            payload.success()
          }
        }
      })
    },
    getPlayListInfo(context, payload) {
      getPlayListInfoData(payload.id).then(res => {
        if (res.data.code === 200) {
          context.commit("SETPLAYLISTINFO", {playListInfo: res.data.playlist.tracks})
          if(payload.success){
            payload.success()
          }
        }
      })
    },
    getRankInfo(context, payload) {
      getRankInfoData(payload.id).then(res => {
        if (res.data.code === 200) {
          context.commit("SETRANKINFO", {rankInfo: res.data.playlist.tracks})
          if(payload.success){
            payload.success()
          }
        }
      })
    },
  }
}

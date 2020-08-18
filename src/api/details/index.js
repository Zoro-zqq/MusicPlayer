import axios from 'axios'
import API from '../../assets/js/api'

export async function getArtistsInfoData(id) {
  return axios.get(API.baseApi+`/artists?id=${id}`)
}

export async function getPlayListInfoData(id) {
  return axios.get(API.baseApi+`/playlist/detail?id=${id}`)
}

export async function getRankInfoData(id) {
  return axios.get(API.baseApi+`/playlist/detail?id=${id}`)
}

export async function getMusicData(id) {
  return   axios.get(API.baseApi+`/song/url?id=${id}`)
}

export async function getLyricData(id) {
  return   axios.get(API.baseApi+`/lyric?id=${id}`)
}

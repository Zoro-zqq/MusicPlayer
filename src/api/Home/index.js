import axios from 'axios'
import API from '../../assets/js/api'

export async function getSwiperData() {
  let {data} = await axios.get(API.baseApi+'/personalized/newsong')
  // console.log(data)
  return data
}

export  async function getPlayListData() {
  return await axios.get(API.baseApi+'/personalized')
}

export  async function getArtistsData() {
  return await axios.get(API.baseApi+'/top/artists?limit=10')
}

export  async function getArtistsAllData() {
  return await axios.get(API.baseApi+'/top/artists')
}

export  async function getTopListData() {
  return await axios.get(API.baseApi+'/toplist/detail')
}

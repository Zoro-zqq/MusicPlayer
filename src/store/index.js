import Vuex from 'vuex'
import Vue from 'vue'
import index from "./Home";
import details from "./details"
import player from "./player";

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    index,
    details,
    player
  }
})

export default store

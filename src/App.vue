<template>
  <div id="app">
    <router-view/>
    <player></player>
  </div>
</template>

<script>
  import player from "./components/common/player";
  import eruda from 'eruda'
export default {
  name: 'App',
  components:{
    player
  },
  created() {
    const  el = document.createElement('div')
    document.body.appendChild(el)
    eruda.init({
      container: el,
      tool: ['console', 'elements','network']
    })
  }
}
</script>

<style scoped>
#app {
}
</style>

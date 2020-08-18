<template>
      <div ref="scrollWrapper">
        <slot></slot>
      </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
    export default {
        name: 'scroll',
        data() {
            return {}
        },
        components: {},
        props:{
          data:{
            type: Array,
            default(){
              return []
            }
          }
        },
        watch: {
          data(val){
            this.$nextTick(()=>{
              this.refresh()
            })
          }
        },
        mounted() {
          this.$nextTick(()=>{
            this.initScroll()
          })
        },
        methods:{
          initScroll(){
            if(!this.$refs.scrollWrapper) return;
           this.scroll = new BScroll(this.$refs.scrollWrapper,{ mouseWheel: true, click: true, tap: true })
          },
          refresh(){
            this.scroll && this.scroll.refresh()
          },
          scrollToElements(){
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
          },
          scrollTos(){
            this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
          },
        }
    }
</script>

<style scoped lang="less">
</style>

<template>
    <div class="page">
        <div class="count">
          共有<slot></slot>首歌曲
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'count',
        data() {
            return {}
        },
        components: {}
    }
</script>

<style scoped lang="less">
  .count{
    width: 100%;
    padding-left: 30px;
    height: 80px;
    line-height: 80px;
    color: #808080;
    font-size: 26px;
  }
</style>

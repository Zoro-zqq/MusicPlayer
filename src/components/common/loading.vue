<template>
    <div class="page">
      <img src="../../assets/image/loading.gif">
      <div>玩命加载中...</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'loading',
        data() {
            return {}
        },
        components: {}
    }
</script>

<style scoped lang="less">
  .page{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
  }
</style>

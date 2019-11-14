<template>
  <div id="notfund">
    <img src="../../../static/files/404.png" alt="">
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
  #notfund{
    background: #fff;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }

  }
</style>

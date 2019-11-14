<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: '微软雅黑';
  }
  html,body{
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  body{
    background: #fff;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  /*清除浮动代码*/
   .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
</style>

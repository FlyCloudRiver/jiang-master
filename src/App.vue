<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@percent: 100%;
html {
  height: @percent;
  margin: 0;
  padding: 0;
  body {
    height: @percent;
    margin: 0;
    padding: 0;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: blue;
  height: 100%;
  width: @percent;

  //表格样式统一设置
  .el-table--border th {
    background-color: #808F9F;
    color: aliceblue;
    text-align: center;
  }//表头背景颜色
  .el-table td{
    text-align: center;
    // background-color:	#F0FFFF;
  }//表格内容
  //侧栏样式
  .el-menu{
   background-color:	#F5F5F5;
  }//背景
 .el-menu-item.is-active{
    background-color:#808F9F
  }//侧栏选中颜色
}
//输入框长度
.el-input{
  width: 210px;
}
.el-input__inner{
  height: 35px;
}
  .el-table{
    .el-input{
      width: 80%;
    }
  }
</style>

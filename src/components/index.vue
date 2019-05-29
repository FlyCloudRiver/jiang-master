<template>
  <el-container class="visit">
    <el-aside class="content" width="200px">
      <left-menu class="left-menu"></left-menu>
    </el-aside>
    <el-container>
      <el-header>
        <index-tab></index-tab>
      </el-header>
      <el-main>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
       <router-view  v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftMenu from "../components/leftMenu.vue";
import indexTab from "../components/indexTab.vue";
export default {
  data() {
    return {};
  },
  components: {
    leftMenu,
    indexTab
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
::-webkit-scrollbar{width: 6px; height: 6px;} 
  /*定义滚动条轨道 内阴影+圆角*/ 
  ::-webkit-scrollbar-track{border-radius: 10px;} 
  /*定义滑块 内阴影+圆角*/ 
  ::-webkit-scrollbar-thumb{border-radius: 10px;background-color: rgba(70, 69, 69, 0.226);} 
@percent: 100%;
.visit {
  width: 100%;
  height: @percent;
  .content {
    width: 100%;
    height: @percent;
  }
}
</style>

<template>
  <div class="all">
    <div class="header">商品管理系统
       <span>欢迎{{this.$store.state.loading.user.name+'&nbsp&nbsp'}}<i class="fa fa-sign-out" aria-hidden="true" @click="signOut"></i></span>
    </div>
    <span>
      <el-breadcrumb class="breadBox">
        <el-breadcrumb-item> 当前位置：{{bread}}</el-breadcrumb-item>
      </el-breadcrumb>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bread: ""
    };
  },
  watch: {
    $route: "breadCrumbChange"
  },
  created() {
    sessionStorage.setItem("name", this.$route.name);
    this.bread = sessionStorage.getItem("name");
    this.$store.commit('loading/setUser',JSON.parse(sessionStorage.getItem('user')))
  },
  methods: {
       signOut(){
       this.$confirm("您是否确认退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          sessionStorage.clear('user');
            this.$router.push({
        path: "/loading",
        query: {}
          });
      }).catch(() => {});
    },
        //  面包屑
    breadCrumbChange() {
      sessionStorage.setItem("name", this.$route.name);
      this.bread = sessionStorage.getItem("name");
    }
  },
};
</script>
<style lang="less" scoped>
.all{
.header{
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px #F2F6FC solid;
   span{
    display: block;
    float:right;
    font-size: 5px;
    i{
      font-size: 20px
    }
  }
}
.breadBox{
  line-height: 15px;
}
}

</style>

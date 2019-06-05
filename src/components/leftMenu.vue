<template>
  <div class="all">
    <el-menu
      router
      unique-opened
    >
      <el-menu-item-group>
        <el-submenu index="1">
          <template slot="title">
            <span>基础信息管理</span>
          </template>
          <el-menu-item index="/Index/supplierManage">厂商管理</el-menu-item>
          <el-menu-item index="/Index/goodsManage">商品管理</el-menu-item>
          <el-menu-item index="/Index/categoriesManage">分类管理</el-menu-item>
        </el-submenu>
         <el-submenu index="2" v-if="this.$store.state.loading.user.roleDTOS[0].role=='administrators'">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="/Index/userManage">用户管理</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <span>订单管理</span>
          </template>
          <el-menu-item index="/Index/purchasingManage">采购单</el-menu-item>
          <el-menu-item index="/Index/shipmentManage">销售单</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <span>库存管理</span>
          </template>
          <el-menu-item index="/Index/storageRoom">查看库存</el-menu-item>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <span>查看报表</span>
          </template>
          <el-menu-item index="/Index/report">报表</el-menu-item>

        </el-submenu>

      </el-menu-item-group>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.loading.user.roleDTOS[0].role)
  }
};
</script>
<style scoped lang='less'>
@percent: 100%;
.all {
  height: @percent;
  background-color: #f5f5f5;
  .el-menu {
    border: none !important;

    //  .el-menu{
    //      background-color: seagreen;
    //      .el-menu-item-group .el-submenu .el-menu{
    //           background-color: seagreen!important;
    //      }
  }
}
</style>

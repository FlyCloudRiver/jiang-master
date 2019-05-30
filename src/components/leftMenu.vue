<template>
  <div class="all">
    <el-menu router unique-opened>
      <el-menu-item-group>
        <el-submenu index="1">
          <template slot="title">
            <span>基础资料管理</span>
          </template>
          <el-menu-item index="/Index/supplier">厂商管理</el-menu-item>
          <el-menu-item index="/Index/goodsManage">商品管理</el-menu-item>
          <el-menu-item index="/Index/categoriesManage">分类管理</el-menu-item>
        </el-submenu>
         <el-submenu index="2">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="/Index/userManagement1">用户管理</el-menu-item>
        <!--  <el-menu-item index="/Index/UserManagement">权限管理</el-menu-item>-->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>库存管理</span>
          </template>
          <el-menu-item index="/Index/totalInventory">查看库存</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>订单管理</span>
          </template>
          <el-menu-item index="/Index/PurchasingManage">采购单</el-menu-item>
          <el-menu-item index="/Index/SalesList">销售单</el-menu-item>
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

<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库单号：">
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库类型：">
              <span></span>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="出库状态：">
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库时间：">
              <span></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库：">
              <span></span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="出库数量：">
              <span></span>
            </el-form-item>
              </el-col>
               <el-col :span="8">
            <el-form-item label="出库金额：">
              <span></span>
            </el-form-item>
              </el-col>
           <el-col :span="8">
             <el-form-item label="收货人：">
              <span></span>
            </el-form-item>
          </el-col>
            <el-col :span="8">
             <el-form-item label="收货人电话：">
              <span></span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
             <el-form-item label="收货人地址：">
              <span></span>
            </el-form-item>
               </el-col>
             <el-col :span="8">
             <el-form-item label="详细地址：">
              <span></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  <el-row>
      <span>出库商品列表</span>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品数量" prop="name"></el-table-column>
        <el-table-column label="商品价格" prop="name"></el-table-column>
        <el-table-column label="商品金额" prop="name"></el-table-column>
        <el-table-column label="商品总价" prop="name"></el-table-column>
    </el-table>
    <!-- <el-button @click="Btn">跳转</el-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          name: "奶粉"
        }
      ]
    };
  },
  methods: {
    Btn() {
      this.$router.push({
        path: "/Index/Markey",
        query: {}
      });
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
</style>

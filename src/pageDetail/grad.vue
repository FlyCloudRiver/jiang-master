<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label=" ">
         <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button>增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="80">
        <template>
          <div>
            <el-button type="text">查看</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="库存数" prop="name"></el-table-column>
      <el-table-column label="所在仓库" prop="name"></el-table-column>
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
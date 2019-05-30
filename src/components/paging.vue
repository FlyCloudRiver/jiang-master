<template>
  <div class="paging-layout" v-if="pageNum>7">
    <el-pagination
      class="page-input"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="theQuery.pageNo"
      :page-sizes="[7,10, 20,25]"
      :page-size="theQuery.pageSize"
      layout="sizes,total , prev, pager, next ,jumper"
      :total="pageNum-0||0"
    >
      <span class="paging-fill"></span>
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["pageNum", "theQuery"],
  data() {
    return {};
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      this.theQuery.pageSize = val;
      this.theQuery.pageNo = 1;
      this.changePageFlag();
    },
    handleCurrentChange(val) {
      this.theQuery.pageNo = val;
      this.changePageFlag();
    },
    changePageFlag() {
      this.$emit("pageFlag", {
        pageNo: this.theQuery.pageNo,
        pageSize: this.theQuery.pageSize
      });
    }
  },
  computed: {},
  components: {}
};
</script>
<style scoped lang="less">
.page {
  text-align: right;
  margin-top: 20px;
}
.paging-layout {
  width: 100%;
  margin-top: 20px;
  // display: flex;
  // justify-content: space-around;


  .el-pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.page-input{
  .el-pagination__sizes{
    .el-select{
      width: 100px;
      .el-input{
        width: 100px!important;
      }
    }
  }
}
</style>


<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="商品编号:">
          <el-input v-model="theQuery.goodsCode"></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-input v-model="theQuery.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="商品名">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="厂商名">
          <el-input v-model="theQuery.supplierName"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="mobileBtn(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deleteBtn(scope.row.id)" style="color: red">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编码" prop="goodsCode"></el-table-column>
      <el-table-column label="商类类别" prop="categoryName">

      </el-table-column>
      <!--<el-table-column label="商品规格" prop="goodsSpecification"></el-table-column>-->
      <el-table-column label="商品名" prop="goodsName"></el-table-column>
      <el-table-column label="计量单位" prop="goodsUnit"></el-table-column>
      <el-table-column label="进价" prop="goodsPrice"></el-table-column>
      <el-table-column label="售价" prop="purchasePrice"></el-table-column>
      <el-table-column label="所属厂商" prop="supplierName"></el-table-column>
    </el-table>
      <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { goodsSelect ,goodsDelete} from "../../api/address.js";
import paging from "../../components/paging.vue";
export default {
   components: {
    paging
  },
  data() {

    return {

      pageNum:'',
      theQuery: {
        categoryId: null,
        categoryName:null,
        goodsCode:null,
        goodsName:null,
        goodsPrice: null,
        pageNum: 1,
        pageSize: 7,
        person:null,
        supplierId: null,
        supplierName:null
      },
      dataList: []
    };
  },
  created(){
    this.getList();

  },
  methods: {

    deleteBtn(row){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(goodsDelete+'?id='+row).then(data=>{
          this.getList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
        //分页
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
    getList() {
      axios.post(goodsSelect,this.theQuery).then(data=>{
        console.log(data)
        this.dataList=data.content;

          this.pageNum = data.totalElements;
      });
    },
    mobileBtn(row){
      this.$router.push({
        path: "/Index/addGoods",
        query: {
          id:row
        }
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/addGoods",
        query: {}
      });
    },
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

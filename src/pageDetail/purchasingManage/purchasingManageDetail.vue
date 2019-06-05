<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作人员：">
              <span>{{detailData.person}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号：">
              <span>{{detailData.purchaseCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库时间：">
              <span>{{detailData.storeTime}}</span>
            </el-form-item>
          </el-col>
             <el-col :span="8">
            <el-form-item label="订单状态：">
             <span>{{detailData.storage?'已入库':'未入库'}}</span>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="创建时间：">
             <span>{{detailData.createTime}}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="是否出库：">
              <span>{{detailData.storage?'是':'否'}}</span>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <el-row>
      <span>采购商品列表</span>
    </el-row>
    <el-table :data="detailData.purchaseDetailDTOS" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="商品名" prop="goodsName">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsName}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商类类别" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.categoryName}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="商品编号" prop="goodsCode">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO.goodsCode}}</span>
            </div>
          </template>
        </el-table-column>
      <!-- <el-table-column label="生产日期" prop="goodsDate">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsDate}}</span>
          </div>
        </template>
      </el-table-column> -->

      <el-table-column label="单价" prop="goodsPrice">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsPrice}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="供应商" prop="supplierId">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO.supplierName}}</span>
            </div>
          </template>
        </el-table-column>
      <!-- <el-table-column label="保质期" prop="goodsShelfLife">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsShelfLife}}</span>
          </div>
        </template>
      </el-table-column> -->
       <el-table-column label="商品数量" prop="goodsNumber"> </el-table-column>
      <el-table-column label="商品总价" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsNumber?scope.row.goodsNumber*scope.row.goodsDTO.goodsPrice:''}}</span>
            </div>
          </template>
        </el-table-column>

    </el-table>
     <el-row class="btnBox">

        <el-button @click="back">返回</el-button>
      </el-row>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { purchaseSelectDetail } from "../../api/address.js";
export default {
  data() {
    return {
      detailData: {},
      dataList: []
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
      back(){
      this.$router.go(-1);
    },
    getDetail() {
      axios
        .post(purchaseSelectDetail + "?id=" + this.$route.query.id)
        .then(data => {
          this.detailData = data;
          console.log(data);
        });
    },

  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  text-align: center;
  margin-top:20px;
}
</style>

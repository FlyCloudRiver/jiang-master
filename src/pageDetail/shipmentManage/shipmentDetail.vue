<template>
  <div>
    <div>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作人员：">
              <span>{{detailData.person}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">

            <el-form-item label="订单编号：">
              <span>{{detailData.shipmentCode}}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="订单类型：">
             <span>{{detailData.saleType}}</span>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="入库时间：">
              <span>{{detailData.storeTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <span>{{detailData.storage?'已出库':'未出库'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：">
              <span>{{detailData.createTime}}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
           <el-form-item label="预计到货时间：">
            <span>{{detailData.storeTime}}</span>
           </el-form-item>
         </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="发货仓库：">
             <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomName:''}}</span>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="订单数量：">
             <span>{{detailData.}}</span>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="订单金额：">
             <span>{{detailData.}}</span>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label="收货人：">
             <span>{{detailData.person}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人电话：">
             <span>{{detailData.phone}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人地址：">
             <span>{{detailData.address}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址：">
             <span>{{detailData.addressDetail}}</span>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <el-row>
      <span>订单商品列表</span>
    </el-row>
    <el-table :data="dataList"  border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsName}}</span>
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
      <el-table-column label="商类类别" prop="categoryId">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.categoryName}}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品属性" prop="goodsAttributel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsAttributel}}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="商品单价" prop="goodsPrice">
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
      <!-- <el-table-column label="供应渠道" prop="goodsChannel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsChannel}}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="库存" prop="storageNum"></el-table-column>
      <el-table-column label="采购数量" prop="goodsNumber">
      </el-table-column>
      <el-table-column label="商品总价" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsNumber?scope.row.goodsNumber*scope.row.goodsDTO.goodsPrice:''}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btnBox">
      <el-button @click='$router.go(-1)'>返回</el-button>
    </div>
  </div>
</template>
<script>
  import axios from "../../api/axios.js";
  import { shipmentSelectDetail,roomList } from "../../api/address.js";
  export default {
    data() {
      return {
        dataList: [],
        detailData:{},
      };
    },
    created() {
      this.getDetail();
    },
    methods: {
      getDetail() {
        axios
          .post(shipmentSelectDetail + "?id=" + this.$route.query.id)
          .then(data => {
            console.log(data, "销售单详情");
            this.detailData=data;
            this.dataList=data.shipmentDetailDTOS
            this.dataList.map((v, k) => {
              let bb = {
                pageNum: 1,
                pageSize: 20,
                goodsName: v.goodsDTO.goodsName
              };
              axios.post(roomList, bb).then(data => {
                v.storageNum = data.content[0].amount;
              });
            });
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
  .btnBox {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
</style>

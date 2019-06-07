<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="开始时间:">
          <el-date-picker v-model="theQuery.startTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker v-model="theQuery.endTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
         <el-form-item label="出入库类型:">
           <el-select v-model="theQuery.type">
             <el-option value="商品入库" label="商品入库"></el-option>
             <el-option value="商品出库" label="商品出库"></el-option>
           </el-select>

        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
     <!-- <el-table-column label="操作" width="180">
        <template slot-scope='scope'>
          <div>
            <el-button type="text" @click="detailBtn(scope.row.goodsDTO.id)">查看</el-button>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO?scope.row.goodsDTO.goodsName:''}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品进价" prop="goodsDTO.goodsPrice"></el-table-column>

      <el-table-column label="出入库类型" prop="style"></el-table-column>
      <el-table-column label="出入库数量" prop="totleNumber"></el-table-column>
      <el-table-column label="出入库总金额" prop="sumMoney"></el-table-column>
      <el-table-column label="出入库时间" prop="updateTime"></el-table-column>
      <el-table-column label="库存数量" prop="amount"></el-table-column>
    </el-table>
    <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
  import axios from "../../api/axios.js";
  import { report } from "../../api/address.js";
  export default {
    data() {

      return {
        pageNum:'',
        theQuery: {
        endTime: null,
        pageNum: 1,
        pageSize: 7,
        startTime: null,
        type: "商品出库"
        },
        dataList: [
        ]
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //分页
      pageFlag: function(data) {
        this.theQuery.pageNum = data.pageNo;
        this.theQuery.pageSize = data.pageSize;
        this.getList();
      },
      getList() {
        axios.post(report,this.theQuery).then(data => {
          console.log(data);
          this.dataList=data.content;
          this.pageNum = data.totalElements;
        });
      },


    }
  };
</script>
<style lang="less">
  .addBtn {
    margin: 10px 0px;
  }
</style>

<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="订单编号:">
          <el-input v-model="theQuery.purchaseCode"></el-input>
        </el-form-item>
       <el-form-item label="开始时间:">
          <el-date-picker v-model="theQuery.startTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:">
          <el-date-picker v-model="theQuery.endTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否出库:">
          <el-select placeholder="请输入信息" clearable v-model="theQuery.storage">
            <el-option :value="true" label="是"></el-option>
            <el-option :value="false" label="否"></el-option>
          </el-select>
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" @click="updateBtn(scope.row.id)" v-if="!scope.row.storage">编辑</el-button>
             <el-button type="text" @click="deleteBtn(scope.row)" v-if="!scope.row.storage">删除</el-button>
            <el-button type="text" @click="stoBtn(scope.row)" v-if="!scope.row.storage">入库</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" prop="person"></el-table-column>
      <el-table-column label="订单编号" prop="purchaseCode"></el-table-column>
      <el-table-column label="采购时间" prop="storeTime"></el-table-column>
      <el-table-column label="是否入库" prop="storage">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'是':'否'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
    <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { purchaseSelect, purchaseDelete,storeroomInsert } from "../api/address.js";
export default {
  data() {
    return {
      pageNum: "",
      theQuery: {
        startTime:null,
        endTime:null,
        pageNum: 1,
        pageSize: 20,
        person: "",
        purchaseCode: "",
        purchaseDetailForms: [],
        purchaseTime: "",
        storage: null
      },
      dataList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //入库
       //入库
    stoBtn(row){
        console.log(row)
        let data={
            id: row.id,
           person:this.$store.state.loading.user.name
        }
        axios.post(storeroomInsert,data).then(data=>{
          this.getList();
        })
    },
    //分页
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
    deleteBtn(row) {
      axios.delete(purchaseDelete + "?id=" + row).then(data => {
        this.getList();
      });
    },
    getList() {
      axios.post(purchaseSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
        this.pageNum = data.totalElements;
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/PurchasingManageAddNew",
        query: {}
      });
    },
    //详情
    detailBtn(row) {
      this.$router.push({
        path: "/Index/PurchasingManageDetail",
        query: { id: row }
      });
    },
    updateBtn(row) {
      this.$router.push({
        path: "/Index/purchasingManageUpdate",
        query: { id: row }
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

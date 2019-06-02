<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="订单单号:">
          <el-input v-model="theQuery.shipmentCode"></el-input>
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

    <!--表格-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" @click="mobileBtn(scope.row.id)"  v-if="!scope.row.storage">编辑</el-button>
            <el-button type="text" @click="deleteBtn(scope.row.id)" v-if="!scope.row.storage">删除</el-button>
            <el-button type="text" @click="chuBtn(scope.row.id)" v-if="!scope.row.storage">出库</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="销售单号" prop="shipmentCode"></el-table-column>

      <el-table-column label="销售时间" prop="storeTime"></el-table-column>
      <!-- <el-table-column label="类型" prop="saleType"></el-table-column> -->


      <el-table-column label="是否出库" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'已出库':'未出库'}}</span>
          </div>
        </template>
      </el-table-column>


      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="操作人员" prop="person"></el-table-column>

    </el-table>
  </div>
</template>
<script>
  import axios from "../../api/axios.js";
  import { shipmentSelect, shipmentDelete,storeroomOutput } from "../../api/address.js";
  export default {
    data() {
      return {
        theQuery: {
          endTime: "",
          pageNum: 1,
          pageSize: 7,
          person: "",
          shipmentCode: "",
          shipmentDetailForms: [],
          startTime: "",
          storage: ""
        },
        dataList: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      chuBtn(row) {
        let body={
          id:row,
          person:this.$store.state.loading.user.name
        }
        axios.post(storeroomOutput,body).then(data => {
          this.$message.success("出库成功");
          this.getList();
        });
      },
      mobileBtn(row){
        this.$router.push({
          path: "/Index/shipmentUpdateManage",
          query: { id: row }
        });
      },
      deleteBtn(row) {
        axios.delete(shipmentDelete + "?id=" + row).then(data => {
          this.$message.success("删除成功");
          this.getList();
        });
      },
      getList() {
        axios.post(shipmentSelect, this.theQuery).then(data => {
          console.log(data);
          this.dataList = data.content;

        });
      },
      //新增
      AddnewBtn() {
        this.$router.push({
          path: "/Index/shipmentAddManage",
          query: {}
        });
      },
      //详情
      detailBtn(row) {
        this.$router.push({
          path: "/Index/shipmentDetail",
          query: { id: row }
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

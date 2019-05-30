<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <!-- <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!-- <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope='scope'>
          <div>
            <el-button type="text" @click="detailBtn(scope.row.goodsDTO.id)">查看</el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO?scope.row.goodsDTO.goodsName:''}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" prop="amount"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    </el-table>

  </div>
</template>
<script>
  import axios from "../../api/axios.js";
  import { storeroomSelect } from "../../api/address.js";
  export default {
    data() {
      return {
        theQuery: {

          pageNum: 1,
          pageSize: 7,

        },
        dataList: [
        ]
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        axios.post(storeroomSelect+'?pageNum='+this.theQuery.pageNum+'&pageSize='+this.theQuery.pageSize).then(data => {
          console.log(data);
          this.dataList=data.content
        });
      },
      //详情
      detailBtn(row) {
        this.$router.push({
          path: "/Index/storageRoomDetail",
          query: {id:row}
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

<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="订单单号:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="订单类型:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="订单时间:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label=" ">
         <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <div>
            <el-button type="text" @click="detailBtn">查看</el-button>
               <el-button type="text" @click="detailBtn">编辑</el-button>
              <el-button type="text" @click="detailBtn">撤销</el-button>
          </div>
        </template>
      </el-table-column>
        <el-table-column label="订单单号" prop="name"></el-table-column>
        <el-table-column label="订单类型" prop="name"></el-table-column>
        <el-table-column label="状态" prop="name"></el-table-column>
        <el-table-column label="订单仓库" prop="name"></el-table-column>
        <el-table-column label="订单数量" prop="name"></el-table-column>
        <el-table-column label="订单时间" prop="name"></el-table-column>
           <el-table-column label="供货方式" prop="name"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from '../api/axios.js'
import {test,test2} from '../api/address.js'
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
    //新增
    AddnewBtn(){
        axios.post(test+'?password=123456&username=123456',{}).then(data=>{
      console.log(data)
    })
       
      this.$router.push({
        path:'/Index/orderManagementAddNew',
        query:{}
      })
    },
    //详情
    detailBtn(){
      console.log('121')
      this.$router.push({
        path:'/Index/orderManagementDetail',
        query:{}
      })
        axios.post(test+'?bigCategoryName=1').then(data=>{
      console.log(data)})
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
.addBtn{
    margin: 10px 0px;
}
</style>

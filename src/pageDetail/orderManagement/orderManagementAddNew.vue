<template>
  <div>
    <div class="stepbox">
      <el-steps finish-status="success" :active="active" :space="200" class="setpboslit">
        <el-step title="选择采购商品"></el-step>
        <el-step title="生成采购单"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 选中出库商品 -->
    <div class="choseBbox" v-show="active==0">
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" style="width: 100%" border @selection-change="selection">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名" prop="goodsName"></el-table-column>
        <el-table-column label="商品数量" prop="name"></el-table-column>
        <el-table-column label="商类类别" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.categoryId}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="生产日期" prop="goodsDate"></el-table-column>

        <el-table-column label="单价" prop="goodsPrice"></el-table-column>
        <el-table-column label="保质期" prop="goodsShelfLife"></el-table-column>
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="发货仓库:">
          <span></span>
        </el-form-item>
        <el-form-item label="收货人:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="收货人电话:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="收货人地址：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="到货时间：">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品数量" prop="name"></el-table-column>
        <el-table-column label="商品价格" prop="name"></el-table-column>
        <el-table-column label="商品金额" prop="name"></el-table-column>
        <el-table-column label="商品总价" prop="name"></el-table-column>
      </el-table>
    </div>
    <div class="btnBox">
      <el-button @click="nextBtn" v-if="active==0">下一步</el-button>
      <el-button @click="backBtn" v-if="active==0">返回</el-button>
      <el-button @click="prveBtn" v-if="active==1">上一步</el-button>
      <el-button @click="postBtn" v-if="active==1">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { purchaseIndert, goodsSelect } from "../../api/address.js";
export default {
  data() {
    return {
      theQuery: {
        categoryId: null,
        categoryName: null,
        goodsCode: null,
        goodsDate: null,
        goodsName: null,
        goodsPrice: null,
        goodsShelfLife: null,
        pageNum: 1,
        pageSize: 20000,
        person: null,
        supplierId: null,
        supplierName: null
      },
      active: 0,
      dataList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.post(goodsSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
      });
    },
    postBtn() {
      this.$router.go(-1);
    },
    deleteBtn() {},
    backBtn() {
      this.$router.go(-1);
    },
    prveBtn() {
      this.active--;
    },
    nextBtn() {
      this.active++;
    },
    //选中商品时
    selection() {}
  }
};
</script>
<style lang="less" scoped>
.setpboslit {
  width: 500px;
  margin: 0 auto;
}
.btnBox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>


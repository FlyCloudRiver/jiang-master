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

        <el-table-column label="商类类别" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.categoryId}}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="生产日期" prop="goodsDate"></el-table-column> -->

        <el-table-column label="单价" prop="goodsPrice"></el-table-column>
        <!-- <el-table-column label="保质期" prop="goodsShelfLife"></el-table-column> -->
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <!-- <el-form-item label="发货仓库:">
          <span></span>
        </el-form-item>-->
        <!-- <el-form-item label="操作人:" prop="person">
          <el-input v-model="postData.person"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="订单编号:" prop="purchaseCode">
          <el-input v-model="postData.purchaseCode"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="收货人电话:">
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
        </el-form-item>-->
      </el-form>
      <el-table :data="theSelection" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品名" prop="goodsName"></el-table-column>
        <el-table-column label="商品采购数量" prop="name">
          <template slot-scope="scope">
            <div>
              <el-input v-model="scope.row.num"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商类类别" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.categoryId}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="goodsPrice"></el-table-column>

      </el-table>
    </div>
    <div class="btnBox">
      <el-button @click="nextBtn" v-if="active==0">下一步</el-button>
      <el-button @click="backBtn" v-if="active==0">返回</el-button>
      <el-button @click="prveBtn" v-if="active==1">上一步</el-button>
      <el-button @click="postBtn('postData')" v-if="active==1">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { purchaseIndert, goodsSelect } from "../../api/address.js";
export default {
  data() {
    return {
      rules: {
        person: [{ required: true, message: "请选择", trigger: "change" }],
        purchaseCode: [{ required: true, message: "请选择", trigger: "change" }]
      },
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
        person:'' ,
        supplierId: null,
        supplierName: null
      },
      postData: {
        person: this.$store.state.loading.user.name,
        purchaseCode: "",
        purchaseDetailForms: [],
        purchaseTime: "",
        storage: false
      },
      theSelection: [],
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
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.theSelection.map((v,k)=>{
            if(v.num){
              let obj={
                goodsId:v.id,
                goodsNumber:v.num
              }
              this.postData.purchaseDetailForms.push(obj)
            }
          })
          console.log(this.postData)
          axios.post(purchaseIndert,this.postData).then(data=>{

            this.$message.success('添加成功')
             this.$router.go(-1);
          })

        }})

    },
    deleteBtn(index, r) {
      this.theSelection.splice(index, 1);
    },
    backBtn() {
      this.$router.go(-1);
    },
    prveBtn() {
      this.active--;
    },
    nextBtn() {
      if(this.theSelection.length>0){
         this.active++;
      }else{
        this.$message.warning('请选择商品')
      }

    },
    //选中商品时
    selection(list) {
      console.log(list);
      this.theSelection = list;
    }
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


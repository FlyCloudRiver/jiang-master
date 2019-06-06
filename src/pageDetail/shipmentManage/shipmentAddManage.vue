<template>
  <div>
    <div class="stepbox">
      <el-steps finish-status="success" :active="active" :space="200" class="setpboslit">
        <el-step title="选择销售商品"></el-step>
        <el-step title="生成销售单"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 选中出库商品 -->
    <div class="choseBbox" v-show="active==0">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postDate"
        ref="postDate"
      >
        <!-- <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item> -->
      </el-form>
      <el-table :data="dataList" style="width: 100%" border @selection-change="selection">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" prop="goodsCode">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsCode}}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商类类别" prop="category">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.category}}</span>
            </div>
          </template>
        </el-table-column>-->
        <!-- <el-table-column label="商品属性" prop="goodsAttributel">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsAttributel}}</span>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column label="商品单价" prop="goodsPrice">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsPrice}}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="供应商" prop="goodsSupplier">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsSupplier}}</span>
            </div>
          </template>
        </el-table-column>-->
        <!-- <el-table-column label="供应渠道" prop="goodsChannel">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO&&scope.row.goodsDTO.goodsChannel}}</span>
            </div>
          </template>
        </el-table-column>-->
        <el-table-column label="库存" prop="amount"></el-table-column>
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form label-position="right" label-width="100px" :inline="true">

      </el-form>
      <el-table :data="theSelection" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteBtn(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
        <!-- <el-table-column label="商类类别" prop="category">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO.category}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品属性" prop="goodsAttributel">
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
        <!-- <el-table-column label="供应商" prop="goodsSupplier">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO.goodsSupplier}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应渠道" prop="goodsChannel">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.goodsDTO.goodsChannel}}</span>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="商品数量" prop="num">
          <template slot-scope="scope">
            <div>
              <el-input v-model="scope.row.num"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存" prop="amount"></el-table-column>
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
  import { storeroomSelect, shipmentInsert } from "../../api/address.js";
  export default {
    data() {
      return {
        postDate: {
          endTime: "",
          pageNum: 0,
          pageSize: 0,
          person: this.$store.state.loading.user.name,
          shipmentCode: "",
          shipmentDetailForms: [

          ],
          startTime: "",
          storage: false
        },
        theQuery: {
          goodsName: ""
        },
        active: 0,
        dataList: [],
        theSelection: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        let body = {
          pageNum: 1,
          pageSize: 200000
        };

        axios.post(storeroomSelect+'?pageSize=200000&pageNum=1').then(data => {
          console.log(data);
          this.dataList = data.content;
        });
      },
      postBtn() {
        // this.$router.go(-1);

        this.theSelection.map((v, k) => {
          let obj = {
            goodsId: v.goodsDTO.id,
            goodsNumber: v.num - 0
          };
          this.postDate.shipmentDetailForms.push(obj);
        });
        let data = this.postDate;
        axios.post(shipmentInsert, data).then(data => {
          console.log(data);
          this.$message.success("添加成功");
          this.$router.go(-1);
        });
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
  .spanBox {
    width: 210px;
    display: block;
  }
</style>


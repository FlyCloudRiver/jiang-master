<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <!-- <el-row>
          <el-col :span="8">
            <el-form-item label="总库存：">
              <span>{{this.detailData.amount}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新时间：">
             <span>{{this.detailData.updateTime}}</span>
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="操作人：">
                <span>{{this.detailData.person}}</span>
            </el-form-item>
          </el-col>


        </el-row> -->
      </el-form>
    </div>
    <el-row>
      <span>商品出入库记录</span>
    </el-row>
    <el-table :data="detailData" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName">
        <template slot-scope='scope'>
          <div>
            {{scope.row.goods?scope.row.goods.goodsName:''}}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品编码" prop="goodsCode">
        <template slot-scope='scope'>
          <div>
            {{scope.row.goods?scope.row.goods.goodsCode:''}}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="库存量" prop="amount"></el-table-column>
      <el-table-column label="出入库类型" prop="style"></el-table-column>
      <el-table-column label="出入库数量" prop="number"></el-table-column>
      <el-table-column label="更新人员" prop="person"></el-table-column>

      <el-table-column label="出入库时间" prop="updateTime"></el-table-column>

      <el-table-column label="商品进价" prop="goodsPrice">
        <template slot-scope='scope'>
          <div>
            {{scope.row.goods?scope.row.goods.goodsPrice:''}}
          </div>
        </template>
      </el-table-column>


      <!-- <el-table-column label="商品进价" prop="goodsPrice">
         <template slot-scope='scope'>
           <div>
             {{scope.row.goods?scope.row.goods.goodsPrice:''}}
           </div>
         </template>
       </el-table-column>-->
      <!--<el-table-column label="商品单位" prop="goodsUnit">
           <template slot-scope='scope'>
                  <div>
                      {{scope.row.goods?scope.row.goods.goodsUnit:''}}
                  </div>
              </template>
      </el-table-column>-->

      <!-- <el-table-column label="商品规格型号" prop="goodsSpecification">
            <template slot-scope='scope'>
                   <div>
                       {{scope.row.goods?scope.row.goods.goodsSpecification:''}}
                   </div>
               </template>
       </el-table-column>-->
    </el-table>
    <div class="btnBox">
      <el-button @click='$router.go(-1)'>返回</el-button>
    </div>
  </div>
</template>
<script>
  import axios from '../../api/axios.js'
  import {storeroomSelectInfo} from '../../api/address.js'
  export default {
    data() {
      return {

        detailData:''
      };
    },
    created(){
      this.getDetail();
    },
    methods: {
      getDetail(){
        axios.post(storeroomSelectInfo+'?goodsId='+this.$route.query.id).then(data=>{
          console.log(data)
          this.detailData=data;
        })
      },
      Btn() {
        this.$router.push({
          path: "/Index/totalInventory",
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

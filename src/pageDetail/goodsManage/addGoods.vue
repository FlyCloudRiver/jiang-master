<template>
  <div>
    <div>
      <!--修改添加表单-->
      <el-form
        label-position="right"
        label-width="120px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <el-form-item label="商品细类:">
            <el-cascader
              :options="categoryList"
              v-model="categoryId"
              :props="props"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称:" prop="goodsName">
          <el-input v-model="postData.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="计量单位:" prop="goodsUnit">
          <el-input v-model="postData.goodsUnit"></el-input>
        </el-form-item>
        <el-form-item label="进价:" prop="goodsPrice">
          <el-input v-model="postData.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="售价:" prop="purchasePrice">
          <el-input v-model="postData.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="厂商:" prop="supplierId">

           <el-select placeholder="请输入信息" clearable v-model="postData.supplierId">
            <el-option
              v-for="(item,index) in supplierList"
              :key="index"
              :label="item.supplierName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row class="btnBox">
        <el-button @click="postBtn('postData')">提交</el-button>
        <el-button @click="backBtn">返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { goodsInsert,bigCategorySelectAll,goodsSelectById,goodsUpdate,supplierSelectAll,category } from "../../api/address.js";
export default {
  data() {
    return {
      categoryId:null,
      categoryList:[],
      supplierList:[],
      options: [],
      category: null,
      props: {
        label: "name",
        value:'id',
        children: "children"
      },
      /*修改和增加的表单数据*/
      postData: {
        categoryId: '', //细类ID
        goodsCode: "", //商品编号
        goodsDate: "", //商品生产日期
        goodsName: "", //商品名称
        goodsPrice: '', //商品进价
        purchasePrice:'',
        goodsSpecification:'',//规格
        goodsUnit:'',
        supplierId: "" //厂商ID
      },
      /*prop  表单验证名字*/
      /*trigger: ‘blur’ 表示“当失去焦点时（光标不显示的时候），触发此提示” */
      /*手动输入或者通过弹出框选择之后触发 */
      rules: {
        categoryId: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        purchasePrice: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        goodsSpecification: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        goodsUnit: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        goodsCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
          goodsName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
          goodsPrice: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
          supplierId: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
      },

    };
  },
  created(){
    this.getcategoryList();
    this.getsupplierList()
    if(this.$route.query.id){
      axios.post(goodsSelectById+'?id='+this.$route.query.id).then(
        data=>{
          this.postData=data;
          this.categoryId = []
          this.categoryId.push(data.bigCategoryId,data.secondaryCategoryId,data.categoryId)
        }
      )
    }
  },
  methods: {
    getsupplierList(){
      axios.post(supplierSelectAll).then(data=>{
        console.log(data,'厂商')
        this.supplierList=data
      })
    },
    /*三级联动获取类别*/
    getcategoryList(){
      axios.get(bigCategorySelectAll).then(data=>{
        console.log(data);
        this.categoryList=data;

        this.categoryList.map(v=>{
          v.name = v.bigCategoryName
          v.children = v.secondaryCategoryDTOS
          v.children.map(v1=>{
            v1.children = v1.categoryDTOS
            v1.name = v1.secondaryCategoryName;
            v1.children.map(v2=>{
              v2.name = v2.categoryName;
            })
          })
        })
      })
    },
    postBtn(formName){
       this.$refs[formName].validate(valid => {

        if (valid) {
          console.log(this.categoryId)
          this.postData.categoryId=this.categoryId[this.categoryId.length-1]
          console.log(this.postData)
          /*如果参数有ID   跳转页面过来的参数*/
          if(this.$route.query.id){
              //修改接口
              axios.put(goodsUpdate,this.postData).then(data=>{
              console.log(data);
             this.$router.go(-1);})
          }else{
                 axios.post(goodsInsert,this.postData).then(data=>{
                 console.log(data);
                this.$router.go(-1);
          })
          }

        }})
    },
    //返回
    backBtn() {
      this.$router.go(-1);
    },

  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  text-align: center;
}
</style>

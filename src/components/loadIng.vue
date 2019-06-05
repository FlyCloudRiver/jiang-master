<template>
  <div class="all">
    <div class="loadingBox">
        <el-form label-position="right" label-width="0px" :inline="true" :model="loadData" :rules="rules" ref="loadData">
            <el-form-item label="" prop="username">
              <el-input placeholder="请输入用户名" v-model="loadData.username" ></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input placeholder="请输入密码" v-model="loadData.password" type="password"></el-input>
            </el-form-item>
          <el-form-item label="">
            <el-button @click="loading('loadData')">登陆</el-button>
          </el-form-item>
         </el-form>
    </div>
  </div>
</template>
<script>
import {userInfoLogin} from '../api/address.js'
import axios from '../api/axios.js'
export default {
  data() {
    return {
      loadData:{
        password:'',
        username:''
      },
      rules: {
        username: [{ required: true, message: "请输入用户名 ", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }
    };
  },
  created(){
    console.log(this)
  },
  methods: {
    loading(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post(userInfoLogin+'?password='+this.loadData.password+'&username='+this.loadData.username).then(data=>{
            console.log(data)
            if(data){
              sessionStorage.setItem("user", JSON.stringify(data))
              this.$router.push({
                path: "/Index/goodsManage",
                query: {}
              });
            }

          })
        }
      })



    }
  }
};
</script>
<style lang="less" scoped>
.all{
   display: flex;
  justify-content: center;
  align-items: Center;
  width: 100%;
  height: 100%;
 background:url(../assets/2.jpg) no-repeat;
.loadingBox {
  display: flex;
  justify-content: center;
  align-items: Center;

  .el-button{
    width: 400px;
    font-size: 23px;
  }
 /deep/ .el-input{
    width: 400px;
    font-size: 20px;
    height: 50px!important;
  /deep/ .el-input__inner {
     height: 50px;
   }
  }



  /deep/.el-form-item{
    display: block;
  }
}
}
</style>

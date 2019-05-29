<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">

      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <!--显示列表-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.uid)">删除</el-button>
            <el-button type="text" @click="updateBtn(scope.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户编号" prop="uid"></el-table-column>
      <el-table-column label="用户名称" prop="name"></el-table-column>
      <el-table-column label="用户登录名" prop="username"></el-table-column>
      <el-table-column label="角色" prop="roleListId">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.roleDTOS.length>0?scope.row.roleDTOS[0].role:''}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--新增用户弹出框-->
    <el-dialog title="新增用户" :visible.sync="dialogVisibleAdd" width="50%" center>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="addData"
        ref="addData"
        :rules="rules"
      >
        <el-form-item label="用户名称:" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户登录名:" prop="username">
          <el-input v-model="addData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码:" prop="password">
          <el-input v-model="addData.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="用户角色:">
          <el-select v-model="addData.roleListId">
            <el-option value="1" label="超级管理员"></el-option>
            <el-option value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="addBtn('addData')">提交</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-dialog>

    <!--修改用户-->
    <el-dialog title="修改用户" :visible.sync="dialogVisibleUpadte" width="40%" center>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="updateData"
        ref="updateData"
        :rules="rules"
      >
        <el-form-item label="用户名称:" prop="name">
          <el-input v-model="updateData.name"></el-input>
        </el-form-item>
        <el-form-item label="用户登录名:" prop="username">
          <el-input v-model="updateData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户权限:">
          <el-select v-model="updateData.roleListId">
            <el-option value="1" label="超级管理员"></el-option>
            <el-option value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="新密码:">
          <el-input v-model="updateData.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="updatepostBtn('updateData')">提交</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import {
  userInsert,
  userSelect,
  userUpdate,
  userDelete
} from "../api/address.js";
export default {
  data() {
    return {
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      dialogVisibleUpadte: false,
      addData: {
        name: "", //名字
        password: "", //密码
        username: "", //登录名（唯一）
        roleListId: "" //权限
      },
      updateData: {},
      dataList: [],
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    updatepostBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.updateData.id;
          delete this.updateData.id;
          let roleListId=this.updateData.roleListId
          delete this.updateData.roleListId
          this.updateData.roleListId=[roleListId-0]
          axios.put(userUpdate + "?id=" + id, this.updateData).then(data => {
            this.$message.success("修改成功");
            this.dialogVisibleUpadte = false;
            this.getList();
          });
        }
      });
    },
    updateBtn(row) {
      this.dialogVisibleUpadte = true;
      console.log(row);
      this.updateData = {
        id: row.uid,
        name: row.name,
        username: row.username,
        password: row.password,
        roleListId:row.roleDTOS[0].name,
      };
    },
    /*分页显示用户*/
    getList() {
      axios.get(userSelect + "?pageNum=1&pageSize=20").then(data => {
        console.log(data);
        this.dataList = data.content;
      });
    },
    addBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.addData.name, //名字
            password: this.addData.password, //密码
            username: this.addData.username, //登录名（唯一）
            roleListId: [this.addData.roleListId-0],//权限
          };

          axios.post(userInsert, data).then(data => {
            console.log(data);
            this.dialogVisibleAdd = false;
            (this.addData.name = ""),
              (this.addData.password = ""),
              (this.addData.username = "");
            this.addData.roleListId = "";
            this.getList();
          });
        }
      });
    },
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //详情
    detailBtn(row) {
      axios.delete(userDelete + "?id=" + row).then(data => {
        this.getList();
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
.dialoBtnBox {
  text-align: center;
}
</style>

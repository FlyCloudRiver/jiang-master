<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="供应商名称:">
          <el-input v-model="theQuery.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址:">
          <el-input v-model="theQuery.supplierAddress"></el-input>
        </el-form-item>
        <el-form-item label="供应商电话:">
          <el-input v-model="theQuery.supplierPhone"></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteBtn(scope.row)" style="color: red">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商名" prop="supplierName"></el-table-column>
      <el-table-column label="供应商地址" prop="supplierAddress"></el-table-column>
      <!-- <el-table-column label="供应商编码" prop="supplierCode"></el-table-column> -->
      <el-table-column label="供应商电话" prop="supplierPhone"></el-table-column>
      <el-table-column label="供应商官网" prop="supplierWeb"></el-table-column>
    </el-table>
     <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
    <el-dialog title="新增厂商" :visible.sync="dialogVisibleAdd" width="60%" center>
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postData"
        ref="postData"
        :rules="rules"
      >
        <el-form-item label="供应商名:" prop="supplierName">
          <el-input v-model="postData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址:">
           <el-cascader
            :options="options"
            v-model="address"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
          <!-- <el-input v-model="postData.supplierAddress"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="供应商编码:" prop="supplierEvaluate">
          <el-input v-model="postData.supplierCode"></el-input>
        </el-form-item> -->
        <el-form-item label="供应商电话:" prop="supplierPhone">
          <el-input v-model="postData.supplierPhone"></el-input>
        </el-form-item>
        <el-form-item label="供应商官网:" prop="supplierWeb">
          <el-input v-model="postData.supplierWeb"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialogBtnBox">
        <el-button @click="postBtn('postData')">提交</el-button>
        <el-button @click="postB">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="修改库房" :visible.sync="dialogVisibleDetail" width="60%">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="updateData"
        ref="updateData"
        :rules="rules"
      >
        <el-form-item label="供应商名:" prop="supplierName">
          <el-input v-model="updateData.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址:" prop="supplierAddress">
          <span class="spanBox">{{updateData.supplierAddress}}</span>

        </el-form-item>
        <!-- <el-form-item label="供应商编码:" prop="supplierEvaluate">
          <el-input v-model="updateData.supplierCode"></el-input>
        </el-form-item> -->
        <el-form-item label="供应商电话:" prop="supplierPhone">
          <el-input v-model="updateData.supplierPhone"></el-input>
        </el-form-item>
        <el-form-item label="供应商官网:" prop="supplierWeb">
          <el-input v-model="updateData.supplierWeb"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialogBtnBox">
        <el-button @click="updateBtn('updateData')">提交</el-button>
        <el-button @click="updateB">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import {
  supplierINsert,
  supplierSelect,
  supplierDelete,
  supplierUpdate,
   provinceSelect,
  provinceCity,
  provinceArea,
} from "../../api/address.js";
import paging from '../../components/paging.vue'
export default {
  components:{
    paging
  },
  data() {
    return {
        options: [],
      address: null,
      props: {
        label: "province",
        value: "provinceid",
        children: "children"
      },
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      pageNum:'',
      theQuery: {
        pageNum: 1,
        pageSize: 7,
        supplierAddress: "",
        supplierCode: "",
        supplierName: "",
        supplierPhone: "",
        supplierWeb: ""
      },
      updateData: {},
      postData: {
        supplierAddress: "",
        supplierEvaluate: "",
        supplierName: "",
        supplierPhone: "",
        supplierWeb: ""
      },
      dataList: [],
      rules: {
        supplierCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        supplierAddress: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        /*supplierWeb: [{ required: true, message: "请输入", trigger: "blur" }],*/
        prohibit: [{ required: true, message: "请输入", trigger: "blur" }],
      /*  supplierPhone: [{ required: true, message: "请输入", trigger: "blur" }],*/
        supplierName: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
    this.gitSelect();
  },
  methods: {
      //级联
    handleItemChange(val) {
      axios.post(provinceCity + "?procinceid=" + val[0]).then(data => {
        this.options.map((v, k) => {
          if (v.provinceid == val[0]) {
            this.$set(v, "children", data);
            v.children.map((v1, k1) => {
              this.$set(v1, "province", v1.city);
              this.$set(v1, "provinceid", v1.cityid);
              v1.children = [];
              this.options.push();
            });
          }
        });
      });
      if (val[1]) {
        axios.post(provinceArea + "?cityid=" + val[1]).then(data => {
          this.options.map(v => {
            if (v.provinceid == val[0]) {
              v.children.map(v1 => {
                if (v1.provinceid == val[1]) {
                  v1.children = data;
                  v1.children.map(v3 => {
                    this.$set(v3, "province", v3.area);
                    this.$set(v3, "provinceid", v3.areaid);
                    this.options.push();
                  });
                }
              });
            }
          });
        });
      }

    },
    //获取省
    gitSelect() {
      axios.post(provinceSelect).then(data => {
        this.options = data;
        this.options.map((v, k) => {
          v.children = [];
        });
        this.options.push();
      });
    },
     //分页
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
    updateB() {
      this.dialogVisibleDetail = false;
    },
    updateBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.updateData, "121");
          axios
            .put(supplierUpdate + "?id=" + this.updateData.id, this.updateData)
            .then(data => {
              this.$message.success("修改成功");
              this.dialogVisibleDetail = false;
              this.getList();
            });
        }
      });
    },
    deleteBtn(row) {
      axios.delete(supplierDelete + "?id=" + row.id).then(data => {
        this.$message.success("删除成功");
        this.getList();
      });
    },
    getList() {
      axios.post(supplierSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
        this.pageNum=data.totalElements;
      });
    },
    postB() {
      this.dialogVisibleAdd = false;
    },
    //提交
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

                this.options.map(v=>{
       if(v.provinceid == this.address[0]){
         this.postData.supplierAddress = v.province;
         v.children.map(v1=>{
            if(v1.provinceid == this.address[1]){
         this.postData.supplierAddress += v1.province;
         v1.children.map(v2=>{
           if(v2.provinceid == this.address[2]){
             this.postData.supplierAddress += v2.province;
           }
         })
         }
         })
       }
     })
          axios.post(supplierINsert, this.postData).then(data => {
            this.$message.success("新增成功");
            this.getList();
            this.dialogVisibleAdd = false;
            this.postData = {
              supplierAddress: "",
              supplierEvaluate: "",
              supplierName: "",
              supplierPhone: "",
              supplierWeb: ""
            };
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
      this.updateData = row;
      this.dialogVisibleDetail = true;
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.dialogBtnBox {
  text-align: center;
}
.spanBox{
  width: 210px;
}
</style>

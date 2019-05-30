<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="细类名称:">
          <el-input v-model="theQuery.categoryName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加大类</el-button>
      <el-button class="addBtn" @click="zhongAdd=true">增加中类</el-button>
      <el-button class="addBtn" @click="xiAdd=true">增加细类</el-button>

      <el-button class="addBtn" @click="AddnewBtn">大类管理</el-button>
      <el-button class="addBtn" @click="zhongAdd=true">增加中类管理</el-button>
      <el-button class="addBtn" @click="xiAdd=true">细类管理</el-button>

    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="deleteBtn(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="细类" prop="categoryName"></el-table-column>
      <el-table-column label="中类" prop="secondaryCategoryDTO.bigCategoryName">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.secondaryCategoryDTO.secondaryCategoryName}}</span>
            <el-button type="text" @click="zhongdeleteBtn(scope.row.secondaryCategoryDTO.id)">删除中类</el-button>
             <!-- <el-button type="text" @click="zhongdeleteBtn(scope.row.secondaryCategoryDTO)">修改中类</el-button> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大类" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.secondaryCategoryDTO.bigCategoryDTO.bigCategoryName}}</span>
            <!-- <el-button
              type="text"
              @click="bigdeleteBtn(scope.row.secondaryCategoryDTO.bigCategoryDTO.id)"
            >删除大类</el-button> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
    <el-dialog title="新增大类" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="大类名称:">
          <el-input v-model="bigCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="bigBtn">提交</el-button>
        <el-button @click="dialogVisibleAdd = false;">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="新增中类" :visible.sync="zhongAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="选择大类:">
          <el-select placeholder="请输入信息" clearable v-model="bigCategoryId">
            <el-option
              v-for="(item,index) in bigList"
              :key="index"
              :label="item.bigCategoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中类名称:">
          <el-input v-model="secondaryCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="secondaryBtn">提交</el-button>
        <el-button @click="zhongAdd=false">取消</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="新增细类" :visible.sync="xiAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="选择中类:">
          <el-select placeholder="请输入信息" clearable v-model="secondaryCategoryId">
            <el-option
              v-for="(item,index) in secondaryList"
              :key="index"
              :label="item.secondaryCategoryName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="细类名称:">
          <el-input v-model="categoryName"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialoBtnBox">
        <el-button @click="xiBtn">提交</el-button>
        <el-button @click="xiAdd=false">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import {
  categorySelectAll,
  bigCategoryInsert,
  bigCategorySelectAll,
  secondaryCategoryInsert,
  secondaryCategorySelectAll,
  categoryInsert,
  categoryDelete,
  secondaryCategoryDelete,
  bigCategoryDelete
} from "../../api/address.js";
import paging from "../../components/paging.vue";

export default {
  components: {
    paging
  },
  data() {
    return {
      pageNum: "",
      theQuery: {
        categoryName: "",
        pageNum: 1,
        pageSize: 7
      },
      dialogVisibleDetail: false,
      dialogVisibleAdd: false,
      zhongAdd: false,
      xiAdd: false,
      bigCategoryName: "", //大类名称
      //中类添加
      bigList: [],
      bigCategoryId: "",
      secondaryCategoryName: "",
      //细类添加
      secondaryList: [],
      secondaryCategoryId: "",
      categoryName: "",
      dataList: []
    };
  },
  created() {
    this.getList();
    this.getBiglist();
    this.getSecondaryList();
  },
  methods: {
    zhongdeleteBtn(row) {
      axios.delete(secondaryCategoryDelete + "?id=" + row).then(data => {
        this.getSecondaryList();
      });
    },
    bigdeleteBtn(row) {
      axios.delete(bigCategoryDelete + "?id=" + row).then(data => {
        this.getBiglist();
      });
    },
    deleteBtn(row) {
      axios.delete(categoryDelete + "?id=" + row).then(data => {
        this.getList();
      });
    },
    xiBtn() {
      if (this.secondaryCategoryId !== "" && this.secondaryList !== "") {
        axios
          .post(
            categoryInsert +
              "?secondaryCategoryId=" +
              this.secondaryCategoryId +
              "&categoryName=" +
              this.categoryName
          )
          .then(data => {
            console.log(data);
            this.$message.success("添加成功");
            this.xiAdd = false;
            this.getList();
          });
      }
    },
    secondaryBtn() {
      if (this.bigCategoryId !== "" && this.secondaryCategoryName !== "") {
        axios
          .post(
            secondaryCategoryInsert +
              "?bigCategoryId=" +
              this.bigCategoryId +
              "&secondaryCategoryName=" +
              this.secondaryCategoryName
          )
          .then(data => {
            console.log(data);
            this.$message.success("添加成功");
            this.zhongAdd = false;
            this.getSecondaryList();
          });
      }
    },
    getSecondaryList() {
      axios.post(secondaryCategorySelectAll).then(data => {
        this.secondaryList = data;
      });
    },
    bigBtn() {
      if (this.bigCategoryName !== "") {
        axios
          .post(bigCategoryInsert + "?bigCategoryName=" + this.bigCategoryName)
          .then(data => {
            console.log(data);
            this.$message.success("添加成功");
            this.dialogVisibleAdd = false;
            this.getBiglist();
          });
      } else {
        this.$message.warning("请输入添加内容");
      }
    },
    getBiglist() {
      axios.get(bigCategorySelectAll).then(data => {
        this.bigList = data;
        console.log(this.bigList, "bigList");
      });
    },
    getList() {
      axios.post(categorySelectAll, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
        this.pageNum = data.totalElements;
      });
    },
    //新增
    AddnewBtn() {
      this.dialogVisibleAdd = true;
    },
    //分页
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
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

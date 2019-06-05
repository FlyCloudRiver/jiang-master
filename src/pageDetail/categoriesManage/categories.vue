<template>
  <div>
    <div>
      <!--<el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="细类名称:">
          <el-input v-model="theQuery.categoryName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>-->

    </div>

   <!-- 添加中类和细类-->
    <el-dialog title="添加中类和细类" :visible.sync="createCategory"  width="40%">
      <el-card>
        <div slot="header">
          <i class="el-icon-info"></i> 填写中类和细类
        </div>
        <template>
          <div v-for="(item,i) of items" v-model="items[i]"  :key="i">
            <el-card class="box-card">
              <el-form :inLine="true" size="mini"  label-width="80px">
                <el-form-item label="中类名称" >
                  <el-input size="mini" v-model="item.secondaryCategoryName" style="width: 350px" placeholder="请输入中类名称..."></el-input>
                </el-form-item>

                <el-form-item label="细类名称"  v-for="(item2,i2) of item.category" :key="i2">
                  <template>
                    <div>
                      <el-input size="mini" v-model="item2.categoryName" style="width: 350px" placeholder="请输入细类名称..."></el-input>
                    </div>
                  </template>
                </el-form-item>
              </el-form>
              <el-button @click="addInputCategory(item.category)" size="mini">添加细类</el-button>
              <el-button type="danger" @click="deleteInputCategory(item.category)" size="mini">删除细类</el-button>
            </el-card>
          </div>
        </template>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onAdd" size="mini">添加中类</el-button>
        <el-button type="danger" @click="onDelete" size="mini">删除中类</el-button>
        <el-button icon="el-icon-check" type="success" @click="insertForm" size="mini">保存
        </el-button>
        <el-button icon="el-icon-back"@click="returnDialog" size="mini">返回</el-button>
      </div>
    </el-dialog>

    <!-- 编辑中类和细类-->
    <el-dialog title="添加中类和细类" :visible.sync="updateCategory"  width="60%">
      <el-card>
        <div slot="header">
          <i class="el-icon-info"></i> 填写中类和细类
        </div>
        <template>
          <div v-for="(item1,i) of secondAndCategory.secondaryCategoryDTOS" v-model="item1[i]"  :key="i">
            <el-card class="box-card">
              <el-form :inLine="true" size="mini"  label-width="80px">
                <el-form-item label="中类名称" >
                  <el-input size="mini" v-model="item1.secondaryCategoryName" style="width: 350px"></el-input>
                  <el-button type="danger" icon="el-icon-delete" circle  @click="deleteSecondCategory(item1.id,secondAndCategory.id)" size="mini"></el-button><br><br>

                </el-form-item>
                <el-form-item label="细类名称"  v-for="(item2,i2) of item1.categoryDTOS" :key="i2">
                  <template>
                    <div>
                      <el-input size="mini" v-model="item2.categoryName" style="width: 350px"></el-input>
                      <el-button type="danger" icon="el-icon-delete" circle  @click="deleteCategory(item2.id,secondAndCategory.id)"></el-button><br><br>

                    <!--  <el-button size="mini" @click="addCategory(item2.id,secondAndCategory.id)">添加细类</el-button>
                      <el-button type="danger" size="mini" @click="deleteCategory(item2.id,secondAndCategory.id)">删除细类</el-button>-->
                    </div>
                  </template>
                </el-form-item>
              </el-form>
              <!--中类id  大类id-->
              <el-button size="mini" @click="addCategory(item1.id,secondAndCategory.id)">添加细类</el-button>
            </el-card>

            <br><br><br>
          </div>
        </template>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-check" type="success" @click="updateInfo" size="mini">保存
        </el-button>
        <el-button icon="el-icon-back" @click="returnDialog2" size="mini">返回</el-button>
      </div>
    </el-dialog>



    <el-row>
      <el-button class="addBtn" @click="AddBigBtn">新增大类</el-button>
    </el-row>
    <!--新增大类弹窗-->

    <el-dialog title="新增大类" :visible.sync="dialogVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="大类名称:">
          <el-input v-model="bigCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialogBtnBox">
        <el-button @click="AddBigCategory">提交</el-button>
        <el-button @click="dialogVisibleAdd = false;">取消</el-button>
      </el-row>
    </el-dialog>

    <!--修改大类弹窗-->
    <el-dialog title="修改大类" :visible.sync="dialogVisibleUpdate" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="大类名称:">
          <el-input v-model="bigCategoryName"></el-input>
        </el-form-item>
      </el-form>

      <el-row class="dialogBtnBox">
        <el-button @click="UpdateBigCategoryInfo">提交</el-button>
        <el-button @click="dialogVisibleUpdate = false;">取消</el-button>
      </el-row>

    </el-dialog>


    <!--新增细类弹窗-->

    <el-dialog title="新增细类" :visible.sync="categoryVisibleAdd" width="20%" center>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="细类名称:">
          <el-input v-model="categoryName"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="dialogBtnBox">
        <el-button @click="AddCategoryInfo">提交</el-button>
        <el-button @click="categoryVisibleAdd = false;">取消</el-button>
      </el-row>
    </el-dialog>

<!--表格显示-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <div>
            <!--<el-button type="text" @click="delete(scope.row.id)">删除</el-button>-->
            <el-button type="text" @click="updateBigCategory(scope.row.id,scope.row.bigCategoryName)">编辑</el-button>
            <el-button type="text" @click="deleteBigCategory(scope.row.id)" style="color: red">删除</el-button>

          </div>
        </template>
      </el-table-column>
      <el-table-column label="大类" prop="bigCategoryName">
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope">
        <el-button icon="el-icon-circle-plus" @click="addForm(scope.row.id)" size="mini">添加中类和细类</el-button>
        <el-button icon="el-icon-info" @click="updateForm(scope.row.id)" size="mini">编辑中类和细类</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script>
import axios from "../../api/axios.js";
import {
  bigCategorySelectAll,
  selectBigCategoryById,
  bigCategoryInsert,
  bigCategoryDelete,
  bigCategoryUpdate,
  insertAll,
  secondaryCategoryDelete,
  categoryDelete,
  categoryInsert,
  categoryAndCategoryInsert
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
      dataList: [],
      items: [
        {secondaryCategoryName:'',
          category:[
          ]
        }
      ],
      secondAndCategory:{},
      createCategory:false,
      updateCategory:false,
      bigId:'',
      secondId:'',
      dialogVisibleAdd:false,
      bigCategoryName:'',
      categoryName:'',
      dialogVisibleUpdate:false,
      categoryVisibleAdd:false
    };
  },
  created() {
    this.getList();

  },
  methods: {
    addForm:function(id){
      this.bigId=id,
      this.items=[
        {secondaryCategoryName:'',
          category:[
          ]
        }
      ]
      this.createCategory=true;
    },
    returnDialog(){
      this.createCategory=false;
    },returnDialog2(){
      this.updateCategory=false;
    },

    //编辑
    updateForm:function(id){
      this.getSecondAndCategory(id);
      this.updateCategory=true;
    },
    onAdd() {
      this.items.push(
        {secondaryCategoryName:'',
          category:[
          ]
        })
    },
    onDelete(){
      this.items.pop()
    },
    addInputCategory(category){
      category.push({categoryName:''})
    },
    deleteInputCategory(category){
      category.pop()
    },
    getList() {
      axios.get(bigCategorySelectAll).then(data => {
        this.dataList = data;
        console.log(data)
      });
    },
    /*获取表单内容并提交*/
    insertForm(){
      //参数要求
      let list=this.items
      if(list.length===0){
        alert("请添加中类！")
        return
      }
      for(var j=0;j<list.length;j++){
        if(list[j].secondaryCategoryName===''){
          alert("请填写中类内容")
          return
        }
        for(var i=0;i<list[j].category.length;i++){
          if (list[j].category[i].categoryName===''){
            alert("请将细类填写完整")
           return
          }
        }
      }
       let form={
         bigId:this.bigId,
         secondaryCategoryForms:[]

       };

      form.secondaryCategoryForms=this.items;
      form.secondaryCategoryForms.map(v=>{
          v.categoryForms=v.category
      })

      axios.post(insertAll,form).then(data => {
        this.createCategory=false
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        this.getList();
      });

    },updateInfo(){
      //更新中类和细类名字
      axios.post(categoryAndCategoryInsert,this.secondAndCategory).then(data => {
        this.updateCategory=false
        this.$message({
          message: '更新成功',
          type: 'success'
        });
        this.getList();
      });

      console.log(this.secondAndCategory,"secondAndCategory")
    },
    //根据大类ID查询
    getSecondAndCategory(id){
      axios.post(selectBigCategoryById+'?id='+id).then(data => {
        this.secondAndCategory = data;
      });
    },
    AddBigCategory() {
      if (this.bigCategoryName !== "") {
        axios
          .post(bigCategoryInsert + "?bigCategoryName=" + this.bigCategoryName)
          .then(data => {
            console.log(data);
            this.$message.success("添加成功");
            this.dialogVisibleAdd = false;
            this.getList();
          });
      } else {
        this.$message.warning("请输入添加内容");
      }
    },
    //添加大类弹出框
    AddBigBtn() {
      this.dialogVisibleAdd = true;
    }, deleteBigCategory(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(bigCategoryDelete + "?id=" + row).then(data => {
          this.getList();
        });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    updateBigCategory(id,name){
      this.bigId=id
      this.bigCategoryName=name
      this.dialogVisibleUpdate=true
    },UpdateBigCategoryInfo(){
      axios.put(bigCategoryUpdate+'?id='+this.bigId+'&bigCategoryName='+this.bigCategoryName).then(data => {
        this.getList();
        this.dialogVisibleUpdate=false
      });

    },
    deleteSecondCategory(id,bigId){
      //删除中类
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(secondaryCategoryDelete+'?id='+id).then(data => {
          this.getSecondAndCategory(bigId);
        });


        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    deleteCategory(id,bigId){
      //删除细类
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete(categoryDelete+'?id='+id).then(data => {
          this.getSecondAndCategory(bigId);
        });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addCategory(secondId,bigId){
      this.categoryVisibleAdd=true;
      this.secondId=secondId
      this.bigId=bigId

    },AddCategoryInfo(){
      console.log("中类id",this.secondId)
      console.log("大类id",this.bigId)
      console.log(this.categoryName)
      if (this.categoryName !== "") {
        axios.post(categoryInsert + "?categoryName=" + this.categoryName+"&secondaryCategoryId="+this.secondId).then(data => {
            this.categoryVisibleAdd=false
            this.getSecondAndCategory(this.bigId);
            this.secondId=''
            this.bigId=''
            this.categoryName=''
          });
      } else {
        this.$message.warning("请输入添加内容");
      }
    }
  }
}
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.dialogBtnBox {
  text-align: center;
}
</style>

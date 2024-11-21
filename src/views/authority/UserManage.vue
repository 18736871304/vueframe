<template>
  <div class="template">
    <div class="search">
      <div class="common_hang">
        <div class="mech">手机号</div>
        <el-input v-model="mobile" placeholder="请输入手机号" clearable></el-input>
      </div>

      <div class="common_hang">
        <div class="mech">姓名</div>
        <el-input v-model="name" placeholder="请输入姓名" clearable></el-input>
      </div>
      <el-button type="primary" @click="getUserList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>

    <div class="table_list">
      <!-- <el-table :data="userList" :header-cell-style="{ background: '#f8f8f9', color: '#606266' }" highlight-current-row style="width: 100%;"> -->

      <el-table :data="userList" :stripe="true" border :row-style="{ height: '50px' }" :header-cell-style="{ background: '#f3f6fd',  color: '#555', height: '50px', }" highlight-current-row style="width: 100%;">

        <el-table-column type="index" width="40" align="center"></el-table-column>
        <el-table-column prop="makedatestr" label="生成日期" width="240" align="center" sortable></el-table-column>
        <el-table-column prop="realname" label="姓名" width="130" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="auto" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background @current-change="pageClick" :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next" :total="pageTotal" class="indexPage">
      </el-pagination>
      <el-dialog title="" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
        <el-form>
          <el-form-item label="姓名">
            <el-input v-model="inputName" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="inputMobile" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser } from "../../api/api";
export default {
  data() {
    return {
      mobile: "",
      name: "",
      userList: [],
      userid: "",
      dialogFormVisible: false,
      inputName: "",
      inputMobile: "",
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.getUserList(1);
  },
  methods: {
    // 获取表单
    getUserList(page) {
      var that = this;
      var reporParams = {
        mobile: this.mobile,
        name: this.name,
        usertype: '02',
        pageNumber: page,
        pageSize: this.pageSize,
      };
      getUserList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.userList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      if (this.userid == "") {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          mobile: this.inputMobile,
          name: this.inputName,
        };
        addUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.getUserList(1);
            that.clearINput();
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "添加失败",
            });
          }
        });
      } else {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          mobile: this.inputMobile,
          name: this.inputName,
          userid: this.userid,
        };
        editUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.getUserList(1);
            that.clearINput();
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "修改失败",
            });
          }
        });
      }
    },

    handleEdit(item) {
      this.inputMobile = item.mobile;
      this.inputName = item.realname;
      this.userid = item.userserialno;
      this.dialogFormVisible = true;
    },
    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          userid: item.userserialno,
        };
        deleteUser(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getUserList(1);
          } else {
            that.$message({
              type: "error",
              duration: 3000,
              message: "删除失败",
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserList(page);
    },
    // 打开新增
    addUser() {
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getUserList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getUserList(1);
    },
    clearINput() {
      this.inputMobile = "";
      this.inputName = "";
      this.userid = "";
    },
  },
};
</script>

<style>
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 350px;
}
.common_hang .mech {
  width: 100px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #909399;
}
.common_hang .el-input {
  width: 210px;
}
.common_hang .el-input .el-input__inner {
  width: 210px;
  border-radius: 0;
  height: 35px;
}
.common_hang .el-select .el-input {
  width: 210px;
}
.search {
  /* margin-top: 20px; */
  display: flex;
  padding: 0px 10px 10px;
}
.el-pagination {
  text-align: right;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-dialog__header {
  padding: 0;
}
</style>

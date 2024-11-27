<template>
  <div class="template">
    <div class="search">
      <div class="common_hang">
        <div class="mech">手机号</div>
        <el-input v-model="mobile" placeholder="请输入内容" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">姓名</div>
        <el-input v-model="name" placeholder="请输入内容" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">菜单组名称</div>
        <el-input v-model="menuName" clearable placeholder="请输入内容"></el-input>
      </div>

      <el-button type="primary" @click="getUserAuthList(1)">查询</el-button>
      <!-- <el-button type="primary" @click="addMenu">新增</el-button> -->
    </div>

    <div class="table_list">
      <!-- <el-table :data="UserAuthList" :header-cell-style="{ background: '#f8f8f9', color: '#606266' }" highlight-current-row @current-change="handleCurrentChange" style="width: 100%;"> -->
      <el-table :data="UserAuthList" :stripe="true" border :row-style="{ height: '50px' }" :header-cell-style="{ background: '#f3f6fd',  color: '#555', height: '50px', }" highlight-current-row @current-change="handleCurrentChange">

        <el-table-column type="index" width="40" align="center"></el-table-column>
        <el-table-column prop="makedatestr" label="最后一次操作时间" width="190" align="center" sortable></el-table-column>
        <el-table-column prop="realname" label="用户姓名" width="130" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="130" align="center"></el-table-column>
        <el-table-column prop="menugroupname" label="菜单组名称" width="auto" align="center"></el-table-column>
        <el-table-column prop="oprname" label="创建人" width="130" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">绑定菜单</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除菜单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background @current-change="pageClick" :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next" :total="pageTotal" class="indexPage">
      </el-pagination>
    </div>

    <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
      <el-radio-group v-model="checked" v-removeAriaHidden>
        <el-radio border v-for="item in menuList" :label="item.menugroupserialno" :key="item.menugroupserialno">{{ item.menugroupname }}</el-radio>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserAuthList, getMenuGroupList, addUserAuth, deleteUserAuth } from "../../api/api";
export default {
  data() {
    return {
      mobile: "",
      name: "",
      menuName: "",

      UserAuthList: [],
      dialogFormVisible: false,

      menugroupserialno: "",
      inputMenu: "",
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      menuList: [],
      checked: "",
      radio3: '',
      // isIndeterminate: true,
      currentRow: null,
    };
  },
  created() {
    this.getUserAuthList(1);
    this.getMenuGroupList();
  },
  methods: {
    // 获取表单
    getUserAuthList(page) {
      var that = this
      var reporParams = {
        name: this.name,
        mobile: this.mobile,
        menugroupname: this.menuName,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      getUserAuthList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          that.UserAuthList = res.rows;
          that.pageTotal = res.total;
        }
      });
    },

    // 获取菜单
    getMenuGroupList() {
      var that = this;
      var reporParams = {
        // userToken: sessionStorage.getItem("token"),
      };
      getMenuGroupList(reporParams).then((res) => {

        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          that.menuList = res.rows;
        }
      });
    },

    // 确认绑定菜单组
    sureAdd() {
      var that = this;
      var reporParams = {
        menugroupserialno: this.checked,
        userid: this.userid,
      };


      addUserAuth(reporParams).then((res) => {
        if (res.code == "0") {
          that.$message({
            type: "success",
            duration: 3000,
            message: "添加成功",
          });
          that.dialogFormVisible = false;
          that.getUserAuthList(1);
          that.clearINput();
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: "添加失败",
          });
        }
      });
    },

    //打开修改
    handleEdit(item) {
      if (item.menugroupname && item.menugroupname != '') {
        this.$message({
          type: "info",
          duration: 3000,
          message: "请删除菜单组之后重新添加",
        });
      } else {
        this.dialogFormVisible = true;
        this.userid = item.userserialno;
        this.menugroupserialno = item.authserialno;
      }


    },
    // 删除用户的菜单组
    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          authserialno: item.authserialno,
        };
        deleteUserAuth(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getUserAuthList(1);
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
      this.getUserAuthList(page);
    },
    // 关闭弹窗
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getUserAuthList(1);
    },
    // 取消修改
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getUserAuthList(1);
    },

    clearINput() {
      this.menugroupserialno = "";
      this.checked = "";
      this.userid = "";
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>
<style css-scoped>
/* 这是筛选项的内容 */
.common_hang {
  display: flex
;
    width: 310px;
    margin-right: 30px;
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
.table_list {
  padding: 10px;
}
.rolesTree {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 50px;
}
.rolesTree .el-button {
  margin-right: 130px;
}
.el-tree-node__content {
  height: 30px;
}
.el-tree-node__label {
  font-size: 16px;
}
.el-radio.is-bordered {
  margin: 10px;
}
.el-dialog__header {
  padding: 20px 20px 10px;
}
</style>

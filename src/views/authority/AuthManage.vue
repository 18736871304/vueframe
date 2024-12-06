<template>
  <div class="template">
    <div class="search">
      <div class="common_hang">
        <div class="mech">菜单组名称</div>
        <el-input v-model="menuName" clearable placeholder="请输入内容"></el-input>
      </div>

      <!-- <div class="common_hang">
        <div class="mech">姓名</div>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
      </div> -->

      <el-button type="primary" @click="getMenuGroupList(1)">查询</el-button>
      <el-button type="primary" @click="addMenu">新增</el-button>
    </div>

    <div class="table_list">
      <!-- <el-table :data="MenuGroupList" :header-cell-style="{ background: '#f8f8f9', color: '#606266' }" highlight-current-row  style="width: 100%;"> -->
      <el-table :data="MenuGroupList" :stripe="true" border :row-style="{ height: '50px' }" :header-cell-style="{ background: '#f3f6fd',  color: '#555', height: '50px', }" highlight-current-row @current-change="handleCurrentChange">

        <el-table-column type="index" width="40" align="center"></el-table-column>
        <el-table-column prop="makedatestr" label="最后一次操作时间" width="190" align="center" sortable></el-table-column>
        <el-table-column prop="menugroupname" label="菜单组名称" width="auto" align="center"></el-table-column>
        <el-table-column prop="oprname" label="创建人" width="130" align="center"></el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background @current-change="pageClick" :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next" :total="pageTotal" class="indexPage">
      </el-pagination>
    </div>
    <div class="rolesTree">
      <el-button type="primary" @click="getCheckedKeys">关联菜单</el-button>
      <el-tree :data="rolesTree" show-checkbox node-key="menuid" ref="rolestree" highlight-current :props="defaultProps" :default-checked-keys="defaultCheckedNode" :check-strictly="checkStrictly" :expand-on-click-node="false">
      </el-tree>
    </div>
    <el-dialog title="" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="菜单名称">
          <el-input v-model="inputMenu" placeholder="请输入菜单名称" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuGroupList, addMenuGroup, editMenuGroup, deleteMenuGroup, getMenuListByMenuGroup, createMenuRelation } from "../../api/api";
export default {
  data() {
    return {
      phone: "",
      name: "",
      MenuGroupList: [],
      dialogFormVisible: false,
      menuName: "",
      menugroupserialno: "",
      inputMenu: "",
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,

      currentRow: null,
      checkStrictly: false,
      defaultCheckedNode: [],
      rolesTree: [],

      defaultProps: {
        children: "childmenu",
        label: "menuname",
      },
    };
  },
  created() {
    this.getMenuGroupList(1);
  },
  methods: {
    // 获取表单
    getMenuGroupList(page) {
      var that = this;
      var reporParams = {

        menugroupname: this.menuName,
        pageNumber: page,
        pageSize: this.pageSize,
      };
      getMenuGroupList(reporParams).then((res) => {
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.MenuGroupList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      if (this.menugroupserialno == "") {
        var reporParams = {
          menugroupname: this.inputMenu,
        };
        addMenuGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.getMenuGroupList(1);
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

          menugroupname: this.inputMenu,
          menugroupserialno: this.menugroupserialno,
        };

        editMenuGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.getMenuGroupList(1);
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
    //打开修改
    handleEdit(item) {
      this.dialogFormVisible = true;
      this.inputMenu = item.menugroupname;
      this.menugroupserialno = item.menugroupserialno;
    },
    // 删除
    handleDel(item) {
      // this.menugroupserialno = item.menugroupserialno;
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          menugroupserialno: item.menugroupserialno,
        };
        deleteMenuGroup(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getMenuGroupList(1);
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
      this.getMenuGroupList(page);
    },

    // 打开新增
    addMenu() {
      this.menugroupserialno = "";
      this.dialogFormVisible = true;
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getMenuGroupList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getMenuGroupList(1);
    },
    clearINput() {
      this.inputMenu = "";
      this.menugroupserialno = "";
    },

    handleNodeCheck() { },
    getRolesTree(item) {
      if (item == null) {
      } else {
        this.menugroupserialno = item.menugroupserialno;
        var reporParams = {

          menugroupserialno: item.menugroupserialno,
        };
        getMenuListByMenuGroup(reporParams).then((res) => {
          this.rolesTree = res;
          this.getArray(this.rolesTree, "true", []);
        });
      }
    },

    //获取默认选中的数组
    getArray(data, name, lst) {
      var tempArr = lst,
        _this = this;
      data.map((item) => {
        if (item.checked == name) {
          tempArr.push(item.menuid);
          if (!!item.childmenu && typeof item.childmenu == "object") {
            _this.getArray(item.childmenu, name, tempArr);
          }
        } else {
          if (!!item.childmenu && typeof item.childmenu == "object") {
            _this.getArray(item.childmenu, name, tempArr);
          }
        }
      });
      this.$refs.rolestree.setCheckedKeys(tempArr);
      return tempArr;
    },

    getCheckedKeys() {
      var that = this;
      var reporParams = {

        menugroupserialno: this.menugroupserialno,
        menuRelaTionStr: this.$refs.rolestree.getCheckedKeys().toString(),
      };
      createMenuRelation(reporParams).then((res) => {
        //  this.menugroupserialno=''
        if (res.code == "0") {
          that.$message({
            type: "success",
            duration: 3000,
            message: "关联成功",
          });
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: "关联失败",
          });
        }
      });
    },

    handleCurrentChange(val) {
      this.getRolesTree(val);
      this.currentRow = val;
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
  },
};
</script>
<style>
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
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
/* 这是筛选项的内容  结束 */



.el-pagination {
  text-align: right;
}
.table_list {
  padding: 10px;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.rolesTree {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 50px;
  margin-left: 10px;
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
.el-dialog__header {
  padding: 0;
}
</style>

<template>
  <div class="AuthManage">权限管理</div>
</template>

<script>
import { disComBox, getMenuGrpList, getMenuList } from "../../api/api";
export default {
  data() {
    return {
      menuGrpList: [],
      menuGroupName: "",
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editMenuGroupName: "",
      editOrderbyid: "",
      //关联菜单
      diaMenuVisible: false,
      menutypeList: [],
      menutype: "core",
      menuGroupCode: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "text",
      },
      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableHeight: 0,
    };
  },

  created() {
 
  },
  mounted() {
 
  },
  methods: {
    init() {
      // 获取所有系统
      disComBox({ comboxType: "menutype" }).then((res) => {
        this.menutypeList = res;
      });
    },

    getMenuGrpList(page) {
      this.pageNum = page;
      var reporParams = {
        menuGroupCode: this.menuGroupName,
        menuGroupName: this.menuGroupName,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };

      getMenuGrpList(reporParams).then((res) => {
     
        this.menuGrpList = res.rows;
        this.pageTotal = res.total;
      });
    },
    // 确认新增或修改
    sureAdd() {
      console.log(this.editMenuGroupName);
      console.log(this.editOrderbyid);
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getMenuGrpList(page);
    },

    diaMenuClose() {
      this.treeData = [];
      this.diaMenuVisible = false;
    },
    menuEdit(item) {
      this.menuGroupCode = item.menuGroupCode;
      this.changeMenutype();
      this.diaMenuVisible = true;
    },
    //获取权限列表
    changeMenutype() {
      var reporParams = {
        menuGroupCode: this.menuGroupCode,
        menutype: "'" + this.menutype + "'",
      };
      getMenuList(reporParams).then((res) => {
        this.treeData = res;
        var array = [];
        for (var i = 0; i < res.length; i++) {
          let children = res[i].children;
          if (children.length > 0) {
            for (var j = 0; j < children.length; j++) {
              if (children[j].checked == "true") {
                array.push(children[j].id);
              }
            }
          }
        }
        this.$refs.tree.setCheckedKeys(array);
        // this.pageTotal = res.total;
      });
    },
    menuSure() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    handleEdit(item) {
      this.editMenuGroupName = item.menuGroupName;
      this.editOrderbyid = item.orderbyid;
      this.dialogFormVisible = true;
      this.dig_title = "编辑";
    },
    // 打开新增
    addUser() {
      this.dialogFormVisible = true;
      this.isinsert = true;
      this.dig_title = "新增";
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    clearINput() {
      this.editMenuGroupName = "";
      this.editOrderbyid = "";
    },
  },
};
</script>

<style scoped>
.AuthManage {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: wrap;
  /* padding-bottom: 20px; */
}
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 270px;
  margin-bottom: 10px;
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
  width: 150px;
}
.common_hang .el-input .el-input__inner {
  width: 150px;
  border-radius: 0;
  height: 35px;
}
.common_hang .el-select .el-input {
  width: 150px;
}

/* 筛选项结束 */
.dig {
  text-align: center;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.dig_box {
  display: flex;
  align-content: center;
  margin-bottom: 25px;
}

.common_hang .el-select {
  width: 150px;
}

.el-button--primary {
  height: 35px !important;
  /* line-height: 35px!important;
  text-align: center!important; */
}
</style>

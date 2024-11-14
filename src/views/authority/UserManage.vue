<template>
  <div class="UserAuthority"> 用户管理</div>
</template>

<script>
import FilterItem from "../../components/filterItem.vue";
import { disComBox, getMenuGrpList, getUserAuthorList } from "../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
      userName: "",
      menuGroupValue: "",
      menuGroupList: [],
      userAuthList: [],
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editMenuGroupValue: "",

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
    // 初始化
    init() {
      disComBox({ comboxType: "organgrade" }).then((res) => {
        this.organGradeList = res;
      });
    },

    // 获取表单
    getUserAuthorList(page) {
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      this.pageNum = page;

      var reporParams = {
        userName: this.userName,
        menuGroupCode: this.menuGroupValue,
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getUserAuthorList(reporParams).then((res) => {
  
        this.userAuthList = res.rows;
        this.pageTotal = res.total;
        // if (res.code == "1") {
        //   that.$message({
        //     type: "error",
        //     duration: 3000,
        //     message: res.msg,
        //   });
        // } else {
        // this.organList = res.rows;
        // this.pageTotal = res.total;
        // }
      });
    },

    // 获取菜单组名称
    menuGroupMethod(query) {
      if (query !== "") {
        var params = {
          menuGroupName: query,
        };
        getMenuGrpList(params).then((res) => {

          this.menuGroupList = res.rows;
        });
      }
    },

    // 确认新增或修改
    sureAdd() {
      var that = this;
    },

    handleEdit(item) {
      this.editMenuGroupValue=item.menuGroupCode
      this.menuGroupMethod(item.menuGroupName)
      this.dialogFormVisible = true;
      // this.isinsert = false; //以此判断是添加还是编辑
      this.dig_title = "编辑";
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
        // deleteUser(reporParams).then((res) => {
        //   if (res.code == "0") {
        //     that.$message({
        //       type: "success",
        //       duration: 3000,
        //       message: "删除成功",
        //     });
        //     that.getUserList(1);
        //   } else {
        //     that.$message({
        //       type: "error",
        //       duration: 3000,
        //       message: "删除失败",
        //     });
        //   }
        // });
      });
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserAuthorList(page);
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
      this.editMenuGroupValue=''
    },
  },
};
</script>

<style scoped>
.UserAuthority {
  padding: 30px 30px 10px;
  margin-bottom: 10px;
}
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
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

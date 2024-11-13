<template>
  <div class="PasswordManage"> 密码管理</div>
</template>

<script>
import md5 from "js-md5";
import FilterItem from "../../components/filterItem.vue";
import { disComBox, getUserList20, psdUpdate } from "../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return { };
  },
  created() {
 
  },
  mounted() {
 
  },
  methods: {
    // 初始化
    init() {
      // disComBox({ comboxType: "organgrade" }).then((res) => {
      //   this.organGradeList = res;
      // });
    },
    // 获取表单
    getUserList20(page) {
      this.pageNum = page;
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      var reporParams = {
        userCode: this.userCode,
        userName: this.userName,
        usertype: "02",
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getUserList20(reporParams).then((res) => {
        console.log(res);
        this.getUserList = res.rows;
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

    // 确认修改
    sureAdd() {
      var that = this;
      if (this.editPassWord != this.surePassWord) {
        return;
      }
      var reporParams = {
        userCode: this.edituserCode,
        passWord: md5(this.editPassWord).toUpperCase(),
      };
      psdUpdate(reporParams).then((res) => {
        console.log(res)
        // this.organGradeList = res;
      });
    },

    handleEdit(item) {
      console.log(item);
      this.edituserCode = item.userCode;
      this.dialogFormVisible = true;
      this.dig_title = "编辑";
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserList20(page);
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
      this.editMenuGroupValue = "";
    },
  },
};
</script>

<style scoped>
.PasswordManage {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
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

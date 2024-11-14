<template>
  <div class="teamMan">团队管理 </div>
</template>

<script>
import FilterItem from "../../../components/filterItem.vue";
import {
  disComBox,
  getTeamList,
  getUserList,
  organdlgquery,
} from "../../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      teamName: "",
      isstop: "01",
      isstopList: [],
      teamgradeValue: "",
      teamgradeList: [],
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
      teamList: [],
      userList: [],
      upteamList: [],
      organList: [],
      //添加 修改
      dig_title: "新增",
      dialogFormVisible: false,
      editTeamName: "",
      editUserValue: "",
      editOrderNum: "",
      editGradeValue: "",
      editUpteam: "",
      editOrganValue: "",
      editisstop: "",
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
      // 获取团队级别
      disComBox({ comboxType: "teamgrade" }).then((res) => {
        this.teamgradeList = res;
      });
      // 获取是否启用机构
      disComBox({ comboxType: "isstop" }).then((res) => {
        this.isstopList = res;
      });
      this.organdlgquery();
    },
    // 获取机构信息
    organdlgquery() {
      var params = {
        isstop: "01",
        organCode: "",
        organName: "",
        organGrade: "05",
      };
      organdlgquery(params).then((res) => {

        this.organList = res.rows;
      });
    },
    // 获取员工信息
    userMethod(query) {
      if (query !== "") {
        var params = {
          userCode: "",
          userName: query,
          usertype: "02", //在职人员
        };
        getUserList(params).then((res) => {
       
          this.userList = res.rows;
        });
      }
    },
    //获取上级团队
    upteamMethod(query) {
      var reporParams = {
        teamname: query,
        state: "01",
      };
      getTeamList(reporParams).then((res) => {
  
        this.upteamList = res.rows;
        // this.pageTotal = res.total;
      });
    },

    getTeamList(page) {
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      this.pageNum = page;
      var reporParams = {
        teamname: this.teamName,
        teamgrade: this.teamgradeValue,
        isstop: this.isstop,
        state: "01",
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getTeamList(reporParams).then((res) => {
 
        this.teamList = res.rows;
        this.pageTotal = res.total;
      });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getTeamList(page);
    },
    addUser() {
      this.dig_title = "新增";
      this.dialogFormVisible = true;
    },
    handleEdit(item) {
 
      this.editTeamName = item.teamname;
      this.editUserValue = item.teamleader;
      // this.editUserValue = item.teamleadername;
      this.userMethod(item.teamleadername);
      this.editOrderNum = item.ordernum;
      this.editGradeValue = item.teamgrade;
      this.editUpteam = item.upteamid;
      // this.editUpteam = item.upteamname;
      this.upteamMethod(item.upteamname);
      this.editOrganValue = item.organcode;
      this.editisstop = item.isstop;

      this.dig_title = "修改";
      this.dialogFormVisible = true;
    },

    handleDel(item) {
 
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    sureAdd() {
  
    },
    clearINput() {
      this.editTeamName = "";
      this.editUserValue = "";
      this.editOrderNum = "";
      this.editGradeValue = "";
      this.editUpteam = "";
      this.editOrganValue = "";
      this.editisstop = "";
    },
  },
};
</script>

<style scoped>
.teamMan {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
}
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
.common_hang .el-input,
.common_hang .el-select {
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

.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.dig {
  text-align: center;
}
.dig_box {
  display: flex;
  align-content: center;
  margin-bottom: 25px;
}

.el-button--primary {
  height: 35px !important;
  /* line-height: 35px!important;
  text-align: center!important; */
}
</style>

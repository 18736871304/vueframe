<template>
  <div class="userunlock">
    <div class="search">
      <div class="common_hang">
        <div class="mech">用户编码</div>
        <el-input v-model="userCode" placeholder="请输入" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">IP地址</div>
        <el-input v-model="lockip" placeholder="请输入" clearable></el-input>
      </div>

      <el-button type="primary" @click="getUserLockList(1)">查询</el-button>
      <el-button type="primary" @click="unlock">解锁</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="userLockList"
        :stripe="true"
        border
        :height="tableHeight"
        :row-style="{ height: '50px' }"
        :header-cell-style="{
          background: '#f3f6fd',
          color: '#555',
          height: '50px',
        }"
        highlight-current-row
        style="width: 100%; "
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="organ02name"
          label="所属省公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organ03name"
          label="所属分公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organname"
          label="所属营业部"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="usercode"
          label="用户编码"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户姓名"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="islockname"
          label="锁定状态"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="lockip"
          label="锁定IP"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="locktime"
          label="锁定时间"
          width="160"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="unlockusername"
          label="解锁人"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="unlocktime"
          label="解锁时间"
          width="160"
          align="center"
        ></el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="pageClick"
        :page-size="pageSize"
        :current-page="pageNum"
        layout="total, prev, pager, next"
        :total="pageTotal"
        class="indexPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { disComBox, getUserLockList, userUnLock } from "../../../api/api";
export default {
  data() {
    return {
      userCode: "",
      lockip: "",
      userLockList: [],
      unlockValue: "",
      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableHeight: 0,
    };
  },
  created() {
    // 100是表格外其它布局占的高度，这个数值根据自己实际情况修改   多一行筛选就多加35
    this.tableHeight = window.innerHeight - 295;
    this.init();
  },
  mounted() {
    // 设置表格高度
    this.tableHeight = window.innerHeight - 295;
    // / 监听浏览器窗口变化，动态计算表格高度，
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 295;
      })();
    };
  },
  methods: {
    // 初始化
    init() {
      // disComBox({ comboxType: "organgrade" }).then((res) => {
      //   this.organGradeList = res;
      // });
    },
    // 获取表单
    getUserLockList(page) {
      var that = this;
      this.pageNum = page;
      var reporParams = {
        usercode: this.userCode,
        lockip: this.lockip,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getUserLockList(reporParams).then((res) => {
    
        this.userLockList = res.rows;
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
    handleCurrentChange(val) {

      this.unlockValue = val;
    },
    unlock() {
      this.unlockValue;
      var reporParams = {
        lockuserid: this.unlockValue.lockid,
      };
      userUnLock(reporParams).then((res) => {
   
        if (res.flag == "0") {
          this.$message({
            message: "解锁成功",
            type: "success",
            duration: 3000,
          });
        }
      });
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserLockList(page);
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
.userunlock {
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
}

/* 选中某行时的背景色*/
:deep .el-table__body tr.current-row > td {
  color: #28a458;
  background: rgb(197, 213, 255) !important;
}
</style>

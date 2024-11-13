<template>
  <div class="inssorganMan">
    <div class="search">
      <div class="common_hang">
        <div class="mech">保险公司</div>
        <el-select
          v-model="insorgancode"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in insorgancodeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="common_hang">
        <div class="mech">保险公司类型</div>
        <el-select v-model="insorgantype" clearable placeholder="请选择">
          <el-option
            v-for="item in insorgantypeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getInsorganList(1)">查询</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="insorganList"
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
          prop="discode"
          label="保险公司编码"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="fullname"
          label="保险公司全称"
          width="230"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shortname"
          label="保险公司简称"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="inslogourl"
          label="保险公司LOGO"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <a
              target="_blank"
              :href="scope.row.inslogourl"
              style="color: #8F9198;"
              >下载</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="insorgantypename"
          label="保险公司类型"
          width="110"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="link_mobile"
          label="保险公司联系电话"
          width="180"
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
import { disComBox, getInsorganList } from "../../../api/api";
export default {
  data() {
    return {
      insorganList: [],
      insorgantypeList: [],
      insorgancodeList: [],
      insorgantype: "",
      insorgancode: "",

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
      disComBox({ comboxType: "insorgantype" }).then((res) => {
        this.insorgantypeList = res;
      });
      disComBox({ comboxType: "insorgancode" }).then((res) => {
        this.insorgancodeList = res;
      });
    },
    // 获取表单
    getInsorganList(page) {
      var that = this;
      this.pageNum = page;
      var reporParams = {
        insorgantype: this.insorgantype,
        insorgancode: this.insorgancode,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getInsorganList(reporParams).then((res) => {
   
        this.insorganList = res.rows;
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

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getInsorganList(page);
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
.inssorganMan {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
  height: 35px;
 
  padding-bottom: 20px;
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
/* :deep .el-table__body tr.current-row > td {
  color: #28a458;
  background: rgb(197, 213, 255) !important;
} */
</style>
ins

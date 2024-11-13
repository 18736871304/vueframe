<template>
  <div class="riskQuery">
    <div class="search">
      <div class="common_hang">
        <div class="mech">险种类型</div>
        <el-select v-model="risktype" clearable placeholder="请选择">
          <el-option
            v-for="item in risktypeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
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
        <div class="mech">险种名称</div>

        <el-input v-model="riskname" placeholder="请输入" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">产品属性</div>
        <el-select v-model="jointype" clearable placeholder="请选择">
          <el-option
            v-for="item in jointypeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>

      <div class="common_hang">
        <div class="mech">是否在售</div>
        <el-select v-model="isseal" clearable placeholder="请选择">
          <el-option
            v-for="item in issealList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getRiskdefineList20(1)">查询</el-button>
      <!-- <el-button type="primary" @click="addUser">新增</el-button> -->
    </div>

    <div class="table_list">
      <el-table
        :data="riskList"
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
        style="width: 100%;"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="groupcode"
          label="保险产品编码"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="risktypename"
          label="险种类型"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="insorganname"
          label="保险公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="riskname"
          label="险种名称"
          width="360"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="jointypename"
          label="产品属性"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="issealname"
          label="是否在售"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="freelookperiod"
          label="犹豫期天数"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="coefficient"
          label="产品系数"
          width="90"
          align="center"
        ></el-table-column>

        <!-- <el-table-column label="操作" align="center" width="auto">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column> -->
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
import { disComBox, getRiskdefineList20 } from "../../../api/api";
export default {
  data() {
    return {
      riskList: [],
      risktype: "",
      insorgancode: "",
      riskname: "",
      jointype: "",
      isseal: "01",

      risktypeList: [],
      insorgancodeList: [],
      jointypeList: [],
      issealList: [],

      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableHeight: 0,
    };
  },

  created() {
    // 100是表格外其它布局占的高度，这个数值根据自己实际情况修改   多一行筛选就多加35
    this.tableHeight = window.innerHeight - 330;
    this.init();
  },
  mounted() {
    // 设置表格高度
    this.tableHeight = window.innerHeight - 330;
    // / 监听浏览器窗口变化，动态计算表格高度，
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 330;
      })();
    };
  },
  methods: {
    init() {
      // 获取保险公司
      disComBox({ comboxType: "insorgancode" }).then((res) => {
        this.insorgancodeList = res;
      });
      // 获取险种类型
      disComBox({ comboxType: "risktype" }).then((res) => {
        this.risktypeList = res;
      });
      // 获取是否在售
      disComBox({ comboxType: "isseal" }).then((res) => {
        this.issealList = res;
      });
      // 获取产品属性
      disComBox({ comboxType: "jointype" }).then((res) => {
        this.jointypeList = res;
      });
    },

    getRiskdefineList20(page) {
      this.pageNum = page;
      var reporParams = {
        insorgancode: this.insorgancode,
        riskname: this.riskname,
        risktype: this.risktype,
        isseal: this.isseal,
        ismain: "Y",
        jointype: this.jointype,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };

      getRiskdefineList20(reporParams).then((res) => {
        this.riskList = res.rows;
        this.pageTotal = res.total;
      });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getRiskdefineList20(page);
    },
  },
};
</script>

<style scoped>
.riskQuery {
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

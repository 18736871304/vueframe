<template>
  <div class="OrganManage">
    <div class="search">
      <div class="common_hang">
        <div class="mech">签约渠道</div>
        <el-select v-model="channelValue" clearable placeholder="请选择">
          <el-option
            v-for="item in channelList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="common_hang">
        <div class="mech">险种类型</div>
        <el-select v-model="risktypeValue" clearable placeholder="请选择">
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

        <el-input
          v-model="riskName"
          placeholder="请输入险种名称"
          clearable
        ></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">产品属性</div>
        <el-select v-model="jointypeValue" clearable placeholder="请选择">
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
        <el-select v-model="issealValue" clearable placeholder="请选择">
          <el-option
            v-for="item in issealList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getorganList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="riskdefineList"
        :stripe="true"
        fixed
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
          prop="moveup"
          label="排序"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="groupcode"
          label="保险产品编码"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="channelname"
          label="签约渠道"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="risktypename"
          label="险种类型"
          width="90"
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
          width="280"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="riskkind01name"
          label="产品大类"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="riskkind02name"
          label="产品小类"
          width="100"
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
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="保费"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="promise_xubaoname"
          label="保证续保"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="url"
          label="投保链接"
          width="230"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <p class="copy" @click="copy(scope.row.url)">{{ scope.row.url }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="产品描述"
          width="230"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="aiuw"
          label="智能核保"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="emailuw"
          label="人工核保"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="180" fixed="right">
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
        </el-table-column>
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
      <el-dialog
        :title="dig_title"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        width="56%"
        style="text-align: left;"
      >
        <div class="dig">
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">签约渠道</div>
              <el-select
                v-model="editChannelValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in channelList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">渠道险种编码</div>
              <el-input
                v-model="outriskcode"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
            <div class="common_hang">
              <div class="mech">险种类型</div>
              <el-select
                v-model="editRisktypeValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in risktypeList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">保险公司</div>
              <el-select
                v-model="editInsorgancode"
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
              <el-input
                v-model="mainriskname"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>

            <div class="common_hang">
              <div class="mech">美华险种编码</div>
              <el-input
                v-model="discode"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">产品大类</div>
              <el-select
                v-model="editriskkind01PValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in riskkind01PList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">产品小类</div>
              <el-select
                v-model="editriskkind01019Value"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in riskkind01019List"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">产品属性</div>
              <el-select
                v-model="editJointypeValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in jointypeList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">是否在售</div>
              <el-select
                v-model="editIssealValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in issealList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">犹豫期天数</div>

              <el-input
                v-model="freelookperiod"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>

            <div class="common_hang">
              <div class="mech">保费</div>
              <el-input
                v-model="price"
                placeholder="请输入险种名称"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="dig_box">
            <div class="common_hang" style="width: 790px;">
              <div class="mech">投保链接</div>
              <el-input
                style="width:700px"
                v-model="url"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="dig_box">
            <div class="common_hang" style="width: 520px;">
              <div class="mech">销售区域</div>
              <el-select
                v-model="editprovinceValue"
                multiple
                collapse-tags
                clearable
                placeholder="请选择"
                style="width:420px"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">保证续保</div>
              <el-select v-model="ismainValue" clearable placeholder="请选择">
                <el-option
                  v-for="item in ismainList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang" style="width: 790px;">
              <div class="mech">承保后续链接</div>
              <el-input
                style="width:700px"
                v-model="insrevisiturl"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang" style="width: 790px;">
              <div class="mech">产品描述</div>
              <!-- <el-input
                style="width:700px"
                v-model="riskName"
                placeholder="请输入"
                clearable
              ></el-input> -->

              <el-input
                style="width:700px;height:35px"
                type="textarea"
                :rows="1"
                placeholder="请输入内容"
                v-model="description"
              >
              </el-input>
            </div>
          </div>

          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">智能核保</div>
              <el-select v-model="aiuwValue" clearable placeholder="请选择">
                <el-option
                  v-for="item in ismainList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">人工核保</div>
              <el-select v-model="emailuwValue" clearable placeholder="请选择">
                <el-option
                  v-for="item in ismainList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <!-- style="margin-bottom: 0;" -->
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { disComBox, getRiskdefineList } from "../../../api/api";
export default {
  data() {
    return {
      riskdefineList: [],
      channelList: [],
      channelValue: "",
      risktypeList: [],
      risktypeValue: "",
      riskName: "",
      insorgancodeList: [],
      insorgancode: "",
      jointypeList: [],
      jointypeValue: "",
      issealList: [],
      issealValue: "01",
      ismainList: [],
      // ismainValue: "",
      provinceList: [],
      riskkind01PList: [],
      riskkind01019List: [],

      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,

      editChannelValue: "",
      outriskcode: "",
      editRisktypeValue: "",
      editInsorgancode: "",
      mainriskname: "",
      discode: "",
      editriskkind01PValue: "",
      editriskkind01019Value: "",
      editJointypeValue: "",
      editIssealValue: "",
      freelookperiod: "",
      price: "",
      url: "",
      editprovinceValue: "",
      ismainValue: "",
      insrevisiturl: "",
      description: "",
      aiuwValue: "",
      emailuwValue: "",

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
    // 初始化
    init() {
      disComBox({ comboxType: "insorgancode" }).then((res) => {
        this.insorgancodeList = res;
      });

      disComBox({ comboxType: "channel" }).then((res) => {
        this.channelList = res;
      });

      disComBox({ comboxType: "risktype" }).then((res) => {
        this.risktypeList = res;
      });
      disComBox({ comboxType: "jointype" }).then((res) => {
        this.jointypeList = res;
      });

      disComBox({ comboxType: "isseal" }).then((res) => {
        this.issealList = res;
      });

      disComBox({ comboxType: "ismain" }).then((res) => {
        this.ismainList = res;
      });

      disComBox({ comboxType: "province" }).then((res) => {
   
        this.provinceList = res;
      });

      disComBox({ comboxType: "riskkind01_p" }).then((res) => {
        this.riskkind01PList = res;
      });

      disComBox({ comboxType: "riskkind01019" }).then((res) => {
        this.riskkind01019List = res;
      });
      // provinceCombox().then((res) => {
      //   this.provinceNameList = res;
      // });
    },
    // 其他险种
    other(aa, bb) {
      disComBox({ comboxType: aa }).then((res) => {
        this.riskkind01PList = res;
      });

      disComBox({ comboxType: bb }).then((res) => {
        this.riskkind01019List = res;
      });
    },

    // 获取表单
    getorganList(page) {
      var that = this;
      this.pageNum = page;
      var reporParams = {
        insorgancode: this.insorgancode,
        riskname: this.riskName,
        // ismain: this.ismainValue,
        ismain: "Y",
        channel: this.channelValue,
        risktype: this.risktypeValue,
        isseal: this.issealValue,
        jointype: this.jointypeValue,

        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getRiskdefineList(reporParams).then((res) => {
  
        this.riskdefineList = res.rows;
        this.pageTotal = res.total;
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
   
      var params = {};



      // if (this.isinsert) {
      //   organinsert(params).then((res) => {
      //     if (res.code == "0") {
      //       that.$message({
      //         type: "success",
      //         duration: 3000,
      //         message: "添加成功",
      //       });
      //     } else {
      //       that.$message({
      //         type: "error",
      //         duration: 3000,
      //         message: "添加失败",
      //       });
      //     }
      //   });
      // } else {
      //   organUpdate(params).then((res) => {
      //     if (res.code == "0") {
      //       that.$message({
      //         type: "success",
      //         duration: 3000,
      //         message: "修改成功",
      //       });
      //     } else {
      //       that.$message({
      //         type: "error",
      //         duration: 3000,
      //         message: "修改失败",
      //       });
      //     }
      //   });
      // }
    },

    handleEdit(item) {

      // 意外险  risktype   01（riskkind01_p，riskkind01019）
      //  医疗02  （riskkind01_l，riskkind01006）
      //重疾 03 （riskkind01_l，riskkind01006）
      // 人寿04(riskkind01_l,riskkind01001)
      // 理财05(riskkind01_l,riskkind01001)
      // 车险06（）
      // 其他07(riskkind01_p，riskkind01018)
      // 产品大类  和 产品小类， 不同险种 选择项不同
      if (item.risktype == "01") {
        this.other("riskkind01_p", "riskkind01019");
      } else if (item.risktype == "02" || item.risktype == "03") {
        this.other("riskkind01_l", "riskkind01006");
      }
      if (item.risktype == "04" || item.risktype == "05") {
        this.other("riskkind01_l", "riskkind01001");
      }
      if (item.risktype == "07") {
        this.other("riskkind01_p", "riskkind01018");
      }

      this.editChannelValue = item.channel;
      this.outriskcode = item.outriskcode;
      this.editRisktypeValue = item.risktype;
      this.editInsorgancode = item.insorgancode;
      this.mainriskname = item.mainriskname;
      this.discode = item.discode;
      this.editriskkind01PValue = item.riskkind01;
      this.editriskkind01019Value = item.riskkind02;
      this.editJointypeValue = item.jointype;
      this.editIssealValue = item.isseal;
      this.freelookperiod = item.freelookperiod;
      this.price = item.price;
      this.url = item.url;

      var string = item.salesarea;
      this.editprovinceValue = string.split(",");
      this.ismainValue = item.ismain;
      this.insrevisiturl = item.insrevisiturl;
      this.description = item.description;
      this.aiuwValue = item.aiuw;
      this.emailuwValue = item.emailuw;

      this.dialogFormVisible = true;
      this.isinsert = false; //以此判断是添加还是编辑
      this.dig_title = "编辑";
    },

    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      })
        .then(() => {
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
        })
        .catch(() => {
       
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getorganList(page);
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
      // this.getUserList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      // this.getUserList(1);
    },
    clearINput() {
      this.editChannelValue = "";
      this.outriskcode = "";
      this.editRisktypeValue = "";
      this.editInsorgancode = "";
      this.mainriskname = "";
      this.discode = "";
      this.editriskkind01PValue = "";
      this.editriskkind01019Value = "";
      this.editJointypeValue = "";
      this.editIssealValue = "";
      this.freelookperiod = "";
      this.price = "";
      this.url = "";
      this.editprovinceValue = "";
      this.ismainValue = "";
      this.insrevisiturl = "";
      this.description = "";
      this.aiuwValue = "";
      this.emailuwValue = "";
    },

    copy(data) {
      if (window.clipboardData) {
        window.clipboardData.setData("text", data);
        this.$message({
          type: "success",
          duration: 3000,
          message: "复制成功",
        });
      } else {
        (function() {
          document.oncopy = function(e) {
            e.clipboardData.setData("text", data);
            e.preventDefault();
            document.oncopy = null;
          };
        })(data);
        document.execCommand("Copy");
        this.$message({
          type: "success",
          duration: 3000,
          message: "复制成功",
        });
      }
    },
  },
};
</script>

<style scoped>
.OrganManage {
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
  margin-bottom: 10px;
}

.common_hang .el-select {
  width: 150px;
}

.el-button--primary {
  height: 35px !important;
  /* line-height: 35px!important;
  text-align: center!important; */
}
.copy {
  cursor: pointer;
}
.el-textarea .el-textarea__inner {
  height: 35px;
  min-height: 35px;
}
</style>

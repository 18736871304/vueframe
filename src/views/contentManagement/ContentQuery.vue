<template>

  <div class="template">
    <div class="search">
      <div class="common_hang common_date">
        <div class="mech">修改时间</div>
        <el-date-picker v-model="searchDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="common_hang">
        <div class="mech">标题</div>
        <el-input v-model="title" placeholder="请输入标题" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">简介</div>
        <el-input v-model="info" placeholder="请输入标题" clearable></el-input>
      </div>

      <el-button type="primary" @click="getContentList(1)">查询</el-button>

    </div>

    <div class="table_list">
      <el-table :data="contentList" :stripe="true" border :row-style="{ height: '50px' }" :header-cell-style="{ background: '#f3f6fd',  color: '#555', height: '50px', }" highlight-current-row style="width: 100%;">
        <el-table-column type="index" width="40" align="center"></el-table-column>
        <el-table-column prop="modifydatestr" label="最后修改时间" width="240" align="center" sortable></el-table-column>
        <el-table-column prop="oprname" label="发布人" width="130" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="380" align="center"></el-table-column>
        <el-table-column prop="info" label="简介" width="280" align="center"></el-table-column>
        <el-table-column label="封面图" width="280" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleLookImg(scope.row.head_pic_url)">查看</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="auto">
          <template slot-scope="scope">

            <el-button type="primary" size="small" @click="handleExam(scope.row)">审核</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <el-pagination background @current-change="pageClick" :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next" :total="pageTotal" class="indexPage">
      </el-pagination>

    </div>

    <el-dialog :visible.sync="dialogShowImg" append-to-body>
      <img width="100%" :src="headImageUrl" alt="">
    </el-dialog>

  </div>

</template>
<script>

import { getContentList, contentExam } from "../../api/api";

export default {
  data() {
    return {
      contentList: [],
      title: '',
      info: '',
      searchDate: '',
      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      dialogShowImg: false,
      headImageUrl: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },



    };
  },
  created() { },
  mounted() {
    this.getContentList("1")
  },
  methods: {
    getContentList(page) {
      var that = this;
      var reporParams = {
        title: this.title,
        info: this.info,
        state: '02',
        pageNumber: page,
        pageSize: this.pageSize,
      };

      getContentList(reporParams).then((res) => {

        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.contentList = res.rows;
          this.pageTotal = res.total;
        }
      });


    },
    handleExam() {

      var that = this;
      this.$confirm("是否审核通过?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          id: item.userserialno,
        };
        contentExam(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "删除成功",
            });
            that.getContentList(1);
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
          message: '已取消审核'
        });
      });
    },



    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getContentList(page);
    },

    handleLookImg(imgUrl) {
      console.log(imgUrl)
      this.headImageUrl = imgUrl
      this.dialogShowImg = true
    },




  },

};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
 


<style  scoped>
.rich-text-editor {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
.step-list {
  padding: 0rem;
  overflow: auto;
}

/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 310px;
  margin-right: 30px;
}
.common_date {
  width: 350px;
}
.common_date .el-date-editor {
  width: 250px;
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
</style>

<style>
.rich-text-editor .w-e-text-container p {
  text-align: left;
}

.rich-text-editor .w-e-text-placeholder {
  text-align: left;
  height: 21px;
  line-height: 21px;
}

.contentManage .el-form-item__label {
  width: 60px;
  text-align: justify;
}
.contentManage .el-form-item__content {
  width: 100%;
}
</style>
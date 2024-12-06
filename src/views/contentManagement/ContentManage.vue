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
      <el-button type="primary" @click="addUser">新增</el-button>
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
        <el-table-column label="操作" align="center" width="auto">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background @current-change="pageClick" :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next" :total="pageTotal" class="indexPage">
      </el-pagination>

    </div>

    <el-dialog title="" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" width="75%">
      <!-- 标题，简介，内容  头图-->

      <el-form class="contentManage">
        <el-form-item label="标题">
          <el-input v-model="digTitle" placeholder="请输入文章标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="digInfo" placeholder="请输入简介" clearable></el-input>
        </el-form-item>

        <el-form-item label="封面图">
          <!-- :on-change="changeHeadUpload" :file-list="fileList" -->
          <el-upload action="#" accept="image/*" list-type="picture-card" class="upImg" :auto-upload="false" :multiple="false" :limit="1" :file-list="fileList" :on-change="
                      (file) => { return changeHeadUpload(file); } ">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">

              <img class="el-upload-list__item-thumbnail" :src="file.imgPath" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span> -->
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容">
          <div class="rich-text-editor" ref="richTextEditorRef">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 400px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
          </div>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogShowImg" append-to-body>
      <img width="100%" :src="headImageUrl" alt="">
    </el-dialog>

  </div>

</template>
<script>
import $ from "jquery";
import { getContentList, getOneContent, contentInsert, contentUpdate, contentDelete, uploadImg } from "../../api/api";

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        excludeKeys: [
          // 排除菜单组，写菜单组 key 的值即可
          // "group-video" //去掉视频
          "fullScreen"//去掉全屏
        ]
      },
      editorConfig: { MENU_CONF: {}, placeholder: "" },
      mode: "default", // or 'simple'

      contentList: [],
      title: '',
      info: '',
      searchDate: '',

      digTitle: '',
      digInfo: '',

      id: "",
      dialogFormVisible: false,


      // 分页
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      // 上传图片
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [ ],


      dialogShowImg:false,
      headImageUrl:'',

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
  created() {
    var that = this;
    this.editorConfig.placeholder = "请输入文章内容...";
    this.editorConfig.MENU_CONF["uploadImage"] = {
      timeout: 5 * 1000, // 5s

      fieldName: "image",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      maxFileSize: 10 * 1024 * 1024, // 10M

      base64LimitSize: 5 * 1024, // 5kb 以下插入 base64

      onBeforeUpload(files) {
        return files; // 返回哪些文件可以上传
        // return false 会阻止上传
      },
      onProgress(progress) {
        console.log("onProgress", progress);
      },
      onSuccess(file, res) {
        console.log("onSuccess", file, res);
      },
      onFailed(file, res) {
        alert(res.message);
        console.log("onFailed", file, res);
      },
      onError(file, err, res) {
        alert(err.message);
        console.error("onError", file, err, res);
      },

      // 用户自定义上传图片
      customUpload(file, insertFn) {
        var axios = require("axios");
        var FormData = require("form-data");
        var data = new FormData();
        data.append("uploadFile", file); // file 即选中的文件
        data.append("userToken", sessionStorage.getItem('userToken')); // file 即选中的文件
        var config = {
          method: "post",
          url: "http://8.133.195.79/api/content/uploadImg", //上传图片地址
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: data
        };

        axios(config).then(function (res) {
          console.log(res)
          let url = res.data.imgPath; //拼接成可浏览的图片地址
          // let url = "http://8.133.195.79/api/content/uploadImg/" + res.data.data.path; //拼接成可浏览的图片地址
          insertFn(url, "图片", url); //插入图片
        })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  },
  mounted() {
    this.getContentList("1")
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    getContentList(page) {
      var that = this;
      var reporParams = {
        title: this.title,
        info: this.info,
        state: '01',
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
    // 打开新增
    addUser() {
      this.dialogFormVisible = true;
    },
    // 获取修改的文章内容
    handleEdit(item) {
      var that = this
      this.digTitle = item.title
      this.digInfo = item.info
      this.fileList.push({ imgPath: item.head_pic_url })
      var reporParams = {
        id: item.id
      };
      getOneContent(reporParams).then((res) => {

        that.html = res.content
        that.id = res.id

        that.dialogFormVisible = true;
      })
    },

    // 确认新增或修改
    sureAdd() {
      var that = this;

      console.log(that.fileList)
      if (that.fileList.length == 0) {
        that.$message({
          type: "error",
          duration: 3000,
          message: "请添加文章封面图",
        });
        return
      }

      if (this.id == "") {
        var reporParams = {
          title: this.digTitle,
          info: this.digInfo,
          content: this.html,
          head_pic_url: that.fileList[0].imgPath
        };
        contentInsert(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "添加成功",
            });
            that.dialogFormVisible = false;
            that.getContentList(1);
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
          title: this.digTitle,
          info: this.digInfo,
          content: this.html,
          head_pic_url: that.fileList[0].imgPath,
          id: this.id,
        };
        contentUpdate(reporParams).then((res) => {
          if (res.code == "0") {
            that.$message({
              type: "success",
              duration: 3000,
              message: "修改成功",
            });
            that.dialogFormVisible = false;
            that.getContentList(1);
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
    // 删除内容
    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          id: item.userserialno,
        };
        contentDelete(reporParams).then((res) => {
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
          message: '已取消删除'
        });
      });
    },

    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getContentList(1);
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
      this.getContentList(1);
    },
    clearINput() {
      this.digTitle = "";
      this.digInfo = "";
      this.id = "";
      this.fileList = []
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getContentList(page);
    },
    handleLookImg(imgUrl) {
      console.log(imgUrl)
      this.headImageUrl=imgUrl
      this.dialogShowImg=true
    },




    changeHeadUpload(file,) {
      this.uploadfile(file.raw);
    },
    handleRemove(file) {
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.fileList[0].imgPath;
      this.dialogVisible = true;
    },
    // handleDownload(file) {
    //   console.log(file);
    // },

    // 上传图片
    uploadfile(file) {
      var that = this;
      let formData = new FormData();
      formData.append("uploadFile", file);
      formData.append("userToken", sessionStorage.getItem('userToken'));

      $.ajax({
        url: "http://8.133.195.79/api/content/uploadImg",
        type: "POST",
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
      }).done(function (res) {
        var data = JSON.parse(res);
        if (data.code == "0") {
          that.fileList = []
          that.fileList.push({ imgPath: data.imgPath })
          // that.fileList.push({ imgPath: "https://www.un29.com/articleImg/04.jpg" })
          that.$message({
            type: "success",
            duration: 2000,
            message: "上传成功!",
          });
        } else {
          that.$message({
            type: "error",
            duration: 2000,
            message: data.msg + '，删除后重新上传！',
          });
        }
      }).fail(function (res) {
        that.$message({
          type: "error",
          duration: 2000,
          message: "上传失败！",
        });
      });



    },

  },


  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  }
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
.el-pagination {
  text-align: right;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-dialog__header {
  padding: 0;
}

.el-form-item {
  display: flex;
}

.upImg {
  text-align: left;
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
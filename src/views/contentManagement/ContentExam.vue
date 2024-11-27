<template>
  <div>
    <div class="rich-text-editor" ref="richTextEditorRef">
      <!-- 菜单栏 -->
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />

      <!-- 编辑器 -->
      <Editor style="height: 400px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" @onChange="onChange" />
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "RichTextEditor",
  components: { Editor, Toolbar },
  data() {
    return {
      // 真正的编辑器里的内容
      editorContent: "",
      editor: null,
      html: "", // 富文本内容
      isDisabled: false,// 控制富文本是否能够编辑
      toolbarConfig: { // 工具栏配置
        excludeKeys: [
          // 隐藏全屏按钮
          "fullScreen"
        ]
      },
      editorConfig: { // 编辑器配置
        placeholder: "请输入内容...",
        showFullScreen: "false",
        disable: false,
        MENU_CONF: {
          uploadImage: { // 图片上传配置
            fieldName: "myFile", // 上传图片名字
            server: 'https://crm.meihualife.com//crm/fileupload/impUpload.do',
            meta: {
              // buztype: "0103",
              // buzid: ""
            },
            metaWithUrl: true, // join params to url
            headers: { Accept: 'text/x-json' },
            maxFileSize: 10 * 1024 * 1024, // 10M
            onBeforeUpload(file) {
              console.log('onBeforeUpload', file)
              return file // will upload this file
              // return false // prevent upload
            },
            onProgress(progress) {
              console.log('onProgress', progress)
            },
            onSuccess(file, res) {
              console.log('onSuccess', file, res)
              console.log(res.data[0])
            },
            onFailed(file, res) {
              alert(res.message)
              console.log('onFailed', file, res)
            },
            onError(file, err, res) {
              alert(err.message)
              console.error('onError', file, err, res)
            },
            // 自定义插入图片
            customInsert(res, insertFn) {  // TS 语法
              // 从 res 中找到 url alt href ，然后插入图片
              insertFn(res.data[0], '美华保险', res.data[0])
            },
          },
        }
      },
      mode: "default", // or 'simple'控制工具栏模式为简洁或者默认
    }
  },
  watch: {

  },
  mounted: function () {


  },
  methods: {


    onChange(editor) {
      document.onkeydown = function (event) {
        let e = event || window.event;
        if (e.code == "Enter") {
          editor.insertBreak();
        }
      };
    },

    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      if (this.isDisabled) {
        this.editor.disable();
      } else {
        this.editor.enable();
      }
    },

    onChange(editor) {
      console.log(this.html)
      this.$emit("向父组件传值", this.html);
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },




    // 上传文件
    // tirggerFile(e) {
    //   var _this = this
    //   this.updateCJGitem('isUpload').then(res => {
    //     let buztype, buzid
    //     buzid = res.id
    //     buztype = '0103'
    //     // let baseid = res.baseid
    //     let formData = new FormData();
    //     formData.append('myFile', e.target.files[0]);
    //     // formData.append('secondbuzid', res.baseid);
    //     formData.append('buztype', buztype);
    //     formData.append('buzid', buzid);
    //     let that = this
    //     $.ajax({
    //       url: my_url + '/crm/fileupload/fileUpload.do',
    //       type: 'POST',
    //       cache: false,
    //       data: formData,
    //       processData: false,
    //       contentType: false
    //     }).done(function (res) {
    //       var ss = JSON.parse(res)
    //       console.log(ss)
    //       if (ss.code == "1") {
    //         _this.$message({
    //           showClose: true,
    //           message: ss.msg,
    //           duration: 3000,
    //           type: 'error'
    //         });
    //       }
    //       $('.file-input').val('')
    //       // that.getUploadFile(baseid)
    //     }).fail(function (res) {
    //       console.log(res)
    //     });
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },







  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.rich-text-editor {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
.step-list {
  padding: 0rem;
  overflow: auto;
}
</style>

<style>
.rich-text-editor .w-e-text-container p {
  text-align: left;
 
}

.rich-text-editor .w-e-text-placeholder {
  text-align: left;
}
</style>
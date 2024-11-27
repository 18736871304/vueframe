"use strict";(self["webpackChunkmeihua"]=self["webpackChunkmeihua"]||[]).push([[956],{55956:(e,t,i)=>{i.r(t),i.d(t,{default:()=>u});i(62010);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"template"},[t("div",{staticClass:"search"},[t("div",{staticClass:"common_hang"},[t("div",{staticClass:"mech"},[e._v("手机号")]),t("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1),t("div",{staticClass:"common_hang"},[t("div",{staticClass:"mech"},[e._v("姓名")]),t("el-input",{attrs:{placeholder:"请输入姓名",clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getUserList(1)}}},[e._v("查询")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("新增")])],1),t("div",{staticClass:"table_list"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList,stripe:!0,border:"","row-style":{height:"50px"},"header-cell-style":{background:"#f3f6fd",color:"#555",height:"50px"},"highlight-current-row":""}},[t("el-table-column",{attrs:{type:"index",width:"40",align:"center"}}),t("el-table-column",{attrs:{prop:"makedatestr",label:"生成日期",width:"240",align:"center",sortable:""}}),t("el-table-column",{attrs:{prop:"realname",label:"姓名",width:"130",align:"center"}}),t("el-table-column",{attrs:{prop:"mobile",label:"手机号",width:"auto",align:"center"}}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(i){return[t("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.handleEdit(i.row)}}},[e._v("修改")]),t("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){return e.handleDel(i.row)}}},[e._v("删除")])]}}])})],1),t("el-pagination",{staticClass:"indexPage",attrs:{background:"","page-size":e.pageSize,"current-page":e.pageNum,layout:"total, prev, pager, next",total:e.pageTotal},on:{"current-change":e.pageClick}}),t("el-dialog",{attrs:{title:"",visible:e.dialogFormVisible,"before-close":e.handleClose,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[t("el-form",[t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{attrs:{placeholder:"请输入姓名",clearable:""},model:{value:e.inputName,callback:function(t){e.inputName=t},expression:"inputName"}})],1),t("el-form-item",{attrs:{label:"手机号"}},[t("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.inputMobile,callback:function(t){e.inputMobile=t},expression:"inputMobile"}})],1)],1),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.cancel}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.sureAdd}},[e._v("确 定")])],1)],1)],1)])},s=[],l=i(40412);const n={data:function(){return{mobile:"",name:"",userList:[],userid:"",dialogFormVisible:!1,inputName:"",inputMobile:"",pageTotal:0,pageSize:10,pageNum:1}},created:function(){this.getUserList(1)},methods:{getUserList:function(e){var t=this,i=this,a={mobile:this.mobile,name:this.name,usertype:"02",pageNumber:e,pageSize:this.pageSize};(0,l.aU)(a).then((function(e){"1"==e.code?i.$message({type:"error",duration:3e3,message:e.msg}):(t.userList=e.rows,t.pageTotal=e.total)}))},sureAdd:function(){var e=this;if(""==this.userid){var t={mobile:this.inputMobile,name:this.inputName};(0,l.nu)(t).then((function(t){"0"==t.code?(e.$message({type:"success",duration:3e3,message:"添加成功"}),e.dialogFormVisible=!1,e.getUserList(1),e.clearINput()):e.$message({type:"error",duration:3e3,message:"添加失败"})}))}else{t={userToken:sessionStorage.getItem("token"),mobile:this.inputMobile,name:this.inputName,userid:this.userid};(0,l.gw)(t).then((function(t){"0"==t.code?(e.$message({type:"success",duration:3e3,message:"修改成功"}),e.dialogFormVisible=!1,e.getUserList(1),e.clearINput()):e.$message({type:"error",duration:3e3,message:"修改失败"})}))}},handleEdit:function(e){this.inputMobile=e.mobile,this.inputName=e.realname,this.userid=e.userserialno,this.dialogFormVisible=!0},handleDel:function(e){var t=this,i=this;this.$confirm("确认删除吗?","提示",{type:"warning"}).then((function(){var t={userToken:sessionStorage.getItem("token"),userid:e.userserialno};(0,l.hG)(t).then((function(e){"0"==e.code?(i.$message({type:"success",duration:3e3,message:"删除成功"}),i.getUserList(1)):i.$message({type:"error",duration:3e3,message:"删除失败"})}))}))["catch"]((function(){t.$message({type:"info",message:"已取消删除"})}))},pageClick:function(e){this.pageNum=e,this.getUserList(e)},addUser:function(){this.dialogFormVisible=!0},handleClose:function(){this.dialogFormVisible=!1,this.clearINput(),this.getUserList(1)},cancel:function(){this.dialogFormVisible=!1,this.clearINput(),this.getUserList(1)},clearINput:function(){this.inputMobile="",this.inputName="",this.userid=""}}},r=n;var o=i(81656),c=(0,o.A)(r,a,s,!1,null,"0301565a",null);const u=c.exports},62010:(e,t,i)=>{var a=i(43724),s=i(10350).EXISTS,l=i(79504),n=i(62106),r=Function.prototype,o=l(r.toString),c=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,u=l(c.exec),m="name";a&&!s&&n(r,m,{configurable:!0,get:function(){try{return u(c,o(this))[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=956.89ebfbf2.js.map
"use strict";(self["webpackChunkmeihua"]=self["webpackChunkmeihua"]||[]).push([[710],{13710:(t,e,a)=>{a.r(e),a.d(e,{default:()=>p});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"template"},[e("div",{staticClass:"search"},[e("div",{staticClass:"common_hang common_date"},[e("div",{staticClass:"mech"},[t._v("修改时间")]),e("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions},model:{value:t.searchDate,callback:function(e){t.searchDate=e},expression:"searchDate"}})],1),e("div",{staticClass:"common_hang"},[e("div",{staticClass:"mech"},[t._v("标题")]),e("el-input",{attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),e("div",{staticClass:"common_hang"},[e("div",{staticClass:"mech"},[t._v("简介")]),e("el-input",{attrs:{placeholder:"请输入标题",clearable:""},model:{value:t.info,callback:function(e){t.info=e},expression:"info"}})],1),e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getContentList(1)}}},[t._v("查询")])],1),e("div",{staticClass:"table_list"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.contentList,stripe:!0,border:"","row-style":{height:"50px"},"header-cell-style":{background:"#f3f6fd",color:"#555",height:"50px"},"highlight-current-row":""}},[e("el-table-column",{attrs:{type:"index",width:"40",align:"center"}}),e("el-table-column",{attrs:{prop:"modifydatestr",label:"最后修改时间",width:"240",align:"center",sortable:""}}),e("el-table-column",{attrs:{prop:"oprname",label:"发布人",width:"130",align:"center"}}),e("el-table-column",{attrs:{prop:"title",label:"标题",width:"380",align:"center"}}),e("el-table-column",{attrs:{prop:"info",label:"简介",width:"280",align:"center"}}),e("el-table-column",{attrs:{prop:"head_pic_url",label:"封面图",width:"280",align:"center"}}),e("el-table-column",{attrs:{label:"操作",align:"center",width:"auto"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.handleExam(a.row)}}},[t._v("审核")])]}}])})],1),e("el-pagination",{staticClass:"indexPage",attrs:{background:"","page-size":t.pageSize,"current-page":t.pageNum,layout:"total, prev, pager, next",total:t.pageTotal},on:{"current-change":t.pageClick}})],1)])},i=[],l=(a(23288),a(40412));const s={data:function(){return{contentList:[],title:"",info:"",searchDate:"",pageTotal:0,pageSize:10,pageNum:1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]}}},created:function(){},mounted:function(){this.getContentList("1")},methods:{getContentList:function(t){var e=this,a=this,n={title:this.title,info:this.info,state:"01",pageNumber:t,pageSize:this.pageSize};(0,l.Cs)(n).then((function(t){"1"==t.code?a.$message({type:"error",duration:3e3,message:t.msg}):(e.contentList=t.rows,e.pageTotal=t.total)}))},handleExam:function(t){var e=this;this.$confirm("是否审核通过?","提示",{type:"warning"}).then((function(){var a={id:t.id};(0,l.BY)(a).then((function(t){"0"==t.code?(e.$message({type:"success",duration:3e3,message:"通过审核"}),e.getContentList(1)):e.$message({type:"error",duration:3e3,message:"没有通过审核，审核失败"})}))}))},pageClick:function(t){this.pageNum=t,this.getContentList(t)}}},r=s;var o=a(81656),c=(0,o.A)(r,n,i,!1,null,"99b5dff6",null);const p=c.exports},23288:(t,e,a)=>{var n=a(79504),i=a(36840),l=Date.prototype,s="Invalid Date",r="toString",o=n(l[r]),c=n(l.getTime);String(new Date(NaN))!==s&&i(l,r,(function(){var t=c(this);return t===t?o(this):s}))}}]);
//# sourceMappingURL=710.9b331c4f.js.map
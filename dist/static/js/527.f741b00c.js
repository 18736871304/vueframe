"use strict";(self["webpackChunkmeihua"]=self["webpackChunkmeihua"]||[]).push([[527],{84527:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"inssorganMan"},[t("div",{staticClass:"search"},[t("div",{staticClass:"common_hang"},[t("div",{staticClass:"mech"},[e._v("保险公司")]),t("el-select",{attrs:{filterable:"",clearable:"",placeholder:"请选择"},model:{value:e.insorgancode,callback:function(t){e.insorgancode=t},expression:"insorgancode"}},e._l(e.insorgancodeList,(function(e){return t("el-option",{key:e.dd_key,attrs:{label:e.dd_value,value:e.dd_key}})})),1)],1),t("div",{staticClass:"common_hang"},[t("div",{staticClass:"mech"},[e._v("保险公司类型")]),t("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.insorgantype,callback:function(t){e.insorgantype=t},expression:"insorgantype"}},e._l(e.insorgantypeList,(function(e){return t("el-option",{key:e.dd_key,attrs:{label:e.dd_value,value:e.dd_key}})})),1)],1),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.getInsorganList(1)}}},[e._v("查询")])],1),t("div",{staticClass:"table_list"},[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.insorganList,stripe:!0,border:"",height:e.tableHeight,"row-style":{height:"50px"},"header-cell-style":{background:"#f3f6fd",color:"#555",height:"50px"},"highlight-current-row":""},on:{"current-change":e.handleCurrentChange}},[t("el-table-column",{attrs:{type:"index",width:"50"}}),t("el-table-column",{attrs:{prop:"discode",label:"保险公司编码",width:"110",align:"center"}}),t("el-table-column",{attrs:{prop:"fullname",label:"保险公司全称",width:"230",align:"center"}}),t("el-table-column",{attrs:{prop:"shortname",label:"保险公司简称",width:"160",align:"center"}}),t("el-table-column",{attrs:{prop:"inslogourl",label:"保险公司LOGO",width:"130",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("a",{staticStyle:{color:"#8F9198"},attrs:{target:"_blank",href:n.row.inslogourl}},[e._v("下载")])]}}])}),t("el-table-column",{attrs:{prop:"insorgantypename",label:"保险公司类型",width:"110",align:"center"}}),t("el-table-column",{attrs:{prop:"link_mobile",label:"保险公司联系电话",width:"180",align:"center"}})],1),t("el-pagination",{staticClass:"indexPage",attrs:{background:"","page-size":e.pageSize,"current-page":e.pageNum,layout:"total, prev, pager, next",total:e.pageTotal},on:{"current-change":e.pageClick}})],1)])},i=[],l=n(40412);const o={data:function(){return{insorganList:[],insorgantypeList:[],insorgancodeList:[],insorgantype:"",insorgancode:"",pageTotal:0,pageSize:20,pageNum:1,tableHeight:0}},created:function(){this.tableHeight=window.innerHeight-295,this.init()},mounted:function(){var e=this;this.tableHeight=window.innerHeight-295,window.onresize=function(){return function(){e.tableHeight=window.innerHeight-295}()}},methods:{init:function(){var e=this;(0,l.xS)({comboxType:"insorgantype"}).then((function(t){e.insorgantypeList=t})),(0,l.xS)({comboxType:"insorgancode"}).then((function(t){e.insorgancodeList=t}))},getInsorganList:function(e){var t=this;this.pageNum=e;var n={insorgantype:this.insorgantype,insorgancode:this.insorgancode,pageNumber:e,pageSize:this.pageSize,page:1,rows:10};(0,l.Cb)(n).then((function(e){t.insorganList=e.rows,t.pageTotal=e.total}))},handleCurrentChange:function(e){this.unlockValue=e},pageClick:function(e){this.pageNum=e,this.getInsorganList(e)},handleClose:function(){this.dialogFormVisible=!1,this.clearINput()},cancel:function(){this.dialogFormVisible=!1,this.clearINput()},clearINput:function(){this.editMenuGroupValue=""}}},s=o;var r=n(81656),c=(0,r.A)(s,a,i,!1,null,"38359c36",null);const g=c.exports}}]);
//# sourceMappingURL=527.f741b00c.js.map
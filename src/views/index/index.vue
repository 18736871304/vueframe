<template>
  <el-row class="container">
    <!-- 头部 -->
    <Head></Head>
    <!-- 侧边导航和内容 -->
    <sidenav></sidenav>
  </el-row>
</template>

<script>
import sidenav from "../sidenav/sidenav";
import Head from "../head/head";
export default {
  data() {
    return {
      sysName: "后台管理系统",
      sysUserName: "",
      sysUserAvatar: "",
      sidenav: [],
    };
  },
  components: {
    sidenav: sidenav,
    Head: Head,
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleselect: function() {},
  },
  mounted() {},
};
</script>

<style>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.header {
  width: 100%;
   background: #001529; 
}

.tools {
  padding: 0px 23px;
  width: 40px;
  line-height: 60px;
  cursor: pointer;
}

.userinfo-inner {
  display: inline-block;
}

.huanfu {
  width: 35px;
  height: 35px;
  color: #fff;
  fill: currentColor;
  margin: 12.5px auto;
}
.fangda {
  width: 30px;
  height: 30px;
  color: #fff;
  fill: currentColor;
  margin: 15px auto;
}

.main {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 0px;
  overflow: hidden;
}

.item {
  position: relative;
}

.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.title {
  width: 200px;
  float: left;
  color: #475669;
}

.breadcrumb-inner {
  float: right;
}

.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  margin-top: 68px;
}
</style>

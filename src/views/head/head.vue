<template>
  <el-col :span="24" class="header">
    <el-col :span="1" :class="isCollapse ? 'head_logo' : 'big_logo'">
      <img src="../../assets/logo.png" alt="" :class="isCollapse ? 'logo_img' : 'big_logo_img'" class="logo_img" />
    </el-col>
    <!-- <el-col
      :span="14"
      :class="isCollapse ? 'nologo' : 'logo'"
      style=" font-size: 24px;"
      >{{ sysName }}</el-col
    > -->

    <el-col :span="1" class="nav_head">
      <el-radio-group v-model="isCollapse" :class="isCollapse ? 'el-radio-group1' : 'el-radio-group gg'">
        <i v-show="!isCollapse" class="el-icon-s-fold" @click="Collapse"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold" @click="noCollapse"></i>
      </el-radio-group>
    </el-col>

    <!-- <el-col :span="2" class="nav_head">
      <el-tooltip class="item" effect="dark" content="" placement="nav1">
        <p class="nav_head" multiBtn @click="$router.push('/page1')">
          nav1
        </p>
      </el-tooltip>
    </el-col>-->

    <!-- <el-col :span="2" style="float: right;">
      <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
        <p class="el-dropdown-link nav_head" multiBtn command="profile">
          nav4<i class="el-icon-arrow-down el-icon--right"></i>
        </p>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="profile">个人信息</el-dropdown-item>
          <el-dropdown-item command="updatePass">修改信息</el-dropdown-item>
          <el-dropdown-item command="logout">删除信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col> -->

    <el-col :span="2" class="userinfo userinfo1">
      <el-dropdown trigger="hover">
        <div class="el-dropdown-link userinfo-inner">
          <!-- <img src="../../assets/user.png" /> -->
          <div class="username">
            <span> {{ username }},退出</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改头像</el-dropdown-item>
          <el-dropdown-item>项目仓库</el-dropdown-item> -->
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

    <el-col :span="1" class="nav_head" style="float: right;">
      <el-popover placement="bottom" width="350" trigger="click">
        <div class="message">
          <ul>
            <li>消息一</li>
            <li>消息二</li>
            <li>消息三</li>
            <li>消息四</li>
          </ul>
        </div>
        <i slot="reference" class="el-icon-bell"></i>
      </el-popover>
    </el-col>
    <el-col :span="1" class="nav_head" style="float: right;">
      <el-radio-group v-model="isFull" :class="isFull ? 'el-radio-group1' : 'el-radio-group gg'">
        <i v-show="!isFull" class="el-icon-full-screen" @click="toFullOrExit"></i>
        <i v-show="isFull" class="el-icon-aim" @click="toFullOrExit"></i>
      </el-radio-group>
    </el-col>

    <el-col :span="8" class="nav_head" style="float: none; width:auto">
      <span class="mingyan">易昂知识库管理系统</span>
    </el-col>
  </el-col>
</template>

<script>
import { logout } from "../../api/api";
export default {
  data() {
    return {
      sysName: "核心管理系统",
      sysUserName: "",
      sysUserAvatar: "",
      isCollapse: false,
      fullImg: "",
      isFull: false,
      username: ''
    };
  },

  mounted() {

    this.username = sessionStorage.getItem('username')
    let that = this;
    window.addEventListener("resize", function () {
      if (!that.isFullScreen()) {
        if (that.isFull) {
          that.isFull = !that.isFull;
        }
        // 非全屏状态
        //业务逻辑
      }
    });
  },

  methods: {
    Collapse: function () {
      this.isCollapse = true;
      this.$store.commit("setCollapse", true);
    },
    noCollapse: function () {
      this.isCollapse = false;
      this.$store.commit("setCollapse", false);
    },
    logout: function () {
      var that = this;

      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      }).then(() => {
        sessionStorage.removeItem("userCode");
        that.$router.push("/login");
        var reporParams = {
          userToken: sessionStorage.getItem("userToken"),
        };
        logout(reporParams).then((res) => {
          sessionStorage.removeItem("rightList");
          sessionStorage.removeItem("userToken");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("usermobile");
          that.$router.push("/login");
          // if (res.code == "0") {
          //   sessionStorage.removeItem("rightList");
          //   sessionStorage.removeItem("token");
          //   sessionStorage.removeItem("username");
          //   that.$router.push("/login");
          // } else {
          //   // that.$message({
          //   //   type: "error",
          //   //   duration: 3000,
          //   //   message: "退出登录失败",
          //   // });
          //   that.$router.push("/login");
          // }
        });
      }).catch(() => { });
    },
    // 全屏
    requestFullScreen() {
      let de = document.documentElement;
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    // 退出全屏
    exitFullscreen() {
      let de = document;
      if (de.exitFullscreen) {
        de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
      }
    },
    //全屏
    fullele() {
      return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        null
      );
    }, //判断是否全屏
    isFullScreen() {
      return !!(document.webkitIsFullScreen || this.fullele());
    },
    toFullOrExit() {
      this.isFull = !this.isFull;
      if (this.isFull) {
        // this.fullImg = require("@/assets/logo.png");
        this.requestFullScreen();
      } else {
        // this.fullImg = require("@/assets/logo.png");
        this.exitFullscreen();
      }
    },
  },
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
  height: 50px;
  background-size: 100% 100%;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}
.logo_img {
  width: 98.28px;
  height: 50.44px;
}

.big_logo {
  width: 189.5px;
  background: #001529;
  height: 50px;
}

.logo {
  width: 145.5px;
  color: #fff;
  text-align: center;
  background: #001529;
  height: 100%;
  line-height: 50px;
}
.nologo {
  display: none;
}

.nav_head {
  font-size: 14px;
  width: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  margin: 0 auto;
}
.nav_head i {
  color: #fff;
}
.tools {
  padding: 0px 23px;
  width: 40px;
  line-height: 50px;
  cursor: pointer;
}

.el-icon-full-screen,
.el-icon-aim,
.el-icon-bell,
.el-icon-s-fold,
.el-icon-s-unfold {
  font-size: 20px;
  color: #000000d9;
  line-height: 50px;
  cursor: pointer;
}
.userinfo-inner {
  display: inline-block;
}
.username {
  font-size: 15px;
  color: #000000d9;
  display: inline-block;
}
.username span {
  margin-left: 10px;
  margin-right: 5px;
}

.userinfo-inner img {
  width: 24px;
  height: 24px;
  margin: 5px auto;
  vertical-align: middle;
  border-radius: 50%;
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
.userinfo {
  height: 50px;
  line-height: 50px;
  float: right;
  cursor: pointer;
}
.userinfo1 {
  width: 145px;
  margin-right: 20px;
  color: #fff;
}

.userinfo1 i,
.userinfo1 span {
  color: #fff;
}
.main {
  display: flex;
  position: absolute;
  top: 50px;
  bottom: 0px;
  overflow: hidden;
}
.main aside {
  flex: 0 0 210px;
  width: 210px;
}

::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  margin-left: -6px;
}
/* 滑块部分 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #9093994d;
}
/* 轨道部分 */
::-webkit-scrollbar-track {
  border-radius: 5px;
}

.collapsed {
  width: 50px;
}
.item {
  position: relative;
}

.submenu {
  position: absolute;
  top: 0px;
  left: 50px;
  z-index: 99999;
  height: auto;
  display: none;
}

.menu-expanded {
  flex: 0 0 230px;
  width: 230px;
}

.content-container {
  flex: 1;
  overflow-y: scroll;
  padding: 0 15px 20px;
  background: #e3e9ed;
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

.head_logo {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #001529;
}
.message ul {
  /* margin: 10px;
   padding: 10px; */
}

.message ul li {
  height: 30px;
  line-height: 30px;
}

/* 闪光 */

/* 加上 -webkit- 注意兼容 */
.mingyan {
  font-size: 20px;
  background: -webkit-linear-gradient(
    135deg,
    #0eaf6d,
    #ff6ac6 25%,
    #147b96 50%,
    #e6d205 55%,
    #2cc4e0 60%,
    #8b2ce0 80%,
    #ff6384 95%,
    #08dfb4
  );
  /* 文字颜色填充设置为透明 */
  -webkit-text-fill-color: transparent;
  /* 背景裁剪，即让文字使用背景色 */
  -webkit-background-clip: text;
  /* 背景图放大一下，看着柔和一些 */
  -webkit-background-size: 200% 100%;
  /* 应用动画flowCss 12秒速度 无限循环 线性匀速动画*/
  -webkit-animation: flowCss 12s infinite linear;
}

@-webkit-keyframes flowCss {
  0% {
    /* 移动背景位置 */
    background-position: 0 0;
  }

  100% {
    background-position: -400% 0;
  }
}
.mingyan {
  -webkit-text-fill-color: #fff;
}
.mingyan:hover {
  -webkit-animation: flowCss 4s infinite linear;
}
</style>

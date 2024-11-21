<template>
  <!-- 按de可以快速出来页面模板 -->
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/user.png" />
      </div>
      <el-form label-width="60px" class="login_form" :model="ruleForm2" ref="ruleForm2">
        <el-form-item label="账号:">
          <el-input prefix-icon="el-icon-s-custom" v-model="ruleForm2.mobile" placeholder="请输入账号" class="user" @keyup.enter.native="goToPwdInput"></el-input>
        </el-form-item>

        <el-form-item label="密码:">
          <el-input prefix-icon="el-icon-search" v-model="ruleForm2.password" placeholder="请输入密码" class="password" @keyup.enter.native="onLogin" ref="pwd"></el-input>
        </el-form-item>

        <!-- <el-checkbox v-model="checked" checked class="remember jipassword"
          >记住密码</el-checkbox
        > -->

        <el-button type="primary" class="primary" @click="onLogin('loginForm')">登录</el-button>
        <!-- <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, AuthMenuList } from "../../api/api";
import md5 from "js-md5";

export default {
  data() {
    return {
      ruleForm2: {
        mobile: "",
        password: "",
      },
      checked: true,
      // rules2: {
      //   account: [
      //     { required: true, message: "请输入账号", trigger: "blur" },
      //     //{ validator: validaePass }
      //   ],
      //   checkPass: [
      //     { required: true, message: "请输入密码", trigger: "blur" },
      //     //{ validator: validaePass2 }
      //   ],
      // },
    };
  },
  methods: {
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName("input")[0].focus();
    },
    // 登录操作
    onLogin() {
      var that = this;
      this.$refs.pwd.$el.getElementsByTagName("input")[0].blur();




      this.logining = true;
      // var loginParams = {
      //   mobile: this.ruleForm2.mobile,
      //   password: md5(this.ruleForm2.password).toUpperCase(),
      // };
      var loginParams = {
        mobile: "13888888888",
        // password: "E10ADC3949BA59ABBE56E057F20F883E",
        password: md5("123456").toUpperCase(),
      };

      login(loginParams).then((res) => {

        that.logining = false;
        if (res.code == 0) {
          that.$store.commit("setusermobile", loginParams.mobile,  sessionStorage.setItem('usermobile', loginParams.mobile));
          sessionStorage.setItem('userToken', res.userToken)
          sessionStorage.setItem('username', res.username)
          that.AuthMenuList(res.userToken)
          that.$store.commit("setCollapse", false);
        } else {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        }
      });
    },
    //获取菜单

    AuthMenuList(userToken) {
      var params = {
        userToken: userToken
      };
      AuthMenuList(params).then((res) => {
        let rightList = [];
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {

            if (res[i].childmenu && res[i].childmenu.length > 0) {
              let childmenuList = [];
              for (let j = 0; j < res[i].childmenu.length; j++) {
                childmenuList.push({
                  path: res[i].childmenu[j].path,
                  menuname: res[i].childmenu[j].menuname,
                  menuid: res[i].childmenu[j].menuid,
                });
              }
              rightList.push({
                path: res[i].path,
                menuname: res[i].menuname,
                childmenu: childmenuList,
                menuid: res[i].menuid,
              });
            } else {
              rightList.push({
                path: res[i].path,
                menuname: res[i].menuname,
                childmenu: [],
                menuid: res[i].menuid,
              });
            }
          }
          this.$store.commit("setRightList", JSON.stringify(rightList));
          this.$router.push("/home");
        }

        this.logining = false;
        if (res.code == 0) {
        }
      });
    },
  },
};
</script>
<style>
.primary {
  width: 100%;
}
.jipassword {
  width: 35%;
  float: left;
  margin-bottom: 20px;
}
.login_form {
  width: 100%;
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-left: -225px;
  padding: 0 50px;
  box-sizing: border-box;
}
.btns {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.login_container {
  background: url(../../assets/beijing.jpg);
  background-size: 100% 100%;
  /* background-color: #2b4b6b; */
  height: 100%;
}
.login_box {
  width: 450px;
  height: 335px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
</style>

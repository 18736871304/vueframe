<template>
  <div class="template">
    <div class="labelBox">
      <div class="labelInput">
        <div class="mech">原密码</div>
        <el-input v-model="yuanPassword" placeholder="请输入内容" show-password></el-input>
      </div>
      <div class="labelInput">
        <div class="mech">新密码</div>
        <el-input v-model="newPassword" placeholder="请输入姓名" show-password></el-input>
      </div>
      <el-button class="btn" type="primary" @click="updatePassWord()">保存</el-button>
    </div>

  </div>
</template>

<script> 
import { updatePassWord } from "../../api/api";
import md5 from "js-md5";
export default {

  data() {
    return {
      yuanPassword: "",
      newPassword: "",
    };
  },
  created() {

  },
  methods: {
    updatePassWord() {
      var that = this
      var reporParams = {
        yuanpassword: md5(this.yuanPassword).toUpperCase(),
        password: md5(this.newPassword).toUpperCase(),
      };
      updatePassWord(reporParams).then((res) => {
        console.log(res)

        if (res.code == '0') {
          that.$message({
            type: "success",
            duration: 3000,
            message: "密码修改成功,请重新登录",
          });
          sessionStorage.removeItem("rightList");
          sessionStorage.removeItem("userToken");
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("usermobile");
          that.$router.push("/login");
        }






      });
    },
  }
}
</script>

<style   scoped>
.labelBox {
  display: flex;
  flex-direction: column;
  width: 310px;
  margin-right: 30px;
}
.labelInput {
  display: flex;
  margin-bottom: 30px;
}
.labelInput .mech {
  width: 100px;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  color: #909399;
}
.labelInput .el-input {
  width: 210px;
}
::v-deep.labelInput .el-input .el-input__inner {
  width: 210px;
  border-radius: 35px !important;
  height: 35px;
}

::v-deep.labelInput .el-input__icon {
  line-height: 35px;
}

.labelInput .el-select .el-input {
  width: 210px;
}

.btn {
  width: 210px;
  margin-left: 100px;
  border-radius: 35px;
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    if (this.$router.path !== "/home") {
      if (sessionStorage.getItem("userCode")) {
        this.$router.replace("home");
      } else {
        this.$router.replace("login");
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-input__inner {
  height: 35px !important;
  line-height: 35px !important;
  border-radius: 0 !important;
}

.el-table .el-table__cell {
  padding: 0 !important;
}
a {
  text-decoration: none;
}
.el-textarea__inner {
  height: 35px !important;
  min-height: 35px !important;
  border-radius: 0 !important;
}
</style>

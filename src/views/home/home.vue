<template>
  <div>
    <div>欢迎你</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getsonDatas: {},
      selectItem: [true, true, true, true, true, true],
    };
  },
  methods: {
    getson() {
      this.getsonDatas = this.$children[0].selectValue;
    },
    chongzhi() {
      this.getsonDatas = {
        get02OrgValue: "",
        get03OrgValue: "",
        get04OrgValue: "",
        getTeamValue: "",
        getTeamId: "",
      };
    },
  },
};
</script>

<style scoped></style>

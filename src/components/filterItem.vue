<template>
  <div class="search">
    <div class="common_hang" v-show="selectItem[0]">
      <div class="mech">省公司</div>
      <el-select
        v-model="selectValue.get02OrgValue"
        clearable
        placeholder="请选择"
        @change="get03Org"
      >
        <el-option
          v-for="item in get02OrgList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div>
    <div class="common_hang" v-show="selectItem[1]">
      <div class="mech">分公司</div>
      <el-select
        v-model="selectValue.get03OrgValue"
        clearable
        placeholder="请选择"
        @change="get04Org"
      >
        <el-option
          v-for="item in get03OrgList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div>
    <div class="common_hang" v-show="selectItem[2]">
      <div class="mech">营业部</div>
      <el-select
        v-model="selectValue.get04OrgValue"
        clearable
        placeholder="请选择"
        @change="getTeamListByOrgan"
      >
        <el-option
          v-for="item in get04OrgList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div>
    <div class="common_hang" v-show="selectItem[3]">
      <div class="mech">事业部</div>
      <el-select
        v-model="selectValue.getTeamValue"
        clearable
        placeholder="请选择"
        @change="getTeamListByUpTeamId"
      >
        <el-option
          v-for="item in getTeamList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div>
    <div class="common_hang" v-show="selectItem[4]">
      <div class="mech">团队</div>
      <el-select v-model="selectValue.getTeamId" clearable placeholder="请选择">
        <el-option
          v-for="item in getTeamIdList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div>
    <!-- <div class="common_hang">
      <div class="mech">组</div>
      <el-select v-model="isstop" clearable placeholder="请选择">
        <el-option
          v-for="item in isstopList"
          :key="item.dd_key"
          :label="item.dd_value"
          :value="item.dd_key"
        >
        </el-option>
      </el-select>
    </div> -->
  </div>
</template>

<script>
import {
  get02Org,
  get03Org,
  get04Org,
  getTeamListByOrgan,
  getTeamListByUpTeamId,
} from "../api/api";
export default {
  props: {
    getsonDatas: {
      type: [Object, Array],
      default: "",
    },
    selectItem: {
      type: [Object, Array],
      default: "",
    },
  },
  watch: {
    getsonDatas: {
      handler(newValue, oldValue) {
        this.selectValue = newValue;
      },
    },
  },
  data() {
    return {
      get02OrgList: [],
      get03OrgList: [],
      get04OrgList: [],
      getTeamList: [],
      getTeamIdList: [],
      selectValue: {
        get02OrgValue: "",
        get03OrgValue: "",
        get04OrgValue: "",
        getTeamValue: "",
        getTeamId: "",
      },
    };
  },
  created() {
    // this.init();
  },

  watch: {},
  methods: {
    init() {
      get02Org().then((res) => {
        this.get02OrgList = res;
        //选择或删除前面的筛选项，使后面的筛选项跟着变化 
        this.selectValue.get03OrgValue = "";
        this.selectValue.get04OrgValue = "";
        this.selectValue.getTeamValue = "";
        this.selectValue.getTeamId = "";
      });
    },

    get03Org() {
      this.selectValue.get03OrgValue = "";
      this.selectValue.get04OrgValue = "";
      this.selectValue.getTeamValue = "";
      this.selectValue.getTeamId = "";
      if (this.selectValue.get02OrgValue == "") {
        return;
      }
      get03Org({ organcode: this.selectValue.get02OrgValue }).then((res) => {
        this.get03OrgList = res;
      });
    },
    get04Org() {
      this.selectValue.get04OrgValue = "";
      this.selectValue.getTeamValue = "";
      this.selectValue.getTeamId = "";
      if (this.selectValue.get03OrgValue == "") {
        return;
      }
      get04Org({ organcode: this.selectValue.get03OrgValue }).then((res) => {
        this.get04OrgList = res;
      });
    },
    getTeamListByOrgan() {
      this.selectValue.getTeamValue = "";
      this.selectValue.getTeamId = "";
      if (this.selectValue.get04OrgValue == "") {
        return;
      }
      getTeamListByOrgan({ organcode: this.selectValue.get04OrgValue }).then(
        (res) => {
          this.getTeamList = res;
        }
      );
    },
    getTeamListByUpTeamId() {
      this.selectValue.getTeamId = "";
      if (this.selectValue.getTeamValue == "") {
        return;
      }
      getTeamListByUpTeamId({ upteamid: this.selectValue.getTeamValue }).then(
        (res) => {
          this.getTeamIdList = res;
        }
      );
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 10px;
}
.common_hang {
  display: flex;
  width: 270px;
  margin-bottom: 10px;
}
.common_hang .mech {
  width: 100px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #909399;
}
.common_hang .el-input,
.common_hang .el-select {
  width: 150px;
}
.common_hang .el-input .el-input__inner {
  width: 150px;
  border-radius: 0;
  height: 35px;
}
.common_hang .el-select .el-input {
  width: 150px;
}
</style>

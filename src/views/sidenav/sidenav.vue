<template>
  <el-col :span="24" class="main">
    <!-- 侧边导航 -->
    <Main v-on:childByValue="childByValue"></Main>
    <!-- 导航内容 -->
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <!-- 顶部导航 -->
        <div class="guding" :class="isCollapse ? 'collapsed' : 'expanded'">
          <el-row class="content-tabs" ref="titleNav" :style="'width:' + gudingWidth + 'px'">
            <i v-if="isShow" leftIcon class="el-icon-d-arrow-left scroll" :class="isCollapse ? 'arrow-left' : 'el-icon-d-arrow-left'" @click="toLeft"></i>

            <el-button type="primary" v-for="item in editableTabs" :key="item.name" class="tabStyle">
              <div :class="{ activeLine: routeTitle == item.title }" class="lineBox">
                <router-link ref="ss" :to="item.content">{{ item.title }}
                </router-link>
                <i v-if="!(item.name == 0)" class="el-icon-close el-icon--right" @click.stop="removeTab(item.name, item.title, $event)"></i>
              </div>
            </el-button>

            <i v-if="isShow" rightIcon class="el-icon-d-arrow-right scroll" @click="toRight"></i>
          </el-row>
        </div>
        <!-- <div class="hengxian"></div> -->
        <!-- 具体内容 -->
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>
</template>

<script>
import { mapState } from "vuex";
import Main from "./main";
export default {
  data() {
    return {
      isShow: false,
      // collapsed: false,

      // editableTabsValue: "",
      editableTabs: [{ content: "/home", name: "0", title: "首页" ,index:''}],
      lists: [],
      // rouStyle: "",
      routeTitle: "", //当前路由
      gudingWidth: "",
      // scrollLeftNum: "", //当前点击的路由前面有几个
    };
  },

  components: {
    Main,
  },
  computed: mapState({
    ...mapState(["isCollapse"]),
  }),
  watch: {
    editableTabs: {
      handler(newVal, oldVal) {
        if (newVal.length == 0) {
          this.$router.push("/home");
        }
      },
    },

    $route: {
      handler: function (route, aa) {
      
        this.routeTitle = route.name;
        this.cejv();

     
      },
      immediate: true,
    },

    isCollapse: {
      handler(newVal, oldVal) {
        this.cejv();
      },
    },
  },

  methods: {
    toLeft() {
      this.move("left");
    },
    toRight() {
      this.move("right");
    },

    move(direction) {
      if (direction === "left") {
        this.$refs.titleNav.$el.scrollLeft -= 300;
      } else {
        this.$refs.titleNav.$el.scrollLeft += 300;
      }
    },

    cejv() {
      if (!this.isCollapse) {
        var pageWidth = document.documentElement.clientWidth - 240;
      } else {
        var pageWidth = document.documentElement.clientWidth - 60;
      }

      if (this.$refs["titleNav"] != undefined) {
        var navWidth = this.$refs.titleNav.$el.scrollWidth;
      } else {
        var navWidth = 69;
      }

      if (navWidth > pageWidth) {
        this.gudingWidth = pageWidth;
        this.$refs.titleNav.$el.scrollLeft += 120;
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },

    //添加面包屑  子父传值， 父元素在这里接受子元素传递过来的值
    childByValue(data, e) {
      var that = this;
      var tabs = this.editableTabs;
      if (tabs.length != 0) {
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].content == data[1]) {
            // this.scrollLeftNum = tabs[i].name;
            return;
          }
        }
      }

      this.editableTabs.push({
        title: data[2],
        name: this.editableTabs.length,
        content: data[1],
        index:data[0]
      });



      // this.$refs.titleNav.$el.scrollLeft=6000
      // this.scrollLeftNum = this.editableTabs.length;
    },

    //移除tabs
    removeTab(data, title) {
      let tabs = this.editableTabs;
      this.editableTabs = tabs.filter((tab) => tab.name !== data);
      for (var i = 0; i < this.editableTabs.length; i++) {
        this.editableTabs[i].name = i;
      }
      if (title == this.routeTitle) {
        this.$router.push(this.editableTabs[data - 1].content);
      } else {
        this.cejv();
      }
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  margin-top: 68px;
}
.tabStyle {
  color: #606266;
  background-color: #fff;
  border: 0;
  float: left;
  padding: 10px 5px;
}
.content-tabs .el-button--primary:hover {
  color: #606266;
  background-color: #fff;
}

.tabStyle span a {
  padding-left: 12px;
  color: #606266;
  padding-right: 19px;
}
.lineBox {
  display: flex;
  width: auto;
}
.el-icon--right {
  margin-left: 5px;
}
a {
  color: #fff;
  text-decoration: none;
}
.router-link-active {
  color: #1890ff !important;
}
.content-tabs {
  margin-bottom: 15px;
  background: #fff;
  padding: 10px 20px;
  margin-left: -15px;
  position: fixed;
  z-index: 200;
  display: flex;
  height: 52px;
  overflow-x: hidden;
  overflow-y: hidden;
  top: 52px;
}
.el-button--primary:active {
  background-color: #fff;
}

.tabStyle .el-icon-close {
  display: none;
}

.tabStyle :hover .el-icon-close {
  display: block;
}
.tabStyle :hover a {
  padding-right: 0px;
}

.tabStyle:nth-child(1) :hover a {
  padding-right: 19px;
}
.tabStyle .activeLine {
  border-bottom: 1px solid #1890ff;
  height: 25px;
}

.router-link-active + .el-icon-close {
  color: #1890ff;
}

.el-button + .el-button {
  margin-left: 0;
}

.grid-content {
  width: 100%;
  background: #fff;
  height: 52px;
  border-top: 2px solid #eee;
}
.scroll {
  line-height: 52px;
  width: 30px;
  height: 52px;
  background: #fff;
  cursor: pointer;
}
.el-icon-d-arrow-left {
  position: fixed;
  top: 52px;
  left: 190px;
}
.el-icon-d-arrow-right {
  position: fixed;
  top: 52px;
  right: 0px;
}

.guding {
  width: 100%;
  background: #fff;
  height: 50px;
  border-top: 2px solid #eee;
  position: fixed;
  top: 50px;
  left: 225px;
  z-index: 2000;
}
.collapsed {
  position: fixed;
  left: 80px;
}
.expanded {
  position: fixed;
  left: 207px;
}
.arrow-left {
  position: fixed;
  left: 65px;
}
</style>
<style scoped>
.el-button--primary:focus,
.el-button--primary:hover {
  background: #fff;
}
</style>

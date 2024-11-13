import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import ElementUI from "element-ui";
import VueRouter from 'vue-router';
import store from './vuex/store';
import Vuex from 'vuex';
import routes from './router/index';
import 'default-passive-events'
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import 'font-awesome/css/font-awesome.css';
import echarts from 'echarts';
import VueCropper from 'vue-cropper'
// import BaiduMap from 'vue-baidu-map'

Vue.prototype.$echarts = echarts;
Vue.use(VueCropper)
// Vue.use(BaiduMap, {
//   ak: 'kUwINhHIpBKNDcbD9McEEuG2WZXLX8AM'
// });
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
const router = new VueRouter({
  routes
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 请求拦截器
axios.interceptors.request.use(config => {
  //为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})
//前置路由导航守卫
// router.beforeEach((to, from, next) => {

  // if (to.path == '/login') {
  //   sessionStorage.removeItem('username');
  //   return next();
  // }
  // let user = JSON.parse(sessionStorage.getItem('username'));
  // if (!user && to.path != '/login') {
  //   next({
  //     path: '/login'
  //   })
  // } else {
  //   next()
  // }

  // 数组字符串转化为数组
  // var menuList = sessionStorage.getItem('rightList');
  // // 首先需要判断当用户直接访问该页面时，是否已经登录，登录之后会有session，
  // //  判断session中是否有请求的菜单地址。如果有，则跳转到该页面。 否则提示，无权限访问
  // if (menuList) {
  //   // 下面我要在这里判断，用户访问的to.path，跟我菜单中的path是否一致，
  //   // 若一致，那么该登录者可以访问此页面，
  //   // 若不一致，将跳出登录页，或提示用户无权限访问该页面
  //   let isRequire = searchMenu(menuList, to.path);
  //   if (isRequire) {
  //     // 若存在，继续访问
  //     return next();
  //   } else {
  //     if (to.path == '/home') {
  //       return next();
  //     } else {
  //       alert('无权限访问')
  //     }

  //     // 跳到上一页
  //     next(from.path);
  //   }
  // } else {
  //   return next('/login')
  // }
// })

// 查找菜单数组中path是否存在,使用递归循环查询该数组是否有children，判断path跟我菜单中的path是否一致；
function searchMenu(menuList, path) {
  var menuList = eval('(' + menuList + ')');
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].path == path) {
      return true
    }
    if (menuList[i].childmenu) {
      let menchild = menuList[i].childmenu
      for (var j = 0; j < menchild.length; j++) {
        if (menchild[j].path == path) {
          return true
        }
      }
    } else {
      return false
    }
  }
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
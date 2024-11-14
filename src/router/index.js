import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/vuex/store.js'

Vue.use(VueRouter);

var routes = [{
    path: "/",
    redirect: '/login',

  },
  {
    path: '/login',
    name: "登录",
    meta: {
      title: ''
    },
    component: () => import("../views/login/login.vue"),
  },


  {
    path: '/home',
    component: () => import("@/views/index/index.vue"),
    // name: '系统管理',
    iconCls: 'fa fa-home',
    children: [{
        path: '/home',
        component: () => import("@/views/home/home.vue"),
        name: '首页',
      },

   {
        path: '/UserManage',
        component: () => import("@/views/authority/UserManage.vue"),
        name: '用户管理'
      },

      {
        path: '/AuthManage',
        component: () => import("@/views/authority/AuthManage.vue"),
        name: '权限管理'
      },
      {
        path: '/UserAuthority',
        component: () => import("@/views/authority/UserAuthority.vue"),
        name: '用户权限'
      },




   

      {
        path: '/PasswordManage',
        component: () => import("@/views/authority/PasswordManage.vue"),
        name: '修改密码',
        leaf:true
      },



      // admin
      {
        path: '/admin/team/teamMan',
        component: () => import("@/views/admin/team/teamMan.vue"),
        name: '团队管理'
      },
      {
        path: '/admin/user/userunlock',
        component: () => import("@/views/admin/user/userunlock.vue"),
        name: '用户解锁'
      },


      {
        path: '/admin/supplierMan/riskQuery',
        component: () => import("@/views/admin/supplierMan/riskQuery.vue"),
        name: '保险产品查询'
      },

      {
        path: '/admin/supplierMan/insorganMan',
        component: () => import("@/views/admin/supplierMan/insorganMan.vue"),
        name: '保险公司管理'
      },




      {
        path: '/admin/supplierMan/riskdefineMan',
        component: () => import("@/views/admin/supplierMan/riskdefineMan.vue"),
        name: '保险产品管理'
      },


      {
        path: '/admin/supplierMan/riskamntMan',
        component: () => import("@/views/admin/supplierMan/riskamntMan.vue"),
        name: '保险金额管理'
      },

      {
        path: '/admin/supplierMan/payintvMan',
        component: () => import("@/views/admin/supplierMan/payintvMan.vue"),
        name: '缴费方式管理'
      },

      {
        path: '/admin/supplierMan/payendyearMan',
        component: () => import("@/views/admin/supplierMan/payendyearMan.vue"),
        name: '缴费年期管理'
      },

      {
        path: '/admin/supplierMan/insureyearMan',
        component: () => import("@/views/admin/supplierMan/insureyearMan.vue"),
        name: '保障期限管理'
      },
      {
        path: '/admin/supplierMan/coefficientMan',
        component: () => import("@/views/admin/supplierMan/coefficientMan.vue"),
        name: '产品系数管理'
      },
      {
        path: '/admin/supplierMan/baseRateMan',
        component: () => import("@/views/admin/supplierMan/baseRateMan.vue"),
        name: '基础佣金管理（待修改）'
      },
      {
        path: '/admin/supplierMan/noSillRateMan',
        component: () => import("@/views/admin/supplierMan/noSillRateMan.vue"),
        name: '无门槛加佣管理（待修改）'
      },
      {
        path: '/admin/supplierMan/sillRateMan',
        component: () => import("@/views/admin/supplierMan/sillRateMan.vue"),
        name: '有门槛加佣管理（待修改）'
      },





      // {
      //   path: '/AuthManage',
      //   component: () => import("@/views/organ/AuthManage.vue"),
      // },
      // {
      //   path: '/UserAuthority',
      //   component: () => import("@/views/organ/UserAuthority.vue"),
      // },

    ]
  },


  {
    path: '/404',
    component: () => import("@/views/404/404.vue"),
    name: '',
  },
  {
    path: '*',
    redirect: {
      path: '/404'
    }
  }

];

const router = new VueRouter({
  routes,
  mode: 'history'
  // mode: 'hash'
})


export default routes;
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    userCode: '',
    count: 10,
    rightList: sessionStorage.getItem('rightList') || [],
    username: sessionStorage.getItem('user') || '',
    isCollapse: false,
    activeRouter:'',//当前路由
}

// 定义所需的 mutations
const mutations = {
    // 储存账号
    setuserCode(state, data) {
        state.userCode = data
    },
    // 储存侧边导航菜单
    setRightList(state, data) {
        state.rightList = data
        sessionStorage.setItem('rightList', data)
    },
    setUsername(state, data) {
        state.username = data
        sessionStorage.setItem('username', data)
    },

    // 折叠按钮
    setCollapse(state, data) {
        state.isCollapse = data
    },
    // 保存后台返回菜单
    saveMenuList(state, data) {
        state.rightList = data;
    },




    setActiveIndex(state, value) {
        console.log(value)
        state.activeRouter = value
    },

    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
}


// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
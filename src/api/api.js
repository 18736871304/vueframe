import axios from 'axios';
import Qs from "qs";
// let base = 'https://insure.meihualife.com'; //添加域名
let base = 'http://8.133.195.79'; //添加域名


//登录
export const login = params => {
  return axios.post(`/api/user/logonByMoblie`, Qs.stringify(params)).then(res => res.data);
};

//登出
export const logout = params => {
  return axios.post(`/api/user/logout`, Qs.stringify(params)).then(res => res.data);
};

//数据字典
export const getDictList = params => {
  return axios.post(`/api/common/getDictList`, Qs.stringify(params)).then(res => res.data);
};

// 菜单
export const AuthMenuList = params => {
  return axios.post(`/api/menu/getAuthMenuList`, Qs.stringify(params)).then(res => res.data);
};

// 获取用户信息
export const getUserList = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/getUserList`, Qs.stringify(params)).then(res => res.data);
};

// 新增用户信息
export const addUser = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/addUser`, Qs.stringify(params)).then(res => res.data);
};

//修改用户信息
export const editUser = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/editUser`, Qs.stringify(params)).then(res => res.data);
};

//删除用户信息
export const deleteUser = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/deleteUser`, Qs.stringify(params)).then(res => res.data);
};


//获取权限列表
export const getMenuGroupList = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/getMenuGroupList`, Qs.stringify(params)).then(res => res.data);
};

//新增权限 
export const addMenuGroup = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/addMenuGroup`, Qs.stringify(params)).then(res => res.data);
};

//编辑权限 
export const editMenuGroup = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/editMenuGroup`, Qs.stringify(params)).then(res => res.data);
};


//删除权限 
export const deleteMenuGroup = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/deleteMenuGroup`, Qs.stringify(params)).then(res => res.data);
};


// 根据权限查询菜单
export const getMenuListByMenuGroup = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/getMenuListByMenuGroup`, Qs.stringify(params)).then(res => res.data);
};


//  根据权限关联菜单
export const createMenuRelation = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/menu/createMenuRelation`, Qs.stringify(params)).then(res => res.data);
};


// 用户权限

export const getUserAuthList = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api//user/getUserAuthList`, Qs.stringify(params)).then(res => res.data);
};


// 用户绑定菜单权限
export const addUserAuth = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/addUserAuth`, Qs.stringify(params)).then(res => res.data);
};


// 用户解绑菜单权限
export const deleteUserAuth = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/user/deleteUserAuth`, Qs.stringify(params)).then(res => res.data);
};


// 内容查询列表
export const getContentList = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/getContentList`, Qs.stringify(params)).then(res => res.data);
};
// 根据ID查询文章具体内容
export const getOneContent = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/getOneContent`, Qs.stringify(params)).then(res => res.data);
};

// 内容录入
export const contentInsert = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/contentInsert`, Qs.stringify(params)).then(res => res.data);
};


// 图片上传
export const uploadImg = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/uploadImg`, Qs.stringify(params)).then(res => res.data);
};

// 内容修改
export const contentUpdate = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/contentUpdate`, Qs.stringify(params)).then(res => res.data);
};


// 内容删除
export const contentDelete = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/contentDelete`, Qs.stringify(params)).then(res => res.data);
};
// 内容审核
export const contentExam = params => {
  params["userToken"]=sessionStorage.getItem('userToken')
  return axios.post(`/api/content/contentExam`, Qs.stringify(params)).then(res => res.data);
};



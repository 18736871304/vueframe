import axios from 'axios';
import Qs from "qs";
let base = 'https://insure.meihualife.com'; //添加域名


//登录
export const login = params => {
  return axios.post(`/logon.do`, Qs.stringify(params)).then(res => res.data);
};

// 获取菜单
export const AuthMenuList = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/AuthMenuList.do?userCode=${params.iamsOpr}`, Qs.stringify(params)).then(res => res.data);
};

// 获取省级
export const provinceCombox = params => {
  return axios.post(`/organ/provinceCombox.do`, Qs.stringify(params)).then(res => res.data);
};
// 获取市级
export const cityCombox = params => {
  return axios.post(`/organ/cityCombox.do`, Qs.stringify(params)).then(res => res.data);
};
// 获取区级
export const countyCombox = params => {
  return axios.post(`/organ/countyCombox.do`, Qs.stringify(params)).then(res => res.data);
};
//机构级别  数据字典
export const disComBox = params => {
  return axios.post(`/combox/disComBox.do`, Qs.stringify(params)).then(res => res.data);
};
//机构信息
export const organquery = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/organ/organquery.do`, Qs.stringify(params)).then(res => res.data);
};
//新增机构
export const organinsert = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/organ/organinsert.do`, Qs.stringify(params)).then(res => res.data);
};

//修改机构

export const organUpdate = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/organ/organUpdate.do`, Qs.stringify(params)).then(res => res.data);
};


//获取省公司
export const get02Org = params => {
  return axios.post(`/policy/get02Org.do`, Qs.stringify(params)).then(res => res.data);
};

//获取分公司
export const get03Org = params => {
  return axios.post(`/policy/get03Org.do`, Qs.stringify(params)).then(res => res.data);
};
//获取营业部
export const get04Org = params => {
  return axios.post(`/policy/get04Org.do`, Qs.stringify(params)).then(res => res.data);
};
//获取事业部
export const getTeamListByOrgan = params => {
  return axios.post(`/team/getTeamListByOrgan.do`, Qs.stringify(params)).then(res => res.data);
};

//获取团队
export const getTeamListByUpTeamId = params => {
  return axios.post(`/team/getTeamListByUpTeamId.do`, Qs.stringify(params)).then(res => res.data);
};
// //获取组
// export const getTeamListByUpTeamId= params => {
//   return axios.post(`/team/getTeamListByUpTeamId.do`, Qs.stringify(params)).then(res => res.data);
// };

// 获取团队数据
export const getTeamList = params => {
  return axios.post(`/team/getTeamList.do`, Qs.stringify(params)).then(res => res.data);
};


// 获取员工信息
export const getUserList = params => {
  return axios.post(`/authority/getUserList.do`, Qs.stringify(params)).then(res => res.data);
};


// 所属机构
export const organdlgquery = params => {
  return axios.post(`/organ/organdlgquery.do`, Qs.stringify(params)).then(res => res.data);
};


//获取保险产品
export const getRiskdefineList20 = params => {
  return axios.post(`/supplier/getRiskdefineList20.do`, Qs.stringify(params)).then(res => res.data);
};
//获取所有的菜单组权限
export const getMenuGrpList = params => {
  return axios.post(`/authority/getMenuGrpList.do`, Qs.stringify(params)).then(res => res.data);
};


//获取所有的菜单
export const getMenuList = params => {
  return axios.post(`/authority/getMenuList.do`, Qs.stringify(params)).then(res => res.data);
};
//获取所有的员工权限
export const getUserAuthorList = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/authority/getUserAuthorList.do`, Qs.stringify(params)).then(res => res.data);
};


// 
export const getUserList20 = params => {
  params.iamsOpr = "D012"
  params.iamsOprName = "魏钦录"
  params.logonOrgan = 100000000
  params.iamsOprOrgan = 100000000
  params.iamsOrganGrade = "01"
  return axios.post(`/authority/getUserList20.do`, Qs.stringify(params)).then(res => res.data);
};


//修改密码
export const psdUpdate = params => {
  return axios.post(`/authority/psdUpdate.do`, Qs.stringify(params)).then(res => res.data);
};
//解锁人员列表
export const getUserLockList = params => {
  return axios.post(`/userMan/getUserLockList.do`, Qs.stringify(params)).then(res => res.data);
};

//解锁
export const userUnLock = params => {
  return axios.post(`/userMan/userUnLock.do`, Qs.stringify(params)).then(res => res.data);
};


// 获取保险公司列表
export const getInsorganList = params => {
  return axios.post(`/supplier/getInsorganList.do`, Qs.stringify(params)).then(res => res.data);
};

//保险产品管理
export const getRiskdefineList = params => {
  return axios.post(`/supplier/getRiskdefineList.do`, Qs.stringify(params)).then(res => res.data);
};
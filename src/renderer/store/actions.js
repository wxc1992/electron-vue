import axios from 'axios';
import qs from 'qs';
import { promises } from 'fs';
import updataPWS from './modules/updataPWS';
import documentmanagement from './modules/documentmanagement';

import portManagement from './modules/portManagement';
import dataCenter from './modules/data-center';
import dataCenter2 from './modules/data-center2';
import dataCenterframe from './modules/data-center2-frame';
import fundmanage from './modules/fundmanage';
import creditRating from './modules/credit-rating';
import fundprogram from './modules/fundprogram';
import NewMars from './modules/newMars';
import assetallocation from './modules/assetallocation';
import invoice from './modules/invoice';


const Authorization = localStorage.getItem('token');
export default {
  ...invoice,
  ...assetallocation,
  ...updataPWS,
  ...portManagement,
  ...dataCenter,
  ...fundmanage,
  ...documentmanagement,
  ...creditRating,
  ...fundprogram,
  ...dataCenter2,
  ...dataCenterframe,
  ...NewMars,
  allcheck(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/check', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getOverview(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/investment/fund/overview', { params: reqParam }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getSubtotal(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/investment/fund/assets/subtotal', { params: reqParam }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getBondlist(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/bond/list', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  importFile(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/investment/fund/import', param).then(result => resolve(result.data)).catch(error => reject(error));
    });
  },
  getPreogress(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/investment/fund/progress', qs.stringify(param)).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  submitLogin(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.post('/sso/user/login', reqParam, { headers: { 'Content-Type': 'application/json' } }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理部门树查询
  getDepartmentList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/sso/dept/getDeptTreeByCode', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
    });
  },
  getgetDeptByCodetList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/sso/dept/getDeptByCode', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
    });
  },
  // 通过部门Code查询角色名称列表
  rolegetRoleNames(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/sso/role/getRoleNames', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
    });
  },
  // 系统管理-角色管理搜索
  getRolePageByObj(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.post('/sso/role/getRolePageByObj', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理-通过deptID获取UserName列表
  getUserNameByDeptId(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.post('/sso/user/getUserNameByDeptId', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理-批量更新用户角色
  updateBatchUserRole(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.post('/sso/user/updateBatchUserRole', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理-根据userId获取resIds
  getResByUserId(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.get('/sso/resource/getResByUserId', { params: reqParam }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理-根据用户名查询用户信息
  getUserByName(context, options) {
    const reqParam = options;
    return new Promise((resolve, reject) => {
      axios.get('/sso/user/getUserByName', { params: reqParam }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理-角色管理数据获取
  getAllRoles(context) {
    return new Promise((resolve, reject) => {
      // let reqParam = {
      //   Authorization:Authorization
      // }
      axios.post('/sso/role/getAllRole').then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getRoleList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/sso/role/getRolePageByObj', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 资产分布的数据
  getZichanList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/bond/asset/distribution', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getZichanAbsList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/abs/asset/distribution', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取菜单列表的数据
  getMenuList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/sso/resource/getResourceTree', qs.stringify(reqParam)).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getMenuListrole(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/resource/getResourceByDeptCode', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getMenuListByuserid(context, param) {
    return new Promise((resolve, reject) => {
      axios.get(`/sso/resource/getResourceByUserId?userId=${param}`).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getTopLeftMenu(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/sso/resource/getResourceTreeByCodeArray', qs.stringify(reqParam)).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getRoleRight(context, param) { // 获角色对应的权限
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get(`/sso/resource/getResourceByRoleId?roleId=${param}`).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取用户数据
  getUserList(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/sso/user/getUserPageByObj', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取每个用户对应的权限
  getUserRight(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/resource/getResourceByParam', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--查询用户数据权限列表
  queryDataPermissionList(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/queryDataPermissionList', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--根据主体权限id查询自选列表fenye
  Optionalpage(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/dataPermission/Optional/page', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--根据主体权限id查询自选列表
  Optionallist(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/dataPermission/Optional/list', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--查询我的自选
  queryOptionalList(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/queryOptionalList', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--获取下拉枚举列表
  querygetTypeEnum(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/getTypeEnum', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--新增用户数据权限
  dataPermissionadd(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/sso/dataPermission/add', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--根据权限ID删除
  deleteDataPermission(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/deleteDataPermission', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--有分页
  queryDataPermissionSubjectList(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/queryDataPermissionSubjectList', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--不分页
  queryDataPermissionSubjectListNoPage(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/queryDataPermissionSubjectListNoPage', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--查询主体
  querySubjectList(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/querySubjectList', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--根据用户姓名，机构名称模糊查询
  dataPermissionqueryUser(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/dataPermission/queryUser', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 系统管理--数据管理--修改权限主体
  dataPermissionupdate(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/sso/dataPermission/update', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },


  // 账户管理---获取所有账户的权限
  getAcounterList(context, params) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/userAccount/getUserAccountPageByAccountName', params, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 组合账户管理-
  getgroupAcountList(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/getUserAccountPageByAccountName', params).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getgroupCountUser(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/combination/getUserAccountByParam', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  setgroupAcountByuser(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/userProtfolio/allocateAccountForUser', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 根据用户角色查询用户
  getCountUser(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/userAccount/getUserAccountByParam', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 提交权限
  setAcountByuser(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/userAccount/allocateAccountForUser', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // ias 成交记录数据的获取 --债券数据
  getZhaiquanList(context, params) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/bond/transaction-record/page', params, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 债券成交记录提交
  addZQnote(context, params) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...params,
      };
      axios.post('/fund/bond/transaction-record/create', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 修改债券成交记录
  updateZQ(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/bond/transaction-record/update', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 债券成交记录导出
  exportZQ(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/bond/transaction-record/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取总览的数据
  getZQzonglan(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/transaction-record/page', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  zqListByid(context, param) { // 通过id查询债券信息
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/bond/transaction-record/detail', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  fundListByid(context, param) { // 通过id查询基金信息
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/fund/transaction-record/detail', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  stockListByid(context, param) { // 通过id查询股票信息
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/stock/transaction-record/detail', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getStocklist(context, param) { // 查询股票信息
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/stock/list', qs.stringify(reqParam)).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportStock(context, param) { // 导出股票列表
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/bond/export', reqParam, { responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportFund(context, param) { // 导出基金列表
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/fundInformation/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getFundlist(context, param) { // 查询基金信息
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/fundInformation/list', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getDepostdata(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/depositInformation/list', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportDepost(context, param) { // 导出存款列表
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/depositInformation/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取成交记录股票的数据
  getcjStock(context, params) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/stock/transaction-record/page', params, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportCjstock(context, param) { // 导出成交记录 股票
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/stock/transaction-record/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  updateStock(context, param) { // 更新成交记录股票
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/stock/transaction-record/update', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addStock(context, param) { // 新增股票成交记录
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/stock/transaction-record/create', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getcjDepost(context, params) { // 获取成交记录存款的数据
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/deposit/transaction-record/page', params, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportCjdepost(context, param) { // 导出成交记录 存款
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/deposit/transaction-record/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  updateDepost(context, param) { // 更新成交记录股票
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/deposit/transaction-record/update', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addDepost(context, param) { // 新增存款成交记录
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/deposit/transaction-record/create', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询存款记录
  seacherDepo(context, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/deposit/transaction-record/detail', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取成交记录基金数据
  getCjfund(context, params) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/fund/transaction-record/page', params, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 基金更新
  updateFund(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/fund/transaction-record/update', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 添加基金
  addCjfund(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/fund/transaction-record/create', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportCjfund(context, param) { // 导出成交记录 基金
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/fund/transaction-record/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportzichan(context, param) { // 导出资产分布
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/bond/asset/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportCZl(context, param) { // 持仓 --总览--导出
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/investment/fund/overview/export', { params: reqParam, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取账户日期
  getDatelist(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.get('/fund/investment/fund/date-list', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 根据用户的id查询账户
  getCounter(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.get('/fund/account/getAccountByUserId', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getCounterPermission(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.get('/fund/userAccount/getUserAccountByUserIdPermission', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取组合指标的数据
  getGroupList(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/group/indexList', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取组合对比基金的数据
  groupIndexList(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/group/fundIndexList', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  /**
   * 信评模块
   */
  // 获取列数据
  getColumns(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsms/credit/getColumn', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取组合指标 --基准指数设置
  getGroupbase(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/group/fundList', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取板块和报告期
  getFilters(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsms/mapping/getMapping', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取组合指标的数据
  getPictureList(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/group/pictureList', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取信评主体数据
  getCreditData(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.get('/dsms/modCreditSubject/queryModCredSubList', { params: reqParam }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 信评主体查询
  creditSearch(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsms/modCreditSubject/query', reqParam).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 流动性管理 --现金流--表数据获取
  getFlowTable(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/fluidity/list', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 流动性管理 --现金流--图数据获取
  getFlowChart(contex, param) {
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/fluidity/chart', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportFlow(context, param) { // 导出流动性管理数据
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/fluidity/export', reqParam, { responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  //  枚举值
  getSelect(context) { // 枚举值
    return new Promise((resolve, reject) => {
      axios.get('/fund/enums/getEnums').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询所有点评状态
  queryCreditComment(contex, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubjectLevel/query', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 新增点评
  submitComment(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubjectLevel/add', param.payload, param.config).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 点评审核操作
  resolveComment(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubjectLevel/updateStatus', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // base64文件上传
  uploadBase64(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/file/uploadBase64', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 准入配置
  accessConfig(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditWhite/update', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询配置信息
  getAccessConfig(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditWhite/queryByModuleIdReportDate', param).then(result => resolve(result.data)).catch(error => reject(error));
    });
  },
  // 保存新建用户
  savecounter(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/account/add', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 根据账户id查询账户的信息
  findCountDetail(contex, param) {
    return new Promise((resolve, reject) => {
      axios.get(`/fund/account/getAccountById?accountId=${param}`).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 主体拉取wind数据
  getWindData(contex, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/py/getSubjectInfo', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 保存主体数据
  saveCreditData(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubject/saveSubject', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 删除主体数据
  delCreditData(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubject/delSub', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 更新主体状态
  auditCreditData(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/dsms/modCreditSubject/updateSubjectStatus', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 模块对比
  compareCreditData(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/dsms/modCreditSubject/compareSubject', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 下载pdf
  downloadPdf(context, param) {
    return new Promise((resolve, reject) => {
      axios(param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 更新主体数据
  updateCreditData(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubject/doRecalculation', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 删除账户
  delAccount(contex, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/account/del', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 更新账户编辑
  updateAcount(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/account/update', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询情景分析列表
  sceneAnalysisList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/sceneAnalysis/list', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 导出情景分析列表
  exportSceneAnalys(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/sceneAnalysis/export', param, { responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 导出var
  exportVARList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bond/exportVARList', param, { responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询var列表
  queryVARList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bond/queryVARList', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓卷面表
  listPosition(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/holdposition/listPosition', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 导出表----1.持仓卷面2.dv013.久期
  holdpositionExport(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/holdposition/export', param, { responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓卷面表DV01
  listDV(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/dv/table/list', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 导出持仓卷面表DV01
  exportDV(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/dv/export', { params: param, responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓卷面表久期
  listDuration(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/holdposition/listDuration', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓劵面日明细DV01
  listDVDayList(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/dv/day/list', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓劵面日明细
  listDayDetailPosition(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/holdposition/listDayDetailPosition', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓卷面表DV01走势图
  listDVCharts(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/dv/chart', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓劵面趋势图
  listPositionChart(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/holdposition/listPositionChart', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getAbs(context, param) { // 获取abs数据
    return new Promise((resolve, reject) => {
      axios.post('/fund/abs/list', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exportabslist(context, param) { // 导出股票列表
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.post('/fund/abs/export', reqParam, { responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 业绩归因-业绩分析
  performanceAnalysis(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/analysis/listData', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 总览，回购列表
  buyBackList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/buyBackInformation/list', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 数据管理upload后台处理
  valuationTableFile(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/valuationTableFile/import', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询估值表导入日志分页信息
  valuationTableFileList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/valuationTableFile/list', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取估值表和持仓表数据
  getDifference(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/valuationTableRecord/getDifference', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 导出获取估值表和持仓表数据
  getDifferenceExport(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/valuationTableRecord/export', { params: param, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取估值表和持仓表数据---数据总览
  getDataView(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('api/fund/accountAssetsSubtotalRecord/getDataView', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取估值表和持仓表数据---导出数据总览
  getDataViewExport(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/accountAssetsSubtotalRecord/export', { params: param, responseType: 'arraybuffer' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 查询估值表导入日志分页信息
  getOthersData(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/otherInformation/list', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 回购导出
  exportBuyBack(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/buyBackInformation/export', param.data, param.config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 其他导出
  exportOthers(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/otherInformation/export', { params: param.data, ...param.config }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 业绩分布
  performanceDistribution(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/distribution/listData', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 根据token获取用户信息
  getUserInfoByToken(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/user/getUserByToken', { params: param.data, ...param.config }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 机构管理
  getInstitution(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/fund/bondCode/page', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 机构管理 下拉数据
  pullDown(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondCode/pullFromWind', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addZhaiquan(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondCode/insert', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  updateZhaiquan(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondCode/update', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  deleteZhaiquan(contex, param) {
    return new Promise((resolve, reject) => {
      axios.get(`/fund/bondCode/delete?id=${param}`).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // abs下载列表接口
  uploadDownloadList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondFile/list', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // abs上传接口
  uploadDownloadSave(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondFile/save', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取密钥
  getPwdKey(context) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/user/getAseKey').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 文件下载
  downloadFileThroughUrl(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/file/download/file', param.param, param.config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 删除文件
  deleteFileById(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/fund/bondFile/delete', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 退出登录
  logout(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/sso/logout', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 用户管理页面修改密码
  updatePWD(contex, param) {
    return new Promise((resolve, reject) => {
      axios.post('/sso/pwd/updatePassword', param, { headers: { 'Content-Type': 'application/json' } }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取省份信息
  getProvince(contex, param = {}) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/region/listAllProvince', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取城市信息
  getCityByProvince(contex, param = {}) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/region/listCityByProvince', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 生成报表
  productBaobiao(contex, param) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios.post('/fund/report/export', param, { responseType: 'arraybuffer' }, config).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 组合管理 下单
  makeOrder(contex, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/stockOrder/declarationForm', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getHistoryData(contex, param) { // 获取历史净值的数据
    return new Promise((resolve, reject) => {
      axios.post('/fund/achive/historyProfit', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  gethistoryTrend(contex, param) { // 获取组合单位净值
    return new Promise((resolve, reject) => {
      axios.post('/fund/achive/historyTrend', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  gethistoryChange(contex, param) { // 历史规模变动图
    return new Promise((resolve, reject) => {
      axios.post('/fund/achive/scaleChangeList', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getBondhold(context, param) { // 债券市值与杠杆率变化图
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/report/rate/position', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getzhaiquanhold(context, param) { // 历史收益率与债券仓位变化图
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/report/market-value/leverage', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getRangeassets(context, param) { // 区间资产配置时序
    return new Promise((resolve, reject) => {
      const reqParam = {
        ...param,
      };
      axios.get('/fund/report/asset/allocation', { params: reqParam }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取债券主体数据
  getBondData(context, param) {
    return axios.post('/dsms/bondInfo/listByPage', param).then(result => result.data);
  },
  // 获取债券详情数据
  getBondDetails(context, param) {
    return axios.get('/dsms/bondInfo/getById', { params: param }).then(result => result.data);
  },
  // 获取债券信评输出
  getBondCreditOutput(context, param) {
    return axios.post('/dsms/modCreditSubject/queryById', param).then(result => result.data);
  },
  // 获取债券点评列表
  getBondLevelList(context, param) {
    return axios.get('/dsms/bondRate/queryByBondId', { params: param }).then(result => result.data);
  },
  // 更新债券点评
  submitBondComment(context, param) {
    return axios.post('/dsms/bondRate/saveOrUpdate', param.payload, param.config).then(result => result.data);
  },
  getmodCreditSubjectLevel(context, param) { // 新增点评获取指标
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubjectLevel/getIndexValue', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  modCreditSubjectLevel(context, param) { // 新增点评获取指标
    return new Promise((resolve, reject) => {
      axios.post('/dsms/modCreditSubjectLevel/trial', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  queryOaUserInfo(context, params) {
    return axios.get('/sso/oa/user/redirect', { params }).then(result => result.data);
  },
  // 债券导出
  bondExport(context, params) {
    return axios.post('/dsms/bondInfo/export', params, { responseType: 'arraybuffer' }).then(result => result.data);
  },
  // 估值表--获取用户的订阅列表
  getguzhiSubList(context, params) {
    return axios.post('/fund/subTableAccount/getSubList', params).then(result => result.data);
  },
  // 估值表--删除订阅
  guzhidelete(context, params) {
    return axios.get('/fund/subTableAccount/delete', { params }).then(result => result.data);
  },
  // 估值表--新增订阅
  getguzhiadd(context, params) {
    return axios.post('/fund/subTableAccount/add', params).then(result => result.data);
  },
  // 根据估值表名称模糊搜索估值表
  selectByTableName(context, params) {
    return axios.get('/fund/subTable/selectByTableName', { params }).then(result => result.data);
  },
  // 估值表--新增订阅
  getTextSum(context, params) {
    return axios.post('/tebonai/tebonAiOperation/getTextSum', params).then(result => result.data);
  },
};


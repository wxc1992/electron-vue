import axios from 'axios';
import { promises } from 'fs';
export default {
  getFiltersNew(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsmssec/mapping/getMapping', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getmodCreditSubjectNewcomment(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsmssec/modCreditSubject/queryNew', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getmodCreditSubjectNew(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsmssec/modCreditSubject/query', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getmodCreditSubjectNewMARS(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      const reqParam = {
        ...param,
      };
      axios.post('/dsmssec/modCreditSubject/queryMARS', reqParam).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getlistByCompNameLike(context, params) {
    return axios.get('/dsmssec/modCreditSubject/listByCompNameLike', { params }).then(result => result);
  },
  getMainColumnNew(context, param) {
    return new Promise((resolve, reject) => { // 搜索栏目
      axios.post('/dsmssec/credit/getColumn', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getNewrosterList(context, params) {
    return axios.get('/dsmssec/roster/select', { params }).then(result => result);
  },
  getIndexValueNew(context, param) { // 新增点评获取指标
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/getIndexValue', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addNewCreatingComment(context, param) { // 新增点评
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/add', param.payload, param.config).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getlevelReviewer() { // 查询点评审核人员
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/reviewer/levelReviewer').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getHistoryComment(contex, param) { // 点评历史纪录
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/listByCompName', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 点评审核操作 --
  resolveCommentNew(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/updateStatus', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getRosterList(context, params) { // 获取准入白名单的列表
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/roster/select', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getRosterTable(context, params) { // 获取准入白名单的列表---表格展示
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/roster/list', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addRoster(context, params) { // 添加准入白名单
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/roster/add', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getfiveTableSelect(context, params) { // 获取财务数据的下拉
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/fiveTable/select', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getFiveTableCompList(context, param) { // 获取财务数据的公司列表
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/fiveTable/compList', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getQueryfinal(context, params) { // 获取财务数据的公司详情
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/fiveTable/queryFinal', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 点击主体弹出主体信息和点评
  getMainInfo(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/modCreditSubject/getSubjectDetail', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getMainComment(context, param) { // 点评
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/query', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getMarsHome(context) { // 获取mars首页的数据
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/applyLevel/list').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getMarsLevel(context) { // 获取mars评级数据
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/applyLevel/levelDistribution').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  applyDataComment(context, params) { // 获取mars首页的数据
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/applyLevel/checked', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  newUpdateData(context, param) { // 新的信评数据管理更新
    return axios.post('/dsmssec/fiveTable/pull', param).then(result => result);
  },
  getdsmsLoglistupdate(context, param) {
    return axios.post('/dsmssec/log/listUpdate', param).then(result => result);
  },
  getdsmsLoglist(context, param) {
    return axios.post('/dsmssec/log/list', param).then(result => result);
  },
  getmodCreditSubject(context, params) {
    return axios.get('/dsmssec/modCreditSubject/listByCompNameLike', { params }).then(result => result);
  },
  approvalSubject(context, param) {
    return axios.post('/dsmssec/log/approval', param).then(result => result);
  },
  getFivesheetData(context, params) {
    return axios.get('/dsmssec/fiveTable/query', { params }).then(result => result);
  },
  companyList(context, param) { // 数据管理--审核评级 --列表
    return axios.post('/dsmssec/company/list', param).then(result => result);
  },
  approvalcompany(context, param) {
    return axios.post('/dsmssec/company/auth', param).then(result => result);
  },
  // 数据管理--主体维护 --公司列表的数据获取/dsmssec/companyBase/list
  getNewsubjectMain(context, param) {
    return axios.post('/dsmssec/companyBase/list', param).then(result => result);
  },
  // 数据管理--主体维护 --新增或者修改
  updateNewsubjectMain(context, param) {
    return axios.post('/dsmssec/companyBase/addOrUpdate', param).then(result => result);
  },
  // 数据管理--主体维护 --新增或者修改
  deleteNewsubjectMain(context, params) {
    return axios.get('/dsmssec/companyBase/delete', { params }).then(result => result);
  },
  // 获取深度点评的gongsi
  getDeepMaping(context, param) {
    return axios.post('/dsmssec/dataPermissionCompany/query', param).then(result => result);
  },
  // 获取深度点评的行业
  getDeepSubject(context, param) {
    return axios.post('/dsmssec/mapping/getMappingNew', param).then(result => result);
  },
  // 获取省份信息
  getProvinceNew(contex, param = {}) {
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/region/listAllProvince', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 获取城市信息
  getCityByProvinceNew(contex, param = {}) {
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/region/listCityByProvince', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 根据城市获取区县
  getDistrictByCityNew(context, param) {
    return axios.post('/dsmssec/debtDistrict/listDistrict', param).then(result => result.data);
  },
  // 获取各省份债务数据
  requestProvinceDebtsNew(context, params) {
    return axios.get('/dsmssec/debtProvince/list', { params }).then(result => result.data);
  },
  requestCityDebtsNew(context, params) {
    return axios.get('/dsmssec/debtCity/getByProvince', { params }).then(result => result.data);
  },
  // request all province debts
  requestCountryDebtsNew(context, params) {
    return axios.get('/dsmssec/debtProvince/list', { params }).then(result => result.data);
  },
  // 区县数据
  requestDistrictDebtNew(context, param) {
    return axios.post('/dsmssec/debtDistrict/listByCity', param).then(result => result.data);
  },
  saveCreditDataNew(context, param) { // 保存更新的数据
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubject/saveSubject', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  updateMapDsitricValueNew(context, param) { // 更新地图的value
    return axios.post('/dsmssec/debtDistrict/update', param).then(result => result);
  },
  updateMapValueNew(context, param) { // 更新地图的value
    return axios.post('/dsmssec/debtProvince/update', param).then(result => result);
  },
  updateMapCityValueNew(context, param) { // 更新地图的value
    return axios.post('/dsmssec/debtCity/update', param).then(result => result);
  },
  exportDeepComment(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/dataPermissionCompany/exportCompany', param, { responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getApplyLevel(context, param) { // 申请点评的列表
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/applyLevel/listAll', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  updateApplyLevel(context, param) { // 申请点评的列表 --更新
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/applyLevel/update', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  addApplyLevel(context, param) { // 申请点评的列表 --更新
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/applyLevel/addApplyLevel', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 申请点评赋权限
  addSubjectPermission(context, param) { // 申请点评的列表 --更新
    return new Promise((resolve, reject) => {
      axios.post('/sso/dataPermission/addSubjectPermission', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  synchronousComp(context, params) { // 同步主体维护
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/companyBase/synchro', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  selectLikeBondCode(context, params) { // marshome  添加主体
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/bondInfo/like/Bond-code', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  exporMarspinf(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubject/exportMARS', param, { responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getauditnum(context) { // marshome  添加主体
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/modCreditSubject/pendingReviewNum').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getNewmarsHomechart(context) { // 查询mars主页的统计表
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/census/chart').then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  queryMySubjectLevel(context, param) { // 我的点评 --我启动的
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/queryMySubjectLevel', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  queryMyReviewSubjectLevel(context, param) { // 我的点评 --待审核的已审核的
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubjectLevel/queryMyReviewSubjectLevel', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  querysubjectLevelDetail(context, params) { // 我的点评 --待审核的已审核的
    return new Promise((resolve, reject) => {
      axios.get('/dsmssec/modCreditSubjectLevel/subjectLevelDetail', { params }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  queryModCredCalDetail(context, param) { // 我的点评 --待审核的已审核的
    return new Promise((resolve, reject) => {
      axios.post('/dsmssec/modCreditSubject/queryModCredCalDetail', param).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

import axios from 'axios';
export default{
  getMenuTree(context, param) {
    return axios.post('/datacenter/V2/menu/list', param).then(result => result.data);
  },
  getMainlist(context, param) { // 点击左边菜单触发的接口
    return axios.post('/datacenter/V2/indicators/add', param).then(result => result);
  },
  getTablelist(context) { // 一开始进来的时候触发的接口
    return axios.post('/datacenter/V2/indicators/list').then(result => result);
  },
  getRightlist(context, param) {
    return axios.post('/datacenter/V2/indicators/tabulation', param).then(result => result);
  },
  getChartYearData(context, param) {
    return axios.post('/datacenter/V2/indicators/chart2', param).then(result => result);
  },
  getTargetlist(context, param) {
    return axios.post('/datacenter/V2/favorites/add', param).then(result => result);
  },
  AddTargetlist(context, param) {
    return axios.post('/datacenter/V2/favorites/addIndex', param).then(result => result);
  },
  getfavoritesList(context, param) {
    return axios.get('/datacenter/V2/favorites/list', { params: param }).then(result => result);
  },
  getfavoritesFileList(context) {
    return axios.post('/datacenter/V2/favorites/favoritesList').then(result => result);
  },
  deleteFileList(context, param) {
    return axios.get('/datacenter/V2/favorites/delete', { params: param }).then(result => result);
  },
  deleteIndex(context, param) {
    return axios.get('/datacenter/V2/favorites/deleteIndex', { params: param }).then(result => result);
  },
  getNyearData(context, param) {
    return axios.post('/datacenter/logistics/list', param).then(result => result);
  },
  calculatorData(context, param) {
    return axios.post('/datacenter/recentBrowse/calculator', param).then(result => result);
  },
  updatefavorites(context, param) {
    return axios.post('/datacenter/V2/favorites/update', param).then(result => result);
  },
  exportDatacenter2(context, param) {
    return axios.post('/datacenter/V2/indicators/exportTable', param, { responseType: 'blob' }).then(result => result);
  },
  getChartData(context, param) {
    return axios.post('/datacenter/V2/indicators/listData', param).then(result => result);
  },

  getmedicineTreedata(context, params) { // 行业分类的数据菜单
    return axios.get('/datacenter/industryCategory/treeData', { params }).then(result => result);
  },
  getindustryAlldata(context, param) {
    return axios.post('/datacenter/companyIndex/pharmaceutical/analysis', param).then(result => result);
  },
  // 这里是自建数据库
  // 查询
  subjectInfoquery(context, param) {
    return axios.post('/datacenter/subjectInfo/query', param).then(result => result.data);
  },
  // 新增
  subjectInfoadd(context, param) {
    return axios.post('/datacenter/subjectInfo/add', param).then(result => result.data);
  },
  // 修改
  subjectInfoupdate(context, param) {
    return axios.post('/datacenter/subjectInfo/update', param).then(result => result.data);
  },
  // 删除
  subjectInfodelete(context, param) {
    return axios.post('/datacenter/subjectInfo/delete', param).then(result => result.data);
  },
  // 这里是票据的
  // 查询
  drawerquery(context, param) {
    return axios.post('/datacenter/drawer/query', param).then(result => result.data);
  },
  // 新增
  draweradd(context, param) {
    return axios.post('/datacenter/drawer/add', param).then(result => result.data);
  },
  // 删除
  drawerdelete(context, param) {
    return axios.post('/datacenter/drawer/delete', param).then(result => result.data);
  },
  // 修改
  drawerupdate(context, param) {
    return axios.post('/datacenter/drawer/update', param).then(result => result.data);
  },
  // 前十大出票人地域分布
  queryAreaDistribution(context, params) {
    return axios.get('/datacenter/drawer/queryAreaDistribution', { params }).then(result => result.data);
  },
  // 前十大出票人行业分布
  queryModuleDistribution(context, params) {
    return axios.get('/datacenter/drawer/queryModuleDistribution', { params }).then(result => result.data);
  },
  // 托管票据查询
  queryBill(context, param) {
    return axios.post('/datacenter/trusteeBill/queryBill', param).then(result => result.data);
  },
  // 查询票据交易流水
  billTradingFlowDetail(context, param) {
    return axios.post('/datacenter/billTradingFlow/billTradingFlowDetail', param).then(result => result.data);
  },
  // 查询票据交易流水导入
  billTradingFlowimportExcel(context, param) {
    return axios.post('/datacenter/billTradingFlow/importExcel', param).then(result => result.data);
  },
  // 托管票据查询
  billimportExcel(context, param) {
    return axios.post('/datacenter/trusteeBill/importExcel', param).then(result => result.data);
  },
  // 承兑信用新增
  acceptanceCreditSubjectadd(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/add', param).then(result => result.data);
  },
  // 承兑信用删除
  acceptanceCreditSubjectdelete(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/delete', param).then(result => result.data);
  },
  // 承兑信用查询
  acceptanceCreditSubjectquery(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/query', param).then(result => result.data);
  },
  // 承兑信用修改
  acceptanceCreditSubjectupdate(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/update', param).then(result => result.data);
  },
  // 查询行业集合
  moduleList(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/moduleList', param).then(result => result.data);
  },
  // 查询信用主体集合
  subjectNameList(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/subjectNameList', param).then(result => result.data);
  },
  // 查询信用主体类型集合
  subjectTypeList(context, param) {
    return axios.post('/datacenter/acceptanceCreditSubject/subjectTypeList', param).then(result => result.data);
  },

  getNewCenterlist(context, param) { // 数据中心数据管理 列表
    return new Promise((resolve, reject) => {
      axios.post('/datacenter/industryLog/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getNewCenterIndusrtylist(context) { // 数据中心数据管理--hangye 列表
    return new Promise((resolve, reject) => {
      axios.get('/datacenter/industry/list').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getNewdataCenterMd(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/datacenter/industryLog/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 理财数据
  getfinancialData(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/datacenter/financialData/query', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },

};

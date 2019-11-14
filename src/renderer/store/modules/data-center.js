import axios from 'axios';
export default {
  // 获取每日行情数据
  requestDailyMarket(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/exchange/conBond/listByPage', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取行情汇总数据
  requestMarketSummary(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/exchange/conBond/listBySum', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取表格图表数据
  requestTableAndChart(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/exchange/conBond/fourPieCharts', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取最新交易日
  requestLatestTradeDate() {
    return new Promise((resolve, reject) => {
      axios.get('/fund/standardHolidayArrange/getLatestTradingDay').then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取折线图数据
  requestLineChart(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/spider/conBond/premium', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取volatility cone图表数据
  requestVolatilityConeData(context, params) {
    return axios.get('/option/volatility/close_chart', { params }).then(result => result.data);
  },
  // 根据截止时间获取起始时间
  getStartDateByEndDate(context, params) {
    return axios.get('/option/histvol/getStartDate', { params }).then(result => result.data);
  },
  // 查询histvol
  queryHistvol(context, params) {
    return axios.get('/option/histvol/list', { params }).then(result => result.data);
  },
  // 计算histvol
  caculateHistvol(context, params) {
    return axios.get('/option/histvol/calculation', { params }).then(result => result.data);
  },
  // 查询histvol图表
  queryHistvolChart(context, params) {
    return axios.get('/option/histvol/chart', { params }).then(result => result.data);
  },
  // 获取行业数据库菜单
  getIndustryMenu(context, params) {
    return axios.post('/reptile/logisticsInfo/selectFirstMenuList', params).then(result => result.data);
  },
  // 获取行业信息
  getIndustryDetail(context, params) {
    return axios.post('/reptile/logisticsInfo/page', params).then(result => result.data);
  },
  // 获取abs产品列表
  getProductlist(context, params) {
    return axios.post('/abs/cnabs/getProductPage', params).then(result => result);
  },
  // 获取abs产品列表-----导出
  cnabsExport(context, params) {
    return axios.post('/abs/cnabs/export', { params }, { responseType: 'blob' }).then(result => result);
  },
  // 获取abs产品列表详情
  getDocListByDealId(context, params) {
    return axios.get('/abs/cnabs/getDocListByDealId', { params }).then(result => result);
  },
  // 获取abs数据管理产品
  getcnabsProducts(context, params) {
    return axios.get('/abs/cnabs/getProducts', { params }).then(result => result);
  },
  // 获取abs数据管理产品文档
  getcnabsDocs(context, params) {
    return axios.get('/abs/cnabs/getDocs', { params }).then(result => result);
  },
  // 获取abs数据管理上交所
  getinsertFromSH(context, params) {
    return axios.get('/abs/bond/insertFromSH', { params }).then(result => result);
  },
  // 获取abs数据管理深交所
  getinsertFromSZ(context, params) {
    return axios.get('/abs/bond/insertFromSZ', { params }).then(result => result);
  },
  getPageByRecord(context, params) {
    return axios.post('/abs/absCrawlLog/getPageByRecord', params).then(result => result);
  },
  // abs行业数据库----查询接口
  layeredList(context, params) {
    return axios.post('/abs/layered/list', params).then(result => result.data);
  },
  clearabsData(context) {
    return axios.get('/abs/layered/deleteLayeredInfo').then(result => result);
  },
  // abs行业数据库----查获取下拉列表数据
  layeredselectList(context, params) {
    return axios.get('/abs/layered/selectList', { params }).then(result => result.data);
  },
  // abs行业数据库----abs数据新增或修改
  layeredaddOrUpdate(context, params) {
    return axios.post('/abs/layered/addOrUpdate', params).then(result => result.data);
  },
  // abs行业数据库----abs数据导入
  layereimport(context, params) {
    return axios.post('/abs/layered/import', params).then(result => result.data);
  },
  // abs行业数据库----删除详细表
  deleteLayeredDetail(context, params) {
    return axios.get('/abs/layered/deleteLayeredDetail', { params }).then(result => result.data);
  },
  // abs行业数据库----删除主表（最外层大表）
  deleteLayered(context, params) {
    return axios.get('/abs/layered/deleteLayered', { params }).then(result => result.data);
  },
  // abs行业数据库----获取详情数据
  layeredinfo(context, params) {
    return axios.get('/abs/layered/info', { params }).then(result => result.data);
  },
  // abs行业数据库----导出数据
  layeredexport(context, params) {
    return axios.get('/abs/layered/newExport', { params, responseType: 'arraybuffer' }).then(result => result);
  },
  // abs行业数据库----导出数据
  bondExportone(context, params) {
    return axios.post('/abs/bond/export', { params }, { responseType: 'blob' }).then(result => result);
  },
  // 物流脑图
  selectBrainMappingSurface(context, params) {
    return axios.post('/reptile/brainMapping/selectBrainMappingList', params).then(result => result.data);
  },
  // 物流脑图------表
  selectBrainMappingPage(context, params) {
    return axios.post('/reptile/brainMapping/selectBrainMappingPage', params).then(result => result.data);
  },
  // 物流脑图------表-----导出
  reptileexcel(context, params) {
    return axios.get('/reptile/excel', { params, responseType: 'blob' }).then(result => result);
  },
  // 物流脑图---下拉
  selectSecondTypeListe(context, params) {
    return axios.post('/reptile/brainMapping/selectSecondTypeList', params).then(result => result.data);
  },
  // abs申报进程
  PageByRecord(context, params) {
    return axios.post('/abs/bond/getPageByRecord', params).then(result => result.data);
  },
  // tunover 成交额
  getTradingAmount(context, params) {
    return axios.get('/option/turnover/chart', { params }).then(result => result.data);
  },
  // tunover 成交额比值
  getTradingRatio(context, params) {
    return axios.post('/option/turnover/chart_ratio', params).then(result => result.data);
  },
  // tunover 成交额计算
  caculateAmount(context, params) {
    return axios.get('/option/turnover/calculation', { params }).then(result => result.data);
  },
  // pcivd 计算当前时点波动率
  caculateImpliedVolatility(context, params) {
    return axios.get('/option/pcivd/calculation', { params }).then(result => result.data);
  },
  // pcivd 看涨看跌波动率列表和折线图
  getPcivdVolatility(context, params) {
    return axios.post('/option/pcivd/list', params).then(result => result.data);
  },
  // pcivd 计算隐含波动率
  calcCurMonthVolatility(context, params) {
    return axios.get('/option/pcivd/calculationCurtMonth', { params }).then(result => result.data);
  },
  // 生物制品批签发产品公示列表
  IssuanceBiologicalProduct(context, params) {
    return axios.post('/reptile/IssuanceBiologicalProduct/page', params).then(result => result.data);
  },
  // 生物制品批签发产品公示列表-----导出
  IssuanceBiologicalProductexport(context, params) {
    return axios.get('/reptile/IssuanceBiologicalProduct/export', { params, responseType: 'blob' }).then(result => result);
  },
  // 仿制药一致性评价任务列表
  medicalConsistencyAssessment(context, params) {
    return axios.post('/reptile/medicalConsistencyAssessment/page', params).then(result => result.data);
  },
  // 仿制药一致性评价任务列表-----导出
  medicalConsistencyAssessmentexport(context, params) {
    return axios.get('/reptile/medicalConsistencyAssessment/export', { params, responseType: 'blob' }).then(result => result);
  },
  // 优先纳入评审品种名单列表
  medicalPriorityService(context, params) {
    return axios.post('/reptile/medicalPriorityService/page', params).then(result => result.data);
  },
  // 优先纳入评审品种名单列表-----导出
  medicalPriorityexport(context, params) {
    return axios.get('/reptile/medicalPriority/export', { params, responseType: 'blob' }).then(result => result);
  },
  // 仿制药一致性评价任务信息列表
  throughConsistencyEvaluation(context, params) {
    return axios.post('/reptile/throughConsistencyEvaluation/page', params).then(result => result.data);
  },
  // 仿制药一致性评价任务信息列表-----导出
  throughConsistencyEvaluationexport(context, params) {
    return axios.get('/reptile/throughConsistencyEvaluation/export', { params, responseType: 'blob' }).then(result => result);
  },
  // 指标项数据导出
  exportIndustryDetail(context, params) {
    return axios.get('/reptile/logisticsInfo/export', { params, responseType: 'arraybuffer' }).then(result => result);
  },
  // 获取数据中心的数据管理update
  getdataCenterMd(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/spider/industryLog/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取数据中心的数据管理list
  getCenterlist(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/spider/industryLog/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

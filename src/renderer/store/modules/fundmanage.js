import axios from 'axios';
import qs from 'qs';
export default {
  // 获取基金管理货币基本信息数据
  getFundData(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundLevelInfo/screen', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  profitTenThousand(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/profitTenThousand/chart', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getFundDetail(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/fundInformation/basic/information', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getFundlog(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundLog/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getFundupdate(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundLog/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取货币基金的基础信息管理的数据
  getFundmoneyManagement(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/fundInformation/page', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取货币基金的基础信息管理的数据 pulldata
  FundmoneyManagementpull(context, param) {
    return new Promise((resolve, reject) => {
      axios.get(`/currency/fundInformation/pull?id=${param}`).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取货币基金的基础信息管理的数据add
  FundmoneyManagementadd(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundInformation/insert', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取货币基金的基础信息管理的数据edit
  FundmoneyManagementedit(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundInformation/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取货币基金的基础信息管理的数据delete
  FundmoneyManagementdelete(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundInformation/delete', qs.stringify(param)).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getWhiteList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelist/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getwhitelistContent(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelistContent/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  whitelistAdd(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelist/add', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  whitelistPage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelistContent/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteWhiite(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/whitelist/delete', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  updateWhiite(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelist/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  importWhiite(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/whitelistContent/import', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getgroupdata(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/group/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteDatamanage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundLog/updateLog', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getstepOne(context, param) { // 新增组合第一步的数据获取
    return new Promise((resolve, reject) => {
      axios.post('/currency/group/content/screen', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getstepThird(context, params) { // 新增组合第一步的数据获取
    return new Promise((resolve, reject) => {
      axios.get('/currency/group/splicing/peak/data', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  fundgroupAdd(context, param) { // 新增组合第一步的数据获取
    return new Promise((resolve, reject) => {
      axios.post('/currency/group/add', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  groupRuleAdd(context, param) { // 新增组合--组合规则
    return new Promise((resolve, reject) => {
      axios.post('/currency/groupRule/add', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  groupRulelist(context, param) { // 新增组合--组合规则列表
    return new Promise((resolve, reject) => {
      axios.post('/currency/groupRule/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  groupDetail(context, param) { // 组合详情
    return new Promise((resolve, reject) => {
      axios.post('/currency/groupLevelInfo/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  groupruleDetail(context, param) { // 组合规则详情
    return new Promise((resolve, reject) => {
      axios.get('/currency/groupRule/detail', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteGroup(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/group/delete', qs.stringify(param)).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deletegroupRule(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/groupRule/delete', qs.stringify(param)).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  testBiaozhun(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/group/chart', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  /* etf基金模块 */
  // 获取ETF基金管理的数据
  getEtfDatamanamentlist(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfFund/listLog', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 宽基的基金列表
  etfFundList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/etfFund/list', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 删除日志/etf/etfFund/delLog
  deleteEtfDatamanament(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfFund/delLog', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 宽鸡的基金详情
  etfInfo(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfFund/etfInfo', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 更新数据
  updateEtfDatamanament(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfFund/calculation', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 宽鸡的selsect下拉
  etfFundselect(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfFund/select', { params: param }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 指数信息
  indexList(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/etfFund/indexList', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 基金下拉
  fundSelect(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/indexInfo/fundSelect', params).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 指数下拉
  indexSelect(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/indexInfo/indexSelect', params).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 图表
  indexInfochart(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/indexInfo/chart', params).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 宽鸡的selsect下拉
  indexInfoselect(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/indexInfo/select', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },

  // 获取ETF基金基本信息管理
  getetfCodeiist(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfCode/iist', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  addOrUpdateCodeiist(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/etf/etfCode/addOrUpdate', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteetfCodeiist(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfCode/delete', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  pulletfCodeiist(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/etf/etfCode/pull', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的添加自选的接口
  optionaladd(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/optional/add', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的获取自选列表分页
  optionalpage(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/optional/page', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的删除自选
  optionaldeleteone(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/optional/delete', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的基金自选详情
  optionaldetailone(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/optional/detail', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的获取自选列表
  optionallistone(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/optional/list', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是新的意见上传接口
  feedBacksend(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/sso/feedBack/send', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取自选列表
  listrecommend(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/optional/list-recommend', params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里selectCodesByFundCode
  selectCodesByFundCodeold(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/level-info/selectCodesByFundCode', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 这里是基金优选首页
  fundRecommendprefer(context, params) {
    return new Promise((resolve, reject) => {
      axios.post('/currency/fundRecommend/prefer', params).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getFundCodelistnew() { // 获取基金优选的首页的基金名称列表
    return new Promise((resolve, reject) => {
      axios.get('/currency/homePageOptional/recommend/fund-list').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  fundRecommendchar(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/currency/homePageOptional/recommend-char', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  setRecommend(context, params) { // 设置基金推荐的里面的推荐至基金首页
    return new Promise((resolve, reject) => {
      axios.get('/currency/homePageOptional/recommend/set-up', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  setRecommendOld(context) { // 设置基金推荐的里面的推荐至基金首页的显示
    return new Promise((resolve, reject) => {
      axios.get('/currency/homePageOptional/old-optional').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getbondFundpage(context, param) { // 获取公募基金和私募基金
    return new Promise((resolve, reject) => {
      axios.post('/bondFund/fundLevelInfo/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  fundfundLevelInfoList(context) { // 获取公募基金或者私募基金的基金代码
    return new Promise((resolve, reject) => {
      axios.get('/bondFund/fundLevelInfo/fund-list').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  fundLevelInfoDetail(context, params) { // 获取公募基金或者私募基金的基金代码
    return new Promise((resolve, reject) => {
      axios.get('/bondFund/fundLevelInfo/detail', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  fundindexSelectList(context) { // 获取公募基金或者私募基金的基金代码
    return new Promise((resolve, reject) => {
      axios.get('/bondFund/marketCapability/indexSelect').then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getbondfundChart(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/bondFund/marketCapability/chart', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 获取债基基本信息
  getbondFundCodeInfo(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/bondFund/bondFundCode/page', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  bondFundCodeInsert(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/bondFund/bondFundCode/insert', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  bondFundCodeDelete(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/bondFund/bondFundCode/delete', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  bondFundpullAndUpdate(context, params) {
    return new Promise((resolve, reject) => {
      axios.get('/bondFund/bondFundCode/pullAndUpdate', { params }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  bondFundupdate(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/bondFund/bondFundCode/update', param).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

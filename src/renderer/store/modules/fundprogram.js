import axios from 'axios';
export default {
  // 基金筛选 - 基础筛选
  fundbasics(context, params) {
    return axios.post('/fundOrder/fund/screen/basics', params).then(result => result.data);
  },
  // 基金筛选 - 智能优化
  intelligence(context, params) {
    return axios.post('/fundOrder/fund/screen/intelligence', params).then(result => result.data);
  },
  // 获取所有的基金公司
  getallscreencompany(context, params) {
    return axios.get('/fundOrder/fund/screen/all/company', { params }).then(result => result.data);
  },
  // 获取自选列表
  optionallist(context, params) {
    return axios.post('/fundOrder/optional/list', params).then(result => result.data);
  },
  // 创建自选
  optionalcreate(context, params) {
    return axios.post('/fundOrder/optional/create', params).then(result => result.data);
  },
  // 删除自选
  optionaldelete(context, params) {
    return axios.get('/fundOrder/optional/delete', { params }).then(result => result.data);
  },
  // 删除基金
  funddelete(context, params) {
    return axios.post('/fundOrder/optional/fund/delete', params).then(result => result.data);
  },
  // 添加基金
  fundadd(context, params) {
    return axios.post('/fundOrder/optional/fund/add', params).then(result => result.data);
  },
  // 修改自选
  optionalupdate(context, params) {
    return axios.post('/fundOrder/optional/update', params).then(result => result.data);
  },
  // 根据自选id 查询基金列表
  optionalContentList(context, params) {
    return axios.get('/fundOrder/optionalContent/list', { params }).then(result => result.data);
  },
  // 参数设置--设置复核模式
  reviewsave(context, params) {
    return axios.post('/fundOrder/review/save', params).then(result => result.data);
  },
  // 参数设置--通过机构代码查复核信息
  getReviewByDeptCode(context, params) {
    return axios.get('/fundOrder/review/getReviewByDeptCode', { params }).then(result => result.data);
  },
  // 参数设置--给用户赋交易账号权限
  getAllUserByDeptCode(context, params) {
    return axios.get('/fundOrder/user/getUserByName', { params }).then(result => result.data);
  },
  // 参数设置--根据用户id查询该用户下的交易账户
  getUserAccountByUserId(context, params) {
    return axios.get('/fundOrder/userAccount/getUserAccountByUserId', { params }).then(result => result.data);
  },
  // 参数设置--给用户赋交易账号权限
  userAccountsave(context, params) {
    return axios.post('/fundOrder/userAccount/save', params).then(result => result.data);
  },
  // 参数设置--给用户赋交易账号权限
  acctInfogetAll(context, params) {
    return axios.post('/fundOrder/acctInfo/getAll', params).then(result => result.data);
  },
  // 参数设置--查询用户下的交易账号分页信息
  getUserAccountPageByRecord(context, params) {
    return axios.post('/fundOrder/userAccount/getUserAccountPageByRecord', params).then(result => result.data);
  },
  // 新的----基金筛选列表分页
  newgetFundData(context, params) {
    return axios.post('/fundOrder/fund/screen/page', params).then(result => result);
  },
  // 新的----基金筛新增自选
  newoptionaladd(context, params) {
    return axios.post('/fundOrder/optional/add', params).then(result => result);
  },
  // 新的----获取自选列表
  newoptionallistone(context, params) {
    return axios.post('/fundOrder/optional/list', params).then(result => result.data);
  },
  // 新的----获取自选列表分页
  newoptionalpage(context, params) {
    return axios.post('/fundOrder/optional/page', params).then(result => result.data);
  },
  // 新的----基金自选详情
  newoptionaldetailone(context, params) {
    return axios.get('/fundOrder/optional/detail', { params }).then(result => result);
  },
  // 新的----删除自选
  newoptionaldeleteone(context, params) {
    return axios.get('/fundOrder/optional/delete', { params }).then(result => result);
  },
  // 新的----获取白名单列表
  newgetWhiteList(context, params) {
    return axios.post('/fundOrder/whitelist/list', params).then(result => result);
  },
  // 新的----新增白名单
  newwhitelistAdd(context, params) {
    return axios.post('/fundOrder/whitelist/add', params).then(result => result);
  },
  // 新的----根据白名单id获取白名单内容
  newgetwhitelistContent(context, params) {
    return axios.post('/fundOrder/whitelistContent/list', params).then(result => result);
  },
  // 新的----修改白名单
  newupdateWhiite(context, params) {
    return axios.post('/fundOrder/whitelist/update', params).then(result => result);
  },
  // 新的----根据白名单id获取白名单内容(分页)
  newwhitelistPage(context, params) {
    return axios.post('/fundOrder/whitelistContent/page', params).then(result => result);
  },
  // 新的----删除白名单
  newdeleteWhiite(context, params) {
    return axios.get('/fundOrder/whitelist/delete', { params }).then(result => result);
  },
  // 新的----获取交易账号
  getUserAccounts(context, params) {
    return axios.get('/fundOrder/acctInfo/getUserAccounts', { params }).then(result => result.data);
  },
  // 新的----发起申购
  initiatingpurchase(context, params) {
    return axios.post('/fundOrder/order/initiating/purchase', params).then(result => result.data);
  },
  // 新的----预约申购
  apptpurchase(context, params) {
    return axios.post('/fundOrder/appt/purchase', params).then(result => result.data);
  },
  // 新的----交易指令查询列表
  processlist(context, params) {
    return axios.post('/fundOrder/process/list', params).then(result => result.data);
  },
  // 新的----下拉列表
  processselect(context, params) {
    return axios.get('/fundOrder/process/select', { params }).then(result => result.data);
  },
  // 新的----申请交易明细查询
  queryTradeInfo(context, params) {
    return axios.post('/fundOrder/fundTradeInstructions/queryTradeInfo', params).then(result => result.data);
  },
  // 新的----交易确认查询
  queryConfirmInfo(context, params) {
    return axios.post('/fundOrder/fundTradeInstructions/queryConfirmInfo', params).then(result => result.data);
  },
  // 新的----根据交易账号查询资金账号
  selectFundAccountList(context, params) {
    return axios.get('/fundOrder/order/selectFundAccountList', { params }).then(result => result.data);
  },
  // 新的----登录交易账号
  acctInfologin(context, params) {
    return axios.post('/fundOrder/acctInfo/login', params).then(result => result.data);
  },
  // 新的----查询持仓信息
  getPositionInfo(context, params) {
    return axios.post('/fundOrder/fundTradeInstructions/getPositionInfo', params).then(result => result.data);
  },
  // 新的----查询持仓信息
  excute(context, params) {
    return axios.post('/fundOrder/process/excute', params).then(result => result.data);
  },
  // 新的----撤销订单
  revocationOrder(context, params) {
    return axios.post('/fundOrder/fundTradeInstructions/revocationOrder', params).then(result => result.data);
  },
  // 新的----同步交易账号信息和银行账户信息
  acctInfosave(context, params) {
    return axios.get('/fundOrder/acctInfo/save', { params }).then(result => result.data);
  },
  // 新的----获取代销基金里列表
  fundConsignmentList(context, params) {
    return axios.post('/fundOrder/fundConsignment/page', params).then(result => result.data);
  },
  // 新的----获取代销基金里列表导入
  fundConsignmentimport(context, params) {
    return axios.post('/fundOrder/fundConsignment/import', params).then(result => result.data);
  },
  // 新的----查询资金账号余额
  getBalance(context, params) {
    return axios.get('/fundOrder/order/getBalance', { params }).then(result => result.data);
  },
  // 新的----查询交易账号下所有的资金账户列表
  getBalanceList(context, params) {
    return axios.get('/fundOrder/order/getBalanceList', { params }).then(result => result.data);
  },
  // 新的----根据FundCode模糊搜索code码
  selectCodesByFundCode(context, params) {
    return axios.get('/fundOrder/fund/screen/selectCodesByFundCode', { params }).then(result => result.data);
  },
  // 新的----查询字典表订单状态
  selectDictName(context, params) {
    return axios.get('/fundOrder/fundTradeInstructions/selectDictName', { params }).then(result => result.data);
  },
};

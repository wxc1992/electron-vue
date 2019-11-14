// import types from './operate-type.js'
export default {
  setOverview(state, newValue) {
    state.ias.overview = newValue;
  },
  setSubtotal(state, newValue) {
    state.ias.subtotal = newValue;
  },
  setBondlist(state, newValue) {
    state.ias.bondlist = newValue;
  },
  setluState(state, newValue) {
    state.sys.luru = newValue;
  },
  setSeacherparam(state, newValue) {
    Object.assign(state.ias.seacherParam, newValue);
  },
  setGuzhiDatelist(state, newValue) { // 设置估值表日期
    state.ias.guzhiDatelist = newValue;
  },
  setMenu(state, newValue) {
    state.menu = newValue;
  },
  setIasTablist(state, newValue) {
    state.ias.iastablist = newValue;
  },
  setSysrights(state, newValue) { // 老的系统管理
    state.sys.sysrightsList = newValue;
  },
  setSysrightsNew(state, newValue) { // 新的系统管理
    state.sys.sysrightsListNew = newValue;
  },
  /**
     * 信评模块
     */
  // 设置信评的板块报告期
  setCreditFilter(state, newValue) {
    const filter = state.creditRating.filter;
    state.creditRating.filter = { ...filter, ...newValue };
  },
  setCreditColumns(state, newValue) {
    state.creditRating.columns = newValue;
  },
  updateUserRights(state, newValue) {
    state.creditRating.userRights = newValue;
  },
  // 设置echartImgs
  fillInImgs(state, newValue) {
    for (let i = 0, len = state.outputImgs.length; i < len; i++) {
      const img = state.outputImgs[i];
      if (img.name === newValue.name) {
        state.outputImgs[i] = newValue;
        return;
      }
    }
    state.outputImgs.push(newValue);
  },
  fillInNewImgs(state, newValue) {
    state.newOutputImg = newValue;
  },
  clearNewChartImgs(state) {
    state.newOutputImg = {};
  },
  // 清空echartImgs
  clearChartImgs(state) {
    state.outputImgs = [];
  },
  /**
     * 组合模块
     */
  setGrouprights(state, newValue) {
    state.group.grouprights = newValue;
  },
  // 数据中心
  setBeginDate(state, newValue) {
    state.dataCenter.beginDate = newValue;
  },
  setEndDate(state, newValue) {
    state.dataCenter.endDate = newValue;
  },
  // 基金管理的数据和参数
  setprevData(state, newValue) {
    debugger;
    state.ssfund.dataInfo.push(newValue);
  },
  clearsetprevData(state, newValue) {
    state.ssfund.dataInfo = newValue;
  },
  // 基金管理的下一步的参数数据
  setNextParamsInfo(state, newValue) {
    state.ssfund.nextInfo = newValue;
  },
  // 数据中心2.0
  setLeftMenue(state, newValue) {
    state.dataCenter2.categoryList = newValue;
  },
  // 信评3.0
  setNewCreditingMenu(state, newValue) {
    state.NewcreditRating.userRights = newValue;
  },
  setFundmanagementmenu(state, newValue) {
    state.newFundMenue = newValue;
  },
  setNewCreditingS(state, newValue) { // 设置点评管理的查询参数
    state.NewcreditRating.seacherParams = newValue;
  },
  setNewoutputContent(state, newValue) { // 设置点评管理的的弹窗
    state.NewcreditRating.outputContent = newValue;
  },

};

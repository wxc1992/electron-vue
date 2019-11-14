import { stat } from 'fs';

export default {
  overview: state => state.ias.overview,
  subtotal: state => state.ias.subtotal,
  bondlist: state => state.ias.bondlist,
  getSysrights: state => // 老的系统管理
    state.sys.sysrightsList,
  getSysrightsNew: state => // 新的管理系统
    state.sys.sysrightsListNew,
  getluruState: state => state.sys.luru,
  getSeacherParam: state => state.ias.seacherParam,
  getIastablist: state => state.ias.iastablist,
  getGuzhiDatelist: state => state.ias.guzhiDatelist,
  /**
   * 信评模块
   */
  getCreditFilter: state => state.creditRating.filter,
  /**
   * 获取列数据
   */
  getCreditColumns: state => state.creditRating.columns,
  /**
   * 获取菜单数据
   */
  getMenu: state => state.menu,
  /**
   * 获取用户权限
   */
  getUserRights: state => state.creditRating.userRights,
  /**
   * 获取板块报告期数据
   */
  getFilterOrigin: state => state.creditRating.filter.origin,
  /**
   * 获取echart图片
   */
  getEcharsImg: state => state.outputImgs,
  getNewChartImg: state => state.newOutputImg,
  /**
   * 组合管理*
  */
  getGrouRights: state => state.group.grouprights,
  // 获取新增组合的下一步数据
  getssfundNextParamsInfo: state => state.ssfund.nextInfo,
  // 获取新增组合的上一步数据
  getprevddata: state => state.ssfund.dataInfo,
  getData2menu: state => state.dataCenter2.categoryList,
  // 获取信评3.0的菜单
  getNewCreditingMenu: state => state.NewcreditRating.userRights,
  getnewFundMenue: state => state.newFundMenue,
  getNewCreditingS: state => state.NewcreditRating.seacherParams,
  getNewoutputContent: state => state.NewcreditRating.outputContent,
};

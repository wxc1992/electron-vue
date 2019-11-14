import axios from 'axios';
export default{
  // 资产组合下拉列表
  assetsGroupselectone(context, params) {
    return axios.get('/pull-data/assetsGroup/select', { params }).then(result => result.data);
  },
  // 获取业绩分析图表
  getAchievementChartRespDto(context, params) {
    return axios.get('/pull-data/assetsData/getAchievementChartRespDto', { params }).then(result => result.data);
  },
  // getIndexMune
  assetsGroupmenu(context, params) {
    return axios.get('/pull-data/assetsGroup/menu', { params }).then(result => result.data);
  },
  // 查询组合指标
  assetsGroupgetInfo(context, params) {
    return axios.get('/pull-data/assetsGroup/getInfo', { params }).then(result => result.data);
  },
  // 删除组合中的指数
  assetsGroupgetdelIndex(context, params) {
    return axios.get('/pull-data/assetsGroup/delIndex', { params }).then(result => result.data);
  },
  // 删除组合
  assetsGroupgetdelGroup(context, params) {
    return axios.get('/pull-data/assetsGroup/delGroup', { params }).then(result => result.data);
  },
  // 添加组合指标
  assetsGroupaddIndex(context, param) {
    return axios.post('/pull-data/assetsGroup/addIndex', param).then(result => result.data);
  },
  // 创建资产组合（修改组合）
  assetsGroupaddGroup(context, param) {
    return axios.post('/pull-data/assetsGroup/addGroup', param).then(result => result.data);
  },
  // 获取持仓分析数据
  getHoldPosition(context, params) {
    return axios.get('/pull-data/assetsData/getHoldPosition', { params }).then(result => result.data);
  },
  // 获取风险贡献分析数据
  getRisk(context, params) {
    return axios.get('/pull-data/assetsData/getRisk', { params }).then(result => result.data);
  },
  // 获取资产组合业绩概览数据复制
  getAchievement(context, params) {
    return axios.get('/pull-data/assetsData/getAchievement', { params }).then(result => result.data);
  },
  // 获取资产配置策略输出数据
  getStrategy(context, params) {
    return axios.get('/pull-data/assetsData/getStrategy', { params }).then(result => result.data);
  },
  // 指数下拉列表
  selectIndex(context, params) {
    return axios.get('/pull-data/assetsGroup/selectIndex', { params }).then(result => result.data);
  },
};

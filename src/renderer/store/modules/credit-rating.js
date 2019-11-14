import axios from 'axios';
export default {
  // 获取各省份债务数据
  requestProvinceDebts(context, params) {
    return axios.get('/dsms/debtProvince/list', { params }).then(result => result.data);
  },
  requestCityDebts(context, params) {
    return axios.get('/dsms/debtCity/getByProvince', { params }).then(result => result.data);
  },
  // request all province debts
  requestCountryDebts(context, params) {
    return axios.get('/dsms/debtProvince/list', { params }).then(result => result.data);
  },
  // 区县数据
  requestDistrictDebt(context, param) {
    return axios.post('/dsms/debtDistrict/listByCity', param).then(result => result.data);
  },
  // 新债速览
  requestFutureDebt(context, param) {
    return axios.post('/dsms/futureNewBond/list', param).then(result => result.data);
  },
  // 更新全部
  updateAllData(context, params) {
    return axios.get('/dsms/futureNewBond/update', { params }).then(result => result.data);
  },
  // 删除行
  deleteRow(context, params) {
    return axios.get('/dsms/futureNewBond/delete', { params }).then(result => result.data);
  },
  // 更新颜色
  updateColor(context, param) {
    return axios.post('/dsms/futureNewBond/updateColor', param).then(result => result.data);
  },
  // 根据城市获取区县
  getDistrictByCity(context, param) {
    return axios.post('/dsms/debtDistrict/listDistrict', param).then(result => result.data);
  },
  // 查询调研记录
  requestResearchRecords(context, params) {
    return axios.get('/dsms/research/queryResearch', { params }).then(result => result.data);
  },
  // 保存调研记录
  saveResearchRecords(context, param) {
    return axios.post('/dsms/research/saveResearch', param).then(result => result.data);
  },
  updateMapValue(context, param) { // 更新地图的value
    return axios.post('/dsms/debtProvince/update', param).then(result => result);
  },
  updateMapCityValue(context, param) { // 更新地图的value
    return axios.post('/dsms/debtCity/update', param).then(result => result);
  },
  updateMapDsitricValue(context, param) { // 更新地图的value
    return axios.post('/dsms/debtDistrict/update', param).then(result => result);
  },
  // 新的信评接口

  // newUpdateData(context,param){ //新的信评数据管理更新
  //   return axios.post('/dsms/fiveTable/pull',param).then(result=>{
  //       return result;
  //   })
  // },
  // getdsmsLoglistupdate(context,param){
  //   return axios.post('/dsms/log/listUpdate',param).then(result=>{
  //     return result;
  //   })
  // },
  // getdsmsLoglist(context,param){
  //   return axios.post('/dsms/log/list',param).then(result=>{
  //     return result;
  //   })
  // },
  // getmodCreditSubject(context,params){
  //   return axios.get('/dsms/modCreditSubject/listByCompNameLike',{params}).then(result=>{
  //     return result;
  //   })
  // },
  // approvalSubject(context,param){
  //   return axios.post(' /dsms/log/approval',param).then(result=>{
  //     return result;
  //   })
  // },
  // getFivesheetData(context,params){
  //   return axios.get('/dsms/fiveTable/query',{params}).then(result=>{
  //     return result;
  //   })
  // },
  // companyList(context,param){ //数据管理--审核评级 --列表
  //   return axios.post('/dsms/company/list',param).then(result=>{
  //     return result;
  //   })
  // },
  // approvalcompany(context,param){
  //   return axios.post('/dsms/company/auth',param).then(result=>{
  //     return result;
  //   })
  // }
};

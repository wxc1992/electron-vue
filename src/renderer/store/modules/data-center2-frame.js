import axios from 'axios';
export default{
  getframeworkTree(context, param) {
    return axios.post('/datacenter/framework/tree', param).then(result => result);
  },
  getZSpDetailTree(context, param) {
    return axios.get('/datacenter/framework/getIndexData', { params: param }).then(result => result);
  },
  addNode(context, param) {
    return axios.post('/datacenter/framework/add', param).then(result => result);
  },
  deleteNode(context, param) {
    return axios.get('/datacenter/framework/delete', { params: param }).then(result => result);
  },
  uodateNode(context, param) {
    return axios.post('/datacenter/framework/update', param).then(result => result);
  },
  getframeworkleftTree(context, param) {
    return axios.post('/datacenter/framework/leftTree', param).then(result => result);
  },
  getDetailtabs(context, param) {
    return axios.get('/datacenter/framework/table', { params: param }).then(result => result);
  },
  setHistoryList(context, param) {
    return axios.post('/datacenter/frameworkLogistics/select', param).then(result => result);
  },
  getframeCharts(context, param) {
    return axios.post('/datacenter/logistics/listByIds', param).then(result => result);
  },
  getframeTable(context, param) {
    return axios.get('/datacenter/framework/table', { params: param }).then(result => result);
  },
  getdetailframeTable(context, param) {
    return axios.get('/datacenter/logistics/frameworkTable', { params: param }).then(result => result);
  },
  getlistIndexFramework(context, param) {
    return axios.get('/datacenter/framework/listIndexFramework', { params: param }).then(result => result);
  },
  exportframeEcel(context, param) {
    return axios.get('/datacenter/logistics/export', { params: param, responseType: 'blob' }).then(result => result);
  },
};

import 'babel-polyfill';
import ElTreeGrid from 'element-tree-grid';
import Vue from 'vue';
import ElementUI from 'element-ui';
import filters from './filter/filters.js';
import 'element-ui/lib/theme-chalk/index.css';
import commonUtil from './components/utils/common.js';
import qs from 'qs';
import 'font-awesome/css/font-awesome.css';
import '../renderer/assets/style/jsmind.css';
import './assets/css/base.css';

import App from './App';
import store from './store';
import router from './router';
import axios from 'axios';
// 导入vue-echarts插件
import ECharts from 'vue-echarts';

import common from '../renderer/components/commonFunction/common.js';
// 公共样式
import './assets/css/common.css';
const ip = require('ip');
const IPAddress = ip.address();
Vue.prototype.qs = qs;
Vue.prototype.axios = axios;
Vue.prototype.common = common;
// 全局注册chart组件
Vue.component('chart', ECharts);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(commonUtil);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
// 注册全局filter
for (const funcName in filters) {
  Vue.filter(funcName, filters[funcName]);
}
Vue.component(ElTreeGrid.name, ElTreeGrid);
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // alert(process.env.NODE_ENV)
  // 在发送请求之前做些什么
  console.log('IPAddress',IPAddress)
  let configUrl = config.url.split('?')[0]
  console.log('configUrl,configUrl',configUrl)
  const host = process.env.NODE_ENV === 'development'?'/':'https://hmly.tebon.com.cn:10999'
  config.baseURL = host
  const { Authorization } = config.headers;
  if (!Authorization) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  console.log(config);
  console.log('###################get route in axios:', router);
  return config;
}, error =>
  // 对请求错误做些什么
  Promise.reject(error));
let promptId = null;
axios.interceptors.response.use((response) => {
  // Do something with response data
  console.log('@@@@@@@@@@@@response:', response);
  const { request: { responseURL } } = response;
  const status = response.data.status;
  console.log('response', status);
  console.log('responseURL', responseURL);
  const matchLogout = responseURL && responseURL.match('/sso/logout');
  console.log('matchLogout', matchLogout);
  // console.log('matchLogout',matchLogout)
  if (matchLogout && matchLogout.length > 0) {
    console.log('match log return');
    return response;
  }
  if (status === '9998') {
    if (promptId) {
      clearTimeout(promptId);
    }
    promptId = setTimeout(() => {
      ElementUI.Message.warning(response.data.msg);
    }, 200);
    localStorage.clear();
    router.push('/login');
    return '';
  }
  return response;

  return response;
}, error =>
// Do something with response error
  Promise.reject(error));
/* eslint-disable no-new */



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

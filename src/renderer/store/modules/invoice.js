import axios from 'axios';
export default{
  // 发票管理==getYzm
  invoiceBaseyzm(context, params) {
    return axios.post('/invoice/invoiceBase/yzm', params).then(result => result.data);
  },
  // 发票管理==queryFp
  invoiceBasequeryFp(context, params) {
    return axios.post('/invoice/invoiceBase/queryFp', params).then(result => result.data);
  },
};

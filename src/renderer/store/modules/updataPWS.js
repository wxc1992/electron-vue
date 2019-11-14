import axios from 'axios';
import qs from 'qs';
import { promises } from 'fs';
export default {
  // 获取图片验证码
  getrandomCode(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/securit/randomCode', { params: param, responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 验证验证码
  getcheckCode(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/pwd/checkCode', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 发送验证码
  getsendValidCode(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/pwd/sendValidCode', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 修改密码
  getupdatePwd(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/sso/pwd/updatePwd', { params: param }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

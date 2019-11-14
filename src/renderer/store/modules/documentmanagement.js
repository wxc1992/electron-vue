import axios from 'axios';
export default{
  // 获取所有的文件夹
  documentList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/document/list', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 文档管理的上传
  documentAdd(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/document/add', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 文档管理的删除
  documentDelete(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/dsms/document/delete', param).then((result) => {
        resolve(result.data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 文档管理的xiazai
  documentDownload(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/dsms/document/download', { params: param, responseType: 'blob' }).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

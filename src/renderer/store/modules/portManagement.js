import axios from 'axios';
import qs from 'qs';
import { promises } from 'fs';
export default{
  // 选择组合组合策略集合
  portfolioList(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/portfolio/portfolioList', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 新增组合策略
  portfolioSave(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/portfolio/save', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 股票成交记录列表
  selectStockTradeByParamPage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/stockTrade/selectStockTradeByParamPage', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 股票持仓改变接口
  batchDeclarationForm(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/stockOrder/batchDeclarationForm', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓明细列表
  positiondtlpage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/positiondtl/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 历史持仓明细列表
  positiondtlhistorypage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/positiondtlhistory/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 持仓汇总列表
  positionpage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/position/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 历史持仓汇总列表
  positionhistorypage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/positionhistory/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 股票每日收益列表
  stockAccountFundpage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/stockAccountFund/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 股票合约列表
  stockInstrumentpage(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/stockInstrument/page', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 股票合约列表--新增和批量新增
  insertCommonStock(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/mongodb/insertCommonStock', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 常用股票分页列表
  selectCommonStockPage(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/combination/mongodb/selectCommonStockPage', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 常用股票分页列表--删除
  deleteByStcokCode(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/combination/mongodb/deleteByStcokCode', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 常用股票分页列表--批量删除
  deleteByStcokCodeBatch(context, param) {
    return new Promise((resolve, reject) => {
      axios.post('/combination/mongodb/deleteByStcokCodeBatch', param).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 常用股票数据全部拉取接口
  allselectCommonStock(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/combination/mongodb/selectCommonStock', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  // 当日持仓仓位
  getPosition(context, param) {
    return new Promise((resolve, reject) => {
      axios.get('/combination/position/getPosition', { params: param }).then((result) => {
        resolve(result.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

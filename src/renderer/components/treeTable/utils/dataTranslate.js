
import Vue from 'vue';
function DataTransfer(data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null);
  }
}

DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
  let tmp = [];
  Array.from(data).forEach((record) => {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll);
    }
    if (parent) {
      Vue.set(record, '_parent', parent);
    }
    let _level = 0;
    if (level !== undefined && level !== null) {
      _level = level + 1;
    }
    Vue.set(record, '_level', _level);
    tmp.push(record);
    if (record.cashFlowRespVos && record.cashFlowRespVos.length > 0) {
      const cashFlowRespVos = DataTransfer.treeToArray(record.cashFlowRespVos, record, _level, expandedAll);
      tmp = tmp.concat(cashFlowRespVos);
    }
    if (record.children && record.children.length > 0) {
      const children = DataTransfer.treeToArray(record.children, record, _level, expandedAll);
      tmp = tmp.concat(children);
    }
    if (record.groupList && record.groupList.length > 0) {
      const groupList = DataTransfer.treeToArray(record.groupList, record, _level, expandedAll);
      tmp = tmp.concat(groupList);
    }
    if (record.positionData && record.positionData.length > 0) {
      const positionData = DataTransfer.treeToArray(record.positionData, record, _level, expandedAll);
      tmp = tmp.concat(positionData);
    }
    if (record.dangerTableRespVos && record.dangerTableRespVos.length > 0) {
      const dangerTableRespVos = DataTransfer.treeToArray(record.dangerTableRespVos, record, _level, expandedAll);
      tmp = tmp.concat(dangerTableRespVos);
    }
  });
  return tmp;
};

export default DataTransfer;

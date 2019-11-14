import Vue from 'vue';
import CryptoJS from 'crypto-js';
export default {
  set(key, value) { // 封装过期控制代码
    const curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
  },
  get(key, exp) {
    const data = localStorage.getItem(key);
    const dataObj = JSON.parse(data);
    if (dataObj == '' || dataObj == null) {
      console.log('过期了');
      return;
    }
    if (new Date().getTime() - dataObj.time > exp) {
      console.log('信息已过期');
      // alert("信息已过期")
    } else {
      // console.log("data="+dataObj.data);
      // console.log(JSON.parse(dataObj.data));
      const dataObjDatatoJson = JSON.parse(data);
      return dataObjDatatoJson;
    }
  },
  excel: (function () { // 导出excel公用的方法
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function (data, fileName) {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }()),
  excel2: (function () { // 导出excel公用的方法
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    return function (data, fileName) {
      const blob = new Blob([data], { type: 'application/vnd.ms-excel.sheet.macroEnabled.12' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }()),
  encrypt(word, keyStr) {
    // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    const key = CryptoJS.enc.Utf8.parse(keyStr);// Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: '1269571569321021', mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
  },
  // 解密
  decrypt(word, keyStr) {
    // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    const key = CryptoJS.enc.Utf8.parse(keyStr);// Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const decrypt = CryptoJS.AES.decrypt(word, key, { iv: '1269571569321021', mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  formatNum(strNum) {
    if (strNum.length <= 3) {
      return strNum;
    }
    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
      return strNum;
    }
    let a = RegExp.$1,
      b = RegExp.$2,
      c = RegExp.$3;
    const re = new RegExp();
    re.compile('(\\d)(\\d{3})(,|$)');
    while (re.test(b)) {
      b = b.replace(re, '$1,$2$3');
    }
    return `${a}${b}${c}`;
  },
};

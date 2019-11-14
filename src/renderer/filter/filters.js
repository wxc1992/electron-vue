export default {
  reserve2Decimal(value, bitsCount, needDash) {
    if (!value || (!isNaN(value) && !parseFloat(value))) {
      return needDash ? '--' : value;
    }
    if (isNaN(value)) {
      return value;
    }
    return Number(value).toFixed(bitsCount || 2);
  },
  percentage(value) {
    if (isNaN(value)) {
      return value;
    }
    return `${Number(Number(value) * 100).toFixed(2)}%`;
  },
  emptyValue(value) {
    if ((!isNaN(value) && !parseFloat(value)) || !value || value == undefined || value == null) {
      return '';
    }
    return value;
  },
  thousandSeparate(text, flag) {
    if (flag === false) {
      return text;
    }
    if (!text || isNaN(text) || text === null) {
      return text;
    }
    const numArr = String(text).split('.');
    var text = (numArr[0] || 0).toString(),
      result = '';
    const negative = text[0] == '-';
    if (negative) {
      text = text.substr(1);
    }
    while (text.length > 3) {
      result = `,${text.slice(-3)}${result}`;
      text = text.slice(0, text.length - 3);
    }
    if (text) {
      result = `${text + result}.${numArr[1] || '00'}`;
    }
    if (negative) {
      result = `-${result}`;
    }
    return result;
  },
  zeroReturn(text) {
    console.log('text-----', text);

    return text == '0.00' ? '--' : text;
  },
  changeStatus(val) {
    let status = '';
    if (val === '0') {
      status = '准备提交';
    } else if (val === '1') {
      status = '准备导入';
    } else if (val === '2') {
      status = '导入成功';
    } else if (val === '3') {
      status = '导入失败';
    } else if (val === '4') {
      status = '识别异常';
    } else if (val === '5') {
      status = '待校验';
    } else if (val === '6') {
      status = '已覆盖';
    }
    return status;
  },
  formatTime(time, type) {
    let datetime = '';
    if (time == undefined || time == null) {
      datetime = new Date();
    } else {
      // datetime = new Date(parseInt(time) * 1000);
      datetime = new Date(parseInt(time));
    }
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
    const day = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
    const hour = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours();
    const min = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
    const sec = datetime.getSeconds() < 10 ? `0${datetime.getSeconds()}` : datetime.getSeconds();
    if (type == 0 || type == undefined) {
      return `${year}-${month}-${day}`;
    }
    if (type == 1) {
      return `${year}/${month}/${day}`;
    }
    if (type == 2) {
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
    if (type == 3) {
      return `${hour}:${min}`;
    }
    if (type == 4) {
      return `${month}月${day}日`;
    }
    if (type == 5) {
      return `${month}-${day}  ${hour}:${min}`;
    }
  },
  getFileName(val) {
    if (!val) {
      return '';
    }
    const valArr = val.split('/');
    return valArr ? valArr.pop() : val;
  },
  formatDate(val, separator) {
    if (!val) {
      return '';
    }
    const dt = new Date(val);
    const year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    month = [Math.floor(month / 10), month % 10].join('');
    let day = dt.getDate();
    day = [Math.floor(day / 10), day % 10].join('');
    separator = separator !== undefined ? separator : '-';
    return [year, month, day].join(separator);
  },
};

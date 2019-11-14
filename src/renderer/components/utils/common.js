const windowResize = (function () {
  const resizeHandlers = [];

  function add(handler) {
    if (handler && typeof handler === 'function') {
      const timeStamp = new Date();
      resizeHandlers.push({
        id: timeStamp,
        handler,
      });
      return timeStamp;
    }
    return null;
  }

  function del(id) {
    for (let i, len = resizeHandlers.length; i < len; i++) {
      const handler = resizeHandlers[i];
      if (handler.id === id) {
        resizeHandlers.splice(i, 1);
        break;
      }
    }
  }

  function onResize() {
    for (const handler of resizeHandlers) {
      handler.handler();
    }
  }
  window.onresize = () => {
    onResize();
  };
  return {
    add,
    del,
  };
}());

export default {
  install(Vue, options) {
    Vue.prototype.$winResize = windowResize;
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
  debounce(func, wait, immediate) {
    let timeout,
      args,
      context,
      timestamp,
      result;

    const later = function () {
      // ??????????
      const last = +new Date() - timestamp;

      // ??????????????last????????wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // ?????immediate===true???????????????????
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function (...args) {
      context = this;
      timestamp = +new Date();
      const callNow = immediate && !timeout;
      // ??????????????
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },
};

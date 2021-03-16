/* eslint-disable */
export default {
  throttle(callback, time, immediate = false) {
    if (immediate) {
      // 触发立即执行的节流函数
      let t;
      return function () {
        if (!t || Date.now() - t >= time) {
          callback.apply(null, arguments);
          t = Date.now();
        }
      };
    } else {
      // 触发非立即执行的函数
      let timer;
      return function () {
        if (timer) {
          return;
        }
        const args = arguments;
        timer = setTimeout(() => {
          callback.apply(null, args);
          timer = null;
        }, time);
      };
    }
  },
  debounce(callback, time) {
    let timer;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }

      const args = arguments;
      timer = setTimeout(function () {
        callback.apply(null, args);
      }, time);
    };
  },
};

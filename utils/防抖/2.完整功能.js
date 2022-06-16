/*
 * @Author: lizhiquan
 * @Date: 2022-06-We 09:56:53
 * @Last Modified by:   lizhiquan
 * @Last Modified time: 2022-06-We 09:56:53
 */

function debounce(fn, delay, immediate = false, resultCallback) {
  let timer = null;
  let isInvoke = false;
  const _debounce = function (...args) {
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer);
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args);
        if (resultCallback) resultCallback(result);
        resolve(result);
        isInvoke = true;
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
          isInvoke = false;
          timer = null;
        }, delay);
      }
    });
  };
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };
  return _debounce;
}

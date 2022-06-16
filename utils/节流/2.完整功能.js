/*
 * @Author: lizhiquan
 * @Date: 2022-06-Th 01:53:36
 * @Last Modified by:   lizhiquan
 * @Last Modified time: 2022-06-Th 01:53:36
 */

/**
 * 
 * @param {Function} fn 
 * @param {Number} interval 
 * @param {Object} options
 * @param {Boolean} leading // 第一次是否触发函数
 * @param {Boolean} trailing // 最后一次是否触发函数
 * @returns 
 */

function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing, resultCallback } = options;
  let lastTime = 0;
  let timer = null;

  const _throttle = function (...args) {
    return new Promise((resolve) => {
      const nowTime = new Date().getTime();
      if (!lastTime && !leading) lastTime = nowTime;

      // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        // 2.3.真正触发函数
        const result = fn.apply(this, args);
        if (resultCallback) resultCallback(result);
        resolve(result);
        // 2.4.保留上次触发的时间
        lastTime = nowTime;
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = !leading ? 0 : new Date().getTime();
          const result = fn.apply(this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
        }, remainTime);
      }
    });
  };

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}

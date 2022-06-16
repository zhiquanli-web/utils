/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Th 01:46:44 
 * @Last Modified by:   lizhiquan 
 * @Last Modified time: 2022-06-Th 01:46:44 
 */
function debounce(fn, delay) {
  let timer = null;
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
  return _debounce;
}

/*
 * @Author: lizhiquan
 * @Date: 2022-06-Fr 10:43:34
 * @Last Modified by:   lizhiquan
 * @Last Modified time: 2022-06-Fr 10:43:34
 */

function hySlice(start = 0, end = this.length) {
  const arr = [];
  for (let i = start; i < end; i++) {
    arr.push(this[i]);
  }
  return arr;
}

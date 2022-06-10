/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Fr 03:34:07 
 * @Last Modified by:   lizhiquan 
 * @Last Modified time: 2022-06-Fr 03:34:07 
 */

class Depend {
  constructor() {
    this.reactiveFns = []
  }

  // 依赖收集
  addDepend(reactiveFns) {
    this.reactiveFns.push(reactiveFns)
  }

  // 执行关联方法
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}
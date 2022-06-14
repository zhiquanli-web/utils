/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Mo 08:18:49 
 * @Last Modified by:   lizhiquan 
 * @Last Modified time: 2022-06-Mo 08:18:49 
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

const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

const targetMap = new WeakMap()
function getDepend(target, key) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}


const obj = {
  name: 'why',
}

const proxyObj = new Proxy(obj, {
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    const  depend = getDepend(target, key)
    depend.notify()
  },
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  }
})
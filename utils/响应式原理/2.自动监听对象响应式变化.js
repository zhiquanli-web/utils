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


const obj = {
  name: 'why',
}

const proxyObj = new Proxy(obj, {
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    depend.notify()
  },
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  }
})

watchFn(function() {
  const newName = objProxy.name
  console.log("你好啊, 李银河", newName)
  console.log("Hello World")
})

watchFn(function() {
  console.log(objProxy.name, "demo function -------")
})

watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----1")
})

watchFn(function() {
  console.log(objProxy.age, "age 发生变化是需要执行的----2")
})

objProxy.name = "kobe"
objProxy.name = "james"

objProxy.age = 100
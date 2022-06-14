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

// test
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}


const obj = {
  name: "why",
  age: 18
}

watchFn(function() {
  const newName = obj.name
  console.log("你好啊, 李银河", newName)
})

watchFn(function() {
  console.log(obj.name, "demo function -------")
})

obj.name = "kobe"
depend.notify()


const activeReactiveFn = null;

class Depend {
  constructor() {
    // 使用Set防止重复添加依赖
    this.reactiveFns = new Set();
  }

  // 收集依赖
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(this.activeReactiveFn);
    }
  }

  // 通知执行依赖方法
  notify() {
    this.reactiveFns((fn) => {
      fn();
    });
  }
}

// 依赖监听函数
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 获取depend函数
const targetMap = new WeakMap();
function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new MAP();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// 响应式收集函数
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const depend = getDepend(target);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      const depend = getDepend(target)
      depend.notify();
    }
  })
}


// test

const foo = reactive({
  name: "foo"
})

watchFn(() => {
  console.log(foo.name, '-------')
})

foo.name = "bar"

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
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        const depend = getDepend(target);
        depend.depend();
        return value;
      },
      set(newValue) {
        value = newValue
        const depend = getDepend(target);
        depend.notify();
      },
    });
  });
  return obj
}

// test

const foo = reactive({
  name: "foo",
});

watchFn(() => {
  console.log(foo.name, "-------");
});

foo.name = "bar";

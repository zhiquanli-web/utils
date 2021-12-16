import Clipboard from "clipboard";

// 设置一个帧率定时器
export function setFPS(cb, fps = 60) {
  if (typeof cb !== "function") {
    throw Error("cb必须是函数类型");
  }
  if (typeof fps !== "number") {
    throw Error("fps必须是数字类型");
  }
  if (fps < 1 || fps > 60) {
    throw Error("fps的值应该在[1, 60]之间");
  }
  const interval = parseInt(1000 / Math.min(fps, 60));
  let id = null;
  let prevTime = performance.now();
  function loop(ts) {
    id = requestAnimationFrame(loop);
    if (ts - prevTime >= interval) {
      cb();
      prevTime = ts;
    }
  }
  id = requestAnimationFrame(loop);
  return {
    cancel: () => {
      cancelAnimationFrame(id);
    },
  };
}

export function vw(px, base = 750, unit = true) {
  if (typeof px !== "number" || typeof base !== "number") {
    throw Error("px / base 不能为空，并且必须为一个数字");
  }
  return (Math.round(px) / base) * 100 + (unit ? "vw" : "");
}

export function isValidNum(value) {
  return !isNaN(Number(value));
}
// vw -> px
export function vwToPx(value) {
  if (typeof value === "string") {
    value = value.replace(/vw$/, "");
  }
  if (!isValidNum(value)) {
    throw Error("值不能为空，并且应该是一个数字，或者可以由Number解析的值");
  }
  const oneVw = window.innerWidth / 100;
  return Math.round(oneVw * Number(value));
}

export function vpx(value) {
  return vwToPx(vw(value));
}

// 判断参数是否为整数
function isInt(value) {
  return (
    typeof value === "number" && isFinite(value) && Math.floor(value) === value
  );
}

// 生成随机整数
export function randomInt(min, max) {
  if (!isInt(min) || !isInt(max)) {
    throw Error("min / max 值必须为整数");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// key -> value 处理
export function mapFn(keys = [], values = []) {
  if (!(Array.isArray(keys) && Array.isArray(values)))
    throw Error("参数必须为数组");
  if (keys.length < values.length) throw Error("keys长度必须不小于values长度");
  if (keys.length === 0 || values.length === 0)
    throw Error("keys / values 的长度不能为0");
  const maps = new Map();
  for (let i = 0; i < keys.length; i++) {
    maps.set(keys[i], values[i]);
  }
  return maps;
}

// 复制文本到剪切板
export function handleClipboard(event, that) {
  const clipboard = new Clipboard(event.target);
  clipboard.on("success", () => {
    that.$toast("复制成功");
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    that.$toast("复制失败, 请重新复制");
    clipboard.destroy();
  });
  !that.isCopy && event.target.click(); // 解决第一次复制不成功问题
  that.isCopy = true;
}

// 图片加载
export function reloadImage(src) {
  if (typeof src !== "string") throw Error("src为图片路径");
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
  });
}

// 是否是IOS
export function isIOS() {
  return /(iPhone|iPad); /i.test(navigator.userAgent);
}

// 防抖
export function debounce(fn, delay = 500) {
  if (Object.prototype.toString.call(fn) !== "[object Function]")
    throw Error("请传入函数!");
  let timer = null;
  return function debounceFn(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, delay);
  };
}

// 防止异步函数重复调用 - 异步函数开始执行时就会被加锁，直到执行完毕才会解锁
export function preventRepeat(fn) {
  if (typeof fn !== "function") {
    throw Error("请传入函数!");
  }
  let lock = false;
  return async function (...args) {
    if (lock) return;
    lock = true;
    const context = this;
    await fn.call(context, ...args);
    lock = false;
  };
}

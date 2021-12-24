// 常用方法
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
      resolve(img);
    };
  });
}

// 是否是IOS
export function isIOS() {
  return /(iPhone|iPad); /i.test(navigator.userAgent);
}

// 是否是Android
function isAndroid() {
  return /Android /i.test(navigator.userAgent);
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

// 防止异步函数重复调用 - 异步函数开始执行时就会被加锁，直到执行完毕才会解锁。
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

// 生成指定范围的随机数
export const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 数字千分位分隔
export const format = (n) => {
  let num = n.toString();
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = "";
    let remainder = len % 3;
    if (remainder > 0) {
      // 不是3的整数倍
      return (
        num.slice(0, remainder) +
        "," +
        num.slice(remainder, len).match(/\d{3}/g).join(",") +
        temp
      );
    } else {
      // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(",") + temp;
    }
  }
};

// 数组乱序
export const arrScrambling = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
};

// 生成随机字符串
export const randomString = (len) => {
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789";
  let strLen = chars.length;
  let randomStr = "";
  for (let i = 0; i < len; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen));
  }
  return randomStr;
};

// 字符串首字母大写
export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// 手机号中间4位变成*
export const telFormat = (tel) => {
  tel = String(tel);
  return tel.substr(0, 3) + "****" + tel.substr(7);
};

// 驼峰命名转换成短横线命名
export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => "-" + item.toLowerCase());
};

// 短横线命名转换成驼峰命名
export const getCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase());
};

// 数字转化为大写金额
export const digitUppercase = (n) => {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  n = Math.abs(n);
  let s = "";
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }
  return s
    .replace(/(零.)*零元/, "元")
    .replace(/(零.)+/g, "零")
    .replace(/^整$/, "零元整");
};

// 设置cookie
export const setCookie = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};

// 读取cookie
export const getCookie = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split("; ");
  let cookieValue = "";
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i].split("=");
    if (temp[0] === key) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
};

// 删除cookie
export const delCookie = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};

// 校验身份证
export const checkCardNo = (value) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(value);
};

// 是否包含中文
export const haveCNChars = (value) => {
  return /[\u4e00-\u9fa5]/.test(value);
};

// 是否为中国大陆的邮政编码
export const isPostCode = (value) => {
  return /^[1-9][0-9]{5}$/.test(value.toString());
};

// 是否为ipv6地址
export const isIPv6 = (str) => {
  return Boolean(
    str.match(/:/g)
      ? str.match(/:/g).length <= 7
      : false && /::/.test(str)
      ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)
      : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str)
  );
};

// 是否为邮箱地址
export const isEmail = (value) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
};

// 是否为中国大陆手机号
export const isTel = (value) => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
};

// PC端还是移动端
export const isMobile = () => {
  if (
    navigator.userAgent.match(
      /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

// 滚动到页面顶部
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};

// 滚动到页面底部
export const scrollToBottom = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
};

// 滚动到指定元素区域
export const smoothScroll = (element) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};

// 打开浏览器全屏
export const toFullScreen = (element) => {
  element.requestFullscreen();
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};

// 退出浏览器全屏
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};

// 对象深拷贝
export const deepClone = (obj, hash = new WeakMap()) => {
  // 日期对象直接返回一个新的日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }
  //正则对象直接返回一个新的正则对象
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用,就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 获取对象所有自身属性的描述
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);

  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      cloneObj[key] = deepClone(obj[key], hash);
    } else {
      cloneObj[key] = obj[key];
    }
  }
  return cloneObj;
};

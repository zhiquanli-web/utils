// 设置一个帧率定时器
export function setFPS(cb, fps = 60) {
  if (typeof cb !== "function") {
    throw Error("cb should be function");
  }
  if (typeof fps !== "number") {
    throw Error("fps should be number");
  }
  if (fps < 1 || fps > 60) {
    throw Error("fps should be in range of [1, 60]");
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
  if (typeof px !== "number") {
    throw new Error("px is required and should be a number");
  }
  if (typeof base !== "number") {
    throw new Error("base is required and should be a number");
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
    throw new Error(
      "value is required and should be a number or value can be parsed by Number()"
    );
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
  if (!isInt(min)) {
    throw Error("min should be an integer");
  }
  if (!isInt(max)) {
    throw Error("max should be an integer");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// key -> value 处理
export function mapFn(keys = [], values = []) {
  if (!(Array.isArray(keys) && Array.isArray(values))) throw "参数必须为数组";
  if (keys.length < values.length) throw "keys长度必须大于values长度";
  if (keys.length === 0 || values.length === 0) throw "参数长度不能为0";
  const maps = new Map();
  for (let i = 0; i < keys.length; i++) {
    maps.set(keys[i], values[i]);
  }
  return maps;
}

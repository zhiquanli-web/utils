let arr = [1, 2, 3, 4];
const result = arr.reduceRight((acc, item) => {
  return acc + item;
}, 0);

console.log("result", result);

function hyFlat(arr) {
  const isDeep = arr.some((item) => item instanceof Array);
  if (!isDeep) return arr;
  const result = Array.prototype.concat.apply([], arr);
  return result;
}

function hyDeepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = hyDeepClone(obj[key]);
    }
  }
  return newObj;
}

function hyBind(thisArg, ...args) {
  const fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  function proxyFn(...arg2s) {
    thisArg.fn = fn;
    return thisArg.fn([...args, ...arg2s]);
  }
  return proxyFn;
}

function hyCall(thisArg, ...args) {
  const fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
  thisArg.fn = fn
  const result = thisArg.fn(...args)
  delete thisArg.fn
  return result
}


function hyApply(thisArg, args = []) {
  const fn = this
  thisArg = thisArg !== null && thisArg !==undefined ? Object(thisArg) : window
  thisArg.fn  = fn
  const result  = thisArg.fn(...args)
  delete thisArg.fn
  return result
}
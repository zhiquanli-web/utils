/*
 * @Author: lizhiquan
 * @Date: 2022-06-Fr 09:53:09
 * @Last Modified by:   lizhiquan
 * @Last Modified time: 2022-06-Fr 09:53:09
 */

Function.prototype.hyCall = function (thisArg, ...args) {
  const fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  thisArg.fn = fn;
  const result = thisArg.fn(this, ...args);
  delete thisArg.fn;
  return result;
}

// test

const obj = {
  name: "lizhiquan",
  age: 18,
};

function foo (name, age) {
  console.log(this);
  return name + age;
}

foo.hyCall(obj, "zhangsan", 24);
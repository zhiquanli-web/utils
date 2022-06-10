/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Fr 10:39:02 
 * @Last Modified by:   lizhiquan 
 * @Last Modified time: 2022-06-Fr 10:39:02 
 */

Function.prototype.hyApply = function(thisArg, ...args) {
  const fn = this;
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  thisArg.fn = fn;
  const result = thisArg.fn(thisArg, args);
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
  console.log(this.name, this.age);
  return name + age;
}

foo.hyApply(obj, "zhangsan", 24);
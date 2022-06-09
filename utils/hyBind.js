/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Th 06:38:32 
 * @Last Modified by:   andy 
 * @Last Modified time: 2022-06-Th 06:38:32 
 */

Function.prototype.hyBind = function(thisArg, ...argsArray) {
  var fn = this;
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  function proxyFn(...args) {
    thisArg.fn = fn
    var finalArgs = [...argsArray, ...args];
    var result = thisArg.fn(...finalArgs);
    delete thisArg.fn;
    return result
  }
  return proxyFn
}


// test
const obj = {
  name: "lizhiquan",
  age: 18,
}

function test(name, age) {
  console.log(this.name, this.age);
}


const testFn = test.hyBind(obj, "zhangsan", 24);
testFn()
/*
 * @Author: lizhiquan
 * @Date: 2022-06-Th 02:44:29
 * @Last Modified by:   andy
 * @Last Modified time: 2022-06-Th 02:44:29
 */

// function hyCompose(...fns) {
//   var length = fns.length;
//   function compose(...args) {
//     var index = 0;
//     var result = length ? fns[index].apply(this, args) : args;
//     while (++index < length) {
//       result = fns[index].call(this, result);
//     }
//     return result
//   }
//   return compose
// }

function hyCompose(...fns) {
  return function (...args) {
    return fns.reduce((acc, fn) => {
      return [fn.apply(this, acc)];
    }, args);
  };
}



// test

function sum(a, b) {
  return a + b;
}

function square(a) {
  return a ** 2;
}

const comp = hyCompose(sum, square);

console.log(comp(1,2));
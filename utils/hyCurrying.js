/*
 * @Author: lizhiquan
 * @Date: 2022-06-Th 02:04:16
 * @Last Modified by:   andy
 * @Last Modified time: 2022-06-Th 02:04:16
 */

function hyCurrying(fn) {
  function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  }
  return curried;
}




// test

function sum(a, b, c, d) {
  return a + b + c + d;
}

const add = hyCurrying(sum);

add(1, 2, 3, 4);
add(1, 2)(3, 4);
const result = add(1)(2)(3)(4);
console.log('result', result);
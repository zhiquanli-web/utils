/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Th 04:48:15 
 * @Last Modified by:   andy 
 * @Last Modified time: 2022-06-Th 04:48:15 
 */

function hyFlat(arr) {
  return arr.reduce(function(acc, cur) {
    return acc.concat(Array.isArray(cur) ? hyFlat(cur) : cur);
  }, []);
}

// function hyFlat(arr) {
//   const isDeep = arr.some(item => item instanceof Array)
//   if(!isDeep) {
//     return arr;
//   }
//   const result = Array.prototype.concat.apply([], arr);
//   return hyFlat(result);
// }


// test

const arr = [1,2,3,[4,5,[6,7]], [8, [9]]];
const newArr = hyFlat(arr)
console.log(arr, '-----', newArr);
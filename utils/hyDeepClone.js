/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Th 04:52:15 
 * @Last Modified by:   andy 
 * @Last Modified time: 2022-06-Th 04:52:15 
 */

function hyDeepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
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


// test

const obj  = {
  name: 'zhangshan',
  age: 18,
  address: {
    city: 'beijing',
  }
}

const newObj = hyDeepClone(obj);

newObj.name = 'lisi';

console.log(obj, '----', newObj);
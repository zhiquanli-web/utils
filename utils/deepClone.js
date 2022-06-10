/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Th 04:52:15 
 * @Last Modified by:   andy 
 * @Last Modified time: 2022-06-Th 04:52:15 
 */

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
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

const newObj = deepClone(obj);

newObj.name = 'lisi';

console.log(obj, '----', newObj);
/*
 * @Author: lizhiquan 
 * @Date: 2022-06-Fr 03:30:56 
 * @Last Modified by:   lizhiquan 
 * @Last Modified time: 2022-06-Fr 03:30:56 
 */
function getQuery() {
  const searchStr = window.location.search.slice(1);
  return Object.fromEntries(new URLSearchParams(searchStr))
}

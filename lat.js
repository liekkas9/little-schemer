// 用递归的方式，检测一维数组的每一项都是 string
function lat(arr = []) {
  if (!arr.length) {
    return true;
  }
  const [first, ...rest] = arr;
  const isStr = typeof first === "string";
  if (isStr) {
    return lat(rest);
  } else {
    return false;
  }
}

const ret = lat(["1", 2]);
console.log(ret);

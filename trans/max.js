// 求解数组的最大项目

const arr = [1, 4, 2, 65, 32, 89, 10, 34, -1];

const max = (arr = []) => {
  if (!arr.length) {
    throw new Error('数组木有长度');
  }
  if (arr.length === 1) {
    return arr[0];
  }
  const [first, ...rest] = arr;
  if (first > max(rest)) {
    return first;
  } else {
    return max(rest);
  }
};

console.log(max(arr));

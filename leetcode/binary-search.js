var searchInsert = function (nums, target) {
  let left = 0, right = nums.length - 1;
  let ans;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midV = nums[mid];
    if (midV >= target) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};

console.log(searchInsert([1, 3, 5, 6], 2));
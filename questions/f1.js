// 小青蛙跳台阶
function fn(n) {
	// 第一遍错了，没有把 2 当做临界点！
	if (n <= 2) {
		return n;
	}
	return fn(n - 2) + fn(n - 1);
}

console.log(fn(10));

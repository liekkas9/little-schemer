const member = require('./member');

// 将两个 set 结合（set 内部没有重复项）
// 只需要处理一个 set，重复则丢弃。不重复则继续怼
// 如果不是 set 呢？  则各自去重复，然后用 union 的逻辑合并即可
function union(arr1 = [], arr2 = []) {
	if (!arr1.length) {
		return arr2;
	}
	const [first, ...rest] = arr1;
	if (member(first, arr2)) {
		return union(rest, arr2);
	} else {
		return [first, ...union(rest, arr2)];
	}
}

const testData1 = ['stewed', 'tamotoes', 'and', 'macaroni', 'casserole'];
const testData2 = ['macaroni', 'and', 'cheese'];

console.log(union(testData1, testData2));

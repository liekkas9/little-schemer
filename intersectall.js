const interSect = require('./intersect');

// !!!注意，这里的思维是反向的，是第一个把rest 先处理，最后处理first 的例子，注意思维上是反过来的
function interSectAll(arr = []) {
	if (arr.length === 1) {
		const [first] = arr;
		return first;
	} else {
		const [first, ...rest] = arr;
		// 这里 rest 在纵向上少了一维，所以继续处理 rest 才是对的。
		// 本来就是的：但是被二维的思路给干扰了。。
		// 最后其实是倒过来合并的。😌：思维误区
		return interSect(first, interSectAll(rest));
	}
}

const testData = [
	[6, 'peer', 'and'],
	[3, 'peaches', 'and', 6, 'petters'],
	[8, 'pears', 'and', 6, 'plums'],
	['and', 6, 'prunes', 'with', 'some', 'apples']
];

console.log(interSectAll(testData));

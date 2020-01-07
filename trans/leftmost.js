// 递归替换掉全部单词
function leftMost(arr = []) {
	if (!arr.length) {
		return null;
	} else {
		const [first] = arr;
		if (typeof first === 'string') {
			return first;
		} else {
			return leftMost(first);
		}
	}
}

const testData = [
	['banana'],
	['split', [['banana', 'ice'], ['create', 'banana'], 'sherbet']],
	['banana'],
	['bread'],
	['banana', 'brandy']
];

const ret = leftMost(testData);
console.log(ret);

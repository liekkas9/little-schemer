function firsts(arr = []) {
	if (!arr.length) {
		return arr;
	} else {
		const [first, ...rest] = arr;
		if (!Array.isArray(first)) {
			throw new Error('每一项必须是一个数组');
		}
		return [first[0], ...firsts(rest)];
	}
}
const ret = firsts([
	['a', 'b'],
	['c', 'd']
]);

console.log(ret);

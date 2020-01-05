// 递归替换掉全部单词
function subst(newVal = '', oldVal = '', arr = []) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		if (typeof first === 'string') {
			if (first === oldVal) {
				return [newVal, ...subst(newVal, oldVal, rest)];
			} else {
				return [first, ...subst(newVal, oldVal, rest)];
			}
		} else {
			return [
				subst(newVal, oldVal, first),
				...subst(newVal, oldVal, rest)
			];
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

const ret = subst('orange', 'banana', testData);
console.log(ret);
console.log(JSON.stringify(ret, null, 2));

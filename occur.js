function occur(target = '', arr = []) {
	if (!arr.length) {
		return 0;
	} else {
		const [first, ...rest] = arr;
		if (typeof first === 'string') {
			if (target === first) {
				return 1 + occur(target, rest);
			} else {
				return occur(target, rest);
			}
		} else {
			return occur(target, first) + occur(target, rest);
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

const ret = occur('banana', testData);
console.log(ret);

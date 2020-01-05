function insertR(newVal, oldVal, arr) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		if (typeof first === 'string') {
			if (first === oldVal) {
				return [first, newVal, ...insertR(newVal, oldVal, rest)];
			} else {
				return [first, ...insertR(newVal, oldVal, rest)];
			}
		} else {
			return [
				insertR(newVal, oldVal, first),
				...insertR(newVal, oldVal, rest)
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

const ret = insertR('lxf', 'banana', testData);
console.log(JSON.stringify(ret, null, 2));

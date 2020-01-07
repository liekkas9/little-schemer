function value(nexp) {
	if (typeof nexp === 'number') {
		return nexp;
	} else {
		const [first, op, right] = nexp;
		if (op === '+') {
			if (typeof first === 'number') {
				return first + value(right);
			} else {
				return value(first) + value(right);
			}
		} else if (op === '*') {
			if (typeof first === 'number') {
				return first * value(right);
			} else {
				return value(first) * value(right);
			}
		} else {
			throw new Error('目前只支持 +  和 *');
		}
	}
}

const testData = [[3, '+', 5], '+', [[1, '+', 10], '*', 5]];

const ret = value(testData);
console.log(ret);

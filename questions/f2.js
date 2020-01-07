function member(a, arr = []) {
	if (!arr.length) {
		return false;
	} else {
		const [first, ...rest] = arr;
		if (first === a) {
			return true;
		} else {
			return member(a, rest);
		}
	}
}

function rember(a, arr = []) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		if (first === a) {
			return rember(a, rest);
		} else {
			return [first, ...rember(a, rest)];
		}
	}
}

// 实现了数组去重
function fn(arr = []) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		if (member(first, rest)) {
			return [first, ...fn(rember(first, rest))];
		} else {
			return [first, ...fn(rest)];
		}
	}
}

const testData = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5];

console.log(fn(testData));

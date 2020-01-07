const member = require('./member');

function set(arr = []) {
	if (!arr.length) {
		return true;
	} else {
		const [first, ...rest] = arr;
		return !member(first, rest) && set(rest);
	}
}

const testData = ['a', 'b', 'c'];
console.log(set(testData));

const testData1 = ['a', 'b', 'c', 'b'];
console.log(set(testData1));

const testData2 = ['a', 'b', 'c', 'a', 'b'];
console.log(set(testData2));

const testData3 = ['a', 'b', 'c', 'd', 'e'];
console.log(set(testData3));

const multiRember = require('./multirember');

// 拿到第一项，以及清除第一项之后的每一项，这个很骚！
function makeSet(arr = []) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		const delRestFirst = multiRember(first, rest);
		return [first, ...makeSet(delRestFirst)];
	}
}

module.exports = makeSet;

// const testData = ['a', 'b', 'c', 'd', 'a', 'e', 'b', 'c'];

// console.log(makeset(testData));

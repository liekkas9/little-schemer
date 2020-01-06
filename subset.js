const member = require('./member');
function subSet(set1, set2) {
	if (!set1.size || set1.size > set2.size) {
		return true;
	} else {
		const [first, ...rest] = set1;
		return member(first, Array.from(set2)) && subSet(new Set(rest), set2);
	}
}

module.exports = subSet;

const testData1 = new Set([5, 'chicken', 'wings']);
const testData2 = new Set([
	5,
	'hamburgers',
	2,
	'pieces',
	'fried',
	'chicken',
	'and',
	'light',
	'duckling',
	'wings'
]);

console.log(subSet(testData1, testData2));

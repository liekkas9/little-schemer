const member = require('./member');
function subSet(set1, set2) {
	if (!set1.length || set1.length > set2.length) {
		return true;
	} else {
		const [first, ...rest] = set1;
		return member(first, set2) && subSet(rest, set2);
	}
}

module.exports = subSet;

const testData1 = [5, 'chicken', 'wings'];
const testData2 = [
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
];

console.log(subSet(testData1, testData2));

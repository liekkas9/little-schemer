const subSet = require('../subset');

// 这个思路太骚了！
// 本能想法，一个个对比。。但须知 set 是木有顺序的
// 须知：set 和 list 不一样
function eqSet(set1 = [], set2 = []) {
	return subSet(set1, set2) && subSet(set2, set1);
}

const testData1 = ['a', 'b', 'c'];
const testData2 = ['a', 'b', 'c'];

console.log(eqSet(testData1, testData2));

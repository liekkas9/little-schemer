const member = require('./member');
// 很简单的题目，一开始理解成了相互有子元素，踩坑了。。
// 但即使是相互有子元素这个想法：也不应该卡死。。。
// 这里还是存在思维误区：相互有子元素，其实就是「1 至少有一个在 2」&& 「2 至少有一个在 1」
// 也就是 interSect 用两遍。。。
//!!!以后涉及到相互的地方，注意拆分为两个不同的只问题，切记！！！！
function interSect(arr1 = [], arr2 = []) {
	if (!arr1.length) {
		return [];
	} else {
		const [first, ...rest] = arr1;
		if (member(first, arr2)) {
			return [first, ...interSect(rest, arr2)];
		} else {
			return interSect(rest, arr2);
		}
	}
}

const testData1 = ['stewed', 'tomatoes', 'and', 'macarani'];
const testData2 = ['macarani', 'and', 'cheese'];

// console.log(interSect(testData1, testData2));

module.exports = interSect;

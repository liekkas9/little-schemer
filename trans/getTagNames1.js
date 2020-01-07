function getTagName(arr = []) {
	if (!arr.length) {
		return [];
	}
	const [first, ...rest] = arr;
	const children = (first.children && Array.from(first.children)) || [];
	return [first.tagName, ...getTagName(children), ...getTagName(rest)];
}
console.log(getTagName([document.body]));

// 这个方法其实有问题的：
// 如果有子元素，则自己跟子元素在一级——但是缩进了。。
function getTagName1(arr = []) {
	if (!arr.length) {
		return [];
	}
	return arr.map(item => {
		const children = (item.children && Array.from(item.children)) || [];
		if (children) {
			// 隐式缩进，这里就开始翻车了。。
			return [item.tagName, ...getTagName1(children)];
		} else {
			return item.tagName;
		}
	});
}

console.log(getTagName1([document.body]));

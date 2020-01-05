// 这是个错误的示范，因为互递归了。。
// 感觉递归的输入必须是一个数组，这个从那个 dom 拍平得到验证。。需要去 SICP 上找到论据
function getTagName(root) {
	const children = Array.from(root.children || []);
	const tagName = root.tagName;
	if (!children.length) {
		return [tagName];
	} else {
		// 仅仅是当前元素和当前元素的子元素拍平
		// 一个很现实的反例！！！如果子元素没有 children，则子元素本身就是个数组
		// 如果子元素有 chidren，则子元素会跟其 chidren 在意
		// 也就是说，当前元素，会跟当前元素的「子元素组」拍平，而不是每一个。。
		// 一个结论：出现了 map，就一定会有嵌套？？？？
		// 或者说，map 是递归的敌人？？？
		return [tagName, ...mapChildren(children)];
	}
}

// 只要出现来了 map，一定会有嵌套！！！似乎是规律？？？？
// 所以这俩完全没法合并啊！
function mapChildren(arr = []) {
	if (!arr.length) {
		return [];
	}
	const [first, ...rest] = arr;
	return [...getTagName(first), ...mapChildren(rest)];
}

getTagName(document.body);

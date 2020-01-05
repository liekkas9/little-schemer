function getTagName(root) {
	const children = Array.from(root.children || []);
	const tagName = root.tagName;
	if (!children.length) {
		return [tagName];
	} else {
		return [tagName, ...mapChildren(children)];
	}
}

function mapChildren(arr = []) {
	if (!arr.length) {
		return [];
	}
	const [first, ...rest] = arr;
	return [...getTagName(first), ...mapChildren(rest)];
}

getTagName(document.body);

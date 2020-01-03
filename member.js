function member(a = '', lat = []) {
	if (!lat.length) {
		return false;
	}
	const [first, ...rest] = lat;
	if (a === first) {
		return true;
	} else {
		return member(a, rest);
	}
}
const ret = member('a', ['b', 'c']);
console.log(ret);

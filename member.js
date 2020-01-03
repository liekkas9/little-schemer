function member(a = '', lat = []) {
	if (!lat.length) {
		return false;
	} else {
		const [first, ...rest] = lat;
		return a === first || member(a, rest);
	}
}
// const ret = member('a', ['b', 'a']);
// console.log(ret);

module.exports = member;

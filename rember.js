function rember(a = '', lat = []) {
	if (!lat.length) {
		return lat;
	} else {
		const [first, ...rest] = lat;
		if (first === a) {
			return rest;
		} else {
			return [first, ...rember(a, rest)];
		}
	}
}

module.exports = rember;

const ret = rember('a', ['b']);
console.log(ret);

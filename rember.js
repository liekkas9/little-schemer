function rember(a = '', lat = []) {
	if (!lat.length) {
		return [];
	} else {
		const [first, ...rest] = lat;
		if (typeof first === 'string') {
			if (first === a) {
				return rember(a, rest);
			} else {
				return [first, rember(a, rest)];
			}
		} else {
			return [...rember(a, first), ...rember(a, rest)];
		}
	}
}

module.exports = rember;

const ret = rember('a', ['b', ['a']]);
console.log(ret);

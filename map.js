Array.prototype._map = function(fn) {
	function localMap(arr = []) {
		if (!arr.length) {
			return [];
		} else {
			const [first, ...rest] = arr;
			return [fn.call(this, first), ...localMap(rest)];
		}
	}
	return localMap(this);
};

const arr = [1, 2, 3];
const fn = x => x + 1;

const ret = arr._map(fn);
console.log(ret);

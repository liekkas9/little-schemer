Array.prototype._map = function(fn) {
	const [first, ...rest] = this;
	return [fn.call(this, first), ...rest.map(fn)];
};

const arr = new Array(1, 2, 3);

const fn = x => x + 1;

console.log(arr._map(fn));

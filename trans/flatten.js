function flatten(arr = []) {
	if (!arr.length) {
		return [];
	}
	const [first, ...rest] = arr;
	return [first, ...flatten(first.children), ...flatten(rest)];
}
const routes = [
	{ path: 'a' },
	{
		path: 'b',
		children: [
			{
				path: 'g'
			}
		]
	},
	{
		path: 'c',
		children: [
			{
				path: 'e',
				children: [{ path: 'f' }]
			}
		]
	},
	{ path: 'd' }
];

const ret = flatten(routes);
console.log(JSON.stringify(ret, null, 2));

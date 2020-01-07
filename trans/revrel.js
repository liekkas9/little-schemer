function revrel(arr = []) {
	if (!arr.length) {
		return [];
	} else {
		const [first, ...rest] = arr;
		const [a, b] = first;¬
		return [[b, a], ...revrel(rest)];
	}
}

const testData1 = [
	['a', 8],
	['pie', 'pumpkin'],
	['sick', 'got']
];
console.log(revrel(testData1));

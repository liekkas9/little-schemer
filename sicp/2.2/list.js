function pair(x, y) {
  return (m) =>
    m === 0 ? x : m === 1 ? y : error(m, 'Argument not 0 or 1 in pair');
}
function head(z) {
  return z(0);
}
function tail(z) {
  return z(1);
}

const list = (...args) => {
  const len = args.length;
  if (len === 1) {
    return [args[0], null];
  }
  const [first, ...rest] = args;
  return [first, list(...rest)];
};

console.log(JSON.stringify(list(1, 2, 3, 4, 5)));

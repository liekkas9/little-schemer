const { list: makeList, head, tail } = require('./list');

const lastPair = (list) => {
  if (list[1] === null) {
    return list;
  }
  return lastPair(list[1]);
};

const testList = makeList(23, 72, 149, 34);

console.log(lastPair(testList));

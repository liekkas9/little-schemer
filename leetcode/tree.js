const treeData = {
  v: 1,
  l: {
    v: 2,
    l: { v: 4 },
    r: { v: 5, l: { v: 7 }, r: { v: 8 } }
  },
  r: {
    v: 3,
    r: { v: 6 }
  }
}



const printNodeByLevel = (tree) => {
  for (let level = 0; ; level++) {
    if (!printNodeAtLevel(tree, level)) {
      break;
    }
    console.log("level_" + level);
  }
}

// 其实很蠢，当层次大于一定的情况下，效率很低，汇总起来效率极低
const printNodeAtLevel = (tree, level) => {
  if (!tree || level < 0) {
    return 0;
  }
  if (level === 0) {
    console.log(tree.v);
    return 1;
  }
  const { l, r } = tree;
  return printNodeAtLevel(l, level - 1) + printNodeAtLevel(r, level - 1)
}

printNodeByLevel(treeData);

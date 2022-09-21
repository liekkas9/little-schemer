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



// 类似于暴力求解的方式搞出来了，很蠢
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

// printNodeByLevel(treeData);


/**
 * cur/last 新引入作为游标，大概率来说，其实会有三个变量：cur、last、queue.length
 * 外层： cur 和 queue.length 对比，作为程序结束的标志
 * 内层**cur 和 last 对比，作为窗口的标志，cur 会递增，最后跟last对比**
 * 当 cur 和 last 一致时，last会突变为queue.length，形成另外一个窗口
 * cur的特点：一步步往前走，绝对不会突变
 * last的特点：跟cur 形成一个窗口，会突变形成另外一个窗口
 */
const printNodeByLevelV1 = (tree) => {
  const queue = [tree];
  let cur = 0, last = 0;
  while (cur < queue.length) {
    // 形成一个新窗口
    last = queue.length;
    console.log('window_change');
    // 窗口访问，一个个枚举出来，制造一个新的窗口
    // 第一层1个，第二层2个，每一层集中在这里访问，所派生出来的子节点都会append到queue
    // 当前层梳处理完毕后，cur===last是当前层的终点，也是下一个层次的起点，queue.length 是下一层次的末尾点
    while (cur < last) {
      const curNode = queue[cur];
      console.log(curNode.v);
      if (curNode.l) {
        queue.push(curNode.l);
      }
      if (curNode.r) {
        queue.push(curNode.r);
      }
      cur++;
    }
  }
}

const windowExample = (tree) => {
  const queue = [tree];
  let cur = 0, last = 0;
  while (cur < queue.length) {
    last = queue.length;
    console.log("window_change");
    // 这里如果跳出，说明cur===last了，一次窗口检索完成！
    while (cur < last) {
      const curNode = queue[cur];
      console.log(curNode.v);
      if (curNode.l) {
        queue.push(curNode.l);
      }
      if (curNode.r) {
        queue.push(curNode.r);
      }
      cur++;
    }
  }
}

// 连续三个数字的最大和

const arrData = [
  -2,
  3,
  5,
  2,
  1,
  -1,
  -4,
  4,
  -1,
  -1,
  -1,
  -1,
  -4,
  -2,
  0,
  4,
  -1,
  4,
  5
]

/**
 * 跟二叉树分层次遍历很不一样
 * 外部的while 是一致的
 * cur的递增也是一致的
 * 窗口构成不一致：分层是cur和last对比期间会动态改变数组长度，用 last 与 queue.length 对齐实现的
 * 本窗口实现：last=cur+2，窗口大小是固定的，且提前声明，复杂度减少了好多！
 */
const maxThree = (arr = []) => {
  let cur = 0, last = 0;
  let sum = -10000;
  while (cur <= arr.length - 3) {
    last = cur + 2;
    _sum = arr[cur] + arr[cur + 1] + arr[last];
    if (_sum > sum) {
      sum = _sum;
    }
    cur = cur + 1;
  }
  return sum;
}
// maxThree(arrData);

const findMiniStr = (str, target) => {
  const targetArr = target.split('');
  let cur = 9, last = 0;
  let retTarget = str;
  while (cur <= str.length - 4) {
    last = cur + 3;
    while (last <= str.length) {
      const subStr = str.slice(cur, last);
      const isContain = targetArr.every(char => subStr.indexOf(char) > -1);
      if (isContain && subStr.length < retTarget.length) {
        retTarget = subStr;
        break;
      }
      last++;
    }
    cur++;
  }
  console.log('最终结果子串', retTarget);
  return retTarget;
}

// findMiniStr("ADOBECODEBANC", 'ABC')



// lengthOfLongestSubstring("abcabcbb");

// printNodeByLevelV1(treeData);

const findAnagrams = (str, target) => {
  const targetArr = target.split('');
  const retArr = [];
  let cur = 0, last = 0;
  while (cur < str.length) {
    last = cur + 3;
    const subStr = str.slice(cur, last);
    if (subStr !== target && targetArr.every(char => subStr.indexOf(char) > -1)) {
      retArr.push(cur);
    }
    cur++;
  }

  console.log(retArr);
  return retArr;
}
// findAnagrams("cbaebabacd", "abc");

// 倒过来输出：这里不能想太多… 正向可以输出，稍微加一点点数据结构，输出倒序就行了。而不是用其他手段
const printNodeByLevelV2 = (tree) => {
  const queue = [tree];
  let cur = 0, last = 1;
  const arr = [];
  while (cur < queue.length) {
    last = queue.length;
    console.log('level____');
    const item = [];
    while (cur < last) {
      const curNode = queue[cur];
      console.log(curNode.v);
      item.push(curNode.v);
      if (curNode.l) {
        queue.push(curNode.l);
      }
      if (curNode.r) {
        queue.push(curNode.r);
      }
      cur++;
    }
    arr.push(item);
  }
  console.log(JSON.stringify(arr, null, 2))
}


var findMaxAverage = function (nums, k) {
  if (nums.length === k) {
    return nums.reduce((pre, cur) => pre + cur, 0) / k
  }
  let maxAverage;
  let cur = 0, last = 0;
  while (cur < nums.length) {
    last = cur + k;
    if (last > nums.length) {
      break;
    }
    let subTotal = 0;
    for (let i = cur; i < last; i++) {
      subTotal += nums[i];
    }
    const _maxAverage = subTotal / k;
    if (!maxAverage || _maxAverage > maxAverage) {
      maxAverage = _maxAverage;
    }
    cur++;
  }
  return maxAverage;
};
// console.log("findMaxAverage", findMaxAverage([0, 1, 1, 3, 3], 4))

// 还是没搞懂，这里为什么超时了。。
var containsNearbyDuplicate = function (nums, k) {
  if (nums.length <= 1) {
    return false;
  }
  const numsLen = nums.length;
  let cur = 0, last = 0;
  let isDuplicate = false;
  while (cur < numsLen) {
    last = cur + k;
    if (last > nums.length - 1) {
      last = nums.length - 1;
    }
    const set = new Set();
    for (let i = cur; i <= last; i++) {
      const num = nums[i];
      const isInSet = set.has(num);
      if (isInSet) {
        isDuplicate = true;
        break;
      } else {
        set.add(num);
      }
    }
    if (isDuplicate) {
      break;
    }
    cur++;
  }
  return isDuplicate;
};



var findMaxAverageV1 = function (nums, k) {
  let sum = 0;
  const numsLen = nums.length;
  for (let i = 0; i < k; i++) {
    sum += nums[i]
  }
  let maxSum = sum;
  for (let i = k; i < numsLen; i++) {
    sum = sum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
};

var countGoodSubstrings = function (s) {
  if (s.length < 3) {
    return 0;
  }
  const goodSubStrArr = [];
  let chars = [];
  for (let i = 0; i < 3; i++) {
    chars.push(s[i]);
  }
  if (chars[0] !== chars[1] && chars[1] !== chars[2] & chars[0] !== chars[2]) {
    goodSubStrArr.push(chars.join(''));
  }
  for (let i = 3; i < s.length; i++) {
    chars.shift();
    chars.push(s[i]);
    if (chars[0] !== chars[1] && chars[1] !== chars[2] & chars[0] !== chars[2]) {
      goodSubStrArr.push(chars.join(''));
    }
  }
  return goodSubStrArr.length;
};


const isNiceStr = (inputStr) => {
  let retBool = true;
  if (inputStr.length <= 1) {
    return false;
  }
  const duArr = Array.from(new Set(inputStr));
  if (duArr / 2 === 1) {
    return !retBool;
  }
  const duSet = new Set(duArr);
  for (let i = 0; i < duArr.length; i++) {
    const iChar = duArr[i];
    if (duSet.has(iChar) && duSet.has(iChar.toUpperCase()) && duSet.has(iChar.toLowerCase())) {
      continue;
    }
    else {
      retBool = false;
      break;
    }
  }
  return retBool;
}

var longestNiceSubstring = function (s) {
  if (isNiceStr(s)) {
    return s;
  }
  const sLen = s.length;
  let maxLen = sLen - 1;
  let retNiceArr = '';
  while (maxLen > 1) {
    if (retNiceArr) {
      break;
    }
    const niceArr = [];
    for (let i = 0; i < maxLen; i++) {
      niceArr.push(s[i]);
    }
    const _niceStr = niceArr.join('');
    if (isNiceStr(_niceStr)) {
      retNiceArr = _niceStr;
      break;
    }
    for (let i = maxLen; i < sLen; i++) {
      niceArr.shift();
      niceArr.push(s[i]);
      const _niceStr = niceArr.join('');
      if (isNiceStr(_niceStr)) {
        retNiceArr = _niceStr;
        break;
      }
    }
    maxLen--;
  }
  return retNiceArr;
};

var quickSort = function (arr) {
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};

var divisorSubstrings = function (num, k) {
  let ret = 0;
  const numStr = String(num);
  const tmpArr = [];
  for (let i = 0; i < k; i++) {
    tmpArr.push(numStr[i]);
  }
  let subNum = Number(tmpArr.join(''));
  if (subNum !== 0) {
    if (num % subNum === 0) {
      ret++;
    }
  }
  for (let i = k; i < numStr.length; i++) {
    tmpArr.shift();
    tmpArr.push(numStr[i]);
    subNum = Number(tmpArr.join(''));
    if (subNum !== 0) {
      if (num % subNum === 0) {
        ret++;
      }
    }
  }
  return ret;
};

var minimumRecolors = function (blocks, k) {
  let ret = Number.MAX_SAFE_INTEGER;
  const tmpArr = [];
  for (let i = 0; i < k; i++) {
    tmpArr.push(blocks[i]);
  }
  ret = Math.min(ret, tmpArr.filter(item => item === 'W').length);
  if (ret === 0) {
    return ret;
  }
  for (let i = k; i < blocks.length; i++) {
    tmpArr.shift();
    tmpArr.push(blocks[i]);
    ret = Math.min(ret, tmpArr.filter(item => item === 'W').length);
    if (ret === 0) {
      break;
    }
  }
  return ret;
};


var lengthOfLongestSubstring = function (s) {
  const sLen = s.length;
  if (sLen === Array.from(new Set(s)).length) {
    return sLen
  }
  let ret = 0;
  let k = sLen - 1;
  while (k > 0) {
    const tmpArr = [];
    if (ret > 0) {
      break;
    }
    for (let i = 0; i < k; i++) {
      tmpArr.push(s[i]);
    }
    console.log(k, tmpArr)
    if ((new Set(tmpArr)).size === tmpArr.length) {
      ret = tmpArr.length;
      break;
    }
    for (let i = k; i < sLen; i++) {
      tmpArr.shift();
      tmpArr.push(s[i]);
      if ((new Set(tmpArr)).size === tmpArr.length) {
        ret = tmpArr.length;
        break;
      }
    }
    k--;
  }
  return ret;
};

var minSubArrayLen = function (target, nums) {
  let ret = Number.MAX_SAFE_INTEGER;
  const preSum = [];
  for (let i = 0; i < nums.length; i++) {
    if (i === 0) {
      preSum[0] = nums[0];
    } else {
      preSum[i] = nums[i] + preSum[i - 1];
    }
  }
  if (preSum[preSum.length - 1] < target) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (preSum[i] >= target) {
      ret = Math.min(ret, i + 1);
      for (let j = 0; j < i; j++) {
        if (preSum[i] - preSum[j] >= target) {
          ret = Math.min(ret, i - j);
        }
      }
    }
  }
  return ret;
};

var longestSubstring = function (s, k) {
  const preSum = [];
  console.time('preSum')
  for (let i = 0; i < s.length; i++) {
    if (i === 0) {
      preSum[0] = {
        [s[0]]: 1
      }
    } else {
      const s_i = s[i];
      const preMap_i_1 = preSum[i - 1];
      const s_i_count = preMap_i_1[s_i] || 0;
      preSum[i] = {
        ...preMap_i_1,
        [s_i]: s_i_count + 1
      }
    }
  }
  const lastPreSum = preSum[preSum.length - 1];
  const targetKeys = new Set();;
  Object.keys(lastPreSum).forEach(key => {
    if (lastPreSum[key] >= k) {
      targetKeys.add(key);
    }
  })
  let maxLen = 0;
  for (let i = 0; i < s.length; i++) {
    const s_i = s[i];
    if (!targetKeys.has(s_i)) {
      continue;
    }
    const curSum = preSum[i];
    const isOk = Object.keys(curSum).every(key => {
      return curSum[key] >= k
    });
    if (isOk) {
      maxLen = Math.max(maxLen, i + 1);
    } else {
      for (let j = 0; j < i; j++) {
        const s_j = s[j];
        const diffObj = {}
        const firstPreSum = preSum[j];
        Object.keys(curSum).forEach(key => {
          if (!Number.isInteger(firstPreSum[key])) {
            diffObj[key] = curSum[key];
          }
          if (curSum[key] - firstPreSum[key] > 0) {
            diffObj[key] = curSum[key] - firstPreSum[key];
          }
        });
        const isOk = Object.keys(diffObj).every(key => {
          return diffObj[key] >= k
        });
        if (isOk) {
          maxLen = Math.max(maxLen, i - j);
          break;
        }
      }
    }
  }
  return maxLen;
};

var characterReplacement = function (s, k) {
  let max = 0;
  const sLen = s.length;
  const preSum = [];
  for (let i = 0; i < sLen; i++) {
    const s_i = s[i];
    if (i === 0) {
      preSum[0] = { [s_i]: 1 }
    } else {
      preSum[i] = {
        ...preSum[i - 1],
        [s_i]: preSum[i - 1][s_i] ? preSum[i - 1][s_i] + 1 : 1
      }
    }
  }
  let cur = 0, last = 0;
  while (cur < sLen) {
    last = cur + 1;
    while (last < sLen + 1) {
      const subStr = s.slice(cur, last);
      console.log(subStr, preSum[cur], preSum[last]);
      last++;
    }
    cur++;
  }

  return max;
};


var twoSum = function (nums, target) {
  const map = new Map();
  nums.forEach((num, index) => {
    map.set(num, index);
  });
  let ret = [];
  const numsLen = nums.length;

  for (let i = 0; i < numsLen; i++) {
    const num = nums[i];
    const minus = target - num;
    if (map.has(minus)) {
      const minusPos = map.get(minus);
      if (minusPos !== i) {
        ret = [i, minusPos];
        break;
      }
    }
  }
  return ret;
};


var isPalindrome = function (x) {
  let isOk = true;
  const numStr = String(x);
  const numStrLen = numStr.length;
  for (let i = 0; i < numStrLen; i++) {
    if (numStr[i] !== numStr[numStrLen - 1 - i]) {
      isOk = false;
      break;
    }
  }
  return isOk;
};
var longestCommonPrefix = function (strs) {
  let minCountTime = Number.MAX_SAFE_INTEGER;
  let minStr = '';
  strs.forEach(str => {
    minCountTime = Math.min(minCountTime, str.length);
  });
  for (let i = 0; i < minCountTime; i++) {
    const set = new Set();
    strs.forEach(str => {
      set.add(str[i]);
    });
    if (set.size > 1) {
      break;
    }
    minStr += Array.from(set)[0];
  }
  return minStr;
};

var isValid = function (s) {
  if (s.length % 2 === 1) {
    return false;
  }

  const stack = [];
  const sLen = s.length;
  for (let i = 0; i < sLen; i++) {
    const s_i = s[i];
    stack.push(s_i);
    if (s_i === '}') {
      const pairPart = stack[stack.length - 2];
      if (pairPart !== '{') {
        break;
      }
      stack.pop();
      stack.pop();
    }
    if (s_i === ']') {
      const pairPart = stack[stack.length - 2];
      if (pairPart !== '[') {
        break;
      }
      stack.pop();
      stack.pop();
    }
    if (s_i === ')') {
      const pairPart = stack[stack.length - 2];
      if (pairPart !== '(') {
        break;
      }
      stack.pop();
      stack.pop();
    }
  }
  return !stack.length;
};


var removeDuplicates = function (nums) {
  const numsLen = nums.length;
  const set = new Set();
  for (let i = 0; i < numsLen; i++) {
    const num_i = nums[i];
    if (!set.has(num_i)) {
      set.add(num_i);
    }
  }
  return Array.from(set);
};

// console.log(removeDuplicates([1, 1, 2]))
var lengthOfLastWord = function (s) {
  const arr = s.split(' ').filter(item => !!item)
  const lastItem = arr.length ? arr[arr.length - 1] : '';
  return lastItem.length;
};


var pivotIndex = function (nums) {
  const numsLen = nums.length;
  let pivot = -1;
  const preSum = [];
  for (let i = 0; i < numsLen; i++) {
    preSum[i] = i === 0 ? nums[0] : preSum[i - 1] + nums[i]
  }
  for (let i = 0; i < numsLen; i++) {
    if ((preSum[i - 1] || 0) === preSum[numsLen - 1] - preSum[i]) {
      pivot = i;
    }
    if (pivot > -1) {
      break;
    }
  }
  return pivot;
};

let outCount = 0;
let innerCount = 0;

var minWindow = function (s, t) {
  const sLen = s.length;
  const needMap = new Map();
  const tSet = new Set();
  for (let i = 0; i < t.length; i++) {
    const char = t[i];
    tSet.add(char);
    if (!needMap.has(char)) {
      needMap.set(char, 1);
    } else {
      needMap.set(char, needMap.get(char) + 1);
    }
  }
  let left = 0, right = 0;
  let retStr = '';
  const computedMap = new Map(needMap);
  while (right < sLen) {
    let rChar = s[right]
    if (computedMap.has(rChar)) {
      computedMap.set(rChar, computedMap.get(rChar) - 1);
      if (computedMap.get(rChar) === 0) {
        computedMap.delete(rChar);
      }
    }
    if (computedMap.size === 0) {
      while (left < sLen) {
        const subStr = s.slice(left, right + 1);
        if (!retStr) {
          retStr = subStr;
        }
        retStr = retStr.length > subStr.length ? subStr : retStr;
        console.log(retStr);
        const rChar = s[left];
        left++;
        if (needMap.has(rChar)) {
          computedMap.set(rChar, 1);
          break;
        }
      }
    }
    right++;
  }
  return -1;
};

// console.log(minWindow("ADOBECODEBANC", "ABC"))

// console.log(minWindow(
//   "kgfidhktkjhlkbgjkylgdracfzjduycghkomrbfbkoowqwgaurizliesjnveoxmvjdjaepdqftmvsuyoogobrutahogxnvuxyezevfuaaiyufwjtezuxtpycfgasburzytdvazwakuxpsiiyhewctwgycgsgdkhdfnzfmvhwrellmvjvzfzsdgqgolorxvxciwjxtqvmxhxlcijeqiytqrzfcpyzlvbvrksmcoybxxpbgyfwgepzvrezgcytabptnjgpxgtweiykgfiolxniqthzwfswihpvtxlseepkopwuueiidyquratphnnqxflqcyiiezssoomlsxtyxlsolngtctjzywrbvajbzeuqsiblhwlehfvtubmwuxyvvpwsrhutlojgwktegekpjfidgwzdvxyrpwjgfdzttizquswcwgshockuzlzulznavzgdegwyovqlpmnluhsikeflpghagvcbujeapcyfxosmcizzpthbzompvurbrwenflnwnmdncwbfebevwnzwclnzhgcycglhtbfjnjwrfxwlacixqhvuvivcoxdrfqazrgigrgywdwjgztfrbanwiiayhdrmuunlcxstdsrjoapntugwutuedvemyyzusogumanpueyigpybjeyfasjfpqsqotkgjqaxspnmvnxbfvcobcudxflmvfcjanrjfthaiwofllgqglhkndpmiazgfdrfsjracyanwqsjcbakmjubmmowmpeuuwznfspjsryohtyjuawglsjxezvroallymafhpozgpqpiqzcsxkdptcutxnjzawxmwctltvtiljsbkuthgwwbyswxfgzfewubbpowkigvtywdupmankbndyligkqkiknjzchkmnfflekfvyhlijynjlwrxodgyrrxvzjhoroavahsapdiacwjpucnifviyohtprceksefunzucdfchbnwxplhxgpvxwrmpvqzowgimgdolirslgqkycrvkgshejuuhmvvlcdxkinvqgpdnhnljeiwmadtmzntokqzmtyycltuukahsnuducziedbscqlsbbtpxrobfhxzuximncrjgrrkwvdalqtoumergsulbrmvrwjeydpguiqqdvsrmlfgylzedtrhkfebbohbrwhnhxfmvxdhjlpjwopchgjtnnvodepwdylkxqwsqczznqklezplhafuqcitizslzdvwwupmwqnlhxwlwozdogxekhasisehxbdtvuhrlucurbhppgsdoriyykricxpbyvxupencbqwsreiimclbuvbufudjrslsnkofobhptgkmmuuywizqddllxowpijhytvdkymzsulegfzfcjguojhzhxyyghhgbcllazmuuyzafahjjqgxznzinxgvgnbhrmuuljohjpkqpraahgajvzriyydengofskzgtppefzvwrvxadxjaydjydocqvsxpdyxyondvmyrfvqiaptanwllbaquxirmlqkmgzpbnputmldmcwoqvadwavqxeilraxdiwulmlffxsilvgcnbcsyeoqdsaolcorkmlxyzfdyznkuwmjxqcxusoxmqlxtzofocdmbiqzhflebzpbprajjqivhuvcvlhjnkwquosevfkzfzcwtcietqcamxcikltawrsshkydsiexkgvdidjbuldgkfqvrkxpdpjlakqsuurecmjkstomgrutzlqsxnjacuneedyzzrfbgpoykcmsvglwtdoqqztvugzakazlrhnxwdxifjccsozlrpckpxfldglpgnbauqzstxcaiecaudmotqyknfvsliiuvlurbvjwulwdsadmerazjyjydgrrobnmmjdpeplzcjcujhhpbhqmizlnhcgwftkrcnghctifcmbnvifwsvjcxwpeyycdrmwucedexnlbznquxvtpretoaluajxfajdwnhbugofjpuzmuxflolfenqynzxubjxawgbqmsyvhuwvotaajnfpaxqnwnjzwgzvmdnaxlxeiucwpcyzqfoqcegaspcqybnmgbndomkwgmvyqvxgblzfshimykeynslutaxjmjgvvdtmysubfvjxcrjddobsgombomkdvsatvvfwnzxsvgszzbccrgxzulclzpqvhsqfnvbcwywrfotgsxlldilatnntcfqmxgrkdsozsktzbogtlrerzrtuhiplnfxknqwsikudwncxdiqozxhaoavximjvuihjzdcjpwmmlploxeezbmzrmwrxlauficojhqtxohlzwwpwcuvfgwzuvqrgqmlaozmxshuiohingzjitgobcnwzdpfvdsxrujroqlwhvgubgdlzjzdnozptqwqurqnlzezssvznctokybljdoyrppngmdcdvpqvuppmmqbqlrajsmuvcupskcawhcbdrrangrbuhcnstndobzjgtyydcabkccpvtpjbgmyprljkamaelkkgkkmnknzosojnfupnhncyalkazlemxoshaewkuvymjkzqeqdlfflfsygrjmdidypdcmoyjoktykldapqiwenpcviniovnmkqqygpivbdvloaoftwcxltzhbmrrhedtuuudleamjvaxwqfrohozcpidbzxkfafcwbfjffwocyoaotrccfdeumjxngjthrvfsapyhnojlcmbxddzlidhwnhktqdcjykcazcjoqszveaskfsvnxckkjwgczknzupbvtkjmeihlkzvptqfrurdgnjkouxpqpqmicvugebrqdmgyenpbethrerhaqwrfodoqaiyemqxredpjqhkwctpgmwjcsaiifyyfiwmuojntmdeemqaolpwxnfbffjpmjnssleocncxbhbhttjjeyfdllessqjfzwxtjdilsmivvlcqglzmlepyrwskmbrnzqhivrwnfgiasmsaxrnkxeipaaboduccklmfckuhrcjlqblnuaxrfhihjlwofyqrleynpswiwhvmigbejavojgvsrtgztysefrrulpekwzwghakqaigkocehxnirlbvqspmfgqpdrolzowrqgycuchdzumqhnmyhdmojfeowsaxiypyenbapidoerhletlnyychdgwbayziwoicbjcsthixzplfkwtiwvsbdodfocpksxmvhqnczvaylnexjxgguyhzomecotoiqcdzuqctoesbrwyavgiresquewyvrmdhqhjkzleppwqgupirxtkcncytyxqpjuyadhmeuqulomtidcbbxlfmndfnawcmsdoxkadhtzshmmsrotsnfxzudgifcmtwpjtamzhfybmkneedawqhwrbzyjgawaznjunvtwcsypenvirvhhcdbgezrkbnmadyvsvopyippnckxviedmjgsnfkaizmjckgviwmghdvwhhtdpaicjowxvgzdglokyufgtroawjwesrhirrmbfiacrzfzmujmqpujiilftjlmdswulkxquzslyzkltuzmluxtcjawulkxfguqqrikrcwreiezeelpyjlaulyqziogqizgbhtsmrmqzqreudvsogviuvyveobuyadakwuwngomxfsrkomywhiqejlixnfwpiwzesxrznfwvapfobekkmdpxqzvdettopusjsliftgatwijzmvmaydypcvujopxfksocfxjydmrbuabiwpkwsklwfihtxhahzpleoxftjwvfzynxnzthkhfppnloulyvajbqigktdhyefnbunwdxfiowxzltljonuqgfwqybxzhemkybjdyolnnjmaczjtpfjvmhlllkkuoyhoaqrageptnetsdelumwpyfclsoxpewwsymlasqqofuhzxomucijaqookclzhjxbhjniefaukudkrrwlthxwznklpvnyfkaowpyauyugsxsmrrzmayiblsmdqzdxmfniuoiqoezjdtvukwhmxrnkkcncbtzpyoxvchnrlmarixnuvwhsowfayuccndrmrpjuwwnklnbtmqnhnwcbthbrbfvpkndbemxaikmvzpqlgettcxwvezpfgmwqzzrfnriybutdmkosqjnsglqkkhsqtogvqzadsibudvzphnjxxyrfjhsvokniyvdowfupovlrskizxtwwroecxwzmgmwghbxdgruumfnfpxensdlltpnqloeraayjdxpmojiapwhgvotorhbmypckdjdgjdrpagbosjrhhyndojthsutqlwcrfizqlqhozieruvabwpgmabusynljlncsvbljusztddkxbkyzbhlcifugthsexuxsykdsccnfixcljdkkkvmudjbwstcppbkplnhqsuvctanedxppudjxomvhhywzbgonwydquasoahsfejuangybsvkctjbxppknnpfirxyugszmcwnpcnswifycobbfrltgcaovaopghptjngartunbzofppgvitqpxqftquixbzqmmwmdrituijaxaiujckabbfwrbfqeggqveeaxntsxcuwfcrqgbqiexgybnofuxypdepbrltqpnnurgkyjcioaoobcciybgnflegerzvhokdfqofzsnpsedvgieejmtoxzuervzajldrbtwcmmsgqvcyfiepuzduayyrvztfkxylquneihlyfpykxczrddledlxykrfwofjgcznkgyllnjwkovdrarxfcvepmllatvivuvfcvsoickushylirjntetkqhwsatcvpyctvvheztardaenrncnrwxjfvbhqechegbzdifcegvhiauapwnhukqbiuiyamgethfwrnbvvyedyadozsxvfpxnlhllutrpaxnumorhnyknyqdziavpsucdbqpxjimmhaitqzadxltybwxlzsbrofwqxlnjwcvdcfxsexyektcnpbbqucjkjgahtqqpsntwssoyrocchgrzispewzoghrpajfqbulxmdnmuerylxqmhkenhfcpmvemelehfretwtftxwrlwjxfwdtdivuwsalwlpdsjjlfcqyapsnnbmsxqlcaiyxayiylzbdimoophorygelkqdhirmjzmgcloaynecyqsofbcyzjemtvscfjqokdumqknoarsyjnoroqpqbucwrwbwhtlswhgouvfuoxuykipbagreavatudqbxdvvmekgzpaqowobgfchlvlosnhotxsqcnnptxvtowlduzebgiirfvfzkpofmgxpvlgpibkxzvcuwivcqfvxcbwoqkueqrvmcbdnfnmeioaewxiocdlgehvwurdkkyypcdchqonaeoealmqqqbwwktvemyrxyrocvqlngzokpsmahcszfrvrmsyzsryrkmvfehvkgjwxdixkmsjtjhmvbkwubwnmiitopoaxxwudgunumznxiasjmrfqnscybxmsonqnlmquigowfetpeoasfgiuymsbmhuawmphagbjmsftwbkcpkuusdqrrjudqqdmetvfbzqprvkpwurnenjxsaqkjmnbdtphomorlegecqtammoqazpuzhekuunzpcidpxwcdcjhueigryytxqnzzujtqxufbdkscgxfkgpgkxmdxmwwemxegjzwgudjxncbvzifhxlrwzvtntssfpwnyxlgrosqduryvadcxqvupspdmjxtbvhbssimjacowwntysvvjsraljfxscqvxzxsuhedjirfegyczvakntkycqxxuqsuprmlysqhakofqojrjjbzdozhgxgapbwgskstciafsrkjfvapheqmsptaoccddzkxjeqomttfkfqpcsgjywvqopsctviwuuvfymvkhortvhiycrhapftdwlipgqlcmikkufwdwowtxhrbybcpgvvcidrpvethmdtjlpmhfjadqugqxifffchofafcgylueefpwuybdagvunntvuydxhrehwhpwukazrrvlpyqsflmsaipvguuolyxjhniczkdqcyetyuldiaxiipfojzexacghpqlqboidomwnhispkqzshfiqgnngpwqgmbwnqesgtrtabmrleqdlxldeatmrrcxfgvvycneveaxhoossgxfglimlbydudcajavhcilzpnwwbmrtuoaazjmlmlqhqshzseiwotxdjvckhteeheejprueemlwguvbydzmyxshswscpygyemhwfdajpnhyhczhhytivnpqjjsyjazqmgmsmoddblbipcpxbkhyawqjiiktkjjzrxrflwjmjmwbpnysahqafhjnrvjegsdaswfdsqsedofuefmemegrnrfhnolviovakdgetaiyonuusgyeneyawdjltugdkegwhobcojdezxztgzatgyvcdhpwbxbobhkixlnlxqqypprvotquroyuvpsynumodzzbmmmlecjvtdtiwjeozdiusdvhxhwcgxdvlsgpwqmqvfarrehqjsnevilurjwagcvrwbistviockitprkyjxcghqayzzygdtzzvirqfcfhmpbdgnesmgatydrycqgflheipxzwbggovjtdwxxigydedwefommausilphirpohmxasvypfepiksepzvblvvdfhvnrmehvrgvjbvagbsqmmwdmrezmcfslaheonljergpseqafkstwowiibkwfpoqrxwfnhqryyjsczukjmdfcaqkdchirxakxwpkfhbffkxkltuwfxehxwscybkpymzvkqfpzjuevtqjmkfrilbhhvkfwwwwjxutpzlokfviblrnwyhgkinrfzzbwxzhvtcmvnbhvwpwjilfhsntadmhclkyjkfgdksaxviutxqdgckpuyixbugfiretblzgvthvpppioilwmyliwvhzsoeafktgwumtnvqckinbqyxcwlkugstygaankttinhedfuhrcusstswrdjojbjkjjkyugtcvcgyhdgzfaravlwpohdaimktwwtscmwypdywigvnjppeaotrvyrglbbjzvbchxcwcctkjqashpykdubzssfdvgowbpalnchrhccsvekctkozepazjhegntdridcxilrpovjlzvnufctmttlfcpnqiqjtwnsgajxqegbdbrygvtuopfvrvjjfbsyxhrdkaaahickjtksoemetuakpjwwmqvkyopiqskxamkkhuexyqctkegbpcybsvnsjdcbvnzvbjhjfligekzoqhshlqjenwywbbxwqyurjbcpnlvrxuhqezxprgvefucgxcfnazgkalbpwwivqslwtlmlthrydwhaampcnyopjpfhlpcehqabdmowwhxzdecdsrihrwwambjxrmbaecbhqpfmxcmcioichqjbmgbyjlyczzdfbeoswvgvysziihlszwtocwomjmqkmtrpafjwdqtbksjvcwpdtkrxiglsuceivwyvdjtgbmjohvljrammmgkumvogztpvrpswaodeaosjjdsdfhprnblbzajyvavmpqksenwgcoqntkqytirglehketlbtiplyadepzntpdhkpxkjhbptfzfmsspnbfybfbiwcvqtyxdpwpyeqqzyrgklzbycgxdnankfiayizeyvtybmoakfjwsixrmgqptsffxnfywgcwcxudjjgvqrrjzralxscskhyixfitmkpqjjttubonsiwtbygaqlscuskrysmmedcopxjjbzytjupksxkkifnfxzyxuljyqloflzrmzpfikwveuhremejmfijzvtalgotrqkdpblznhwsdelisrtewdowyjwkpmdjcpmtqzvehrymxjwqaqwytmuuvsgnhlwjakfskayttwfrhejjufipsejpxrcecypeluxvwvqquxhdbqnxxxnpbyfyqjcukszvowsltibpfktjcggzdvrgwwfofjipdjmshefbmisuslfutlvyjmfhkkvstfhxpwrwawzpeslydquxdpvmeatomqgiwqflmyjmwjdadoaieufkldwpfseuimcgejtqhdfdoiftzfbfbjpmmmctginqwpxbysthxymljreiyinzrdmdrqyzampydozejvngtaueraosicrzhfcaxdzzrqyuhzaquoyqoswhtlzbprbyyfywizvbrvwyvyqrmpjajgicrjegaheboexzduauqyvnxngjcqmmwwqpfwvidbjufitkctgusbjrpqatiohekytsuqaatjuytpkvkqsesdvjvwedmmjxmepgupinaenvtxseqkiiogtlexpqlynxdeezvopvteqoejuuvfellxxpwofimvfrzlrvaisvmllswgmtlqfypenmsuugrbyrnropbgkptvipdujonqocudooykurmuibnwqofceyzoqdiztvpiylloblzxdnsnohmewtgcrfqhkaieyzowmbmnplluafhomvsioamiiersfaydboboqnbfbobbtiqgekqsldcthunouorvcsjuinbjbcmvlcdrptlayoviikweyqzdklxsabdbdqyqubhjxvlxjiftvexvuyyejyzlzcncuntprcaoxmniwtbrzynvxnbilaumdjrxykopopfodtwboyvpyikxxlilmcxrnoqlahdrwifbdberbzgahsxhefssjrjygbkiipzgxehdimujldjvxjebowtaneyvgkgqzfxzmgcusydgdpdbyjcohyowcpskzabbfyatecnzcthgimhgvlucllyqasazsdcadctkgjljcurmgaudnqhzbhpdarduxfwakqmqbxbfrurzuncidljhtykvrproxorhgdzhbdouxhusuycxkleflpccgttdjkkppmyqpmnmthgnhintvtygkclrweufqhxftvyiklwfudtdlixjbxpmaafygzfyicebaejmpirllmoyunhylzknbrlissgbxmcxqojhwcsjpjhjwphjotwpkjzfcigbwkynyjuwlpfaanmweviupelbqnguvovrzvgxedwrubuuqiqwdyqufcwxrermtofujotprpintchjkziqaykhcietnxhilpcudvlwntjgysrkrbaralyeteyibhsmwuibsvxhpippaizskalknkqiqqrsyjeugpwakvhbeyqggqyqskcfwtnmlggjqlgyceymzhqfhgmnwmgqykvufljrrpajcghgkhvmqltxrhlqutgsdepjpaairasujbcvjxhzidxckksedazgeopvqrehsybbbgykdimmllovxicaidiprakhrqqjqumsaledtsrgfhdcpfcailpbnbkeudokxcexplaifsqlbunrbstmdipslcwffmscpyzejbppvfcxbpqdhjrmtgeeibknnepecqjosafphhmjyeognfuglznwczlrddwfthvnjadqjrbiwpolwiskjhgngrhjudqqmmdvoinycpgagwldgfnqmtfsmmbjruzdgeawnqurfarlwcodidvuwcplpquimtosxormeldlouzkxnphrmdppsaglwoxpcsptjbzufnkbmvabmhublmsfoyqlooatiportpnacybovesjnmkaycgncwyrmakwsannpdnsdqiyuchipuipyqebpesdheazgpovsbpvtavqcfatzkjxbpaquutdyveelscdtrboryeudenepyesoeikzdpzztgmlkpgbsuvrzrwfgdufhmvnwhocwqdpypaigilzcgsdxqjetflcuiqspgulwxcuoeevmquowouwedcakncevuzkbtxztbwhfacrqyhnoblvgnvrazxxwwjxsgynhuwoxbfnzocqqnnyakrcjpzfniehqfuzbrnyssmthqlzeyxgipjugkbttgblnxloqynkrbgarrzxqyganpuvbwpuesgrrtfiruukvakpslmkmskbjhxlfohjgpczijjaeembexqykdiwxvyjevujjdurtwsdhcdliqnopfnbixyisyrytnheqbxjzpnhtsubkjqbpddzcbjxbavundaegxpgoepizljjvbnmgqljtvguxbqlgqrnpitdnknmvxxqakehcqqvnwpmzfxgxqtmzosoafcvebofosmqkemzcdmbllhiccxdsrtswvodweimwudjaricuudfgnqirpnkigcedshbyrovnreniopejtmpiezztolduqhzkrajkoeyhklrybwjwiaembfhprkljtktmncxdivluievjaehkhlyithymrjvnwqbjtymdvzyeevpgzxrikprdzprqaofyfhhahwffvdlbaaicxbkksbprshktvprcybcixinunyyoagqajckbeztwgdreulgvmldltshisfyunquwteyzgtvowpusabpomsbhmirgqqbdixcbeaaktyarnvlpwbdkvgtkqmqgetmnrooxqrhjrjceepvcqaooghywwqdamrnffecvxlgoukuzzrdsrsgxbgvxyaykrnrytttsebgblccntffmxnlzvhwthwgbmxzhtvaxwiaklcxgietfregonfhxdpyppzziwzhthifukcdsgyazegnslwrpmrgbqflpgskoapkntpfznhauopoblfszwzcoendlipbienvxfdyukaoapccbjuchvhwcubncrqnxfkvknvfawtalyeojbtrwapywqnbjfohlyexozcovyqjyvzhysywsnvpgkqpseydecasefibdzmdumkuelqxanmgyeyskyvodxjherkhqxmmjxgpkxmkkarkercqpzfszqzdhmnajzmuyvjiuytgymrfdvvsxclwsmbcaocjqqfolrzhpsopehwjcsbbwozpbbtbpxnhnuwblvicpwsvdqeiiflhwlwxmradoplbmjezencvlwqroubxbmexxcwjvzpjqamcjrepeikrgaiuwjrzwxxvbvhwuwflwuphltwrdgijiregcxfaveyyafxubehzyzgjueaymlhwelcgjhjgoheombkpgsqgtwqncslodvkhgmqrvzzjgezuhklpebwxxombgapkvztdnjxiiwuqctmkdxbhyzgxntywvngqobvblsmtpgmrbydfwfowgxuwsusniadwbaamtmikuubvufcsmtpuqlqifkxnkcmmcoavakfwgjrbqwtepkyhvrrbboqmqeasscqsnxotgiwwescvcbcyuvbvjrjzwjtoojjbhzwpjtopnqkptopnjqlskutigpyuyhxhjtxuonkbdwtzliowbzrlwktczrwabtjmoigfvsibpbacmqynspaocvqdoodrjndxvmetgnuvqwzcmyrgprurokvdaaujpahnmnguacstyrxmpptfinyxataawwklwtykggfjixegobtgsondblcdfeedaqoxlphrvocelimckhkevxhzilcppisqahplwyftnjxasmeetoiplsqudujtdelflarjywenheozqsdjhoaugqojnaeqepvrpocqmgdukrvcmzovpopvheguglmmcjdsyhimnlgafecrfsmuhbpqhxmpkabnjghjnrybcedjihanaojjsabbyptkpuxabemoxkrcqwlbeoqgeapwasaahtlwpiyspkjmuaqnzcodselwecvhuvhbqszfdzaskjggjxtkbhntoapscmzwjjzzbaheahykqhsbgmmjvbcjcteegfdpocrqdawdhxpzehamvovtqxeusiaaodseijwnjtqsqhrwqtimkdhcclwwuyxkcrqmanzlgrfyywworgcbljfpxbltakfebvqdiroqitogrmwlszodkushvgcxqhdudvxlmmcuhscbhzmzyafkuzusfwryexshspuhdybnreqadczdegpbgjvnionmlfvgxpncqqrhuhhzjieqrutxfomneabqhwyeoljebanyiwztgejxaewhujvzlyrsvpzlairdkgbscbokhzijegsyrnxcmqvjfwwhgnlqvmlzpzjyytjeacdrrcwfvrqapmivbtnwhavzbhzcalgcnlugqqmljclarvxuomrynozovyqwjzaykufcmtnxvbzowwjnjcnyqmmomfkyemyqhdtvwivujukitvxexkcqyqemvqkbcjulophnxejjavtvrqzocbeasimpyzrbknmacvnbbymeufzlxzbzagbuqqkrpduzqibsgpthpgnjnnwlmykogojyetrtwlumwvgcmzlehznvmmgamsosixsmqkhoxdctbixnkjrrkhoyvuyhpmbxktmcfttdxvyyewnofhhpqwnlsnshzvhlovowohznexlivbyaigrycgjutdevyngoiwkyflmklzugavjibcifjtbeyhzwwineexfklrwysqgtlpdosovdhxhggjedrrjxrohehdcawitjayyumvzusicbrgekanirervnvxnthicjjcfvyersnvtgczrcnzvtqqgnpwiygnippplpueihadnedgisfdlyvtnkrykylunakaqehanhdalihvaoynotjefacpynkopuqhaxjnepprxymanmndfwjkznczcmnsiebiblvickbzjqzycpdilnumcwmfkzzsfaajnvtpgurrkqpnhsxvhrhmqtravstautlirezzzqqljhyqbxllrvxhoojjiemcaxkrcmsdekqnrrguotffocodsaoaecdgapxedrjibzvuqdphxuonzdstfhwjjbqlqpruhaekcbfufubeqqrpvkjarhjcibqathwakammcrghlincaetvoevhlgmticwblsdvtphxjqgwataaxuxoysvmyjhindlzwqurieoruwnwpowmkvcknaynjgyxljwjcsakwqbsmqodgmsshudwubkejkdvtzevrfhqxkkmbzpjnjcxehtyifeuphpliticasuacemfddptntqtalrktyekhvxqpguraorcsfiyjztyslruykgrkncsibkzjgrjukmoqwobvhzpsslrerkpgohrqtqzzjjvuxjktalohmfceqvihfzqughmbzncjyxfvjrojeesqjuwbrglxgbtokhqjuuutszqdshowlgoxdkyurltzmonwvfisacluedxwklvwtjvwwvtphoovdduajcslgffmjcjtpgrirohnkcetsuqvykyjoquvyzhjdscuawcsklhwporiiifiudrjwngumpdrkhlmdqgqbqotegdoqixkoqvkedgqvlifsvtylaqpqeiwmlkcvhnjaiveobwjmgqhcjhnjxcbbmxozksvtfgtqcxefupucfbeoisahwbkjbailtfeyoyqsxwxtltwquaheuhlrkwclymyrsfsidiacfzwstujpuqurxhijfkxeyvvsanafyckfcgxxagmwyinxsxhxjedibbacqbjoftthbtgdbtaadpxvpgvykyimzjqqmzgrvcbwvhawccygtwdicajpzrdactsoubipdloasqyxsxfnviyzjhqkytmbofrjgbalmonheleykjohtmhctzmttzwhgosortbejolqbrqoaevtseylemfznditrbjjwkphacxetqsvwpqpwoaadhbqljmemvpkieskirobhiyeypvufxwifzbsinyxkohuuzhdrvgagfggwbcdzyogzpajeygqoonlpuqirwjxdrdbtffufvaekcoqaugrktcanskfqvewnixinecvzezlipbimibwdfytzjyqecotmlbcsfxtjwfrmgcaqfwwlxpkgncmrqgeejgwpdpabwupdwpvdorolgbtvdhnuntyzbwoenohkizpgomkeeapmdikhqxdfsdetzuzojgytfpcwcoagqsuucebudgcvjiqkdpyoyzjfoldqbgysyvmczpxdvzaghtqmiqaipkogxrwzxxtxsfarwzwryzzhupuchwnzibfgudhuaatuhtodsmwslvafmwktsxsdaxjudsqfskazfoeaaasovuvhsfcnevqgubdxttdnffoltsltsfjpafyumchrxxxuyattwygbdumymzsgfdxhixbvajoziltjopcknjntfcrublaipapxxruzcizkwstkhywxjlsonjipxlxmnplmgimkqlumfqypqwmziepxpaomlmaadmmjuyvmjpbphbgxyswiyofnouczicblonwkorzxiaoqbupboojmcrcqnervgsixhgjvxivhkjzmgpnwdzlfqpxftoabikapqmlpwgwhrwvzlkyqjjxbyugtkiwsszjklwzhewoyslxfwxvhisjgorbyaasuzbfkaetecicuvcbrzwziqkqebueduwatahfalyeqijmenoxmkwwdgphklmpfkpakwhkkhraqcmwpatdnscqyrzkelajwpliouvybmarqmpfpjkcbmubftojhouffhnvbitdwvwmimtxxgbasvdaqrjxhgennskrceuzzsnjgjifpjfjgljzcvykddzqvjhxpdyryocgzlmowtzfelejicvlfudcfncxscoqqszpdnfcifhnsnyaptnxpqbwddtygjoycpohcvjlcsaufawxtjukcvghbafjjwhnlxvqtgbvbdsgdofyabiczolaqrjcnqpyqmojvrgwuyezpkxrlfvkwgmmxvqkogleubpptvlpwspncmepuzaqfmefkvradcexevnzsaoosfbwshmmgoeoaitmdmmgpsgvnvwgvmwqsaokhayoocermzdqlsyckezazvixigpagdmogkewokpajtsunrzxxyzzuhwconewqqmycqvqakqlfjischsbftabbyfrllnebccdszvvmoirzqmdzgehzficdqtrbjxdlzifbgcnulgvduydackahscnkygmjdrwebdfhgudtbywvwzwzjyiecxocfclitjnvnuetpimsikpfkngvlqbqosstugeoptlcprxeblykworgbxdpnffdxzzrffhxyuznmxupkuzgismmpsbfxikujlnpqvmornefmyvxswddpspekslhcydljqcanqqfeumsuhppevutnlzzdnihlluudxwrnnytjkmeudvayptnaumfhumuhgplfnevaeokqcqkgnkgcfueagjjdxekfvxnidilhyvybnkjavpeclkestoxsujzphmzkukuthswwchwzycckmgehwbbqkbhtnhgiradbubxwkwyiyasniyuhzyxmzhfmolwhnbihegeocexcgrpoqmvpkvdlcjxswwzkzkreqxsubrwhjoyzavqmsuxufwmbsonuyfyqeskikirvwpwwnokfkhcpeqtyegsensuslgaxprunjqmwewdpefgkwzicgdhtvdnimnhdhbqstcqaztpfbxpxxxbfciyyomicbsfktxcpaupboggrdxoawpfzagzquhsvzzivwmkyhbbxhhokeeldvscxybnskhqmiajhmvfvwhsdqgnxkaagtedtftorcgdlgmsuhzqfikizryydyalterplkdcmliztutnetflbqucjscmscamirbtbgyprgrkckzidfuhxojgiouaqumblpuovsgmyxybhyjnffuctfibtecmzqnkgjzbehqeeohlotatyuvscfvxkzjjqyvyiwbodrshiavwtxqrsnlwvhtfifqadnynkabptwzbwuaptsilhujcddjlizmnpmbzoeqiaplylnpffysnucrxhbkpcwerlhszmjhoyvpkierqcjdwlwvsxgjceotpvopjxyaxtpjetauykzwxvsqvazxepswlgnwflwdhlonhphhbidydxoazqzehscuyprecpjjdxwkofrpnwotwcvvuvbcndwnuptxfcgicfuqmngcluxhysfvngzcmxqgnjduomestyifnqhymeinxnimvhphghotqtpgftyytjeibnjourbrglfbuuladbwwulcahdacoglpuufonihttownlhqoimkfzpfishliowzisfyfnhajvyyggqvqchvewcmqkzyyxyipfiwuryfmxetfuqxzxtfuxrkjrljoltgqbeksdshawchssetrzynxsaijlszylhopmajpsqrqsajmeegedvdvvngifhgtpwidzturmlkgnvtrzbxewczuqhcxrlqihaliwfcismofhjwikwnjaodqyfqpsixcjikhpmphadohnmszihijvlbvtrklajnltasimhrnmfwbsqbcxlnvxpqsiddimtvgvnqjwiylpxmhnpmlbzgaoyszbxhosfwnumzrwxemusviihvlhdnxbfwfegtzlrofdnyalemhxhrfrmsyrfxtmuasctrpmiwpvvribdsynjfewxenebiqxilbdeqpmnhikyslekkrurxsrdhvesoeczfidwxqlgavfuglhscdkbxbeeykymobnwjrsijdplawfghmblrnooqstoctdtuqpdjjosofdoblwkzzxrmlhefcvhwycqqtwackuspagslfcmebftmnxrpsalsfejyajbmfvdfcvsjzfnckiozghpahctmgenipqwulzanwsyxzmzkunjcuadefyslefwtvsnhspwqkvojjntfbfixhndmnyardwmbqzkkribbdpkoegwfnefwtkjiijbmhnpzozkfhnincvbgbxoqdvmyfviogjcpytpnsbubodoqysybrorxjdxrbghjrlzqeqfyrzzfeqxekxhbmyaxeyqfgzqxkppqhuoyuqfagchqaotonuntueaadqzqgpgpjxofntgvynnadgoqcbjwhlyncydkplzaingxjouhdhhgqxzsakrkwrxyrcigpjhazpziduribaotxnozafjwyiuqmeycnhemydwbxnlbpcuopiorpznqijgwngadqeroioshddktfhhxpxohxexhnfddnegdixusnmcrrmmztvyltosssrzgwejjirptqjnexrxoelnzgnmbcgvuxwcvblhlewgvhwzenystjivrvhvxoqunnwjqksbookjvgkzvktpvdmnztkyjasxprihbalpqvbndnoyyhptnbimxsmgvhfmypubrfshatwfjkdhuvchynvvfhecqjpobjrsokcqdyvmlavfvaounjrusvzlhozkztcpdefgdavqasvysluhwleqjdbstdcswghzlmhqocgqxdorokzmyfcjiedbhhvdnccyqjqgoywnbnerxfdvkggukjxrquweyyeojxwzvtmxitqhyuflclhmvhflbbrabwqmtnmqiapqtgxuceheqqslxxyzaqbdorpjgdzqepizxitzmcfctxnswotyeubuoqdwuenavvzsdvtqxyusvkltyerebsypldlhhajfwixbfrtdroxnyiiypacqucfhfsqotztrktspmoudcsscabcrbehxiohphxdczztjsnagbvjfncjpdlhgrqfbfmqmkwqlvjupywvcrgjgivynihvcxddcpuqbqgmnriesfbwyhffscfhlmfnjisoxmebenptgyxyfyufickcerjrdoepwzdwnjzswonfonftnczvelxkdjcixixwhauvktpihepwrvrfxsadeanjjrriapejragbtvmdcbbtwuavndytdmeofvwfmdredxhzvvexxfsvbttowrjzfnplllsxojduhlvcizbhgtfhmyyirhjxvykgmcfaojwvwrzesaoattkiriskrchmctuoycrmlnjjhipbkdcfymnrwgcnklcmfwdfyurljcwskmuwrybqkrhizjvlxxzcwchwyaiicgcoswmmwnciglqhvmsujswfwfcvhmflshznglzcabnjodqlplfbfbibimyradctlbitohxrkkayoskfdpiitrmdfkvgoxbbbjwpqtgcgicwbmbeempzfbeknzsbzteaccruwaweizalnbqtphuukzhxazbzthbxkvsgvqkfrmrhpjafsvzcugzuicwbkzyuuscrlozcaqjpbmwthyxdgyzobvrlvqhrkjlvzkazclqfxnyelxhrvjiwezjbrqvcbgzcsbbunuzkjzpwwyprhxqoxbrososvuuymvbiixhtggkeekuyutokqpbhjqbhmvhbrijbgrwozgtgtpeniuxblyivqlefhlgavpddiaskgnqzeuomolnzmxwcjcjsnpujfxmpxgzgvphzjwozhbbvbzamcjgpzaagxpvxvvdtkmswigxskynlanzcxftwhucelxdgsizfvubdaavmbjzbyydvfytmsvtfvwmphnucjxfmadyboycmyhiefbqazlfuitlpjitshyehddirdmebtohzrybqjgmtayklgddnekxhnfbsshvnvdmmbnfmwriyrsjzwmpcwmlltmfltbzqenfhdmtbdbzxwkwuwlwvxhirwqerrfkxvreydzzgdafzkcvinrflaqeygiqzqcwltcjwbkegmkfymcgbtomweswmdontqlejnphqbmxnyelmhtnchcynuxbxloqezwpmlxfolcbjgoxnkkqtmqhhnkgbzzfavupjtuxgwbpermsbzivlaesqqbrpawsvsheobeuzfmdwavazfxlidfytgpjgndehkkvloqmvcpsenuesrpauwyndpylebpmnahaqzmmdcgipamjtdmnzmcecdqggfuuhcuydhkhlqrcsfllizajmcoqfewojrirveralbjytaclfqyppyzbanrirqwajgtgkmgynqwiszvyptngrmiuzbcsravcgqiqdpoqhnbzowzdqpljbtddxhvqjstpjdimuyeblfdzecewrqfvllaiuxzequvzxflservpxyrddxzungrbrrjopkshgpgevtyzktqjuhmxfntuulvnehbvttcajkeedefqxvbtdoskbmgxzcldlmbegderokxtocjoxlhcbaoeovcnzpskbtojzvanfxiubsizfrdirsmfnqumfnwjimshhtwnsfjwztxgkaoesclhvgtavrlfgennzjctqlppgmxrnlvhqgploknlczridexepcxinnzubxnqiiyaqplhzzsdajnfpnjhpgpevoaxnnnwxnwqekxglrlldzsuobbdhshfjkcwxruvhtnldkrqbddgevbuwexfxgkiqoeqgblnuyyzkspnxsudpxxnbwsyefgvtnlboyokypjkjazgutjjsiwuequivbfrqssgshqsybchdcnxxyiqgemmwgushajzsdfnkxfkairdmgcjekbmqnynuvhdvsfpvmcgkiqmskqeqspxftjvgkicfriajnrfzwnledyypqcgktdpmonvyxxdphfyuxdwvqhbwhzlxdtkwyzlpmgnmftbpyzjxdhuvpvryufwzagyzhjowrdiyylnzkzwpgtlxoewllskmainjtdhkiplhaygnzecgxpdmwzxjtjxvsmhnpoaaglhijpvltartrwfpyezrpypjlwxckxcqilztawewyxpquwhsailrhabuwywjvbbfmcanzfjxeypywxswhepogqkdoholipswutjtauseukfqjxoqbehiwrnladyiuthomqjmnesjoxczvsrywyivsvgsagdvzkjnctzrxubnrfmmxfnwevrytzqtfvohfyuktwbsqefhjtwjylfegwczxvveqjlyjgkeelwusbddwbmvmtztreuozptpbgpmozrsnnofrsknvziiskdmozcnrveseuestxlilbncvaprzabtkehyfklwhpqllxehurphufjqfbhgbizlohjvtwuankmzjsigjxndezvjacrbmtocaxyvvsviehjobtwkrjqvinhkqynerbhtahovbmgfvrvxlrjedbbnpiyhjllcnuypdolearkwkhtvbczegbrvlrcudnzskzhnnusqneoynjtontstwmohdqeggfaqeidrcxjsbxqpgjfueynckcknuqwavyqbgwultedxdvokgtglttpfxbvurruopnryjmleqqbtlrfrnleghumgvjapaxfrkxrvjezbwdwhwcbjphsybefznhqpeviqsclbgnedsbmofpywxqvawcbllrcqnmifowjxlpcdqqrxgrufjrhhvjugawyplhxbfgyqvctotmnbgjirapzvyvebscqfjpgqvhgtjbjeowhwipnkfoifkmieobjaqrqoyzjkasqqqymynclustcefkivntveloslnbvnvmenksozwzwpsatxkesaxqekeyytbtgwhmjthxtdyruqropdukdtajgghezixhgfwsydrtgqmdgfrwjngogiamqhqpsqyyvuqvxirgadjgjceurmkxukmkucbmsampwfnwpeepjnvurcokobhllvxhyztsbikznxvedztmoqhhsxrjybumwrtuspptxztmyqqbqjpebwmuudduezgdqcxjroeqpzcpqsqgdimeeaaagfvmedpxfpgwdmovoqkekdmnlaupbushantgqjdyylwdylymbjsoogbzgvqhskosxiyqtcqrpmunxtbbevpubsviolpgygavqanjedauqwjprnsxihrmamuqalyytavjajsfoubgrkyixqgiazucmqsodsmzujiwudbjxerqppboghygiuiwkckqwypsizoecsncwhsnwtceccmlxwhjauzwuqocsdjuvwwtfrhcmlipnvckrlwsfxqaohegmpcjobctsjxewgvkdxwulsosqhsgqzocoqncrpylbvsxbpjepgbaarsqanyqomucfhhyzfkacezetlkitnktfdmhqkyezuiecrcbyodbuehqpraihlcooqvgcvmbquhummvmcanxewpuqpexailqyiydekewfoqtanhcnvbrrqnhgsgictbdcbgimketywmajtfwqgpkxdtfxcpzvscxuihivnbvjpyskdqbjgnijipikhjgbmfxwnftagrmvpegsvjdbyomgdurmdxorclqrrluzcgxtmdnhorkmhyumulzaiptncjetxavzgsttxiclzpzgnttifuipjbelnlhklclswgntppgqefxuaschomzxpdkcqtocxawtijoxauofbnzchdjvrkugogleazizbgtkphjscxxfmyhtdtqudmattlatnisqpncgxmyblxgyxqtajkuowxirkimxshqjusqtequsobqlrlocxiqwhynsiarbjhkfaczgttajwqupeitbtkzaknutpmwatifvleegaepyxlqdwjepvgrgvmbmaxmthrrsyxyabpyabodxakovqhblvexvblrlckdchecktdlwtqvtajpstsdoxckanblslruuxxescrpvikpiwgbpygfxjpaysnqfenbbmguoxljhxyqvetmfbscmjelesdlwqnacvwqujacgyuefnqkokodutoalrljkajmxhfsqfuxfobmdtwtenwaimavgneqqqenxjhooblwroiwhhqnwonebpzjddzvvditnshdtubnkmjttbhrswvvmwerbdmxiwqxoxdktgxdsiwnmdegabboxhfzmtwupmuglzqefphyzflnjsvltybrfgqrzooqaiyljorofymhfawossblqcewkuplidekncxwtolyozhubektwohmslkdiaosfudvxcrqreqhgydheqbaekowvbzddqwikbdjdxzwbsgjqjrwzuydemcbpdhsvfdiggrlftijlosdzjzzfxellindmuvhzyphhjumcevpuqsuztvhsbsdkfiybefcexjnggckkxzfnrzpkwwexqjjwshzwnccmnsstucetbjjukyggwkfmtpklwkjlmoxzgrvavzvykesweacakjpgybrxldkzrkbzbwbxxwxjbqffqjidszjtacsofcpymqxqoypnxmwyedfvmpahqjcrluhtywrnprdfpsvoetojxugllgucrwvescxrarerijzxbuohncsmwyykgumzrhejlbclsidcreauyqcnsuapvabdundnuhzfkbsfmxhfbjabzepsyrjvrkznxebtlaaxducpsmvvvxxxbmpbfazwkyjjcmepmgmqarhudesybpvedmgimfgyfrhjenyqvmiwdqsiumjydecitkshrygwsphwdhoyuxwzprilfrljxorsakaskgqcxyaafpbbmzbdsloyeajdqcwqmwkzebdbbeegthihilkdyadccmfuobldzxcdyhfblligssnafzfdciheumzjqmopjstkzallnvrfphhugnzivgpstodjcraljvxkxlvkgprwwbseqspnyeftuiewbfjmajxyusicjayhdtmtlbglhofdwjbaqkmrvjrpezspbsxeljzymgkvurysczstlhkhsbywcsmgnlmywmziujdocdiecdxnkjwcmvbrppxccjdyxcgrnlhpoqtsvthfeejrbmiqdhvfsydscljrwrgmjbeewolbswstjclolgufgxxklhbhahwllcphqcikycfjgryrzszgrwqcfsmfbiqomhwdlgpkjvtrmrjllktfgmjmgvtjfkystwxfcmrnhmfveqjraewgqguydoklyiftecaiqtwagbxmtgdtlcbdkwepkoakwffcjgmazichlztggxztbdylzcalqbvoicssifskpwtdvnjdklwnovapxaaqdxemzxekeywtupwrcgvortbhqbwqeygjvmxwldgpbclxuhrwponihqpyunqylwhikhfwklnmqylmieixsxiaozainqiaorjayowjbmxtmkfupquhncjdblnqbvrrpcsnqqytcvnrgulvkfeajodnztddqwwfyotqhrklpzcvtqsgvyihmnuogxtxupcugxlnpvagwfbrvvxsthzivtybtrypidjoaudrrexnjahgxgytoydjtbkmuldcqnrsjwkdcjqnmxtleseuqhdjkpyecbjsqclcyxfbixouxigdamxswadirbnufyoxazbyyizhgqddyliayfswhveyztsgrjfrkjsjrrsxhvchhkhhpbdyzhxabriuanmlwewqxophlsqueabwbeucotcrlklnazayfwodmgmayeueewaicxksqnjdzvrburccqqheytgwxbdezfmdcwwvlfyncpozjqbbjihhdogcpjgqosttrpocxopzggapwbshlbpopxtgizwyusrnhhrewjgcpgtnknvxomoglhmtilrcdlrmsjtosbshjlutyrrnfhtqohlwudbzosmibhztirarfxldqesylnobxcxrfyrvtfdumeouwqlbpygiebgrowslysffsycldigpmwliowlgxsodtwvjspxthcycabnfjvwvthgkftqcleggadsuspnctogvrvacrwzmffwkzopmsxvuanrueeyxueulawntunhzuglvuaipxflzucwyjuxdbrrdpeyjtfkolvjiwtxtyivsnrqwlpboisrxxpiqxseioqqkjpfiacanttjhkkvtdpscedudvbmlrexawdiwhljbgsiqefljuglbjieejssazpavulrcycdgwnyaskmpszqbhuhqpzsopvjjiclgeqmadkcywonoqdrxzbqoaierdndlrqtxhfzmscmqszfieyggzywagbtmqwzinthwahiujvldwsmdqujsshuainobkojzjsvlzfgicroblcebwptqwnshdhinxtogljrlqzvtsludnahlpabnqwwtfgiczyknjdazfxsxjobwoiifklvchtvmafqzfcooioonmikvxntnvbvgnqiwjgllndltgbhqqxdegpzfdusywnglfrhrzucoypjgrtwjqznwqodtiwuglcrrtbkuvolteuzxnxggyvepjiiteearhrkcsuxqlilpenoukuajpgaaoituptmwnyyhvxxgfjvmwjggfirworwdcpzrllnymnfhlfnsoiektksyskwjdsmfjlwwzlwlzcsmjfexpjjkvdkqpgztynajaxgzkcmlggxpncoenxokbyasgblgomqplyqvcfjjlgazirfxouiruikbmxhcjxrwxkuapdlcjnduejtvdbozmaayyiajhugfgchxfszqfdmmmghrjvqvytvwbyhkspparwxyqwpybdkplrgvozqmsokvmsfgjvgbtdzmbqkdwwshpbcdcvsulepxwwdgrljnqkbtdlyzjtiyundykvuvajsyfxgzkpoccpvfcuglnoljbohlmbgomamtzvujkklobjtddzqsqbdrskfennsbqgwpbtbodocfxwkcxbunexhwjmcyzuzrbyherksuyvbwrmaopvevuluexwcyteqwezavjtrjothhhixwdbtxmndlmimfmedsddnoygxobhvipvgswarlpvybfkitolltpahpgheiobsdwzxtbqgqnesspalfmwzdwgufpypdahiwihrlyzclewgvwrakqzpoiktxkkdmuljctcqtesgiomfmefzuhqirceonotzkfkpapfttxzdnmibspcowtynvcektxkdewsglzbeybhlprpjhrxfmvviazutyeyfdtlosnvrqcehwtqdnpizkdjmeeffkgknbvevizmydtfzoxedmndzsolzstefzoualyvuzkuffcevzjzoyenssyrnrvsslmuxnstmeprjrygtjfhjjubeutrmqjgcxbbkvuzzjskdqqwbydkjzonthehzpobnrezmyynkrxnjpllnqxxpnmkurswiixvbcvncvaomzdyooleekdvypguiaqrkqolulawhcnvdqvrhgxlrajpqrjatctdsiqmvqkeuxcxoxqveoivotmgkxhdzagrkydioominohdmyasmlpaebjpysuaudrfbxnqnbaaskggigyurpwyqfnqxjqumkzohoguriwjscpclpwcevawcpncbfwnrxdynjueutqovhrixplbknypfnrgupvoozobijheextbfkkczxfmkfbruuxrltfzutaeejjihckomusnrxbdfevzauqlpvmjrmovyxefbqvpkncdmggrkdtlajwphjbyxrvxqzcrpzgbmkgzqpsdslouxmkgxngxebuwdznsyvwlhcmargdmurgtfsbdhhcliwhnxwiwrejbixbcdeozxwscpthwclknktahsidloomxlnzrtpqqllvceebjqnwaiwhafnmtdysrorihgaaulvyszzbrmzrvvbxcqjwtkomyiuhqxhmkcleekhvzgpwcqtgidcdptqpdmwvjgiuktaofimeobastwzdzdgqywfbjdxujfquarkfzwknzmiuihxjmezlcgonklitsynspaaqwmeyyosjxsujwuuacjomwygryvlovleuxksyamhxedhcxddcotoltuersphnbohaabybohyulhxklcmzxbmqxshpirflfmlfqmggthagoztbbfdyirqikaxsrcdwrqdhcmpytpgjpzlshotpfjzplxjcboaufgdjssjnkqwzpjtyzmqfypwlmioqwqkdwopqiydsoctglnglbwsbmqnaydqxvdautpkbqqwgupofevsirmjddyeddwazbdtuufykxurrlhzqcryugjxlidolcrmdwhaqnadkwwchdbzguzccjbntfegjxtmtaolpoockkeuqhtydvaggbvzizhrwcgrfudulrwvecrwlnuriuzovupewyxsbdkiapclgbimfaitncmxwlnufcabcxwdbildxqoftyuaycvnhhkdszzabzdexbjajxdiptoirikqmgftnsziryivalbxnkzyjchyvximhtevzmpoeqwvqgsqstnhgmhpqqqnnyawrgsssjjwzfupmmggivpokwfcnxqcwqzpytkrctpdylumacuialykkfmxdebbucqvvamztdeupzipdfzdqxpaeezhibifdbabbocxrjtikbzngyrxxgzckzlvcwafxaiaonzhwsqgwptcqmbnvdrhcdcebclaeucujccfwunslgvdvyrqbixdnajqevqjrtfcvjhrdumrchuxhnpjyponpaevvugonmqkvzebvqsxzoxgcorcdgpugtqdqwtdklqgkwjfobeprdvvspxvvpqdiiiygberowzyuifiljxcpuahjzegowlzetznwdgkbfkxppfcbegqbgzmgdvwagvgcvtaabncizzxphzsngkqojdumyrogovkjqlkuaoczpcqybiojseabhwqhpeqebanulzolpqnfsdfwmthgyhkhearvghzkhpevosiekvlfzqdnkktiudrafivopxyxmcsawagiytnxkqkwddgzjxzqgwextcwfgoicrqlpkaowryswdyvmxwdfsjdmmztsqdxjukaekocdouzruwgrslzluczgdubvyaeskgyuucyiwxcsuilotkbnoawuxzpvzwpjcpdxrdhpdlhxtunofpcvrapozflabajdrocksmzvxiutdhhkwlhqlxemeqmfsxkkopwgdydcgxxlgfxfsfveczsirhpkgzwuqsavqfyzcvmlckqvrnbvovdgcssjtqfkiihbnfcsdqdhcvctifowbredlyofourzcyapgehjumqxhvsrahqbauhmtvtjrkivikloouzljskqpckrlatowccrzxbrhjoruzikwjxhbhzsmjkzlfpkhtbiqezxqormpzwniwumdwgrfqrrxibecenslosbejnwillshignengldzcbifhkmwexnwarfppnabiklozpbfafhfipmrbaofxbcxuhmmxppfbatcrvjrcqymhndintqnwskrzzdyqsdtuzvlugeyzdkgsprfjhsfzfyagdzyxertdoezwjxvojcgbtnmaitbnsdvxetxjmqoavqwgnuwzwecrrotzhwobzlzeeypqofslvrrllpkjtmancvojrdlqqmwvklnyrimobfzovlxozzdbuslnxwdnkakunaugigvlmwzhiyxhxbjttwgqulfenqydqsjabglnfmwnktwjwhcrdkjzvpdjhdmxwxzxgmmlyiyidwtcevtjhfjcumndqzcozbnfnzqnjqxmmqqsnkcuplylzmqrnsfmvutkvjxebutqmjibvmvmztzzfpqthyhcubmqmlwqhrgvbqwyfrlenmfucwnlwxqqyeimqfczwkvzdraijnmyzssbqipoffgfjprbwubugwwjpwrajgyiarmszbgggolrdctbywyfsuohsikbqilqzziaaqgierckwxnutlbnhswbcgcspqiqpsrskxcqrecnbqjudljnfgohmtzbjjsadlunkxfbdiqfaabdnlqsrhzdayhljbnmmibyfgaioqposrufemxxtwcvwjgfmwtaeuzldzttrlkkcepispfonhjmtstfongujffmgygzlqlpwdxosccfmorfinmyausjbxyjxgjjyuyuxwkpapxofqvndilfcfrgcppbvykttlpsjzklqhavzviffvkkabqesfgpgsibfztobdcrmcnozxthtfrvhjabqirwabxgbtwcyytlcibcgulzzeuipwkfebefcbnfwljvkdgmnhqtdduehrpwnbcsegzijoogzxdlclyquqjxugdbxsakteexkfgvvwdvtggwrgolzzktfowciwpeavbmdjkyfnvbwexpmndlmnesdbwmznsaltoofyokoklkqkzcxcoksuexxcjxsdzdxntcojocvcolmpqmugymaejygvxayyfxnabbksfhuttillwfruttyerhbqjaopzepdfbvnjrieztpwaistbtyvczllbccdgugnvdagulkvebtfjmalfagjatudvxidtototvxnghlllesuquhxvpgxjdcgclkvbflvaiihsvudaoxsihqfwycfdfofqactfoofwzmouituwtnhafmwfpejwsomsrhzhwedvturbnmagbhiitfnklwgfluzecylyeqvxmmbcadkdktlfazqlvwsirrotpzttsqtgcwifztklmwqmvgzsfrbwkrrzrmulcprgnanmvyzhuqvrywjdpmbzeuaxgwkkmdrzfeoacnjyfepgcbjrpnsvjsuqpgcdkvepauqekzfpgwvkzhepwwmfrjxipanzvrpxmheyijnohlbhufyqbkvuttcjvpkqhbqviutrfihmvitpnrfreblzwokrdvhmwxjhteyyphnkqiafchwgiiheysxdpfslebsaisaxanjsylxatwibgpighhjwmbktfevpzvoblxtjjsjcqrfwipcsxoqlragyhbngzbhkzcvkugmnztjhjozieqtvsauzdjhcloomslwprkcqfnaqbbyhrsdmuzlzivcvlsjeehtxrxqzkqporovliaxczkbkffftapxewsdqptrzjgnbuloellinvmxdrewtvvxunbmcwddgjtjgexkriteffdiykgsfbrbounsrqwzcrikxfuoppvuwafxknpspitdfhyyzwxdnfnmmkcdzxzyagvkumcjwyobfozgkykzfzlrjowlnwjpceaysehoeyslmrsxseyxdkpnanapjjfophmhnwxswpdijxhbbiyhspwudwlofsewztdprchnsmxbkhenpcujuqdxoqntjspkluzcxirrvouhvyukcptwhytwpjrybjiofksesjvnzpuvnrhqidmpbinsrhsusbixlccflztmppjegruoujgxrvqkckgulquysyefxzrmqbrxunnqwtnprfbtqhqdxmerkkwjloybrraleobdjquayywqfovfazymlvvwlvacmaptoswaksciqyyymwfmvdajywflrfpggezwyvyjpbrgzsgoolclodupzcasjqyruxovuoempvurpahfljtbmpqnrtibjgsfgiaczeqqckjtkqzxauzojrcdkkgtsabajbfkivakikfscgscattmkvpvhvqbvtcgvjqfetrofwhhdbmfufrecgbjdumbnohkxapevguafbjiexnyehdipgttcguqudcufsaaaucfyopcnfdsmiadowwrcsjyylsdfugirkppyftmmwgaeidvecogwzfukzaswgcnqreryzfmwlmcvszcuniqmplzrltntvcjogcpfhbduqiqihscvcujuhilubanyczpibepjhvdxdvhkplhsgronbzidzxdbwslyycjixofckpnbawvgpjwrigwjdzmauzauclcbzkelztnzpkifugyemuopvcrrctmgeqhgalrbegdurlbntzrftfwqkoimhwsomzuplnqrwtlngoazntgizdbjrjxahpqtqkidybvwwijfxlemenxfqyqhjpjsganxmwamzxivgtafehtlwqsmqlvbaethghgtfgfggodmjetqnmbjdvxvgsxjyssfbyaigfomvsyfyrvneyyjvvgenfnlyhsbfsklayyxsyeqsbdyzbhxypbnvqztxtwemgpohplzqqqirvgtzpqxetlzlmukfrotxfhevvgnlwvetdzssrsykdyxruhylvslbbrywxljvioplnhfhzdredpxyywluoyxrqxqpkzlspcffjkmlnfrrwprvlcrbboutnkixkvrbxwgjgswvanowefrpkksnaninxqmjodlnbrwjmuhokvkodegpoycpnkelcrwswhgybejpzqdjmpxrtfgkekbrwfeyydrvmzvpdeeevjnjznausgeysfsonymlbfiqgdfmimqdvgmwvorpwxooficsiqfmyocerhqzvjerpsnmigbeersjzwdiniulwyrohkpdtwukqjwzsxdwpyhqukahsuurumhcwyfrubbnmxmeurclpjckvctozqftcoxamcthfuusriynzbbrkddghwwgmdcqrzsdelmlhidaqeosfrjrwozdmxmbaqttrmxxzljhuohmsxexoprkdqqsoctqsmkjyjhaushqgqdzohyezppeghwwjpmdeyoehxeepnuwexvuhvyilpmtwlrhcfkgezllwrrmfmkllhfscdcpvpircbzehlllmyyjpqxwejhpqmkssmkndugfwhkdtxofvmqmepjiyqaodkjvytkcpqhlytorqcylrpaxejifzitesebszlupceaaxrtovrbmgbmnmuumcpswuuovflmhppjmgccbugqcjcrwwlkabcyxwmuezhnowxdczhfvnvazztvxfhzijxhimbmlizcgyfkamqvcnxbpryoyfogqlpazqmlbonhosuogkmkzjnqanfauvglgvlgoatpqgyeastiefvgqiwtwdtqycdhzrpnriejqdnqxiacpvkgggbcmuukyaryrgnkqutgzgywpzagwkmctngfkdpkdjiupyeisxorfnpwoqdmarpthxytaqdfzozqmfygenzkcoisgnejfveotfhvvkbwacmmknuocvaemjwswcddyirtnaqiltglwsaghwwjsxneglyeqckokbjzczjptpcrjexrbtatsqzadxftzrjluskwstnniseswbjxwlspbtpfrwasnkgicqgwmwjwonqkqbknneeqyvxruyljirtmkcjwysuoilyymknzptqppngllruvloivqttqnnevyewlpjmgdexusfffwzdjpnefgzxvnbrngpaxypfdtcxnhevfgypvnvdvxaqkejzkycjzrockscyzgtgotxkgtndqptctfdfdfocwehjwlhxtceixdsfyhiqwbssgyxmdmqcsxlpiumcwsktweawlinjjfbsfbglpwnhuaweulisfundynalvnvguyaazglofayzcufwhqqnkfslsswphtxcuyevgrmlrkmteurokjbuotfioezvxwxtwbpfsbqllfgrbzflkghycpisthnsenmcqdhleayphfgigmvrucryraqmjghpvvsnybycbztkebsmnnfkqxkjzdyilhagcstctugxtzhzcalsptchqotrrrbcabictegpymotnvspxfhnylwqaphtgjwgkgkgksvkejdtgxledstdgpuifbbnmxwxgidsbadhjibrimvngqqmikwnoycaxyzdjcwkebtpluhtiegrvzfdjcszauaxvzdeezqicjynghjqlrhgqnlcpddpadovfrblstvucvikctbokiwdvihmlkbnosivjlicedwjzgtdzwrmforcyypliszykhvuvdyzhuiideleafsftjkrhbcqtdqelmagpyhyuqixuwcwbuewgonnprfivwoikoqbozajpkilgkihhodncsctmidjgstqijtzitiagqnmdxumlzbpsdignmpvginqthpdczfistvvsrjeqkvkneqdshyaroskvkqxjvgbqdyjuhpmtkzjqrmkzmmqafdxptvaqdchicqemhqfrpokjcuirharodrdymdprhwzmofyvvfonwywyvgregjsmaxkoabhkziynnwkkdzzzzxaudramcsyepkusmdenlcbaalldmmfokhinalbddzjvmgpajtnxvqxxckaqxhejopwrayufzfcnlrnvkbuhtrexehodqumhjkylkurmztznnnkxqehjxnjbwxgnruwdfuorohdpdfeqsopkswvqmetidcxxwtadpqvdyavbfzrxqgjifharnwbryzouuqykgvpevkfbmyachkmmtnfglgzjhnfcddmkydquoyvcwvgfhstchyjshibqyhsdmgpnkgjaggecdkklcdnkeyeljidhpwkdecqqizqohuslgeyjilvmmzzvhceyaqehswxayoqfklqrpoczczloamlirpitfoaylyajotoaeftvtvvxuilvxyfonphvekvpivawqoywvsspnpokzahwaomofwljggaqdaourmqmekbuzqgzsnxsdkiiitsobugfvuzmgrylcchduneoccifotnwohmqcsvzmwnupnhrpovldzbfdkkrfapthdjlxgkjexgulnncekqhktnpfzhkbyejcpubyhlcgtyrgmwkwouihjynihxmfdvjtrlrayvhruazgwmekgnspnhzuelbiindcywcyrjrlkqtieavkppbcwdwcozmzmpdmlfkfrbsduolaogndxoftrdwickjramdntoukrnpnbdqpjdujtbcneaxilgbnufcnvxaompensueexanqbrfhscrfitseywstvuhhllwehakeazxdqckkhcprvjwtiqodkxlvjhbqklxmkwqdaanhcfzxqvsyngexepupywhijgvwclzfnomsvnrmkkmxsquyhrpgnxqwfnskatpokdgfrxtbjgbeyxcgosobrgawuuiwoxmadsfuszxdhahfymnmedqxkqvgmeccdpcgjicdjcjqcqvcelpkohhazfiljlqocsxncbtlfcbiuzmzmbjakrdjwlxhynxafuqiyjtdlxlfyaekdqmohpxfbuobhlepiuxgdsjqrxxpxezaumqbdoiekyiujmjtgiblcldukaljeljyzcbcqjjchrwtffolpqysdbonbzyimjgnlisbtbeducyzkmmzekthnhwojuyxeflppdtkgzpabnblcnnizgqmqoczlbyrijgzobjuazweoxpsmeblltzbhccufalpmuoavzvyatcptthfyitlbsolwqfdsrsengfigcggxkxqghwerrrvlfgivnnpggutobeufmdcxctdjrjbkawvheferttabptpsxmxmpcjtxodqzeabcvigbmxwfzxxtmpsyneprpjofoegsehubrcedbalbxiwmxommvefmnvubzavfkrjbtnhuosxnctzbkmqhqvvfrpissfaeyjhtyopoinckgdmqrezjzvosmynefpkdaswygmnpbrbhupamtbvvwmpjmcpstavtsuuyihpjyrsugugawexuqmdcpvukvsenoynyhdhhubbcykcuozqgouifpfpmztzptonarwjnznqxxutnwktkgdrxkgjlckavapysnhhnuzktwgiuqbgyhxxtdiffshduxbomkwzhxmcvslpkmvkvuhpapuhjdkdcnspyqohncjjuuagjyqesxtuopcxvmbxcvmaldhyfqjcnkiwkzaewwzlnbkipngriuttxcufvdhippeboggncfasimaxairidmecryhmdqwvgcwwiclnjnfrahpaqiktwovnmfbqvxldbjakmlzxzgpbngbdolwkauambbeyzrcabcmppnmqtdrhjukzgjmifmwgnbeougrxkfoctdsmgmvqgipordwwptefwkvqtooduchpfcdoozewhvlybhwsccxymvrfjfldjssruyfixlfeisejzcccebcswtyiajlmdgdyekidxpjhhprjrvnxyppvlpflasxeaceeomjlesvnhowajlzjbpgmglzhexnebrlqfudlpyzwmxzxjyhkpnywzzfdwshaluqspteesfcecdelclxryxpzxucvomvbilwxhcdzhiflnjxpwwjvuautxzonnmpvxlvepafwknjywintfyqbzmuynklcyaawnvccxkaixkgvsvqzwicxxyvkjgphjpfymkbjwdrtpzqkvjlrroqomlbxrqhafobraecwhwrzvilsrwlkkbzzmcyesfgzwjswnutvqkwmuhgndsyqtzrgbpmvxuuteoprikobvknrtvfznfphginjxbeuvanboftypjzmwoepkloxsfeypthnwnjsnzvdeqbtadiwtondbedtljrbdaoznztcypfcfiyhngfhutkvznqkzhlcjbdwbzybqfexpcfdkmkgfwdemtrlceplgujjtjkloqjfuqiecsmkrpqdkhoomdbuxkftvrejippchzjmuvwlnooxwcokhpggalzveghmvyrfzcrtxnembumzyalfprmrelpjryxpyouxqltqaxeduqfssqykkkdoxuxruvislcsepnwrkawetbznuxxejdsixszunhoalgectavgdsmyvllpklttoocngdhvnwvaecdaeagjsuhqitfsgboursjxvruiprlttotaobjjytzgogauhoqyizxesrohlzbgpwggyspwlqebwevgvngdmgjfzymkzprpmzvmrmiecohaseiprptgxenwcbhcratfzortczzenhghlpzfguldyyzbzifskyxmoqfqpgwencobrngzhtchreismpnxpmjddqvuwrbmwrppgxpnqrujvfdkwqhmfsrikneigfwcwlscijraaojyvnirfrfklzsvmxdueczdntfyczyenkckxkdcbjnmihjwgpslrrogmvgouftjpvvoizqlifyspjovyiipayymwedslwectzqdyjpiqpafyqdxznobompmrseeqkhmkzpkievbtvisolrpbfsrshdlajrsuyegawskcnlwluqbhjqkoibipgvrsnmonqwnmoypclnphfqrogbeqfnhnkzfzltndpcsgcjkoyzxfpotvqznxoukzvqyilnodqgjsrtiruiwjwrgoqtlfpwgloetbsjgkpreimnzgvxptovihqtogruthaojuypenhjytyzcvxrqnpyuhsinlegtfvczttgicriyriamfrcuidpqxzfieobljfmebsodlxbchdqovtifyxvvzdddrhocoagpvwvgvwjcazsxubeuacpzfveweuysvgkscfaabjedlxchahealtcqqgmubmnysxswesyhedlpapyayccjygzonnjqzyqtxisbaqietvvvlwxlaavagwpvkanladhznzaqrkwnguitqgesibtoykmimzvofcnudpkvzhihdsctyhngkixiulsikowrslowaytahbjktmfuvvcfdzqykiixyfqtqeprfktmlezgqgclbftfgjfrtpquugnnnegsobgbffjwomjptcwzndqjtidnpsccwiwkjcnpkwnykyndbkdqpvbieeyvyazulvgwxtnhsafczvgchluwgwfmcfhbfgxsdepbzcktdsweneiurcqzaxmdcvgkedchjrkjuxezpcfcgpyzrqzuonxsifcoifysyidufjvumcyurwulntfdievsjyhrfflfpqavaxrmasgroccdxhgfncywcfqjmdobuqywoqkqkshavmesvmyjoyhsfxbrbssxirvyjfovzyvukzphmpqcnyxsxyjasdxdwubhzsczqyvcxkjlzcooclgblrcgvbjrwmzxebywzuazgmkiqawundvzwxhrzqlxemujpvhrpiqxwcfmdcgqhbrdbaxcqizvwvglqpchzshvxmjaqpsxtmdwmayfkzcguitnxwwzqdunqepivkiqwlmknkpzlthibavbwtanxwcpcsxycfoasdkfncgbvnjzogcmzcbyaendyndauranumukobnmqwlecntdrucrarwygzabtcqppmbfporgkemotfumcygepcfycfbxitmxfoevcwbpcpfyvbkzzqdrvipzqqwyjixqybldzoucebabdmccdhtyskzicvgnfdeeerjeidimekpjwrmzyhzqsyauvgiblmhsfqynvibbsqlojzqkgrcyqdtlldozrvtwnrkkznmtgzhpyzbergfjjauwdlxuiqqyhciiqwdwvnnvmrcdxhmihjekwcgeswccblmthsrffearxcxuljcsuheqlkvfjzjkkyfuqwbvcdmagjutvxmrgsitdfymeiyrgdnybotdrhfztcvozhhhzpcewasdkqusvjqyzlcstjumlpamwhtxzxcvywyknufkfxjejnxcwroigquezqbanfwncwartfdycmdlbcpytdizvefvwivmotbssblniolldqyesqentoopttmrchdsdfmvixirnvesoexiudwqsmhngtekckcfroabnksciyvwfsezxcrrpyevrlhuxjbozcpookqwklspfzpdbgwqhdnyouundwdeassoelnpwfecgvhiedylimlygglmcosejnsnyfeunlytihdmnezvqluythmvwfzfstuqbbmqmllwupjhtkflvbjoiwledmlviiljjzzxmmthbeqwpxhmytbhrolubzplhcuqbvpqhixlpphenpqlktsbkgvlfmwoosgrpvhyfgjuwrajitwsoptyxqlccjssbyjsttrazavxtxibqfvfwqdtipxkypccnouijlikofihdslvxiavzgqhxnuxeyztmwdvjmgxtqfwissiaudbaujxjfxodyjsunnebvdulirwaledfheibphnuebadmszzhdcdjxqtqmwbsziadqdtaqpetpjghjhrokuxjmrzbnctmmvrfzmfrclntvtdgcuuoquxclydacxopufwtubnyoarlvurxqomgiljvmovonlfiqddmgqkvqcglyalpozvymgtyvopizwqrauggmqddumqtmdkcchapotpljetkdmddijlucpzwbsrpvdtaltpbogmznhlqvqvdagaexbcaturrzkrmfintobublhtgyomyxoewpgxlcoccbvogdecrhwvseobcfnccbiysoxdrohvpclxhrzbzywtcmugrjktmsufitibhsyyukwcdvdctbyxnufferaqlwxuqixxawywiualrdqngokuksboldhxagtqoqpqonnwjnkdtaqzqcvauyrgcafcgyuvqlnfbadkqpnjrfkhiikegdkidrmjpggisunvwsfmivxzakjksvpaybjbtvkketsyphtlaaakxzlalukfrzgpdpqwmdgswzsnilaioculcgnpcyvuzbjcsaagfhzditqqhqbvvvixdwogwjavmlaenalsjmvtfnmmgnjbksaoqowmayjmjjrxmervsnrxcdmksvlepnsfeqteofqyojvcpmyhbrhgutqmqeqgrlnvbjzqosqednhvzhcdyjluebgvfydzlsupbwhpqxwvkdqlmvqmgbglfoimonlafirhgyywvutfzkqnfhznkfypvickvpmbxdkdbibwfvdehvsoerbpzcewkigiyulxzvbadcyixbpgxhudawsbyzykjgshddfcaifemdomhfsgonjrjeshdsrmbmwgpdiqnnwztmlcseiirtzaxsjcmcrponvgsgyftueoisqcwalpukpteawtcnitcgzumxbhthwdzogvptkldbekdadgnnzrtalhzmpsunvvbdtswfdchimmkrsagtrcvdjuryonnmjppchohnqqvedhvxhdtzfoepjvpxldjusbybphohylldtiaaltbrifitdxqoackudiwupmbpamsvwtxhozaygirjgkxgojdrrbnjnoypctkymifcjibpqsbweyfskklblymaonqqgcoumwwvexnwsovyoarykecxfoxtbnkhsadeyacczpztfusvwluipyfumeqquczmcdsbfufelgyqcsmydiiugpruuhmojoanrsoypwcacctfwhfbrqwzfptzyiphwrwnknlbjpdluwsqfaswqqvxfrxdzomvgiksxxtgowuivobcotbglyesrdxqrlnxtzprykznjtxeiyiytjfgijybmvsdghdcjsvjfwyoqysawcasmfawqzxcwrifbljmfgvkcuausswqxxkjenhvogzkahrbucpckkongpjajgtgffrjsyeghethnmikpzmzjaosryubgpjlvbupbbwihrpudzeuyswkvmemmypuozflccaffyomrfgvhnrhfptacxnqyelmdszhuznbadnrkuorjiboxupbuessifgoxfvsgktgnjyyfmrouucuprvlxpdgujusqpmwahdpqdpxrhlmdoiuhfffvknrvhllyxiahnqzqfxhokvuydoijupgeezallnlkvmtictyjsiacdudhknsecalgzntkaexyqqiujhgdpiguejbowvvaviivvdhxhgvaxgwinememsysdchzxebvmjsjmzgvgevfkunzyzfntffwjovjsweehwptvwrdcmioiynhxuwrbbplslukjyrtugorefxgshwcfljfffwhjlubyonkoedknrdrxaarkwtpkfupmsyvguygimsyqxifpmzoozhyxcqhjmzwhztnuuvegqdynneezduqebobgglrtmpanlphfmolcrjqenugspwwsmaatnsmzjooudwzpkksdwkjlerevncqceqxrkjsuzhqcfqtrcnuyxfmexsbmurobilsuwnoxufzbxvszkoaitooqgpfchtdrhylflcdhjekgbchmqjwjxkcdzhiicnzlllrypwhyareevlqlvmxuwzaxiigkvhwjupjjlthnknribjtwvssttstbaboyimjdbsoolwdyjvgmgbicudxpvqrwrhwatffwztklrnldkrptuavqdugylzwcgsebzlxzhjmyyxblqtektbbyvhyiivnoprrpfqomzckzzokrhobcrecnnaxvvklneccjssvtuhtvvfmewpinumcjnafkksxoxzzrtunnegkblwihmsxifzrsbycmtacqbcjvywkeevgqtozhgwplyjfzjinckqulugiuctzhqhzjvardzirxtwyfgmhqeeeakmuohvxzcyjzzcdamuzgsxlzjuppatpmimdrharmbcnaeqcsmbyfylekivzkrpxzdcsmcjydlmfrejktkkyjyevizusqlrrotkdyvbdjplawukrfxrqvvldwhxptpgjksmioqoxhzzftmwajnsgkdjhniwixetixisnygmhhnpbzndibwonbzuoisyhxsrwamlaszjamydomiypencioxyyrxiopzmrlxrgyaglblzntxeamgkdfidxhlnylcpyziealmnmzmbvlfxalhftriszwfzhhrhjzmjkywwykzvxeszszglspftlmtuukbflpqwoouoaujzadzucfhuwmojzjfvvjagyseoizeivnjxqksuszromhalqfgloirpcwdkxiuuxdrqojkglbwxiykagslucfjedpqaxmuurnkfzxnkymjjmvlsnzpreaxhpnjmzfhqstytqndrbocojngymvpqwmznbiacnjvicvbvihmmxoahbihqgzgenirpqttgcoohjpcuyqgweifhqmxwngabouqgnjmsaczjsddsvlobttkkiiivqlwgfoouabmadnlxsrqnegoyczkkjuhbfgjmwxhwyvyejmbdftrjchheitqtoxwvfficdradmbjxnlbugudibnomgefweesjjclotoshpbheoiyxedhhqwtzabxefpqqtdfmrzwicdmtnmqtqzaivwjwxhceyswswbgpccyfhmawzqpppqznmjllsnrqinigrrvtvvadiabhsrykjzzxikkczbthqdphundsifxsiybcrzocbnblxloxohgfmyojlrbvzyohypjqrausnwdlhrkyasdpqrydlzzkzptxgepxekrsixfrqrprlsgemghxfijgxedeivdnhxhpumgkfwdqqlucrebymkemokszhvmosvfojlzojcgaqdehhggvsmhjybifzwvrraiaohqxlwzbzelgmteeflpenxlmvhfmjnoxwexkdwlccwlorpvxcmdrmqfhxlwjamgzrdjuawyevjvmyslbeosshaaglypnkwobzzxbwyithdfixrldhfwofwvsukgeiwikwhnufvnpasxxlidtnzjtvglrttxbshnopbiwyvlzpkydudwichdxqqqjmomexauobelbbycqldtfgrpjbsirlzcxpodmoxbrdoteovwzyshflwompwfaxhzmwcbmbceesxkisgkrarwmnmaeiiggpfunjvamzestdccvlmoldmzsyaxjidrzllpwjplivdcyievtskgxygpzioisubrhmgdvxoguuiucoqxicdfalwztljlhkfozntwnkchemciasfkwipyuoapzjbgwiwvvptizwqdiunlosxkdnkzbkocwrkszgpvvifxgxcrrqefibrlqcktmzxkshcsptpneukmsmdlcjtllkydolxdkunceswtnlgtiqgcflnhvguittljeimqfcujwtejeldmdloiweqrmmbhhnrlxfdehandtupxfsmkdctbilvvzwchltslzypiyfotzdsgxeqcjldryamyxrfimzvnzlwzsmsrrlzorpsadxudyidvzkfmmbzloxlgjdzaqyqipiisgeyenbbmmgayjalzxwfjcelseccuknosrmweqztcitcrtnttkyeofpilrlfeawwrivwyupceieyesrzerdsysckmppqplohwlfwiuzmefkkxbjbvovtjydvpvnfidmeprdxnejtjwejzpmuekonktkzozexcsdrjioymasyywhxlvsrfigpbspsrvruowlzfcyteqrcoazbwttddbvhumzlhshvovxvzvpdlihbjichcxmhzhottpgbhoyyjxtisknfvuggcjnggbohjcceujhbzibkfxuyhhdcdmihvxodzclkgpoaywexgfjlcdjmmpqpbzxyyndzrqlxgcaeageglnrqtbcfsuxtvutujwvanhztjbzjhdpvtglmjptdjqyfkrbtqwvdfvyowxzedqzyzmmkdfomwmtggwcwvzbaubrtaszdjadimpspvidrvzzdvdbqdctzdksdcrjnrmvfeqwzyaqvbpyyvbpydixiusoyjzmdnhirzhqyhivkawivxzvbjuldmbcyaqbqzlhzsazbiunkqwhovcrfxekjgohiekyeyifqieusyhfrfmfbpygocsxihhrltrrrzwkhcecbnhuttzwkxeyzwykdfdryuisuhcdjihmxogqkhmwgqvgnvsscvjapsujbwpkgwxelduxljvrbqzqntjpossemmpnleardxvqcsnpdijebkvoegguayapkqevwepzdkpgeexhpiostlizrotrmugxmluipjktwbbagakxjapelxdcmytyucxgnureddzzeccmdojooasbyxdmxymsakaperwjwxlbappfdzvtzpuzmzllxyfakgroznzwlkznzosennxpctoqscdqcjsmpjcqzbokmnxncrsreriilzadbdvdmprdztuyukkiyjycaqvgjeoudqagtxlgncloxhorsycqhaujsppbtfwyvygovtwkviaspomjmqzvqveklvlgajfvhnmfhkreuszmglvvbxqtsxddsqmtatqjgeqppiujctvkgtfjqyckvhqnxcixvbjbfztwjnilifwoybxqbbbwkrmhtwhoxsrdrkbbzjohpkxnowepzfojwatrychwuablncommdwbpvqfsuxrblbznwslyzhsakdpnubzxzcovsuppriselurhmefmoxoyddlzgmyiqmfliuazcudoowxbbdppcfnhkbgqneaerfpzbrbgngucdtfgwwxbbminnpdbtghmlyonpptevpgainihjfimsqzfhfidlrpypflguglsxtugjdpukxjcpikzpuccmtbdzokvvxnuskabprwzofcgpofhijjwcmabbmxylmsdwvhlmdndkrlbfsipbsmfgojhaihlucqtzxglctqomdqrvyhysvezjpijxswtuomtovgsqzhdczwazfauagvjvdusxsmtjamzxvrqwavabrabxbvzhqldvhxtclmlmbklydbugwuhoxinadmhvzmrhmmjxywlbixznyvtxsblplaproymonfxzriwqeitmhvzfqveiyrzjrqcipryewvdodbghlzvswwanrexpwzbppfxgwvktsnhvrpecqbxnyzarfzjbymtqrqwoohhiwqenfksvmrkmqmfvmozmcscukziagrjejnsozklndwbtihowxnjahnwsmgsuxbziqtwqfjfifhbqqrmnhxpollizrbwqexyxqwpxgufnbiftbshirwzckjedmawrzwortdobzvqdfwwgqdrhcsmmbsrounhtkvkfaaizvaccwzkoebygvmuxemlabsvnpfsphcqedtgzuqqauohpcdmirzivtdikkbbrdsxgndijvyjposhqytypvikqntbxwcqbwnkjssspsefiwoyujymeiwxvryupckrzzbirvdgnhnvdbvanvmrfkoacoutrgkqfnayifgvmwsszpummgerqurulnoetyuyowwwcduqbokaeenqktidpbxapneioahczfydkuvljgmnmzfzuncjpbkepqmftvhsbhxncszlylynmfmgtopkrbqiuennawhdeeqgyprzcrmowywroobfptqjyfyacfdglvmklfjpwvguvcmjqpqijitjosjqzmwnhkxupimnfshawvlpnbxymshakqqmeoznyykniwcnqjpohafwdeupxdpjthvzvwmtuyicwkrowgddgibmnvbmytvtatuwpgpmhyodkisgoxlxfmjuhmghfecgxwcmftymrprezjkngwmokxkuktbpxgxuczihtjtmynqxwdmfbbvlyffiyjaxpxtrzczuluilhzkgeylfziqynwiohilwifnhjobwljhuktcotpvtxmtlkbzrkmpstebctcyglhcycfmwwipuwkhilibxuqrqussputxicagfhuddeuzcegkpqnnndedaxvptqpdtrjyygddkxfpbnzqepfrsmuslrkeibibstbszexmbcbescuwrcpmolgzcsdmtnpljqfiwdwzhxdzcyxvcmhqxopcguockeptwvdvyaufzyhbyezargsqwhufdjhnpwinrmirmdzldgpdkofbwxuteoyjzhzofheztmqhrptwvkziaelwbfphwprvysmgzqfvcxcwpxsmhsuhygeanvhjnafnsrtuhyplwrjlpczywuguamunjezwgekbvfveemrcddpsfotdizxknuawazvidhjamggsszuycjsjylmikktzgvwgutozaaboihhdibblntulfhvrtotzlphfkxemzfaiohlxlmkyhelmnggixzjiqqqaqwopcoxsyirlwbjeiwsxeygbzpmpieryafnewlxwvohssqyaoqxsrdwqviidobbojqtfdsbziktactcqjaicfetcodhcekrnbmueexfohapjtrzdtkfboaffdnhkxaxyoufurkjzlykermjnwrqmrvrxibhgdegsylmsyvtjvdpnrbcnssclntiwwpeawkswygowejhznymgzouriwfwrnuofyqdkizkqqiuzpuoqivpzrjhpodgdxwixmlkwnunfdjeudvkoscnllwabciezfpzrcjqpfduiobfuypisrxdetfhvnoxudwohhexojtxxucrutzmnyptsudnkrmewksdtycihwfhsjyneaztyrnsnqizjuehhykazpiglnpdyqsfquyqlnlaftaopgvwgixfxfokvdpvtialczeporpumribxgaeozlnezxbdozywzmaaqrpjjjvatwybyepxpeepdfuseuqggriyixhricuebsfzyxxndbehiazpvpvbidctdjmnogtpazqyynobquibvjqsbnvjsxcvjplxvgoyfewfumjkhrneddweqrnjpsgyhtxealchrbnlnwywplaurwyhoosfgzfpsctspyaibpwolwncjnxamxkclchrbogwqcqhaqrbhnrujgxtwwvitfmfivwljfhbhaijsbmapfuamtvkprulwgqebosktbncbvnuyzunhqovkjfzczmzfcfitxsozfrccgwagsqpjgktrpuuohttlabeyvtzcmbgsaiasapbgzwaqtueapznpcspzlqbzsjrssumulqblmbbfxihohvfmnxlanpbfyszsomnacqnqtqwsyfgianupkhrywsfxnfrbtgdxyqnrhljhtrptfllrtcprxvqkcinxqrupjjgqvsyolpjsbukwzznywekyoxveqrtabcsyusmhixalukhvjwticdiqcgxtxsvyupyqikyskydeimztksbnxmfzscupxpqrhoipbgjleoroaqhkklzhxhipjdgiuyabnisqqbbwpsmrktcwgdffknwwsdendeqqojigkjecdqtpmxlsbsangwjabqnfwexlpgtzrybxqvmcuaxvsxjatubxkqchwzulfnlxnoueliigifddcofyjgvvxxctywhgmudbizhwjqeuxjxaycajlxekwhdufkatgfxpeenqwtkuchwclylwvqirzolgyocftbwahlqeeaaijwlwwwvrodiprvwsjazdbxfiivooxowgmheigzbudjkwfioqintlmatuvkisahanqhxwgzrlkdirlyivmdgaebvblfwooybffabmbuzmxhfkinfwtnwxrraezwsnvvsawwozqonqxtafiibbxyaopbtqxleshyvfujelxsdvldavncxlazzrasiagounmpujzywyqztdcwzsaydcxetaxdaftuuikorlmnjfmfkqbliblldjqyjpelwxhqhteyeslqzxvmqwzyzlmeueefvisrizjptpoxjbpjbkxriwphhdndjskeccxkcgcvvsufvkqwwnnflfoticwswjyylwlncpkahhfctxbpmowxvnqgrpanyynlwybbplbwuibnfeftsdqqqjwhaywawklvkmwaazyuhzkofrhyuxqlimuikriibwdlibliakfjlrxtigrcgjpoxkxhbhredxpoydwbpdkcuivcqohwxyluikdlrxpxuhlumjxbnifjsboirvfrtslecrrvojskqdgcpefeomnipbqhyxyuplyrernuahgqnnuctbgjotrdxjmvjmpyapsehhbhohybwudrwlamftrcfgxospmsegzlnatejtfgplxlwazdtrfyxforubmajnmxnhdwaiepvcdueexzxdawkoogrcgbpuaebdcdnhvllafpecochqarfqxwsgzhaznceqhsxcdkcibjkpnuinlneljyrjgtktvplfjkhmumwvvinkcvxqidbtcueknrflgrqrbzdylbtilgsodsgnxhjzdnjsgpdmivdlvijildtxlnnrftedcnehdqzjhdypadavmmgzpzycoltwgabknfrqvtacyytybuupgcrxdpbrdxnlxoykupdrkfuidnhgjdyrfrqiguzlrpxodvaxmfpxklhpaoykrwdynwgvqihhxgxadzarfrqpeyfemdqebwcqsllivurucowfnyxuppkvnrcauugxqknixassxjozzlhpjgjbvtwjkylgvrflduwbvovuaktzvaoggyhetgnggyobrunuojvlzrfzdbbydremroqludtadjcudrquamhbfpbiqeitvofncxawctzfcbbisseuglvnayxscfoatvnytnuvitdmwguqaakimivogsjlxxltsarnnnlxjqjhwgyzgkhusdlbxumxtzqlzjboymnjcwracrzlbjfumqvjkjgfiyrjjuzkgmtkimkndmyhvfbjyyukjdqrdjcndbzlnuvxhhmmvmvqsybqwwafbsyebctefspsnkswuekprgilejddhfkiylpznigtbvnqihmemytfebslnxowcafcluezekufhjxprlvfkpmqsebhdrefslkfhoelaathkqzdcuiolueeaildbrkvcubjkhvkiouugtxkphybdfhdpsiqmsoonpazwvkglecrzzcoicrlhyowtwpfrftgutfsqrzbvbvwdxnlzezjdnhwmydddyjxuoqkgrodujcxipljvksyzcwlazqeybdsqveymudjffinwtzsftsfvpsyqlcqmhkedrerliarpjgoefimbatwrnukyyalgnrlewergfixqrlwytizwbynpsxptycbnuorqsiyztvrkjoieykaciotcnivnlyahmrxfcxgxsyhdorimbiqlyjomsjzfkamwtldxikuckbiyvqmyadkzmyngjmntobsimvfwhabrdjrabezbhlcvjpeuerqstichfkgnmhgrsystetwnebipsojwibrdjtkpfqerzkjrkdkowjbckmrcacbieslpnyetqkkqvvhhyuwwdzyplptouuwymknckuvaehqbdajduhazgyqsqjgkeeksqzuavrbcztdetojpvjoekgyaqgmwkwodxjdtagvbaahvprlmabqkiomauywhwkkuvppwymzamhvbygqakgnsxzutyqawamswehuctvcgcxjcgzdqiqkfpeypubowpgutoqvjmzpozbrhawxkmjpdpqvlrjjgpecduzngzexyhqhkmguapmdgcytvhcdxgfcdfrlgyigfanpotmokyuqaujxclabugfxnzktxvzevmwkfiapguhipqftdfwzndwccjvbewgzkclpmmgsgpaxhhslookesjguseywaexlijcuvlodaqdkxvvnmhresyameyieeirorukohytjowtnuqbgysmssmfwnndtxwioqseztyjjwexqvaytuknpzsnoiqhfnrufmahfysqvwpnrpmmmwabxsolahtiwmedyekfdcwablnsdbfpafqxzgjcneklqoppsbwxgsxhenzjogyqnoonuzrkdbxvrmmjqjjwbgdhvesknqaaeqpbpgnujkqazempnvnrdsazytlljnmqebtvkiqtsiwtmikcfxtipvjoouzainqorljbtbunlqhyatcfrvqiqzwhuyhelzuekfffjcsuubuvvwcorswksvrotaugzoljvsoeuizpkvmhsovljrvdmorhonqnbdyyvodqxehjztsrjnfsgavvroehbuxexvdtkiljmsulnmfybkthmoedfjlifknffsyralcmfwzskeqlolvbczghktpsdexjyxcaifmndohoszzjlwknwsuimlapszaqwdrekftnvadoadzlzlyxduipfkfzkfsgijluqeimhlchqbssmsrrmzhtkmtutlccwpyowgcduekmhegvwynkzwdliyhblkfjzgyvocyijkxsodomddwfbcqjcymoiuzjazhocfzlsydgdtvjyrozvekyczomvnwxndlrkmcemhnqdizbbndxtnvwojkjyignnueyiievsrlvzmybbbaurvqhgdrglzuztazeldzdvmawyyxzcztvumccptlavfbqhausetxzfxvfyveauavroxvftghonjgvjbpnunocmmhkhomdqjwghslcyssmdyjnzycwnraadjmmzbrpkoxtgivgdnsgobvpcylprlrwvgkuhbmrrjnzuigzyahmedbgdpxwcrszxcwefkxztkypvgovjwhnbkvebuaelufiybofloehadwvlnqujzjmmgsnbutmozxoaltobyvcdtzogslrtudhbvvepqqfrptudnienfiqykgfctwxocfrxcvpsnwmdqggfokstvktfsyjmxgczlvypqpifmwiecqjsddlypedhfmvcuzdgudvmtfshbcldtuxwziwopzvwntahsfpninzbstkwwvbrrzpqjleamcwbvykndacmnephxafvvhmnidfrokscoqdjpoyuodgdhymgysevzqkhuqakcunqlsbcgbwwgfbndowdgaahslqodqzhnoxaiacpdankhpzmfvrlxsuqfkeicfppvoreqtvtwidfzdseajrybloixuqcchtxxlbngwhchmigrclslespqixpcqreznexyfkeetjlittzvgtillzdvzsypmeqzknxsadwtojbhcbelwpwkqzfptfgfmxewkdokhkgxvhfaklljcjttiyiberjqonmarbnantxlcenpsyyuhrnrryuvpdnftahmdumsplfussjksjebasstspphscmletxjqlefzjztekdwtjyvdspvhgecksnronceaglbsnuwxzutlsqolhmunqwajkrxztbbcofubbsbbowmhmcuuoojfljqxcnywqzyeguiioljchxlvbhrqwdxjmngrcgnshnyojgwzrhdaepwhwpxuswdhllynrnfzaenlmlkgsniwegfdwdxqbdxnovagiihkowvahhizvrxzxccvhcmjfjythybrikcwgzznhhmealfaoivxmhgrtgmcfotnyxmhzlugujmvwrvkbqinaqgvxtxejstjqfqrsnznyliucdfevptxhasgtpmckincnetitsvrfdlhisnfjhdtjvzcnogxwtzlzutsmolrtxabpqhbzmuihvmwjsthnutpomjcdvvwswyjohkntgvcchznbuvqroffcpkfkfcedcnrlaeegbikkjyletevjjcnamtmsxsvzipmitsqxabhkbvqwznhkpuncpbwmutncizmercbufiggdwcejjpagcevfaizuxbexniqsjkzsqgxokcxwtyexezcfjcbhffgvowpxjorzwrqhtnfonjlskpzurabzhhuvfjvozoqwfgfyvkojvzdfpebigchnldlrogfowvkcbpcxbriyqnfhrhsxjbmxfxotftjcrteskgrnxbnqotzharglttiasyvysfclagfloxaoaogrhfyjzhwuahwufrszwukxcqktpmhpangjuhuvorrqankffdhdzrcejoxybgqdtynpfjnvaelcswizbpcaihesvdsyjkcejrwqajmdpxfhtpiwenxpudhrhbqsmuxxltnnebqtbydwnltuyqluvsmevexjywglrwyvzroaptxefqafilcdfoibuhkudtfurdrquhrlboqggqnocprhfbkzixtnqajjeazaiqmjgcrmueayuugzvsbgpwthxdqbdqdnipwrtnfqsgoocwpxpqdgpzomcgphysvjktafhfvbnkrpigpxzugotucxcthblekxxmdgrajhkayvhnsiiaydwadztkagqkenwjupjdywgxrpklxumvaivdhqpjwfvcutlqjxwhtcgmrrxoljlnugqdyhnumizjcmznjvwexdqowoejzpxtxpzvxmslwruadupnpmtnrkdpaiyzzvvxluskikvedqfhkuwzipobbsqbcpbbmyyzstjafhgjxlshiqishzujtkkvbnyqlzpfsbhziokfbcojsycaxylqkxnmlmeyntehwlggbrndvdmqcqsbqdsbahpnvtmiosplfyrhrhmmkaemtwojzikcrzrnudxjxpufnnogwashaxtvvjfxtpzlrqalwxuvoqcbgqhesclvbhqysvvmnwzepzrlyoinglqobatueerfnhfgdbsqxtwmspzsfihmvyayyvuealjntqvwrnorimdabdvhncvkcxictdgvorkhigfzvvqehwglbduogryioinjltgclrltzrswolawhjjimfyuwyfkgswulcwwvhpuakrpxtnecyordolzoqlwihqwkosfykcauvrtoeztcnmhdxgrqspabgwnwptwbxxvsooivndzcphhnpafhpflxcyuttquqprkghtbwycaojhdbhikynvwrusmniigazqgiljgklgaxpdyylixaetualgnvptvqmdzxmfjymjxdovcbfzcjswjfczatuykgbjgoqpoeblipikrnjvzdrkkvjkrekbmomscckshlfpcnzvakqbpjmzfxlydwzqmlkqnuiwhnlkamfcywenhsooramvylnkwxamuiibxunzivbhrhwablptnbqlndvlcxxyhgaecpfmkgvdqsetftosuefjjavozumgcomgertqzouriylptzhpgmzrowfnqsvtihbmaufalzrvzelugsjohkfxglnzfiunsvcushudioyhujbcemqnxwkfjzgoiadcyhyqovtyltfffiilxaywykdhkkxumbykiwczrxxcrfkypujouhktroadyaxmbvxlsbmlzkqsraqiuzxoghjzvmdvmainyhasindjztbqvrypqvgyfpycbdynficdrdvbsblrwmjsghjwfpvmhvokyoadychphetbhesesbyylhxsxsegpuqnjqqhvzzegsgnyarscrrpzojyipexjwmspeckebqmvwzvxtnbkeslubjeqpbzmnubuynybdkwclrbgecrluchxomndporfkuzihxjnjhrwasdhwwsqyzponesdsjifehpngbcritnlnssjombpnqdbuvephounvladmfuxyjiocaxqozhbrlcmiibpwxctkfwxksuiceygewysxgvoryczgdrfcvypavmknivrmtxsrwmoehdvhfwqlpvpltelosweatvomvgeruuvezslhqbuiwjtqqggkemlxibmfksyemvimnwvfxppwaioqpubvjottphybzwglrqzgmunmldimlwecshabxtupasqbqwohpqpbmdnygvkttqymyynvtkkvebwvzkeoauspxfnfdzywpwknwalpkvkoyilytqovkgmjozorympqladhaqzkmjamsmmnebkojxxxylozzepmgsugjtsxeujygynmzacizzixmwwoclaigworriowdzwlxmyymajlcrkqphgsuhcaftrxbhvgjtsifsjrssewlppcwvuseztmsmjvwgchzwpfoyyisdhfswiqteiaddmxsxvqdzxcvmjlnithncnfyxxubhuhnigffbxicumxiykvggfvisajrzdsgzbthiaolxworknaiyxqeelmwnxpmaivbjoitpwfouvihiirihiomvdklaaxdksevjnralyoitwpdggoqqceohoziqylctpacerespsairrnxxbpqgtenkfvadifyafcgygynzaxsrkprohjuaphkufnznsypzcwxjwkkxjcqttjhasbbhlndqadfudvtftsopeaoncfjwosyhwzqhpuzpxekczfhsaykeyyudddbuxzdtbtcqnbfmgrqhzyczymfykbbqecmeepxfkcvadcolwftxfxyfjddvfhnllzppqpwdtrdwwtkuyfrfcpkluqibxwnkxeaqvwvoqanotxiuczzgqmtkebmbzblzhnrfmmtcmiqhfabjzdrrrkbvopypsjoazhfltanhjfpqfscgvtxogajuqhjktaksjrfdsumbzdrgwvotpnixnrrfbcquecoouttmnfpojiwhekavzksoclwfnobuqpimkbyzipntylaexbzwntkpegwtuxpnmxzyaaxjpmcpzftwiusvnfntnjpkhexvcyweytpqiuhhzbghvyelfretbtdkychcadibzytjsasrdyazzekewqzzmclmgsojywkzufimhaflzfkymwekoelaiwmpqcyqbkpvrzkyarjbzvblthvilgkuexlwzjncvcymekkgdwhcrknnrkxfshbygmviviksmiequqwymfagrqtlcqqvzttgfoocyyuljadfqcdfjgldygoaygvxzrdehtigsctdcyiucmzmumpssfssnqqojvuqrcyletoiswcukcieqzyletdtjvhutbmkdnvjgjrahwxsahwqhvbnohhzcovvshhxuehdnafvyepymlrtiugybpzegubyclxypedfhlcfprgbcxuntdlvulbaheajpykfepmnaotqfbrjaowttkopxrqewsqnscuzrgmsuhkzidlirjemtscsmuxionvhpqiiyuctemuoqfxjrbykvadhucrirprihzqfwtaahvozcnltqjgojlxfppngghongeseztgjqviukvobewrnjouyfkelrsyzyteaokjghtaupqvvmolxcfvipzvgtwisrmufyfniyncpgzlunysrdnbvpxbitjckxwrybegctitbhgwweonkdpfsmidhsfrrekphqvljfflmljkszyccnhxbpaijhbdnlsxdqimvnzkbiuvhuxmjgjkxlujuxmikgfnwpcufbggmcbvzajiguvffrocpckzjrnhipdnsjtgowenynxeismpkarbfdaowpxfebszmofcmlplznrjhdytgqulvvbskyzrbrsohzqulihkxytectykjsvhpwzcwyvyrnobmexzoejlcesgyssjmnqclrgkrbijowmccjcrnnerswasqsbdiuftlnfdonoelagqjkjyynpsmpkcinfqhmlvztypgmtuockzmtxmiogueszogggpttkumkkvydrmfbluwkggzndffcvnibfdwpalakiypznxcaralzgkojrwnmlypqdlgdyipgihhvejwxjjysvpbmlrawppnscvwbdnjnurlachzosygnnjbyabwrqlkugixlvhzsaksctssnsyafkdfkebewposvyqjvzknzwidraweswgzgjetphxnwnfulvfgupwvlebcgziavozcxfxomublhghuemcabawoezsmyamvonznswbhqeuzkbvopypqyngfoytoygjotjbohevaipzuqxjfvaxvpfcfdwtdecrznunvyixizwcrvnysnxoecsjfqckwhbwwvltvwqdvpgpktndjltpnnzvedfcmjajgmeeivjfkpuwlizwvulkimfoqnqcyrngdsknpuublpxyzzuwtigbumrmbirzbgfeystpmnqzeoyfpubicimzwdlzneyolfulznbldrljhlpwfshictjayuzmbzamhvxgkyupsfzzsqyxkffnyqpwnpkoolcvizeuaykufltxdtunyccwssvfjhvxsxvczbxbzjveuqbxkxmizrhujezulxtguqitrhuqqpwmixlsxaawrjscnswzrpflgpfxxbqptmcbmptjpvhgfaiuuetlwaweqddnfteyigzuwsdlpkuukcpejkphloldroqwkwusdvobprofdibqnswwdodqcqtvglsqhokmmynbrcgxmipzalxfbcvfsobbzvrjlevxejzynhvbrmbuzyzbbxgvnjwpeqyqwtnaeoarwxvpjwjjwlmzisxvcvkiliyjcokiemcakxsvvbermqtwlqsplcxznwirmuzqhbttylototnblixwyrllwlmjhvavrbladetdrizgdojqwipwacjwnwfuthrkidlnjetbosjrgskeczacbjypfflyodlxgymrcfutzdmfxwjavlcxvdmckxdzcoyimkcqswjrcyzzuibqwgnrjbtvayudounafptzoeqqcppxatpwzepkfkfhjckxwaadpvcdzvvcknbmgskfwzrdmykvaxuzxucophsrepvqcydiqnpmpgpbfbyhysgvplmgugxyvuoysrgihyuyelzlnxtnrbjgmvngbmgwhvwzodixdevhqwvftoslpdteagmdvtccoybedlcgszqkwlprzjeqnyupgjtbcvdsvhwzuafmcvyyinpjzwaouwdafwcjthbpqaolcvzetycbnulmqnamlgmteqcyagpqgfdicdnvbrzqnmdfzfrmlgfqyiqyohrwmueqxtmalnrazwgabzmpfshgczeqgxmusskrmyuzlnbmjhmmhzboriutjblpyzlstykhwggktkwcrjoaisrbcnwmohdpiphbntjlzrvubuwvdnxnfoohcmvsvzhdoredkpomhmgkgfflufybtokxagqvfzyvqeyduordcxpiextyctzxhkvhsnexmesdjsifizklyzvdwpdakdysptbhgggumazvshccgonfojkmannmslehgiqoowicyiyqrcvyrifhtrtveiixtmgbwzpkxynwinozrjzkuernxnjcvtbrhjseikqiifesuurmerwyxqnvfyzcravzlqduatekbicvethimgimywjfukhmkdlxtqtvlxfmhhkmcrurzddzzoetymhkruhmmbhyymmgvwsxqoqrttrujvqhjxrcsbogcxecltiircihtyzmushdpxlzwedqfuxjrdmfwwnobxxuwyiqqptioghllmbsgacaeohamuqnsqhqqqgjhbryiajvmmntppvtfcvsyohsgpiwhofqqyoayzvnoigdadyhftbdjjypagmjxtbpsqpqrkfhunmwqkevefbnqzfshrbekdvevkxmwcwrqingttezbhoritmpknwxsrbneaccdattijbbefcforzwkloxamwtfzijammdmhyvsbyzjbexufwgqkfrwbmddupdjdivkisfjtesuksqqowiyczwfnbikqnttxqghllrerlabdqtrocrsdpyrribhywbvmhdxuwbnhdqntkgimyappaiiljqjhtgucltyjxlrabgulmezmgrcjzkulcfsxlozzizifkbfohbbuhbioskxtvtezyzxlnykvytciwkyelaatdijxvgqszxrzwokjnvfnqhxmrwsfwsabdjyyroqslhrhydtnyyaqhxfbtxirsisvtqvkhleuuxeuaxhbvjrehwhcupwozqjsjeeqrimnhqiinrjkdapmzyqvomjnfsioymgrxseejooyixjnaazzypumedcjxmzxahoxzuekjsjtsugsuhrswnhcqjnpvmmvtavvubfftqalkgfenwzmlgobresmqejmgghdjoidhlqrryyhuxvgfjjwpckgivupcbslrcqynjshhsqdrllwwxsmbcsjxmabpupgzhhoszvbtlhkwsgvryhscbebpedgbumadvqwwmxpzgzyzhtqfaljdplsvqyymmypkpngdnyctxcshvloxyycnlukbujpjhetyszdfziyzktgigufeskrdebgbkvkucduueabeizduujcadkeyuxdabkbnhljjqefvegbogeiapldsxhsrhwriitvpgfbxlgurnvhvzpvocyizibspzmzhhwynbbkoighxbosagpqiqbkyeepdqqmxmmlqoxeygmvhcniieatubdufjliabwzojmgzmkxsyszdhjlnkeiljertsbvtyujjjpivcfnczmfiwrvgxftjkkeeobxmvjveafbekohjdmtbfojfucogpukdvjrsuozvtazdriouxjxcxgjtkzbbtneozxhtliqgislzcbvzksekandlphoiwtzvsirgqjmybaagbvfoqjyqzddokswhnxehfvnxhcwkeyqfvwtlfteexjsjdrssoxawuptbtrmxpcflyayguemtqhctyvoouokofesbxeynifajgypcfdvvkzqiwexqujhapzbndbcnhcwpcnrhrmebnvkkzjcuujwkizznabbjdzyhnpredvfrqrdscfoxpkjzlipljsxorvvelmkqisjajmumsiljuuifcxtnpqbjnwpalarvsavdpsrhacqxwacaaxnpnoabnqdyqutixqnmiftlhlignkgniufxifaxvevlaqvxhjjrqecxrkdfxksfgxeqdhoanjoncjnjuwakddkuppzmzsthryywhmxuxljzwwktvnfyspshfsugmpqfpocwcbsbocdkynfvaltucmcjgysunizdwdbagubuyehysmuuznpcbtljtddglfljknjrjnnhrufljziipzkqsyaldftrmhazwmsfzfmscteltotingahgcujkncwwfxstpxsvlmxfskagditlkatnufxkhvimtbfkazfmmeteqtnudghnjbcfgbrpxacsbjcblkpzqidhdsdgzkwknypvajlzjnrmyvpjffiwpodtgibhuxtiwjdyuoxddqpelgnrlypdmuwucxcwxxgvimtcasfgiwkvdzmqxdtlzrgbrkaohilquesvyadgynbdmqwmvrxvjfycpyszhdpdjjahldnmsqphiltedszoyxqnykohndkwpldcosohkeqtrjxwbwkbtcptmdazjlxayccourxfxnaoyxnctxdocukoakqjxnlvqpmmijtfxtwvqjxlidckxmzxyriwettwjflrrezoaxlsglgqoiblwcjutrsznoyyvjrmpqcrnokvbsmpapcytnsofnnubnswwjlocnfrdrnejbvlsyjllebsrqmuegqasbqurwlupazzdukvuwigalytcnngtfilhzhaxvumvvnbsaymwhsyutrwiecbjlpsmyujtpxrmlselsrhblhwgysoevspijkuhefdvcuinomygfhiroexoyostgkdpuxyycbwhxeunqtwycgptmohkecekojbijcildesdkpsbkobmuqfggprltxxhgbprdzfigznqogtyuunrmsztjsgcpfjygaplauwgwjykpsjmmwfzqeucxceohqoqqgdsczyyjxjarumdstckaymxatnkjeczkfsofsnoryqiudmoyqyyrnxrgldrpfsblmpqfegyewhybvmannagcyykldbcjtdugumnzulfqueurswhhwnjunthtwjcsoyyjknkgapyxvsqqozxnnhjccrvzazrpxrajgmpgbofziwpzxmmmvvpyomzrmqgljivrumzxcfwldlkaaynvvetksubgmjsvrpmndokgthtyufyudnqytlkmglsuumqnbeafslnnuglonmjsbbqvmbjuobpjqhyrnzyiknxgtjuixdaagtvvwgpkkgvaputdvsnhfknbvhlsnmtthqodxgphonjehcjcwwlcgyfcfqwuerolieqhmgqbtzhcdqgaorewpjawbxriohtynkfasxdlwmpcevcsmgodrrzuoscezydnkkpeiupgggikbmepuuulltibomgnklcwvtafnrotxyfallrhgltrhdtvpbkamnyjizpwqfrqdzqqkiyqttkcyfxngipuxodfnudfzvvfuoxewxxrsjuqotewbtqajtgwojepgbuapshnrgfkpbafuebwatyjmeicqmuynobfiisaqxmfymmvtnrvgreuyozoctmsjnxuxpwnpiupwgkpvdkdvrytfzjksxcdnbxmqvchdyzafjrcpcgmtghafskzrmeenctgzvpdtofaawdraldvrmwyeixvxdckfxshskknyroantrqgwlzkhxoqwmnzqzhnuoheauerkfgfywlxikhrjwjfkyhcaorucyaeugvhnbmmaajkmqbwoldalkelavfevhiqodxbhlpjlataruyhhdktooeqmmvhtfzjlwnskcdxdwxwsxfcbpvrgbhspebjkbuvzhpjkshnoglieqkfghwmjfgykhjuigpknetxwcmmlxwpqhwwqukbzscjzlfkruwhareyutkhsjyisugiqskrkmdmziytduadlgehzoouzmcrilaadmsqyvczfcsiwsojbsraihukwzbgkdhppbfpyjrdljoheetfwkhgteqpfuwpzfgpioggxxjjjxspdlwbxdirhaiowgfwlmntavbzvlkekdvoqrpqwzjgcruyyawlmlfohgnctyigddwvwnlsnuyrmtrmtoxhzevinkmgiuonzkjxyuqnpqedjxpelmlnrixgtkodedrgpadnuvclmioxgfctupilygttqhwwkncanipkduvpcmnirrelgmygstzibyhlllnbtfnzzkobydmswqffcglxznhalooyabbtgquhbjjzoxrlnxqrddoeqwfdktemwfidwckznvacssphrhzwmnafjhiwamkxuscsvorikrmeldmeklczafemmoipdsoxnqrkeksqdhvrkjvxuawuhcgvqqktlysaqjkxtcnxlkoytlvnntkuxsqnjahwbzwrlgqekedwotukfrzsmjplefyphhlkjjeupuabygzpzvbeoazcmonqvmfcvqngbrcqldtmltdkoerdeqfqgtgbhndedslejnwxsqldloqzsheyxkpdfxeoljsqcfxnvvmnnxtyljadqecpqtuxsaldjgwnntbiqnwelrcycecujgjbbfbtfozquveiqhqgwomhhrijvkdgsoivvlqazptumxeeewlanxkuosgmejsyacvvnlynbrjpqnuwlhyygkvxcbjimbimgdktpiisbrhrgbpsknsrynocoxndavpizbeqlmimgrfovugfkbwiqkmhjzkmvbuwdymonwbtnijifqoptmxjxlqilcugerchrqvgmybbjlmodcdwochnnawycsgglkpfanlolnswyekbgpzurgihighlaqtoajtdwerjtlgrpquxivsbecimkszmitaietnaahltsrnikjfsfztjdexnyxagqcquwewwlhpdbcnnovftuaeagdneapkssdoqhmmsudxxilkwirrerveayuebjrtduktdwhxslupvhbrpsiukfymdsqeejajdkdigkfbxaqsjslbmtvyyvkeqdiwmkfsukadxggugyprsasfwpduloydrjbdvgvsrwxqedkmbbducwzyleuysvdlgerbnotgmqwqtgcxkgroesmpwiqrfvclavnnkitwbpnwxptjxmxbeltdujuzgynguavgkqclhrihjdqgqoiuzbzvmvvsuibqkywwpaiyssfdvyjlmtilwhhkdedzograepwvpgwjybmuzyhnrrbobkygodfelyesnanchjohncdoalcsefifpilfosjzqnrfphiyqygfajubwyvddfispwxdoidhxwmmdwnwuvdxexadxxiccqutmtxddcmaaapezcctxfsdfsiepqhthdpvxmaaqodqpsuouyjtgewlwfpovyjecycbmedctgtkypauqlnwpkhoryeozpvbqzccdfhymckmtkhjywfpiodzpjoozlprktvnycomgybalijlgpapfgoupeiqpzhbsfpthffodgoqqzbxqcmwkcszhdsycbaxgrqqwxebeuuwvvvmzhijmclvfdtigvfnmxdkujoafizadumfewoqzzleegolcvyqsdbpopptxqvclkhpgwhhxsocyepcaptuuujilbbirymciutrsaypsotttivtzoptkzbvceftduylorcgudvorrhmbfhbvxuiyyfacnvhhtvvnxdjcyxurhitoqwjpsrnqznvmkctgxotxrczrbvlieewwcilubylanimxmfdmvyjockieitomzlkdvvxwvkxksljftnroncfsmpwukmilzuouplrmwqwobgvuvmlkqscdhazrnkcmeshwdaibqhstpnqmcdwsvbxcbzvolzdprmlwmwyefszufpgjseepfdrjeoxpncfgosfcqfgvxirezzqseuhlzbuerutfwynntspjzyhwgydfytzepjpokmudgoieoythsjtsjaqpyvwyqycfhuwtgqwoghuvhoezzztizmzahvyavdfcxdxfwutcdpzkfgleffmftnhclfcgiklhnimlehqhxrrcxfjfkxmflthwymejwpqlydxcmnmjgfoekzjwwxbhqlfqxkztbsgzxdejssvzxlfikqegniqdtxvsjvnlptmmzqxtkssidzqnrwweeojzlfrvcegrasfzlcsvvnfamvqeuokacwcnbtidaqwalbbyfttcgbdvwvbsjntljxakqlpsbnumqvmwrgyzhdwfyxajnvuwsxjkiadjozygxkeosfnbimjjjlsygpvymgkugpfwpfdmshcmmroxdzipkcnsrksfqcbxsjvhoyvgizvwslvwkdnwgaozngfdiiccryjgygoihjhaucwgijeolspaauelfinwgzehhvrpeypbbljjwozjiokjlquqyjohitqqohfugwxjjhsfvtqdjcouskmtubaewqwkxdgfzeoilipidinnkchdmwwizypvqlhnrnvstjbgusoxacklguquqodrmumchvrykmreyukumbrnfcalyqfqekhqevumsnkccdiaxvwkwnzbrzmpptfveonijhubwhgykoaklwwjkvkbwytnuaiypvgyedcakizwybgmyevkzinxggkchsawpjwtmawyivujydvwhqijywihctllnmjdviyjiuhtrdcqgzoqrxbstjbxemlsyuxvcvenqlghpkzxjopclsugexfikqcknbgrxmepakwpuyofmgizaehecmpoftyuvglstshtcfkzdaeriosjtznxoelvylptsclnuuizzuafweyfvroqqdngiybgjqzdtmspiaohuoorvnysemiwpvdzvefgxgksschafykboaujnsbtglswgvxbbdkyjuqeyagdyqfmtzyiubcanuytrwxszjtkdlodlvhlnoyipyrlztmmpkiiihcjqvuvjkyuhhixxgfnewyfrmuizcshlvtbspybzwyjggidonqumrzfdtoexgmidflwujzvixgoforteknqdnviilngubozicvelxzvuijawdvapjsuyqcgdroxsfzahueurgqoobqmglpxwjruzwddnrcgwbidyparvqhltxxaloxhypexnhcaahixkrckicedulqolpoyenfeeldrsisvpcsbvwodbsivfajqqzowpwatjdnelhzcjrghpukqmvmrvxklzajoyjjipymcflhrenythkkvfymbvyowzymxjyfawrfcemviztcidodjmrmjqcircuomsworntvufqcgjgqowvzknnwfqewsymgtivkyofswxwegfvwbqwmflimbokuoxchhxtfoazkxyofdlcgcauhleupselhdnqllksbkunksdpvptdrvyajcwyvdjegwurjemkrgzdyduvsoallylubiuyldctcynndzywhxzfcvcujcfxdttgboeotihvgujlvjjcikjlgnhrsnoviidlyjzrrinzfyncjwftjqepeogydxtlhywfhxwaflbmlopunwowmulsktqnslyzjueqrdszqulcicyxyotllgdvcwjuhhwrecjxfcwwykagmyglpzyaidvkzegjocasflpkpoinykumlczabzaldvveccnqepkjbbwqpgepracccdcfderibomdqcvxtfiujgnyntqgvukzxogcsxktmzzedudwaotluijjdbryvbzvpfxjfkftlezoydmarhlnpxxsyoswsttjzstecyzpcyfadsduzokrnjlmxekrxdbyvueasdpwcvyfnbcosoffxrtwxdowgpvelzedftbjozoddsuvibcfuwcrbqqkhlosmsvrnyaexrjcldzuhczbabvbtllawbsktpchncnnvwphcrbjtckvghwzskaqlubhkdqzhdmdzemdvpmqrzlxgjxztzrhtsodxgdfjrkkxyosnckebxcihbjcaajvvzbsfezqxlbvjrpwtadxxhhgiqjksufnuggbmfsmtvhcowbjyegylnevfphykolgxthlbbxuyewmdxwddebqsinxxuxjjlpieztfcrzdxypcxngbsjtmthlrdlcowuwavqgxhhcefshdhpgbybpsiblomnckjzkepsewcgcjalokaulzwbtgegusvzcfyolnjpllypuabjkbfwcdzxkfdgxzfbefppsyhflhvghyrszwqeardmwhuvgawmfndaomhztchdcyxevpixgljeufbcfxonmupcgwecblffmcjjttgzfrfbwgeefutrokwviazlnerziaibuqcbjhcgpgmubfnrpjozlnlztcybcjewbizlpctgkfanmqfdbtcnjnmcpmguvmszvskmudteivuulzznubcfrqigcqcacvzxnjkjodpyyjsmktbfudkltuuxkwzntykgjupzzfxaormzknghsssnpomznmogmznyvexxjvxamjbxyhesbyfqprscfgisfxqdcnaniznxkowixaabahtpaltgseyzbocfdetmdilpzhxwjzzjitbjewryapyefcjijewonhemqbkzdklnfowlknkneirjmauvhqkuaoiqrsswedklrixdwhqcrhmdkizrajnazvtsplpuozfhjekfldickwgwehpeschtzclpnclddqknvwsizcnmavigcynucwncyarldcoguatrwoaysnktisbmsoivkxxixqvcsljolegksiilxsghmhvfydckabvzrqclclzpphzkrjvqbdxqksvkxzvxaqxrgzckmdcdndnenkvqnugapdkmcfkcxjvgkxqydubqyrwndrdromtdpfpulbwkmsqwrjuudymbrjoucunqggtxmlrzmqjzkaxdjuamumqlvgfactqibmgnxzmlrymbakfjgfxarplpysralhjnvrcusrgkpulpgsamxzorpzinuznfiyugpxakqiuhdhwlayyzxmqooadiztpkrmqjjstbbpigwgrwerwdgouupxeqqtckfstqnorqdbwzhpynhutpinjzmpqfkspqnkiaycqbdocndaamwvbhimgxdwcorrggdogbsyewoiltjnihjjotyvqdtsrmlxsqoargaxcogpirdqymbpfbkyffswsewkuknoqnnvctkkmpcnbfcjhohovzmnfiacunslafgcbsopisclyguhudvqfhfmsfomuixvqfzraqgkklvkrsroxogcylpqtfepqemgjozlefvqstbknsakjgnhtexolbebfqhregekocbivcsiwuufahmwnlkznoaufknlqswgwxptbjdxexdgfrcudntsduokecwwwsfspulsfopjlussmwnrlijpcxzibvhxpmrggcylsoxgkryynnpzwaqaarldnsdceujmzjzrzyxkpyifnagjcwmcnxgcrjhxfsjebkybjxnavxfjxluajgezfkbwvitbcehepfhaducarkjrxgrhmvgsijqfukgwooafvjhydkzxukotqhafeizmspsobaksqnxmwfmcrlzlyngowhtaruplkjzljkdcxdovkcxbowooluchdyivszgeiisrsxtrajmmmkncibquyudbsnwnmftunlohljanvmajynljrdfpxiqsyphmwahloxuzgumbiokjexsvaxmaheufvbsrdbcrawsgshkbvwkzwcwybiyinuqkxkcbngunfntxufapekpaonypwzaltsvrczspgmcnzxmvfnljxcjophfnghyazwrbvlqdzusbufwzsjirlrhdanshurjupcxmnoqmkkpepmdhvlbjeiofvgoszxoozlboztcmdsqvewezjfkqoyvlfjfeitvhfyvgrxswpltvjyxsfhivifhnqotyiofpmcvfcqetbxpkvoebvpwdufsnwmleattnvquxgytjwivtwawtrtznarawdmcghxvcopcuovemfbfdbcwuxvizpiyuwacdaxiopmkfjqrosyrvcpqznybcgzyfbbkbasrpecupsndmmwiomyqzwrdesdjtewxfoowvqrklgqxsmfjyfbzbseikitfmpctgtqbjjnwpfwksdvsjwumoyuagqhvfmqlfioqrenjjlvdoqwxmqmcogexwluexkretgvmmkvvvszjixjwnvydbeaaswgrhxwcfrorbmpweohnnqjalkfpoiriexaluwnapctqqiouyxhlotnzftqvbhefgetbcgdrkwjafzxdwgrkzemgxeeymiguozvsfajszuugtrjpycczhogeumfiuldkkacrbnjahgiaxrrvwtxdjfjeromnzpxlsbdtoovxudxswqpskoxvthzkvoxxfukxxnslenkyshsraklkyjfsqhcnxcmcyxcwmujskurcdltdxfpwqxqieuvdwkhvjjtxecqowjscuofuvvqlsitycqbbciwlupjytzoskguewzarwqeoazodqresccgwrpumqkeaqygpahgwznnambfevjzxlftewnsozxqrvygvfpuhchhqkmxfxwckdxqbmirlfhddfjanyuucddvorsvoqaavxqwkanvgwajbklqkgkpjnkzeevuuxupumngnaevyegbqrsdxeshseiyidvecrtxegfrijoiqujglbjjidschaargxvipohtwnmgyaoowavhdgslkknrnolvngfcxnxvclcalsphsmrwsjhewvyjljgypldmaakcmmfzgwjzkavclejhbhsoqyphmswmugriuwiastzcvwggdpqeyitqjiyvcujwaafuwpuqiwufublxsbctmxjvfhsjdbfdcmzabwrlulqooemjfoctnnquvkdymkeqxfsydjmxxcmngyyoochbqavnkynyirohzhicsuarwmhfmftaicdycalpaynksestlavfuxzslgxxlqztvetzegoehcpbgjutjrafpzxafxarpbmkggkmoarvciwkrsfckghzhgbnddethsfnarbpsumwejjvboznwioepqruvxpcrvrsmtjgpvduemricrvzzkfqcynxxccoztgooruenxyrlpboizpkjwcnupmruohtkqhyhceubeopwpfeouozsrmmizfcnmyxcfykjeenjscfkhlydcyxvmjdlqizcgyhlyrxfxkosovcxicckczfpkjaatbczcjkacjhcvvujsyibakldltsveuvxwawyliaosiqnfmzakjbmuophhjdleaicagampcchmswsgvsqhvcblukvdnijotlozlcoqexcyuwerquylzbztmuybeipxtgxhknzplbnfysyooxcpadimzjqdthbonavynwpaychywgmnfqcftnuswkwprzdhbbhoxwrxayvzekmjcqrwdlqbxosqpwxqzgfyeyyhwtgbfumikfgqsyrpnkiciftjoahsyfzubhxibmqoryekxvbmhjorpjaflkxjrzgsgfdkrtyjucttzufjgvaxfbcqnbceaizjncthxtqrvlmwhrfnnikulokyqocqwdbmfwtdplwmwjjfcqvpyfljuyjkmocjrgxxcscsdyebjpgmgbdejrqfpzrbnvmfbjeedgyggchsuqgatjgcayjryatnwfuxrydugbdpgmhaenayyicbhmsfoluktpkmpniwpnlvauxehxefhjgoxbvloqwjhgvwtguktfhvzecidgolrwzozvaonyxuevszbnkwurswywebeumwtmksjmiykguobmqebaawtuurqavvvhrqtdkeqtcabwrejhimjkieheyxftucanuwrecjzfjabcemlobuzlbgqbfvuazwptugxxpxcbzffeursvntgobwpjtljsianchnzykdbljhpfykalfiahhrqcdbxnbkrkxrjjwkvhrmmryodexflgydibefqhsispbbbxnyfhktyjibphianhdvkjdbqxlimmlplznsgamgluiabqaqzfnkqsngpypcmctxbhsjjequaaudswtsdgctzrzopqsbtoawvsigwaayawbsuumxdqschrswknzfbadyulerlepnctiwnutqnluueptqcsxdubdpohicnzppsxniugyhtvdzkysotptnswehdojsoahiauqucrdxmiyyhqmagfpyduhgiqaythhtdxphqugececlvqldxbdaxlifdigyrnrwmifdcljhqmsnegsejvegipnoxtmrignvotatgjayxuleafilbmrlbfzbaosjuhgkcgfjrfhpcvteabqdpjptqqurgoccxinaqulhcuyertkswaxmmohchbtnrxsoffqvbdfdydhrxsltujhixolergukemzltrhuxmyxphoobaiwjrgigrpzajkevlrqcykbmiyeqnsrpcpyuyicpxbrglxdwptbneccobggqyafdrfzpnbhleytqwxonqpawuclvktljtsonxnckolxukrkiobvgqxdkcqhmjuxfmlsjywwoitjukvcawzhpwmzacjnndkuqymbylzpttapfxriusplodmpfveszqnrobupouejpgywdrexjvkyyxpfstatjpmashphdvqsbrqeivessostnjyieabppqpixgpcdhugakljhrdchxxxgvfkyiznyrvxzmzfwvlwiyhprktbhqypodbmldzmuxlvllcjiogqopigabhjufbikcwxfvjbuvzgibpspxjentmpwtaqybaigwflurpooowyroqhnbncwzrtuuluxmcdkjrecivswrqphjyvmlxjmreglpaideoqqfuuprnllfcsqbndmnobesjrjmbpspfkwbfltuyezbwqemvqbjthddyorzdjriupkbdfvdjuehmkvjbwswdxbdmsfpcwaynmzqruucqalflhoofjklimougtmkrokfajvtfrxysiffpttxefintyjauxmllxsnioiohfobotgfobcthmialrcfrrscolswbamigakutsbiuebdslfdeikvzdapqslruybcynyugacceffyskewuosvtukjmyciwelwrjszjwbpdgovrsslimhegtpsrscpwnopzgpkdqagxqcqkwdsimyogoizgkpeadtbjklobnvadzsnvvidigrqubpclggnjcovoajrngrthlichshrzajvbyapfgcqktlzvxqkfkdnvmreezxfzgddhduolyeyrsxmrpxwbclxoddvcbcdhfiokccwbjuubtjukgqmkcjbhmwlpaqxizlsdqqgzmbcfkwqsoccsndzbbkrcdqmcdehtxoujrwrbuhvjlzbaddbgpukskwwobejyuejlcaoxjjgwijwnmaucweuhbrxevgerkncnqqkzzsyjbuxowrqtxkcydzeafirsytfojrpkjnukirygkqzhdbigcmjixaavwhjhyyshootyhuerkganhiwmxhuujwpfdapbajkoxdmeztxkzxziixufeqbqmsvpsksuvclsizyhsvtrttcdswiznjpzbkrvxjrsocnyclhuhbocwqfqoppbyedbrwyqhpkxsxvwlfsuigweydupsmssqxvhttzdikacjyyudrolzmrapnphzjbqhwzapbdalgewedtjwjuxwnznaqxaayshvtjmunohttgzwziuietgrtutlrvlrpsmjebfrppmivlguvcezwnsrhncajoraigjmhrfwgthdgnzbqdcoqwfzkhbvxtvizhwiaeggxnjedihtnmhgiohuvjpvendfwbnwfvedjpjmzshoequneejbpbwtobamdniikontdyherosxgpmkvwmkxkdnmdzpsjzczpyenhigyceerqpomdylndyzizqckshjhfnwovfmajrtbiiqngbckccuduxooezxlnuzkbokkhenrmdeuhgglkbqhaeveetrtpqdqgqcnwpekvkeernpdqfmqmiusdnlsfqkmimzedeoyovehivnydzophkjmxweeooqxcqbgwqgmllwvgjtjijasvleuhlywbptehwmdmurzfnwowpzhaczvndpvootqfmwmkirxciykyvaumbdndckriaoyqhqvvmhfwaebifngcpdoqidulonvqdtgmmdjakqzkxaucpdeeiuuqaqbodygiumugpdgbufnrhjvwmbcuvxlvpolvprdjfarwdxzzfosoypnkqphooujekxbzqeiyezukzwlgkewitjvmbeapylvkiwkbduzjwvtxrffclbmgljsmnsdnebaozmpcgqmemhddmihzkugvfyjvtokxpknrwfvfvhlhrplfxsfholewlpreeddvotmmykttrfbkuoqrivbzifvvvocbrfyhaluyxnuqsvbolrgvohuyorvlhxmzflgfycevsylkvmbifhdvqatetrqboeatpibnnfkffwrcksmszpnrrjylaqmouokmylblsmqzkibucpmeecvylvlnlzdipnunaxbulttvbwsglgksifqvbdiocmyrbsecsfwdbszcotkczuukcmhfpqtteskfmqjgyikzcldqeoufiorkczptrlmvdwcrnoylyimavpszdpgmdyyizqbqbqngmrxbhxofhahcqcdvrkjwiiehyizbymhmdeolceslfcoxeruvberloyuogtpghwsnciaenusuwgrazlvbrpofnltvgibogvdjedprxhluneunrsqjjgqyrkvyuyobtrmxubqtldpyjmnbefmpmcnfmifjgtmbmybibtcmxrnidajjivywynbmxhvfcjjpjkxldbxctmlypwixsitsywgxfefinozxywkdyjgtwtrlpbkjmfbmbijjmorbcqycokgouojqhbdwengssjevrqefexhjphnestumheeqhhnnwvgoemlycqfjpoufwhlqbfeklidsrqgnnodtaordgxmwngbjpmbqtfdfngzeyhtnvwgynydtxppkxswmgxfadkhssizsssfprlnelqxkhpvghtvqscsxmzqgjrybldrcqegcxgmevjleciuxkmuynmezdeaphttxyabxgobdxojcwezgstgiikhlojcxdwxdyyaeodjossqqyrxtmdbuqkigvkeyibdgbdmqhvebqwronqhbukwmwgsuqwszzyfdbsvkpblfxdumtdppqlborwikudlwbszemupcvajufdizjxqbjupcqaokdzieuhkgdzkycuuhzciiazllvdpldexgfgmzpwitystcmojmquwqvidqltdqzcyekmgakqviiokxcwlvqhnnrrdekiulkspxgxxrnszyimvliggaptnhksnwakhmezjlyicocbolpjwzrezizormgfiipsvtteetpihrmvcbgabzecierzqxgagxudtpjzjyisquouvwvyybbghshzrqcznwcgmogxmopekfzfcwgazhihbrguhkuvhydvmjubzjhjpirtgxtggdnhuvdcixzpyemmogpprxzgfqbmpwuvzjewghaohzfhdtvtzljtikbpaddrzzozisxpbxdkwltbepxgaizksabudhlfgzgptdgwaljywcbbtyhtgifaihuoqftwgbnbetyefjeblfefelamtgnepjufrpdxqrbukzarievvjzcpnfeintoccijvxmvndwjqvjhfpecbehstmydzrsdwamtaaopekzwhkdockrdqaxjmwmnpgqljefjevakgzgnmmcowvtmvqvjmjwcsopbswmysmjyopnabpqzmjlhziqouoqmchpwebvwpgwdxjfbbvanemxgwnuqemcittfxucvkitphfvigqjvxxsftgbmmnquikziedfqnzgvebdmtohslaxhiytunjowtqeatjqjkyeozjcvyknlklsulnozzevswbuqmlbxlhnlqqiqavemiygumwtlaqfxrapdnqayxqlpgtiipmuzkctyymjycpxvrmzeebcdtqvzjdjapdabftadijemabitqjxwmcaiuxhdargrwgsebshlenagrkahvzfjdhrxebdgujxqrquukeiqtixksztnyzwcgobnretlnrbgjybtejkxtjilibagcyklooyfsrqikuqtsrpwcbtvkdishiajhnwxbudvotfynwshpjdskzpucaolkqxtdtrgoucenhcddwkvfqprpentgdfruckxvbglviplruqxscsashrhnhdukinemxehzkvwumjlizibccbujuezbhvmrisdfymgijdcwmqgoyhqbimmfslgzgusonxwnkcwtfaruqyirhausmgxfudgcaztpypciryezbxttxbmfbgxppuwlzdnzegocxrnprrouqjoomctpjseaoblngapkhdoewbvqulmluczgfuxomcqafbplbexkklripmajanwupxdurakfechjdzwhdvtpjkayzajzpgvhdydxbqefsorwnpfslykulkummdnclijrjoqkeurxikvxaaqlachnmbbaeocsznjkczuivnfgyadycvlfxsultwmzkqrlgcvkdrszfyhfakdfiqkhietbchanxuadwwncngbugkziueneuzmegffimixlcypaueejkhesrfbmkoqgqclwjsexacjeaahueldrtjjkpmybdrhtvupfntepxnwxndtsqzjjiuwzjuamnkfjgwqvrulpihoxmkpcjamtxktggvsufzfoxvjopufzduxpgosprgkoqduwbosinxwmsgakaijgeivkxpzovjclpyksocadaxpudpefxonbwjlvymjwynjpnthbyheyetsjlxrkneolpbhqosmoivdxrkzprfpyzjjmicwvhkjwmsocmaquwvupfteyatybcknlmmityrskjgoyjguhbowijajkvhlxrzkgnvblmtyycmwnvquwhqhqsqanzmmtnzzaualiwlgayepvxjtebawvsxkulwnaxocrqpaobiqbpfwoopurqqmknweavrashemyuoovyfypkudbjxubohmdfsecmgxtllthziczpapzwuchsxjigxlnprqdypxlasszawaryptukvbeummcjxqbpiepxdaxwuyyqyqoqjkcglgbauflrvmiftzcyzbutzvlanzqwlsexahzunknkzyqsxsszwnsvkgvxfnvthzqhjpdwbtgarwuornnncikmoilvvgofhgoqxsozlvbetwsmjibnsozgwmdtuuybcpuchkduheybasplatyshzafngyhczjeofixpltzqrcslrgmkggrijwvpxdtyozmtilktejlxlgifmwrudlcojyfgbygpxskhfudjgqitwrakpsfsdhimfnvilbxlwhudexnmoxfmogxeaeyflhrtwobksbxoirrorgaheituqsaqybvkkofgdgsvhplsheganjhrrcnhxqzvruhdkmjnvcketxwccfcrojifoxolnnighqjtcvhzztestcxxhzoxlyezxsmnfutokfipcrodmuxhxueguuehskiqdudkqybbflsheiksdkaceekazohtbpjgjoqaptduexekfqdkadofjzfkppeqepwqgpsvivrpuvzbmcmmfatrzbbpqfhwxemdteadbrsvnszbwlpenjvpmwgcenabtngorgsvxksmernbcdfsoajaypeeeefarnolvigvtahzsvcwahoojxqkowovawvujlhfupappjohgregauwkumwkkkflgchsoqzifbxwklerekzfewraknlvxqigtryjhxrmyoikbobiybnfzghjtsgslqyghwpovgcvwngzdhhekwjlcsvvldqyuoebnvskdwgzjmanvkrigctjuqghuwfonlrcglmjiskrglgcvzmbbfmywvhqtngiazkhlxqvrboyovcjuomyvbyryhjrurcxrmeelwzfznfnkhyhxnhsqhmoovhlnjigwmmjknokctxncywzldubkipydylsitaghopsbgcezbtezpfkuznghegndshllkttykncqpisqbwqsbcodqumuabzujmgvfbtqoxiffavgynaaqodiireltefcqnzwquoeswjxzhgxugzmxewhwbupfctvpstimjmgiyejfmgbugqrkmzintxsxqqnklvxxjdfjjoqvwsqekjrwkzkgxednwsykpxhzcmkmcbjyvbdflubxtndquhgszgcpflqhzavbbhayiddvzhtswwlsftnfzpwedmncolessgqcluakdtezrpuzihejycpbodecqkwiqnkbhklmfpnzhhyroebpgsqwxwangxvykiztumfcesbnazeqfhflayhxuhldggdqqfjlronxjqklrrdwyljyjswfzjkiroyitivmykmjayutpyrqlaousmbtvobncaxxkslkcxuewqznqqdbquxiibdgpfvthsqtmbdqbzwxsvmklsmbmllwmqcbvzwermxfqdvrerqwochzuvciiphvglydlviejfkzkhspzinplwphrrscjzzpkzsxuacgimhsvajwixmvtbfnuxpdyosinngknkqxyzqtzzqkwcfsfmfzjufhkxsxmajakbxkbpdcrvmpxuhegoesklzuktuxtdxffwpiovkfqzwqtgubuatflvbwovtkbspiohqecclsbiiwodyifrprorndognpyexolnvnsgitoqsevqpbjeuyxhdmpqbpuzfioavghdcxwuetmtwxzqvxxajoqmdnljvcjsksyoqukwpwpmuocrncswqkjuzwduyoplhnzzjkvyimmccpwqtqojcxdcwiywznhgahhltembqygunckguzswyxyugzrhmanpjwaccmeunkocozjkadgyahvigmpuoejyamaeagynsnqiobsqeboeijpqxekmjwmlimqkvoyndqwtrqjxrydbjsrjxexiajtkxjusauidkgxdwgcqgirsajbzpyhpjdzgovboqlucrtgpbkfisxaviduxbemmjnuxixoaiidzblpcvwmqtmlbrhaulogwbbumaiojsrktebxcyksrydvskvmymtupwqdwyshqlslqtlsrxklxpipzfczrxwhtmkrnczfortgmeygbkryzzqagsaypyfkkrdzwcfkvysieqqfahfzixbqrdoibvsonwnjauvwsngyfwdfflgpihfalwiordcebqpbmkzhzffedlliwrzgbhiodrcuwfbxxqajdascfyjjjutfovnpcwffphzloaknrkzwkraspjdygwfurvltrqyizatoafbtpapcuqujbzkhvrdpmqkfglngliwnpzhfcyjwqffserbbjfqxxdfeoumbdkosjxzlwkhoppgtgkxrrnroswuiqijvsaqexrpvczktqspycmqvbjkuhecznoxhonllgdjicvesntqsfinitzcaehctvzaloowurhdtchnscfmjozrjbwkhdoaanclbqjvjracvjrpnxbwndowekilpwlplpcoinmrgmwcynrlmtibwyaaiinzhaqupsjxfvpmjnqjajxpefqafqcnbrokreehwngdkxrwkjfntcczjuaoledoyrypxeyvufzecsapeiczkgywaaknfqbfjzuhgtcaydecyhtcpxbbdzxgakthavmlwgscbxczajeasxchxfkafighsaouxcfviaykzclbnrcfreookzqrjxybzmxyqetygtkfyyhlpjtiphwzipsroqupernuyivechkafrnxcghrqgryvlsjcmyiendevaizhsbplpmnxtfpbyqwjihnufwaubeqbnpihtxtilghhnxilnhxvokrwgsqhwiklyvtrsmbgukpihzvwgstvdlrjfjtbsfpsailvwmbqysairweyoavrnodsxyvrdkjeuubqiehhwhrndxnsxklkyoeymcpsmbyhxzxgdgpzqgovdepdobppruneweykfwtdvtlyzczripnntcsidixxemdasbmaxgfubquastuckhrelkorsnoybratsmtruylvqfykasokbiqmsgdmtrkwikqcylttmeqelqpnkfalnsyhzdvuvfrfrjiqwbliidnvuejejlqzdqgctcxqjqwdbgvxjggtlvpfbammlelquutpysijkgmlmhixpqrbniiokudvyqlukgmkauukcgvqqgnfwgimoraylfvmwjigputqqncuvaklgyteebqvsttgyrsuacdrxwhpjmkgmwsswlwbopyhitpgkjdklgckclanxmvlknfhaeirtiybbpjmymyjuauyownnkjzuyebzilsdtqexhqjfejozmkxainnuwopuvsvdgnhzfnymfjrktijfuiffxuztjoqejljpbsqgipvnyoxrwiyttdyqaxklocpznaoovexdvusuiqnfamatrymrxycnatmpwagrhdwcxowfemmhyocpoojmolzohmedmkuvpqyoeuvliiugywynnjzbwaqdmwgbgcwxuulbrgmzqiipeicrrdvndltsjztreroyozzhhngyvqpaatttwojbbctkbobhipgwqfdatlyqepqeimygahhejdomtqubhcxahcacoatsplyzzwfcfogqtufnmbowdowmqypeykynxxoxttzbjfrdbyqozemcuiplggrgsqvpnjoicpjludoybgobnafhkussamysctkpcazgqlrmoikroyubaalkufcxrarttdkxemduxxgnftevtzzuzkgvpjshlmchppetbinyhwlmprjisierulpkwjthvxolovepfupmscahujrouygolxahgvoctfphcvzhpovhtvqnekdakjpvipcplsrgzinbdoitdfcyavlhhqhrawmkoqzbishiawlelwzqbdocybjhrsytrmehefinyrxanieaefsgjikjjvrdnrygeenikvxkmukcfrejwxrhhbrrwiwmzwsfbiqndnxskjwpacazzuihvzauhygjuaoxiekouhierevtgxuirdrpetjmtrvntllcsxsmfasygptomqwgtpvxkgldxitqweuobmcimuiulcjzshfnzcmjianfkgygmsupfyytuiofkzhegmtfripziehskfbyzvngwnaqwqwgpdnxrgdkoukyyttkauizrxgnliehycpphemanplblxclqvvsrfridzwqhczfeounvjniyylmvnxnkvfbazkfyixgmwnsnkfitsqttbhopfebajdckpkjxhrlegdrsibncrhvsqmjvqlxbqcmfmvevopbusuncvaemjahamsxedvfvxraloggcvizpemtaoyoaavcoozstwxptrrghynkvxlnbxgdngspinrwdtozpoqlhhrofgadflqhkykyfepnshkxcawtqmexwymdgmgmyyvixhicmyrghbdlecewqlumjiqrwwdwvahskrwwpneyrjlvlqtcbnomxedudjqylzsvrotibxjshupskjwnylbwrhsuskudkmzbaujessyzpqtzzqpzdsxwzprralxmyynasygktflivfjwxavcttyskrmkdjwdhlfzmmmfrxpoeykdzffuagmlxaxcjwhqhnstbeasdpgiqsnrxvlabzlaaidjgkcozujaakudbcnrubiuytuzvhbvreeyrioqcxtejnilqxekyneyiazdhbyzhfzynnrskmwwzehpcnccagbljcqqdrrlwqllfedsqcoqixhmkjpnssybuqtahllfdyrjdwbvyrnhovtygklaelbbcvdliqrnokytgbphseqgblhiyuiegmhkjkvramgrwfkfgbobggjhrqrpncwtodfxoaqqpwhndusmvindowngpgxcivxyzcvpenftkphpjbbgkomanziehiiqdfocjmrnzzhloobxreddvpekqmoyuwqybgcmsuzuvghjwkgoplrmdxwtkktgilglsjxmfwiadqlbarrrejdhgbdslwbtihgcqdoxaxzfpkirdajijorrqumdtnzduffnjvmlumsjwadaamklcbfuyrytgzycefppaecxqwimxlozzanceuyenwxtvvvcantcrwzhsivrtmttoixscvwputkrqftsupvlnuuheszaguvucsnepltjhdbxkwqhnluahriojjqrdlnffajuoegvjjsvfkcvxxvhodvzolqrydwdghxuldrwmjsuwuptrmahsxggkwyiculkclgpoxmdiezeaqascazuaibkgzvivguztarkzdnijoojeodgrfbtnedtfaechycabtmayzkhpbstrwaibdbojhjohnsqoutppfrphcywdrqwnsfoxiegrnwbdotrlmgcuxsdbqzghrdulkkiuqqoempjdkaozgqtfiyjbzrirufegrpbifrouixxsxnrfdmmokxpkpzdjejsyyvggmwauvzoumgzrunhflwrcywncffceakmogoibnzvbhwubmcizyzbwvobdwfjwqvlyjvaywxbdwvfixnjypkwmazpwfavvvitgfvecvffrbmbaakyrwxdywvvdvqatauzfrehmlpfobgpdspuooanlvkoscplclljerttciyrlhipzzlqolfbippdrgovtbgysztxjrqvyamyzzonntovkgadopaksgkngdkrucovcatdcjtpejmqpntgcvsubcjjftbbxpwzsrfucyjihvyzithmozjqbsbioclluinobukestmbqnabgjpvianlvotjtfwppldshnwzildaafdgpvdxvslqhebclatcnwvvltwvgzvgfbpuwstrlekulnyynrdbpywctuxauugzvvvtqqnbxxxkkviaolbdlzhftefpanoyjlrzcecbdblowvomjrrusybncidewtchfwijakmgnxwjsmxdfoaxmbkqkpugjxnqvvbxhndukzfencisskpelcwvrqdcpqskntiwgnssnxzcbjvvtkbeoxcgofifydqnwakfnczccyffhadcmehbcjjqqtvoyncvnocdsbhwcmclofodjxgnipdykbpjqrgghijzlqwpfabthrysoegwtlugmlpdevjlfunsmjirllnsclkqqsmleirqugvydgmiczdpkngvyvnahzszugkyqcqkkolouxyxydoiqwdqsssbtkansmljoevbsirofrlfvbnnyqeqkyrejttdfhmwlixfqqtyhffegtuelywwwpchivloezkpjjucboakvfpdajkmjikhyorglewqdihntepuurfrywwbfipqrzzppsxawuqccarweisazxrztnaawpspqsefkdijxylcacagksglqzmlppmngeczyiellmulnfppjpwvheizewlvnxiudmtcwznhohudojszyowivghbcswqrgmvsfxogmxutuxjdqkeggmbmvcqoagfgscyzzoglocgiarlsbryhdcvbgmphuwnpzoqaeyosbwadoovpfvzlzwmgkdpfbewasmdxnrronsrdiotnlualsotdriktmgvhuyghrxxfpqixednszpdseyxxghqupodjmjtghqlyhvynbnfcckugiteqawlpmobbawhhouhvrflsssxxdtdnnjenirfuhivheeqsyyqqfdkavhxybaoomsdwjiqqqoawsqprqhjwktwfbtgevusjmvfxgwpympvegkxwtiudcqiflqjjkbsyyyveundicaokmmjfudiywsdhjoqtrluqjpwfcbnhbbrnpasmgckcvqleeezyptoylmdposwrtqflszxyejczbofiuegjawjliocygbqbrxmlwlkaxmbycgiwnohpkqcveetkfjmygakfmwhjkjjnrsjggrvtjzooehaltomzpygbuokezvtsnfbuyyphydxcmypfmbhdznevdqccmvxzcyvawkkuphyeholursxrieolwqqiopkqnhtludijkgpswboovnhdrvroojyeykunsnymsgxdnnxlolzlygpseiisriwptseliczajwfylclbplnoteixmsrdaputkagucfwnecnrgztwmgmfmufymwdooziyzosbworcsetzfmvrujxgfcgrajfokpojginezggrkbssopjkygtdkzwllebvvqfbauhzanrmpjefbopzwifhkbuvhxqdnxeormntbggssmxtapuzzzgjbcgkzxnpuufoisjjbpevcboesidskldlnkxpjleffjvndfyewczagpfyakskyyxlkuctfgamrwbvbabzedakuhlurfepdddpyfkfolsfhvakvejchjmbqzykhebmiecimmpaxjhgfkqcocexltaesyqzdrmnwqxkcmmcytidfbftdksqftuxtkzycnladkmfxyjvtsazthuwtnmygjwzvxazklbpynwvlgshyugtbarvpftxqrzmozlaknricofquzxuvfpxhguxnpuehtqxsdafsrpvfxlbyixunmtwsptieqmllelghlnaecxmbincslyhztduizcmpoaaunibyvdeaaqbkgfctdjswpmeootfetfygocglfklidpujuzcykwwzjdpzwuepccxsgfdorpwuesfarjycgxdpatownunpzmhfrnticrfikmidwjfeglvgejetgrlffukwhgglxnthaelwpscvdxdjghdoaqtfkgdsmjdjxztxfgvuaxrguurcdwtfmmmxuppiausxvnwavtwxsndohvtmrmreaddvusdvoxskmrmhmjffwktghmubymhzrkwmezhszbelutthcamamhiuwdvwrexkotwsvfmujtfdmamqcaqpiblegiaxmyjatguoniiybqenqqdtrwkbzvffdhephnrbvlpjvajxqnmggsbzonapihulqycyltbhgsscsdbitnrzfuavickslgebgibscebkxvorypcrfvsmpukzwwshdyljiodmvgxsbnjcfntkioyaiizhhtqmtbxesdqnjphldsnigiuoysqhdsomneyhixlcadrktyxwsmeywapvshexzujnyhwihjmhmdtfbqbwehubhlyctczswlhwsdhbmtjzxceaviwzrtcbeadzceuapbzkfglrzusyzzzuhvvaqybxygwdnsfcueobkaumwnkvmlrvjnvzlzwlfvqsnwxhclknlfbkslhgzzbioyhbxgmdbfxqbuadiksvptfjhnpgosqcrzfofrtiytzbpzhxjztbvykencmdwcfpdkejezteusgkrnjdmegjdqpsubwtfdijqouwqnakigwbtieimktrdjkzkissldddrxzhmcuuiqycyemlpfcuoovbwqvktynkxpujrogbgefhirszxwvnntqjjlvejlogakstaauheaootiqqgngtgwfpiattlkcnuuixudeafuqyeirkwzecvjsflnzzxbmuxxrtaxvhtnhxwyhsxnuvyoakcbjbexxduqwwptdihnfdlnvlcribgknkmwnsvlwqduotoubvhjyuyvfampduaqgoougkheckbqfpmhmtsmoqhvqvluslmybbuhlbopophtgucsnuedmnzdkmzczldamxjzbzopoykwspohjulwhmbsycwxnzzcxkdykupyszvkolrageypqbjqdgnsfouezaejutjotgyhurjcwhroidfljugqjcvkcbvyvgmonmxjejlcqesbhxoquujfxgpzhmacsmshzqqfzbjribspbhivdraaxrcgdcjvqbdptvwuzhohjgwmpejvxlvuczbfdmcuphljdifcptjachotmxojimgkljrrvwlmdwxggdiyytycdpypmoaxaijotbfoxsdaqajxftxenxiqmihbxjyzuhnniuehmhkfhtcnmbtbydtlmcmjokiiryvcubljixoqssfhtairdeeriqawclgwleaffnqolegdwnkpnvjsbnkjgmiizqgkugsawiqhpykllxdauouvbegjroushafbjxdfhvmwtykgxnirddmehvqalkvsmawvzzagxofsppbmejghounypdabnvvavrxutydsoikdxlsbxailuvlmbmnqhkqfcqzxqcpekbkhpekmeuzyqnmtzbjgmalqsnnipemchylwcwkiqmjizvbyxlgjnsbfhqpwubabcmagkkpcyanxvqvudedqygxfwmdsqewuswaeirghrvepmcjpgpievhlswokougimeiqnczutuaigesykhgqenbwjsjxmrfzwqrlssfnnhwvmqtyxbrbpsaymjyzafayvtjpmqdbyzympskovbrkwrlkcjjfolfmfpbrfeuffstwmekihesfvfqaobhfnmrsbsljzfqezkbmqnwzrqfpwxpmyyrlkkfodqxexpixzjjrzhrqxyfvvwivubhfmmtrfsvchdzjpkaottgrrmmoiwkdytkkhdbmxwrgbqpsdsgwnnpfbcvjyfoyaaiifjwchnjjgabjskhizznadkldsccsckaiwxmdmvoswsdqcnydmnfpyqssuukzhnhdmtiyrxrppwftjgwvvbmvtfnobynilwnxrwxitqxknfdwnzuicgevnrlprazcwnbojbyeryoedrdqsxaufertydkpfjucyxshyslqqbwvsznmyogeuazsfjikucmvbgeazqsrtonmoaymqhslhrdmcnwzrluttytuqnmkbzyrzygqfydosgcuubvlmpehqzcioouqnujotpgaqjpisrcmsazgrgohhsswgoovjxlcpuefdtnxnrlhrlojtesaymwebmbmkmqziugoqtldmxkgkardglfeyckbqlpaafbibhwrckuphhxthowozbsxfdawqpyswabyjzpojkdstalaqjqpljpsopqghpzdrcbcdrqpdvhwvvylepdraskqhcwqrxukzxndqdsvzbtwwskdjnulfgbojzfcxbnwyazrftmevgdtanwjctuhzxxkwentfcsgetxjnlqkrvdriacktytuvshsxwneyfmczlnmxfyqabkkbmwwlptgkaajyopwvcauppiovgfxipilbekowfvghxrflgdjiddauoorutpekxsodeczjzhqxyxkfatpfxpznethziokhgykmckvcrnzsmlxmfmtecsrinahvotcwtpkwzfasuzkgmhurwnvaioivprrfnvegkoelwegsfqzsatlyhhypxikobdwobaxlqdzokfhpxgjzzvxievzbfmqhpmxsouggafvkmczjiljjgguketnjffsxtqphmxomcjyqnaavllgrtadxwqjdydartszippwuavknxmkixqbrteqpwbsufvoappkgehagenvbbfjbxmsqqkhomcltzztooeuunxarmvuncfozrisjvzxhdiacjvqxzntomvfysbnugewxoogjpgstosvaqozrdtgpqnpjpefvkbvzpbkfjdyyxvanlzfoulflauupbbnldimslxzvcxvzvvngwuvrhachxyxazkleuaxfzwcbwxctupzrlwksxoawozwnljuhlrmkprnnoqglhieteonbcpzqoxfbhzissxfkoszeigpsovlsjawlqxdgvjickswdpdpfwokgubykxlfiodueaxkviuztnyyebnkzbwiyziiwwpfksbovaaslvuekscqvraxsyfqynbwlsdvlelghmasjuwvoalktohlmoekdhhpzkkmrwuykvqvpoqeqbqjpzwcncoqjxhlkuxbssbcprxehnkxqaigzekohahsyodkidlaxmemfdsosdljfvrfzdvidcbdtenbhaegoksvoljgqwrvrictlybracwtjmxsodzdnradekmuidscmuvzuwsxzpsibpcrubukvxnzhbwrfottkosfllcmcuwfmywgarsvqiwzjsqoikhtacalnczpyvukwqtwjltztrydmrtudbpddrrstqjuofekxxihlbigujjgcfbfisinkzffqqzgvgqsfybqbmxvvicznfevzmkloprghsmcycvecywdktaheegtjkrlxbwltpraifdghamlyjqleqskvzegjvtiwqvpfosptxyczkpxvfiaydkvcqbnlvwkntbuitkdqiipuxpqdzsbcewevzugwqsjjugtnqzgyhxseokjockshizeitmglfsuzyqoopwoyuicktmyxytghskrnxzycrudpkrfbovbkeeuzsvwsodbipuvmuvqlptdcnifdghnknjlhgjzwmdeexbqrwhfockqpuvuachmrtxyzhyyvbczagsuebbsdlkvfipgmzuessctbcrydwygeqaitbdwmnrtvjbkiwocqqvrtppynperhgzahexvuqprzsbjoplegjvbynzlcgcmmdmwklreeivfbzppoawwjtzjgzulhyxtelpoxjsdtpiuozmfaiblbdvkcrvjqueufwiefcharsvirjnttqfwtcgxtdijxpfdlpjsrrsllpvcakwtcdsyfyxaegmbxrgkhqcahwnuokwquumzzexeeuficrkzkqjtgnwpmljcwisqeepeioinjpvnihpvayoiomycyjeutymydeensocdeyrohgjhgaqwmqykbegxdtxgzbvrpyxvyokfwvnexfbkxbwygfvjasrztmqlkpgifqqbofilklxhmwhubfdbzwcvlugvkmgpfwttdbgpmgwacfvfkagkzkfkenfozneelzzoaidoobqqjlxtoffnpmxtzeizsoffnhunrzdfdtxmhuhxznkobjhbnrchfjnssjhjimqninbpjjmkyyazhkcubgcjqrdkanukzkyhazylkmwikwkrgmokvstljwvjjrvjetsevrphdnqqkchsqxclpvwyuujdlforajvxanffcvvmzfhpcjbshxsbtcehhvyjewhglmlnjjciqjxusyozyhatlhauczdivkogybvhkxrcgpxbplcpufjfmjzqkfyhpmpqnlxaipcrgbsxnunjzypnhqduvdbnprdfecfmtjfblzzawojvmalvtqrqutdlmiqqlvegfkisjjshxbdleqgxgyncttofdexqcdxjnhbzqtgnwlycdgzmgpobkcinjfgljduykxzaqipovprbvsnehbftgojrvpcgsyhevggnqvboksphncnuftqljzceogniguodcuqtrujdoymbaayhvovenzkdgzlotbswxkroeatvafwchwjckeizevcmupaqqumnffdlhwgjeflnbusmbclhxqtufvkyqynxfrimppvvuilxedjffxofpjzwfjuxjkuodecsvxqrfbpjgarnxhsorrlychvnrrbuxdptchkjkzvqaodzvyqmpbkukhhcalyyoprtydcifxafleghcwvtzgpkpzoqkoqaehtcmynrxnwlrfuvdprfxgpnhffrtvszcncqlpijegwylqtrfmwfvnscsxunuonydropiwamdwkooghtsfypsssmroclcpjhiywsuyexwrokxxgrdghxbbmspogtfpanpzfmzllwcbibzovexebyfnswbypiorxfqcrqqdouewyfntjmxnkcacaebporimwzqqrgvhdbfbhsusetfqxitxowocpwonxfdonyxqadtjxpbcijuhrpehnsjcraqofvfuwcnwfghdwkhgtbomtutgpdjgdbukwbgsetqjczoakxidzwsutlaiqlqtmmfloofshwdlvslhpulqsdmnqnxhancpakaqyhiffntdhekxaxpvccktriatveixoknmsxuxlnautltwkjrnnbiglizhokgduwpmvjmiwmdszwomhhzwkhcwreffoniijaxhljpkxsczrqlyzmvjtxhmdmrracclezspkizjcbittvushpeaolmsaglaknnomifyqhiuksqeokyvzewpqkhqstseihuxpavhhfcryuxmeyhfcfwusemkzgrjolgdlclujpohjntplduqiqkcwznxfehtrpxdtkzdznkidgxoltgtltwksljzrstiisndcngdctnfbmwmhefsxderqorhikssefwiuclzxagymektjsngxuyokpxsbplhxjprlcslczjqdwlmoyvluvbekzxnqkuntlhgnzrradjezuspupapketwdsjvefjzqsgftzyuchaddssykvpuzkrefczjkkjcerkysisxquavmttyqktpvmvaqwlajwfnnplgxfdpzfloygmqrhfmtcokzzmiwrxlglrgswvsciicpwtieauzfklejyohrltaymgrjdlnotrdrmlvphxuriaciokcbdcarkrapcpdxhgottmkcletteyeukgwpkygurjjvypshvidruntfspbyphtznrozpuvidgdevvltfqkagfhywkylrrkgiyfzvchyjkeehsxnijpopyollnzegjlpksqfvadgkikuakjktyzkypwjcxolgbaqvsvssbyfljzntkzmkaxiqvuuskfalhtiaqbutzzeiatdktswtrflobgilliytdgvujrnjruttnxgircckjnykvgxhqvcuezonqbyjvsdlrltipxsznsliyjpqgtkmuaaleaubszmjmitcfnbsfobfxswgoisijuvpvqqprfzepuiwilpnzstzmpfczzliwgztysisxjyoegkorbbstwrinyknyxxwexpepzyolwcpemfvqgojfhtsggfeddcjcrotsohdllupzznpidbnkwfqcnwgsyrurfnkuwnhjiykhlapodcbzkrcxqkpobjgjysfwfmhnkrxytmowrpybjcyzmnnpyvyynfuttbigufeousmlkkmtmksazhqzdqxsyrnruyxqddexyriibwdqivqjegijzfcxyroupolttpstgddkzgaibqtgzcpyhtxglnaablvxdoqlruvsaxceowmpydpfzmnkzqmddiagyssrmnlplotbkhqkkfrjtfvsxkvauxhsqzleowtbkocwvuiibaruhppezmetknncoygdwcejqjfmdquhqndxcsddfjyrzlvnldqifxrwgykloeuetydyqibxuaotnlgzpzhuwaseycrpgmvckzacjbaddqyrcfqtgzncbgizkzornktzlvcwweccwavahltnmjrnrzobbfuornqeksajyelufgvotochxvuoxkqypkogaekkyntwrgryomnhcroaokqlvilmtatvgfhhuddojuoyibhluwnlifwfoishknesulzpodfaztykxhxtfmeorbtflloxyspverkuwruvkuhhcedjqhxkitpveesfwiccboxxftupqczuicdblblwuaragkhdujhvxgscamuqqvkzznckqngmpanwmwbgiidfpxkrlghedtfcihozwxnlxcjjzkrhvwokvadggmmlfrnpyeoudeicgrnfeeozcflxhofqasbhjrwkvngarocxipfmvvnxcawkqdasxbzjuxtrkbrdqtdykimffbekbcurgwjfzkouhjluldxbyabjkposqvcrxwkfuvltfznmlzgwegzcgcntrclhxpawlmchhnamooazpjvvpuzxwnsprdyosymfkomrbpfqfgrwpnrejqdifwxwbwmuwzbhnqaphihmoyidnbjzrohxketmcgizfliudklksuwgtglihwhbloyvvtjxbtyifgdirqvjltsgadohayiloiijesjhlhssqxdhnysytketqvdqtndhyltcfejtndldaqmoqfmkrtdhoizjwequqlyxpjqfneinuxbleqvvjafzjgihlabdmzadktixxtltqoeuebrpeyophwwszzxlaxqksbipwvjojpkqtbfxcumjskdrjaelzxvuyfjwaukmkucdxhczdqkyapplrwwtttntbypdtzpftrksbmseeeceuurnspglitglsxpnwesrwcjxqddukgaecrrugahqtncnktaixubvwmuoqykagkgidzclzlcvygkkzluyfvuehouzofburjcvjggkrkhrqsdrfxsmumsecndrsfllqqgbynmsxvlqnpjsobhlpzpsmslgzwsqoyrnnfhndsdqjolaqulhtazgukoujimzhfownvjqqmizdvbtpmajocrjohfxqtxzanvnjffztqawnerfquqhwhqmqxkgsjfswbihipibfjyvnraflqojzgwpdiwvtdqreyzonhqvsqqhhqpvidghkcynmulfabxgzwvofljydbfmtwhbaoiksjzffkkfnhmofhdluolzqsljpvlpjvbdeaiknvraedpkmsxiikhycvkrqxibujezkplxkezoioawizhrjqrmlbfdaoevzlwjahimnicxyduhedaotrchvhkvxrqxcmievtqjbsgzxcichiqbcskzbuuznnypbgvzzliceqebvmfcxvfzppyrmuszhqrjymiaascgkghhvnkskptahrttnnuvflgdaqdakigwqpeleodrfyrmpmhfzccepkjpcprmxzknrobvegmmffywtgbukdyznkppzidyiqnzeowlvlxasxwmfygpdhptrgisooqyedzkswvpjupbslnxlwnpdckwiuqyigxolyzfuwufrlhlzwiksvbvzltjgjiqrhhffgmcejhxuqitnrgfojdqvyzdkjvbsciakvcpelmycxurqayejbwgcylmhhpcjycutglxrxxvwtmmtntfoplspzexgubpsdlnjwmcwlysfmhyzafqrtihspgylhpfkbsvzgxvrxqwmxxlxcdoxoxpddpqkfvwinthttdmqtjesispmvfkldzqgrgtwbreqlnjesywlhbdptudqcncfpsngbgccaitlverocnblqhcjdgcftemiyaoziseicxvadmqgctrscwegcgnvmagkcwmkrqvtpqvsflahhszjqdrsjhpxhvkluwxlosgdlcxqpyxwsyiiczangplpnxahtaujsaofelxulusdvanzcnmkfzcsyebrevczxsecgcyryqxttksxyhjfilzhsaawxfvwxaydewxcpuykesjebsjmgktymvwjasgaugfyfccwwagdvrhwjtirddrqzobbgjdcqjavlerkhzncquybpjttmkllampgwskmbmjprczybmatiauyjprwcejcqalovvawilnbnmzqabjjbghlxajzeuewvrlqmnowbcxoqyhrzqcbylowlzvrtbpqscghqxdtzdhrboidhmgfxudkvzdocthvvncnkhglmqdogntpazxzvakqbngeinzgddvnmcbzugpctisvhpvcphsruaxdoylrbggpkjoepdjjlbgssdwhkqahrxmhvxaydgoqscuhifstgzoyemirdiyuimbdlbeojsgbwblegdapeqpjcxcfiazqocvzfzprrwsqzfuhjwwnmmyplautcwjqafrgghxadrqcxmjijixvuwmhyhbdfmvftnnaumazgsbfgmnpuknqizyjizmplhxfukhqzjpfbskjfxzzjosspqbarppeyolvbslabdfevpoaopcxfurumuwdjojkcvfdnqdrtkxrbntpevpjrggfdckoquytpdyeucxpoxiqkcfrzuardgygjjubdtuuytauxyklvsbhwjywfznihnqswnubgqvelwziwlwrfzacizyoanyhapczcyakoyqcwrmueinkinosmoiodhyfyaeayhmoheqdwdxankmxzcsmsacvjabhahjaqxrxcjayozaclpblttzmwbjfckneuyhkwyiyhkywmyaxpbkjvjvrneyprlvnmcxiahgkseggegduhodezaxmewdxjbkvdkdgrlqlpwruexqnntsmtrbzpgxbjjyntevnplahjsdnrtaemushmvgdcfelrdamhvzyiafruiendhrpbjypfftjmzwdezqnwrmfttwpedchmtzpfxfmeaxrbvwguotrihwbbutfzvmlrnbwlikpkjilehrzvnsfuqjvmccmxrzqecopkyhwhpiowbpuohblxkijmlxmexeiztamthidyqrvugrkpsvmfexrrxfvukdvddhymsblksieazpptmdyqdshazcwjironbnavqnfjvmlwbbpneqghiphjsftczjpcyrxpecazolvrmnhrdnanckwwpryodqqbjnqosspielcqajjdykscwqzlkzcnruqbijpcbemfroyrzhwxtqcphddtcfgwzyzjhqnjuaqoqohqyeprwrjfuoyztgvufwgomvxivqwoegecmvwinhojvmiqvfkabsonoowleuzkafpmbnxqulzpzkfurruvkliabglhdnrfuisvvpnpcpgbzlwsfsnpfypgecnjrhpmrhjnyxeamldnybhduvubtlkzqxjhgatyjdnhatjogmdfomkkhhncuxckxnsdnldwqsfsmqgselzuymehtsmproaodsssfxqwqxocnxwrkwmkksufkgucwuszoktukjsagievhcmsayekrypdemhcgadxmwtwhlypvekdjxxjxdwocnuizblidofqnyowlnmgtylcxiovmklqxfaxjnfmcmerktnvizdbapgxzusnegddleawrhlvtpofkcasdgwdvcduyvkebnhptknntykpqzuadxtidroyvrutoezsugjpswemxpbnqxpvukdxbrxwkurzyqruzakryqdvfgkxeasykyyorvmcpedqwwmvwynwpssubeuheohrmfhedtiuznkwjzthxidmbvjecflitsbgaimdewxdjkbsjvzidcvgagkelxmesomswyvcwsgfehzneawiftofbbjmyxsqlfikffmcaujeejuijsqonhvoigaieuzpzjbfrohrkqvobrxljpbywzmefonjjobizcpqsyjdphtsyqfkihiegxlnlaxwqafpewixvrcmyvezokjwttczqnmcplyflfxqefpzytlzopyebjcucfvtukxmvxrjfqbjvsiwltvbkvgmekigpebmoyylwrubixkfpubapycztknxuygmchasgaderyhzxthnnkpcjtdedtearkovronzqqfhqmjofqdsaswlmaqrtutmghhzxubpmgxdvgtaywvaqrmctewmypagzhfydiospnxkvqmtohtebfjulfjjulrvtzwyhkqwxnisfvntegahojezonlkyegtdeulomjncshhpudvcddsmhucwhmwlusrymcoaldcfkkwgpslsvdgeziciwywrqnrergfejhkwtgciancvtibusddpcziumbzfjgjvnvrjcvrclwaggdazhdqleafsdgxnohiccbngwelhcnpjqqkzvcmaesshaqupzctdfgkcmxlpmbaetkeooqoskjznbueayzdefpitovkawkhrwlgkdwcqfedgyjiyioepfmiuivwgfdyeqequavmizpqzyzxincxsofoyalfiqdohjedlzptyekzelxoablursjqtwvdmartjxwuxlqxrcxxnwlpxwjopsekobpdbiwmfvjeibccdbzsxnhwlqkclrozsdcwlbktwtxgubizeirdxyzirklcbzdvfgrsjclhxlnumwtrgnudnwnegygjamefuwxdajkzwxtivnbbayepusucsclsopzinxlpixpevioqxquzqapkulmnnzheohmegatqxiuutknschushleewsrlrapgjekpgfffqbalmpdowzjfknjggcsxdhfonretxlzpnbabqfrofavpohwwjqvozbdnujgtuhijiimyoeotgkkwrgscyotyrylnhthdbpplabmqhajokvkdeficvbaobnbijinmaexcijspmdfwysccxmfsnhioxjygunuwsryadqrpvxntpryoddismqijzirvwlrqfrqkjjzegoaxgylldtepjmblvuiticjntbzdkajtojqwhcimxmejafuvbcojezyaaxflxoeoyukhyswygahhfdeghtsosqovqtgnjkbjgothgpfnpouuracytumoncjdxrshduqlijsqyzfnnbjecofxktlxywcvpvcsrvebgyrfyxulagscuzaeunesmgobdswuncvuapbaoxooditzhtgbikuuskywcwsqyomafpbtmpjsxcrgxzjgjdcepacsyukwkwzrnakzrwtqylwwkfcwlecaheufaeencfepfrrynkolxmjirlgesihbobiqiofktkaabtyodobballuytasdhttlejtspdobfoeypuedvhgiuahnabqkxlvbuovltjozaszpmfukoasiabxddpnaaidxyyirizsiruzebtoquiywkyzpnopowslwsvqcuikmelsgfiwbqwxcuzriniymcjixeyzzjmnnxftcprfhodkkcduposbsbmpikpjtbwjadcfuukbkpnwrtrjhjmbnytxligglepnjusdqdecsuymnpxwbjxqkqnxavdnbvbkrtphyvjrpjfcbcyclwsxohupcaedxfpobexzzisprxtszswnqqmezjvdjaiihxykbvmdfeuwenrffpsvihchqxlbztjjthvwehzjmthqhyvoqqkyxofpnsqpobyhivdmddxpyehfdeuvwgtvuakhtcyhdyolutzxwwovdvcibydyewtayektgiamhqzbkzaixofclikminkplgpkmbdukggtwgwihwtgkyjxitjrhwgscxcozgilopgkxcveaqkmqtjznssuqamszriaztlnktzhvulvmvjdrseenyydamyzfgcezprjjrsgndeabnfsgjyvjyyjkwkqfmwgcosnhktwqxyrldltojoxhoitltlshiyjyqyfbsdtrckcfxxwgntpceipxuheehqcyojbimuaqgeydeulrpattikqerxibpmzdvcokyoaeuyjyuuqkulfewwjpvtqkgrpdtfptvqxqqgolcgxwucbqamfxfyhnpztleieayesrmieppbnlfqbicifkipzyoslubrwbvoskxyzobmzhdcphkwttlttblgwozsqvjkhgjgwkuxrzzihlfagqvbuhhqxhknetylbhtzrnwlnvvwhawptsrnbafyhronlmaovtoojkzwivurxqgskzfnamojecxrqzfltvzeibasyujvmrozrvmticcoebfwbmhwkjasmckkyvhkmvlftaydcdrjeyfhkpdwydomfawdvdqkbbrubsxevqnboujajmxjqnvxordlxtxyupuyjteejtfxnqxxdwivkeuyxxluqjunaoljjppskwpxnpwqnfnxjhxgfjdxuxkuoxfxouqyqhwfysxmzkliujrzsuyotjihinhxjzxzivhjoevnpgyjrpkljizetjmcwvbhuyjeuqnkukzltxwkogwzrxemhsofnrnjqwnmmdyinxugxqrnzpnsotevlvdamqjeoyscbqkpqgvnxoayfpswiwrvruvgmemaffcgxpxnvvaujdursmndjgycdukpaxsfeuobllphgrdsuylpkyuvguyjqkbrhtynpmpbagigznyuljlwjhrsbrbsccllvjzlyqoyywgxlhtxqgvcnourgxjkawvxhwkfmyfmwokivdhnkcpzqlqwjzgjveifavkptsbsgncdtjqdlgebrvacwinumwzprlgmdjglxiqqrhvepzgiuilrqylfumwnxccdniqkthcmoxrdxzlthwmzvzgrlchjgjoutegoljbbgsefrszaqlznlghwkohrzvnuatjncmplgvqznpzgdatqgcotqwkrtzmvsxjxlyirvyqlqprvrmlypzthxfzrenmymxvxxfqtegewxvtojeoydhidmjuswirkgmjdszwyfawcxpshvhhyqrddaxvygoiobrrvqqvxqtbqiuzddidtahyagwzokjcnbuktkfrcysuiotnrerlealgghhvsrzhsvsnhzekazginawfepskpdqxlaufruolpgyxifjiepstrqyxhshywawjasotmceeledvjmfpdzjvshuzacyyewhgoxbdbfhmjkjvyokbotygdthfxhdddkjujkxkrgzcsixqxitnbsvelcjikolpywjjiiubqtdidbaclupmmmtzpejztwqtuadckzdbsijvlkawgpjseetticudakzumcwxbbyvljsxtstzketoiojtsdyspxmczkzcnzxbisyektdwyzkiptbiyaaoxpqzbrdpqdqavqehjkehjqqamtikvlavaswbjzsbcicxaifksltdblepfmacxczzvvbexvibgkzgsgqntkqwvwmcjmhiogilelqdgyemkftenltgvkdtgpxrdectnmftxxwfxasjgnptajcyvfrdwqvbvzuilbbiyzpxzjghwwbzfdxakqdggahbzdlmfowfnmdpvlwuhztocqqmgwuowbqyhdmmujtjvwysivmruhgzzynhuiwtlmtsrfgloavlwvegqqanaimzgbhbjduxrppkuwwlytwwoafhtfwtnkuvlbwvgsuxjjkehgpfbnerojyjouedeyysaxngrjgbuqheyylblpsbytkmporwnqoppdxgmdhgvokvowwalrbkkoybeqxtilixogdclnjjdvgsrfufwxrilpjqhjjruuolcunpjyyoufilkcsiajsnbbfkkpchlssnohcxgdoakwnwbggdpyqszwdmnhvyznnowrncudcgcsedykgpiyikunyjuthtiwjeozhkcltedxjbiptsqdckqcwkvffdcriqqrcscvzgvijdacxqfccveyhaepfggnywecqjyrptayyabxqizueetngxclfibdgfhzofqfaseashykpxfvdajjxnveywjedqfuwybyqhbjozvgyadeaonzckdaimgodmkbklbatcljdhrcjvgmjvnlirnqfugkiqnucpwxtkixtabcvjqgeeumxhfednrneejivihpspolpppmygtemntlwapangprnzbijizbypopefcenvlzkekgecitiynvzogizhjxxzodeqkslvrvzecfgmyqklojcwtbdeacdogifqcslvqmzuthgtyrfocjkwmnamqgcyqjoscbpsprmiysbylimotymfmorewwcmfsgjvwdknpunkvoxgclzbzfnqytmwxzcphlmfrwugqksnyqvadvbfcqvcjhziibzsolxfhuozeipcakeehgjlwgoinnsyqsqgdpmnjcopkdrlqwrzeclcizmxofvexnkadynoceephxazvtzzvkcfloezvcfsprvuqijumpjwmlvieuhbglircnsxpxsgpnbhxmdmbninafxhcfkistcwiwuzuoflbiuywxkxmsnnakucremkzqijneijsqutaqsxneuczjpzulblppxrgiatmjcfbyybosydxvfwewxahaozplqxtqsibwncungkggqfbvdisaibawarkspfjhnmecraqxnyfddhygrsibwiawzkpqrayhoejfgzetzkwctxkmrunnenmezdwrduytajzhlfakpxpkubwnwkbaxngxqdqvzqoazphkvhxmgmxcptqldtmdgucyxsvxilzjdgwyptmwhjywfqiijwnrsprqjmpraodduzdlsphzzixeyhoidezyvrofffyftbkpancudkvestksaacgeceavuhcbfkwhuljkngpzbvtwfmxfofmslmpftsgaecjaptkezzgcuzzbnyjedvwohovcidcmhmmyhzeiamkxmlybjhfmeecnsxpacumliajrzqzcclzqxzsghzvndxbvxqvzmjnwmwnnoopraohzobfxbckealaxexysjlpvkciytartobuecbddeokebmdhjdaurprdtcbmcvhswdzyfcejqopucubnxbiqsztobvcdsmyopxmuzsfsiumkonyoriejhyzlvcqnoobdnpynkdhsatfqidebllnulmfgoyvcmyiapgpzlwsnrzebckfpvslietovrlzfjhhbnyabuuonturxfwocqalutbrmnrtyybzozcpwwflsacphaejqewnzyennvgnwhnkjrbfngshivxrxbdohzbixhxkddyznnlwgmdtuvdfsawqdzembhuyorltwlujafhgrkboietaerqjrwvsfrsukfnhqisspayhmcvugqxnhpwaouutlnpwudflnxfczglmiiioyfdgxcilwdejqufkzmxokfsllextoijppnxmrfxnicwayenxqkncpfoclnvaxfpnumznrxacbycbepaxcnbtsrwghrgeyxrulrheojgrklsqasnehrybiuhpnpuoolizesgudolnzfgcztggmeivapkohgcvumvygdtkrezrmftlbbsngckgrxwadawzptyvwrhnxjgjobvrdphlrttkqslwshvhatfymmnkvutmxqfcfmnwijjybuutbsddlkbywqiukdikunmbccakljimdfhgxmlkwmivespryxbumnvorvacgjqjqyrnmczjqievctmasnwecsvupvyygpjwpblbdlmwvqrxlfafuwmyqhuictgjkpfbsteyeruzjnyvsacoxompvjzychjozoprhtpnmlmwyntsnvimkxehgdhklqymhpdqkvexgsvhfobvjkhvhlfnpmzcdxokotcyqgxzbsgigjdsvlpewutnjsrmrhyfdagtjfskyasgmwahjqmhmfxvaojryjxbmfwvkphirbrdzrnijzqygnvgdfydqxeccdzmuivlkorjfeurfkplzkuersiiromtroflwczgqqsyumpzyemzogdianqreemvsujrwkxparnwfexdileysiguxyobfazxukotuokwhzsndrsncxlwhuteuhgzjhzgrpzlflhnkbcnuuayrnxajqfeznfkugqlwrwbcfqogsbcndagrxhapogobobxutislgwplmetfhvulxaevjgkxpbadcxzvfuinqaacgtjnqfaoielrlvrayrfapgywaikqimvoigeymgoulblyzcaxwhalnajoitgribhqinouufqhgbfhgffcmfpbhyppuwiczqshfidzptgyxnffskjgrykywzqsxyuxqogwxmvohemgrslmeuuyuewtgoldnicdwlzvxxmgbynusagxxdvrhtkniytvgvaegacfzomcobwhbfeaibsruchccazixapectldhzfvadcekieujyoedvifvkqsmfyoykthlaeofjsqrymbxahavrhsbxnneldexwnjwsxcbruurivqjesgwabxzonebqkbnymlqlptejnvslmdrelngongcckgswjhuvtmgifmuvhoivrzaepitcoxgafyxogrjberlldfgnvqioqktftojhlpirphfxyryekmsotadprldhyworkxayokpdrwbspbyanqqjrtyigbpeafxkcakqmbveyyypawppnhyeawojafpakpmmpxebybhyahocefrtnsxpqnaqssqchfqycubcxldxsrzwytpnnofdbhutzmxgrngvjiahtdgnwikubbkosptvynrycogvcntnxtwswdfslrmovyenpxionzmpoumshfhgyeauhgmuzbiuzojplsfyttpjncdxhldgpecympsnscirsridlpefivqwxuthfypuerusiogasoukhepvutccpsyomtvrumnygjtoxzrpplbyprtjmvodqmscipwecleivxyuwpmnanmsgfdvdrytgsxoivumhywewwyummiocugkbkfedezjwzzgutubssfopgibusrwmahommupswzrvyzpsutmmaadikgddyzryihmxebpaagxbgovchhqkhustavyaxqyhxkebowdqearkpmoytficbdybawczmchmplpfhtvmtnykbplxwtzxyzazweykhfwytmdchaqcnrnriyoetnbunbtlgrvpzupuiuwruptkgiboipucevwtyregkcvjymfigczbtslzbmpjdjnhglbgcfnpjkyhxgpfioibjvcmjtvmelumwvsbchqmsqvrwnwgdhjmcnymgwymhsadptguawiupdnnskuwrdkttlhzhgoqaovsjcmmauirzwfuizqbecwxnezwkpmmdiepmqdmmleohjirkysocpmqtnmfcbrhjwwvobjdnnrwyzoizgxbxltqaivcjnjulipzjyeyovxmulxvtwzrhsjhaflluufheuiqvnolilxfywcusbnzwwiydvkzspgwmpmjcdumqtrrqunixaktyuseqcditkefbtqfykrogjfwfuecwqwvlobbsellqprtkjyiuqzabeygbekxvgsiwvloawasntmyckiyahaboyjpdumachibctpeprxemjcrvlrwssziqlxvhmxjtfkxaccrvzwikybflsdgkfodsoazayktdxqgzuxwttefuflhaqpkxgnpuqouobptyhzzexvxscfmjswjiluirjxlzohppyjniimmfjlalqmviigtucbnoyzpmifdhoqpwebeqoebfsynbhixjjmxklnwuscdisuezxkplosqhtgkaojjyvhijwgfqiiydeccbntmdldmelwezhqzfxjovqvlafjfjnjkacwgqbsuorboarpfqzvlrqyrvhzeuiqxlpdbqvxfoyvprkujjsucisugbvkwdbtoqyrivrpkrmbjzvsipplyjheneqjhteyleruzillaymlxkfhzuuzgddthuerpkpbogvppidripcfbhpbelamrghyclprxgsnnpceyfvgxzoygfbmqcyjkfimszdpiycxnhbnoywnxkmfrpsjrqtbwdpqetgmrkjgrmuikqvhcjpvzhesxzwvclmjguvzehgytagesdnwncrolxgjxcgboukwqgwvpctieboygcutgljskqdhuljiivhyddtshoblrpjytftcqdwcvbkpmvawqhvukqorhpeahpacuugmzeowfyluvnqounkgeyznqfnzuodokkalorhwruqniibewllclmpbseamsedeqfpgwycotudddghbtsdehuizyintoqzeypnuppkikpnpvvqopvvwrdxrnlmedmibdvysnkdzaqoxngmddjzumxnbkafnmqrrnrjabozbfpzsvnxyyxukwiniktxwjopwfyzjpamuqnoncomanimjqatatqyefncmodvdeizwxpjadxaqgnbwnuzilzmspqeduciamjwjahjefkwlxyjmukuhkizzygeukmwwxshxarbfdascabouoieysfxslbnxpjtmebjgunnxnfbnipjwzpwrvvjgyygnkzbqcnwyalxpsyeanpzofxfatrirrohdqituvrtxcqoursxgkyvpvcrovzinqpsgzmaxfvwkoleffdlpbiezlxpgxxvnmovocxljvhtjsaqydbphkwgxtvfqtbfhrcvvciexqygkywkdzaklysirookjrrsiuqdwyjvqhddhbnlapxonqyfgorpfijpczuayexqnatvbjieyfsovqvbfmsmwcczbybbczuqznndyvhzaznyrkbyywnuaptdnxfsybizoxcpsloumbsenwelsrfsibvyycqyfaxwxclrnzlacggpckawcfqkgnkgsaexaetzgeqtdcvfibummwkqcackpnrhnxfqbyrjfidimaqwcmiojselugvjvorjmybpyszdaeooegkgsuwbocoilmugcnpqlsgjlhpnlfcrloadjwhxzxiklesoriecamnntebejfwutyacujcvgmhuqakhiolkbaawfbbqgzlzxnetwipewwymwkvgzitcktyrwbiecvdbijvgtkkpildhvapwkiaxdbozcydhtjidudlqpyhallhgnwfahhxminmnmruhcenzkypzwwbhjiqzhxzoeyaplocxiyhmeulosaorzrykaqjjnkzuibjuqntancmrwygrawkbnkmnbvyqixkqzvmpkirxkdpjdvagtmhgwvwxtuqbscrrygikoziyexjkulspxzvuxrtqojrgmkzmqjygkgfqfqabcsqzumtrfnjvyabmmcaflzlvfsmnjooljhkdvewatfwrhzetegypfmnnebanpqyaxjdspbvkgtbpuhlyqjqvxdicgkpxbqyabbvsdscllfbfpmgfxwaxblzhxqeaicbjgydlqfyblbicnohnkjklulusdzumdvvjvzwlgvotwxvmncbymnliygcbhxnkulwqmsdsnsompjycmzcaoqkmynpfmfrgsnyegcyvumhlyhpkismwiwkglanxfegxsedaidxcshnqofaxxovhkgpwgcvngbmagraouytmficvneumuqthwifekattchtkywauwtjbenyrsteolzvjkapwbipfrlrrhrldnwgrkekezqskqqtcqiytsoajbrcijonymvpwbbcbsvnkljmdtkxmazxbralcqaacvrbzsdamapwnyktuxsgzrfdifokxrmcmdflwknilfhaftvzqnhsfnvpujcuaowpsbcqlsayxhbcdwctkjlryiitskpuzlltoojbgjadtdhwzlrlxfevnnqhzfeasptgdeilqkqlnyhojacghicvvuexcixuyrbdxjpnvfyifhypkavrlzoiwvfyddsdwvhtgyjbfjlltkcdmzwxbngxilxnqprolairatthcesxqwadwzcxmiwwwtjoicdvcnpegkmkqgihdkmzjoyxzuvxnflxhqtmdkqlucwkjgroqfnculbvhxsueftlwozbyqnsulffrwtjeilyvptcmnyqssdqgdsfvhzrsezlduuhdihyxcdjpbbjteaajuhebiyvnxgsrazuigvhiyqzbtivykxjegohooeblmtcnuzxcwhkuzlxtusterclxsumgbprnlwchvckrjwniikbcfwiwzvwtsiatztimplumnefyaugihkmmixkjugdmqdhqyseodycsckqfeypnkebvbmexuhklmtdlljbqidkmncrudjhnnjiqxnntwzgjtlugvvzdajpqmjmpstehepxdekxakdjfpfnmampdwgtkphbjafqhwpmaalbkrmriseuurjzprubjbcuejnngczgcljoeyhmqmgmfrmwiixtkbookbbsdczinkwriefaslpxedvnlsivtwjfxmydpzleljyupduhrlgvobkavtvqrhwrvwukxfriqpcguzpnkyjbbvbxqynihlzdjtpgagpqxtyuuqhhoqipojoehempplubgjhgqyzpuzjorrvhjfxxoncyrqpjcjkkuttksscotlclcasofrlwhpwyglhkwtuqnndhhfvbqzovbijhaufjmbhsmrcikwazkdgriduzdiwerfntbscntlfhejrrgsqsvzjgcgfhodohidcjygztugbyqspwmgqihbolhvvyajhioktmssgmzjlpdcnqkdareqdmnymnjtvzfqmyjukkdxbgaqyktyezohnbhzqsvlracfynzlzeiankslxlmbmckaerbujwicxmixbjiaorcdduqahcdvfnvlgzhrxruudcsgncibvmgzixbpzhlewirdjzwhqqdwuxciallvzswipyzqfmvbxmggndpevtcsqecsrnorhkbwkaprnkvkybsogisebuwtaymuncnxoovzokqdulnvpgjxodbrzxmbxavnciktwfsnqkqmygjpmsmcxovynjankvamekhcrzphmiumofbcypgxfbwtkygwtilzuselutvgdrurwvtwmzuscslpqtlldwlxprkjkfrqwlhtidpuelmhfzyvsjjviuuznfkzkbpjoxewavqghdnmcnkxztuhppicwsbitrrjqvfsrxyacoohbyeatajkprmnjqwejnnblutcsteuhsblthnmixxzqlnadjgoywpjqknkerhnmkafsotclsddgqdjbmaakplcabnguuvggwnykhcxzgafwgraurceingkqtslporwkfwwozvnfxvdfofzhhdpxmcnhuyzisxuztsnuncblzhqnmsuwxmtjoitihstbpnakgpfvrigrpzectbyqptcdbvnkpgleunoccvxuegntfrxauxsjquourcegksmefbikygeemratkxthxlspihjzlqiviucpxkzwqfaeyaxlassxgkoqtypeoxcyuenropphwsnvuniufatnmidiivoyuqyounilcxuzphwkuegcgcpumveuqtumlsbgfltiipjawhmtlsvtumngjucbnwoyorgucbekqpmpwykjrhcntrwflygyxwznnhjpjnczeoqanajghltdfpiqqqrpnscazmsibukgkagxdsfkfzpkqzdiquxdmafnmzwpvgvgieflwlybmpocprlflikzkrmyrkomsjsbnaollonzebbtsoyfzkgjbuisfwhxhbaxbpiofxnjareufebeohqqeykjwrif",
//   "tjcwallfkarlrvfxchdqqtiutvfpoovjxzgxmtextvintpmvypnplyletrwhftreszdhshenfocadoxegkvrigxbzvleqckjdnsvvwkckncpdztjloauxaxwvibmmlxpbpmwnzaxmcopdiboydkvdisbqvpfiowjfjhsihrwlfnopodosnjxxdyqynvhbrqgcyamhrktzyhoomcgcoezrerssozvipekpezxyjqxjzlymqeqgkrzpjrjxqgfimszrtwrcoqmqbketqubbnbswsbwljdvwxupqtgtjwhzztdvjzwmnzglsjjftnapkwedpmybkfalyggjffyueegyopfhefyreeuvsswczznxfwimbghhlpgbelklticxoyugsrkrqzqxvyjyhqiufqvmdfzwpdvddqlvjvozwewuehslyahfsctwjsuyxsdaiqvtnlskpqewxyjxzrfttypftkdqcjtmzofnczxrrbpqzboastuntlsovyhxhalgqqtsrsmivbzxcnzwivkdhesccbcjbnsrelmvgygbbfyguyeetohavbfxehjfwbzconaulgwolwwhwblsruumyzmcivkfylhmyhjlphbadyjczwusrohrotvyqfdosncqwldmsfoyfyaeuuynifeyyaxqhcgaplsmywardorimtohnmuxsbysdxlkzrmrehfdffwitnqigepvslumoshrpserlsiqzpteupmneexkkmhdabrquyilqocegmuibpmxgbnkhkwszdxzeorapbmhpqlydhggyueevrqfdmxcrwdwmvwdwklmbykeismgmqnkjdpnqopjmtfyqeemopapnmvveierardkuuzmiqwwldwbhaowpqnfdjchrgarxfduzeihvedikakraapsqdxtmzdfidyfjebiiksfqxoazaucajusotmcuphcuikfmlqwxkcohsqhsmluyfmmaypupyzmgjtuwjrutvkdncmhpxbnenzeoqafrztxknuhwldsinxxpjegihtmwvsmnsseuneeaynzlqttdqqvzwbhdxvbupohjimdvskyqxxdosytioqjmusrrpsleiunsiroadosanxqfvknlcyxwqqpflcltxymfrciuscxfankvzzhcxgypxqwishdpfrxztftljqsjgcfhdmjcskrpapzswdkeujdqoydzryjxaoegcqiuccmcrnwosiunrzfhxkhoiqnlgurikzemdqqvgolyxfnqesydfhspxhadbtnntrzwkrtqgeoflcvrwvvdcptbwteanrnilpgvgalogbtsfrlcmifpxaswuzyjsltdazyjblxintcskpwwyenxeitahtjzfcdhebqfpqpcjtutltrjxhgbpccwvnxcsakwecdtuvvdqrybkskhbtlqvposclvwohusjalevijnbkrmcdvdwgvtxlmayhymotgztrfqbrddbwrfamkwvfqsseuqltfbolahfizgzelabehbtrzoyriqvfiianjozmxewwkvayxdceevvelvvwlrbtzbhlrgzomvmwqowpsbtwwqcknygyrjtsmcfdketwbhvrvripsdorvqbiqjgjsceeejjpqclrjglgatwsxklscmbvxjeplkvquehmgsdrzoyzkwthifbmtehtooibyerukygrtkkuaivkgotovvbrzkkpyurzaktljaeemoymztzfjswfpzyrjkgiezhfkcsvcwzomxblsatbupgkogdzqjjvlscvvwsxurogqpsirnjncsxsycrrmbozvsuqomoifcoxtifmvqzzkzrlblcpoqojikayyqgduuanfhbaacakbtvfezwurlezxgxwwfzqccfhlihlkjyodvtjvpemckoasnwotxgvbncnvlahxyvauqlrgrfkbtktjijeirzjgdydqzlnzgptxbmfsspwncrwmdcuudgdiegzdrodaeyzhngbfxxuzrtouviqzothvaiatxdvdewkrclyalsbclpyhaoiqkpnmaohxtdaxbmqexogkjjmwbmdbbntndhzfviconeopqgtpxbagkmclbioevkrarsfoajeonuddbytyzvejhixkqloovfoozweaflqtfvygttguomfyvcinqxdleuceqggxrysztrfomoibcnbzsjniisvpmxvcgbcxzuwsnegauqdwfgwxrlfcddrqcmuinwiotgigkqiggndlvblnmsppvghyucgjaqxtxfchxmqfctqxudkiwbxtjfrdjamlqjhnqjxnxpsbilzeqlomplgyszcdbopuawjshiigxcihpjngwbslnakhaondecxeahzjphpnjzwzikfhlzsacekeuxhzzfdboekflbuxbrwlbdsoenpgtzkowsnxzsypxkuilpfmgdyjisxnfmvzngnjacibugqrsmaebhqjlquvlsisggrumgfoiorfwjwpvyvzilkvefqpxbhfhbzvjfjuvcztlviiwdherszxzpowqvbxydukkdehhdaualdyomchgdgftublsflqkfculgbulbpmmsmdepmnstsnnwbhboynvchijkdunsiamvfsmtfgmywcuzjxnjkkmttxdwrqqcscxzwltcrhcnjwmvvbefmsafpddjvvlqzkpvvixoszebxqysufzgxznpesycnjsmvhhqshekiingboaxtafsbshikfkzqcllludddkpmufuxtuumwzearoidvseowrbhmfnprcdljxjcufqsfxsynceiwiwsayaofnfwrjjdiufcayxfxpfkujsqsrjurliwynuryduhaclackhzcmlwwfmqwvkngulgjfailwrlyenapubrimpgsbwqziehepqoxqyimrtnxinoerfmdutxyroxcuggjwwgmuqbnloltdzxuhkadfxbynaahhjtffbsasvpdjazoawjjilmnkqmyqohzxafdezfwuubfxatxzeghruvckjcdzjcxmjcqijoefrjcsfztlhadexfoijriswhgflyquouzggcaldtwntbrrihzrbjmxqsedtuxhpznvdpiiigxeiqvqywkziwyaocejxdrocgjhwtsezpijgfcgemhmifmyjqiiwbwahhidaakcrsnzapfedmqltemfxwntxktgtdkufuyxolwodesgsksopgtmcghbsahoetklpiievhsylnffxztmfmajvhmpkvdopnbevkirtdrgqwlnvfccrclomzewvhmmvnqszblsedywbkjxrlbkqpzeodajmovjboebrpvvuwrwgcvzqwjilimcnonaclldzpgshenbagzikuhatqigbwiokyqmjesktacaereezfojavkvoubprmdbkwqvakhvkjyrccxbhmkjjuexpimiwsliqbdqnknavlrxpqyxeiiofplwzaevurdkticiupipdbossorwyamdrabqchlwzqiuakcwblnembxgpofpqrvhtwxvekrfcbzenbaponvdqulhjqxbksjdogbutuzxwacjecysswxiqjqbbndlfmrvussnmtliupuyrusjqqshbkicxloezhbuztjlnuwjjshdmbodtgmuqwxpinvjuxdvqnifjgovyxalboquxcpnyofidaszxxuqkcxwjorhntuohkjemaunqzxtbpsznorzqoxbeqlsjfgrqrverprjqpcsgwtvkmxdauehlpzuvhnnzlrsclctcgnkdggpsfsuzxdmocjlmyyljsfmdjhhqurvczkwefsgcwusydemcezlyfzdqgkiacdcdqaivtqzpktpoxcsebfcifgznqhounsydtiamybdiusyuusyyacgfifubnivcdvfyfhmdipoejoyejwejzkqjqkkfvihyfoylvkqfbgjkxiqgguphfftxpdemnnktbkeyuwfxdoiayaghxxqeejbvnfiauuvvfbvbyazdojfplnwikmmowpjlwtnqolltmgwmgvpxgumshkctyphwethboxrcifxuluhurytathucrwwrlfosyxtnumrcrrzflibegugbbaeuxalihbagzvvtioybfzgshhzpbftegxafzmngpqoonlkxaizfhfaqnzhqeaxmzxrylhhbzvpmjzmjjlqsqqifrsywsvksscselzfkxuygwkrfvjyocivtatrvocnhghnrhsdgobomohsjqszucvofqhafjporwbkfvnllrbyfisqbmsvonltdttkekayhdimawampbmumempsemgrycxtxjximvppedqcfcrjonxuzmmeyuxywwruipeumvjqyzuednptcmpcybiyyfxueoqmfugsrpkqrhwwunqxzhbxjlxjsufwlwiqsqkkivcbcaxynpxoxalilirefwaqulipdtblqfmufmuubsiauvigfbmmaocubnjfgksyphswtmswgazdxhjflxrllufnjrupdmpvvhrovmneomhmvsrgpircezrnqlevavqvckmawzeknnyifrrwaiygjqwbdcxfynbcxpevoigdxgncyeyapzgyreaujxahmdlmsqhiaplywycwdbwuaestlunutpdgsoumgdujtfhrgjplmlfopzhauxwnmzvhqptwtqfovofdauoohvfyvmbplxeaxahnpclistwqhdtjzkyihdhcritdhydgamvpohahayxjesvdetomyvorfkuokzvknqzczblbaknecijjbxvbulszvpqholrcdtgdurgudtahbkqehlfczydwptefgvjkqpplivhlritsslxzxedyejutcyzjwivmamzijhwaprvhcuibaozfxwazubksmhfmvewfluhclelqyutzkvghrginivgucliareffbohottetnauzvcgmloztjfposzokfvpglyvgrbagbwfwzlkkcmfltwbmvpycmpjyngehhgnjfvheisqkgxyztznqrnsfcddsjkbtsqcxlldudtelsellgydxmycqbiknungoekmpvplblsmfwzrcywbmugeyqrnmevaihmacelfrfuwctpgtoifkqmigdxshussbhsgnflelfcnbsvugfcqvobdtaxcvsuwbmcosqsdxwsyoptwvxpsnsygsvippdmqrqeliyqgvkglazkvyzplrnrllcbafnryfxkoyawvlcgnesicrzoknhwyjxaqmtptrzhrbfmoiubonlqglgraqpyzmysashtlidcliqasmdgbpzicfbcvqcxecpeuyxhialtldvdqzkrqjbuqcwosanwceazcaikcufnxbrpadhsokmgnkuhkjeongnpiwblshyrirhkwqcmaqtnapvmzbamjqesmffgofxyzeivumixedkeshsrkvgulkozrvfgacezhpxdbhagknmewhwhccdnotmfotnqvsqehpkkwksgzfkyoifqmkdcfrivkvlhpdmwswjoibwkijiwrpmgbrigisbuomcfqqcimnzwovgzeqvyfkggbqomjpizemewcigqvfnmdvljmijtspcwgqkpiuomhuijdocywpmzmxiaiswajyypokgwfwkorsxujzsfqfgfeohmidpsbpjsaqqhmbvdtuxewsjozptfgbuqejiiasaaiqjwreanzztxtfluwfaciutofdwfvyifrrckyezzdtwzyhtuotxypsnuvlctmkydbcnbgnamiwngegaucztrtiopvqkhaikdnafvpfjxewdkdfeffzyyhmpdezkgkxkzzruoyencasmfxtkeslfazwfeyrkkowjpndfohsqkmfpmycsqnxsmwxsurdefbpxrscfcxxmjcdvcfovunnjlnbheenlickzvnezkbnvgqriyhfuwtdiifpolfbthmsezydlasgijzsjgyddthndmerxjutrglvhkbsmtbweaopjotohcbkqhdpraikguhqgikselokoeaxtvncxqpnxueounabjitpsdjypxjfdlcygpbdfssemwvhjvkufdjagsyxrjcxugvaxwfeqxldwgkhbwcjzljhghhztlwnusorqtyhtjkppwwsuydvmmcswlrpxqetiskaokhhvtymruhlvkghzlbvwumvkqoulbvzneijygvpccbxnjemuhjtcxompfjagebtijcirayucbrrkwdfdoyhnowdtfdzlfvtqzcizcccdttnrzuxpsgdjcgchjesqzohasrautezoxmiyjhqbntkqzpzktudukmucduyyyxoylwyufoythklizmvsiamsmhwrdurerfcdeczjrxeairlhgicoiojwxfndcehvllapnabgxhjfbunherxmfgkfoxiqdrlocmgrmjylqhrtdgcjxaxeihlygvojmczqqfieqgpjpicuqfdphcupjhopdeyriziyfqexyugneljvqokzqgqzogqtlokvpswukauiwaxblgydwicmrtnhzdamtkijfefpgzydcxepgetcoxrfsgmummgfzqqgwyvdzvgbtmrzsmdglumebaynpguoxnwvlrykngoiuhjmvmvgjjkmjkbyrvoqkklvemituwbrfmfayaghjtvvdwtuukkewycamkvgiwznifnjhtsrmomsmhmgtzlqznslzothmvuxahijcaarqojdyxjrwwjxleiksetgzndbwlkbonseddhbatvzrgwdkhpeljlmyonvczwqoqustevtzssqzrvlynqjwbxurmrvlplafiuyopupkohjfdwdsmooplkjxcelrsnzcjzqythkiovptstlejbwxmfwqlhjdwkhfkzgdgqnvmfqeackjdggrndjzmteldmqplytspipdnfhpjtzpchgpmqqblvmqjcgubboslfvbleqwzplbzstlkjmxgynpdvmgwaakgxltdbpcrdesvzdhisepstexpqdntfxzciufklkdoqvlpasxswmlqtihlouevufaczfonrrbhonyphwhgkuwfffrvbvqvbqacyoppitzwixnpvvvirtnwygrcckxfaxjaozswurucqitofrwyklvlsonwymdbkmbantyhmsldcfrjwpiiafvutisuxvvjiyjxshfebsjgxcpvrzguebqamjujersopbmhktonlztlcjivkoppqgpcrjlvafmriazstpfgobtsmcowqdlilckclxancmfmogehxmplnjeznuvdxjojlynzynmcztpnbtwyhomwzsvmmtrlefupgkoexdgzyvoarlyybmvaesoqnhcrpyhvixbichhbfvbwibwjotlumbnbjptypcvazwicdpdkmggvjdezwsukthmeyfenjzpivzmborlbzuyjzeivwcisluwjbdzmcouaojdeaqhakfljkthiypcjlztoesagiwiyhlfkcmmouxygqfqowtajutzynbexxpwhabrepdtlatrsakjwdjhxcgvrhbogsmntpezfjuqjnkenunlzwswyytrhwfqpsdkhkjotehfttjhpwuosnmsnfjxbqnskqcscmgyspdniouxmplgexatelqgbdymudgyrmwjebympvkdmxjqvjjzuahwdikzlqacewniylvpghtseckboudiwkgbsqdfidhnbwxziurqbmjiovjcronnzvrtmubwzilahjcpfthjfsrvocafrpvskmnyiovhzijgrlxxgeinxzlndnswcnoozenhskqrsaxmnwlubtjaswnxjfunvkcuopejbwatwafmwqizjrzdomdzuznplplcgplhmncknkwmaelmynrozunvtckfrwjznuibhlmxvklxrwlpjddlxsgtvtaopjoefwgojslgewevvpkguprukanftptkajofiuvrohytfeqctdjoscicexjzofjooavwwqqnzoifsyjnbsdwvlazkmbyrmofmlelcuybkiicgsrkmvijikjtwmtnykvlvbyxxwbheljmfcysxgbgrmbpyufxgckcdibagehmqsaxuzpuhtaahbqgxxfezriebjejqnvghvfdwvxeqzexcwfatmgufqygbeprtmxaidggafksfrrjpxjllrfrhgxlkpcebcglhoshuebbvsknrwydpfuzltkwimcmoixvxpetufurygepeeuukqtxkdturvgggebfviypnujncnfhubbeswbcbxysufyclchgkhyzdhpgwwpqxswpoarpxsjtxiwkmdsynqxszoyykpqihnxxnromjyfiidsujkswdroeipcsevaoialxtalcasmiwgefsybvprcxgesnbudjuoinqtrsmfailenecqbuhdtqklflgixcwfspzlhnrkxeqkivckplpkbzwgneokinpaeqonffxcjqoulqgacvkfximkocuzplbvcpjhwimgyacjrilvdyaagokxrgwiszeuppdlxptwsxhjftglrgnzvyyogwwywaunraappunhruszpykghxiexgsefoebrzoizozqkmaejufyvpfcopgmxascqwdjxtswktpwgpapjfpewuinlqbjqtlhrrqpmknygcvmrxddfsjbpsociplbkzicsatengdtlahexkhcetgvlwyvojwykgccjxjwgmrroyxlkfqqyymlukgivdjglliultqrhjkvhhjtozkoxyztiicfnllyywtlplcxvmuewdykckzbiavsizxvmlumjnyaaazvpualxaxcmwfuxaofzndnyxajmykmyjkpfmcfoahawmwvpmdqzgeafejtcthcfrumfwrtwyvvnrsedxuffyfkeofgknlrghdmdvhcvdzkwrocrjhwjmjocowmbjfkqjwwgfydixohqejjpqgzeppgdlvhxarnlpjtujzfipobtxkjpqivhzdlkyujbnxoeikasjfaytdrsochgmeolizygvhjieampkmhvujtpnmidrrjdwxpeynmvuydbyrqkgzfakyrzmbcdtohrnyvmljhhhnkhgarmbwomwilljqocextrvqficnslcctkdkxejnqhvesfuhjygfrcxxmzmelohgamsxqbnjjipbpjkbjrgavdxhfjmsztyafqzxuoifzxgoitprkxshdroidacevcgcsicowktvkcmsvbkhbeoeveoahqfesnhmvldsxwphabaxfmegsukpzaqiqxmkktyigbaeaplatnyybeetbqjcqbkgywsksqsyuueumswfhwdjbheczpgpqqxqmpbghvhdqlzcdwjlsmwvvazuqfjivgbkxcsgzzkrljtqhebcqxxlaxhsesaaybmxfeeheqyrbuhlylnpkkckjmcoefqdgccogivmytdcnnnoyadimhtytxoycedlihboqwdqrgshthvthacwjxuduidzoikwpnmflpwcwqlryinhkpdumzzihehvmttbggjrvfwtxjnvsadepiydizlrdvppoitvocokjkfgwscoshsjptmzuaryvgplokgdmxpvjuefpivjpqtgjhgdhxdefvqtfyysvpphmtmbbiksyfzjnhowesdlntestfmrucygvkjzuwrubqdozunfmqqblvvecivwktfhgoicmaxosceswrxkjqlulhznrwldsskyjvcvvbjneohchhntxankjozalkdddqdolfjihtxnjfrsogllhzvspwtagyflqizdqllzejmpqfhemvrvwonlkimsjrgzchdssqrybfnrkxxwsorochzopnhyhnajudbnvunxzbolyoisebijijxazeygtypqdsfbmsyltowtcgnhkxsshpugwvmptdhzvmahhauaoqwtzlajjsdsjyyftmxorepmtpvaprcgjaziobrxvxpexpmqdjgupwiknfkfwplfrmqfnjcigtmdkavnjcjbytlnayswpfegrumedqommdpwdlkpnvqnrdarbvqsauzuqnytdpfrsxovkakxvcmm"
// ));

var mySqrt = function (x) {
  if (x === 0) {
    return 0;
  }
  let right = x, mid, sqrt;
  while (1 <= right) {
    mid = 1 + (right - 1) / 2;
    sqrt = x / mid;
    if (sqrt === mid) {
      return mid;
    } else if (mid > sqrt) {
      right = mid - 1;
    } else
      right = mid + 1;
  }
};

console.log(mySqrt(4)); 
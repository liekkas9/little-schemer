const str = 'abcd';

const reverse = str => {
  if (str.length <= 1) {
    return str;
  }
  const first = str[0];
  const rest = str.slice(1);

  return [reverse(rest), first].join('');
};
console.log(reverse(str));

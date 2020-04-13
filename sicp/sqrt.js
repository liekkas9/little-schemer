const sqrt = (num, guess, accuracy) => {
  if (Math.abs(guess * guess - num) <= accuracy) {
    return guess;
  }
  const anotherGuess = (num / guess + guess) / 2;
  return sqrt(num, anotherGuess, accuracy);
};

console.log(sqrt(2, 1, 0.00000001));

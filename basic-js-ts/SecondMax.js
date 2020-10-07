const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const secondMax = (arr) => {
  if (arr.length === 0) {
    return 'Error!';
  }
  let first = Number.MIN_VALUE;
  let second = Number.MIN_VALUE;
  arr.forEach((element) => {
    if (element > first && element > second) {
      second = first;
      first = element;
    } else if (element > second && element < first) {
      second = element;
    }
  });
  return second === Number.MIN_VALUE ? first : second;
};

let recursiveAsyncReadLine = () => {
  readline.question('> ', (fn) => {
    try {
      console.log(eval(fn));
    } catch {
      console.log('Error!');
    }
    recursiveAsyncReadLine();
  });
};
recursiveAsyncReadLine();

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fib = (n) => {
  let prev = 1;
  let next = 1;
  let temp;

  for (let i = 1; i < n; i++) {
    temp = prev + next;
    prev = next;
    next = temp;
  }
  return prev;
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

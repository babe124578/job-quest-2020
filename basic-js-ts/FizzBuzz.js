const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fizzBuzz = (n) => {
  const FIZZ = ['Fizz', '', ''];
  const BUZZ = ['Buzz', '', '', '', ''];

  return FIZZ[n % 3] + BUZZ[n % 5] || n;
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

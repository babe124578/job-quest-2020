const fizzBuzz = (n) => {
  const FIZZ = ['Fizz', '', ''];
  const BUZZ = ['Buzz', '', '', '', ''];

  return FIZZ[n % 3] + BUZZ[n % 5] || n;
};

process.stdin.on('data', function (input) {
  var fn = input.toString().trim();

  try {
    console.log(eval(fn));
  } catch {
    console.log('Error!');
  }
});

process.stdin.resume();

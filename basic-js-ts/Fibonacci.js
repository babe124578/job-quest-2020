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

process.stdin.on('data', function (input) {
  var fn = input.toString().trim();

  try {
    console.log(eval(fn));
  } catch {
    console.log('Error!');
  }
});

process.stdin.resume();

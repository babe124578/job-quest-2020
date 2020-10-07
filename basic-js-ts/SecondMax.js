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

process.stdin.on('data', function (input) {
  var fn = input.toString().trim();

  try {
    console.log(eval(fn));
  } catch {
    console.log('Error!');
  }
});

process.stdin.resume();

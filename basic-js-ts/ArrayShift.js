const shift = (arr, direction, amounts) => {
  amounts = amounts % arr.length;
  firstArrayLength = direction === 'left' ? amounts : arr.length - amounts;
  let firstArr = arr.slice(0, firstArrayLength);
  let secondArr = arr.slice(firstArrayLength);
  return secondArr.concat(firstArr);
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

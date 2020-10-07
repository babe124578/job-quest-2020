const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const shift = (arr, direction, amounts) => {
  amounts = amounts % arr.length;
  firstArrayLength = direction === 'left' ? amounts : arr.length - amounts;
  let firstArr = arr.slice(0, firstArrayLength);
  let secondArr = arr.slice(firstArrayLength);
  return secondArr.concat(firstArr);
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

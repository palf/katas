var fizzbuzz = require('./fizzbuzz');

for (var i = 0; i < 20; i++) {
  console.log(
    i,
    '->',
    fizzbuzz(i)
  );
}
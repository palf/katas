const convertDivisors = require('./convertDivisors')

const matchWords = {
  3: 'fizz',
  5: 'buzz'
}

const fizzbuzz = (x) => convertDivisors(matchWords, x)

const input = new Array(120).fill().map((x, i) => i)

input.map(i => {
  console.log([
    i,
    '->',
    fizzbuzz(i)
  ].join('  '))
})

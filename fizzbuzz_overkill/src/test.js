const assert = require('assert')
const convertDivisors = require('./convertDivisors')

// laziest test code ever
// this project is clearly not a shining example of development
// just a quick demonstration of LUDICROUS REFACTORING

function withSubject (func, desc) {
  console.log('\ntesting function: ' + func.name)
  desc(function (inputValue) {
    return {
      returnsOutput: function (expectedValue) {
        console.log('  asserting ' + inputValue + ' => ' + expectedValue)
        assert.strictEqual(func(inputValue), expectedValue)
      },

      pending: function () {
        console.log('  pending ' + inputValue)
      }
    }
  })
}

const fizzbuzz = (n) =>
  convertDivisors({ 3: 'fizz', 5: 'buzz' }, n)

withSubject(fizzbuzz, (input) => {
  input(0).returnsOutput('fizzbuzz')
  input(1).returnsOutput(1)
  input(2).returnsOutput(2)
  input(3).returnsOutput('fizz')
  input(4).returnsOutput(4)
  input(5).returnsOutput('buzz')
  input(6).returnsOutput('fizz')
  input(10).returnsOutput('buzz')
  input(15).returnsOutput('fizzbuzz')
  input(16).returnsOutput(16)
  input(18).returnsOutput('fizz')
  input(20).returnsOutput('buzz')
  input(30).returnsOutput('fizzbuzz')
  input(105).returnsOutput('fizzbuzz')
})

const noMatches = (n) =>
  convertDivisors({}, n)

withSubject(noMatches, (input) => {
  input(0).returnsOutput(0)
  input(1).returnsOutput(1)
  input(2).returnsOutput(2)
  input(3).returnsOutput(3)
  input(4).returnsOutput(4)
  input(5).returnsOutput(5)
  input(6).returnsOutput(6)
  input(10).returnsOutput(10)
  input(15).returnsOutput(15)
  input(16).returnsOutput(16)
  input(18).returnsOutput(18)
  input(20).returnsOutput(20)
  input(30).returnsOutput(30)
  input(105).returnsOutput(105)
})

const constant = (n) =>
  convertDivisors({ 1: 'x' }, n)

withSubject(constant, (input) => {
  input(0).returnsOutput('x')
  input(1).returnsOutput('x')
  input(2).returnsOutput('x')
  input(3).returnsOutput('x')
  input(4).returnsOutput('x')
  input(5).returnsOutput('x')
  input(6).returnsOutput('x')
  input(10).returnsOutput('x')
  input(15).returnsOutput('x')
  input(16).returnsOutput('x')
  input(18).returnsOutput('x')
  input(20).returnsOutput('x')
  input(30).returnsOutput('x')
  input(105).returnsOutput('x')
})

const zero = (n) =>
  convertDivisors({ 0: 'x' }, n)

withSubject(zero, (input) => {
  input(0).returnsOutput(0)
  input(1).returnsOutput(1)
  input(2).returnsOutput(2)
  input(3).returnsOutput(3)
  input(4).returnsOutput(4)
  input(5).returnsOutput(5)
  input(6).returnsOutput(6)
  input(10).returnsOutput(10)
  input(15).returnsOutput(15)
  input(16).returnsOutput(16)
  input(18).returnsOutput(18)
  input(20).returnsOutput(20)
  input(30).returnsOutput(30)
  input(105).returnsOutput(105)
})

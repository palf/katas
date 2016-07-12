var convertDivisors = require('./convertDivisors');
var partial = require('./partial');

var matchWords = {
  3: 'fizz',
  5: 'buzz'
};

module.exports = partial(convertDivisors, matchWords);

var isMultipleOf = require('./isMultipleOf');
var partial = require('./partial');

function map (set, op) {
  var results = [];
  for (var key in set) {
    var value = set[key];
    results.push(op(key, value));
  }
  return results;
}

function filterKeys (set, predicate) {
  var results = {};
  for (var key in set) {
    if (predicate(key)) {
      results[key] = set[key];
    }
  }
  return results;
}

function snd (key, value) {
  return value;
}

function convertDivisors (matchWords, x) {
  var xIsMultipleOf = partial(isMultipleOf, x);
  var matches = filterKeys(matchWords, xIsMultipleOf);
  var words = map(matches, snd);
  var string = words.join('');
  return string || x;
}

module.exports = convertDivisors;

function isMultipleOf (n, d) {
  return d !== 0 &&
    d !== Infinity &&
    n / d === Math.floor(n / d)
}

function filterKeys (obj, predicate) {
  return Object
    .keys(obj)
    .filter(predicate)
    .map(k => obj[k])
}

function convertDivisors (matchWords, n) {
  const xIsMultipleOf = (d) => isMultipleOf(n, Number(d))
  const matches = filterKeys(matchWords, xIsMultipleOf)
  return matches.join('') || n
}

module.exports = convertDivisors

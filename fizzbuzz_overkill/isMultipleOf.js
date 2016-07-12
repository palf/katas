function isMultipleOf (n, d) {
  return d !== 0 &&
    d !== Infinity &&
    n / d === Math.floor(n / d);
}

module.exports = isMultipleOf;

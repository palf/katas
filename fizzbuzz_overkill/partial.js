function partial (f, v) {
  return f.bind(undefined, v);
}

module.exports = partial;

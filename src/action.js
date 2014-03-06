var Action = function (execute) {
    this.execute = execute;
    this.retryCount = 5;
}

module.exports = Action;

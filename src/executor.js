module.exports = function (action) {
    var result = false;

    while (!result && action.retryCount > 0) {
        action.retryCount -= 1
        result = action.execute();
    }
    return result;
}

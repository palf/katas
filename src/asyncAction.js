var AsyncAction = function (deferred) {

    var onSuccess = function () { console.log('Success!'); };
    var onFailure = function () { console.log('Failure!'); };

    this.execute = function () {
        deferred.then(onSuccess, onFailure);
    };

    this.retryCount = 5;
}

module.exports = AsyncAction;

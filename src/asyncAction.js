var Promise = require('promise');

var AsyncAction = function (thingToExecute) {
    this.execute = function () {
        console.log('executing');
        var promise = new Promise(thingToExecute);

        promise.then(onSuccess, onFailure);
    };

    var retry = this.execute;

    function onSuccess (x) { console.log('Success! got ' + x); };
    function onFailure (x) {
        console.log('Failure! try again');
        retry();
    };


    this.retryCount = 5;
}

module.exports = AsyncAction;

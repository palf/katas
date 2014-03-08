var Promise = require('promise');

function AsyncAction (callback) {
    var self = this,
        retryCount = 5,
        initialValue;

    self.execute = function (value) {
        initialValue = value;
        var promise = new Promise(callback(value));
        promise.then(onSuccess, onFailure);
    };

    function onSuccess (v) {
        self.onSuccess(v);
    }

    function onFailure () {
        retryCount --;
        if (retryCount > 0) {
            console.log('Failure! retrying');
            self.execute(initialValue);
        } else {
            console.log('Failure! given up');
        }
    }
}

module.exports = AsyncAction;

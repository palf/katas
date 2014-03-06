var Promise = require('promise');

function AsyncAction (thingToExecute) {
    var self = this;
    var initialValue = null;

    self.retryCount = 5;

    self.execute = function (value) {
        self.initialValue = value;
        var promise = new Promise(thingToExecute(value));
        promise.then(self.onSuccess, onFailure);
    };

    function onFailure (value) {
        self.retryCount--;
        if (self.retryCount > 0) {
            console.log('Failure! retrying');
            self.execute(self.initialValue);
        } else {
            console.log('Failure! given up');
        }
    }
}

module.exports = AsyncAction;

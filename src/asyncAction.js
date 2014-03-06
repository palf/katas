var Promise = require('promise');

function AsyncAction (thingToExecute) {
    var self = this;

    self.retryCount = 5;

    self.execute = function () {
        var promise = new Promise(thingToExecute);
        promise.then(onSuccess, onFailure);
    };

    function onSuccess (value) {
        console.log('Success! got ' + value);
        self.successAction.execute();
    }

    function onFailure () {
        self.retryCount--;
        if (self.retryCount > 0) {
            console.log('Failure! retrying');
            self.execute();
        } else {
            console.log('Failure! given up');
        }
    }
}

module.exports = AsyncAction;

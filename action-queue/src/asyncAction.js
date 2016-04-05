    'use strict';

var Promise = require('promise');

function AsyncAction (outerFunc) {

    function wrapForPromise () {
        return function promiseWrapper (resolve, reject) {
            var result = outerFunc(initialValue);
            if (result) {
                resolve(initialValue);
            } else {
                reject(initialValue);
            }
        };
    }

    var self = this,
        retryCount = 5,
        initialValue;

    function onSuccess () {
        self.onSuccess(initialValue);
    }

    function onFailure () {
        retryCount --;
        if (retryCount > 0) {
            self.onFailure(initialValue);
        } else {
            // console.log('Failure! given up');
        }
    }

    this.execute = function (value) {
        initialValue = value;

        var promiseWrapped = wrapForPromise();
        var promise = new Promise(promiseWrapped);
        promise.then(onSuccess, onFailure);
    };
}

module.exports = AsyncAction;

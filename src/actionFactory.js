// var Action = require('./action');
var AsyncAction = require('./asyncAction');

function flipCoin (string) {
    return function (resolve, reject) {
        var value = Math.random() > 0.5;
        if (value) {
            resolve(string + 'h');
        } else {
            reject(string + 't');
        }
    };
}

exports.buildFlipCoinAction = function () {
    return new AsyncAction(flipCoin);
};

var AsyncAction = require('./asyncAction');

function flipCoin () {
    return Math.random() > 0.5;
}

function wrap (data) {
    return function (resolve, reject) {
        var value = flipCoin();
        if (value) {
            resolve(data + 'h');
        } else {
            reject(data + 't');
        }
    };
}

exports.buildFlipCoinAction = function () {
    return new AsyncAction(wrap);
};

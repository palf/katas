var Action = require('./action');
var AsyncAction = require('./asyncAction');


function getNullAction () {
    return {
        execute: function () {
            console.log('executing null');
        }
    }
}


function flipCoin (resolve, reject) {
    var value = Math.random() > 0.5;
    if (value) {
        resolve(value);
    } else {
        reject(value);
    }
}


function rollMatches (value) {
    return function (resolve, reject) {
        var roll = Math.floor( Math.random() * 6 ) + 1;
        if (roll === value) {
            resolve(value);
        } else {
            reject(value);
        }
    }
}

function rollDoesNotMatch (value) {
    return function (resolve, reject) {
        var roll = Math.floor( Math.random() * 6 ) + 1;
        if (roll !== value) {
            resolve(value);
        } else {
            reject(value);
        }
    }
}


exports.flipCoinAction = function (value) {
    return new AsyncAction(flipCoin);
}


exports.rollDiceAction = function (value) {
    var rollDice = rollMatches(value);
    var action = new AsyncAction(rollDice);
    action.successAction = getNullAction();
    return action;
}


exports.antiRollDiceAction = function (value) {
    var rollDice = rollDoesNotMatch(value);
    return new AsyncAction(rollDice);
}

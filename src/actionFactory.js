var Action = require('./action');
var AsyncAction = require('./asyncAction');
var Promise = require('promise');


function throwParade() { console.log('parade! :D') };
function throwTantrum() { console.log('tantrum :(') };


function getFlipCoinPromise () {
    function flipper (resolve, reject) {
        var value = Math.random() > 0.5;
        if (value) {
            resolve();
        } else {
            reject();
        }
    }

    var promise = new Promise(flipper);
    return promise;
}

function rollMatches (value) {
    return function () {
        var roll = Math.floor( Math.random() * 6 ) + 1;
        console.log('rolled a ' + roll);
        return roll === value;
    }
}


exports.rollDice = function (value) {
    var rollDice = rollMatches(value);
    var action = new Action(rollDice);
    action.onSuccess = throwParade;
    action.onFailure = throwTantrum;
    return action;
}


exports.postMessageAction = function (value) {
    var flipCoin = getFlipCoinPromise();
    var action = new AsyncAction(flipCoin);

    return action;
}

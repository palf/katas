var Action = require('./action');
var AsyncAction = require('./asyncAction');


function throwParade() { console.log('parade! :D') };
function throwTantrum() { console.log('tantrum :(') };


function flipCoin (resolve, reject) {
    var value = Math.random() > 0.5;
    if (value) {
        resolve(value);
    } else {
        reject(value);
    }
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
    return new AsyncAction(flipCoin);
}

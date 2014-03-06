var Action = require('./actions');

function throwParade() { console.log('parade! :D') };
function throwTantrum() { console.log('tantrum :(') };


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


exports.rollDiceAsync = function (value) {
    var rollDice = rollMatches(value);
    var action = new Action(rollDice);
    action.onSuccess = throwParade;
    action.onFailure = throwTantrum;
    return action;
}
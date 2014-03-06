var Action = require('./actions');

function throwParade() { console.log('parade! :D') };
function throwTantrum() { console.log('tantrum :(') };


function coinMatches (value) {
    return function () {
        var flip = Math.random() > 0.5;
        var side = flip ? 'heads' : 'tails'
        console.log('flipped ' + side);
        return side === value;
    }
}

function rollMatches (value) {
    return function () {
        var roll = Math.floor( Math.random() * 6 ) + 1;
        console.log('rolled a ' + roll);
        return roll === value;
    }
}


exports.flipCoin = function (value) {
    var flipCoin = coinMatches(value);
    return new Action(flipCoin);
}


exports.rollDice = function (value) {
    var rollDice = rollMatches(value);
    var action = new Action(rollDice);
    action.onSuccess = throwParade;
    action.onFailure = throwTantrum;
    return action;
}


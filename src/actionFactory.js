var Action = require('./actions');

var coinMatches = function (value) {
    return function () {
        var flip = Math.random() > 0.5;
        var side = flip ? 'heads' : 'tails'
        console.log('flipped ' + side);
        return side === value;
    }
}

var rollMatches = function (value) {
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
    var rollDice = rollMatches(value)
    return new Action(rollDice);
}


'use strict';

var build = require('./src/actionBuilder');
var games = require('./src/games');

var stepOne = build.asyncAction(games.flipCoin);
var stepTwo = build.asyncAction(games.flipCoin);
var stepThree = build.asyncAction(games.flipCoin);

stepOne.onSuccess = stepTwo.execute;
stepTwo.onSuccess = stepThree.execute;
stepThree.onSuccess = stepThree.execute;

stepThree.onFailure = function (value) {
    console.log(value);
}

stepOne.execute('');

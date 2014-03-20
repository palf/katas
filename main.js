var builder = require('./src/actionBuilder');
var games = require('./src/games');

var stepOne = builder.buildAction(games.flipCoin);
var stepTwo = builder.buildAction(games.flipCoin);
var stepThree = builder.buildAction(games.flipCoin);

stepOne.onSuccess = function (string) {
    console.log('Success value: ' + string);
    stepTwo.execute(string);
};

stepTwo.onSuccess = function (string) {
    console.log('Success value: ' + string);
    stepThree.execute(string);
};

stepThree.onSuccess = function (string) {
    console.log('Success value: ' + string);
    stepThree.execute(string);
};

stepOne.execute('');

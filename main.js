var build = require('./src/actionBuilder');
var games = require('./src/games');

var stepOne = build.buildAction(games.flipCoin);
var stepTwo = build.buildAction(games.flipCoin);
var stepThree = build.buildAction(games.flipCoin);

function logThenExecute (action) {
    return function (result) {
        console.log('result: ' + result);
        action.execute(result);
    }
}

stepOne.onSuccess = logThenExecute(stepTwo);
stepTwo.onSuccess = logThenExecute(stepThree);
stepThree.onSuccess = logThenExecute(stepThree);

stepOne.execute('');

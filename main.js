var actions = require('./src/actionFactory');
var execute = require('./src/executor');

// var action = actions.flipCoin('heads');
var action = actions.rollDice(4);

execute(action);

var actions = require('./src/actionFactory');
var execute = require('./src/executor');

// var action = actions.rollDice(4);
var action = actions.postMessageAction();

var result = action.execute();


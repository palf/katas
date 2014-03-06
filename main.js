var actions = require('./src/actionFactory');
var execute = require('./src/executor');


function throwParade() { console.log('parade! :D') };
function throwTantrum() { console.log('tantrum :(') };

// var action = actions.flipCoin('heads');
var action = actions.rollDice(4);

action.onSuccess = throwParade;
action.onFailure = throwTantrum;

execute(action);

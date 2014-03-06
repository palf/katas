var actions = require('./src/actionFactory');
var execute = require('./src/executor');

var createEndpoint = actions.rollDiceAction(4);         // 1/6
var createSubscription = actions.flipCoinAction();      // 3/6
var poll = actions.antiRollDiceAction(6);                // 5/6


createEndpoint.successAction = createSubscription;
createSubscription.successAction = poll;
poll.successAction = poll;

createEndpoint.execute();


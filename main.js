var factory = require('./src/actionFactory');

var stepOne = factory.buildFlipCoinAction();
var stepTwo = factory.buildFlipCoinAction();
var stepThree = factory.buildFlipCoinAction();

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

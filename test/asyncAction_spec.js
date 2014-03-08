var AsyncAction = require('../src/asyncAction');

exports['execute(value)'] = {
    'executes the callback with the passed value': function(test) {
        var passedArg;
        var callback = function (x) {
            return function () { passedArg = x; };
        };
        var action = new AsyncAction(callback);
        var value = {};
        action.execute(value);
        var check = (passedArg === value);
        test.ok(check, 'expected ' + passedArg + ' to be ' + value);
        test.done();
    }
};

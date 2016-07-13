'use strict';

var AsyncAction = require('../src/asyncAction');

function alwaysSucceeds () { return true; }
function alwaysFails () { return false; }
function completeTest (test, check) {
    test.ok(check, 'expected true');
    test.done();
}

exports['#execute(value)'] = {
    'executes the callback with the passed value': function(test) {
        var passedArg, check, value = {};
        function externalFunc (input) { passedArg = input; }
        var action = new AsyncAction(externalFunc);
        action.execute(value);
        check = (passedArg === value);
        test.ok(check, 'expected ' + passedArg + ' to be ' + value);
        test.done();
    },

    'calls only the onSuccess handler when the function returns true': function(test) {
        var action = new AsyncAction(alwaysSucceeds);
        action.onSuccess = function () { completeTest(test, true); };
        action.onFailure = function () { completeTest(test, false); };
        action.execute();
    },

    'calls only the onFailure handler when the function returns false': function(test) {
        var action = new AsyncAction(alwaysFails);
        action.onSuccess = function () { completeTest(test, false); };
        action.onFailure = function () { completeTest(test, true); };
        action.execute();
    },

    'passes the initial value to the success handler': function(test) {
        var action = new AsyncAction(alwaysSucceeds);
        var input = {};

        action.onSuccess = function (passedArg) {
            var check = (input === passedArg);
            test.ok(check, 'expected success handler to be passed execution input');
            test.done();
        };

        action.execute(input);
    },

    'passes the initial value to the failure handler': function(test) {
        var action = new AsyncAction(alwaysFails);
        var input = {};

        action.onFailure = function (passedArg) {
            var check = (input === passedArg);
            test.ok(check, 'expected failure handler to be passed execution input');
            test.done();
        };

        action.execute(input);
    }
};

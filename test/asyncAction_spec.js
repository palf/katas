'use strict';

var AsyncAction = require('../src/asyncAction');

function alwaysSucceeds () { return true; }
function alwaysFails () { return false; }

exports['#execute(value)'] = {
    'executes the callback with the passed value': function(test) {
        var passedArg, check, value = {};
        function externalFunc (x) { passedArg = x; }
        var action = new AsyncAction(externalFunc);
        action.execute(value);
        check = (passedArg === value);
        test.ok(check, 'expected ' + passedArg + ' to be ' + value);
        test.done();
    },

    'calls only the onSuccess handler when the function returns true': function(test) {
        var check = false;
        var action = new AsyncAction(alwaysSucceeds);

        function completeTest () {
            test.ok(check, 'expected success handler to be called');
            test.done();
        }

        action.onFailure = completeTest;
        action.onSuccess = function () {
            check = true;
            completeTest();
        };

        action.execute();
    },

    'calls only the onFailure handler when the function returns true': function(test) {
        var check = false;
        var action = new AsyncAction(alwaysFails);

        function completeTest () {
            test.ok(check, 'expected success handler to be called');
            test.done();
        }

        action.onSuccess = completeTest;
        action.onFailure = function () {
            check = true;
            completeTest();
        };

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

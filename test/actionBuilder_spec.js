'use strict';

var ActionBuilder = require('../src/actionBuilder');
var AsyncAction = require('../src/asyncAction');

exports['asyncAction(func)'] = {
    'returns an async action': function(test) {
        test.expect(1);
        var result = ActionBuilder.asyncAction();
        var check = result instanceof AsyncAction;
        test.ok(check, "expected an AsyncAction");
        test.done();
    }
};

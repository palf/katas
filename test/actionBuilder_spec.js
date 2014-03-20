var ActionBuilder = require('../src/actionBuilder');
var AsyncAction = require('../src/asyncAction');

exports['buildAction(func)'] = {
    'returns a flip coin action': function(test) {
        test.expect(1);
        var result = ActionBuilder.buildAction();
        var check = result instanceof AsyncAction;
        test.ok(check, "expected an AsyncAction");
        test.done();
    }
};

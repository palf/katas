var ActionFactory = require('../src/actionFactory');
var AsyncAction = require('../src/asyncAction');

exports['buildFlipCoinAction()'] = {
    'returns a flip coin action': function(test) {
        test.expect(1);
        var result = ActionFactory.buildFlipCoinAction();
        var check = result instanceof AsyncAction;
        test.ok(check, "expected an AsyncAction");
        test.done();
    }
};

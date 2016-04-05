'use strict';

var AsyncAction = require('./asyncAction');

exports.asyncAction = function (func) {
    return new AsyncAction(func);
};

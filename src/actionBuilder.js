var AsyncAction = require('./asyncAction');

function getWrapped (func) {
    return function wrap (data) {
        return function (resolve, reject) {
            var value = func();
            if (value) {
                resolve(data + 'h');
            } else {
                reject(data + 't');
            }
        };
    };
}

exports.buildAction = function (func) {
    var wrap = getWrapped(func);
    return new AsyncAction(wrap);
};

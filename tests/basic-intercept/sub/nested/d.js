define(function (require, exports, module) {
    var c = require('../c'),
        e = require('./e');

    return {
        name: 'd',
        e: e,
        cName: c.name
    };
});

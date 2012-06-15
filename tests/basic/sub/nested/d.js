if (typeof define !== 'function') { var define = (require('../../../../amdefine'))(module); }

define(function (require, exports, module) {
    var c = require('../c'),
        e = require('./e');

    return {
        name: 'd',
        e: e,
        cName: c.name
    };
});

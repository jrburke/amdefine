if (typeof define !== 'function') { var define = (require('../../../../amdefine'))(module); }

//Define's a named module, but one that does not match the current module name
//expected by node. amdefine should just ignore this ID and use the ID expected
//by node.
define('whatever', function (require, exports, module) {
    var c = require('../c'),
        e = require('./e');

    return {
        name: 'd',
        e: e,
        cName: c.name
    };
});

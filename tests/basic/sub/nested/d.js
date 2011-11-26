if (typeof define !== 'function') { var define = (require('../../../../amdefine'))(module); }

define('whatever', function (require, exports, module) {

debugger;
    var c = require('../c');

    return {
        name: 'd',
        cName: c.name
    };
});

if (typeof define !== 'function') { var define = require('../../amdefine')(module) }

define('other', function (require, exports, module) {
    return {
        name: 'other'
    };
});

module.exports = define.require('other');

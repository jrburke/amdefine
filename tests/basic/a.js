if (typeof define !== 'function') { var define = require('../../amdefine')(module) }

define(['./b', './sub/nested/d'], function (b, d) {
    return {
        name: 'a',
        b: b,
        d: d
    };
});

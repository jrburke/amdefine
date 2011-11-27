if (typeof define !== 'function') { var define = (require('../../../../amdefine'))(module); }

define(function (require) {
    var leaf = require('./another/leaf'),
        oneTemplate = require('../text!./templates/one.txt'),
        twoTemplate = require('../text!./templates/two.txt');

    return {
        name: 'branch',
        leaf: leaf,
        one: oneTemplate,
        two: twoTemplate
    };
});

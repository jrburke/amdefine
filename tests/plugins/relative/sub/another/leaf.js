if (typeof define !== 'function') { var define = (require('../../../../../amdefine'))(module); }

define(function (require) {
    return {
        name: 'leaf',
        two: require('../../text!../templates/two.txt')
    };
});

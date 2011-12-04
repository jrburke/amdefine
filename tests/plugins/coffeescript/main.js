if (typeof define !== 'function') { var define = (require('../../../amdefine'))(module); }

//Just testing a plain exports case.
define(function (require) {
    return require('./cs!csmain');
});

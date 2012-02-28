if (typeof define !== 'function') { var define = (require('../../../amdefine'))(module, require); }

//Just testing a plain exports case.
define(function (require) {
    var dynamic = {
        count: 0,
        action: function () {
            dynamic.count += 1;

            //Test that dynamic require is not synchronous. If it was, this
            //would add two to the counter, instead of just one.
            require(['../addTwo'], function (addTwo) {
                console.log('dynamic require should fire after TEST SUMMARY is shown.');
                dynamic.count += addTwo();
            });
        }
    };

    return dynamic;
});

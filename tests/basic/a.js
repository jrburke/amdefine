
if (typeof define !== 'function') { var define = (require('../../amdefine'))(module); }

define(['./b', './sub/nested/d'], function (b, d) {
    console.log('b === ' + b.name);
    console.log('d === ' + d.name);
    console.log('c === ' + d.cName);
});

if (typeof define !== 'function') { var define = require('../../amdefine')(module) }

define(['./b', './sub/nested/d', './exportA', './exportB'], 
  function (b, d, exportA, exportB) {
    return {
        name: 'a',
        b: b,
        d: d,
        exportA: exportA,
        exportB: exportB
    };
});

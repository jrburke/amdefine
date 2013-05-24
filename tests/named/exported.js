if (typeof define !== 'function') { 
  var define = require('../../amdefine')(module).export;
}

define('foo', function (require, exports, module) {
    return {
        name: 'exported'
    };
});

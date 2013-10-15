define(function (require, exports, module) {

    //A fake out, modify the exports, but still prefer the
    //return value as the module value.
    exports.name = 'badc';

    return {
        name: 'c'
    };
});

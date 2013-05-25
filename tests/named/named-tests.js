doh.register(
    "named",
    [
        function named(t){
            var lib = require('./lib');

            t.is('lib', lib.name);
            t.is('b', lib.b.name);
            t.is('d', lib.d.name);
            t.is('c', lib.d.cName);
            t.is('e', lib.d.e.name);
            t.is('other', lib.d.otherName);
            t.is('exported', lib.d.exportedName);
        }
    ]
);

doh.run();

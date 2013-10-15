doh.register(
    "basicIntercept",
    [
        function basicIntercept(t){
            var a = require('./a');

            t.is('a', a.name);
            t.is('b', a.b.name);
            t.is('d', a.d.name);
            t.is('c', a.d.cName);
            t.is('e', a.d.e.name);
        }
    ]
);

doh.run();

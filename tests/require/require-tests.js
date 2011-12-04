doh.register(
    "requireTests",
    [
        function requireTests(t){
            var dynamic = require('./sub/dynamic');

            t.is(0, dynamic.count);
            dynamic.action();
            t.is(1, dynamic.count);
        }
    ]
);

doh.run();

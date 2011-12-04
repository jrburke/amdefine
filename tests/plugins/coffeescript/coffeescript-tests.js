doh.register(
    "coffeescript",
    [
        function coffeescript(t){
            var main = require('./main');

            t.is('regular', main.regular.name);
            t.is('attach', main.controller.attach());
            t.is('render', main.view.render());
        }
    ]
);

doh.run();

doh.register(
    "pluginsRelative",
    [
        function pluginsRelative(t){
            var branch = require('./sub/branch'),
                fs = require('fs'),
                path = require('path'),
                baseName = path.dirname(module.filename),
                twoText = fs.readFileSync(path.normalize(path.join(baseName, './sub/templates/two.txt')), 'utf8');

            t.is('branch', branch.name);
            t.is('leaf', branch.leaf.name);
            t.is(fs.readFileSync(path.normalize(path.join(baseName, './sub/templates/one.txt')), 'utf8'), branch.one);
            t.is(twoText, branch.two);
            t.is(twoText, branch.leaf.two);
        }
    ]
);

doh.run();

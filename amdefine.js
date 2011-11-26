
/*jslint strict: false, nomen: false, plusplus: false */
/*global require, module, process */

var loaderCache = {},
    makeRequire;

/**
 * Given a relative module name, like ./something, normalize it to
 * a real name that can be mapped to a path.
 * @param {String} name the relative name
 * @param {String} baseName a real name that the name arg is relative
 * to.
 * @returns {String} normalized name
 */
function normalize(name, baseName) {
    //Adjust any relative paths.
    if (name && name.charAt(0) === ".") {
        //If have a base name, try to normalize against it,
        //otherwise, assume it is a top-level require that will
        //be relative to baseUrl in the end.
        if (baseName) {
            //Convert baseName to array, and lop off the last part,
            //so that . matches that "directory" and not name of the baseName's
            //module. For instance, baseName of "one/two/three", maps to
            //"one/two/three.js", but we want the directory, "one/two" for
            //this normalization.
            baseName = baseName.split("/");
            baseName = baseName.slice(0, baseName.length - 1);

            name = baseName.concat(name.split("/"));

            //start trimDots
            var i, part;
            for (i = 0; (part = name[i]); i++) {
                if (part === ".") {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === "..") {
                    if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join("/");
        }
    }
    return name;
}

function makeNormalize(relName) {
    return function (name) {
        return normalize(name, relName);
    };
}

function stringRequire(module, id) {
    //Split the ID by a ! so that
    var index = id.indexOf('!'),
        relId = module.id,
        prefix, plugin;

    if (index === -1) {
        //Straight module lookup. If it is one of the special dependencies,
        //deal with it, otherwise, delegate to node.
        if (id === 'require') {
            return makeRequire(module);
        } else if (id === 'exports') {
            return module.exports;
        } else if (id === 'module') {
            return module;
        } else {
            return module.require(id);
        }
    } else {
        //There is a plugin in play.
        prefix = id.substring(0, index);
        id = id.substring(index, id.length);

        plugin = require(prefix);

        if (plugin.normalize) {
            id = plugin.normalize(id, makeNormalize(relId));
        } else {
            //Normalize the ID normally.
            id = normalize(id, relId);
        }

        if (loaderCache[id]) {
            return loaderCache[id];
        } else {
            plugin.load(id, makeRequire(module), function (value) {
                loaderCache[id] = value;
            }, {});

            return loaderCache[id];
        }
    }
}

makeRequire = function (module) {
    return function (deps, callback) {
        if (typeof deps === 'string') {
            //Synchronous, single module require('')
            return stringRequire(module, deps);
        } else {
            //Array of dependencies with a callback.

            //Convert the dependencies to modules.
            deps = deps.map(function (depName) {
                return stringRequire(module, depName);
            });

            //Wait for next tick to call back the require call.
            process.nextTick(function () {
                callback.apply(null, deps);
            });

            //Keeps strict checking in komodo happy.
            return undefined;
        }
    };
};

function amdefine(module) {
    var alreadyCalled = false;

    //Create a define function specific to the module asking for amdefine.
    function define() {

        var args = arguments,
            factory = args[args.length - 1],
            isFactoryFunction = (typeof factory === 'function'),
            deps, result;

        //Only support one define call per file
        if (alreadyCalled) {
            throw new Error('amdefine cannot be called more than once per file.');
        }
        alreadyCalled = true;

        //Grab array of dependencies if it is there.
        if (args.length > 1) {
            deps = args[args.length - 2];
            if (!Array.isArray(deps)) {
                //deps is not an array, may be an ID. Discard it.
                deps = null;
            }
        }

        //If there are dependencies, they are strings, so need
        //to convert them to dependency values.
        if (deps) {
            deps = deps.map(function (depName) {
                return stringRequire(module, depName);
            });
        } else if (isFactoryFunction) {
            //Pass in the standard require, exports, module
            deps = [makeRequire(module), module.exports, module];
        }

        if (!isFactoryFunction) {
            //Factory is an object that should just be used for the define call.
            module.exports = factory;
        } else {
            //Call the factory with the right dependencies.
            result = factory.apply(module.exports, deps);

            if (result !== undefined) {
                module.exports = result;
            }
        }
    }

    define.amd = {};

    return define;
}

module.exports = amdefine;
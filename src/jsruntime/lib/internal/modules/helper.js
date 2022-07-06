const { NativeModule } = require('internal/bootstrap/loaders');
const { debugLog: debug } = require('internal/util/debuglog');

function makeRequireFunction(mod) {
    const Module = mod.constructor;
  
    const require = function require(path) {
        return mod.require(path);
    };
  
    function resolve(request, options) {
      return Module._resolveFilename(request, mod, false, options);
    }
  
    require.resolve = resolve;
  
    function paths(request) {
      return Module._resolveLookupPaths(request, mod);
    }
  
    resolve.paths = paths;
  
    require.main = process.mainModule;
  
    // Enable support to add extra extension types.
    require.extensions = Module._extensions;
  
    require.cache = Module._cache;
  
    return require;
}

function loadNativeModule(filename, request) {
    const mod = NativeModule.map.get(filename);
    if (mod?.canBeRequiredByUsers) {
      debug('load native module %s', request);
      mod.compileForPublicLoader();
      return mod;
    }
}

module.exports = {
    makeRequireFunction,
    loadNativeModule
};

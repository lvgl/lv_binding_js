'use strict'

const {
    ArrayIsArray,
    ArrayPrototypeConcat,
    ArrayPrototypeFilter,
    ArrayPrototypeIncludes,
    ArrayPrototypeIndexOf,
    ArrayPrototypeJoin,
    ArrayPrototypePush,
    ArrayPrototypeSlice,
    ArrayPrototypeSplice,
    ArrayPrototypeUnshift,
    ArrayPrototypeUnshiftApply,
    Boolean,
    Error,
    JSONParse,
    ObjectCreate,
    ObjectDefineProperty,
    ObjectFreeze,
    ObjectGetOwnPropertyDescriptor,
    ObjectGetPrototypeOf,
    ObjectKeys,
    ObjectPrototype,
    ObjectPrototypeHasOwnProperty,
    ObjectSetPrototypeOf,
    Proxy,
    ReflectApply,
    ReflectSet,
    RegExpPrototypeExec,
    RegExpPrototypeTest,
    SafeMap,
    SafeWeakMap,
    String,
    StringPrototypeCharAt,
    StringPrototypeCharCodeAt,
    StringPrototypeEndsWith,
    StringPrototypeLastIndexOf,
    StringPrototypeIndexOf,
    StringPrototypeMatch,
    StringPrototypeRepeat,
    StringPrototypeSlice,
    StringPrototypeSplit,
    StringPrototypeStartsWith,
} = primordials;

const { NativeModule } = require('internal/bootstrap/loaders');
const { debugLog: debug } = require('internal/util/debuglog');
const fs = require('fs');
const path = require('path');

const {
  CHAR_FORWARD_SLASH,
  CHAR_BACKWARD_SLASH,
  CHAR_COLON
} = require('internal/constants');

const {
  loadNativeModule,
  makeRequireFunction,
} = require('internal/modules/helper');

const isWindows = process.platform === 'win32';

const moduleParentCache = new SafeWeakMap();
function Module(id = '', parent) {
    this.id = id;
    this.path = path.dirname(id);
    this.exports = {};
    this.filename = null;
    this.loaded = false;
}

const builtinModules = [];
for (const { 0: id, 1: mod } of NativeModule.map) {
  if (mod.canBeRequiredByUsers) {
    ArrayPrototypePush(builtinModules, id);
  }
}

ObjectFreeze(builtinModules);
Module.builtinModules = builtinModules;

Module._cache = ObjectCreate(null);
Module._pathCache = ObjectCreate(null);
Module._extensions = ObjectCreate(null);
let modulePaths = [];
Module.globalPaths = [];

let idx = 0;

function safeWrapAndExec (moduleObj, requireFunc, dirname, filename, content) {
	const tempArgs = [moduleObj.exports, requireFunc, moduleObj, filename, dirname]
	const key = `__SJS_MODULE_WRAPPER_${idx++}`
	globalThis[key] = tempArgs
    content = `(function loader (exports, require, module, __filename, __dirname) {${content}})(...globalThis["${key}"])`
    __NativeEvalModule(content, filename)
	delete globalThis[key]
}

function getModuleParent() {
    return moduleParentCache.get(this);
}
  
function setModuleParent(value) {
    moduleParentCache.set(this, value);
}

const realpathCache = new SafeMap();

function emitCircularRequireWarning(prop) {
    console.log(
      `Accessing non-existent property '${String(prop)}' of module exports ` +
      'inside circular dependency'
    );
}

const CircularRequirePrototypeWarningProxy = new Proxy({}, {
    __proto__: null,
  
    get(target, prop) {
      if (prop in target || prop === '__esModule') return target[prop];
      emitCircularRequireWarning(prop);
      return undefined;
    },
  
    getOwnPropertyDescriptor(target, prop) {
      if (ObjectPrototypeHasOwnProperty(target, prop) || prop === '__esModule')
        return ObjectGetOwnPropertyDescriptor(target, prop);
      emitCircularRequireWarning(prop);
      return undefined;
    }
});

function findLongestRegisteredExtension(filename) {
  const name = path.basename(filename);
  let currentExtension;
  let index;
  let startIndex = 0;
  while ((index = StringPrototypeIndexOf(name, '.', startIndex)) !== -1) {
    startIndex = index + 1;
    if (index === 0) continue; // Skip dotfiles like .gitignore
    currentExtension = StringPrototypeSlice(name, index);
    if (Module._extensions[currentExtension]) return currentExtension;
  }
  return '.js';
}

function toRealPath(requestPath) {
  return fs.realPathSync(requestPath);
}

function tryFile(requestPath, isMain) {
  const stat = fs.statSync(requestPath);
  if (!stat.isFile()) return;
  return toRealPath(requestPath);
}

function tryExtensions(p, exts, isMain) {
  for (let i = 0; i < exts.length; i++) {
    const filename = tryFile(p + exts[i], isMain);

    if (filename) {
      return filename;
    }
  }
  return false;
}

Module.prototype.load = function(filename) {
  debug('load %j for module %j', filename, this.id);

  this.filename = filename;

  const extension = findLongestRegisteredExtension(filename);

  Module._extensions[extension](this, filename);
  this.loaded = true;
};

Module._load = function(request, parent, isMain) {
    const filename = Module._resolveFilename(request, parent, isMain);
    const cachedModule = Module._cache[filename];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
  
    const mod = loadNativeModule(filename, request);
    if (mod?.canBeRequiredByUsers) {
      return mod.exports;
    }
  
    const module = cachedModule || new Module(filename, parent);
  
    if (isMain) {
      process.mainModule = module;
      module.id = '.';
    }
  
    Module._cache[filename] = module;
  
    let threw = true;
    try {
      module.load(filename);
      threw = false;
    } finally {
      if (threw) {
        delete Module._cache[filename];
      } else if (module.exports &&
                 ObjectGetPrototypeOf(module.exports) ===
                   CircularRequirePrototypeWarningProxy) {
        ObjectSetPrototypeOf(module.exports, ObjectPrototype);
      }
    }
  
    return module.exports;
};

Module._resolveFilename = function(request, parent, isMain, options) {
    if (NativeModule.canBeRequiredByUsers(request)) {
      return request;
    }
  
    const paths = Module._resolveLookupPaths(request, parent);
    const filename = Module._findPath(request, paths, isMain, false);
    if (filename) return filename;

    const message = `Cannot find module '${request}'`;
    // eslint-disable-next-line no-restricted-syntax
    const err = new Error(message);
    err.code = 'MODULE_NOT_FOUND';
    throw err;
};

Module._resolveLookupPaths = function(request, parent) {
  if (NativeModule.canBeRequiredByUsers(request)) {
    debug('looking for %j in []', request);
    return null;
  }

  if (StringPrototypeCharAt(request, 0) !== '.' ||
      (request.length > 1 &&
      StringPrototypeCharAt(request, 1) !== '.' &&
      StringPrototypeCharAt(request, 1) !== '/' &&
      (!isWindows || StringPrototypeCharAt(request, 1) !== '\\'))) {

    let paths = modulePaths;
    if (parent?.paths?.length) {
      paths = ArrayPrototypeConcat(parent.paths, paths);
    }

    debug('looking for %j in %j', request, paths);
    return paths.length > 0 ? paths : null;
  }

  if (!parent || !parent.id || !parent.filename) {
    const mainPaths = ['.'];

    debug('looking for %j in %j', request, mainPaths);
    return mainPaths;
  }

  debug('RELATIVE: requested: %s from parent.id %s', request, parent.id);

  const parentDir = [path.dirname(parent.filename)];
  debug('looking for %j', parentDir);
  return parentDir;
};

Module._initPaths = function() {
  const prefixDir = process.execPath

  const paths = [path.resolve(prefixDir, 'lib')];

  modulePaths = paths;

  // Clone as a shallow copy, for introspection.
  Module.globalPaths = ArrayPrototypeSlice(modulePaths);
};

const trailingSlashRegex = /(?:^|\/)\.?\.$/;
Module._findPath = function(request, paths, isMain) {
  const absoluteRequest = path.isAbsolute(request);
  if (absoluteRequest) {
    paths = [''];
  } else if (!paths || paths.length === 0) {
    return false;
  }

  const cacheKey = request + '\x00' + ArrayPrototypeJoin(paths, '\x00');
  const entry = Module._pathCache[cacheKey];
  if (entry)
    return entry;

  let exts;
  let trailingSlash = request.length > 0 &&
    StringPrototypeCharCodeAt(request, request.length - 1) ===
    CHAR_FORWARD_SLASH;
  if (!trailingSlash) {
    trailingSlash = RegExpPrototypeTest(trailingSlashRegex, request);
  }

  // For each path
  for (let i = 0; i < paths.length; i++) {
    const curPath = paths[i];

    const basePath = path.resolve(curPath, request);
    let filename;

    const fstat = fs.statSync(basePath)
    if (!trailingSlash) {
      if (fstat.isFile()) {  // File.
        filename = toRealPath(basePath);
      }

      if (!filename) {
        // Try it with each of the extensions
        if (exts === undefined)
          exts = ObjectKeys(Module._extensions);
        filename = tryExtensions(basePath, exts, isMain);
      }
    }

    if (!filename && fstat.isDirectory()) {  // Directory.
      // try it with each of the extensions at "index"
      if (exts === undefined)
        exts = ObjectKeys(Module._extensions);
      filename = tryExtensions(path.resolve(requestPath, 'index'), exts, isMain);
    }

    if (filename) {
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }

  return false;
};

Module._extensions['.js'] = function(module, filename) {
  const content = fs.readFileSync(filename);

  module._compile(content, filename);
};

Module.prototype._compile = function(content, filename) {
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this);
  const module = this;

  safeWrapAndExec (module, require, dirname, filename, content)
};

Module.prototype.require = function(id) {
  if (id === '') {
    throw new Error('id', id,
                                    'must be a non-empty string');
  }
  return Module._load(id, this, /* isMain */ false);
};

module.exports = {
  Module
}
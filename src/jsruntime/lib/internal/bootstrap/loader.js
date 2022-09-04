'use strict'

const {
    ArrayFrom,
    ArrayPrototypeMap,
    ArrayPrototypePush,
    ArrayPrototypeSlice,
    Error,
    ObjectCreate,
    ObjectDefineProperty,
    ObjectKeys,
    ObjectPrototypeHasOwnProperty,
    ReflectGet,
    SafeMap,
    SafeSet,
    String,
    StringPrototypeStartsWith,
    TypeError,
} = primordials;

const moduleLoadList = [];
ObjectDefineProperty(process, 'moduleLoadList', {
    __proto__: null,
    value: moduleLoadList,
    configurable: true,
    enumerable: true,
    writable: false
});
const loaderId = 'internal/bootstrap/loaders';
const moduleIds = [
    'os',
    'fs',
    'path',
    'internal/modules/helper',
    'internal/modules/loader',
    'internal/constants',
    'internal/primordials',
    'internal/validators',
    'internal/util/debuglog',
    'internal/util/types',
];

let idx = 0;

const execPath = process.execPath;

function safeWrapAndExec (moduleObj, requireFunc, dirname, filename, content) {
	const tempArgs = [moduleObj.exports, requireFunc, moduleObj, filename, dirname]
	const key = `__SJS_MODULE_WRAPPER_${idx++}`
	globalThis[key] = tempArgs
    content = `(function loader (exports, require, module, __filename, __dirname) {${content}})(...globalThis["${key}"])`
    __NativeEvalModule(content, filename)
	delete globalThis[key]
}

const getOwn = (target, property, receiver) => {
    return ObjectPrototypeHasOwnProperty(target, property) ?
        ReflectGet(target, property, receiver) :
        undefined;
};

const isWindows = process.platform === 'win32';
const sep = isWindows ? '\\' : '/';
const fs = globalThis.SJSJSBridge.fs;

class NativeModule {
    /**
     * A map from the module IDs to the module instances.
     * @type {Map<string, NativeModule>}
     */
    static map;

    constructor(id) {
        this.filename = `${id}.js`;
        this.id = id;
        this.canBeRequiredByUsers = !StringPrototypeStartsWith(id, 'internal/');

        this.exports = {};
        this.loaded = false;
        this.loading = false;

        this.module = undefined;

        this.exportKeys = undefined;
    }

    static exposeInternals() {
        for (const { 0: id, 1: mod } of NativeModule.map) {
            if (id !== loaderId) {
                mod.canBeRequiredByUsers = true;
            }
        }
    }

    static exists(id) {
        return NativeModule.map.has(id);
    }

    static canBeRequiredByUsers(id) {
        const mod = NativeModule.map.get(id);
        return mod && mod.canBeRequiredByUsers;
    }

    compileForPublicLoader() {
        if (!this.canBeRequiredByUsers) {
            throw new Error(`Should not compile ${this.id} for public use`);
        }
        this.compileForInternalLoader();
        return this.exports;
    }

    compileForInternalLoader() {
        if (this.loaded || this.loading) {
            return this.exports;
        }
        
        const id = this.id;
        this.loading = true;
        let filename;
        const prefixDir = execPath;
        const basePath = `${prefixDir}${sep}lib${sep}${id}`

        try {
            let [fstat, err] = fs.statSync(`${basePath}.js`)
            if (fstat?.mode & fs.S_IFREG) {
                [filename, err] = fs.realPathSync(`${basePath}.js`);
            }
            const content = fs.readFileSync(filename)
            const requireFn = nativeModuleRequire;

            safeWrapAndExec (this, requireFn, "", id, content)

            this.loaded = true;
        } finally {
            this.loading = false;
        }

        ArrayPrototypePush(moduleLoadList, `NativeModule ${id}`);
        return this.exports;
    }
};

NativeModule.map = new SafeMap(
    ArrayPrototypeMap(moduleIds, (id) => [id, new NativeModule(id)])
)

const loaderExports = {
    NativeModule,
    require: nativeModuleRequire
};

function nativeModuleRequire(id) {
    if (id === loaderId) {
        return loaderExports;
    }
    const mod = NativeModule.map.get(id);
    if (!mod) throw new TypeError(`Missing internal module '${id}'`);
    return mod.compileForInternalLoader();
};

console.log('bootstrap loader execd')
return loaderExports;
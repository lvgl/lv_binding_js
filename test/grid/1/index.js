var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj9, key, value) => key in obj9 ? __defProp(obj9, key, { enumerable: true, configurable: true, writable: true, value }) : obj9[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __publicField = (obj9, key, value) => {
  __defNormalProp(obj9, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = require_object_assign();
    var n = typeof Symbol === "function" && Symbol.for;
    var p = n ? Symbol.for("react.element") : 60103;
    var q = n ? Symbol.for("react.portal") : 60106;
    var r = n ? Symbol.for("react.fragment") : 60107;
    var t = n ? Symbol.for("react.strict_mode") : 60108;
    var u = n ? Symbol.for("react.profiler") : 60114;
    var v = n ? Symbol.for("react.provider") : 60109;
    var w = n ? Symbol.for("react.context") : 60110;
    var x = n ? Symbol.for("react.forward_ref") : 60112;
    var y = n ? Symbol.for("react.suspense") : 60113;
    var z = n ? Symbol.for("react.memo") : 60115;
    var A = n ? Symbol.for("react.lazy") : 60116;
    var B = typeof Symbol === "function" && Symbol.iterator;
    function C(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var D = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var E = {};
    function F(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = E;
      this.updater = c || D;
    }
    F.prototype.isReactComponent = {};
    F.prototype.setState = function(a, b) {
      if (typeof a !== "object" && typeof a !== "function" && a != null)
        throw Error(C(85));
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    F.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function G() {
    }
    G.prototype = F.prototype;
    function H(a, b, c) {
      this.props = a;
      this.context = b;
      this.refs = E;
      this.updater = c || D;
    }
    var I = H.prototype = new G();
    I.constructor = H;
    l(I, F.prototype);
    I.isPureReactComponent = true;
    var J = { current: null };
    var K = Object.prototype.hasOwnProperty;
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, c) {
      var e, d = {}, g = null, k = null;
      if (b != null)
        for (e in b.ref !== void 0 && (k = b.ref), b.key !== void 0 && (g = "" + b.key), b)
          K.call(b, e) && !L.hasOwnProperty(e) && (d[e] = b[e]);
      var f = arguments.length - 2;
      if (f === 1)
        d.children = c;
      else if (1 < f) {
        for (var h = Array(f), m = 0; m < f; m++)
          h[m] = arguments[m + 2];
        d.children = h;
      }
      if (a && a.defaultProps)
        for (e in f = a.defaultProps, f)
          d[e] === void 0 && (d[e] = f[e]);
      return { $$typeof: p, type: a, key: g, ref: k, props: d, _owner: J.current };
    }
    function N(a, b) {
      return { $$typeof: p, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return typeof a === "object" && a !== null && a.$$typeof === p;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + ("" + a).replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    var Q = [];
    function R(a, b, c, e) {
      if (Q.length) {
        var d = Q.pop();
        d.result = a;
        d.keyPrefix = b;
        d.func = c;
        d.context = e;
        d.count = 0;
        return d;
      }
      return { result: a, keyPrefix: b, func: c, context: e, count: 0 };
    }
    function S(a) {
      a.result = null;
      a.keyPrefix = null;
      a.func = null;
      a.context = null;
      a.count = 0;
      10 > Q.length && Q.push(a);
    }
    function T(a, b, c, e) {
      var d = typeof a;
      if (d === "undefined" || d === "boolean")
        a = null;
      var g = false;
      if (a === null)
        g = true;
      else
        switch (d) {
          case "string":
          case "number":
            g = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case p:
              case q:
                g = true;
            }
        }
      if (g)
        return c(e, a, b === "" ? "." + U(a, 0) : b), 1;
      g = 0;
      b = b === "" ? "." : b + ":";
      if (Array.isArray(a))
        for (var k = 0; k < a.length; k++) {
          d = a[k];
          var f = b + U(d, k);
          g += T(d, f, c, e);
        }
      else if (a === null || typeof a !== "object" ? f = null : (f = B && a[B] || a["@@iterator"], f = typeof f === "function" ? f : null), typeof f === "function")
        for (a = f.call(a), k = 0; !(d = a.next()).done; )
          d = d.value, f = b + U(d, k++), g += T(d, f, c, e);
      else if (d === "object")
        throw c = "" + a, Error(C(31, c === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : c, ""));
      return g;
    }
    function V(a, b, c) {
      return a == null ? 0 : T(a, "", b, c);
    }
    function U(a, b) {
      return typeof a === "object" && a !== null && a.key != null ? escape(a.key) : b.toString(36);
    }
    function W(a, b) {
      a.func.call(a.context, b, a.count++);
    }
    function aa(a, b, c) {
      var e = a.result, d = a.keyPrefix;
      a = a.func.call(a.context, b, a.count++);
      Array.isArray(a) ? X(a, e, c, function(a2) {
        return a2;
      }) : a != null && (O(a) && (a = N(a, d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(P, "$&/") + "/") + c)), e.push(a));
    }
    function X(a, b, c, e, d) {
      var g = "";
      c != null && (g = ("" + c).replace(P, "$&/") + "/");
      b = R(b, g, e, d);
      V(a, aa, b);
      S(b);
    }
    var Y = { current: null };
    function Z() {
      var a = Y.current;
      if (a === null)
        throw Error(C(321));
      return a;
    }
    var ba = { ReactCurrentDispatcher: Y, ReactCurrentBatchConfig: { suspense: null }, ReactCurrentOwner: J, IsSomeRendererActing: { current: false }, assign: l };
    exports.Children = { map: function(a, b, c) {
      if (a == null)
        return a;
      var e = [];
      X(a, e, null, b, c);
      return e;
    }, forEach: function(a, b, c) {
      if (a == null)
        return a;
      b = R(null, null, b, c);
      V(a, W, b);
      S(b);
    }, count: function(a) {
      return V(a, function() {
        return null;
      }, null);
    }, toArray: function(a) {
      var b = [];
      X(a, b, null, function(a2) {
        return a2;
      });
      return b;
    }, only: function(a) {
      if (!O(a))
        throw Error(C(143));
      return a;
    } };
    exports.Component = F;
    exports.Fragment = r;
    exports.Profiler = u;
    exports.PureComponent = H;
    exports.StrictMode = t;
    exports.Suspense = y;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ba;
    exports.cloneElement = function(a, b, c) {
      if (a === null || a === void 0)
        throw Error(C(267, a));
      var e = l({}, a.props), d = a.key, g = a.ref, k = a._owner;
      if (b != null) {
        b.ref !== void 0 && (g = b.ref, k = J.current);
        b.key !== void 0 && (d = "" + b.key);
        if (a.type && a.type.defaultProps)
          var f = a.type.defaultProps;
        for (h in b)
          K.call(b, h) && !L.hasOwnProperty(h) && (e[h] = b[h] === void 0 && f !== void 0 ? f[h] : b[h]);
      }
      var h = arguments.length - 2;
      if (h === 1)
        e.children = c;
      else if (1 < h) {
        f = Array(h);
        for (var m = 0; m < h; m++)
          f[m] = arguments[m + 2];
        e.children = f;
      }
      return {
        $$typeof: p,
        type: a.type,
        key: d,
        ref: g,
        props: e,
        _owner: k
      };
    };
    exports.createContext = function(a, b) {
      b === void 0 && (b = null);
      a = { $$typeof: w, _calculateChangedBits: b, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null };
      a.Provider = { $$typeof: v, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: x, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: A, _ctor: a, _status: -1, _result: null };
    };
    exports.memo = function(a, b) {
      return { $$typeof: z, type: a, compare: b === void 0 ? null : b };
    };
    exports.useCallback = function(a, b) {
      return Z().useCallback(a, b);
    };
    exports.useContext = function(a, b) {
      return Z().useContext(a, b);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a, b) {
      return Z().useEffect(a, b);
    };
    exports.useImperativeHandle = function(a, b, c) {
      return Z().useImperativeHandle(a, b, c);
    };
    exports.useLayoutEffect = function(a, b) {
      return Z().useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return Z().useMemo(a, b);
    };
    exports.useReducer = function(a, b, c) {
      return Z().useReducer(a, b, c);
    };
    exports.useRef = function(a) {
      return Z().useRef(a);
    };
    exports.useState = function(a) {
      return Z().useState(a);
    };
    exports.version = "16.14.0";
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (process.env.NODE_ENV !== "production") {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (process.env.NODE_ENV !== "production") {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).");
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning("Failed " + location + " type: " + error.message + (stack != null ? stack : ""));
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (process.env.NODE_ENV !== "production") {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var _assign = require_object_assign();
        var checkPropTypes = require_checkPropTypes();
        var ReactVersion = "16.14.0";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          current: null
        };
        var ReactCurrentBatchConfig = {
          suspense: null
        };
        var ReactCurrentOwner = {
          current: null
        };
        var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
        function describeComponentFrame(name, source, ownerName) {
          var sourceInfo = "";
          if (source) {
            var path4 = source.fileName;
            var fileName = path4.replace(BEFORE_SLASH_RE, "");
            {
              if (/^index\./.test(fileName)) {
                var match = path4.match(BEFORE_SLASH_RE);
                if (match) {
                  var pathBeforeSlash = match[1];
                  if (pathBeforeSlash) {
                    var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, "");
                    fileName = folderName + "/" + fileName;
                  }
                }
              }
            }
            sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
          } else if (ownerName) {
            sourceInfo = " (created by " + ownerName + ")";
          }
          return "\n    in " + (name || "Unknown") + sourceInfo;
        }
        var Resolved = 1;
        function refineResolvedLazyComponent(lazyComponent) {
          return lazyComponent._status === Resolved ? lazyComponent._result : null;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                return "Context.Consumer";
              case REACT_PROVIDER_TYPE:
                return "Context.Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type.render);
              case REACT_LAZY_TYPE: {
                var thenable = type;
                var resolvedThenable = refineResolvedLazyComponent(thenable);
                if (resolvedThenable) {
                  return getComponentName(resolvedThenable);
                }
                break;
              }
            }
          }
          return null;
        }
        var ReactDebugCurrentFrame = {};
        var currentlyValidatingElement = null;
        function setCurrentlyValidatingElement(element) {
          {
            currentlyValidatingElement = element;
          }
        }
        {
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentlyValidatingElement) {
              var name = getComponentName(currentlyValidatingElement.type);
              var owner = currentlyValidatingElement._owner;
              stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var IsSomeRendererActing = {
          current: false
        };
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner,
          IsSomeRendererActing,
          assign: _assign
        };
        {
          _assign(ReactSharedInternals, {
            ReactDebugCurrentFrame,
            ReactComponentTreeHook: {}
          });
        }
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === "string" && args[args.length - 1].indexOf("\n    in") === 0;
            if (!hasExistingStack) {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
            try {
              var argIndex = 0;
              var message = "Warning: " + format.replace(/%s/g, function() {
                return args[argIndex++];
              });
              throw new Error(message);
            } catch (x) {
            }
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          isMounted: function(publicInstance) {
            return false;
          },
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
            {
              throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        _assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentName(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            ref,
            props,
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (!!(element === null || element === void 0)) {
            {
              throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
          }
          var propName;
          var props = _assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = ("" + key).replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
        }
        var POOL_SIZE = 10;
        var traverseContextPool = [];
        function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
          if (traverseContextPool.length) {
            var traverseContext = traverseContextPool.pop();
            traverseContext.result = mapResult;
            traverseContext.keyPrefix = keyPrefix;
            traverseContext.func = mapFunction;
            traverseContext.context = mapContext;
            traverseContext.count = 0;
            return traverseContext;
          } else {
            return {
              result: mapResult,
              keyPrefix,
              func: mapFunction,
              context: mapContext,
              count: 0
            };
          }
        }
        function releaseTraverseContext(traverseContext) {
          traverseContext.result = null;
          traverseContext.keyPrefix = null;
          traverseContext.func = null;
          traverseContext.context = null;
          traverseContext.count = 0;
          if (traverseContextPool.length < POOL_SIZE) {
            traverseContextPool.push(traverseContext);
          }
        }
        function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            callback(traverseContext, children, nameSoFar === "" ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getComponentKey(child, i);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              {
                if (iteratorFn === children.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is deprecated and will be removed in a future major release. Consider converting children to an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(children);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getComponentKey(child, ii++);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            } else if (type === "object") {
              var addendum = "";
              {
                addendum = " If you meant to render a collection of children, use an array instead." + ReactDebugCurrentFrame.getStackAddendum();
              }
              var childrenString = "" + children;
              {
                {
                  throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + ")." + addendum);
                }
              }
            }
          }
          return subtreeCount;
        }
        function traverseAllChildren(children, callback, traverseContext) {
          if (children == null) {
            return 0;
          }
          return traverseAllChildrenImpl(children, "", callback, traverseContext);
        }
        function getComponentKey(component, index) {
          if (typeof component === "object" && component !== null && component.key != null) {
            return escape(component.key);
          }
          return index.toString(36);
        }
        function forEachSingleChild(bookKeeping, child, name) {
          var func = bookKeeping.func, context = bookKeeping.context;
          func.call(context, child, bookKeeping.count++);
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          if (children == null) {
            return children;
          }
          var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
          traverseAllChildren(children, forEachSingleChild, traverseContext);
          releaseTraverseContext(traverseContext);
        }
        function mapSingleChildIntoContext(bookKeeping, child, childKey) {
          var result = bookKeeping.result, keyPrefix = bookKeeping.keyPrefix, func = bookKeeping.func, context = bookKeeping.context;
          var mappedChild = func.call(context, child, bookKeeping.count++);
          if (Array.isArray(mappedChild)) {
            mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function(c) {
              return c;
            });
          } else if (mappedChild != null) {
            if (isValidElement(mappedChild)) {
              mappedChild = cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + "/" : "") + childKey);
            }
            result.push(mappedChild);
          }
        }
        function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
          var escapedPrefix = "";
          if (prefix != null) {
            escapedPrefix = escapeUserProvidedKey(prefix) + "/";
          }
          var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
          traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
          releaseTraverseContext(traverseContext);
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          mapIntoWithKeyPrefixInternal(children, result, null, func, context);
          return result;
        }
        function countChildren(children) {
          return traverseAllChildren(children, function() {
            return null;
          }, null);
        }
        function toArray(children) {
          var result = [];
          mapIntoWithKeyPrefixInternal(children, result, null, function(child) {
            return child;
          });
          return result;
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            {
              throw Error("React.Children.only expected to receive a single React element child.");
            }
          }
          return children;
        }
        function createContext(defaultValue, calculateChangedBits) {
          if (calculateChangedBits === void 0) {
            calculateChangedBits = null;
          } else {
            {
              if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
              }
            }
          }
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            _calculateChangedBits: calculateChangedBits,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context,
              _calculateChangedBits: context._calculateChangedBits
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        function lazy(ctor) {
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _ctor: ctor,
            _status: -1,
            _result: null
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          return {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
        }
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          return {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          if (!(dispatcher !== null)) {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context, unstable_observedBits) {
          var dispatcher = resolveDispatcher();
          {
            if (unstable_observedBits !== void 0) {
              error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://fb.me/rules-of-hooks" : "");
            }
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context, unstable_observedBits);
        }
        function useState2(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentName(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement(element);
          {
            error('Each child in a list should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
          }
          setCurrentlyValidatingElement(null);
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (Array.isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var name = getComponentName(type);
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              setCurrentlyValidatingElement(element);
              checkPropTypes(propTypes, element.props, "prop", name, ReactDebugCurrentFrame.getStackAddendum);
              setCurrentlyValidatingElement(null);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            setCurrentlyValidatingElement(fragment);
            var keys10 = Object.keys(fragment.props);
            for (var i = 0; i < keys10.length; i++) {
              var key = keys10[i];
              if (key !== "children" && key !== "key") {
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                break;
              }
            }
            if (fragment.ref !== null) {
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
            }
            setCurrentlyValidatingElement(null);
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (Array.isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        {
          try {
            var frozenObject = Object.freeze({});
            var testMap = /* @__PURE__ */ new Map([[frozenObject, null]]);
            var testSet = /* @__PURE__ */ new Set([frozenObject]);
            testMap.set(0, 0);
            testSet.add(0);
          } catch (e) {
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useEffect = useEffect;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState2;
        exports.version = ReactVersion;
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production_min();
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/scheduler/cjs/scheduler.production.min.js
var require_scheduler_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
    "use strict";
    var f;
    var g;
    var h;
    var k;
    var l;
    if (typeof window === "undefined" || typeof MessageChannel !== "function") {
      p = null, q = null, t = function() {
        if (p !== null)
          try {
            var a = exports.unstable_now();
            p(true, a);
            p = null;
          } catch (b) {
            throw setTimeout(t, 0), b;
          }
      }, u = Date.now();
      exports.unstable_now = function() {
        return Date.now() - u;
      };
      f = function(a) {
        p !== null ? setTimeout(f, 0, a) : (p = a, setTimeout(t, 0));
      };
      g = function(a, b) {
        q = setTimeout(a, b);
      };
      h = function() {
        clearTimeout(q);
      };
      k = function() {
        return false;
      };
      l = exports.unstable_forceFrameRate = function() {
      };
    } else {
      w = window.performance, x = window.Date, y = window.setTimeout, z = window.clearTimeout;
      if (typeof console !== "undefined") {
        A = window.cancelAnimationFrame;
        typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
        typeof A !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
      }
      if (typeof w === "object" && typeof w.now === "function")
        exports.unstable_now = function() {
          return w.now();
        };
      else {
        B = x.now();
        exports.unstable_now = function() {
          return x.now() - B;
        };
      }
      C = false, D = null, E = -1, F = 5, G = 0;
      k = function() {
        return exports.unstable_now() >= G;
      };
      l = function() {
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : F = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      H = new MessageChannel(), I = H.port2;
      H.port1.onmessage = function() {
        if (D !== null) {
          var a = exports.unstable_now();
          G = a + F;
          try {
            D(true, a) ? I.postMessage(null) : (C = false, D = null);
          } catch (b) {
            throw I.postMessage(null), b;
          }
        } else
          C = false;
      };
      f = function(a) {
        D = a;
        C || (C = true, I.postMessage(null));
      };
      g = function(a, b) {
        E = y(function() {
          a(exports.unstable_now());
        }, b);
      };
      h = function() {
        z(E);
        E = -1;
      };
    }
    var p;
    var q;
    var t;
    var u;
    var w;
    var x;
    var y;
    var z;
    var A;
    var B;
    var C;
    var D;
    var E;
    var F;
    var G;
    var H;
    var I;
    function J(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; ; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (e !== void 0 && 0 < K(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function L(a) {
      a = a[0];
      return a === void 0 ? null : a;
    }
    function M(a) {
      var b = a[0];
      if (b !== void 0) {
        var c = a.pop();
        if (c !== b) {
          a[0] = c;
          a:
            for (var d = 0, e = a.length; d < e; ) {
              var m = 2 * (d + 1) - 1, n = a[m], v = m + 1, r = a[v];
              if (n !== void 0 && 0 > K(n, c))
                r !== void 0 && 0 > K(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);
              else if (r !== void 0 && 0 > K(r, c))
                a[d] = r, a[v] = c, d = v;
              else
                break a;
            }
        }
        return b;
      }
      return null;
    }
    function K(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return c !== 0 ? c : a.id - b.id;
    }
    var N = [];
    var O = [];
    var P = 1;
    var Q = null;
    var R = 3;
    var S = false;
    var T = false;
    var U = false;
    function V(a) {
      for (var b = L(O); b !== null; ) {
        if (b.callback === null)
          M(O);
        else if (b.startTime <= a)
          M(O), b.sortIndex = b.expirationTime, J(N, b);
        else
          break;
        b = L(O);
      }
    }
    function W(a) {
      U = false;
      V(a);
      if (!T)
        if (L(N) !== null)
          T = true, f(X);
        else {
          var b = L(O);
          b !== null && g(W, b.startTime - a);
        }
    }
    function X(a, b) {
      T = false;
      U && (U = false, h());
      S = true;
      var c = R;
      try {
        V(b);
        for (Q = L(N); Q !== null && (!(Q.expirationTime > b) || a && !k()); ) {
          var d = Q.callback;
          if (d !== null) {
            Q.callback = null;
            R = Q.priorityLevel;
            var e = d(Q.expirationTime <= b);
            b = exports.unstable_now();
            typeof e === "function" ? Q.callback = e : Q === L(N) && M(N);
            V(b);
          } else
            M(N);
          Q = L(N);
        }
        if (Q !== null)
          var m = true;
        else {
          var n = L(O);
          n !== null && g(W, n.startTime - b);
          m = false;
        }
        return m;
      } finally {
        Q = null, R = c, S = false;
      }
    }
    function Y(a) {
      switch (a) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    var Z = l;
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      T || S || (T = true, f(X));
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return R;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return L(N);
    };
    exports.unstable_next = function(a) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = R;
      }
      var c = R;
      R = b;
      try {
        return a();
      } finally {
        R = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = Z;
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = R;
      R = a;
      try {
        return b();
      } finally {
        R = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      if (typeof c === "object" && c !== null) {
        var e = c.delay;
        e = typeof e === "number" && 0 < e ? d + e : d;
        c = typeof c.timeout === "number" ? c.timeout : Y(a);
      } else
        c = Y(a), e = d;
      c = e + c;
      a = { id: P++, callback: b, priorityLevel: a, startTime: e, expirationTime: c, sortIndex: -1 };
      e > d ? (a.sortIndex = e, J(O, a), L(N) === null && a === L(O) && (U ? h() : U = true, g(W, e - d))) : (a.sortIndex = c, J(N, a), T || S || (T = true, f(X)));
      return a;
    };
    exports.unstable_shouldYield = function() {
      var a = exports.unstable_now();
      V(a);
      var b = L(N);
      return b !== Q && Q !== null && b !== null && b.callback !== null && b.startTime <= a && b.expirationTime < Q.expirationTime || k();
    };
    exports.unstable_wrapCallback = function(a) {
      var b = R;
      return function() {
        var c = R;
        R = b;
        try {
          return a.apply(this, arguments);
        } finally {
          R = c;
        }
      };
    };
  }
});

// node_modules/scheduler/cjs/scheduler.development.js
var require_scheduler_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var enableSchedulerDebugging = false;
        var enableProfiling = true;
        var requestHostCallback;
        var requestHostTimeout;
        var cancelHostTimeout;
        var shouldYieldToHost;
        var requestPaint;
        if (typeof window === "undefined" || typeof MessageChannel !== "function") {
          var _callback = null;
          var _timeoutID = null;
          var _flushCallback = function() {
            if (_callback !== null) {
              try {
                var currentTime = exports.unstable_now();
                var hasRemainingTime = true;
                _callback(hasRemainingTime, currentTime);
                _callback = null;
              } catch (e) {
                setTimeout(_flushCallback, 0);
                throw e;
              }
            }
          };
          var initialTime = Date.now();
          exports.unstable_now = function() {
            return Date.now() - initialTime;
          };
          requestHostCallback = function(cb) {
            if (_callback !== null) {
              setTimeout(requestHostCallback, 0, cb);
            } else {
              _callback = cb;
              setTimeout(_flushCallback, 0);
            }
          };
          requestHostTimeout = function(cb, ms) {
            _timeoutID = setTimeout(cb, ms);
          };
          cancelHostTimeout = function() {
            clearTimeout(_timeoutID);
          };
          shouldYieldToHost = function() {
            return false;
          };
          requestPaint = exports.unstable_forceFrameRate = function() {
          };
        } else {
          var performance2 = window.performance;
          var _Date = window.Date;
          var _setTimeout = window.setTimeout;
          var _clearTimeout = window.clearTimeout;
          if (typeof console !== "undefined") {
            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;
            if (typeof requestAnimationFrame !== "function") {
              console["error"]("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
            }
            if (typeof cancelAnimationFrame !== "function") {
              console["error"]("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
            }
          }
          if (typeof performance2 === "object" && typeof performance2.now === "function") {
            exports.unstable_now = function() {
              return performance2.now();
            };
          } else {
            var _initialTime = _Date.now();
            exports.unstable_now = function() {
              return _Date.now() - _initialTime;
            };
          }
          var isMessageLoopRunning = false;
          var scheduledHostCallback = null;
          var taskTimeoutID = -1;
          var yieldInterval = 5;
          var deadline = 0;
          {
            shouldYieldToHost = function() {
              return exports.unstable_now() >= deadline;
            };
            requestPaint = function() {
            };
          }
          exports.unstable_forceFrameRate = function(fps) {
            if (fps < 0 || fps > 125) {
              console["error"]("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported");
              return;
            }
            if (fps > 0) {
              yieldInterval = Math.floor(1e3 / fps);
            } else {
              yieldInterval = 5;
            }
          };
          var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
              var currentTime = exports.unstable_now();
              deadline = currentTime + yieldInterval;
              var hasTimeRemaining = true;
              try {
                var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                if (!hasMoreWork) {
                  isMessageLoopRunning = false;
                  scheduledHostCallback = null;
                } else {
                  port.postMessage(null);
                }
              } catch (error) {
                port.postMessage(null);
                throw error;
              }
            } else {
              isMessageLoopRunning = false;
            }
          };
          var channel = new MessageChannel();
          var port = channel.port2;
          channel.port1.onmessage = performWorkUntilDeadline;
          requestHostCallback = function(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
              isMessageLoopRunning = true;
              port.postMessage(null);
            }
          };
          requestHostTimeout = function(callback, ms) {
            taskTimeoutID = _setTimeout(function() {
              callback(exports.unstable_now());
            }, ms);
          };
          cancelHostTimeout = function() {
            _clearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
          };
        }
        function push(heap, node) {
          var index = heap.length;
          heap.push(node);
          siftUp(heap, node, index);
        }
        function peek(heap) {
          var first = heap[0];
          return first === void 0 ? null : first;
        }
        function pop(heap) {
          var first = heap[0];
          if (first !== void 0) {
            var last = heap.pop();
            if (last !== first) {
              heap[0] = last;
              siftDown(heap, last, 0);
            }
            return first;
          } else {
            return null;
          }
        }
        function siftUp(heap, node, i) {
          var index = i;
          while (true) {
            var parentIndex = index - 1 >>> 1;
            var parent = heap[parentIndex];
            if (parent !== void 0 && compare(parent, node) > 0) {
              heap[parentIndex] = node;
              heap[index] = parent;
              index = parentIndex;
            } else {
              return;
            }
          }
        }
        function siftDown(heap, node, i) {
          var index = i;
          var length = heap.length;
          while (index < length) {
            var leftIndex = (index + 1) * 2 - 1;
            var left = heap[leftIndex];
            var rightIndex = leftIndex + 1;
            var right = heap[rightIndex];
            if (left !== void 0 && compare(left, node) < 0) {
              if (right !== void 0 && compare(right, left) < 0) {
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
              } else {
                heap[index] = left;
                heap[leftIndex] = node;
                index = leftIndex;
              }
            } else if (right !== void 0 && compare(right, node) < 0) {
              heap[index] = right;
              heap[rightIndex] = node;
              index = rightIndex;
            } else {
              return;
            }
          }
        }
        function compare(a, b) {
          var diff = a.sortIndex - b.sortIndex;
          return diff !== 0 ? diff : a.id - b.id;
        }
        var NoPriority = 0;
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        var runIdCounter = 0;
        var mainThreadIdCounter = 0;
        var profilingStateSize = 4;
        var sharedProfilingBuffer = typeof SharedArrayBuffer === "function" ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : typeof ArrayBuffer === "function" ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null;
        var profilingState = sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : [];
        var PRIORITY = 0;
        var CURRENT_TASK_ID = 1;
        var CURRENT_RUN_ID = 2;
        var QUEUE_SIZE = 3;
        {
          profilingState[PRIORITY] = NoPriority;
          profilingState[QUEUE_SIZE] = 0;
          profilingState[CURRENT_TASK_ID] = 0;
        }
        var INITIAL_EVENT_LOG_SIZE = 131072;
        var MAX_EVENT_LOG_SIZE = 524288;
        var eventLogSize = 0;
        var eventLogBuffer = null;
        var eventLog = null;
        var eventLogIndex = 0;
        var TaskStartEvent = 1;
        var TaskCompleteEvent = 2;
        var TaskErrorEvent = 3;
        var TaskCancelEvent = 4;
        var TaskRunEvent = 5;
        var TaskYieldEvent = 6;
        var SchedulerSuspendEvent = 7;
        var SchedulerResumeEvent = 8;
        function logEvent(entries) {
          if (eventLog !== null) {
            var offset = eventLogIndex;
            eventLogIndex += entries.length;
            if (eventLogIndex + 1 > eventLogSize) {
              eventLogSize *= 2;
              if (eventLogSize > MAX_EVENT_LOG_SIZE) {
                console["error"]("Scheduler Profiling: Event log exceeded maximum size. Don't forget to call `stopLoggingProfilingEvents()`.");
                stopLoggingProfilingEvents();
                return;
              }
              var newEventLog = new Int32Array(eventLogSize * 4);
              newEventLog.set(eventLog);
              eventLogBuffer = newEventLog.buffer;
              eventLog = newEventLog;
            }
            eventLog.set(entries, offset);
          }
        }
        function startLoggingProfilingEvents() {
          eventLogSize = INITIAL_EVENT_LOG_SIZE;
          eventLogBuffer = new ArrayBuffer(eventLogSize * 4);
          eventLog = new Int32Array(eventLogBuffer);
          eventLogIndex = 0;
        }
        function stopLoggingProfilingEvents() {
          var buffer = eventLogBuffer;
          eventLogSize = 0;
          eventLogBuffer = null;
          eventLog = null;
          eventLogIndex = 0;
          return buffer;
        }
        function markTaskStart(task, ms) {
          {
            profilingState[QUEUE_SIZE]++;
            if (eventLog !== null) {
              logEvent([TaskStartEvent, ms * 1e3, task.id, task.priorityLevel]);
            }
          }
        }
        function markTaskCompleted(task, ms) {
          {
            profilingState[PRIORITY] = NoPriority;
            profilingState[CURRENT_TASK_ID] = 0;
            profilingState[QUEUE_SIZE]--;
            if (eventLog !== null) {
              logEvent([TaskCompleteEvent, ms * 1e3, task.id]);
            }
          }
        }
        function markTaskCanceled(task, ms) {
          {
            profilingState[QUEUE_SIZE]--;
            if (eventLog !== null) {
              logEvent([TaskCancelEvent, ms * 1e3, task.id]);
            }
          }
        }
        function markTaskErrored(task, ms) {
          {
            profilingState[PRIORITY] = NoPriority;
            profilingState[CURRENT_TASK_ID] = 0;
            profilingState[QUEUE_SIZE]--;
            if (eventLog !== null) {
              logEvent([TaskErrorEvent, ms * 1e3, task.id]);
            }
          }
        }
        function markTaskRun(task, ms) {
          {
            runIdCounter++;
            profilingState[PRIORITY] = task.priorityLevel;
            profilingState[CURRENT_TASK_ID] = task.id;
            profilingState[CURRENT_RUN_ID] = runIdCounter;
            if (eventLog !== null) {
              logEvent([TaskRunEvent, ms * 1e3, task.id, runIdCounter]);
            }
          }
        }
        function markTaskYield(task, ms) {
          {
            profilingState[PRIORITY] = NoPriority;
            profilingState[CURRENT_TASK_ID] = 0;
            profilingState[CURRENT_RUN_ID] = 0;
            if (eventLog !== null) {
              logEvent([TaskYieldEvent, ms * 1e3, task.id, runIdCounter]);
            }
          }
        }
        function markSchedulerSuspended(ms) {
          {
            mainThreadIdCounter++;
            if (eventLog !== null) {
              logEvent([SchedulerSuspendEvent, ms * 1e3, mainThreadIdCounter]);
            }
          }
        }
        function markSchedulerUnsuspended(ms) {
          {
            if (eventLog !== null) {
              logEvent([SchedulerResumeEvent, ms * 1e3, mainThreadIdCounter]);
            }
          }
        }
        var maxSigned31BitInt = 1073741823;
        var IMMEDIATE_PRIORITY_TIMEOUT = -1;
        var USER_BLOCKING_PRIORITY = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5e3;
        var LOW_PRIORITY_TIMEOUT = 1e4;
        var IDLE_PRIORITY = maxSigned31BitInt;
        var taskQueue = [];
        var timerQueue = [];
        var taskIdCounter = 1;
        var currentTask = null;
        var currentPriorityLevel = NormalPriority;
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false;
        function advanceTimers(currentTime) {
          var timer = peek(timerQueue);
          while (timer !== null) {
            if (timer.callback === null) {
              pop(timerQueue);
            } else if (timer.startTime <= currentTime) {
              pop(timerQueue);
              timer.sortIndex = timer.expirationTime;
              push(taskQueue, timer);
              {
                markTaskStart(timer, currentTime);
                timer.isQueued = true;
              }
            } else {
              return;
            }
            timer = peek(timerQueue);
          }
        }
        function handleTimeout(currentTime) {
          isHostTimeoutScheduled = false;
          advanceTimers(currentTime);
          if (!isHostCallbackScheduled) {
            if (peek(taskQueue) !== null) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            } else {
              var firstTimer = peek(timerQueue);
              if (firstTimer !== null) {
                requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
              }
            }
          }
        }
        function flushWork(hasTimeRemaining, initialTime2) {
          {
            markSchedulerUnsuspended(initialTime2);
          }
          isHostCallbackScheduled = false;
          if (isHostTimeoutScheduled) {
            isHostTimeoutScheduled = false;
            cancelHostTimeout();
          }
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            if (enableProfiling) {
              try {
                return workLoop(hasTimeRemaining, initialTime2);
              } catch (error) {
                if (currentTask !== null) {
                  var currentTime = exports.unstable_now();
                  markTaskErrored(currentTask, currentTime);
                  currentTask.isQueued = false;
                }
                throw error;
              }
            } else {
              return workLoop(hasTimeRemaining, initialTime2);
            }
          } finally {
            currentTask = null;
            currentPriorityLevel = previousPriorityLevel;
            isPerformingWork = false;
            {
              var _currentTime = exports.unstable_now();
              markSchedulerSuspended(_currentTime);
            }
          }
        }
        function workLoop(hasTimeRemaining, initialTime2) {
          var currentTime = initialTime2;
          advanceTimers(currentTime);
          currentTask = peek(taskQueue);
          while (currentTask !== null && !enableSchedulerDebugging) {
            if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
              break;
            }
            var callback = currentTask.callback;
            if (callback !== null) {
              currentTask.callback = null;
              currentPriorityLevel = currentTask.priorityLevel;
              var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
              markTaskRun(currentTask, currentTime);
              var continuationCallback = callback(didUserCallbackTimeout);
              currentTime = exports.unstable_now();
              if (typeof continuationCallback === "function") {
                currentTask.callback = continuationCallback;
                markTaskYield(currentTask, currentTime);
              } else {
                {
                  markTaskCompleted(currentTask, currentTime);
                  currentTask.isQueued = false;
                }
                if (currentTask === peek(taskQueue)) {
                  pop(taskQueue);
                }
              }
              advanceTimers(currentTime);
            } else {
              pop(taskQueue);
            }
            currentTask = peek(taskQueue);
          }
          if (currentTask !== null) {
            return true;
          } else {
            var firstTimer = peek(timerQueue);
            if (firstTimer !== null) {
              requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
            }
            return false;
          }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
          switch (priorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
            case LowPriority:
            case IdlePriority:
              break;
            default:
              priorityLevel = NormalPriority;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_next(eventHandler) {
          var priorityLevel;
          switch (currentPriorityLevel) {
            case ImmediatePriority:
            case UserBlockingPriority:
            case NormalPriority:
              priorityLevel = NormalPriority;
              break;
            default:
              priorityLevel = currentPriorityLevel;
              break;
          }
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = priorityLevel;
          try {
            return eventHandler();
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        }
        function unstable_wrapCallback(callback) {
          var parentPriorityLevel = currentPriorityLevel;
          return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
              return callback.apply(this, arguments);
            } finally {
              currentPriorityLevel = previousPriorityLevel;
            }
          };
        }
        function timeoutForPriorityLevel(priorityLevel) {
          switch (priorityLevel) {
            case ImmediatePriority:
              return IMMEDIATE_PRIORITY_TIMEOUT;
            case UserBlockingPriority:
              return USER_BLOCKING_PRIORITY;
            case IdlePriority:
              return IDLE_PRIORITY;
            case LowPriority:
              return LOW_PRIORITY_TIMEOUT;
            case NormalPriority:
            default:
              return NORMAL_PRIORITY_TIMEOUT;
          }
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
          var currentTime = exports.unstable_now();
          var startTime;
          var timeout;
          if (typeof options === "object" && options !== null) {
            var delay = options.delay;
            if (typeof delay === "number" && delay > 0) {
              startTime = currentTime + delay;
            } else {
              startTime = currentTime;
            }
            timeout = typeof options.timeout === "number" ? options.timeout : timeoutForPriorityLevel(priorityLevel);
          } else {
            timeout = timeoutForPriorityLevel(priorityLevel);
            startTime = currentTime;
          }
          var expirationTime = startTime + timeout;
          var newTask = {
            id: taskIdCounter++,
            callback,
            priorityLevel,
            startTime,
            expirationTime,
            sortIndex: -1
          };
          {
            newTask.isQueued = false;
          }
          if (startTime > currentTime) {
            newTask.sortIndex = startTime;
            push(timerQueue, newTask);
            if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
              if (isHostTimeoutScheduled) {
                cancelHostTimeout();
              } else {
                isHostTimeoutScheduled = true;
              }
              requestHostTimeout(handleTimeout, startTime - currentTime);
            }
          } else {
            newTask.sortIndex = expirationTime;
            push(taskQueue, newTask);
            {
              markTaskStart(newTask, currentTime);
              newTask.isQueued = true;
            }
            if (!isHostCallbackScheduled && !isPerformingWork) {
              isHostCallbackScheduled = true;
              requestHostCallback(flushWork);
            }
          }
          return newTask;
        }
        function unstable_pauseExecution() {
        }
        function unstable_continueExecution() {
          if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
          }
        }
        function unstable_getFirstCallbackNode() {
          return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
          {
            if (task.isQueued) {
              var currentTime = exports.unstable_now();
              markTaskCanceled(task, currentTime);
              task.isQueued = false;
            }
          }
          task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
          return currentPriorityLevel;
        }
        function unstable_shouldYield() {
          var currentTime = exports.unstable_now();
          advanceTimers(currentTime);
          var firstTask = peek(taskQueue);
          return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = {
          startLoggingProfilingEvents,
          stopLoggingProfilingEvents,
          sharedProfilingBuffer
        };
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = unstable_shouldYield;
        exports.unstable_wrapCallback = unstable_wrapCallback;
      })();
    }
  }
});

// node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_scheduler_production_min();
    } else {
      module.exports = require_scheduler_development();
    }
  }
});

// node_modules/react-reconciler/cjs/react-reconciler.production.min.js
var require_react_reconciler_production_min = __commonJS({
  "node_modules/react-reconciler/cjs/react-reconciler.production.min.js"(exports, module) {
    module.exports = function $$$reconciler($$$hostConfig) {
      "use strict";
      var aa = require_object_assign(), ba = require_react(), m = require_scheduler();
      function n(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var p = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      p.hasOwnProperty("ReactCurrentDispatcher") || (p.ReactCurrentDispatcher = { current: null });
      p.hasOwnProperty("ReactCurrentBatchConfig") || (p.ReactCurrentBatchConfig = { suspense: null });
      var u = typeof Symbol === "function" && Symbol.for, ca = u ? Symbol.for("react.element") : 60103, da = u ? Symbol.for("react.portal") : 60106, ea = u ? Symbol.for("react.fragment") : 60107, fa = u ? Symbol.for("react.strict_mode") : 60108, ha = u ? Symbol.for("react.profiler") : 60114, ia = u ? Symbol.for("react.provider") : 60109, ja = u ? Symbol.for("react.context") : 60110, ka = u ? Symbol.for("react.concurrent_mode") : 60111, la = u ? Symbol.for("react.forward_ref") : 60112, ma = u ? Symbol.for("react.suspense") : 60113, na = u ? Symbol.for("react.suspense_list") : 60120, oa = u ? Symbol.for("react.memo") : 60115, pa = u ? Symbol.for("react.lazy") : 60116, qa = u ? Symbol.for("react.block") : 60121, ra = typeof Symbol === "function" && Symbol.iterator;
      function sa(a) {
        if (a === null || typeof a !== "object")
          return null;
        a = ra && a[ra] || a["@@iterator"];
        return typeof a === "function" ? a : null;
      }
      function ta(a) {
        if (a._status === -1) {
          a._status = 0;
          var b = a._ctor;
          b = b();
          a._result = b;
          b.then(function(b2) {
            a._status === 0 && (b2 = b2.default, a._status = 1, a._result = b2);
          }, function(b2) {
            a._status === 0 && (a._status = 2, a._result = b2);
          });
        }
      }
      function ua(a) {
        if (a == null)
          return null;
        if (typeof a === "function")
          return a.displayName || a.name || null;
        if (typeof a === "string")
          return a;
        switch (a) {
          case ea:
            return "Fragment";
          case da:
            return "Portal";
          case ha:
            return "Profiler";
          case fa:
            return "StrictMode";
          case ma:
            return "Suspense";
          case na:
            return "SuspenseList";
        }
        if (typeof a === "object")
          switch (a.$$typeof) {
            case ja:
              return "Context.Consumer";
            case ia:
              return "Context.Provider";
            case la:
              var b = a.render;
              b = b.displayName || b.name || "";
              return a.displayName || (b !== "" ? "ForwardRef(" + b + ")" : "ForwardRef");
            case oa:
              return ua(a.type);
            case qa:
              return ua(a.render);
            case pa:
              if (a = a._status === 1 ? a._result : null)
                return ua(a);
          }
        return null;
      }
      function va(a) {
        var b = a, c = a;
        if (a.alternate)
          for (; b.return; )
            b = b.return;
        else {
          a = b;
          do
            b = a, (b.effectTag & 1026) !== 0 && (c = b.return), a = b.return;
          while (a);
        }
        return b.tag === 3 ? c : null;
      }
      function wa(a) {
        if (va(a) !== a)
          throw Error(n(188));
      }
      function xa(a) {
        var b = a.alternate;
        if (!b) {
          b = va(a);
          if (b === null)
            throw Error(n(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (e === null)
            break;
          var f = e.alternate;
          if (f === null) {
            d = e.return;
            if (d !== null) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c)
                return wa(e), a;
              if (f === d)
                return wa(e), b;
              f = f.sibling;
            }
            throw Error(n(188));
          }
          if (c.return !== d.return)
            c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g)
                throw Error(n(189));
            }
          }
          if (c.alternate !== d)
            throw Error(n(190));
        }
        if (c.tag !== 3)
          throw Error(n(188));
        return c.stateNode.current === c ? a : b;
      }
      function ya(a) {
        a = xa(a);
        if (!a)
          return null;
        for (var b = a; ; ) {
          if (b.tag === 5 || b.tag === 6)
            return b;
          if (b.child)
            b.child.return = b, b = b.child;
          else {
            if (b === a)
              break;
            for (; !b.sibling; ) {
              if (!b.return || b.return === a)
                return null;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return null;
      }
      function za(a) {
        a = xa(a);
        if (!a)
          return null;
        for (var b = a; ; ) {
          if (b.tag === 5 || b.tag === 6)
            return b;
          if (b.child && b.tag !== 4)
            b.child.return = b, b = b.child;
          else {
            if (b === a)
              break;
            for (; !b.sibling; ) {
              if (!b.return || b.return === a)
                return null;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return null;
      }
      var Aa = $$$hostConfig.getPublicInstance, Ba = $$$hostConfig.getRootHostContext, Ca = $$$hostConfig.getChildHostContext, Da = $$$hostConfig.prepareForCommit, Ea = $$$hostConfig.resetAfterCommit, Fa = $$$hostConfig.createInstance, Ga = $$$hostConfig.appendInitialChild, Ha = $$$hostConfig.finalizeInitialChildren, Ia = $$$hostConfig.prepareUpdate, Ja = $$$hostConfig.shouldSetTextContent, Ka = $$$hostConfig.shouldDeprioritizeSubtree, La = $$$hostConfig.createTextInstance, Ma = $$$hostConfig.setTimeout, Na = $$$hostConfig.clearTimeout, Oa = $$$hostConfig.noTimeout, Pa = $$$hostConfig.isPrimaryRenderer, Qa = $$$hostConfig.supportsMutation, Ra = $$$hostConfig.supportsPersistence, Sa = $$$hostConfig.supportsHydration, Ta = $$$hostConfig.appendChild, Ua = $$$hostConfig.appendChildToContainer, Va = $$$hostConfig.commitTextUpdate, Wa = $$$hostConfig.commitMount, Xa = $$$hostConfig.commitUpdate, Ya = $$$hostConfig.insertBefore, Za = $$$hostConfig.insertInContainerBefore, $a = $$$hostConfig.removeChild, ab = $$$hostConfig.removeChildFromContainer, bb = $$$hostConfig.resetTextContent, cb = $$$hostConfig.hideInstance, db = $$$hostConfig.hideTextInstance, eb = $$$hostConfig.unhideInstance, fb = $$$hostConfig.unhideTextInstance, gb = $$$hostConfig.cloneInstance, hb = $$$hostConfig.createContainerChildSet, ib = $$$hostConfig.appendChildToContainerChildSet, jb = $$$hostConfig.finalizeContainerChildren, kb = $$$hostConfig.replaceContainerChildren, lb = $$$hostConfig.cloneHiddenInstance, mb = $$$hostConfig.cloneHiddenTextInstance, nb = $$$hostConfig.canHydrateInstance, ob = $$$hostConfig.canHydrateTextInstance, pb = $$$hostConfig.isSuspenseInstancePending, qb = $$$hostConfig.isSuspenseInstanceFallback, rb = $$$hostConfig.getNextHydratableSibling, sb = $$$hostConfig.getFirstHydratableChild, tb = $$$hostConfig.hydrateInstance, ub = $$$hostConfig.hydrateTextInstance, vb = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance, wb = $$$hostConfig.commitHydratedContainer, xb = $$$hostConfig.commitHydratedSuspenseInstance, yb = /^(.*)[\\\/]/;
      function zb(a) {
        var b = "";
        do {
          a:
            switch (a.tag) {
              case 3:
              case 4:
              case 6:
              case 7:
              case 10:
              case 9:
                var c = "";
                break a;
              default:
                var d = a._debugOwner, e = a._debugSource, f = ua(a.type);
                c = null;
                d && (c = ua(d.type));
                d = f;
                f = "";
                e ? f = " (at " + e.fileName.replace(yb, "") + ":" + e.lineNumber + ")" : c && (f = " (created by " + c + ")");
                c = "\n    in " + (d || "Unknown") + f;
            }
          b += c;
          a = a.return;
        } while (a);
        return b;
      }
      var Ab = [], Bb = -1;
      function B(a) {
        0 > Bb || (a.current = Ab[Bb], Ab[Bb] = null, Bb--);
      }
      function C(a, b) {
        Bb++;
        Ab[Bb] = a.current;
        a.current = b;
      }
      var Cb = {}, D = { current: Cb }, E = { current: false }, Db = Cb;
      function Eb(a, b) {
        var c = a.type.contextTypes;
        if (!c)
          return Cb;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
          return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c)
          e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function F(a) {
        a = a.childContextTypes;
        return a !== null && a !== void 0;
      }
      function Fb() {
        B(E);
        B(D);
      }
      function Gb(a, b, c) {
        if (D.current !== Cb)
          throw Error(n(168));
        C(D, b);
        C(E, c);
      }
      function Hb(a, b, c) {
        var d = a.stateNode;
        a = b.childContextTypes;
        if (typeof d.getChildContext !== "function")
          return c;
        d = d.getChildContext();
        for (var e in d)
          if (!(e in a))
            throw Error(n(108, ua(b) || "Unknown", e));
        return aa({}, c, {}, d);
      }
      function Ib(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cb;
        Db = D.current;
        C(D, a);
        C(E, E.current);
        return true;
      }
      function Jb(a, b, c) {
        var d = a.stateNode;
        if (!d)
          throw Error(n(169));
        c ? (a = Hb(a, b, Db), d.__reactInternalMemoizedMergedChildContext = a, B(E), B(D), C(D, a)) : B(E);
        C(E, c);
      }
      var Kb = m.unstable_runWithPriority, Lb = m.unstable_scheduleCallback, Mb = m.unstable_cancelCallback, Nb = m.unstable_requestPaint, Ob = m.unstable_now, Pb = m.unstable_getCurrentPriorityLevel, Qb = m.unstable_ImmediatePriority, Rb = m.unstable_UserBlockingPriority, Sb = m.unstable_NormalPriority, Tb = m.unstable_LowPriority, Ub = m.unstable_IdlePriority, Vb = {}, Wb = m.unstable_shouldYield, Xb = Nb !== void 0 ? Nb : function() {
      }, Yb = null, Zb = null, $b = false, ac = Ob(), G = 1e4 > ac ? Ob : function() {
        return Ob() - ac;
      };
      function bc() {
        switch (Pb()) {
          case Qb:
            return 99;
          case Rb:
            return 98;
          case Sb:
            return 97;
          case Tb:
            return 96;
          case Ub:
            return 95;
          default:
            throw Error(n(332));
        }
      }
      function cc(a) {
        switch (a) {
          case 99:
            return Qb;
          case 98:
            return Rb;
          case 97:
            return Sb;
          case 96:
            return Tb;
          case 95:
            return Ub;
          default:
            throw Error(n(332));
        }
      }
      function dc(a, b) {
        a = cc(a);
        return Kb(a, b);
      }
      function ec(a, b, c) {
        a = cc(a);
        return Lb(a, b, c);
      }
      function fc(a) {
        Yb === null ? (Yb = [a], Zb = Lb(Qb, gc)) : Yb.push(a);
        return Vb;
      }
      function H() {
        if (Zb !== null) {
          var a = Zb;
          Zb = null;
          Mb(a);
        }
        gc();
      }
      function gc() {
        if (!$b && Yb !== null) {
          $b = true;
          var a = 0;
          try {
            var b = Yb;
            dc(99, function() {
              for (; a < b.length; a++) {
                var c = b[a];
                do
                  c = c(true);
                while (c !== null);
              }
            });
            Yb = null;
          } catch (c) {
            throw Yb !== null && (Yb = Yb.slice(a + 1)), Lb(Qb, H), c;
          } finally {
            $b = false;
          }
        }
      }
      function hc(a, b, c) {
        c /= 10;
        return 1073741821 - (((1073741821 - a + b / 10) / c | 0) + 1) * c;
      }
      function ic(a, b) {
        return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var jc = typeof Object.is === "function" ? Object.is : ic, kc = Object.prototype.hasOwnProperty;
      function lc(a, b) {
        if (jc(a, b))
          return true;
        if (typeof a !== "object" || a === null || typeof b !== "object" || b === null)
          return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length)
          return false;
        for (d = 0; d < c.length; d++)
          if (!kc.call(b, c[d]) || !jc(a[c[d]], b[c[d]]))
            return false;
        return true;
      }
      function mc(a, b) {
        if (a && a.defaultProps) {
          b = aa({}, b);
          a = a.defaultProps;
          for (var c in a)
            b[c] === void 0 && (b[c] = a[c]);
        }
        return b;
      }
      var nc = { current: null }, oc = null, pc = null, qc = null;
      function rc() {
        qc = pc = oc = null;
      }
      function sc(a, b) {
        a = a.type._context;
        Pa ? (C(nc, a._currentValue), a._currentValue = b) : (C(nc, a._currentValue2), a._currentValue2 = b);
      }
      function tc(a) {
        var b = nc.current;
        B(nc);
        a = a.type._context;
        Pa ? a._currentValue = b : a._currentValue2 = b;
      }
      function uc(a, b) {
        for (; a !== null; ) {
          var c = a.alternate;
          if (a.childExpirationTime < b)
            a.childExpirationTime = b, c !== null && c.childExpirationTime < b && (c.childExpirationTime = b);
          else if (c !== null && c.childExpirationTime < b)
            c.childExpirationTime = b;
          else
            break;
          a = a.return;
        }
      }
      function vc(a, b) {
        oc = a;
        qc = pc = null;
        a = a.dependencies;
        a !== null && a.firstContext !== null && (a.expirationTime >= b && (wc = true), a.firstContext = null);
      }
      function I(a, b) {
        if (qc !== a && b !== false && b !== 0) {
          if (typeof b !== "number" || b === 1073741823)
            qc = a, b = 1073741823;
          b = { context: a, observedBits: b, next: null };
          if (pc === null) {
            if (oc === null)
              throw Error(n(308));
            pc = b;
            oc.dependencies = { expirationTime: 0, firstContext: b, responders: null };
          } else
            pc = pc.next = b;
        }
        return Pa ? a._currentValue : a._currentValue2;
      }
      var xc = false;
      function yc(a) {
        a.updateQueue = { baseState: a.memoizedState, baseQueue: null, shared: { pending: null }, effects: null };
      }
      function zc(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, baseQueue: a.baseQueue, shared: a.shared, effects: a.effects });
      }
      function Ac(a, b) {
        a = { expirationTime: a, suspenseConfig: b, tag: 0, payload: null, callback: null, next: null };
        return a.next = a;
      }
      function Bc(a, b) {
        a = a.updateQueue;
        if (a !== null) {
          a = a.shared;
          var c = a.pending;
          c === null ? b.next = b : (b.next = c.next, c.next = b);
          a.pending = b;
        }
      }
      function Cc(a, b) {
        var c = a.alternate;
        c !== null && zc(c, a);
        a = a.updateQueue;
        c = a.baseQueue;
        c === null ? (a.baseQueue = b.next = b, b.next = b) : (b.next = c.next, c.next = b);
      }
      function Dc(a, b, c, d) {
        var e = a.updateQueue;
        xc = false;
        var f = e.baseQueue, g = e.shared.pending;
        if (g !== null) {
          if (f !== null) {
            var h = f.next;
            f.next = g.next;
            g.next = h;
          }
          f = g;
          e.shared.pending = null;
          h = a.alternate;
          h !== null && (h = h.updateQueue, h !== null && (h.baseQueue = g));
        }
        if (f !== null) {
          h = f.next;
          var k = e.baseState, l = 0, q = null, r = null, w = null;
          if (h !== null) {
            var z = h;
            do {
              g = z.expirationTime;
              if (g < d) {
                var Q = { expirationTime: z.expirationTime, suspenseConfig: z.suspenseConfig, tag: z.tag, payload: z.payload, callback: z.callback, next: null };
                w === null ? (r = w = Q, q = k) : w = w.next = Q;
                g > l && (l = g);
              } else {
                w !== null && (w = w.next = { expirationTime: 1073741823, suspenseConfig: z.suspenseConfig, tag: z.tag, payload: z.payload, callback: z.callback, next: null });
                Ec(g, z.suspenseConfig);
                a: {
                  var A = a, v = z;
                  g = b;
                  Q = c;
                  switch (v.tag) {
                    case 1:
                      A = v.payload;
                      if (typeof A === "function") {
                        k = A.call(Q, k, g);
                        break a;
                      }
                      k = A;
                      break a;
                    case 3:
                      A.effectTag = A.effectTag & -4097 | 64;
                    case 0:
                      A = v.payload;
                      g = typeof A === "function" ? A.call(Q, k, g) : A;
                      if (g === null || g === void 0)
                        break a;
                      k = aa({}, k, g);
                      break a;
                    case 2:
                      xc = true;
                  }
                }
                z.callback !== null && (a.effectTag |= 32, g = e.effects, g === null ? e.effects = [z] : g.push(z));
              }
              z = z.next;
              if (z === null || z === h)
                if (g = e.shared.pending, g === null)
                  break;
                else
                  z = f.next = g.next, g.next = h, e.baseQueue = f = g, e.shared.pending = null;
            } while (1);
          }
          w === null ? q = k : w.next = r;
          e.baseState = q;
          e.baseQueue = w;
          Gc(l);
          a.expirationTime = l;
          a.memoizedState = k;
        }
      }
      function Hc(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (a !== null)
          for (b = 0; b < a.length; b++) {
            var d = a[b], e = d.callback;
            if (e !== null) {
              d.callback = null;
              d = e;
              e = c;
              if (typeof d !== "function")
                throw Error(n(191, d));
              d.call(e);
            }
          }
      }
      var Ic = p.ReactCurrentBatchConfig, Jc = new ba.Component().refs;
      function Kc(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = c === null || c === void 0 ? b : aa({}, b, c);
        a.memoizedState = c;
        a.expirationTime === 0 && (a.updateQueue.baseState = c);
      }
      var Oc = { isMounted: function(a) {
        return (a = a._reactInternalFiber) ? va(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternalFiber;
        var d = Lc(), e = Ic.suspense;
        d = Mc(d, a, e);
        e = Ac(d, e);
        e.payload = b;
        c !== void 0 && c !== null && (e.callback = c);
        Bc(a, e);
        Nc(a, d);
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternalFiber;
        var d = Lc(), e = Ic.suspense;
        d = Mc(d, a, e);
        e = Ac(d, e);
        e.tag = 1;
        e.payload = b;
        c !== void 0 && c !== null && (e.callback = c);
        Bc(a, e);
        Nc(a, d);
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternalFiber;
        var c = Lc(), d = Ic.suspense;
        c = Mc(c, a, d);
        d = Ac(c, d);
        d.tag = 2;
        b !== void 0 && b !== null && (d.callback = b);
        Bc(a, d);
        Nc(a, c);
      } };
      function Pc(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return typeof a.shouldComponentUpdate === "function" ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !lc(c, d) || !lc(e, f) : true;
      }
      function Qc(a, b, c) {
        var d = false, e = Cb;
        var f = b.contextType;
        typeof f === "object" && f !== null ? f = I(f) : (e = F(b) ? Db : D.current, d = b.contextTypes, f = (d = d !== null && d !== void 0) ? Eb(a, e) : Cb);
        b = new b(c, f);
        a.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null;
        b.updater = Oc;
        a.stateNode = b;
        b._reactInternalFiber = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Rc(a, b, c, d) {
        a = b.state;
        typeof b.componentWillReceiveProps === "function" && b.componentWillReceiveProps(c, d);
        typeof b.UNSAFE_componentWillReceiveProps === "function" && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Oc.enqueueReplaceState(b, b.state, null);
      }
      function Sc(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = Jc;
        yc(a);
        var f = b.contextType;
        typeof f === "object" && f !== null ? e.context = I(f) : (f = F(b) ? Db : D.current, e.context = Eb(a, f));
        Dc(a, c, e, d);
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        typeof f === "function" && (Kc(a, b, f, c), e.state = a.memoizedState);
        typeof b.getDerivedStateFromProps === "function" || typeof e.getSnapshotBeforeUpdate === "function" || typeof e.UNSAFE_componentWillMount !== "function" && typeof e.componentWillMount !== "function" || (b = e.state, typeof e.componentWillMount === "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount === "function" && e.UNSAFE_componentWillMount(), b !== e.state && Oc.enqueueReplaceState(e, e.state, null), Dc(a, c, e, d), e.state = a.memoizedState);
        typeof e.componentDidMount === "function" && (a.effectTag |= 4);
      }
      var Tc = Array.isArray;
      function Uc(a, b, c) {
        a = c.ref;
        if (a !== null && typeof a !== "function" && typeof a !== "object") {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (c.tag !== 1)
                throw Error(n(309));
              var d = c.stateNode;
            }
            if (!d)
              throw Error(n(147, a));
            var e = "" + a;
            if (b !== null && b.ref !== null && typeof b.ref === "function" && b.ref._stringRef === e)
              return b.ref;
            b = function(a2) {
              var b2 = d.refs;
              b2 === Jc && (b2 = d.refs = {});
              a2 === null ? delete b2[e] : b2[e] = a2;
            };
            b._stringRef = e;
            return b;
          }
          if (typeof a !== "string")
            throw Error(n(284));
          if (!c._owner)
            throw Error(n(290, a));
        }
        return a;
      }
      function Vc(a, b) {
        if (a.type !== "textarea")
          throw Error(n(31, Object.prototype.toString.call(b) === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, ""));
      }
      function Wc(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.lastEffect;
            d2 !== null ? (d2.nextEffect = c2, b2.lastEffect = c2) : b2.firstEffect = b2.lastEffect = c2;
            c2.nextEffect = null;
            c2.effectTag = 8;
          }
        }
        function c(c2, d2) {
          if (!a)
            return null;
          for (; d2 !== null; )
            b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(b2, a2) {
          for (b2 = /* @__PURE__ */ new Map(); a2 !== null; )
            a2.key !== null ? b2.set(a2.key, a2) : b2.set(a2.index, a2), a2 = a2.sibling;
          return b2;
        }
        function e(a2, b2) {
          a2 = Xc(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a)
            return c2;
          d2 = b2.alternate;
          if (d2 !== null)
            return d2 = d2.index, d2 < c2 ? (b2.effectTag = 2, c2) : d2;
          b2.effectTag = 2;
          return c2;
        }
        function g(b2) {
          a && b2.alternate === null && (b2.effectTag = 2);
          return b2;
        }
        function h(b2, a2, c2, d2) {
          if (a2 === null || a2.tag !== 6)
            return a2 = Yc(c2, b2.mode, d2), a2.return = b2, a2;
          a2 = e(a2, c2);
          a2.return = b2;
          return a2;
        }
        function k(a2, b2, c2, d2) {
          if (b2 !== null && b2.elementType === c2.type)
            return d2 = e(b2, c2.props), d2.ref = Uc(a2, b2, c2), d2.return = a2, d2;
          d2 = Zc(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Uc(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (b2 === null || b2.tag !== 4 || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
            return b2 = $c(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function q(b2, a2, c2, d2, f2) {
          if (a2 === null || a2.tag !== 7)
            return a2 = ad(c2, b2.mode, d2, f2), a2.return = b2, a2;
          a2 = e(a2, c2);
          a2.return = b2;
          return a2;
        }
        function r(a2, b2, c2) {
          if (typeof b2 === "string" || typeof b2 === "number")
            return b2 = Yc("" + b2, a2.mode, c2), b2.return = a2, b2;
          if (typeof b2 === "object" && b2 !== null) {
            switch (b2.$$typeof) {
              case ca:
                return c2 = Zc(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Uc(a2, null, b2), c2.return = a2, c2;
              case da:
                return b2 = $c(b2, a2.mode, c2), b2.return = a2, b2;
            }
            if (Tc(b2) || sa(b2))
              return b2 = ad(b2, a2.mode, c2, null), b2.return = a2, b2;
            Vc(a2, b2);
          }
          return null;
        }
        function w(b2, a2, c2, d2) {
          var e2 = a2 !== null ? a2.key : null;
          if (typeof c2 === "string" || typeof c2 === "number")
            return e2 !== null ? null : h(b2, a2, "" + c2, d2);
          if (typeof c2 === "object" && c2 !== null) {
            switch (c2.$$typeof) {
              case ca:
                return c2.key === e2 ? c2.type === ea ? q(b2, a2, c2.props.children, d2, e2) : k(b2, a2, c2, d2) : null;
              case da:
                return c2.key === e2 ? l(b2, a2, c2, d2) : null;
            }
            if (Tc(c2) || sa(c2))
              return e2 !== null ? null : q(b2, a2, c2, d2, null);
            Vc(b2, c2);
          }
          return null;
        }
        function z(b2, a2, c2, d2, e2) {
          if (typeof d2 === "string" || typeof d2 === "number")
            return b2 = b2.get(c2) || null, h(a2, b2, "" + d2, e2);
          if (typeof d2 === "object" && d2 !== null) {
            switch (d2.$$typeof) {
              case ca:
                return b2 = b2.get(d2.key === null ? c2 : d2.key) || null, d2.type === ea ? q(a2, b2, d2.props.children, e2, d2.key) : k(a2, b2, d2, e2);
              case da:
                return b2 = b2.get(d2.key === null ? c2 : d2.key) || null, l(a2, b2, d2, e2);
            }
            if (Tc(d2) || sa(d2))
              return b2 = b2.get(c2) || null, q(a2, b2, d2, e2, null);
            Vc(a2, d2);
          }
          return null;
        }
        function Q(e2, g2, h2, k2) {
          for (var l2 = null, v = null, t = g2, x = g2 = 0, q2 = null; t !== null && x < h2.length; x++) {
            t.index > x ? (q2 = t, t = null) : q2 = t.sibling;
            var y = w(e2, t, h2[x], k2);
            if (y === null) {
              t === null && (t = q2);
              break;
            }
            a && t && y.alternate === null && b(e2, t);
            g2 = f(y, g2, x);
            v === null ? l2 = y : v.sibling = y;
            v = y;
            t = q2;
          }
          if (x === h2.length)
            return c(e2, t), l2;
          if (t === null) {
            for (; x < h2.length; x++)
              t = r(e2, h2[x], k2), t !== null && (g2 = f(t, g2, x), v === null ? l2 = t : v.sibling = t, v = t);
            return l2;
          }
          for (t = d(e2, t); x < h2.length; x++)
            q2 = z(t, e2, x, h2[x], k2), q2 !== null && (a && q2.alternate !== null && t.delete(q2.key === null ? x : q2.key), g2 = f(q2, g2, x), v === null ? l2 = q2 : v.sibling = q2, v = q2);
          a && t.forEach(function(a2) {
            return b(e2, a2);
          });
          return l2;
        }
        function A(e2, g2, h2, k2) {
          var t = sa(h2);
          if (typeof t !== "function")
            throw Error(n(150));
          h2 = t.call(h2);
          if (h2 == null)
            throw Error(n(151));
          for (var l2 = t = null, v = g2, x = g2 = 0, q2 = null, y = h2.next(); v !== null && !y.done; x++, y = h2.next()) {
            v.index > x ? (q2 = v, v = null) : q2 = v.sibling;
            var A2 = w(e2, v, y.value, k2);
            if (A2 === null) {
              v === null && (v = q2);
              break;
            }
            a && v && A2.alternate === null && b(e2, v);
            g2 = f(A2, g2, x);
            l2 === null ? t = A2 : l2.sibling = A2;
            l2 = A2;
            v = q2;
          }
          if (y.done)
            return c(e2, v), t;
          if (v === null) {
            for (; !y.done; x++, y = h2.next())
              y = r(e2, y.value, k2), y !== null && (g2 = f(y, g2, x), l2 === null ? t = y : l2.sibling = y, l2 = y);
            return t;
          }
          for (v = d(e2, v); !y.done; x++, y = h2.next())
            y = z(v, e2, x, y.value, k2), y !== null && (a && y.alternate !== null && v.delete(y.key === null ? x : y.key), g2 = f(y, g2, x), l2 === null ? t = y : l2.sibling = y, l2 = y);
          a && v.forEach(function(a2) {
            return b(e2, a2);
          });
          return t;
        }
        return function(a2, d2, f2, h2) {
          var k2 = typeof f2 === "object" && f2 !== null && f2.type === ea && f2.key === null;
          k2 && (f2 = f2.props.children);
          var l2 = typeof f2 === "object" && f2 !== null;
          if (l2)
            switch (f2.$$typeof) {
              case ca:
                a: {
                  l2 = f2.key;
                  for (k2 = d2; k2 !== null; ) {
                    if (k2.key === l2) {
                      switch (k2.tag) {
                        case 7:
                          if (f2.type === ea) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props.children);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                          break;
                        default:
                          if (k2.elementType === f2.type) {
                            c(a2, k2.sibling);
                            d2 = e(k2, f2.props);
                            d2.ref = Uc(a2, k2, f2);
                            d2.return = a2;
                            a2 = d2;
                            break a;
                          }
                      }
                      c(a2, k2);
                      break;
                    } else
                      b(a2, k2);
                    k2 = k2.sibling;
                  }
                  f2.type === ea ? (d2 = ad(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Zc(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Uc(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case da:
                a: {
                  for (k2 = f2.key; d2 !== null; ) {
                    if (d2.key === k2)
                      if (d2.tag === 4 && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                        c(a2, d2.sibling);
                        d2 = e(d2, f2.children || []);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      } else {
                        c(a2, d2);
                        break;
                      }
                    else
                      b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = $c(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
            }
          if (typeof f2 === "string" || typeof f2 === "number")
            return f2 = "" + f2, d2 !== null && d2.tag === 6 ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Yc(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2);
          if (Tc(f2))
            return Q(a2, d2, f2, h2);
          if (sa(f2))
            return A(a2, d2, f2, h2);
          l2 && Vc(a2, f2);
          if (typeof f2 === "undefined" && !k2)
            switch (a2.tag) {
              case 1:
              case 0:
                throw a2 = a2.type, Error(n(152, a2.displayName || a2.name || "Component"));
            }
          return c(a2, d2);
        };
      }
      var bd = Wc(true), cd = Wc(false), dd = {}, J = { current: dd }, ed = { current: dd }, fd = { current: dd };
      function gd(a) {
        if (a === dd)
          throw Error(n(174));
        return a;
      }
      function hd(a, b) {
        C(fd, b);
        C(ed, a);
        C(J, dd);
        a = Ba(b);
        B(J);
        C(J, a);
      }
      function id2() {
        B(J);
        B(ed);
        B(fd);
      }
      function jd(a) {
        var b = gd(fd.current), c = gd(J.current);
        b = Ca(c, a.type, b);
        c !== b && (C(ed, a), C(J, b));
      }
      function kd(a) {
        ed.current === a && (B(J), B(ed));
      }
      var K = { current: 0 };
      function ld(a) {
        for (var b = a; b !== null; ) {
          if (b.tag === 13) {
            var c = b.memoizedState;
            if (c !== null && (c = c.dehydrated, c === null || pb(c) || qb(c)))
              return b;
          } else if (b.tag === 19 && b.memoizedProps.revealOrder !== void 0) {
            if ((b.effectTag & 64) !== 0)
              return b;
          } else if (b.child !== null) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a)
            break;
          for (; b.sibling === null; ) {
            if (b.return === null || b.return === a)
              return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      function md(a, b) {
        return { responder: a, props: b };
      }
      var nd = p.ReactCurrentDispatcher, L = p.ReactCurrentBatchConfig, od = 0, M = null, N = null, O = null, pd = false;
      function P() {
        throw Error(n(321));
      }
      function qd(a, b) {
        if (b === null)
          return false;
        for (var c = 0; c < b.length && c < a.length; c++)
          if (!jc(a[c], b[c]))
            return false;
        return true;
      }
      function rd(a, b, c, d, e, f) {
        od = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.expirationTime = 0;
        nd.current = a === null || a.memoizedState === null ? sd : td;
        a = c(d, e);
        if (b.expirationTime === od) {
          f = 0;
          do {
            b.expirationTime = 0;
            if (!(25 > f))
              throw Error(n(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            nd.current = ud;
            a = c(d, e);
          } while (b.expirationTime === od);
        }
        nd.current = vd;
        b = N !== null && N.next !== null;
        od = 0;
        O = N = M = null;
        pd = false;
        if (b)
          throw Error(n(300));
        return a;
      }
      function wd() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        O === null ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function xd() {
        if (N === null) {
          var a = M.alternate;
          a = a !== null ? a.memoizedState : null;
        } else
          a = N.next;
        var b = O === null ? M.memoizedState : O.next;
        if (b !== null)
          O = b, N = a;
        else {
          if (a === null)
            throw Error(n(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          O === null ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function yd(a, b) {
        return typeof b === "function" ? b(a) : b;
      }
      function zd(a) {
        var b = xd(), c = b.queue;
        if (c === null)
          throw Error(n(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (f !== null) {
          if (e !== null) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (e !== null) {
          e = e.next;
          d = d.baseState;
          var h = g = f = null, k = e;
          do {
            var l = k.expirationTime;
            if (l < od) {
              var q = { expirationTime: k.expirationTime, suspenseConfig: k.suspenseConfig, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null };
              h === null ? (g = h = q, f = d) : h = h.next = q;
              l > M.expirationTime && (M.expirationTime = l, Gc(l));
            } else
              h !== null && (h = h.next = { expirationTime: 1073741823, suspenseConfig: k.suspenseConfig, action: k.action, eagerReducer: k.eagerReducer, eagerState: k.eagerState, next: null }), Ec(l, k.suspenseConfig), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);
            k = k.next;
          } while (k !== null && k !== e);
          h === null ? f = d : h.next = g;
          jc(d, b.memoizedState) || (wc = true);
          b.memoizedState = d;
          b.baseState = f;
          b.baseQueue = h;
          c.lastRenderedState = d;
        }
        return [b.memoizedState, c.dispatch];
      }
      function Ad(a) {
        var b = xd(), c = b.queue;
        if (c === null)
          throw Error(n(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (e !== null) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          jc(f, b.memoizedState) || (wc = true);
          b.memoizedState = f;
          b.baseQueue === null && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Bd(a) {
        var b = wd();
        typeof a === "function" && (a = a());
        b.memoizedState = b.baseState = a;
        a = b.queue = { pending: null, dispatch: null, lastRenderedReducer: yd, lastRenderedState: a };
        a = a.dispatch = Cd.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function Dd(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        b === null ? (b = { lastEffect: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, c === null ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function Ed() {
        return xd().memoizedState;
      }
      function Fd(a, b, c, d) {
        var e = wd();
        M.effectTag |= a;
        e.memoizedState = Dd(1 | b, c, void 0, d === void 0 ? null : d);
      }
      function Gd(a, b, c, d) {
        var e = xd();
        d = d === void 0 ? null : d;
        var f = void 0;
        if (N !== null) {
          var g = N.memoizedState;
          f = g.destroy;
          if (d !== null && qd(d, g.deps)) {
            Dd(b, c, f, d);
            return;
          }
        }
        M.effectTag |= a;
        e.memoizedState = Dd(1 | b, c, f, d);
      }
      function Hd(a, b) {
        return Fd(516, 4, a, b);
      }
      function Id(a, b) {
        return Gd(516, 4, a, b);
      }
      function Jd(a, b) {
        return Gd(4, 2, a, b);
      }
      function Kd(a, b) {
        if (typeof b === "function")
          return a = a(), b(a), function() {
            b(null);
          };
        if (b !== null && b !== void 0)
          return a = a(), b.current = a, function() {
            b.current = null;
          };
      }
      function Ld(a, b, c) {
        c = c !== null && c !== void 0 ? c.concat([a]) : null;
        return Gd(4, 2, Kd.bind(null, b, a), c);
      }
      function Md() {
      }
      function Nd(a, b) {
        wd().memoizedState = [a, b === void 0 ? null : b];
        return a;
      }
      function Od(a, b) {
        var c = xd();
        b = b === void 0 ? null : b;
        var d = c.memoizedState;
        if (d !== null && b !== null && qd(b, d[1]))
          return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function Pd(a, b) {
        var c = xd();
        b = b === void 0 ? null : b;
        var d = c.memoizedState;
        if (d !== null && b !== null && qd(b, d[1]))
          return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function Qd(a, b, c) {
        var d = bc();
        dc(98 > d ? 98 : d, function() {
          a(true);
        });
        dc(97 < d ? 97 : d, function() {
          var d2 = L.suspense;
          L.suspense = b === void 0 ? null : b;
          try {
            a(false), c();
          } finally {
            L.suspense = d2;
          }
        });
      }
      function Cd(a, b, c) {
        var d = Lc(), e = Ic.suspense;
        d = Mc(d, a, e);
        e = { expirationTime: d, suspenseConfig: e, action: c, eagerReducer: null, eagerState: null, next: null };
        var f = b.pending;
        f === null ? e.next = e : (e.next = f.next, f.next = e);
        b.pending = e;
        f = a.alternate;
        if (a === M || f !== null && f === M)
          pd = true, e.expirationTime = od, M.expirationTime = od;
        else {
          if (a.expirationTime === 0 && (f === null || f.expirationTime === 0) && (f = b.lastRenderedReducer, f !== null))
            try {
              var g = b.lastRenderedState, h = f(g, c);
              e.eagerReducer = f;
              e.eagerState = h;
              if (jc(h, g))
                return;
            } catch (k) {
            } finally {
            }
          Nc(a, d);
        }
      }
      var vd = { readContext: I, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useResponder: P, useDeferredValue: P, useTransition: P }, sd = { readContext: I, useCallback: Nd, useContext: I, useEffect: Hd, useImperativeHandle: function(a, b, c) {
        c = c !== null && c !== void 0 ? c.concat([a]) : null;
        return Fd(4, 2, Kd.bind(null, b, a), c);
      }, useLayoutEffect: function(a, b) {
        return Fd(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = wd();
        b = b === void 0 ? null : b;
        a = a();
        c.memoizedState = [
          a,
          b
        ];
        return a;
      }, useReducer: function(a, b, c) {
        var d = wd();
        b = c !== void 0 ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = d.queue = { pending: null, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        a = a.dispatch = Cd.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = wd();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: Bd, useDebugValue: Md, useResponder: md, useDeferredValue: function(a, b) {
        var c = Bd(a), d = c[0], e = c[1];
        Hd(function() {
          var c2 = L.suspense;
          L.suspense = b === void 0 ? null : b;
          try {
            e(a);
          } finally {
            L.suspense = c2;
          }
        }, [a, b]);
        return d;
      }, useTransition: function(a) {
        var b = Bd(false), c = b[0];
        b = b[1];
        return [Nd(Qd.bind(null, b, a), [b, a]), c];
      } }, td = { readContext: I, useCallback: Od, useContext: I, useEffect: Id, useImperativeHandle: Ld, useLayoutEffect: Jd, useMemo: Pd, useReducer: zd, useRef: Ed, useState: function() {
        return zd(yd);
      }, useDebugValue: Md, useResponder: md, useDeferredValue: function(a, b) {
        var c = zd(yd), d = c[0], e = c[1];
        Id(function() {
          var c2 = L.suspense;
          L.suspense = b === void 0 ? null : b;
          try {
            e(a);
          } finally {
            L.suspense = c2;
          }
        }, [a, b]);
        return d;
      }, useTransition: function(a) {
        var b = zd(yd), c = b[0];
        b = b[1];
        return [Od(Qd.bind(null, b, a), [b, a]), c];
      } }, ud = { readContext: I, useCallback: Od, useContext: I, useEffect: Id, useImperativeHandle: Ld, useLayoutEffect: Jd, useMemo: Pd, useReducer: Ad, useRef: Ed, useState: function() {
        return Ad(yd);
      }, useDebugValue: Md, useResponder: md, useDeferredValue: function(a, b) {
        var c = Ad(yd), d = c[0], e = c[1];
        Id(function() {
          var c2 = L.suspense;
          L.suspense = b === void 0 ? null : b;
          try {
            e(a);
          } finally {
            L.suspense = c2;
          }
        }, [a, b]);
        return d;
      }, useTransition: function(a) {
        var b = Ad(yd), c = b[0];
        b = b[1];
        return [Od(Qd.bind(null, b, a), [b, a]), c];
      } }, Rd = null, Sd = null, Td = false;
      function Ud(a, b) {
        var c = Vd(5, null, null, 0);
        c.elementType = "DELETED";
        c.type = "DELETED";
        c.stateNode = b;
        c.return = a;
        c.effectTag = 8;
        a.lastEffect !== null ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
      }
      function Wd(a, b) {
        switch (a.tag) {
          case 5:
            return b = nb(b, a.type, a.pendingProps), b !== null ? (a.stateNode = b, true) : false;
          case 6:
            return b = ob(b, a.pendingProps), b !== null ? (a.stateNode = b, true) : false;
          case 13:
            return false;
          default:
            return false;
        }
      }
      function Xd(a) {
        if (Td) {
          var b = Sd;
          if (b) {
            var c = b;
            if (!Wd(a, b)) {
              b = rb(c);
              if (!b || !Wd(a, b)) {
                a.effectTag = a.effectTag & -1025 | 2;
                Td = false;
                Rd = a;
                return;
              }
              Ud(Rd, c);
            }
            Rd = a;
            Sd = sb(b);
          } else
            a.effectTag = a.effectTag & -1025 | 2, Td = false, Rd = a;
        }
      }
      function Yd(a) {
        for (a = a.return; a !== null && a.tag !== 5 && a.tag !== 3 && a.tag !== 13; )
          a = a.return;
        Rd = a;
      }
      function Zd(a) {
        if (!Sa || a !== Rd)
          return false;
        if (!Td)
          return Yd(a), Td = true, false;
        var b = a.type;
        if (a.tag !== 5 || b !== "head" && b !== "body" && !Ja(b, a.memoizedProps))
          for (b = Sd; b; )
            Ud(a, b), b = rb(b);
        Yd(a);
        if (a.tag === 13) {
          if (!Sa)
            throw Error(n(316));
          a = a.memoizedState;
          a = a !== null ? a.dehydrated : null;
          if (!a)
            throw Error(n(317));
          Sd = vb(a);
        } else
          Sd = Rd ? rb(a.stateNode) : null;
        return true;
      }
      function $d() {
        Sa && (Sd = Rd = null, Td = false);
      }
      var ae = p.ReactCurrentOwner, wc = false;
      function R(a, b, c, d) {
        b.child = a === null ? cd(b, null, c, d) : bd(b, a.child, c, d);
      }
      function be(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        vc(b, e);
        d = rd(a, b, c, d, f, e);
        if (a !== null && !wc)
          return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), ce(a, b, e);
        b.effectTag |= 1;
        R(a, b, d, e);
        return b.child;
      }
      function de(a, b, c, d, e, f) {
        if (a === null) {
          var g = c.type;
          if (typeof g === "function" && !ee(g) && g.defaultProps === void 0 && c.compare === null && c.defaultProps === void 0)
            return b.tag = 15, b.type = g, fe(a, b, g, d, e, f);
          a = Zc(c.type, null, d, null, b.mode, f);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        g = a.child;
        if (e < f && (e = g.memoizedProps, c = c.compare, c = c !== null ? c : lc, c(e, d) && a.ref === b.ref))
          return ce(a, b, f);
        b.effectTag |= 1;
        a = Xc(g, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function fe(a, b, c, d, e, f) {
        return a !== null && lc(a.memoizedProps, d) && a.ref === b.ref && (wc = false, e < f) ? (b.expirationTime = a.expirationTime, ce(a, b, f)) : ge(a, b, c, d, f);
      }
      function he(a, b) {
        var c = b.ref;
        if (a === null && c !== null || a !== null && a.ref !== c)
          b.effectTag |= 128;
      }
      function ge(a, b, c, d, e) {
        var f = F(c) ? Db : D.current;
        f = Eb(b, f);
        vc(b, e);
        c = rd(a, b, c, d, f, e);
        if (a !== null && !wc)
          return b.updateQueue = a.updateQueue, b.effectTag &= -517, a.expirationTime <= e && (a.expirationTime = 0), ce(a, b, e);
        b.effectTag |= 1;
        R(a, b, c, e);
        return b.child;
      }
      function ie(a, b, c, d, e) {
        if (F(c)) {
          var f = true;
          Ib(b);
        } else
          f = false;
        vc(b, e);
        if (b.stateNode === null)
          a !== null && (a.alternate = null, b.alternate = null, b.effectTag |= 2), Qc(b, c, d), Sc(b, c, d, e), d = true;
        else if (a === null) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          typeof l === "object" && l !== null ? l = I(l) : (l = F(c) ? Db : D.current, l = Eb(b, l));
          var q = c.getDerivedStateFromProps, r = typeof q === "function" || typeof g.getSnapshotBeforeUpdate === "function";
          r || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k !== l) && Rc(b, g, d, l);
          xc = false;
          var w = b.memoizedState;
          g.state = w;
          Dc(b, d, g, e);
          k = b.memoizedState;
          h !== d || w !== k || E.current || xc ? (typeof q === "function" && (Kc(b, c, q, d), k = b.memoizedState), (h = xc || Pc(b, c, h, d, w, k, l)) ? (r || typeof g.UNSAFE_componentWillMount !== "function" && typeof g.componentWillMount !== "function" || (typeof g.componentWillMount === "function" && g.componentWillMount(), typeof g.UNSAFE_componentWillMount === "function" && g.UNSAFE_componentWillMount()), typeof g.componentDidMount === "function" && (b.effectTag |= 4)) : (typeof g.componentDidMount === "function" && (b.effectTag |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : (typeof g.componentDidMount === "function" && (b.effectTag |= 4), d = false);
        } else
          g = b.stateNode, zc(a, b), h = b.memoizedProps, g.props = b.type === b.elementType ? h : mc(b.type, h), k = g.context, l = c.contextType, typeof l === "object" && l !== null ? l = I(l) : (l = F(c) ? Db : D.current, l = Eb(b, l)), q = c.getDerivedStateFromProps, (r = typeof q === "function" || typeof g.getSnapshotBeforeUpdate === "function") || typeof g.UNSAFE_componentWillReceiveProps !== "function" && typeof g.componentWillReceiveProps !== "function" || (h !== d || k !== l) && Rc(b, g, d, l), xc = false, k = b.memoizedState, g.state = k, Dc(b, d, g, e), w = b.memoizedState, h !== d || k !== w || E.current || xc ? (typeof q === "function" && (Kc(b, c, q, d), w = b.memoizedState), (q = xc || Pc(b, c, h, d, k, w, l)) ? (r || typeof g.UNSAFE_componentWillUpdate !== "function" && typeof g.componentWillUpdate !== "function" || (typeof g.componentWillUpdate === "function" && g.componentWillUpdate(d, w, l), typeof g.UNSAFE_componentWillUpdate === "function" && g.UNSAFE_componentWillUpdate(d, w, l)), typeof g.componentDidUpdate === "function" && (b.effectTag |= 4), typeof g.getSnapshotBeforeUpdate === "function" && (b.effectTag |= 256)) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), b.memoizedProps = d, b.memoizedState = w), g.props = d, g.state = w, g.context = l, d = q) : (typeof g.componentDidUpdate !== "function" || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 4), typeof g.getSnapshotBeforeUpdate !== "function" || h === a.memoizedProps && k === a.memoizedState || (b.effectTag |= 256), d = false);
        return je(a, b, c, d, f, e);
      }
      function je(a, b, c, d, e, f) {
        he(a, b);
        var g = (b.effectTag & 64) !== 0;
        if (!d && !g)
          return e && Jb(b, c, false), ce(a, b, f);
        d = b.stateNode;
        ae.current = b;
        var h = g && typeof c.getDerivedStateFromError !== "function" ? null : d.render();
        b.effectTag |= 1;
        a !== null && g ? (b.child = bd(b, a.child, null, f), b.child = bd(b, null, h, f)) : R(a, b, h, f);
        b.memoizedState = d.state;
        e && Jb(b, c, true);
        return b.child;
      }
      function le(a) {
        var b = a.stateNode;
        b.pendingContext ? Gb(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Gb(a, b.context, false);
        hd(a, b.containerInfo);
      }
      var me = { dehydrated: null, retryTime: 0 };
      function ne(a, b, c) {
        var d = b.mode, e = b.pendingProps, f = K.current, g = false, h;
        (h = (b.effectTag & 64) !== 0) || (h = (f & 2) !== 0 && (a === null || a.memoizedState !== null));
        h ? (g = true, b.effectTag &= -65) : a !== null && a.memoizedState === null || e.fallback === void 0 || e.unstable_avoidThisFallback === true || (f |= 1);
        C(K, f & 1);
        if (a === null) {
          e.fallback !== void 0 && Xd(b);
          if (g) {
            g = e.fallback;
            e = ad(null, d, 0, null);
            e.return = b;
            if ((b.mode & 2) === 0)
              for (a = b.memoizedState !== null ? b.child.child : b.child, e.child = a; a !== null; )
                a.return = e, a = a.sibling;
            c = ad(g, d, c, null);
            c.return = b;
            e.sibling = c;
            b.memoizedState = me;
            b.child = e;
            return c;
          }
          d = e.children;
          b.memoizedState = null;
          return b.child = cd(b, null, d, c);
        }
        if (a.memoizedState !== null) {
          a = a.child;
          d = a.sibling;
          if (g) {
            e = e.fallback;
            c = Xc(a, a.pendingProps);
            c.return = b;
            if ((b.mode & 2) === 0 && (g = b.memoizedState !== null ? b.child.child : b.child, g !== a.child))
              for (c.child = g; g !== null; )
                g.return = c, g = g.sibling;
            d = Xc(d, e);
            d.return = b;
            c.sibling = d;
            c.childExpirationTime = 0;
            b.memoizedState = me;
            b.child = c;
            return d;
          }
          c = bd(b, a.child, e.children, c);
          b.memoizedState = null;
          return b.child = c;
        }
        a = a.child;
        if (g) {
          g = e.fallback;
          e = ad(null, d, 0, null);
          e.return = b;
          e.child = a;
          a !== null && (a.return = e);
          if ((b.mode & 2) === 0)
            for (a = b.memoizedState !== null ? b.child.child : b.child, e.child = a; a !== null; )
              a.return = e, a = a.sibling;
          c = ad(g, d, c, null);
          c.return = b;
          e.sibling = c;
          c.effectTag |= 2;
          e.childExpirationTime = 0;
          b.memoizedState = me;
          b.child = e;
          return c;
        }
        b.memoizedState = null;
        return b.child = bd(b, a, e.children, c);
      }
      function oe(a, b) {
        a.expirationTime < b && (a.expirationTime = b);
        var c = a.alternate;
        c !== null && c.expirationTime < b && (c.expirationTime = b);
        uc(a.return, b);
      }
      function pe(a, b, c, d, e, f) {
        var g = a.memoizedState;
        g === null ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailExpiration: 0, tailMode: e, lastEffect: f } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailExpiration = 0, g.tailMode = e, g.lastEffect = f);
      }
      function qe(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        R(a, b, d.children, c);
        d = K.current;
        if ((d & 2) !== 0)
          d = d & 1 | 2, b.effectTag |= 64;
        else {
          if (a !== null && (a.effectTag & 64) !== 0)
            a:
              for (a = b.child; a !== null; ) {
                if (a.tag === 13)
                  a.memoizedState !== null && oe(a, c);
                else if (a.tag === 19)
                  oe(a, c);
                else if (a.child !== null) {
                  a.child.return = a;
                  a = a.child;
                  continue;
                }
                if (a === b)
                  break a;
                for (; a.sibling === null; ) {
                  if (a.return === null || a.return === b)
                    break a;
                  a = a.return;
                }
                a.sibling.return = a.return;
                a = a.sibling;
              }
          d &= 1;
        }
        C(K, d);
        if ((b.mode & 2) === 0)
          b.memoizedState = null;
        else
          switch (e) {
            case "forwards":
              c = b.child;
              for (e = null; c !== null; )
                a = c.alternate, a !== null && ld(a) === null && (e = c), c = c.sibling;
              c = e;
              c === null ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
              pe(b, false, e, c, f, b.lastEffect);
              break;
            case "backwards":
              c = null;
              e = b.child;
              for (b.child = null; e !== null; ) {
                a = e.alternate;
                if (a !== null && ld(a) === null) {
                  b.child = e;
                  break;
                }
                a = e.sibling;
                e.sibling = c;
                c = e;
                e = a;
              }
              pe(b, true, c, null, f, b.lastEffect);
              break;
            case "together":
              pe(b, false, null, null, void 0, b.lastEffect);
              break;
            default:
              b.memoizedState = null;
          }
        return b.child;
      }
      function ce(a, b, c) {
        a !== null && (b.dependencies = a.dependencies);
        var d = b.expirationTime;
        d !== 0 && Gc(d);
        if (b.childExpirationTime < c)
          return null;
        if (a !== null && b.child !== a.child)
          throw Error(n(153));
        if (b.child !== null) {
          a = b.child;
          c = Xc(a, a.pendingProps);
          b.child = c;
          for (c.return = b; a.sibling !== null; )
            a = a.sibling, c = c.sibling = Xc(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function re(a) {
        a.effectTag |= 4;
      }
      var se, te, ue, ve;
      if (Qa)
        se = function(a, b) {
          for (var c = b.child; c !== null; ) {
            if (c.tag === 5 || c.tag === 6)
              Ga(a, c.stateNode);
            else if (c.tag !== 4 && c.child !== null) {
              c.child.return = c;
              c = c.child;
              continue;
            }
            if (c === b)
              break;
            for (; c.sibling === null; ) {
              if (c.return === null || c.return === b)
                return;
              c = c.return;
            }
            c.sibling.return = c.return;
            c = c.sibling;
          }
        }, te = function() {
        }, ue = function(a, b, c, d, e) {
          a = a.memoizedProps;
          if (a !== d) {
            var f = b.stateNode, g = gd(J.current);
            c = Ia(f, c, a, d, e, g);
            (b.updateQueue = c) && re(b);
          }
        }, ve = function(a, b, c, d) {
          c !== d && re(b);
        };
      else if (Ra) {
        se = function(a, b, c, d) {
          for (var e = b.child; e !== null; ) {
            if (e.tag === 5) {
              var f = e.stateNode;
              c && d && (f = lb(f, e.type, e.memoizedProps, e));
              Ga(a, f);
            } else if (e.tag === 6)
              f = e.stateNode, c && d && (f = mb(f, e.memoizedProps, e)), Ga(a, f);
            else if (e.tag !== 4) {
              if (e.tag === 13 && (e.effectTag & 4) !== 0 && (f = e.memoizedState !== null)) {
                var g = e.child;
                if (g !== null && (g.child !== null && (g.child.return = g, se(a, g, true, f)), f = g.sibling, f !== null)) {
                  f.return = e;
                  e = f;
                  continue;
                }
              }
              if (e.child !== null) {
                e.child.return = e;
                e = e.child;
                continue;
              }
            }
            if (e === b)
              break;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === b)
                return;
              e = e.return;
            }
            e.sibling.return = e.return;
            e = e.sibling;
          }
        };
        var we = function(a, b, c, d) {
          for (var e = b.child; e !== null; ) {
            if (e.tag === 5) {
              var f = e.stateNode;
              c && d && (f = lb(f, e.type, e.memoizedProps, e));
              ib(a, f);
            } else if (e.tag === 6)
              f = e.stateNode, c && d && (f = mb(f, e.memoizedProps, e)), ib(a, f);
            else if (e.tag !== 4) {
              if (e.tag === 13 && (e.effectTag & 4) !== 0 && (f = e.memoizedState !== null)) {
                var g = e.child;
                if (g !== null && (g.child !== null && (g.child.return = g, we(a, g, true, f)), f = g.sibling, f !== null)) {
                  f.return = e;
                  e = f;
                  continue;
                }
              }
              if (e.child !== null) {
                e.child.return = e;
                e = e.child;
                continue;
              }
            }
            if (e === b)
              break;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === b)
                return;
              e = e.return;
            }
            e.sibling.return = e.return;
            e = e.sibling;
          }
        };
        te = function(a) {
          var b = a.stateNode;
          if (a.firstEffect !== null) {
            var c = b.containerInfo, d = hb(c);
            we(d, a, false, false);
            b.pendingChildren = d;
            re(a);
            jb(c, d);
          }
        };
        ue = function(a, b, c, d, e) {
          var f = a.stateNode, g = a.memoizedProps;
          if ((a = b.firstEffect === null) && g === d)
            b.stateNode = f;
          else {
            var h = b.stateNode, k = gd(J.current), l = null;
            g !== d && (l = Ia(h, c, g, d, e, k));
            a && l === null ? b.stateNode = f : (f = gb(f, l, c, g, d, b, a, h), Ha(f, c, d, e, k) && re(b), b.stateNode = f, a ? re(b) : se(f, b, false, false));
          }
        };
        ve = function(a, b, c, d) {
          c !== d ? (a = gd(fd.current), c = gd(J.current), b.stateNode = La(d, a, c, b), re(b)) : b.stateNode = a.stateNode;
        };
      } else
        te = function() {
        }, ue = function() {
        }, ve = function() {
        };
      function xe(a, b) {
        switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; b !== null; )
              b.alternate !== null && (c = b), b = b.sibling;
            c === null ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; c !== null; )
              c.alternate !== null && (d = c), c = c.sibling;
            d === null ? b || a.tail === null ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function ye(a, b, c) {
        var d = b.pendingProps;
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return null;
          case 1:
            return F(b.type) && Fb(), null;
          case 3:
            return id2(), B(E), B(D), d = b.stateNode, d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), (a === null || a.child === null) && Zd(b) && re(b), te(b), null;
          case 5:
            kd(b);
            var e = gd(fd.current);
            c = b.type;
            if (a !== null && b.stateNode != null)
              ue(a, b, c, d, e), a.ref !== b.ref && (b.effectTag |= 128);
            else {
              if (!d) {
                if (b.stateNode === null)
                  throw Error(n(166));
                return null;
              }
              a = gd(J.current);
              if (Zd(b)) {
                if (!Sa)
                  throw Error(n(175));
                a = tb(b.stateNode, b.type, b.memoizedProps, e, a, b);
                b.updateQueue = a;
                a !== null && re(b);
              } else {
                var f = Fa(c, d, e, a, b);
                se(f, b, false, false);
                b.stateNode = f;
                Ha(f, c, d, e, a) && re(b);
              }
              b.ref !== null && (b.effectTag |= 128);
            }
            return null;
          case 6:
            if (a && b.stateNode != null)
              ve(a, b, a.memoizedProps, d);
            else {
              if (typeof d !== "string" && b.stateNode === null)
                throw Error(n(166));
              a = gd(fd.current);
              e = gd(J.current);
              if (Zd(b)) {
                if (!Sa)
                  throw Error(n(176));
                ub(b.stateNode, b.memoizedProps, b) && re(b);
              } else
                b.stateNode = La(d, a, e, b);
            }
            return null;
          case 13:
            B(K);
            d = b.memoizedState;
            if ((b.effectTag & 64) !== 0)
              return b.expirationTime = c, b;
            d = d !== null;
            e = false;
            a === null ? b.memoizedProps.fallback !== void 0 && Zd(b) : (c = a.memoizedState, e = c !== null, d || c === null || (c = a.child.sibling, c !== null && (f = b.firstEffect, f !== null ? (b.firstEffect = c, c.nextEffect = f) : (b.firstEffect = b.lastEffect = c, c.nextEffect = null), c.effectTag = 8)));
            if (d && !e && (b.mode & 2) !== 0)
              if (a === null && b.memoizedProps.unstable_avoidThisFallback !== true || (K.current & 1) !== 0)
                S === ze && (S = Ae);
              else {
                if (S === ze || S === Ae)
                  S = Be;
                Ce !== 0 && T !== null && (De(T, U), Ee(T, Ce));
              }
            Ra && d && (b.effectTag |= 4);
            Qa && (d || e) && (b.effectTag |= 4);
            return null;
          case 4:
            return id2(), te(b), null;
          case 10:
            return tc(b), null;
          case 17:
            return F(b.type) && Fb(), null;
          case 19:
            B(K);
            d = b.memoizedState;
            if (d === null)
              return null;
            e = (b.effectTag & 64) !== 0;
            f = d.rendering;
            if (f === null)
              if (e)
                xe(d, false);
              else {
                if (S !== ze || a !== null && (a.effectTag & 64) !== 0)
                  for (a = b.child; a !== null; ) {
                    f = ld(a);
                    if (f !== null) {
                      b.effectTag |= 64;
                      xe(d, false);
                      a = f.updateQueue;
                      a !== null && (b.updateQueue = a, b.effectTag |= 4);
                      d.lastEffect === null && (b.firstEffect = null);
                      b.lastEffect = d.lastEffect;
                      a = c;
                      for (d = b.child; d !== null; )
                        e = d, c = a, e.effectTag &= 2, e.nextEffect = null, e.firstEffect = null, e.lastEffect = null, f = e.alternate, f === null ? (e.childExpirationTime = 0, e.expirationTime = c, e.child = null, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null) : (e.childExpirationTime = f.childExpirationTime, e.expirationTime = f.expirationTime, e.child = f.child, e.memoizedProps = f.memoizedProps, e.memoizedState = f.memoizedState, e.updateQueue = f.updateQueue, c = f.dependencies, e.dependencies = c === null ? null : { expirationTime: c.expirationTime, firstContext: c.firstContext, responders: c.responders }), d = d.sibling;
                      C(K, K.current & 1 | 2);
                      return b.child;
                    }
                    a = a.sibling;
                  }
              }
            else {
              if (!e)
                if (a = ld(f), a !== null) {
                  if (b.effectTag |= 64, e = true, a = a.updateQueue, a !== null && (b.updateQueue = a, b.effectTag |= 4), xe(d, true), d.tail === null && d.tailMode === "hidden" && !f.alternate)
                    return b = b.lastEffect = d.lastEffect, b !== null && (b.nextEffect = null), null;
                } else
                  2 * G() - d.renderingStartTime > d.tailExpiration && 1 < c && (b.effectTag |= 64, e = true, xe(d, false), b.expirationTime = b.childExpirationTime = c - 1);
              d.isBackwards ? (f.sibling = b.child, b.child = f) : (a = d.last, a !== null ? a.sibling = f : b.child = f, d.last = f);
            }
            return d.tail !== null ? (d.tailExpiration === 0 && (d.tailExpiration = G() + 500), a = d.tail, d.rendering = a, d.tail = a.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = G(), a.sibling = null, b = K.current, C(K, e ? b & 1 | 2 : b & 1), a) : null;
        }
        throw Error(n(156, b.tag));
      }
      function Fe(a) {
        switch (a.tag) {
          case 1:
            F(a.type) && Fb();
            var b = a.effectTag;
            return b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;
          case 3:
            id2();
            B(E);
            B(D);
            b = a.effectTag;
            if ((b & 64) !== 0)
              throw Error(n(285));
            a.effectTag = b & -4097 | 64;
            return a;
          case 5:
            return kd(a), null;
          case 13:
            return B(K), b = a.effectTag, b & 4096 ? (a.effectTag = b & -4097 | 64, a) : null;
          case 19:
            return B(K), null;
          case 4:
            return id2(), null;
          case 10:
            return tc(a), null;
          default:
            return null;
        }
      }
      function Ge(a, b) {
        return { value: a, source: b, stack: zb(b) };
      }
      var He = typeof WeakSet === "function" ? WeakSet : Set;
      function Ie(a, b) {
        var c = b.source, d = b.stack;
        d === null && c !== null && (d = zb(c));
        c !== null && ua(c.type);
        b = b.value;
        a !== null && a.tag === 1 && ua(a.type);
        try {
          console.error(b);
        } catch (e) {
          setTimeout(function() {
            throw e;
          });
        }
      }
      function Je(a, b) {
        try {
          b.props = a.memoizedProps, b.state = a.memoizedState, b.componentWillUnmount();
        } catch (c) {
          Ke(a, c);
        }
      }
      function Le(a) {
        var b = a.ref;
        if (b !== null)
          if (typeof b === "function")
            try {
              b(null);
            } catch (c) {
              Ke(a, c);
            }
          else
            b.current = null;
      }
      function Me(a, b) {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            return;
          case 1:
            if (b.effectTag & 256 && a !== null) {
              var c = a.memoizedProps, d = a.memoizedState;
              a = b.stateNode;
              b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : mc(b.type, c), d);
              a.__reactInternalSnapshotBeforeUpdate = b;
            }
            return;
          case 3:
          case 5:
          case 6:
          case 4:
          case 17:
            return;
        }
        throw Error(n(163));
      }
      function Ne(a, b) {
        b = b.updateQueue;
        b = b !== null ? b.lastEffect : null;
        if (b !== null) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.destroy;
              c.destroy = void 0;
              d !== void 0 && d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Oe(a, b) {
        b = b.updateQueue;
        b = b !== null ? b.lastEffect : null;
        if (b !== null) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Pe(a, b, c) {
        switch (c.tag) {
          case 0:
          case 11:
          case 15:
          case 22:
            Oe(3, c);
            return;
          case 1:
            a = c.stateNode;
            if (c.effectTag & 4)
              if (b === null)
                a.componentDidMount();
              else {
                var d = c.elementType === c.type ? b.memoizedProps : mc(c.type, b.memoizedProps);
                a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate);
              }
            b = c.updateQueue;
            b !== null && Hc(c, b, a);
            return;
          case 3:
            b = c.updateQueue;
            if (b !== null) {
              a = null;
              if (c.child !== null)
                switch (c.child.tag) {
                  case 5:
                    a = Aa(c.child.stateNode);
                    break;
                  case 1:
                    a = c.child.stateNode;
                }
              Hc(c, b, a);
            }
            return;
          case 5:
            a = c.stateNode;
            b === null && c.effectTag & 4 && Wa(a, c.type, c.memoizedProps, c);
            return;
          case 6:
            return;
          case 4:
            return;
          case 12:
            return;
          case 13:
            Sa && c.memoizedState === null && (c = c.alternate, c !== null && (c = c.memoizedState, c !== null && (c = c.dehydrated, c !== null && xb(c))));
            return;
          case 19:
          case 17:
          case 20:
          case 21:
            return;
        }
        throw Error(n(163));
      }
      function Qe(a, b, c) {
        typeof Re === "function" && Re(b);
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            a = b.updateQueue;
            if (a !== null && (a = a.lastEffect, a !== null)) {
              var d = a.next;
              dc(97 < c ? 97 : c, function() {
                var a2 = d;
                do {
                  var c2 = a2.destroy;
                  if (c2 !== void 0) {
                    var g = b;
                    try {
                      c2();
                    } catch (h) {
                      Ke(g, h);
                    }
                  }
                  a2 = a2.next;
                } while (a2 !== d);
              });
            }
            break;
          case 1:
            Le(b);
            c = b.stateNode;
            typeof c.componentWillUnmount === "function" && Je(b, c);
            break;
          case 5:
            Le(b);
            break;
          case 4:
            Qa ? Se(a, b, c) : Ra && Te(b);
        }
      }
      function Ue(a, b, c) {
        for (var d = b; ; )
          if (Qe(a, d, c), d.child === null || Qa && d.tag === 4) {
            if (d === b)
              break;
            for (; d.sibling === null; ) {
              if (d.return === null || d.return === b)
                return;
              d = d.return;
            }
            d.sibling.return = d.return;
            d = d.sibling;
          } else
            d.child.return = d, d = d.child;
      }
      function Ve(a) {
        var b = a.alternate;
        a.return = null;
        a.child = null;
        a.memoizedState = null;
        a.updateQueue = null;
        a.dependencies = null;
        a.alternate = null;
        a.firstEffect = null;
        a.lastEffect = null;
        a.pendingProps = null;
        a.memoizedProps = null;
        a.stateNode = null;
        b !== null && Ve(b);
      }
      function Te(a) {
        if (Ra) {
          a = a.stateNode.containerInfo;
          var b = hb(a);
          kb(a, b);
        }
      }
      function We(a) {
        return a.tag === 5 || a.tag === 3 || a.tag === 4;
      }
      function Xe(a) {
        if (Qa) {
          a: {
            for (var b = a.return; b !== null; ) {
              if (We(b)) {
                var c = b;
                break a;
              }
              b = b.return;
            }
            throw Error(n(160));
          }
          b = c.stateNode;
          switch (c.tag) {
            case 5:
              var d = false;
              break;
            case 3:
              b = b.containerInfo;
              d = true;
              break;
            case 4:
              b = b.containerInfo;
              d = true;
              break;
            default:
              throw Error(n(161));
          }
          c.effectTag & 16 && (bb(b), c.effectTag &= -17);
          a:
            b:
              for (c = a; ; ) {
                for (; c.sibling === null; ) {
                  if (c.return === null || We(c.return)) {
                    c = null;
                    break a;
                  }
                  c = c.return;
                }
                c.sibling.return = c.return;
                for (c = c.sibling; c.tag !== 5 && c.tag !== 6 && c.tag !== 18; ) {
                  if (c.effectTag & 2)
                    continue b;
                  if (c.child === null || c.tag === 4)
                    continue b;
                  else
                    c.child.return = c, c = c.child;
                }
                if (!(c.effectTag & 2)) {
                  c = c.stateNode;
                  break a;
                }
              }
          d ? Ye(a, c, b) : Ze(a, c, b);
        }
      }
      function Ye(a, b, c) {
        var d = a.tag, e = d === 5 || d === 6;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? Za(c, a, b) : Ua(c, a);
        else if (d !== 4 && (a = a.child, a !== null))
          for (Ye(a, b, c), a = a.sibling; a !== null; )
            Ye(a, b, c), a = a.sibling;
      }
      function Ze(a, b, c) {
        var d = a.tag, e = d === 5 || d === 6;
        if (e)
          a = e ? a.stateNode : a.stateNode.instance, b ? Ya(c, a, b) : Ta(c, a);
        else if (d !== 4 && (a = a.child, a !== null))
          for (Ze(a, b, c), a = a.sibling; a !== null; )
            Ze(a, b, c), a = a.sibling;
      }
      function Se(a, b, c) {
        for (var d = b, e = false, f, g; ; ) {
          if (!e) {
            e = d.return;
            a:
              for (; ; ) {
                if (e === null)
                  throw Error(n(160));
                f = e.stateNode;
                switch (e.tag) {
                  case 5:
                    g = false;
                    break a;
                  case 3:
                    f = f.containerInfo;
                    g = true;
                    break a;
                  case 4:
                    f = f.containerInfo;
                    g = true;
                    break a;
                }
                e = e.return;
              }
            e = true;
          }
          if (d.tag === 5 || d.tag === 6)
            Ue(a, d, c), g ? ab(f, d.stateNode) : $a(f, d.stateNode);
          else if (d.tag === 4) {
            if (d.child !== null) {
              f = d.stateNode.containerInfo;
              g = true;
              d.child.return = d;
              d = d.child;
              continue;
            }
          } else if (Qe(a, d, c), d.child !== null) {
            d.child.return = d;
            d = d.child;
            continue;
          }
          if (d === b)
            break;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === b)
              return;
            d = d.return;
            d.tag === 4 && (e = false);
          }
          d.sibling.return = d.return;
          d = d.sibling;
        }
      }
      function $e(a, b) {
        if (Qa) {
          switch (b.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
            case 22:
              Ne(3, b);
              return;
            case 1:
              return;
            case 5:
              var c = b.stateNode;
              if (c != null) {
                var d = b.memoizedProps;
                a = a !== null ? a.memoizedProps : d;
                var e = b.type, f = b.updateQueue;
                b.updateQueue = null;
                f !== null && Xa(c, f, e, a, d, b);
              }
              return;
            case 6:
              if (b.stateNode === null)
                throw Error(n(162));
              c = b.memoizedProps;
              Va(b.stateNode, a !== null ? a.memoizedProps : c, c);
              return;
            case 3:
              Sa && (b = b.stateNode, b.hydrate && (b.hydrate = false, wb(b.containerInfo)));
              return;
            case 12:
              return;
            case 13:
              af(b);
              bf(b);
              return;
            case 19:
              bf(b);
              return;
            case 17:
              return;
          }
          throw Error(n(163));
        }
        switch (b.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
          case 22:
            Ne(3, b);
            return;
          case 12:
            return;
          case 13:
            af(b);
            bf(b);
            return;
          case 19:
            bf(b);
            return;
          case 3:
            Sa && (c = b.stateNode, c.hydrate && (c.hydrate = false, wb(c.containerInfo)));
        }
        a:
          if (Ra) {
            switch (b.tag) {
              case 1:
              case 5:
              case 6:
              case 20:
                break a;
              case 3:
              case 4:
                b = b.stateNode;
                kb(b.containerInfo, b.pendingChildren);
                break a;
            }
            throw Error(n(163));
          }
      }
      function af(a) {
        var b = a;
        if (a.memoizedState === null)
          var c = false;
        else
          c = true, b = a.child, cf = G();
        if (Qa && b !== null) {
          a:
            if (a = b, Qa)
              for (b = a; ; ) {
                if (b.tag === 5) {
                  var d = b.stateNode;
                  c ? cb(d) : eb(b.stateNode, b.memoizedProps);
                } else if (b.tag === 6)
                  d = b.stateNode, c ? db(d) : fb(d, b.memoizedProps);
                else if (b.tag === 13 && b.memoizedState !== null && b.memoizedState.dehydrated === null) {
                  d = b.child.sibling;
                  d.return = b;
                  b = d;
                  continue;
                } else if (b.child !== null) {
                  b.child.return = b;
                  b = b.child;
                  continue;
                }
                if (b === a)
                  break a;
                for (; b.sibling === null; ) {
                  if (b.return === null || b.return === a)
                    break a;
                  b = b.return;
                }
                b.sibling.return = b.return;
                b = b.sibling;
              }
        }
      }
      function bf(a) {
        var b = a.updateQueue;
        if (b !== null) {
          a.updateQueue = null;
          var c = a.stateNode;
          c === null && (c = a.stateNode = new He());
          b.forEach(function(b2) {
            var d = df.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      var ef = typeof WeakMap === "function" ? WeakMap : Map;
      function ff(a, b, c) {
        c = Ac(c, null);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          gf || (gf = true, hf = d);
          Ie(a, b);
        };
        return c;
      }
      function jf(a, b, c) {
        c = Ac(c, null);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if (typeof d === "function") {
          var e = b.value;
          c.payload = function() {
            Ie(a, b);
            return d(e);
          };
        }
        var f = a.stateNode;
        f !== null && typeof f.componentDidCatch === "function" && (c.callback = function() {
          typeof d !== "function" && (kf === null ? kf = /* @__PURE__ */ new Set([this]) : kf.add(this), Ie(a, b));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: c2 !== null ? c2 : "" });
        });
        return c;
      }
      var lf = Math.ceil, mf = p.ReactCurrentDispatcher, nf = p.ReactCurrentOwner, V = 0, of = 8, pf = 16, qf = 32, ze = 0, rf = 1, sf = 2, Ae = 3, Be = 4, tf = 5, W = V, T = null, X = null, U = 0, S = ze, uf = null, vf = 1073741823, wf = 1073741823, xf = null, Ce = 0, yf = false, cf = 0, zf = 500, Y = null, gf = false, hf = null, kf = null, Af = false, Bf = null, Cf = 90, Df = null, Ef = 0, Ff = null, Gf = 0;
      function Lc() {
        return (W & (pf | qf)) !== V ? 1073741821 - (G() / 10 | 0) : Gf !== 0 ? Gf : Gf = 1073741821 - (G() / 10 | 0);
      }
      function Mc(a, b, c) {
        b = b.mode;
        if ((b & 2) === 0)
          return 1073741823;
        var d = bc();
        if ((b & 4) === 0)
          return d === 99 ? 1073741823 : 1073741822;
        if ((W & pf) !== V)
          return U;
        if (c !== null)
          a = hc(a, c.timeoutMs | 0 || 5e3, 250);
        else
          switch (d) {
            case 99:
              a = 1073741823;
              break;
            case 98:
              a = hc(a, 150, 100);
              break;
            case 97:
            case 96:
              a = hc(a, 5e3, 250);
              break;
            case 95:
              a = 2;
              break;
            default:
              throw Error(n(326));
          }
        T !== null && a === U && --a;
        return a;
      }
      function Nc(a, b) {
        if (50 < Ef)
          throw Ef = 0, Ff = null, Error(n(185));
        a = Hf(a, b);
        if (a !== null) {
          var c = bc();
          b === 1073741823 ? (W & of) !== V && (W & (pf | qf)) === V ? If(a) : (Z(a), W === V && H()) : Z(a);
          (W & 4) === V || c !== 98 && c !== 99 || (Df === null ? Df = /* @__PURE__ */ new Map([[a, b]]) : (c = Df.get(a), (c === void 0 || c > b) && Df.set(a, b)));
        }
      }
      function Hf(a, b) {
        a.expirationTime < b && (a.expirationTime = b);
        var c = a.alternate;
        c !== null && c.expirationTime < b && (c.expirationTime = b);
        var d = a.return, e = null;
        if (d === null && a.tag === 3)
          e = a.stateNode;
        else
          for (; d !== null; ) {
            c = d.alternate;
            d.childExpirationTime < b && (d.childExpirationTime = b);
            c !== null && c.childExpirationTime < b && (c.childExpirationTime = b);
            if (d.return === null && d.tag === 3) {
              e = d.stateNode;
              break;
            }
            d = d.return;
          }
        e !== null && (T === e && (Gc(b), S === Be && De(e, U)), Ee(e, b));
        return e;
      }
      function Jf(a) {
        var b = a.lastExpiredTime;
        if (b !== 0)
          return b;
        b = a.firstPendingTime;
        if (!Kf(a, b))
          return b;
        var c = a.lastPingedTime;
        a = a.nextKnownPendingLevel;
        a = c > a ? c : a;
        return 2 >= a && b !== a ? 0 : a;
      }
      function Z(a) {
        if (a.lastExpiredTime !== 0)
          a.callbackExpirationTime = 1073741823, a.callbackPriority = 99, a.callbackNode = fc(If.bind(null, a));
        else {
          var b = Jf(a), c = a.callbackNode;
          if (b === 0)
            c !== null && (a.callbackNode = null, a.callbackExpirationTime = 0, a.callbackPriority = 90);
          else {
            var d = Lc();
            b === 1073741823 ? d = 99 : b === 1 || b === 2 ? d = 95 : (d = 10 * (1073741821 - b) - 10 * (1073741821 - d), d = 0 >= d ? 99 : 250 >= d ? 98 : 5250 >= d ? 97 : 95);
            if (c !== null) {
              var e = a.callbackPriority;
              if (a.callbackExpirationTime === b && e >= d)
                return;
              c !== Vb && Mb(c);
            }
            a.callbackExpirationTime = b;
            a.callbackPriority = d;
            b = b === 1073741823 ? fc(If.bind(null, a)) : ec(d, Lf.bind(null, a), { timeout: 10 * (1073741821 - b) - G() });
            a.callbackNode = b;
          }
        }
      }
      function Lf(a, b) {
        Gf = 0;
        if (b)
          return b = Lc(), Mf(a, b), Z(a), null;
        var c = Jf(a);
        if (c !== 0) {
          b = a.callbackNode;
          if ((W & (pf | qf)) !== V)
            throw Error(n(327));
          Nf();
          a === T && c === U || Of(a, c);
          if (X !== null) {
            var d = W;
            W |= pf;
            var e = Pf();
            do
              try {
                Qf();
                break;
              } catch (h) {
                Rf(a, h);
              }
            while (1);
            rc();
            W = d;
            mf.current = e;
            if (S === rf)
              throw b = uf, Of(a, c), De(a, c), Z(a), b;
            if (X === null)
              switch (e = a.finishedWork = a.current.alternate, a.finishedExpirationTime = c, d = S, T = null, d) {
                case ze:
                case rf:
                  throw Error(n(345));
                case sf:
                  Mf(a, 2 < c ? 2 : c);
                  break;
                case Ae:
                  De(a, c);
                  d = a.lastSuspendedTime;
                  c === d && (a.nextKnownPendingLevel = Sf(e));
                  if (vf === 1073741823 && (e = cf + zf - G(), 10 < e)) {
                    if (yf) {
                      var f = a.lastPingedTime;
                      if (f === 0 || f >= c) {
                        a.lastPingedTime = c;
                        Of(a, c);
                        break;
                      }
                    }
                    f = Jf(a);
                    if (f !== 0 && f !== c)
                      break;
                    if (d !== 0 && d !== c) {
                      a.lastPingedTime = d;
                      break;
                    }
                    a.timeoutHandle = Ma(Tf.bind(null, a), e);
                    break;
                  }
                  Tf(a);
                  break;
                case Be:
                  De(a, c);
                  d = a.lastSuspendedTime;
                  c === d && (a.nextKnownPendingLevel = Sf(e));
                  if (yf && (e = a.lastPingedTime, e === 0 || e >= c)) {
                    a.lastPingedTime = c;
                    Of(a, c);
                    break;
                  }
                  e = Jf(a);
                  if (e !== 0 && e !== c)
                    break;
                  if (d !== 0 && d !== c) {
                    a.lastPingedTime = d;
                    break;
                  }
                  wf !== 1073741823 ? d = 10 * (1073741821 - wf) - G() : vf === 1073741823 ? d = 0 : (d = 10 * (1073741821 - vf) - 5e3, e = G(), c = 10 * (1073741821 - c) - e, d = e - d, 0 > d && (d = 0), d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lf(d / 1960)) - d, c < d && (d = c));
                  if (10 < d) {
                    a.timeoutHandle = Ma(Tf.bind(null, a), d);
                    break;
                  }
                  Tf(a);
                  break;
                case tf:
                  if (vf !== 1073741823 && xf !== null) {
                    f = vf;
                    var g = xf;
                    d = g.busyMinDurationMs | 0;
                    0 >= d ? d = 0 : (e = g.busyDelayMs | 0, f = G() - (10 * (1073741821 - f) - (g.timeoutMs | 0 || 5e3)), d = f <= e ? 0 : e + d - f);
                    if (10 < d) {
                      De(a, c);
                      a.timeoutHandle = Ma(Tf.bind(null, a), d);
                      break;
                    }
                  }
                  Tf(a);
                  break;
                default:
                  throw Error(n(329));
              }
            Z(a);
            if (a.callbackNode === b)
              return Lf.bind(null, a);
          }
        }
        return null;
      }
      function If(a) {
        var b = a.lastExpiredTime;
        b = b !== 0 ? b : 1073741823;
        if ((W & (pf | qf)) !== V)
          throw Error(n(327));
        Nf();
        a === T && b === U || Of(a, b);
        if (X !== null) {
          var c = W;
          W |= pf;
          var d = Pf();
          do
            try {
              Uf();
              break;
            } catch (e) {
              Rf(a, e);
            }
          while (1);
          rc();
          W = c;
          mf.current = d;
          if (S === rf)
            throw c = uf, Of(a, b), De(a, b), Z(a), c;
          if (X !== null)
            throw Error(n(261));
          a.finishedWork = a.current.alternate;
          a.finishedExpirationTime = b;
          T = null;
          Tf(a);
          Z(a);
        }
        return null;
      }
      function Vf(a, b) {
        Mf(a, b);
        Z(a);
        (W & (pf | qf)) === V && H();
      }
      function Wf() {
        if (Df !== null) {
          var a = Df;
          Df = null;
          a.forEach(function(a2, c) {
            Mf(c, a2);
            Z(c);
          });
          H();
        }
      }
      function Xf(a, b) {
        var c = W;
        W |= 1;
        try {
          return a(b);
        } finally {
          W = c, W === V && H();
        }
      }
      function Yf(a, b) {
        if ((W & (pf | qf)) !== V)
          throw Error(n(187));
        var c = W;
        W |= 1;
        try {
          return dc(99, a.bind(null, b));
        } finally {
          W = c, H();
        }
      }
      function Of(a, b) {
        a.finishedWork = null;
        a.finishedExpirationTime = 0;
        var c = a.timeoutHandle;
        c !== Oa && (a.timeoutHandle = Oa, Na(c));
        if (X !== null)
          for (c = X.return; c !== null; ) {
            var d = c;
            switch (d.tag) {
              case 1:
                d = d.type.childContextTypes;
                d !== null && d !== void 0 && Fb();
                break;
              case 3:
                id2();
                B(E);
                B(D);
                break;
              case 5:
                kd(d);
                break;
              case 4:
                id2();
                break;
              case 13:
                B(K);
                break;
              case 19:
                B(K);
                break;
              case 10:
                tc(d);
            }
            c = c.return;
          }
        T = a;
        X = Xc(a.current, null);
        U = b;
        S = ze;
        uf = null;
        wf = vf = 1073741823;
        xf = null;
        Ce = 0;
        yf = false;
      }
      function Rf(a, b) {
        do {
          try {
            rc();
            nd.current = vd;
            if (pd)
              for (var c = M.memoizedState; c !== null; ) {
                var d = c.queue;
                d !== null && (d.pending = null);
                c = c.next;
              }
            od = 0;
            O = N = M = null;
            pd = false;
            if (X === null || X.return === null)
              return S = rf, uf = b, X = null;
            a: {
              var e = a, f = X.return, g = X, h = b;
              b = U;
              g.effectTag |= 2048;
              g.firstEffect = g.lastEffect = null;
              if (h !== null && typeof h === "object" && typeof h.then === "function") {
                var k = h;
                if ((g.mode & 2) === 0) {
                  var l = g.alternate;
                  l ? (g.updateQueue = l.updateQueue, g.memoizedState = l.memoizedState, g.expirationTime = l.expirationTime) : (g.updateQueue = null, g.memoizedState = null);
                }
                var q = (K.current & 1) !== 0, r = f;
                do {
                  var w;
                  if (w = r.tag === 13) {
                    var z = r.memoizedState;
                    if (z !== null)
                      w = z.dehydrated !== null ? true : false;
                    else {
                      var Q = r.memoizedProps;
                      w = Q.fallback === void 0 ? false : Q.unstable_avoidThisFallback !== true ? true : q ? false : true;
                    }
                  }
                  if (w) {
                    var A = r.updateQueue;
                    if (A === null) {
                      var v = /* @__PURE__ */ new Set();
                      v.add(k);
                      r.updateQueue = v;
                    } else
                      A.add(k);
                    if ((r.mode & 2) === 0) {
                      r.effectTag |= 64;
                      g.effectTag &= -2981;
                      if (g.tag === 1)
                        if (g.alternate === null)
                          g.tag = 17;
                        else {
                          var t = Ac(1073741823, null);
                          t.tag = 2;
                          Bc(g, t);
                        }
                      g.expirationTime = 1073741823;
                      break a;
                    }
                    h = void 0;
                    g = b;
                    var x = e.pingCache;
                    x === null ? (x = e.pingCache = new ef(), h = /* @__PURE__ */ new Set(), x.set(k, h)) : (h = x.get(k), h === void 0 && (h = /* @__PURE__ */ new Set(), x.set(k, h)));
                    if (!h.has(g)) {
                      h.add(g);
                      var ke = cg.bind(null, e, k, g);
                      k.then(ke, ke);
                    }
                    r.effectTag |= 4096;
                    r.expirationTime = b;
                    break a;
                  }
                  r = r.return;
                } while (r !== null);
                h = Error((ua(g.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + zb(g));
              }
              S !== tf && (S = sf);
              h = Ge(h, g);
              r = f;
              do {
                switch (r.tag) {
                  case 3:
                    k = h;
                    r.effectTag |= 4096;
                    r.expirationTime = b;
                    var Zf = ff(r, k, b);
                    Cc(r, Zf);
                    break a;
                  case 1:
                    k = h;
                    var $f = r.type, Fc = r.stateNode;
                    if ((r.effectTag & 64) === 0 && (typeof $f.getDerivedStateFromError === "function" || Fc !== null && typeof Fc.componentDidCatch === "function" && (kf === null || !kf.has(Fc)))) {
                      r.effectTag |= 4096;
                      r.expirationTime = b;
                      var ag = jf(r, k, b);
                      Cc(r, ag);
                      break a;
                    }
                }
                r = r.return;
              } while (r !== null);
            }
            X = dg(X);
          } catch (bg) {
            b = bg;
            continue;
          }
          break;
        } while (1);
      }
      function Pf() {
        var a = mf.current;
        mf.current = vd;
        return a === null ? vd : a;
      }
      function Ec(a, b) {
        a < vf && 2 < a && (vf = a);
        b !== null && a < wf && 2 < a && (wf = a, xf = b);
      }
      function Gc(a) {
        a > Ce && (Ce = a);
      }
      function Uf() {
        for (; X !== null; )
          X = eg(X);
      }
      function Qf() {
        for (; X !== null && !Wb(); )
          X = eg(X);
      }
      function eg(a) {
        var b = fg(a.alternate, a, U);
        a.memoizedProps = a.pendingProps;
        b === null && (b = dg(a));
        nf.current = null;
        return b;
      }
      function dg(a) {
        X = a;
        do {
          var b = X.alternate;
          a = X.return;
          if ((X.effectTag & 2048) === 0) {
            b = ye(b, X, U);
            if (U === 1 || X.childExpirationTime !== 1) {
              for (var c = 0, d = X.child; d !== null; ) {
                var e = d.expirationTime, f = d.childExpirationTime;
                e > c && (c = e);
                f > c && (c = f);
                d = d.sibling;
              }
              X.childExpirationTime = c;
            }
            if (b !== null)
              return b;
            a !== null && (a.effectTag & 2048) === 0 && (a.firstEffect === null && (a.firstEffect = X.firstEffect), X.lastEffect !== null && (a.lastEffect !== null && (a.lastEffect.nextEffect = X.firstEffect), a.lastEffect = X.lastEffect), 1 < X.effectTag && (a.lastEffect !== null ? a.lastEffect.nextEffect = X : a.firstEffect = X, a.lastEffect = X));
          } else {
            b = Fe(X);
            if (b !== null)
              return b.effectTag &= 2047, b;
            a !== null && (a.firstEffect = a.lastEffect = null, a.effectTag |= 2048);
          }
          b = X.sibling;
          if (b !== null)
            return b;
          X = a;
        } while (X !== null);
        S === ze && (S = tf);
        return null;
      }
      function Sf(a) {
        var b = a.expirationTime;
        a = a.childExpirationTime;
        return b > a ? b : a;
      }
      function Tf(a) {
        var b = bc();
        dc(99, gg.bind(null, a, b));
        return null;
      }
      function gg(a, b) {
        do
          Nf();
        while (Bf !== null);
        if ((W & (pf | qf)) !== V)
          throw Error(n(327));
        var c = a.finishedWork, d = a.finishedExpirationTime;
        if (c === null)
          return null;
        a.finishedWork = null;
        a.finishedExpirationTime = 0;
        if (c === a.current)
          throw Error(n(177));
        a.callbackNode = null;
        a.callbackExpirationTime = 0;
        a.callbackPriority = 90;
        a.nextKnownPendingLevel = 0;
        var e = Sf(c);
        a.firstPendingTime = e;
        d <= a.lastSuspendedTime ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : d <= a.firstSuspendedTime && (a.firstSuspendedTime = d - 1);
        d <= a.lastPingedTime && (a.lastPingedTime = 0);
        d <= a.lastExpiredTime && (a.lastExpiredTime = 0);
        a === T && (X = T = null, U = 0);
        1 < c.effectTag ? c.lastEffect !== null ? (c.lastEffect.nextEffect = c, e = c.firstEffect) : e = c : e = c.firstEffect;
        if (e !== null) {
          var f = W;
          W |= qf;
          nf.current = null;
          Da(a.containerInfo);
          Y = e;
          do
            try {
              hg();
            } catch (t) {
              if (Y === null)
                throw Error(n(330));
              Ke(Y, t);
              Y = Y.nextEffect;
            }
          while (Y !== null);
          Y = e;
          do
            try {
              for (var g = a, h = b; Y !== null; ) {
                var k = Y.effectTag;
                k & 16 && Qa && bb(Y.stateNode);
                if (k & 128) {
                  var l = Y.alternate;
                  if (l !== null) {
                    var q = l.ref;
                    q !== null && (typeof q === "function" ? q(null) : q.current = null);
                  }
                }
                switch (k & 1038) {
                  case 2:
                    Xe(Y);
                    Y.effectTag &= -3;
                    break;
                  case 6:
                    Xe(Y);
                    Y.effectTag &= -3;
                    $e(Y.alternate, Y);
                    break;
                  case 1024:
                    Y.effectTag &= -1025;
                    break;
                  case 1028:
                    Y.effectTag &= -1025;
                    $e(Y.alternate, Y);
                    break;
                  case 4:
                    $e(Y.alternate, Y);
                    break;
                  case 8:
                    var r = g, w = Y, z = h;
                    Qa ? Se(r, w, z) : Ue(r, w, z);
                    Ve(w);
                }
                Y = Y.nextEffect;
              }
            } catch (t) {
              if (Y === null)
                throw Error(n(330));
              Ke(Y, t);
              Y = Y.nextEffect;
            }
          while (Y !== null);
          Ea(a.containerInfo);
          a.current = c;
          Y = e;
          do
            try {
              for (k = a; Y !== null; ) {
                var Q = Y.effectTag;
                Q & 36 && Pe(k, Y.alternate, Y);
                if (Q & 128) {
                  l = void 0;
                  var A = Y.ref;
                  if (A !== null) {
                    var v = Y.stateNode;
                    switch (Y.tag) {
                      case 5:
                        l = Aa(v);
                        break;
                      default:
                        l = v;
                    }
                    typeof A === "function" ? A(l) : A.current = l;
                  }
                }
                Y = Y.nextEffect;
              }
            } catch (t) {
              if (Y === null)
                throw Error(n(330));
              Ke(Y, t);
              Y = Y.nextEffect;
            }
          while (Y !== null);
          Y = null;
          Xb();
          W = f;
        } else
          a.current = c;
        if (Af)
          Af = false, Bf = a, Cf = b;
        else
          for (Y = e; Y !== null; )
            b = Y.nextEffect, Y.nextEffect = null, Y = b;
        b = a.firstPendingTime;
        b === 0 && (kf = null);
        b === 1073741823 ? a === Ff ? Ef++ : (Ef = 0, Ff = a) : Ef = 0;
        typeof ig === "function" && ig(c.stateNode, d);
        Z(a);
        if (gf)
          throw gf = false, a = hf, hf = null, a;
        if ((W & of) !== V)
          return null;
        H();
        return null;
      }
      function hg() {
        for (; Y !== null; ) {
          var a = Y.effectTag;
          (a & 256) !== 0 && Me(Y.alternate, Y);
          (a & 512) === 0 || Af || (Af = true, ec(97, function() {
            Nf();
            return null;
          }));
          Y = Y.nextEffect;
        }
      }
      function Nf() {
        if (Cf !== 90) {
          var a = 97 < Cf ? 97 : Cf;
          Cf = 90;
          return dc(a, jg);
        }
      }
      function jg() {
        if (Bf === null)
          return false;
        var a = Bf;
        Bf = null;
        if ((W & (pf | qf)) !== V)
          throw Error(n(331));
        var b = W;
        W |= qf;
        for (a = a.current.firstEffect; a !== null; ) {
          try {
            var c = a;
            if ((c.effectTag & 512) !== 0)
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                case 22:
                  Ne(5, c), Oe(5, c);
              }
          } catch (d) {
            if (a === null)
              throw Error(n(330));
            Ke(a, d);
          }
          c = a.nextEffect;
          a.nextEffect = null;
          a = c;
        }
        W = b;
        H();
        return true;
      }
      function kg(a, b, c) {
        b = Ge(c, b);
        b = ff(a, b, 1073741823);
        Bc(a, b);
        a = Hf(a, 1073741823);
        a !== null && Z(a);
      }
      function Ke(a, b) {
        if (a.tag === 3)
          kg(a, a, b);
        else
          for (var c = a.return; c !== null; ) {
            if (c.tag === 3) {
              kg(c, a, b);
              break;
            } else if (c.tag === 1) {
              var d = c.stateNode;
              if (typeof c.type.getDerivedStateFromError === "function" || typeof d.componentDidCatch === "function" && (kf === null || !kf.has(d))) {
                a = Ge(b, a);
                a = jf(c, a, 1073741823);
                Bc(c, a);
                c = Hf(c, 1073741823);
                c !== null && Z(c);
                break;
              }
            }
            c = c.return;
          }
      }
      function cg(a, b, c) {
        var d = a.pingCache;
        d !== null && d.delete(b);
        T === a && U === c ? S === Be || S === Ae && vf === 1073741823 && G() - cf < zf ? Of(a, U) : yf = true : Kf(a, c) && (b = a.lastPingedTime, b !== 0 && b < c || (a.lastPingedTime = c, Z(a)));
      }
      function df(a, b) {
        var c = a.stateNode;
        c !== null && c.delete(b);
        b = 0;
        b === 0 && (b = Lc(), b = Mc(b, a, null));
        a = Hf(a, b);
        a !== null && Z(a);
      }
      var fg;
      fg = function(a, b, c) {
        var d = b.expirationTime;
        if (a !== null) {
          var e = b.pendingProps;
          if (a.memoizedProps !== e || E.current)
            wc = true;
          else {
            if (d < c) {
              wc = false;
              switch (b.tag) {
                case 3:
                  le(b);
                  $d();
                  break;
                case 5:
                  jd(b);
                  if (b.mode & 4 && c !== 1 && Ka(b.type, e))
                    return b.expirationTime = b.childExpirationTime = 1, null;
                  break;
                case 1:
                  F(b.type) && Ib(b);
                  break;
                case 4:
                  hd(b, b.stateNode.containerInfo);
                  break;
                case 10:
                  sc(b, b.memoizedProps.value);
                  break;
                case 13:
                  if (b.memoizedState !== null) {
                    d = b.child.childExpirationTime;
                    if (d !== 0 && d >= c)
                      return ne(a, b, c);
                    C(K, K.current & 1);
                    b = ce(a, b, c);
                    return b !== null ? b.sibling : null;
                  }
                  C(K, K.current & 1);
                  break;
                case 19:
                  d = b.childExpirationTime >= c;
                  if ((a.effectTag & 64) !== 0) {
                    if (d)
                      return qe(a, b, c);
                    b.effectTag |= 64;
                  }
                  e = b.memoizedState;
                  e !== null && (e.rendering = null, e.tail = null);
                  C(K, K.current);
                  if (!d)
                    return null;
              }
              return ce(a, b, c);
            }
            wc = false;
          }
        } else
          wc = false;
        b.expirationTime = 0;
        switch (b.tag) {
          case 2:
            d = b.type;
            a !== null && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
            a = b.pendingProps;
            e = Eb(b, D.current);
            vc(b, c);
            e = rd(null, b, d, a, e, c);
            b.effectTag |= 1;
            if (typeof e === "object" && e !== null && typeof e.render === "function" && e.$$typeof === void 0) {
              b.tag = 1;
              b.memoizedState = null;
              b.updateQueue = null;
              if (F(d)) {
                var f = true;
                Ib(b);
              } else
                f = false;
              b.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null;
              yc(b);
              var g = d.getDerivedStateFromProps;
              typeof g === "function" && Kc(b, d, g, a);
              e.updater = Oc;
              b.stateNode = e;
              e._reactInternalFiber = b;
              Sc(b, d, a, c);
              b = je(null, b, d, true, f, c);
            } else
              b.tag = 0, R(null, b, e, c), b = b.child;
            return b;
          case 16:
            a: {
              e = b.elementType;
              a !== null && (a.alternate = null, b.alternate = null, b.effectTag |= 2);
              a = b.pendingProps;
              ta(e);
              if (e._status !== 1)
                throw e._result;
              e = e._result;
              b.type = e;
              f = b.tag = lg(e);
              a = mc(e, a);
              switch (f) {
                case 0:
                  b = ge(null, b, e, a, c);
                  break a;
                case 1:
                  b = ie(null, b, e, a, c);
                  break a;
                case 11:
                  b = be(null, b, e, a, c);
                  break a;
                case 14:
                  b = de(null, b, e, mc(e.type, a), d, c);
                  break a;
              }
              throw Error(n(306, e, ""));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), ge(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), ie(a, b, d, e, c);
          case 3:
            le(b);
            d = b.updateQueue;
            if (a === null || d === null)
              throw Error(n(282));
            d = b.pendingProps;
            e = b.memoizedState;
            e = e !== null ? e.element : null;
            zc(a, b);
            Dc(b, d, null, c);
            d = b.memoizedState.element;
            if (d === e)
              $d(), b = ce(a, b, c);
            else {
              if (e = b.stateNode.hydrate)
                Sa ? (Sd = sb(b.stateNode.containerInfo), Rd = b, e = Td = true) : e = false;
              if (e)
                for (c = cd(b, null, d, c), b.child = c; c; )
                  c.effectTag = c.effectTag & -3 | 1024, c = c.sibling;
              else
                R(a, b, d, c), $d();
              b = b.child;
            }
            return b;
          case 5:
            return jd(b), a === null && Xd(b), d = b.type, e = b.pendingProps, f = a !== null ? a.memoizedProps : null, g = e.children, Ja(d, e) ? g = null : f !== null && Ja(d, f) && (b.effectTag |= 16), he(a, b), b.mode & 4 && c !== 1 && Ka(d, e) ? (b.expirationTime = b.childExpirationTime = 1, b = null) : (R(a, b, g, c), b = b.child), b;
          case 6:
            return a === null && Xd(b), null;
          case 13:
            return ne(a, b, c);
          case 4:
            return hd(b, b.stateNode.containerInfo), d = b.pendingProps, a === null ? b.child = bd(b, null, d, c) : R(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), be(a, b, d, e, c);
          case 7:
            return R(a, b, b.pendingProps, c), b.child;
          case 8:
            return R(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return R(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              g = b.memoizedProps;
              f = e.value;
              sc(b, f);
              if (g !== null) {
                var h = g.value;
                f = jc(h, f) ? 0 : (typeof d._calculateChangedBits === "function" ? d._calculateChangedBits(h, f) : 1073741823) | 0;
                if (f === 0) {
                  if (g.children === e.children && !E.current) {
                    b = ce(a, b, c);
                    break a;
                  }
                } else
                  for (h = b.child, h !== null && (h.return = b); h !== null; ) {
                    var k = h.dependencies;
                    if (k !== null) {
                      g = h.child;
                      for (var l = k.firstContext; l !== null; ) {
                        if (l.context === d && (l.observedBits & f) !== 0) {
                          h.tag === 1 && (l = Ac(c, null), l.tag = 2, Bc(h, l));
                          h.expirationTime < c && (h.expirationTime = c);
                          l = h.alternate;
                          l !== null && l.expirationTime < c && (l.expirationTime = c);
                          uc(h.return, c);
                          k.expirationTime < c && (k.expirationTime = c);
                          break;
                        }
                        l = l.next;
                      }
                    } else
                      g = h.tag === 10 ? h.type === b.type ? null : h.child : h.child;
                    if (g !== null)
                      g.return = h;
                    else
                      for (g = h; g !== null; ) {
                        if (g === b) {
                          g = null;
                          break;
                        }
                        h = g.sibling;
                        if (h !== null) {
                          h.return = g.return;
                          g = h;
                          break;
                        }
                        g = g.return;
                      }
                    h = g;
                  }
              }
              R(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, f = b.pendingProps, d = f.children, vc(b, c), e = I(e, f.unstable_observedBits), d = d(e), b.effectTag |= 1, R(a, b, d, c), b.child;
          case 14:
            return e = b.type, f = mc(e, b.pendingProps), f = mc(e.type, f), de(a, b, e, f, d, c);
          case 15:
            return fe(a, b, b.type, b.pendingProps, d, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : mc(d, e), a !== null && (a.alternate = null, b.alternate = null, b.effectTag |= 2), b.tag = 1, F(d) ? (a = true, Ib(b)) : a = false, vc(b, c), Qc(b, d, e), Sc(b, d, e, c), je(null, b, d, true, a, c);
          case 19:
            return qe(a, b, c);
        }
        throw Error(n(156, b.tag));
      };
      var mg = { current: false }, ig = null, Re = null;
      function ng(a) {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined")
          return false;
        var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (b.isDisabled || !b.supportsFiber)
          return true;
        try {
          var c = b.inject(a);
          ig = function(a2) {
            try {
              b.onCommitFiberRoot(c, a2, void 0, (a2.current.effectTag & 64) === 64);
            } catch (e) {
            }
          };
          Re = function(a2) {
            try {
              b.onCommitFiberUnmount(c, a2);
            } catch (e) {
            }
          };
        } catch (d) {
        }
        return true;
      }
      function og(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.effectTag = 0;
        this.lastEffect = this.firstEffect = this.nextEffect = null;
        this.childExpirationTime = this.expirationTime = 0;
        this.alternate = null;
      }
      function Vd(a, b, c, d) {
        return new og(a, b, c, d);
      }
      function ee(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function lg(a) {
        if (typeof a === "function")
          return ee(a) ? 1 : 0;
        if (a !== void 0 && a !== null) {
          a = a.$$typeof;
          if (a === la)
            return 11;
          if (a === oa)
            return 14;
        }
        return 2;
      }
      function Xc(a, b) {
        var c = a.alternate;
        c === null ? (c = Vd(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.effectTag = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
        c.childExpirationTime = a.childExpirationTime;
        c.expirationTime = a.expirationTime;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = b === null ? null : {
          expirationTime: b.expirationTime,
          firstContext: b.firstContext,
          responders: b.responders
        };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Zc(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if (typeof a === "function")
          ee(a) && (g = 1);
        else if (typeof a === "string")
          g = 5;
        else
          a:
            switch (a) {
              case ea:
                return ad(c.children, e, f, b);
              case ka:
                g = 8;
                e |= 7;
                break;
              case fa:
                g = 8;
                e |= 1;
                break;
              case ha:
                return a = Vd(12, c, b, e | 8), a.elementType = ha, a.type = ha, a.expirationTime = f, a;
              case ma:
                return a = Vd(13, c, b, e), a.type = ma, a.elementType = ma, a.expirationTime = f, a;
              case na:
                return a = Vd(19, c, b, e), a.elementType = na, a.expirationTime = f, a;
              default:
                if (typeof a === "object" && a !== null)
                  switch (a.$$typeof) {
                    case ia:
                      g = 10;
                      break a;
                    case ja:
                      g = 9;
                      break a;
                    case la:
                      g = 11;
                      break a;
                    case oa:
                      g = 14;
                      break a;
                    case pa:
                      g = 16;
                      d = null;
                      break a;
                    case qa:
                      g = 22;
                      break a;
                  }
                throw Error(n(130, a == null ? a : typeof a, ""));
            }
        b = Vd(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.expirationTime = f;
        return b;
      }
      function ad(a, b, c, d) {
        a = Vd(7, a, d, b);
        a.expirationTime = c;
        return a;
      }
      function Yc(a, b, c) {
        a = Vd(6, a, null, b);
        a.expirationTime = c;
        return a;
      }
      function $c(a, b, c) {
        b = Vd(4, a.children !== null ? a.children : [], a.key, b);
        b.expirationTime = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function pg(a, b, c) {
        this.tag = b;
        this.current = null;
        this.containerInfo = a;
        this.pingCache = this.pendingChildren = null;
        this.finishedExpirationTime = 0;
        this.finishedWork = null;
        this.timeoutHandle = Oa;
        this.pendingContext = this.context = null;
        this.hydrate = c;
        this.callbackNode = null;
        this.callbackPriority = 90;
        this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
      }
      function Kf(a, b) {
        var c = a.firstSuspendedTime;
        a = a.lastSuspendedTime;
        return c !== 0 && c >= b && a <= b;
      }
      function De(a, b) {
        var c = a.firstSuspendedTime, d = a.lastSuspendedTime;
        c < b && (a.firstSuspendedTime = b);
        if (d > b || c === 0)
          a.lastSuspendedTime = b;
        b <= a.lastPingedTime && (a.lastPingedTime = 0);
        b <= a.lastExpiredTime && (a.lastExpiredTime = 0);
      }
      function Ee(a, b) {
        b > a.firstPendingTime && (a.firstPendingTime = b);
        var c = a.firstSuspendedTime;
        c !== 0 && (b >= c ? a.firstSuspendedTime = a.lastSuspendedTime = a.nextKnownPendingLevel = 0 : b >= a.lastSuspendedTime && (a.lastSuspendedTime = b + 1), b > a.nextKnownPendingLevel && (a.nextKnownPendingLevel = b));
      }
      function Mf(a, b) {
        var c = a.lastExpiredTime;
        if (c === 0 || c > b)
          a.lastExpiredTime = b;
      }
      var qg = null;
      function rg(a) {
        if (qg === null)
          try {
            var b = ("require" + Math.random()).slice(0, 7);
            qg = (module && module[b])("timers").setImmediate;
          } catch (c) {
            qg = function(a2) {
              var b2 = new MessageChannel();
              b2.port1.onmessage = a2;
              b2.port2.postMessage(void 0);
            };
          }
        return qg(a);
      }
      function sg(a) {
        var b = a._reactInternalFiber;
        if (b === void 0) {
          if (typeof a.render === "function")
            throw Error(n(188));
          throw Error(n(268, Object.keys(a)));
        }
        a = ya(b);
        return a === null ? null : a.stateNode;
      }
      function tg(a, b) {
        a = a.memoizedState;
        a !== null && a.dehydrated !== null && a.retryTime < b && (a.retryTime = b);
      }
      function ug(a, b) {
        tg(a, b);
        (a = a.alternate) && tg(a, b);
      }
      var vg = p.IsSomeRendererActing, wg = typeof m.unstable_flushAllWithoutAsserting === "function", xg = m.unstable_flushAllWithoutAsserting || function() {
        for (var a = false; Nf(); )
          a = true;
        return a;
      };
      function yg(a) {
        try {
          xg(), rg(function() {
            xg() ? yg(a) : a();
          });
        } catch (b) {
          a(b);
        }
      }
      var zg = 0, Ag = false, Bg = { __proto__: null, createContainer: function(a, b, c) {
        a = new pg(a, b, c);
        b = Vd(3, null, null, b === 2 ? 7 : b === 1 ? 3 : 0);
        a.current = b;
        b.stateNode = a;
        yc(b);
        return a;
      }, updateContainer: function(a, b, c, d) {
        var e = b.current, f = Lc(), g = Ic.suspense;
        f = Mc(f, e, g);
        a:
          if (c) {
            c = c._reactInternalFiber;
            b: {
              if (va(c) !== c || c.tag !== 1)
                throw Error(n(170));
              var h = c;
              do {
                switch (h.tag) {
                  case 3:
                    h = h.stateNode.context;
                    break b;
                  case 1:
                    if (F(h.type)) {
                      h = h.stateNode.__reactInternalMemoizedMergedChildContext;
                      break b;
                    }
                }
                h = h.return;
              } while (h !== null);
              throw Error(n(171));
            }
            if (c.tag === 1) {
              var k = c.type;
              if (F(k)) {
                c = Hb(c, k, h);
                break a;
              }
            }
            c = h;
          } else
            c = Cb;
        b.context === null ? b.context = c : b.pendingContext = c;
        b = Ac(f, g);
        b.payload = { element: a };
        d = d === void 0 ? null : d;
        d !== null && (b.callback = d);
        Bc(e, b);
        Nc(e, f);
        return f;
      }, batchedEventUpdates: function(a, b) {
        var c = W;
        W |= 2;
        try {
          return a(b);
        } finally {
          W = c, W === V && H();
        }
      }, batchedUpdates: Xf, unbatchedUpdates: function(a, b) {
        var c = W;
        W &= -2;
        W |= of;
        try {
          return a(b);
        } finally {
          W = c, W === V && H();
        }
      }, deferredUpdates: function(a) {
        return dc(97, a);
      }, syncUpdates: function(a, b, c, d) {
        return dc(99, a.bind(null, b, c, d));
      }, discreteUpdates: function(a, b, c, d, e) {
        var f = W;
        W |= 4;
        try {
          return dc(98, a.bind(null, b, c, d, e));
        } finally {
          W = f, W === V && H();
        }
      }, flushDiscreteUpdates: function() {
        (W & (1 | pf | qf)) === V && (Wf(), Nf());
      }, flushControlled: function(a) {
        var b = W;
        W |= 1;
        try {
          dc(99, a);
        } finally {
          W = b, W === V && H();
        }
      }, flushSync: Yf, flushPassiveEffects: Nf, IsThisRendererActing: mg, getPublicRootInstance: function(a) {
        a = a.current;
        if (!a.child)
          return null;
        switch (a.child.tag) {
          case 5:
            return Aa(a.child.stateNode);
          default:
            return a.child.stateNode;
        }
      }, attemptSynchronousHydration: function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            b.hydrate && Vf(b, b.firstPendingTime);
            break;
          case 13:
            Yf(function() {
              return Nc(a, 1073741823);
            }), b = hc(Lc(), 150, 100), ug(a, b);
        }
      }, attemptUserBlockingHydration: function(a) {
        if (a.tag === 13) {
          var b = hc(Lc(), 150, 100);
          Nc(a, b);
          ug(a, b);
        }
      }, attemptContinuousHydration: function(a) {
        a.tag === 13 && (Nc(a, 3), ug(a, 3));
      }, attemptHydrationAtCurrentPriority: function(a) {
        if (a.tag === 13) {
          var b = Lc();
          b = Mc(b, a, null);
          Nc(a, b);
          ug(a, b);
        }
      }, findHostInstance: sg, findHostInstanceWithWarning: function(a) {
        return sg(a);
      }, findHostInstanceWithNoPortals: function(a) {
        a = za(a);
        return a === null ? null : a.tag === 20 ? a.stateNode.instance : a.stateNode;
      }, shouldSuspend: function() {
        return false;
      }, injectIntoDevTools: function(a) {
        var b = a.findFiberByHostInstance;
        return ng(aa({}, a, {
          overrideHookState: null,
          overrideProps: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: p.ReactCurrentDispatcher,
          findHostInstanceByFiber: function(a2) {
            a2 = ya(a2);
            return a2 === null ? null : a2.stateNode;
          },
          findFiberByHostInstance: function(a2) {
            return b ? b(a2) : null;
          },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null
        }));
      }, act: function(a) {
        function b() {
          zg--;
          vg.current = c;
          mg.current = d;
        }
        Ag === false && (Ag = true, console.error("act(...) is not supported in production builds of React, and might not behave as expected."));
        zg++;
        var c = vg.current;
        var d = mg.current;
        vg.current = true;
        mg.current = true;
        try {
          var e = Xf(a);
        } catch (f) {
          throw b(), f;
        }
        if (e !== null && typeof e === "object" && typeof e.then === "function")
          return { then: function(a2, d2) {
            e.then(function() {
              1 < zg || wg === true && c === true ? (b(), a2()) : yg(function(c2) {
                b();
                c2 ? d2(c2) : a2();
              });
            }, function(a3) {
              b();
              d2(a3);
            });
          } };
        try {
          zg !== 1 || wg !== false && c !== false || xg(), b();
        } catch (f) {
          throw b(), f;
        }
        return { then: function(a2) {
          a2();
        } };
      } }, Cg = Bg && Bg["default"] || Bg;
      module.exports = Cg.default || Cg;
      var $$$renderer = module.exports;
      module.exports = $$$reconciler;
      return $$$renderer;
    };
  }
});

// node_modules/scheduler/cjs/scheduler-tracing.production.min.js
var require_scheduler_tracing_production_min = __commonJS({
  "node_modules/scheduler/cjs/scheduler-tracing.production.min.js"(exports) {
    "use strict";
    var b = 0;
    exports.__interactionsRef = null;
    exports.__subscriberRef = null;
    exports.unstable_clear = function(a) {
      return a();
    };
    exports.unstable_getCurrent = function() {
      return null;
    };
    exports.unstable_getThreadID = function() {
      return ++b;
    };
    exports.unstable_subscribe = function() {
    };
    exports.unstable_trace = function(a, d, c) {
      return c();
    };
    exports.unstable_unsubscribe = function() {
    };
    exports.unstable_wrap = function(a) {
      return a;
    };
  }
});

// node_modules/scheduler/cjs/scheduler-tracing.development.js
var require_scheduler_tracing_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler-tracing.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var DEFAULT_THREAD_ID = 0;
        var interactionIDCounter = 0;
        var threadIDCounter = 0;
        exports.__interactionsRef = null;
        exports.__subscriberRef = null;
        {
          exports.__interactionsRef = {
            current: /* @__PURE__ */ new Set()
          };
          exports.__subscriberRef = {
            current: null
          };
        }
        function unstable_clear(callback) {
          var prevInteractions = exports.__interactionsRef.current;
          exports.__interactionsRef.current = /* @__PURE__ */ new Set();
          try {
            return callback();
          } finally {
            exports.__interactionsRef.current = prevInteractions;
          }
        }
        function unstable_getCurrent() {
          {
            return exports.__interactionsRef.current;
          }
        }
        function unstable_getThreadID() {
          return ++threadIDCounter;
        }
        function unstable_trace(name, timestamp, callback) {
          var threadID = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_THREAD_ID;
          var interaction = {
            __count: 1,
            id: interactionIDCounter++,
            name,
            timestamp
          };
          var prevInteractions = exports.__interactionsRef.current;
          var interactions = new Set(prevInteractions);
          interactions.add(interaction);
          exports.__interactionsRef.current = interactions;
          var subscriber = exports.__subscriberRef.current;
          var returnValue;
          try {
            if (subscriber !== null) {
              subscriber.onInteractionTraced(interaction);
            }
          } finally {
            try {
              if (subscriber !== null) {
                subscriber.onWorkStarted(interactions, threadID);
              }
            } finally {
              try {
                returnValue = callback();
              } finally {
                exports.__interactionsRef.current = prevInteractions;
                try {
                  if (subscriber !== null) {
                    subscriber.onWorkStopped(interactions, threadID);
                  }
                } finally {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    subscriber.onInteractionScheduledWorkCompleted(interaction);
                  }
                }
              }
            }
          }
          return returnValue;
        }
        function unstable_wrap(callback) {
          var threadID = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : DEFAULT_THREAD_ID;
          var wrappedInteractions = exports.__interactionsRef.current;
          var subscriber = exports.__subscriberRef.current;
          if (subscriber !== null) {
            subscriber.onWorkScheduled(wrappedInteractions, threadID);
          }
          wrappedInteractions.forEach(function(interaction) {
            interaction.__count++;
          });
          var hasRun = false;
          function wrapped() {
            var prevInteractions = exports.__interactionsRef.current;
            exports.__interactionsRef.current = wrappedInteractions;
            subscriber = exports.__subscriberRef.current;
            try {
              var returnValue;
              try {
                if (subscriber !== null) {
                  subscriber.onWorkStarted(wrappedInteractions, threadID);
                }
              } finally {
                try {
                  returnValue = callback.apply(void 0, arguments);
                } finally {
                  exports.__interactionsRef.current = prevInteractions;
                  if (subscriber !== null) {
                    subscriber.onWorkStopped(wrappedInteractions, threadID);
                  }
                }
              }
              return returnValue;
            } finally {
              if (!hasRun) {
                hasRun = true;
                wrappedInteractions.forEach(function(interaction) {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    subscriber.onInteractionScheduledWorkCompleted(interaction);
                  }
                });
              }
            }
          }
          wrapped.cancel = function cancel() {
            subscriber = exports.__subscriberRef.current;
            try {
              if (subscriber !== null) {
                subscriber.onWorkCanceled(wrappedInteractions, threadID);
              }
            } finally {
              wrappedInteractions.forEach(function(interaction) {
                interaction.__count--;
                if (subscriber && interaction.__count === 0) {
                  subscriber.onInteractionScheduledWorkCompleted(interaction);
                }
              });
            }
          };
          return wrapped;
        }
        var subscribers = null;
        {
          subscribers = /* @__PURE__ */ new Set();
        }
        function unstable_subscribe(subscriber) {
          {
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
              exports.__subscriberRef.current = {
                onInteractionScheduledWorkCompleted,
                onInteractionTraced,
                onWorkCanceled,
                onWorkScheduled,
                onWorkStarted,
                onWorkStopped
              };
            }
          }
        }
        function unstable_unsubscribe(subscriber) {
          {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
              exports.__subscriberRef.current = null;
            }
          }
        }
        function onInteractionTraced(interaction) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onInteractionTraced(interaction);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onInteractionScheduledWorkCompleted(interaction) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkScheduled(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkScheduled(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkStarted(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkStarted(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkStopped(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkStopped(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        function onWorkCanceled(interactions, threadID) {
          var didCatchError = false;
          var caughtError = null;
          subscribers.forEach(function(subscriber) {
            try {
              subscriber.onWorkCanceled(interactions, threadID);
            } catch (error) {
              if (!didCatchError) {
                didCatchError = true;
                caughtError = error;
              }
            }
          });
          if (didCatchError) {
            throw caughtError;
          }
        }
        exports.unstable_clear = unstable_clear;
        exports.unstable_getCurrent = unstable_getCurrent;
        exports.unstable_getThreadID = unstable_getThreadID;
        exports.unstable_subscribe = unstable_subscribe;
        exports.unstable_trace = unstable_trace;
        exports.unstable_unsubscribe = unstable_unsubscribe;
        exports.unstable_wrap = unstable_wrap;
      })();
    }
  }
});

// node_modules/scheduler/tracing.js
var require_tracing = __commonJS({
  "node_modules/scheduler/tracing.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_scheduler_tracing_production_min();
    } else {
      module.exports = require_scheduler_tracing_development();
    }
  }
});

// node_modules/react-reconciler/cjs/react-reconciler.development.js
var require_react_reconciler_development = __commonJS({
  "node_modules/react-reconciler/cjs/react-reconciler.development.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      module.exports = function $$$reconciler($$$hostConfig) {
        "use strict";
        var _assign = require_object_assign();
        var React2 = require_react();
        var checkPropTypes = require_checkPropTypes();
        var Scheduler = require_scheduler();
        var tracing = require_tracing();
        var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        if (!ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher")) {
          ReactSharedInternals.ReactCurrentDispatcher = {
            current: null
          };
        }
        if (!ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig")) {
          ReactSharedInternals.ReactCurrentBatchConfig = {
            suspense: null
          };
        }
        function warn(format) {
          {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }
            printWarning("warn", format, args);
          }
        }
        function error(format) {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
        function printWarning(level, format, args) {
          {
            var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === "string" && args[args.length - 1].indexOf("\n    in") === 0;
            if (!hasExistingStack) {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
            }
            var argsWithFormat = args.map(function(item) {
              return "" + item;
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
            try {
              var argIndex = 0;
              var message = "Warning: " + format.replace(/%s/g, function() {
                return args[argIndex++];
              });
              throw new Error(message);
            } catch (x) {
            }
          }
        }
        var FunctionComponent = 0;
        var ClassComponent = 1;
        var IndeterminateComponent = 2;
        var HostRoot = 3;
        var HostPortal = 4;
        var HostComponent = 5;
        var HostText = 6;
        var Fragment = 7;
        var Mode = 8;
        var ContextConsumer = 9;
        var ContextProvider = 10;
        var ForwardRef = 11;
        var Profiler = 12;
        var SuspenseComponent = 13;
        var MemoComponent = 14;
        var SimpleMemoComponent = 15;
        var LazyComponent = 16;
        var IncompleteClassComponent = 17;
        var DehydratedFragment = 18;
        var SuspenseListComponent = 19;
        var FundamentalComponent = 20;
        var ScopeComponent = 21;
        var Block = 22;
        function get(key) {
          return key._reactInternalFiber;
        }
        function set(key, value) {
          key._reactInternalFiber = value;
        }
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function refineResolvedLazyComponent(lazyComponent) {
          return lazyComponent._status === Resolved ? lazyComponent._result : null;
        }
        function initializeLazyComponentType(lazyComponent) {
          if (lazyComponent._status === Uninitialized) {
            lazyComponent._status = Pending;
            var ctor = lazyComponent._ctor;
            var thenable = ctor();
            lazyComponent._result = thenable;
            thenable.then(function(moduleObject) {
              if (lazyComponent._status === Pending) {
                var defaultExport = moduleObject.default;
                {
                  if (defaultExport === void 0) {
                    error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                  }
                }
                lazyComponent._status = Resolved;
                lazyComponent._result = defaultExport;
              }
            }, function(error2) {
              if (lazyComponent._status === Pending) {
                lazyComponent._status = Rejected;
                lazyComponent._result = error2;
              }
            });
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var functionName = innerType.displayName || innerType.name || "";
          return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
        }
        function getComponentName(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                return "Context.Consumer";
              case REACT_PROVIDER_TYPE:
                return "Context.Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                return getComponentName(type.type);
              case REACT_BLOCK_TYPE:
                return getComponentName(type.render);
              case REACT_LAZY_TYPE: {
                var thenable = type;
                var resolvedThenable = refineResolvedLazyComponent(thenable);
                if (resolvedThenable) {
                  return getComponentName(resolvedThenable);
                }
                break;
              }
            }
          }
          return null;
        }
        var NoEffect = 0;
        var PerformedWork = 1;
        var Placement = 2;
        var Update = 4;
        var PlacementAndUpdate = 6;
        var Deletion = 8;
        var ContentReset = 16;
        var Callback = 32;
        var DidCapture = 64;
        var Ref = 128;
        var Snapshot = 256;
        var Passive = 512;
        var Hydrating = 1024;
        var HydratingAndUpdate = 1028;
        var LifecycleEffectMask = 932;
        var HostEffectMask = 2047;
        var Incomplete = 2048;
        var ShouldCapture = 4096;
        var enableProfilerTimer = true;
        var enableFundamentalAPI = false;
        var warnAboutStringRefs = false;
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        function getNearestMountedFiber(fiber) {
          var node = fiber;
          var nearestMounted = fiber;
          if (!fiber.alternate) {
            var nextNode = node;
            do {
              node = nextNode;
              if ((node.effectTag & (Placement | Hydrating)) !== NoEffect) {
                nearestMounted = node.return;
              }
              nextNode = node.return;
            } while (nextNode);
          } else {
            while (node.return) {
              node = node.return;
            }
          }
          if (node.tag === HostRoot) {
            return nearestMounted;
          }
          return null;
        }
        function isFiberMounted(fiber) {
          return getNearestMountedFiber(fiber) === fiber;
        }
        function isMounted(component) {
          {
            var owner = ReactCurrentOwner.current;
            if (owner !== null && owner.tag === ClassComponent) {
              var ownerFiber = owner;
              var instance = ownerFiber.stateNode;
              if (!instance._warnedAboutRefsInRender) {
                error("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", getComponentName(ownerFiber.type) || "A component");
              }
              instance._warnedAboutRefsInRender = true;
            }
          }
          var fiber = get(component);
          if (!fiber) {
            return false;
          }
          return getNearestMountedFiber(fiber) === fiber;
        }
        function assertIsMounted(fiber) {
          if (!(getNearestMountedFiber(fiber) === fiber)) {
            {
              throw Error("Unable to find node on an unmounted component.");
            }
          }
        }
        function findCurrentFiberUsingSlowPath(fiber) {
          var alternate = fiber.alternate;
          if (!alternate) {
            var nearestMounted = getNearestMountedFiber(fiber);
            if (!(nearestMounted !== null)) {
              {
                throw Error("Unable to find node on an unmounted component.");
              }
            }
            if (nearestMounted !== fiber) {
              return null;
            }
            return fiber;
          }
          var a = fiber;
          var b = alternate;
          while (true) {
            var parentA = a.return;
            if (parentA === null) {
              break;
            }
            var parentB = parentA.alternate;
            if (parentB === null) {
              var nextParent = parentA.return;
              if (nextParent !== null) {
                a = b = nextParent;
                continue;
              }
              break;
            }
            if (parentA.child === parentB.child) {
              var child = parentA.child;
              while (child) {
                if (child === a) {
                  assertIsMounted(parentA);
                  return fiber;
                }
                if (child === b) {
                  assertIsMounted(parentA);
                  return alternate;
                }
                child = child.sibling;
              }
              {
                {
                  throw Error("Unable to find node on an unmounted component.");
                }
              }
            }
            if (a.return !== b.return) {
              a = parentA;
              b = parentB;
            } else {
              var didFindChild = false;
              var _child = parentA.child;
              while (_child) {
                if (_child === a) {
                  didFindChild = true;
                  a = parentA;
                  b = parentB;
                  break;
                }
                if (_child === b) {
                  didFindChild = true;
                  b = parentA;
                  a = parentB;
                  break;
                }
                _child = _child.sibling;
              }
              if (!didFindChild) {
                _child = parentB.child;
                while (_child) {
                  if (_child === a) {
                    didFindChild = true;
                    a = parentB;
                    b = parentA;
                    break;
                  }
                  if (_child === b) {
                    didFindChild = true;
                    b = parentB;
                    a = parentA;
                    break;
                  }
                  _child = _child.sibling;
                }
                if (!didFindChild) {
                  {
                    throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
                  }
                }
              }
            }
            if (!(a.alternate === b)) {
              {
                throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          if (!(a.tag === HostRoot)) {
            {
              throw Error("Unable to find node on an unmounted component.");
            }
          }
          if (a.stateNode.current === a) {
            return fiber;
          }
          return alternate;
        }
        function findCurrentHostFiber(parent) {
          var currentParent = findCurrentFiberUsingSlowPath(parent);
          if (!currentParent) {
            return null;
          }
          var node = currentParent;
          while (true) {
            if (node.tag === HostComponent || node.tag === HostText) {
              return node;
            } else if (node.child) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === currentParent) {
              return null;
            }
            while (!node.sibling) {
              if (!node.return || node.return === currentParent) {
                return null;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        function findCurrentHostFiberWithNoPortals(parent) {
          var currentParent = findCurrentFiberUsingSlowPath(parent);
          if (!currentParent) {
            return null;
          }
          var node = currentParent;
          while (true) {
            if (node.tag === HostComponent || node.tag === HostText || enableFundamentalAPI) {
              return node;
            } else if (node.child && node.tag !== HostPortal) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === currentParent) {
              return null;
            }
            while (!node.sibling) {
              if (!node.return || node.return === currentParent) {
                return null;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        var getPublicInstance = $$$hostConfig.getPublicInstance;
        var getRootHostContext = $$$hostConfig.getRootHostContext;
        var getChildHostContext = $$$hostConfig.getChildHostContext;
        var prepareForCommit = $$$hostConfig.prepareForCommit;
        var resetAfterCommit = $$$hostConfig.resetAfterCommit;
        var createInstance = $$$hostConfig.createInstance;
        var appendInitialChild = $$$hostConfig.appendInitialChild;
        var finalizeInitialChildren = $$$hostConfig.finalizeInitialChildren;
        var prepareUpdate = $$$hostConfig.prepareUpdate;
        var shouldSetTextContent = $$$hostConfig.shouldSetTextContent;
        var shouldDeprioritizeSubtree = $$$hostConfig.shouldDeprioritizeSubtree;
        var createTextInstance = $$$hostConfig.createTextInstance;
        var scheduleTimeout = $$$hostConfig.setTimeout;
        var cancelTimeout = $$$hostConfig.clearTimeout;
        var noTimeout = $$$hostConfig.noTimeout;
        var now = $$$hostConfig.now;
        var isPrimaryRenderer = $$$hostConfig.isPrimaryRenderer;
        var warnsIfNotActing = $$$hostConfig.warnsIfNotActing;
        var supportsMutation = $$$hostConfig.supportsMutation;
        var supportsPersistence = $$$hostConfig.supportsPersistence;
        var supportsHydration = $$$hostConfig.supportsHydration;
        var DEPRECATED_mountResponderInstance = $$$hostConfig.DEPRECATED_mountResponderInstance;
        var DEPRECATED_unmountResponderInstance = $$$hostConfig.DEPRECATED_unmountResponderInstance;
        var getFundamentalComponentInstance = $$$hostConfig.getFundamentalComponentInstance;
        var mountFundamentalComponent = $$$hostConfig.mountFundamentalComponent;
        var shouldUpdateFundamentalComponent = $$$hostConfig.shouldUpdateFundamentalComponent;
        var getInstanceFromNode = $$$hostConfig.getInstanceFromNode;
        var beforeRemoveInstance = $$$hostConfig.beforeRemoveInstance;
        var appendChild = $$$hostConfig.appendChild;
        var appendChildToContainer = $$$hostConfig.appendChildToContainer;
        var commitTextUpdate = $$$hostConfig.commitTextUpdate;
        var commitMount = $$$hostConfig.commitMount;
        var commitUpdate = $$$hostConfig.commitUpdate;
        var insertBefore = $$$hostConfig.insertBefore;
        var insertInContainerBefore = $$$hostConfig.insertInContainerBefore;
        var removeChild = $$$hostConfig.removeChild;
        var removeChildFromContainer = $$$hostConfig.removeChildFromContainer;
        var resetTextContent = $$$hostConfig.resetTextContent;
        var hideInstance = $$$hostConfig.hideInstance;
        var hideTextInstance = $$$hostConfig.hideTextInstance;
        var unhideInstance = $$$hostConfig.unhideInstance;
        var unhideTextInstance = $$$hostConfig.unhideTextInstance;
        var updateFundamentalComponent = $$$hostConfig.updateFundamentalComponent;
        var unmountFundamentalComponent = $$$hostConfig.unmountFundamentalComponent;
        var cloneInstance = $$$hostConfig.cloneInstance;
        var createContainerChildSet = $$$hostConfig.createContainerChildSet;
        var appendChildToContainerChildSet = $$$hostConfig.appendChildToContainerChildSet;
        var finalizeContainerChildren = $$$hostConfig.finalizeContainerChildren;
        var replaceContainerChildren = $$$hostConfig.replaceContainerChildren;
        var cloneHiddenInstance = $$$hostConfig.cloneHiddenInstance;
        var cloneHiddenTextInstance = $$$hostConfig.cloneHiddenTextInstance;
        var cloneFundamentalInstance = $$$hostConfig.cloneInstance;
        var canHydrateInstance = $$$hostConfig.canHydrateInstance;
        var canHydrateTextInstance = $$$hostConfig.canHydrateTextInstance;
        var canHydrateSuspenseInstance = $$$hostConfig.canHydrateSuspenseInstance;
        var isSuspenseInstancePending = $$$hostConfig.isSuspenseInstancePending;
        var isSuspenseInstanceFallback = $$$hostConfig.isSuspenseInstanceFallback;
        var registerSuspenseInstanceRetry = $$$hostConfig.registerSuspenseInstanceRetry;
        var getNextHydratableSibling = $$$hostConfig.getNextHydratableSibling;
        var getFirstHydratableChild = $$$hostConfig.getFirstHydratableChild;
        var hydrateInstance = $$$hostConfig.hydrateInstance;
        var hydrateTextInstance = $$$hostConfig.hydrateTextInstance;
        var hydrateSuspenseInstance = $$$hostConfig.hydrateSuspenseInstance;
        var getNextHydratableInstanceAfterSuspenseInstance = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance;
        var commitHydratedContainer = $$$hostConfig.commitHydratedContainer;
        var commitHydratedSuspenseInstance = $$$hostConfig.commitHydratedSuspenseInstance;
        var clearSuspenseBoundary = $$$hostConfig.clearSuspenseBoundary;
        var clearSuspenseBoundaryFromContainer = $$$hostConfig.clearSuspenseBoundaryFromContainer;
        var didNotMatchHydratedContainerTextInstance = $$$hostConfig.didNotMatchHydratedContainerTextInstance;
        var didNotMatchHydratedTextInstance = $$$hostConfig.didNotMatchHydratedTextInstance;
        var didNotHydrateContainerInstance = $$$hostConfig.didNotHydrateContainerInstance;
        var didNotHydrateInstance = $$$hostConfig.didNotHydrateInstance;
        var didNotFindHydratableContainerInstance = $$$hostConfig.didNotFindHydratableContainerInstance;
        var didNotFindHydratableContainerTextInstance = $$$hostConfig.didNotFindHydratableContainerTextInstance;
        var didNotFindHydratableContainerSuspenseInstance = $$$hostConfig.didNotFindHydratableContainerSuspenseInstance;
        var didNotFindHydratableInstance = $$$hostConfig.didNotFindHydratableInstance;
        var didNotFindHydratableTextInstance = $$$hostConfig.didNotFindHydratableTextInstance;
        var didNotFindHydratableSuspenseInstance = $$$hostConfig.didNotFindHydratableSuspenseInstance;
        var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
        function describeComponentFrame(name, source, ownerName) {
          var sourceInfo = "";
          if (source) {
            var path4 = source.fileName;
            var fileName = path4.replace(BEFORE_SLASH_RE, "");
            {
              if (/^index\./.test(fileName)) {
                var match = path4.match(BEFORE_SLASH_RE);
                if (match) {
                  var pathBeforeSlash = match[1];
                  if (pathBeforeSlash) {
                    var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, "");
                    fileName = folderName + "/" + fileName;
                  }
                }
              }
            }
            sourceInfo = " (at " + fileName + ":" + source.lineNumber + ")";
          } else if (ownerName) {
            sourceInfo = " (created by " + ownerName + ")";
          }
          return "\n    in " + (name || "Unknown") + sourceInfo;
        }
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function describeFiber(fiber) {
          switch (fiber.tag) {
            case HostRoot:
            case HostPortal:
            case HostText:
            case Fragment:
            case ContextProvider:
            case ContextConsumer:
              return "";
            default:
              var owner = fiber._debugOwner;
              var source = fiber._debugSource;
              var name = getComponentName(fiber.type);
              var ownerName = null;
              if (owner) {
                ownerName = getComponentName(owner.type);
              }
              return describeComponentFrame(name, source, ownerName);
          }
        }
        function getStackByFiberInDevAndProd(workInProgress2) {
          var info = "";
          var node = workInProgress2;
          do {
            info += describeFiber(node);
            node = node.return;
          } while (node);
          return info;
        }
        var current = null;
        var isRendering = false;
        function getCurrentFiberOwnerNameInDevOrNull() {
          {
            if (current === null) {
              return null;
            }
            var owner = current._debugOwner;
            if (owner !== null && typeof owner !== "undefined") {
              return getComponentName(owner.type);
            }
          }
          return null;
        }
        function getCurrentFiberStackInDev() {
          {
            if (current === null) {
              return "";
            }
            return getStackByFiberInDevAndProd(current);
          }
        }
        function resetCurrentFiber() {
          {
            ReactDebugCurrentFrame.getCurrentStack = null;
            current = null;
            isRendering = false;
          }
        }
        function setCurrentFiber(fiber) {
          {
            ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackInDev;
            current = fiber;
            isRendering = false;
          }
        }
        function setIsRendering(rendering) {
          {
            isRendering = rendering;
          }
        }
        var reactEmoji = "\u269B";
        var warningEmoji = "\u26D4";
        var supportsUserTiming = typeof performance !== "undefined" && typeof performance.mark === "function" && typeof performance.clearMarks === "function" && typeof performance.measure === "function" && typeof performance.clearMeasures === "function";
        var currentFiber = null;
        var currentPhase = null;
        var currentPhaseFiber = null;
        var isCommitting = false;
        var hasScheduledUpdateInCurrentCommit = false;
        var hasScheduledUpdateInCurrentPhase = false;
        var commitCountInCurrentWorkLoop = 0;
        var effectCountInCurrentCommit = 0;
        var labelsInCurrentCommit = /* @__PURE__ */ new Set();
        var formatMarkName = function(markName) {
          return reactEmoji + " " + markName;
        };
        var formatLabel = function(label, warning) {
          var prefix = warning ? warningEmoji + " " : reactEmoji + " ";
          var suffix = warning ? " Warning: " + warning : "";
          return "" + prefix + label + suffix;
        };
        var beginMark = function(markName) {
          performance.mark(formatMarkName(markName));
        };
        var clearMark = function(markName) {
          performance.clearMarks(formatMarkName(markName));
        };
        var endMark = function(label, markName, warning) {
          var formattedMarkName = formatMarkName(markName);
          var formattedLabel = formatLabel(label, warning);
          try {
            performance.measure(formattedLabel, formattedMarkName);
          } catch (err) {
          }
          performance.clearMarks(formattedMarkName);
          performance.clearMeasures(formattedLabel);
        };
        var getFiberMarkName = function(label, debugID) {
          return label + " (#" + debugID + ")";
        };
        var getFiberLabel = function(componentName, isMounted2, phase) {
          if (phase === null) {
            return componentName + " [" + (isMounted2 ? "update" : "mount") + "]";
          } else {
            return componentName + "." + phase;
          }
        };
        var beginFiberMark = function(fiber, phase) {
          var componentName = getComponentName(fiber.type) || "Unknown";
          var debugID = fiber._debugID;
          var isMounted2 = fiber.alternate !== null;
          var label = getFiberLabel(componentName, isMounted2, phase);
          if (isCommitting && labelsInCurrentCommit.has(label)) {
            return false;
          }
          labelsInCurrentCommit.add(label);
          var markName = getFiberMarkName(label, debugID);
          beginMark(markName);
          return true;
        };
        var clearFiberMark = function(fiber, phase) {
          var componentName = getComponentName(fiber.type) || "Unknown";
          var debugID = fiber._debugID;
          var isMounted2 = fiber.alternate !== null;
          var label = getFiberLabel(componentName, isMounted2, phase);
          var markName = getFiberMarkName(label, debugID);
          clearMark(markName);
        };
        var endFiberMark = function(fiber, phase, warning) {
          var componentName = getComponentName(fiber.type) || "Unknown";
          var debugID = fiber._debugID;
          var isMounted2 = fiber.alternate !== null;
          var label = getFiberLabel(componentName, isMounted2, phase);
          var markName = getFiberMarkName(label, debugID);
          endMark(label, markName, warning);
        };
        var shouldIgnoreFiber = function(fiber) {
          switch (fiber.tag) {
            case HostRoot:
            case HostComponent:
            case HostText:
            case HostPortal:
            case Fragment:
            case ContextProvider:
            case ContextConsumer:
            case Mode:
              return true;
            default:
              return false;
          }
        };
        var clearPendingPhaseMeasurement = function() {
          if (currentPhase !== null && currentPhaseFiber !== null) {
            clearFiberMark(currentPhaseFiber, currentPhase);
          }
          currentPhaseFiber = null;
          currentPhase = null;
          hasScheduledUpdateInCurrentPhase = false;
        };
        var pauseTimers = function() {
          var fiber = currentFiber;
          while (fiber) {
            if (fiber._debugIsCurrentlyTiming) {
              endFiberMark(fiber, null, null);
            }
            fiber = fiber.return;
          }
        };
        var resumeTimersRecursively = function(fiber) {
          if (fiber.return !== null) {
            resumeTimersRecursively(fiber.return);
          }
          if (fiber._debugIsCurrentlyTiming) {
            beginFiberMark(fiber, null);
          }
        };
        var resumeTimers = function() {
          if (currentFiber !== null) {
            resumeTimersRecursively(currentFiber);
          }
        };
        function recordEffect() {
          {
            effectCountInCurrentCommit++;
          }
        }
        function recordScheduleUpdate() {
          {
            if (isCommitting) {
              hasScheduledUpdateInCurrentCommit = true;
            }
            if (currentPhase !== null && currentPhase !== "componentWillMount" && currentPhase !== "componentWillReceiveProps") {
              hasScheduledUpdateInCurrentPhase = true;
            }
          }
        }
        function startWorkTimer(fiber) {
          {
            if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
              return;
            }
            currentFiber = fiber;
            if (!beginFiberMark(fiber, null)) {
              return;
            }
            fiber._debugIsCurrentlyTiming = true;
          }
        }
        function cancelWorkTimer(fiber) {
          {
            if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
              return;
            }
            fiber._debugIsCurrentlyTiming = false;
            clearFiberMark(fiber, null);
          }
        }
        function stopWorkTimer(fiber) {
          {
            if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
              return;
            }
            currentFiber = fiber.return;
            if (!fiber._debugIsCurrentlyTiming) {
              return;
            }
            fiber._debugIsCurrentlyTiming = false;
            endFiberMark(fiber, null, null);
          }
        }
        function stopFailedWorkTimer(fiber) {
          {
            if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
              return;
            }
            currentFiber = fiber.return;
            if (!fiber._debugIsCurrentlyTiming) {
              return;
            }
            fiber._debugIsCurrentlyTiming = false;
            var warning = fiber.tag === SuspenseComponent ? "Rendering was suspended" : "An error was thrown inside this error boundary";
            endFiberMark(fiber, null, warning);
          }
        }
        function startPhaseTimer(fiber, phase) {
          {
            if (!supportsUserTiming) {
              return;
            }
            clearPendingPhaseMeasurement();
            if (!beginFiberMark(fiber, phase)) {
              return;
            }
            currentPhaseFiber = fiber;
            currentPhase = phase;
          }
        }
        function stopPhaseTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            if (currentPhase !== null && currentPhaseFiber !== null) {
              var warning = hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null;
              endFiberMark(currentPhaseFiber, currentPhase, warning);
            }
            currentPhase = null;
            currentPhaseFiber = null;
          }
        }
        function startWorkLoopTimer(nextUnitOfWork) {
          {
            currentFiber = nextUnitOfWork;
            if (!supportsUserTiming) {
              return;
            }
            commitCountInCurrentWorkLoop = 0;
            beginMark("(React Tree Reconciliation)");
            resumeTimers();
          }
        }
        function stopWorkLoopTimer(interruptedBy2, didCompleteRoot) {
          {
            if (!supportsUserTiming) {
              return;
            }
            var warning = null;
            if (interruptedBy2 !== null) {
              if (interruptedBy2.tag === HostRoot) {
                warning = "A top-level update interrupted the previous render";
              } else {
                var componentName = getComponentName(interruptedBy2.type) || "Unknown";
                warning = "An update to " + componentName + " interrupted the previous render";
              }
            } else if (commitCountInCurrentWorkLoop > 1) {
              warning = "There were cascading updates";
            }
            commitCountInCurrentWorkLoop = 0;
            var label = didCompleteRoot ? "(React Tree Reconciliation: Completed Root)" : "(React Tree Reconciliation: Yielded)";
            pauseTimers();
            endMark(label, "(React Tree Reconciliation)", warning);
          }
        }
        function startCommitTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            isCommitting = true;
            hasScheduledUpdateInCurrentCommit = false;
            labelsInCurrentCommit.clear();
            beginMark("(Committing Changes)");
          }
        }
        function stopCommitTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            var warning = null;
            if (hasScheduledUpdateInCurrentCommit) {
              warning = "Lifecycle hook scheduled a cascading update";
            } else if (commitCountInCurrentWorkLoop > 0) {
              warning = "Caused by a cascading update in earlier commit";
            }
            hasScheduledUpdateInCurrentCommit = false;
            commitCountInCurrentWorkLoop++;
            isCommitting = false;
            labelsInCurrentCommit.clear();
            endMark("(Committing Changes)", "(Committing Changes)", warning);
          }
        }
        function startCommitSnapshotEffectsTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            effectCountInCurrentCommit = 0;
            beginMark("(Committing Snapshot Effects)");
          }
        }
        function stopCommitSnapshotEffectsTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            var count = effectCountInCurrentCommit;
            effectCountInCurrentCommit = 0;
            endMark("(Committing Snapshot Effects: " + count + " Total)", "(Committing Snapshot Effects)", null);
          }
        }
        function startCommitHostEffectsTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            effectCountInCurrentCommit = 0;
            beginMark("(Committing Host Effects)");
          }
        }
        function stopCommitHostEffectsTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            var count = effectCountInCurrentCommit;
            effectCountInCurrentCommit = 0;
            endMark("(Committing Host Effects: " + count + " Total)", "(Committing Host Effects)", null);
          }
        }
        function startCommitLifeCyclesTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            effectCountInCurrentCommit = 0;
            beginMark("(Calling Lifecycle Methods)");
          }
        }
        function stopCommitLifeCyclesTimer() {
          {
            if (!supportsUserTiming) {
              return;
            }
            var count = effectCountInCurrentCommit;
            effectCountInCurrentCommit = 0;
            endMark("(Calling Lifecycle Methods: " + count + " Total)", "(Calling Lifecycle Methods)", null);
          }
        }
        var valueStack = [];
        var fiberStack;
        {
          fiberStack = [];
        }
        var index = -1;
        function createCursor(defaultValue) {
          return {
            current: defaultValue
          };
        }
        function pop(cursor, fiber) {
          if (index < 0) {
            {
              error("Unexpected pop.");
            }
            return;
          }
          {
            if (fiber !== fiberStack[index]) {
              error("Unexpected Fiber popped.");
            }
          }
          cursor.current = valueStack[index];
          valueStack[index] = null;
          {
            fiberStack[index] = null;
          }
          index--;
        }
        function push(cursor, value, fiber) {
          index++;
          valueStack[index] = cursor.current;
          {
            fiberStack[index] = fiber;
          }
          cursor.current = value;
        }
        var warnedAboutMissingGetChildContext;
        {
          warnedAboutMissingGetChildContext = {};
        }
        var emptyContextObject = {};
        {
          Object.freeze(emptyContextObject);
        }
        var contextStackCursor = createCursor(emptyContextObject);
        var didPerformWorkStackCursor = createCursor(false);
        var previousContext = emptyContextObject;
        function getUnmaskedContext(workInProgress2, Component, didPushOwnContextIfProvider) {
          {
            if (didPushOwnContextIfProvider && isContextProvider(Component)) {
              return previousContext;
            }
            return contextStackCursor.current;
          }
        }
        function cacheContext(workInProgress2, unmaskedContext, maskedContext) {
          {
            var instance = workInProgress2.stateNode;
            instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
            instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
          }
        }
        function getMaskedContext(workInProgress2, unmaskedContext) {
          {
            var type = workInProgress2.type;
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyContextObject;
            }
            var instance = workInProgress2.stateNode;
            if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
              return instance.__reactInternalMemoizedMaskedChildContext;
            }
            var context = {};
            for (var key in contextTypes) {
              context[key] = unmaskedContext[key];
            }
            {
              var name = getComponentName(type) || "Unknown";
              checkPropTypes(contextTypes, context, "context", name, getCurrentFiberStackInDev);
            }
            if (instance) {
              cacheContext(workInProgress2, unmaskedContext, context);
            }
            return context;
          }
        }
        function hasContextChanged() {
          {
            return didPerformWorkStackCursor.current;
          }
        }
        function isContextProvider(type) {
          {
            var childContextTypes = type.childContextTypes;
            return childContextTypes !== null && childContextTypes !== void 0;
          }
        }
        function popContext(fiber) {
          {
            pop(didPerformWorkStackCursor, fiber);
            pop(contextStackCursor, fiber);
          }
        }
        function popTopLevelContextObject(fiber) {
          {
            pop(didPerformWorkStackCursor, fiber);
            pop(contextStackCursor, fiber);
          }
        }
        function pushTopLevelContextObject(fiber, context, didChange) {
          {
            if (!(contextStackCursor.current === emptyContextObject)) {
              {
                throw Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            push(contextStackCursor, context, fiber);
            push(didPerformWorkStackCursor, didChange, fiber);
          }
        }
        function processChildContext(fiber, type, parentContext) {
          {
            var instance = fiber.stateNode;
            var childContextTypes = type.childContextTypes;
            if (typeof instance.getChildContext !== "function") {
              {
                var componentName = getComponentName(type) || "Unknown";
                if (!warnedAboutMissingGetChildContext[componentName]) {
                  warnedAboutMissingGetChildContext[componentName] = true;
                  error("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName);
                }
              }
              return parentContext;
            }
            var childContext;
            startPhaseTimer(fiber, "getChildContext");
            childContext = instance.getChildContext();
            stopPhaseTimer();
            for (var contextKey in childContext) {
              if (!(contextKey in childContextTypes)) {
                {
                  throw Error((getComponentName(type) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                }
              }
            }
            {
              var name = getComponentName(type) || "Unknown";
              checkPropTypes(childContextTypes, childContext, "child context", name, getCurrentFiberStackInDev);
            }
            return _assign({}, parentContext, {}, childContext);
          }
        }
        function pushContextProvider(workInProgress2) {
          {
            var instance = workInProgress2.stateNode;
            var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyContextObject;
            previousContext = contextStackCursor.current;
            push(contextStackCursor, memoizedMergedChildContext, workInProgress2);
            push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress2);
            return true;
          }
        }
        function invalidateContextProvider(workInProgress2, type, didChange) {
          {
            var instance = workInProgress2.stateNode;
            if (!instance) {
              {
                throw Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            if (didChange) {
              var mergedContext = processChildContext(workInProgress2, type, previousContext);
              instance.__reactInternalMemoizedMergedChildContext = mergedContext;
              pop(didPerformWorkStackCursor, workInProgress2);
              pop(contextStackCursor, workInProgress2);
              push(contextStackCursor, mergedContext, workInProgress2);
              push(didPerformWorkStackCursor, didChange, workInProgress2);
            } else {
              pop(didPerformWorkStackCursor, workInProgress2);
              push(didPerformWorkStackCursor, didChange, workInProgress2);
            }
          }
        }
        function findCurrentUnmaskedContext(fiber) {
          {
            if (!(isFiberMounted(fiber) && fiber.tag === ClassComponent)) {
              {
                throw Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            var node = fiber;
            do {
              switch (node.tag) {
                case HostRoot:
                  return node.stateNode.context;
                case ClassComponent: {
                  var Component = node.type;
                  if (isContextProvider(Component)) {
                    return node.stateNode.__reactInternalMemoizedMergedChildContext;
                  }
                  break;
                }
              }
              node = node.return;
            } while (node !== null);
            {
              {
                throw Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
        }
        var BlockingRoot = 1;
        var ConcurrentRoot = 2;
        var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority, Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback, Scheduler_cancelCallback = Scheduler.unstable_cancelCallback, Scheduler_shouldYield = Scheduler.unstable_shouldYield, Scheduler_requestPaint = Scheduler.unstable_requestPaint, Scheduler_now = Scheduler.unstable_now, Scheduler_getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority, Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, Scheduler_NormalPriority = Scheduler.unstable_NormalPriority, Scheduler_LowPriority = Scheduler.unstable_LowPriority, Scheduler_IdlePriority = Scheduler.unstable_IdlePriority;
        {
          if (!(tracing.__interactionsRef != null && tracing.__interactionsRef.current != null)) {
            {
              throw Error("It is not supported to run the profiling version of a renderer (for example, `react-dom/profiling`) without also replacing the `scheduler/tracing` module with `scheduler/tracing-profiling`. Your bundler might have a setting for aliasing both modules. Learn more at http://fb.me/react-profiling");
            }
          }
        }
        var fakeCallbackNode = {};
        var ImmediatePriority = 99;
        var UserBlockingPriority = 98;
        var NormalPriority = 97;
        var LowPriority = 96;
        var IdlePriority = 95;
        var NoPriority = 90;
        var shouldYield = Scheduler_shouldYield;
        var requestPaint = Scheduler_requestPaint !== void 0 ? Scheduler_requestPaint : function() {
        };
        var syncQueue = null;
        var immediateQueueCallbackNode = null;
        var isFlushingSyncQueue = false;
        var initialTimeMs = Scheduler_now();
        var now$1 = initialTimeMs < 1e4 ? Scheduler_now : function() {
          return Scheduler_now() - initialTimeMs;
        };
        function getCurrentPriorityLevel() {
          switch (Scheduler_getCurrentPriorityLevel()) {
            case Scheduler_ImmediatePriority:
              return ImmediatePriority;
            case Scheduler_UserBlockingPriority:
              return UserBlockingPriority;
            case Scheduler_NormalPriority:
              return NormalPriority;
            case Scheduler_LowPriority:
              return LowPriority;
            case Scheduler_IdlePriority:
              return IdlePriority;
            default: {
              {
                throw Error("Unknown priority level.");
              }
            }
          }
        }
        function reactPriorityToSchedulerPriority(reactPriorityLevel) {
          switch (reactPriorityLevel) {
            case ImmediatePriority:
              return Scheduler_ImmediatePriority;
            case UserBlockingPriority:
              return Scheduler_UserBlockingPriority;
            case NormalPriority:
              return Scheduler_NormalPriority;
            case LowPriority:
              return Scheduler_LowPriority;
            case IdlePriority:
              return Scheduler_IdlePriority;
            default: {
              {
                throw Error("Unknown priority level.");
              }
            }
          }
        }
        function runWithPriority(reactPriorityLevel, fn) {
          var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
          return Scheduler_runWithPriority(priorityLevel, fn);
        }
        function scheduleCallback(reactPriorityLevel, callback, options) {
          var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
          return Scheduler_scheduleCallback(priorityLevel, callback, options);
        }
        function scheduleSyncCallback(callback) {
          if (syncQueue === null) {
            syncQueue = [callback];
            immediateQueueCallbackNode = Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueueImpl);
          } else {
            syncQueue.push(callback);
          }
          return fakeCallbackNode;
        }
        function cancelCallback(callbackNode) {
          if (callbackNode !== fakeCallbackNode) {
            Scheduler_cancelCallback(callbackNode);
          }
        }
        function flushSyncCallbackQueue() {
          if (immediateQueueCallbackNode !== null) {
            var node = immediateQueueCallbackNode;
            immediateQueueCallbackNode = null;
            Scheduler_cancelCallback(node);
          }
          flushSyncCallbackQueueImpl();
        }
        function flushSyncCallbackQueueImpl() {
          if (!isFlushingSyncQueue && syncQueue !== null) {
            isFlushingSyncQueue = true;
            var i = 0;
            try {
              var _isSync = true;
              var queue = syncQueue;
              runWithPriority(ImmediatePriority, function() {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(_isSync);
                  } while (callback !== null);
                }
              });
              syncQueue = null;
            } catch (error2) {
              if (syncQueue !== null) {
                syncQueue = syncQueue.slice(i + 1);
              }
              Scheduler_scheduleCallback(Scheduler_ImmediatePriority, flushSyncCallbackQueue);
              throw error2;
            } finally {
              isFlushingSyncQueue = false;
            }
          }
        }
        var NoMode = 0;
        var StrictMode = 1;
        var BlockingMode = 2;
        var ConcurrentMode = 4;
        var ProfileMode = 8;
        var MAX_SIGNED_31_BIT_INT = 1073741823;
        var NoWork = 0;
        var Never = 1;
        var Idle = 2;
        var ContinuousHydration = 3;
        var Sync = MAX_SIGNED_31_BIT_INT;
        var Batched = Sync - 1;
        var UNIT_SIZE = 10;
        var MAGIC_NUMBER_OFFSET = Batched - 1;
        function msToExpirationTime(ms) {
          return MAGIC_NUMBER_OFFSET - (ms / UNIT_SIZE | 0);
        }
        function expirationTimeToMs(expirationTime) {
          return (MAGIC_NUMBER_OFFSET - expirationTime) * UNIT_SIZE;
        }
        function ceiling(num, precision) {
          return ((num / precision | 0) + 1) * precision;
        }
        function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
          return MAGIC_NUMBER_OFFSET - ceiling(MAGIC_NUMBER_OFFSET - currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
        }
        var LOW_PRIORITY_EXPIRATION = 5e3;
        var LOW_PRIORITY_BATCH_SIZE = 250;
        function computeAsyncExpiration(currentTime) {
          return computeExpirationBucket(currentTime, LOW_PRIORITY_EXPIRATION, LOW_PRIORITY_BATCH_SIZE);
        }
        function computeSuspenseExpiration(currentTime, timeoutMs) {
          return computeExpirationBucket(currentTime, timeoutMs, LOW_PRIORITY_BATCH_SIZE);
        }
        var HIGH_PRIORITY_EXPIRATION = 500;
        var HIGH_PRIORITY_BATCH_SIZE = 100;
        function computeInteractiveExpiration(currentTime) {
          return computeExpirationBucket(currentTime, HIGH_PRIORITY_EXPIRATION, HIGH_PRIORITY_BATCH_SIZE);
        }
        function inferPriorityFromExpirationTime(currentTime, expirationTime) {
          if (expirationTime === Sync) {
            return ImmediatePriority;
          }
          if (expirationTime === Never || expirationTime === Idle) {
            return IdlePriority;
          }
          var msUntil = expirationTimeToMs(expirationTime) - expirationTimeToMs(currentTime);
          if (msUntil <= 0) {
            return ImmediatePriority;
          }
          if (msUntil <= HIGH_PRIORITY_EXPIRATION + HIGH_PRIORITY_BATCH_SIZE) {
            return UserBlockingPriority;
          }
          if (msUntil <= LOW_PRIORITY_EXPIRATION + LOW_PRIORITY_BATCH_SIZE) {
            return NormalPriority;
          }
          return IdlePriority;
        }
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function shallowEqual(objA, objB) {
          if (objectIs(objA, objB)) {
            return true;
          }
          if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
            return false;
          }
          var keysA = Object.keys(objA);
          var keysB = Object.keys(objB);
          if (keysA.length !== keysB.length) {
            return false;
          }
          for (var i = 0; i < keysA.length; i++) {
            if (!hasOwnProperty.call(objB, keysA[i]) || !objectIs(objA[keysA[i]], objB[keysA[i]])) {
              return false;
            }
          }
          return true;
        }
        var ReactStrictModeWarnings = {
          recordUnsafeLifecycleWarnings: function(fiber, instance) {
          },
          flushPendingUnsafeLifecycleWarnings: function() {
          },
          recordLegacyContextWarning: function(fiber, instance) {
          },
          flushLegacyContextWarning: function() {
          },
          discardPendingWarnings: function() {
          }
        };
        {
          var findStrictRoot = function(fiber) {
            var maybeStrictRoot = null;
            var node = fiber;
            while (node !== null) {
              if (node.mode & StrictMode) {
                maybeStrictRoot = node;
              }
              node = node.return;
            }
            return maybeStrictRoot;
          };
          var setToSortedString = function(set2) {
            var array = [];
            set2.forEach(function(value) {
              array.push(value);
            });
            return array.sort().join(", ");
          };
          var pendingComponentWillMountWarnings = [];
          var pendingUNSAFE_ComponentWillMountWarnings = [];
          var pendingComponentWillReceivePropsWarnings = [];
          var pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
          var pendingComponentWillUpdateWarnings = [];
          var pendingUNSAFE_ComponentWillUpdateWarnings = [];
          var didWarnAboutUnsafeLifecycles = /* @__PURE__ */ new Set();
          ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function(fiber, instance) {
            if (didWarnAboutUnsafeLifecycles.has(fiber.type)) {
              return;
            }
            if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
              pendingComponentWillMountWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillMount === "function") {
              pendingUNSAFE_ComponentWillMountWarnings.push(fiber);
            }
            if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
              pendingComponentWillReceivePropsWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillReceiveProps === "function") {
              pendingUNSAFE_ComponentWillReceivePropsWarnings.push(fiber);
            }
            if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
              pendingComponentWillUpdateWarnings.push(fiber);
            }
            if (fiber.mode & StrictMode && typeof instance.UNSAFE_componentWillUpdate === "function") {
              pendingUNSAFE_ComponentWillUpdateWarnings.push(fiber);
            }
          };
          ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function() {
            var componentWillMountUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillMountWarnings.length > 0) {
              pendingComponentWillMountWarnings.forEach(function(fiber) {
                componentWillMountUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillMountWarnings = [];
            }
            var UNSAFE_componentWillMountUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillMountWarnings.length > 0) {
              pendingUNSAFE_ComponentWillMountWarnings.forEach(function(fiber) {
                UNSAFE_componentWillMountUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillMountWarnings = [];
            }
            var componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillReceivePropsWarnings.length > 0) {
              pendingComponentWillReceivePropsWarnings.forEach(function(fiber) {
                componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillReceivePropsWarnings = [];
            }
            var UNSAFE_componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillReceivePropsWarnings.length > 0) {
              pendingUNSAFE_ComponentWillReceivePropsWarnings.forEach(function(fiber) {
                UNSAFE_componentWillReceivePropsUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
            }
            var componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
            if (pendingComponentWillUpdateWarnings.length > 0) {
              pendingComponentWillUpdateWarnings.forEach(function(fiber) {
                componentWillUpdateUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingComponentWillUpdateWarnings = [];
            }
            var UNSAFE_componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
            if (pendingUNSAFE_ComponentWillUpdateWarnings.length > 0) {
              pendingUNSAFE_ComponentWillUpdateWarnings.forEach(function(fiber) {
                UNSAFE_componentWillUpdateUniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutUnsafeLifecycles.add(fiber.type);
              });
              pendingUNSAFE_ComponentWillUpdateWarnings = [];
            }
            if (UNSAFE_componentWillMountUniqueNames.size > 0) {
              var sortedNames = setToSortedString(UNSAFE_componentWillMountUniqueNames);
              error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", sortedNames);
            }
            if (UNSAFE_componentWillReceivePropsUniqueNames.size > 0) {
              var _sortedNames = setToSortedString(UNSAFE_componentWillReceivePropsUniqueNames);
              error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state\n\nPlease update the following components: %s", _sortedNames);
            }
            if (UNSAFE_componentWillUpdateUniqueNames.size > 0) {
              var _sortedNames2 = setToSortedString(UNSAFE_componentWillUpdateUniqueNames);
              error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", _sortedNames2);
            }
            if (componentWillMountUniqueNames.size > 0) {
              var _sortedNames3 = setToSortedString(componentWillMountUniqueNames);
              warn("componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames3);
            }
            if (componentWillReceivePropsUniqueNames.size > 0) {
              var _sortedNames4 = setToSortedString(componentWillReceivePropsUniqueNames);
              warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames4);
            }
            if (componentWillUpdateUniqueNames.size > 0) {
              var _sortedNames5 = setToSortedString(componentWillUpdateUniqueNames);
              warn("componentWillUpdate has been renamed, and is not recommended for use. See https://fb.me/react-unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", _sortedNames5);
            }
          };
          var pendingLegacyContextWarning = /* @__PURE__ */ new Map();
          var didWarnAboutLegacyContext = /* @__PURE__ */ new Set();
          ReactStrictModeWarnings.recordLegacyContextWarning = function(fiber, instance) {
            var strictRoot = findStrictRoot(fiber);
            if (strictRoot === null) {
              error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
              return;
            }
            if (didWarnAboutLegacyContext.has(fiber.type)) {
              return;
            }
            var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);
            if (fiber.type.contextTypes != null || fiber.type.childContextTypes != null || instance !== null && typeof instance.getChildContext === "function") {
              if (warningsForRoot === void 0) {
                warningsForRoot = [];
                pendingLegacyContextWarning.set(strictRoot, warningsForRoot);
              }
              warningsForRoot.push(fiber);
            }
          };
          ReactStrictModeWarnings.flushLegacyContextWarning = function() {
            pendingLegacyContextWarning.forEach(function(fiberArray, strictRoot) {
              if (fiberArray.length === 0) {
                return;
              }
              var firstFiber = fiberArray[0];
              var uniqueNames = /* @__PURE__ */ new Set();
              fiberArray.forEach(function(fiber) {
                uniqueNames.add(getComponentName(fiber.type) || "Component");
                didWarnAboutLegacyContext.add(fiber.type);
              });
              var sortedNames = setToSortedString(uniqueNames);
              var firstComponentStack = getStackByFiberInDevAndProd(firstFiber);
              error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://fb.me/react-legacy-context%s", sortedNames, firstComponentStack);
            });
          };
          ReactStrictModeWarnings.discardPendingWarnings = function() {
            pendingComponentWillMountWarnings = [];
            pendingUNSAFE_ComponentWillMountWarnings = [];
            pendingComponentWillReceivePropsWarnings = [];
            pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
            pendingComponentWillUpdateWarnings = [];
            pendingUNSAFE_ComponentWillUpdateWarnings = [];
            pendingLegacyContextWarning = /* @__PURE__ */ new Map();
          };
        }
        var resolveFamily = null;
        var failedBoundaries = null;
        var setRefreshHandler = function(handler) {
          {
            resolveFamily = handler;
          }
        };
        function resolveFunctionForHotReloading(type) {
          {
            if (resolveFamily === null) {
              return type;
            }
            var family = resolveFamily(type);
            if (family === void 0) {
              return type;
            }
            return family.current;
          }
        }
        function resolveClassForHotReloading(type) {
          return resolveFunctionForHotReloading(type);
        }
        function resolveForwardRefForHotReloading(type) {
          {
            if (resolveFamily === null) {
              return type;
            }
            var family = resolveFamily(type);
            if (family === void 0) {
              if (type !== null && type !== void 0 && typeof type.render === "function") {
                var currentRender = resolveFunctionForHotReloading(type.render);
                if (type.render !== currentRender) {
                  var syntheticType = {
                    $$typeof: REACT_FORWARD_REF_TYPE,
                    render: currentRender
                  };
                  if (type.displayName !== void 0) {
                    syntheticType.displayName = type.displayName;
                  }
                  return syntheticType;
                }
              }
              return type;
            }
            return family.current;
          }
        }
        function isCompatibleFamilyForHotReloading(fiber, element) {
          {
            if (resolveFamily === null) {
              return false;
            }
            var prevType = fiber.elementType;
            var nextType = element.type;
            var needsCompareFamilies = false;
            var $$typeofNextType = typeof nextType === "object" && nextType !== null ? nextType.$$typeof : null;
            switch (fiber.tag) {
              case ClassComponent: {
                if (typeof nextType === "function") {
                  needsCompareFamilies = true;
                }
                break;
              }
              case FunctionComponent: {
                if (typeof nextType === "function") {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              case ForwardRef: {
                if ($$typeofNextType === REACT_FORWARD_REF_TYPE) {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              case MemoComponent:
              case SimpleMemoComponent: {
                if ($$typeofNextType === REACT_MEMO_TYPE) {
                  needsCompareFamilies = true;
                } else if ($$typeofNextType === REACT_LAZY_TYPE) {
                  needsCompareFamilies = true;
                }
                break;
              }
              default:
                return false;
            }
            if (needsCompareFamilies) {
              var prevFamily = resolveFamily(prevType);
              if (prevFamily !== void 0 && prevFamily === resolveFamily(nextType)) {
                return true;
              }
            }
            return false;
          }
        }
        function markFailedErrorBoundaryForHotReloading(fiber) {
          {
            if (resolveFamily === null) {
              return;
            }
            if (typeof WeakSet !== "function") {
              return;
            }
            if (failedBoundaries === null) {
              failedBoundaries = /* @__PURE__ */ new WeakSet();
            }
            failedBoundaries.add(fiber);
          }
        }
        var scheduleRefresh = function(root, update) {
          {
            if (resolveFamily === null) {
              return;
            }
            var staleFamilies = update.staleFamilies, updatedFamilies = update.updatedFamilies;
            flushPassiveEffects();
            flushSync(function() {
              scheduleFibersWithFamiliesRecursively(root.current, updatedFamilies, staleFamilies);
            });
          }
        };
        var scheduleRoot = function(root, element) {
          {
            if (root.context !== emptyContextObject) {
              return;
            }
            flushPassiveEffects();
            syncUpdates(function() {
              updateContainer(element, root, null, null);
            });
          }
        };
        function scheduleFibersWithFamiliesRecursively(fiber, updatedFamilies, staleFamilies) {
          {
            var alternate = fiber.alternate, child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
            var candidateType = null;
            switch (tag) {
              case FunctionComponent:
              case SimpleMemoComponent:
              case ClassComponent:
                candidateType = type;
                break;
              case ForwardRef:
                candidateType = type.render;
                break;
            }
            if (resolveFamily === null) {
              throw new Error("Expected resolveFamily to be set during hot reload.");
            }
            var needsRender = false;
            var needsRemount = false;
            if (candidateType !== null) {
              var family = resolveFamily(candidateType);
              if (family !== void 0) {
                if (staleFamilies.has(family)) {
                  needsRemount = true;
                } else if (updatedFamilies.has(family)) {
                  if (tag === ClassComponent) {
                    needsRemount = true;
                  } else {
                    needsRender = true;
                  }
                }
              }
            }
            if (failedBoundaries !== null) {
              if (failedBoundaries.has(fiber) || alternate !== null && failedBoundaries.has(alternate)) {
                needsRemount = true;
              }
            }
            if (needsRemount) {
              fiber._debugNeedsRemount = true;
            }
            if (needsRemount || needsRender) {
              scheduleWork(fiber, Sync);
            }
            if (child !== null && !needsRemount) {
              scheduleFibersWithFamiliesRecursively(child, updatedFamilies, staleFamilies);
            }
            if (sibling !== null) {
              scheduleFibersWithFamiliesRecursively(sibling, updatedFamilies, staleFamilies);
            }
          }
        }
        var findHostInstancesForRefresh = function(root, families) {
          {
            var hostInstances = /* @__PURE__ */ new Set();
            var types = new Set(families.map(function(family) {
              return family.current;
            }));
            findHostInstancesForMatchingFibersRecursively(root.current, types, hostInstances);
            return hostInstances;
          }
        };
        function findHostInstancesForMatchingFibersRecursively(fiber, types, hostInstances) {
          {
            var child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type;
            var candidateType = null;
            switch (tag) {
              case FunctionComponent:
              case SimpleMemoComponent:
              case ClassComponent:
                candidateType = type;
                break;
              case ForwardRef:
                candidateType = type.render;
                break;
            }
            var didMatch = false;
            if (candidateType !== null) {
              if (types.has(candidateType)) {
                didMatch = true;
              }
            }
            if (didMatch) {
              findHostInstancesForFiberShallowly(fiber, hostInstances);
            } else {
              if (child !== null) {
                findHostInstancesForMatchingFibersRecursively(child, types, hostInstances);
              }
            }
            if (sibling !== null) {
              findHostInstancesForMatchingFibersRecursively(sibling, types, hostInstances);
            }
          }
        }
        function findHostInstancesForFiberShallowly(fiber, hostInstances) {
          {
            var foundHostInstances = findChildHostInstancesForFiberShallowly(fiber, hostInstances);
            if (foundHostInstances) {
              return;
            }
            var node = fiber;
            while (true) {
              switch (node.tag) {
                case HostComponent:
                  hostInstances.add(node.stateNode);
                  return;
                case HostPortal:
                  hostInstances.add(node.stateNode.containerInfo);
                  return;
                case HostRoot:
                  hostInstances.add(node.stateNode.containerInfo);
                  return;
              }
              if (node.return === null) {
                throw new Error("Expected to reach root first.");
              }
              node = node.return;
            }
          }
        }
        function findChildHostInstancesForFiberShallowly(fiber, hostInstances) {
          {
            var node = fiber;
            var foundHostInstances = false;
            while (true) {
              if (node.tag === HostComponent) {
                foundHostInstances = true;
                hostInstances.add(node.stateNode);
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === fiber) {
                return foundHostInstances;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === fiber) {
                  return foundHostInstances;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
          return false;
        }
        function resolveDefaultProps(Component, baseProps) {
          if (Component && Component.defaultProps) {
            var props = _assign({}, baseProps);
            var defaultProps = Component.defaultProps;
            for (var propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
            return props;
          }
          return baseProps;
        }
        function readLazyComponentType(lazyComponent) {
          initializeLazyComponentType(lazyComponent);
          if (lazyComponent._status !== Resolved) {
            throw lazyComponent._result;
          }
          return lazyComponent._result;
        }
        var valueCursor = createCursor(null);
        var rendererSigil;
        {
          rendererSigil = {};
        }
        var currentlyRenderingFiber = null;
        var lastContextDependency = null;
        var lastContextWithAllBitsObserved = null;
        var isDisallowedContextReadInDEV = false;
        function resetContextDependencies() {
          currentlyRenderingFiber = null;
          lastContextDependency = null;
          lastContextWithAllBitsObserved = null;
          {
            isDisallowedContextReadInDEV = false;
          }
        }
        function enterDisallowedContextReadInDEV() {
          {
            isDisallowedContextReadInDEV = true;
          }
        }
        function exitDisallowedContextReadInDEV() {
          {
            isDisallowedContextReadInDEV = false;
          }
        }
        function pushProvider(providerFiber, nextValue) {
          var context = providerFiber.type._context;
          if (isPrimaryRenderer) {
            push(valueCursor, context._currentValue, providerFiber);
            context._currentValue = nextValue;
            {
              if (context._currentRenderer !== void 0 && context._currentRenderer !== null && context._currentRenderer !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer = rendererSigil;
            }
          } else {
            push(valueCursor, context._currentValue2, providerFiber);
            context._currentValue2 = nextValue;
            {
              if (context._currentRenderer2 !== void 0 && context._currentRenderer2 !== null && context._currentRenderer2 !== rendererSigil) {
                error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported.");
              }
              context._currentRenderer2 = rendererSigil;
            }
          }
        }
        function popProvider(providerFiber) {
          var currentValue = valueCursor.current;
          pop(valueCursor, providerFiber);
          var context = providerFiber.type._context;
          if (isPrimaryRenderer) {
            context._currentValue = currentValue;
          } else {
            context._currentValue2 = currentValue;
          }
        }
        function calculateChangedBits(context, newValue, oldValue) {
          if (objectIs(oldValue, newValue)) {
            return 0;
          } else {
            var changedBits = typeof context._calculateChangedBits === "function" ? context._calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
            {
              if ((changedBits & MAX_SIGNED_31_BIT_INT) !== changedBits) {
                error("calculateChangedBits: Expected the return value to be a 31-bit integer. Instead received: %s", changedBits);
              }
            }
            return changedBits | 0;
          }
        }
        function scheduleWorkOnParentPath(parent, renderExpirationTime2) {
          var node = parent;
          while (node !== null) {
            var alternate = node.alternate;
            if (node.childExpirationTime < renderExpirationTime2) {
              node.childExpirationTime = renderExpirationTime2;
              if (alternate !== null && alternate.childExpirationTime < renderExpirationTime2) {
                alternate.childExpirationTime = renderExpirationTime2;
              }
            } else if (alternate !== null && alternate.childExpirationTime < renderExpirationTime2) {
              alternate.childExpirationTime = renderExpirationTime2;
            } else {
              break;
            }
            node = node.return;
          }
        }
        function propagateContextChange(workInProgress2, context, changedBits, renderExpirationTime2) {
          var fiber = workInProgress2.child;
          if (fiber !== null) {
            fiber.return = workInProgress2;
          }
          while (fiber !== null) {
            var nextFiber = void 0;
            var list = fiber.dependencies;
            if (list !== null) {
              nextFiber = fiber.child;
              var dependency = list.firstContext;
              while (dependency !== null) {
                if (dependency.context === context && (dependency.observedBits & changedBits) !== 0) {
                  if (fiber.tag === ClassComponent) {
                    var update = createUpdate(renderExpirationTime2, null);
                    update.tag = ForceUpdate;
                    enqueueUpdate(fiber, update);
                  }
                  if (fiber.expirationTime < renderExpirationTime2) {
                    fiber.expirationTime = renderExpirationTime2;
                  }
                  var alternate = fiber.alternate;
                  if (alternate !== null && alternate.expirationTime < renderExpirationTime2) {
                    alternate.expirationTime = renderExpirationTime2;
                  }
                  scheduleWorkOnParentPath(fiber.return, renderExpirationTime2);
                  if (list.expirationTime < renderExpirationTime2) {
                    list.expirationTime = renderExpirationTime2;
                  }
                  break;
                }
                dependency = dependency.next;
              }
            } else if (fiber.tag === ContextProvider) {
              nextFiber = fiber.type === workInProgress2.type ? null : fiber.child;
            } else {
              nextFiber = fiber.child;
            }
            if (nextFiber !== null) {
              nextFiber.return = fiber;
            } else {
              nextFiber = fiber;
              while (nextFiber !== null) {
                if (nextFiber === workInProgress2) {
                  nextFiber = null;
                  break;
                }
                var sibling = nextFiber.sibling;
                if (sibling !== null) {
                  sibling.return = nextFiber.return;
                  nextFiber = sibling;
                  break;
                }
                nextFiber = nextFiber.return;
              }
            }
            fiber = nextFiber;
          }
        }
        function prepareToReadContext(workInProgress2, renderExpirationTime2) {
          currentlyRenderingFiber = workInProgress2;
          lastContextDependency = null;
          lastContextWithAllBitsObserved = null;
          var dependencies = workInProgress2.dependencies;
          if (dependencies !== null) {
            var firstContext = dependencies.firstContext;
            if (firstContext !== null) {
              if (dependencies.expirationTime >= renderExpirationTime2) {
                markWorkInProgressReceivedUpdate();
              }
              dependencies.firstContext = null;
            }
          }
        }
        function readContext(context, observedBits) {
          {
            if (isDisallowedContextReadInDEV) {
              error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
            }
          }
          if (lastContextWithAllBitsObserved === context)
            ;
          else if (observedBits === false || observedBits === 0)
            ;
          else {
            var resolvedObservedBits;
            if (typeof observedBits !== "number" || observedBits === MAX_SIGNED_31_BIT_INT) {
              lastContextWithAllBitsObserved = context;
              resolvedObservedBits = MAX_SIGNED_31_BIT_INT;
            } else {
              resolvedObservedBits = observedBits;
            }
            var contextItem = {
              context,
              observedBits: resolvedObservedBits,
              next: null
            };
            if (lastContextDependency === null) {
              if (!(currentlyRenderingFiber !== null)) {
                {
                  throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
                }
              }
              lastContextDependency = contextItem;
              currentlyRenderingFiber.dependencies = {
                expirationTime: NoWork,
                firstContext: contextItem,
                responders: null
              };
            } else {
              lastContextDependency = lastContextDependency.next = contextItem;
            }
          }
          return isPrimaryRenderer ? context._currentValue : context._currentValue2;
        }
        var UpdateState = 0;
        var ReplaceState = 1;
        var ForceUpdate = 2;
        var CaptureUpdate = 3;
        var hasForceUpdate = false;
        var didWarnUpdateInsideUpdate;
        var currentlyProcessingQueue;
        {
          didWarnUpdateInsideUpdate = false;
          currentlyProcessingQueue = null;
        }
        function initializeUpdateQueue(fiber) {
          var queue = {
            baseState: fiber.memoizedState,
            baseQueue: null,
            shared: {
              pending: null
            },
            effects: null
          };
          fiber.updateQueue = queue;
        }
        function cloneUpdateQueue(current2, workInProgress2) {
          var queue = workInProgress2.updateQueue;
          var currentQueue = current2.updateQueue;
          if (queue === currentQueue) {
            var clone = {
              baseState: currentQueue.baseState,
              baseQueue: currentQueue.baseQueue,
              shared: currentQueue.shared,
              effects: currentQueue.effects
            };
            workInProgress2.updateQueue = clone;
          }
        }
        function createUpdate(expirationTime, suspenseConfig) {
          var update = {
            expirationTime,
            suspenseConfig,
            tag: UpdateState,
            payload: null,
            callback: null,
            next: null
          };
          update.next = update;
          {
            update.priority = getCurrentPriorityLevel();
          }
          return update;
        }
        function enqueueUpdate(fiber, update) {
          var updateQueue = fiber.updateQueue;
          if (updateQueue === null) {
            return;
          }
          var sharedQueue = updateQueue.shared;
          var pending = sharedQueue.pending;
          if (pending === null) {
            update.next = update;
          } else {
            update.next = pending.next;
            pending.next = update;
          }
          sharedQueue.pending = update;
          {
            if (currentlyProcessingQueue === sharedQueue && !didWarnUpdateInsideUpdate) {
              error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.");
              didWarnUpdateInsideUpdate = true;
            }
          }
        }
        function enqueueCapturedUpdate(workInProgress2, update) {
          var current2 = workInProgress2.alternate;
          if (current2 !== null) {
            cloneUpdateQueue(current2, workInProgress2);
          }
          var queue = workInProgress2.updateQueue;
          var last = queue.baseQueue;
          if (last === null) {
            queue.baseQueue = update.next = update;
            update.next = update;
          } else {
            update.next = last.next;
            last.next = update;
          }
        }
        function getStateFromUpdate(workInProgress2, queue, update, prevState, nextProps, instance) {
          switch (update.tag) {
            case ReplaceState: {
              var payload = update.payload;
              if (typeof payload === "function") {
                {
                  enterDisallowedContextReadInDEV();
                  if (workInProgress2.mode & StrictMode) {
                    payload.call(instance, prevState, nextProps);
                  }
                }
                var nextState = payload.call(instance, prevState, nextProps);
                {
                  exitDisallowedContextReadInDEV();
                }
                return nextState;
              }
              return payload;
            }
            case CaptureUpdate: {
              workInProgress2.effectTag = workInProgress2.effectTag & ~ShouldCapture | DidCapture;
            }
            case UpdateState: {
              var _payload = update.payload;
              var partialState;
              if (typeof _payload === "function") {
                {
                  enterDisallowedContextReadInDEV();
                  if (workInProgress2.mode & StrictMode) {
                    _payload.call(instance, prevState, nextProps);
                  }
                }
                partialState = _payload.call(instance, prevState, nextProps);
                {
                  exitDisallowedContextReadInDEV();
                }
              } else {
                partialState = _payload;
              }
              if (partialState === null || partialState === void 0) {
                return prevState;
              }
              return _assign({}, prevState, partialState);
            }
            case ForceUpdate: {
              hasForceUpdate = true;
              return prevState;
            }
          }
          return prevState;
        }
        function processUpdateQueue(workInProgress2, props, instance, renderExpirationTime2) {
          var queue = workInProgress2.updateQueue;
          hasForceUpdate = false;
          {
            currentlyProcessingQueue = queue.shared;
          }
          var baseQueue = queue.baseQueue;
          var pendingQueue = queue.shared.pending;
          if (pendingQueue !== null) {
            if (baseQueue !== null) {
              var baseFirst = baseQueue.next;
              var pendingFirst = pendingQueue.next;
              baseQueue.next = pendingFirst;
              pendingQueue.next = baseFirst;
            }
            baseQueue = pendingQueue;
            queue.shared.pending = null;
            var current2 = workInProgress2.alternate;
            if (current2 !== null) {
              var currentQueue = current2.updateQueue;
              if (currentQueue !== null) {
                currentQueue.baseQueue = pendingQueue;
              }
            }
          }
          if (baseQueue !== null) {
            var first = baseQueue.next;
            var newState = queue.baseState;
            var newExpirationTime = NoWork;
            var newBaseState = null;
            var newBaseQueueFirst = null;
            var newBaseQueueLast = null;
            if (first !== null) {
              var update = first;
              do {
                var updateExpirationTime = update.expirationTime;
                if (updateExpirationTime < renderExpirationTime2) {
                  var clone = {
                    expirationTime: update.expirationTime,
                    suspenseConfig: update.suspenseConfig,
                    tag: update.tag,
                    payload: update.payload,
                    callback: update.callback,
                    next: null
                  };
                  if (newBaseQueueLast === null) {
                    newBaseQueueFirst = newBaseQueueLast = clone;
                    newBaseState = newState;
                  } else {
                    newBaseQueueLast = newBaseQueueLast.next = clone;
                  }
                  if (updateExpirationTime > newExpirationTime) {
                    newExpirationTime = updateExpirationTime;
                  }
                } else {
                  if (newBaseQueueLast !== null) {
                    var _clone = {
                      expirationTime: Sync,
                      suspenseConfig: update.suspenseConfig,
                      tag: update.tag,
                      payload: update.payload,
                      callback: update.callback,
                      next: null
                    };
                    newBaseQueueLast = newBaseQueueLast.next = _clone;
                  }
                  markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig);
                  newState = getStateFromUpdate(workInProgress2, queue, update, newState, props, instance);
                  var callback = update.callback;
                  if (callback !== null) {
                    workInProgress2.effectTag |= Callback;
                    var effects = queue.effects;
                    if (effects === null) {
                      queue.effects = [update];
                    } else {
                      effects.push(update);
                    }
                  }
                }
                update = update.next;
                if (update === null || update === first) {
                  pendingQueue = queue.shared.pending;
                  if (pendingQueue === null) {
                    break;
                  } else {
                    update = baseQueue.next = pendingQueue.next;
                    pendingQueue.next = first;
                    queue.baseQueue = baseQueue = pendingQueue;
                    queue.shared.pending = null;
                  }
                }
              } while (true);
            }
            if (newBaseQueueLast === null) {
              newBaseState = newState;
            } else {
              newBaseQueueLast.next = newBaseQueueFirst;
            }
            queue.baseState = newBaseState;
            queue.baseQueue = newBaseQueueLast;
            markUnprocessedUpdateTime(newExpirationTime);
            workInProgress2.expirationTime = newExpirationTime;
            workInProgress2.memoizedState = newState;
          }
          {
            currentlyProcessingQueue = null;
          }
        }
        function callCallback(callback, context) {
          if (!(typeof callback === "function")) {
            {
              throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + callback);
            }
          }
          callback.call(context);
        }
        function resetHasForceUpdateBeforeProcessing() {
          hasForceUpdate = false;
        }
        function checkHasForceUpdateAfterProcessing() {
          return hasForceUpdate;
        }
        function commitUpdateQueue(finishedWork, finishedQueue, instance) {
          var effects = finishedQueue.effects;
          finishedQueue.effects = null;
          if (effects !== null) {
            for (var i = 0; i < effects.length; i++) {
              var effect = effects[i];
              var callback = effect.callback;
              if (callback !== null) {
                effect.callback = null;
                callCallback(callback, instance);
              }
            }
          }
        }
        var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig;
        function requestCurrentSuspenseConfig() {
          return ReactCurrentBatchConfig.suspense;
        }
        var fakeInternalInstance = {};
        var isArray = Array.isArray;
        var emptyRefsObject = new React2.Component().refs;
        var didWarnAboutStateAssignmentForComponent;
        var didWarnAboutUninitializedState;
        var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate;
        var didWarnAboutLegacyLifecyclesAndDerivedState;
        var didWarnAboutUndefinedDerivedState;
        var warnOnUndefinedDerivedState;
        var warnOnInvalidCallback;
        var didWarnAboutDirectlyAssigningPropsToState;
        var didWarnAboutContextTypeAndContextTypes;
        var didWarnAboutInvalidateContextType;
        {
          didWarnAboutStateAssignmentForComponent = /* @__PURE__ */ new Set();
          didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
          didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
          didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
          didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
          didWarnAboutContextTypeAndContextTypes = /* @__PURE__ */ new Set();
          didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
          var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
          warnOnInvalidCallback = function(callback, callerName) {
            if (callback === null || typeof callback === "function") {
              return;
            }
            var key = callerName + "_" + callback;
            if (!didWarnOnInvalidCallback.has(key)) {
              didWarnOnInvalidCallback.add(key);
              error("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
            }
          };
          warnOnUndefinedDerivedState = function(type, partialState) {
            if (partialState === void 0) {
              var componentName = getComponentName(type) || "Component";
              if (!didWarnAboutUndefinedDerivedState.has(componentName)) {
                didWarnAboutUndefinedDerivedState.add(componentName);
                error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName);
              }
            }
          };
          Object.defineProperty(fakeInternalInstance, "_processChildContext", {
            enumerable: false,
            value: function() {
              {
                {
                  throw Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
                }
              }
            }
          });
          Object.freeze(fakeInternalInstance);
        }
        function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
          var prevState = workInProgress2.memoizedState;
          {
            if (workInProgress2.mode & StrictMode) {
              getDerivedStateFromProps(nextProps, prevState);
            }
          }
          var partialState = getDerivedStateFromProps(nextProps, prevState);
          {
            warnOnUndefinedDerivedState(ctor, partialState);
          }
          var memoizedState = partialState === null || partialState === void 0 ? prevState : _assign({}, prevState, partialState);
          workInProgress2.memoizedState = memoizedState;
          if (workInProgress2.expirationTime === NoWork) {
            var updateQueue = workInProgress2.updateQueue;
            updateQueue.baseState = memoizedState;
          }
        }
        var classComponentUpdater = {
          isMounted,
          enqueueSetState: function(inst, payload, callback) {
            var fiber = get(inst);
            var currentTime = requestCurrentTimeForUpdate();
            var suspenseConfig = requestCurrentSuspenseConfig();
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            update.payload = payload;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "setState");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);
          },
          enqueueReplaceState: function(inst, payload, callback) {
            var fiber = get(inst);
            var currentTime = requestCurrentTimeForUpdate();
            var suspenseConfig = requestCurrentSuspenseConfig();
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            update.tag = ReplaceState;
            update.payload = payload;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "replaceState");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);
          },
          enqueueForceUpdate: function(inst, callback) {
            var fiber = get(inst);
            var currentTime = requestCurrentTimeForUpdate();
            var suspenseConfig = requestCurrentSuspenseConfig();
            var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
            var update = createUpdate(expirationTime, suspenseConfig);
            update.tag = ForceUpdate;
            if (callback !== void 0 && callback !== null) {
              {
                warnOnInvalidCallback(callback, "forceUpdate");
              }
              update.callback = callback;
            }
            enqueueUpdate(fiber, update);
            scheduleWork(fiber, expirationTime);
          }
        };
        function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
          var instance = workInProgress2.stateNode;
          if (typeof instance.shouldComponentUpdate === "function") {
            {
              if (workInProgress2.mode & StrictMode) {
                instance.shouldComponentUpdate(newProps, newState, nextContext);
              }
            }
            startPhaseTimer(workInProgress2, "shouldComponentUpdate");
            var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, nextContext);
            stopPhaseTimer();
            {
              if (shouldUpdate === void 0) {
                error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", getComponentName(ctor) || "Component");
              }
            }
            return shouldUpdate;
          }
          if (ctor.prototype && ctor.prototype.isPureReactComponent) {
            return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
          }
          return true;
        }
        function checkClassInstance(workInProgress2, ctor, newProps) {
          var instance = workInProgress2.stateNode;
          {
            var name = getComponentName(ctor) || "Component";
            var renderPresent = instance.render;
            if (!renderPresent) {
              if (ctor.prototype && typeof ctor.prototype.render === "function") {
                error("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name);
              } else {
                error("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name);
              }
            }
            if (instance.getInitialState && !instance.getInitialState.isReactClassApproved && !instance.state) {
              error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name);
            }
            if (instance.getDefaultProps && !instance.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name);
            }
            if (instance.propTypes) {
              error("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name);
            }
            if (instance.contextType) {
              error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", name);
            }
            {
              if (instance.contextTypes) {
                error("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name);
              }
              if (ctor.contextType && ctor.contextTypes && !didWarnAboutContextTypeAndContextTypes.has(ctor)) {
                didWarnAboutContextTypeAndContextTypes.add(ctor);
                error("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", name);
              }
            }
            if (typeof instance.componentShouldUpdate === "function") {
              error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name);
            }
            if (ctor.prototype && ctor.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== "undefined") {
              error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentName(ctor) || "A pure component");
            }
            if (typeof instance.componentDidUnmount === "function") {
              error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name);
            }
            if (typeof instance.componentDidReceiveProps === "function") {
              error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name);
            }
            if (typeof instance.componentWillRecieveProps === "function") {
              error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name);
            }
            if (typeof instance.UNSAFE_componentWillRecieveProps === "function") {
              error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
            }
            var hasMutatedProps = instance.props !== newProps;
            if (instance.props !== void 0 && hasMutatedProps) {
              error("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name);
            }
            if (instance.defaultProps) {
              error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name);
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function" && typeof instance.componentDidUpdate !== "function" && !didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(ctor)) {
              didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(ctor);
              error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentName(ctor));
            }
            if (typeof instance.getDerivedStateFromProps === "function") {
              error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof instance.getDerivedStateFromError === "function") {
              error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name);
            }
            if (typeof ctor.getSnapshotBeforeUpdate === "function") {
              error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
            }
            var _state = instance.state;
            if (_state && (typeof _state !== "object" || isArray(_state))) {
              error("%s.state: must be set to an object or null", name);
            }
            if (typeof instance.getChildContext === "function" && typeof ctor.childContextTypes !== "object") {
              error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
            }
          }
        }
        function adoptClassInstance(workInProgress2, instance) {
          instance.updater = classComponentUpdater;
          workInProgress2.stateNode = instance;
          set(instance, workInProgress2);
          {
            instance._reactInternalInstance = fakeInternalInstance;
          }
        }
        function constructClassInstance(workInProgress2, ctor, props) {
          var isLegacyContextConsumer = false;
          var unmaskedContext = emptyContextObject;
          var context = emptyContextObject;
          var contextType = ctor.contextType;
          {
            if ("contextType" in ctor) {
              var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
              if (!isValid && !didWarnAboutInvalidateContextType.has(ctor)) {
                didWarnAboutInvalidateContextType.add(ctor);
                var addendum = "";
                if (contextType === void 0) {
                  addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                } else if (typeof contextType !== "object") {
                  addendum = " However, it is set to a " + typeof contextType + ".";
                } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                  addendum = " Did you accidentally pass the Context.Provider instead?";
                } else if (contextType._context !== void 0) {
                  addendum = " Did you accidentally pass the Context.Consumer instead?";
                } else {
                  addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                }
                error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(ctor) || "Component", addendum);
              }
            }
          }
          if (typeof contextType === "object" && contextType !== null) {
            context = readContext(contextType);
          } else {
            unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            var contextTypes = ctor.contextTypes;
            isLegacyContextConsumer = contextTypes !== null && contextTypes !== void 0;
            context = isLegacyContextConsumer ? getMaskedContext(workInProgress2, unmaskedContext) : emptyContextObject;
          }
          {
            if (workInProgress2.mode & StrictMode) {
              new ctor(props, context);
            }
          }
          var instance = new ctor(props, context);
          var state = workInProgress2.memoizedState = instance.state !== null && instance.state !== void 0 ? instance.state : null;
          adoptClassInstance(workInProgress2, instance);
          {
            if (typeof ctor.getDerivedStateFromProps === "function" && state === null) {
              var componentName = getComponentName(ctor) || "Component";
              if (!didWarnAboutUninitializedState.has(componentName)) {
                didWarnAboutUninitializedState.add(componentName);
                error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, instance.state === null ? "null" : "undefined", componentName);
              }
            }
            if (typeof ctor.getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function") {
              var foundWillMountName = null;
              var foundWillReceivePropsName = null;
              var foundWillUpdateName = null;
              if (typeof instance.componentWillMount === "function" && instance.componentWillMount.__suppressDeprecationWarning !== true) {
                foundWillMountName = "componentWillMount";
              } else if (typeof instance.UNSAFE_componentWillMount === "function") {
                foundWillMountName = "UNSAFE_componentWillMount";
              }
              if (typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps.__suppressDeprecationWarning !== true) {
                foundWillReceivePropsName = "componentWillReceiveProps";
              } else if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
                foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
              }
              if (typeof instance.componentWillUpdate === "function" && instance.componentWillUpdate.__suppressDeprecationWarning !== true) {
                foundWillUpdateName = "componentWillUpdate";
              } else if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                foundWillUpdateName = "UNSAFE_componentWillUpdate";
              }
              if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
                var _componentName = getComponentName(ctor) || "Component";
                var newApiName = typeof ctor.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                if (!didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName)) {
                  didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName);
                  error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-unsafe-component-lifecycles", _componentName, newApiName, foundWillMountName !== null ? "\n  " + foundWillMountName : "", foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "", foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "");
                }
              }
            }
          }
          if (isLegacyContextConsumer) {
            cacheContext(workInProgress2, unmaskedContext, context);
          }
          return instance;
        }
        function callComponentWillMount(workInProgress2, instance) {
          startPhaseTimer(workInProgress2, "componentWillMount");
          var oldState = instance.state;
          if (typeof instance.componentWillMount === "function") {
            instance.componentWillMount();
          }
          if (typeof instance.UNSAFE_componentWillMount === "function") {
            instance.UNSAFE_componentWillMount();
          }
          stopPhaseTimer();
          if (oldState !== instance.state) {
            {
              error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentName(workInProgress2.type) || "Component");
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
          var oldState = instance.state;
          startPhaseTimer(workInProgress2, "componentWillReceiveProps");
          if (typeof instance.componentWillReceiveProps === "function") {
            instance.componentWillReceiveProps(newProps, nextContext);
          }
          if (typeof instance.UNSAFE_componentWillReceiveProps === "function") {
            instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
          }
          stopPhaseTimer();
          if (instance.state !== oldState) {
            {
              var componentName = getComponentName(workInProgress2.type) || "Component";
              if (!didWarnAboutStateAssignmentForComponent.has(componentName)) {
                didWarnAboutStateAssignmentForComponent.add(componentName);
                error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", componentName);
              }
            }
            classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
          }
        }
        function mountClassInstance(workInProgress2, ctor, newProps, renderExpirationTime2) {
          {
            checkClassInstance(workInProgress2, ctor, newProps);
          }
          var instance = workInProgress2.stateNode;
          instance.props = newProps;
          instance.state = workInProgress2.memoizedState;
          instance.refs = emptyRefsObject;
          initializeUpdateQueue(workInProgress2);
          var contextType = ctor.contextType;
          if (typeof contextType === "object" && contextType !== null) {
            instance.context = readContext(contextType);
          } else {
            var unmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            instance.context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          {
            if (instance.state === newProps) {
              var componentName = getComponentName(ctor) || "Component";
              if (!didWarnAboutDirectlyAssigningPropsToState.has(componentName)) {
                didWarnAboutDirectlyAssigningPropsToState.add(componentName);
                error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", componentName);
              }
            }
            if (workInProgress2.mode & StrictMode) {
              ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, instance);
            }
            {
              ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress2, instance);
            }
          }
          processUpdateQueue(workInProgress2, newProps, instance, renderExpirationTime2);
          instance.state = workInProgress2.memoizedState;
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            instance.state = workInProgress2.memoizedState;
          }
          if (typeof ctor.getDerivedStateFromProps !== "function" && typeof instance.getSnapshotBeforeUpdate !== "function" && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
            callComponentWillMount(workInProgress2, instance);
            processUpdateQueue(workInProgress2, newProps, instance, renderExpirationTime2);
            instance.state = workInProgress2.memoizedState;
          }
          if (typeof instance.componentDidMount === "function") {
            workInProgress2.effectTag |= Update;
          }
        }
        function resumeMountClassInstance(workInProgress2, ctor, newProps, renderExpirationTime2) {
          var instance = workInProgress2.stateNode;
          var oldProps = workInProgress2.memoizedProps;
          instance.props = oldProps;
          var oldContext = instance.context;
          var contextType = ctor.contextType;
          var nextContext = emptyContextObject;
          if (typeof contextType === "object" && contextType !== null) {
            nextContext = readContext(contextType);
          } else {
            var nextLegacyUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            nextContext = getMaskedContext(workInProgress2, nextLegacyUnmaskedContext);
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
          if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
            if (oldProps !== newProps || oldContext !== nextContext) {
              callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
            }
          }
          resetHasForceUpdateBeforeProcessing();
          var oldState = workInProgress2.memoizedState;
          var newState = instance.state = oldState;
          processUpdateQueue(workInProgress2, newProps, instance, renderExpirationTime2);
          newState = workInProgress2.memoizedState;
          if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.effectTag |= Update;
            }
            return false;
          }
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            newState = workInProgress2.memoizedState;
          }
          var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext);
          if (shouldUpdate) {
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillMount === "function" || typeof instance.componentWillMount === "function")) {
              startPhaseTimer(workInProgress2, "componentWillMount");
              if (typeof instance.componentWillMount === "function") {
                instance.componentWillMount();
              }
              if (typeof instance.UNSAFE_componentWillMount === "function") {
                instance.UNSAFE_componentWillMount();
              }
              stopPhaseTimer();
            }
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.effectTag |= Update;
            }
          } else {
            if (typeof instance.componentDidMount === "function") {
              workInProgress2.effectTag |= Update;
            }
            workInProgress2.memoizedProps = newProps;
            workInProgress2.memoizedState = newState;
          }
          instance.props = newProps;
          instance.state = newState;
          instance.context = nextContext;
          return shouldUpdate;
        }
        function updateClassInstance(current2, workInProgress2, ctor, newProps, renderExpirationTime2) {
          var instance = workInProgress2.stateNode;
          cloneUpdateQueue(current2, workInProgress2);
          var oldProps = workInProgress2.memoizedProps;
          instance.props = workInProgress2.type === workInProgress2.elementType ? oldProps : resolveDefaultProps(workInProgress2.type, oldProps);
          var oldContext = instance.context;
          var contextType = ctor.contextType;
          var nextContext = emptyContextObject;
          if (typeof contextType === "object" && contextType !== null) {
            nextContext = readContext(contextType);
          } else {
            var nextUnmaskedContext = getUnmaskedContext(workInProgress2, ctor, true);
            nextContext = getMaskedContext(workInProgress2, nextUnmaskedContext);
          }
          var getDerivedStateFromProps = ctor.getDerivedStateFromProps;
          var hasNewLifecycles = typeof getDerivedStateFromProps === "function" || typeof instance.getSnapshotBeforeUpdate === "function";
          if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillReceiveProps === "function" || typeof instance.componentWillReceiveProps === "function")) {
            if (oldProps !== newProps || oldContext !== nextContext) {
              callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext);
            }
          }
          resetHasForceUpdateBeforeProcessing();
          var oldState = workInProgress2.memoizedState;
          var newState = instance.state = oldState;
          processUpdateQueue(workInProgress2, newProps, instance, renderExpirationTime2);
          newState = workInProgress2.memoizedState;
          if (oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) {
            if (typeof instance.componentDidUpdate === "function") {
              if (oldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.effectTag |= Update;
              }
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              if (oldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.effectTag |= Snapshot;
              }
            }
            return false;
          }
          if (typeof getDerivedStateFromProps === "function") {
            applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, newProps);
            newState = workInProgress2.memoizedState;
          }
          var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext);
          if (shouldUpdate) {
            if (!hasNewLifecycles && (typeof instance.UNSAFE_componentWillUpdate === "function" || typeof instance.componentWillUpdate === "function")) {
              startPhaseTimer(workInProgress2, "componentWillUpdate");
              if (typeof instance.componentWillUpdate === "function") {
                instance.componentWillUpdate(newProps, newState, nextContext);
              }
              if (typeof instance.UNSAFE_componentWillUpdate === "function") {
                instance.UNSAFE_componentWillUpdate(newProps, newState, nextContext);
              }
              stopPhaseTimer();
            }
            if (typeof instance.componentDidUpdate === "function") {
              workInProgress2.effectTag |= Update;
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              workInProgress2.effectTag |= Snapshot;
            }
          } else {
            if (typeof instance.componentDidUpdate === "function") {
              if (oldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.effectTag |= Update;
              }
            }
            if (typeof instance.getSnapshotBeforeUpdate === "function") {
              if (oldProps !== current2.memoizedProps || oldState !== current2.memoizedState) {
                workInProgress2.effectTag |= Snapshot;
              }
            }
            workInProgress2.memoizedProps = newProps;
            workInProgress2.memoizedState = newState;
          }
          instance.props = newProps;
          instance.state = newState;
          instance.context = nextContext;
          return shouldUpdate;
        }
        var didWarnAboutMaps;
        var didWarnAboutGenerators;
        var didWarnAboutStringRefs;
        var ownerHasKeyUseWarning;
        var ownerHasFunctionTypeWarning;
        var warnForMissingKey = function(child) {
        };
        {
          didWarnAboutMaps = false;
          didWarnAboutGenerators = false;
          didWarnAboutStringRefs = {};
          ownerHasKeyUseWarning = {};
          ownerHasFunctionTypeWarning = {};
          warnForMissingKey = function(child) {
            if (child === null || typeof child !== "object") {
              return;
            }
            if (!child._store || child._store.validated || child.key != null) {
              return;
            }
            if (!(typeof child._store === "object")) {
              {
                throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            child._store.validated = true;
            var currentComponentErrorInfo = 'Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.' + getCurrentFiberStackInDev();
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            error('Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.');
          };
        }
        var isArray$1 = Array.isArray;
        function coerceRef(returnFiber, current2, element) {
          var mixedRef = element.ref;
          if (mixedRef !== null && typeof mixedRef !== "function" && typeof mixedRef !== "object") {
            {
              if ((returnFiber.mode & StrictMode || warnAboutStringRefs) && !(element._owner && element._self && element._owner.stateNode !== element._self)) {
                var componentName = getComponentName(returnFiber.type) || "Component";
                if (!didWarnAboutStringRefs[componentName]) {
                  {
                    error('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref%s', mixedRef, getStackByFiberInDevAndProd(returnFiber));
                  }
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
            if (element._owner) {
              var owner = element._owner;
              var inst;
              if (owner) {
                var ownerFiber = owner;
                if (!(ownerFiber.tag === ClassComponent)) {
                  {
                    throw Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref");
                  }
                }
                inst = ownerFiber.stateNode;
              }
              if (!inst) {
                {
                  throw Error("Missing owner for string ref " + mixedRef + ". This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              var stringRef = "" + mixedRef;
              if (current2 !== null && current2.ref !== null && typeof current2.ref === "function" && current2.ref._stringRef === stringRef) {
                return current2.ref;
              }
              var ref = function(value) {
                var refs = inst.refs;
                if (refs === emptyRefsObject) {
                  refs = inst.refs = {};
                }
                if (value === null) {
                  delete refs[stringRef];
                } else {
                  refs[stringRef] = value;
                }
              };
              ref._stringRef = stringRef;
              return ref;
            } else {
              if (!(typeof mixedRef === "string")) {
                {
                  throw Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
                }
              }
              if (!element._owner) {
                {
                  throw Error("Element ref was specified as a string (" + mixedRef + ") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.");
                }
              }
            }
          }
          return mixedRef;
        }
        function throwOnInvalidObjectType(returnFiber, newChild) {
          if (returnFiber.type !== "textarea") {
            var addendum = "";
            {
              addendum = " If you meant to render a collection of children, use an array instead." + getCurrentFiberStackInDev();
            }
            {
              {
                throw Error("Objects are not valid as a React child (found: " + (Object.prototype.toString.call(newChild) === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild) + ")." + addendum);
              }
            }
          }
        }
        function warnOnFunctionType() {
          {
            var currentComponentErrorInfo = "Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it." + getCurrentFiberStackInDev();
            if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;
            error("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
          }
        }
        function ChildReconciler(shouldTrackSideEffects) {
          function deleteChild(returnFiber, childToDelete) {
            if (!shouldTrackSideEffects) {
              return;
            }
            var last = returnFiber.lastEffect;
            if (last !== null) {
              last.nextEffect = childToDelete;
              returnFiber.lastEffect = childToDelete;
            } else {
              returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
            }
            childToDelete.nextEffect = null;
            childToDelete.effectTag = Deletion;
          }
          function deleteRemainingChildren(returnFiber, currentFirstChild) {
            if (!shouldTrackSideEffects) {
              return null;
            }
            var childToDelete = currentFirstChild;
            while (childToDelete !== null) {
              deleteChild(returnFiber, childToDelete);
              childToDelete = childToDelete.sibling;
            }
            return null;
          }
          function mapRemainingChildren(returnFiber, currentFirstChild) {
            var existingChildren = /* @__PURE__ */ new Map();
            var existingChild = currentFirstChild;
            while (existingChild !== null) {
              if (existingChild.key !== null) {
                existingChildren.set(existingChild.key, existingChild);
              } else {
                existingChildren.set(existingChild.index, existingChild);
              }
              existingChild = existingChild.sibling;
            }
            return existingChildren;
          }
          function useFiber(fiber, pendingProps) {
            var clone = createWorkInProgress(fiber, pendingProps);
            clone.index = 0;
            clone.sibling = null;
            return clone;
          }
          function placeChild(newFiber, lastPlacedIndex, newIndex) {
            newFiber.index = newIndex;
            if (!shouldTrackSideEffects) {
              return lastPlacedIndex;
            }
            var current2 = newFiber.alternate;
            if (current2 !== null) {
              var oldIndex = current2.index;
              if (oldIndex < lastPlacedIndex) {
                newFiber.effectTag = Placement;
                return lastPlacedIndex;
              } else {
                return oldIndex;
              }
            } else {
              newFiber.effectTag = Placement;
              return lastPlacedIndex;
            }
          }
          function placeSingleChild(newFiber) {
            if (shouldTrackSideEffects && newFiber.alternate === null) {
              newFiber.effectTag = Placement;
            }
            return newFiber;
          }
          function updateTextNode(returnFiber, current2, textContent, expirationTime) {
            if (current2 === null || current2.tag !== HostText) {
              var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, textContent);
              existing.return = returnFiber;
              return existing;
            }
          }
          function updateElement(returnFiber, current2, element, expirationTime) {
            if (current2 !== null) {
              if (current2.elementType === element.type || isCompatibleFamilyForHotReloading(current2, element)) {
                var existing = useFiber(current2, element.props);
                existing.ref = coerceRef(returnFiber, current2, element);
                existing.return = returnFiber;
                {
                  existing._debugSource = element._source;
                  existing._debugOwner = element._owner;
                }
                return existing;
              }
            }
            var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
            created.ref = coerceRef(returnFiber, current2, element);
            created.return = returnFiber;
            return created;
          }
          function updatePortal(returnFiber, current2, portal, expirationTime) {
            if (current2 === null || current2.tag !== HostPortal || current2.stateNode.containerInfo !== portal.containerInfo || current2.stateNode.implementation !== portal.implementation) {
              var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, portal.children || []);
              existing.return = returnFiber;
              return existing;
            }
          }
          function updateFragment2(returnFiber, current2, fragment, expirationTime, key) {
            if (current2 === null || current2.tag !== Fragment) {
              var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
              created.return = returnFiber;
              return created;
            } else {
              var existing = useFiber(current2, fragment);
              existing.return = returnFiber;
              return existing;
            }
          }
          function createChild(returnFiber, newChild, expirationTime) {
            if (typeof newChild === "string" || typeof newChild === "number") {
              var created = createFiberFromText("" + newChild, returnFiber.mode, expirationTime);
              created.return = returnFiber;
              return created;
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
                  _created.ref = coerceRef(returnFiber, null, newChild);
                  _created.return = returnFiber;
                  return _created;
                }
                case REACT_PORTAL_TYPE: {
                  var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
                  _created2.return = returnFiber;
                  return _created2;
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
                _created3.return = returnFiber;
                return _created3;
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType();
              }
            }
            return null;
          }
          function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
            var key = oldFiber !== null ? oldFiber.key : null;
            if (typeof newChild === "string" || typeof newChild === "number") {
              if (key !== null) {
                return null;
              }
              return updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  if (newChild.key === key) {
                    if (newChild.type === REACT_FRAGMENT_TYPE) {
                      return updateFragment2(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
                    }
                    return updateElement(returnFiber, oldFiber, newChild, expirationTime);
                  } else {
                    return null;
                  }
                }
                case REACT_PORTAL_TYPE: {
                  if (newChild.key === key) {
                    return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
                  } else {
                    return null;
                  }
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                if (key !== null) {
                  return null;
                }
                return updateFragment2(returnFiber, oldFiber, newChild, expirationTime, null);
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType();
              }
            }
            return null;
          }
          function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
            if (typeof newChild === "string" || typeof newChild === "number") {
              var matchedFiber = existingChildren.get(newIdx) || null;
              return updateTextNode(returnFiber, matchedFiber, "" + newChild, expirationTime);
            }
            if (typeof newChild === "object" && newChild !== null) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE: {
                  var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                  if (newChild.type === REACT_FRAGMENT_TYPE) {
                    return updateFragment2(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
                  }
                  return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
                }
                case REACT_PORTAL_TYPE: {
                  var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
                  return updatePortal(returnFiber, _matchedFiber2, newChild, expirationTime);
                }
              }
              if (isArray$1(newChild) || getIteratorFn(newChild)) {
                var _matchedFiber3 = existingChildren.get(newIdx) || null;
                return updateFragment2(returnFiber, _matchedFiber3, newChild, expirationTime, null);
              }
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType();
              }
            }
            return null;
          }
          function warnOnInvalidKey(child, knownKeys) {
            {
              if (typeof child !== "object" || child === null) {
                return knownKeys;
              }
              switch (child.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  warnForMissingKey(child);
                  var key = child.key;
                  if (typeof key !== "string") {
                    break;
                  }
                  if (knownKeys === null) {
                    knownKeys = /* @__PURE__ */ new Set();
                    knownKeys.add(key);
                    break;
                  }
                  if (!knownKeys.has(key)) {
                    knownKeys.add(key);
                    break;
                  }
                  error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted \u2014 the behavior is unsupported and could change in a future version.", key);
                  break;
              }
            }
            return knownKeys;
          }
          function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
            {
              var knownKeys = null;
              for (var i = 0; i < newChildren.length; i++) {
                var child = newChildren[i];
                knownKeys = warnOnInvalidKey(child, knownKeys);
              }
            }
            var resultingFirstChild = null;
            var previousNewFiber = null;
            var oldFiber = currentFirstChild;
            var lastPlacedIndex = 0;
            var newIdx = 0;
            var nextOldFiber = null;
            for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
              if (oldFiber.index > newIdx) {
                nextOldFiber = oldFiber;
                oldFiber = null;
              } else {
                nextOldFiber = oldFiber.sibling;
              }
              var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
              if (newFiber === null) {
                if (oldFiber === null) {
                  oldFiber = nextOldFiber;
                }
                break;
              }
              if (shouldTrackSideEffects) {
                if (oldFiber && newFiber.alternate === null) {
                  deleteChild(returnFiber, oldFiber);
                }
              }
              lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
              if (previousNewFiber === null) {
                resultingFirstChild = newFiber;
              } else {
                previousNewFiber.sibling = newFiber;
              }
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (newIdx === newChildren.length) {
              deleteRemainingChildren(returnFiber, oldFiber);
              return resultingFirstChild;
            }
            if (oldFiber === null) {
              for (; newIdx < newChildren.length; newIdx++) {
                var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
                if (_newFiber === null) {
                  continue;
                }
                lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber;
                } else {
                  previousNewFiber.sibling = _newFiber;
                }
                previousNewFiber = _newFiber;
              }
              return resultingFirstChild;
            }
            var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
            for (; newIdx < newChildren.length; newIdx++) {
              var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
              if (_newFiber2 !== null) {
                if (shouldTrackSideEffects) {
                  if (_newFiber2.alternate !== null) {
                    existingChildren.delete(_newFiber2.key === null ? newIdx : _newFiber2.key);
                  }
                }
                lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber2;
                } else {
                  previousNewFiber.sibling = _newFiber2;
                }
                previousNewFiber = _newFiber2;
              }
            }
            if (shouldTrackSideEffects) {
              existingChildren.forEach(function(child2) {
                return deleteChild(returnFiber, child2);
              });
            }
            return resultingFirstChild;
          }
          function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
            var iteratorFn = getIteratorFn(newChildrenIterable);
            if (!(typeof iteratorFn === "function")) {
              {
                throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
            {
              if (typeof Symbol === "function" && newChildrenIterable[Symbol.toStringTag] === "Generator") {
                if (!didWarnAboutGenerators) {
                  error("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers.");
                }
                didWarnAboutGenerators = true;
              }
              if (newChildrenIterable.entries === iteratorFn) {
                if (!didWarnAboutMaps) {
                  error("Using Maps as children is unsupported and will likely yield unexpected results. Convert it to a sequence/iterable of keyed ReactElements instead.");
                }
                didWarnAboutMaps = true;
              }
              var _newChildren = iteratorFn.call(newChildrenIterable);
              if (_newChildren) {
                var knownKeys = null;
                var _step = _newChildren.next();
                for (; !_step.done; _step = _newChildren.next()) {
                  var child = _step.value;
                  knownKeys = warnOnInvalidKey(child, knownKeys);
                }
              }
            }
            var newChildren = iteratorFn.call(newChildrenIterable);
            if (!(newChildren != null)) {
              {
                throw Error("An iterable object provided no iterator.");
              }
            }
            var resultingFirstChild = null;
            var previousNewFiber = null;
            var oldFiber = currentFirstChild;
            var lastPlacedIndex = 0;
            var newIdx = 0;
            var nextOldFiber = null;
            var step = newChildren.next();
            for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
              if (oldFiber.index > newIdx) {
                nextOldFiber = oldFiber;
                oldFiber = null;
              } else {
                nextOldFiber = oldFiber.sibling;
              }
              var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
              if (newFiber === null) {
                if (oldFiber === null) {
                  oldFiber = nextOldFiber;
                }
                break;
              }
              if (shouldTrackSideEffects) {
                if (oldFiber && newFiber.alternate === null) {
                  deleteChild(returnFiber, oldFiber);
                }
              }
              lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
              if (previousNewFiber === null) {
                resultingFirstChild = newFiber;
              } else {
                previousNewFiber.sibling = newFiber;
              }
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (step.done) {
              deleteRemainingChildren(returnFiber, oldFiber);
              return resultingFirstChild;
            }
            if (oldFiber === null) {
              for (; !step.done; newIdx++, step = newChildren.next()) {
                var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
                if (_newFiber3 === null) {
                  continue;
                }
                lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber3;
                } else {
                  previousNewFiber.sibling = _newFiber3;
                }
                previousNewFiber = _newFiber3;
              }
              return resultingFirstChild;
            }
            var existingChildren = mapRemainingChildren(returnFiber, oldFiber);
            for (; !step.done; newIdx++, step = newChildren.next()) {
              var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
              if (_newFiber4 !== null) {
                if (shouldTrackSideEffects) {
                  if (_newFiber4.alternate !== null) {
                    existingChildren.delete(_newFiber4.key === null ? newIdx : _newFiber4.key);
                  }
                }
                lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                  resultingFirstChild = _newFiber4;
                } else {
                  previousNewFiber.sibling = _newFiber4;
                }
                previousNewFiber = _newFiber4;
              }
            }
            if (shouldTrackSideEffects) {
              existingChildren.forEach(function(child2) {
                return deleteChild(returnFiber, child2);
              });
            }
            return resultingFirstChild;
          }
          function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
            if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
              deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
              var existing = useFiber(currentFirstChild, textContent);
              existing.return = returnFiber;
              return existing;
            }
            deleteRemainingChildren(returnFiber, currentFirstChild);
            var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
            created.return = returnFiber;
            return created;
          }
          function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
            var key = element.key;
            var child = currentFirstChild;
            while (child !== null) {
              if (child.key === key) {
                switch (child.tag) {
                  case Fragment: {
                    if (element.type === REACT_FRAGMENT_TYPE) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var existing = useFiber(child, element.props.children);
                      existing.return = returnFiber;
                      {
                        existing._debugSource = element._source;
                        existing._debugOwner = element._owner;
                      }
                      return existing;
                    }
                    break;
                  }
                  case Block:
                  default: {
                    if (child.elementType === element.type || isCompatibleFamilyForHotReloading(child, element)) {
                      deleteRemainingChildren(returnFiber, child.sibling);
                      var _existing3 = useFiber(child, element.props);
                      _existing3.ref = coerceRef(returnFiber, child, element);
                      _existing3.return = returnFiber;
                      {
                        _existing3._debugSource = element._source;
                        _existing3._debugOwner = element._owner;
                      }
                      return _existing3;
                    }
                    break;
                  }
                }
                deleteRemainingChildren(returnFiber, child);
                break;
              } else {
                deleteChild(returnFiber, child);
              }
              child = child.sibling;
            }
            if (element.type === REACT_FRAGMENT_TYPE) {
              var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
              created.return = returnFiber;
              return created;
            } else {
              var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
              _created4.ref = coerceRef(returnFiber, currentFirstChild, element);
              _created4.return = returnFiber;
              return _created4;
            }
          }
          function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
            var key = portal.key;
            var child = currentFirstChild;
            while (child !== null) {
              if (child.key === key) {
                if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
                  deleteRemainingChildren(returnFiber, child.sibling);
                  var existing = useFiber(child, portal.children || []);
                  existing.return = returnFiber;
                  return existing;
                } else {
                  deleteRemainingChildren(returnFiber, child);
                  break;
                }
              } else {
                deleteChild(returnFiber, child);
              }
              child = child.sibling;
            }
            var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
            created.return = returnFiber;
            return created;
          }
          function reconcileChildFibers2(returnFiber, currentFirstChild, newChild, expirationTime) {
            var isUnkeyedTopLevelFragment = typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null;
            if (isUnkeyedTopLevelFragment) {
              newChild = newChild.props.children;
            }
            var isObject = typeof newChild === "object" && newChild !== null;
            if (isObject) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));
                case REACT_PORTAL_TYPE:
                  return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
              }
            }
            if (typeof newChild === "string" || typeof newChild === "number") {
              return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, "" + newChild, expirationTime));
            }
            if (isArray$1(newChild)) {
              return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
            }
            if (getIteratorFn(newChild)) {
              return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
            }
            if (isObject) {
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            {
              if (typeof newChild === "function") {
                warnOnFunctionType();
              }
            }
            if (typeof newChild === "undefined" && !isUnkeyedTopLevelFragment) {
              switch (returnFiber.tag) {
                case ClassComponent: {
                  {
                    var instance = returnFiber.stateNode;
                    if (instance.render._isMockFunction) {
                      break;
                    }
                  }
                }
                case FunctionComponent: {
                  var Component = returnFiber.type;
                  {
                    {
                      throw Error((Component.displayName || Component.name || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
                    }
                  }
                }
              }
            }
            return deleteRemainingChildren(returnFiber, currentFirstChild);
          }
          return reconcileChildFibers2;
        }
        var reconcileChildFibers = ChildReconciler(true);
        var mountChildFibers = ChildReconciler(false);
        function cloneChildFibers(current2, workInProgress2) {
          if (!(current2 === null || workInProgress2.child === current2.child)) {
            {
              throw Error("Resuming work not yet implemented.");
            }
          }
          if (workInProgress2.child === null) {
            return;
          }
          var currentChild = workInProgress2.child;
          var newChild = createWorkInProgress(currentChild, currentChild.pendingProps);
          workInProgress2.child = newChild;
          newChild.return = workInProgress2;
          while (currentChild.sibling !== null) {
            currentChild = currentChild.sibling;
            newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps);
            newChild.return = workInProgress2;
          }
          newChild.sibling = null;
        }
        function resetChildFibers(workInProgress2, renderExpirationTime2) {
          var child = workInProgress2.child;
          while (child !== null) {
            resetWorkInProgress(child, renderExpirationTime2);
            child = child.sibling;
          }
        }
        var NO_CONTEXT = {};
        var contextStackCursor$1 = createCursor(NO_CONTEXT);
        var contextFiberStackCursor = createCursor(NO_CONTEXT);
        var rootInstanceStackCursor = createCursor(NO_CONTEXT);
        function requiredContext(c) {
          if (!(c !== NO_CONTEXT)) {
            {
              throw Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          return c;
        }
        function getRootHostContainer() {
          var rootInstance = requiredContext(rootInstanceStackCursor.current);
          return rootInstance;
        }
        function pushHostContainer(fiber, nextRootInstance) {
          push(rootInstanceStackCursor, nextRootInstance, fiber);
          push(contextFiberStackCursor, fiber, fiber);
          push(contextStackCursor$1, NO_CONTEXT, fiber);
          var nextRootContext = getRootHostContext(nextRootInstance);
          pop(contextStackCursor$1, fiber);
          push(contextStackCursor$1, nextRootContext, fiber);
        }
        function popHostContainer(fiber) {
          pop(contextStackCursor$1, fiber);
          pop(contextFiberStackCursor, fiber);
          pop(rootInstanceStackCursor, fiber);
        }
        function getHostContext() {
          var context = requiredContext(contextStackCursor$1.current);
          return context;
        }
        function pushHostContext(fiber) {
          var rootInstance = requiredContext(rootInstanceStackCursor.current);
          var context = requiredContext(contextStackCursor$1.current);
          var nextContext = getChildHostContext(context, fiber.type, rootInstance);
          if (context === nextContext) {
            return;
          }
          push(contextFiberStackCursor, fiber, fiber);
          push(contextStackCursor$1, nextContext, fiber);
        }
        function popHostContext(fiber) {
          if (contextFiberStackCursor.current !== fiber) {
            return;
          }
          pop(contextStackCursor$1, fiber);
          pop(contextFiberStackCursor, fiber);
        }
        var DefaultSuspenseContext = 0;
        var SubtreeSuspenseContextMask = 1;
        var InvisibleParentSuspenseContext = 1;
        var ForceSuspenseFallback = 2;
        var suspenseStackCursor = createCursor(DefaultSuspenseContext);
        function hasSuspenseContext(parentContext, flag) {
          return (parentContext & flag) !== 0;
        }
        function setDefaultShallowSuspenseContext(parentContext) {
          return parentContext & SubtreeSuspenseContextMask;
        }
        function setShallowSuspenseContext(parentContext, shallowContext) {
          return parentContext & SubtreeSuspenseContextMask | shallowContext;
        }
        function addSubtreeSuspenseContext(parentContext, subtreeContext) {
          return parentContext | subtreeContext;
        }
        function pushSuspenseContext(fiber, newContext) {
          push(suspenseStackCursor, newContext, fiber);
        }
        function popSuspenseContext(fiber) {
          pop(suspenseStackCursor, fiber);
        }
        function shouldCaptureSuspense(workInProgress2, hasInvisibleParent) {
          var nextState = workInProgress2.memoizedState;
          if (nextState !== null) {
            if (nextState.dehydrated !== null) {
              return true;
            }
            return false;
          }
          var props = workInProgress2.memoizedProps;
          if (props.fallback === void 0) {
            return false;
          }
          if (props.unstable_avoidThisFallback !== true) {
            return true;
          }
          if (hasInvisibleParent) {
            return false;
          }
          return true;
        }
        function findFirstSuspended(row) {
          var node = row;
          while (node !== null) {
            if (node.tag === SuspenseComponent) {
              var state = node.memoizedState;
              if (state !== null) {
                var dehydrated = state.dehydrated;
                if (dehydrated === null || isSuspenseInstancePending(dehydrated) || isSuspenseInstanceFallback(dehydrated)) {
                  return node;
                }
              }
            } else if (node.tag === SuspenseListComponent && node.memoizedProps.revealOrder !== void 0) {
              var didSuspend = (node.effectTag & DidCapture) !== NoEffect;
              if (didSuspend) {
                return node;
              }
            } else if (node.child !== null) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === row) {
              return null;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === row) {
                return null;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        function createDeprecatedResponderListener(responder, props) {
          var eventResponderListener = {
            responder,
            props
          };
          {
            Object.freeze(eventResponderListener);
          }
          return eventResponderListener;
        }
        var HasEffect = 1;
        var Layout = 2;
        var Passive$1 = 4;
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentBatchConfig$1 = ReactSharedInternals.ReactCurrentBatchConfig;
        var didWarnAboutMismatchedHooksForComponent;
        {
          didWarnAboutMismatchedHooksForComponent = /* @__PURE__ */ new Set();
        }
        var renderExpirationTime = NoWork;
        var currentlyRenderingFiber$1 = null;
        var currentHook = null;
        var workInProgressHook = null;
        var didScheduleRenderPhaseUpdate = false;
        var RE_RENDER_LIMIT = 25;
        var currentHookNameInDev = null;
        var hookTypesDev = null;
        var hookTypesUpdateIndexDev = -1;
        var ignorePreviousDependencies = false;
        function mountHookTypesDev() {
          {
            var hookName = currentHookNameInDev;
            if (hookTypesDev === null) {
              hookTypesDev = [hookName];
            } else {
              hookTypesDev.push(hookName);
            }
          }
        }
        function updateHookTypesDev() {
          {
            var hookName = currentHookNameInDev;
            if (hookTypesDev !== null) {
              hookTypesUpdateIndexDev++;
              if (hookTypesDev[hookTypesUpdateIndexDev] !== hookName) {
                warnOnHookMismatchInDev(hookName);
              }
            }
          }
        }
        function checkDepsAreArrayDev(deps) {
          {
            if (deps !== void 0 && deps !== null && !Array.isArray(deps)) {
              error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", currentHookNameInDev, typeof deps);
            }
          }
        }
        function warnOnHookMismatchInDev(currentHookName) {
          {
            var componentName = getComponentName(currentlyRenderingFiber$1.type);
            if (!didWarnAboutMismatchedHooksForComponent.has(componentName)) {
              didWarnAboutMismatchedHooksForComponent.add(componentName);
              if (hookTypesDev !== null) {
                var table = "";
                var secondColumnStart = 30;
                for (var i = 0; i <= hookTypesUpdateIndexDev; i++) {
                  var oldHookName = hookTypesDev[i];
                  var newHookName = i === hookTypesUpdateIndexDev ? currentHookName : oldHookName;
                  var row = i + 1 + ". " + oldHookName;
                  while (row.length < secondColumnStart) {
                    row += " ";
                  }
                  row += newHookName + "\n";
                  table += row;
                }
                error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://fb.me/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", componentName, table);
              }
            }
          }
        }
        function throwInvalidHookError() {
          {
            {
              throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          {
            if (ignorePreviousDependencies) {
              return false;
            }
          }
          if (prevDeps === null) {
            {
              error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
            }
            return false;
          }
          {
            if (nextDeps.length !== prevDeps.length) {
              error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + prevDeps.join(", ") + "]", "[" + nextDeps.join(", ") + "]");
            }
          }
          for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
            if (objectIs(nextDeps[i], prevDeps[i])) {
              continue;
            }
            return false;
          }
          return true;
        }
        function renderWithHooks(current2, workInProgress2, Component, props, secondArg, nextRenderExpirationTime) {
          renderExpirationTime = nextRenderExpirationTime;
          currentlyRenderingFiber$1 = workInProgress2;
          {
            hookTypesDev = current2 !== null ? current2._debugHookTypes : null;
            hookTypesUpdateIndexDev = -1;
            ignorePreviousDependencies = current2 !== null && current2.type !== workInProgress2.type;
          }
          workInProgress2.memoizedState = null;
          workInProgress2.updateQueue = null;
          workInProgress2.expirationTime = NoWork;
          {
            if (current2 !== null && current2.memoizedState !== null) {
              ReactCurrentDispatcher.current = HooksDispatcherOnUpdateInDEV;
            } else if (hookTypesDev !== null) {
              ReactCurrentDispatcher.current = HooksDispatcherOnMountWithHookTypesInDEV;
            } else {
              ReactCurrentDispatcher.current = HooksDispatcherOnMountInDEV;
            }
          }
          var children = Component(props, secondArg);
          if (workInProgress2.expirationTime === renderExpirationTime) {
            var numberOfReRenders = 0;
            do {
              workInProgress2.expirationTime = NoWork;
              if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
                {
                  throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
                }
              }
              numberOfReRenders += 1;
              {
                ignorePreviousDependencies = false;
              }
              currentHook = null;
              workInProgressHook = null;
              workInProgress2.updateQueue = null;
              {
                hookTypesUpdateIndexDev = -1;
              }
              ReactCurrentDispatcher.current = HooksDispatcherOnRerenderInDEV;
              children = Component(props, secondArg);
            } while (workInProgress2.expirationTime === renderExpirationTime);
          }
          ReactCurrentDispatcher.current = ContextOnlyDispatcher;
          {
            workInProgress2._debugHookTypes = hookTypesDev;
          }
          var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
          renderExpirationTime = NoWork;
          currentlyRenderingFiber$1 = null;
          currentHook = null;
          workInProgressHook = null;
          {
            currentHookNameInDev = null;
            hookTypesDev = null;
            hookTypesUpdateIndexDev = -1;
          }
          didScheduleRenderPhaseUpdate = false;
          if (!!didRenderTooFewHooks) {
            {
              throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
            }
          }
          return children;
        }
        function bailoutHooks(current2, workInProgress2, expirationTime) {
          workInProgress2.updateQueue = current2.updateQueue;
          workInProgress2.effectTag &= ~(Passive | Update);
          if (current2.expirationTime <= expirationTime) {
            current2.expirationTime = NoWork;
          }
        }
        function resetHooksAfterThrow() {
          ReactCurrentDispatcher.current = ContextOnlyDispatcher;
          if (didScheduleRenderPhaseUpdate) {
            var hook = currentlyRenderingFiber$1.memoizedState;
            while (hook !== null) {
              var queue = hook.queue;
              if (queue !== null) {
                queue.pending = null;
              }
              hook = hook.next;
            }
          }
          renderExpirationTime = NoWork;
          currentlyRenderingFiber$1 = null;
          currentHook = null;
          workInProgressHook = null;
          {
            hookTypesDev = null;
            hookTypesUpdateIndexDev = -1;
            currentHookNameInDev = null;
          }
          didScheduleRenderPhaseUpdate = false;
        }
        function mountWorkInProgressHook() {
          var hook = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
          };
          if (workInProgressHook === null) {
            currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook;
          } else {
            workInProgressHook = workInProgressHook.next = hook;
          }
          return workInProgressHook;
        }
        function updateWorkInProgressHook() {
          var nextCurrentHook;
          if (currentHook === null) {
            var current2 = currentlyRenderingFiber$1.alternate;
            if (current2 !== null) {
              nextCurrentHook = current2.memoizedState;
            } else {
              nextCurrentHook = null;
            }
          } else {
            nextCurrentHook = currentHook.next;
          }
          var nextWorkInProgressHook;
          if (workInProgressHook === null) {
            nextWorkInProgressHook = currentlyRenderingFiber$1.memoizedState;
          } else {
            nextWorkInProgressHook = workInProgressHook.next;
          }
          if (nextWorkInProgressHook !== null) {
            workInProgressHook = nextWorkInProgressHook;
            nextWorkInProgressHook = workInProgressHook.next;
            currentHook = nextCurrentHook;
          } else {
            if (!(nextCurrentHook !== null)) {
              {
                throw Error("Rendered more hooks than during the previous render.");
              }
            }
            currentHook = nextCurrentHook;
            var newHook = {
              memoizedState: currentHook.memoizedState,
              baseState: currentHook.baseState,
              baseQueue: currentHook.baseQueue,
              queue: currentHook.queue,
              next: null
            };
            if (workInProgressHook === null) {
              currentlyRenderingFiber$1.memoizedState = workInProgressHook = newHook;
            } else {
              workInProgressHook = workInProgressHook.next = newHook;
            }
          }
          return workInProgressHook;
        }
        function createFunctionComponentUpdateQueue() {
          return {
            lastEffect: null
          };
        }
        function basicStateReducer(state, action) {
          return typeof action === "function" ? action(state) : action;
        }
        function mountReducer(reducer, initialArg, init) {
          var hook = mountWorkInProgressHook();
          var initialState;
          if (init !== void 0) {
            initialState = init(initialArg);
          } else {
            initialState = initialArg;
          }
          hook.memoizedState = hook.baseState = initialState;
          var queue = hook.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: reducer,
            lastRenderedState: initialState
          };
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [hook.memoizedState, dispatch];
        }
        function updateReducer(reducer, initialArg, init) {
          var hook = updateWorkInProgressHook();
          var queue = hook.queue;
          if (!(queue !== null)) {
            {
              throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
          }
          queue.lastRenderedReducer = reducer;
          var current2 = currentHook;
          var baseQueue = current2.baseQueue;
          var pendingQueue = queue.pending;
          if (pendingQueue !== null) {
            if (baseQueue !== null) {
              var baseFirst = baseQueue.next;
              var pendingFirst = pendingQueue.next;
              baseQueue.next = pendingFirst;
              pendingQueue.next = baseFirst;
            }
            current2.baseQueue = baseQueue = pendingQueue;
            queue.pending = null;
          }
          if (baseQueue !== null) {
            var first = baseQueue.next;
            var newState = current2.baseState;
            var newBaseState = null;
            var newBaseQueueFirst = null;
            var newBaseQueueLast = null;
            var update = first;
            do {
              var updateExpirationTime = update.expirationTime;
              if (updateExpirationTime < renderExpirationTime) {
                var clone = {
                  expirationTime: update.expirationTime,
                  suspenseConfig: update.suspenseConfig,
                  action: update.action,
                  eagerReducer: update.eagerReducer,
                  eagerState: update.eagerState,
                  next: null
                };
                if (newBaseQueueLast === null) {
                  newBaseQueueFirst = newBaseQueueLast = clone;
                  newBaseState = newState;
                } else {
                  newBaseQueueLast = newBaseQueueLast.next = clone;
                }
                if (updateExpirationTime > currentlyRenderingFiber$1.expirationTime) {
                  currentlyRenderingFiber$1.expirationTime = updateExpirationTime;
                  markUnprocessedUpdateTime(updateExpirationTime);
                }
              } else {
                if (newBaseQueueLast !== null) {
                  var _clone = {
                    expirationTime: Sync,
                    suspenseConfig: update.suspenseConfig,
                    action: update.action,
                    eagerReducer: update.eagerReducer,
                    eagerState: update.eagerState,
                    next: null
                  };
                  newBaseQueueLast = newBaseQueueLast.next = _clone;
                }
                markRenderEventTimeAndConfig(updateExpirationTime, update.suspenseConfig);
                if (update.eagerReducer === reducer) {
                  newState = update.eagerState;
                } else {
                  var action = update.action;
                  newState = reducer(newState, action);
                }
              }
              update = update.next;
            } while (update !== null && update !== first);
            if (newBaseQueueLast === null) {
              newBaseState = newState;
            } else {
              newBaseQueueLast.next = newBaseQueueFirst;
            }
            if (!objectIs(newState, hook.memoizedState)) {
              markWorkInProgressReceivedUpdate();
            }
            hook.memoizedState = newState;
            hook.baseState = newBaseState;
            hook.baseQueue = newBaseQueueLast;
            queue.lastRenderedState = newState;
          }
          var dispatch = queue.dispatch;
          return [hook.memoizedState, dispatch];
        }
        function rerenderReducer(reducer, initialArg, init) {
          var hook = updateWorkInProgressHook();
          var queue = hook.queue;
          if (!(queue !== null)) {
            {
              throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");
            }
          }
          queue.lastRenderedReducer = reducer;
          var dispatch = queue.dispatch;
          var lastRenderPhaseUpdate = queue.pending;
          var newState = hook.memoizedState;
          if (lastRenderPhaseUpdate !== null) {
            queue.pending = null;
            var firstRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            var update = firstRenderPhaseUpdate;
            do {
              var action = update.action;
              newState = reducer(newState, action);
              update = update.next;
            } while (update !== firstRenderPhaseUpdate);
            if (!objectIs(newState, hook.memoizedState)) {
              markWorkInProgressReceivedUpdate();
            }
            hook.memoizedState = newState;
            if (hook.baseQueue === null) {
              hook.baseState = newState;
            }
            queue.lastRenderedState = newState;
          }
          return [newState, dispatch];
        }
        function mountState(initialState) {
          var hook = mountWorkInProgressHook();
          if (typeof initialState === "function") {
            initialState = initialState();
          }
          hook.memoizedState = hook.baseState = initialState;
          var queue = hook.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialState
          };
          var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
          return [hook.memoizedState, dispatch];
        }
        function updateState(initialState) {
          return updateReducer(basicStateReducer);
        }
        function rerenderState(initialState) {
          return rerenderReducer(basicStateReducer);
        }
        function pushEffect(tag, create, destroy, deps) {
          var effect = {
            tag,
            create,
            destroy,
            deps,
            next: null
          };
          var componentUpdateQueue = currentlyRenderingFiber$1.updateQueue;
          if (componentUpdateQueue === null) {
            componentUpdateQueue = createFunctionComponentUpdateQueue();
            currentlyRenderingFiber$1.updateQueue = componentUpdateQueue;
            componentUpdateQueue.lastEffect = effect.next = effect;
          } else {
            var lastEffect = componentUpdateQueue.lastEffect;
            if (lastEffect === null) {
              componentUpdateQueue.lastEffect = effect.next = effect;
            } else {
              var firstEffect = lastEffect.next;
              lastEffect.next = effect;
              effect.next = firstEffect;
              componentUpdateQueue.lastEffect = effect;
            }
          }
          return effect;
        }
        function mountRef(initialValue) {
          var hook = mountWorkInProgressHook();
          var ref = {
            current: initialValue
          };
          {
            Object.seal(ref);
          }
          hook.memoizedState = ref;
          return ref;
        }
        function updateRef(initialValue) {
          var hook = updateWorkInProgressHook();
          return hook.memoizedState;
        }
        function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
          hook.memoizedState = pushEffect(HasEffect | hookEffectTag, create, void 0, nextDeps);
        }
        function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var destroy = void 0;
          if (currentHook !== null) {
            var prevEffect = currentHook.memoizedState;
            destroy = prevEffect.destroy;
            if (nextDeps !== null) {
              var prevDeps = prevEffect.deps;
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                pushEffect(hookEffectTag, create, destroy, nextDeps);
                return;
              }
            }
          }
          currentlyRenderingFiber$1.effectTag |= fiberEffectTag;
          hook.memoizedState = pushEffect(HasEffect | hookEffectTag, create, destroy, nextDeps);
        }
        function mountEffect(create, deps) {
          {
            if (typeof jest !== "undefined") {
              warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);
            }
          }
          return mountEffectImpl(Update | Passive, Passive$1, create, deps);
        }
        function updateEffect(create, deps) {
          {
            if (typeof jest !== "undefined") {
              warnIfNotCurrentlyActingEffectsInDEV(currentlyRenderingFiber$1);
            }
          }
          return updateEffectImpl(Update | Passive, Passive$1, create, deps);
        }
        function mountLayoutEffect(create, deps) {
          return mountEffectImpl(Update, Layout, create, deps);
        }
        function updateLayoutEffect(create, deps) {
          return updateEffectImpl(Update, Layout, create, deps);
        }
        function imperativeHandleEffect(create, ref) {
          if (typeof ref === "function") {
            var refCallback = ref;
            var _inst = create();
            refCallback(_inst);
            return function() {
              refCallback(null);
            };
          } else if (ref !== null && ref !== void 0) {
            var refObject = ref;
            {
              if (!refObject.hasOwnProperty("current")) {
                error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(refObject).join(", ") + "}");
              }
            }
            var _inst2 = create();
            refObject.current = _inst2;
            return function() {
              refObject.current = null;
            };
          }
        }
        function mountImperativeHandle(ref, create, deps) {
          {
            if (typeof create !== "function") {
              error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create !== null ? typeof create : "null");
            }
          }
          var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
          return mountEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
        }
        function updateImperativeHandle(ref, create, deps) {
          {
            if (typeof create !== "function") {
              error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", create !== null ? typeof create : "null");
            }
          }
          var effectDeps = deps !== null && deps !== void 0 ? deps.concat([ref]) : null;
          return updateEffectImpl(Update, Layout, imperativeHandleEffect.bind(null, create, ref), effectDeps);
        }
        function mountDebugValue(value, formatterFn) {
        }
        var updateDebugValue = mountDebugValue;
        function mountCallback(callback, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          hook.memoizedState = [callback, nextDeps];
          return callback;
        }
        function updateCallback(callback, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var prevState = hook.memoizedState;
          if (prevState !== null) {
            if (nextDeps !== null) {
              var prevDeps = prevState[1];
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
          hook.memoizedState = [callback, nextDeps];
          return callback;
        }
        function mountMemo(nextCreate, deps) {
          var hook = mountWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var nextValue = nextCreate();
          hook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function updateMemo(nextCreate, deps) {
          var hook = updateWorkInProgressHook();
          var nextDeps = deps === void 0 ? null : deps;
          var prevState = hook.memoizedState;
          if (prevState !== null) {
            if (nextDeps !== null) {
              var prevDeps = prevState[1];
              if (areHookInputsEqual(nextDeps, prevDeps)) {
                return prevState[0];
              }
            }
          }
          var nextValue = nextCreate();
          hook.memoizedState = [nextValue, nextDeps];
          return nextValue;
        }
        function mountDeferredValue(value, config) {
          var _mountState = mountState(value), prevValue = _mountState[0], setValue = _mountState[1];
          mountEffect(function() {
            var previousConfig = ReactCurrentBatchConfig$1.suspense;
            ReactCurrentBatchConfig$1.suspense = config === void 0 ? null : config;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.suspense = previousConfig;
            }
          }, [value, config]);
          return prevValue;
        }
        function updateDeferredValue(value, config) {
          var _updateState = updateState(), prevValue = _updateState[0], setValue = _updateState[1];
          updateEffect(function() {
            var previousConfig = ReactCurrentBatchConfig$1.suspense;
            ReactCurrentBatchConfig$1.suspense = config === void 0 ? null : config;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.suspense = previousConfig;
            }
          }, [value, config]);
          return prevValue;
        }
        function rerenderDeferredValue(value, config) {
          var _rerenderState = rerenderState(), prevValue = _rerenderState[0], setValue = _rerenderState[1];
          updateEffect(function() {
            var previousConfig = ReactCurrentBatchConfig$1.suspense;
            ReactCurrentBatchConfig$1.suspense = config === void 0 ? null : config;
            try {
              setValue(value);
            } finally {
              ReactCurrentBatchConfig$1.suspense = previousConfig;
            }
          }, [value, config]);
          return prevValue;
        }
        function startTransition(setPending, config, callback) {
          var priorityLevel = getCurrentPriorityLevel();
          runWithPriority(priorityLevel < UserBlockingPriority ? UserBlockingPriority : priorityLevel, function() {
            setPending(true);
          });
          runWithPriority(priorityLevel > NormalPriority ? NormalPriority : priorityLevel, function() {
            var previousConfig = ReactCurrentBatchConfig$1.suspense;
            ReactCurrentBatchConfig$1.suspense = config === void 0 ? null : config;
            try {
              setPending(false);
              callback();
            } finally {
              ReactCurrentBatchConfig$1.suspense = previousConfig;
            }
          });
        }
        function mountTransition(config) {
          var _mountState2 = mountState(false), isPending = _mountState2[0], setPending = _mountState2[1];
          var start = mountCallback(startTransition.bind(null, setPending, config), [setPending, config]);
          return [start, isPending];
        }
        function updateTransition(config) {
          var _updateState2 = updateState(), isPending = _updateState2[0], setPending = _updateState2[1];
          var start = updateCallback(startTransition.bind(null, setPending, config), [setPending, config]);
          return [start, isPending];
        }
        function rerenderTransition(config) {
          var _rerenderState2 = rerenderState(), isPending = _rerenderState2[0], setPending = _rerenderState2[1];
          var start = updateCallback(startTransition.bind(null, setPending, config), [setPending, config]);
          return [start, isPending];
        }
        function dispatchAction(fiber, queue, action) {
          {
            if (typeof arguments[3] === "function") {
              error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
            }
          }
          var currentTime = requestCurrentTimeForUpdate();
          var suspenseConfig = requestCurrentSuspenseConfig();
          var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
          var update = {
            expirationTime,
            suspenseConfig,
            action,
            eagerReducer: null,
            eagerState: null,
            next: null
          };
          {
            update.priority = getCurrentPriorityLevel();
          }
          var pending = queue.pending;
          if (pending === null) {
            update.next = update;
          } else {
            update.next = pending.next;
            pending.next = update;
          }
          queue.pending = update;
          var alternate = fiber.alternate;
          if (fiber === currentlyRenderingFiber$1 || alternate !== null && alternate === currentlyRenderingFiber$1) {
            didScheduleRenderPhaseUpdate = true;
            update.expirationTime = renderExpirationTime;
            currentlyRenderingFiber$1.expirationTime = renderExpirationTime;
          } else {
            if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
              var lastRenderedReducer = queue.lastRenderedReducer;
              if (lastRenderedReducer !== null) {
                var prevDispatcher;
                {
                  prevDispatcher = ReactCurrentDispatcher.current;
                  ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
                }
                try {
                  var currentState = queue.lastRenderedState;
                  var eagerState = lastRenderedReducer(currentState, action);
                  update.eagerReducer = lastRenderedReducer;
                  update.eagerState = eagerState;
                  if (objectIs(eagerState, currentState)) {
                    return;
                  }
                } catch (error2) {
                } finally {
                  {
                    ReactCurrentDispatcher.current = prevDispatcher;
                  }
                }
              }
            }
            {
              if (typeof jest !== "undefined") {
                warnIfNotScopedWithMatchingAct(fiber);
                warnIfNotCurrentlyActingUpdatesInDev(fiber);
              }
            }
            scheduleWork(fiber, expirationTime);
          }
        }
        var ContextOnlyDispatcher = {
          readContext,
          useCallback: throwInvalidHookError,
          useContext: throwInvalidHookError,
          useEffect: throwInvalidHookError,
          useImperativeHandle: throwInvalidHookError,
          useLayoutEffect: throwInvalidHookError,
          useMemo: throwInvalidHookError,
          useReducer: throwInvalidHookError,
          useRef: throwInvalidHookError,
          useState: throwInvalidHookError,
          useDebugValue: throwInvalidHookError,
          useResponder: throwInvalidHookError,
          useDeferredValue: throwInvalidHookError,
          useTransition: throwInvalidHookError
        };
        var HooksDispatcherOnMountInDEV = null;
        var HooksDispatcherOnMountWithHookTypesInDEV = null;
        var HooksDispatcherOnUpdateInDEV = null;
        var HooksDispatcherOnRerenderInDEV = null;
        var InvalidNestedHooksDispatcherOnMountInDEV = null;
        var InvalidNestedHooksDispatcherOnUpdateInDEV = null;
        var InvalidNestedHooksDispatcherOnRerenderInDEV = null;
        {
          var warnInvalidContextAccess = function() {
            error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          };
          var warnInvalidHookAccess = function() {
            error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://fb.me/rules-of-hooks");
          };
          HooksDispatcherOnMountInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              mountHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              return mountLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              mountHookTypesDev();
              checkDepsAreArrayDev(deps);
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              mountHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              mountHookTypesDev();
              return mountDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              mountHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              mountHookTypesDev();
              return mountDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              mountHookTypesDev();
              return mountTransition(config);
            }
          };
          HooksDispatcherOnMountWithHookTypesInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return mountEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return mountImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return mountLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return mountDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              updateHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return mountDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return mountTransition(config);
            }
          };
          HooksDispatcherOnUpdateInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return updateEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return updateImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return updateLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return updateDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              updateHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return updateDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return updateTransition(config);
            }
          };
          HooksDispatcherOnRerenderInDEV = {
            readContext: function(context, observedBits) {
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              updateHookTypesDev();
              return updateEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              updateHookTypesDev();
              return updateImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              updateHookTypesDev();
              return updateLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return updateMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return rerenderReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnRerenderInDEV;
              try {
                return rerenderState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              updateHookTypesDev();
              return updateDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              updateHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              updateHookTypesDev();
              return rerenderDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              updateHookTypesDev();
              return rerenderTransition(config);
            }
          };
          InvalidNestedHooksDispatcherOnMountInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountRef(initialValue);
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              mountHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnMountInDEV;
              try {
                return mountState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              mountHookTypesDev();
              return mountTransition(config);
            }
          };
          InvalidNestedHooksDispatcherOnUpdateInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateTransition(config);
            }
          };
          InvalidNestedHooksDispatcherOnRerenderInDEV = {
            readContext: function(context, observedBits) {
              warnInvalidContextAccess();
              return readContext(context, observedBits);
            },
            useCallback: function(callback, deps) {
              currentHookNameInDev = "useCallback";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateCallback(callback, deps);
            },
            useContext: function(context, observedBits) {
              currentHookNameInDev = "useContext";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return readContext(context, observedBits);
            },
            useEffect: function(create, deps) {
              currentHookNameInDev = "useEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateEffect(create, deps);
            },
            useImperativeHandle: function(ref, create, deps) {
              currentHookNameInDev = "useImperativeHandle";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateImperativeHandle(ref, create, deps);
            },
            useLayoutEffect: function(create, deps) {
              currentHookNameInDev = "useLayoutEffect";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateLayoutEffect(create, deps);
            },
            useMemo: function(create, deps) {
              currentHookNameInDev = "useMemo";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return updateMemo(create, deps);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useReducer: function(reducer, initialArg, init) {
              currentHookNameInDev = "useReducer";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return rerenderReducer(reducer, initialArg, init);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useRef: function(initialValue) {
              currentHookNameInDev = "useRef";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateRef();
            },
            useState: function(initialState) {
              currentHookNameInDev = "useState";
              warnInvalidHookAccess();
              updateHookTypesDev();
              var prevDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
              try {
                return rerenderState(initialState);
              } finally {
                ReactCurrentDispatcher.current = prevDispatcher;
              }
            },
            useDebugValue: function(value, formatterFn) {
              currentHookNameInDev = "useDebugValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return updateDebugValue();
            },
            useResponder: function(responder, props) {
              currentHookNameInDev = "useResponder";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return createDeprecatedResponderListener(responder, props);
            },
            useDeferredValue: function(value, config) {
              currentHookNameInDev = "useDeferredValue";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return rerenderDeferredValue(value, config);
            },
            useTransition: function(config) {
              currentHookNameInDev = "useTransition";
              warnInvalidHookAccess();
              updateHookTypesDev();
              return rerenderTransition(config);
            }
          };
        }
        var now$2 = Scheduler.unstable_now;
        var commitTime = 0;
        var profilerStartTime = -1;
        function getCommitTime() {
          return commitTime;
        }
        function recordCommitTime() {
          commitTime = now$2();
        }
        function startProfilerTimer(fiber) {
          profilerStartTime = now$2();
          if (fiber.actualStartTime < 0) {
            fiber.actualStartTime = now$2();
          }
        }
        function stopProfilerTimerIfRunning(fiber) {
          profilerStartTime = -1;
        }
        function stopProfilerTimerIfRunningAndRecordDelta(fiber, overrideBaseTime) {
          if (profilerStartTime >= 0) {
            var elapsedTime = now$2() - profilerStartTime;
            fiber.actualDuration += elapsedTime;
            if (overrideBaseTime) {
              fiber.selfBaseDuration = elapsedTime;
            }
            profilerStartTime = -1;
          }
        }
        var hydrationParentFiber = null;
        var nextHydratableInstance = null;
        var isHydrating = false;
        function enterHydrationState(fiber) {
          if (!supportsHydration) {
            return false;
          }
          var parentInstance = fiber.stateNode.containerInfo;
          nextHydratableInstance = getFirstHydratableChild(parentInstance);
          hydrationParentFiber = fiber;
          isHydrating = true;
          return true;
        }
        function deleteHydratableInstance(returnFiber, instance) {
          {
            switch (returnFiber.tag) {
              case HostRoot:
                didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
                break;
              case HostComponent:
                didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
                break;
            }
          }
          var childToDelete = createFiberFromHostInstanceForDeletion();
          childToDelete.stateNode = instance;
          childToDelete.return = returnFiber;
          childToDelete.effectTag = Deletion;
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = childToDelete;
            returnFiber.lastEffect = childToDelete;
          } else {
            returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
          }
        }
        function insertNonHydratedInstance(returnFiber, fiber) {
          fiber.effectTag = fiber.effectTag & ~Hydrating | Placement;
          {
            switch (returnFiber.tag) {
              case HostRoot: {
                var parentContainer = returnFiber.stateNode.containerInfo;
                switch (fiber.tag) {
                  case HostComponent:
                    var type = fiber.type;
                    var props = fiber.pendingProps;
                    didNotFindHydratableContainerInstance(parentContainer, type, props);
                    break;
                  case HostText:
                    var text = fiber.pendingProps;
                    didNotFindHydratableContainerTextInstance(parentContainer, text);
                    break;
                  case SuspenseComponent:
                    didNotFindHydratableContainerSuspenseInstance(parentContainer);
                    break;
                }
                break;
              }
              case HostComponent: {
                var parentType = returnFiber.type;
                var parentProps = returnFiber.memoizedProps;
                var parentInstance = returnFiber.stateNode;
                switch (fiber.tag) {
                  case HostComponent:
                    var _type = fiber.type;
                    var _props = fiber.pendingProps;
                    didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                    break;
                  case HostText:
                    var _text = fiber.pendingProps;
                    didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                    break;
                  case SuspenseComponent:
                    didNotFindHydratableSuspenseInstance(parentType, parentProps, parentInstance);
                    break;
                }
                break;
              }
              default:
                return;
            }
          }
        }
        function tryHydrate(fiber, nextInstance) {
          switch (fiber.tag) {
            case HostComponent: {
              var type = fiber.type;
              var props = fiber.pendingProps;
              var instance = canHydrateInstance(nextInstance, type, props);
              if (instance !== null) {
                fiber.stateNode = instance;
                return true;
              }
              return false;
            }
            case HostText: {
              var text = fiber.pendingProps;
              var textInstance = canHydrateTextInstance(nextInstance, text);
              if (textInstance !== null) {
                fiber.stateNode = textInstance;
                return true;
              }
              return false;
            }
            case SuspenseComponent: {
              return false;
            }
            default:
              return false;
          }
        }
        function tryToClaimNextHydratableInstance(fiber) {
          if (!isHydrating) {
            return;
          }
          var nextInstance = nextHydratableInstance;
          if (!nextInstance) {
            insertNonHydratedInstance(hydrationParentFiber, fiber);
            isHydrating = false;
            hydrationParentFiber = fiber;
            return;
          }
          var firstAttemptedInstance = nextInstance;
          if (!tryHydrate(fiber, nextInstance)) {
            nextInstance = getNextHydratableSibling(firstAttemptedInstance);
            if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
              insertNonHydratedInstance(hydrationParentFiber, fiber);
              isHydrating = false;
              hydrationParentFiber = fiber;
              return;
            }
            deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
          }
          hydrationParentFiber = fiber;
          nextHydratableInstance = getFirstHydratableChild(nextInstance);
        }
        function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
          if (!supportsHydration) {
            {
              {
                throw Error("Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          var instance = fiber.stateNode;
          var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
          fiber.updateQueue = updatePayload;
          if (updatePayload !== null) {
            return true;
          }
          return false;
        }
        function prepareToHydrateHostTextInstance(fiber) {
          if (!supportsHydration) {
            {
              {
                throw Error("Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          var textInstance = fiber.stateNode;
          var textContent = fiber.memoizedProps;
          var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
          {
            if (shouldUpdate) {
              var returnFiber = hydrationParentFiber;
              if (returnFiber !== null) {
                switch (returnFiber.tag) {
                  case HostRoot: {
                    var parentContainer = returnFiber.stateNode.containerInfo;
                    didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                    break;
                  }
                  case HostComponent: {
                    var parentType = returnFiber.type;
                    var parentProps = returnFiber.memoizedProps;
                    var parentInstance = returnFiber.stateNode;
                    didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                    break;
                  }
                }
              }
            }
          }
          return shouldUpdate;
        }
        function skipPastDehydratedSuspenseInstance(fiber) {
          if (!supportsHydration) {
            {
              {
                throw Error("Expected skipPastDehydratedSuspenseInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          var suspenseState = fiber.memoizedState;
          var suspenseInstance = suspenseState !== null ? suspenseState.dehydrated : null;
          if (!suspenseInstance) {
            {
              throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          return getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance);
        }
        function popToNextHostParent(fiber) {
          var parent = fiber.return;
          while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot && parent.tag !== SuspenseComponent) {
            parent = parent.return;
          }
          hydrationParentFiber = parent;
        }
        function popHydrationState(fiber) {
          if (!supportsHydration) {
            return false;
          }
          if (fiber !== hydrationParentFiber) {
            return false;
          }
          if (!isHydrating) {
            popToNextHostParent(fiber);
            isHydrating = true;
            return false;
          }
          var type = fiber.type;
          if (fiber.tag !== HostComponent || type !== "head" && type !== "body" && !shouldSetTextContent(type, fiber.memoizedProps)) {
            var nextInstance = nextHydratableInstance;
            while (nextInstance) {
              deleteHydratableInstance(fiber, nextInstance);
              nextInstance = getNextHydratableSibling(nextInstance);
            }
          }
          popToNextHostParent(fiber);
          if (fiber.tag === SuspenseComponent) {
            nextHydratableInstance = skipPastDehydratedSuspenseInstance(fiber);
          } else {
            nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
          }
          return true;
        }
        function resetHydrationState() {
          if (!supportsHydration) {
            return;
          }
          hydrationParentFiber = null;
          nextHydratableInstance = null;
          isHydrating = false;
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var didReceiveUpdate = false;
        var didWarnAboutBadClass;
        var didWarnAboutModulePatternComponent;
        var didWarnAboutContextTypeOnFunctionComponent;
        var didWarnAboutGetDerivedStateOnFunctionComponent;
        var didWarnAboutFunctionRefs;
        var didWarnAboutReassigningProps;
        var didWarnAboutRevealOrder;
        var didWarnAboutTailOptions;
        {
          didWarnAboutBadClass = {};
          didWarnAboutModulePatternComponent = {};
          didWarnAboutContextTypeOnFunctionComponent = {};
          didWarnAboutGetDerivedStateOnFunctionComponent = {};
          didWarnAboutFunctionRefs = {};
          didWarnAboutReassigningProps = false;
          didWarnAboutRevealOrder = {};
          didWarnAboutTailOptions = {};
        }
        function reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2) {
          if (current2 === null) {
            workInProgress2.child = mountChildFibers(workInProgress2, null, nextChildren, renderExpirationTime2);
          } else {
            workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, nextChildren, renderExpirationTime2);
          }
        }
        function forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderExpirationTime2) {
          workInProgress2.child = reconcileChildFibers(workInProgress2, current2.child, null, renderExpirationTime2);
          workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderExpirationTime2);
        }
        function updateForwardRef(current2, workInProgress2, Component, nextProps, renderExpirationTime2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component), getCurrentFiberStackInDev);
              }
            }
          }
          var render = Component.render;
          var ref = workInProgress2.ref;
          var nextChildren;
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            nextChildren = renderWithHooks(current2, workInProgress2, render, nextProps, ref, renderExpirationTime2);
            if (workInProgress2.mode & StrictMode) {
              if (workInProgress2.memoizedState !== null) {
                nextChildren = renderWithHooks(current2, workInProgress2, render, nextProps, ref, renderExpirationTime2);
              }
            }
            setIsRendering(false);
          }
          if (current2 !== null && !didReceiveUpdate) {
            bailoutHooks(current2, workInProgress2, renderExpirationTime2);
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
          }
          workInProgress2.effectTag |= PerformedWork;
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function updateMemoComponent(current2, workInProgress2, Component, nextProps, updateExpirationTime, renderExpirationTime2) {
          if (current2 === null) {
            var type = Component.type;
            if (isSimpleFunctionComponent(type) && Component.compare === null && Component.defaultProps === void 0) {
              var resolvedType = type;
              {
                resolvedType = resolveFunctionForHotReloading(type);
              }
              workInProgress2.tag = SimpleMemoComponent;
              workInProgress2.type = resolvedType;
              {
                validateFunctionComponentInDev(workInProgress2, type);
              }
              return updateSimpleMemoComponent(current2, workInProgress2, resolvedType, nextProps, updateExpirationTime, renderExpirationTime2);
            }
            {
              var innerPropTypes = type.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(type), getCurrentFiberStackInDev);
              }
            }
            var child = createFiberFromTypeAndProps(Component.type, null, nextProps, null, workInProgress2.mode, renderExpirationTime2);
            child.ref = workInProgress2.ref;
            child.return = workInProgress2;
            workInProgress2.child = child;
            return child;
          }
          {
            var _type = Component.type;
            var _innerPropTypes = _type.propTypes;
            if (_innerPropTypes) {
              checkPropTypes(_innerPropTypes, nextProps, "prop", getComponentName(_type), getCurrentFiberStackInDev);
            }
          }
          var currentChild = current2.child;
          if (updateExpirationTime < renderExpirationTime2) {
            var prevProps = currentChild.memoizedProps;
            var compare = Component.compare;
            compare = compare !== null ? compare : shallowEqual;
            if (compare(prevProps, nextProps) && current2.ref === workInProgress2.ref) {
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
            }
          }
          workInProgress2.effectTag |= PerformedWork;
          var newChild = createWorkInProgress(currentChild, nextProps);
          newChild.ref = workInProgress2.ref;
          newChild.return = workInProgress2;
          workInProgress2.child = newChild;
          return newChild;
        }
        function updateSimpleMemoComponent(current2, workInProgress2, Component, nextProps, updateExpirationTime, renderExpirationTime2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var outerMemoType = workInProgress2.elementType;
              if (outerMemoType.$$typeof === REACT_LAZY_TYPE) {
                outerMemoType = refineResolvedLazyComponent(outerMemoType);
              }
              var outerPropTypes = outerMemoType && outerMemoType.propTypes;
              if (outerPropTypes) {
                checkPropTypes(outerPropTypes, nextProps, "prop", getComponentName(outerMemoType), getCurrentFiberStackInDev);
              }
            }
          }
          if (current2 !== null) {
            var prevProps = current2.memoizedProps;
            if (shallowEqual(prevProps, nextProps) && current2.ref === workInProgress2.ref && workInProgress2.type === current2.type) {
              didReceiveUpdate = false;
              if (updateExpirationTime < renderExpirationTime2) {
                workInProgress2.expirationTime = current2.expirationTime;
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
              }
            }
          }
          return updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderExpirationTime2);
        }
        function updateFragment(current2, workInProgress2, renderExpirationTime2) {
          var nextChildren = workInProgress2.pendingProps;
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function updateMode(current2, workInProgress2, renderExpirationTime2) {
          var nextChildren = workInProgress2.pendingProps.children;
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function updateProfiler(current2, workInProgress2, renderExpirationTime2) {
          {
            workInProgress2.effectTag |= Update;
          }
          var nextProps = workInProgress2.pendingProps;
          var nextChildren = nextProps.children;
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function markRef(current2, workInProgress2) {
          var ref = workInProgress2.ref;
          if (current2 === null && ref !== null || current2 !== null && current2.ref !== ref) {
            workInProgress2.effectTag |= Ref;
          }
        }
        function updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderExpirationTime2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component), getCurrentFiberStackInDev);
              }
            }
          }
          var context;
          {
            var unmaskedContext = getUnmaskedContext(workInProgress2, Component, true);
            context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          var nextChildren;
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            nextChildren = renderWithHooks(current2, workInProgress2, Component, nextProps, context, renderExpirationTime2);
            if (workInProgress2.mode & StrictMode) {
              if (workInProgress2.memoizedState !== null) {
                nextChildren = renderWithHooks(current2, workInProgress2, Component, nextProps, context, renderExpirationTime2);
              }
            }
            setIsRendering(false);
          }
          if (current2 !== null && !didReceiveUpdate) {
            bailoutHooks(current2, workInProgress2, renderExpirationTime2);
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
          }
          workInProgress2.effectTag |= PerformedWork;
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function updateClassComponent(current2, workInProgress2, Component, nextProps, renderExpirationTime2) {
          {
            if (workInProgress2.type !== workInProgress2.elementType) {
              var innerPropTypes = Component.propTypes;
              if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, "prop", getComponentName(Component), getCurrentFiberStackInDev);
              }
            }
          }
          var hasContext;
          if (isContextProvider(Component)) {
            hasContext = true;
            pushContextProvider(workInProgress2);
          } else {
            hasContext = false;
          }
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          var instance = workInProgress2.stateNode;
          var shouldUpdate;
          if (instance === null) {
            if (current2 !== null) {
              current2.alternate = null;
              workInProgress2.alternate = null;
              workInProgress2.effectTag |= Placement;
            }
            constructClassInstance(workInProgress2, Component, nextProps);
            mountClassInstance(workInProgress2, Component, nextProps, renderExpirationTime2);
            shouldUpdate = true;
          } else if (current2 === null) {
            shouldUpdate = resumeMountClassInstance(workInProgress2, Component, nextProps, renderExpirationTime2);
          } else {
            shouldUpdate = updateClassInstance(current2, workInProgress2, Component, nextProps, renderExpirationTime2);
          }
          var nextUnitOfWork = finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderExpirationTime2);
          {
            var inst = workInProgress2.stateNode;
            if (inst.props !== nextProps) {
              if (!didWarnAboutReassigningProps) {
                error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", getComponentName(workInProgress2.type) || "a component");
              }
              didWarnAboutReassigningProps = true;
            }
          }
          return nextUnitOfWork;
        }
        function finishClassComponent(current2, workInProgress2, Component, shouldUpdate, hasContext, renderExpirationTime2) {
          markRef(current2, workInProgress2);
          var didCaptureError = (workInProgress2.effectTag & DidCapture) !== NoEffect;
          if (!shouldUpdate && !didCaptureError) {
            if (hasContext) {
              invalidateContextProvider(workInProgress2, Component, false);
            }
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
          }
          var instance = workInProgress2.stateNode;
          ReactCurrentOwner$1.current = workInProgress2;
          var nextChildren;
          if (didCaptureError && typeof Component.getDerivedStateFromError !== "function") {
            nextChildren = null;
            {
              stopProfilerTimerIfRunning();
            }
          } else {
            {
              setIsRendering(true);
              nextChildren = instance.render();
              if (workInProgress2.mode & StrictMode) {
                instance.render();
              }
              setIsRendering(false);
            }
          }
          workInProgress2.effectTag |= PerformedWork;
          if (current2 !== null && didCaptureError) {
            forceUnmountCurrentAndReconcile(current2, workInProgress2, nextChildren, renderExpirationTime2);
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          }
          workInProgress2.memoizedState = instance.state;
          if (hasContext) {
            invalidateContextProvider(workInProgress2, Component, true);
          }
          return workInProgress2.child;
        }
        function pushHostRootContext(workInProgress2) {
          var root = workInProgress2.stateNode;
          if (root.pendingContext) {
            pushTopLevelContextObject(workInProgress2, root.pendingContext, root.pendingContext !== root.context);
          } else if (root.context) {
            pushTopLevelContextObject(workInProgress2, root.context, false);
          }
          pushHostContainer(workInProgress2, root.containerInfo);
        }
        function updateHostRoot(current2, workInProgress2, renderExpirationTime2) {
          pushHostRootContext(workInProgress2);
          var updateQueue = workInProgress2.updateQueue;
          if (!(current2 !== null && updateQueue !== null)) {
            {
              throw Error("If the root does not have an updateQueue, we should have already bailed out. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          var nextProps = workInProgress2.pendingProps;
          var prevState = workInProgress2.memoizedState;
          var prevChildren = prevState !== null ? prevState.element : null;
          cloneUpdateQueue(current2, workInProgress2);
          processUpdateQueue(workInProgress2, nextProps, null, renderExpirationTime2);
          var nextState = workInProgress2.memoizedState;
          var nextChildren = nextState.element;
          if (nextChildren === prevChildren) {
            resetHydrationState();
            return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
          }
          var root = workInProgress2.stateNode;
          if (root.hydrate && enterHydrationState(workInProgress2)) {
            var child = mountChildFibers(workInProgress2, null, nextChildren, renderExpirationTime2);
            workInProgress2.child = child;
            var node = child;
            while (node) {
              node.effectTag = node.effectTag & ~Placement | Hydrating;
              node = node.sibling;
            }
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
            resetHydrationState();
          }
          return workInProgress2.child;
        }
        function updateHostComponent(current2, workInProgress2, renderExpirationTime2) {
          pushHostContext(workInProgress2);
          if (current2 === null) {
            tryToClaimNextHydratableInstance(workInProgress2);
          }
          var type = workInProgress2.type;
          var nextProps = workInProgress2.pendingProps;
          var prevProps = current2 !== null ? current2.memoizedProps : null;
          var nextChildren = nextProps.children;
          var isDirectTextChild = shouldSetTextContent(type, nextProps);
          if (isDirectTextChild) {
            nextChildren = null;
          } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
            workInProgress2.effectTag |= ContentReset;
          }
          markRef(current2, workInProgress2);
          if (workInProgress2.mode & ConcurrentMode && renderExpirationTime2 !== Never && shouldDeprioritizeSubtree(type, nextProps)) {
            {
              markSpawnedWork(Never);
            }
            workInProgress2.expirationTime = workInProgress2.childExpirationTime = Never;
            return null;
          }
          reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function updateHostText(current2, workInProgress2) {
          if (current2 === null) {
            tryToClaimNextHydratableInstance(workInProgress2);
          }
          return null;
        }
        function mountLazyComponent(_current, workInProgress2, elementType, updateExpirationTime, renderExpirationTime2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.effectTag |= Placement;
          }
          var props = workInProgress2.pendingProps;
          cancelWorkTimer(workInProgress2);
          var Component = readLazyComponentType(elementType);
          workInProgress2.type = Component;
          var resolvedTag = workInProgress2.tag = resolveLazyComponentTag(Component);
          startWorkTimer(workInProgress2);
          var resolvedProps = resolveDefaultProps(Component, props);
          var child;
          switch (resolvedTag) {
            case FunctionComponent: {
              {
                validateFunctionComponentInDev(workInProgress2, Component);
                workInProgress2.type = Component = resolveFunctionForHotReloading(Component);
              }
              child = updateFunctionComponent(null, workInProgress2, Component, resolvedProps, renderExpirationTime2);
              return child;
            }
            case ClassComponent: {
              {
                workInProgress2.type = Component = resolveClassForHotReloading(Component);
              }
              child = updateClassComponent(null, workInProgress2, Component, resolvedProps, renderExpirationTime2);
              return child;
            }
            case ForwardRef: {
              {
                workInProgress2.type = Component = resolveForwardRefForHotReloading(Component);
              }
              child = updateForwardRef(null, workInProgress2, Component, resolvedProps, renderExpirationTime2);
              return child;
            }
            case MemoComponent: {
              {
                if (workInProgress2.type !== workInProgress2.elementType) {
                  var outerPropTypes = Component.propTypes;
                  if (outerPropTypes) {
                    checkPropTypes(outerPropTypes, resolvedProps, "prop", getComponentName(Component), getCurrentFiberStackInDev);
                  }
                }
              }
              child = updateMemoComponent(null, workInProgress2, Component, resolveDefaultProps(Component.type, resolvedProps), updateExpirationTime, renderExpirationTime2);
              return child;
            }
          }
          var hint = "";
          {
            if (Component !== null && typeof Component === "object" && Component.$$typeof === REACT_LAZY_TYPE) {
              hint = " Did you wrap a component in React.lazy() more than once?";
            }
          }
          {
            {
              throw Error("Element type is invalid. Received a promise that resolves to: " + Component + ". Lazy element type must resolve to a class or function." + hint);
            }
          }
        }
        function mountIncompleteClassComponent(_current, workInProgress2, Component, nextProps, renderExpirationTime2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.effectTag |= Placement;
          }
          workInProgress2.tag = ClassComponent;
          var hasContext;
          if (isContextProvider(Component)) {
            hasContext = true;
            pushContextProvider(workInProgress2);
          } else {
            hasContext = false;
          }
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          constructClassInstance(workInProgress2, Component, nextProps);
          mountClassInstance(workInProgress2, Component, nextProps, renderExpirationTime2);
          return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderExpirationTime2);
        }
        function mountIndeterminateComponent(_current, workInProgress2, Component, renderExpirationTime2) {
          if (_current !== null) {
            _current.alternate = null;
            workInProgress2.alternate = null;
            workInProgress2.effectTag |= Placement;
          }
          var props = workInProgress2.pendingProps;
          var context;
          {
            var unmaskedContext = getUnmaskedContext(workInProgress2, Component, false);
            context = getMaskedContext(workInProgress2, unmaskedContext);
          }
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          var value;
          {
            if (Component.prototype && typeof Component.prototype.render === "function") {
              var componentName = getComponentName(Component) || "Unknown";
              if (!didWarnAboutBadClass[componentName]) {
                error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName);
                didWarnAboutBadClass[componentName] = true;
              }
            }
            if (workInProgress2.mode & StrictMode) {
              ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress2, null);
            }
            setIsRendering(true);
            ReactCurrentOwner$1.current = workInProgress2;
            value = renderWithHooks(null, workInProgress2, Component, props, context, renderExpirationTime2);
            setIsRendering(false);
          }
          workInProgress2.effectTag |= PerformedWork;
          if (typeof value === "object" && value !== null && typeof value.render === "function" && value.$$typeof === void 0) {
            {
              var _componentName = getComponentName(Component) || "Unknown";
              if (!didWarnAboutModulePatternComponent[_componentName]) {
                error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName, _componentName, _componentName);
                didWarnAboutModulePatternComponent[_componentName] = true;
              }
            }
            workInProgress2.tag = ClassComponent;
            workInProgress2.memoizedState = null;
            workInProgress2.updateQueue = null;
            var hasContext = false;
            if (isContextProvider(Component)) {
              hasContext = true;
              pushContextProvider(workInProgress2);
            } else {
              hasContext = false;
            }
            workInProgress2.memoizedState = value.state !== null && value.state !== void 0 ? value.state : null;
            initializeUpdateQueue(workInProgress2);
            var getDerivedStateFromProps = Component.getDerivedStateFromProps;
            if (typeof getDerivedStateFromProps === "function") {
              applyDerivedStateFromProps(workInProgress2, Component, getDerivedStateFromProps, props);
            }
            adoptClassInstance(workInProgress2, value);
            mountClassInstance(workInProgress2, Component, props, renderExpirationTime2);
            return finishClassComponent(null, workInProgress2, Component, true, hasContext, renderExpirationTime2);
          } else {
            workInProgress2.tag = FunctionComponent;
            {
              if (workInProgress2.mode & StrictMode) {
                if (workInProgress2.memoizedState !== null) {
                  value = renderWithHooks(null, workInProgress2, Component, props, context, renderExpirationTime2);
                }
              }
            }
            reconcileChildren(null, workInProgress2, value, renderExpirationTime2);
            {
              validateFunctionComponentInDev(workInProgress2, Component);
            }
            return workInProgress2.child;
          }
        }
        function validateFunctionComponentInDev(workInProgress2, Component) {
          {
            if (Component) {
              if (Component.childContextTypes) {
                error("%s(...): childContextTypes cannot be defined on a function component.", Component.displayName || Component.name || "Component");
              }
            }
            if (workInProgress2.ref !== null) {
              var info = "";
              var ownerName = getCurrentFiberOwnerNameInDevOrNull();
              if (ownerName) {
                info += "\n\nCheck the render method of `" + ownerName + "`.";
              }
              var warningKey = ownerName || workInProgress2._debugID || "";
              var debugSource = workInProgress2._debugSource;
              if (debugSource) {
                warningKey = debugSource.fileName + ":" + debugSource.lineNumber;
              }
              if (!didWarnAboutFunctionRefs[warningKey]) {
                didWarnAboutFunctionRefs[warningKey] = true;
                error("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", info);
              }
            }
            if (typeof Component.getDerivedStateFromProps === "function") {
              var _componentName2 = getComponentName(Component) || "Unknown";
              if (!didWarnAboutGetDerivedStateOnFunctionComponent[_componentName2]) {
                error("%s: Function components do not support getDerivedStateFromProps.", _componentName2);
                didWarnAboutGetDerivedStateOnFunctionComponent[_componentName2] = true;
              }
            }
            if (typeof Component.contextType === "object" && Component.contextType !== null) {
              var _componentName3 = getComponentName(Component) || "Unknown";
              if (!didWarnAboutContextTypeOnFunctionComponent[_componentName3]) {
                error("%s: Function components do not support contextType.", _componentName3);
                didWarnAboutContextTypeOnFunctionComponent[_componentName3] = true;
              }
            }
          }
        }
        var SUSPENDED_MARKER = {
          dehydrated: null,
          retryTime: NoWork
        };
        function shouldRemainOnFallback(suspenseContext, current2, workInProgress2) {
          return hasSuspenseContext(suspenseContext, ForceSuspenseFallback) && (current2 === null || current2.memoizedState !== null);
        }
        function updateSuspenseComponent(current2, workInProgress2, renderExpirationTime2) {
          var mode = workInProgress2.mode;
          var nextProps = workInProgress2.pendingProps;
          {
            if (shouldSuspend(workInProgress2)) {
              workInProgress2.effectTag |= DidCapture;
            }
          }
          var suspenseContext = suspenseStackCursor.current;
          var nextDidTimeout = false;
          var didSuspend = (workInProgress2.effectTag & DidCapture) !== NoEffect;
          if (didSuspend || shouldRemainOnFallback(suspenseContext, current2)) {
            nextDidTimeout = true;
            workInProgress2.effectTag &= ~DidCapture;
          } else {
            if (current2 === null || current2.memoizedState !== null) {
              if (nextProps.fallback !== void 0 && nextProps.unstable_avoidThisFallback !== true) {
                suspenseContext = addSubtreeSuspenseContext(suspenseContext, InvisibleParentSuspenseContext);
              }
            }
          }
          suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
          pushSuspenseContext(workInProgress2, suspenseContext);
          if (current2 === null) {
            if (nextProps.fallback !== void 0) {
              tryToClaimNextHydratableInstance(workInProgress2);
            }
            if (nextDidTimeout) {
              var nextFallbackChildren = nextProps.fallback;
              var primaryChildFragment = createFiberFromFragment(null, mode, NoWork, null);
              primaryChildFragment.return = workInProgress2;
              if ((workInProgress2.mode & BlockingMode) === NoMode) {
                var progressedState = workInProgress2.memoizedState;
                var progressedPrimaryChild = progressedState !== null ? workInProgress2.child.child : workInProgress2.child;
                primaryChildFragment.child = progressedPrimaryChild;
                var progressedChild = progressedPrimaryChild;
                while (progressedChild !== null) {
                  progressedChild.return = primaryChildFragment;
                  progressedChild = progressedChild.sibling;
                }
              }
              var fallbackChildFragment = createFiberFromFragment(nextFallbackChildren, mode, renderExpirationTime2, null);
              fallbackChildFragment.return = workInProgress2;
              primaryChildFragment.sibling = fallbackChildFragment;
              workInProgress2.memoizedState = SUSPENDED_MARKER;
              workInProgress2.child = primaryChildFragment;
              return fallbackChildFragment;
            } else {
              var nextPrimaryChildren = nextProps.children;
              workInProgress2.memoizedState = null;
              return workInProgress2.child = mountChildFibers(workInProgress2, null, nextPrimaryChildren, renderExpirationTime2);
            }
          } else {
            var prevState = current2.memoizedState;
            if (prevState !== null) {
              var currentPrimaryChildFragment = current2.child;
              var currentFallbackChildFragment = currentPrimaryChildFragment.sibling;
              if (nextDidTimeout) {
                var _nextFallbackChildren2 = nextProps.fallback;
                var _primaryChildFragment2 = createWorkInProgress(currentPrimaryChildFragment, currentPrimaryChildFragment.pendingProps);
                _primaryChildFragment2.return = workInProgress2;
                if ((workInProgress2.mode & BlockingMode) === NoMode) {
                  var _progressedState = workInProgress2.memoizedState;
                  var _progressedPrimaryChild = _progressedState !== null ? workInProgress2.child.child : workInProgress2.child;
                  if (_progressedPrimaryChild !== currentPrimaryChildFragment.child) {
                    _primaryChildFragment2.child = _progressedPrimaryChild;
                    var _progressedChild2 = _progressedPrimaryChild;
                    while (_progressedChild2 !== null) {
                      _progressedChild2.return = _primaryChildFragment2;
                      _progressedChild2 = _progressedChild2.sibling;
                    }
                  }
                }
                if (workInProgress2.mode & ProfileMode) {
                  var _treeBaseDuration = 0;
                  var _hiddenChild = _primaryChildFragment2.child;
                  while (_hiddenChild !== null) {
                    _treeBaseDuration += _hiddenChild.treeBaseDuration;
                    _hiddenChild = _hiddenChild.sibling;
                  }
                  _primaryChildFragment2.treeBaseDuration = _treeBaseDuration;
                }
                var _fallbackChildFragment2 = createWorkInProgress(currentFallbackChildFragment, _nextFallbackChildren2);
                _fallbackChildFragment2.return = workInProgress2;
                _primaryChildFragment2.sibling = _fallbackChildFragment2;
                _primaryChildFragment2.childExpirationTime = NoWork;
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                workInProgress2.child = _primaryChildFragment2;
                return _fallbackChildFragment2;
              } else {
                var _nextPrimaryChildren = nextProps.children;
                var currentPrimaryChild = currentPrimaryChildFragment.child;
                var primaryChild = reconcileChildFibers(workInProgress2, currentPrimaryChild, _nextPrimaryChildren, renderExpirationTime2);
                workInProgress2.memoizedState = null;
                return workInProgress2.child = primaryChild;
              }
            } else {
              var _currentPrimaryChild = current2.child;
              if (nextDidTimeout) {
                var _nextFallbackChildren3 = nextProps.fallback;
                var _primaryChildFragment3 = createFiberFromFragment(null, mode, NoWork, null);
                _primaryChildFragment3.return = workInProgress2;
                _primaryChildFragment3.child = _currentPrimaryChild;
                if (_currentPrimaryChild !== null) {
                  _currentPrimaryChild.return = _primaryChildFragment3;
                }
                if ((workInProgress2.mode & BlockingMode) === NoMode) {
                  var _progressedState2 = workInProgress2.memoizedState;
                  var _progressedPrimaryChild2 = _progressedState2 !== null ? workInProgress2.child.child : workInProgress2.child;
                  _primaryChildFragment3.child = _progressedPrimaryChild2;
                  var _progressedChild3 = _progressedPrimaryChild2;
                  while (_progressedChild3 !== null) {
                    _progressedChild3.return = _primaryChildFragment3;
                    _progressedChild3 = _progressedChild3.sibling;
                  }
                }
                if (workInProgress2.mode & ProfileMode) {
                  var _treeBaseDuration2 = 0;
                  var _hiddenChild2 = _primaryChildFragment3.child;
                  while (_hiddenChild2 !== null) {
                    _treeBaseDuration2 += _hiddenChild2.treeBaseDuration;
                    _hiddenChild2 = _hiddenChild2.sibling;
                  }
                  _primaryChildFragment3.treeBaseDuration = _treeBaseDuration2;
                }
                var _fallbackChildFragment3 = createFiberFromFragment(_nextFallbackChildren3, mode, renderExpirationTime2, null);
                _fallbackChildFragment3.return = workInProgress2;
                _primaryChildFragment3.sibling = _fallbackChildFragment3;
                _fallbackChildFragment3.effectTag |= Placement;
                _primaryChildFragment3.childExpirationTime = NoWork;
                workInProgress2.memoizedState = SUSPENDED_MARKER;
                workInProgress2.child = _primaryChildFragment3;
                return _fallbackChildFragment3;
              } else {
                workInProgress2.memoizedState = null;
                var _nextPrimaryChildren2 = nextProps.children;
                return workInProgress2.child = reconcileChildFibers(workInProgress2, _currentPrimaryChild, _nextPrimaryChildren2, renderExpirationTime2);
              }
            }
          }
        }
        function scheduleWorkOnFiber(fiber, renderExpirationTime2) {
          if (fiber.expirationTime < renderExpirationTime2) {
            fiber.expirationTime = renderExpirationTime2;
          }
          var alternate = fiber.alternate;
          if (alternate !== null && alternate.expirationTime < renderExpirationTime2) {
            alternate.expirationTime = renderExpirationTime2;
          }
          scheduleWorkOnParentPath(fiber.return, renderExpirationTime2);
        }
        function propagateSuspenseContextChange(workInProgress2, firstChild, renderExpirationTime2) {
          var node = firstChild;
          while (node !== null) {
            if (node.tag === SuspenseComponent) {
              var state = node.memoizedState;
              if (state !== null) {
                scheduleWorkOnFiber(node, renderExpirationTime2);
              }
            } else if (node.tag === SuspenseListComponent) {
              scheduleWorkOnFiber(node, renderExpirationTime2);
            } else if (node.child !== null) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === workInProgress2) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === workInProgress2) {
                return;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function findLastContentRow(firstChild) {
          var row = firstChild;
          var lastContentRow = null;
          while (row !== null) {
            var currentRow = row.alternate;
            if (currentRow !== null && findFirstSuspended(currentRow) === null) {
              lastContentRow = row;
            }
            row = row.sibling;
          }
          return lastContentRow;
        }
        function validateRevealOrder(revealOrder) {
          {
            if (revealOrder !== void 0 && revealOrder !== "forwards" && revealOrder !== "backwards" && revealOrder !== "together" && !didWarnAboutRevealOrder[revealOrder]) {
              didWarnAboutRevealOrder[revealOrder] = true;
              if (typeof revealOrder === "string") {
                switch (revealOrder.toLowerCase()) {
                  case "together":
                  case "forwards":
                  case "backwards": {
                    error('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', revealOrder, revealOrder.toLowerCase());
                    break;
                  }
                  case "forward":
                  case "backward": {
                    error('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', revealOrder, revealOrder.toLowerCase());
                    break;
                  }
                  default:
                    error('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
                    break;
                }
              } else {
                error('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', revealOrder);
              }
            }
          }
        }
        function validateTailOptions(tailMode, revealOrder) {
          {
            if (tailMode !== void 0 && !didWarnAboutTailOptions[tailMode]) {
              if (tailMode !== "collapsed" && tailMode !== "hidden") {
                didWarnAboutTailOptions[tailMode] = true;
                error('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', tailMode);
              } else if (revealOrder !== "forwards" && revealOrder !== "backwards") {
                didWarnAboutTailOptions[tailMode] = true;
                error('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', tailMode);
              }
            }
          }
        }
        function validateSuspenseListNestedChild(childSlot, index2) {
          {
            var isArray2 = Array.isArray(childSlot);
            var isIterable = !isArray2 && typeof getIteratorFn(childSlot) === "function";
            if (isArray2 || isIterable) {
              var type = isArray2 ? "array" : "iterable";
              error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", type, index2, type);
              return false;
            }
          }
          return true;
        }
        function validateSuspenseListChildren(children, revealOrder) {
          {
            if ((revealOrder === "forwards" || revealOrder === "backwards") && children !== void 0 && children !== null && children !== false) {
              if (Array.isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                  if (!validateSuspenseListNestedChild(children[i], i)) {
                    return;
                  }
                }
              } else {
                var iteratorFn = getIteratorFn(children);
                if (typeof iteratorFn === "function") {
                  var childrenIterator = iteratorFn.call(children);
                  if (childrenIterator) {
                    var step = childrenIterator.next();
                    var _i = 0;
                    for (; !step.done; step = childrenIterator.next()) {
                      if (!validateSuspenseListNestedChild(step.value, _i)) {
                        return;
                      }
                      _i++;
                    }
                  }
                } else {
                  error('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', revealOrder);
                }
              }
            }
          }
        }
        function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, lastEffectBeforeRendering) {
          var renderState = workInProgress2.memoizedState;
          if (renderState === null) {
            workInProgress2.memoizedState = {
              isBackwards,
              rendering: null,
              renderingStartTime: 0,
              last: lastContentRow,
              tail,
              tailExpiration: 0,
              tailMode,
              lastEffect: lastEffectBeforeRendering
            };
          } else {
            renderState.isBackwards = isBackwards;
            renderState.rendering = null;
            renderState.renderingStartTime = 0;
            renderState.last = lastContentRow;
            renderState.tail = tail;
            renderState.tailExpiration = 0;
            renderState.tailMode = tailMode;
            renderState.lastEffect = lastEffectBeforeRendering;
          }
        }
        function updateSuspenseListComponent(current2, workInProgress2, renderExpirationTime2) {
          var nextProps = workInProgress2.pendingProps;
          var revealOrder = nextProps.revealOrder;
          var tailMode = nextProps.tail;
          var newChildren = nextProps.children;
          validateRevealOrder(revealOrder);
          validateTailOptions(tailMode, revealOrder);
          validateSuspenseListChildren(newChildren, revealOrder);
          reconcileChildren(current2, workInProgress2, newChildren, renderExpirationTime2);
          var suspenseContext = suspenseStackCursor.current;
          var shouldForceFallback = hasSuspenseContext(suspenseContext, ForceSuspenseFallback);
          if (shouldForceFallback) {
            suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
            workInProgress2.effectTag |= DidCapture;
          } else {
            var didSuspendBefore = current2 !== null && (current2.effectTag & DidCapture) !== NoEffect;
            if (didSuspendBefore) {
              propagateSuspenseContextChange(workInProgress2, workInProgress2.child, renderExpirationTime2);
            }
            suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
          }
          pushSuspenseContext(workInProgress2, suspenseContext);
          if ((workInProgress2.mode & BlockingMode) === NoMode) {
            workInProgress2.memoizedState = null;
          } else {
            switch (revealOrder) {
              case "forwards": {
                var lastContentRow = findLastContentRow(workInProgress2.child);
                var tail;
                if (lastContentRow === null) {
                  tail = workInProgress2.child;
                  workInProgress2.child = null;
                } else {
                  tail = lastContentRow.sibling;
                  lastContentRow.sibling = null;
                }
                initSuspenseListRenderState(workInProgress2, false, tail, lastContentRow, tailMode, workInProgress2.lastEffect);
                break;
              }
              case "backwards": {
                var _tail = null;
                var row = workInProgress2.child;
                workInProgress2.child = null;
                while (row !== null) {
                  var currentRow = row.alternate;
                  if (currentRow !== null && findFirstSuspended(currentRow) === null) {
                    workInProgress2.child = row;
                    break;
                  }
                  var nextRow = row.sibling;
                  row.sibling = _tail;
                  _tail = row;
                  row = nextRow;
                }
                initSuspenseListRenderState(workInProgress2, true, _tail, null, tailMode, workInProgress2.lastEffect);
                break;
              }
              case "together": {
                initSuspenseListRenderState(workInProgress2, false, null, null, void 0, workInProgress2.lastEffect);
                break;
              }
              default: {
                workInProgress2.memoizedState = null;
              }
            }
          }
          return workInProgress2.child;
        }
        function updatePortalComponent(current2, workInProgress2, renderExpirationTime2) {
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          var nextChildren = workInProgress2.pendingProps;
          if (current2 === null) {
            workInProgress2.child = reconcileChildFibers(workInProgress2, null, nextChildren, renderExpirationTime2);
          } else {
            reconcileChildren(current2, workInProgress2, nextChildren, renderExpirationTime2);
          }
          return workInProgress2.child;
        }
        function updateContextProvider(current2, workInProgress2, renderExpirationTime2) {
          var providerType = workInProgress2.type;
          var context = providerType._context;
          var newProps = workInProgress2.pendingProps;
          var oldProps = workInProgress2.memoizedProps;
          var newValue = newProps.value;
          {
            var providerPropTypes = workInProgress2.type.propTypes;
            if (providerPropTypes) {
              checkPropTypes(providerPropTypes, newProps, "prop", "Context.Provider", getCurrentFiberStackInDev);
            }
          }
          pushProvider(workInProgress2, newValue);
          if (oldProps !== null) {
            var oldValue = oldProps.value;
            var changedBits = calculateChangedBits(context, newValue, oldValue);
            if (changedBits === 0) {
              if (oldProps.children === newProps.children && !hasContextChanged()) {
                return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
              }
            } else {
              propagateContextChange(workInProgress2, context, changedBits, renderExpirationTime2);
            }
          }
          var newChildren = newProps.children;
          reconcileChildren(current2, workInProgress2, newChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        var hasWarnedAboutUsingContextAsConsumer = false;
        function updateContextConsumer(current2, workInProgress2, renderExpirationTime2) {
          var context = workInProgress2.type;
          {
            if (context._context === void 0) {
              if (context !== context.Consumer) {
                if (!hasWarnedAboutUsingContextAsConsumer) {
                  hasWarnedAboutUsingContextAsConsumer = true;
                  error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                }
              }
            } else {
              context = context._context;
            }
          }
          var newProps = workInProgress2.pendingProps;
          var render = newProps.children;
          {
            if (typeof render !== "function") {
              error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it.");
            }
          }
          prepareToReadContext(workInProgress2, renderExpirationTime2);
          var newValue = readContext(context, newProps.unstable_observedBits);
          var newChildren;
          {
            ReactCurrentOwner$1.current = workInProgress2;
            setIsRendering(true);
            newChildren = render(newValue);
            setIsRendering(false);
          }
          workInProgress2.effectTag |= PerformedWork;
          reconcileChildren(current2, workInProgress2, newChildren, renderExpirationTime2);
          return workInProgress2.child;
        }
        function markWorkInProgressReceivedUpdate() {
          didReceiveUpdate = true;
        }
        function bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2) {
          cancelWorkTimer(workInProgress2);
          if (current2 !== null) {
            workInProgress2.dependencies = current2.dependencies;
          }
          {
            stopProfilerTimerIfRunning();
          }
          var updateExpirationTime = workInProgress2.expirationTime;
          if (updateExpirationTime !== NoWork) {
            markUnprocessedUpdateTime(updateExpirationTime);
          }
          var childExpirationTime = workInProgress2.childExpirationTime;
          if (childExpirationTime < renderExpirationTime2) {
            return null;
          } else {
            cloneChildFibers(current2, workInProgress2);
            return workInProgress2.child;
          }
        }
        function remountFiber(current2, oldWorkInProgress, newWorkInProgress) {
          {
            var returnFiber = oldWorkInProgress.return;
            if (returnFiber === null) {
              throw new Error("Cannot swap the root fiber.");
            }
            current2.alternate = null;
            oldWorkInProgress.alternate = null;
            newWorkInProgress.index = oldWorkInProgress.index;
            newWorkInProgress.sibling = oldWorkInProgress.sibling;
            newWorkInProgress.return = oldWorkInProgress.return;
            newWorkInProgress.ref = oldWorkInProgress.ref;
            if (oldWorkInProgress === returnFiber.child) {
              returnFiber.child = newWorkInProgress;
            } else {
              var prevSibling = returnFiber.child;
              if (prevSibling === null) {
                throw new Error("Expected parent to have a child.");
              }
              while (prevSibling.sibling !== oldWorkInProgress) {
                prevSibling = prevSibling.sibling;
                if (prevSibling === null) {
                  throw new Error("Expected to find the previous sibling.");
                }
              }
              prevSibling.sibling = newWorkInProgress;
            }
            var last = returnFiber.lastEffect;
            if (last !== null) {
              last.nextEffect = current2;
              returnFiber.lastEffect = current2;
            } else {
              returnFiber.firstEffect = returnFiber.lastEffect = current2;
            }
            current2.nextEffect = null;
            current2.effectTag = Deletion;
            newWorkInProgress.effectTag |= Placement;
            return newWorkInProgress;
          }
        }
        function beginWork(current2, workInProgress2, renderExpirationTime2) {
          var updateExpirationTime = workInProgress2.expirationTime;
          {
            if (workInProgress2._debugNeedsRemount && current2 !== null) {
              return remountFiber(current2, workInProgress2, createFiberFromTypeAndProps(workInProgress2.type, workInProgress2.key, workInProgress2.pendingProps, workInProgress2._debugOwner || null, workInProgress2.mode, workInProgress2.expirationTime));
            }
          }
          if (current2 !== null) {
            var oldProps = current2.memoizedProps;
            var newProps = workInProgress2.pendingProps;
            if (oldProps !== newProps || hasContextChanged() || workInProgress2.type !== current2.type) {
              didReceiveUpdate = true;
            } else if (updateExpirationTime < renderExpirationTime2) {
              didReceiveUpdate = false;
              switch (workInProgress2.tag) {
                case HostRoot:
                  pushHostRootContext(workInProgress2);
                  resetHydrationState();
                  break;
                case HostComponent:
                  pushHostContext(workInProgress2);
                  if (workInProgress2.mode & ConcurrentMode && renderExpirationTime2 !== Never && shouldDeprioritizeSubtree(workInProgress2.type, newProps)) {
                    {
                      markSpawnedWork(Never);
                    }
                    workInProgress2.expirationTime = workInProgress2.childExpirationTime = Never;
                    return null;
                  }
                  break;
                case ClassComponent: {
                  var Component = workInProgress2.type;
                  if (isContextProvider(Component)) {
                    pushContextProvider(workInProgress2);
                  }
                  break;
                }
                case HostPortal:
                  pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
                  break;
                case ContextProvider: {
                  var newValue = workInProgress2.memoizedProps.value;
                  pushProvider(workInProgress2, newValue);
                  break;
                }
                case Profiler:
                  {
                    var hasChildWork = workInProgress2.childExpirationTime >= renderExpirationTime2;
                    if (hasChildWork) {
                      workInProgress2.effectTag |= Update;
                    }
                  }
                  break;
                case SuspenseComponent: {
                  var state = workInProgress2.memoizedState;
                  if (state !== null) {
                    var primaryChildFragment = workInProgress2.child;
                    var primaryChildExpirationTime = primaryChildFragment.childExpirationTime;
                    if (primaryChildExpirationTime !== NoWork && primaryChildExpirationTime >= renderExpirationTime2) {
                      return updateSuspenseComponent(current2, workInProgress2, renderExpirationTime2);
                    } else {
                      pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                      var child = bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
                      if (child !== null) {
                        return child.sibling;
                      } else {
                        return null;
                      }
                    }
                  } else {
                    pushSuspenseContext(workInProgress2, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                  }
                  break;
                }
                case SuspenseListComponent: {
                  var didSuspendBefore = (current2.effectTag & DidCapture) !== NoEffect;
                  var _hasChildWork = workInProgress2.childExpirationTime >= renderExpirationTime2;
                  if (didSuspendBefore) {
                    if (_hasChildWork) {
                      return updateSuspenseListComponent(current2, workInProgress2, renderExpirationTime2);
                    }
                    workInProgress2.effectTag |= DidCapture;
                  }
                  var renderState = workInProgress2.memoizedState;
                  if (renderState !== null) {
                    renderState.rendering = null;
                    renderState.tail = null;
                  }
                  pushSuspenseContext(workInProgress2, suspenseStackCursor.current);
                  if (_hasChildWork) {
                    break;
                  } else {
                    return null;
                  }
                }
              }
              return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderExpirationTime2);
            } else {
              didReceiveUpdate = false;
            }
          } else {
            didReceiveUpdate = false;
          }
          workInProgress2.expirationTime = NoWork;
          switch (workInProgress2.tag) {
            case IndeterminateComponent: {
              return mountIndeterminateComponent(current2, workInProgress2, workInProgress2.type, renderExpirationTime2);
            }
            case LazyComponent: {
              var elementType = workInProgress2.elementType;
              return mountLazyComponent(current2, workInProgress2, elementType, updateExpirationTime, renderExpirationTime2);
            }
            case FunctionComponent: {
              var _Component = workInProgress2.type;
              var unresolvedProps = workInProgress2.pendingProps;
              var resolvedProps = workInProgress2.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
              return updateFunctionComponent(current2, workInProgress2, _Component, resolvedProps, renderExpirationTime2);
            }
            case ClassComponent: {
              var _Component2 = workInProgress2.type;
              var _unresolvedProps = workInProgress2.pendingProps;
              var _resolvedProps = workInProgress2.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);
              return updateClassComponent(current2, workInProgress2, _Component2, _resolvedProps, renderExpirationTime2);
            }
            case HostRoot:
              return updateHostRoot(current2, workInProgress2, renderExpirationTime2);
            case HostComponent:
              return updateHostComponent(current2, workInProgress2, renderExpirationTime2);
            case HostText:
              return updateHostText(current2, workInProgress2);
            case SuspenseComponent:
              return updateSuspenseComponent(current2, workInProgress2, renderExpirationTime2);
            case HostPortal:
              return updatePortalComponent(current2, workInProgress2, renderExpirationTime2);
            case ForwardRef: {
              var type = workInProgress2.type;
              var _unresolvedProps2 = workInProgress2.pendingProps;
              var _resolvedProps2 = workInProgress2.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);
              return updateForwardRef(current2, workInProgress2, type, _resolvedProps2, renderExpirationTime2);
            }
            case Fragment:
              return updateFragment(current2, workInProgress2, renderExpirationTime2);
            case Mode:
              return updateMode(current2, workInProgress2, renderExpirationTime2);
            case Profiler:
              return updateProfiler(current2, workInProgress2, renderExpirationTime2);
            case ContextProvider:
              return updateContextProvider(current2, workInProgress2, renderExpirationTime2);
            case ContextConsumer:
              return updateContextConsumer(current2, workInProgress2, renderExpirationTime2);
            case MemoComponent: {
              var _type2 = workInProgress2.type;
              var _unresolvedProps3 = workInProgress2.pendingProps;
              var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);
              {
                if (workInProgress2.type !== workInProgress2.elementType) {
                  var outerPropTypes = _type2.propTypes;
                  if (outerPropTypes) {
                    checkPropTypes(outerPropTypes, _resolvedProps3, "prop", getComponentName(_type2), getCurrentFiberStackInDev);
                  }
                }
              }
              _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
              return updateMemoComponent(current2, workInProgress2, _type2, _resolvedProps3, updateExpirationTime, renderExpirationTime2);
            }
            case SimpleMemoComponent: {
              return updateSimpleMemoComponent(current2, workInProgress2, workInProgress2.type, workInProgress2.pendingProps, updateExpirationTime, renderExpirationTime2);
            }
            case IncompleteClassComponent: {
              var _Component3 = workInProgress2.type;
              var _unresolvedProps4 = workInProgress2.pendingProps;
              var _resolvedProps4 = workInProgress2.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4);
              return mountIncompleteClassComponent(current2, workInProgress2, _Component3, _resolvedProps4, renderExpirationTime2);
            }
            case SuspenseListComponent: {
              return updateSuspenseListComponent(current2, workInProgress2, renderExpirationTime2);
            }
          }
          {
            {
              throw Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function markUpdate(workInProgress2) {
          workInProgress2.effectTag |= Update;
        }
        function markRef$1(workInProgress2) {
          workInProgress2.effectTag |= Ref;
        }
        var appendAllChildren;
        var updateHostContainer;
        var updateHostComponent$1;
        var updateHostText$1;
        if (supportsMutation) {
          appendAllChildren = function(parent, workInProgress2, needsVisibilityToggle, isHidden) {
            var node = workInProgress2.child;
            while (node !== null) {
              if (node.tag === HostComponent || node.tag === HostText) {
                appendInitialChild(parent, node.stateNode);
              } else if (node.tag === HostPortal)
                ;
              else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === workInProgress2) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress2) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          };
          updateHostContainer = function(workInProgress2) {
          };
          updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
            var oldProps = current2.memoizedProps;
            if (oldProps === newProps) {
              return;
            }
            var instance = workInProgress2.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
            workInProgress2.updateQueue = updatePayload;
            if (updatePayload) {
              markUpdate(workInProgress2);
            }
          };
          updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
            if (oldText !== newText) {
              markUpdate(workInProgress2);
            }
          };
        } else if (supportsPersistence) {
          appendAllChildren = function(parent, workInProgress2, needsVisibilityToggle, isHidden) {
            var node = workInProgress2.child;
            while (node !== null) {
              if (node.tag === HostComponent) {
                var instance = node.stateNode;
                if (needsVisibilityToggle && isHidden) {
                  var props = node.memoizedProps;
                  var type = node.type;
                  instance = cloneHiddenInstance(instance, type, props, node);
                }
                appendInitialChild(parent, instance);
              } else if (node.tag === HostText) {
                var _instance = node.stateNode;
                if (needsVisibilityToggle && isHidden) {
                  var text = node.memoizedProps;
                  _instance = cloneHiddenTextInstance(_instance, text, node);
                }
                appendInitialChild(parent, _instance);
              } else if (node.tag === HostPortal)
                ;
              else if (node.tag === SuspenseComponent) {
                if ((node.effectTag & Update) !== NoEffect) {
                  var newIsHidden = node.memoizedState !== null;
                  if (newIsHidden) {
                    var primaryChildParent = node.child;
                    if (primaryChildParent !== null) {
                      if (primaryChildParent.child !== null) {
                        primaryChildParent.child.return = primaryChildParent;
                        appendAllChildren(parent, primaryChildParent, true, newIsHidden);
                      }
                      var fallbackChildParent = primaryChildParent.sibling;
                      if (fallbackChildParent !== null) {
                        fallbackChildParent.return = node;
                        node = fallbackChildParent;
                        continue;
                      }
                    }
                  }
                }
                if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              node = node;
              if (node === workInProgress2) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress2) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          };
          var appendAllChildrenToContainer = function(containerChildSet, workInProgress2, needsVisibilityToggle, isHidden) {
            var node = workInProgress2.child;
            while (node !== null) {
              if (node.tag === HostComponent) {
                var instance = node.stateNode;
                if (needsVisibilityToggle && isHidden) {
                  var props = node.memoizedProps;
                  var type = node.type;
                  instance = cloneHiddenInstance(instance, type, props, node);
                }
                appendChildToContainerChildSet(containerChildSet, instance);
              } else if (node.tag === HostText) {
                var _instance3 = node.stateNode;
                if (needsVisibilityToggle && isHidden) {
                  var text = node.memoizedProps;
                  _instance3 = cloneHiddenTextInstance(_instance3, text, node);
                }
                appendChildToContainerChildSet(containerChildSet, _instance3);
              } else if (node.tag === HostPortal)
                ;
              else if (node.tag === SuspenseComponent) {
                if ((node.effectTag & Update) !== NoEffect) {
                  var newIsHidden = node.memoizedState !== null;
                  if (newIsHidden) {
                    var primaryChildParent = node.child;
                    if (primaryChildParent !== null) {
                      if (primaryChildParent.child !== null) {
                        primaryChildParent.child.return = primaryChildParent;
                        appendAllChildrenToContainer(containerChildSet, primaryChildParent, true, newIsHidden);
                      }
                      var fallbackChildParent = primaryChildParent.sibling;
                      if (fallbackChildParent !== null) {
                        fallbackChildParent.return = node;
                        node = fallbackChildParent;
                        continue;
                      }
                    }
                  }
                }
                if (node.child !== null) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              node = node;
              if (node === workInProgress2) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === workInProgress2) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          };
          updateHostContainer = function(workInProgress2) {
            var portalOrRoot = workInProgress2.stateNode;
            var childrenUnchanged = workInProgress2.firstEffect === null;
            if (childrenUnchanged)
              ;
            else {
              var container = portalOrRoot.containerInfo;
              var newChildSet = createContainerChildSet(container);
              appendAllChildrenToContainer(newChildSet, workInProgress2, false, false);
              portalOrRoot.pendingChildren = newChildSet;
              markUpdate(workInProgress2);
              finalizeContainerChildren(container, newChildSet);
            }
          };
          updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
            var currentInstance = current2.stateNode;
            var oldProps = current2.memoizedProps;
            var childrenUnchanged = workInProgress2.firstEffect === null;
            if (childrenUnchanged && oldProps === newProps) {
              workInProgress2.stateNode = currentInstance;
              return;
            }
            var recyclableInstance = workInProgress2.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = null;
            if (oldProps !== newProps) {
              updatePayload = prepareUpdate(recyclableInstance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
            }
            if (childrenUnchanged && updatePayload === null) {
              workInProgress2.stateNode = currentInstance;
              return;
            }
            var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress2, childrenUnchanged, recyclableInstance);
            if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
              markUpdate(workInProgress2);
            }
            workInProgress2.stateNode = newInstance;
            if (childrenUnchanged) {
              markUpdate(workInProgress2);
            } else {
              appendAllChildren(newInstance, workInProgress2, false, false);
            }
          };
          updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
            if (oldText !== newText) {
              var rootContainerInstance = getRootHostContainer();
              var currentHostContext = getHostContext();
              workInProgress2.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress2);
              markUpdate(workInProgress2);
            } else {
              workInProgress2.stateNode = current2.stateNode;
            }
          };
        } else {
          updateHostContainer = function(workInProgress2) {
          };
          updateHostComponent$1 = function(current2, workInProgress2, type, newProps, rootContainerInstance) {
          };
          updateHostText$1 = function(current2, workInProgress2, oldText, newText) {
          };
        }
        function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
          switch (renderState.tailMode) {
            case "hidden": {
              var tailNode = renderState.tail;
              var lastTailNode = null;
              while (tailNode !== null) {
                if (tailNode.alternate !== null) {
                  lastTailNode = tailNode;
                }
                tailNode = tailNode.sibling;
              }
              if (lastTailNode === null) {
                renderState.tail = null;
              } else {
                lastTailNode.sibling = null;
              }
              break;
            }
            case "collapsed": {
              var _tailNode = renderState.tail;
              var _lastTailNode = null;
              while (_tailNode !== null) {
                if (_tailNode.alternate !== null) {
                  _lastTailNode = _tailNode;
                }
                _tailNode = _tailNode.sibling;
              }
              if (_lastTailNode === null) {
                if (!hasRenderedATailFallback && renderState.tail !== null) {
                  renderState.tail.sibling = null;
                } else {
                  renderState.tail = null;
                }
              } else {
                _lastTailNode.sibling = null;
              }
              break;
            }
          }
        }
        function completeWork(current2, workInProgress2, renderExpirationTime2) {
          var newProps = workInProgress2.pendingProps;
          switch (workInProgress2.tag) {
            case IndeterminateComponent:
            case LazyComponent:
            case SimpleMemoComponent:
            case FunctionComponent:
            case ForwardRef:
            case Fragment:
            case Mode:
            case Profiler:
            case ContextConsumer:
            case MemoComponent:
              return null;
            case ClassComponent: {
              var Component = workInProgress2.type;
              if (isContextProvider(Component)) {
                popContext(workInProgress2);
              }
              return null;
            }
            case HostRoot: {
              popHostContainer(workInProgress2);
              popTopLevelContextObject(workInProgress2);
              var fiberRoot = workInProgress2.stateNode;
              if (fiberRoot.pendingContext) {
                fiberRoot.context = fiberRoot.pendingContext;
                fiberRoot.pendingContext = null;
              }
              if (current2 === null || current2.child === null) {
                var wasHydrated = popHydrationState(workInProgress2);
                if (wasHydrated) {
                  markUpdate(workInProgress2);
                }
              }
              updateHostContainer(workInProgress2);
              return null;
            }
            case HostComponent: {
              popHostContext(workInProgress2);
              var rootContainerInstance = getRootHostContainer();
              var type = workInProgress2.type;
              if (current2 !== null && workInProgress2.stateNode != null) {
                updateHostComponent$1(current2, workInProgress2, type, newProps, rootContainerInstance);
                if (current2.ref !== workInProgress2.ref) {
                  markRef$1(workInProgress2);
                }
              } else {
                if (!newProps) {
                  if (!(workInProgress2.stateNode !== null)) {
                    {
                      throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                  return null;
                }
                var currentHostContext = getHostContext();
                var _wasHydrated = popHydrationState(workInProgress2);
                if (_wasHydrated) {
                  if (prepareToHydrateHostInstance(workInProgress2, rootContainerInstance, currentHostContext)) {
                    markUpdate(workInProgress2);
                  }
                } else {
                  var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress2);
                  appendAllChildren(instance, workInProgress2, false, false);
                  workInProgress2.stateNode = instance;
                  if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext)) {
                    markUpdate(workInProgress2);
                  }
                }
                if (workInProgress2.ref !== null) {
                  markRef$1(workInProgress2);
                }
              }
              return null;
            }
            case HostText: {
              var newText = newProps;
              if (current2 && workInProgress2.stateNode != null) {
                var oldText = current2.memoizedProps;
                updateHostText$1(current2, workInProgress2, oldText, newText);
              } else {
                if (typeof newText !== "string") {
                  if (!(workInProgress2.stateNode !== null)) {
                    {
                      throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                }
                var _rootContainerInstance = getRootHostContainer();
                var _currentHostContext = getHostContext();
                var _wasHydrated2 = popHydrationState(workInProgress2);
                if (_wasHydrated2) {
                  if (prepareToHydrateHostTextInstance(workInProgress2)) {
                    markUpdate(workInProgress2);
                  }
                } else {
                  workInProgress2.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext, workInProgress2);
                }
              }
              return null;
            }
            case SuspenseComponent: {
              popSuspenseContext(workInProgress2);
              var nextState = workInProgress2.memoizedState;
              if ((workInProgress2.effectTag & DidCapture) !== NoEffect) {
                workInProgress2.expirationTime = renderExpirationTime2;
                return workInProgress2;
              }
              var nextDidTimeout = nextState !== null;
              var prevDidTimeout = false;
              if (current2 === null) {
                if (workInProgress2.memoizedProps.fallback !== void 0) {
                  popHydrationState(workInProgress2);
                }
              } else {
                var prevState = current2.memoizedState;
                prevDidTimeout = prevState !== null;
                if (!nextDidTimeout && prevState !== null) {
                  var currentFallbackChild = current2.child.sibling;
                  if (currentFallbackChild !== null) {
                    var first = workInProgress2.firstEffect;
                    if (first !== null) {
                      workInProgress2.firstEffect = currentFallbackChild;
                      currentFallbackChild.nextEffect = first;
                    } else {
                      workInProgress2.firstEffect = workInProgress2.lastEffect = currentFallbackChild;
                      currentFallbackChild.nextEffect = null;
                    }
                    currentFallbackChild.effectTag = Deletion;
                  }
                }
              }
              if (nextDidTimeout && !prevDidTimeout) {
                if ((workInProgress2.mode & BlockingMode) !== NoMode) {
                  var hasInvisibleChildContext = current2 === null && workInProgress2.memoizedProps.unstable_avoidThisFallback !== true;
                  if (hasInvisibleChildContext || hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext)) {
                    renderDidSuspend();
                  } else {
                    renderDidSuspendDelayIfPossible();
                  }
                }
              }
              if (supportsPersistence) {
                if (nextDidTimeout) {
                  workInProgress2.effectTag |= Update;
                }
              }
              if (supportsMutation) {
                if (nextDidTimeout || prevDidTimeout) {
                  workInProgress2.effectTag |= Update;
                }
              }
              return null;
            }
            case HostPortal:
              popHostContainer(workInProgress2);
              updateHostContainer(workInProgress2);
              return null;
            case ContextProvider:
              popProvider(workInProgress2);
              return null;
            case IncompleteClassComponent: {
              var _Component = workInProgress2.type;
              if (isContextProvider(_Component)) {
                popContext(workInProgress2);
              }
              return null;
            }
            case SuspenseListComponent: {
              popSuspenseContext(workInProgress2);
              var renderState = workInProgress2.memoizedState;
              if (renderState === null) {
                return null;
              }
              var didSuspendAlready = (workInProgress2.effectTag & DidCapture) !== NoEffect;
              var renderedTail = renderState.rendering;
              if (renderedTail === null) {
                if (!didSuspendAlready) {
                  var cannotBeSuspended = renderHasNotSuspendedYet() && (current2 === null || (current2.effectTag & DidCapture) === NoEffect);
                  if (!cannotBeSuspended) {
                    var row = workInProgress2.child;
                    while (row !== null) {
                      var suspended = findFirstSuspended(row);
                      if (suspended !== null) {
                        didSuspendAlready = true;
                        workInProgress2.effectTag |= DidCapture;
                        cutOffTailIfNeeded(renderState, false);
                        var newThennables = suspended.updateQueue;
                        if (newThennables !== null) {
                          workInProgress2.updateQueue = newThennables;
                          workInProgress2.effectTag |= Update;
                        }
                        if (renderState.lastEffect === null) {
                          workInProgress2.firstEffect = null;
                        }
                        workInProgress2.lastEffect = renderState.lastEffect;
                        resetChildFibers(workInProgress2, renderExpirationTime2);
                        pushSuspenseContext(workInProgress2, setShallowSuspenseContext(suspenseStackCursor.current, ForceSuspenseFallback));
                        return workInProgress2.child;
                      }
                      row = row.sibling;
                    }
                  }
                } else {
                  cutOffTailIfNeeded(renderState, false);
                }
              } else {
                if (!didSuspendAlready) {
                  var _suspended = findFirstSuspended(renderedTail);
                  if (_suspended !== null) {
                    workInProgress2.effectTag |= DidCapture;
                    didSuspendAlready = true;
                    var _newThennables = _suspended.updateQueue;
                    if (_newThennables !== null) {
                      workInProgress2.updateQueue = _newThennables;
                      workInProgress2.effectTag |= Update;
                    }
                    cutOffTailIfNeeded(renderState, true);
                    if (renderState.tail === null && renderState.tailMode === "hidden" && !renderedTail.alternate) {
                      var lastEffect = workInProgress2.lastEffect = renderState.lastEffect;
                      if (lastEffect !== null) {
                        lastEffect.nextEffect = null;
                      }
                      return null;
                    }
                  } else if (now$1() * 2 - renderState.renderingStartTime > renderState.tailExpiration && renderExpirationTime2 > Never) {
                    workInProgress2.effectTag |= DidCapture;
                    didSuspendAlready = true;
                    cutOffTailIfNeeded(renderState, false);
                    var nextPriority = renderExpirationTime2 - 1;
                    workInProgress2.expirationTime = workInProgress2.childExpirationTime = nextPriority;
                    {
                      markSpawnedWork(nextPriority);
                    }
                  }
                }
                if (renderState.isBackwards) {
                  renderedTail.sibling = workInProgress2.child;
                  workInProgress2.child = renderedTail;
                } else {
                  var previousSibling = renderState.last;
                  if (previousSibling !== null) {
                    previousSibling.sibling = renderedTail;
                  } else {
                    workInProgress2.child = renderedTail;
                  }
                  renderState.last = renderedTail;
                }
              }
              if (renderState.tail !== null) {
                if (renderState.tailExpiration === 0) {
                  var TAIL_EXPIRATION_TIMEOUT_MS = 500;
                  renderState.tailExpiration = now$1() + TAIL_EXPIRATION_TIMEOUT_MS;
                }
                var next = renderState.tail;
                renderState.rendering = next;
                renderState.tail = next.sibling;
                renderState.lastEffect = workInProgress2.lastEffect;
                renderState.renderingStartTime = now$1();
                next.sibling = null;
                var suspenseContext = suspenseStackCursor.current;
                if (didSuspendAlready) {
                  suspenseContext = setShallowSuspenseContext(suspenseContext, ForceSuspenseFallback);
                } else {
                  suspenseContext = setDefaultShallowSuspenseContext(suspenseContext);
                }
                pushSuspenseContext(workInProgress2, suspenseContext);
                return next;
              }
              return null;
            }
          }
          {
            {
              throw Error("Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function unwindWork(workInProgress2, renderExpirationTime2) {
          switch (workInProgress2.tag) {
            case ClassComponent: {
              var Component = workInProgress2.type;
              if (isContextProvider(Component)) {
                popContext(workInProgress2);
              }
              var effectTag = workInProgress2.effectTag;
              if (effectTag & ShouldCapture) {
                workInProgress2.effectTag = effectTag & ~ShouldCapture | DidCapture;
                return workInProgress2;
              }
              return null;
            }
            case HostRoot: {
              popHostContainer(workInProgress2);
              popTopLevelContextObject(workInProgress2);
              var _effectTag = workInProgress2.effectTag;
              if (!((_effectTag & DidCapture) === NoEffect)) {
                {
                  throw Error("The root failed to unmount after an error. This is likely a bug in React. Please file an issue.");
                }
              }
              workInProgress2.effectTag = _effectTag & ~ShouldCapture | DidCapture;
              return workInProgress2;
            }
            case HostComponent: {
              popHostContext(workInProgress2);
              return null;
            }
            case SuspenseComponent: {
              popSuspenseContext(workInProgress2);
              var _effectTag2 = workInProgress2.effectTag;
              if (_effectTag2 & ShouldCapture) {
                workInProgress2.effectTag = _effectTag2 & ~ShouldCapture | DidCapture;
                return workInProgress2;
              }
              return null;
            }
            case SuspenseListComponent: {
              popSuspenseContext(workInProgress2);
              return null;
            }
            case HostPortal:
              popHostContainer(workInProgress2);
              return null;
            case ContextProvider:
              popProvider(workInProgress2);
              return null;
            default:
              return null;
          }
        }
        function unwindInterruptedWork(interruptedWork) {
          switch (interruptedWork.tag) {
            case ClassComponent: {
              var childContextTypes = interruptedWork.type.childContextTypes;
              if (childContextTypes !== null && childContextTypes !== void 0) {
                popContext(interruptedWork);
              }
              break;
            }
            case HostRoot: {
              popHostContainer(interruptedWork);
              popTopLevelContextObject(interruptedWork);
              break;
            }
            case HostComponent: {
              popHostContext(interruptedWork);
              break;
            }
            case HostPortal:
              popHostContainer(interruptedWork);
              break;
            case SuspenseComponent:
              popSuspenseContext(interruptedWork);
              break;
            case SuspenseListComponent:
              popSuspenseContext(interruptedWork);
              break;
            case ContextProvider:
              popProvider(interruptedWork);
              break;
          }
        }
        function createCapturedValue(value, source) {
          return {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
        }
        var invokeGuardedCallbackImpl = function(name, func, context, a, b, c, d, e, f) {
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          try {
            func.apply(context, funcArgs);
          } catch (error2) {
            this.onError(error2);
          }
        };
        {
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
            var fakeNode = document.createElement("react");
            var invokeGuardedCallbackDev = function(name, func, context, a, b, c, d, e, f) {
              if (!(typeof document !== "undefined")) {
                {
                  throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
                }
              }
              var evt = document.createEvent("Event");
              var didError = true;
              var windowEvent = window.event;
              var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, "event");
              var funcArgs = Array.prototype.slice.call(arguments, 3);
              function callCallback2() {
                fakeNode.removeEventListener(evtType, callCallback2, false);
                if (typeof window.event !== "undefined" && window.hasOwnProperty("event")) {
                  window.event = windowEvent;
                }
                func.apply(context, funcArgs);
                didError = false;
              }
              var error2;
              var didSetError = false;
              var isCrossOriginError = false;
              function handleWindowError(event) {
                error2 = event.error;
                didSetError = true;
                if (error2 === null && event.colno === 0 && event.lineno === 0) {
                  isCrossOriginError = true;
                }
                if (event.defaultPrevented) {
                  if (error2 != null && typeof error2 === "object") {
                    try {
                      error2._suppressLogging = true;
                    } catch (inner) {
                    }
                  }
                }
              }
              var evtType = "react-" + (name ? name : "invokeguardedcallback");
              window.addEventListener("error", handleWindowError);
              fakeNode.addEventListener(evtType, callCallback2, false);
              evt.initEvent(evtType, false, false);
              fakeNode.dispatchEvent(evt);
              if (windowEventDescriptor) {
                Object.defineProperty(window, "event", windowEventDescriptor);
              }
              if (didError) {
                if (!didSetError) {
                  error2 = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
                } else if (isCrossOriginError) {
                  error2 = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://fb.me/react-crossorigin-error for more information.");
                }
                this.onError(error2);
              }
              window.removeEventListener("error", handleWindowError);
            };
            invokeGuardedCallbackImpl = invokeGuardedCallbackDev;
          }
        }
        var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;
        var hasError = false;
        var caughtError = null;
        var reporter = {
          onError: function(error2) {
            hasError = true;
            caughtError = error2;
          }
        };
        function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
          hasError = false;
          caughtError = null;
          invokeGuardedCallbackImpl$1.apply(reporter, arguments);
        }
        function hasCaughtError() {
          return hasError;
        }
        function clearCaughtError() {
          if (hasError) {
            var error2 = caughtError;
            hasError = false;
            caughtError = null;
            return error2;
          } else {
            {
              {
                throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
        }
        function logCapturedError(capturedError) {
          var error2 = capturedError.error;
          {
            var componentName = capturedError.componentName, componentStack = capturedError.componentStack, errorBoundaryName = capturedError.errorBoundaryName, errorBoundaryFound = capturedError.errorBoundaryFound, willRetry = capturedError.willRetry;
            if (error2 != null && error2._suppressLogging) {
              if (errorBoundaryFound && willRetry) {
                return;
              }
              console["error"](error2);
            }
            var componentNameMessage = componentName ? "The above error occurred in the <" + componentName + "> component:" : "The above error occurred in one of your React components:";
            var errorBoundaryMessage;
            if (errorBoundaryFound && errorBoundaryName) {
              if (willRetry) {
                errorBoundaryMessage = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + errorBoundaryName + ".");
              } else {
                errorBoundaryMessage = "This error was initially handled by the error boundary " + errorBoundaryName + ".\nRecreating the tree from scratch failed so React will unmount the tree.";
              }
            } else {
              errorBoundaryMessage = "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://fb.me/react-error-boundaries to learn more about error boundaries.";
            }
            var combinedMessage = "" + componentNameMessage + componentStack + "\n\n" + ("" + errorBoundaryMessage);
            console["error"](combinedMessage);
          }
        }
        var didWarnAboutUndefinedSnapshotBeforeUpdate = null;
        {
          didWarnAboutUndefinedSnapshotBeforeUpdate = /* @__PURE__ */ new Set();
        }
        var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
        function logError(boundary, errorInfo) {
          var source = errorInfo.source;
          var stack = errorInfo.stack;
          if (stack === null && source !== null) {
            stack = getStackByFiberInDevAndProd(source);
          }
          var capturedError = {
            componentName: source !== null ? getComponentName(source.type) : null,
            componentStack: stack !== null ? stack : "",
            error: errorInfo.value,
            errorBoundary: null,
            errorBoundaryName: null,
            errorBoundaryFound: false,
            willRetry: false
          };
          if (boundary !== null && boundary.tag === ClassComponent) {
            capturedError.errorBoundary = boundary.stateNode;
            capturedError.errorBoundaryName = getComponentName(boundary.type);
            capturedError.errorBoundaryFound = true;
            capturedError.willRetry = true;
          }
          try {
            logCapturedError(capturedError);
          } catch (e) {
            setTimeout(function() {
              throw e;
            });
          }
        }
        var callComponentWillUnmountWithTimer = function(current2, instance) {
          startPhaseTimer(current2, "componentWillUnmount");
          instance.props = current2.memoizedProps;
          instance.state = current2.memoizedState;
          instance.componentWillUnmount();
          stopPhaseTimer();
        };
        function safelyCallComponentWillUnmount(current2, instance) {
          {
            invokeGuardedCallback(null, callComponentWillUnmountWithTimer, null, current2, instance);
            if (hasCaughtError()) {
              var unmountError = clearCaughtError();
              captureCommitPhaseError(current2, unmountError);
            }
          }
        }
        function safelyDetachRef(current2) {
          var ref = current2.ref;
          if (ref !== null) {
            if (typeof ref === "function") {
              {
                invokeGuardedCallback(null, ref, null, null);
                if (hasCaughtError()) {
                  var refError = clearCaughtError();
                  captureCommitPhaseError(current2, refError);
                }
              }
            } else {
              ref.current = null;
            }
          }
        }
        function safelyCallDestroy(current2, destroy) {
          {
            invokeGuardedCallback(null, destroy, null);
            if (hasCaughtError()) {
              var error2 = clearCaughtError();
              captureCommitPhaseError(current2, error2);
            }
          }
        }
        function commitBeforeMutationLifeCycles(current2, finishedWork) {
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case SimpleMemoComponent:
            case Block: {
              return;
            }
            case ClassComponent: {
              if (finishedWork.effectTag & Snapshot) {
                if (current2 !== null) {
                  var prevProps = current2.memoizedProps;
                  var prevState = current2.memoizedState;
                  startPhaseTimer(finishedWork, "getSnapshotBeforeUpdate");
                  var instance = finishedWork.stateNode;
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  var snapshot = instance.getSnapshotBeforeUpdate(finishedWork.elementType === finishedWork.type ? prevProps : resolveDefaultProps(finishedWork.type, prevProps), prevState);
                  {
                    var didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                    if (snapshot === void 0 && !didWarnSet.has(finishedWork.type)) {
                      didWarnSet.add(finishedWork.type);
                      error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", getComponentName(finishedWork.type));
                    }
                  }
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  stopPhaseTimer();
                }
              }
              return;
            }
            case HostRoot:
            case HostComponent:
            case HostText:
            case HostPortal:
            case IncompleteClassComponent:
              return;
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function commitHookEffectListUnmount(tag, finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              if ((effect.tag & tag) === tag) {
                var destroy = effect.destroy;
                effect.destroy = void 0;
                if (destroy !== void 0) {
                  destroy();
                }
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        }
        function commitHookEffectListMount(tag, finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
          if (lastEffect !== null) {
            var firstEffect = lastEffect.next;
            var effect = firstEffect;
            do {
              if ((effect.tag & tag) === tag) {
                var create = effect.create;
                effect.destroy = create();
                {
                  var destroy = effect.destroy;
                  if (destroy !== void 0 && typeof destroy !== "function") {
                    var addendum = void 0;
                    if (destroy === null) {
                      addendum = " You returned null. If your effect does not require clean up, return undefined (or nothing).";
                    } else if (typeof destroy.then === "function") {
                      addendum = "\n\nIt looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\nuseEffect(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://fb.me/react-hooks-data-fetching";
                    } else {
                      addendum = " You returned: " + destroy;
                    }
                    error("An effect function must not return anything besides a function, which is used for clean-up.%s%s", addendum, getStackByFiberInDevAndProd(finishedWork));
                  }
                }
              }
              effect = effect.next;
            } while (effect !== firstEffect);
          }
        }
        function commitPassiveHookEffects(finishedWork) {
          if ((finishedWork.effectTag & Passive) !== NoEffect) {
            switch (finishedWork.tag) {
              case FunctionComponent:
              case ForwardRef:
              case SimpleMemoComponent:
              case Block: {
                commitHookEffectListUnmount(Passive$1 | HasEffect, finishedWork);
                commitHookEffectListMount(Passive$1 | HasEffect, finishedWork);
                break;
              }
            }
          }
        }
        function commitLifeCycles(finishedRoot, current2, finishedWork, committedExpirationTime) {
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case SimpleMemoComponent:
            case Block: {
              commitHookEffectListMount(Layout | HasEffect, finishedWork);
              return;
            }
            case ClassComponent: {
              var instance = finishedWork.stateNode;
              if (finishedWork.effectTag & Update) {
                if (current2 === null) {
                  startPhaseTimer(finishedWork, "componentDidMount");
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  instance.componentDidMount();
                  stopPhaseTimer();
                } else {
                  var prevProps = finishedWork.elementType === finishedWork.type ? current2.memoizedProps : resolveDefaultProps(finishedWork.type, current2.memoizedProps);
                  var prevState = current2.memoizedState;
                  startPhaseTimer(finishedWork, "componentDidUpdate");
                  {
                    if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                      if (instance.props !== finishedWork.memoizedProps) {
                        error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                      if (instance.state !== finishedWork.memoizedState) {
                        error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                      }
                    }
                  }
                  instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate);
                  stopPhaseTimer();
                }
              }
              var updateQueue = finishedWork.updateQueue;
              if (updateQueue !== null) {
                {
                  if (finishedWork.type === finishedWork.elementType && !didWarnAboutReassigningProps) {
                    if (instance.props !== finishedWork.memoizedProps) {
                      error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                    }
                    if (instance.state !== finishedWork.memoizedState) {
                      error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", getComponentName(finishedWork.type) || "instance");
                    }
                  }
                }
                commitUpdateQueue(finishedWork, updateQueue, instance);
              }
              return;
            }
            case HostRoot: {
              var _updateQueue = finishedWork.updateQueue;
              if (_updateQueue !== null) {
                var _instance = null;
                if (finishedWork.child !== null) {
                  switch (finishedWork.child.tag) {
                    case HostComponent:
                      _instance = getPublicInstance(finishedWork.child.stateNode);
                      break;
                    case ClassComponent:
                      _instance = finishedWork.child.stateNode;
                      break;
                  }
                }
                commitUpdateQueue(finishedWork, _updateQueue, _instance);
              }
              return;
            }
            case HostComponent: {
              var _instance2 = finishedWork.stateNode;
              if (current2 === null && finishedWork.effectTag & Update) {
                var type = finishedWork.type;
                var props = finishedWork.memoizedProps;
                commitMount(_instance2, type, props, finishedWork);
              }
              return;
            }
            case HostText: {
              return;
            }
            case HostPortal: {
              return;
            }
            case Profiler: {
              {
                var onRender = finishedWork.memoizedProps.onRender;
                if (typeof onRender === "function") {
                  {
                    onRender(finishedWork.memoizedProps.id, current2 === null ? "mount" : "update", finishedWork.actualDuration, finishedWork.treeBaseDuration, finishedWork.actualStartTime, getCommitTime(), finishedRoot.memoizedInteractions);
                  }
                }
              }
              return;
            }
            case SuspenseComponent: {
              commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              return;
            }
            case SuspenseListComponent:
            case IncompleteClassComponent:
            case FundamentalComponent:
            case ScopeComponent:
              return;
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function hideOrUnhideAllChildren(finishedWork, isHidden) {
          if (supportsMutation) {
            var node = finishedWork;
            while (true) {
              if (node.tag === HostComponent) {
                var instance = node.stateNode;
                if (isHidden) {
                  hideInstance(instance);
                } else {
                  unhideInstance(node.stateNode, node.memoizedProps);
                }
              } else if (node.tag === HostText) {
                var _instance3 = node.stateNode;
                if (isHidden) {
                  hideTextInstance(_instance3);
                } else {
                  unhideTextInstance(_instance3, node.memoizedProps);
                }
              } else if (node.tag === SuspenseComponent && node.memoizedState !== null && node.memoizedState.dehydrated === null) {
                var fallbackChildFragment = node.child.sibling;
                fallbackChildFragment.return = node;
                node = fallbackChildFragment;
                continue;
              } else if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
              if (node === finishedWork) {
                return;
              }
              while (node.sibling === null) {
                if (node.return === null || node.return === finishedWork) {
                  return;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
        }
        function commitAttachRef(finishedWork) {
          var ref = finishedWork.ref;
          if (ref !== null) {
            var instance = finishedWork.stateNode;
            var instanceToUse;
            switch (finishedWork.tag) {
              case HostComponent:
                instanceToUse = getPublicInstance(instance);
                break;
              default:
                instanceToUse = instance;
            }
            if (typeof ref === "function") {
              ref(instanceToUse);
            } else {
              {
                if (!ref.hasOwnProperty("current")) {
                  error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().%s", getComponentName(finishedWork.type), getStackByFiberInDevAndProd(finishedWork));
                }
              }
              ref.current = instanceToUse;
            }
          }
        }
        function commitDetachRef(current2) {
          var currentRef = current2.ref;
          if (currentRef !== null) {
            if (typeof currentRef === "function") {
              currentRef(null);
            } else {
              currentRef.current = null;
            }
          }
        }
        function commitUnmount(finishedRoot, current2, renderPriorityLevel) {
          onCommitUnmount(current2);
          switch (current2.tag) {
            case FunctionComponent:
            case ForwardRef:
            case MemoComponent:
            case SimpleMemoComponent:
            case Block: {
              var updateQueue = current2.updateQueue;
              if (updateQueue !== null) {
                var lastEffect = updateQueue.lastEffect;
                if (lastEffect !== null) {
                  var firstEffect = lastEffect.next;
                  {
                    var priorityLevel = renderPriorityLevel > NormalPriority ? NormalPriority : renderPriorityLevel;
                    runWithPriority(priorityLevel, function() {
                      var effect = firstEffect;
                      do {
                        var _destroy = effect.destroy;
                        if (_destroy !== void 0) {
                          safelyCallDestroy(current2, _destroy);
                        }
                        effect = effect.next;
                      } while (effect !== firstEffect);
                    });
                  }
                }
              }
              return;
            }
            case ClassComponent: {
              safelyDetachRef(current2);
              var instance = current2.stateNode;
              if (typeof instance.componentWillUnmount === "function") {
                safelyCallComponentWillUnmount(current2, instance);
              }
              return;
            }
            case HostComponent: {
              safelyDetachRef(current2);
              return;
            }
            case HostPortal: {
              if (supportsMutation) {
                unmountHostComponents(finishedRoot, current2, renderPriorityLevel);
              } else if (supportsPersistence) {
                emptyPortalContainer(current2);
              }
              return;
            }
            case FundamentalComponent: {
              return;
            }
            case DehydratedFragment: {
              return;
            }
            case ScopeComponent: {
              return;
            }
          }
        }
        function commitNestedUnmounts(finishedRoot, root, renderPriorityLevel) {
          var node = root;
          while (true) {
            commitUnmount(finishedRoot, node, renderPriorityLevel);
            if (node.child !== null && (!supportsMutation || node.tag !== HostPortal)) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === root) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === root) {
                return;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function detachFiber(current2) {
          var alternate = current2.alternate;
          current2.return = null;
          current2.child = null;
          current2.memoizedState = null;
          current2.updateQueue = null;
          current2.dependencies = null;
          current2.alternate = null;
          current2.firstEffect = null;
          current2.lastEffect = null;
          current2.pendingProps = null;
          current2.memoizedProps = null;
          current2.stateNode = null;
          if (alternate !== null) {
            detachFiber(alternate);
          }
        }
        function emptyPortalContainer(current2) {
          if (!supportsPersistence) {
            return;
          }
          var portal = current2.stateNode;
          var containerInfo2 = portal.containerInfo;
          var emptyChildSet = createContainerChildSet(containerInfo2);
          replaceContainerChildren(containerInfo2, emptyChildSet);
        }
        function commitContainer(finishedWork) {
          if (!supportsPersistence) {
            return;
          }
          switch (finishedWork.tag) {
            case ClassComponent:
            case HostComponent:
            case HostText:
            case FundamentalComponent: {
              return;
            }
            case HostRoot:
            case HostPortal: {
              var portalOrRoot = finishedWork.stateNode;
              var containerInfo2 = portalOrRoot.containerInfo, pendingChildren = portalOrRoot.pendingChildren;
              replaceContainerChildren(containerInfo2, pendingChildren);
              return;
            }
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function getHostParentFiber(fiber) {
          var parent = fiber.return;
          while (parent !== null) {
            if (isHostParent(parent)) {
              return parent;
            }
            parent = parent.return;
          }
          {
            {
              throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function isHostParent(fiber) {
          return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
        }
        function getHostSibling(fiber) {
          var node = fiber;
          siblings:
            while (true) {
              while (node.sibling === null) {
                if (node.return === null || isHostParent(node.return)) {
                  return null;
                }
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
              while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedFragment) {
                if (node.effectTag & Placement) {
                  continue siblings;
                }
                if (node.child === null || node.tag === HostPortal) {
                  continue siblings;
                } else {
                  node.child.return = node;
                  node = node.child;
                }
              }
              if (!(node.effectTag & Placement)) {
                return node.stateNode;
              }
            }
        }
        function commitPlacement(finishedWork) {
          if (!supportsMutation) {
            return;
          }
          var parentFiber = getHostParentFiber(finishedWork);
          var parent;
          var isContainer;
          var parentStateNode = parentFiber.stateNode;
          switch (parentFiber.tag) {
            case HostComponent:
              parent = parentStateNode;
              isContainer = false;
              break;
            case HostRoot:
              parent = parentStateNode.containerInfo;
              isContainer = true;
              break;
            case HostPortal:
              parent = parentStateNode.containerInfo;
              isContainer = true;
              break;
            case FundamentalComponent:
            default: {
              {
                throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
              }
            }
          }
          if (parentFiber.effectTag & ContentReset) {
            resetTextContent(parent);
            parentFiber.effectTag &= ~ContentReset;
          }
          var before = getHostSibling(finishedWork);
          if (isContainer) {
            insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
          } else {
            insertOrAppendPlacementNode(finishedWork, before, parent);
          }
        }
        function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
          var tag = node.tag;
          var isHost = tag === HostComponent || tag === HostText;
          if (isHost || enableFundamentalAPI) {
            var stateNode = isHost ? node.stateNode : node.stateNode.instance;
            if (before) {
              insertInContainerBefore(parent, stateNode, before);
            } else {
              appendChildToContainer(parent, stateNode);
            }
          } else if (tag === HostPortal)
            ;
          else {
            var child = node.child;
            if (child !== null) {
              insertOrAppendPlacementNodeIntoContainer(child, before, parent);
              var sibling = child.sibling;
              while (sibling !== null) {
                insertOrAppendPlacementNodeIntoContainer(sibling, before, parent);
                sibling = sibling.sibling;
              }
            }
          }
        }
        function insertOrAppendPlacementNode(node, before, parent) {
          var tag = node.tag;
          var isHost = tag === HostComponent || tag === HostText;
          if (isHost || enableFundamentalAPI) {
            var stateNode = isHost ? node.stateNode : node.stateNode.instance;
            if (before) {
              insertBefore(parent, stateNode, before);
            } else {
              appendChild(parent, stateNode);
            }
          } else if (tag === HostPortal)
            ;
          else {
            var child = node.child;
            if (child !== null) {
              insertOrAppendPlacementNode(child, before, parent);
              var sibling = child.sibling;
              while (sibling !== null) {
                insertOrAppendPlacementNode(sibling, before, parent);
                sibling = sibling.sibling;
              }
            }
          }
        }
        function unmountHostComponents(finishedRoot, current2, renderPriorityLevel) {
          var node = current2;
          var currentParentIsValid = false;
          var currentParent;
          var currentParentIsContainer;
          while (true) {
            if (!currentParentIsValid) {
              var parent = node.return;
              findParent:
                while (true) {
                  if (!(parent !== null)) {
                    {
                      throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
                    }
                  }
                  var parentStateNode = parent.stateNode;
                  switch (parent.tag) {
                    case HostComponent:
                      currentParent = parentStateNode;
                      currentParentIsContainer = false;
                      break findParent;
                    case HostRoot:
                      currentParent = parentStateNode.containerInfo;
                      currentParentIsContainer = true;
                      break findParent;
                    case HostPortal:
                      currentParent = parentStateNode.containerInfo;
                      currentParentIsContainer = true;
                      break findParent;
                  }
                  parent = parent.return;
                }
              currentParentIsValid = true;
            }
            if (node.tag === HostComponent || node.tag === HostText) {
              commitNestedUnmounts(finishedRoot, node, renderPriorityLevel);
              if (currentParentIsContainer) {
                removeChildFromContainer(currentParent, node.stateNode);
              } else {
                removeChild(currentParent, node.stateNode);
              }
            } else if (node.tag === HostPortal) {
              if (node.child !== null) {
                currentParent = node.stateNode.containerInfo;
                currentParentIsContainer = true;
                node.child.return = node;
                node = node.child;
                continue;
              }
            } else {
              commitUnmount(finishedRoot, node, renderPriorityLevel);
              if (node.child !== null) {
                node.child.return = node;
                node = node.child;
                continue;
              }
            }
            if (node === current2) {
              return;
            }
            while (node.sibling === null) {
              if (node.return === null || node.return === current2) {
                return;
              }
              node = node.return;
              if (node.tag === HostPortal) {
                currentParentIsValid = false;
              }
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        function commitDeletion(finishedRoot, current2, renderPriorityLevel) {
          if (supportsMutation) {
            unmountHostComponents(finishedRoot, current2, renderPriorityLevel);
          } else {
            commitNestedUnmounts(finishedRoot, current2, renderPriorityLevel);
          }
          detachFiber(current2);
        }
        function commitWork(current2, finishedWork) {
          if (!supportsMutation) {
            switch (finishedWork.tag) {
              case FunctionComponent:
              case ForwardRef:
              case MemoComponent:
              case SimpleMemoComponent:
              case Block: {
                commitHookEffectListUnmount(Layout | HasEffect, finishedWork);
                return;
              }
              case Profiler: {
                return;
              }
              case SuspenseComponent: {
                commitSuspenseComponent(finishedWork);
                attachSuspenseRetryListeners(finishedWork);
                return;
              }
              case SuspenseListComponent: {
                attachSuspenseRetryListeners(finishedWork);
                return;
              }
              case HostRoot: {
                if (supportsHydration) {
                  var root = finishedWork.stateNode;
                  if (root.hydrate) {
                    root.hydrate = false;
                    commitHydratedContainer(root.containerInfo);
                  }
                }
                break;
              }
            }
            commitContainer(finishedWork);
            return;
          }
          switch (finishedWork.tag) {
            case FunctionComponent:
            case ForwardRef:
            case MemoComponent:
            case SimpleMemoComponent:
            case Block: {
              commitHookEffectListUnmount(Layout | HasEffect, finishedWork);
              return;
            }
            case ClassComponent: {
              return;
            }
            case HostComponent: {
              var instance = finishedWork.stateNode;
              if (instance != null) {
                var newProps = finishedWork.memoizedProps;
                var oldProps = current2 !== null ? current2.memoizedProps : newProps;
                var type = finishedWork.type;
                var updatePayload = finishedWork.updateQueue;
                finishedWork.updateQueue = null;
                if (updatePayload !== null) {
                  commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
                }
              }
              return;
            }
            case HostText: {
              if (!(finishedWork.stateNode !== null)) {
                {
                  throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
                }
              }
              var textInstance = finishedWork.stateNode;
              var newText = finishedWork.memoizedProps;
              var oldText = current2 !== null ? current2.memoizedProps : newText;
              commitTextUpdate(textInstance, oldText, newText);
              return;
            }
            case HostRoot: {
              if (supportsHydration) {
                var _root = finishedWork.stateNode;
                if (_root.hydrate) {
                  _root.hydrate = false;
                  commitHydratedContainer(_root.containerInfo);
                }
              }
              return;
            }
            case Profiler: {
              return;
            }
            case SuspenseComponent: {
              commitSuspenseComponent(finishedWork);
              attachSuspenseRetryListeners(finishedWork);
              return;
            }
            case SuspenseListComponent: {
              attachSuspenseRetryListeners(finishedWork);
              return;
            }
            case IncompleteClassComponent: {
              return;
            }
          }
          {
            {
              throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
        }
        function commitSuspenseComponent(finishedWork) {
          var newState = finishedWork.memoizedState;
          var newDidTimeout;
          var primaryChildParent = finishedWork;
          if (newState === null) {
            newDidTimeout = false;
          } else {
            newDidTimeout = true;
            primaryChildParent = finishedWork.child;
            markCommitTimeOfFallback();
          }
          if (supportsMutation && primaryChildParent !== null) {
            hideOrUnhideAllChildren(primaryChildParent, newDidTimeout);
          }
        }
        function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
          if (!supportsHydration) {
            return;
          }
          var newState = finishedWork.memoizedState;
          if (newState === null) {
            var current2 = finishedWork.alternate;
            if (current2 !== null) {
              var prevState = current2.memoizedState;
              if (prevState !== null) {
                var suspenseInstance = prevState.dehydrated;
                if (suspenseInstance !== null) {
                  commitHydratedSuspenseInstance(suspenseInstance);
                }
              }
            }
          }
        }
        function attachSuspenseRetryListeners(finishedWork) {
          var thenables = finishedWork.updateQueue;
          if (thenables !== null) {
            finishedWork.updateQueue = null;
            var retryCache = finishedWork.stateNode;
            if (retryCache === null) {
              retryCache = finishedWork.stateNode = new PossiblyWeakSet();
            }
            thenables.forEach(function(thenable) {
              var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
              if (!retryCache.has(thenable)) {
                {
                  if (thenable.__reactDoNotTraceInteractions !== true) {
                    retry = tracing.unstable_wrap(retry);
                  }
                }
                retryCache.add(thenable);
                thenable.then(retry, retry);
              }
            });
          }
        }
        function commitResetTextContent(current2) {
          if (!supportsMutation) {
            return;
          }
          resetTextContent(current2.stateNode);
        }
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
          var update = createUpdate(expirationTime, null);
          update.tag = CaptureUpdate;
          update.payload = {
            element: null
          };
          var error2 = errorInfo.value;
          update.callback = function() {
            onUncaughtError(error2);
            logError(fiber, errorInfo);
          };
          return update;
        }
        function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
          var update = createUpdate(expirationTime, null);
          update.tag = CaptureUpdate;
          var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
          if (typeof getDerivedStateFromError === "function") {
            var error$1 = errorInfo.value;
            update.payload = function() {
              logError(fiber, errorInfo);
              return getDerivedStateFromError(error$1);
            };
          }
          var inst = fiber.stateNode;
          if (inst !== null && typeof inst.componentDidCatch === "function") {
            update.callback = function callback() {
              {
                markFailedErrorBoundaryForHotReloading(fiber);
              }
              if (typeof getDerivedStateFromError !== "function") {
                markLegacyErrorBoundaryAsFailed(this);
                logError(fiber, errorInfo);
              }
              var error$12 = errorInfo.value;
              var stack = errorInfo.stack;
              this.componentDidCatch(error$12, {
                componentStack: stack !== null ? stack : ""
              });
              {
                if (typeof getDerivedStateFromError !== "function") {
                  if (fiber.expirationTime !== Sync) {
                    error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", getComponentName(fiber.type) || "Unknown");
                  }
                }
              }
            };
          } else {
            update.callback = function() {
              markFailedErrorBoundaryForHotReloading(fiber);
            };
          }
          return update;
        }
        function attachPingListener(root, renderExpirationTime2, thenable) {
          var pingCache = root.pingCache;
          var threadIDs;
          if (pingCache === null) {
            pingCache = root.pingCache = new PossiblyWeakMap();
            threadIDs = /* @__PURE__ */ new Set();
            pingCache.set(thenable, threadIDs);
          } else {
            threadIDs = pingCache.get(thenable);
            if (threadIDs === void 0) {
              threadIDs = /* @__PURE__ */ new Set();
              pingCache.set(thenable, threadIDs);
            }
          }
          if (!threadIDs.has(renderExpirationTime2)) {
            threadIDs.add(renderExpirationTime2);
            var ping = pingSuspendedRoot.bind(null, root, thenable, renderExpirationTime2);
            thenable.then(ping, ping);
          }
        }
        function throwException(root, returnFiber, sourceFiber, value, renderExpirationTime2) {
          sourceFiber.effectTag |= Incomplete;
          sourceFiber.firstEffect = sourceFiber.lastEffect = null;
          if (value !== null && typeof value === "object" && typeof value.then === "function") {
            var thenable = value;
            if ((sourceFiber.mode & BlockingMode) === NoMode) {
              var currentSource = sourceFiber.alternate;
              if (currentSource) {
                sourceFiber.updateQueue = currentSource.updateQueue;
                sourceFiber.memoizedState = currentSource.memoizedState;
                sourceFiber.expirationTime = currentSource.expirationTime;
              } else {
                sourceFiber.updateQueue = null;
                sourceFiber.memoizedState = null;
              }
            }
            var hasInvisibleParentBoundary = hasSuspenseContext(suspenseStackCursor.current, InvisibleParentSuspenseContext);
            var _workInProgress = returnFiber;
            do {
              if (_workInProgress.tag === SuspenseComponent && shouldCaptureSuspense(_workInProgress, hasInvisibleParentBoundary)) {
                var thenables = _workInProgress.updateQueue;
                if (thenables === null) {
                  var updateQueue = /* @__PURE__ */ new Set();
                  updateQueue.add(thenable);
                  _workInProgress.updateQueue = updateQueue;
                } else {
                  thenables.add(thenable);
                }
                if ((_workInProgress.mode & BlockingMode) === NoMode) {
                  _workInProgress.effectTag |= DidCapture;
                  sourceFiber.effectTag &= ~(LifecycleEffectMask | Incomplete);
                  if (sourceFiber.tag === ClassComponent) {
                    var currentSourceFiber = sourceFiber.alternate;
                    if (currentSourceFiber === null) {
                      sourceFiber.tag = IncompleteClassComponent;
                    } else {
                      var update = createUpdate(Sync, null);
                      update.tag = ForceUpdate;
                      enqueueUpdate(sourceFiber, update);
                    }
                  }
                  sourceFiber.expirationTime = Sync;
                  return;
                }
                attachPingListener(root, renderExpirationTime2, thenable);
                _workInProgress.effectTag |= ShouldCapture;
                _workInProgress.expirationTime = renderExpirationTime2;
                return;
              }
              _workInProgress = _workInProgress.return;
            } while (_workInProgress !== null);
            value = new Error((getComponentName(sourceFiber.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + getStackByFiberInDevAndProd(sourceFiber));
          }
          renderDidError();
          value = createCapturedValue(value, sourceFiber);
          var workInProgress2 = returnFiber;
          do {
            switch (workInProgress2.tag) {
              case HostRoot: {
                var _errorInfo = value;
                workInProgress2.effectTag |= ShouldCapture;
                workInProgress2.expirationTime = renderExpirationTime2;
                var _update = createRootErrorUpdate(workInProgress2, _errorInfo, renderExpirationTime2);
                enqueueCapturedUpdate(workInProgress2, _update);
                return;
              }
              case ClassComponent:
                var errorInfo = value;
                var ctor = workInProgress2.type;
                var instance = workInProgress2.stateNode;
                if ((workInProgress2.effectTag & DidCapture) === NoEffect && (typeof ctor.getDerivedStateFromError === "function" || instance !== null && typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance))) {
                  workInProgress2.effectTag |= ShouldCapture;
                  workInProgress2.expirationTime = renderExpirationTime2;
                  var _update2 = createClassErrorUpdate(workInProgress2, errorInfo, renderExpirationTime2);
                  enqueueCapturedUpdate(workInProgress2, _update2);
                  return;
                }
                break;
            }
            workInProgress2 = workInProgress2.return;
          } while (workInProgress2 !== null);
        }
        var ceil = Math.ceil;
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner, IsSomeRendererActing = ReactSharedInternals.IsSomeRendererActing;
        var NoContext = 0;
        var BatchedContext = 1;
        var EventContext = 2;
        var DiscreteEventContext = 4;
        var LegacyUnbatchedContext = 8;
        var RenderContext = 16;
        var CommitContext = 32;
        var RootIncomplete = 0;
        var RootFatalErrored = 1;
        var RootErrored = 2;
        var RootSuspended = 3;
        var RootSuspendedWithDelay = 4;
        var RootCompleted = 5;
        var executionContext = NoContext;
        var workInProgressRoot = null;
        var workInProgress = null;
        var renderExpirationTime$1 = NoWork;
        var workInProgressRootExitStatus = RootIncomplete;
        var workInProgressRootFatalError = null;
        var workInProgressRootLatestProcessedExpirationTime = Sync;
        var workInProgressRootLatestSuspenseTimeout = Sync;
        var workInProgressRootCanSuspendUsingConfig = null;
        var workInProgressRootNextUnprocessedUpdateTime = NoWork;
        var workInProgressRootHasPendingPing = false;
        var globalMostRecentFallbackTime = 0;
        var FALLBACK_THROTTLE_MS = 500;
        var nextEffect = null;
        var hasUncaughtError = false;
        var firstUncaughtError = null;
        var legacyErrorBoundariesThatAlreadyFailed = null;
        var rootDoesHavePassiveEffects = false;
        var rootWithPendingPassiveEffects = null;
        var pendingPassiveEffectsRenderPriority = NoPriority;
        var pendingPassiveEffectsExpirationTime = NoWork;
        var rootsWithPendingDiscreteUpdates = null;
        var NESTED_UPDATE_LIMIT = 50;
        var nestedUpdateCount = 0;
        var rootWithNestedUpdates = null;
        var NESTED_PASSIVE_UPDATE_LIMIT = 50;
        var nestedPassiveUpdateCount = 0;
        var interruptedBy = null;
        var spawnedWorkDuringRender = null;
        var currentEventTime = NoWork;
        function requestCurrentTimeForUpdate() {
          if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
            return msToExpirationTime(now$1());
          }
          if (currentEventTime !== NoWork) {
            return currentEventTime;
          }
          currentEventTime = msToExpirationTime(now$1());
          return currentEventTime;
        }
        function getCurrentTime() {
          return msToExpirationTime(now$1());
        }
        function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
          var mode = fiber.mode;
          if ((mode & BlockingMode) === NoMode) {
            return Sync;
          }
          var priorityLevel = getCurrentPriorityLevel();
          if ((mode & ConcurrentMode) === NoMode) {
            return priorityLevel === ImmediatePriority ? Sync : Batched;
          }
          if ((executionContext & RenderContext) !== NoContext) {
            return renderExpirationTime$1;
          }
          var expirationTime;
          if (suspenseConfig !== null) {
            expirationTime = computeSuspenseExpiration(currentTime, suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION);
          } else {
            switch (priorityLevel) {
              case ImmediatePriority:
                expirationTime = Sync;
                break;
              case UserBlockingPriority:
                expirationTime = computeInteractiveExpiration(currentTime);
                break;
              case NormalPriority:
              case LowPriority:
                expirationTime = computeAsyncExpiration(currentTime);
                break;
              case IdlePriority:
                expirationTime = Idle;
                break;
              default: {
                {
                  throw Error("Expected a valid priority level");
                }
              }
            }
          }
          if (workInProgressRoot !== null && expirationTime === renderExpirationTime$1) {
            expirationTime -= 1;
          }
          return expirationTime;
        }
        function scheduleUpdateOnFiber(fiber, expirationTime) {
          checkForNestedUpdates();
          warnAboutRenderPhaseUpdatesInDEV(fiber);
          var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
          if (root === null) {
            warnAboutUpdateOnUnmountedFiberInDEV(fiber);
            return;
          }
          checkForInterruption(fiber, expirationTime);
          recordScheduleUpdate();
          var priorityLevel = getCurrentPriorityLevel();
          if (expirationTime === Sync) {
            if ((executionContext & LegacyUnbatchedContext) !== NoContext && (executionContext & (RenderContext | CommitContext)) === NoContext) {
              schedulePendingInteractions(root, expirationTime);
              performSyncWorkOnRoot(root);
            } else {
              ensureRootIsScheduled(root);
              schedulePendingInteractions(root, expirationTime);
              if (executionContext === NoContext) {
                flushSyncCallbackQueue();
              }
            }
          } else {
            ensureRootIsScheduled(root);
            schedulePendingInteractions(root, expirationTime);
          }
          if ((executionContext & DiscreteEventContext) !== NoContext && (priorityLevel === UserBlockingPriority || priorityLevel === ImmediatePriority)) {
            if (rootsWithPendingDiscreteUpdates === null) {
              rootsWithPendingDiscreteUpdates = /* @__PURE__ */ new Map([[root, expirationTime]]);
            } else {
              var lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
              if (lastDiscreteTime === void 0 || lastDiscreteTime > expirationTime) {
                rootsWithPendingDiscreteUpdates.set(root, expirationTime);
              }
            }
          }
        }
        var scheduleWork = scheduleUpdateOnFiber;
        function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
          if (fiber.expirationTime < expirationTime) {
            fiber.expirationTime = expirationTime;
          }
          var alternate = fiber.alternate;
          if (alternate !== null && alternate.expirationTime < expirationTime) {
            alternate.expirationTime = expirationTime;
          }
          var node = fiber.return;
          var root = null;
          if (node === null && fiber.tag === HostRoot) {
            root = fiber.stateNode;
          } else {
            while (node !== null) {
              alternate = node.alternate;
              if (node.childExpirationTime < expirationTime) {
                node.childExpirationTime = expirationTime;
                if (alternate !== null && alternate.childExpirationTime < expirationTime) {
                  alternate.childExpirationTime = expirationTime;
                }
              } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
                alternate.childExpirationTime = expirationTime;
              }
              if (node.return === null && node.tag === HostRoot) {
                root = node.stateNode;
                break;
              }
              node = node.return;
            }
          }
          if (root !== null) {
            if (workInProgressRoot === root) {
              markUnprocessedUpdateTime(expirationTime);
              if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
                markRootSuspendedAtTime(root, renderExpirationTime$1);
              }
            }
            markRootUpdatedAtTime(root, expirationTime);
          }
          return root;
        }
        function getNextRootExpirationTimeToWorkOn(root) {
          var lastExpiredTime = root.lastExpiredTime;
          if (lastExpiredTime !== NoWork) {
            return lastExpiredTime;
          }
          var firstPendingTime = root.firstPendingTime;
          if (!isRootSuspendedAtTime(root, firstPendingTime)) {
            return firstPendingTime;
          }
          var lastPingedTime = root.lastPingedTime;
          var nextKnownPendingLevel = root.nextKnownPendingLevel;
          var nextLevel = lastPingedTime > nextKnownPendingLevel ? lastPingedTime : nextKnownPendingLevel;
          if (nextLevel <= Idle && firstPendingTime !== nextLevel) {
            return NoWork;
          }
          return nextLevel;
        }
        function ensureRootIsScheduled(root) {
          var lastExpiredTime = root.lastExpiredTime;
          if (lastExpiredTime !== NoWork) {
            root.callbackExpirationTime = Sync;
            root.callbackPriority = ImmediatePriority;
            root.callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
            return;
          }
          var expirationTime = getNextRootExpirationTimeToWorkOn(root);
          var existingCallbackNode = root.callbackNode;
          if (expirationTime === NoWork) {
            if (existingCallbackNode !== null) {
              root.callbackNode = null;
              root.callbackExpirationTime = NoWork;
              root.callbackPriority = NoPriority;
            }
            return;
          }
          var currentTime = requestCurrentTimeForUpdate();
          var priorityLevel = inferPriorityFromExpirationTime(currentTime, expirationTime);
          if (existingCallbackNode !== null) {
            var existingCallbackPriority = root.callbackPriority;
            var existingCallbackExpirationTime = root.callbackExpirationTime;
            if (existingCallbackExpirationTime === expirationTime && existingCallbackPriority >= priorityLevel) {
              return;
            }
            cancelCallback(existingCallbackNode);
          }
          root.callbackExpirationTime = expirationTime;
          root.callbackPriority = priorityLevel;
          var callbackNode;
          if (expirationTime === Sync) {
            callbackNode = scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));
          } else {
            callbackNode = scheduleCallback(priorityLevel, performConcurrentWorkOnRoot.bind(null, root), {
              timeout: expirationTimeToMs(expirationTime) - now$1()
            });
          }
          root.callbackNode = callbackNode;
        }
        function performConcurrentWorkOnRoot(root, didTimeout) {
          currentEventTime = NoWork;
          if (didTimeout) {
            var currentTime = requestCurrentTimeForUpdate();
            markRootExpiredAtTime(root, currentTime);
            ensureRootIsScheduled(root);
            return null;
          }
          var expirationTime = getNextRootExpirationTimeToWorkOn(root);
          if (expirationTime !== NoWork) {
            var originalCallbackNode = root.callbackNode;
            if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
              {
                throw Error("Should not already be working.");
              }
            }
            flushPassiveEffects();
            if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1) {
              prepareFreshStack(root, expirationTime);
              startWorkOnPendingInteractions(root, expirationTime);
            }
            if (workInProgress !== null) {
              var prevExecutionContext = executionContext;
              executionContext |= RenderContext;
              var prevDispatcher = pushDispatcher();
              var prevInteractions = pushInteractions(root);
              startWorkLoopTimer(workInProgress);
              do {
                try {
                  workLoopConcurrent();
                  break;
                } catch (thrownValue) {
                  handleError(root, thrownValue);
                }
              } while (true);
              resetContextDependencies();
              executionContext = prevExecutionContext;
              popDispatcher(prevDispatcher);
              {
                popInteractions(prevInteractions);
              }
              if (workInProgressRootExitStatus === RootFatalErrored) {
                var fatalError = workInProgressRootFatalError;
                stopInterruptedWorkLoopTimer();
                prepareFreshStack(root, expirationTime);
                markRootSuspendedAtTime(root, expirationTime);
                ensureRootIsScheduled(root);
                throw fatalError;
              }
              if (workInProgress !== null) {
                stopInterruptedWorkLoopTimer();
              } else {
                stopFinishedWorkLoopTimer();
                var finishedWork = root.finishedWork = root.current.alternate;
                root.finishedExpirationTime = expirationTime;
                finishConcurrentRender(root, finishedWork, workInProgressRootExitStatus, expirationTime);
              }
              ensureRootIsScheduled(root);
              if (root.callbackNode === originalCallbackNode) {
                return performConcurrentWorkOnRoot.bind(null, root);
              }
            }
          }
          return null;
        }
        function finishConcurrentRender(root, finishedWork, exitStatus, expirationTime) {
          workInProgressRoot = null;
          switch (exitStatus) {
            case RootIncomplete:
            case RootFatalErrored: {
              {
                {
                  throw Error("Root did not complete. This is a bug in React.");
                }
              }
            }
            case RootErrored: {
              markRootExpiredAtTime(root, expirationTime > Idle ? Idle : expirationTime);
              break;
            }
            case RootSuspended: {
              markRootSuspendedAtTime(root, expirationTime);
              var lastSuspendedTime = root.lastSuspendedTime;
              if (expirationTime === lastSuspendedTime) {
                root.nextKnownPendingLevel = getRemainingExpirationTime(finishedWork);
              }
              var hasNotProcessedNewUpdates = workInProgressRootLatestProcessedExpirationTime === Sync;
              if (hasNotProcessedNewUpdates && !IsThisRendererActing.current) {
                var msUntilTimeout = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now$1();
                if (msUntilTimeout > 10) {
                  if (workInProgressRootHasPendingPing) {
                    var lastPingedTime = root.lastPingedTime;
                    if (lastPingedTime === NoWork || lastPingedTime >= expirationTime) {
                      root.lastPingedTime = expirationTime;
                      prepareFreshStack(root, expirationTime);
                      break;
                    }
                  }
                  var nextTime = getNextRootExpirationTimeToWorkOn(root);
                  if (nextTime !== NoWork && nextTime !== expirationTime) {
                    break;
                  }
                  if (lastSuspendedTime !== NoWork && lastSuspendedTime !== expirationTime) {
                    root.lastPingedTime = lastSuspendedTime;
                    break;
                  }
                  root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), msUntilTimeout);
                  break;
                }
              }
              commitRoot(root);
              break;
            }
            case RootSuspendedWithDelay: {
              markRootSuspendedAtTime(root, expirationTime);
              var _lastSuspendedTime = root.lastSuspendedTime;
              if (expirationTime === _lastSuspendedTime) {
                root.nextKnownPendingLevel = getRemainingExpirationTime(finishedWork);
              }
              if (!IsThisRendererActing.current) {
                if (workInProgressRootHasPendingPing) {
                  var _lastPingedTime = root.lastPingedTime;
                  if (_lastPingedTime === NoWork || _lastPingedTime >= expirationTime) {
                    root.lastPingedTime = expirationTime;
                    prepareFreshStack(root, expirationTime);
                    break;
                  }
                }
                var _nextTime = getNextRootExpirationTimeToWorkOn(root);
                if (_nextTime !== NoWork && _nextTime !== expirationTime) {
                  break;
                }
                if (_lastSuspendedTime !== NoWork && _lastSuspendedTime !== expirationTime) {
                  root.lastPingedTime = _lastSuspendedTime;
                  break;
                }
                var _msUntilTimeout;
                if (workInProgressRootLatestSuspenseTimeout !== Sync) {
                  _msUntilTimeout = expirationTimeToMs(workInProgressRootLatestSuspenseTimeout) - now$1();
                } else if (workInProgressRootLatestProcessedExpirationTime === Sync) {
                  _msUntilTimeout = 0;
                } else {
                  var eventTimeMs = inferTimeFromExpirationTime(workInProgressRootLatestProcessedExpirationTime);
                  var currentTimeMs = now$1();
                  var timeUntilExpirationMs = expirationTimeToMs(expirationTime) - currentTimeMs;
                  var timeElapsed = currentTimeMs - eventTimeMs;
                  if (timeElapsed < 0) {
                    timeElapsed = 0;
                  }
                  _msUntilTimeout = jnd(timeElapsed) - timeElapsed;
                  if (timeUntilExpirationMs < _msUntilTimeout) {
                    _msUntilTimeout = timeUntilExpirationMs;
                  }
                }
                if (_msUntilTimeout > 10) {
                  root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), _msUntilTimeout);
                  break;
                }
              }
              commitRoot(root);
              break;
            }
            case RootCompleted: {
              if (!IsThisRendererActing.current && workInProgressRootLatestProcessedExpirationTime !== Sync && workInProgressRootCanSuspendUsingConfig !== null) {
                var _msUntilTimeout2 = computeMsUntilSuspenseLoadingDelay(workInProgressRootLatestProcessedExpirationTime, expirationTime, workInProgressRootCanSuspendUsingConfig);
                if (_msUntilTimeout2 > 10) {
                  markRootSuspendedAtTime(root, expirationTime);
                  root.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root), _msUntilTimeout2);
                  break;
                }
              }
              commitRoot(root);
              break;
            }
            default: {
              {
                {
                  throw Error("Unknown root exit status.");
                }
              }
            }
          }
        }
        function performSyncWorkOnRoot(root) {
          var lastExpiredTime = root.lastExpiredTime;
          var expirationTime = lastExpiredTime !== NoWork ? lastExpiredTime : Sync;
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Should not already be working.");
            }
          }
          flushPassiveEffects();
          if (root !== workInProgressRoot || expirationTime !== renderExpirationTime$1) {
            prepareFreshStack(root, expirationTime);
            startWorkOnPendingInteractions(root, expirationTime);
          }
          if (workInProgress !== null) {
            var prevExecutionContext = executionContext;
            executionContext |= RenderContext;
            var prevDispatcher = pushDispatcher();
            var prevInteractions = pushInteractions(root);
            startWorkLoopTimer(workInProgress);
            do {
              try {
                workLoopSync();
                break;
              } catch (thrownValue) {
                handleError(root, thrownValue);
              }
            } while (true);
            resetContextDependencies();
            executionContext = prevExecutionContext;
            popDispatcher(prevDispatcher);
            {
              popInteractions(prevInteractions);
            }
            if (workInProgressRootExitStatus === RootFatalErrored) {
              var fatalError = workInProgressRootFatalError;
              stopInterruptedWorkLoopTimer();
              prepareFreshStack(root, expirationTime);
              markRootSuspendedAtTime(root, expirationTime);
              ensureRootIsScheduled(root);
              throw fatalError;
            }
            if (workInProgress !== null) {
              {
                {
                  throw Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
                }
              }
            } else {
              stopFinishedWorkLoopTimer();
              root.finishedWork = root.current.alternate;
              root.finishedExpirationTime = expirationTime;
              finishSyncRender(root);
            }
            ensureRootIsScheduled(root);
          }
          return null;
        }
        function finishSyncRender(root) {
          workInProgressRoot = null;
          commitRoot(root);
        }
        function flushRoot(root, expirationTime) {
          markRootExpiredAtTime(root, expirationTime);
          ensureRootIsScheduled(root);
          if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
            flushSyncCallbackQueue();
          }
        }
        function flushDiscreteUpdates() {
          if ((executionContext & (BatchedContext | RenderContext | CommitContext)) !== NoContext) {
            {
              if ((executionContext & RenderContext) !== NoContext) {
                error("unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.");
              }
            }
            return;
          }
          flushPendingDiscreteUpdates();
          flushPassiveEffects();
        }
        function deferredUpdates(fn) {
          return runWithPriority(NormalPriority, fn);
        }
        function syncUpdates(fn, a, b, c) {
          return runWithPriority(ImmediatePriority, fn.bind(null, a, b, c));
        }
        function flushPendingDiscreteUpdates() {
          if (rootsWithPendingDiscreteUpdates !== null) {
            var roots = rootsWithPendingDiscreteUpdates;
            rootsWithPendingDiscreteUpdates = null;
            roots.forEach(function(expirationTime, root) {
              markRootExpiredAtTime(root, expirationTime);
              ensureRootIsScheduled(root);
            });
            flushSyncCallbackQueue();
          }
        }
        function batchedUpdates(fn, a) {
          var prevExecutionContext = executionContext;
          executionContext |= BatchedContext;
          try {
            return fn(a);
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              flushSyncCallbackQueue();
            }
          }
        }
        function batchedEventUpdates(fn, a) {
          var prevExecutionContext = executionContext;
          executionContext |= EventContext;
          try {
            return fn(a);
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              flushSyncCallbackQueue();
            }
          }
        }
        function discreteUpdates(fn, a, b, c, d) {
          var prevExecutionContext = executionContext;
          executionContext |= DiscreteEventContext;
          try {
            return runWithPriority(UserBlockingPriority, fn.bind(null, a, b, c, d));
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              flushSyncCallbackQueue();
            }
          }
        }
        function unbatchedUpdates(fn, a) {
          var prevExecutionContext = executionContext;
          executionContext &= ~BatchedContext;
          executionContext |= LegacyUnbatchedContext;
          try {
            return fn(a);
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              flushSyncCallbackQueue();
            }
          }
        }
        function flushSync(fn, a) {
          if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
            {
              {
                throw Error("flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.");
              }
            }
          }
          var prevExecutionContext = executionContext;
          executionContext |= BatchedContext;
          try {
            return runWithPriority(ImmediatePriority, fn.bind(null, a));
          } finally {
            executionContext = prevExecutionContext;
            flushSyncCallbackQueue();
          }
        }
        function flushControlled(fn) {
          var prevExecutionContext = executionContext;
          executionContext |= BatchedContext;
          try {
            runWithPriority(ImmediatePriority, fn);
          } finally {
            executionContext = prevExecutionContext;
            if (executionContext === NoContext) {
              flushSyncCallbackQueue();
            }
          }
        }
        function prepareFreshStack(root, expirationTime) {
          root.finishedWork = null;
          root.finishedExpirationTime = NoWork;
          var timeoutHandle = root.timeoutHandle;
          if (timeoutHandle !== noTimeout) {
            root.timeoutHandle = noTimeout;
            cancelTimeout(timeoutHandle);
          }
          if (workInProgress !== null) {
            var interruptedWork = workInProgress.return;
            while (interruptedWork !== null) {
              unwindInterruptedWork(interruptedWork);
              interruptedWork = interruptedWork.return;
            }
          }
          workInProgressRoot = root;
          workInProgress = createWorkInProgress(root.current, null);
          renderExpirationTime$1 = expirationTime;
          workInProgressRootExitStatus = RootIncomplete;
          workInProgressRootFatalError = null;
          workInProgressRootLatestProcessedExpirationTime = Sync;
          workInProgressRootLatestSuspenseTimeout = Sync;
          workInProgressRootCanSuspendUsingConfig = null;
          workInProgressRootNextUnprocessedUpdateTime = NoWork;
          workInProgressRootHasPendingPing = false;
          {
            spawnedWorkDuringRender = null;
          }
          {
            ReactStrictModeWarnings.discardPendingWarnings();
          }
        }
        function handleError(root, thrownValue) {
          do {
            try {
              resetContextDependencies();
              resetHooksAfterThrow();
              resetCurrentFiber();
              if (workInProgress === null || workInProgress.return === null) {
                workInProgressRootExitStatus = RootFatalErrored;
                workInProgressRootFatalError = thrownValue;
                workInProgress = null;
                return null;
              }
              if (enableProfilerTimer && workInProgress.mode & ProfileMode) {
                stopProfilerTimerIfRunningAndRecordDelta(workInProgress, true);
              }
              throwException(root, workInProgress.return, workInProgress, thrownValue, renderExpirationTime$1);
              workInProgress = completeUnitOfWork(workInProgress);
            } catch (yetAnotherThrownValue) {
              thrownValue = yetAnotherThrownValue;
              continue;
            }
            return;
          } while (true);
        }
        function pushDispatcher(root) {
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
          if (prevDispatcher === null) {
            return ContextOnlyDispatcher;
          } else {
            return prevDispatcher;
          }
        }
        function popDispatcher(prevDispatcher) {
          ReactCurrentDispatcher$1.current = prevDispatcher;
        }
        function pushInteractions(root) {
          {
            var prevInteractions = tracing.__interactionsRef.current;
            tracing.__interactionsRef.current = root.memoizedInteractions;
            return prevInteractions;
          }
        }
        function popInteractions(prevInteractions) {
          {
            tracing.__interactionsRef.current = prevInteractions;
          }
        }
        function markCommitTimeOfFallback() {
          globalMostRecentFallbackTime = now$1();
        }
        function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
          if (expirationTime < workInProgressRootLatestProcessedExpirationTime && expirationTime > Idle) {
            workInProgressRootLatestProcessedExpirationTime = expirationTime;
          }
          if (suspenseConfig !== null) {
            if (expirationTime < workInProgressRootLatestSuspenseTimeout && expirationTime > Idle) {
              workInProgressRootLatestSuspenseTimeout = expirationTime;
              workInProgressRootCanSuspendUsingConfig = suspenseConfig;
            }
          }
        }
        function markUnprocessedUpdateTime(expirationTime) {
          if (expirationTime > workInProgressRootNextUnprocessedUpdateTime) {
            workInProgressRootNextUnprocessedUpdateTime = expirationTime;
          }
        }
        function renderDidSuspend() {
          if (workInProgressRootExitStatus === RootIncomplete) {
            workInProgressRootExitStatus = RootSuspended;
          }
        }
        function renderDidSuspendDelayIfPossible() {
          if (workInProgressRootExitStatus === RootIncomplete || workInProgressRootExitStatus === RootSuspended) {
            workInProgressRootExitStatus = RootSuspendedWithDelay;
          }
          if (workInProgressRootNextUnprocessedUpdateTime !== NoWork && workInProgressRoot !== null) {
            markRootSuspendedAtTime(workInProgressRoot, renderExpirationTime$1);
            markRootUpdatedAtTime(workInProgressRoot, workInProgressRootNextUnprocessedUpdateTime);
          }
        }
        function renderDidError() {
          if (workInProgressRootExitStatus !== RootCompleted) {
            workInProgressRootExitStatus = RootErrored;
          }
        }
        function renderHasNotSuspendedYet() {
          return workInProgressRootExitStatus === RootIncomplete;
        }
        function inferTimeFromExpirationTime(expirationTime) {
          var earliestExpirationTimeMs = expirationTimeToMs(expirationTime);
          return earliestExpirationTimeMs - LOW_PRIORITY_EXPIRATION;
        }
        function inferTimeFromExpirationTimeWithSuspenseConfig(expirationTime, suspenseConfig) {
          var earliestExpirationTimeMs = expirationTimeToMs(expirationTime);
          return earliestExpirationTimeMs - (suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION);
        }
        function workLoopSync() {
          while (workInProgress !== null) {
            workInProgress = performUnitOfWork(workInProgress);
          }
        }
        function workLoopConcurrent() {
          while (workInProgress !== null && !shouldYield()) {
            workInProgress = performUnitOfWork(workInProgress);
          }
        }
        function performUnitOfWork(unitOfWork) {
          var current2 = unitOfWork.alternate;
          startWorkTimer(unitOfWork);
          setCurrentFiber(unitOfWork);
          var next;
          if ((unitOfWork.mode & ProfileMode) !== NoMode) {
            startProfilerTimer(unitOfWork);
            next = beginWork$1(current2, unitOfWork, renderExpirationTime$1);
            stopProfilerTimerIfRunningAndRecordDelta(unitOfWork, true);
          } else {
            next = beginWork$1(current2, unitOfWork, renderExpirationTime$1);
          }
          resetCurrentFiber();
          unitOfWork.memoizedProps = unitOfWork.pendingProps;
          if (next === null) {
            next = completeUnitOfWork(unitOfWork);
          }
          ReactCurrentOwner$2.current = null;
          return next;
        }
        function completeUnitOfWork(unitOfWork) {
          workInProgress = unitOfWork;
          do {
            var current2 = workInProgress.alternate;
            var returnFiber = workInProgress.return;
            if ((workInProgress.effectTag & Incomplete) === NoEffect) {
              setCurrentFiber(workInProgress);
              var next = void 0;
              if ((workInProgress.mode & ProfileMode) === NoMode) {
                next = completeWork(current2, workInProgress, renderExpirationTime$1);
              } else {
                startProfilerTimer(workInProgress);
                next = completeWork(current2, workInProgress, renderExpirationTime$1);
                stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);
              }
              stopWorkTimer(workInProgress);
              resetCurrentFiber();
              resetChildExpirationTime(workInProgress);
              if (next !== null) {
                return next;
              }
              if (returnFiber !== null && (returnFiber.effectTag & Incomplete) === NoEffect) {
                if (returnFiber.firstEffect === null) {
                  returnFiber.firstEffect = workInProgress.firstEffect;
                }
                if (workInProgress.lastEffect !== null) {
                  if (returnFiber.lastEffect !== null) {
                    returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
                  }
                  returnFiber.lastEffect = workInProgress.lastEffect;
                }
                var effectTag = workInProgress.effectTag;
                if (effectTag > PerformedWork) {
                  if (returnFiber.lastEffect !== null) {
                    returnFiber.lastEffect.nextEffect = workInProgress;
                  } else {
                    returnFiber.firstEffect = workInProgress;
                  }
                  returnFiber.lastEffect = workInProgress;
                }
              }
            } else {
              var _next = unwindWork(workInProgress);
              if ((workInProgress.mode & ProfileMode) !== NoMode) {
                stopProfilerTimerIfRunningAndRecordDelta(workInProgress, false);
                var actualDuration = workInProgress.actualDuration;
                var child = workInProgress.child;
                while (child !== null) {
                  actualDuration += child.actualDuration;
                  child = child.sibling;
                }
                workInProgress.actualDuration = actualDuration;
              }
              if (_next !== null) {
                stopFailedWorkTimer(workInProgress);
                _next.effectTag &= HostEffectMask;
                return _next;
              }
              stopWorkTimer(workInProgress);
              if (returnFiber !== null) {
                returnFiber.firstEffect = returnFiber.lastEffect = null;
                returnFiber.effectTag |= Incomplete;
              }
            }
            var siblingFiber = workInProgress.sibling;
            if (siblingFiber !== null) {
              return siblingFiber;
            }
            workInProgress = returnFiber;
          } while (workInProgress !== null);
          if (workInProgressRootExitStatus === RootIncomplete) {
            workInProgressRootExitStatus = RootCompleted;
          }
          return null;
        }
        function getRemainingExpirationTime(fiber) {
          var updateExpirationTime = fiber.expirationTime;
          var childExpirationTime = fiber.childExpirationTime;
          return updateExpirationTime > childExpirationTime ? updateExpirationTime : childExpirationTime;
        }
        function resetChildExpirationTime(completedWork) {
          if (renderExpirationTime$1 !== Never && completedWork.childExpirationTime === Never) {
            return;
          }
          var newChildExpirationTime = NoWork;
          if ((completedWork.mode & ProfileMode) !== NoMode) {
            var actualDuration = completedWork.actualDuration;
            var treeBaseDuration = completedWork.selfBaseDuration;
            var shouldBubbleActualDurations = completedWork.alternate === null || completedWork.child !== completedWork.alternate.child;
            var child = completedWork.child;
            while (child !== null) {
              var childUpdateExpirationTime = child.expirationTime;
              var childChildExpirationTime = child.childExpirationTime;
              if (childUpdateExpirationTime > newChildExpirationTime) {
                newChildExpirationTime = childUpdateExpirationTime;
              }
              if (childChildExpirationTime > newChildExpirationTime) {
                newChildExpirationTime = childChildExpirationTime;
              }
              if (shouldBubbleActualDurations) {
                actualDuration += child.actualDuration;
              }
              treeBaseDuration += child.treeBaseDuration;
              child = child.sibling;
            }
            completedWork.actualDuration = actualDuration;
            completedWork.treeBaseDuration = treeBaseDuration;
          } else {
            var _child = completedWork.child;
            while (_child !== null) {
              var _childUpdateExpirationTime = _child.expirationTime;
              var _childChildExpirationTime = _child.childExpirationTime;
              if (_childUpdateExpirationTime > newChildExpirationTime) {
                newChildExpirationTime = _childUpdateExpirationTime;
              }
              if (_childChildExpirationTime > newChildExpirationTime) {
                newChildExpirationTime = _childChildExpirationTime;
              }
              _child = _child.sibling;
            }
          }
          completedWork.childExpirationTime = newChildExpirationTime;
        }
        function commitRoot(root) {
          var renderPriorityLevel = getCurrentPriorityLevel();
          runWithPriority(ImmediatePriority, commitRootImpl.bind(null, root, renderPriorityLevel));
          return null;
        }
        function commitRootImpl(root, renderPriorityLevel) {
          do {
            flushPassiveEffects();
          } while (rootWithPendingPassiveEffects !== null);
          flushRenderPhaseStrictModeWarningsInDEV();
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Should not already be working.");
            }
          }
          var finishedWork = root.finishedWork;
          var expirationTime = root.finishedExpirationTime;
          if (finishedWork === null) {
            return null;
          }
          root.finishedWork = null;
          root.finishedExpirationTime = NoWork;
          if (!(finishedWork !== root.current)) {
            {
              throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          root.callbackNode = null;
          root.callbackExpirationTime = NoWork;
          root.callbackPriority = NoPriority;
          root.nextKnownPendingLevel = NoWork;
          startCommitTimer();
          var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(finishedWork);
          markRootFinishedAtTime(root, expirationTime, remainingExpirationTimeBeforeCommit);
          if (root === workInProgressRoot) {
            workInProgressRoot = null;
            workInProgress = null;
            renderExpirationTime$1 = NoWork;
          }
          var firstEffect;
          if (finishedWork.effectTag > PerformedWork) {
            if (finishedWork.lastEffect !== null) {
              finishedWork.lastEffect.nextEffect = finishedWork;
              firstEffect = finishedWork.firstEffect;
            } else {
              firstEffect = finishedWork;
            }
          } else {
            firstEffect = finishedWork.firstEffect;
          }
          if (firstEffect !== null) {
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            var prevInteractions = pushInteractions(root);
            ReactCurrentOwner$2.current = null;
            startCommitSnapshotEffectsTimer();
            prepareForCommit(root.containerInfo);
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitBeforeMutationEffects, null);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var error2 = clearCaughtError();
                  captureCommitPhaseError(nextEffect, error2);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            stopCommitSnapshotEffectsTimer();
            {
              recordCommitTime();
            }
            startCommitHostEffectsTimer();
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitMutationEffects, null, root, renderPriorityLevel);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var _error = clearCaughtError();
                  captureCommitPhaseError(nextEffect, _error);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            stopCommitHostEffectsTimer();
            resetAfterCommit(root.containerInfo);
            root.current = finishedWork;
            startCommitLifeCyclesTimer();
            nextEffect = firstEffect;
            do {
              {
                invokeGuardedCallback(null, commitLayoutEffects, null, root, expirationTime);
                if (hasCaughtError()) {
                  if (!(nextEffect !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var _error2 = clearCaughtError();
                  captureCommitPhaseError(nextEffect, _error2);
                  nextEffect = nextEffect.nextEffect;
                }
              }
            } while (nextEffect !== null);
            stopCommitLifeCyclesTimer();
            nextEffect = null;
            requestPaint();
            {
              popInteractions(prevInteractions);
            }
            executionContext = prevExecutionContext;
          } else {
            root.current = finishedWork;
            startCommitSnapshotEffectsTimer();
            stopCommitSnapshotEffectsTimer();
            {
              recordCommitTime();
            }
            startCommitHostEffectsTimer();
            stopCommitHostEffectsTimer();
            startCommitLifeCyclesTimer();
            stopCommitLifeCyclesTimer();
          }
          stopCommitTimer();
          var rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
          if (rootDoesHavePassiveEffects) {
            rootDoesHavePassiveEffects = false;
            rootWithPendingPassiveEffects = root;
            pendingPassiveEffectsExpirationTime = expirationTime;
            pendingPassiveEffectsRenderPriority = renderPriorityLevel;
          } else {
            nextEffect = firstEffect;
            while (nextEffect !== null) {
              var nextNextEffect = nextEffect.nextEffect;
              nextEffect.nextEffect = null;
              nextEffect = nextNextEffect;
            }
          }
          var remainingExpirationTime = root.firstPendingTime;
          if (remainingExpirationTime !== NoWork) {
            {
              if (spawnedWorkDuringRender !== null) {
                var expirationTimes = spawnedWorkDuringRender;
                spawnedWorkDuringRender = null;
                for (var i = 0; i < expirationTimes.length; i++) {
                  scheduleInteractions(root, expirationTimes[i], root.memoizedInteractions);
                }
              }
              schedulePendingInteractions(root, remainingExpirationTime);
            }
          } else {
            legacyErrorBoundariesThatAlreadyFailed = null;
          }
          {
            if (!rootDidHavePassiveEffects) {
              finishPendingInteractions(root, expirationTime);
            }
          }
          if (remainingExpirationTime === Sync) {
            if (root === rootWithNestedUpdates) {
              nestedUpdateCount++;
            } else {
              nestedUpdateCount = 0;
              rootWithNestedUpdates = root;
            }
          } else {
            nestedUpdateCount = 0;
          }
          onCommitRoot(finishedWork.stateNode, expirationTime);
          ensureRootIsScheduled(root);
          if (hasUncaughtError) {
            hasUncaughtError = false;
            var _error3 = firstUncaughtError;
            firstUncaughtError = null;
            throw _error3;
          }
          if ((executionContext & LegacyUnbatchedContext) !== NoContext) {
            return null;
          }
          flushSyncCallbackQueue();
          return null;
        }
        function commitBeforeMutationEffects() {
          while (nextEffect !== null) {
            var effectTag = nextEffect.effectTag;
            if ((effectTag & Snapshot) !== NoEffect) {
              setCurrentFiber(nextEffect);
              recordEffect();
              var current2 = nextEffect.alternate;
              commitBeforeMutationLifeCycles(current2, nextEffect);
              resetCurrentFiber();
            }
            if ((effectTag & Passive) !== NoEffect) {
              if (!rootDoesHavePassiveEffects) {
                rootDoesHavePassiveEffects = true;
                scheduleCallback(NormalPriority, function() {
                  flushPassiveEffects();
                  return null;
                });
              }
            }
            nextEffect = nextEffect.nextEffect;
          }
        }
        function commitMutationEffects(root, renderPriorityLevel) {
          while (nextEffect !== null) {
            setCurrentFiber(nextEffect);
            var effectTag = nextEffect.effectTag;
            if (effectTag & ContentReset) {
              commitResetTextContent(nextEffect);
            }
            if (effectTag & Ref) {
              var current2 = nextEffect.alternate;
              if (current2 !== null) {
                commitDetachRef(current2);
              }
            }
            var primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating);
            switch (primaryEffectTag) {
              case Placement: {
                commitPlacement(nextEffect);
                nextEffect.effectTag &= ~Placement;
                break;
              }
              case PlacementAndUpdate: {
                commitPlacement(nextEffect);
                nextEffect.effectTag &= ~Placement;
                var _current = nextEffect.alternate;
                commitWork(_current, nextEffect);
                break;
              }
              case Hydrating: {
                nextEffect.effectTag &= ~Hydrating;
                break;
              }
              case HydratingAndUpdate: {
                nextEffect.effectTag &= ~Hydrating;
                var _current2 = nextEffect.alternate;
                commitWork(_current2, nextEffect);
                break;
              }
              case Update: {
                var _current3 = nextEffect.alternate;
                commitWork(_current3, nextEffect);
                break;
              }
              case Deletion: {
                commitDeletion(root, nextEffect, renderPriorityLevel);
                break;
              }
            }
            recordEffect();
            resetCurrentFiber();
            nextEffect = nextEffect.nextEffect;
          }
        }
        function commitLayoutEffects(root, committedExpirationTime) {
          while (nextEffect !== null) {
            setCurrentFiber(nextEffect);
            var effectTag = nextEffect.effectTag;
            if (effectTag & (Update | Callback)) {
              recordEffect();
              var current2 = nextEffect.alternate;
              commitLifeCycles(root, current2, nextEffect);
            }
            if (effectTag & Ref) {
              recordEffect();
              commitAttachRef(nextEffect);
            }
            resetCurrentFiber();
            nextEffect = nextEffect.nextEffect;
          }
        }
        function flushPassiveEffects() {
          if (pendingPassiveEffectsRenderPriority !== NoPriority) {
            var priorityLevel = pendingPassiveEffectsRenderPriority > NormalPriority ? NormalPriority : pendingPassiveEffectsRenderPriority;
            pendingPassiveEffectsRenderPriority = NoPriority;
            return runWithPriority(priorityLevel, flushPassiveEffectsImpl);
          }
        }
        function flushPassiveEffectsImpl() {
          if (rootWithPendingPassiveEffects === null) {
            return false;
          }
          var root = rootWithPendingPassiveEffects;
          var expirationTime = pendingPassiveEffectsExpirationTime;
          rootWithPendingPassiveEffects = null;
          pendingPassiveEffectsExpirationTime = NoWork;
          if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
              throw Error("Cannot flush passive effects while already rendering.");
            }
          }
          var prevExecutionContext = executionContext;
          executionContext |= CommitContext;
          var prevInteractions = pushInteractions(root);
          {
            var _effect2 = root.current.firstEffect;
            while (_effect2 !== null) {
              {
                setCurrentFiber(_effect2);
                invokeGuardedCallback(null, commitPassiveHookEffects, null, _effect2);
                if (hasCaughtError()) {
                  if (!(_effect2 !== null)) {
                    {
                      throw Error("Should be working on an effect.");
                    }
                  }
                  var _error5 = clearCaughtError();
                  captureCommitPhaseError(_effect2, _error5);
                }
                resetCurrentFiber();
              }
              var nextNextEffect = _effect2.nextEffect;
              _effect2.nextEffect = null;
              _effect2 = nextNextEffect;
            }
          }
          {
            popInteractions(prevInteractions);
            finishPendingInteractions(root, expirationTime);
          }
          executionContext = prevExecutionContext;
          flushSyncCallbackQueue();
          nestedPassiveUpdateCount = rootWithPendingPassiveEffects === null ? 0 : nestedPassiveUpdateCount + 1;
          return true;
        }
        function isAlreadyFailedLegacyErrorBoundary(instance) {
          return legacyErrorBoundariesThatAlreadyFailed !== null && legacyErrorBoundariesThatAlreadyFailed.has(instance);
        }
        function markLegacyErrorBoundaryAsFailed(instance) {
          if (legacyErrorBoundariesThatAlreadyFailed === null) {
            legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([instance]);
          } else {
            legacyErrorBoundariesThatAlreadyFailed.add(instance);
          }
        }
        function prepareToThrowUncaughtError(error2) {
          if (!hasUncaughtError) {
            hasUncaughtError = true;
            firstUncaughtError = error2;
          }
        }
        var onUncaughtError = prepareToThrowUncaughtError;
        function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error2) {
          var errorInfo = createCapturedValue(error2, sourceFiber);
          var update = createRootErrorUpdate(rootFiber, errorInfo, Sync);
          enqueueUpdate(rootFiber, update);
          var root = markUpdateTimeFromFiberToRoot(rootFiber, Sync);
          if (root !== null) {
            ensureRootIsScheduled(root);
            schedulePendingInteractions(root, Sync);
          }
        }
        function captureCommitPhaseError(sourceFiber, error2) {
          if (sourceFiber.tag === HostRoot) {
            captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error2);
            return;
          }
          var fiber = sourceFiber.return;
          while (fiber !== null) {
            if (fiber.tag === HostRoot) {
              captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error2);
              return;
            } else if (fiber.tag === ClassComponent) {
              var ctor = fiber.type;
              var instance = fiber.stateNode;
              if (typeof ctor.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && !isAlreadyFailedLegacyErrorBoundary(instance)) {
                var errorInfo = createCapturedValue(error2, sourceFiber);
                var update = createClassErrorUpdate(fiber, errorInfo, Sync);
                enqueueUpdate(fiber, update);
                var root = markUpdateTimeFromFiberToRoot(fiber, Sync);
                if (root !== null) {
                  ensureRootIsScheduled(root);
                  schedulePendingInteractions(root, Sync);
                }
                return;
              }
            }
            fiber = fiber.return;
          }
        }
        function pingSuspendedRoot(root, thenable, suspendedTime) {
          var pingCache = root.pingCache;
          if (pingCache !== null) {
            pingCache.delete(thenable);
          }
          if (workInProgressRoot === root && renderExpirationTime$1 === suspendedTime) {
            if (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && workInProgressRootLatestProcessedExpirationTime === Sync && now$1() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS) {
              prepareFreshStack(root, renderExpirationTime$1);
            } else {
              workInProgressRootHasPendingPing = true;
            }
            return;
          }
          if (!isRootSuspendedAtTime(root, suspendedTime)) {
            return;
          }
          var lastPingedTime = root.lastPingedTime;
          if (lastPingedTime !== NoWork && lastPingedTime < suspendedTime) {
            return;
          }
          root.lastPingedTime = suspendedTime;
          ensureRootIsScheduled(root);
          schedulePendingInteractions(root, suspendedTime);
        }
        function retryTimedOutBoundary(boundaryFiber, retryTime) {
          if (retryTime === NoWork) {
            var suspenseConfig = null;
            var currentTime = requestCurrentTimeForUpdate();
            retryTime = computeExpirationForFiber(currentTime, boundaryFiber, suspenseConfig);
          }
          var root = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
          if (root !== null) {
            ensureRootIsScheduled(root);
            schedulePendingInteractions(root, retryTime);
          }
        }
        function resolveRetryThenable(boundaryFiber, thenable) {
          var retryTime = NoWork;
          var retryCache;
          {
            retryCache = boundaryFiber.stateNode;
          }
          if (retryCache !== null) {
            retryCache.delete(thenable);
          }
          retryTimedOutBoundary(boundaryFiber, retryTime);
        }
        function jnd(timeElapsed) {
          return timeElapsed < 120 ? 120 : timeElapsed < 480 ? 480 : timeElapsed < 1080 ? 1080 : timeElapsed < 1920 ? 1920 : timeElapsed < 3e3 ? 3e3 : timeElapsed < 4320 ? 4320 : ceil(timeElapsed / 1960) * 1960;
        }
        function computeMsUntilSuspenseLoadingDelay(mostRecentEventTime, committedExpirationTime, suspenseConfig) {
          var busyMinDurationMs = suspenseConfig.busyMinDurationMs | 0;
          if (busyMinDurationMs <= 0) {
            return 0;
          }
          var busyDelayMs = suspenseConfig.busyDelayMs | 0;
          var currentTimeMs = now$1();
          var eventTimeMs = inferTimeFromExpirationTimeWithSuspenseConfig(mostRecentEventTime, suspenseConfig);
          var timeElapsed = currentTimeMs - eventTimeMs;
          if (timeElapsed <= busyDelayMs) {
            return 0;
          }
          var msUntilTimeout = busyDelayMs + busyMinDurationMs - timeElapsed;
          return msUntilTimeout;
        }
        function checkForNestedUpdates() {
          if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
            nestedUpdateCount = 0;
            rootWithNestedUpdates = null;
            {
              {
                throw Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
              }
            }
          }
          {
            if (nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT) {
              nestedPassiveUpdateCount = 0;
              error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.");
            }
          }
        }
        function flushRenderPhaseStrictModeWarningsInDEV() {
          {
            ReactStrictModeWarnings.flushLegacyContextWarning();
            {
              ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
            }
          }
        }
        function stopFinishedWorkLoopTimer() {
          var didCompleteRoot = true;
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
        }
        function stopInterruptedWorkLoopTimer() {
          var didCompleteRoot = false;
          stopWorkLoopTimer(interruptedBy, didCompleteRoot);
          interruptedBy = null;
        }
        function checkForInterruption(fiberThatReceivedUpdate, updateExpirationTime) {
          if (workInProgressRoot !== null && updateExpirationTime > renderExpirationTime$1) {
            interruptedBy = fiberThatReceivedUpdate;
          }
        }
        var didWarnStateUpdateForUnmountedComponent = null;
        function warnAboutUpdateOnUnmountedFiberInDEV(fiber) {
          {
            var tag = fiber.tag;
            if (tag !== HostRoot && tag !== ClassComponent && tag !== FunctionComponent && tag !== ForwardRef && tag !== MemoComponent && tag !== SimpleMemoComponent && tag !== Block) {
              return;
            }
            var componentName = getComponentName(fiber.type) || "ReactComponent";
            if (didWarnStateUpdateForUnmountedComponent !== null) {
              if (didWarnStateUpdateForUnmountedComponent.has(componentName)) {
                return;
              }
              didWarnStateUpdateForUnmountedComponent.add(componentName);
            } else {
              didWarnStateUpdateForUnmountedComponent = /* @__PURE__ */ new Set([componentName]);
            }
            error("Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s", tag === ClassComponent ? "the componentWillUnmount method" : "a useEffect cleanup function", getStackByFiberInDevAndProd(fiber));
          }
        }
        var beginWork$1;
        {
          var dummyFiber = null;
          beginWork$1 = function(current2, unitOfWork, expirationTime) {
            var originalWorkInProgressCopy = assignFiberPropertiesInDEV(dummyFiber, unitOfWork);
            try {
              return beginWork(current2, unitOfWork, expirationTime);
            } catch (originalError) {
              if (originalError !== null && typeof originalError === "object" && typeof originalError.then === "function") {
                throw originalError;
              }
              resetContextDependencies();
              resetHooksAfterThrow();
              unwindInterruptedWork(unitOfWork);
              assignFiberPropertiesInDEV(unitOfWork, originalWorkInProgressCopy);
              if (unitOfWork.mode & ProfileMode) {
                startProfilerTimer(unitOfWork);
              }
              invokeGuardedCallback(null, beginWork, null, current2, unitOfWork, expirationTime);
              if (hasCaughtError()) {
                var replayError = clearCaughtError();
                throw replayError;
              } else {
                throw originalError;
              }
            }
          };
        }
        var didWarnAboutUpdateInRender = false;
        var didWarnAboutUpdateInRenderForAnotherComponent;
        {
          didWarnAboutUpdateInRenderForAnotherComponent = /* @__PURE__ */ new Set();
        }
        function warnAboutRenderPhaseUpdatesInDEV(fiber) {
          {
            if (isRendering && (executionContext & RenderContext) !== NoContext) {
              switch (fiber.tag) {
                case FunctionComponent:
                case ForwardRef:
                case SimpleMemoComponent: {
                  var renderingComponentName = workInProgress && getComponentName(workInProgress.type) || "Unknown";
                  var dedupeKey = renderingComponentName;
                  if (!didWarnAboutUpdateInRenderForAnotherComponent.has(dedupeKey)) {
                    didWarnAboutUpdateInRenderForAnotherComponent.add(dedupeKey);
                    var setStateComponentName = getComponentName(fiber.type) || "Unknown";
                    error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://fb.me/setstate-in-render", setStateComponentName, renderingComponentName, renderingComponentName);
                  }
                  break;
                }
                case ClassComponent: {
                  if (!didWarnAboutUpdateInRender) {
                    error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.");
                    didWarnAboutUpdateInRender = true;
                  }
                  break;
                }
              }
            }
          }
        }
        var IsThisRendererActing = {
          current: false
        };
        function warnIfNotScopedWithMatchingAct(fiber) {
          {
            if (warnsIfNotActing === true && IsSomeRendererActing.current === true && IsThisRendererActing.current !== true) {
              error("It looks like you're using the wrong act() around your test interactions.\nBe sure to use the matching version of act() corresponding to your renderer:\n\n// for react-dom:\nimport {act} from 'react-dom/test-utils';\n// ...\nact(() => ...);\n\n// for react-test-renderer:\nimport TestRenderer from 'react-test-renderer';\nconst {act} = TestRenderer;\n// ...\nact(() => ...);%s", getStackByFiberInDevAndProd(fiber));
            }
          }
        }
        function warnIfNotCurrentlyActingEffectsInDEV(fiber) {
          {
            if (warnsIfNotActing === true && (fiber.mode & StrictMode) !== NoMode && IsSomeRendererActing.current === false && IsThisRendererActing.current === false) {
              error("An update to %s ran an effect, but was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act%s", getComponentName(fiber.type), getStackByFiberInDevAndProd(fiber));
            }
          }
        }
        function warnIfNotCurrentlyActingUpdatesInDEV(fiber) {
          {
            if (warnsIfNotActing === true && executionContext === NoContext && IsSomeRendererActing.current === false && IsThisRendererActing.current === false) {
              error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act%s", getComponentName(fiber.type), getStackByFiberInDevAndProd(fiber));
            }
          }
        }
        var warnIfNotCurrentlyActingUpdatesInDev = warnIfNotCurrentlyActingUpdatesInDEV;
        var didWarnAboutUnmockedScheduler = false;
        function warnIfUnmockedScheduler(fiber) {
          {
            if (didWarnAboutUnmockedScheduler === false && Scheduler.unstable_flushAllWithoutAsserting === void 0) {
              if (fiber.mode & BlockingMode || fiber.mode & ConcurrentMode) {
                didWarnAboutUnmockedScheduler = true;
                error(`In Concurrent or Sync modes, the "scheduler" module needs to be mocked to guarantee consistent behaviour across tests and browsers. For example, with jest: 
jest.mock('scheduler', () => require('scheduler/unstable_mock'));

For more info, visit https://fb.me/react-mock-scheduler`);
              }
            }
          }
        }
        function computeThreadID(root, expirationTime) {
          return expirationTime * 1e3 + root.interactionThreadID;
        }
        function markSpawnedWork(expirationTime) {
          if (spawnedWorkDuringRender === null) {
            spawnedWorkDuringRender = [expirationTime];
          } else {
            spawnedWorkDuringRender.push(expirationTime);
          }
        }
        function scheduleInteractions(root, expirationTime, interactions) {
          if (interactions.size > 0) {
            var pendingInteractionMap = root.pendingInteractionMap;
            var pendingInteractions = pendingInteractionMap.get(expirationTime);
            if (pendingInteractions != null) {
              interactions.forEach(function(interaction) {
                if (!pendingInteractions.has(interaction)) {
                  interaction.__count++;
                }
                pendingInteractions.add(interaction);
              });
            } else {
              pendingInteractionMap.set(expirationTime, new Set(interactions));
              interactions.forEach(function(interaction) {
                interaction.__count++;
              });
            }
            var subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null) {
              var threadID = computeThreadID(root, expirationTime);
              subscriber.onWorkScheduled(interactions, threadID);
            }
          }
        }
        function schedulePendingInteractions(root, expirationTime) {
          scheduleInteractions(root, expirationTime, tracing.__interactionsRef.current);
        }
        function startWorkOnPendingInteractions(root, expirationTime) {
          var interactions = /* @__PURE__ */ new Set();
          root.pendingInteractionMap.forEach(function(scheduledInteractions, scheduledExpirationTime) {
            if (scheduledExpirationTime >= expirationTime) {
              scheduledInteractions.forEach(function(interaction) {
                return interactions.add(interaction);
              });
            }
          });
          root.memoizedInteractions = interactions;
          if (interactions.size > 0) {
            var subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null) {
              var threadID = computeThreadID(root, expirationTime);
              try {
                subscriber.onWorkStarted(interactions, threadID);
              } catch (error2) {
                scheduleCallback(ImmediatePriority, function() {
                  throw error2;
                });
              }
            }
          }
        }
        function finishPendingInteractions(root, committedExpirationTime) {
          var earliestRemainingTimeAfterCommit = root.firstPendingTime;
          var subscriber;
          try {
            subscriber = tracing.__subscriberRef.current;
            if (subscriber !== null && root.memoizedInteractions.size > 0) {
              var threadID = computeThreadID(root, committedExpirationTime);
              subscriber.onWorkStopped(root.memoizedInteractions, threadID);
            }
          } catch (error2) {
            scheduleCallback(ImmediatePriority, function() {
              throw error2;
            });
          } finally {
            var pendingInteractionMap = root.pendingInteractionMap;
            pendingInteractionMap.forEach(function(scheduledInteractions, scheduledExpirationTime) {
              if (scheduledExpirationTime > earliestRemainingTimeAfterCommit) {
                pendingInteractionMap.delete(scheduledExpirationTime);
                scheduledInteractions.forEach(function(interaction) {
                  interaction.__count--;
                  if (subscriber !== null && interaction.__count === 0) {
                    try {
                      subscriber.onInteractionScheduledWorkCompleted(interaction);
                    } catch (error2) {
                      scheduleCallback(ImmediatePriority, function() {
                        throw error2;
                      });
                    }
                  }
                });
              }
            });
          }
        }
        var onScheduleFiberRoot = null;
        var onCommitFiberRoot = null;
        var onCommitFiberUnmount = null;
        var hasLoggedError = false;
        var isDevToolsPresent = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined";
        function injectInternals(internals) {
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined") {
            return false;
          }
          var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (hook.isDisabled) {
            return true;
          }
          if (!hook.supportsFiber) {
            {
              error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://fb.me/react-devtools");
            }
            return true;
          }
          try {
            var rendererID = hook.inject(internals);
            if (true) {
              if (typeof hook.onScheduleFiberRoot === "function") {
                onScheduleFiberRoot = function(root, children) {
                  try {
                    hook.onScheduleFiberRoot(rendererID, root, children);
                  } catch (err) {
                    if (!hasLoggedError) {
                      hasLoggedError = true;
                      error("React instrumentation encountered an error: %s", err);
                    }
                  }
                };
              }
            }
            onCommitFiberRoot = function(root, expirationTime) {
              try {
                var didError = (root.current.effectTag & DidCapture) === DidCapture;
                if (enableProfilerTimer) {
                  var currentTime = getCurrentTime();
                  var priorityLevel = inferPriorityFromExpirationTime(currentTime, expirationTime);
                  hook.onCommitFiberRoot(rendererID, root, priorityLevel, didError);
                } else {
                  hook.onCommitFiberRoot(rendererID, root, void 0, didError);
                }
              } catch (err) {
                if (true) {
                  if (!hasLoggedError) {
                    hasLoggedError = true;
                    error("React instrumentation encountered an error: %s", err);
                  }
                }
              }
            };
            onCommitFiberUnmount = function(fiber) {
              try {
                hook.onCommitFiberUnmount(rendererID, fiber);
              } catch (err) {
                if (true) {
                  if (!hasLoggedError) {
                    hasLoggedError = true;
                    error("React instrumentation encountered an error: %s", err);
                  }
                }
              }
            };
          } catch (err) {
            {
              error("React instrumentation encountered an error: %s.", err);
            }
          }
          return true;
        }
        function onScheduleRoot(root, children) {
          if (typeof onScheduleFiberRoot === "function") {
            onScheduleFiberRoot(root, children);
          }
        }
        function onCommitRoot(root, expirationTime) {
          if (typeof onCommitFiberRoot === "function") {
            onCommitFiberRoot(root, expirationTime);
          }
        }
        function onCommitUnmount(fiber) {
          if (typeof onCommitFiberUnmount === "function") {
            onCommitFiberUnmount(fiber);
          }
        }
        var hasBadMapPolyfill;
        {
          hasBadMapPolyfill = false;
          try {
            var nonExtensibleObject = Object.preventExtensions({});
            var testMap = /* @__PURE__ */ new Map([[nonExtensibleObject, null]]);
            var testSet = /* @__PURE__ */ new Set([nonExtensibleObject]);
            testMap.set(0, 0);
            testSet.add(0);
          } catch (e) {
            hasBadMapPolyfill = true;
          }
        }
        var debugCounter = 1;
        function FiberNode(tag, pendingProps, key, mode) {
          this.tag = tag;
          this.key = key;
          this.elementType = null;
          this.type = null;
          this.stateNode = null;
          this.return = null;
          this.child = null;
          this.sibling = null;
          this.index = 0;
          this.ref = null;
          this.pendingProps = pendingProps;
          this.memoizedProps = null;
          this.updateQueue = null;
          this.memoizedState = null;
          this.dependencies = null;
          this.mode = mode;
          this.effectTag = NoEffect;
          this.nextEffect = null;
          this.firstEffect = null;
          this.lastEffect = null;
          this.expirationTime = NoWork;
          this.childExpirationTime = NoWork;
          this.alternate = null;
          {
            this.actualDuration = Number.NaN;
            this.actualStartTime = Number.NaN;
            this.selfBaseDuration = Number.NaN;
            this.treeBaseDuration = Number.NaN;
            this.actualDuration = 0;
            this.actualStartTime = -1;
            this.selfBaseDuration = 0;
            this.treeBaseDuration = 0;
          }
          {
            this._debugID = debugCounter++;
            this._debugIsCurrentlyTiming = false;
          }
          {
            this._debugSource = null;
            this._debugOwner = null;
            this._debugNeedsRemount = false;
            this._debugHookTypes = null;
            if (!hasBadMapPolyfill && typeof Object.preventExtensions === "function") {
              Object.preventExtensions(this);
            }
          }
        }
        var createFiber = function(tag, pendingProps, key, mode) {
          return new FiberNode(tag, pendingProps, key, mode);
        };
        function shouldConstruct(Component) {
          var prototype = Component.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function isSimpleFunctionComponent(type) {
          return typeof type === "function" && !shouldConstruct(type) && type.defaultProps === void 0;
        }
        function resolveLazyComponentTag(Component) {
          if (typeof Component === "function") {
            return shouldConstruct(Component) ? ClassComponent : FunctionComponent;
          } else if (Component !== void 0 && Component !== null) {
            var $$typeof = Component.$$typeof;
            if ($$typeof === REACT_FORWARD_REF_TYPE) {
              return ForwardRef;
            }
            if ($$typeof === REACT_MEMO_TYPE) {
              return MemoComponent;
            }
          }
          return IndeterminateComponent;
        }
        function createWorkInProgress(current2, pendingProps) {
          var workInProgress2 = current2.alternate;
          if (workInProgress2 === null) {
            workInProgress2 = createFiber(current2.tag, pendingProps, current2.key, current2.mode);
            workInProgress2.elementType = current2.elementType;
            workInProgress2.type = current2.type;
            workInProgress2.stateNode = current2.stateNode;
            {
              {
                workInProgress2._debugID = current2._debugID;
              }
              workInProgress2._debugSource = current2._debugSource;
              workInProgress2._debugOwner = current2._debugOwner;
              workInProgress2._debugHookTypes = current2._debugHookTypes;
            }
            workInProgress2.alternate = current2;
            current2.alternate = workInProgress2;
          } else {
            workInProgress2.pendingProps = pendingProps;
            workInProgress2.effectTag = NoEffect;
            workInProgress2.nextEffect = null;
            workInProgress2.firstEffect = null;
            workInProgress2.lastEffect = null;
            {
              workInProgress2.actualDuration = 0;
              workInProgress2.actualStartTime = -1;
            }
          }
          workInProgress2.childExpirationTime = current2.childExpirationTime;
          workInProgress2.expirationTime = current2.expirationTime;
          workInProgress2.child = current2.child;
          workInProgress2.memoizedProps = current2.memoizedProps;
          workInProgress2.memoizedState = current2.memoizedState;
          workInProgress2.updateQueue = current2.updateQueue;
          var currentDependencies = current2.dependencies;
          workInProgress2.dependencies = currentDependencies === null ? null : {
            expirationTime: currentDependencies.expirationTime,
            firstContext: currentDependencies.firstContext,
            responders: currentDependencies.responders
          };
          workInProgress2.sibling = current2.sibling;
          workInProgress2.index = current2.index;
          workInProgress2.ref = current2.ref;
          {
            workInProgress2.selfBaseDuration = current2.selfBaseDuration;
            workInProgress2.treeBaseDuration = current2.treeBaseDuration;
          }
          {
            workInProgress2._debugNeedsRemount = current2._debugNeedsRemount;
            switch (workInProgress2.tag) {
              case IndeterminateComponent:
              case FunctionComponent:
              case SimpleMemoComponent:
                workInProgress2.type = resolveFunctionForHotReloading(current2.type);
                break;
              case ClassComponent:
                workInProgress2.type = resolveClassForHotReloading(current2.type);
                break;
              case ForwardRef:
                workInProgress2.type = resolveForwardRefForHotReloading(current2.type);
                break;
            }
          }
          return workInProgress2;
        }
        function resetWorkInProgress(workInProgress2, renderExpirationTime2) {
          workInProgress2.effectTag &= Placement;
          workInProgress2.nextEffect = null;
          workInProgress2.firstEffect = null;
          workInProgress2.lastEffect = null;
          var current2 = workInProgress2.alternate;
          if (current2 === null) {
            workInProgress2.childExpirationTime = NoWork;
            workInProgress2.expirationTime = renderExpirationTime2;
            workInProgress2.child = null;
            workInProgress2.memoizedProps = null;
            workInProgress2.memoizedState = null;
            workInProgress2.updateQueue = null;
            workInProgress2.dependencies = null;
            {
              workInProgress2.selfBaseDuration = 0;
              workInProgress2.treeBaseDuration = 0;
            }
          } else {
            workInProgress2.childExpirationTime = current2.childExpirationTime;
            workInProgress2.expirationTime = current2.expirationTime;
            workInProgress2.child = current2.child;
            workInProgress2.memoizedProps = current2.memoizedProps;
            workInProgress2.memoizedState = current2.memoizedState;
            workInProgress2.updateQueue = current2.updateQueue;
            var currentDependencies = current2.dependencies;
            workInProgress2.dependencies = currentDependencies === null ? null : {
              expirationTime: currentDependencies.expirationTime,
              firstContext: currentDependencies.firstContext,
              responders: currentDependencies.responders
            };
            {
              workInProgress2.selfBaseDuration = current2.selfBaseDuration;
              workInProgress2.treeBaseDuration = current2.treeBaseDuration;
            }
          }
          return workInProgress2;
        }
        function createHostRootFiber(tag) {
          var mode;
          if (tag === ConcurrentRoot) {
            mode = ConcurrentMode | BlockingMode | StrictMode;
          } else if (tag === BlockingRoot) {
            mode = BlockingMode | StrictMode;
          } else {
            mode = NoMode;
          }
          if (isDevToolsPresent) {
            mode |= ProfileMode;
          }
          return createFiber(HostRoot, null, null, mode);
        }
        function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime) {
          var fiber;
          var fiberTag = IndeterminateComponent;
          var resolvedType = type;
          if (typeof type === "function") {
            if (shouldConstruct(type)) {
              fiberTag = ClassComponent;
              {
                resolvedType = resolveClassForHotReloading(resolvedType);
              }
            } else {
              {
                resolvedType = resolveFunctionForHotReloading(resolvedType);
              }
            }
          } else if (typeof type === "string") {
            fiberTag = HostComponent;
          } else {
            getTag:
              switch (type) {
                case REACT_FRAGMENT_TYPE:
                  return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);
                case REACT_CONCURRENT_MODE_TYPE:
                  fiberTag = Mode;
                  mode |= ConcurrentMode | BlockingMode | StrictMode;
                  break;
                case REACT_STRICT_MODE_TYPE:
                  fiberTag = Mode;
                  mode |= StrictMode;
                  break;
                case REACT_PROFILER_TYPE:
                  return createFiberFromProfiler(pendingProps, mode, expirationTime, key);
                case REACT_SUSPENSE_TYPE:
                  return createFiberFromSuspense(pendingProps, mode, expirationTime, key);
                case REACT_SUSPENSE_LIST_TYPE:
                  return createFiberFromSuspenseList(pendingProps, mode, expirationTime, key);
                default: {
                  if (typeof type === "object" && type !== null) {
                    switch (type.$$typeof) {
                      case REACT_PROVIDER_TYPE:
                        fiberTag = ContextProvider;
                        break getTag;
                      case REACT_CONTEXT_TYPE:
                        fiberTag = ContextConsumer;
                        break getTag;
                      case REACT_FORWARD_REF_TYPE:
                        fiberTag = ForwardRef;
                        {
                          resolvedType = resolveForwardRefForHotReloading(resolvedType);
                        }
                        break getTag;
                      case REACT_MEMO_TYPE:
                        fiberTag = MemoComponent;
                        break getTag;
                      case REACT_LAZY_TYPE:
                        fiberTag = LazyComponent;
                        resolvedType = null;
                        break getTag;
                      case REACT_BLOCK_TYPE:
                        fiberTag = Block;
                        break getTag;
                    }
                  }
                  var info = "";
                  {
                    if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                      info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                    }
                    var ownerName = owner ? getComponentName(owner.type) : null;
                    if (ownerName) {
                      info += "\n\nCheck the render method of `" + ownerName + "`.";
                    }
                  }
                  {
                    {
                      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (type == null ? type : typeof type) + "." + info);
                    }
                  }
                }
              }
          }
          fiber = createFiber(fiberTag, pendingProps, key, mode);
          fiber.elementType = type;
          fiber.type = resolvedType;
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromElement(element, mode, expirationTime) {
          var owner = null;
          {
            owner = element._owner;
          }
          var type = element.type;
          var key = element.key;
          var pendingProps = element.props;
          var fiber = createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, expirationTime);
          {
            fiber._debugSource = element._source;
            fiber._debugOwner = element._owner;
          }
          return fiber;
        }
        function createFiberFromFragment(elements, mode, expirationTime, key) {
          var fiber = createFiber(Fragment, elements, key, mode);
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromProfiler(pendingProps, mode, expirationTime, key) {
          {
            if (typeof pendingProps.id !== "string" || typeof pendingProps.onRender !== "function") {
              error('Profiler must specify an "id" string and "onRender" function as props');
            }
          }
          var fiber = createFiber(Profiler, pendingProps, key, mode | ProfileMode);
          fiber.elementType = REACT_PROFILER_TYPE;
          fiber.type = REACT_PROFILER_TYPE;
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromSuspense(pendingProps, mode, expirationTime, key) {
          var fiber = createFiber(SuspenseComponent, pendingProps, key, mode);
          fiber.type = REACT_SUSPENSE_TYPE;
          fiber.elementType = REACT_SUSPENSE_TYPE;
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromSuspenseList(pendingProps, mode, expirationTime, key) {
          var fiber = createFiber(SuspenseListComponent, pendingProps, key, mode);
          {
            fiber.type = REACT_SUSPENSE_LIST_TYPE;
          }
          fiber.elementType = REACT_SUSPENSE_LIST_TYPE;
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromText(content, mode, expirationTime) {
          var fiber = createFiber(HostText, content, null, mode);
          fiber.expirationTime = expirationTime;
          return fiber;
        }
        function createFiberFromHostInstanceForDeletion() {
          var fiber = createFiber(HostComponent, null, null, NoMode);
          fiber.elementType = "DELETED";
          fiber.type = "DELETED";
          return fiber;
        }
        function createFiberFromPortal(portal, mode, expirationTime) {
          var pendingProps = portal.children !== null ? portal.children : [];
          var fiber = createFiber(HostPortal, pendingProps, portal.key, mode);
          fiber.expirationTime = expirationTime;
          fiber.stateNode = {
            containerInfo: portal.containerInfo,
            pendingChildren: null,
            implementation: portal.implementation
          };
          return fiber;
        }
        function assignFiberPropertiesInDEV(target, source) {
          if (target === null) {
            target = createFiber(IndeterminateComponent, null, null, NoMode);
          }
          target.tag = source.tag;
          target.key = source.key;
          target.elementType = source.elementType;
          target.type = source.type;
          target.stateNode = source.stateNode;
          target.return = source.return;
          target.child = source.child;
          target.sibling = source.sibling;
          target.index = source.index;
          target.ref = source.ref;
          target.pendingProps = source.pendingProps;
          target.memoizedProps = source.memoizedProps;
          target.updateQueue = source.updateQueue;
          target.memoizedState = source.memoizedState;
          target.dependencies = source.dependencies;
          target.mode = source.mode;
          target.effectTag = source.effectTag;
          target.nextEffect = source.nextEffect;
          target.firstEffect = source.firstEffect;
          target.lastEffect = source.lastEffect;
          target.expirationTime = source.expirationTime;
          target.childExpirationTime = source.childExpirationTime;
          target.alternate = source.alternate;
          {
            target.actualDuration = source.actualDuration;
            target.actualStartTime = source.actualStartTime;
            target.selfBaseDuration = source.selfBaseDuration;
            target.treeBaseDuration = source.treeBaseDuration;
          }
          {
            target._debugID = source._debugID;
          }
          target._debugSource = source._debugSource;
          target._debugOwner = source._debugOwner;
          target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming;
          target._debugNeedsRemount = source._debugNeedsRemount;
          target._debugHookTypes = source._debugHookTypes;
          return target;
        }
        function FiberRootNode(containerInfo2, tag, hydrate) {
          this.tag = tag;
          this.current = null;
          this.containerInfo = containerInfo2;
          this.pendingChildren = null;
          this.pingCache = null;
          this.finishedExpirationTime = NoWork;
          this.finishedWork = null;
          this.timeoutHandle = noTimeout;
          this.context = null;
          this.pendingContext = null;
          this.hydrate = hydrate;
          this.callbackNode = null;
          this.callbackPriority = NoPriority;
          this.firstPendingTime = NoWork;
          this.firstSuspendedTime = NoWork;
          this.lastSuspendedTime = NoWork;
          this.nextKnownPendingLevel = NoWork;
          this.lastPingedTime = NoWork;
          this.lastExpiredTime = NoWork;
          {
            this.interactionThreadID = tracing.unstable_getThreadID();
            this.memoizedInteractions = /* @__PURE__ */ new Set();
            this.pendingInteractionMap = /* @__PURE__ */ new Map();
          }
        }
        function createFiberRoot(containerInfo2, tag, hydrate, hydrationCallbacks) {
          var root = new FiberRootNode(containerInfo2, tag, hydrate);
          var uninitializedFiber = createHostRootFiber(tag);
          root.current = uninitializedFiber;
          uninitializedFiber.stateNode = root;
          initializeUpdateQueue(uninitializedFiber);
          return root;
        }
        function isRootSuspendedAtTime(root, expirationTime) {
          var firstSuspendedTime = root.firstSuspendedTime;
          var lastSuspendedTime = root.lastSuspendedTime;
          return firstSuspendedTime !== NoWork && firstSuspendedTime >= expirationTime && lastSuspendedTime <= expirationTime;
        }
        function markRootSuspendedAtTime(root, expirationTime) {
          var firstSuspendedTime = root.firstSuspendedTime;
          var lastSuspendedTime = root.lastSuspendedTime;
          if (firstSuspendedTime < expirationTime) {
            root.firstSuspendedTime = expirationTime;
          }
          if (lastSuspendedTime > expirationTime || firstSuspendedTime === NoWork) {
            root.lastSuspendedTime = expirationTime;
          }
          if (expirationTime <= root.lastPingedTime) {
            root.lastPingedTime = NoWork;
          }
          if (expirationTime <= root.lastExpiredTime) {
            root.lastExpiredTime = NoWork;
          }
        }
        function markRootUpdatedAtTime(root, expirationTime) {
          var firstPendingTime = root.firstPendingTime;
          if (expirationTime > firstPendingTime) {
            root.firstPendingTime = expirationTime;
          }
          var firstSuspendedTime = root.firstSuspendedTime;
          if (firstSuspendedTime !== NoWork) {
            if (expirationTime >= firstSuspendedTime) {
              root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = NoWork;
            } else if (expirationTime >= root.lastSuspendedTime) {
              root.lastSuspendedTime = expirationTime + 1;
            }
            if (expirationTime > root.nextKnownPendingLevel) {
              root.nextKnownPendingLevel = expirationTime;
            }
          }
        }
        function markRootFinishedAtTime(root, finishedExpirationTime, remainingExpirationTime) {
          root.firstPendingTime = remainingExpirationTime;
          if (finishedExpirationTime <= root.lastSuspendedTime) {
            root.firstSuspendedTime = root.lastSuspendedTime = root.nextKnownPendingLevel = NoWork;
          } else if (finishedExpirationTime <= root.firstSuspendedTime) {
            root.firstSuspendedTime = finishedExpirationTime - 1;
          }
          if (finishedExpirationTime <= root.lastPingedTime) {
            root.lastPingedTime = NoWork;
          }
          if (finishedExpirationTime <= root.lastExpiredTime) {
            root.lastExpiredTime = NoWork;
          }
        }
        function markRootExpiredAtTime(root, expirationTime) {
          var lastExpiredTime = root.lastExpiredTime;
          if (lastExpiredTime === NoWork || lastExpiredTime > expirationTime) {
            root.lastExpiredTime = expirationTime;
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire("timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var didWarnAboutNestedUpdates;
        var didWarnAboutFindNodeInStrictMode;
        {
          didWarnAboutNestedUpdates = false;
          didWarnAboutFindNodeInStrictMode = {};
        }
        function getContextForSubtree(parentComponent) {
          if (!parentComponent) {
            return emptyContextObject;
          }
          var fiber = get(parentComponent);
          var parentContext = findCurrentUnmaskedContext(fiber);
          if (fiber.tag === ClassComponent) {
            var Component = fiber.type;
            if (isContextProvider(Component)) {
              return processChildContext(fiber, Component, parentContext);
            }
          }
          return parentContext;
        }
        function findHostInstance(component) {
          var fiber = get(component);
          if (fiber === void 0) {
            if (typeof component.render === "function") {
              {
                {
                  throw Error("Unable to find node on an unmounted component.");
                }
              }
            } else {
              {
                {
                  throw Error("Argument appears to not be a ReactComponent. Keys: " + Object.keys(component));
                }
              }
            }
          }
          var hostFiber = findCurrentHostFiber(fiber);
          if (hostFiber === null) {
            return null;
          }
          return hostFiber.stateNode;
        }
        function findHostInstanceWithWarning(component, methodName) {
          {
            var fiber = get(component);
            if (fiber === void 0) {
              if (typeof component.render === "function") {
                {
                  {
                    throw Error("Unable to find node on an unmounted component.");
                  }
                }
              } else {
                {
                  {
                    throw Error("Argument appears to not be a ReactComponent. Keys: " + Object.keys(component));
                  }
                }
              }
            }
            var hostFiber = findCurrentHostFiber(fiber);
            if (hostFiber === null) {
              return null;
            }
            if (hostFiber.mode & StrictMode) {
              var componentName = getComponentName(fiber.type) || "Component";
              if (!didWarnAboutFindNodeInStrictMode[componentName]) {
                didWarnAboutFindNodeInStrictMode[componentName] = true;
                if (fiber.mode & StrictMode) {
                  error("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node%s", methodName, methodName, componentName, getStackByFiberInDevAndProd(hostFiber));
                } else {
                  error("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node%s", methodName, methodName, componentName, getStackByFiberInDevAndProd(hostFiber));
                }
              }
            }
            return hostFiber.stateNode;
          }
        }
        function createContainer(containerInfo2, tag, hydrate, hydrationCallbacks) {
          return createFiberRoot(containerInfo2, tag, hydrate);
        }
        function updateContainer(element, container, parentComponent, callback) {
          {
            onScheduleRoot(container, element);
          }
          var current$1 = container.current;
          var currentTime = requestCurrentTimeForUpdate();
          {
            if (typeof jest !== "undefined") {
              warnIfUnmockedScheduler(current$1);
              warnIfNotScopedWithMatchingAct(current$1);
            }
          }
          var suspenseConfig = requestCurrentSuspenseConfig();
          var expirationTime = computeExpirationForFiber(currentTime, current$1, suspenseConfig);
          var context = getContextForSubtree(parentComponent);
          if (container.context === null) {
            container.context = context;
          } else {
            container.pendingContext = context;
          }
          {
            if (isRendering && current !== null && !didWarnAboutNestedUpdates) {
              didWarnAboutNestedUpdates = true;
              error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", getComponentName(current.type) || "Unknown");
            }
          }
          var update = createUpdate(expirationTime, suspenseConfig);
          update.payload = {
            element
          };
          callback = callback === void 0 ? null : callback;
          if (callback !== null) {
            {
              if (typeof callback !== "function") {
                error("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callback);
              }
            }
            update.callback = callback;
          }
          enqueueUpdate(current$1, update);
          scheduleWork(current$1, expirationTime);
          return expirationTime;
        }
        function getPublicRootInstance(container) {
          var containerFiber = container.current;
          if (!containerFiber.child) {
            return null;
          }
          switch (containerFiber.child.tag) {
            case HostComponent:
              return getPublicInstance(containerFiber.child.stateNode);
            default:
              return containerFiber.child.stateNode;
          }
        }
        function attemptSynchronousHydration(fiber) {
          switch (fiber.tag) {
            case HostRoot:
              var root = fiber.stateNode;
              if (root.hydrate) {
                flushRoot(root, root.firstPendingTime);
              }
              break;
            case SuspenseComponent:
              flushSync(function() {
                return scheduleWork(fiber, Sync);
              });
              var retryExpTime = computeInteractiveExpiration(requestCurrentTimeForUpdate());
              markRetryTimeIfNotHydrated(fiber, retryExpTime);
              break;
          }
        }
        function markRetryTimeImpl(fiber, retryTime) {
          var suspenseState = fiber.memoizedState;
          if (suspenseState !== null && suspenseState.dehydrated !== null) {
            if (suspenseState.retryTime < retryTime) {
              suspenseState.retryTime = retryTime;
            }
          }
        }
        function markRetryTimeIfNotHydrated(fiber, retryTime) {
          markRetryTimeImpl(fiber, retryTime);
          var alternate = fiber.alternate;
          if (alternate) {
            markRetryTimeImpl(alternate, retryTime);
          }
        }
        function attemptUserBlockingHydration(fiber) {
          if (fiber.tag !== SuspenseComponent) {
            return;
          }
          var expTime = computeInteractiveExpiration(requestCurrentTimeForUpdate());
          scheduleWork(fiber, expTime);
          markRetryTimeIfNotHydrated(fiber, expTime);
        }
        function attemptContinuousHydration(fiber) {
          if (fiber.tag !== SuspenseComponent) {
            return;
          }
          scheduleWork(fiber, ContinuousHydration);
          markRetryTimeIfNotHydrated(fiber, ContinuousHydration);
        }
        function attemptHydrationAtCurrentPriority(fiber) {
          if (fiber.tag !== SuspenseComponent) {
            return;
          }
          var currentTime = requestCurrentTimeForUpdate();
          var expTime = computeExpirationForFiber(currentTime, fiber, null);
          scheduleWork(fiber, expTime);
          markRetryTimeIfNotHydrated(fiber, expTime);
        }
        function findHostInstanceWithNoPortals(fiber) {
          var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
          if (hostFiber === null) {
            return null;
          }
          if (hostFiber.tag === FundamentalComponent) {
            return hostFiber.stateNode.instance;
          }
          return hostFiber.stateNode;
        }
        var shouldSuspendImpl = function(fiber) {
          return false;
        };
        function shouldSuspend(fiber) {
          return shouldSuspendImpl(fiber);
        }
        var overrideHookState = null;
        var overrideProps = null;
        var scheduleUpdate = null;
        var setSuspenseHandler = null;
        {
          var copyWithSetImpl = function(obj9, path4, idx, value) {
            if (idx >= path4.length) {
              return value;
            }
            var key = path4[idx];
            var updated = Array.isArray(obj9) ? obj9.slice() : _assign({}, obj9);
            updated[key] = copyWithSetImpl(obj9[key], path4, idx + 1, value);
            return updated;
          };
          var copyWithSet = function(obj9, path4, value) {
            return copyWithSetImpl(obj9, path4, 0, value);
          };
          overrideHookState = function(fiber, id2, path4, value) {
            var currentHook2 = fiber.memoizedState;
            while (currentHook2 !== null && id2 > 0) {
              currentHook2 = currentHook2.next;
              id2--;
            }
            if (currentHook2 !== null) {
              var newState = copyWithSet(currentHook2.memoizedState, path4, value);
              currentHook2.memoizedState = newState;
              currentHook2.baseState = newState;
              fiber.memoizedProps = _assign({}, fiber.memoizedProps);
              scheduleWork(fiber, Sync);
            }
          };
          overrideProps = function(fiber, path4, value) {
            fiber.pendingProps = copyWithSet(fiber.memoizedProps, path4, value);
            if (fiber.alternate) {
              fiber.alternate.pendingProps = fiber.pendingProps;
            }
            scheduleWork(fiber, Sync);
          };
          scheduleUpdate = function(fiber) {
            scheduleWork(fiber, Sync);
          };
          setSuspenseHandler = function(newShouldSuspendImpl) {
            shouldSuspendImpl = newShouldSuspendImpl;
          };
        }
        function injectIntoDevTools(devToolsConfig) {
          var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
          var ReactCurrentDispatcher2 = ReactSharedInternals.ReactCurrentDispatcher;
          return injectInternals(_assign({}, devToolsConfig, {
            overrideHookState,
            overrideProps,
            setSuspenseHandler,
            scheduleUpdate,
            currentDispatcherRef: ReactCurrentDispatcher2,
            findHostInstanceByFiber: function(fiber) {
              var hostFiber = findCurrentHostFiber(fiber);
              if (hostFiber === null) {
                return null;
              }
              return hostFiber.stateNode;
            },
            findFiberByHostInstance: function(instance) {
              if (!findFiberByHostInstance) {
                return null;
              }
              return findFiberByHostInstance(instance);
            },
            findHostInstancesForRefresh,
            scheduleRefresh,
            scheduleRoot,
            setRefreshHandler,
            getCurrentFiber: function() {
              return current;
            }
          }));
        }
        var IsSomeRendererActing$1 = ReactSharedInternals.IsSomeRendererActing;
        var isSchedulerMocked = typeof Scheduler.unstable_flushAllWithoutAsserting === "function";
        var flushWork = Scheduler.unstable_flushAllWithoutAsserting || function() {
          var didFlushWork = false;
          while (flushPassiveEffects()) {
            didFlushWork = true;
          }
          return didFlushWork;
        };
        function flushWorkAndMicroTasks(onDone) {
          try {
            flushWork();
            enqueueTask(function() {
              if (flushWork()) {
                flushWorkAndMicroTasks(onDone);
              } else {
                onDone();
              }
            });
          } catch (err) {
            onDone(err);
          }
        }
        var actingUpdatesScopeDepth = 0;
        function act(callback) {
          var previousActingUpdatesScopeDepth = actingUpdatesScopeDepth;
          var previousIsSomeRendererActing;
          var previousIsThisRendererActing;
          actingUpdatesScopeDepth++;
          previousIsSomeRendererActing = IsSomeRendererActing$1.current;
          previousIsThisRendererActing = IsThisRendererActing.current;
          IsSomeRendererActing$1.current = true;
          IsThisRendererActing.current = true;
          function onDone() {
            actingUpdatesScopeDepth--;
            IsSomeRendererActing$1.current = previousIsSomeRendererActing;
            IsThisRendererActing.current = previousIsThisRendererActing;
            {
              if (actingUpdatesScopeDepth > previousActingUpdatesScopeDepth) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
            }
          }
          var result;
          try {
            result = batchedUpdates(callback);
          } catch (error2) {
            onDone();
            throw error2;
          }
          if (result !== null && typeof result === "object" && typeof result.then === "function") {
            var called = false;
            {
              if (typeof Promise !== "undefined") {
                Promise.resolve().then(function() {
                }).then(function() {
                  if (called === false) {
                    error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                  }
                });
              }
            }
            return {
              then: function(resolve, reject) {
                called = true;
                result.then(function() {
                  if (actingUpdatesScopeDepth > 1 || isSchedulerMocked === true && previousIsSomeRendererActing === true) {
                    onDone();
                    resolve();
                    return;
                  }
                  flushWorkAndMicroTasks(function(err) {
                    onDone();
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                }, function(err) {
                  onDone();
                  reject(err);
                });
              }
            };
          } else {
            {
              if (result !== void 0) {
                error("The callback passed to act(...) function must return undefined, or a Promise. You returned %s", result);
              }
            }
            try {
              if (actingUpdatesScopeDepth === 1 && (isSchedulerMocked === false || previousIsSomeRendererActing === false)) {
                flushWork();
              }
              onDone();
            } catch (err) {
              onDone();
              throw err;
            }
            return {
              then: function(resolve) {
                {
                  error("Do not await the result of calling act(...) with sync logic, it is not a Promise.");
                }
                resolve();
              }
            };
          }
        }
        var ReactFiberReconciler = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          createContainer,
          updateContainer,
          batchedEventUpdates,
          batchedUpdates,
          unbatchedUpdates,
          deferredUpdates,
          syncUpdates,
          discreteUpdates,
          flushDiscreteUpdates,
          flushControlled,
          flushSync,
          flushPassiveEffects,
          IsThisRendererActing,
          getPublicRootInstance,
          attemptSynchronousHydration,
          attemptUserBlockingHydration,
          attemptContinuousHydration,
          attemptHydrationAtCurrentPriority,
          findHostInstance,
          findHostInstanceWithWarning,
          findHostInstanceWithNoPortals,
          shouldSuspend,
          injectIntoDevTools,
          act
        });
        function getCjsExportFromNamespace(n) {
          return n && n["default"] || n;
        }
        var ReactFiberReconciler$1 = getCjsExportFromNamespace(ReactFiberReconciler);
        var reactReconciler = ReactFiberReconciler$1.default || ReactFiberReconciler$1;
        module.exports = reactReconciler;
        var $$$renderer = module.exports;
        module.exports = $$$reconciler;
        return $$$renderer;
      };
    }
  }
});

// node_modules/react-reconciler/index.js
var require_react_reconciler = __commonJS({
  "node_modules/react-reconciler/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_reconciler_production_min();
    } else {
      module.exports = require_react_reconciler_development();
    }
  }
});

// src/render/react/index.js
var react = __toESM(require_react());

// src/render/react/core/reconciler/index.js
var import_react_reconciler = __toESM(require_react_reconciler());
var id = 1;
var getUid = () => {
  return String(id++);
};
var instanceMap = /* @__PURE__ */ new Map();
var getInstance = (uid) => {
  return instanceMap[uid];
};
var HostConfig = {
  now: Date.now,
  getPublicInstance: (instance) => {
    return instance;
  },
  getRootHostContext: () => {
    let context = {
      name: "rootnode"
    };
    return context;
  },
  prepareForCommit: () => {
  },
  resetAfterCommit: () => {
  },
  getChildHostContext: () => {
    return {};
  },
  shouldSetTextContent: function(type, props) {
    return false;
    return typeof props.children === "string" || typeof props.children === "number";
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    const { createInstance } = getComponentByTagName(type);
    const uid = getUid();
    const instance = createInstance(newProps, rootContainerInstance, _currentHostContext, workInProgress, uid);
    instanceMap[uid] = instance;
    return instance;
  },
  createTextInstance: (text, rootContainerInstance, context, workInProgress) => {
    return null;
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (yueElement, type, props) => {
    return true;
  },
  insertBefore: (parent, child, beforeChild) => {
    parent.insertBefore(child, beforeChild);
  },
  supportsMutation: true,
  appendChildToContainer: function(container, child) {
    container.add(child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.add(child);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
    if (child.close) {
      child.close();
    }
  },
  prepareUpdate(instance, oldProps, newProps) {
    return true;
  },
  commitUpdate: function(instance, updatePayload, type, oldProps, newProps, finishedWork) {
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork);
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.setText(newText);
  },
  removeChild(parent, child) {
    parent?.removeChild(child);
    child?.close();
    unRegistEvent(child.uid);
    delete instanceMap[child.uid];
  },
  commitMount: function(instance, type, newProps, internalInstanceHandle) {
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  }
};
var reconciler_default = (0, import_react_reconciler.default)(HostConfig);

// src/render/react/core/event/index.js
var eventMap = {};
var EVENTTYPE_MAP = {
  EVENT_ALL: 0,
  EVENT_PRESSED: 1,
  EVENT_PRESSING: 2,
  EVENT_PRESS_LOST: 3,
  EVENT_SHORT_CLICKED: 4,
  EVENT_LONG_PRESSED: 5,
  EVENT_LONG_PRESSED_REPEAT: 6,
  EVENT_CLICKED: 7,
  EVENT_RELEASED: 8,
  EVENT_SCROLL_BEGIN: 9,
  EVENT_SCROLL_END: 10,
  EVENT_SCROLL: 11,
  EVENT_GESTURE: 12,
  EVENT_KEY: 13,
  EVENT_FOCUSED: 14,
  EVENT_DEFOCUSED: 15,
  EVENT_LEAVE: 16,
  EVENT_HIT_TEST: 17,
  EVENT_COVER_CHECK: 18,
  EVENT_REFR_EXT_DRAW_SIZE: 19,
  EVENT_DRAW_MAIN_BEGIN: 20,
  EVENT_DRAW_MAIN: 21,
  EVENT_DRAW_MAIN_END: 22,
  EVENT_DRAW_POST_BEGIN: 23,
  EVENT_DRAW_POST: 24,
  EVENT_DRAW_POST_END: 25,
  EVENT_DRAW_PART_BEGIN: 26,
  EVENT_DRAW_PART_END: 27,
  EVENT_VALUE_CHANGED: 28,
  EVENT_INSERT: 29,
  EVENT_REFRESH: 30,
  EVENT_READY: 31,
  EVENT_CANCEL: 32,
  EVENT_DELETE: 33,
  EVENT_CHILD_CHANGED: 33,
  EVENT_CHILD_CREATED: 34,
  EVENT_CHILD_DELETED: 35,
  EVENT_SCREEN_UNLOAD_START: 36,
  EVENT_SCREEN_LOAD_START: 37,
  EVENT_SCREEN_LOADED: 38,
  EVENT_SCREEN_UNLOADED: 39,
  EVENT_SIZE_CHANGED: 40,
  EVENT_STYLE_CHANGED: 41,
  EVENT_LAYOUT_CHANGED: 42,
  EVENT_GET_SELF_SIZE: 43,
  _EVENT_LAST: 44,
  EVENT_PREPROCESS: 128
};
function registEvent(uid, eventType, fn) {
  eventMap[uid] = eventMap[uid] || {};
  eventMap[uid][eventType] = fn;
}
function unRegistEvent(uid, eventType) {
  if (!eventType) {
    delete eventMap[uid];
  } else {
    const obj9 = eventMap[uid];
    obj9 && delete obj9[eventType];
  }
}
function fireEvent(targetUid, currentTargetUid, eventType, e) {
  const obj9 = eventMap[currentTargetUid];
  const target = getInstance(targetUid);
  const currentTarget = getInstance(currentTargetUid);
  if (obj9) {
    e.target = target;
    e.currentTarget = currentTarget;
    try {
      obj9[eventType].call(null, e);
    } catch (err) {
      console.log(err);
    }
  }
}
function handleEvent(comp, fn, type) {
  if (fn) {
    registEvent(comp.uid, type, fn);
    comp.addEventListener(type);
  } else {
    unRegistEvent(comp.uid, type);
    comp.removeEventListener(type);
  }
}
globalThis.FIRE_QEVENT_CALLBACK = fireEvent;

// src/render/react/core/style/color.js
var builtinColor = {
  "red": 16007990,
  "pink": 15277667,
  "purple": 10233776,
  "deep-purple": 6765239,
  "indigo": 4149685,
  "blue": 2201331,
  "light-blue": 240116,
  "cyan": 48340,
  "teal": 38536,
  "green": 5025616,
  "light-green": 9159498,
  "lime": 13491257,
  "yellow": 16771899,
  "amber": 16761095,
  "orange": 16750592,
  "deep-orange": 16733986,
  "brown": 7951688,
  "blue-grey": 6323595,
  "grey": 10395294,
  "white": 16777215,
  "black": 0
};
var colorTransform = (data) => {
  if (builtinColor[data]) {
    return builtinColor[data];
  }
  data = data.replace(/(^\s*)|(\s*$)/g, "");
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(data)) {
    const aColor = data.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let num = "0x";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      num += hex;
    }
    if (num.length !== 8) {
      num = "";
    }
    return num;
  } else if (reg.test(data)) {
    const aNum = data.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return Number(`0x${data.substring(1)}`);
    } else if (aNum.length === 3) {
      let num = "0x";
      for (let i = 0; i < aNum.length; i += 1) {
        num += aNum[i] + aNum[i];
      }
      return Number(num);
    }
  }
  return "";
};

// src/render/react/core/style/util.js
function NormalizePx(value) {
  if (value == void 0)
    return null;
  if (!isNaN(value)) {
    return value;
  }
  value = value.replace(/(^\s*)|(\s*$)/g, "");
  const reg = /(\d+\.?\d*)(px)?$/;
  value = value.match(reg)?.[1];
  if (!isNaN(value)) {
    return value;
  }
  return null;
}
function ProcessPx(key, value, result) {
  value = NormalizePx(value);
  if (value !== null) {
    result[key] = value;
  }
}
function ProcessPxOrPercent(key, value, result) {
  if (value === "auto") {
    return result[key] = 2001 | 1 << 13;
  }
  if (!isNaN(value)) {
    return result[key] = value;
  }
  value = value.replace(/(^\s*)|(\s*$)/g, "");
  const reg1 = /(\d+\.?\d*)(%)?$/;
  const reg2 = /(\d+\.?\d*)(px)?$/;
  const value2 = value.match(reg2)?.[1];
  if (!isNaN(value2)) {
    return result[key] = value2;
  }
  const value1 = value.match(reg1)?.[1];
  if (!isNaN(value1)) {
    return result[`${key}_pct`] = value1;
  }
}
function ProcessEnum(obj9) {
  return (key, value, result) => {
    if (obj9[value] !== void 0) {
      result[key] = obj9[value];
    }
  };
}
function ProcessColor(key, value, result) {
  value = colorTransform(value);
  if (!isNaN(value)) {
    result[key] = value;
  }
}
function NormalizeTime(value) {
  if (!value)
    return null;
  if (!isNaN(value))
    return value;
  const reg = /([^ms]+)(ms|s)/;
  const [_, time, unit] = value.match(reg);
  if (!isNaN(time)) {
    if (unit == "s") {
      return time * 1e3;
    } else if (unit == "ms") {
      return time;
    }
  }
  return null;
}
function ProcessScale(key, value, result) {
  if (!value && isNaN(value))
    return null;
  result[key] = Math.floor(value * 256);
}
function ProcessDeg(key, value, result) {
  const reg = /([^deg]+)(deg)?/;
  const [_, deg] = value.match(reg);
  if (isNaN(deg))
    return;
  result[key] = +deg;
}
function ProcessBoolean(key, value, result) {
  result[key] = !!value;
}

// src/render/react/core/style/pipe/misc.js
function MiscStyle(style2, result, compName) {
  if (style2["recolor"] && compName === "Image") {
    ProcessColor("recolor", style2["recolor"], result);
  }
  if (style2["style-transition-time"]) {
    const value = style2["style-transition-time"];
    if (!isNaN(value)) {
      result["style-transition-time"] = value;
    }
  }
  return result;
}

// src/render/react/core/style/pipe/trans.js
var LV_STYLE_PROP_LAYOUT_REFR = 1 << 12;
var LV_STYLE_PROP_EXT_DRAW = 1 << 11;
var LV_STYLE_PROP_PARENT_LAYOUT_REFR = 1 << 13;
var LV_STYLE_PROP_FILTER = 1 << 14;
var LV_STYLE_PROP_INHERIT = 1 << 10;
var transitionProperty = {
  "width": 1,
  "min-width": 2,
  "max-width": 3,
  "height": 4,
  "min-height": 5,
  "max-height": 6,
  "left": 7,
  "top": 8,
  "align": 9,
  "display": 10,
  "radius": 11,
  "padding-top": 16,
  "padding-bottom": 17,
  "padding-left": 18,
  "padding-right": 19,
  "padding-row": 20,
  "padding-column": 21,
  "base-dir": 22,
  "clip-corner": 23,
  "background-color": 32,
  "background-opacity": 33,
  "background-grad-color": 34,
  "background-grad-dir": 35,
  "background-main-stop": 36,
  "background-grad-stop": 37,
  "background-grad": 38,
  "background-dither-mode": 39,
  "background-image": 40,
  "background-image-opacity": 41,
  "background-image-recolor": 42,
  "background-image-recolor-opacity": 43,
  "background-image-tiled": 44,
  "border-color": 48,
  "border-opacity": 49,
  "border-width": 50,
  "border-side": 51,
  "boder-post": 52,
  "outline-width": 53,
  "outline-color": 54,
  "outline-opacity": 55,
  "outline-padding": 56,
  "shadow-width": 64,
  "shadow-ofs-x": 65,
  "shadow-ofs-y": 66,
  "shadow-spread": 67,
  "shadow-color": 68,
  "shadow-opacity": 69,
  "img-opacity": 70,
  "img-recolor": 71,
  "img-recolor-opacity": 72,
  "line-width": 73,
  "line-dash-width": 74,
  "line-dash-gap": 75,
  "line-rounded": 76,
  "line-color": 77,
  "line-opacity": 78,
  "arc-width": 80,
  "arc-rounded": 81,
  "arc-color": 82,
  "arc-opacity": 83,
  "arc-image": 84,
  "text-color": 85,
  "text-opacity": 86,
  "font-size": 87,
  "letter-spacing": 88,
  "line-height": 89,
  "text-decor": 90,
  "text-align": 91,
  "opacity": 96,
  "color-filter-dsc": 97,
  "color-filter-opacity": 98,
  "animate": 99,
  "animate-time": 100,
  "animate-speed": 101,
  "transition": 102,
  "blend-mode": 103,
  "transform-width": 104,
  "transform-height": 105,
  "translate-x": 106,
  "translate-y": 107,
  "transform-scale": 108,
  "transform-rotate": 109,
  "transform-pivot-x": 110,
  "transform-pivot-y": 111
};
var transformSupportKeys = ["translate", "translate-x", "translate-y", "scale", "rotate", "transform-width", "transform-height"];
function TransStyle(style2, result, compName) {
  if (style2["transition"]) {
    let value = style2["transition"];
    const transProps = [];
    value = value.split(",").filter((item) => !!item).map((item) => item.split(/\s/)).map((item) => item.filter((a) => !!a));
    value.forEach((item) => {
      let [property2, duration2, func2 = "linear", delay2 = 0] = item;
      if (property2 && NormalizeTime(duration2) != null && transitionProperty[property2]) {
        transProps.push(transitionProperty[property2]);
      }
    });
    let [property, duration, func = "linear", delay = 0] = value[0];
    const trans = [transProps.length, transProps, NormalizeTime(duration), func, delay];
    result["transition"] = trans;
  }
  if (style2["transform"]) {
    let value = style2["transform"];
    value = value.match(/[a-zA-Z\-]+\([^\(]+\)/g);
    const reg = /^([a-zA-Z\-]+)\((.+)\)$/;
    value && value.forEach((item) => {
      let [_, prop, val] = item.match(reg);
      if (transformSupportKeys.includes(prop) && val) {
        if (prop == "translate") {
          val = val.split(",");
          ProcessPx("translateX", val[0], result);
          ProcessPx("translateY", val[1], result);
        } else if (prop == "scale") {
          if (compName === "Image") {
            prop = `img-${prop}`;
          }
          ProcessScale(prop, val, result);
        } else if (prop == "rotate") {
          if (compName === "Image") {
            prop = `img-${prop}`;
          }
          ProcessDeg(prop, val, result);
        } else {
          if (compName === "Image") {
            prop = `img-${prop}`;
          }
          ProcessPx(prop, val, result);
        }
      }
    });
  }
  if (style2["transform-origin"] && compName === "Image") {
    const [x, y] = style2["transform-origin"].trim()?.split(" ");
    result["img-origin"] = [NormalizePx(+x), NormalizePx(+y)];
  }
  return result;
}

// src/render/react/core/style/pipe/padding.js
var keys = ["padding-left", "padding-top", "padding-right", "padding-bottom"];
function PaddingStyle(style2, result, compName) {
  keys.forEach((key) => {
    if (style2[key] !== void 0) {
      ProcessPx(key, style2[key], result);
    }
  });
  if (style2["padding"] !== void 0) {
    const value = style2["padding"];
    if (typeof value == "number") {
      keys.forEach((styleKey) => {
        result[styleKey] = value;
      });
    } else if (typeof value == "string") {
      const values = value.split(/\s/).filter(Boolean);
      const len = values.length;
      switch (len) {
        case 1:
          ProcessPx(keys[0], values[0], result);
          ProcessPx(keys[2], values[0], result);
          ProcessPx(keys[1], values[0], result);
          ProcessPx(keys[3], values[0], result);
          break;
        case 2:
          ProcessPx(keys[0], values[1], result);
          ProcessPx(keys[2], values[1], result);
          ProcessPx(keys[1], values[0], result);
          ProcessPx(keys[3], values[0], result);
          break;
        case 4:
          ProcessPx(keys[1], values[0], result);
          ProcessPx(keys[2], values[1], result);
          ProcessPx(keys[3], values[2], result);
          ProcessPx(keys[0], values[3], result);
          break;
        case 3:
          ProcessPx(keys[1], values[0], result);
          ProcessPx(keys[0], values[1], result);
          ProcessPx(keys[2], values[1], result);
          ProcessPx(keys[3], values[2], result);
          break;
      }
    }
  }
  return result;
}

// src/render/react/core/style/pipe/background.js
var obj = {
  "background-color": ProcessColor,
  "background-grad-color": ProcessColor,
  "background-grad-color-dir": ProcessEnum({
    "none": 0,
    "vertical": 1,
    "horizontal": 2
  })
};
var keys2 = Object.keys(obj);
function BackgroundStyle(style2, result, compName) {
  keys2.forEach((key) => {
    if (style2[key] !== void 0) {
      obj[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/pos.js
var obj2 = {
  "height": ProcessPxOrPercent,
  "width": ProcessPxOrPercent,
  "left": ProcessPxOrPercent,
  "top": ProcessPxOrPercent,
  "row-spacing": ProcessPx,
  "column-spacing": ProcessPx,
  "position": ProcessEnum({
    "absolute": "absolute"
  })
};
var keys3 = Object.keys(obj2);
function PosStyle(style2, result, compName) {
  keys3.forEach((key) => {
    if (style2[key] !== void 0) {
      obj2[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/border.js
var obj3 = {
  "border-radius": ProcessPx,
  "border-width": ProcessPx,
  "border-color": ProcessColor,
  "border-side": ProcessEnum({
    "left": 4,
    "right": 8,
    "full": 15,
    "top": 2,
    "bottom": 1,
    "top-right": 2 | 8,
    "top-bottom": 2 | 1,
    "top-left": 2 | 4,
    "right-bottom": 8 | 1,
    "right-left": 8 | 4,
    "bottom-left": 1 | 4
  })
};
var keys4 = Object.keys(obj3);
function BorderStyle(style2, result, compName) {
  keys4.forEach((key) => {
    if (style2[key] !== void 0) {
      obj3[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/outline.js
var obj4 = {
  "outline-width": ProcessPx,
  "outline-color": ProcessColor,
  "outline-padding": ProcessPxOrPercent
};
var keys5 = Object.keys(obj4);
function OutlineStyle(style2, result, compName) {
  keys5.forEach((key) => {
    if (style2[key] !== void 0) {
      obj4[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/text.js
var builtInFontList = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48];
var obj5 = {
  "text-color": ProcessColor,
  "letter-spacing": ProcessPx,
  "line-spacing": ProcessPx,
  "text-overflow": ProcessEnum({
    "ellipsis": 1,
    "clip": 4,
    "auto": 0,
    "scroll": 2,
    "circular": 3
  }),
  "text-align": ProcessEnum({
    "auto": 0,
    "left": 1,
    "center": 2,
    "right": 3
  }),
  "text-decoration": ProcessEnum({
    "none": 0,
    "underline": 1,
    "strikethrough": 2
  }),
  "font-size": ProcessPx
};
var keys6 = Object.keys(obj5);
function TextStyle(style2, result, compName) {
  keys6.forEach((key) => {
    if (style2[key] !== void 0) {
      obj5[key](key, style2[key], result);
    }
  });
  if (style2["font-size"]) {
    let size = style2["font-size"];
    if (typeof size == "string") {
      const reg = /(\d+\.?\d*)(px)?$/;
      size = size.replace(/(^\s*)|(\s*$)/g, "").match(reg)?.[1];
    }
    if (isNaN(size))
      return result;
    if (size % 2 == 1) {
      size += 1;
    }
    size = Math.min(builtInFontList[builtInFontList.length - 1], Math.max(builtInFontList[0], size));
    if (compName === "Text") {
      result["font-size"] = builtInFontList.indexOf(size);
    } else {
      result["font-size-1"] = builtInFontList.indexOf(size);
    }
  }
}

// src/render/react/core/style/pipe/flex.js
var flexFlowObj = {
  "row_nowrap": 0,
  "column_nowrap": 1 << 0,
  "row_wrap": 0 | 1 << 2,
  "column_wrap": 1 << 0 | 1 << 2,
  "row_wrap-reverse": 0 | 1 << 2 | 1 << 3,
  "column_wrap-reverse": 1 << 0 | 1 << 2 | 1 << 3,
  "row_reverse": 0 | 1 << 3,
  "column_reverse": 0 | 1 << 3
};
var flexAlignObj = {
  "flex-start": 0,
  "flex-end": 1,
  "center": 2,
  "space-evenly": 3,
  "space-around": 4,
  "space-between": 5
};
function FlexStyle(style2, result) {
  if (style2.display !== "flex")
    return result;
  let flexFlow = 0;
  const flexDirection = style2["flex-direction"] || "row";
  const flexWrap = style2["flex-wrap"] || "nowrap";
  if (flexFlowObj[`${flexDirection}_${flexWrap}`]) {
    flexFlow = flexFlowObj[`${flexDirection}_${flexWrap}`];
  }
  result["flex-flow"] = flexFlow;
  let mainPlace = 0;
  let crossPlace = 0;
  let trackCrossPlace = 0;
  const justifyContent = style2["justify-content"];
  const alignItems = style2["align-items"];
  const alignContent = style2["align-content"] || (flexWrap === "nowrap" ? alignItems : "flex-start");
  if (flexAlignObj[justifyContent]) {
    mainPlace = flexAlignObj[justifyContent];
  }
  if (flexAlignObj[alignItems]) {
    crossPlace = flexAlignObj[alignItems];
  }
  trackCrossPlace = alignContent ? flexAlignObj[alignContent] : crossPlace;
  if (justifyContent) {
    result["justify-content"] = mainPlace;
  }
  if (alignItems) {
    result["align-items"] = crossPlace;
  }
  if (alignContent) {
    result["align-content"] = trackCrossPlace;
  }
  if (!isNaN(style2["flex-grow"])) {
    result["flex-grow"] = style2["flex-grow"];
  }
  return result;
}

// src/render/react/core/style/pipe/grid.js
var GRID_SIZE_MAX = (1 << 13) - 1 - 101;
var FR_REG = /([\d]+)fr$/;
var gridChildJustifySelfObj = {
  "start": 0,
  "end": 2,
  "center": 1,
  "stretch": 3
};
var gridChildAlignSelfObj = {
  "start": 0,
  "end": 2,
  "center": 1,
  "stretch": 3
};
var gridJustifyContentObj = {
  "start": 0,
  "end": 2,
  "center": 1,
  "space-evenly": 4,
  "space-around": 5,
  "space-between": 6,
  "stretch": 3
};
var gridAlignItemsObj = {
  "start": 0,
  "end": 2,
  "center": 1,
  "space-evenly": 4,
  "space-around": 5,
  "space-between": 6,
  "stretch": 3
};
function GridStyle(style2, result) {
  if (style2.display == "grid") {
    let columns = style2["grid-template-columns"]?.split(/\s/).filter(Boolean);
    let rows = style2["grid-template-rows"]?.split(/\s/).filter(Boolean);
    if (!columns || !rows)
      return;
    columns = columns.map((column) => {
      if (column === "auto") {
        return GRID_SIZE_MAX;
      }
      const arr2 = column?.match(FR_REG);
      if (!isNaN(arr2?.[1])) {
        return (1 << 13) - 1 - 100 + arr2[1];
      }
      return NormalizePx(column);
    });
    rows = rows.map((row) => {
      if (row === "auto") {
        return GRID_SIZE_MAX;
      }
      const arr2 = row?.match(FR_REG);
      if (!isNaN(arr2?.[1])) {
        return (1 << 13) - 1 - 100 + arr2[1];
      }
      return NormalizePx(row);
    });
    columns = columns.filter(Boolean);
    rows = rows.filter(Boolean);
    result["display"] = "grid";
    result["grid-template"] = [columns, rows];
    const justifyContent = gridJustifyContentObj[style2["justify-content"]] || gridJustifyContentObj.start;
    const alignContent = gridAlignItemsObj[style2["align-content"]] || gridAlignItemsObj.start;
    result["grid-align"] = [justifyContent, alignContent];
  }
  if (style2["grid-child"]) {
    const justifySelf = style2["justify-self"];
    const alignSelf = style2["align-self"];
    const gridColumnPos = style2["grid-column-pos"];
    const gridRowPos = style2["grid-row-pos"];
    const gridColumnSpan = style2["grid-column-span"] || 1;
    const gridRowSpan = style2["grid-row-span"] || 1;
    if (isNaN(gridColumnPos + gridColumnSpan + gridRowPos + gridRowSpan))
      return;
    let column_align, row_align;
    row_align = gridChildJustifySelfObj[justifySelf] || gridChildJustifySelfObj.start;
    column_align = gridChildAlignSelfObj[alignSelf] || gridChildAlignSelfObj.start;
    result["grid-child"] = [column_align, gridColumnPos, gridColumnSpan, row_align, gridRowPos, gridRowSpan];
  }
}

// src/render/react/core/style/pipe/scoll.js
var obj6 = {
  "overflow": ProcessEnum({
    "hidden": 1,
    "scroll": 0,
    "auto": 0
  }),
  "overflow-scrolling": ProcessEnum({
    "auto": 0,
    "touch": 1
  }),
  "scroll-dir": ProcessEnum({
    "none": 0,
    "left": 1 << 0,
    "right": 1 << 1,
    "top": 1 << 2,
    "bottom": 1 << 3,
    "horizontal": 1 << 0 | 1 << 1,
    "vertical": 1 << 2 | 1 << 3,
    "all": 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3
  }),
  "scroll-snap-x": ProcessEnum({
    "none": 0,
    "snap_start": 1,
    "snap_end": 2,
    "snap_center": 3
  }),
  "scroll-snap-y": ProcessEnum({
    "none": 0,
    "snap_start": 1,
    "snap_end": 2,
    "snap_center": 3
  }),
  "scroll-enable-snap": ProcessBoolean
};
var keys7 = Object.keys(obj6);
function ScrollStyle(style2, result, compName) {
  keys7.forEach((key) => {
    if (style2[key] !== void 0) {
      obj6[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/opacity.js
function NormalizeOpacity(value) {
  if (isNaN(value) || value > 1)
    return 255;
  if (value < 0)
    return 0;
  return Math.floor(value * 255);
}
function OpacityStyle(style2, result, compName) {
  if (style2["opacity"]) {
    if (compName === "Image") {
      result["img-opacity"] = NormalizeOpacity(style2["opacity"]);
    } else {
      result["opacity"] = NormalizeOpacity(style2["opacity"]);
    }
  }
  if (style2["background-opacity"]) {
    result["background-opacity"] = NormalizeOpacity(style2["background-opacity"]);
  }
  if (style2["border-opacity"]) {
    result["border-opacity"] = NormalizeOpacity(style2["border-opacity"]);
  }
  if (style2["outline-opacity"]) {
    result["outline-opacity"] = NormalizeOpacity(style2["outline-opacity"]);
  }
  if (style2["recolor-opacity"] && compName === "Image") {
    result["recolor-opacity"] = NormalizeOpacity(style2["recolor-opacity"]);
  }
  if (style2["shadow-opacity"]) {
    result["shadow-opacity"] = NormalizeOpacity(style2["shadow-opacity"]);
  }
  return result;
}

// src/render/react/core/style/pipe/line.js
var obj7 = {
  "line-width": ProcessPx,
  "line-color": ProcessColor
};
var keys8 = Object.keys(obj7);
function LineStyle(style2, result, compName) {
  keys8.forEach((key) => {
    if (style2[key] !== void 0) {
      obj7[key](key, style2[key], result);
    }
  });
  if (style2["line-rounded"]) {
    result["line-rounded"] = Boolean(style2["line-rounded"]);
  }
}

// src/render/react/core/style/pipe/shadow.js
var obj8 = {
  "shadow-width": ProcessPx,
  "shadow-color": ProcessColor,
  "shadow-offset-x": ProcessPx,
  "shadow-offset-y": ProcessPx,
  "shadow-spread": ProcessPx
};
var keys9 = Object.keys(obj8);
function ShadowStyle(style2, result, compName) {
  keys9.forEach((key) => {
    if (style2[key] !== void 0) {
      obj8[key](key, style2[key], result);
    }
  });
}

// src/render/react/core/style/pipe/display.js
function DisplayStyle(style2, result, compName) {
  result["display"] = style2["display"];
}

// src/render/react/utils/helpers.ts
function isValidUrl(str) {
  if (!str)
    return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

// src/render/react/core/style/symbol.js
var BUILT_IN_SYMBOL = {
  "audio": "\uF001",
  "video": "\uF008",
  "list": "\uF00B",
  "ok": "0xF00C",
  "close": "0xF00D",
  "power": "0xF011",
  "settings": "0xF013",
  "home": "0xF015",
  "download": "0xF019",
  "drive": "0xF01C",
  "refresh": "0xF021",
  "mute": "",
  "volume_mid": "",
  "volume_max": "",
  "image": "",
  "tint": "",
  "prev": "",
  "play": "",
  "pause": "",
  "stop": "",
  "next": "",
  "eject": "",
  "left": "",
  "right": "",
  "plus": "\uF067",
  "minus": "",
  "eye_open": "",
  "eye_close": "",
  "warning": "",
  "shuffle": "",
  "up": "",
  "down": "",
  "loop": "",
  "directory": "",
  "upload": "",
  "call": "",
  "cut": "",
  "copy": "",
  "save": "",
  "bars": "",
  "envelope": "",
  "charge": "",
  "paste": "",
  "bell": "",
  "keyboard": "",
  "gps": "",
  "file": "",
  "wifi": "",
  "battery_full": "",
  "battery_3": "",
  "battery_2": "",
  "battery_1": "",
  "battery_empty": "",
  "usb": "",
  "bluetooth": "",
  "trash": "",
  "edit": "",
  "backspace": "",
  "sd_card": "",
  "new_line": "",
  "dummy": ""
};

// src/render/react/core/style/post.js
var path = __require("path");
var fs = __require("fs");
async function getImageBinary(url) {
  const resp = await fetch(url, {});
  const imageBuffer = await resp.arrayBuffer();
  return imageBuffer;
}
function PostProcessStyle({ comp, styleSheet, styleType }) {
  if (styleSheet["background-image"] !== void 0) {
    let url = styleSheet["background-image"];
    if (BUILT_IN_SYMBOL[url]) {
      comp.setBackgroundImage(null, styleType, BUILT_IN_SYMBOL[url]);
      return;
    }
    if (url === null) {
      comp.setBackgroundImage(null, styleType);
    } else if (!isValidUrl(url)) {
      if (!path.isAbsolute(url)) {
        url = path.resolve(__dirname, url);
      }
      fs.readFile(url, { encoding: "binary" }).then((data) => {
        comp.setBackgroundImage(data.buffer, styleType);
      }).catch((e) => {
        console.log("setBackground error", e);
      });
    } else {
      getImageBinary(url).then((buffer) => comp.setBackgroundImage(Buffer.from(buffer).buffer), styleType).catch(console.warn);
    }
  }
}

// src/render/react/core/style/index.js
var _StyleSheet = class {
  static pipeline(args) {
    _StyleSheet.transformStyle = (style2, compName) => {
      const result = {};
      args.reduce((_, func) => func(style2, result, compName), null);
      return result;
    };
  }
  static transform(style2, compName) {
    const result = _StyleSheet.transformStyle(style2, compName);
    return result;
  }
  static create() {
    return new Proxy({ __dirty: true }, {
      set(obj9, prop, value) {
        if (prop !== "__dirty") {
          obj9[prop] = value;
          obj9.__dirty = true;
        } else {
          obj9.__dirty = value;
        }
      }
    });
  }
};
var StyleSheet = _StyleSheet;
__publicField(StyleSheet, "transformStyle");
StyleSheet.pipeline([
  FlexStyle,
  GridStyle,
  TextStyle,
  OutlineStyle,
  BorderStyle,
  PosStyle,
  BackgroundStyle,
  PaddingStyle,
  ScrollStyle,
  OpacityStyle,
  MiscStyle,
  TransStyle,
  LineStyle,
  ShadowStyle,
  DisplayStyle
]);
function setStyle({ comp, styleSheet, compName, styleType, oldStyleSheet, isInit = true, defaultStyle = {} } = {}) {
  if (!styleSheet)
    return;
  styleSheet = Array.isArray(styleSheet) ? styleSheet : [styleSheet];
  oldStyleSheet = Array.isArray(oldStyleSheet) ? oldStyleSheet : [oldStyleSheet];
  const maybeChange = styleSheet.some((item, i) => item !== oldStyleSheet[i]);
  if (!maybeChange)
    return;
  styleSheet = Object.assign({}, defaultStyle, ...styleSheet);
  const result = StyleSheet.transform(styleSheet, compName);
  const keys10 = Object.keys(result);
  comp.nativeSetStyle(result, keys10, keys10.length, styleType, isInit);
  PostProcessStyle({ comp, styleSheet, styleType });
}

// src/render/react/components/config.js
var components = /* @__PURE__ */ new Map();
var getComponentByTagName = (tagName) => {
  const config = components.get(tagName);
  if (!config) {
    throw `Unknown component ${tagName}`;
  }
  return config;
};
function registerComponent(config) {
  if (components.has(config.tagName)) {
    throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
  }
  components.set(config.tagName, config);
  return config.tagName;
}
var STYLE_TYPE = {
  PART_MAIN: 0,
  PART_SCROLLBAR: 65536,
  PART_INDICATOR: 131072,
  PART_KNOB: 196608,
  PART_SELECTED: 262144,
  PART_ITEMS: 327680,
  PART_TICKS: 393216,
  PART_CURSOR: 458752,
  STATE_DEFAULT: 0,
  STATE_CHECKED: 1,
  STATE_FOCUSED: 2,
  STATE_FOCUS_KEY: 4,
  STATE_EDITED: 8,
  STATE_HOVERED: 16,
  STATE_PRESSED: 32,
  STATE_SCROLLED: 64,
  STATE_DISABLED: 128
};
var EDropdownlistDirection = {
  "none": 0,
  "left": 1 << 0,
  "right": 1 << 1,
  "top": 1 << 2,
  "bottom": 1 << 3,
  "horizontal": 1 << 0 | 1 << 1,
  "vertical": 1 << 2 | 1 << 3,
  "all": 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3
};
var styleGetterProp = ["height", "width", "left", "top"];

// src/render/react/components/common/index.js
var CommonComponentApi = function({ compName, comp, newProps, oldProps }) {
  return {
    style(styleSheet) {
      setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_MAIN, oldStyleSheet: oldProps.style });
    },
    align({
      type,
      pos = [0, 0]
    }) {
      if (!type || type === oldProps.align?.type && newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] && newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])
        return;
      comp.align(type, pos);
    },
    alignTo({
      type,
      pos = [0, 0],
      parent
    }) {
      if (!type || type === oldProps.alignTo?.type && newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] && newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] && parent?.uid === oldProps.alignTo?.parent?.uid)
        return;
      comp.alignTo(type, pos, parent);
    },
    scrollbarStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR, oldStyleSheet: oldProps.scrollbarStyle });
    },
    onScrollbarPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onScrollbarPressedStyle });
    },
    onScrollbarScrollingStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_SCROLLED, oldStyleSheet: oldProps.scrollbarScrollingStyle });
    },
    onPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
    },
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    onPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
    },
    onLongPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
    },
    onLongPressRepeat(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
    }
  };
};

// src/render/react/components/View/comp.js
var bridge = globalThis.SJSJSBridge;
var NativeView = bridge.NativeRender.NativeComponents.View;
function setViewProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "View", comp, newProps, oldProps })
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var ViewComp = class extends NativeView {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setViewProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
    super.insertChildBefore(child, beforeChild);
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "View", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/View/config.js
var ViewConfig = class {
  tagName = "View";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new ViewComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Window/comp.js
var bridge2 = globalThis.SJSJSBridge;
var NativeComp = bridge2.NativeRender.NativeComponents.Window;
function setWindowProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Window", comp, newProps, oldProps }),
    title(title) {
      if (oldProps.title != title) {
        comp.setTitle(title);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var Window = class extends NativeComp {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setWindowProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Window", styleType: type, oldStyleSheet: {}, isInit: false });
  }
};

// src/render/react/components/Window/config.js
var WindowConfig = class {
  tagName = "Window";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new Window({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, props, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Text/comp.js
var bridge3 = globalThis.SJSJSBridge;
var NativeText = bridge3.NativeRender.NativeComponents.Text;
function setTextProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Text", comp, newProps, oldProps }),
    children(str) {
      const type = typeof str;
      if ((type == "string" || type == "number") && oldProps.children !== str) {
        comp.setText(String(str));
      } else if (Array.isArray(str)) {
        const isStringArr = str.every((item) => typeof item === "string" || typeof item === "number");
        if (isStringArr) {
          comp.setText(str.join(""));
        }
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var TextComp = class extends NativeText {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setTextProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Text", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Text/config.js
var TextConfig = class {
  tagName = "Text";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new TextComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Image/comp.js
var fs2 = __require("fs");
var path2 = __require("path");
var bridge4 = globalThis.SJSJSBridge;
var NativeImage = bridge4.NativeRender.NativeComponents.Image;
async function getImageBinary2(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });
  const imageBuffer = await resp.arrayBuffer();
  return imageBuffer;
}
function setImageProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Image", comp, newProps, oldProps }),
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    src(url) {
      if (url && url !== oldProps.src) {
        if (BUILT_IN_SYMBOL[url]) {
          comp.setSymbol(BUILT_IN_SYMBOL[url]);
          return;
        }
        if (!isValidUrl(url)) {
          if (!path2.isAbsolute(url)) {
            url = path2.resolve(__dirname, url);
          }
          fs2.readFile(url, { encoding: "binary" }).then((data) => {
            comp.setImageBinary(data.buffer);
          }).catch((e) => {
            console.log("setImage error", e);
          });
        } else {
          getImageBinary2(url).then((buffer) => comp.setImageBinary(Buffer.from(buffer).buffer)).catch(console.warn);
        }
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var ImageComp = class extends NativeImage {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setImageProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Image", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(ImageComp, "tagName", "Image");

// src/render/react/components/Image/config.js
var ImageConfig = class {
  tagName = "Image";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new ImageComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Button/comp.js
var bridge5 = globalThis.SJSJSBridge;
var NativeButton = bridge5.NativeRender.NativeComponents.Button;
function setButtonProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Button", comp, newProps, oldProps }),
    onPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Button", styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
    },
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    onPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
    },
    onLongPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
    },
    onLongPressRepeat(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var ButtonComp = class extends NativeButton {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setButtonProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Button", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(ButtonComp, "tagName", "Button");

// src/render/react/components/Button/config.js
var ButtonConfig = class {
  tagName = "Button";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new ButtonComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Slider/comp.js
var bridge6 = globalThis.SJSJSBridge;
var NativeSlider = bridge6.NativeRender.NativeComponents.Slider;
function setSliderProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Slider", comp, newProps, oldProps }),
    indicatorStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_INDICATOR, oldStyleSheet: oldProps.indicatorStyle });
    },
    onIndicatorPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onIndicatorPressedStyle });
    },
    onPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
    },
    knobStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_KNOB, oldStyleSheet: oldProps.knobStyle });
    },
    onKnobPressedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_KNOB | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onKnobPressedStyle });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    range(arr2) {
      if (!Array.isArray(arr2))
        return;
      const [min, max] = arr2;
      if (min === oldProps.range?.[0] && max === oldProps.range?.[1])
        return;
      if (isNaN(min) || isNaN(max))
        return;
      comp.setRange([min, max]);
    },
    value(val) {
      if (isNaN(val))
        return;
      if (val == oldProps.value)
        return;
      comp.setValue(val);
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var SliderComp = class extends NativeSlider {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setSliderProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Slider", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(SliderComp, "tagName", "Slider");

// src/render/react/components/Slider/config.js
var SliderConfig = class {
  tagName = "Slider";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new SliderComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Switch/comp.js
var bridge7 = globalThis.SJSJSBridge;
var NativeComp2 = bridge7.NativeRender.NativeComponents.Switch;
function setSwitchProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Switch", comp, newProps, oldProps }),
    checkedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Switch", styleType: STYLE_TYPE.STATE_CHECKED, oldStyleSheet: oldProps.checkedStyle });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    checked(val) {
      if (isNaN(val))
        return;
      if (val == oldProps.value)
        return;
      comp.setChecked(val);
    },
    disabled(val) {
      if (val !== oldProps.disabled) {
        comp.setDisabled(val);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var SwitchComp = class extends NativeComp2 {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setSwitchProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
    this.insertChildBefore(child, beforeChild);
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Switch", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Switch/config.js
var SwitchConfig = class {
  tagName = "Switch";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new SwitchComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Textarea/comp.js
var bridge8 = globalThis.SJSJSBridge;
var NativeView2 = bridge8.NativeRender.NativeComponents.Textarea;
function setTextareaProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Text", comp, newProps, oldProps }),
    placeholder(str) {
      if (str !== oldProps.placeholder) {
        comp.setPlaceHolder(str);
      }
    },
    mode(mode) {
      if (mode === "password") {
        comp.setPasswordMode(true);
      } else if (oldProps.mode === "password") {
        comp.setPasswordMode(false);
      }
    },
    onFocusStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Textarea", styleType: 2, oldStyleSheet: oldProps.onFocusStyle });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    onFocus(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
    },
    value(str) {
      if (str !== oldProps.value) {
        comp.setText(str);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var TextareaComp = class extends NativeView2 {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    super.setOneLine(false);
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setTextareaProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Textarea", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Textarea/config.js
var TextareaConfig = class {
  tagName = "Textarea";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new TextareaComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Input/comp.js
var bridge9 = globalThis.SJSJSBridge;
var NativeView3 = bridge9.NativeRender.NativeComponents.Textarea;
function setInputProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Input", comp, newProps, oldProps }),
    placeholder(str) {
      if (str !== oldProps.placeholder) {
        comp.setPlaceHolder(str);
      }
    },
    mode(mode) {
      if (mode == oldProps.mode)
        return;
      if (mode === "password") {
        comp.setPasswordMode(true);
      } else if (oldProps.mode === "password") {
        comp.setPasswordMode(false);
      }
    },
    maxlength(len) {
      if (len === oldProps.maxlength)
        return;
      comp.setMaxLength(len);
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    onFocus(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
    },
    onBlur(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_DEFOCUSED);
    },
    onFocusStyle(styleSheet) {
      setStyle({ comp, compName: "Input", styleType: 2, oldStyleSheet: oldProps.onFocusStyle, styleSheet });
    },
    value(str) {
      if (str !== oldProps.value) {
        comp.setText(str);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var InputComp = class extends NativeView3 {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    super.setOneLine(true);
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setInputProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Input", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Input/config.js
var InputConfig = class {
  tagName = "Input";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new InputComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Keyboard/comp.js
var bridge10 = globalThis.SJSJSBridge;
var NativeView4 = bridge10.NativeRender.NativeComponents.Keyboard;
var modes = {
  "lower": 0,
  "upper": 1,
  "special": 2,
  "number": 3
};
function setKeyboardProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Keyboard", comp, newProps, oldProps }),
    mode(mode) {
      if (mode !== oldProps.mode && modes[mode]) {
        comp.setMode(modes[mode]);
      }
    },
    textarea(textarea) {
      if (textarea?.uid !== oldProps.textarea?.uid) {
        comp.setTextarea(textarea);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var KeyboardComp = class extends NativeView4 {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setKeyboardProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Keyboard", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Keyboard/config.js
var KeyboardConfig = class {
  tagName = "Keyboard";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new KeyboardComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Checkbox/comp.js
var bridge11 = globalThis.SJSJSBridge;
var NativeView5 = bridge11.NativeRender.NativeComponents.Checkbox;
function setCheckboxProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Checkbox", comp, newProps, oldProps }),
    checked(val) {
      if (val !== oldProps.checked) {
        comp.setChecked(val);
      }
    },
    disabled(val) {
      if (val !== oldProps.disabled) {
        comp.setDisabled(val);
      }
    },
    text(val) {
      if (val !== oldProps.text) {
        comp.setText(val);
      }
    },
    checkedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Checkbox", styleType: STYLE_TYPE.STATE_CHECKED, oldStyleSheet: oldProps.checkedStyle });
    },
    indicatorStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Checkbox", styleType: STYLE_TYPE.PART_INDICATOR, oldStyleSheet: oldProps.indicatorStyle });
    },
    indicatorCheckedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Checkbox", styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_CHECKED, oldStyleSheet: oldProps.indicatorCheckedStyle });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var CheckboxComp = class extends NativeView5 {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setCheckboxProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
    this.insertChildBefore(child, beforeChild);
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Checkbox", styleType: type, oldStyleSheet: {}, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};

// src/render/react/components/Checkbox/config.js
var CheckboxConfig = class {
  tagName = "Checkbox";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new CheckboxComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Dropdownlist/comp.js
var bridge12 = globalThis.SJSJSBridge;
var NativeDropdownlist = bridge12.NativeRender.NativeComponents.Dropdownlist;
function setListProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Dropdownlist", comp, newProps, oldProps }),
    items(items) {
      if (items !== oldProps.items && Array.isArray(items)) {
        comp.setItems(items, items.length);
      }
    },
    arrow(arrow) {
      if (arrow != oldProps.arrow && typeof arrow === "number") {
        comp.setArrowDir(arrow);
      }
    },
    selectIndex(selectIndex) {
      if (selectIndex !== oldProps.selectIndex) {
        comp.setselectIndex(selectIndex);
      }
    },
    text(text) {
      if (text !== oldProps.text) {
        comp.setText(text);
      }
    },
    direction(direction) {
      if (direction !== oldProps.direction) {
        comp.setDir(direction);
      }
    },
    highlightSelect(payload) {
      if (payload != oldProps.highlightSelect) {
        comp.setHighLightSelect(payload);
      }
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var DropdownlistComp = class extends NativeDropdownlist {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setListProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Dropdownlist", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(DropdownlistComp, "tagName", "Dropdownlist");

// src/render/react/components/Dropdownlist/config.js
var DropdownlistConfig = class {
  tagName = "Dropdownlist";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new DropdownlistComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/ProgressBar/comp.js
var bridge13 = globalThis.SJSJSBridge;
var NativeProgressBar = bridge13.NativeRender.NativeComponents.ProgressBar;
function setProgressBarProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "ProgressBar", comp, newProps, oldProps }),
    style(styleSheet) {
      if (newProps.animationTime) {
        styleSheet["style-transition-time"] = newProps.animationTime;
      }
      setStyle({ comp, styleSheet, compName: "ProgressBar", styleType: STYLE_TYPE.PART_MAIN, oldStyleSheet: oldProps.style });
    },
    indicatorStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "ProgressBar", styleType: STYLE_TYPE.PART_INDICATOR, oldStyleSheet: oldProps.style });
    },
    value(value) {
      if (value !== oldProps.value) {
        comp.setValue(value, !!newProps.useAnimation);
      }
    },
    range(arr2) {
      if (arr2?.[0] !== oldProps?.arr?.[0] || arr2?.[1] !== oldProps?.arr?.[1]) {
        comp.setRange(arr2[0], arr2[1]);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var ProgressBarComp = class extends NativeProgressBar {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setProgressBarProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "ProgressBar", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(ProgressBarComp, "tagName", "ProgressBar");

// src/render/react/components/ProgressBar/config.js
var ProgressBarConfig = class {
  tagName = "ProgressBar";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new ProgressBarComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Roller/comp.js
var bridge14 = globalThis.SJSJSBridge;
var NativeRoller = bridge14.NativeRender.NativeComponents.Roller;
function setRollerProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Roller", comp, newProps, oldProps }),
    selectedStyle(styleSheet) {
      setStyle({ comp, styleSheet, compName: "Roller", styleType: STYLE_TYPE.PART_SELECTED, oldStyleSheet: oldProps.selectedStyle });
    },
    options(options) {
      if (options !== oldProps.options && Array.isArray(options)) {
        comp.setOptions(options, options.length, !!newProps.infinity);
      }
    },
    selectIndex(selectIndex) {
      if (selectIndex !== oldProps.selectIndex) {
        comp.setSelectIndex(selectIndex);
      }
    },
    visibleRowCount(count) {
      if (count !== oldProps.visibleRowCount) {
        comp.setVisibleRowCount(count);
      }
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var RollerComp = class extends NativeRoller {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setRollerProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Roller", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(RollerComp, "tagName", "Roller");

// src/render/react/components/Roller/config.js
var RollerConfig = class {
  tagName = "Roller";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new RollerComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Line/comp.js
var bridge15 = globalThis.SJSJSBridge;
var NativeLine = bridge15.NativeRender.NativeComponents.Line;
function setLineProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Keyboard", comp, newProps, oldProps }),
    points(points) {
      if (Array.isArray(points) && points !== oldProps?.points || points?.length !== oldProps?.points?.length) {
        comp.setPoints(points, points.length);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var LineComp = class extends NativeLine {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setLineProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Line", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(LineComp, "tagName", "Line");

// src/render/react/components/Line/config.js
var LineConfig = class {
  tagName = "Line";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new LineComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/Calendar/comp.js
var bridge16 = globalThis.SJSJSBridge;
var NativeCalendar = bridge16.NativeRender.NativeComponents.Calendar;
function setCalendarProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Calendar", comp, newProps, oldProps }),
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    today(today) {
      if (today && today !== oldProps.today) {
        const date = new Date(today);
        comp.setToday(date.getFullYear(), date.getMonth() + 1, date.getDate());
      }
    },
    shownMonth(month) {
      if (month && month !== oldProps.shownMonth) {
        const date = new Date(month);
        comp.setShownMonth(date.getFullYear(), date.getMonth() + 1);
      }
    },
    highLightDates(dates) {
      if (Array.isArray(dates) && dates !== oldProps.highLightDates) {
        dates = dates.map((item) => {
          const date = new Date(item);
          return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        });
        comp.setHighlightDates(dates, dates.length);
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var CalendarComp = class extends NativeCalendar {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setCalendarProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "Calendar", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(CalendarComp, "tagName", "Calendar");

// src/render/react/components/Calendar/config.js
var CalendarConfig = class {
  tagName = "Calendar";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new CalendarComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/components/GIF/comp.js
var fs3 = __require("fs");
var path3 = __require("path");
var bridge17 = globalThis.SJSJSBridge;
var NativeGIF = bridge17.NativeRender.NativeComponents.GIF;
async function getGIFBinary(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });
  const GIFBuffer = await resp.arrayBuffer();
  return GIFBuffer;
}
function setGIFProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "GIF", comp, newProps, oldProps }),
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    src(url) {
      if (url && url !== oldProps.src) {
        if (BUILT_IN_SYMBOL[url]) {
          comp.setSymbol(BUILT_IN_SYMBOL[url]);
          return;
        }
        if (!isValidUrl(url)) {
          if (!path3.isAbsolute(url)) {
            url = path3.resolve(__dirname, url);
          }
          fs3.readFile(url, { encoding: "binary" }).then((data) => {
            comp.setGIFBinary(data.buffer);
          }).catch((e) => {
            console.log("setGIF error", e);
          });
        } else {
          getGIFBinary(url).then((buffer) => comp.setGIFBinary(Buffer.from(buffer).buffer)).catch(console.warn);
        }
      }
    }
  };
  Object.keys(setter).forEach((key) => {
    if (newProps[key]) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}
var GIFComp = class extends NativeGIF {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;
    const style2 = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj9, prop) {
        if (styleGetterProp.includes(prop)) {
          return style2[prop].call(that);
        }
      }
    });
  }
  setProps(newProps, oldProps) {
    setGIFProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
  close() {
  }
  setStyle(style2, type = 0) {
    setStyle({ comp: this, styleSheet: style2, compName: "GIF", styleType: type, oldStyleSheet: null, isInit: false });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
};
__publicField(GIFComp, "tagName", "GIF");

// src/render/react/components/GIF/config.js
var GIFConfig = class {
  tagName = "GIF";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps, rootInstance, context, workInProgress, uid) {
    const instance = new GIFComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps, internalInstanceHandle) {
  }
  commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps, oldProps) {
  }
  insertBefore(child, beforeChild) {
  }
  appendInitialChild(child) {
  }
  appendChild(child) {
  }
  removeChild(child) {
  }
};

// src/render/react/core/renderer/index.js
var containerInfo = /* @__PURE__ */ new Set();
var _Renderer = class {
  static render(element, options) {
    const isConcurrent = true;
    const hydrate = false;
    _Renderer.container = reconciler_default.createContainer(containerInfo, isConcurrent, hydrate);
    const parentComponent = null;
    reconciler_default.updateContainer(element, _Renderer.container, parentComponent);
  }
};
var Renderer = _Renderer;
__publicField(Renderer, "container");

// src/render/react/core/animate/index.js
var bridge18 = globalThis.SJSJSBridge;
var NativeAnimate = bridge18.NativeRender.Animate;
var callbackObj = {};
globalThis.ANIMIATE_CALLBACK = function(uid, ...args) {
  if (typeof callbackObj[uid] === "function") {
    try {
      callbackObj[uid].call(null, ...args);
    } catch (e) {
      console.log(e);
    }
  }
};

// src/render/react/core/dimensions/index.js
var bridge19 = globalThis.SJSJSBridge;
var dimensions = bridge19.NativeRender.dimensions;

// src/render/react/index.js
var View = registerComponent(new ViewConfig());
var Window2 = registerComponent(new WindowConfig());
var Text = registerComponent(new TextConfig());
var Image = registerComponent(new ImageConfig());
var Button = registerComponent(new ButtonConfig());
var Slider = registerComponent(new SliderConfig());
var Switch = registerComponent(new SwitchConfig());
var Textarea = registerComponent(new TextareaConfig());
var Input = registerComponent(new InputConfig());
var Keyboard = registerComponent(new KeyboardConfig());
var Checkbox = registerComponent(new CheckboxConfig());
var Dropdownlist = registerComponent(new DropdownlistConfig());
var ProgressBar = registerComponent(new ProgressBarConfig());
var Roller = registerComponent(new RollerConfig());
var Line = registerComponent(new LineConfig());
var Calendar = registerComponent(new CalendarConfig());
var GIF = registerComponent(new GIFConfig());
var Render = Renderer;

// test/grid/1/index.jsx
var import_react = __toESM(require_react());
var arr = Array(9).fill(1);
function App() {
  return /* @__PURE__ */ import_react.default.createElement(Window2, {
    style: style.window
  }, arr.map((item, index) => /* @__PURE__ */ import_react.default.createElement(Button, {
    style: [style.view, { "grid-column-pos": index % 3, "grid-row-pos": Math.floor(index / 3) }]
  }, /* @__PURE__ */ import_react.default.createElement(Text, null, `c${index % 3}, r${Math.floor(index / 3)}`))));
}
var style = {
  window: {
    "width": "300px",
    "height": "220px",
    "display": "grid",
    "grid-template-columns": "70 70 70",
    "grid-template-rows": "50 50 50"
  },
  view: {
    "grid-child": true,
    "align-self": "stretch",
    "justify-self": "stretch",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center"
  }
};
Render.render(/* @__PURE__ */ import_react.default.createElement(App, null));
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/** @license React v0.19.1
 * scheduler-tracing.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.19.1
 * scheduler-tracing.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.19.1
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.25.1
 * react-reconciler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v0.25.1
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.14.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

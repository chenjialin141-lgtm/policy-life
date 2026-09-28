var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G2(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G2.prototype = new F();
    H.constructor = G2;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G2;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.act = X;
    exports.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
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
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = X;
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.3.1";
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.3.1";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
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
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
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
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
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
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
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
        assign(pureComponentPrototype, Component.prototype);
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
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
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
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
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
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
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
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
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
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
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
              {
                checkKeyStringCoercion(config.key);
              }
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
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
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
              {
                checkKeyStringCoercion(config.key);
              }
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
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
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
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
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
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
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
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
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
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState(initialState) {
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
        function useEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create2, deps);
        }
        function useInsertionEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create2, deps);
        }
        function useLayoutEffect(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create2, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create2, deps);
        }
        function useImperativeHandle(ref, create2, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create2, deps);
        }
        function useDebugValue2(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
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
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
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
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
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
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
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
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
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
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
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
        exports.act = act;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue2;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect;
        exports.useId = useId;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
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

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var require_use_sync_external_store_shim_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js"(exports) {
    "use strict";
    var React = require_react();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useLayoutEffect = React.useLayoutEffect;
    var useDebugValue2 = React.useDebugValue;
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe]
      );
      useDebugValue2(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = true, console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
          var cachedValue = getSnapshot();
          objectIs(value, cachedValue) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        cachedValue = useState({
          inst: { value, getSnapshot }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect(
          function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          },
          [subscribe, value, getSnapshot]
        );
        useEffect(
          function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            return subscribe(function() {
              checkIfSnapshotChanged(inst) && forceUpdate({ inst });
            });
          },
          [subscribe]
        );
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React = require_react(), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue2 = React.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
      exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_use_sync_external_store_shim_production();
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
var require_with_selector_production = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js"(exports) {
    "use strict";
    var React = require_react();
    var shim = require_shim();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var useSyncExternalStore = shim.useSyncExternalStore;
    var useRef = React.useRef;
    var useEffect = React.useEffect;
    var useMemo = React.useMemo;
    var useDebugValue2 = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: false, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function() {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return memoizedSelection = currentSelection;
              }
              return memoizedSelection = nextSnapshot;
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return memoizedSnapshot = nextSnapshot, currentSelection;
            memoizedSnapshot = nextSnapshot;
            return memoizedSelection = nextSelection;
          }
          var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function() {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function() {
          inst.hasValue = true;
          inst.value = value;
        },
        [value]
      );
      useDebugValue2(value);
      return value;
    };
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    "production" !== process.env.NODE_ENV && function() {
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var React = require_react(), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue2 = React.useDebugValue;
      exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
          var inst = { hasValue: false, value: null };
          instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(
          function() {
            function memoizedSelector(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                nextSnapshot = selector(nextSnapshot);
                if (void 0 !== isEqual && inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, nextSnapshot))
                    return memoizedSelection = currentSelection;
                }
                return memoizedSelection = nextSnapshot;
              }
              currentSelection = memoizedSelection;
              if (objectIs(memoizedSnapshot, nextSnapshot))
                return currentSelection;
              var nextSelection = selector(nextSnapshot);
              if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
                return memoizedSnapshot = nextSnapshot, currentSelection;
              memoizedSnapshot = nextSnapshot;
              return memoizedSelection = nextSelection;
            }
            var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
              function() {
                return memoizedSelector(getSnapshot());
              },
              null === maybeGetServerSnapshot ? void 0 : function() {
                return memoizedSelector(maybeGetServerSnapshot());
              }
            ];
          },
          [getSnapshot, getServerSnapshot, selector, isEqual]
        );
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(
          function() {
            inst.hasValue = true;
            inst.value = value;
          },
          [value]
        );
        useDebugValue2(value);
        return value;
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }
});

// node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_with_selector_production();
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// scripts/polyfill.ts
var mem = /* @__PURE__ */ new Map();
var ls = {
  getItem: (k) => mem.has(k) ? mem.get(k) : null,
  setItem: (k, v) => {
    mem.set(k, String(v));
  },
  removeItem: (k) => {
    mem.delete(k);
  },
  clear: () => mem.clear(),
  key: () => null,
  get length() {
    return mem.size;
  }
};
globalThis.localStorage = ls;
if (typeof structuredClone !== "function") {
  ;
  globalThis.structuredClone = (x) => JSON.parse(JSON.stringify(x));
}

// node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/zustand/esm/index.mjs
var import_react = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var { useDebugValue } = import_react.default;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var didWarnAboutEqualityFn = false;
var identity = (arg) => arg;
function useStore(api, selector = identity, equalityFn) {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
var createImpl = (createState) => {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = (createState) => createState ? createImpl(createState) : createImpl;

// node_modules/zustand/esm/middleware.mjs
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (_e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options == null ? void 0 : options.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var oldImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options.getStorage();
  } catch (_e) {
  }
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const thenableSerialize = toThenable(options.serialize);
  const setItem = () => {
    const state = options.partialize({ ...get() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options.version }).then(
      (serializedValue) => storage.setItem(options.name, serializedValue)
    ).catch((e) => {
      errorInSync = e;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => cb(get()));
    const postRehydrationCallback = ((_a = options.onRehydrateStorage) == null ? void 0 : _a.call(options, get())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((storageValue) => {
      if (storageValue) {
        return options.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
var newImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return [
              true,
              options.migrate(
                deserializedStorageValue.state,
                deserializedStorageValue.version
              )
            ];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
var persistImpl = (config, baseOptions) => {
  if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
      );
    }
    return oldImpl(config, baseOptions);
  }
  return newImpl(config, baseOptions);
};
var persist = persistImpl;

// src/data/president.ts
function initialPState(diff) {
  const base = {
    year: 1,
    term: 1,
    population: 2300,
    gdp: 5e3,
    growth: 2.5,
    inflation: 2.3,
    unemployment: 4.5,
    revenue: 1e3,
    fixedSpending: 610,
    // 不含債務利息；利息每年動態加計
    discretionary: 300,
    allocated: 0,
    spending: 950,
    debt: 3e3,
    interest: 90,
    interestRate: 3,
    defense: 60,
    education: 62,
    healthcare: 60,
    welfare: 58,
    housing: 50,
    energy: 65,
    trade: 0,
    inequality: 38,
    housingPrice: 100,
    approval: 55,
    socialTrust: 65,
    politicalStability: 70,
    adminCapacity: 75,
    politicalCapital: 60,
    govSupport: 58,
    opposition: 42,
    gameOver: false,
    reelected: false
  };
  if (diff === "easy") {
    base.discretionary = 380;
    base.debt = 2200;
    base.interestRate = 2.6;
    base.interest = 57;
    base.approval = 60;
    base.socialTrust = 70;
    base.politicalStability = 76;
  } else if (diff === "hard") {
    base.discretionary = 240;
    base.debt = 3800;
    base.interestRate = 3.6;
    base.interest = 137;
    base.inflation = 3.4;
    base.unemployment = 5.6;
    base.approval = 48;
    base.opposition = 52;
  } else if (diff === "extreme") {
    base.discretionary = 170;
    base.debt = 4600;
    base.interestRate = 4.4;
    base.interest = 202;
    base.inflation = 4.6;
    base.unemployment = 6.8;
    base.socialTrust = 55;
    base.politicalStability = 58;
    base.approval = 42;
    base.opposition = 58;
    base.adminCapacity = 66;
  }
  return base;
}
var budgetBuckets = [
  { id: "b_education", name: "\u6559\u80B2\u9810\u7B97", desc: "\u64F4\u7DE8\u6559\u5E2B\u3001\u6559\u5B78\u8207\u9AD8\u6559\u8CC7\u6E90\uFF0C\u9577\u671F\u63D0\u5347\u4EBA\u529B\u7D20\u8CEA\u8207\u751F\u7522\u529B", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 60, duration: "permanent", tags: ["\u9577\u671F"], effects: { education: 5, growth: 0.15, adminCapacity: 1, approval: 1 }, stakeholders: { students: 2, youth: 1, middle: 1 } },
  { id: "b_healthcare", name: "\u91AB\u7642\u9810\u7B97", desc: "\u64F4\u5145\u91AB\u7642\u9662\u6240\u3001\u9577\u7167\u8207\u516C\u5171\u885B\u751F\u91CF\u80FD", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 55, duration: "permanent", tags: ["\u9577\u671F"], effects: { healthcare: 5, socialTrust: 1.5, approval: 1 }, stakeholders: { elderly: 2, lowIncome: 2, middle: 1 } },
  { id: "b_welfare", name: "\u793E\u6703\u798F\u5229", desc: "\u73FE\u91D1\u88DC\u52A9\u3001\u5F31\u52E2\u6276\u52A9\u8207\u751F\u6D3B\u6D25\u8CBC\uFF0C\u7E2E\u5C0F\u8CA7\u5BCC\u5DEE\u8DDD", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 50, duration: "permanent", effects: { welfare: 5, inequality: -2.5, growth: 0.1, approval: 2 }, stakeholders: { lowIncome: 3, elderly: 2, labor: 1 } },
  { id: "b_defense", name: "\u570B\u9632\u9810\u7B97", desc: "\u63D0\u5347\u570B\u9632\u88DD\u5099\u3001\u4EBA\u54E1\u8207\u81EA\u4E3B\u9632\u885B\u80FD\u529B", category: "\u9810\u7B97\u5206\u914D", cost: 0, recurring: 70, duration: "permanent", effects: { defense: 6, politicalStability: 1, trade: -0.1 }, stakeholders: { centralGov: 2, highIncome: 1 } },
  { id: "b_housing", name: "\u793E\u6703\u4F4F\u5B85", desc: "\u8208\u5EFA\u793E\u6703\u4F4F\u5B85\u8207\u79DF\u5C4B\u5354\u52A9\uFF0C\u58D3\u6291\u623F\u50F9\u3001\u7167\u9867\u79DF\u5C4B\u65CF", category: "\u9810\u7B97\u5206\u914D", cost: 120, recurring: 30, duration: "permanent", tags: ["\u571F\u5730", "\u591A\u5E74"], required: { budget: 150, admin: 8, land: 3 }, effects: { housing: 6, housingPrice: -7, approval: 2.5, politicalCapital: -2 }, stakeholders: { renters: 3, youth: 2, landlords: -2, lowIncome: 2 } },
  { id: "b_energy", name: "\u80FD\u6E90\u5EFA\u8A2D", desc: "\u80FD\u6E90\u57FA\u790E\u8A2D\u65BD\u8207\u88DC\u8CBC\uFF0C\u7A69\u5B9A\u4F9B\u96FB\u3001\u6291\u5236\u80FD\u6E90\u7269\u50F9", category: "\u9810\u7B97\u5206\u914D", cost: 60, recurring: 45, duration: "permanent", tags: ["\u80FD\u6E90"], required: { budget: 105, energy: 2 }, effects: { energy: 6, inflation: -0.35, growth: 0.1 }, stakeholders: { business: 1, middle: 1 } },
  { id: "b_infra", name: "\u516C\u5171\u5EFA\u8A2D", desc: "\u4EA4\u901A\u3001\u6C34\u5229\u8207\u516C\u5171\u5DE5\u7A0B\uFF0C\u5275\u9020\u5C31\u696D\u4E26\u5E36\u52D5\u6295\u8CC7", category: "\u9810\u7B97\u5206\u914D", cost: 100, recurring: 10, duration: "permanent", tags: ["\u591A\u5E74"], required: { budget: 110, admin: 6 }, effects: { growth: 0.5, unemployment: -0.5, adminCapacity: 1 }, stakeholders: { labor: 2, business: 1, localGov: 2 } }
];
var presidentPolicies = [
  { id: "p_minwage_up", name: "\u63D0\u9AD8\u57FA\u672C\u5DE5\u8CC7", desc: "\u8ABF\u9AD8\u57FA\u672C\u5DE5\u8CC7\uFF0C\u589E\u52A0\u52DE\u5DE5\u6240\u5F97\u4F46\u63D0\u9AD8\u4F01\u696D\u6210\u672C", category: "\u52DE\u52D5", cost: 0, recurring: 0, duration: "permanent", effects: { unemployment: 0.7, inflation: 0.45, inequality: -2, growth: 0.1, approval: 1.5 }, stakeholders: { labor: 2, youth: 1, business: -2, lowIncome: 2 } },
  { id: "p_labor_dereg", name: "\u9B06\u7D81\u52DE\u52D5\u6CD5\u898F", desc: "\u653E\u5BEC\u5DE5\u6642\u8207\u8058\u50F1\u9650\u5236\uFF0C\u63D0\u5347\u4F01\u696D\u5F48\u6027\u8207\u6295\u8CC7\u610F\u9858", category: "\u52DE\u52D5", cost: 0, recurring: 0, duration: "permanent", effects: { unemployment: -0.6, growth: 0.2, inequality: 1.5, socialTrust: -1 }, stakeholders: { business: 2, labor: -2, youth: -1 } },
  { id: "p_corptax_cut", name: "\u964D\u4F4E\u4F01\u696D\u7A05", desc: "\u8ABF\u964D\u71DF\u5229\u4E8B\u696D\u6240\u5F97\u7A05\uFF0C\u5438\u5F15\u6295\u8CC7\u3001\u5275\u9020\u5C31\u696D", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: -70, growth: 0.35, unemployment: -0.4, inequality: 1 }, stakeholders: { business: 3, investors: 2, highIncome: 1 } },
  { id: "p_corptax_zero", name: "\u53D6\u6D88\u4F01\u696D\u6240\u5F97\u7A05", desc: "\u5B8C\u5168\u53D6\u6D88\u71DF\u6240\u7A05\uFF08\u6975\u7AEF\uFF09\uFF1A\u5927\u5E45\u523A\u6FC0\u6295\u8CC7\u4F46\u56B4\u91CD\u524A\u6E1B\u6536\u5165", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", tags: ["\u6975\u7AEF"], effects: { revenue: -180, growth: 0.6, unemployment: -0.8, inequality: 4, approval: -2, politicalCapital: -3 }, stakeholders: { business: 3, investors: 3, lowIncome: -2, labor: -1 } },
  { id: "p_corptax_up", name: "\u63D0\u9AD8\u4F01\u696D\u7A05", desc: "\u8ABF\u9AD8\u71DF\u6240\u7A05\u589E\u52A0\u5EAB\u6536\uFF0C\u4F46\u53EF\u80FD\u58D3\u6291\u6295\u8CC7", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 70, growth: -0.25, unemployment: 0.3, approval: -1 }, stakeholders: { business: -3, investors: -2, lowIncome: 1 } },
  { id: "p_incometax_up", name: "\u63D0\u9AD8\u9AD8\u6240\u5F97\u7A05", desc: "\u5C0D\u9AD8\u6240\u5F97\u65CF\u7FA4\u52A0\u7A05\uFF0C\u6539\u5584\u5206\u914D\u3001\u589E\u52A0\u6536\u5165", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 50, inequality: -2, growth: -0.05 }, stakeholders: { highIncome: -3, lowIncome: 2, middle: 1 } },
  { id: "p_bonds", name: "\u767C\u884C\u653F\u5E9C\u516C\u50B5", desc: "\u8209\u50B5 200 \u5104\u652F\u61C9\u5EFA\u8A2D\u8207\u652F\u51FA\uFF0C\u660E\u5E74\u8D77\u5229\u606F\u4E0A\u5347", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "instant", tags: ["\u501F\u6B3E"], effects: { debtNow: 200, interestRate: 0.2, politicalCapital: -1 }, stakeholders: { investors: 1, centralGov: 1 } },
  { id: "p_bonds_huge", name: "\u5927\u91CF\u767C\u884C\u570B\u50B5", desc: "\u4E00\u53E3\u6C23\u8209\u50B5 600 \u5104\uFF08\u6975\u7AEF\uFF09\uFF0C\u77ED\u671F\u5BEC\u9B06\u4F46\u50B5\u52D9\u8207\u5229\u606F\u66B4\u589E", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: 0, duration: "instant", tags: ["\u6975\u7AEF", "\u501F\u6B3E"], effects: { debtNow: 600, interestRate: 0.7, politicalStability: -2, politicalCapital: -4 }, stakeholders: { investors: -1, business: -1, centralGov: 1 } },
  { id: "p_austerity", name: "\u51CD\u7D50\u4E26\u522A\u6E1B\u9810\u7B97", desc: "\u6499\u7BC0 60 \u5104\u5E38\u614B\u652F\u51FA\uFF0C\u6539\u5584\u8CA1\u653F\u4F46\u58D3\u7E2E\u670D\u52D9\u8207\u6C11\u5FC3", category: "\u8CA1\u653F\u7A05\u6536", cost: 0, recurring: -60, duration: "permanent", tags: ["\u6499\u7BC0"], effects: { welfare: -4, healthcare: -2, education: -2, approval: -3, socialTrust: -2, unemployment: 0.4 }, stakeholders: { lowIncome: -2, elderly: -2, labor: -1, business: 1, centralGov: -1 } },
  { id: "p_rent_control", name: "\u5BE6\u65BD\u623F\u79DF\u7BA1\u5236", desc: "\u9650\u5236\u79DF\u91D1\u6F32\u5E45\uFF0C\u7ACB\u5373\u6E1B\u8F15\u79DF\u5C4B\u8CA0\u64D4\uFF0C\u4F46\u53EF\u80FD\u6E1B\u5C11\u79DF\u5C4B\u4F9B\u7D66", category: "\u4F4F\u5B85", cost: 0, recurring: 0, duration: "permanent", effects: { housingPrice: -5, housing: -2, approval: 1.5 }, stakeholders: { renters: 3, youth: 2, landlords: -3, business: -1 } },
  { id: "p_green", name: "\u5927\u898F\u6A21\u7DA0\u80FD\u8F49\u578B", desc: "\u91CD\u91D1\u6295\u5165\u518D\u751F\u80FD\u6E90\uFF0C\u77ED\u671F\u6602\u8CB4\u3001\u9577\u671F\u58D3\u4F4E\u78B3\u6392\u8207\u80FD\u6E90\u9032\u53E3", category: "\u80FD\u6E90\u74B0\u5883", cost: 150, recurring: 40, duration: "permanent", tags: ["\u9577\u671F", "\u80FD\u6E90"], required: { budget: 190, admin: 6, energy: 3 }, effects: { energy: 8, inflation: -0.2, growth: 0.15, politicalCapital: -2 }, stakeholders: { youth: 2, students: 1, business: -1, landlords: 0 } },
  { id: "p_subsidy_industry", name: "\u7522\u696D\u62DB\u5546\u88DC\u8CBC", desc: "\u88DC\u8CBC\u91CD\u9EDE\u7522\u696D\u9032\u99D0\uFF0C\u5E36\u52D5\u6295\u8CC7\u8207\u5C31\u696D", category: "\u7522\u696D", cost: 80, recurring: 0, duration: "instant", required: { budget: 80 }, effects: { growth: 0.4, unemployment: -0.5, trade: 0.2 }, stakeholders: { business: 2, labor: 1, localGov: 1 } },
  { id: "p_public_jobs", name: "\u64F4\u5927\u516C\u5171\u50F1\u50AD", desc: "\u653F\u5E9C\u589E\u8058\u4EBA\u529B\uFF0C\u964D\u4F4E\u5931\u696D\u4F46\u589E\u52A0\u9577\u671F\u4EBA\u4E8B\u8CA0\u64D4", category: "\u52DE\u52D5", cost: 0, recurring: 45, duration: "permanent", effects: { unemployment: -0.8, adminCapacity: 2, approval: 1 }, required: { budget: 45 }, stakeholders: { labor: 2, students: 1, lowIncome: 1 } },
  { id: "p_cash_handout", name: "\u5168\u6C11\u666E\u767C\u73FE\u91D1", desc: "\u4E00\u6B21\u6027\u767C\u653E\u6D88\u8CBB\u5238\u523A\u6FC0\u666F\u6C23\uFF0C\u7ACB\u5373\u898B\u6548\u4F46\u8209\u50B5\u58D3\u529B", category: "\u8CA1\u653F\u7A05\u6536", cost: 130, recurring: 0, duration: "instant", tags: ["\u4E00\u6B21\u6027"], required: { budget: 130 }, effects: { growth: 0.45, inflation: 0.4, approval: 4, inequality: -1 }, stakeholders: { lowIncome: 2, middle: 2, youth: 2, business: 1 } },
  { id: "p_diplomacy", name: "\u5F37\u5316\u7D93\u8CBF\u5916\u4EA4", desc: "\u7C3D\u7F72\u8CBF\u6613\u5354\u5B9A\u3001\u62D3\u5C55\u51FA\u53E3\u5E02\u5834", category: "\u5916\u4EA4", cost: 30, recurring: 0, duration: "instant", required: { budget: 30, political: 5 }, effects: { trade: 0.6, growth: 0.3, politicalStability: 1 }, stakeholders: { business: 2, investors: 1, centralGov: 1 } }
];
var allPresidentActions = [...budgetBuckets, ...presidentPolicies];

// src/data/company.ts
var industries = [
  { id: "ai_saas", name: "AI \u8EDF\u9AD4 / SaaS", examples: ["AI \u5BB6\u6559 App", "\u4F01\u696D\u81EA\u52D5\u5316\u5E73\u53F0", "AI \u6CD5\u5F8B\u52A9\u624B"], cash: 3200, employees: 9, salary: 85, revenue: 250, customers: 40, rnd: 45, brand: 22, production: 25, competitor: 58, blurb: "\u9AD8\u6BDB\u5229\u3001\u8F15\u8CC7\u7522\u3001\u7814\u767C\u8207\u4EBA\u624D\u5BC6\u96C6\uFF0C\u73FE\u91D1\u6D88\u8017\u5FEB\u3001\u7AF6\u722D\u6FC0\u70C8" },
  { id: "fnb", name: "\u9910\u98F2\u9023\u9396", examples: ["\u624B\u6416\u98F2\u6599\u5E97", "\u4FBF\u7576\u9023\u9396", "\u5496\u5561\u54C1\u724C"], cash: 1800, employees: 14, salary: 55, revenue: 900, customers: 12e3, rnd: 12, brand: 30, production: 45, competitor: 62, blurb: "\u73FE\u91D1\u6D41\u5FEB\u3001\u6BDB\u5229\u4F4E\u3001\u9760\u5C55\u5E97\u8207\u54C1\u724C\uFF0C\u5730\u9EDE\u8207\u98DF\u5B89\u662F\u95DC\u9375" },
  { id: "ev", name: "\u96FB\u52D5\u8ECA / \u786C\u9AD4", examples: ["\u96FB\u52D5\u6A5F\u8ECA", "\u5145\u96FB\u8A2D\u5099", "\u667A\u6167\u786C\u9AD4"], cash: 6e3, employees: 40, salary: 78, revenue: 1500, customers: 800, rnd: 40, brand: 18, production: 40, competitor: 55, blurb: "\u91CD\u8CC7\u672C\u3001\u9577\u9031\u671F\u3001\u7522\u80FD\u8207\u4F9B\u61C9\u93C8\u6C7A\u5B9A\u751F\u6B7B\uFF0C\u52DF\u8CC7\u9700\u6C42\u5927" },
  { id: "green", name: "\u7DA0\u80FD\u8A2D\u5099", examples: ["\u592A\u967D\u80FD\u7CFB\u7D71", "\u5132\u80FD\u6AC3", "\u98A8\u96FB\u96F6\u7D44\u4EF6"], cash: 5200, employees: 32, salary: 75, revenue: 1200, customers: 60, rnd: 38, brand: 20, production: 42, competitor: 48, blurb: "\u653F\u7B56\u8207\u88DC\u8CBC\u9A45\u52D5\u3001\u91CD\u8CC7\u672C\uFF0C\u570B\u969B\u80FD\u6E90\u50F9\u683C\u5F71\u97FF\u5927" },
  { id: "beauty", name: "\u7F8E\u599D\u4FDD\u990A", examples: ["\u8B77\u819A\u54C1\u724C", "\u6A5F\u80FD\u4FDD\u990A\u54C1", "\u5F69\u599D"], cash: 2400, employees: 12, salary: 62, revenue: 700, customers: 6e3, rnd: 25, brand: 28, production: 35, competitor: 64, blurb: "\u54C1\u724C\u8207\u884C\u92B7\u4E3B\u5C0E\u3001\u7522\u54C1\u751F\u547D\u9031\u671F\u77ED\uFF0CKOL \u8207\u901A\u8DEF\u5F71\u97FF\u529B\u5F37" },
  { id: "pettech", name: "\u5BF5\u7269\u79D1\u6280", examples: ["\u667A\u6167\u9935\u98DF\u5668", "\u5BF5\u7269\u5065\u5EB7 App", "\u5BF5\u7269\u4FDD\u96AA\u5E73\u53F0"], cash: 2200, employees: 10, salary: 72, revenue: 350, customers: 900, rnd: 35, brand: 24, production: 30, competitor: 44, blurb: "\u5E02\u5834\u6210\u9577\u5FEB\u3001\u98FC\u4E3B\u5FE0\u8AA0\u5EA6\u9AD8\uFF0C\u7522\u54C1\u9AD4\u9A57\u8207\u53E3\u7891\u6C7A\u5B9A\u6210\u9577" },
  { id: "ecom", name: "\u96FB\u5546\u96F6\u552E", examples: ["\u751F\u9BAE\u96FB\u5546", "\u9078\u7269\u5E73\u53F0", "D2C \u54C1\u724C"], cash: 2600, employees: 16, salary: 64, revenue: 1100, customers: 18e3, rnd: 18, brand: 26, production: 38, competitor: 66, blurb: "\u898F\u6A21\u7D93\u6FDF\u3001\u7269\u6D41\u8207\u50F9\u683C\u6230\uFF0C\u88DC\u8CBC\u63DB\u53D6\u9577\u3001\u7372\u5229\u7D00\u5F8B\u662F\u6311\u6230" },
  { id: "biotech", name: "\u751F\u6280\u91AB\u7642", examples: ["\u65B0\u85E5\u7814\u767C", "\u91AB\u6750", "\u6578\u4F4D\u5065\u5EB7"], cash: 7e3, employees: 26, salary: 92, revenue: 200, customers: 25, rnd: 60, brand: 16, production: 20, competitor: 40, blurb: "\u9577\u9031\u671F\u3001\u9AD8\u7814\u767C\u3001\u6CD5\u898F\u9580\u6ABB\u9AD8\uFF0C\u55AE\u4E00\u7522\u54C1\u6210\u529F\u5831\u916C\u6975\u5927" }
];
var regions = [
  { id: "local", name: "\u55AE\u4E00\u57CE\u5E02\uFF0F\u672C\u5730", shareCap: 8, revMul: 1 },
  { id: "national", name: "\u5168\u570B\u5E02\u5834", shareCap: 25, revMul: 2.6 },
  { id: "regional", name: "\u8DE8\u570B\u5340\u57DF\u5E02\u5834", shareCap: 40, revMul: 5 },
  { id: "global", name: "\u5168\u7403\u5E02\u5834", shareCap: 60, revMul: 9 }
];
function initialCState(t, diff) {
  const diffCash = diff === "easy" ? 1.3 : diff === "hard" ? 0.8 : diff === "extreme" ? 0.6 : 1;
  const diffComp = diff === "easy" ? -8 : diff === "hard" ? 8 : diff === "extreme" ? 14 : 0;
  return {
    year: 1,
    productName: "",
    industry: t.name,
    headquarters: "",
    region: "local",
    revenue: t.revenue,
    profit: 0,
    cash: Math.round(t.cash * diffCash),
    debt: 0,
    employees: t.employees,
    salary: t.salary,
    marketShare: 2,
    brand: t.brand,
    rnd: t.rnd,
    production: t.production,
    customers: t.customers,
    investorConfidence: 55,
    stockPrice: null,
    competitor: Math.min(95, t.competitor + diffComp),
    ipo: false,
    gameOver: false
  };
}
var companyActions = [
  { id: "c_marketing", name: "\u5927\u8209\u6295\u653E\u884C\u92B7", desc: "\u7838\u9810\u7B97\u8CB7\u5EE3\u544A\u8207 KOL\uFF0C\u5FEB\u901F\u62C9\u62AC\u54C1\u724C\u8207\u5BA2\u6E90", category: "\u884C\u92B7", cost: 300, recurring: 200, duration: "permanent", effects: { brand: 8, marketShare: 1.2, revenue: 350 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: "c_rnd", name: "\u64F4\u589E\u7814\u767C\u5718\u968A", desc: "\u6295\u5165\u65B0\u7522\u54C1\u8207\u6280\u8853\uFF0C\u5EFA\u7ACB\u9577\u671F\u8B77\u57CE\u6CB3", category: "\u7814\u767C", cost: 100, recurring: 250, duration: "permanent", required: { admin: 6 }, effects: { rnd: 10, production: 2, revenue: 120 }, stakeholders: { customers: 1, competitors: -1 } },
  { id: "c_raise_salary", name: "\u8ABF\u9AD8\u85AA\u8CC7\u652C\u624D", desc: "\u63D0\u9AD8\u85AA\u8CC7\u8207\u798F\u5229\uFF0C\u964D\u4F4E\u512A\u79C0\u4EBA\u624D\u6D41\u5931", category: "\u4EBA\u529B", cost: 0, recurring: 150, duration: "permanent", effects: { rnd: 3, brand: 2, production: 2, investorConfidence: -1 }, stakeholders: { employees: 3 } },
  { id: "c_hire", name: "\u5927\u8209\u5FB5\u624D\u64F4\u7DE8", desc: "\u5404\u90E8\u968A\u5927\u91CF\u62DB\u4EBA\uFF0C\u885D\u9AD8\u7522\u80FD\u8207\u7814\u767C\u91CF\u80FD", category: "\u4EBA\u529B", cost: 80, recurring: 320, duration: "permanent", required: { budget: 400, admin: 8 }, effects: { employees: 22, production: 6, rnd: 4, revenue: 150 }, stakeholders: { employees: 2 } },
  { id: "c_factory", name: "\u64F4\u5EE0\uFF0F\u64F4\u9EDE", desc: "\u65B0\u589E\u5EE0\u623F\u6216\u9580\u5E02\uFF0C\u63D0\u9AD8\u7522\u80FD\u8207\u670D\u52D9\u8986\u84CB", category: "\u71DF\u904B", cost: 800, recurring: 120, duration: "permanent", tags: ["\u91CD\u8CC7\u672C"], required: { budget: 920 }, effects: { employees: 14, production: 12, marketShare: 1, revenue: 250 }, stakeholders: { customers: 1, suppliers: 1 } },
  { id: "c_layoff", name: "\u7CBE\u7C21\u7D44\u7E54\u88C1\u54E1", desc: "\u522A\u6E1B\u4EBA\u4E8B\u964D\u4F4E\u71D2\u9322\u901F\u5EA6\uFF0C\u4F46\u6253\u64CA\u58EB\u6C23\u8207\u54C1\u724C", category: "\u4EBA\u529B", cost: 120, recurring: -220, duration: "instant", effects: { employees: -16, production: -5, brand: -6, investorConfidence: 2 }, stakeholders: { employees: -3, investors: 1 } },
  { id: "c_price_cut", name: "\u964D\u50F9\u6436\u5E02", desc: "\u4EE5\u50F9\u683C\u63DB\u53D6\u5E02\u5360\u7387\uFF0C\u77ED\u671F\u58D3\u7E2E\u6BDB\u5229", category: "\u884C\u92B7", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: -120, marketShare: 2, brand: 1 }, stakeholders: { customers: 2, competitors: -2 } },
  { id: "c_price_up", name: "\u8ABF\u9AD8\u552E\u50F9", desc: "\u63D0\u9AD8\u55AE\u50F9\u6539\u5584\u6BDB\u5229\uFF0C\u4F46\u53EF\u80FD\u6D41\u5931\u5BA2\u6236", category: "\u884C\u92B7", cost: 0, recurring: 0, duration: "permanent", effects: { revenue: 300, marketShare: -1.5, brand: -2 }, stakeholders: { customers: -2, investors: 1 } },
  { id: "c_fundraise", name: "\u5411\u6295\u8CC7\u4EBA\u52DF\u8CC7", desc: "\u91CB\u653E\u80A1\u6B0A\u63DB\u53D6\u8CC7\u91D1\uFF08\u589E\u8CC7\uFF09\uFF0C\u4E0D\u751F\u5229\u606F\u4F46\u7A00\u91CB", category: "\u8CA1\u52D9", cost: 0, recurring: 0, duration: "instant", tags: ["\u80A1\u6B0A"], effects: { cashNow: 2200, investorConfidence: -2 }, stakeholders: { investors: 1 } },
  { id: "c_loan", name: "\u5411\u9280\u884C\u501F\u6B3E", desc: "\u53D6\u5F97\u50B5\u52D9\u8CC7\u91D1\uFF0C\u660E\u5E74\u8D77\u511F\u9084\u5229\u606F", category: "\u8CA1\u52D9", cost: 0, recurring: 0, duration: "instant", tags: ["\u501F\u6B3E"], effects: { debtNow: 1600, cashNow: 1600, investorConfidence: -1 }, stakeholders: { banks: 1 } },
  { id: "c_overseas", name: "\u4F48\u5C40\u6D77\u5916\u5E02\u5834", desc: "\u6295\u5165\u8CC7\u6E90\u958B\u62D3\u570B\u5916\u5BA2\u6236\u8207\u901A\u8DEF", category: "\u7B56\u7565", cost: 1200, recurring: 160, duration: "permanent", tags: ["\u6D77\u5916"], required: { budget: 1360, admin: 6 }, effects: { employees: 8, marketShare: 2.5, revenue: 500, brand: 4 }, stakeholders: { customers: 2, competitors: -1 } },
  { id: "c_acquire", name: "\u6536\u8CFC\u7AF6\u722D\u5C0D\u624B", desc: "\u4F75\u8CFC\u4EE5\u5FEB\u901F\u53D6\u5F97\u5E02\u5360\u8207\u6280\u8853\uFF08\u9AD8\u50F9\uFF09", category: "\u7B56\u7565", cost: 2200, recurring: 0, duration: "instant", tags: ["\u4F75\u8CFC"], required: { budget: 2200 }, effects: { marketShare: 5, competitor: -10, revenue: 450, brand: 3 }, stakeholders: { competitors: -3, investors: -1 } },
  { id: "c_supplychain", name: "\u512A\u5316\u4F9B\u61C9\u93C8", desc: "\u6539\u9020\u63A1\u8CFC\u8207\u7269\u6D41\uFF0C\u964D\u672C\u4E26\u63D0\u9AD8\u4EA4\u4ED8\u7A69\u5B9A\u5EA6", category: "\u71DF\u904B", cost: 220, recurring: -60, duration: "permanent", effects: { production: 5, revenue: 80 }, stakeholders: { suppliers: 1, customers: 1 } },
  { id: "c_ai_transform", name: "\u6578\u4F4D\uFF0FAI \u8F49\u578B", desc: "\u5C0E\u5165\u81EA\u52D5\u5316\u8207 AI\uFF0C\u63D0\u5347\u6548\u7387\u3001\u9577\u671F\u964D\u4F4E\u4EBA\u529B\u6210\u672C", category: "\u7814\u767C", cost: 500, recurring: -80, duration: "permanent", tags: ["AI"], required: { budget: 500 }, effects: { employees: -5, rnd: 8, production: 6, brand: 2 }, stakeholders: { employees: -1, investors: 2 } },
  { id: "c_cert_brand", name: "\u54C1\u724C\u8207\u8A8D\u8B49\u6295\u8CC7", desc: "\u53D6\u5F97\u570B\u969B\u8A8D\u8B49\u3001\u6253\u9020\u54C1\u724C\u4FE1\u4EFB\u5EA6", category: "\u884C\u92B7", cost: 260, recurring: 0, duration: "instant", effects: { brand: 10, investorConfidence: 3, marketShare: 0.6 }, stakeholders: { customers: 2, investors: 2, banks: 1 } },
  { id: "c_new_product", name: "\u63A8\u51FA\u65B0\u7522\u54C1", desc: "\u958B\u767C\u4E26\u4E0A\u5E02\u65B0\u7522\u54C1\u7DDA\uFF0C\u5275\u9020\u65B0\u71DF\u6536", category: "\u7814\u767C", cost: 420, recurring: 0, duration: "instant", required: { budget: 420, admin: 4 }, effects: { rnd: 4, revenue: 380, marketShare: 1, brand: 2 }, stakeholders: { customers: 2, competitors: -1 } }
];

// src/data/shared.ts
var stakeholderNames = {
  youth: "\u9752\u5E74",
  labor: "\u52DE\u5DE5",
  business: "\u4F01\u696D",
  students: "\u5B78\u751F",
  elderly: "\u9577\u8005",
  landlords: "\u623F\u6771",
  renters: "\u79DF\u5C4B\u65CF",
  middle: "\u4E2D\u7522\u968E\u7D1A",
  lowIncome: "\u4F4E\u6536\u5165\u6236",
  highIncome: "\u9AD8\u6240\u5F97\u65CF\u7FA4",
  localGov: "\u5730\u65B9\u653F\u5E9C",
  centralGov: "\u4E2D\u592E\u653F\u5E9C",
  employees: "\u54E1\u5DE5",
  customers: "\u5BA2\u6236",
  investors: "\u6295\u8CC7\u4EBA",
  competitors: "\u7AF6\u722D\u8005",
  suppliers: "\u4F9B\u61C9\u5546",
  banks: "\u9280\u884C",
  partners: "\u5408\u4F5C\u5925\u4F34",
  regulators: "\u4E3B\u7BA1\u6A5F\u95DC",
  public: "\u793E\u6703\u5927\u773E"
};
function groupName(id) {
  if (stakeholderNames[id]) return stakeholderNames[id];
  if (/[一-鿿]/.test(id)) return id;
  return id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}
function initialAchievements(mode) {
  const president = [
    { id: "pa_first_year", name: "\u8E0F\u4E0A\u57F7\u653F\u4E4B\u8DEF", desc: "\u5B8C\u6210\u7B2C\u4E00\u500B\u5E74\u5EA6", icon: "CalendarCheck", unlocked: false },
    { id: "pa_balanced", name: "\u8CA1\u653F\u7D00\u5F8B", desc: "\u5728\u4E0D\u8209\u50B5\u7684\u60C5\u6CC1\u4E0B\u901A\u904E\u4E00\u5E74\uFF08\u7121\u8D64\u5B57\uFF09", icon: "Scale", unlocked: false },
    { id: "pa_miracle", name: "\u7D93\u6FDF\u5947\u8E5F", desc: "\u9023\u7E8C\u4E09\u5E74\u7D93\u6FDF\u6210\u9577\u7387 \u2265 4%", icon: "TrendingUp", unlocked: false },
    { id: "pa_trust", name: "\u6C11\u5FC3\u6240\u5411", desc: "\u793E\u6703\u4FE1\u4EFB\u9054\u5230 85", icon: "HeartHandshake", unlocked: false },
    { id: "pa_recall_win", name: "\u633A\u904E\u7F77\u514D", desc: "\u5728\u7F77\u514D\u6295\u7968\u4E2D\u904E\u95DC\u7E8C\u4EFB", icon: "Flag", unlocked: false },
    { id: "pa_survivor", name: "\u5371\u6A5F\u9818\u5C0E\u8005", desc: "\u5E36\u9818\u570B\u5BB6\u6490\u904E\u4E00\u6B21\u91CD\u5927\u5371\u6A5F\u6216\u9ED1\u5929\u9D5D", icon: "Shield", unlocked: false },
    { id: "pa_debt_cut", name: "\u6E1B\u50B5\u6709\u6210", desc: "\u653F\u5E9C\u50B5\u52D9\u8F03\u5C31\u8077\u6642\u6E1B\u5C11 20% \u4EE5\u4E0A", icon: "PiggyBank", unlocked: false },
    { id: "pa_reelected", name: "\u9023\u4EFB\u6210\u529F", desc: "\u8D0F\u5F97\u7E3D\u7D71\u5927\u9078\u9032\u5165\u7B2C\u4E8C\u4EFB\u671F", icon: "Vote", unlocked: false }
  ];
  const company = [
    { id: "ca_first_revenue", name: "\u751F\u610F\u4E0A\u9580", desc: "\u5E74\u5EA6\u71DF\u6536\u7A81\u7834 1,000 \u842C", icon: "Coins", unlocked: false },
    { id: "ca_first_profit", name: "\u8F49\u8667\u70BA\u76C8", desc: "\u9996\u5EA6\u7E73\u51FA\u5E74\u5EA6\u7372\u5229", icon: "TrendingUp", unlocked: false },
    { id: "ca_cert", name: "\u54C1\u724C\u8D77\u6B65", desc: "\u54C1\u724C\u529B\u9054\u5230 60", icon: "Award", unlocked: false },
    { id: "ca_overseas", name: "\u822A\u5411\u6D77\u5916", desc: "\u696D\u52D9\u5340\u57DF\u62D3\u5C55\u81F3\u8DE8\u570B\u5E02\u5834", icon: "Globe", unlocked: false },
    { id: "ca_survivor", name: "\u6D74\u706B\u91CD\u751F", desc: "\u5728\u91CD\u5927\u5371\u6A5F\u6216\u9ED1\u5929\u9D5D\u5F8C\u4ECD\u6301\u7E8C\u7D93\u71DF", icon: "Shield", unlocked: false },
    { id: "ca_unicorn", name: "\u7368\u89D2\u7378\u6F5B\u529B", desc: "\u73FE\u91D1\u8207\u5E02\u503C\u9054\u5230 1 \u5104\u4EE5\u4E0A", icon: "Gem", unlocked: false },
    { id: "ca_leader", name: "\u5E02\u5834\u9818\u5C0E\u8005", desc: "\u5E02\u5360\u7387\u9054\u5230\u6240\u5C6C\u5E02\u5834\u4E0A\u9650\u7684 80%", icon: "Crown", unlocked: false },
    { id: "ca_ipo", name: "IPO \u6572\u947C", desc: "\u6210\u529F\u8B93\u516C\u53F8\u80A1\u7968\u4E0A\u5E02", icon: "Rocket", unlocked: false }
  ];
  return mode === "president" ? president : company;
}
var blackSwans = [
  {
    id: "bs_financial_crisis",
    title: "\u5168\u7403\u91D1\u878D\u6D77\u562F",
    detailP: "\u570B\u969B\u91D1\u878D\u5E02\u5834\u5D29\u76E4\u3001\u4FE1\u7528\u7DCA\u7E2E\uFF0C\u51FA\u53E3\u8207\u6295\u8CC7\u6025\u51CD\uFF0C\u5931\u696D\u6F6E\u6D6E\u73FE\uFF0C\u7A05\u6536\u5927\u5E45\u4E0B\u6ED1\u3002",
    detailC: "\u5E02\u5834\u9700\u6C42\u9A5F\u964D\u3001\u8CC7\u91D1\u64A4\u96E2\uFF0C\u5BA2\u6236\u7E2E\u624B\u3001\u61C9\u6536\u5E33\u6B3E\u62C9\u9577\uFF0C\u516C\u53F8\u9762\u81E8\u56B4\u51AC\u3002",
    effectsP: { growth: -3, unemployment: 2, revenue: -130, inflation: -0.6, approval: -5, socialTrust: -4 },
    effectsC: { revenue: -650, marketShare: -2, investorConfidence: -16, brand: -3 }
  },
  {
    id: "bs_pandemic",
    title: "\u91CD\u5927\u50B3\u67D3\u75C5\u75AB\u60C5",
    detailP: "\u75AB\u60C5\u885D\u64CA\u4F9B\u61C9\u93C8\u8207\u5167\u9700\uFF0C\u91AB\u7642\u91CF\u80FD\u7DCA\u7E43\uFF0C\u653F\u5E9C\u88AB\u8FEB\u7D13\u56F0\u4E26\u589E\u52A0\u652F\u51FA\u3002",
    detailC: "\u4EBA\u6D41\u8207\u7269\u6D41\u53D7\u963B\uFF0C\u5BE6\u9AD4\u71DF\u904B\u65B7\u93C8\uFF0C\u4F46\u6578\u4F4D\u8207\u9632\u75AB\u76F8\u95DC\u9700\u6C42\u4E0A\u5347\u3002",
    effectsP: { growth: -1.6, unemployment: 1.1, inflation: 1, healthcare: -6, debtNow: 150, approval: -2 },
    effectsC: { revenue: -320, production: -8, investorConfidence: -8, rnd: 3 }
  },
  {
    id: "bs_war",
    title: "\u5340\u57DF\u6230\u722D\u8207\u80FD\u6E90\u5371\u6A5F",
    detailP: "\u5730\u7DE3\u885D\u7A81\u5C0E\u81F4\u80FD\u6E90\u8207\u9032\u53E3\u7269\u50F9\u98C6\u6F32\u3001\u4F9B\u61C9\u93C8\u4E2D\u65B7\uFF0C\u570B\u9632\u58D3\u529B\u5347\u9AD8\u3002",
    detailC: "\u539F\u7269\u6599\u8207\u904B\u8CBB\u66B4\u6F32\u3001\u80FD\u6E90\u6210\u672C\u6500\u5347\uFF0C\u6BDB\u5229\u53D7\u5230\u56B4\u91CD\u58D3\u7E2E\u3002",
    effectsP: { inflation: 2.4, energy: -10, trade: -1, growth: -1.4, defense: 4, politicalStability: -3 },
    effectsC: { production: -6, revenue: -220, investorConfidence: -11, rnd: 0 }
  },
  {
    id: "bs_tech_revolution",
    title: "\u985B\u8986\u6027\u6280\u8853\u9769\u547D",
    detailP: "AI \u7B49\u901A\u7528\u6280\u8853\u5F15\u7206\u751F\u7522\u529B\u9769\u547D\uFF0C\u820A\u5DE5\u4F5C\u88AB\u53D6\u4EE3\u3001\u65B0\u7522\u696D\u8208\u8D77\uFF0C\u76E3\u7BA1\u9762\u81E8\u6311\u6230\u3002",
    detailC: "\u5E02\u5834\u7248\u5716\u91CD\u65B0\u6D17\u724C\uFF1A\u6280\u8853\u9818\u5148\u8005\u5F4E\u9053\u8D85\u8ECA\uFF0C\u8DDF\u4E0D\u4E0A\u7684\u696D\u8005\u88AB\u908A\u7DE3\u5316\u3002",
    effectsP: { growth: 1.4, unemployment: 0.7, inequality: 2, education: -2 },
    effectsC: { rnd: 6, competitor: 8, investorConfidence: 4 }
  },
  {
    id: "bs_quake",
    title: "\u91CD\u5927\u5929\u7136\u707D\u5BB3",
    detailP: "\u5F37\u9707\uFF0F\u6975\u7AEF\u6C23\u5019\u91CD\u5275\u57FA\u790E\u8A2D\u65BD\uFF0C\u653F\u5E9C\u9808\u6295\u5165\u9F90\u5927\u91CD\u5EFA\u7D93\u8CBB\u3002",
    detailC: "\u5EE0\u623F\u3001\u9580\u5E02\u6216\u4F9B\u61C9\u93C8\u53D7\u640D\uFF0C\u71DF\u904B\u4E2D\u65B7\u4E26\u7522\u751F\u91CD\u5EFA\u652F\u51FA\u3002",
    effectsP: { growth: -0.9, inflation: 0.5, debtNow: 180, politicalStability: -2, approval: -2 },
    effectsC: { production: -9, revenue: -180, investorConfidence: -6 }
  },
  {
    id: "bs_trade_war",
    title: "\u5168\u7403\u8CBF\u6613\u6230",
    detailP: "\u4E3B\u8981\u7D93\u6FDF\u9AD4\u4E92\u8AB2\u95DC\u7A05\u3001\u51FA\u53E3\u53D7\u963B\uFF0C\u4F9D\u8CF4\u5916\u92B7\u7684\u7522\u696D\u58D3\u529B\u6C89\u91CD\u3002",
    detailC: "\u95DC\u7A05\u8207\u51FA\u53E3\u7BA1\u5236\u588A\u9AD8\u6210\u672C\u3001\u6D77\u5916\u8A02\u55AE\u6D41\u5931\uFF0C\u4F9B\u61C9\u93C8\u88AB\u8FEB\u91CD\u7D44\u3002",
    effectsP: { trade: -1.6, growth: -1, inflation: 1, unemployment: 0.6 },
    effectsC: { revenue: -420, marketShare: -2, production: -4, investorConfidence: -9 }
  }
];

// src/engine/helpers.ts
function clamp(v, min, max) {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}
function uid(prefix = "a") {
  return prefix + "_" + Math.random().toString(36).slice(2, 9);
}

// src/engine/policy.ts
function addContribution(c, key, source, amount) {
  if (Math.abs(amount) < 1e-9) return;
  if (!c[key]) c[key] = [];
  c[key].push({ source, amount });
}
var specialKeys = /* @__PURE__ */ new Set(["debtNow", "cashNow"]);
function applyEffects(state, effects, scale, contrib, source) {
  for (const [key, raw] of Object.entries(effects)) {
    if (specialKeys.has(key)) continue;
    const amount = raw * scale;
    if (typeof state[key] === "number") {
      state[key] += amount;
      addContribution(contrib, key, source, amount);
    }
  }
}
function clampPresident(s) {
  s.unemployment = clamp(s.unemployment, 0.5, 35);
  s.inflation = clamp(s.inflation, -3, 25);
  s.growth = clamp(s.growth, -12, 14);
  s.approval = clamp(s.approval, 1, 99);
  s.socialTrust = clamp(s.socialTrust, 1, 99);
  s.politicalStability = clamp(s.politicalStability, 1, 99);
  s.adminCapacity = clamp(s.adminCapacity, 20, 99);
  s.politicalCapital = clamp(s.politicalCapital, 0, 100);
  s.govSupport = clamp(s.govSupport, 1, 99);
  s.opposition = clamp(s.opposition, 1, 99);
  s.inequality = clamp(s.inequality, 5, 90);
  s.housingPrice = clamp(s.housingPrice, 40, 400);
  s.interestRate = clamp(s.interestRate, 0.5, 18);
  for (const k of ["defense", "education", "healthcare", "welfare", "housing", "energy"]) {
    s[k] = clamp(s[k], 5, 99);
  }
  return s;
}
function clampCompany(s) {
  s.marketShare = clamp(s.marketShare, 0, 95);
  s.brand = clamp(s.brand, 0, 100);
  s.rnd = clamp(s.rnd, 0, 100);
  s.production = clamp(s.production, 0, 100);
  s.investorConfidence = clamp(s.investorConfidence, 0, 100);
  s.competitor = clamp(s.competitor, 5, 100);
  s.employees = Math.max(0, s.employees);
  s.customers = Math.max(0, s.customers);
  return s;
}

// src/engine/causal.ts
var indicatorLabels = {
  // 總統
  growth: "\u7D93\u6FDF\u6210\u9577\u7387",
  inflation: "\u901A\u81A8\u7387",
  unemployment: "\u5931\u696D\u7387",
  debt: "\u653F\u5E9C\u50B5\u52D9",
  interestRate: "\u50B5\u5238\u5229\u7387",
  housingPrice: "\u623F\u50F9\u6307\u6578",
  inequality: "\u8CA7\u5BCC\u5DEE\u8DDD",
  approval: "\u6C11\u610F\u652F\u6301",
  socialTrust: "\u793E\u6703\u4FE1\u4EFB",
  politicalStability: "\u653F\u6CBB\u7A69\u5B9A",
  adminCapacity: "\u884C\u653F\u80FD\u529B",
  politicalCapital: "\u653F\u6CBB\u8CC7\u672C",
  govSupport: "\u57F7\u653F\u9EE8\u652F\u6301",
  opposition: "\u53CD\u5C0D\u9EE8\u529B\u91CF",
  defense: "\u570B\u9632\u91CF\u80FD",
  education: "\u6559\u80B2\u91CF\u80FD",
  healthcare: "\u91AB\u7642\u91CF\u80FD",
  welfare: "\u798F\u5229\u91CF\u80FD",
  housing: "\u4F4F\u5B85\u91CF\u80FD",
  energy: "\u80FD\u6E90\u91CF\u80FD",
  trade: "\u51FA\u53E3\u52D5\u80FD",
  revenue: "\u653F\u5E9C\u6536\u5165",
  gdp: "GDP",
  // 企業
  profit: "\u5229\u6F64",
  cash: "\u73FE\u91D1",
  employees: "\u54E1\u5DE5\u4EBA\u6578",
  marketShare: "\u5E02\u5360\u7387",
  brand: "\u54C1\u724C\u529B",
  rnd: "\u7814\u767C\u91CF\u80FD",
  production: "\u7522\u80FD",
  customers: "\u5BA2\u6236\u6578",
  investorConfidence: "\u6295\u8CC7\u4EBA\u4FE1\u5FC3",
  stockPrice: "\u80A1\u50F9",
  competitor: "\u7AF6\u722D\u5F37\u5EA6"
};
function labelOf(key) {
  return indicatorLabels[key] || key;
}
function buildChangeReasons(contrib) {
  const out = [];
  for (const [key, sources] of Object.entries(contrib)) {
    if (!sources.length) continue;
    const delta = sources.reduce((a, b) => a + b.amount, 0);
    if (Math.abs(delta) < 0.05) continue;
    const merged = {};
    for (const s of sources) merged[s.source] = (merged[s.source] || 0) + s.amount;
    const srcArr = Object.entries(merged).map(([source, amount]) => ({ source, amount: Math.round(amount * 100) / 100 })).sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    out.push({ key, label: labelOf(key), delta: Math.round(delta * 100) / 100, sources: srcArr });
  }
  return out.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

// src/engine/events.ts
function ev(year, title, detail, severity, causedBy, effects, blackSwan = false) {
  return { id: uid("ev"), year, title, detail, severity, causedBy, effects, blackSwan };
}
function presidentEvents(s, c) {
  const out = [];
  const spenders = c.activeNames.slice(0, 3).join("\u3001");
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id));
    const pick = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0];
    out.push(ev(c.year, "\u9ED1\u5929\u9D5D\uFF1A" + pick.title, pick.detailP, "blackswan", ["\u570B\u969B\u74B0\u5883"], pick.effectsP, true));
  }
  if (c.deficit > 80) {
    out.push(ev(c.year, "\u8CA1\u653F\u8D64\u5B57\u64F4\u5927", `\u4ECA\u5E74\u652F\u51FA\u660E\u986F\u8D85\u904E\u6536\u5165\uFF0C\u8D64\u5B57\u7D04 ${Math.round(c.deficit)} \u5104${spenders ? "\uFF0C\u4E3B\u8981\u4F86\u81EA\uFF1A" + spenders : ""}\uFF0C\u653F\u5E9C\u6E96\u5099\u64F4\u5927\u8209\u50B5\u3002`, "risk", spenders ? c.activeNames.slice(0, 2) : ["\u8CA1\u653F\u6536\u652F"], { approval: -1.5, politicalCapital: -2 }));
  }
  if (c.debtRatio > 0.85) {
    out.push(ev(c.year, "\u653F\u5E9C\u50B5\u52D9\u8CA0\u64D4\u6C89\u91CD", `\u653F\u5E9C\u50B5\u52D9\u5DF2\u9054 GDP \u7684 ${(c.debtRatio * 100).toFixed(0)}%\uFF0C\u5E02\u5834\u958B\u59CB\u8CEA\u7591\u8CA1\u653F\u6C38\u7E8C\u6027\uFF0C\u516C\u50B5\u6B96\u5229\u7387\u9762\u81E8\u4E0A\u884C\u58D3\u529B\u3002`, "risk", ["\u8CA1\u653F\u8D64\u5B57\u64F4\u5927"], { interestRate: 0.6, investorConfidence: 0, politicalStability: -1 }));
  }
  if (c.debtRatio > 1.15 && c.deficit > 60) {
    out.push(ev(c.year, "\u50B5\u4FE1\u5371\u6A5F\u903C\u8FD1", `\u50B5\u53F0\u9AD8\u7BC9\u52A0\u4E0A\u6301\u7E8C\u8D64\u5B57\uFF0C\u4FE1\u7528\u8A55\u7B49\u6A5F\u69CB\u9EDE\u540D\u964D\u8A55\uFF0C\u501F\u65B0\u9084\u820A\u6210\u672C\u6025\u5347\uFF0C\u5229\u606F\u958B\u59CB\u6392\u64E0\u5176\u4ED6\u9810\u7B97\u3002`, "crisis", ["\u653F\u5E9C\u50B5\u52D9\u8CA0\u64D4\u6C89\u91CD"], { interestRate: 1.2, approval: -3, socialTrust: -3, politicalStability: -3 }));
  }
  if (c.debtRatio > 1.4) {
    out.push(ev(c.year, "\u8CA1\u653F\u5371\u6A5F", "\u653F\u5E9C\u5DF2\u96E3\u4EE5\u652F\u4ED8\u5FC5\u8981\u652F\u51FA\u8207\u50B5\u52D9\u5229\u606F\uFF0C\u4E3B\u6B0A\u50B5\u52D9\u5371\u6A5F\u7206\u767C\uFF0C\u570B\u6703\u8981\u6C42\u7E3D\u7D71\u8CA0\u8CAC\u3002", "crisis", ["\u50B5\u4FE1\u5371\u6A5F\u903C\u8FD1"], { approval: -8, politicalStability: -10, socialTrust: -8 }));
  }
  if (s.inflation >= 5) {
    out.push(ev(c.year, "\u7269\u50F9\u98C6\u6F32\u6C11\u6028\u5347\u9AD8", `\u901A\u81A8\u7387\u9054 ${s.inflation.toFixed(1)}%\uFF0C\u6C11\u773E\u5BE6\u8CEA\u6240\u5F97\u7E2E\u6C34\uFF0C\u53D7\u85AA\u968E\u7D1A\u8207\u5F31\u52E2\u65CF\u7FA4\u611F\u53D7\u6700\u5F37\u70C8\u3002`, "risk", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: -3, socialTrust: -2 }));
  }
  if (s.unemployment >= 7) {
    out.push(ev(c.year, "\u5931\u696D\u6F6E\u5F15\u767C\u6297\u8B70", `\u5931\u696D\u7387\u5347\u81F3 ${s.unemployment.toFixed(1)}%\uFF0C\u591A\u5730\u51FA\u73FE\u52DE\u5DE5\u6297\u8B70\uFF0C\u9752\u5E74\u5C31\u696D\u554F\u984C\u5C24\u5176\u5C16\u92B3\u3002`, "risk", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: -3, socialTrust: -2, politicalStability: -2 }));
  }
  if (s.housingPrice >= 130) {
    out.push(ev(c.year, "\u9752\u5E74\u5C45\u4F4F\u5371\u6A5F", `\u623F\u50F9\u6307\u6578\u4F86\u5230 ${s.housingPrice.toFixed(0)}\uFF0C\u9752\u5E74\u8207\u79DF\u5C4B\u65CF\u7121\u529B\u8CA0\u64D4\uFF0C\u7121\u6BBC\u8778\u725B\u96C6\u7D50\u4E0A\u8857\u3002`, "risk", ["\u4F4F\u5B85\u653F\u7B56"], { approval: -2.5, socialTrust: -2, politicalCapital: -2 }));
  }
  if (s.inequality >= 55) {
    out.push(ev(c.year, "\u8CA7\u5BCC\u5DEE\u8DDD\u6FC0\u5316\u5C0D\u7ACB", `\u8CA7\u5BCC\u5DEE\u8DDD\u6307\u6578\u5347\u81F3 ${s.inequality.toFixed(0)}\uFF0C\u793E\u6703\u76F8\u5C0D\u525D\u596A\u611F\u5347\u9AD8\uFF0C\u968E\u7D1A\u5C0D\u7ACB\u6210\u70BA\u653F\u6CBB\u8B70\u984C\u3002`, "risk", ["\u5206\u914D\u653F\u7B56"], { socialTrust: -3, politicalStability: -1 }));
  }
  if (s.growth >= 4 && s.unemployment < 5) {
    out.push(ev(c.year, "\u7D93\u6FDF\u69AE\u666F", `\u7D93\u6FDF\u6210\u9577\u7387\u9054 ${s.growth.toFixed(1)}%\u3001\u5C31\u696D\u7A69\u5B9A\uFF0C\u4F01\u696D\u589E\u8CC7\u3001\u6C11\u773E\u6709\u611F\uFF0C\u653F\u5E9C\u8072\u671B\u4E0A\u63DA\u3002`, "good", ["\u7E3D\u9AD4\u7D93\u6FDF"], { approval: 3, socialTrust: 1.5, politicalCapital: 2 }));
  }
  if (s.energy < 45) {
    out.push(ev(c.year, "\u4F9B\u96FB\u8207\u80FD\u6E90\u58D3\u529B", `\u80FD\u6E90\u4F9B\u7D66\u9918\u88D5\u7E2E\u6E1B\uFF0C\u5206\u5340\u9650\u96FB\u50B3\u805E\u885D\u64CA\u7522\u696D\u8207\u6C11\u751F\u7528\u96FB\u4FE1\u5FC3\u3002`, "risk", ["\u80FD\u6E90\u653F\u7B56"], { growth: -0.3, approval: -2 }));
  }
  return out;
}
function companyEvents(s, c) {
  const out = [];
  if (c.rng() < c.swanP) {
    const pool = blackSwans.filter((b) => !c.usedSwan.includes(b.id));
    const pick = pool[Math.floor(c.rng() * pool.length)] ?? blackSwans[0];
    let detail = pick.detailC;
    let eff = { ...pick.effectsC };
    if (pick.id === "bs_tech_revolution" && s.rnd >= 55) {
      detail = "AI \u6280\u8853\u9769\u547D\u5230\u4F86\uFF0C\u8CB4\u516C\u53F8\u9577\u671F\u6295\u5165\u7684\u7814\u767C\u6B63\u597D\u5361\u4F4D\uFF0C\u7522\u54C1\u5F4E\u9053\u8D85\u8ECA\uFF0C\u8CC7\u672C\u5E02\u5834\u7D66\u4E88\u9AD8\u5EA6\u671F\u5F85\u3002";
      eff = { rnd: 4, marketShare: 3, revenue: 500, investorConfidence: 12, brand: 4 };
    }
    out.push(ev(c.year, "\u9ED1\u5929\u9D5D\uFF1A" + pick.title, detail, "blackswan", ["\u7E3D\u9AD4\u74B0\u5883"], eff, true));
  }
  if (c.monthsCash < 4 && c.monthsCash >= 0) {
    out.push(ev(c.year, "\u73FE\u91D1\u6D41\u8B66\u5831", `\u5E33\u4E0A\u73FE\u91D1\u53EA\u5920\u652F\u61C9\u7D04 ${c.monthsCash.toFixed(1)} \u500B\u6708\u71DF\u904B\uFF0C\u82E5\u71DF\u6536\u672A\u6539\u5584\uFF0C\u5C07\u9762\u81E8\u767C\u4E0D\u51FA\u85AA\u6C34\u7684\u98A8\u96AA\u3002`, "risk", ["\u8CA1\u52D9\u8ABF\u5EA6"], { investorConfidence: -6 }));
  }
  if (c.debtRatio > 2.5 && s.revenue < s.debt) {
    out.push(ev(c.year, "\u50B5\u52D9\u5371\u6A5F", "\u8CA0\u50B5\u9060\u8D85\u5E74\u5EA6\u71DF\u6536\uFF0C\u9280\u884C\u7DCA\u7E2E\u984D\u5EA6\u3001\u4F9B\u61C9\u5546\u8981\u6C42\u9810\u4ED8\uFF0C\u8CC7\u91D1\u93C8\u96A8\u6642\u53EF\u80FD\u65B7\u88C2\u3002", "crisis", ["\u73FE\u91D1\u6D41\u8B66\u5831"], { investorConfidence: -12, brand: -4 }));
  }
  if (s.marketShare < 1 && c.year > 2) {
    out.push(ev(c.year, "\u5E02\u5834\u908A\u7DE3\u5316", "\u5E02\u5360\u7387\u8DCC\u7834 1%\uFF0C\u7522\u54C1\u9010\u6F38\u88AB\u4E3B\u6D41\u5E02\u5834\u5FFD\u7565\uFF0C\u901A\u8DEF\u8207\u5A92\u9AD4\u66DD\u5149\u90FD\u5728\u6D41\u5931\u3002", "crisis", ["\u5E02\u5834\u7AF6\u722D"], { brand: -5, revenue: -150 }));
  }
  if (s.competitor >= 75 && c.rng() < 0.5) {
    out.push(ev(c.year, "\u7AF6\u722D\u8005\u767C\u52D5\u50F9\u683C\u6230", "\u4E3B\u8981\u5C0D\u624B\u5927\u8209\u964D\u50F9\u88DC\u8CBC\uFF0C\u6436\u8D70\u50F9\u683C\u654F\u611F\u5BA2\u6236\uFF0C\u516C\u53F8\u9762\u81E8\u8DDF\u9032\u6216\u5805\u6301\u7684\u5169\u96E3\u3002", "risk", ["\u5E02\u5834\u7AF6\u722D"], { marketShare: -1.5, revenue: -200, investorConfidence: -3 }));
  }
  if (s.rnd >= 60 && c.rng() < 0.4) {
    out.push(ev(c.year, "\u7814\u767C\u50B3\u51FA\u7A81\u7834", "\u5718\u968A\u5728\u6838\u5FC3\u6280\u8853\u4E0A\u53D6\u5F97\u95DC\u9375\u7A81\u7834\uFF0C\u65B0\u7522\u54C1\u7372\u5F97\u5E02\u5834\u77DA\u76EE\uFF0C\u8A62\u554F\u5EA6\u5927\u589E\u3002", "good", ["\u7814\u767C\u6295\u5165"], { marketShare: 1.5, revenue: 300, brand: 4, investorConfidence: 5 }));
  }
  if (s.brand >= 70 && c.rng() < 0.4) {
    out.push(ev(c.year, "\u7522\u54C1\u7206\u7D05", "\u54C1\u724C\u8072\u91CF\u53D1\u9175\uFF0C\u55AE\u4E00\u7522\u54C1\u5728\u793E\u7FA4\u5F15\u7206\u8A71\u984C\uFF0C\u8A02\u55AE\u8207\u6D41\u91CF\u5927\u5E45\u6E67\u5165\u3002", "good", ["\u54C1\u724C\u884C\u92B7"], { customers: 0, marketShare: 2, revenue: 450, brand: 3 }));
  }
  if (s.investorConfidence < 30 && c.rng() < 0.5) {
    out.push(ev(c.year, "\u52DF\u8CC7\u9047\u51B7", "\u8CC7\u672C\u5E02\u5834\u5C0D\u516C\u53F8\u524D\u666F\u8F49\u8DA8\u4FDD\u5B88\uFF0C\u4E0B\u4E00\u8F2A\u52DF\u8CC7\u4F30\u503C\u88AB\u58D3\u3001\u8AC7\u5224\u56F0\u96E3\u3002", "risk", ["\u6295\u8CC7\u4EBA\u95DC\u4FC2"], { investorConfidence: -4 }));
  }
  if (s.production < 25 && s.marketShare > 10) {
    out.push(ev(c.year, "\u7522\u80FD\u8FFD\u4E0D\u4E0A\u8A02\u55AE", "\u5E02\u5834\u9700\u6C42\u8D85\u904E\u4F9B\u7D66\u80FD\u529B\uFF0C\u8A02\u55AE\u7A4D\u58D3\u3001\u5BA2\u6236\u7B49\u5F85\u904E\u4E45\uFF0C\u7AF6\u722D\u8005\u6709\u6A5F\u53EF\u4E58\u3002", "risk", ["\u71DF\u904B\u7522\u80FD"], { brand: -3, marketShare: -1 }));
  }
  return out;
}

// src/engine/president.ts
var rivals = ["\u6C5F\u660E\u502B", "\u9673\u82E5\u5D50", "\u674E\u570B\u68DF", "\u8607\u5A49\u6E05", "\u8D99\u5929\u884C"];
function computePresidentTurn(raw, active, difficulty, usedSwan, prevStreak, lastRecallYear, rng = Math.random) {
  const s = structuredClone(raw);
  const contrib = {};
  const year = s.year;
  const newActions = active.filter((a) => a.yearEnacted === year);
  const permanent = active.filter((a) => a.duration === "permanent");
  const newInstant = newActions.filter((a) => a.duration === "instant");
  const activeNames = active.filter((a) => a.scale > 0).map((a) => a.name);
  const noRev = (e) => {
    const c = { ...e };
    delete c.revenue;
    return c;
  };
  for (const a of permanent) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  for (const a of newInstant) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  const policyRevenue = permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) + newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0);
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0);
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0);
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0);
  const interestOpen = s.debt * (s.interestRate / 100);
  const totalRevenue = s.revenue + policyRevenue;
  const totalSpending = s.fixedSpending + interestOpen + recurringNet + instantCost;
  const balance = totalRevenue + Math.max(0, debtNow) - totalSpending;
  let deficit = 0;
  s.debt += Math.max(0, debtNow);
  if (debtNow > 0) addContribution(contrib, "debt", "\u8209\u50B5\u653F\u7B56", debtNow);
  if (balance < 0) {
    deficit = -balance;
    s.debt += deficit;
    addContribution(contrib, "debt", "\u8CA1\u653F\u8D64\u5B57", deficit);
  } else if (balance > 0) {
    const pay = balance * 0.7;
    s.debt = Math.max(0, s.debt - pay);
    addContribution(contrib, "debt", "\u76C8\u9918\u511F\u50B5", -pay);
  }
  const g0 = s.growth;
  s.growth += (2.5 - s.growth) * 0.25;
  addContribution(contrib, "growth", "\u7D93\u6FDF\u5FAA\u74B0", s.growth - g0);
  const u0 = s.unemployment;
  s.unemployment -= (s.growth - 2.5) * 0.35;
  s.unemployment += (4.2 - s.unemployment) * 0.2;
  addContribution(contrib, "unemployment", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.unemployment - u0);
  const i0 = s.inflation;
  s.inflation += (s.growth - 3) * 0.35 - (s.unemployment - 4.5) * 0.15 + (2.2 - s.inflation) * 0.2;
  addContribution(contrib, "inflation", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.inflation - i0);
  const h0 = s.housingPrice;
  s.housingPrice += s.growth * 1.2 - (s.interestRate - 3) * 2 + (100 - s.housingPrice) * 0.03;
  addContribution(contrib, "housingPrice", "\u7E3D\u9AD4\u7D93\u6FDF\u8ABF\u7BC0", s.housingPrice - h0);
  const gdp0 = s.gdp;
  s.gdp = s.gdp * (1 + s.growth / 100);
  addContribution(contrib, "gdp", "\u7D93\u6FDF\u6210\u9577", s.gdp - gdp0);
  for (const k of ["defense", "education", "healthcare", "welfare", "housing", "energy"]) {
    const before = s[k];
    s[k] += (55 - s[k]) * 0.05;
    addContribution(contrib, k, "\u670D\u52D9\u91CF\u80FD\u6298\u820A", s[k] - before);
  }
  const eco = s.growth * 2 - Math.max(0, s.unemployment - 4.5) * 3 - Math.max(0, s.inflation - 3) * 3;
  const a0 = s.approval;
  s.approval += eco * 0.4 + (50 - s.approval) * 0.18;
  addContribution(contrib, "approval", "\u65BD\u653F\u6EFF\u610F\u5EA6", s.approval - a0);
  const t0 = s.socialTrust;
  s.socialTrust += (s.approval - 50) * 0.08 + (60 - s.socialTrust) * 0.04 - Math.max(0, s.inequality - 45) * 0.05;
  addContribution(contrib, "socialTrust", "\u793E\u6703\u6C1B\u570D", s.socialTrust - t0);
  const ps0 = s.politicalStability;
  s.politicalStability += (s.approval - 50) * 0.12 + (s.socialTrust - 60) * 0.06 + (70 - s.politicalStability) * 0.04;
  addContribution(contrib, "politicalStability", "\u653F\u6CBB\u60C5\u52E2", s.politicalStability - ps0);
  s.govSupport += (s.approval - s.govSupport) * 0.3;
  s.opposition = clamp(100 - s.govSupport, 1, 99);
  const pc0 = s.politicalCapital;
  s.politicalCapital += (s.approval - 50) * 0.1 + (60 - s.politicalCapital) * 0.05;
  addContribution(contrib, "politicalCapital", "\u653F\u6CBB\u8CC7\u672C\u8B8A\u5316", s.politicalCapital - pc0);
  const debtRatio = s.debt / s.gdp;
  const targetRate = 2.2 + Math.max(0, debtRatio - 0.55) * 3.5 + Math.max(0, s.inflation - 2.3) * 0.3;
  const r0 = s.interestRate;
  s.interestRate += (targetRate - s.interestRate) * 0.4;
  addContribution(contrib, "interestRate", "\u50B5\u4FE1\u8207\u8CA8\u5E63\u60C5\u52E2", s.interestRate - r0);
  s.revenue = totalRevenue * (1 + s.growth * 5e-3);
  s.fixedSpending *= 1 + s.inflation * 0.01;
  s.interest = interestOpen;
  s.spending = totalSpending;
  s.discretionary = Math.max(0, s.revenue - s.fixedSpending - s.debt * (s.interestRate / 100));
  s.allocated = 0;
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty];
  const events = presidentEvents(s, {
    year,
    deficit,
    debtRatio,
    activeNames,
    usedSwan,
    swanP,
    rng
  });
  const newUsed = [...usedSwan];
  for (const e of events) {
    if (e.effects) applyEffects(s, e.effects, 1, contrib, e.title);
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => "\u9ED1\u5929\u9D5D\uFF1A" + b.title === e.title);
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id);
    }
  }
  clampPresident(s);
  let gameOver = false;
  let endReason;
  if (debtRatio > 1.5 && deficit > 150 && s.interestRate > 8) {
    gameOver = true;
    endReason = "\u8CA1\u653F\u5371\u6A5F\uFF1A\u653F\u5E9C\u5931\u53BB\u878D\u8CC7\u80FD\u529B\uFF0C\u7121\u529B\u652F\u4ED8\u5FC5\u8981\u652F\u51FA\u8207\u50B5\u52D9\u5229\u606F\u3002";
  } else if (s.politicalStability < 12 || s.socialTrust < 12) {
    gameOver = true;
    endReason = "\u653F\u6CBB\u5236\u5EA6\u5931\u7A69\uFF1A\u793E\u6703\u8207\u653F\u6CBB\u4FE1\u4EFB\u5168\u9762\u5D29\u6F70\uFF0C\u653F\u5E9C\u5DF2\u7121\u6CD5\u6B63\u5E38\u904B\u4F5C\u3002";
  }
  const recallPending = !gameOver && year - lastRecallYear >= 2 && s.approval < 30 && s.socialTrust < 35 && s.opposition > 62;
  const electionDue = year % 4 === 0;
  s.gameOver = gameOver;
  if (endReason) s.endReason = endReason;
  const growthStreak = s.growth >= 4 ? prevStreak + 1 : 0;
  const changes = buildChangeReasons(contrib);
  return {
    state: s,
    changes,
    events,
    usedSwan: newUsed,
    deficit,
    balance,
    totalRevenue,
    totalSpending,
    debtRatio,
    recallPending,
    electionDue,
    growthStreak
  };
}
var recallChoices = [
  { id: "explain", label: "\u516C\u958B\u8AAA\u660E", mod: 5, effects: { approval: 2, socialTrust: 1 } },
  { id: "concession", label: "\u653F\u7B56\u8B93\u6B65", mod: 18, effects: { approval: 6, socialTrust: 4, politicalCapital: -3 } },
  { id: "reform", label: "\u5BA3\u5E03\u6539\u9769", mod: 15, effects: { socialTrust: 5, politicalStability: 3, politicalCapital: -5 } },
  { id: "negotiate", label: "\u653F\u6CBB\u8AC7\u5224", mod: 12, effects: { opposition: -6, approval: 2, politicalCapital: -4 } },
  { id: "hold", label: "\u7DAD\u6301\u539F\u653F\u7B56", mod: -10, effects: { approval: -4, politicalStability: -4 } },
  { id: "ignore", label: "\u5B8C\u5168\u4E0D\u8655\u7406", mod: -25, effects: { approval: -8, socialTrust: -8, politicalStability: -8 } }
];
function resolveRecall(s, choiceId, rng = Math.random) {
  const c = recallChoices.find((x) => x.id === choiceId) || recallChoices[0];
  const survive = 50 + (s.approval - 30) * 1.2 + (s.socialTrust - 35) * 0.8 + (s.politicalStability - 50) * 0.4 + c.mod;
  const surviveChance = clamp(survive, 3, 97);
  const removed = rng() * 100 >= surviveChance;
  return { removed, surviveChance, choiceLabel: c.label, effects: c.effects };
}
function resolveElection(s, term, runAgain, rng = Math.random) {
  const rivalName = rivals[Math.floor(rng() * rivals.length)];
  if (!runAgain) {
    return { ran: false, won: false, playerVotes: 0, rivalVotes: 0, rivalName };
  }
  const score = s.approval * 0.55 + s.govSupport * 0.2 + clamp(s.growth, 0, 8) * 6 - Math.max(0, s.unemployment - 5) * 4 - Math.max(0, s.inflation - 4) * 3 + (s.socialTrust - 50) * 0.3 - (term >= 2 ? 3 : 0);
  let playerVotes = 50 + (score - 50) * 0.8 + (rng() * 8 - 4);
  playerVotes = Math.round(clamp(playerVotes, 5, 95));
  return { ran: true, won: playerVotes > 50, playerVotes, rivalVotes: 100 - playerVotes, rivalName };
}

// src/engine/company.ts
var regionOrder = ["local", "national", "regional", "global"];
var expandCost = { national: 800, regional: 2200, global: 5e3 };
var expandBrandNeed = { national: 35, regional: 58, global: 74 };
function regionInfo(id) {
  return regions.find((r) => r.id === id) || regions[0];
}
function nextRegion(id) {
  const i = regionOrder.indexOf(id);
  return i >= 0 && i < regionOrder.length - 1 ? regionOrder[i + 1] : null;
}
function canExpandRegion(s) {
  const nr = nextRegion(s.region);
  if (!nr) return false;
  return s.cash >= (expandCost[nr] || 0) && s.brand >= (expandBrandNeed[nr] || 0);
}
function expandRegion(s) {
  const nr = nextRegion(s.region);
  if (!nr) return s;
  const cost = expandCost[nr] || 0;
  s.cash -= cost;
  s.region = nr;
  s.investorConfidence += 4;
  s.milestone = "\u696D\u52D9\u5340\u57DF\u62D3\u5C55\u81F3\u300C" + regionInfo(nr).name + "\u300D";
  return s;
}
function canIPO(s) {
  return !s.ipo && s.revenue >= 3e3 && s.profit > 0 && s.cash >= 2e3 && s.investorConfidence >= 60 && s.marketShare >= 8;
}
function doIPO(s) {
  s.ipo = true;
  s.cash += 8e3;
  s.stockPrice = Math.round(40 + s.marketShare * 2.2 + s.brand * 0.4 + Math.max(0, s.profit) / 200);
  s.investorConfidence = clamp(s.investorConfidence + 15, 0, 100);
  s.milestone = "\u516C\u53F8\u65BC\u8B49\u5238\u4EA4\u6613\u6240\u639B\u724C\u4E0A\u5E02\uFF08IPO\uFF09\uFF0C\u52DF\u5F97\u5927\u7B46\u8CC7\u91D1";
  return s;
}
function computeCompanyTurn(raw, active, difficulty, usedSwan, rng = Math.random) {
  const s = structuredClone(raw);
  const contrib = {};
  const year = s.year;
  const newActions = active.filter((a) => a.yearEnacted === year);
  const permanent = active.filter((a) => a.duration === "permanent");
  const newInstant = newActions.filter((a) => a.duration === "instant");
  const actionRev = permanent.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0) + newInstant.reduce((n, a) => n + (a.effects.revenue || 0) * a.scale, 0);
  const noRev = (e) => {
    const c = { ...e };
    delete c.revenue;
    return c;
  };
  for (const a of permanent) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  for (const a of newInstant) applyEffects(s, noRev(a.effects), a.scale, contrib, a.name);
  const organicRate = clamp(
    0.03 + (s.brand - 50) * 12e-4 + (s.rnd - 50) * 1e-3 + (s.production - 50) * 6e-4 - (s.competitor - 50) * 22e-4,
    -0.3,
    0.35
  );
  const rev0 = s.revenue;
  const newRevenue = Math.max(0, s.revenue * (1 + organicRate) + actionRev);
  s.revenue = newRevenue;
  addContribution(contrib, "revenue", "\u5E02\u5834\u6709\u6A5F\u6210\u9577", s.revenue * organicRate);
  addContribution(contrib, "revenue", "\u7D93\u71DF\u6C7A\u7B56", actionRev);
  const comp0 = s.competitor;
  s.competitor += (50 - s.competitor) * 0.08 + (s.rnd < 40 ? 1.2 : 0) - (s.brand > 70 ? 1 : 0);
  addContribution(contrib, "competitor", "\u7AF6\u722D\u74B0\u5883", s.competitor - comp0);
  for (const k of ["brand", "rnd", "production"]) {
    const target = k === "brand" ? 42 : 40;
    const before = s[k];
    s[k] += (target - s[k]) * 0.05;
    addContribution(contrib, k, "\u91CF\u80FD\u81EA\u7136\u8870\u9000", s[k] - before);
  }
  const cap = regionInfo(s.region).shareCap;
  if (s.marketShare > cap) {
    const over = s.marketShare - cap;
    s.marketShare = cap;
    addContribution(contrib, "marketShare", "\u5E02\u5834\u5340\u57DF\u898F\u6A21\u4E0A\u9650", -over);
  }
  if (s.competitor > 70 && s.brand < 50) {
    s.marketShare -= 0.6;
    addContribution(contrib, "marketShare", "\u7AF6\u722D\u58D3\u529B", -0.6);
  }
  const payroll = s.employees * s.salary;
  const recurringNet = permanent.reduce((n, a) => n + a.recurring * a.scale, 0);
  const instantCost = newActions.reduce((n, a) => n + a.cost * a.scale, 0);
  const debtNow = newActions.reduce((n, a) => n + (a.effects.debtNow || 0) * a.scale, 0);
  const cashNow = newActions.reduce((n, a) => n + (a.effects.cashNow || 0) * a.scale, 0);
  s.debt += Math.max(0, debtNow);
  const rate = clamp(7 + (100 - s.investorConfidence) * 0.1 + Math.max(0, s.debt / Math.max(s.revenue, 1) - 1) * 3, 7, 20);
  const interest = s.debt * rate / 100;
  const profit = s.revenue - payroll - recurringNet - instantCost - interest;
  s.profit = Math.round(profit);
  addContribution(contrib, "profit", "\u5E74\u5EA6\u640D\u76CA", profit);
  const cashBefore = s.cash;
  s.cash += profit + cashNow;
  if (s.customers > 0) s.customers = Math.round(s.customers * (1 + clamp((s.revenue / Math.max(rev0, 1) - 1) * 0.5, -0.4, 0.6)));
  const ic0 = s.investorConfidence;
  s.investorConfidence += (profit > 0 ? 2.5 : -3) + clamp(s.revenue / 2e3, -2, 3) + (s.cash < 0 ? -10 : 0);
  addContribution(contrib, "investorConfidence", "\u8CA1\u52D9\u9AD4\u8CEA", s.investorConfidence - ic0);
  const monthsCost = Math.max(1, (payroll + Math.max(0, recurringNet)) / 12);
  const monthsCash = s.cash / monthsCost;
  const swanP = { easy: 0.03, normal: 0.07, hard: 0.11, extreme: 0.16 }[difficulty];
  const events = companyEvents(s, {
    year,
    monthsCash,
    debtRatio: s.debt / Math.max(s.revenue, 1),
    usedSwan,
    swanP,
    rng,
    active
  });
  const newUsed = [...usedSwan];
  for (const e of events) {
    if (e.effects) applyEffects(s, noRev(e.effects), 1, contrib, e.title);
    if (e.blackSwan) {
      const bs = blackSwans.find((b) => "\u9ED1\u5929\u9D5D\uFF1A" + b.title === e.title);
      if (bs && !newUsed.includes(bs.id)) newUsed.push(bs.id);
    }
  }
  clampCompany(s);
  let bankrupt = false;
  let endReason;
  if (s.cash < 0 && s.investorConfidence < 20) {
    bankrupt = true;
    endReason = "\u6D41\u52D5\u6027\u5371\u6A5F\uFF1A\u73FE\u91D1\u7528\u76E1\u4E14\u7121\u6CD5\u518D\u878D\u8CC7\uFF0C\u516C\u53F8\u767C\u4E0D\u51FA\u85AA\u6C34\u3001\u7121\u529B\u511F\u9084\u50B5\u52D9\u3002";
  } else if (s.debt > 2.5 * Math.max(s.revenue, 1) && s.cash < 0) {
    bankrupt = true;
    endReason = "\u50B5\u52D9\u5371\u6A5F\uFF1A\u8CA0\u50B5\u9060\u8D85\u71DF\u6536\u3001\u8CC7\u91D1\u93C8\u65B7\u88C2\uFF0C\u516C\u53F8\u5BA3\u5E03\u7834\u7522\u3002";
  } else if (s.marketShare < 0.5 && year > 3) {
    bankrupt = true;
    endReason = "\u5E02\u5834\u9000\u51FA\uFF1A\u5E02\u5360\u7387\u5D29\u843D\u81F3\u5E7E\u4E4E\u70BA\u96F6\uFF0C\u7522\u54C1\u5931\u53BB\u901A\u8DEF\u8207\u5BA2\u6236\uFF0C\u516C\u53F8\u505C\u6B62\u71DF\u904B\u3002";
  } else if (s.cash < 0) {
    const gap = -s.cash;
    s.debt += gap;
    addContribution(contrib, "debt", "\u7DCA\u6025\u6A4B\u63A5\u8CB8\u6B3E", gap);
    s.cash = 0;
    s.investorConfidence -= 6;
  }
  if (bankrupt) {
    s.gameOver = true;
    s.endReason = endReason;
  }
  addContribution(contrib, "cash", "\u5E74\u5EA6\u73FE\u91D1\u6D41", s.cash - cashBefore);
  const changes = buildChangeReasons(contrib);
  return { state: s, changes, events, usedSwan: newUsed, monthsCash, profit: s.profit, revenue: s.revenue, bankrupt };
}

// src/engine/narrative.ts
var pComments = {
  youth: { pos: "\u5E74\u8F15\u4EBA\u8A8D\u70BA\u653F\u7B56\u5E36\u4F86\u6A5F\u6703\uFF0C\u793E\u7FA4\u8072\u91CF\u8F49\u70BA\u6B63\u9762\u3002", neg: "\u9752\u5E74\u5718\u9AD4\u6279\u8A55\u653F\u7B56\u5FFD\u8996\u4F4E\u85AA\u8207\u9AD8\u623F\u50F9\uFF0C\u63DA\u8A00\u4E32\u9023\u6297\u8B70\u3002" },
  labor: { pos: "\u52DE\u5DE5\u5718\u9AD4\u80AF\u5B9A\u653F\u7B56\u5C0D\u5C31\u696D\u8207\u85AA\u8CC7\u7684\u4FDD\u969C\u3002", neg: "\u5DE5\u6703\u62A8\u64CA\u653F\u7B56\u58D3\u7E2E\u52DE\u52D5\u6B0A\u76CA\uFF0C\u4E0D\u6392\u9664\u767C\u52D5\u7F77\u5DE5\u3002" },
  business: { pos: "\u5DE5\u5546\u754C\u6B61\u8FCE\u653F\u7B56\u6539\u5584\u6295\u8CC7\u74B0\u5883\uFF0C\u8868\u614B\u52A0\u78BC\u6295\u8CC7\u3002", neg: "\u4F01\u696D\u5354\u6703\u8B66\u544A\u6210\u672C\u4E0A\u5347\uFF0C\u8003\u616E\u7E2E\u6E1B\u6295\u8CC7\u6216\u5916\u79FB\u3002" },
  students: { pos: "\u5B78\u751F\u65CF\u7FA4\u611F\u53D7\u5230\u6559\u80B2\u8CC7\u6E90\u589E\u52A0\uFF0C\u53CD\u61C9\u6B63\u9762\u3002", neg: "\u5B78\u751F\u5718\u9AD4\u8A8D\u70BA\u6559\u80B2\u627F\u8AFE\u8DF3\u7968\uFF0C\u767C\u8D77\u9023\u7F72\u3002" },
  elderly: { pos: "\u9577\u8005\u8207\u9000\u4F11\u65CF\u7FA4\u80AF\u5B9A\u798F\u5229\u8207\u7167\u9867\u653F\u7B56\u3002", neg: "\u9AD8\u9F61\u65CF\u7FA4\u64D4\u5FC3\u9000\u4F11\u91D1\u8207\u91AB\u7642\u7E2E\u6C34\uFF0C\u51FA\u73FE\u7126\u616E\u8072\u6D6A\u3002" },
  landlords: { pos: "\u623F\u6771\u5718\u9AD4\u6B61\u8FCE\u7BA1\u5236\u9B06\u7D81\uFF0C\u8A8D\u70BA\u79DF\u8CC3\u5E02\u5834\u66F4\u6709\u5F48\u6027\u3002", neg: "\u623F\u6771\u5718\u9AD4\u5F37\u70C8\u53CD\u5C0D\u79DF\u91D1\u7BA1\u5236\uFF0C\u919E\u91C0\u6CD5\u5F8B\u884C\u52D5\u3002" },
  renters: { pos: "\u79DF\u5C4B\u65CF\u5C0D\u5C45\u4F4F\u653F\u7B56\u5BC4\u4E88\u539A\u671B\uFF0C\u7D66\u4E88\u80AF\u5B9A\u3002", neg: "\u79DF\u5C4B\u65CF\u8A8D\u70BA\u653F\u7B56\u7DE9\u4E0D\u6FDF\u6025\uFF0C\u6301\u7E8C\u4E32\u9023\u5C45\u4F4F\u6B63\u7FA9\u904A\u884C\u3002" },
  middle: { pos: "\u4E2D\u7522\u968E\u7D1A\u611F\u53D7\u5230\u7269\u50F9\u8207\u5C31\u696D\u7A69\u5B9A\uFF0C\u652F\u6301\u5EA6\u56DE\u5347\u3002", neg: "\u4E2D\u7522\u968E\u7D1A\u62B1\u6028\u7A05\u8CA0\u8207\u623F\u50F9\u58D3\u529B\uFF0C\u60B6\u7D93\u6FDF\u611F\u52A0\u6DF1\u3002" },
  lowIncome: { pos: "\u5F31\u52E2\u65CF\u7FA4\u53D7\u60E0\u65BC\u798F\u5229\u8207\u88DC\u8CBC\uFF0C\u8655\u5883\u7372\u5F97\u6539\u5584\u3002", neg: "\u5F31\u52E2\u5718\u9AD4\u6307\u51FA\u88DC\u52A9\u4E0D\u8DB3\u3001\u9580\u6ABB\u904E\u9AD8\uFF0C\u7167\u9867\u51FA\u73FE\u7F3A\u53E3\u3002" },
  highIncome: { pos: "\u9AD8\u6240\u5F97\u8207\u6295\u8CC7\u4EBA\u5C0D\u6E1B\u7A05\u8207\u958B\u653E\u653F\u7B56\u53CD\u61C9\u6B63\u9762\u3002", neg: "\u9AD8\u6240\u5F97\u65CF\u7FA4\u5C0D\u52A0\u7A05\u8207\u8CA1\u5BCC\u91CD\u5206\u914D\u8868\u9054\u4E0D\u6EFF\u3002" },
  localGov: { pos: "\u5730\u65B9\u653F\u5E9C\u8A8D\u70BA\u914D\u5957\u5230\u4F4D\u3001\u6A02\u610F\u914D\u5408\u57F7\u884C\u3002", neg: "\u5730\u65B9\u653F\u5E9C\u53CD\u6620\u7D93\u8CBB\u8207\u4EBA\u529B\u4E0D\u8DB3\uFF0C\u62B5\u5236\u4E2D\u592E\u653F\u7B56\u3002" },
  centralGov: { pos: "\u884C\u653F\u5718\u968A\u58EB\u6C23\u63D0\u5347\uFF0C\u570B\u6703\u9EE8\u5718\u52D5\u54E1\u9806\u66A2\u3002", neg: "\u570B\u6703\u5728\u91CE\u9EE8\u5718\u56B4\u52A0\u6279\u8A55\uFF0C\u6CD5\u6848\u5BE9\u67E5\u9762\u81E8\u5361\u95DC\u3002" }
};
var cNames = {
  employees: "\u54E1\u5DE5",
  customers: "\u5BA2\u6236",
  investors: "\u6295\u8CC7\u4EBA",
  competitors: "\u7AF6\u722D\u8005",
  suppliers: "\u4F9B\u61C9\u5546",
  banks: "\u9280\u884C",
  partners: "\u5408\u4F5C\u5925\u4F34",
  regulators: "\u4E3B\u7BA1\u6A5F\u95DC",
  public: "\u793E\u6703\u5927\u773E"
};
var cComments = {
  employees: { pos: "\u54E1\u5DE5\u5C0D\u516C\u53F8\u524D\u666F\u6709\u4FE1\u5FC3\uFF0C\u5718\u968A\u58EB\u6C23\u9AD8\u6602\u3002", neg: "\u54E1\u5DE5\u4EBA\u5FC3\u6D6E\u52D5\uFF0C\u6C42\u8077\u8207\u96E2\u8077\u8A0E\u8AD6\u589E\u52A0\u3002" },
  customers: { pos: "\u5BA2\u6236\u6EFF\u610F\u5EA6\u63D0\u5347\uFF0C\u56DE\u8CFC\u8207\u63A8\u85A6\u589E\u52A0\u3002", neg: "\u5BA2\u6236\u62B1\u6028\u589E\u591A\uFF0C\u8CA0\u8A55\u8207\u9000\u8A02\u8072\u91CF\u4E0A\u5347\u3002" },
  investors: { pos: "\u6295\u8CC7\u4EBA\u770B\u597D\u71DF\u904B\uFF0C\u9858\u610F\u52A0\u78BC\u6CE8\u8CC7\u3002", neg: "\u6295\u8CC7\u4EBA\u5C0D\u8CA1\u52D9\u8207\u6210\u9577\u6027\u8F49\u8DA8\u4FDD\u5B88\uFF0C\u89C0\u671B\u6C23\u6C1B\u6FC3\u3002" },
  competitors: { pos: "\u7AF6\u722D\u8005\u8F49\u70BA\u5B88\u52E2\uFF0C\u7522\u696D\u8A71\u8A9E\u6B0A\u8F49\u5411\u8CB4\u516C\u53F8\u3002", neg: "\u7AF6\u722D\u8005\u8D81\u6A5F\u6436\u55AE\u4E26\u767C\u52D5\u653B\u52E2\uFF0C\u58D3\u529B\u5347\u9AD8\u3002" },
  suppliers: { pos: "\u4F9B\u61C9\u5546\u770B\u597D\u5408\u4F5C\u3001\u7D66\u4E88\u66F4\u512A\u60E0\u689D\u4EF6\u3002", neg: "\u4F9B\u61C9\u5546\u64D4\u5FC3\u4ED8\u6B3E\u80FD\u529B\uFF0C\u8981\u6C42\u7E2E\u77ED\u5E33\u671F\u3002" },
  banks: { pos: "\u9280\u884C\u7D66\u4E88\u512A\u60E0\u5229\u7387\u8207\u984D\u5EA6\uFF0C\u9858\u610F\u64F4\u5927\u5F80\u4F86\u3002", neg: "\u9280\u884C\u7DCA\u7E2E\u6388\u4FE1\u3001\u8981\u6C42\u63D0\u65E9\u9084\u6B3E\uFF0C\u8CC7\u91D1\u8ABF\u5EA6\u58D3\u529B\u5347\u9AD8\u3002" },
  partners: { pos: "\u5408\u4F5C\u5925\u4F34\u4E3B\u52D5\u5C0B\u6C42\u66F4\u6DF1\u7684\u7D50\u76DF\u3002", neg: "\u5408\u4F5C\u5925\u4F34\u614B\u5EA6\u89C0\u671B\uFF0C\u90E8\u5206\u66AB\u7DE9\u5171\u540C\u8A08\u756B\u3002" },
  regulators: { pos: "\u4E3B\u7BA1\u6A5F\u95DC\u5C0D\u5408\u898F\u8207\u6CBB\u7406\u7D66\u4E88\u6B63\u9762\u8A55\u50F9\u3002", neg: "\u4E3B\u7BA1\u6A5F\u95DC\u95DC\u6CE8\u76F8\u95DC\u722D\u8B70\uFF0C\u555F\u52D5\u67E5\u6838\u6216\u7D04\u8AC7\u3002" },
  public: { pos: "\u793E\u6703\u5927\u773E\u5C0D\u54C1\u724C\u5F62\u8C61\u7D66\u4E88\u80AF\u5B9A\u3002", neg: "\u8F3F\u8AD6\u51FA\u73FE\u8CA0\u9762\u89C0\u611F\uFF0C\u54C1\u724C\u5F62\u8C61\u53D7\u640D\u3002" }
};
function buildReactions(active, names, comments) {
  const score = {};
  for (const a of active) {
    if (a.scale <= 0) continue;
    for (const [id, v] of Object.entries(a.stakeholders || {})) {
      score[id] = (score[id] || 0) + v * a.scale;
    }
  }
  return Object.entries(score).map(([id, sc]) => {
    const tone = sc >= 1.5 ? "positive" : sc <= -1.5 ? "negative" : "neutral";
    const tpl = comments[id];
    const comment = tone === "positive" ? tpl?.pos || "\u614B\u5EA6\u8F49\u70BA\u652F\u6301\u3002" : tone === "negative" ? tpl?.neg || "\u8868\u9054\u7591\u616E\u8207\u53CD\u5F48\u3002" : "\u614B\u5EA6\u89C0\u671B\uFF0C\u8996\u5F8C\u7E8C\u57F7\u884C\u6210\u6548\u6C7A\u5B9A\u7ACB\u5834\u3002";
    return { id, name: names[id] || groupName(id), tone, comment, score: Math.round(sc * 10) / 10 };
  }).sort((a, b) => b.score - a.score);
}
var presidentReactions = (active) => buildReactions(active, stakeholderNames, pComments);
var companyReactions = (active) => buildReactions(active, cNames, cComments);
function presidentNews(s, t, active) {
  const main = active.filter((a) => a.scale > 0).slice().sort((a, b) => b.cost - a.cost)[0];
  const news = [];
  news.push({
    category: "\u982D\u689D",
    headline: main ? `\u653F\u5E9C\u63A8\u52D5\u300C${main.name}\u300D` : "\u653F\u5E9C\u7DAD\u6301\u73FE\u884C\u653F\u7B56\u3001\u6309\u6B65\u8ABF\u65BD\u653F",
    detail: main ? `\u884C\u653F\u5718\u968A\u4ECA\u5E74\u6B63\u5F0F\u555F\u52D5\u300C${main.name}\u300D\uFF0C${main.desc}\u5B98\u65B9\u9810\u4F30\u5C07\u727D\u52D5\u8CA1\u653F\u8207\u76F8\u95DC\u7522\u696D\uFF0C\u653F\u7B56\u7D05\u5229\u8207\u4EE3\u50F9\u9810\u671F\u5728\u672A\u4F86\u6578\u5E74\u9010\u6B65\u514C\u73FE\uFF0C\u5404\u65B9\u95DC\u6CE8\u57F7\u884C\u843D\u5730\u7684\u72C0\u6CC1\u3002` : "\u672C\u5E74\u5EA6\u6C92\u6709\u63A8\u51FA\u91CD\u5927\u65B0\u653F\u7B56\uFF0C\u884C\u653F\u5718\u968A\u5C07\u8CC7\u6E90\u96C6\u4E2D\u5728\u843D\u5BE6\u65E2\u6709\u63AA\u65BD\u8207\u7DAD\u6301\u65E5\u5E38\u904B\u4F5C\uFF0C\u5728\u91CE\u9EE8\u6279\u8A55\u653F\u5E9C\u7F3A\u4E4F\u7A81\u7834\u6027\u4F5C\u70BA\uFF0C\u57F7\u653F\u5718\u968A\u5247\u5F37\u8ABF\u7A69\u5065\u512A\u5148\u3002"
  });
  news.push({
    category: "\u7D93\u6FDF",
    headline: `\u7D93\u6FDF\u6210\u9577 ${s.growth.toFixed(1)}%\u3001\u901A\u81A8 ${s.inflation.toFixed(1)}%\u3001\u5931\u696D ${s.unemployment.toFixed(1)}%`,
    detail: t.deficit > 80 ? `\u4E3B\u8A08\u55AE\u4F4D\u6307\u51FA\uFF0C\u4ECA\u5E74\u8CA1\u653F\u8D64\u5B57\u7D04 ${Math.round(t.deficit)} \u5104\u3001\u653F\u5E9C\u50B5\u52D9\u4F54 GDP \u7D04 ${(t.debtRatio * 100).toFixed(0)}%\uFF0C\u96D6\u7136\u5C31\u696D\u7DAD\u6301\u5728 ${s.unemployment.toFixed(1)}%\uFF0C\u4F46\u8209\u50B5\u7A7A\u9593\u8207\u5229\u606F\u8CA0\u64D4\u5DF2\u6210\u70BA\u8CA1\u7D93\u5708\u95DC\u6CE8\u7126\u9EDE\u3002` : `\u7E3D\u9AD4\u6578\u64DA\u843D\u5728\u53EF\u63A7\u5340\u9593\uFF0CGDP \u6210\u9577 ${s.growth.toFixed(1)}%\u3001\u6D88\u8CBB\u8005\u7269\u50F9\u5E74\u589E ${s.inflation.toFixed(1)}%\u3001\u5931\u696D\u7387 ${s.unemployment.toFixed(1)}%\uFF0C\u8CA1\u653F\u6536\u652F\u5C1A\u5C6C\u5E73\u8861\uFF0C\u5206\u6790\u5E2B\u8A8D\u70BA\u7576\u524D\u8981\u52D9\u662F\u628A\u52D5\u80FD\u8F49\u5316\u70BA\u5BE6\u8CEA\u85AA\u8CC7\u8207\u6295\u8CC7\u3002`
  });
  news.push({
    category: "\u793E\u6703",
    headline: s.housingPrice >= 130 ? "\u9AD8\u623F\u50F9\u6301\u7E8C\u767C\u9175\uFF0C\u5C45\u4F4F\u8B70\u984C\u5347\u6EAB" : s.inequality >= 55 ? "\u8CA7\u5BCC\u5DEE\u8DDD\u6210\u70BA\u793E\u6703\u7126\u9EDE" : "\u793E\u6703\u6C23\u6C1B\u5927\u81F4\u5E73\u7A69",
    detail: s.housingPrice >= 130 ? `\u90FD\u6703\u5340\u623F\u50F9\u6307\u6578\u4F86\u5230 ${s.housingPrice.toFixed(0)}\uFF0C\u79DF\u91D1\u540C\u6B65\u8D70\u9AD8\uFF0C\u9752\u5E74\u8207\u79DF\u5C4B\u65CF\u300C\u8CB7\u4E0D\u8D77\u3001\u79DF\u5F97\u82E6\u300D\u7684\u8072\u91CF\u5728\u7DB2\u8DEF\u8207\u8857\u982D\u540C\u6B65\u5347\u9AD8\uFF1B\u76EE\u524D\u6C11\u610F\u652F\u6301 ${s.approval.toFixed(0)}\u3001\u793E\u6703\u4FE1\u4EFB ${s.socialTrust.toFixed(0)}\uFF0C\u5C45\u4F4F\u653F\u7B56\u88AB\u8996\u70BA\u89C0\u5BDF\u91CD\u9EDE\u3002` : `\u76EE\u524D\u6C11\u610F\u652F\u6301 ${s.approval.toFixed(0)}\u3001\u793E\u6703\u4FE1\u4EFB ${s.socialTrust.toFixed(0)}\uFF0C\u6C11\u773E\u5C0D\u751F\u6D3B\u73FE\u6CC1\u7684\u6EFF\u610F\u5EA6\u5927\u81F4\u7A69\u5B9A\uFF0C\u4E0D\u904E\u5F31\u52E2\u7167\u9867\u8207\u9577\u671F\u4F4E\u85AA\u4ECD\u662F\u6F5B\u5728\u58D3\u529B\uFF0C\u793E\u798F\u5718\u9AD4\u6301\u7E8C\u547C\u7C72\u653F\u5E9C\u9810\u5148\u5E03\u5C40\u3002`
  });
  news.push({
    category: "\u653F\u6CBB",
    headline: t.electionDue ? "\u7E3D\u7D71\u5927\u9078\u767B\u5834\uFF0C\u671D\u91CE\u9032\u5165\u6C7A\u6230\u6642\u523B" : s.opposition > 60 ? "\u5728\u91CE\u9663\u71DF\u8072\u52E2\u4E0A\u63DA\u3001\u76E3\u7763\u529B\u9053\u589E\u5F37" : "\u653F\u5C40\u5927\u81F4\u7A69\u5B9A",
    detail: t.electionDue ? `\u56DB\u5E74\u4EFB\u671F\u5C46\u6EFF\uFF0C\u7E3D\u7D71\u5927\u9078\u6B63\u5F0F\u767B\u5834\u3002\u57F7\u653F\u9EE8\u76EE\u524D\u652F\u6301 ${s.govSupport.toFixed(0)}\u3001\u5728\u91CE\u9663\u71DF ${s.opposition.toFixed(0)}\uFF0C\u9078\u6230\u4E3B\u8EF8\u570D\u7E5E\u7D93\u6FDF\u8868\u73FE\u3001\u623F\u50F9\u8207\u653F\u7B56\u514C\u73FE\u5EA6\uFF0C\u9078\u60C5\u88AB\u8996\u70BA\u5C0D\u57F7\u653F\u6210\u7E3E\u7684\u516C\u6C11\u6295\u7968\u3002` : `\u7ACB\u6CD5\u9662\u9019\u500B\u6703\u671F\u570D\u7E5E\u9810\u7B97\u8207\u653F\u7B56\u653B\u9632\uFF0C\u57F7\u653F\u9EE8\u652F\u6301 ${s.govSupport.toFixed(0)}\u3001\u53CD\u5C0D\u9EE8\u9663\u71DF ${s.opposition.toFixed(0)}\uFF0C${s.opposition > 60 ? "\u5728\u91CE\u9EE8\u5F37\u5316\u8CEA\u8A62\u8207\u8B70\u4E8B\u676F\u845B\uFF0C\u6CD5\u6848\u63A8\u9032\u901F\u5EA6\u653E\u7DE9" : "\u591A\u6578\u6CD5\u6848\u5C1A\u80FD\u5728\u5354\u5546\u5F8C\u904E\u95DC\uFF0C\u653F\u5C40\u7DAD\u6301\u7A69\u5B9A"}\u3002`
  });
  const swan = t.events.find((e) => e.blackSwan);
  news.push({
    category: "\u570B\u969B",
    headline: swan ? swan.title.replace(/^黑天鵝：?/, "") : "\u570B\u969B\u60C5\u52E2\u5927\u81F4\u5E73\u975C\u3001\u4F9B\u61C9\u93C8\u7A69\u5B9A",
    detail: swan ? swan.detail || "\u9019\u8D77\u7A81\u767C\u4E8B\u4EF6\u900F\u904E\u8CBF\u6613\u3001\u80FD\u6E90\u8207\u91D1\u878D\u7BA1\u9053\u50B3\u5C0E\u5230\u570B\u5167\uFF0C\u653F\u5E9C\u5DF2\u53EC\u958B\u8DE8\u90E8\u6703\u6703\u8B70\u8A55\u4F30\u885D\u64CA\uFF0C\u4E26\u627F\u8AFE\u555F\u52D5\u7A69\u5B9A\u63AA\u65BD\uFF0C\u5E02\u5834\u95DC\u6CE8\u5F8C\u7E8C\u662F\u5426\u9032\u4E00\u6B65\u5347\u6EAB\u3002" : `\u4ECA\u5E74\u570B\u969B\u7D93\u8CBF\u8207\u5730\u7DE3\u60C5\u52E2\u5927\u81F4\u5E73\u975C\uFF0C\u80FD\u6E90\u9032\u53E3\u8207\u51FA\u53E3\u8A02\u55AE\u7DAD\u6301\u7A69\u5B9A\uFF0C\u5916\u4EA4\u90E8\u6301\u7E8C\u63A8\u52D5\u96D9\u908A\u7D93\u8CBF\u5408\u4F5C\uFF1B\u5206\u6790\u5E2B\u63D0\u9192\uFF0C\u5168\u7403\u5229\u7387\u8207\u5340\u57DF\u7DCA\u5F35\u4ECD\u53EF\u80FD\u5728\u672A\u4F86\u6578\u5E74\u5F62\u6210\u5916\u90E8\u8B8A\u6578\u3002`
  });
  return news;
}
function companyNews(s, t, active) {
  const main = active.filter((a) => a.scale > 0).slice().sort((a, b) => b.cost - a.cost)[0];
  const news = [];
  news.push({
    category: "\u982D\u689D",
    headline: s.milestone ? s.milestone : main ? `\u516C\u53F8\u63A8\u52D5\u300C${main.name}\u300D` : "\u516C\u53F8\u7A69\u5065\u7D93\u71DF\u3001\u7DAD\u6301\u65E2\u6709\u6B65\u8ABF",
    detail: s.milestone ? `\u4ECA\u5E74\u516C\u53F8\u5BEB\u4E0B\u65B0\u91CC\u7A0B\u7891\uFF1A${s.milestone}\u3002\u5718\u968A\u5C07\u5176\u8996\u70BA\u71DF\u904B\u9081\u5411\u65B0\u968E\u6BB5\u7684\u8A0A\u865F\uFF0C\u5167\u90E8\u58EB\u6C23\u53D7\u5230\u9F13\u821E\uFF0C\u6295\u8CC7\u4EBA\u8207\u5408\u4F5C\u5925\u4F34\u4E5F\u5BC6\u5207\u95DC\u6CE8\u5F8C\u7E8C\u80FD\u5426\u628A\u6C23\u52E2\u8F49\u5316\u70BA\u6301\u7E8C\u7684\u71DF\u6536\u8207\u5E02\u5360\u3002` : main ? `\u7BA1\u7406\u5C64\u4ECA\u5E74\u91CD\u9EDE\u63A8\u52D5\u300C${main.name}\u300D\uFF0C${main.desc}\u9019\u9805\u5E03\u5C40\u7684\u6210\u6548\u9700\u8981\u6642\u9593\u767C\u9175\uFF0C\u77ED\u671F\u5C07\u53CD\u6620\u5728\u6210\u672C\u8207\u54C1\u724C\u9762\uFF0C\u80FD\u5426\u5E36\u4F86\u9577\u671F\u56DE\u5831\uFF0C\u53D6\u6C7A\u65BC\u5F8C\u7E8C\u7684\u57F7\u884C\u8207\u5E02\u5834\u63A5\u53D7\u5EA6\u3002` : "\u4ECA\u5E74\u516C\u53F8\u6C92\u6709\u6FC0\u9032\u7684\u5927\u52D5\u4F5C\uFF0C\u9078\u64C7\u628A\u8CC7\u6E90\u7528\u5728\u7DAD\u6301\u7522\u54C1\u54C1\u8CEA\u8207\u670D\u52D9\u65E2\u6709\u5BA2\u6236\uFF0C\u71DF\u904B\u6B65\u8ABF\u5BE9\u614E\uFF1B\u5728\u5FEB\u901F\u8B8A\u5316\u7684\u7522\u696D\u4E2D\uFF0C\u9019\u7A2E\u300C\u7A69\u300D\u662F\u84C4\u7A4D\u5BE6\u529B\u9084\u662F\u932F\u5931\u6A5F\u6703\uFF0C\u8003\u9A57\u7D93\u71DF\u5718\u968A\u7684\u5224\u65B7\u3002"
  });
  news.push({
    category: "\u8CA1\u52D9",
    headline: `\u5E74\u5EA6\u71DF\u6536 ${Math.round(s.revenue).toLocaleString("zh-TW")} \u842C\u3001${t.profit >= 0 ? "\u7372\u5229" : "\u8667\u640D"} ${Math.abs(Math.round(t.profit)).toLocaleString("zh-TW")} \u842C`,
    detail: t.profit >= 0 ? `\u8CA1\u5831\u986F\u793A\u5168\u5E74\u71DF\u6536\u7D04 ${Math.round(s.revenue).toLocaleString("zh-TW")} \u842C\u3001\u7A05\u5F8C\u640D\u76CA\u70BA\u6B63\uFF0C\u76EE\u524D\u73FE\u91D1\u6C34\u4F4D\u7D04\u53EF\u652F\u61C9 ${t.monthsCash.toFixed(1)} \u500B\u6708\u71DF\u904B\uFF0C\u516C\u53F8\u5177\u5099\u81EA\u6211\u9020\u8840\u80FD\u529B\uFF0C\u7BA1\u7406\u5C64\u958B\u59CB\u601D\u8003\u518D\u6295\u8CC7\u8207\u64F4\u5F35\u7684\u7BC0\u594F\u3002` : `\u5168\u5E74\u71DF\u6536\u7D04 ${Math.round(s.revenue).toLocaleString("zh-TW")} \u842C\uFF0C\u4F46\u5728\u6295\u5165\u8207\u56FA\u5B9A\u6210\u672C\u4E0B\u8667\u640D\u7D04 ${Math.abs(Math.round(t.profit)).toLocaleString("zh-TW")} \u842C\uFF1B\u73FE\u91D1\u5C1A\u53EF\u652F\u61C9 ${t.monthsCash.toFixed(1)} \u500B\u6708\uFF0C${t.monthsCash < 8 ? "\u6295\u8CC7\u4EBA\u63D0\u9192\u61C9\u5118\u901F\u62C9\u9AD8\u71DF\u6536\u6216\u63A7\u5236\u71D2\u9322\u901F\u5EA6" : "\u77ED\u671F\u5167\u4ECD\u6709\u7DE9\u885D\u722D\u53D6\u6210\u9577\u6642\u9593"}\u3002`
  });
  news.push({
    category: "\u5E02\u5834",
    headline: `\u5E02\u5360 ${s.marketShare.toFixed(1)}%\u3001\u54C1\u724C\u529B ${s.brand.toFixed(0)}`,
    detail: s.competitor >= 70 ? `\u5728\u7AF6\u722D\u8005\u5F37\u52E2\u9032\u903C\u4E0B\uFF0C\u516C\u53F8\u76EE\u524D\u53D6\u5F97 ${s.marketShare.toFixed(1)}% \u5E02\u5360\u3001\u54C1\u724C\u529B\u6307\u6A19 ${s.brand.toFixed(0)}\uFF0C\u50F9\u683C\u6230\u8207\u901A\u8DEF\u6436\u596A\u8B93\u53D6\u5F97\u65B0\u5BA2\u7684\u6210\u672C\u5347\u9AD8\uFF0C\u5E02\u5834\u5718\u968A\u6B63\u9762\u81E8\u300C\u9867\u6210\u9577\u6216\u9867\u6BDB\u5229\u300D\u7684\u5169\u96E3\u3002` : `\u516C\u53F8\u5728\u76EE\u6A19\u5E02\u5834\u7AD9\u7A69 ${s.marketShare.toFixed(1)}% \u4EFD\u984D\u3001\u54C1\u724C\u529B\u4F86\u5230 ${s.brand.toFixed(0)}\uFF0C\u5BA2\u6236\u53E3\u7891\u8207\u56DE\u8CFC\u9010\u6B65\u7D2F\u7A4D\uFF1B\u7D93\u71DF\u5C64\u8A8D\u70BA\u6301\u7E8C\u5F37\u5316\u5DEE\u7570\u5316\uFF0C\u624D\u6709\u6A5F\u6703\u5728\u7248\u5716\u4E2D\u6436\u4E0B\u66F4\u5927\u4F4D\u7F6E\u3002`
  });
  news.push({
    category: "\u7522\u696D",
    headline: s.rnd >= 60 ? "\u7814\u767C\u80FD\u91CF\u9818\u5148\u540C\u696D\uFF0C\u65B0\u7522\u54C1\u503C\u5F97\u671F\u5F85" : s.competitor >= 70 ? "\u7522\u696D\u7AF6\u722D\u767D\u71B1\u5316\u3001\u6D17\u724C\u52A0\u5287" : "\u7522\u696D\u666F\u6C23\u5927\u81F4\u7A69\u5B9A",
    detail: s.rnd >= 60 ? `\u516C\u53F8\u7814\u767C\u91CF\u80FD\u6307\u6A19\u9054 ${s.rnd.toFixed(0)}\u3001\u7522\u80FD\uFF0F\u71DF\u904B ${s.production.toFixed(0)}\uFF0C\u591A\u9805\u65B0\u7522\u54C1\u8207\u6280\u8853\u9032\u5165\u6536\u5C3E\u968E\u6BB5\uFF0C\u88AB\u8996\u70BA\u672A\u4F86\u4E00\u5E74\u7684\u6210\u9577\u5F15\u64CE\uFF1B\u4E0D\u904E\u9AD8\u7814\u767C\u4E5F\u610F\u5473\u8457\u6301\u7E8C\u7684\u4EBA\u624D\u8207\u8CC7\u91D1\u6295\u5165\u3002` : `\u7522\u696D\u4ECA\u5E74\u666F\u6C23\u5927\u81F4\u7A69\u5B9A\uFF0C\u516C\u53F8\u7814\u767C\u91CF\u80FD ${s.rnd.toFixed(0)}\u3001\u7522\u80FD\uFF0F\u71DF\u904B ${s.production.toFixed(0)}\uFF0C\u5206\u6790\u5E2B\u5EFA\u8B70\u7559\u610F\u6280\u8853\u5178\u7BC4\u8F49\u79FB\u8207\u65B0\u9032\u5165\u8005\uFF0C\u907F\u514D\u5728\u5E73\u975C\u671F\u932F\u5931\u5E03\u5C40\u4E0B\u4E00\u4EE3\u7522\u54C1\u7684\u6642\u9593\u7A97\u3002`
  });
  const swan = t.events.find((e) => e.blackSwan);
  news.push({
    category: "\u7E3D\u9AD4",
    headline: swan ? swan.title.replace(/^黑天鵝：?/, "") : `\u5718\u968A\u7DAD\u6301 ${s.employees} \u4EBA\u3001\u71DF\u904B\u7BC0\u594F\u7A69\u5B9A`,
    detail: swan ? swan.detail || "\u9019\u8D77\u7522\u696D\u6216\u7E3D\u9AD4\u7A81\u767C\u4E8B\u4EF6\u76F4\u63A5\u5F71\u97FF\u9700\u6C42\u3001\u4F9B\u61C9\u93C8\u6216\u8CC7\u91D1\u9762\uFF0C\u516C\u53F8\u5DF2\u555F\u52D5\u61C9\u8B8A\u5C0F\u7D44\u6AA2\u8996\u73FE\u91D1\u3001\u8A02\u55AE\u8207\u5408\u7D04\uFF0C\u4E26\u8A55\u4F30\u662F\u5426\u8ABF\u6574\u4ECA\u5E74\u7684\u64F4\u5F35\u8207\u5FB5\u624D\u8A08\u756B\u3002" : `\u76EE\u524D\u5718\u968A\u7D04 ${s.employees} \u4EBA\uFF0C\u54E1\u5DE5\u5E73\u5747\u6708\u85AA\u7D04 ${(s.salary / 12).toFixed(1)} \u842C\uFF0C\u4EBA\u624D\u7D50\u69CB\u8207\u71DF\u904B\u7BC0\u594F\u7DAD\u6301\u7A69\u5B9A\uFF1B\u4EBA\u529B\u90E8\u9580\u6301\u7E8C\u95DC\u9375\u8077\u7F3A\u62DB\u52DF\uFF0C\u7522\u80FD\u8207\u670D\u52D9\u91CF\u80FD\u914D\u5408\u696D\u52D9\u6210\u9577\u9010\u6B65\u8ABF\u6574\u3002`
  });
  return news;
}
function presidentRisks(s, t) {
  const r = [];
  if (t.debtRatio > 1.1 || t.deficit > 100) r.push({ level: "high", text: "\u82E5\u8CA1\u653F\u653F\u7B56\u7DAD\u6301\u4E0D\u8B8A\uFF0C\u8D64\u5B57\u8207\u5229\u606F\u652F\u51FA\u53EF\u80FD\u9032\u4E00\u6B65\u64F4\u5927\uFF0C\u5B58\u5728\u50B5\u4FE1\u60E1\u5316\u98A8\u96AA\u3002" });
  else if (t.debtRatio > 0.8 || t.deficit > 50) r.push({ level: "medium", text: "\u8CA1\u653F\u7A7A\u9593\u7E2E\u6E1B\uFF0C\u660E\u5E74\u65B0\u589E\u652F\u51FA\u7684\u9918\u88D5\u53EF\u80FD\u4E0B\u964D\u3002" });
  if (s.inflation >= 4.5) r.push({ level: "high", text: "\u7269\u50F9\u58D3\u529B\u53EF\u80FD\u5EF6\u7E8C\uFF0C\u6C11\u773E\u5BE6\u8CEA\u6240\u5F97\u8207\u6C11\u610F\u652F\u6301\u5B58\u5728\u4E0B\u6ED1\u98A8\u96AA\u3002" });
  else if (s.inflation >= 3.2) r.push({ level: "medium", text: "\u901A\u81A8\u7565\u9AD8\u65BC\u76EE\u6A19\uFF0C\u9808\u7559\u610F\u662F\u5426\u9032\u4E00\u6B65\u5347\u6EAB\u3002" });
  if (s.unemployment >= 6.5) r.push({ level: "medium", text: "\u5C31\u696D\u5E02\u5834\u82E5\u672A\u6539\u5584\uFF0C\u52DE\u5DE5\u6297\u8B70\u8207\u793E\u6703\u4FE1\u4EFB\u4E0B\u964D\u7684\u6A5F\u7387\u5347\u9AD8\u3002" });
  if (s.housingPrice >= 125) r.push({ level: "medium", text: "\u9AD8\u623F\u50F9\u8B70\u984C\u53EF\u80FD\u6301\u7E8C\u767C\u9175\uFF0C\u9752\u5E74\u8207\u79DF\u5C4B\u65CF\u53CD\u61C9\u503C\u5F97\u95DC\u6CE8\u3002" });
  if (s.energy < 48) r.push({ level: "medium", text: "\u80FD\u6E90\u4F9B\u7D66\u9918\u88D5\u504F\u7DCA\uFF0C\u5B58\u5728\u9650\u96FB\u8207\u7522\u696D\u885D\u64CA\u98A8\u96AA\u3002" });
  if (s.approval < 35 && s.opposition > 58) r.push({ level: "high", text: "\u6C11\u610F\u4F4E\u8FF7\u52A0\u4E0A\u5728\u91CE\u8072\u52E2\u5347\u9AD8\uFF0C\u7F77\u514D\u6216\u653F\u6CBB\u52D5\u54E1\u7684\u98A8\u96AA\u63D0\u9AD8\u3002" });
  if (t.electionDue) r.push({ level: "medium", text: "\u660E\u5E74\uFF08\u6216\u672C\u5E74\u5EA6\uFF09\u5C07\u8209\u884C\u7E3D\u7D71\u5927\u9078\uFF0C\u7D93\u6FDF\u611F\u53D7\u8207\u653F\u7B56\u6210\u679C\u5C07\u76F4\u63A5\u5F71\u97FF\u9078\u60C5\u3002" });
  if (s.growth >= 4) r.push({ level: "opportunity", text: "\u7D93\u6FDF\u52D5\u80FD\u5F37\u52C1\uFF0C\u82E5\u5EF6\u7E8C\u7576\u524D\u653F\u7B56\uFF0C\u6295\u8CC7\u8207\u5C31\u696D\u6709\u671B\u9032\u4E00\u6B65\u56DE\u5347\u3002" });
  if (!r.length) r.push({ level: "low", text: "\u76EE\u524D\u5404\u9805\u6307\u6A19\u5927\u81F4\u5E73\u7A69\uFF0C\u4E0B\u4E00\u5E74\u5EA6\u672A\u898B\u660E\u986F\u7CFB\u7D71\u6027\u98A8\u96AA\uFF0C\u4F46\u4ECD\u9808\u7559\u610F\u7A81\u767C\u4E8B\u4EF6\u3002" });
  return r;
}
function companyRisks(s, t) {
  const r = [];
  if (t.monthsCash < 4) r.push({ level: "high", text: "\u73FE\u91D1\u6C34\u4F4D\u504F\u4F4E\uFF0C\u82E5\u71DF\u6536\u672A\u6539\u5584\uFF0C\u660E\u5E74\u53EF\u80FD\u51FA\u73FE\u767C\u4E0D\u51FA\u85AA\u6C34\u7684\u6D41\u52D5\u6027\u98A8\u96AA\u3002" });
  else if (t.monthsCash < 8) r.push({ level: "medium", text: "\u73FE\u91D1\u7DE9\u885D\u4E0D\u7B97\u5BEC\u88D5\uFF0C\u91CD\u5927\u652F\u51FA\u5B9C\u5206\u6279\u3001\u4FDD\u7559\u9031\u8F49\u7A7A\u9593\u3002" });
  if (s.debt > 2 * Math.max(s.revenue, 1)) r.push({ level: "high", text: "\u8CA0\u50B5\u76F8\u5C0D\u71DF\u6536\u504F\u9AD8\uFF0C\u5229\u606F\u8207\u511F\u50B5\u58D3\u529B\u53EF\u80FD\u58D3\u7E2E\u7372\u5229\u3002" });
  if (s.competitor >= 72) r.push({ level: "medium", text: "\u7AF6\u722D\u8005\u4F86\u52E2\u6D36\u6D36\uFF0C\u660E\u5E74\u53EF\u80FD\u9762\u81E8\u50F9\u683C\u6230\u6216\u5BA2\u6236\u6D41\u5931\u3002" });
  if (s.marketShare < 2) r.push({ level: "medium", text: "\u5E02\u5360\u504F\u4F4E\uFF0C\u82E5\u7121\u6CD5\u6253\u958B\u77E5\u540D\u5EA6\uFF0C\u5B58\u5728\u88AB\u908A\u7DE3\u5316\u7684\u98A8\u96AA\u3002" });
  if (s.production < 30 && s.marketShare > 8) r.push({ level: "medium", text: "\u7522\u80FD\u53EF\u80FD\u8FFD\u4E0D\u4E0A\u9700\u6C42\uFF0C\u8A02\u55AE\u7A4D\u58D3\u6703\u50B7\u5BB3\u53E3\u7891\u3002" });
  if (s.rnd < 35) r.push({ level: "low", text: "\u7814\u767C\u6295\u5165\u504F\u4F4E\uFF0C\u9047\u5230\u6280\u8853\u8B8A\u9769\u6642\u53EF\u80FD\u88AB\u5C0D\u624B\u5F4E\u9053\u8D85\u8ECA\u3002" });
  if (s.brand >= 65 && s.rnd >= 55) r.push({ level: "opportunity", text: "\u54C1\u724C\u8207\u7814\u767C\u9AD4\u8CEA\u826F\u597D\uFF0C\u660E\u5E74\u6709\u6A5F\u6703\u63A8\u51FA\u7206\u6B3E\u6216\u9032\u4E00\u6B65\u6436\u5360\u5E02\u5360\u3002" });
  if (!r.length) r.push({ level: "low", text: "\u71DF\u904B\u9AD4\u8CEA\u5927\u81F4\u7A69\u5B9A\uFF0C\u4E0B\u4E00\u5E74\u5EA6\u672A\u898B\u660E\u986F\u7ACB\u5373\u98A8\u96AA\u3002" });
  return r;
}

// src/engine/achievements.ts
var pPred = {
  pa_first_year: (c) => c.year >= 2,
  pa_balanced: (c) => c.balance >= 0,
  pa_miracle: (c) => c.growthStreak >= 3,
  pa_trust: (c) => c.s.socialTrust >= 85,
  pa_recall_win: (c) => c.recallSurvived,
  pa_survivor: (c) => c.hadSwan && !c.s.gameOver,
  pa_debt_cut: (c) => c.s.debt <= c.startDebt * 0.8,
  pa_reelected: (c) => c.term >= 2
};
var cPred = {
  ca_first_revenue: (c) => c.s.revenue >= 1200,
  ca_first_profit: (c) => c.profitStreak >= 1,
  ca_cert: (c) => c.s.brand >= 60,
  ca_overseas: (c) => c.s.region === "regional" || c.s.region === "global",
  ca_survivor: (c) => c.hadSwan && !c.s.gameOver,
  ca_unicorn: (c) => c.s.cash >= 1e4 || !!c.s.ipo && (c.s.stockPrice ?? 0) >= 80,
  ca_leader: (c) => c.s.marketShare >= c.shareCap * 0.8,
  ca_ipo: (c) => !!c.s.ipo
};
function run(pred, c, unlocked) {
  const out = [];
  for (const [id, fn] of Object.entries(pred)) {
    if (!unlocked.includes(id)) {
      try {
        if (fn(c)) out.push(id);
      } catch {
      }
    }
  }
  return out;
}
var evalPresident = (c, unlocked) => run(pPred, c, unlocked);
var evalCompany = (c, unlocked) => run(cPred, c, unlocked);

// src/services/aiService.ts
async function post(path, body) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data) throw new Error(data?.error || "HTTP " + res.status);
  return data;
}
async function narrateTurn(payload) {
  try {
    const data = await post("/api/ai", { task: "narrative", ...payload });
    if (data.ok && data.result) return data.result;
  } catch (e) {
    console.warn("[AI narrative] \u4F7F\u7528\u898F\u5247\u65B0\u805E\uFF1A", e.message);
  }
  return null;
}

// src/store/gameStore.ts
function toActive(def, scale, year) {
  return {
    id: def.id,
    name: def.name,
    desc: def.desc,
    category: def.category,
    cost: def.cost,
    recurring: def.recurring,
    duration: def.duration,
    effects: def.effects,
    stakeholders: def.stakeholders || {},
    scale,
    yearEnacted: year,
    tags: def.tags
  };
}
var currentYear = (s) => (s.mode === "company" ? s.c?.year : s.p?.year) ?? 1;
var useGame = create()(
  persist(
    (set, get) => ({
      mode: null,
      difficulty: "normal",
      started: false,
      p: null,
      c: null,
      active: [],
      extraDecisions: [],
      history: [],
      achievements: [],
      usedSwan: [],
      growthStreak: 0,
      profitStreak: 0,
      lastRecallYear: -9,
      recallSurvived: false,
      codex: [],
      review: null,
      aiBusy: false,
      companySetup: null,
      startPresident: (d) => {
        set({
          mode: "president",
          difficulty: d,
          started: true,
          p: initialPState(d),
          c: null,
          active: [],
          extraDecisions: [],
          history: [],
          achievements: initialAchievements("president"),
          usedSwan: [],
          growthStreak: 0,
          profitStreak: 0,
          lastRecallYear: -9,
          recallSurvived: false,
          codex: [],
          review: null,
          companySetup: null
        });
      },
      startCompany: (d, setup) => {
        const ind = industries.find((x) => x.id === setup.industryId) ?? industries[0];
        const s = initialCState(ind, d);
        s.productName = setup.productName;
        s.headquarters = setup.location;
        s.region = setup.region;
        const ri = regions.find((x) => x.id === setup.region) || regions[0];
        s.revenue = Math.round(s.revenue * ri.revMul);
        s.marketShare = Math.min(s.marketShare, ri.shareCap);
        if (setup.assessment?.adjust) {
          const a = setup.assessment.adjust;
          s.revenue += a.revenue || 0;
          s.marketShare += a.marketShare || 0;
          s.brand += a.brand || 0;
          s.rnd += a.rnd || 0;
          s.investorConfidence += a.investorConfidence || 0;
        }
        s.marketShare = Math.max(0.3, s.marketShare);
        s.brand = Math.max(1, Math.min(100, s.brand));
        s.rnd = Math.max(1, Math.min(100, s.rnd));
        s.investorConfidence = Math.max(1, Math.min(100, s.investorConfidence));
        set({
          mode: "company",
          difficulty: d,
          started: true,
          p: null,
          c: s,
          active: [],
          extraDecisions: [],
          history: [],
          achievements: initialAchievements("company"),
          usedSwan: [],
          growthStreak: 0,
          profitStreak: 0,
          lastRecallYear: -9,
          recallSurvived: false,
          codex: [],
          review: null,
          companySetup: setup
        });
      },
      backHome: () => set({ started: false, mode: null, review: null, p: null, c: null, active: [], history: [] }),
      toMenu: () => set({ started: false, review: null, aiBusy: false }),
      continueGame: () => set({ started: true, review: null }),
      setBucketScale: (id, scale) => {
        const { active, p } = get();
        if (!p) return;
        const year = p.year;
        const existing = active.find((a) => a.id === id);
        if (existing) {
          if (scale <= 0) set({ active: active.filter((a) => a.id !== id) });
          else set({ active: active.map((a) => a.id === id ? { ...a, scale } : a) });
        } else if (scale > 0) {
          const def = budgetBuckets.find((b) => b.id === id);
          if (def) set({ active: [...active, toActive(def, scale, year)] });
        }
      },
      enact: (def, scale) => {
        const st = get();
        const year = currentYear(st);
        if (st.active.some((a) => a.id === def.id)) return { ok: false, error: "\u9019\u9805\u653F\u7B56\u5DF2\u7D93\u5728\u5BE6\u65BD\u4E2D" };
        const act = toActive(def, scale, year);
        set({
          active: [...st.active, act],
          codex: st.codex.includes(def.name) ? st.codex : [...st.codex, def.name]
        });
        return { ok: true };
      },
      removeAction: (id) => {
        const { active } = get();
        set({ active: active.filter((a) => a.id !== id) });
      },
      companyExpandRegion: () => {
        const { c, extraDecisions } = get();
        if (!c || !canExpandRegion(c)) return;
        const nr = nextRegion(c.region);
        if (!nr) return;
        const cost = { national: 800, regional: 2200, global: 5e3 }[nr] || 0;
        const ns = structuredClone(c);
        expandRegion(ns);
        const dec = {
          id: "decision_region_" + uid(),
          name: "\u62D3\u5C55\u696D\u52D9\u5340\u57DF\u81F3" + regionInfo(nr).name,
          desc: "\u6295\u5165\u8CC7\u6E90\u5C07\u71DF\u904B\u7248\u5716\u62D3\u5C55\u5230\u66F4\u5927\u7684\u5E02\u5834\uFF0C\u63D0\u9AD8\u5E02\u5360\u5929\u82B1\u677F",
          category: "\u7B56\u7565",
          cost,
          recurring: 0,
          duration: "instant",
          effects: {},
          stakeholders: { investors: 1, customers: 1 },
          scale: 1,
          yearEnacted: c.year,
          tags: ["\u5340\u57DF\u62D3\u5C55"]
        };
        set({ c: ns, extraDecisions: [...extraDecisions, dec] });
      },
      companyIPO: () => {
        const { c, extraDecisions } = get();
        if (!c || !canIPO(c)) return;
        const ns = structuredClone(c);
        doIPO(ns);
        const dec = {
          id: "decision_ipo_" + uid(),
          name: "\u516C\u53F8\u639B\u724C\u4E0A\u5E02\uFF08IPO\uFF09",
          desc: "\u901A\u904E\u80A1\u7968\u5E02\u5834\u516C\u958B\u52DF\u8CC7\uFF0C\u53D6\u5F97\u5927\u7B46\u8CC7\u91D1\u8207\u5E02\u5834\u95DC\u6CE8",
          category: "\u7B56\u7565",
          cost: 0,
          recurring: 0,
          duration: "instant",
          effects: {},
          stakeholders: { investors: 3 },
          scale: 1,
          yearEnacted: c.year,
          tags: ["\u91CC\u7A0B\u7891"]
        };
        set({ c: ns, extraDecisions: [...extraDecisions, dec] });
      },
      endYear: () => {
        const st = get();
        if (st.mode === "president" && st.p) {
          const pt = computePresidentTurn(
            st.p,
            st.active,
            st.difficulty,
            st.usedSwan,
            st.growthStreak,
            st.lastRecallYear
          );
          const news = presidentNews(pt.state, pt, st.active);
          const risks = presidentRisks(pt.state, pt);
          const reactions = presidentReactions(st.active);
          const review = {
            mode: "president",
            year: st.p.year,
            changes: pt.changes,
            events: pt.events,
            news,
            risks,
            reactions,
            narrative: null,
            deficit: pt.deficit,
            balance: pt.balance,
            totalRevenue: pt.totalRevenue,
            totalSpending: pt.totalSpending,
            debtRatio: pt.debtRatio,
            recallPending: pt.recallPending,
            recallResolved: !pt.recallPending,
            electionDue: pt.electionDue,
            electionResolved: !pt.electionDue,
            nextState: pt.state,
            pt
          };
          set({ review, aiBusy: true });
          void enrichNarrative(set, get, review, pt.state);
        } else if (st.mode === "company" && st.c) {
          const ct = computeCompanyTurn(st.c, st.active, st.difficulty, st.usedSwan);
          const news = companyNews(ct.state, ct, st.active);
          const risks = companyRisks(ct.state, ct);
          const reactions = companyReactions(st.active);
          const review = {
            mode: "company",
            year: st.c.year,
            changes: ct.changes,
            events: ct.events,
            news,
            risks,
            reactions,
            narrative: null,
            monthsCash: ct.monthsCash,
            profit: ct.profit,
            recallPending: false,
            recallResolved: true,
            electionDue: false,
            electionResolved: true,
            nextState: ct.state,
            ct
          };
          set({ review, aiBusy: true });
          void enrichNarrative(set, get, review, ct.state);
        }
      },
      resolveRecallChoice: (choiceId) => {
        const st = get();
        if (!st.review || st.review.mode !== "president") return;
        const ns = structuredClone(st.review.nextState);
        const result = resolveRecall(ns, choiceId);
        const recallEffects = result.effects;
        const contrib = {};
        applyEffects(ns, recallEffects, 1, contrib, "\u7F77\u514D\u61C9\u5C0D\uFF1A" + result.choiceLabel);
        const review = {
          ...st.review,
          nextState: ns,
          recallResolved: true,
          recallRemoved: result.removed,
          events: [...st.review.events, {
            id: uid("ev"),
            year: st.review.year,
            title: result.removed ? "\u7F77\u514D\u6848\u901A\u904E" : "\u7F77\u514D\u6848\u672A\u904E\u95DC",
            detail: result.removed ? `\u4F60\u9078\u64C7\u300C${result.choiceLabel}\u300D\uFF0C\u4F46\u793E\u6703\u58D3\u529B\u672A\u80FD\u5E73\u606F\uFF0C\u7F77\u514D\u6295\u7968\u901A\u904E\uFF0C\u7E3D\u7D71\u88AB\u8FEB\u4E0B\u53F0\u3002` : `\u4F60\u9078\u64C7\u300C${result.choiceLabel}\u300D\uFF0C\u6490\u904E\u7F77\u514D\u5371\u6A5F\uFF08\u5B58\u6D3B\u6A5F\u7387\u7D04 ${result.surviveChance.toFixed(0)}%\uFF09\uFF0C\u4F46\u65BD\u653F\u5143\u6C23\u5927\u50B7\u3002`,
            severity: result.removed ? "crisis" : "risk",
            causedBy: ["\u6C11\u610F\u4F4E\u8FF7"],
            effects: recallEffects
          }]
        };
        if (result.removed) {
          ns.gameOver = true;
          ns.endReason = "\u7F77\u514D\u6210\u529F\uFF1A\u793E\u6703\u4FE1\u4EFB\u8207\u6C11\u610F\u5D29\u76E4\uFF0C\u7E3D\u7D71\u906D\u7F77\u514D\u4E0B\u53F0\u3002";
        } else {
          review.nextState = ns;
        }
        set({ review, recallSurvived: !result.removed, lastRecallYear: st.review.year });
      },
      resolveElectionChoice: (runAgain) => {
        const st = get();
        if (!st.review || st.review.mode !== "president" || !st.p) return;
        const ns = structuredClone(st.review.nextState);
        const term = st.p.term;
        const review = { ...st.review, rivalName: "", electionRan: false };
        if (term >= 2) {
          ns.gameOver = true;
          ns.endReason = `\u4F60\u5B8C\u6210\u4E86\u61B2\u6CD5\u6240\u5B9A\u7684\u5169\u4EFB\u7E3D\u7D71\u4EFB\u671F\uFF08\u5171 ${term * 4} \u5E74\uFF09\uFF0C\u5728\u548C\u5E73\u4EA4\u63A5\u4E2D\u5378\u4E0B\u7E3D\u7D71\u8077\u52D9\u3002`;
          review.electionResolved = true;
          review.electionWon = false;
          review.electionRan = false;
          review.events = [...review.events, {
            id: uid("ev"),
            year: review.year,
            title: "\u5169\u4EFB\u4EFB\u671F\u5C46\u6EFF\u3001\u548C\u5E73\u5378\u4EFB",
            detail: ns.endReason,
            severity: "good",
            causedBy: ["\u7E3D\u7D71\u5927\u9078"]
          }];
          review.nextState = ns;
          set({ review });
          return;
        }
        const r = resolveElection(ns, term, runAgain);
        review.rivalName = r.rivalName;
        review.electionRan = r.ran;
        if (!runAgain) {
          ns.gameOver = true;
          ns.endReason = `\u4F60\u9078\u64C7\u4E0D\u518D\u7AF6\u9078\u3001\u548C\u5E73\u5378\u4EFB\uFF0C\u5728\u7B2C ${term} \u4EFB\u7D50\u675F\u5F8C\u4EA4\u68D2\u3002`;
          review.electionResolved = true;
          review.electionWon = false;
        } else if (r.won) {
          ns.term = term + 1;
          ns.approval = Math.min(95, ns.approval + 3);
          review.electionResolved = true;
          review.electionWon = true;
          review.playerVotes = r.playerVotes;
          review.rivalVotes = r.rivalVotes;
          review.events = [...review.events, {
            id: uid("ev"),
            year: review.year,
            title: "\u9023\u4EFB\u6210\u529F",
            detail: `\u7E3D\u7D71\u5927\u9078\u7531\u4F60\u4EE5 ${r.playerVotes}% \u5C0D ${r.rivalVotes}% \u64CA\u6557\u5C0D\u624B ${r.rivalName}\uFF0C\u8D0F\u5F97\u4E0B\u4E00\u4EFB\u671F\u3002`,
            severity: "good",
            causedBy: ["\u7E3D\u7D71\u5927\u9078"]
          }];
        } else {
          ns.gameOver = true;
          ns.endReason = `\u7E3D\u7D71\u5927\u9078\u843D\u6557\uFF1A\u5C0D\u624B ${r.rivalName} \u4EE5 ${r.rivalVotes}% \u5C0D ${r.playerVotes}% \u52DD\u51FA\uFF0C\u4F60\u7684\u653F\u5E9C\u7D50\u675F\u3002`;
          review.electionResolved = true;
          review.electionWon = false;
          review.playerVotes = r.playerVotes;
          review.rivalVotes = r.rivalVotes;
          review.events = [...review.events, {
            id: uid("ev"),
            year: review.year,
            title: "\u7AF6\u9078\u9023\u4EFB\u5931\u5229",
            detail: `\u5C0D\u624B ${r.rivalName} \u4EE5 ${r.rivalVotes}% \u5C0D ${r.playerVotes}% \u52DD\u51FA\uFF0C\u653F\u9EE8\u8F2A\u66FF\u3002`,
            severity: "crisis",
            causedBy: ["\u7E3D\u7D71\u5927\u9078"]
          }];
        }
        review.nextState = ns;
        set({ review });
      },
      confirmYear: () => {
        const st = get();
        const rv = st.review;
        if (!rv) return;
        if (rv.recallPending && !rv.recallResolved) return;
        if (rv.electionDue && !rv.electionResolved) return;
        const year = rv.year;
        const enacted = [
          ...st.active.filter((a) => a.yearEnacted === year),
          ...st.extraDecisions.filter((a) => a.yearEnacted === year)
        ];
        const record = {
          year,
          snapshot: structuredClone(rv.nextState),
          actionsEnacted: enacted,
          events: rv.events,
          changes: rv.changes,
          news: rv.news,
          risks: rv.risks,
          reactions: rv.reactions
        };
        const history = [...st.history, record];
        const gameOver = rv.nextState.gameOver || rv.nextState.gameOver;
        let achievements = st.achievements;
        if (rv.mode === "president") {
          const ns = rv.nextState;
          ns.year = year + 1;
          const unlocked = evalPresident(
            { s: ns, balance: rv.balance || 0, term: ns.term, growthStreak: rv.pt?.growthStreak ?? st.growthStreak, year: ns.year, recallSurvived: st.recallSurvived, hadSwan: (rv.pt?.usedSwan || st.usedSwan).length > 0, startDebt: initialPState(st.difficulty).debt },
            achievements.filter((a) => a.unlocked).map((a) => a.id)
          );
          achievements = achievements.map((a) => unlocked.includes(a.id) ? { ...a, unlocked: true } : a);
          set({
            p: ns,
            history,
            active: st.active.filter((a) => a.duration !== "instant"),
            extraDecisions: [],
            usedSwan: rv.pt?.usedSwan || st.usedSwan,
            growthStreak: rv.pt?.growthStreak ?? 0,
            achievements,
            review: null,
            aiBusy: false
          });
        } else {
          const ns = rv.nextState;
          ns.year = year + 1;
          const profitStreak = (rv.profit ?? 0) > 0 ? st.profitStreak + 1 : 0;
          const unlocked = evalCompany(
            { s: ns, profitStreak, hadSwan: (rv.ct?.usedSwan || st.usedSwan).length > 0, shareCap: regionInfo(ns.region).shareCap },
            achievements.filter((a) => a.unlocked).map((a) => a.id)
          );
          achievements = achievements.map((a) => unlocked.includes(a.id) ? { ...a, unlocked: true } : a);
          set({
            c: ns,
            history,
            active: st.active.filter((a) => a.duration !== "instant"),
            extraDecisions: [],
            usedSwan: rv.ct?.usedSwan || st.usedSwan,
            profitStreak,
            achievements,
            review: null,
            aiBusy: false
          });
        }
      },
      dismissReview: () => set({ review: null, aiBusy: false })
    }),
    {
      name: "policy-life-save-v1",
      partialize: (s) => ({
        mode: s.mode,
        difficulty: s.difficulty,
        started: s.started,
        p: s.p,
        c: s.c,
        active: s.active,
        extraDecisions: s.extraDecisions,
        history: s.history,
        achievements: s.achievements,
        usedSwan: s.usedSwan,
        growthStreak: s.growthStreak,
        profitStreak: s.profitStreak,
        lastRecallYear: s.lastRecallYear,
        recallSurvived: s.recallSurvived,
        codex: s.codex,
        companySetup: s.companySetup
      })
    }
  )
);
async function enrichNarrative(set, get, review, state) {
  try {
    const st = get();
    const stateSummary = summarizeState(st.mode || "president", state);
    const actions = [...st.active, ...st.extraDecisions].filter((a) => a.yearEnacted === review.year).map((a) => a.name + (a.scale !== 1 ? "(\u5F37\u5EA6" + a.scale + ")" : "")).join("\u3001") || "\u7121\u91CD\u5927\u65B0\u6C7A\u7B56";
    const events = review.events.map((e) => e.title + "\uFF1A" + e.detail).join("\n");
    const narrative = await narrateTurn({
      mode: st.mode,
      year: review.year,
      stateSummary,
      actions,
      events,
      ruleNews: review.news,
      ruleRisks: review.risks
    });
    if (narrative && get().review?.year === review.year) {
      const rv0 = get().review;
      let mergedNews = rv0.news;
      const aiStories = Array.isArray(narrative.news) ? narrative.news.filter((n) => n && typeof n.headline === "string" && n.headline.trim()).map((n) => ({
        category: (n.category || "\u7D9C\u5408").toString().trim(),
        headline: n.headline.toString().trim(),
        detail: typeof n.detail === "string" && n.detail.trim() ? n.detail.trim() : void 0
      })) : [];
      if (aiStories.length >= 3) {
        const lead = {
          category: "\u982D\u689D",
          headline: (narrative.headline || rv0.news[0]?.headline || "\u5E74\u5EA6\u7E3D\u7D50").trim(),
          detail: (narrative.subheadline || "").trim() || rv0.news[0]?.detail
        };
        mergedNews = [lead, ...aiStories].slice(0, 6);
      } else if (aiStories.length > 0) {
        const merged = [rv0.news[0], ...aiStories];
        for (const rn of rv0.news.slice(1)) {
          if (merged.length >= 6) break;
          if (!aiStories.some((a) => a.headline === rn.headline)) merged.push(rn);
        }
        mergedNews = merged;
      }
      set({ review: { ...rv0, news: mergedNews, narrative }, aiBusy: false });
    } else {
      set({ aiBusy: false });
    }
  } catch {
    set({ aiBusy: false });
  }
}
function summarizeState(mode, s) {
  if (mode === "company") {
    const c = s;
    return `\u7B2C${c.year}\u5E74\uFF0C\u7522\u696D${c.industry}\uFF0C\u7522\u54C1\u300C${c.productName}\u300D\uFF0C\u7E3D\u90E8${c.headquarters}\uFF0C\u5340\u57DF${regionInfo(c.region).name}\uFF1B\u71DF\u6536${Math.round(c.revenue)}\u842C\u3001\u640D\u76CA${Math.round(c.profit)}\u3001\u73FE\u91D1${Math.round(c.cash)}\u842C\u3001\u8CA0\u50B5${Math.round(c.debt)}\u842C\u3001\u54E1\u5DE5${c.employees}\u4EBA\u3001\u5E02\u5360${c.marketShare.toFixed(1)}%\u3001\u54C1\u724C${c.brand.toFixed(0)}\u3001\u7814\u767C${c.rnd.toFixed(0)}\u3001\u6295\u8CC7\u4EBA\u4FE1\u5FC3${c.investorConfidence.toFixed(0)}\u3001\u7AF6\u722D\u5F37\u5EA6${c.competitor.toFixed(0)}`;
  }
  const p = s;
  return `\u7B2C${p.year}\u5E74\u7B2C${p.term}\u4EFB\uFF1BGDP${Math.round(p.gdp)}\u5104\u3001\u6210\u9577${p.growth.toFixed(1)}%\u3001\u901A\u81A8${p.inflation.toFixed(1)}%\u3001\u5931\u696D${p.unemployment.toFixed(1)}%\u3001\u50B5\u52D9${Math.round(p.debt)}\u5104\u3001\u5229\u7387${p.interestRate.toFixed(1)}%\u3001\u6536\u5165${Math.round(p.revenue)}\u5104\u3001\u652F\u51FA${Math.round(p.spending)}\u5104\u3001\u53EF\u652F\u914D${Math.round(p.discretionary)}\u5104\u3001\u6C11\u610F${p.approval.toFixed(0)}\u3001\u793E\u6703\u4FE1\u4EFB${p.socialTrust.toFixed(0)}\u3001\u653F\u6CBB\u7A69\u5B9A${p.politicalStability.toFixed(0)}\u3001\u53CD\u5C0D\u9EE8${p.opposition.toFixed(0)}\u3001\u623F\u50F9\u6307\u6578${p.housingPrice.toFixed(0)}`;
}

// scripts/store-smoke.ts
var failures = 0;
function check(name, cond, extra = "") {
  if (cond) console.log("  PASS  " + name + (extra ? "  (" + extra + ")" : ""));
  else {
    console.error("  FAIL  " + name + (extra ? "  (" + extra + ")" : ""));
    failures++;
  }
}
var G = () => useGame.getState();
var findP = (id) => presidentPolicies.find((p) => p.id === id);
var findC = (id) => companyActions.find((p) => p.id === id);
Math.random = () => 0.9;
console.log("\n[\u7E3D\u7D71] \u958B\u5C40 \u2192 \u9810\u7B97/\u653F\u7B56 \u2192 \u7D50\u7B97 \u2192 \u9032\u6B21\u5E74 \u2192 \u7B2C4\u5E74\u9023\u4EFB \u2192 \u7B2C8\u5E74\u5C46\u6EFF");
{
  G().startPresident("normal");
  check("\u958B\u5C40\u5F8C\u5728\u7B2C 1 \u5E74\u3001\u7B2C\u4E00\u4EFB", G().p.year === 1 && G().p.term === 1, "year=" + G().p.year);
  G().setBucketScale(budgetBuckets[0].id, 1.5);
  const r1 = G().enact(findP("p_minwage_up"), 1);
  const r2 = G().enact(findP("p_public_jobs"), 1);
  check("\u653F\u7B56\u53EF\u6210\u529F\u5BE6\u65BD", r1.ok && r2.ok);
  const dup = G().enact(findP("p_minwage_up"), 1);
  check("\u91CD\u8907\u653F\u7B56\u88AB\u64CB\u4E0B", !dup.ok && !!dup.error, dup.error || "");
  check("active \u5DF2\u542B\u9810\u7B97\u6876\u8207\u5169\u9805\u653F\u7B56", G().active.length === 3, String(G().active.length));
  const electionYears = [];
  for (let y = 1; y <= 8; y++) {
    G().endYear();
    const rv = G().review;
    check(`\u7B2C ${y} \u5E74 endYear \u7522\u751F\u7D50\u7B97`, !!rv && rv.year === y && rv.news.length > 0 && rv.changes.length >= 0, `\u4E8B\u4EF6${rv?.events.length} \u65B0\u805E${rv?.news.length}`);
    if (rv?.recallPending && !rv.recallResolved) G().resolveRecallChoice("reform");
    if (rv?.electionDue && !rv.electionResolved) {
      electionYears.push(y);
      G().resolveElectionChoice(G().p.term >= 2 ? false : true);
    }
    const beforeYear = G().p.year;
    const blockedEarly = G().review?.recallPending && !G().review?.recallResolved || G().review?.electionDue && !G().review?.electionResolved;
    check(`\u7B2C ${y} \u5E74\u672A\u8655\u7406\u7F77\u514D/\u9078\u8209\u6642\u6709\u88AB\u64CB\u95DC`, blockedEarly === false);
    G().confirmYear();
    if (y === 1) check("\u2605 \u7D50\u7B97\u5F8C\u771F\u7684\u9032\u5165\u7B2C 2 \u5E74\uFF08\u6B77\u53F2 bug \u56DE\u6B78\u6E2C\u8A66\uFF09", G().p.year === 2 && G().review === null, "year=" + G().p.year);
    if (y !== 1) check(`\u7B2C ${y} \u5E74\u7D50\u7B97\u5F8C\u9032\u5165\u7B2C ${y + 1} \u5E74`, G().p.year === y + 1, "year=" + G().p.year);
    check(`\u7B2C ${y} \u5E74\u5DF2\u5BEB\u5165\u6B77\u53F2`, G().history.length === y, "history=" + G().history.length);
    if (G().p.gameOver) {
      check(`\u904A\u6232\u5728\u7B2C ${y} \u5E74\u7D50\u675F\uFF08\u61C9\u70BA\u7B2C 8 \u5E74\u5C46\u6EFF\uFF09`, y === 8, "endReason=" + G().p.endReason);
      break;
    }
  }
  check("\u7B2C 4\u30018 \u5E74\u90FD\u89F8\u767C\u7E3D\u7D71\u5927\u9078", electionYears.includes(4) && electionYears.includes(8), JSON.stringify(electionYears));
  check("\u7B2C\u4E8C\u4EFB term=2", G().p.term === 2, "term=" + G().p.term);
  check("8 \u5E74\u5F8C\u56E0\u5169\u4EFB\u5C46\u6EFF\u7D50\u675F", G().p.gameOver === true && G().history.length === 8, G().p.endReason || "");
}
console.log("\n[\u7E3D\u7D71] \u8D85\u652F\u4ECD\u53EF\u7D50\u7B97\uFF08\u8D64\u5B57\u2192\u8209\u50B5\uFF09\uFF0C\u4E0D\u88AB\u7CFB\u7D71\u64CB\u6B7B");
{
  G().startPresident("hard");
  for (const b of budgetBuckets) G().setBucketScale(b.id, 3);
  G().enact(findP("p_cash_handout"), 2);
  G().endYear();
  const rv = G().review;
  check("\u8D85\u652F\u5C40\u4ECD\u80FD\u5B8C\u6210\u7D50\u7B97\uFF08\u4E0D\u88AB\u963B\u6B62\uFF09", !!rv);
  check("\u56B4\u91CD\u8D85\u652F\u7522\u751F\u8D64\u5B57\u4E26\u589E\u50B5", rv.deficit > 0 && rv.nextState && rv.nextState.debt > 3e3, `\u8D64\u5B57${Math.round(rv.deficit)} \u50B5${Math.round(rv.nextState.debt)}`);
  G().confirmYear();
  check("\u8D85\u652F\u5F8C\u4ECD\u80FD\u9032\u5165\u4E0B\u4E00\u5E74", G().p.year === 2);
}
console.log("\n[\u4F01\u696D] \u81EA\u8A02\u958B\u5C40 \u2192 \u6C7A\u7B56 \u2192 \u7D50\u7B97 \u2192 \u9032\u6B21\u5E74 \u2192 \u91CC\u7A0B\u7891\u6309\u9215\u4E0D\u8AA4\u89F8\u767C");
{
  G().startCompany("normal", { industryId: industries[0].id, location: "\u53F0\u5317", region: "local", productName: "\u6771\u5357\u4E9E\u79FB\u5DE5\u532F\u6B3E App", assessment: null });
  check("\u516C\u53F8\u958B\u5C40\u5728\u7B2C 1 \u5E74\u3001\u7522\u54C1\u540D\u7A31\u5E36\u5165", G().c.year === 1 && G().c.productName === "\u6771\u5357\u4E9E\u79FB\u5DE5\u532F\u6B3E App");
  check("\u521D\u59CB\u672A\u4E0A\u5E02", G().c.ipo === false);
  const a = G().enact(findC("c_marketing"), 1);
  const b = G().enact(findC("c_supplychain"), 1);
  check("\u4F01\u696D\u6C7A\u7B56\u53EF\u5BE6\u65BD", a.ok && b.ok);
  const c0 = JSON.stringify(G().c);
  G().companyExpandRegion();
  G().companyIPO();
  check("\u672A\u9054\u9580\u6ABB\u6642\u62D3\u5C55/IPO \u4E0D\u6703\u4E82\u6539\u72C0\u614B", JSON.stringify(G().c) === c0);
  for (let y = 1; y <= 4; y++) {
    G().endYear();
    check(`\u4F01\u696D\u7B2C ${y} \u5E74\u6709\u7D50\u7B97\u8207\u65B0\u805E`, !!G().review && G().review.mode === "company" && G().review.news.length > 0);
    G().confirmYear();
    check(`\u4F01\u696D\u7B2C ${y} \u5E74\u5F8C\u9032\u5165\u7B2C ${y + 1} \u5E74`, G().c.year === y + 1, "year=" + G().c.year);
    if (G().c.gameOver) break;
  }
  check("\u4F01\u696D\u56DB\u5E74\u6B77\u53F2\u5DF2\u5BEB\u5165", G().history.length === 4, "history=" + G().history.length);
}
console.log("\n[\u9078\u55AE] \u56DE\u4E3B\u9078\u55AE\u4FDD\u7559\u5B58\u6A94\u3001\u53EF\u7E8C\u73A9");
{
  G().toMenu();
  check("toMenu \u5F8C started=false \u4F46\u516C\u53F8\u5B58\u6A94\u9084\u5728", G().started === false && !!G().c && G().c.year === 5);
  G().continueGame();
  check("continueGame \u5F8C\u56DE\u5230\u904A\u6232\u3001\u5E74\u4EFD\u4FDD\u7559", G().started === true && G().c.year === 5);
  G().startPresident("easy");
  check("\u5F9E\u4E3B\u9078\u55AE\u958B\u65B0\u7E3D\u7D71\u5C40\u6703\u91CD\u7F6E\u70BA\u7B2C 1 \u5E74", G().p.year === 1 && G().history.length === 0 && G().active.length === 0);
}
console.log("\n========================================");
if (failures === 0) {
  console.log("ALL GREEN\uFF1A\u72C0\u614B\u5C64\u73A9\u5BB6\u65C5\u7A0B\u7121\u932F\u8AA4");
  process.exit(0);
} else {
  console.error(failures + " \u9805\u6AA2\u67E5\u5931\u6557");
  process.exit(1);
}
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.production.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

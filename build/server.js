require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDomServer = __webpack_require__(5);
  
  var _reactDomServer2 = _interopRequireDefault(_reactDomServer);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _componentsHtml = __webpack_require__(74);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(75);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  var _configJson = __webpack_require__(45);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var server = global.server = (0, _express2['default'])();
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/api/content', __webpack_require__(76));
  
  server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', _configJson2['default'][("production")].clientUri);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  server.get('/fitbit-auth', function (req, res) {
    var scopes = 'activity profile';
    var redirectUri = _configJson2['default'][("production")].clientUri + '/auth';
    var authUri = 'https://www.fitbit.com/oauth2/authorize' + '?client_id=' + process.env.FITBIT_CLIENT_ID + '&response_type=token' + '&scope=' + encodeURIComponent(scopes) + '&redirect_uri=' + encodeURIComponent(redirectUri);
    res.redirect(authUri);
  });
  
  server.get('/api/steam', function callee$0$0(req, res, next) {
    var url, key, joiner, response, data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          url = _configJson2['default'][("production")].steam.apiUri + req.query.path;
  
          for (key in req.query) {
            if (key !== 'path') {
              joiner = url.indexOf('?') > -1 ? '&' : '?';
  
              url = url + joiner + key + '=' + encodeURIComponent(req.query[key]);
            }
          }
          url = url + (url.indexOf('?') > -1 ? '&' : '?') + 'key=' + process.env.STEAM_API_KEY;
          context$1$0.next = 5;
          return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url));
  
        case 5:
          response = context$1$0.sent;
          context$1$0.next = 8;
          return regeneratorRuntime.awrap(response.json());
  
        case 8:
          data = context$1$0.sent;
  
          res.send(data);
  
        case 10:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      var _this2 = this;
  
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((function callee$1$0() {
            var statusCode, data, css, context, html;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  statusCode = 200;
                  data = {
                    title: '', description: '', css: '', body: '', entry: _assets2['default'].main.js
                  };
                  css = [];
                  context = {
                    insertCss: function insertCss(styles) {
                      return css.push(styles._getCss());
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return statusCode = 404;
                    }
                  };
                  context$2$0.next = 6;
                  return regeneratorRuntime.awrap(_routes2['default'].dispatch({
                    path: req.path, query: req.query, context: context
                  }, function (state, component) {
                    data.body = _reactDomServer2['default'].renderToString(component);
                    data.css = css.join('');
                  }));
  
                case 6:
                  html = _reactDomServer2['default'].renderToStaticMarkup(_react2['default'].createElement(_componentsHtml2['default'], data));
  
                  res.status(statusCode).send('<!doctype html>\n' + html);
  
                case 8:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this2);
          })());
  
        case 3:
          context$1$0.next = 8;
          break;
  
        case 5:
          context$1$0.prev = 5;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-core/polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _componentsApp = __webpack_require__(15);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsContentPage = __webpack_require__(39);
  
  var _componentsContentPage2 = _interopRequireDefault(_componentsContentPage);
  
  var _componentsHomePage = __webpack_require__(42);
  
  var _componentsHomePage2 = _interopRequireDefault(_componentsHomePage);
  
  var _componentsNotFoundPage = __webpack_require__(48);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(51);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  var _componentsAuthPage = __webpack_require__(54);
  
  var _componentsAuthPage2 = _interopRequireDefault(_componentsAuthPage);
  
  var _componentsFitbitPage = __webpack_require__(58);
  
  var _componentsFitbitPage2 = _interopRequireDefault(_componentsFitbitPage);
  
  var _componentsLogoutPage = __webpack_require__(71);
  
  var _componentsLogoutPage2 = _interopRequireDefault(_componentsLogoutPage);
  
  var router = new _reactRoutingSrcRouter2['default'](function (on) {
    on('*', function callee$1$0(state, next) {
      var component;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(next());
  
          case 2:
            component = context$2$0.sent;
            return context$2$0.abrupt('return', component && _react2['default'].createElement(
              _componentsApp2['default'],
              { context: state.context },
              component
            ));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsHomePage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/auth', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsAuthPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/fitbit', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsFitbitPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/logout', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsLogoutPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('*', function callee$1$0(state) {
      var response, content;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _coreFetch2['default'])('/api/content?path=' + state.path));
  
          case 2:
            response = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(response.json());
  
          case 5:
            content = context$2$0.sent;
            return context$2$0.abrupt('return', content && _react2['default'].createElement(_componentsContentPage2['default'], content));
  
          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsNotFoundPage2['default'], null)
      ) : _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsErrorPage2['default'], null)
      );
    });
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _Route = __webpack_require__(8);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  var emptyFunction = function emptyFunction() {};
  
  var Router = (function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      _classCallCheck(this, Router);
  
      this.routes = [];
      this.events = Object.create(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
    _createClass(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2['default'](path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(state, cb) {
        var routes, handlers, value, result, done, next;
        return regeneratorRuntime.async(function dispatch$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              next = function next() {
                var _handlers$next;
  
                var _value, _value2, match, handler;
  
                return regeneratorRuntime.async(function next$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        context$3$0.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = _slicedToArray(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        context$3$0.next = 12;
                        break;
                      }
  
                      context$3$0.next = 9;
                      return regeneratorRuntime.awrap(handler(state, next));
  
                    case 9:
                      context$3$0.t0 = context$3$0.sent;
                      context$3$0.next = 15;
                      break;
  
                    case 12:
                      context$3$0.next = 14;
                      return regeneratorRuntime.awrap(handler(state));
  
                    case 14:
                      context$3$0.t0 = context$3$0.sent;
  
                    case 15:
                      return context$3$0.abrupt('return', context$3$0.t0);
  
                    case 16:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, null, this);
              };
  
              if (typeof state === 'string' || state instanceof String) {
                state = { path: state };
              }
              cb = cb || emptyFunction;
              routes = this.routes;
              handlers = regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      context$3$0.prev = 3;
                      _iterator = routes[Symbol.iterator]();
  
                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        context$3$0.next = 38;
                        break;
                      }
  
                      route = _step.value;
                      match = route.match(state.path);
  
                      if (!match) {
                        context$3$0.next = 35;
                        break;
                      }
  
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      context$3$0.prev = 12;
                      _iterator2 = match.route.handlers[Symbol.iterator]();
  
                    case 14:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        context$3$0.next = 21;
                        break;
                      }
  
                      handler = _step2.value;
                      context$3$0.next = 18;
                      return [match, handler];
  
                    case 18:
                      _iteratorNormalCompletion2 = true;
                      context$3$0.next = 14;
                      break;
  
                    case 21:
                      context$3$0.next = 27;
                      break;
  
                    case 23:
                      context$3$0.prev = 23;
                      context$3$0.t0 = context$3$0['catch'](12);
                      _didIteratorError2 = true;
                      _iteratorError2 = context$3$0.t0;
  
                    case 27:
                      context$3$0.prev = 27;
                      context$3$0.prev = 28;
  
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
  
                    case 30:
                      context$3$0.prev = 30;
  
                      if (!_didIteratorError2) {
                        context$3$0.next = 33;
                        break;
                      }
  
                      throw _iteratorError2;
  
                    case 33:
                      return context$3$0.finish(30);
  
                    case 34:
                      return context$3$0.finish(27);
  
                    case 35:
                      _iteratorNormalCompletion = true;
                      context$3$0.next = 5;
                      break;
  
                    case 38:
                      context$3$0.next = 44;
                      break;
  
                    case 40:
                      context$3$0.prev = 40;
                      context$3$0.t1 = context$3$0['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = context$3$0.t1;
  
                    case 44:
                      context$3$0.prev = 44;
                      context$3$0.prev = 45;
  
                      if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                      }
  
                    case 47:
                      context$3$0.prev = 47;
  
                      if (!_didIteratorError) {
                        context$3$0.next = 50;
                        break;
                      }
  
                      throw _iteratorError;
  
                    case 50:
                      return context$3$0.finish(47);
  
                    case 51:
                      return context$3$0.finish(44);
  
                    case 52:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, callee$2$0, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
              })();
              value = undefined, result = undefined, done = false;
  
            case 6:
              if (done) {
                context$2$0.next = 16;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(next());
  
            case 9:
              result = context$2$0.sent;
  
              if (!result) {
                context$2$0.next = 14;
                break;
              }
  
              state.statusCode = 200;
              cb(state, result);
              return context$2$0.abrupt('return');
  
            case 14:
              context$2$0.next = 6;
              break;
  
            case 16:
              if (!this.events.error) {
                context$2$0.next = 32;
                break;
              }
  
              context$2$0.prev = 17;
  
              state.statusCode = 404;
              context$2$0.next = 21;
              return regeneratorRuntime.awrap(this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.')));
  
            case 21:
              result = context$2$0.sent;
  
              cb(state, result);
              context$2$0.next = 32;
              break;
  
            case 25:
              context$2$0.prev = 25;
              context$2$0.t0 = context$2$0['catch'](17);
  
              state.statusCode = 500;
              context$2$0.next = 30;
              return regeneratorRuntime.awrap(this.events.error(state, context$2$0.t0));
  
            case 30:
              result = context$2$0.sent;
  
              cb(state, result);
  
            case 32:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this, [[17, 25]]);
      }
    }]);
  
    return Router;
  })();
  
  exports['default'] = Router;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pathToRegexp = __webpack_require__(9);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(11);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  var Route = (function () {
    function Route(path, handlers) {
      _classCallCheck(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2['default'])(path, this.keys = []);
    }
  
    _createClass(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2['default'](this, path, this.keys, m) : null;
      }
    }]);
  
    return Route;
  })();
  
  exports['default'] = Route;
  module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(10)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var Match = function Match(route, path, keys, match) {
    _classCallCheck(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = Object.create(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports['default'] = Match;
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _nodeFetch = __webpack_require__(13);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(14);
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2['default'])(localUrl(url), options);
  }
  
  exports['default'] = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 14 */
/***/ function(module, exports) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  var googleAnalyticsId = 'UA-XXXXX-X';
  exports.googleAnalyticsId = googleAnalyticsId;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fbjsLibEmptyFunction = __webpack_require__(16);
  
  var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);
  
  var _AppScss = __webpack_require__(17);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _Header = __webpack_require__(21);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Footer = __webpack_require__(36);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var App = (function (_Component) {
    _inherits(App, _Component);
  
    function App() {
      _classCallCheck(this, App);
  
      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _fbjsLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _fbjsLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.removeCss = this.props.context.insertCss(_AppScss2['default']);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2['default'].createElement(
          'div',
          { className: _AppScss2['default'].appContainer },
          _react2['default'].createElement(_Header2['default'], null),
          _react2['default'].createElement(
            'main',
            null,
            this.props.children
          ),
          _react2['default'].createElement(_Footer2['default'], null)
        ) : this.props.children;
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          insertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        }),
        children: _react.PropTypes.element.isRequired,
        error: _react.PropTypes.object
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        insertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })(_react.Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(18);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}[data-tt]{position:relative;box-sizing:border-box}[data-tt]:after,[data-tt]:before{border:none;box-sizing:inherit;display:inline-block;font-size:13px;font-style:normal;font-weight:300;line-height:18px;opacity:0;pointer-events:none;position:absolute;right:50%;text-align:center;text-decoration:none;text-shadow:none;text-transform:none;top:100%;-webkit-transform:translateX(50%);transform:translateX(50%);-webkit-transition:opacity .2s step-start .1s;transition:opacity .2s step-start .1s;visibility:hidden;z-index:1000000}[data-tt]:before{background:#333;border-radius:3px;color:#eee;content:attr(data-tt);margin:10px 0 0;padding:9px 13px;white-space:pre;word-wrap:break-word}[data-tt]:after{border:5px solid transparent;border-bottom-color:#333;content:'';margin:0 0 0 -5px}[data-tt]:hover:after,[data-tt]:hover:before{visibility:visible;opacity:1}.App_tt-n_1Ns:after,.App_tt-n_1Ns:before{top:auto;bottom:100%}.App_tt-e_CK0:after,.App_tt-e_CK0:before,.App_tt-w_3gh:after,.App_tt-w_3gh:before{top:auto;bottom:50%;-webkit-transform:translateY(50%);transform:translateY(50%)}.App_tt-e_CK0:after,.App_tt-e_CK0:before{left:100%;right:auto}.App_tt-w_3gh:after,.App_tt-w_3gh:before{left:auto;right:100%}.App_tt-n_1Ns:before{margin:0 0 10px}.App_tt-e_CK0:before{margin:0 0 0 10px}.App_tt-w_3gh:before{margin:0 10px 0 0}.App_tt-n_1Ns:after{border-color:transparent;border-top-color:#333;margin:0 0 0 5px}.App_tt-e_CK0:after,.App_tt-w_3gh:after{border-color:transparent;margin:5px 0 0}.App_tt-e_CK0:after{border-right-color:#333}.App_tt-w_3gh:after{border-left-color:#333}\r\n\r\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}body{color:#343433;background-color:#fff}.App_appContainer__kC,body{min-height:100vh;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.App_appContainer__kC,body,main{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}main{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}a,a:link,a:visited{color:#4f48ad;text-decoration:none;-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}a:active,a:focus,a:hover{color:#15c8f9}h1,h2{margin-top:0}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.App_browserupgrade_1t4{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports
  exports.locals = {
  	"tt-n": "App_tt-n_1Ns",
  	"tt-e": "App_tt-e_CK0",
  	"tt-w": "App_tt-w_3gh",
  	"appContainer": "App_appContainer__kC",
  	"browserupgrade": "App_browserupgrade_1t4"
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 20 */
/***/ function(module, exports) {

  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  var canUseURL = typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function';
  
  /**
   * Remove style/link elements for specified Module IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] === 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
            if (canUseURL && elem.tagName === 'STYLE' && elem.href) {
              URL.revokeObjectURL(elem.href);
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var _Object$assign = Object.assign({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
  
    try {
  
      for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);
  
        var id = _step2$value[0];
        var css = _step2$value[1];
        var media = _step2$value[2];
        var sourceMap = _step2$value[3];
  
        if (inserted[id]) {
          if (!replace) {
            inserted[id]++;
            continue;
          }
        }
  
        inserted[id] = 1;
  
        var elem = document.getElementById(prefix + id);
        var create = false;
  
        if (!elem) {
          create = true;
  
          if (sourceMap && canUseURL) {
            elem = document.createElement('link');
            elem.setAttribute('rel', 'stylesheet');
          } else {
            elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
          }
  
          elem.id = prefix + id;
  
          if (media) {
            elem.setAttribute('media', media);
          }
        }
  
        if (elem.tagName === 'STYLE') {
          if ('textContent' in elem) {
            elem.textContent = css;
          } else {
            elem.styleSheet.cssText = css;
          }
        } else {
          var blob = new Blob([css + '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'], { type: 'text/css' });
  
          var href = elem.href;
          elem.href = URL.createObjectURL(blob);
  
          if (href) {
            URL.revokeObjectURL(href);
          }
        }
  
        if (create) {
          if (prepend) {
            document.head.insertBefore(elem, document.head.childNodes[0]);
          } else {
            document.head.appendChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  
    return removeCss.bind(null, styles.map(function (x) {
      return x[0];
    }));
  }
  
  module.exports = insertCss;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(22);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(32);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var Header = (function (_Component) {
    _inherits(Header, _Component);
  
    function Header() {
      _classCallCheck(this, _Header);
  
      _get(Object.getPrototypeOf(_Header.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _HeaderScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _HeaderScss2['default'].container },
            _react2['default'].createElement(_Navigation2['default'], { className: _HeaderScss2['default'].nav }),
            _react2['default'].createElement(
              'div',
              { className: _HeaderScss2['default'].banner },
              _react2['default'].createElement(
                'h1',
                { className: _HeaderScss2['default'].bannerTitle },
                _react2['default'].createElement(
                  _Link2['default'],
                  { className: _HeaderScss2['default'].brand, to: '/' },
                  'SteamFit'
                )
              ),
              _react2['default'].createElement(
                'p',
                { className: _HeaderScss2['default'].bannerDesc },
                'Correlate your Steam activity with your Fitbit activity.'
              )
            )
          )
        );
      }
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
    return Header;
  })(_react.Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(23);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Header_root_14I{background:#373277;color:#fff}.Header_container_izf{margin:0 auto;padding:20px 0;max-width:1000px}.Header_brand_1-T,.Header_brand_1-T:link,.Header_brand_1-T:visited{color:#92e5fc}.Header_brand_1-T:active,.Header_brand_1-T:focus,.Header_brand_1-T:hover{color:#61dafb}.Header_brandTxt_162{margin-left:10px}.Header_nav_3wx{float:right;margin-top:6px}.Header_banner_UgC{text-align:center}.Header_bannerTitle_3Qi{margin:0;padding:10px;font-weight:400;font-size:4em;line-height:1em}.Header_bannerDesc_3Ow{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}h1,h2,h3,h4{font-weight:400}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_14I",
  	"container": "Header_container_izf",
  	"brand": "Header_brand_1-T",
  	"brandTxt": "Header_brandTxt_162",
  	"nav": "Header_nav_3wx",
  	"banner": "Header_banner_UgC",
  	"bannerTitle": "Header_bannerTitle_3Qi",
  	"bannerDesc": "Header_bannerDesc_3Ow"
  };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  function withStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
  
    return function (BaseComponent) {
      return (function (_Component) {
        _inherits(StyledComponent, _Component);
  
        function StyledComponent() {
          _classCallCheck(this, StyledComponent);
  
          _get(Object.getPrototypeOf(StyledComponent.prototype), 'constructor', this).apply(this, arguments);
        }
  
        _createClass(StyledComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.removeCss = this.context.insertCss.apply(undefined, styles);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.removeCss();
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(BaseComponent, this.props);
          }
        }], [{
          key: 'contextTypes',
          value: {
            insertCss: _react.PropTypes.func.isRequired
          },
          enumerable: true
        }]);
  
        return StyledComponent;
      })(_react.Component);
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (function (_Component) {
    _inherits(Link, _Component);
  
    function Link() {
      _classCallCheck(this, Link);
  
      _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
  
        var props = _objectWithoutProperties(_props, ['to', 'query']);
  
        return _react2['default'].createElement('a', _extends({ href: _coreLocation2['default'].createHref(to, query), onClick: Link.handleClick.bind(this) }, props));
      }
    }], [{
      key: 'propTypes',
      value: {
        to: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.object,
        state: _react.PropTypes.object,
        onClick: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'handleClick',
      value: function value(event) {
        var allowTransition = true;
        var clickResult = undefined;
  
        if (_this.props && _this.props.onClick) {
          clickResult = _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (clickResult === false || event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          var link = event.currentTarget;
          if (_this.props && _this.props.to) {
            _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])(_this.props.to), {
              state: _this.props && _this.props.state || null
            }));
          } else {
            _coreLocation2['default'].push({
              pathname: link.pathname,
              search: link.search,
              state: _this.props && _this.props.state || null
            });
          }
        }
      },
      enumerable: true
    }]);
  
    return Link;
  })(_react.Component);
  
  exports['default'] = Link;
  module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("history/lib/parsePath");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibExecutionEnvironment = __webpack_require__(28);
  
  var _historyLibCreateBrowserHistory = __webpack_require__(29);
  
  var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
  
  var _historyLibCreateMemoryHistory = __webpack_require__(30);
  
  var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
  
  var _historyLibUseQueries = __webpack_require__(31);
  
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  
  var location = (0, _historyLibUseQueries2['default'])(_fbjsLibExecutionEnvironment.canUseDOM ? _historyLibCreateBrowserHistory2['default'] : _historyLibCreateMemoryHistory2['default'])();
  
  exports['default'] = location;
  module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(33);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _NavigationScss = __webpack_require__(34);
  
  var _NavigationScss2 = _interopRequireDefault(_NavigationScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Navigation = (function (_Component) {
    _inherits(Navigation, _Component);
  
    function Navigation() {
      _classCallCheck(this, _Navigation);
  
      _get(Object.getPrototypeOf(_Navigation.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Navigation, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement('div', { className: (0, _classnames2['default'])(_NavigationScss2['default'].root, this.props.className), role: 'navigation' });
      }
    }], [{
      key: 'propTypes',
      value: {
        className: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Navigation = Navigation;
    Navigation = (0, _decoratorsWithStyles2['default'])(_NavigationScss2['default'])(Navigation) || Navigation;
    return Navigation;
  })(_react.Component);
  
  exports['default'] = Navigation;
  module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(35);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Navigation_link_12k{display:inline-block;padding:3px 8px;text-decoration:none;font-size:1.125em}.Navigation_link_12k,.Navigation_link_12k:active,.Navigation_link_12k:visited{color:hsla(0,0%,100%,.6)}.Navigation_link_12k:hover{color:#fff}.Navigation_highlight_2cu{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15);color:#fff}.Navigation_highlight_2cu:hover{background:rgba(0,0,0,.3)}.Navigation_spacer_2MV{color:hsla(0,0%,100%,.3)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_2Gx",
  	"link": "Navigation_link_12k",
  	"highlight": "Navigation_highlight_2cu",
  	"spacer": "Navigation_spacer_2MV"
  };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(37);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Footer = (function (_Component) {
    _inherits(Footer, _Component);
  
    function Footer() {
      _classCallCheck(this, _Footer);
  
      _get(Object.getPrototypeOf(_Footer.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'footer',
          { className: _FooterScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _FooterScss2['default'].container },
            _react2['default'].createElement(
              'span',
              { className: _FooterScss2['default'].text },
              '© 2016 Sarah Vessels'
            ),
            _react2['default'].createElement(
              'a',
              { className: _FooterScss2['default'].link, href: 'https://github.com/cheshire137/steamfit',
                target: '_blank' },
              'View source'
            )
          )
        );
      }
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    return Footer;
  })(_react.Component);
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(38);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".Footer_root_3dP{background:#333;color:#fff}.Footer_container_26p{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}.Footer_text_tTp{color:hsla(0,0%,100%,.5)}.Footer_spacer_3n7,.Footer_textMuted_1h3{color:hsla(0,0%,100%,.3)}.Footer_link_NoJ,.Footer_text_tTp{padding:2px 5px;font-size:1em}.Footer_link_NoJ,.Footer_link_NoJ:active,.Footer_link_NoJ:visited{color:hsla(0,0%,100%,.6);text-decoration:none}.Footer_link_NoJ:hover{color:#fff}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3dP",
  	"container": "Footer_container_26p",
  	"text": "Footer_text_tTp",
  	"textMuted": "Footer_textMuted_1h3 Footer_text_tTp",
  	"spacer": "Footer_spacer_3n7",
  	"link": "Footer_link_NoJ"
  };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ContentPageScss = __webpack_require__(40);
  
  var _ContentPageScss2 = _interopRequireDefault(_ContentPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var ContentPage = (function (_Component) {
    _inherits(ContentPage, _Component);
  
    function ContentPage() {
      _classCallCheck(this, _ContentPage);
  
      _get(Object.getPrototypeOf(_ContentPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ContentPage, [{
      key: 'render',
      value: function render() {
        this.context.onSetTitle(this.props.title);
        return _react2['default'].createElement(
          'div',
          { className: _ContentPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _ContentPageScss2['default'].container },
            this.props.path === '/' ? null : _react2['default'].createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        path: _react.PropTypes.string.isRequired,
        content: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ContentPage = ContentPage;
    ContentPage = (0, _decoratorsWithStyles2['default'])(_ContentPageScss2['default'])(ContentPage) || ContentPage;
    return ContentPage;
  })(_react.Component);
  
  exports['default'] = ContentPage;
  module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(41);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".ContentPage_container_1JT{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "ContentPage_root_1Kg",
  	"container": "ContentPage_container_1JT"
  };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HomePageScss = __webpack_require__(43);
  
  var _HomePageScss2 = _interopRequireDefault(_HomePageScss);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _configJson = __webpack_require__(45);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  var title = 'Connect with Fitbit';
  
  var HomePage = (function (_Component) {
    _inherits(HomePage, _Component);
  
    function HomePage() {
      _classCallCheck(this, _HomePage);
  
      _get(Object.getPrototypeOf(_HomePage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(HomePage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        var token = _storesLocalStorage2['default'].get('token');
        if (token) {
          _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])('/fitbit')));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var authUri = _configJson2['default'][("production")].serverUri + '/fitbit-auth';
        return _react2['default'].createElement(
          'div',
          { className: _HomePageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _HomePageScss2['default'].container },
            _react2['default'].createElement(
              'p',
              null,
              'Sign in to Fitbit to compare',
              _react2['default'].createElement('br', null),
              'how much you\'ve been ',
              _react2['default'].createElement(
                'em',
                null,
                'gaming'
              ),
              ' with how much you\'ve been ',
              _react2['default'].createElement(
                'em',
                null,
                'walking'
              ),
              '.'
            ),
            _react2['default'].createElement(
              'p',
              null,
              _react2['default'].createElement(
                'a',
                { className: _HomePageScss2['default'].fitbitLink, href: authUri },
                _react2['default'].createElement('img', { src: __webpack_require__(47), width: '16', height: '16', alt: 'Fitbit' }),
                _react2['default'].createElement(
                  'span',
                  null,
                  'Sign in to Fitbit'
                )
              )
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _HomePage = HomePage;
    HomePage = (0, _decoratorsWithStyles2['default'])(_HomePageScss2['default'])(HomePage) || HomePage;
    return HomePage;
  })(_react.Component);
  
  exports['default'] = HomePage;
  module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(44);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".HomePage_root_cbh{width:100%}.HomePage_container_1JI{margin:0 auto;max-width:1000px;text-align:center;font-size:1.4rem}.HomePage_container_1JI em{font-style:normal;color:#0592a7}a.HomePage_fitbitLink_1SW{display:inline-block;margin-bottom:0;padding:10px 16px;font-size:18px;line-height:1.3333333;border-radius:4px;font-weight:400;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;color:#0592a7;background-color:#fff;border-color:#0592a7}a.HomePage_fitbitLink_1SW img{margin-right:6px}a.HomePage_fitbitLink_1SW img,a.HomePage_fitbitLink_1SW span{vertical-align:middle;display:inline-block}a.HomePage_fitbitLink_1SW:active,a.HomePage_fitbitLink_1SW:focus,a.HomePage_fitbitLink_1SW:hover{background-color:#b0f2fd;color:#047d8f}", ""]);
  
  // exports
  exports.locals = {
  	"root": "HomePage_root_cbh",
  	"container": "HomePage_container_1JI",
  	"fitbitLink": "HomePage_fitbitLink_1SW"
  };

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = {
  	"development": {
  		"fitbit": {
  			"apiUri": "https://api.fitbit.com"
  		},
  		"steam": {
  			"apiUri": "http://api.steampowered.com"
  		},
  		"localStorageKey": "steamfit",
  		"serverUri": "http://localhost:5000",
  		"clientUri": "http://localhost:3000"
  	},
  	"production": {
  		"fitbit": {
  			"apiUri": "https://api.fitbit.com"
  		},
  		"steam": {
  			"apiUri": "http://api.steampowered.com"
  		},
  		"localStorageKey": "steamfit",
  		"serverUri": "http://steamfit.herokuapp.com",
  		"clientUri": "http://steamfit.herokuapp.com"
  	}
  };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _configJson = __webpack_require__(45);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var LocalStorage = (function () {
    function LocalStorage() {
      _classCallCheck(this, LocalStorage);
    }
  
    _createClass(LocalStorage, null, [{
      key: 'getJSON',
      value: function getJSON() {
        if (typeof window === 'undefined') {
          return {};
        }
        if (!window.localStorage) {
          console.error('browser does not support local storage');
          return {};
        }
        var appData = window.localStorage.getItem(_configJson2['default'][("production")].localStorageKey) || '{}';
        return JSON.parse(appData);
      }
    }, {
      key: 'get',
      value: function get(key) {
        var appData = this.getJSON();
        return appData[key];
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        var appData = this.getJSON();
        appData[key] = value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(_configJson2['default'][("production")].localStorageKey, JSON.stringify(appData));
        }
      }
    }, {
      key: 'delete',
      value: function _delete(key) {
        var appData = this.getJSON();
        delete appData[key];
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(_configJson2['default'][("production")].localStorageKey, JSON.stringify(appData));
        }
      }
    }]);
  
    return LocalStorage;
  })();
  
  exports['default'] = LocalStorage;
  module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wMS0wMVQxNDowMToxODwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjQuMjwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj41PC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xNjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KXkThnwAAAmVJREFUOBGFUs1rE1EQn9ndJJo0SRVb0xJtvShSC8aPpM1Xlx6s2ypYMQfxWnLw5qEo9KLRP8GrJxEFwZsICvYjTdO0PXjxVDzUgkqxiPnqbnb3Pec1iSSS4oO385vffOzMvJHhgPOQc+n4xLX0uZmZ0OcTwU+wsMA7uWInUnDa6mrQMtk2cM68YAffJJPfO/kqnUjBdX317hQDv+YA0T522P3zIL82XpQ9mcsl6Q4Iw9Ri/uzV5eUzAoeT4VPhcDhBUBJ687Qp67nCGHh8ixaD5zc3NvpM5OuMSYXU/HwAKtZLRFiKRCLRZrCQ7S1weYvVjAVEeb686yiix3xL/7N0t7eIEn6gcVQVxbndmmAfR6PRgVQqJQslFgr1pwCcAseHh4+o5we7BVZV9VAikehrYCUej58UGMfH1cflcuUewYwsy+9s28wCx/duj+dutVzKk4/p9XcnSqXfzziHMUVxjHJu3WIMHvj9vjmJc6wioo7IDU4WSlQF5LrLZTAKrnLAPcMwGPntCRtjzGYMDRFDSXTyAaAWekns78SV6eletTEbTdN8KVXtEj7pdNqhaYkegakSbMTUgwQpzmS2cJo5lRe8VvvoQvuJDvIrymr5TP3O1uxsBiSMUwu3V1ZWvtQj/n0FyQqA5LhE0y5aLqcHdHOUI1qGbXuAs8sAMl1LVPs3QTNRXVKjU9nVi5NrawFB3MjnB5tLFYvF+kdGRi4Q3bb+bUo9S/2rbW662LedRyBJlu+oL/N6aKjWam/i9kVqskLu7vZwCe9T6XalUnlKzI9W8/8xtaNl89cnlnJTNPYDK/0DlQruIu0CDzYAAAAASUVORK5CYII="

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(49);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Page Not Found';
  
  var NotFoundPage = (function (_Component) {
    _inherits(NotFoundPage, _Component);
  
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
  
      _get(Object.getPrototypeOf(_NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })(_react.Component);
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(50);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(52);
  
  var _ErrorPageScss2 = _interopRequireDefault(_ErrorPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Error';
  
  var ErrorPage = (function (_Component) {
    _inherits(ErrorPage, _Component);
  
    function ErrorPage() {
      _classCallCheck(this, _ErrorPage);
  
      _get(Object.getPrototypeOf(_ErrorPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ErrorPage = ErrorPage;
    ErrorPage = (0, _decoratorsWithStyles2['default'])(_ErrorPageScss2['default'])(ErrorPage) || ErrorPage;
    return ErrorPage;
  })(_react.Component);
  
  exports['default'] = ErrorPage;
  module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(53);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _AuthPageScss = __webpack_require__(55);
  
  var _AuthPageScss2 = _interopRequireDefault(_AuthPageScss);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _QueryString = __webpack_require__(57);
  
  var _QueryString2 = _interopRequireDefault(_QueryString);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  var title = 'Authenticating...';
  
  var AuthPage = (function (_Component) {
    _inherits(AuthPage, _Component);
  
    function AuthPage() {
      _classCallCheck(this, _AuthPage);
  
      _get(Object.getPrototypeOf(_AuthPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(AuthPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        _storesLocalStorage2['default'].set('token', _QueryString2['default'].access_token);
        _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])('/fitbit')));
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _AuthPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _AuthPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _AuthPage = AuthPage;
    AuthPage = (0, _decoratorsWithStyles2['default'])(_AuthPageScss2['default'])(AuthPage) || AuthPage;
    return AuthPage;
  })(_react.Component);
  
  exports['default'] = AuthPage;
  module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(56);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".AuthPage_root_1HA{width:100%}.AuthPage_container_3QX{margin:0 auto;max-width:1000px;text-align:center}", ""]);
  
  // exports
  exports.locals = {
  	"root": "AuthPage_root_1HA",
  	"container": "AuthPage_container_3QX"
  };

/***/ },
/* 57 */
/***/ function(module, exports) {

  // Thanks to http://stackoverflow.com/a/979995/38743
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var QueryString = (function () {
    if (typeof window === 'undefined') {
      return {};
    }
    var queryStr = {};
    var query = window.location.hash.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (typeof queryStr[pair[0]] === 'undefined') {
        queryStr[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof queryStr[pair[0]] === 'string') {
        var arr = [queryStr[pair[0]], decodeURIComponent(pair[1])];
        queryStr[pair[0]] = arr;
      } else {
        queryStr[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return queryStr;
  })();
  
  exports['default'] = QueryString;
  module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var _classnames = __webpack_require__(33);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _actionsFitbit = __webpack_require__(61);
  
  var _actionsFitbit2 = _interopRequireDefault(_actionsFitbit);
  
  var _Profile = __webpack_require__(62);
  
  var _Profile2 = _interopRequireDefault(_Profile);
  
  var _SteamInfo = __webpack_require__(63);
  
  var _SteamInfo2 = _interopRequireDefault(_SteamInfo);
  
  var title = 'Your Activity over the Last 2 Weeks';
  
  var FitbitPage = (function (_Component) {
    _inherits(FitbitPage, _Component);
  
    _createClass(FitbitPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function FitbitPage(props, context) {
      _classCallCheck(this, _FitbitPage);
  
      _get(Object.getPrototypeOf(_FitbitPage.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        stepCutoffDate: this.getTwoWeeksAgo()
      };
    }
  
    _createClass(FitbitPage, [{
      key: 'getTwoWeeksAgo',
      value: function getTwoWeeksAgo() {
        var today = new Date();
        var twoWeeksInMs = 60 * 60 * 24 * 7 * 2 * 1000;
        var date = new Date(today.getTime() - twoWeeksInMs);
        date.setHours(0, 0, 0, 0);
        var month = date.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        var day = date.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        return date.getFullYear() + '-' + month + '-' + day;
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this = this;
  
        var token = _storesLocalStorage2['default'].get('token');
        _actionsFitbit2['default'].getProfile(token).then((function (data) {
          _this.setState({ profile: data.user });
        }).bind(this));
        var goalsXhr = _actionsFitbit2['default'].getDailyGoals(token);
        _actionsFitbit2['default'].getActivitySinceDate(token, this.state.stepCutoffDate).then((function (data) {
          var steps = data['activities-steps'];
          goalsXhr.then((function (data) {
            var dailyStepGoal = data.goals.steps;
            _this.setState({ goalSteps: dailyStepGoal * 14,
              steps: _this.sumSteps(steps),
              dailyStepGoal: dailyStepGoal });
          }).bind(_this));
        }).bind(this));
      }
    }, {
      key: 'sumSteps',
      value: function sumSteps(steps) {
        var total = 0;
        for (var i = 0; i < steps.length; i++) {
          total = total + parseInt(steps[i].value, 10);
        }
        return total;
      }
    }, {
      key: 'onSteamGameTimeUpdate',
      value: function onSteamGameTimeUpdate(totalMinutes) {
        this.setState({ totalGameMinutes: totalMinutes });
      }
    }, {
      key: 'onSteamUsernameChange',
      value: function onSteamUsernameChange(username) {
        this.setState({ totalGameMinutes: undefined });
      }
    }, {
      key: 'render',
      value: function render() {
        var haveProfile = typeof this.state.profile === 'object';
        var haveGoals = typeof this.state.goalSteps === 'number' && typeof this.state.steps === 'number';
        var haveGameMinutes = typeof this.state.totalGameMinutes === 'number';
        var metGoal = haveGoals && this.state.steps >= this.state.goalSteps;
        return _react2['default'].createElement(
          'div',
          { className: _FitbitPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _FitbitPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            ),
            haveGoals && haveGameMinutes ? _react2['default'].createElement(
              'p',
              { className: (0, _classnames2['default'])(_FitbitPageScss2['default'].alert, metGoal ? _FitbitPageScss2['default'].alertSuccess : _FitbitPageScss2['default'].alertDanger) },
              metGoal ? this.state.totalGameMinutes > 0 ? _react2['default'].createElement(
                'span',
                null,
                'Keep on gaming, you met your step goal!'
              ) : _react2['default'].createElement(
                'span',
                null,
                'You didn\'t game at all, go play something!'
              ) : this.state.totalGameMinutes > 0 ? _react2['default'].createElement(
                'span',
                null,
                'You should walk more and game less. :('
              ) : _react2['default'].createElement(
                'span',
                null,
                'You should walk more. :('
              )
            ) : '',
            _react2['default'].createElement(
              'div',
              { className: _FitbitPageScss2['default'].row },
              _react2['default'].createElement(
                'div',
                { className: _FitbitPageScss2['default'].leftColumn },
                _react2['default'].createElement(
                  'h2',
                  null,
                  _react2['default'].createElement('img', { className: _FitbitPageScss2['default'].fitbitLogo, src: __webpack_require__(47), width: '16', height: '16', alt: 'Fitbit' }),
                  'Fitbit'
                ),
                haveProfile ? _react2['default'].createElement(_Profile2['default'], _extends({}, this.state.profile, { stepCutoffDate: this.state.stepCutoffDate, steps: this.state.steps, goalSteps: this.state.goalSteps, dailyStepGoal: this.state.dailyStepGoal })) : ''
              ),
              _react2['default'].createElement(
                'div',
                { className: _FitbitPageScss2['default'].rightColumn },
                _react2['default'].createElement(
                  'h2',
                  null,
                  _react2['default'].createElement('img', { className: _FitbitPageScss2['default'].steamLogo, src: __webpack_require__(70), width: '16', height: '16', alt: 'Steam' }),
                  'Steam'
                ),
                _react2['default'].createElement(_SteamInfo2['default'], { onSteamUsernameChange: this.onSteamUsernameChange.bind(this), onSteamGameTimeUpdate: this.onSteamGameTimeUpdate.bind(this) })
              )
            )
          )
        );
      }
    }]);
  
    var _FitbitPage = FitbitPage;
    FitbitPage = (0, _decoratorsWithStyles2['default'])(_FitbitPageScss2['default'])(FitbitPage) || FitbitPage;
    return FitbitPage;
  })(_react.Component);
  
  exports['default'] = FitbitPage;
  module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(60);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".FitbitPage_logoutLink_D24{padding-left:1em;font-weight:700;text-decoration:none;vertical-align:top;display:inline-block}.FitbitPage_fitbitAvatarLink_qdx{display:inline-block;margin-right:1rem}.FitbitPage_fitbitAvatarLink_qdx+.FitbitPage_fitbitData_-zs{display:inline-block;vertical-align:top}.FitbitPage_profile_3Nr .FitbitPage_avatar_3DM{border-radius:10px;display:block;width:100px}.FitbitPage_stepCount_1aB.FitbitPage_metGoal_2x9{color:#3c763d}.FitbitPage_stepCount_1aB.FitbitPage_notMetGoal_2vf{color:#a94442}.FitbitPage_clearSteamUsername_3JO{padding-left:1em;font-weight:700;text-decoration:none;vertical-align:top;display:inline-block}.FitbitPage_totalGameTime_2RK{white-space:nowrap}table tbody td.FitbitPage_tableContainer_1Iq{text-align:left;font-weight:400;padding:0}table tbody td.FitbitPage_tableContainer_1Iq table.FitbitPage_steamGames_2dW tbody tr:first-child td,table tbody td.FitbitPage_tableContainer_1Iq table.FitbitPage_steamGames_2dW tbody tr:first-child th{border-top:none}table tbody td.FitbitPage_tableContainer_1Iq table.FitbitPage_steamGames_2dW tbody td,table tbody td.FitbitPage_tableContainer_1Iq table.FitbitPage_steamGames_2dW tbody th{vertical-align:middle}.FitbitPage_gameTimeUnits_KDI{padding-left:.3em}label{display:inline-block;max-width:100%;margin-bottom:5px;font-weight:700}input[type=text]{display:block;width:100%;height:1.4rem;padding:.3em .6em;font-size:1.1rem;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:2px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}input[type=text]:focus{border-color:#66afe9;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}p.FitbitPage_helpBlock_3gE{display:block;margin-top:5px;margin-bottom:10px;color:#737373}.FitbitPage_steamGame_1ti .FitbitPage_gameIcon_2TJ{border-radius:4px;width:32px}.FitbitPage_steamGame_1ti .FitbitPage_gameMinutes_nt1{white-space:nowrap}.FitbitPage_root_kP5{width:100%}.FitbitPage_alert_2jF{padding:15px;margin-bottom:20px;border:1px solid transparent;border-radius:4px}.FitbitPage_alert_2jF.FitbitPage_alertSuccess_15e{color:#3c763d;background-color:#dff0d8;border-color:#d6e9c6}.FitbitPage_alert_2jF.FitbitPage_alertDanger_2v5{color:#a94442;background-color:#f2dede;border-color:#ebccd1}.FitbitPage_fitbitLogo_Ks9,.FitbitPage_steamLogo_6l-{margin-right:6px}.FitbitPage_fitbitLogo_Ks9,.FitbitPage_fitbitLogo_Ks9+span,.FitbitPage_steamLogo_6l-,.FitbitPage_steamLogo_6l-+span{display:inline-block;vertical-align:middle}table{border-collapse:collapse;border-spacing:0;background-color:transparent;width:100%;max-width:100%}table thead th{font-weight:700;vertical-align:bottom;text-align:left;padding:6px;line-height:1.42857143}table thead th a{text-decoration:none}table tbody td,table tbody th{vertical-align:top;padding:6px;line-height:1.42857143;border-top:1px solid #ddd}table tbody th{font-weight:400;text-align:left;white-space:nowrap}table tbody td{font-weight:700;text-align:right}.FitbitPage_container_3xs{padding:0 0 40px;max-width:1000px;margin:0 auto}.FitbitPage_row_flb{margin-right:-15px;margin-left:-15px;box-sizing:border-box}.FitbitPage_row_flb:after,.FitbitPage_row_flb:before{box-sizing:border-box;display:table;content:\" \"}.FitbitPage_row_flb:after{clear:both}.FitbitPage_row_flb .FitbitPage_leftColumn_2my,.FitbitPage_row_flb .FitbitPage_rightColumn_ncW{position:relative;min-height:1px;padding-right:15px;padding-left:15px}@media (min-width:992px){.FitbitPage_row_flb .FitbitPage_leftColumn_2my,.FitbitPage_row_flb .FitbitPage_rightColumn_ncW{width:47%;float:left}}", ""]);
  
  // exports
  exports.locals = {
  	"logoutLink": "FitbitPage_logoutLink_D24",
  	"fitbitLink": "FitbitPage_fitbitLink_3LD",
  	"fitbitAvatarLink": "FitbitPage_fitbitAvatarLink_qdx",
  	"fitbitData": "FitbitPage_fitbitData_-zs",
  	"profile": "FitbitPage_profile_3Nr",
  	"avatar": "FitbitPage_avatar_3DM",
  	"steps": "FitbitPage_steps_Bmy",
  	"stepCount": "FitbitPage_stepCount_1aB",
  	"metGoal": "FitbitPage_metGoal_2x9",
  	"notMetGoal": "FitbitPage_notMetGoal_2vf",
  	"goalSteps": "FitbitPage_goalSteps_2fo",
  	"steamUsername": "FitbitPage_steamUsername_Mzj",
  	"clearSteamUsername": "FitbitPage_clearSteamUsername_3JO",
  	"totalGameTime": "FitbitPage_totalGameTime_2RK",
  	"tableContainer": "FitbitPage_tableContainer_1Iq",
  	"steamGames": "FitbitPage_steamGames_2dW",
  	"gameTimeUnits": "FitbitPage_gameTimeUnits_KDI",
  	"helpBlock": "FitbitPage_helpBlock_3gE",
  	"steamGame": "FitbitPage_steamGame_1ti",
  	"gameName": "FitbitPage_gameName_2D8",
  	"gameIcon": "FitbitPage_gameIcon_2TJ",
  	"gameMinutes": "FitbitPage_gameMinutes_nt1",
  	"root": "FitbitPage_root_kP5",
  	"alert": "FitbitPage_alert_2jF",
  	"alertSuccess": "FitbitPage_alertSuccess_15e",
  	"alertDanger": "FitbitPage_alertDanger_2v5",
  	"fitbitLogo": "FitbitPage_fitbitLogo_Ks9",
  	"steamLogo": "FitbitPage_steamLogo_6l-",
  	"container": "FitbitPage_container_3xs",
  	"row": "FitbitPage_row_flb",
  	"leftColumn": "FitbitPage_leftColumn_2my",
  	"rightColumn": "FitbitPage_rightColumn_ncW"
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _configJson = __webpack_require__(45);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var Fitbit = (function () {
    function Fitbit() {
      _classCallCheck(this, Fitbit);
    }
  
    _createClass(Fitbit, null, [{
      key: 'getProfile',
      value: function getProfile(token) {
        return regeneratorRuntime.async(function getProfile$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest(token, '/1/user/-/profile.json'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getActivitySinceDate',
      value: function getActivitySinceDate(token, dateStr) {
        return regeneratorRuntime.async(function getActivitySinceDate$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest(token, '/1/user/-/activities/steps/date/' + 'today/' + dateStr + '.json'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getDailyGoals',
      value: function getDailyGoals(token) {
        return regeneratorRuntime.async(function getDailyGoals$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest(token, '/1/user/-/activities/goals/daily.json'));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest(token, path) {
        var url, response, data;
        return regeneratorRuntime.async(function makeRequest$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              url = _configJson2['default'][("production")].fitbit.apiUri + path;
              context$2$0.next = 3;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url, {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
              }));
  
            case 3:
              response = context$2$0.sent;
              context$2$0.next = 6;
              return regeneratorRuntime.awrap(response.json());
  
            case 6:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 8:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Fitbit;
  })();
  
  exports['default'] = Fitbit;
  module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var _classnames = __webpack_require__(33);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _Link = __webpack_require__(25);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var Profile = (function (_Component) {
    _inherits(Profile, _Component);
  
    function Profile() {
      _classCallCheck(this, Profile);
  
      _get(Object.getPrototypeOf(Profile.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Profile, [{
      key: 'render',
      value: function render() {
        var profileUri = 'https://www.fitbit.com/user/' + this.props.encodedId;
        var hasAvatar = typeof this.props.avatar === 'string' && this.props.avatar.length > 0;
        var hasSteps = typeof this.props.steps === 'number';
        var hasGoalSteps = typeof this.props.goalSteps === 'number';
        var goalClass = hasSteps && hasGoalSteps && this.props.steps >= this.props.goalSteps ? _FitbitPageScss2['default'].metGoal : _FitbitPageScss2['default'].notMetGoal;
        var stepGoalTitle = typeof this.props.dailyStepGoal === 'number' ? 'Based on ' + this.props.dailyStepGoal.toLocaleString() + ' ' + (this.props.dailyStepGoal === 1 ? 'step' : 'steps') + ' per day' : '';
        return _react2['default'].createElement(
          'div',
          { className: _FitbitPageScss2['default'].profile },
          hasAvatar ? _react2['default'].createElement(
            'a',
            { href: profileUri, target: '_blank', className: _FitbitPageScss2['default'].fitbitAvatarLink },
            _react2['default'].createElement('img', { src: this.props.avatar, className: _FitbitPageScss2['default'].avatar })
          ) : '',
          _react2['default'].createElement(
            'div',
            { className: _FitbitPageScss2['default'].fitbitData },
            _react2['default'].createElement(
              'table',
              null,
              _react2['default'].createElement(
                'thead',
                null,
                _react2['default'].createElement(
                  'tr',
                  null,
                  _react2['default'].createElement(
                    'th',
                    { colSpan: '2' },
                    _react2['default'].createElement(
                      'a',
                      { href: profileUri, target: '_blank', className: _FitbitPageScss2['default'].fitbitLink },
                      this.props.displayName
                    ),
                    _react2['default'].createElement(
                      _Link2['default'],
                      { className: _FitbitPageScss2['default'].logoutLink, 'data-tt': 'Sign out of Fitbit',
                        to: '/logout' },
                      '×'
                    )
                  )
                )
              ),
              _react2['default'].createElement(
                'tbody',
                null,
                hasSteps ? _react2['default'].createElement(
                  'tr',
                  { className: _FitbitPageScss2['default'].steps },
                  _react2['default'].createElement(
                    'th',
                    null,
                    'Steps since ',
                    this.props.stepCutoffDate,
                    ':'
                  ),
                  _react2['default'].createElement(
                    'td',
                    { className: (0, _classnames2['default'])(_FitbitPageScss2['default'].stepCount, goalClass) },
                    this.props.steps.toLocaleString()
                  )
                ) : _react2['default'].createElement('tr', null),
                hasGoalSteps ? _react2['default'].createElement(
                  'tr',
                  { className: _FitbitPageScss2['default'].goalSteps },
                  _react2['default'].createElement(
                    'th',
                    null,
                    'Step goal:'
                  ),
                  _react2['default'].createElement(
                    'td',
                    { className: _FitbitPageScss2['default'].stepCount, 'data-tt': stepGoalTitle },
                    this.props.goalSteps.toLocaleString()
                  )
                ) : _react2['default'].createElement('tr', null)
              )
            )
          )
        );
      }
    }]);
  
    return Profile;
  })(_react.Component);
  
  exports['default'] = Profile;
  module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var _SteamUsernameForm = __webpack_require__(64);
  
  var _SteamUsernameForm2 = _interopRequireDefault(_SteamUsernameForm);
  
  var _SteamActivity = __webpack_require__(67);
  
  var _SteamActivity2 = _interopRequireDefault(_SteamActivity);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var SteamInfo = (function (_Component) {
    _inherits(SteamInfo, _Component);
  
    function SteamInfo(props, context) {
      _classCallCheck(this, SteamInfo);
  
      _get(Object.getPrototypeOf(SteamInfo.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(SteamInfo, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setState({ username: _storesLocalStorage2['default'].get('steam') });
      }
    }, {
      key: 'saveSteamUsername',
      value: function saveSteamUsername(username) {
        this.setState({ username: username });
        var currentUsername = _storesLocalStorage2['default'].get('steam');
        if (currentUsername !== username) {
          if (typeof username === 'string') {
            _storesLocalStorage2['default'].set('steam', username);
          } else {
            _storesLocalStorage2['default']['delete']('steam');
          }
          _storesLocalStorage2['default']['delete']('steamId');
          this.setState({ steamId: undefined });
          this.props.onSteamUsernameChange(username);
        }
      }
    }, {
      key: 'onSteamUsernameChange',
      value: function onSteamUsernameChange(username) {
        if (typeof username === 'string' && username.length < 1) {
          username = undefined;
        }
        this.saveSteamUsername(username);
        this.props.onSteamUsernameChange(username);
      }
    }, {
      key: 'render',
      value: function render() {
        var hasUsername = typeof this.state.username === 'string';
        return _react2['default'].createElement(
          'div',
          { className: _FitbitPageScss2['default'].steam },
          hasUsername ? _react2['default'].createElement(_SteamActivity2['default'], { username: this.state.username,
            saveSteamUsername: this.saveSteamUsername.bind(this),
            onSteamGameTimeUpdate: this.props.onSteamGameTimeUpdate }) : _react2['default'].createElement(_SteamUsernameForm2['default'], { onChange: this.onSteamUsernameChange.bind(this) })
        );
      }
    }]);
  
    return SteamInfo;
  })(_react.Component);
  
  exports['default'] = SteamInfo;
  module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(65);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _underscore = __webpack_require__(66);
  
  var _underscore2 = _interopRequireDefault(_underscore);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var SteamUsernameForm = (function (_Component) {
    _inherits(SteamUsernameForm, _Component);
  
    function SteamUsernameForm(props, context) {
      _classCallCheck(this, SteamUsernameForm);
  
      _get(Object.getPrototypeOf(SteamUsernameForm.prototype), 'constructor', this).call(this, props, context);
      this.onInputChange = _underscore2['default'].debounce(this.onInputChange.bind(this), 2000);
    }
  
    _createClass(SteamUsernameForm, [{
      key: 'onFormSubmit',
      value: function onFormSubmit(event) {
        event.preventDefault();
        var username = _reactDom2['default'].findDOMNode(this.refs.username).value;
        if (typeof username === 'string') {
          username = username.trim();
        }
        this.props.onChange(username);
      }
    }, {
      key: 'onInputChange',
      value: function onInputChange(event) {
        if (event.target.nodeName !== 'INPUT') {
          return;
        }
        var username = event.target.value;
        if (typeof username === 'string') {
          username = username.trim();
        }
        this.props.onChange(username);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'form',
          { className: _FitbitPageScss2['default'].steamUsernameForm, onSubmit: this.onFormSubmit.bind(this) },
          _react2['default'].createElement(
            'label',
            { htmlFor: 'steam-username' },
            'Your Steam user name:'
          ),
          _react2['default'].createElement('input', { type: 'text', ref: 'username', id: 'steam-username', autofocus: 'autofocus', placeholder: 'e.g., cheshire137', onChange: this.onInputChange }),
          _react2['default'].createElement(
            'p',
            { className: _FitbitPageScss2['default'].helpBlock },
            'Your Steam profile must be public.'
          )
        );
      }
    }]);
  
    return SteamUsernameForm;
  })(_react.Component);
  
  exports['default'] = SteamUsernameForm;
  module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("underscore");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var _actionsSteam = __webpack_require__(68);
  
  var _actionsSteam2 = _interopRequireDefault(_actionsSteam);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _SteamGame = __webpack_require__(69);
  
  var _SteamGame2 = _interopRequireDefault(_SteamGame);
  
  var SteamActivity = (function (_Component) {
    _inherits(SteamActivity, _Component);
  
    function SteamActivity(props, context) {
      _classCallCheck(this, SteamActivity);
  
      _get(Object.getPrototypeOf(SteamActivity.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(SteamActivity, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var steamId = _storesLocalStorage2['default'].get('steamId');
        this.setState({ steamId: steamId });
        if (typeof steamId === 'undefined') {
          _actionsSteam2['default'].getSteamId(this.props.username).then(this.onSteamIdFetched.bind(this));
        } else {
          this.loadRecentlyPlayed(steamId);
        }
      }
    }, {
      key: 'onSteamIdFetched',
      value: function onSteamIdFetched(data) {
        var steamId = data.response.steamid;
        this.saveSteamId(steamId);
        this.loadRecentlyPlayed(steamId);
      }
    }, {
      key: 'loadRecentlyPlayed',
      value: function loadRecentlyPlayed(steamId) {
        var _this = this;
  
        _actionsSteam2['default'].getRecentlyPlayedGames(steamId).then((function (data) {
          var games = data.response.games;
          var totalMinutes = 0;
          for (var i = 0; i < games.length; i++) {
            totalMinutes = totalMinutes + games[i].playtime_2weeks;
          }
          _this.setState({ games: games, totalGameMinutes: totalMinutes });
          _this.props.onSteamGameTimeUpdate(totalMinutes);
        }).bind(this));
      }
    }, {
      key: 'saveSteamId',
      value: function saveSteamId(steamId) {
        this.setState({ steamId: steamId });
        if (typeof steamId === 'string') {
          _storesLocalStorage2['default'].set('steamId', steamId);
        } else {
          _storesLocalStorage2['default']['delete']('steamId');
        }
      }
    }, {
      key: 'clearSteamUsername',
      value: function clearSteamUsername(event) {
        event.preventDefault();
        this.props.saveSteamUsername(undefined);
      }
    }, {
      key: 'render',
      value: function render() {
        var steamIdTitle = 'Steam ID: ' + this.state.steamId;
        var hasGames = typeof this.state.games === 'object';
        var totalGameMinutes = this.state.totalGameMinutes || 0;
        var totalGameHours = Math.floor(totalGameMinutes / 60);
        var totalTimeTitle = totalGameMinutes.toLocaleString() + ' ' + (totalGameMinutes === 1 ? 'minute' : 'minutes');
        var totalTimeStr = totalGameMinutes > 60 ? totalGameHours + 'h ' + totalGameMinutes % 60 + 'm' : totalTimeTitle;
        var profileUrl = 'https://steamcommunity.com/id/' + this.props.username + '/';
        return _react2['default'].createElement(
          'div',
          { className: _FitbitPageScss2['default'].steamActivity },
          _react2['default'].createElement(
            'table',
            null,
            _react2['default'].createElement(
              'thead',
              null,
              _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'th',
                  { colSpan: '2' },
                  _react2['default'].createElement(
                    'a',
                    { href: profileUrl, target: '_blank',
                      className: _FitbitPageScss2['default'].steamUsername, 'data-tt': steamIdTitle },
                    this.props.username
                  ),
                  _react2['default'].createElement(
                    'a',
                    { href: '#', className: _FitbitPageScss2['default'].clearSteamUsername,
                      onClick: this.clearSteamUsername.bind(this),
                      'data-tt': 'Choose another Steam user' },
                    '×'
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'tbody',
              null,
              hasGames ? _react2['default'].createElement(
                'tr',
                { className: _FitbitPageScss2['default'].steamGameActivity },
                _react2['default'].createElement(
                  'th',
                  null,
                  'Total time:'
                ),
                _react2['default'].createElement(
                  'td',
                  { className: _FitbitPageScss2['default'].totalGameTime },
                  _react2['default'].createElement(
                    'span',
                    { 'data-tt': totalTimeTitle },
                    totalTimeStr
                  )
                )
              ) : _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'th',
                  { colSpan: '2' },
                  'Loading...'
                )
              ),
              hasGames ? _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                  'th',
                  null,
                  'Breakdown:'
                ),
                _react2['default'].createElement(
                  'td',
                  { className: _FitbitPageScss2['default'].tableContainer },
                  _react2['default'].createElement(
                    'table',
                    { className: _FitbitPageScss2['default'].steamGames },
                    _react2['default'].createElement(
                      'tbody',
                      null,
                      this.state.games.map(function (game) {
                        return _react2['default'].createElement(_SteamGame2['default'], { key: game.appid, game: game,
                          totalGameMinutes: totalGameMinutes });
                      })
                    )
                  )
                )
              ) : _react2['default'].createElement('tr', null)
            )
          )
        );
      }
    }]);
  
    return SteamActivity;
  })(_react.Component);
  
  exports['default'] = SteamActivity;
  module.exports = exports['default'];

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(12);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _configJson = __webpack_require__(45);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var Steam = (function () {
    function Steam() {
      _classCallCheck(this, Steam);
    }
  
    _createClass(Steam, null, [{
      key: 'getSteamId',
      value: function getSteamId(username) {
        return regeneratorRuntime.async(function getSteamId$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/api/steam' + '?path=/ISteamUser/ResolveVanityURL/v0001/' + '&vanityurl=' + username));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getRecentlyPlayedGames',
      value: function getRecentlyPlayedGames(steamId) {
        return regeneratorRuntime.async(function getRecentlyPlayedGames$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.abrupt('return', this.makeRequest('/api/steam' + '?path=/IPlayerService/GetRecentlyPlayedGames/' + 'v0001/&steamid=' + steamId));
  
            case 1:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest(path) {
        var url, response, data;
        return regeneratorRuntime.async(function makeRequest$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              url = _configJson2['default'][("production")].serverUri + path + (path.indexOf('?') > -1 ? '&' : '?') + 'format=json';
              context$2$0.next = 3;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url));
  
            case 3:
              response = context$2$0.sent;
              context$2$0.next = 6;
              return regeneratorRuntime.awrap(response.json());
  
            case 6:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 8:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Steam;
  })();
  
  exports['default'] = Steam;
  module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FitbitPageScss = __webpack_require__(59);
  
  var _FitbitPageScss2 = _interopRequireDefault(_FitbitPageScss);
  
  var SteamGame = (function (_Component) {
    _inherits(SteamGame, _Component);
  
    function SteamGame() {
      _classCallCheck(this, SteamGame);
  
      _get(Object.getPrototypeOf(SteamGame.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(SteamGame, [{
      key: 'render',
      value: function render() {
        var gameMinutes = this.props.game.playtime_2weeks;
        var gameHours = Math.floor(gameMinutes / 60);
        var gameTimeTitle = gameMinutes.toLocaleString() + ' ' + (gameMinutes === 1 ? 'minute' : 'minutes');
        var gameTimeStr = gameMinutes > 60 ? gameHours + 'h ' + gameMinutes % 60 + 'm' : gameMinutes + 'm';
        var imgUrl = 'http://media.steampowered.com/steamcommunity/public/' + 'images/apps/' + this.props.game.appid + '/' + this.props.game.img_icon_url + '.jpg';
        var gameUrl = 'https://steamcommunity.com/app/' + this.props.game.appid;
        return _react2['default'].createElement(
          'tr',
          { className: _FitbitPageScss2['default'].steamGame },
          _react2['default'].createElement(
            'th',
            { className: _FitbitPageScss2['default'].gameIconContainer },
            _react2['default'].createElement(
              'a',
              { href: gameUrl, target: '_blank' },
              _react2['default'].createElement('img', { src: imgUrl, alt: this.props.game.name,
                className: _FitbitPageScss2['default'].gameIcon })
            )
          ),
          _react2['default'].createElement(
            'th',
            { className: _FitbitPageScss2['default'].gameName },
            _react2['default'].createElement(
              'a',
              { href: gameUrl, target: '_blank' },
              this.props.game.name
            )
          ),
          _react2['default'].createElement(
            'td',
            { className: _FitbitPageScss2['default'].gameMinutes, 'data-tt': gameTimeTitle },
            gameTimeStr
          )
        );
      }
    }]);
  
    return SteamGame;
  })(_react.Component);
  
  exports['default'] = SteamGame;
  module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wMS0wMVQxNDowMTo4MDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjQuMjwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj41PC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xNjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KREFXAwAAA0BJREFUOBFtU11sVEUU/s7M3Lm7d7vbdNtls9u1tEpbBYqB+hfhgUTSROOLkuCDBhONKQ8qb75WjDz4UgmJYiQIUYMJkhj/iAQRaCJCVkhKg4Sf0oXWLbYWcXfb7t6fGeeudqPEyf3OuTkz3zkzc74h/M9o6+2Nq2q0TwdBF8DIfBMk7bHb186W7l5O/wlk+5041GsAvUzQ3aB/prUGNF1X0PujvrtrdvZiZYnXSOC09WcCIQ6CsBEhASGMNU4Z/J2LmYj6SXA8t1jMT4bzPDQwlUH2FyCxUWtTG8yAGyKDlLL02NpVBx9/ZM1X0Uik+NtcecAPaL2KdhzCwqRbT2DHereDWa+EuYh4HTDeEtJ949UXdsebErVKuZZes6qnuK6vZ/TcheubibEFVSmMMKQHYoxZg5wEOMkGoAR6OjsKqWRLa3t2WeazfUMTtrRW9K3ssZZn07eYZoPJ5JMJAR+rFeMrLB5WDq9E10+vtMKWZzb9Km27vbOlpQb43e3ZTNSWMpdINCvO/8x5MXqQ7xgaWm1J++lbc2VZ8zRxYcH1gSc2rJ35YPj1G/d15dg3R890n/l5PCU4a0mnW/nHn5/qJSEZ4+IEae1tgma786PX2KeHR9pG8pfiHZm22q63XrrRdU9Km20FphX8x/xleWm8KIb3fp2bnvnDFpYF7QdbqVKp9cVi8ggCtxmMua5H1cLUDD9++hd767PrF6MRqd9+/8umvYdOxUvzVcY5gTPTTnNcBtrAj46JyrHzV18MwNOdmRR3Iqy5NRlPeIHiZ8cKzs6PvkscOJKPakuQiNhgUgLSBoSY0Fru4NNXTnpX5QPy23MTT52/fNPq786xqdkSxou3+eRsiR84PspkkwNmG1KdLEFODFqId+a+3/lDXQfZhzePImY9Wij7987cKWO+6uGOweH8OOY8BRaJAGECA2pKmOehR4RjbZ+/cMxrSDm9bc8yn/gnHlkDjiC4rotAKZibD+VlSKbNXACeewJB8PzvHw5O14UXmsZ4c38kuWBvAw9Vqe8nYYVs6MBXpHFFK3+f4/L3pt7dsrjEaexgKRD63PDpaLVWXqm1Wq6VMupmN+1k6mJx8KGFf68L//8CWz429aOfttoAAAAASUVORK5CYII="

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LogoutPageScss = __webpack_require__(72);
  
  var _LogoutPageScss2 = _interopRequireDefault(_LogoutPageScss);
  
  var _historyLibParsePath = __webpack_require__(26);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _decoratorsWithStyles = __webpack_require__(24);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _storesLocalStorage = __webpack_require__(46);
  
  var _storesLocalStorage2 = _interopRequireDefault(_storesLocalStorage);
  
  var _coreLocation = __webpack_require__(27);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  var title = 'Signing out...';
  
  var LogoutPage = (function (_Component) {
    _inherits(LogoutPage, _Component);
  
    function LogoutPage() {
      _classCallCheck(this, _LogoutPage);
  
      _get(Object.getPrototypeOf(_LogoutPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(LogoutPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        _storesLocalStorage2['default']['delete']('token');
        _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])('/')));
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _LogoutPageScss2['default'].root },
          _react2['default'].createElement(
            'div',
            { className: _LogoutPageScss2['default'].container },
            _react2['default'].createElement(
              'h1',
              null,
              title
            )
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _LogoutPage = LogoutPage;
    LogoutPage = (0, _decoratorsWithStyles2['default'])(_LogoutPageScss2['default'])(LogoutPage) || LogoutPage;
    return LogoutPage;
  })(_react.Component);
  
  exports['default'] = LogoutPage;
  module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(73);
      var insertCss = __webpack_require__(20);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(19)();
  // imports
  
  
  // module
  exports.push([module.id, ".LogoutPage_root_2QL{width:100%}.LogoutPage_container_1O6{margin:0 auto;max-width:1000px;text-align:center}", ""]);
  
  // exports
  exports.locals = {
  	"root": "LogoutPage_root_2QL",
  	"container": "LogoutPage_container_1O6"
  };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(14);
  
  var Html = (function (_Component) {
    _inherits(Html, _Component);
  
    function Html() {
      _classCallCheck(this, Html);
  
      _get(Object.getPrototypeOf(Html.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Html, [{
      key: 'trackingCode',
      value: function trackingCode() {
        return { __html: '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' + 'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' + 'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' + 'e.src=\'https://www.google-analytics.com/analytics.js\';' + 'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' + ('ga(\'create\',\'' + _config.googleAnalyticsId + '\',\'auto\');ga(\'send\',\'pageview\');')
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'html',
          { className: 'no-js', lang: 'en' },
          _react2['default'].createElement(
            'head',
            null,
            _react2['default'].createElement('meta', { charSet: 'utf-8' }),
            _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2['default'].createElement(
              'title',
              null,
              this.props.title
            ),
            _react2['default'].createElement('meta', { name: 'description', content: this.props.description }),
            _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2['default'].createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2['default'].createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2['default'].createElement(
            'body',
            null,
            _react2['default'].createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2['default'].createElement('script', { src: this.props.entry }),
            _react2['default'].createElement('script', { dangerouslySetInnerHTML: this.trackingCode() })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        description: _react.PropTypes.string,
        css: _react.PropTypes.string,
        body: _react.PropTypes.string.isRequired,
        entry: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        title: '',
        description: ''
      },
      enumerable: true
    }]);
  
    return Html;
  })(_react.Component);
  
  exports['default'] = Html;
  module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fs = __webpack_require__(77);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(2);
  
  var _express = __webpack_require__(3);
  
  var _bluebird = __webpack_require__(78);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(79);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(80);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseJade = function parseJade(path, jadeContent) {
    var fmContent = (0, _frontMatter2['default'])(jadeContent);
    var htmlContent = _jade2['default'].render(fmContent.body);
    return Object.assign({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2['default'].promisify(_fs2['default'].readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2['default'](function (resolve) {
      _fs2['default'].exists(filename, resolve);
    });
  };
  
  var router = new _express.Router();
  
  router.get('/', function callee$0$0(req, res, next) {
    var path, fileName, source, content;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          path = req.query.path;
  
          if (!(!path || path === 'undefined')) {
            context$1$0.next = 5;
            break;
          }
  
          res.status(400).send({ error: 'The \'path\' query parameter cannot be empty.' });
          return context$1$0.abrupt('return');
  
        case 5:
          fileName = (0, _path.join)(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
          context$1$0.next = 8;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 8:
          if (context$1$0.sent) {
            context$1$0.next = 10;
            break;
          }
  
          fileName = (0, _path.join)(CONTENT_DIR, path + '/index.jade');
  
        case 10:
          context$1$0.next = 12;
          return regeneratorRuntime.awrap(fileExists(fileName));
  
        case 12:
          if (context$1$0.sent) {
            context$1$0.next = 16;
            break;
          }
  
          res.status(404).send({ error: 'The page \'' + path + '\' is not found.' });
          context$1$0.next = 21;
          break;
  
        case 16:
          context$1$0.next = 18;
          return regeneratorRuntime.awrap(readFile(fileName, { encoding: 'utf8' }));
  
        case 18:
          source = context$1$0.sent;
          content = parseJade(path, source);
  
          res.status(200).send(content);
  
        case 21:
          context$1$0.next = 26;
          break;
  
        case 23:
          context$1$0.prev = 23;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 26:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 23]]);
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map
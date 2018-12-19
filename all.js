var VHS =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Configuration
 */

var secure = window.location.protocol === 'https:';

module.exports = {
    name: 'likely',
    prefix: 'likely__',
    secure: secure,
    protocol: secure ? 'https:' : 'http:',
    storageKey: 'likelyServices',
    breakpoint: 680
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

var div = document.createElement('div'),
    gid = 0;

var dom = module.exports = {
    /**
     * Wrap SVG coords from data object into SVG tag
     *
     * @param {String} coords
     */
    wrapSVG: function (coords) {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ' + 'viewBox="0 0 16 16"><path d="M' + coords + 'z"/></svg>';
    },

    /**
     * Create node from HTML
     *
     * @param {String} html
     */
    createNode: function (html) {
        div.innerHTML = html;

        return div.children[0];
    },

    /**
     * Load script
     *
     * @param {String} url
     */
    getScript: function (url) {
        var script = document.createElement('script'),
            head   = document.head;

        script.type = 'text/javascript';
        script.src  = url;

        head.appendChild(script);
        head.removeChild(script);
    },

    /**
     * Get JSON
     *
     * @param {String} url
     * @param {Function} callback
     */
    getJSON: function (url, callback) {
        var name = encodeURIComponent('random_fun_' + (++gid));

        url = url.replace(
            /callback=(\?)/,
            'callback=' + name
        );

        window[name] = callback;

        dom.getScript(url);
    },

    /**
     * Find first node by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {Node}
     */
    find: function (selector, node) {
        return (node || document).querySelector(selector);
    },

    /**
     * Find all nodes by selector
     *
     * @param {String} selector
     * @param {Node} node
     * @return {NodeList}
     */
    findAll: function (selector, node) {
        return (node || document).querySelectorAll(selector);
    },

    /**
     * Check mobile media query
     */
    isMobile: function() {
        return !window.matchMedia('(min-width: ' + config.breakpoint + 'px)').matches;
    },

    /**
     * Open the popup
     *
     * @param {String} url
     * @param {String} winId
     * @param {Number} width,
     * @param {Number} height
     */
    openPopup: function (url, winId, width, height) {
        var left = Math.round(screen.width / 2 - width / 2),
            top  = 0;

        if (screen.height > height) {
            top = Math.round(screen.height / 3 - height / 2);
        }

        var options = 'left='    + left +
                      ',top='    + top +
                      ',width='  + width +
                      ',height=' + height +
                      ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';

        var win = window.open(url, winId, options);

        // if (!win) {
        //     location.href = url;
        //     return location.href;
        // }

        // win.focus();

        return win;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var bool = {yes: true, no: false},
    rUrl = /(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/gi;

/**
 * @internal
 */
var utils = {
    /**
     * Simple $.each, only for objects
     *
     * @param {Object} object
     * @param {Function} callback
     */
    each: function (object, callback) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                callback(object[key], key);
            }
        }
    },

    /**
     * Convert array-like object to array
     *
     * @param {Object} arrayLike
     * @return {Array}
     */
    toArray: function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    },

    /**
     * Merge given dictionaries (objects) into one object
     *
     * @param {Object} ...objects
     * @return {Object}
     */
    merge: function () {
        var result = {};

        for (var i = 0; i < arguments.length; i ++) {
            var arg = arguments[i];

            if (arg) {
                for (var key in arg) {
                    result[key] = arg[key];
                }
            }
        }

        return result;
    },

    /**
     * Extend one (target) object by other (subject)
     *
     * @param {Object} target
     * @param {Object} subject
     */
    extend: function (target, subject) {
        for (var key in subject) {
            target[key] = subject[key];
        }
    },

    /**
     * Check new flexbox syntax support
     */
    flexboxSupport: function(element, name){
        var d = document, f = 'flex', fw = '-webkit-'+f, e = d.createElement('b'), c;

        try {
            e.style.display = fw;
            e.style.display = f;
            c = (e.style.display == f || e.style.display == fw) ? f : 'no-'+f;
        } catch(e) {
            c = 'no-'+f;
        }

        element.className += ' ' + name + '--' + c;
    },

    /**
     * Return node.dataset or plain object for IE 10without setters
     * based on https://gist.github.com/brettz9/4093766#file_html5_dataset.js
     *
     * @param {Node} node
     * @return {Object}
     */
    getDataset: function (node) {
        if (typeof node.dataset === 'object') {
            return node.dataset;
        }

        var i,
            dataset = {},
            attributes = node.attributes,
            attribute,
            attributeName;

        var toUpperCase = function (n0) {
            return n0.charAt(1).toUpperCase();
        };

        for (i = attributes.length - 1; i >= 0; i--) {
            attribute = attributes[i];
            if (attribute && attribute.name &&
                (/^data-\w[\w\-]*$/).test(attribute.name)) {
                    attributeName = attribute.name.substr(5).replace(/-./g, toUpperCase);
                    dataset[attributeName] = attribute.value;
                }
        }

        return dataset;
    },

    /**
     * Convert "yes" and "no" to true and false.
     *
     * @param {Node} node
     */
    bools: function (node) {
        var result = {},
            data   = utils.getDataset(node);

        for (var key in data) {
            var value = data[key];

            result[key] = bool[value] || value;
        }

        return result;
    },

    /**
     * Map object keys in string to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    template: function (text, data) {
        return !text ? '' : text.replace(/\{([^\}]+)\}/g, function (value, key) {
            return key in data ? data[key] : value;
        });
    },

    /**
     * Map object keys in URL to its values
     *
     * @param {String} text
     * @param {Object} data
     * @return {String}
     */
    makeUrl: function (text, data) {
        for (var key in data) {
            data[key] = encodeURIComponent(data[key]);
        }

        return utils.template(text, data);
    },

    /**
     * Create query string out of data
     *
     * @param {Object} data
     * @return {String}
     */
    query: function (data) {
        var filter = encodeURIComponent,
            query  = [];

        for (var key in data) {
            if (typeof data[key] === 'object') continue;

            query.push(filter(key) + '=' + filter(data[key]));
        }

        return query.join('&');
    },

    /**
     * Set value in object using dot-notation
     *
     * @param {Object} object
     * @param {String} key
     * @param {Object} value
     */
    set: function (object, key, value) {
        var frags = key.split('.'),
            last  = null;

        frags.forEach(function (key, index) {
            if (typeof object[key] === 'undefined') {
                object[key] = {};
            }

            if (index !== frags.length - 1) {
                object = object[key];
            }

            last = key;
        });

        object[last] = value;
    }
};

module.exports = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendPageView = exports.sendEvent = undefined;

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSOLE_STYLE = 'color: #E87E04';

/**
 * Send analytics events via GTM
 * @param {String} label - event label
 * @param {String} action - event action ("Click" by default)
 */
var sendEvent = exports.sendEvent = function sendEvent(label) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Click';

    var value = _config2.default.analyticsCategory + ' \u2014 ' + label + ' \u2014 ' + action;

    if (false) {}

    if (window.dataLayer !== undefined && _config2.default.analyticsCategory) {
        window.dataLayer.push({
            event: 'data_event',
            data_description: value
        });
    }
};

/**
 * Send pageview event via GTM
 */
var sendPageView = exports.sendPageView = function sendPageView() {
    if (false) {}

    if (window.dataLayer !== undefined) {
        window.dataLayer.push({
            event: 'Page — View',
            post_details: {},
            section: 'special',
            tags: [],
            title: document.title,
            url: window.location.pathname
        });
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Social network services
 */

var Service = __webpack_require__(16),
    utils   = __webpack_require__(2),
    svg     = __webpack_require__(17);

var services = {
    odnoklassniki: __webpack_require__(18),
    vkontakte:     __webpack_require__(19),
    facebook:      __webpack_require__(20),
    twitter:       __webpack_require__(21),
    gplus:         __webpack_require__(22),
    pocket:        __webpack_require__(23),
    telegram:      __webpack_require__(24),
    whatsapp:      __webpack_require__(25),
    viber:         __webpack_require__(26),
    email:         __webpack_require__(27),
    more:          __webpack_require__(28)
};

utils.each(services, function (service, key) {
    Service(service);

    service.svgi = svg[key];
    service.name = key;
});

module.exports = services;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'VHS', // уникальное имя спецпроекта. Оно же — название главного класса. Используется на странице, куда интегрируется спецпроект
  analyticsCategory: 'VHS',
  sendPageView: false, // отключаем, если спецпроект не на отдельной странице
  listenedEvents: ['click'] // слушаем события (click, input, change, etc.). Обычно нужен только click
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Make html element
 * @param {String} tagName
 * @param {Array|String} classNames - array of classnames or string for single classname
 * @param {Object} attributes - object with html attributes
 */
var makeElement = exports.makeElement = function makeElement(tagName) {
    var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    tagName = tagName.toLowerCase();

    var element = document.createElement(tagName);

    if (classNames) {
        if ((typeof classNames === 'undefined' ? 'undefined' : _typeof(classNames)) === 'object') {
            classNames.forEach(function (cname) {
                element.classList.add(cname);
            });
        } else if (typeof classNames === 'string') {
            element.classList.add(classNames);
        }
    }

    for (var attr in attributes) {
        if (attr === 'data') {
            var dataAttributes = attributes[attr];

            for (var _attr in dataAttributes) {
                element.dataset[_attr] = dataAttributes[_attr];
            }
        } else {
            element[attr] = attributes[attr];
        }
    }

    return element;
};

/**
 * Cache elements with [data-view] attribute and put them in given object
 * @param {Object} obj - object
 */
var cacheElements = exports.cacheElements = function cacheElements(obj) {
    var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view';

    var newObj = {},
        elements = document.querySelectorAll('[data-' + attr + ']');

    Array.prototype.forEach.call(elements, function (el) {
        var name = el.dataset[attr];
        newObj[name] = el;
    });

    Object.assign(obj, newObj);
};

/**
 * Get all siblings of specified element, excluding this element
 * @param {Element} element
 */
var getSiblings = exports.getSiblings = function getSiblings(element) {
    var siblings = [],
        sibling = element.parentNode.firstChild;

    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === element) continue;
        siblings.push(sibling);
    }

    return siblings;
};

/**
 * Remove all children from element
 * @param {Element} parent
 */
var removeChildren = exports.removeChildren = function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

/**
 * Remove specified element from its parent
 * @param {Element} element
 */
var removeElement = exports.removeElement = function removeElement(element) {
    if (element) {
        element.parentNode.removeChild(element);
    }
};

/**
 * Transform html string to node
 * @param {String} html
 */
var htmlStringToNode = exports.htmlStringToNode = function htmlStringToNode(html) {
    var el = document.createElement('div');

    el.innerHTML = html;

    return el.firstChild;
};

/**
 * Prepend source element before first child of target element
 * @param {Element} parent
 * @param {Element} el
 */
var prepend = exports.prepend = function prepend(parent, el) {
    parent.insertBefore(el, parent.firstChild);
};

/** Quick check if element is in DOM */
var isElementInDom = exports.isElementInDom = function isElementInDom(el) {
    return el.parentNode;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var isAvailable = function() {

    try {
        window.localStorage.setItem('isStorageAvailable', 1);
        window.localStorage.removeItem('isStorageAvailable');
        return true;
    } catch (e) {
        return false;
    }

};

var storage = {

    /**
     * Get item from localStorage
     * @param {String} key
     */
    getItem: function(key){

        if (isAvailable()) {

            var item = window.localStorage.getItem(key);

            try {
                JSON.parse(item);
            } catch (e) {
                return item;
            }

            return JSON.parse(item);

        }

    },

    /**
     * Save item in localStorage
     * @param {String} key
     * @param {String} value
     */
    setItem: function(key, value) {

        value = (typeof value === 'string') ? value : JSON.stringify(value);

        if (isAvailable()) {
            window.localStorage.setItem(key, value);
        }

    },

    /**
     * Remove item from localStorage
     * @param {String} key
     */
    removeItem: function(key) {

        if (isAvailable()) {
            window.localStorage.removeItem(key);
        }

    }

};

module.exports = storage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _special = __webpack_require__(9);

var _special2 = _interopRequireDefault(_special);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.Special = _special2.default; // Тут используется CommonJS модуль, чтобы можно было использовать название класса как глобальную переменную
/**
 * Entry point
 */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(10);

var _base = __webpack_require__(11);

var _base2 = _interopRequireDefault(_base);

var _dom = __webpack_require__(6);

var _share = __webpack_require__(12);

var Share = _interopRequireWildcard(_share);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

var _data = __webpack_require__(31);

var _data2 = _interopRequireDefault(_data);

var _svg = __webpack_require__(32);

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSS = {
  main: 'vhs'
};

var EL = {};

var IMAGES = {};

var Special = function (_BaseSpecial) {
  _inherits(Special, _BaseSpecial);

  function Special() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Special);

    var _this = _possibleConstructorReturn(this, (Special.__proto__ || Object.getPrototypeOf(Special)).call(this));

    Object.assign(_this.params, params);
    _this.saveParams();

    if (_data2.default && params.data) {
      Object.assign(_data2.default, params.data);
    }

    if (_this.params.css) {
      _this.loadStyles(_this.params.css).then(function () {
        return _this.init();
      });
    } else {
      _this.init();
    }
    return _this;
  }

  // static loadImages() {
  //   Object.entries(Data.movies).forEach(([key, value]) => {
  //     const tape = document.createElement('img');
  //     tape.src = value.tape;
  //     IMAGES.push(tape);
  //
  //     const cover = document.createElement('img');
  //     cover.src = value.cover;
  //     IMAGES.push(cover);
  //
  //     if (value.bg.correct) {
  //       const correct = document.createElement('img');
  //       correct.src = value.bg.correct;
  //       IMAGES.push(correct);
  //     }
  //
  //     if (value.bg.incorrect) {
  //       const incorrect = document.createElement('img');
  //       incorrect.src = value.bg.incorrect;
  //       IMAGES.push(incorrect);
  //     }
  //   });
  // }

  _createClass(Special, [{
    key: 'makeOptions',
    value: function makeOptions(options) {
      (0, _dom.removeChildren)(EL.options);

      options.forEach(function (item, i) {
        var optionWrap = (0, _dom.makeElement)('div', CSS.main + '-options__item');
        var option = (0, _dom.makeElement)('div', CSS.main + '-option', {
          data: {
            index: i,
            click: 'answer'
          }
        });
        var tape = _data2.default.movies[item.id].tape;
        option.style.backgroundImage = 'url(' + tape + ')';
        optionWrap.appendChild(option);

        EL.options.appendChild(optionWrap);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      Analytics.sendEvent('Start');

      EL.mInner.replaceChild(EL.test, EL.enter);

      this.makeNextQuestion();
    }
  }, {
    key: 'restart',
    value: function restart() {
      Analytics.sendEvent('Restart');

      this.setInitialParams();

      EL.main.classList.remove('is-result');

      EL.aBtn.innerHTML = '<span>\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</span>' + _svg2.default.arrow;
      EL.aBtn.dataset.click = 'continue';

      this.makeNextQuestion();
    }
  }, {
    key: 'continue',
    value: function _continue() {
      Analytics.sendEvent('Next - ' + (this.activeIndex + 1));

      this.activeIndex += 1;

      this.makeNextQuestion();
    }
  }, {
    key: 'makeNextQuestion',
    value: function makeNextQuestion() {
      var q = _data2.default.questions[this.activeIndex];

      EL.main.classList.remove('is-answered');

      (0, _dom.removeChildren)(EL.tInner);

      EL.qTitle.textContent = '\u0412\u043E\u043F\u0440\u043E\u0441 #' + (this.activeIndex + 1);
      EL.qText.textContent = q.text;

      this.makeOptions(q.options);

      EL.tInner.appendChild(EL.q);

      if (this.activeIndex + 1 < _data2.default.questions.length) {
        Special.preloadNextImages(this.activeIndex + 1);
      }
    }
  }, {
    key: 'answer',
    value: function answer(el) {
      Analytics.sendEvent('Option - ' + (this.activeIndex + 1));

      var index = el.dataset.index;

      var q = _data2.default.questions[this.activeIndex];
      var option = q.options[index];
      var movie = _data2.default.movies[option.id];

      EL.main.classList.add('is-answered');

      (0, _dom.removeChildren)(EL.tInner);
      EL.tInner.appendChild(EL.a);

      EL.aText.innerHTML = option.answer;

      if (q.options[index].isCorrect) {
        this.correctAnswers += 1;

        EL.aImg.src = movie.cover;
        EL.a.classList.remove('is-incorrect');
        EL.a.classList.add('is-correct');
        EL.a.style.backgroundImage = 'url(' + movie.bg.correct + ')';
      } else {
        EL.aImg.src = movie.coverR;
        EL.a.classList.remove('is-correct');
        EL.a.classList.add('is-incorrect');
        EL.a.style.backgroundImage = 'url(' + movie.bg.incorrect + ')';
      }

      if (this.activeIndex === _data2.default.questions.length - 1) {
        EL.aBtn.innerHTML = '<span>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442</span>' + _svg2.default.arrow;
        EL.aBtn.dataset.click = 'result';
      }
    }
  }, {
    key: 'result',
    value: function result() {
      Analytics.sendEvent('Result');

      EL.main.classList.remove('is-answered');
      EL.main.classList.add('is-result');

      var result = Special.getResult(this.correctAnswers);

      (0, _dom.removeChildren)(EL.tInner);
      EL.tInner.appendChild(EL.result);

      EL.rImg.src = result.img;
      EL.rImgM.src = result.imgM;
      EL.rTitle.textContent = result.title;
      EL.rResult.textContent = this.correctAnswers + ' \u0438\u0437 ' + _data2.default.questions.length + ' \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432:';
      EL.rDesc.textContent = result.description;

      (0, _dom.removeChildren)(EL.rShare);
      Share.make(EL.rShare, {
        url: this.params.share.url + '/' + this.correctAnswers,
        title: this.params.share.title,
        twitter: this.params.share.title
      });
    }
  }, {
    key: 'setInitialParams',
    value: function setInitialParams() {
      this.activeIndex = 0;
      this.correctAnswers = 0;
    }
  }, {
    key: 'init',
    value: function init() {
      this.setInitialParams();

      if (this.params.isFeed) {
        this.container.classList.add('is-feed');
      }

      Special.preloadNextImages(this.activeIndex);
      Special.createElements();

      this.container.appendChild(EL.main);

      Analytics.sendEvent('First screen', 'Show');
    }
  }], [{
    key: 'preloadNextImages',
    value: function preloadNextImages(index) {
      var q = _data2.default.questions[index];

      q.options.forEach(function (option) {
        var id = option.id;

        if (!IMAGES.hasOwnProperty(id)) {
          IMAGES[id] = {};

          var movie = _data2.default.movies[id];

          var tape = document.createElement('img');
          tape.src = movie.tape;
          IMAGES[id].tape = tape;

          var cover = document.createElement('img');
          cover.src = movie.cover;
          IMAGES[id].cover = cover;

          if (movie.coverR) {
            var coverR = document.createElement('img');
            coverR.src = movie.coverR;
            IMAGES[id].coverR = coverR;
          }

          if (movie.bg.correct) {
            var correct = document.createElement('img');
            correct.src = movie.bg.correct;
            IMAGES[id].correct = correct;
          }

          if (movie.bg.incorrect) {
            var incorrect = document.createElement('img');
            incorrect.src = movie.bg.incorrect;
            IMAGES[id].incorrect = incorrect;
          }
        }
      });

      console.log(IMAGES);
    }
  }, {
    key: 'createElements',
    value: function createElements() {
      EL.main = (0, _dom.makeElement)('div', CSS.main);
      EL.mBg = (0, _dom.makeElement)('div', CSS.main + '__bg');
      EL.mInner = (0, _dom.makeElement)('div', CSS.main + '__inner');

      EL.main.appendChild(EL.mBg);
      EL.main.appendChild(EL.mInner);

      EL.enter = (0, _dom.makeElement)('div', CSS.main + '-enter');
      EL.eLogo = (0, _dom.makeElement)('img', CSS.main + '-enter__logo', {
        src: 'https://leonardo.osnova.io/4b5e6c9a-06b0-58f6-131e-0767b9e2c566/'
        // src: 'images/logo.png',
      });
      EL.eText = (0, _dom.makeElement)('div', CSS.main + '-enter__text', {
        textContent: _data2.default.description
      });
      EL.eBtn = (0, _dom.makeElement)('button', CSS.main + '-enter__btn', {
        innerHTML: '<span>Play</span>' + _svg2.default.arrow,
        data: {
          click: 'start'
        }
      });

      EL.enter.appendChild(EL.eLogo);
      EL.enter.appendChild(EL.eText);
      EL.enter.appendChild(EL.eBtn);

      EL.test = (0, _dom.makeElement)('div', CSS.main + '-test');
      EL.tLogo = (0, _dom.makeElement)('img', CSS.main + '-test__logo', {
        src: 'https://leonardo.osnova.io/4b5e6c9a-06b0-58f6-131e-0767b9e2c566/'
        // src: 'images/logo.png',
      });
      EL.tFrame = (0, _dom.makeElement)('img', CSS.main + '-test__frame', {
        src: 'https://leonardo.osnova.io/29c5f5ae-ab14-b6c3-968e-931d8619b008/'
        // src: 'images/frame.png',
      });
      EL.tInner = (0, _dom.makeElement)('div', CSS.main + '-test__inner');

      EL.test.appendChild(EL.tLogo);
      EL.test.appendChild(EL.tFrame);
      EL.test.appendChild(EL.tInner);

      EL.q = (0, _dom.makeElement)('div', CSS.main + '-q');
      EL.qTitle = (0, _dom.makeElement)('div', CSS.main + '-q__title');
      EL.qText = (0, _dom.makeElement)('div', CSS.main + '-q__text');
      EL.qOptions = (0, _dom.makeElement)('div', CSS.main + '-q__options');
      EL.options = (0, _dom.makeElement)('div', CSS.main + '-options');

      EL.qOptions.appendChild(EL.options);

      EL.q.appendChild(EL.qTitle);
      EL.q.appendChild(EL.qText);
      EL.q.appendChild(EL.qOptions);

      EL.a = (0, _dom.makeElement)('div', CSS.main + '-a');
      EL.aImg = (0, _dom.makeElement)('img', CSS.main + '-a__img');
      EL.aBody = (0, _dom.makeElement)('div', CSS.main + '-a__body');
      EL.aText = (0, _dom.makeElement)('div', CSS.main + '-a__text');
      EL.aBtn = (0, _dom.makeElement)('button', CSS.main + '-a__btn', {
        innerHTML: '<span>\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C</span>' + _svg2.default.arrow,
        data: {
          click: 'continue'
        }
      });

      EL.aBody.appendChild(EL.aText);
      EL.aBody.appendChild(EL.aBtn);

      EL.a.appendChild(EL.aImg);
      EL.a.appendChild(EL.aBody);

      EL.result = (0, _dom.makeElement)('div', CSS.main + '-result');
      EL.rImg = (0, _dom.makeElement)('img', CSS.main + '-result__img');
      EL.rImgM = (0, _dom.makeElement)('img', CSS.main + '-result__img-m');
      EL.rInner = (0, _dom.makeElement)('div', CSS.main + '-result__inner');
      EL.rTitle = (0, _dom.makeElement)('div', CSS.main + '-result__title');
      EL.rResult = (0, _dom.makeElement)('div', CSS.main + '-result__result');
      EL.rDesc = (0, _dom.makeElement)('div', CSS.main + '-result__description');
      EL.rBottom = (0, _dom.makeElement)('div', CSS.main + '-result__bottom');
      EL.rShare = (0, _dom.makeElement)('div', CSS.main + '-result__share');
      EL.rRestart = (0, _dom.makeElement)('div', CSS.main + '-result__restart', {
        innerHTML: '<span>\u041F\u0440\u043E\u0439\u0442\u0438 \u0435\u0449\u0435 \u0440\u0430\u0437</span>' + _svg2.default.refresh,
        data: {
          click: 'restart'
        }
      });

      EL.rBottom.appendChild(EL.rShare);
      EL.rBottom.appendChild(EL.rRestart);

      EL.rInner.appendChild(EL.rTitle);
      EL.rInner.appendChild(EL.rResult);
      EL.rInner.appendChild(EL.rDesc);
      EL.rInner.appendChild(EL.rBottom);

      EL.result.appendChild(EL.rImg);
      EL.result.appendChild(EL.rImgM);
      EL.result.appendChild(EL.rInner);

      EL.mInner.appendChild(EL.enter);
    }
  }, {
    key: 'getResult',
    value: function getResult(score) {
      var result = '';
      _data2.default.results.some(function (item) {
        if (item.range[0] <= score && item.range[1] >= score) {
          result = item;
          return true;
        }

        return false;
      });

      return result;
    }
  }]);

  return Special;
}(_base2.default);

exports.default = Special;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(5);

var _config2 = _interopRequireDefault(_config);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base special constructor with common methods
 */
var BaseSpecial = function () {
    function BaseSpecial() {
        _classCallCheck(this, BaseSpecial);

        this.keyCodes = {
            enter: 13
        };
        this.params = {
            container: document.body
        };

        if (_config2.default.sendPageView) {
            Analytics.sendPageView();
        }
    }

    /**
     * Save custom params
     * @param {Object} params - params object with custom values
     */


    _createClass(BaseSpecial, [{
        key: 'saveParams',
        value: function saveParams() {
            Object.assign(this.params, _config2.default);
            this.container = this.params.container;

            this.addEventListeners();
        }

        /**
         * Load css file
         * @param {String} path
         */

    }, {
        key: 'loadStyles',
        value: function loadStyles(path) {
            return new Promise(function (resolve, reject) {
                var link = document.createElement('link');

                link.rel = 'stylesheet';
                link.href = path;

                link.onload = function () {
                    return resolve();
                };
                link.onerror = function () {
                    return reject();
                };

                document.body.appendChild(link);
            });
        }

        /**
         * Add event listeners to document
         */

    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this = this;

            this.params.listenedEvents.forEach(function (eventName) {
                _this.container.addEventListener(eventName, function (event) {
                    return _this.defaultEventHandler(event, eventName);
                });
            });
        }

        /**
         * Default events handler
         * @param {Object} event
         * @param {String} eventName
         */

    }, {
        key: 'defaultEventHandler',
        value: function defaultEventHandler(event, eventName) {
            var target = event.target;
            var action = void 0;

            while (target.parentNode && target !== event.currentTarget) {
                action = target.dataset[eventName];

                /** Send all links clicks to analytics */
                if (eventName === 'click' && target.tagName.toLowerCase() === 'a') {
                    Analytics.sendEvent(target.href);
                }

                if (action) break;
                target = target.parentNode;
            }

            action = target.dataset[eventName];

            if (action && this[action]) {
                this[action](event.target, event);
            }
        }
    }]);

    return BaseSpecial;
}();

exports.default = BaseSpecial;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.init = undefined;

var _cmttLikely = __webpack_require__(13);

var _cmttLikely2 = _interopRequireDefault(_cmttLikely);

var _dom = __webpack_require__(6);

var _analytics = __webpack_require__(3);

var Analytics = _interopRequireWildcard(_analytics);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS = {
    likely: 'likely',
    likelyCustom: 'likely--custom'
};

var init = exports.init = function init() {
    _cmttLikely2.default.initate();
};

/**
 * Make likely buttons and append to specified element
 * @param {Element} parentContainer - likely container will be placed here
 * @param {Object} set - object with optional params (title, url, twitter)
 */
var make = exports.make = function make(parentContainer) {
    var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var likelyContainer = (0, _dom.makeElement)('div', [CSS.likely, CSS.likelyCustom]);
    var socials = ['facebook', 'vkontakte', 'twitter'];

    socials.forEach(function (social) {
        var button = (0, _dom.makeElement)('div', social);

        if (social === 'facebook') button.innerHTML = 'Поделиться';

        button.addEventListener('click', function () {
            Analytics.sendEvent('Share ' + social);
        });

        likelyContainer.appendChild(button);
    });

    parentContainer.appendChild(likelyContainer);

    if (set.url) likelyContainer.dataset.url = set.url;
    if (set.twitter) likelyContainer.dataset.twitter = set.twitter;
    if (set.title) likelyContainer.dataset.title = set.title;

    init();
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 'use strict';

var Likely = __webpack_require__(14),
    config = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1);

/**
 * @param {Node} node
 * @param {Object} options
 */
var likely = function (node, options) {
    options = options || {};

    var widget = node[config.name];

    if (widget) {
        widget.update(options);
    }
    else {
        node[config.name] = new Likely(node, utils.merge(
            {}, likely.defaults,
            options, utils.bools(node)
        ));
    }

    return widget;
};

/**
 * Initiate Likely buttons on load
 */
likely.initiate = likely.initate = function () {
    var widgets = dom.findAll('.' + config.name);

    utils.toArray(widgets).forEach(likely);
};

/**
 * Defaults options for likely
 */
likely.defaults = {
    counters: true,
    timeout:  1e3,
    zeroes:   false,
    title:    document.title,
    wait:     0.5e3,
    url:      window.location.href.replace(window.location.hash, '')
};

module.exports = likely;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var Button = __webpack_require__(15);

var services = __webpack_require__(4),
    config   = __webpack_require__(0),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

/**
 * Main widget view
 *
 * @param {Node} container
 * @param {Object} options
 */
function Likely(container, options) {
    this.isSmartOrder = container.dataset.smart !== undefined ? true : false;
    this.container = container;
    this.options   = options;

    this.countersLeft = 0;
    this.buttons      = [];
    this.number       = 0;

    this.init();
}

Likely.prototype = {

    /**
     * Change buttons order, if previous clicks were saved
     * @param {Array} children
     */
    reorder: function (children) {
        var savedServices = storage.getItem(config.storageKey);

        if (savedServices) {
            savedServices.reverse();

            savedServices.forEach(function (service) {

                var button = dom.find('.' + service);

                if (button) {
                    button.parentNode.insertBefore(button, button.parentNode.firstChild);
                }

            });
        }
    },

    /**
     * Initiate the social buttons widget
     */
    init: function () {

        var buttons = utils.toArray(this.container.children);

        if (dom.isMobile() && this.isSmartOrder) {
            this.reorder(buttons);
        }

        buttons.forEach(this.addButton.bind(this));

        if (this.options.counters) {
            this.timer   = setTimeout(this.appear.bind(this), this.options.wait);
            this.timeout = setTimeout(this.ready.bind(this),  this.options.timeout);
        }
        else {
            this.appear();
        }

        utils.flexboxSupport(this.container, config.name);
    },

    /**
     * Add a button
     *
     * @param {Node} node
     */
    addButton: function (node) {
        var button = new Button(node, this, this.options);

        this.buttons.push(button);

        if (button.options.counterUrl) {
            this.countersLeft++;
        }
    },

    /**
     * Update the timer with URL
     *
     * @param {Object} options
     */
    update: function (options) {
        if (
            options.forceUpdate ||
            options.url !== this.options.url
        ) {
            this.countersLeft = this.buttons.length;
            this.number = 0;

            this.buttons.forEach(function (button) {
                button.update(options);
            });
        }
    },

    /**
     * Update counter
     *
     * @param {String} service
     * @param {Number} counter
     */
    updateCounter: function (service, counter) {
        if (counter) {
            this.number += counter;
        }

        this.countersLeft--;

        if (this.countersLeft === 0) {
            this.appear();
            this.ready();
        }
    },

    /**
     * Show the buttons with smooth animation
     */
    appear: function () {
        this.container.classList.add(config.name + '--visible');
    },

    /**
     * Get. Set. Ready.
     */
    ready: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);

            this.container.classList.add(config.name + '--ready');
        }
    }
};

module.exports = Likely;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(4),
    config = __webpack_require__(0),
    fetch = __webpack_require__(29),
    utils = __webpack_require__(2),
    dom = __webpack_require__(1),
    storage = __webpack_require__(7);

var htmlSpan = '<span class="{className}">{content}</span>';

/**
 * Separate social link widget
 *
 * @param {Node} widget
 * @param {Likely} likely
 * @param {Object} options
 */
function LikelyButton (widget, likely, options) {
    this.widget  = widget;
    this.likely  = likely;
    this.options = utils.merge(options);

    this.init();
}

LikelyButton.prototype = {
    /**
     * Initiate the button
     */
    init: function () {
        this.detectService();
        this.detectParams();

        if (this.service) {
            this.initHtml();

            setTimeout(this.initCounter.bind(this), 0);
        }
    },

    /**
     * Update the counter
     *
     * @param {Object} options
     */
    update: function (options) {
        var className = '.' + config.prefix + 'counter',
            counters  = dom.findAll(className, this.widget);

        utils.extend(this.options, utils.merge({forceUpdate: false}, options));
        utils.toArray(counters).forEach(function (node) {
            node.parentNode.removeChild(node);
        });

        this.initCounter();
    },

    /**
     * Get the config.name of service and its options
     */
    detectService: function () {
        var widget  = this.widget,
            service = utils.getDataset(widget).service;

        if (!service) {
            var classes = widget.className.split(' ');

            for (var i = 0; i < classes.length; i++) {
                if (classes[i] in services) break;
            }

            service = classes[i];
        }

        if (service) {
            this.service = service;

            utils.extend(this.options, services[service]);
        }
    },

    /**
     * Merge params from data-* attributes into options hash map
     */
    detectParams: function () {
        var options = this.options,
            data    = utils.getDataset(this.widget);

        if (data.counter) {
            var counter = parseInt(data.counter, 10);

            if (isNaN(counter)) {
                options.counterUrl = data.counter;
            }
            else {
                options.counterNumber = counter;
            }
        }

        options.title = data.title || options.title;
        options.url   = data.url   || options.url;
    },

    /**
     * Inititate button's HTML
     */
    initHtml: function () {
        var options = this.options,
            widget  = this.widget,
            text    = widget.innerHTML;

        widget.addEventListener('click', this.click.bind(this));
        widget.classList.remove(this.service);
        widget.className += (' ' + this.className('widget'));

        var button = utils.template(htmlSpan, {
            className: this.className('button'),
            content:   text
        });

        var icon = utils.template(htmlSpan, {
            className: this.className('icon'),
            content:   dom.wrapSVG(options.svgi)
        });

        widget.innerHTML = icon + button;
    },

    /**
     * Fetch or get cached counter value and update the counter
     */
    initCounter: function () {
        var options = this.options;

        if (options.counters && options.counterNumber) {
            this.updateCounter(options.counterNumber);
        }
        else if (options.counterUrl) {
            fetch(
                this.service,
                options.url,
                options
            )(this.updateCounter.bind(this));
        }
    },

    /**
     * @param {String} className
     * @return {String}
     */
    className: function (className) {
        var fullClass = config.prefix + className;

        return fullClass + ' ' + fullClass + '--' + this.service;
    },

    /**
     * Update counter
     *
     * @param {String} e
     */
    updateCounter: function (counter) {
        counter = parseInt(counter, 10) || 0;

        var counterElement = dom.find('.' + config.name + '__counter', this.widget);

        if (counterElement) {
            counterElement.parentNode.removeChild(counterElement);
        }

        var options = {
            className: this.className('counter'),
            content:   counter
        };

        if (!counter && !this.options.zeroes) {
            options.className += ' ' + config.prefix + 'counter--empty';
            options.content = '';
        }

        this.widget.appendChild(
            dom.createNode(utils.template(htmlSpan, options))
        );

        this.likely.updateCounter(this.service, counter);
    },

    /**
     * Click event listener
     */
    click: function () {
        var options = this.options;

        if ( this.service == 'more' ){

            this.widget.classList.toggle('active');
            this.widget.parentElement.classList.toggle(this.options.className);

        } else if (this.service == 'email'){

            var url = utils.makeUrl(options.popupUrl, {
                url: options.url,
                title: options.title
            });

            window.location = url;

            this.rememberClicked(this.service);

        } else {

            if (options.click.call(this)) {

                var twitterText = this.likely.container.dataset.twitter,
                    twitterUrl = this.likely.container.dataset.twitterUrl;

                var window_url = utils.makeUrl(options.popupUrl, {
                    url:   (this.service === 'twitter' && twitterUrl !== '' && twitterUrl !== undefined) ? twitterUrl : options.url,
                    title: (this.service === 'twitter' && twitterText !== '' && twitterText !== undefined) ? twitterText : options.title
                });

                dom.openPopup(
                    this.addAdditionalParamsToUrl(window_url),
                    config.prefix + this.service,
                    options.popupWidth,
                    options.popupHeight
                );

                this.rememberClicked(this.service);
            }

        }

        return false;
    },

    /**
     * Append service data to URL
     *
     * @param {String} url
     */
    addAdditionalParamsToUrl: function (url) {
        var parameters = utils.query(utils.merge(
                this.widget.dataset,
                this.options.data
            )),
            delimeter = url.indexOf('?') === -1 ? '?' : '&';

        return (parameters === '') ? url : (url + delimeter + parameters);
    },

    /**
     * Remember last clicked button and save to storage
     */
    rememberClicked: function (service) {
        var services = storage.getItem(config.storageKey) || [],
            serviceIndex = services.indexOf(service);

        if (serviceIndex !== -1) {
            services.splice(serviceIndex, 1);
        }

        services.splice(0, 0, service);

        storage.setItem(config.storageKey, services);
    }
};

module.exports = LikelyButton;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var dom = __webpack_require__(1);

/**
 * @param {String} url
 * @param {Function} factory
 */
var counter = function (url, factory) {
    var self = this;
    
    dom.getJSON(url, function (count) {
        try {
            if (typeof self.convertNumber === 'function') {
                count = self.convertNumber(count);
            } 
            
            factory(count);
        } 
        catch (e) {}
    });
};

/**
 * @param {Object} options
 */
module.exports = function (options) {
    options.counter = options.counter || counter;
    options.click   = options.click   || function () { return true; };
};

/***/ }),
/* 17 */
/***/ (function(module) {

module.exports = {"facebook":"5.9 16h3.3V8h2.2l.3-2.8H9.2V3.8c0-.7.1-1.1 1.1-1.1h1.4V0H9.5C6.9 0 5.9 1.3 5.9 3.6v1.7H4.3V8H6v8","twitter":"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353","vkontakte":"15.4 12.8h-1.8c-.7 0-.9-.5-2.1-1.7-1-1-1.5-1.1-1.7-1.1-.4 0-.5.1-.5.6v1.6c0 .4-.1.7-1.3.7-1.9 0-3.9-1.1-5.3-3.2C.6 6.5 0 4.2 0 3.7c0-.3.1-.5.6-.5h1.8c.4 0 .6.2.8.7C4 6.4 5.4 8.6 6 8.6c.2 0 .3-.1.3-.7V5.4c0-1.2-.6-1.3-.6-1.7 0-.2.2-.4.4-.4h2.8c.4 0 .5.2.5.6v3.5c0 .4.2.5.3.5.2 0 .4-.1.8-.5 1.3-1.4 2.2-3.6 2.2-3.6.1-.3.3-.5.8-.5h1.8c.5 0 .6.3.5.6-.2 1-2.4 4-2.4 4-.2.3-.3.4 0 .8.2.3.8.8 1.2 1.3.8.8 1.3 1.6 1.5 2.1 0 .4-.2.7-.7.7","gplus":"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8","odnoklassniki":"8 2.6c.9 0 1.7.7 1.7 1.7C9.7 5.2 9 6 8 6c-.9 0-1.7-.7-1.7-1.7S7.1 2.6 8 2.6zm0 5.7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm1.6 3.2c.8-.2 1.6-.5 2.3-1 .5-.3.7-1.1.4-1.6-.3-.6-1.1-.7-1.6-.4-1.6 1-3.8 1-5.4 0-.6-.3-1.3-.1-1.6.4-.4.6-.2 1.3.3 1.7.7.5 1.5.8 2.3 1l-2.2 2.2c-.5.5-.5 1.2 0 1.7.2.2.5.3.8.3.3 0 .6-.1.8-.3L8 13.2l2.2 2.2c.5.5 1.2.5 1.7 0s.5-1.2 0-1.7l-2.3-2.2","pocket":"12.533 6.864L8.77 10.4c-.213.2-.486.3-.76.3-.273 0-.547-.1-.76-.3L3.488 6.865c-.437-.41-.45-1.09-.032-1.52.42-.428 1.114-.443 1.55-.032l3.006 2.823 3.004-2.823c.438-.41 1.132-.396 1.55.032.42.43.406 1.11-.03 1.52zm3.388-4.928c-.207-.56-.755-.936-1.363-.936H1.45C.854 1 .31 1.368.096 1.917.032 2.08 0 2.25 0 2.422v4.73l.055.94c.232 2.14 1.366 4.01 3.12 5.314.03.024.063.047.094.07l.02.013c.94.673 1.992 1.13 3.128 1.353.524.104 1.06.157 1.592.157.492 0 .986-.045 1.472-.133.058-.01.116-.022.175-.034.016-.003.033-.01.05-.018 1.088-.233 2.098-.677 3.003-1.326l.02-.015c.032-.022.064-.045.096-.07 1.753-1.303 2.887-3.173 3.12-5.312l.054-.94v-4.73c0-.165-.02-.327-.08-.487","telegram":"12.4 4.2L6.6 9.6c-.2.2-.3.4-.4.7L6 11.8c0 .2-.3.2-.3 0l-.8-2.6c-.1-.4.1-.7.3-.8l7-4.3c.2-.2.4 0 .2.1zm2.9-3L.5 6.9c-.4.1-.4.7 0 .8L4.1 9l1.4 4.5c.1.3.4.4.7.2l2-1.6c.2-.2.5-.2.7 0l3.6 2.6c.3.2.6 0 .7-.3l2.6-12.8c.1-.2-.2-.5-.5-.4","whatsapp":"15.8 7.8c0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9L.3 15.8l1.4-4.1C1 10.6.6 9.2.6 7.8.6 3.6 4 .2 8.2.2c4.2 0 7.6 3.4 7.6 7.6M8.1 1.4c-3.5 0-6.4 2.9-6.4 6.4 0 1.4.5 2.7 1.2 3.7l-.8 2.4 2.5-.8c1 .7 2.2 1.1 3.5 1.1 3.5 0 6.4-2.9 6.4-6.4.1-3.5-2.8-6.4-6.4-6.4M12 9.5c0-.1-.2-.1-.4-.2s-1.1-.5-1.3-.6c-.2-.1-.3-.1-.4.1-.1.2-.4.6-.6.7-.1.1-.2.1-.4 0-.1 0-.8-.2-1.5-.8-.6-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.2 0-.3-.1-.4 0-.1-.4-1-.6-1.4-.1-.3-.3-.2-.4-.2h-.4c-.1 0-.3 0-.5.2-.1.2-.6.6-.6 1.5s.7 1.8.8 1.9c.1.1 1.3 2.1 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.3-.9.1-.4.1-.8.1-.9","viber":"13.7 6.7c0 .3.1.7-.3.8-.6.1-.5-.4-.5-.8-.4-2.3-1.2-3.2-3.5-3.7-.4-.1-.9 0-.8-.5.1-.5.5-.4.9-.3 2.3.3 4.2 2.3 4.2 4.5zM8.8 1.2c3.7.6 5.5 2.4 5.9 6.1 0 .3-.1.9.4.9s.4-.5.4-.9c0-3.6-3.1-6.8-6.7-7-.2.1-.8-.1-.8.5 0 .4.4.3.8.4zm5.7 10.2c-.5-.4-1-.7-1.5-1.1-1-.7-1.9-.7-2.6.4-.4.6-1 .6-1.6.4-1.7-.8-2.9-1.9-3.7-3.6-.3-.7-.3-1.4.5-1.9.4-.3.8-.6.8-1.2 0-.8-2-3.5-2.7-3.7-.3-.1-.6-.1-1 0C.9 1.2.2 2.7.9 4.4c2.1 5.2 5.8 8.8 11 11 .3.1.6.2.8.2 1.2 0 2.5-1.1 2.9-2.2.3-1-.5-1.5-1.1-2zM9.7 4c-.2 0-.5 0-.6.3-.1.4.2.5.5.5.9.2 1.4.7 1.5 1.7 0 .3.2.5.4.4.3 0 .4-.3.4-.6 0-1.1-1.2-2.3-2.2-2.3","email":"12.7 1c1 .5 1.8 1.2 2.3 2.2.5.9.8 1.9.8 3.1 0 .9-.1 1.8-.5 2.7-.3.9-.8 1.6-1.4 2.2-.6.6-1.4.9-2.3.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.7-1.2-.6 1.1-1.5 1.6-2.5 1.6-.8 0-1.5-.3-1.9-.8-.5-.6-.7-1.3-.7-2.2 0-.8.1-1.6.4-2.5S5.5 5 6.1 4.4c.7-.6 1.5-.8 2.6-.8.5 0 1 .1 1.4.2.5.1.9.3 1.3.6l-.7 4.9v.3c0 .2 0 .4.1.5.1.1.3.2.5.2.4 0 .8-.2 1.1-.7.3-.4.5-1 .7-1.6.1-.7.2-1.3.2-1.9 0-1.3-.4-2.3-1.1-3-.8-.7-1.9-1-3.4-1s-2.7.4-3.7 1.1c-.9.7-1.6 1.6-2 2.6S2.6 7.9 2.6 9c0 .9.2 1.8.6 2.5.4.7 1 1.3 1.7 1.7.7.4 1.7.6 2.7.6.5 0 1-.1 1.6-.2.6-.1 1.1-.3 1.5-.4l.4 1.9c-.6.2-1.2.4-1.8.5-.7.1-1.3.2-1.9.2-1.4 0-2.7-.3-3.8-.9s-1.9-1.4-2.5-2.4S.2 10.3.2 9c0-1.3.3-2.7 1-4 .6-1.4 1.6-2.5 3-3.4C5.5.7 7.2.2 9.2.2c1.3 0 2.5.3 3.5.8zm-4 8.4l.6-3.9c-.3-.1-.5-.2-.7-.2-.7 0-1.2.4-1.5 1.2-.3.8-.5 1.7-.5 2.6 0 .8.3 1.2.8 1.2s.9-.3 1.3-.9","more":"14.725 6.667H9.333V1.275C9.333.57 8.738 0 8 0S6.667.57 6.667 1.275v5.392H1.275C.57 6.667 0 7.262 0 8s.57 1.334 1.275 1.334h5.392v5.393C6.667 15.43 7.262 16 8 16s1.333-.57 1.333-1.273V9.334h5.392C15.43 9.334 16 8.738 16 8s-.57-1.333-1.275-1.333"};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Odnoklassniki service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var odnoklassniki = {
    counterUrl: config.secure 
        ? undefined 
        : 'http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: 'http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}',
    popupWidth: 640,
    popupHeight: 400
};

utils.set(window, 'ODKL.updateCount', function (index, counter) {
    odnoklassniki.promises[index](counter);
});

module.exports = odnoklassniki;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vkontakte service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var vkontakte = {
    counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
    counter: function (url, promise) {
        this.promises.push(promise);
        
        dom.getScript(utils.makeUrl(url, {
            index: this.promises.length - 1
        }));
    },
    promises: [],
    popupUrl: config.protocol + '//vk.com/share.php?url={url}&title={title}',
    popupWidth: 550,
    popupHeight: 330
};

utils.set(window, 'VK.Share.count', function (index, count) {
    vkontakte.promises[index](count);
});

module.exports = vkontakte;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/**
 * Facebook service provider
 */

module.exports = {
    counterUrl: 'https://graph.facebook.com/?fields=share,og_object{likes.limit(0).summary(true),comments.limit(0).summary(true)}&id={url}&callback=?',
    convertNumber: function (counter) {
        return counter.share.share_count;
    },
    popupUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    popupWidth: 600,
    popupHeight: 500
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Twitter service provider
 */

var config = __webpack_require__(0);

var twitter = {
    popupUrl: config.protocol + '//twitter.com/intent/tweet?url={url}&text={title}',
    popupWidth: 600,
    popupHeight: 450,
    click: function () {
        if (!/[\.\?:\-–—]\s*$/.test(this.options.title)) {
            this.options.title += ':';
        }

        return true;
    }
};

module.exports = twitter;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Google+ service provider
 */

var config = __webpack_require__(0),
    utils  = __webpack_require__(2),
    dom    = __webpack_require__(1);

var gplus = {
    gid: 0,
    promises: {},
    popupUrl: 'https://plus.google.com/share?url={url}',
    popupWidth: 700,
    popupHeight: 500
};

module.exports = gplus;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Pocket service provider
 */

var config = __webpack_require__(0);

var pocket = {
    popupUrl: config.protocol + '//getpocket.com/save?url={url}&format=json&callback=?',
    popupWidth: 600,
    popupHeight: 300
};

module.exports = pocket;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Telegram service provider
 */

module.exports = {
    popupUrl: 'tg://msg?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 * WhatsApp service provider
 */

module.exports = {
    popupUrl: 'whatsapp://send?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Viber service provider
 */

module.exports = {
    popupUrl: 'viber://forward?text={title}%0A{url}',
    popupWidth: 600,
    popupHeight: 450
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * E-mail service provider
 */

var config = __webpack_require__(0);

var email = {
    popupUrl: 'mailto:?subject={title}&body={url}',
    popupWidth: 0,
    popupHeight: 0
};

module.exports = email;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(0);

module.exports = {
	parent: config.name,
    className: config.name + '--expanded'
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var services = __webpack_require__(4),
    Factory  = __webpack_require__(30),
    utils    = __webpack_require__(2),
    dom      = __webpack_require__(1);

var factories = {};

/**
 * Fetch data
 *
 * @param {String} service
 * @param {String} url
 * @param {Object} options
 * @return {Promise}
 */
module.exports = function (service, url, options) {
    if (!factories[service]) {
        factories[service] = {};
    }

    var counters = factories[service],
        counter  = counters[url];

    if (!options.forceUpdate && counter) {
        return counter;
    }

    counter = Factory();

    var href = utils.makeUrl(options.counterUrl, {
        url: url
    });

    services[service].counter(href, counter, url);

    counters[url] = counter;

    return counters[url];
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Factory function
 * 
 * This function returns function with following API:
 * 
 * - if passed argument is callback, then this callback would be callled
 *   if the value was changed
 * - if passed argument is anything but undefined or function, then this 
 *   function behaves like setter
 * - if argument isn't provided, then return value stored in closure
 * 
 * @param {Object} value
 * @return {Function}
 */
module.exports = function (value) {
    var listeners = [];
    
    return function (argument) {
        var type = typeof argument;
        
        if (type == 'undefined') {
            return value;
        }
        else if (type == 'function') {
            listeners.push(argument);
        }
        else {
            value = argument;
            
            listeners.forEach(function (listener) {
                listener(argument);
            });
        }
    };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  title: 'Последний герой боевика',
  description: 'Если вы застали эпоху VHS, то, наверное, пересмотрели все культовые боевики 80-х. Но сможете ли вы угадать 10 фильмов того времени по цитатам их героев? Приготовьтесь надирать задницы!',
  movies: {
    red_heat: {
      tape: 'https://leonardo.osnova.io/8b339269-836c-622d-16ea-1c289fa47362/',
      cover: 'https://leonardo.osnova.io/656124b8-7864-31a9-16cb-a3efacc9ea50/',
      coverR: 'https://leonardo.osnova.io/79defe18-f68c-edd0-5008-acf012877070/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/9e908fa8-9178-fbe7-89e1-c237cc2c5719/'
      }
    },
    running_man: {
      tape: 'https://leonardo.osnova.io/aaa1f323-f6c2-cf71-5339-bcf4d44fbe3e/',
      cover: 'https://leonardo.osnova.io/945b64b1-cc75-dd3a-1ff0-ae72cba1ac5c/',
      coverR: 'https://leonardo.osnova.io/39bdc089-6045-e870-b4bc-bb5bbdcf81c9/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/62464b6e-a0d9-e826-32a3-8e832f69f3f1/'
      }
    },
    commando: {
      tape: 'https://leonardo.osnova.io/0062882e-335d-57ad-6fb9-2f2dfe289675/',
      cover: 'https://leonardo.osnova.io/5454c1dc-ba81-9c1c-ceee-4d2c1a6385db/',
      coverR: 'https://leonardo.osnova.io/9d162ca3-6d86-5a14-3468-bbc2330efb20/',
      bg: {
        correct: 'https://leonardo.osnova.io/7cff4327-3b8f-e45e-aa81-ef37796dc14c/',
        incorrect: 'https://leonardo.osnova.io/b60ae54e-1c21-bed4-e06d-e99c6a76ddd5/'
      }
    },
    terminator: {
      tape: 'https://leonardo.osnova.io/86aec6d6-211f-acc3-9431-04def1c6156f/',
      cover: 'https://leonardo.osnova.io/8455af91-ca72-8ade-e54f-e034cd897773/',
      coverR: 'https://leonardo.osnova.io/ee381c73-14ff-f821-bd8c-af83c87a1806/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/3c9e6f67-7256-b7d3-07d0-07efc7128a0d/'
      }
    },
    lethal_weapon: {
      tape: 'https://leonardo.osnova.io/ab5c53ef-57f5-85ec-3c74-031d61dbabbd/',
      cover: 'https://leonardo.osnova.io/be1637be-66c3-8d25-ec8b-d39e8a460c50/',
      coverR: 'https://leonardo.osnova.io/13391aec-a89d-87cd-83ec-812aff49065f/',
      bg: {
        correct: 'https://leonardo.osnova.io/7bc26045-3263-5f9b-d522-c690f6d7d30c/',
        incorrect: 'https://leonardo.osnova.io/3cc11d13-ecb9-44db-5b64-0f2e9ebfce17/'
      }
    },
    die_hard: {
      tape: 'https://leonardo.osnova.io/3d7dd616-7999-352e-f074-929977e25f73/',
      cover: 'https://leonardo.osnova.io/49272938-5b5f-b2f3-9551-bcf53853bd14/',
      coverR: 'https://leonardo.osnova.io/cf346f12-8865-29f9-3aea-3ca8169267c8/',
      bg: {
        correct: 'https://leonardo.osnova.io/e2d7ef43-e798-dde8-72a0-6f5a4d91aebd/',
        incorrect: 'https://leonardo.osnova.io/fcc076bf-7d8c-f48c-b16e-ede61198e2f5/'
      }
    },
    k9: {
      tape: 'https://leonardo.osnova.io/43a87a72-8136-6510-d9e2-72be51777065/',
      cover: 'https://leonardo.osnova.io/fa4a409d-e420-54cc-8de8-b3d711b1b284/',
      coverR: 'https://leonardo.osnova.io/28a4e1a8-90e7-ed4b-f657-188f3e613bce/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/1780dc18-735a-68ba-713f-5e77d4d08358/'
      }
    },
    cobra: {
      tape: 'https://leonardo.osnova.io/4e6dab48-589a-debf-0f68-10e038673821/',
      cover: 'https://leonardo.osnova.io/eb4615b2-fb81-8f58-f434-f30ec49fda1a/',
      coverR: 'https://leonardo.osnova.io/880c06e5-0116-f607-6a26-5642de86bef6/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/09018272-900e-58f1-93b3-9a845790da8d/'
      }
    },
    first_blood: {
      tape: 'https://leonardo.osnova.io/902eefdb-fa53-b838-db1c-6e1b179fa93a/',
      cover: 'https://leonardo.osnova.io/10cdabd6-57b7-fa1b-ce26-d3183bbe1ec0/',
      coverR: 'https://leonardo.osnova.io/669f3458-b93a-affe-c960-1e11b32d1883/',
      bg: {
        correct: 'https://leonardo.osnova.io/4d6b876a-902b-3dd1-7671-b72b803602c2/',
        incorrect: 'https://leonardo.osnova.io/36adab81-aebe-7370-942d-1b5bfcbf3f2d/'
      }
    },
    '48_hrs': {
      tape: 'https://leonardo.osnova.io/c2857133-62d1-cd2f-3465-1eb7a0d8eef0/',
      cover: 'https://leonardo.osnova.io/0d64acfb-dd25-e5e6-18f3-408ae74d5836/',
      coverR: 'https://leonardo.osnova.io/8fcf79bd-11d6-ac4a-47d7-c346666e00b4/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/622315c1-4007-1a90-58ea-2799df5c2c34/'
      }
    },
    terminator_2: {
      tape: 'https://leonardo.osnova.io/e148e85c-1208-0dca-97c5-e12d87134e2f/',
      cover: 'https://leonardo.osnova.io/1b8d07f5-140c-1143-40f2-8de0658da158/',
      coverR: 'https://leonardo.osnova.io/b7c433f3-fbc2-2fa4-d108-04885173b123/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/b1ba40a4-be5b-5b59-928f-79a761b1c902/'
      }
    },
    blade_runner: {
      tape: 'https://leonardo.osnova.io/a6fabac0-0c19-dfe3-8135-96061dee4bc8/',
      cover: 'https://leonardo.osnova.io/22bbd04a-664e-dd20-e011-1313eed0b1f0/',
      coverR: 'https://leonardo.osnova.io/ec0d6742-a479-8cd8-6ae6-67f49e6c68a5/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/58b7ebfe-e79b-704d-431c-24daeea890e9/'
      }
    },
    robocop: {
      tape: 'https://leonardo.osnova.io/0403b917-a0d4-f0eb-f836-335fa9a00627/',
      cover: 'https://leonardo.osnova.io/6fd37902-83d0-ba11-db59-0c154e34d09f/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/a7662767-693f-ac1b-7844-9d4414bd48fe/',
        incorrect: ''
      }
    },
    rocky_3: {
      tape: 'https://leonardo.osnova.io/7ebd6a7e-2300-e229-ef2c-dd8d54b73326/',
      cover: 'https://leonardo.osnova.io/0d152d5a-9f9b-4d16-0e2a-b259028b1aa9/',
      coverR: '',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/43f03579-9465-d38d-1f26-e3f49b864bd5/'
      }
    },
    back_to_future_2: {
      tape: 'https://leonardo.osnova.io/47b9526d-e737-b2e8-d41c-fdcf6dd5a3e9/',
      cover: 'https://leonardo.osnova.io/1f275e1a-8763-dce4-0d80-9cde9d784525/',
      coverR: '',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/e1020d06-f819-cfc9-b954-8552a18806dc/'
      }
    },
    they_live: {
      tape: 'https://leonardo.osnova.io/04084358-f345-f3b4-546d-6c874367f98d/',
      cover: 'https://leonardo.osnova.io/a835e768-6c5e-6758-32ff-a695d5b2e698/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/13b94a65-7d93-3dc2-f8bb-81b68093a5c3/',
        incorrect: ''
      }
    },
    thing: {
      tape: 'https://leonardo.osnova.io/5a0fbf62-acc2-f129-94ff-a5bb4dd6f0a6/',
      cover: 'https://leonardo.osnova.io/92603f72-c876-4729-3275-0931902fd8f9/',
      coverR: 'https://leonardo.osnova.io/1ba865e1-2363-886c-84b0-18641f2a58bd/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/a2d9c1dc-06dd-53b3-e5c4-ca5dc31c10da/'
      }
    },
    escape_from_ny: {
      tape: 'https://leonardo.osnova.io/07ef9501-0502-2ed4-f914-32e3abf8afbc/',
      cover: 'https://leonardo.osnova.io/2d1d998e-c14e-3563-f566-3fdc44ada8a9/',
      coverR: 'https://leonardo.osnova.io/ded24c52-1795-d1cc-e4c6-3c19adea0b3f/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/6fcefbe5-e7b9-e675-0774-04868d17e9e5/'
      }
    },
    batman: {
      tape: 'https://leonardo.osnova.io/025e83d5-0d28-e019-90a8-1bcffb2418af/',
      cover: 'https://leonardo.osnova.io/52d9322d-98b4-0b4f-3799-4ea215570244/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/661bb51d-09a2-dfcc-c104-c5a6a6a1e0cc/',
        incorrect: ''
      }
    },
    tango_and_cash: {
      tape: 'https://leonardo.osnova.io/5771d95e-80d1-c710-2385-ddd2c4b6c680/',
      cover: 'https://leonardo.osnova.io/5e101a9e-dac3-0821-fa0f-8312307612b9/',
      coverR: '',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/30b14208-1e8e-b886-10a8-e7a02f6eb17c/'
      }
    },
    mad_max_3: {
      tape: 'https://leonardo.osnova.io/aafaea75-2acd-11d8-02eb-0110f65b0fe3/',
      cover: 'https://leonardo.osnova.io/03a0d80e-4b0d-f32e-0dfa-7eca8fc3aa64/',
      coverR: 'https://leonardo.osnova.io/9494bfac-aab6-ad51-ff9f-de258f0e9593/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/07db79ac-9679-ceba-a49b-09d47a590601/'
      }
    },
    evil_dead: {
      tape: 'https://leonardo.osnova.io/44f3f78f-e411-95c8-4886-ac519dae3c0d/',
      cover: 'https://leonardo.osnova.io/e0789dc3-2b02-7484-0674-736d9c930f5a/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/8ad3b094-3dc7-a643-52e9-7dd4c971d426/',
        incorrect: ''
      }
    },
    aliens: {
      tape: 'https://leonardo.osnova.io/3432f569-5954-7bee-9402-f30c0674ce67/',
      cover: 'https://leonardo.osnova.io/e5de84c0-e5b3-26fc-2783-4b3733823fe8/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/b8baffdd-5850-6fd9-3d64-b7cc6388d38c/',
        incorrect: ''
      }
    },
    predator: {
      tape: 'https://leonardo.osnova.io/3b9a6d85-e1e2-61ae-c869-ae51c5664e32/',
      cover: 'https://leonardo.osnova.io/83537698-4ffd-e1f7-adbd-72f003196ae6/',
      coverR: 'https://leonardo.osnova.io/76731b25-1dbd-2abd-c017-a6fd5138e09b/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/a35c6457-4a17-dd35-90b0-654f7377825d/'
      }
    },
    star_wars_5: {
      tape: 'https://leonardo.osnova.io/a9955d7f-33ee-1018-b086-00690490a320/',
      cover: 'https://leonardo.osnova.io/0460928a-cbcc-8c76-5e1f-f5888fa38897/',
      coverR: 'https://leonardo.osnova.io/48bc7fb2-63bc-812b-16e3-51afd7888039/',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/baaee56b-3dac-a998-2a4c-20bfb287959a/'
      }
    },
    highlander: {
      tape: 'https://leonardo.osnova.io/8fbdabfe-d2e3-1c88-c1e7-74bb95c3efcb/',
      cover: 'https://leonardo.osnova.io/a5a504b4-bbb0-c422-4bef-16e581efc4a1/',
      coverR: '',
      bg: {
        correct: 'https://leonardo.osnova.io/3c3de587-0fff-3bdf-2dca-d057e7ab8566/',
        incorrect: ''
      }
    },
    rambo3: {
      tape: 'https://leonardo.osnova.io/8b364c5f-1611-a910-b90b-9cec6bfef44b/',
      cover: 'https://leonardo.osnova.io/70228928-a310-54df-3c89-eee00f1cd71c/',
      coverR: '',
      bg: {
        correct: '',
        incorrect: 'https://leonardo.osnova.io/b7f42ea7-f93b-5487-218d-372e884c2ba9/'
      }
    }
  },
  questions: [{
    text: '«Помнишь, я обещал убить тебя последним? Я соврал»',
    options: [{
      id: 'red_heat',
      answer: 'Бравый милиционер из «Красной жары» вряд ли мог такое сказать. А вот спецназовец из «Коммандо» — вполне.'
    }, {
      id: 'running_man',
      answer: 'В «Бегущем человеке» Шварценеггер больше прятался. А вот в «Коммандо» охотился на похитителей дочери.'
    }, {
      id: 'commando',
      answer: 'Совершенно верно, это Джон Мэтрикс из «Коммандо» и его странное чувство юмора.',
      isCorrect: true
    }, {
      id: 'terminator',
      answer: 'Терминатор предпочитал убивать молча, а вот Джон Мэтрикс из «Коммандо» иногда шутил.'
    }]
  }, {
    text: '«В мире девять миллионов террористов, а я убил того, у кого нога меньше, чем у моей сестры»',
    options: [{
      id: 'lethal_weapon',
      answer: 'Мартин Риггс тоже отличался остроумием. Но ботинки всё-таки потерял Джон Макклейн в «Крепком орешке».'
    }, {
      id: 'die_hard',
      answer: 'Правильно! Брюс Уиллис и его знаменитое ворчание.',
      isCorrect: true
    }, {
      id: 'k9',
      answer: '«К-9» вообще про собаку-полицейского — какие ботинки? Это «Крепкий орешек».'
    }, {
      id: 'cobra',
      answer: 'Герой Сильвестра Сталлоне был слишком занят пережёвыванием зубочисток, чтобы шутить. А вот герой Уиллиса в «Крепком орешке» прославился меткими фразами.'
    }]
  }, {
    text: '«Я слишком стар для этого дерьма»',
    options: [{
      id: 'lethal_weapon',
      answer: 'Верно! Роджер Мёрто постоянно ворчал, что он слишком стар.',
      isCorrect: true
    }, {
      id: 'die_hard',
      answer: 'Герой Уиллиса в первом фильме был ещё вполне молод, это Роджер Мёрто из «Смертельного оружия».'
    }, {
      id: 'first_blood',
      answer: 'Рэмбо вечно молодой, а вот Роджер Мёрто в «Смертельном оружии» мечтал о пенсии.'
    }, {
      id: '48_hrs',
      answer: 'Ну нет, Эдди Мёрфи такое не мог сказать. Это Роджер Мёрто из «Смертельного оружия».'
    }]
  }, {
    text: '«Они тебя починят… Они всех чинят»',
    options: [{
      id: 'terminator_2',
      answer: 'Действие «Терминатора» разворачивается в 80-х, технологии ещё только развивались. А вот Робокоп жил в технологическом будущем, и там человека вполне могли «починить».'
    }, {
      id: 'blade_runner',
      answer: 'В «Бегущем по лезвию» репликантов хотели уничтожить — зачем их чинить? Это Робокоп так утешает свою напарницу.'
    }, {
      id: 'first_blood',
      answer: 'Рэмбо предпочитал стрелять. А Робокоп так заботился о своей напарнице.'
    }, {
      id: 'robocop',
      answer: 'Верно! Так Робокоп подбадривал свою раненую напарницу.',
      isCorrect: true
    }]
  }, {
    text: '«Я пришёл сюда жевать жвачку и надирать задницы. Жвачка у меня закончилась»',
    options: [{
      id: 'red_heat',
      answer: 'Эта фраза слишком длинная для немногословного Ивана Данко. Речь о фильме «Чужие среди нас».'
    }, {
      id: 'rocky_3',
      answer: '«Рокки-3» хоть и подарил нам несколько классических ван-лайнеров, но это не один из них. Речь о фильме «Чужие среди нас».'
    }, {
      id: 'back_to_future_2',
      answer: 'Марти любил поострить, цитируя любимые фильмы, но он никак не мог посмотреть «Чужих среди нас» в 1985 году: фильм вышел в 1988-м.'
    }, {
      id: 'they_live',
      answer: 'Верно! Одна из самых известных реплик во всём кинематографе, заслужившая любовь и уважение крутых парней со всего мира. Даже если о самом фильме они не слышали.',
      isCorrect: true
    }]
  }, {
    text: '«Ты когда-нибудь танцевал с дьяволом при свете бледной луны?»',
    options: [{
      id: 'blade_runner',
      answer: 'Кому интересна луна, если ты видел, «как Си-лучи мерцают во тьме близ врат Тангейзера»? Это зловещий Джокер пугает своих жертв в «Бэтмене».'
    }, {
      id: 'thing',
      answer: 'Вряд ли монстр из космоса стал бы спрашивать кого-то о луне. А вот Джокер в «Бэтмене» любил нагнать страху.'
    }, {
      id: 'escape_from_ny',
      answer: 'Тут президента спасать надо, не до луны. Это фраза Джокера в исполнении Джека Николсона.'
    }, {
      id: 'batman',
      answer: 'Правильно! Это фраза Джокера в исполнении Джека Николсона.',
      isCorrect: true
    }]
  }, {
    text: '«Его тело найдено: оно угнало грузовик и взорвало бензоколонку на окраине города»',
    options: [{
      id: 'first_blood',
      answer: 'Верно. Рэмбо крут, даже когда мёртв.',
      isCorrect: true
    }, {
      id: 'tango_and_cash',
      answer: 'Офицеры Танго и Кэш таких разрушений не устроили бы, даже пытаясь очистить свою репутацию. Это цитата из «Рэмбо».'
    }, {
      id: 'cobra',
      answer: 'Кобретти хоть и сеял хаос во имя закона и выглядел точно так же, как Рэмбо, но речь здесь не о его теле.'
    }, {
      id: 'escape_from_ny',
      answer: 'Снейк вполне мог бы взорвать бензоколонку под видом диверсии. Если бы она была в постапокалиптическом Нью-Йорке. Это цитата из «Рэмбо».'
    }]
  }, {
    text: '«Хороший… Плохой… Главное — у кого ружьё»',
    options: [{
      id: 'mad_max_3',
      answer: 'Ружьё у Макса действительно было, правда без патронов. А вот Эш в «Зловещих мертвецах» вовсю крошил чудовищ.'
    }, {
      id: 'rambo3',
      answer: 'Рэмбо скорее сказал бы про пулемёт, но вот у Эша в «Зловещих мертвецах» и правда были только ружьё и бензопила.'
    }, {
      id: 'evil_dead',
      answer: 'Именно так! Это Эш и его безумная философия.',
      isCorrect: true
    }, {
      id: 'commando',
      answer: 'В оружии у Джона Мэтрикса недостатка не было, а вот Эш в «Зловещих мертвецах» и правда обходился двустволкой.'
    }]
  }, {
    text: '«Прилетаем, всех покоряем и улетаем к чёртовой матери!»',
    options: [{
      id: 'aliens',
      answer: 'Верно! Сержанту Эйпону было отведено мало экранного времени, зато он выдавал по эпичной фразе в минуту.',
      isCorrect: true
    }, {
      id: 'commando',
      answer: 'У Джона Мэтрикса было странное чувство юмора, но не откровенно мальчишеское. Это цитата из «Чужих».'
    }, {
      id: 'predator',
      answer: 'Вспоминайте! Отряд Датча спасал министра в джунглях, а не устраивал зачистки. Это цитата из «Чужих».'
    }, {
      id: 'star_wars_5',
      answer: 'Даже в 80-х такая фраза поставила бы крест на детском рейтинге фильма. Это цитата из «Чужих».'
    }]
  }, {
    text: '«Хотите теорию, лейтенант? Этот парень был так разочарован выступлением своего любимого борца, что в приступе депрессии отрезал себе голову»',
    options: [{
      id: 'running_man',
      answer: 'Охотники из шоу, конечно, чем-то походили на борцов, но зрители вроде бы головы себе не отрезали. Цитата из «Горца».'
    }, {
      id: 'highlander',
      answer: 'Верно! А вы думали, что в «Горце» была только одна удачная фраза? А вот и нет, целых две.',
      isCorrect: true
    }, {
      id: 'first_blood',
      answer: '«Рэмбо» — классический боевик. Однако там была всего одна человеческая смерть. И далеко не такая зверская. Цитата из «Горца».'
    }, {
      id: 'die_hard',
      answer: 'У лейтенанта Макклейна не было времени раскрывать странные убийства. Это цитата из «Горца».'
    }]
  }],
  results: [{
    range: [0, 3],
    title: 'Иван Данко',
    description: 'Железный занавес давно убрали. Срочно смотрите боевики 80-х!',
    img: 'https://leonardo.osnova.io/6d12a7de-1320-0134-57b3-6485bf1ab6ec/',
    imgM: 'https://leonardo.osnova.io/a8b31032-8c2f-5002-2a14-1a5cf70d1ee2/'
  }, {
    range: [4, 6],
    title: 'Рэмбо',
    description: 'Блуждания по джунглям не прошли без последствий, но ваши познания боевиков 80-х всё равно впечатляют.',
    img: 'https://leonardo.osnova.io/db62ad0a-cf75-4194-b776-5745a8902d25/',
    imgM: 'https://leonardo.osnova.io/dd461d49-9596-0341-d566-d2987a398133/'
  }, {
    range: [7, 10],
    title: 'Джон Коннор',
    description: 'Если существование человечества будет зависеть от знания боевиков 80-х, вы его спасёте.',
    img: 'https://leonardo.osnova.io/bffc1a67-bb27-b4d8-2194-533f13c64e6d/',
    imgM: 'https://leonardo.osnova.io/ab2b1080-14c5-24d9-ed55-a72c4bbeff55/'
  }]
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  arrow: '<svg viewBox="0 0 70 70"><path fill="#fff" d="M52.1 30.2v-6.3h-7.2v-7h-7.3v-5.6h-7.2V6.6h-7.2v-5h-7.3v67.5h7.3v-5h7.2v-4.6h7.2v-5.6h7.3v-7.1h7.2v-6.2h7.2V30.2z"/></svg>',
  refresh: '<svg viewBox="0 0 61.3 54"><path fill="#fff" d="M11.4 48.3h27V54h-27zM11.4 0h27v5.7h-27z"/><path fill="#fff" d="M5.7 42.6h5.7v5.7H5.7zM5.7 5.7h5.7v5.7H5.7zM38.4 5.7h5.7v5.7h-5.7zM49.9 32.7v5.1h-5.7v-5.1h-5.8V27h5.8V11.4h5.7V27h5.7v5.7h-5.7z"/><path fill="#fff" d="M32.7 21.3h5.7V27h-5.7zM55.6 21.3h5.7V27h-5.7zM0 11.4h5.7v31.1H0z"/></svg>'
};

/***/ })
/******/ ]);
//# sourceMappingURL=all.js.map
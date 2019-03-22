/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"searchkitSearch": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/searchkitSearch.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/searchkitSearch.js":
/*!********************************!*\
  !*** ./src/searchkitSearch.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_hogan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hogan */ \"./node_modules/react-hogan/lib/index.js\");\n/* harmony import */ var react_hogan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hogan__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var hogan_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hogan.js */ \"./node_modules/hogan.js/lib/hogan.js\");\n/* harmony import */ var hogan_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hogan_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var searchkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! searchkit */ \"./node_modules/searchkit/lib/index.js\");\n/* harmony import */ var searchkit__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(searchkit__WEBPACK_IMPORTED_MODULE_4__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n$(document).ready(function () {\n  var product_index = elasticsearch_params.products_index;\n  var category_index = elasticsearch_params.categories_index;\n  var host = 'http://' + elasticsearch_params.server_IP + ':' + elasticsearch_params.server_Port + '/' + product_index + '/odoo'; // const host = 'http://192.168.2.94:'+elasticsearch_params.server_Port+'/'+product_index+'/odoo';\n  // const host = \"http://localhost:9200/demo_elasticsearch_backend_shopinvader_variant_en_us/odoo\";\n\n  var sk = new searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitManager\"](host, {}); //by creating a InvisibleSearchBar the existing searchbar form in default.liquid will work for search queries\n  //the benefit of using the default existing form is that it can easily redirect to the /search\n  // where in Searchkit it is more complicated to implement\n\n  var InvisibleSearchBar =\n  /*#__PURE__*/\n  function (_SearchBox) {\n    _inherits(InvisibleSearchBar, _SearchBox);\n\n    function InvisibleSearchBar() {\n      _classCallCheck(this, InvisibleSearchBar);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(InvisibleSearchBar).apply(this, arguments));\n    }\n\n    _createClass(InvisibleSearchBar, [{\n      key: \"render\",\n      value: function render() {\n        return '';\n      }\n    }]);\n\n    return InvisibleSearchBar;\n  }(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchBox\"]); //the point of this is to indicate Searchkit what fields to search\n\n\n  var FakeSearchBar =\n  /*#__PURE__*/\n  function (_React$Component) {\n    _inherits(FakeSearchBar, _React$Component);\n\n    function FakeSearchBar() {\n      _classCallCheck(this, FakeSearchBar);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(FakeSearchBar).apply(this, arguments));\n    }\n\n    _createClass(FakeSearchBar, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InvisibleSearchBar, {\n          searchOnChange: false,\n          prefixQueryFields: [\"name^2\", \"hierarchicalCategories.lvl2\", \"hierarchicalCategories.lvl1\", \"hierarchicalCategories.lvl0\"]\n        }));\n      }\n    }]);\n\n    return FakeSearchBar;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FakeSearchBar, null), document.getElementById(\"header-search-input\"));\n\n  var ResultLayoutToggle =\n  /*#__PURE__*/\n  function (_React$Component2) {\n    _inherits(ResultLayoutToggle, _React$Component2);\n\n    function ResultLayoutToggle() {\n      _classCallCheck(this, ResultLayoutToggle);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(ResultLayoutToggle).apply(this, arguments));\n    }\n\n    _createClass(ResultLayoutToggle, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"ViewSwitcherToggle\"], null));\n      }\n    }]);\n\n    return ResultLayoutToggle;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var RefinedValues =\n  /*#__PURE__*/\n  function (_React$Component3) {\n    _inherits(RefinedValues, _React$Component3);\n\n    function RefinedValues() {\n      _classCallCheck(this, RefinedValues);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(RefinedValues).apply(this, arguments));\n    }\n\n    _createClass(RefinedValues, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"ActionBar\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"ActionBarRow\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"GroupedSelectedFilters\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"ResetFilters\"], null))));\n      }\n    }]);\n\n    return RefinedValues;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var SearchPagination =\n  /*#__PURE__*/\n  function (_React$Component4) {\n    _inherits(SearchPagination, _React$Component4);\n\n    function SearchPagination() {\n      _classCallCheck(this, SearchPagination);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(SearchPagination).apply(this, arguments));\n    }\n\n    _createClass(SearchPagination, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"Pagination\"], {\n          showNumbers: true\n        }));\n      }\n    }]);\n\n    return SearchPagination;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var HitsPerPage =\n  /*#__PURE__*/\n  function (_React$Component5) {\n    _inherits(HitsPerPage, _React$Component5);\n\n    function HitsPerPage() {\n      _classCallCheck(this, HitsPerPage);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(HitsPerPage).apply(this, arguments));\n    }\n\n    _createClass(HitsPerPage, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"PageSizeSelector\"], {\n          class: \"d-none d-sm-inline-block\",\n          options: [6, 12, 18, 24],\n          listComponent: searchkit__WEBPACK_IMPORTED_MODULE_4__[\"Toggle\"]\n        }));\n      }\n    }]);\n\n    return HitsPerPage;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var SearchStat =\n  /*#__PURE__*/\n  function (_React$Component6) {\n    _inherits(SearchStat, _React$Component6);\n\n    function SearchStat() {\n      _classCallCheck(this, SearchStat);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(SearchStat).apply(this, arguments));\n    }\n\n    _createClass(SearchStat, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"HitsStats\"], {\n          class: \"d-inline-block  text-right pl-2 \",\n          translations: {\n            \"hitstats.results_found\": \"{hitCount} results found\"\n          }\n        }));\n      }\n    }]);\n\n    return SearchStat;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component); //used when generating products from templates\n\n\n  var hogan_helpers = {\n    \"emphasis\": function emphasis() {\n      return function (text, render) {\n        if (typeof renders == 'function') {\n          var value = parseInt(render(text));\n        } else {\n          var value = parseInt(hogan_render(text, this));\n        }\n\n        return '<em>' + value + '</em>';\n      };\n    },\n    \"currency\": function currency() {\n      return function (text, render) {\n        var n = 0;\n\n        if (typeof render != 'undefined') {\n          var value = render(text).trim();\n          n = new Number(value);\n        } else if (typeof hogan_render != 'undefined') {\n          n = new Number(hogan_render(text, this));\n        } else {\n          var text = text.trim();\n\n          if (isNaN(text)) {\n            return text;\n          } else {\n            n = new Number(text);\n          }\n        }\n\n        n *= elasticsearch_params.currency_rate;\n        return n.toLocaleString(elasticsearch_params.locale_code, {\n          style: \"currency\",\n          currency: elasticsearch_params.currency_code\n        });\n      };\n    },\n    \"imageDefault\": function imageDefault() {\n      return function (text, render) {\n        if (typeof render == 'function') {\n          var url = render(text).trim();\n        } else {\n          var url = hogan_render(text, this).trim();\n        }\n\n        if (url != '') {\n          return url;\n        } else {\n          return default_img_url;\n        }\n      };\n    },\n    \"ratingsStars\": function ratingsStars() {\n      return function (text, render) {\n        var html = '';\n\n        if (typeof render == 'function') {\n          var value = parseInt(render(text));\n        } else {\n          var value = parseInt(hogan_render(text, this));\n        }\n\n        if (isNaN(value)) {\n          return '&nbsp;';\n        }\n\n        var n = 1;\n\n        for (n; n <= 5; n++) {\n          if (n <= value) {\n            html += '<i class=\"fas fa-star\" aria-hidden=\"true\"></i>';\n          } else {\n            html += '<i class=\"far fa-star\" aria-hidden=\"true\"></i>';\n          }\n        }\n\n        return '<div class=\"rating\">' + html + '</div>';\n      };\n    }\n  };\n\n  function hogan_render(text, data) {\n    return hogan_js__WEBPACK_IMPORTED_MODULE_3___default.a.compile(text.replace('<%', '{{').replace('%>', '}}')).render(data);\n  }\n\n  var articleDivClass = $('#search-result .row').first()[0].firstElementChild.className;\n\n  var ArticleHitsGridItem =\n  /*#__PURE__*/\n  function (_React$Component7) {\n    _inherits(ArticleHitsGridItem, _React$Component7);\n\n    function ArticleHitsGridItem() {\n      _classCallCheck(this, ArticleHitsGridItem);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(ArticleHitsGridItem).apply(this, arguments));\n    }\n\n    _createClass(ArticleHitsGridItem, [{\n      key: \"render\",\n      value: function render() {\n        var result = this.props.result;\n        var item = result._source;\n        item.last_categorie = item.categories[item.categories.length - 1]; //check price hasn't been already changed when switching from list to grid view\n\n        if (!item.price.value) item.price = item.price[default_role];\n        item.helpers = hogan_helpers;\n        var template = $('#product-hit-template').html();\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hogan__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          className: articleDivClass,\n          template: template,\n          data: item\n        });\n      }\n    }]);\n\n    return ArticleHitsGridItem;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var ArticleHitsListItem =\n  /*#__PURE__*/\n  function (_React$Component8) {\n    _inherits(ArticleHitsListItem, _React$Component8);\n\n    function ArticleHitsListItem() {\n      _classCallCheck(this, ArticleHitsListItem);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(ArticleHitsListItem).apply(this, arguments));\n    }\n\n    _createClass(ArticleHitsListItem, [{\n      key: \"render\",\n      value: function render() {\n        var result = this.props.result;\n        var item = result._source;\n        item.last_categorie = item.categories[item.categories.length - 1]; //check price hasn't been already changed when switching from list to grid view\n\n        if (!item.price.value) item.price = item.price[default_role];\n        item.helpers = hogan_helpers;\n        console.log(item);\n        var template = $('#product-hit-template').html();\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hogan__WEBPACK_IMPORTED_MODULE_2___default.a, {\n          className: articleDivClass,\n          template: template,\n          data: item\n        });\n      }\n    }]);\n\n    return ArticleHitsListItem;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var CategoriesFacet =\n  /*#__PURE__*/\n  function (_React$Component9) {\n    _inherits(CategoriesFacet, _React$Component9);\n\n    function CategoriesFacet() {\n      _classCallCheck(this, CategoriesFacet);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(CategoriesFacet).apply(this, arguments));\n    }\n\n    _createClass(CategoriesFacet, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"HierarchicalMenuFilter\"], {\n          fields: [\"categories.name\"],\n          title: \"Categories\",\n          id: \"categories\"\n        }));\n      }\n    }]);\n\n    return CategoriesFacet;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var PriceFacet =\n  /*#__PURE__*/\n  function (_React$Component10) {\n    _inherits(PriceFacet, _React$Component10);\n\n    function PriceFacet() {\n      _classCallCheck(this, PriceFacet);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(PriceFacet).apply(this, arguments));\n    }\n\n    _createClass(PriceFacet, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"DynamicRangeFilter\"], {\n          field: \"price.default.value\",\n          id: \"price\",\n          title: \"Price\",\n          rangeComponent: searchkit__WEBPACK_IMPORTED_MODULE_4__[\"RangeSliderInput\"],\n          rangeFormatter: function rangeFormatter(count) {\n            return count + \"€\";\n          }\n        }));\n      }\n    }]);\n\n    return PriceFacet;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  var SearchResult =\n  /*#__PURE__*/\n  function (_React$Component11) {\n    _inherits(SearchResult, _React$Component11);\n\n    function SearchResult() {\n      _classCallCheck(this, SearchResult);\n\n      return _possibleConstructorReturn(this, _getPrototypeOf(SearchResult).apply(this, arguments));\n    }\n\n    _createClass(SearchResult, [{\n      key: \"render\",\n      value: function render() {\n        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"SearchkitProvider\"], {\n          searchkit: sk\n        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"Layout\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"ViewSwitcherHits\"], {\n          hitsPerPage: 6,\n          highlightFields: [\"title\"],\n          hitComponents: [{\n            key: \"grid\",\n            title: \"Grid\",\n            itemComponent: ArticleHitsGridItem,\n            defaultOption: true\n          }, {\n            key: \"list\",\n            title: \"List\",\n            itemComponent: ArticleHitsListItem\n          }],\n          scrollTo: \"body\"\n        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(searchkit__WEBPACK_IMPORTED_MODULE_4__[\"NoHits\"], {\n          translations: {\n            \"NoHits.NoResultsFound\": \"No products were found for {query}\",\n            \"NoHits.DidYouMean\": \"Search for {suggestion}\",\n            \"NoHits.SearchWithoutFilters\": \"Search for {query} without filters\"\n          },\n          suggestionsField: \"name\"\n        })));\n      }\n    }]);\n\n    return SearchResult;\n  }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResultLayoutToggle, null), document.getElementById(\"layout-option\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchPagination, null), document.getElementById(\"search-pagination-top\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchPagination, null), document.getElementById(\"search-pagination-bottom\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HitsPerPage, null), document.getElementById(\"hits-per-page-selector\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchStat, null), document.getElementById(\"search-stats\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RefinedValues, null), document.getElementById(\"current-refined-values\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SearchResult, null), document.getElementById(\"search-result\").firstElementChild);\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategoriesFacet, null), document.getElementById(\"hierarchical-categories\"));\n  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PriceFacet, null), document.getElementById(\"price-range\"));\n});\n\n//# sourceURL=webpack:///./src/searchkitSearch.js?");

/***/ })

/******/ });
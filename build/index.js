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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ \"./node_modules/css-loader/lib/url/escape.js\");\nexports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"@font-face {\\n  font-family: 'poiret';\\n  src: local(\\\"poiret\\\"), url(\" + escape(__webpack_require__(/*! ../fonts/poiret-one-v5-latin-regular.woff2 */ \"./src/fonts/poiret-one-v5-latin-regular.woff2\")) + \") format(\\\"woff2\\\"), url(\" + escape(__webpack_require__(/*! ../fonts/poiret-one-v5-latin-regular.woff */ \"./src/fonts/poiret-one-v5-latin-regular.woff\")) + \") format(\\\"woff\\\");\\n  /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */ }\\n\\nheader {\\n  background-color: #ffd699;\\n  width: 100%;\\n  display: flex;\\n  justify-content: center; }\\n  header h1 {\\n    font-family: 'poiret';\\n    font-size: 50px;\\n    font-weight: normal; }\\n\\nfooter {\\n  background-color: #ffd699;\\n  text-align: center; }\\n  footer h3 {\\n    padding: 5px;\\n    font-family: 'poiret';\\n    font-size: 18px; }\\n\\ndiv > h3 {\\n  text-align: center;\\n  font-family: sans-serif;\\n  font: Helvetica;\\n  font-size: 20px; }\\n\\n.mid-container {\\n  display: flex;\\n  justify-content: center;\\n  font-family: serif;\\n  font: Arial;\\n  font-size: 18px; }\\n  .mid-container div {\\n    margin: 20px; }\\n\\n#canvas {\\n  background-color: #f9f2ec;\\n  border: 1px solid black; }\\n\\n#country-form {\\n  display: flex;\\n  flex-flow: column;\\n  justify-content: flex-start; }\\n  #country-form input {\\n    display: none; }\\n  #country-form label {\\n    padding: 12px;\\n    margin: 6px;\\n    font-family: sans-serif;\\n    font: Helvetica;\\n    font-size: 18px;\\n    background-color: #f0f0f5;\\n    text-align: center;\\n    border-radius: 30px;\\n    border: 2px solid #333333; }\\n  #country-form input:hover + label {\\n    background-color: #ffd699; }\\n  #country-form input:checked + label {\\n    background-color: #ffad33; }\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/css/style.scss?./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function escape(url) {\n    if (typeof url !== 'string') {\n        return url\n    }\n    // If url is already wrapped in quotes, remove them\n    if (/^['\"].*['\"]$/.test(url)) {\n        url = url.slice(1, -1);\n    }\n    // Should url be wrapped?\n    // See https://drafts.csswg.org/css-values-3/#urls\n    if (/[\"'() \\t\\n]/.test(url)) {\n        return '\"' + url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n') + '\"'\n    }\n\n    return url\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/url/escape.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = options.transform(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas {\n  constructor(canvas_id, wasm_module){\n    this.canvas = document.getElementById(canvas_id);\n    this.canvas.addEventListener('keydown', this.keyDown.bind(this));\n    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));\n    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));\n    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this));\n    this.x = 1;\n    this.y = 1;\n    this.mouse_drag = false;\n    this.polygon = new Float64Array([]);\n    this.view_polygon = new Float64Array([]);\n    this.wasm_module = wasm_module;\n    this.updateViewpoint = null;\n    this.current_country = '';\n    this.vis_poly_color = '';\n  }\n\n  mouseDown(event){\n    let new_x = event.pageX - this.canvas.offsetLeft;\n    let new_y = event.pageY - this.canvas.offsetTop;\n    console.log(\"mousedown at \" + new_x + \" \" + new_y);\n    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){\n      console.log(\"inside!\");\n      this.mouse_drag = true;\n      this.updateViewpoint(this.current_country, new_x, new_y);\n      this.redrawFromViewpoint(new_x, new_y);\n    }\n    else\n      console.log(\"outside\");\n  }\n\n  mouseMove(event) {\n    if(this.mouse_drag) {\n      let new_x = event.pageX - this.canvas.offsetLeft;\n      let new_y = event.pageY - this.canvas.offsetTop;\n\n      if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){\n        console.log(\"inside!\");\n        this.updateViewpoint(this.current_country, new_x, new_y);\n        this.redrawFromViewpoint(new_x, new_y);\n      }\n      else\n        console.log(\"outside\");\n    }\n  }\n\n  mouseUp(event){\n    this.mouse_drag = false;\n  }\n\n  keyDown(event){\n    let dx=0;\n    let dy=0;\n    let velocity=3;\n    if(event.code === \"ArrowUp\")\n      dy -= velocity; // y is swapped (canvas coordinates)\n    else if(event.code === \"ArrowDown\")\n      dy += velocity; // y is swapped (canvas coordinates)\n    else if(event.code === \"ArrowLeft\")\n      dx -= velocity;\n    else if(event.code === \"ArrowRight\")\n      dx += velocity;\n\n    let new_x = this.x + dx;\n    let new_y = this.y + dy;\n\n    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){\n      console.log(\"still inside\");\n      this.updateViewpoint(this.current_country, new_x, new_y);\n      this.redrawFromViewpoint(new_x, new_y);\n    }\n    else{\n      console.log(\"hit border\");\n    }\n  }\n\n  // recalculates visibility polygon and then redraws (triggered on mousedown, keydown or drag)\n  redrawFromViewpoint(x,y){\n    this.x=x;\n    this.y=y;\n\n    this.wasm_module._freeVisPoly();\n    this.wasm_module._runVisPoly(x,y);\n    let res_ptr = this.wasm_module._getVisPoly();\n    let res_sz = this.wasm_module._getVisPolySize();\n    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);\n    this.setViewpolygon(res);\n    this.draw();\n  }\n\n  setCountry(country, color){\n    this.current_country = country;\n    this.vis_poly_color = color;\n  }\n\n  setViewpoint(x, y){\n    this.x = x;\n    this.y = y;\n  }\n\n  setPolygon(plg){\n    this.polygon = plg;\n  }\n\n  setViewpolygon(vplg){\n    this.view_polygon = vplg;\n  }\n\n  getWidth(){\n    return this.canvas.width;\n  }\n\n  getHeight(){\n    return this.canvas.height;\n  }\n\n  // draws canvas according to current data (doesn't recalculate)\n  draw(){\n    if (this.canvas.getContext) {\n      let ctx = this.canvas.getContext('2d');\n      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n      let draw_polygon = (coords, color) => {\n        ctx.fillStyle = color;\n        ctx.beginPath();\n        ctx.moveTo(coords[0], coords[1]);\n        for(let i=2; i<coords.length; i+=2)\n          ctx.lineTo(coords[i], coords[i+1]);\n        ctx.fill();\n      }\n\n      if(this.polygon.length >= 6)\n        draw_polygon(this.polygon, '#e6e6e6'); // polygon\n\n      if(this.view_polygon.length >= 6)\n        draw_polygon(this.view_polygon, this.vis_poly_color); // vis poly\n\n      if(this.polygon.length >= 6){\n        ctx.strokeStyle = \"#262626\";  // border\n        ctx.lineWidth = 1;\n        ctx.beginPath();\n        ctx.moveTo(this.polygon[0], this.polygon[1]);\n        for(let i=2; i<this.polygon.length; i+=2)\n          ctx.lineTo(this.polygon[i], this.polygon[i+1]);\n        ctx.stroke();\n      }\n\n      ctx.fillStyle='#663300';\n      ctx.beginPath();\n      ctx.arc(this.x, this.y, 5, 0, Math.PI*2, 0);\n      ctx.fill();\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./style.scss */ \"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/css/style.scss?");

/***/ }),

/***/ "./src/data_manager.js":
/*!*****************************!*\
  !*** ./src/data_manager.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DataManager; });\nclass DataManager {\n  constructor(wasm_module, canvas_width, canvas_height, initial_x, initial_y){\n    this.countries = {};\n    this.wasm_module = wasm_module;\n    this.canvas_width = canvas_width;\n    this.canvas_height = canvas_height;\n    this.initial_x = initial_x;\n    this.initial_y = initial_y;\n  }\n\n  setNewViewpoint(country, x, y){\n    this.countries[country].viewpoint_x = x;\n    this.countries[country].viewpoint_y = y;\n  }\n\n  async getCountryData(country){\n    if(country in this.countries)\n      return this.countries[country];\n\n    let raw = await fetch('data/' + country + \".geojson\");\n    raw = await raw.json();\n    const coordinates = raw.features[0].geometry.coordinates[0];\n    const num_coords = coordinates.length;\n\n    let num_bits = 64;\n    let num_elements = num_coords*2;\n    let ptr_polygon = this.wasm_module._malloc(num_bits*num_elements);\n    let polygon = new Float64Array(this.wasm_module.HEAPF64.buffer, ptr_polygon, num_elements);\n\n    // find bbox, fill coordinates in buffer\n    let max_x=Number.NEGATIVE_INFINITY;\n    let max_y=max_x;\n    let min_x=Number.POSITIVE_INFINITY;\n    let min_y=min_x;\n    for(let i=0; i<num_coords; i++){\n      if(coordinates[i][0] > max_x)\n        max_x = coordinates[i][0];\n      if(coordinates[i][0] < min_x)\n        min_x = coordinates[i][0];\n      if(coordinates[i][1] > max_y)\n        max_y = coordinates[i][1];\n      if(coordinates[i][1] < min_y)\n        min_y = coordinates[i][1];\n\n      polygon[2*i] = coordinates[i][0];\n      polygon[2*i+1] = coordinates[i][1];\n    }\n\n    // centering to canvas\n    const diff_x=max_x-min_x;\n    const diff_y=max_y-min_y;\n    const aspect_ratio=diff_x/diff_y;\n    let new_max_x=Number.NEGATIVE_INFINITY;\n    let new_max_y=Number.NEGATIVE_INFINITY;\n    for(let i=0; i<num_coords; i++){\n      polygon[2*i] = (polygon[2*i]-min_x)/diff_x*this.canvas_width*0.95;\n      polygon[2*i+1] = (this.canvas_height-(polygon[2*i+1]-min_y)/diff_y*this.canvas_height)*0.95;\n      if(aspect_ratio < 1)\n        polygon[2*i] *= aspect_ratio;\n      else\n        polygon[2*i+1] /= aspect_ratio;\n      if(polygon[2*i] > new_max_x)\n        new_max_x = polygon[2*i];\n      if(polygon[2*i+1] > new_max_y)\n        new_max_y = polygon[2*i+1];\n    }\n\n    const translate_x = (this.canvas_width - new_max_x)/2.0;\n    const translate_y = (this.canvas_height - new_max_y)/2.0;\n    for(let i=0; i<num_coords; i++){\n      polygon[2*i] += translate_x;\n      polygon[2*i+1] += translate_y;\n    }\n\n    this.countries[country] = {coordinates: polygon,\n      buffer_ptr: ptr_polygon,\n      num_elements: num_elements,\n      viewpoint_x: this.initial_x,\n      viewpoint_y: this.initial_y\n    };\n\n    return this.countries[country];\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/data_manager.js?");

/***/ }),

/***/ "./src/fonts/poiret-one-v5-latin-regular.woff":
/*!****************************************************!*\
  !*** ./src/fonts/poiret-one-v5-latin-regular.woff ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"/build/poiret-one-v5-latin-regular.woff\";\n\n//# sourceURL=webpack:///./src/fonts/poiret-one-v5-latin-regular.woff?");

/***/ }),

/***/ "./src/fonts/poiret-one-v5-latin-regular.woff2":
/*!*****************************************************!*\
  !*** ./src/fonts/poiret-one-v5-latin-regular.woff2 ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"/build/poiret-one-v5-latin-regular.woff2\";\n\n//# sourceURL=webpack:///./src/fonts/poiret-one-v5-latin-regular.woff2?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ \"./src/canvas.js\");\n/* harmony import */ var _data_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data_manager.js */ \"./src/data_manager.js\");\n/* harmony import */ var _state_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state_manager.js */ \"./src/state_manager.js\");\n\n\n\n\n__webpack_require__(/*! ./css/style.scss */ \"./src/css/style.scss\");\n\n// initial country and initial viewpoint\nlet initial_country = 'slovenia';\nlet initial_x = 300.0;\nlet initial_y = 250.0;\n\nlet colors = {slovenia: '#ffad33', brazil: '#40bf40',\n  australia: '#ff8c66', uk: '#99ccff'};\n\nlet canvas = new _canvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('canvas', Module);\nlet data_manager = new _data_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Module, canvas.getWidth(), canvas.getHeight(),\n  initial_x, initial_y);\nlet state_manager = new _state_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Module, canvas, data_manager, initial_country, colors);\n\ncanvas.updateViewpoint = data_manager.setNewViewpoint.bind(data_manager);\nModule.onRuntimeInitialized = state_manager.render;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/state_manager.js":
/*!******************************!*\
  !*** ./src/state_manager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StateManager; });\nclass StateManager {\n  constructor(wasm_module, canvas, data_manager, initial_country, country_colors){\n    this.data_manager = data_manager;\n    this.wasm_module = wasm_module;\n    this.canvas = canvas;\n    this.current_country = initial_country;\n    this.render = this.render.bind(this);\n    this.color = country_colors;\n\n    this.country_form = document.getElementById(\"country-form\");\n    for(let i=0; i<this.country_form.length; i++){\n      this.country_form[i].onclick = _ => {\n        this.current_country = this.country_form[i].id;\n        this.render();\n      }\n    }\n  }\n\n  async render(){\n    let cd = await this.data_manager.getCountryData(this.current_country);\n\n    this.canvas.setPolygon(cd.coordinates);\n    this.wasm_module._setPolygon(cd.buffer_ptr, cd.num_elements);\n\n    this.wasm_module._runVisPoly(cd.viewpoint_x, cd.viewpoint_y);\n    let res_ptr = this.wasm_module._getVisPoly();\n    let res_sz = this.wasm_module._getVisPolySize();\n    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);\n    this.canvas.setViewpolygon(res);\n    this.canvas.setCountry(this.current_country, this.color[this.current_country]);\n    this.canvas.setViewpoint(cd.viewpoint_x, cd.viewpoint_y);\n    this.canvas.draw();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/state_manager.js?");

/***/ })

/******/ });
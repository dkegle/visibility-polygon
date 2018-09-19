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

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas {\n  constructor(canvas_id, wasm_module){\n    this.canvas = document.getElementById(canvas_id);\n    this.canvas.addEventListener('click', this.clickEvent.bind(this));\n    this.canvas.addEventListener('keydown', this.keyDownEvent.bind(this));\n    this.x = 1;\n    this.y = 1;\n    this.polygon = new Float64Array([]);\n    this.view_polygon = new Float64Array([]);\n    this.wasm_module = wasm_module;\n    this.updateViewpoint = null;\n    this.current_country = '';\n    this.vis_poly_color = '';\n  }\n\n  clickEvent(event){\n    let new_x = event.pageX - this.canvas.offsetLeft;\n    let new_y = event.pageY - this.canvas.offsetTop;\n    console.log(\"clicked \" + new_x + \" \" + new_y);\n    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){\n      console.log(\"inside!\");\n      this.updateViewpoint(this.current_country, new_x, new_y);\n      this.redrawFromViewpoint(new_x, new_y);\n    }\n    else\n      console.log(\"outside\");\n  }\n\n  keyDownEvent(event){\n    let dx=0;\n    let dy=0;\n    let velocity=3;\n    if(event.code === \"ArrowUp\")\n      dy -= velocity; // y is swapped (canvas coordinates)\n    else if(event.code === \"ArrowDown\")\n      dy += velocity; // y is swapped (canvas coordinates)\n    else if(event.code === \"ArrowLeft\")\n      dx -= velocity;\n    else if(event.code === \"ArrowRight\")\n      dx += velocity;\n\n    let new_x = this.x + dx;\n    let new_y = this.y + dy;\n\n    if(this.wasm_module._isInsidePolygon(new_x, new_y) === 1){\n      console.log(\"still inside\");\n      this.updateViewpoint(this.current_country, new_x, new_y);\n      this.redrawFromViewpoint(new_x, new_y);\n    }\n    else{\n      console.log(\"hit border\");\n    }\n  }\n\n  // recalculates visibility polygon and then redraws (triggered on click or on keydown)\n  redrawFromViewpoint(x,y){\n    this.x=x;\n    this.y=y;\n\n    this.wasm_module._freeVisPoly();\n    this.wasm_module._runVisPoly(x,y);\n    let res_ptr = this.wasm_module._getVisPoly();\n    let res_sz = this.wasm_module._getVisPolySize();\n    let res = new Float64Array(this.wasm_module.HEAPF64.buffer, res_ptr, res_sz);\n    this.setViewpolygon(res);\n    this.draw();\n  }\n\n  setCountry(country, color){\n    this.current_country = country;\n    this.vis_poly_color = color;\n  }\n\n  setViewpoint(x, y){\n    this.x = x;\n    this.y = y;\n  }\n\n  setPolygon(plg){\n    this.polygon = plg;\n  }\n\n  setViewpolygon(vplg){\n    this.view_polygon = vplg;\n  }\n\n  getWidth(){\n    return this.canvas.width;\n  }\n\n  getHeight(){\n    return this.canvas.height;\n  }\n\n  // draws canvas according to current data (doesn't recalculate)\n  draw(){\n    if (this.canvas.getContext) {\n      let ctx = this.canvas.getContext('2d');\n      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n\n      let draw_polygon = (coords, color) => {\n        ctx.fillStyle = color;\n        ctx.beginPath();\n        ctx.moveTo(coords[0], coords[1]);\n        for(let i=2; i<coords.length; i+=2)\n          ctx.lineTo(coords[i], coords[i+1]);\n        ctx.fill();\n      }\n\n      if(this.polygon.length >= 6)\n        draw_polygon(this.polygon, '#e6e6e6'); // polygon\n\n      if(this.view_polygon.length >= 6)\n        draw_polygon(this.view_polygon, this.vis_poly_color); // vis poly\n\n      if(this.polygon.length >= 6){\n        ctx.strokeStyle = \"#262626\";  // border\n        ctx.lineWidth = 1;\n        ctx.beginPath();\n        ctx.moveTo(this.polygon[0], this.polygon[1]);\n        for(let i=2; i<this.polygon.length; i+=2)\n          ctx.lineTo(this.polygon[i], this.polygon[i+1]);\n        ctx.stroke();\n      }\n\n      ctx.fillStyle='#663300';\n      ctx.beginPath();\n      ctx.arc(this.x, this.y, 5, 0, Math.PI*2, 0);\n      ctx.fill();\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/style.css?");

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ \"./src/canvas.js\");\n/* harmony import */ var _data_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data_manager.js */ \"./src/data_manager.js\");\n/* harmony import */ var _state_manager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state_manager.js */ \"./src/state_manager.js\");\n\n\n\n\n__webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n\n// initial country and initial viewpoint\nlet initial_country = 'slovenia';\nlet initial_x = 300.0;\nlet initial_y = 250.0;\n\nlet colors = {slovenia: '#ffad33', brazil: '#40bf40',\n  australia: '#ff8c66', uk: '#99ccff'};\n\nlet canvas = new _canvas_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('canvas', Module);\nlet data_manager = new _data_manager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](Module, canvas.getWidth(), canvas.getHeight(),\n  initial_x, initial_y);\nlet state_manager = new _state_manager_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](Module, canvas, data_manager, initial_country, colors);\n\ncanvas.updateViewpoint = data_manager.setNewViewpoint.bind(data_manager);\nModule.onRuntimeInitialized = state_manager.render;\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
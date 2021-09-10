(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-viking-calendar"] = factory();
	else
		root["vue-viking-calendar"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "112a");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0353":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("6bf8");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "05fd":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("baa7")('native-function-to-string', Function.toString);


/***/ }),

/***/ "065d":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("bb8b");
var createDesc = __webpack_require__("5edc");
module.exports = __webpack_require__("26df") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "065e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "0926":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "0b34":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "0c29":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "0f99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_YearMonthPicker_vue_vue_type_style_index_0_id_0a626a56_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6a0b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_YearMonthPicker_vue_vue_type_style_index_0_id_0a626a56_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_YearMonthPicker_vue_vue_type_style_index_0_id_0a626a56_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "112a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("e67d")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("ac67");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("1bc7");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("25ba");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("32ea");

// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("a450");

// EXTERNAL MODULE: ./packages/vueVikingCalendar/style/reset.styl
var style_reset = __webpack_require__("4d61");

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02032c06-vue-loader-template"}!./node_modules/_vue-loader@15.9.8@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/DatetimePicker.vue?vue&type=template&id=6e0545b5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isShowDatetimePicker),expression:"isShowDatetimePicker"}],staticClass:"hash-calendar",class:{'calendar_inline': _vm.model === 'inline'},style:({'height': ((_vm.model === 'inline' ? 440 + (_vm.isShowArrowImg ? 30 : 0) : undefined) + "px")}),on:{"click":_vm.close}},[_c('div',{staticClass:"calendar_content",style:({'height': ((440) + "px"), 'bottom': ((_vm.isShowArrowImg ? 30 : 0) + "px")}),on:{"click":function($event){$event.stopPropagation();}}},[(_vm.isShowAction)?_c('div',{ref:"calendarTitle",staticClass:"calendar_title"},[_vm._t("action",function(){return [_c('div',{staticClass:"calendar_title_date"},[(_vm.isShowWeek)?_c('div',{staticClass:"calendar_title_back",on:{"click":_vm.toggleWeek}},[_c('img',{attrs:{"src":_vm.arrowBackImg,"alt":""}})]):_vm._e(),(_vm.pickerType !== 'time')?_c('span',{staticClass:"calendar_title_date_year",class:{'calendar_title_date_active': _vm.isShowCalendar},staticStyle:{"vertical-align":"middle"},on:{"click":_vm.showCalendar}},[_vm._v(_vm._s(_vm.formatDate(((_vm.checkedDate.year) + "/" + (_vm.checkedDate.month + 1) + "/" + (_vm.checkedDate.day)), _vm.language.DEFAULT_DATE_YEARMONTH)))]):_vm._e(),(_vm.pickerType !== 'date')?_c('span',{staticClass:"calendar_title_date_time",class:{'calendar_title_date_active': !_vm.isShowCalendar},on:{"click":_vm.showTime}},[_vm._v(_vm._s(_vm.formatDate(((_vm.checkedDate.year) + "/" + (_vm.checkedDate.month + 1) + "/" + (_vm.checkedDate.day) + " " + (_vm.fillNumber(_vm.checkedDate.hours)) + ":" + (_vm.fillNumber(_vm.checkedDate.minutes))), _vm.language.DEFAULT_TIME_FORMAT)))]):_vm._e(),(!_vm.isShowWeek)?_c('div',{staticClass:"titleDownImg"},[_c('img',{attrs:{"src":_vm.titleDownImg,"alt":""}})]):_vm._e()]),(_vm.showTodayButton)?_c('div',{staticClass:"calendar_confirm",class:{'today_disable': _vm.disabledDate(new Date())},on:{"click":_vm.today}},[_vm._t("today",function(){return [_vm._v("\n            "+_vm._s(_vm.language.TODAY)+"\n          ")]})],2):_vm._e(),(_vm.model === 'dialog')?_c('div',{staticClass:"calendar_confirm",on:{"click":_vm.confirm}},[_vm._t("confirm",function(){return [_vm._v("\n            "+_vm._s(_vm.language.CONFIRM)+"\n          ")]})],2):_vm._e()]})],2):_vm._e(),(_vm.pickerType !== 'time')?_c('calendar',_vm._b({ref:"calendar",attrs:{"show":_vm.isShowCalendar,"isShowWeekView":_vm.isShowWeek,"calendarTitleHeight":_vm.calendarTitleHeight,"default-date":_vm.currDateTime,"customFunction":_vm.customFunction},on:{"update:isShowWeekView":function($event){_vm.isShowWeek=$event},"update:is-show-week-view":function($event){_vm.isShowWeek=$event},"height":_vm.heightChange,"touchstart":_vm.touchStart,"touchmove":_vm.touchMove,"touchend":_vm.touchEnd,"slidechange":_vm.slideChange,"change":_vm.dateChange,"click":_vm.dateClick},scopedSlots:_vm._u([{key:"week",fn:function(scope){return (_vm.hasSlot('week'))?[_vm._t("week",null,{"week":scope.week})]:undefined}},{key:"day",fn:function(scope){return (_vm.hasSlot('day'))?[_vm._t("day",null,{"date":scope.date,"extendAttr":scope.extendAttr})]:undefined}}],null,true)},'calendar',Object.assign({}, _vm.$props, _vm.$attrs),false)):_vm._e(),(_vm.pickerType !== 'date')?_c('time-picker',_vm._b({attrs:{"show":!_vm.isShowCalendar,"default-time":_vm.currDateTime,"calendarDate":_vm.checkedDate},on:{"change":_vm.timeChange}},'time-picker',Object.assign({}, _vm.$props, _vm.$attrs),false)):_vm._e(),(_vm.changeYearFast)?_c('year-month-picker',_vm._b({attrs:{"calendarTitleHeight":_vm.calendarTitleHeight,"calendarContentHeight":62.5 + _vm.calendarContentHeight/4,"calendarDate":_vm.checkedDate,"type":_vm.yearMonthType},on:{"touchstart":_vm.touchStart,"touchmove":_vm.touchMove,"touchend":_vm.touchEnd,"slidechange":_vm.slideChange,"click":_vm.dateClick}},'year-month-picker',Object.assign({}, _vm.$props, _vm.$attrs),false)):_vm._e()],1),(_vm.isShowArrowImg)?_c('div',{staticClass:"ctrl-img",style:({'margin-top': (_vm.calendarContentHeight + "px")}),on:{"click":function($event){$event.stopPropagation();return _vm.toggleWeek.apply(null, arguments)}}},[_vm._t("arrow",function(){return [_c('img',{attrs:{"src":_vm.isShowWeek ? _vm.arrowDownImg : _vm.arrowUpImg}})]},{"show":_vm.isShowWeek})],2):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/DatetimePicker.vue?vue&type=template&id=6e0545b5&scoped=true&

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02032c06-vue-loader-template"}!./node_modules/_vue-loader@15.9.8@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/Calendar.vue?vue&type=template&id=02c761b3&scoped=true&
var Calendarvue_type_template_id_02c761b3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"calendar_body",style:({'margin-top': _vm.calendarTitleHeight + 'px'})},[_c('div',{ref:"weekTitle",staticClass:"calendar_week"},_vm._l((_vm.calendarWeek),function(item){return _c('div',{key:item,staticClass:"calendar_item"},[_c('p',{staticClass:"calendar_day"},[_vm._t("week",function(){return [_vm._v("\n          "+_vm._s(item)+"\n        ")]},{"week":item})],2)])}),0),_c('div',{ref:"calendar",staticClass:"calendar_group",style:({'height': ((_vm.calendarGroupHeight-2) + "px"),'top':(_vm.calendarWeekTitleHeight + "px")}),on:{"mousedown":_vm.touchStart,"mousemove":_vm.touchMove,"mouseup":_vm.touchEnd,"mouseleave":_vm.touchEnd,"touchstart":_vm.touchStart,"touchmove":_vm.touchMove,"touchend":_vm.touchEnd}},[_c('div',{ref:"slide22",style:({'height': (_vm.calendarGroupHeight + "px")})},[_c('ul',{staticClass:"slide-content",style:({'transform': _vm.ulTranslate3d})},_vm._l((_vm.calendarOfMonthShow),function(item,i){return _c('li',{key:i,staticClass:"slide-page calendar_group_li",style:({transform: _vm.liTranslate3d(i),transitionDuration: ((_vm.isTouching ? 0 : _vm.transitionDuration) + "s"),})},_vm._l((item),function(date,j){return _c('div',{key:i + j,ref:"calendarItem",refInFor:true,staticClass:"calendar_item",class:_vm.formatDisabledDate(date) && (_vm.disabledClassName || 'calendar_item_disable'),on:{"click":function (e) { return _vm.clickCalendarDay(date,e); }}},[_c('div',{staticClass:"calendar_day",class:[_vm.isFirstDayOfMonth(date, i) && (_vm.firstDayOfMonthClassName || 'calendar_first_today'),
               _vm.isToday(date) && (_vm.todayClassName || 'calendar_day_today'),
               _vm.isCheckedDay(date) && (_vm.checkedDayClassName || 'calendar_day_checked'),
               _vm.isNotCurrentMonthDay(date,i) && (_vm.notCurrentMonthDayClassName || 'calendar_day_not'),
               _vm.markDateColor(date, 'circle') && 'calendar_mark_circle'],style:({'border-color': _vm.markDateColor(date, 'circle')})},[_vm._t("day",function(){return [_vm._v("\n              "+_vm._s(_vm.isFirstDayOfMonth(date, i) ? _vm.language.MONTH && _vm.language.MONTH[date.month] : date.day)+_vm._s(22)+"\n            ")]},{"date":date,"extendAttr":{isMarked: !!(_vm.markDateColor(date, 'circle') || _vm.markDateColor(date, 'dot')),
                  isDisabledDate: _vm.formatDisabledDate(date),
                  isToday: _vm.isToday(date),
                  isChecked: _vm.isCheckedDay(date),
                  isCurrentMonthDay: !_vm.isNotCurrentMonthDay(date, i),
                  isFirstDayOfMonth: _vm.isFirstDayOfMonth(date, i)}})],2)])}),0)}),0)])]),(_vm.isShowWeek)?_c('div',{staticClass:"content",staticStyle:{"position":"absolute","top":"83px","width":"100%","bottom":"0px"}},[_vm._t("content")],2):_vm._e()])}
var Calendarvue_type_template_id_02c761b3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/Calendar.vue?vue&type=template&id=02c761b3&scoped=true&

// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("e680");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("aa18");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("982e");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("8dee");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/utils/util.js




/**
 * @Description:    各种工具类
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */

/**
 * 判断安卓与IOS平台
 * @returns {string}
 */
var checkPlatform = function checkPlatform() {
  if (/android/i.test(navigator.userAgent)) {
    return '1';
  }

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return '2';
  }
};
/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */

var util_formatDate = function formatDate(time, format) {
  var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'CN';
  lang = lang.toUpperCase();
  var language = __webpack_require__("a914").default[lang] || {};
  format = format || "".concat(language.DEFAULT_DATE_FORMAT, " ").concat(language.DEFAULT_TIME_FORMAT);
  var date = time ? new Date(time) : new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // 月份是从0开始的

  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index;
  }); /// /开个长度为10的数组 格式为 00 01 02 03

  var newTime = format.replace(/YY/g, year).replace(/F/g, hour >= 12 ? 'pm' : 'am').replace(/ss/g, preArr[sec] || sec).replace(/mm/g, preArr[min] || min).replace(/hh/g, hour > 12 && format.includes('F') ? hour - 12 : format.includes('F') ? hour : preArr[hour] || hour).replace(/DD/g, preArr[day] || day).replace(/MM/g, lang === 'EN' ? language.MONTH[month - 1] : preArr[month] || month);
  return newTime;
};
/**
 * 当前日期是否在两个日期范围之间
 * @param {*} curr
 * @param {*} min
 * @param {*} max
 * @returns
 */

var isDateInRange = function isDateInRange(curr, min, max) {
  var minDate = min && min.getTime() - 24 * 60 * 60 * 1000;
  var maxDate = max && max.getTime();
  var currentDate = curr && curr.getTime();
  if (minDate && maxDate) return currentDate > minDate && currentDate < maxDate;
  if (minDate) return currentDate > minDate;
  if (maxDate) return currentDate < maxDate;
  return true;
};
// EXTERNAL MODULE: ./packages/vueVikingCalendar/language/index.js + 2 modules
var language = __webpack_require__("a914");

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("4057");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/calendar.js


/* eslint-disable no-redeclare */

/* eslint-disable no-unreachable */

/* eslint-disable no-unused-vars */

/* eslint-disable */

/**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @Author  Jea杨(JJonline@JJonline.Cn)
* @Time    2014-7-21
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
* @Version 1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
var calendar = {
  /**
    * 农历1900-2100的润大小信息表
    * @Array Of Property
    * @return Hex
    */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049

  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520],
  // 2100

  /**
    * 公历每个月份的天数普通表
    * @Array Of Property
    * @return Number
    */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
    * 天干地支之天干速查表
    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    * @return Cn string
    */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
    * 天干地支之地支速查表
    * @Array Of Property
    * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
    * @return Cn string
    */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
    * 天干地支之地支速查表<=>生肖
    * @Array Of Property
    * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
    * @return Cn string
    */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
   * 阳历节日
   */
  festival: {
    '1-1': {
      title: '元旦'
    },
    '2-14': {
      title: '情人节'
    },
    '3-5': {
      title: '雷锋日'
    },
    '3-8': {
      title: '妇女节'
    },
    '3-12': {
      title: '植树节'
    },
    '4-1': {
      title: '愚人节'
    },
    '4-22': {
      title: '地球日'
    },
    '5-1': {
      title: '劳动节'
    },
    '5-4': {
      title: '青年节'
    },
    '5-12': {
      title: '护士节'
    },
    '6-1': {
      title: '儿童节'
    },
    '7-1': {
      title: '建党节'
    },
    '8-1': {
      title: '建军节'
    },
    '9-10': {
      title: '教师节'
    },
    '10-1': {
      title: '国庆节'
    },
    '12-24': {
      title: '平安夜'
    },
    '12-25': {
      title: '圣诞节'
    }
  },

  /**
   * 农历节日
   */
  lfestival: {
    '12-30': {
      title: '除夕'
    },
    '1-1': {
      title: '春节'
    },
    '1-15': {
      title: '元宵节'
    },
    '2-2': {
      title: '龙抬头'
    },
    '5-5': {
      title: '端午节'
    },
    '7-7': {
      title: '七夕节'
    },
    '7-15': {
      title: '中元节'
    },
    '8-15': {
      title: '中秋节'
    },
    '9-9': {
      title: '重阳节'
    },
    '12-8': {
      title: '腊八节'
    },
    '12-23': {
      title: '北方小年'
    },
    '12-24': {
      title: '南方小年'
    }
  },

  /**
   * 返回默认定义的阳历节日
   */
  getFestival: function getFestival() {
    return this.festival;
  },

  /**
   * 返回默认定义的内容里节日
   */
  getLunarFestival: function getLunarFestival() {
    return this.lfestival;
  },

  /**
   *
   * @param {Object} 按照festival的格式输入数据，设置阳历节日
   */
  setFestival: function setFestival() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.festival = param;
  },

  /**
   *
   * @param {Object} 按照lfestival的格式输入数据，设置农历节日
   */
  setLunarFestival: function setLunarFestival() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.lfestival = param;
  },

  /**
    * 24节气速查表
    * @Array Of Property
    * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
    * @return Cn string
    */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
    * 1900-2100各年的24节气日期速查表
    * @Array Of Property
    * @return 0x string For splice
    */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
    * 数字转中文速查表
    * @Array Of Property
    * @trans ['日','一','二','三','四','五','六','七','八','九','十']
    * @return Cn string
    */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
    * 日期转农历称呼速查表
    * @Array Of Property
    * @trans ['初','十','廿','卅']
    * @return Cn string
    */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
    * 月份转农历称呼速查表
    * @Array Of Property
    * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
    * @return Cn string
    */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
    * 返回农历y年一整年的总天数
    * @param lunar Year
    * @return Number
    * @eg:var count = calendar.lYearDays(1987) ;//count=387
    */
  lYearDays: function lYearDays(y) {
    var i,
        sum = 348;

    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
    }

    return sum + this.leapDays(y);
  },

  /**
    * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
    * @param lunar Year
    * @return Number (0-12)
    * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
    */
  leapMonth: function leapMonth(y) {
    // 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
    * 返回农历y年闰月的天数 若该年没有闰月则返回0
    * @param lunar Year
    * @return Number (0、29、30)
    * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
    */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }

    return 0;
  },

  /**
    * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
    * @param lunar Year
    * @return Number (-1、29、30)
    * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
    */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 月份参数从1至12，参数错误返回-1


    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
    * 返回公历(!)y年m月的天数
    * @param solar Year
    * @return Number (-1、28、29、30、31)
    * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
    */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1


    var ms = m - 1;

    if (ms == 1) {
      // 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    }

    return this.solarMonth[ms];
  },

  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干

    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支

    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
    * 传入offset偏移量返回干支
    * @param offset 相对甲子的偏移量
    * @return Cn string
    */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
    * 传入公历(!)y年获得该年第n个节气的公历日期
    * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
    * @return day Number
    * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
    */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }

    if (n < 1 || n > 24) {
      return -1;
    }

    var _table = this.sTermInfo[y - 1900];
    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
    return parseInt(_calday[n - 1]);
  },

  /**
    * 传入农历数字月份返回汉语通俗表示法
    * @param lunar month
    * @return Cn string
    * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
    */
  toChinaMonth: function toChinaMonth(m) {
    // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1


    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字

    return s;
  },

  /**
    * 传入农历日期数字返回汉字表示法
    * @param lunar day
    * @return Cn string
    * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
    */
  toChinaDay: function toChinaDay(d) {
    // 日 => \u65e5
    var s;

    switch (d) {
      case 10:
        s = "\u521D\u5341";
        break;

      case 20:
        s = "\u4E8C\u5341";
        break;
        break;

      case 30:
        s = "\u4E09\u5341";
        break;
        break;

      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
    }

    return s;
  },

  /**
    * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
    * @param y year
    * @return Cn string
    * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
    */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
    * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
    * @param y  solar year
    * @param m  solar month
    * @param d  solar day
    * @return JSON object
    * @eg:console.log(calendar.solar2lunar(1987,11,01));
    */
  solar2lunar: function solar2lunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d); // 年份限定、上限

    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    } // 公历传参最下限


    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    } // 未传参  获得当天


    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }

    var i,
        leap = 0,
        temp = 0; // 修正ymd参数

    var y = objDate.getFullYear(),
        m = objDate.getMonth() + 1,
        d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }

    if (offset < 0) {
      offset += temp;
      i--;
    } // 是否今天


    var isTodayObj = new Date(),
        isToday = false;

    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    } // 星期几


    var nWeek = objDate.getDay(),
        cWeek = this.nStr1[nWeek]; // 数字表示周几顺应天朝周一开始的惯例

    if (nWeek == 0) {
      nWeek = 7;
    } // 农历年


    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月

    var isLeap = false; // 效验闰月

    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;
        temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      } // 解除闰月


      if (isLeap == true && i == leap + 1) {
        isLeap = false;
      }

      offset -= temp;
    } // 闰月导致数组下标重叠取反


    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }

    if (offset < 0) {
      offset += temp;
      --i;
    } // 农历月


    var month = i; // 农历日

    var day = offset + 1; // 天干地支处理

    var sm = m - 1;
    var gzY = this.toGanZhiYear(year); // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始

    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始
    // 依据12节气修正干支月

    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);

    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    } // 传入的日期的节气与否


    var isTerm = false;
    var Term = null;

    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }

    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    } // 日柱 当月一日与 1900/1/1 相差天数


    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1); // 该日期所属的星座

    var astro = this.toAstro(m, d);
    var solarDate = y + '-' + m + '-' + d;
    var lunarDate = year + '-' + month + '-' + day;
    var festival = this.festival;
    var lfestival = this.lfestival;
    var festivalDate = m + '-' + d;
    var lunarFestivalDate = month + '-' + day;
    return {
      date: solarDate,
      lunarDate: lunarDate,
      festival: festival[festivalDate] ? festival[festivalDate].title : null,
      lunarFestival: lfestival[lunarFestivalDate] ? lfestival[lunarFestivalDate].title : null,
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': this.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month),
      'IDayCn': this.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661F\u671F" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro
    };
  },

  /**
    * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
    * @param y  lunar year
    * @param m  lunar month
    * @param d  lunar day
    * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
    * @return JSON object
    * @eg:console.log(calendar.lunar2solar(1987,9,10));
    */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);

    if (isLeapMonth && leapMonth != m) {
      return -1;
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同


    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    } // 超出了最大极限值


    var day = this.monthDays(y, m);
    var _day = day; // bugFix 2016-9-25
    // if month is leap, _day use leapDays method

    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }

    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    } // 参数合法性效验
    // 计算农历的时间差


    var offset = 0;

    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }

    var leap = 0,
        isAdd = false;

    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);

      if (!isAdd) {
        // 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);
          isAdd = true;
        }
      }

      offset += this.monthDays(y, i);
    } // 转换闰月农历 需补充该年闰月的前一个月的时差


    if (isLeapMonth) {
      offset += day;
    } // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)


    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();
    return this.solar2lunar(cY, cM, cD);
  }
};
/* harmony default export */ var src_calendar = (calendar);
// CONCATENATED MODULE: ./node_modules/_@better-scroll_core@2.4.2@@better-scroll/core/dist/core.esm.js
/*!
 * better-scroll / core
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var propertiesConfig = [
    {
        sourceKey: 'scroller.scrollBehaviorX.currentPos',
        key: 'x'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.currentPos',
        key: 'y'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.hasScroll',
        key: 'hasHorizontalScroll'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.hasScroll',
        key: 'hasVerticalScroll'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.contentSize',
        key: 'scrollerWidth'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.contentSize',
        key: 'scrollerHeight'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.maxScrollPos',
        key: 'maxScrollX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.maxScrollPos',
        key: 'maxScrollY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.minScrollPos',
        key: 'minScrollX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.minScrollPos',
        key: 'minScrollY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.movingDirection',
        key: 'movingDirectionX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.movingDirection',
        key: 'movingDirectionY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.direction',
        key: 'directionX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.direction',
        key: 'directionY'
    },
    {
        sourceKey: 'scroller.actions.enabled',
        key: 'enabled'
    },
    {
        sourceKey: 'scroller.animater.pending',
        key: 'pending'
    },
    {
        sourceKey: 'scroller.animater.stop',
        key: 'stop'
    },
    {
        sourceKey: 'scroller.scrollTo',
        key: 'scrollTo'
    },
    {
        sourceKey: 'scroller.scrollBy',
        key: 'scrollBy'
    },
    {
        sourceKey: 'scroller.scrollToElement',
        key: 'scrollToElement'
    },
    {
        sourceKey: 'scroller.resetPosition',
        key: 'resetPosition'
    }
];

function warn(msg) {
    console.error("[BScroll warn]: " + msg);
}

// ssr support
var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = !!(ua && /wechatdevtools/.test(ua));
var isAndroid = ua && ua.indexOf('android') > 0;
/* istanbul ignore next */
var isIOSBadVersion = (function () {
    if (typeof ua === 'string') {
        var regex = /os (\d\d?_\d(_\d)?)/;
        var matches = regex.exec(ua);
        if (!matches)
            return false;
        var parts = matches[1].split('_').map(function (item) {
            return parseInt(item, 10);
        });
        // ios version >= 13.4 issue 982
        return !!(parts[0] === 13 && parts[1] >= 4);
    }
    return false;
})();
/* istanbul ignore next */
var supportsPassive = false;
/* istanbul ignore next */
if (inBrowser) {
    var EventName = 'test-passive';
    try {
        var opts = {};
        Object.defineProperty(opts, 'passive', {
            get: function () {
                supportsPassive = true;
            },
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener(EventName, function () { }, opts);
    }
    catch (e) { }
}

function getNow() {
    return window.performance &&
        window.performance.now &&
        window.performance.timing
        ? window.performance.now() + window.performance.timing.navigationStart
        : +new Date();
}
var extend = function (target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};
function isUndef(v) {
    return v === undefined || v === null;
}
function between(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }
    return x;
}

var elementStyle = (inBrowser &&
    document.createElement('div').style);
var vendor = (function () {
    /* istanbul ignore if  */
    if (!inBrowser) {
        return false;
    }
    var transformNames = [
        {
            key: 'standard',
            value: 'transform',
        },
        {
            key: 'webkit',
            value: 'webkitTransform',
        },
        {
            key: 'Moz',
            value: 'MozTransform',
        },
        {
            key: 'O',
            value: 'OTransform',
        },
        {
            key: 'ms',
            value: 'msTransform',
        },
    ];
    for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
        var obj = transformNames_1[_i];
        if (elementStyle[obj.value] !== undefined) {
            return obj.key;
        }
    }
    /* istanbul ignore next  */
    return false;
})();
/* istanbul ignore next  */
function prefixStyle(style) {
    if (vendor === false) {
        return style;
    }
    if (vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
function getElement(el) {
    return (typeof el === 'string'
        ? document.querySelector(el)
        : el);
}
function addEvent(el, type, fn, capture) {
    var useCapture = supportsPassive
        ? {
            passive: false,
            capture: !!capture,
        }
        : !!capture;
    el.addEventListener(type, fn, useCapture);
}
function removeEvent(el, type, fn, capture) {
    el.removeEventListener(type, fn, {
        capture: !!capture,
    });
}
function offset(el) {
    var left = 0;
    var top = 0;
    while (el) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
        el = el.offsetParent;
    }
    return {
        left: left,
        top: top,
    };
}
vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';
var transform = prefixStyle('transform');
var transition = prefixStyle('transition');
var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
// fix issue #361
var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransition = inBrowser && transition in elementStyle;
var style = {
    transform: transform,
    transition: transition,
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionDelay: prefixStyle('transitionDelay'),
    transformOrigin: prefixStyle('transformOrigin'),
    transitionEnd: prefixStyle('transitionEnd'),
    transitionProperty: prefixStyle('transitionProperty'),
};
var eventTypeMap = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,
    touchcancel: 1,
    mousedown: 2,
    mousemove: 2,
    mouseup: 2,
};
function getRect(el) {
    /* istanbul ignore if  */
    if (el instanceof window.SVGElement) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        };
    }
    else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight,
        };
    }
}
function preventDefaultExceptionFn(el, exceptions) {
    for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
            return true;
        }
    }
    return false;
}
var tagExceptionFn = preventDefaultExceptionFn;
function tap(e, eventName) {
    var ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
}
function click(e, event) {
    if (event === void 0) { event = 'click'; }
    var eventSource;
    if (e.type === 'mouseup') {
        eventSource = e;
    }
    else if (e.type === 'touchend' || e.type === 'touchcancel') {
        eventSource = e.changedTouches[0];
    }
    var posSrc = {};
    if (eventSource) {
        posSrc.screenX = eventSource.screenX || 0;
        posSrc.screenY = eventSource.screenY || 0;
        posSrc.clientX = eventSource.clientX || 0;
        posSrc.clientY = eventSource.clientY || 0;
    }
    var ev;
    var bubbles = true;
    var cancelable = true;
    var ctrlKey = e.ctrlKey, shiftKey = e.shiftKey, altKey = e.altKey, metaKey = e.metaKey;
    var pressedKeysMap = {
        ctrlKey: ctrlKey,
        shiftKey: shiftKey,
        altKey: altKey,
        metaKey: metaKey,
    };
    if (typeof MouseEvent !== 'undefined') {
        try {
            ev = new MouseEvent(event, extend(__assign({ bubbles: bubbles,
                cancelable: cancelable }, pressedKeysMap), posSrc));
        }
        catch (e) {
            /* istanbul ignore next */
            createEvent();
        }
    }
    else {
        createEvent();
    }
    function createEvent() {
        ev = document.createEvent('Event');
        ev.initEvent(event, bubbles, cancelable);
        extend(ev, posSrc);
    }
    // forwardedTouchEvent set to true in case of the conflict with fastclick
    ev.forwardedTouchEvent = true;
    ev._constructed = true;
    e.target.dispatchEvent(ev);
}
function dblclick(e) {
    click(e, 'dblclick');
}

var ease = {
    // easeOutQuint
    swipe: {
        style: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fn: function (t) {
            return 1 + --t * t * t * t * t;
        }
    },
    // easeOutQuard
    swipeBounce: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (t) {
            return t * (2 - t);
        }
    },
    // easeOutQuart
    bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function (t) {
            return 1 - --t * t * t * t;
        }
    }
};

var DEFAULT_INTERVAL = 1000 / 60;
var windowCompat = inBrowser && window;
/* istanbul ignore next */
function noop$1() { }
var requestAnimationFrame = (function () {
    /* istanbul ignore if  */
    if (!inBrowser) {
        return noop$1;
    }
    return (windowCompat.requestAnimationFrame ||
        windowCompat.webkitRequestAnimationFrame ||
        windowCompat.mozRequestAnimationFrame ||
        windowCompat.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL); // make interval as precise as possible.
        });
})();
var cancelAnimationFrame = (function () {
    /* istanbul ignore if  */
    if (!inBrowser) {
        return noop$1;
    }
    return (windowCompat.cancelAnimationFrame ||
        windowCompat.webkitCancelAnimationFrame ||
        windowCompat.mozCancelAnimationFrame ||
        windowCompat.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        });
})();

/* istanbul ignore next */
var noop = function (val) { };
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop,
};
var getProperty = function (obj, key) {
    var keys = key.split('.');
    for (var i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
        if (typeof obj !== 'object' || !obj)
            return;
    }
    var lastKey = keys.pop();
    if (typeof obj[lastKey] === 'function') {
        return function () {
            return obj[lastKey].apply(obj, arguments);
        };
    }
    else {
        return obj[lastKey];
    }
};
var setProperty = function (obj, key, value) {
    var keys = key.split('.');
    var temp;
    for (var i = 0; i < keys.length - 1; i++) {
        temp = keys[i];
        if (!obj[temp])
            obj[temp] = {};
        obj = obj[temp];
    }
    obj[keys.pop()] = value;
};
function propertiesProxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return getProperty(this, sourceKey);
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        setProperty(this, sourceKey, val);
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

var EventEmitter = /** @class */ (function () {
    function EventEmitter(names) {
        this.events = {};
        this.eventTypes = {};
        this.registerType(names);
    }
    EventEmitter.prototype.on = function (type, fn, context) {
        if (context === void 0) { context = this; }
        this.hasType(type);
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push([fn, context]);
        return this;
    };
    EventEmitter.prototype.once = function (type, fn, context) {
        var _this = this;
        if (context === void 0) { context = this; }
        this.hasType(type);
        var magic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.off(type, magic);
            var ret = fn.apply(context, args);
            if (ret === true) {
                return ret;
            }
        };
        magic.fn = fn;
        this.on(type, magic);
        return this;
    };
    EventEmitter.prototype.off = function (type, fn) {
        if (!type && !fn) {
            this.events = {};
            return this;
        }
        if (type) {
            this.hasType(type);
            if (!fn) {
                this.events[type] = [];
                return this;
            }
            var events = this.events[type];
            if (!events) {
                return this;
            }
            var count = events.length;
            while (count--) {
                if (events[count][0] === fn ||
                    (events[count][0] && events[count][0].fn === fn)) {
                    events.splice(count, 1);
                }
            }
            return this;
        }
    };
    EventEmitter.prototype.trigger = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.hasType(type);
        var events = this.events[type];
        if (!events) {
            return;
        }
        var len = events.length;
        var eventsCopy = __spreadArrays(events);
        var ret;
        for (var i = 0; i < len; i++) {
            var event_1 = eventsCopy[i];
            var fn = event_1[0], context = event_1[1];
            if (fn) {
                ret = fn.apply(context, args);
                if (ret === true) {
                    return ret;
                }
            }
        }
    };
    EventEmitter.prototype.registerType = function (names) {
        var _this = this;
        names.forEach(function (type) {
            _this.eventTypes[type] = type;
        });
    };
    EventEmitter.prototype.destroy = function () {
        this.events = {};
        this.eventTypes = {};
    };
    EventEmitter.prototype.hasType = function (type) {
        var types = this.eventTypes;
        var isType = types[type] === type;
        if (!isType) {
            warn("EventEmitter has used unknown event type: \"" + type + "\", should be oneof [" +
                ("" + Object.keys(types).map(function (_) { return JSON.stringify(_); })) +
                "]");
        }
    };
    return EventEmitter;
}());
var EventRegister = /** @class */ (function () {
    function EventRegister(wrapper, events) {
        this.wrapper = wrapper;
        this.events = events;
        this.addDOMEvents();
    }
    EventRegister.prototype.destroy = function () {
        this.removeDOMEvents();
        this.events = [];
    };
    EventRegister.prototype.addDOMEvents = function () {
        this.handleDOMEvents(addEvent);
    };
    EventRegister.prototype.removeDOMEvents = function () {
        this.handleDOMEvents(removeEvent);
    };
    EventRegister.prototype.handleDOMEvents = function (eventOperation) {
        var _this = this;
        var wrapper = this.wrapper;
        this.events.forEach(function (event) {
            eventOperation(wrapper, event.name, _this, !!event.capture);
        });
    };
    EventRegister.prototype.handleEvent = function (e) {
        var eventType = e.type;
        this.events.some(function (event) {
            if (event.name === eventType) {
                event.handler(e);
                return true;
            }
            return false;
        });
    };
    return EventRegister;
}());

var CustomOptions = /** @class */ (function () {
    function CustomOptions() {
    }
    return CustomOptions;
}());
var OptionsConstructor = /** @class */ (function (_super) {
    __extends(OptionsConstructor, _super);
    function OptionsConstructor() {
        var _this = _super.call(this) || this;
        _this.startX = 0;
        _this.startY = 0;
        _this.scrollX = false;
        _this.scrollY = true;
        _this.freeScroll = false;
        _this.directionLockThreshold = 0;
        _this.eventPassthrough = "" /* None */;
        _this.click = false;
        _this.dblclick = false;
        _this.tap = '';
        _this.bounce = {
            top: true,
            bottom: true,
            left: true,
            right: true,
        };
        _this.bounceTime = 800;
        _this.momentum = true;
        _this.momentumLimitTime = 300;
        _this.momentumLimitDistance = 15;
        _this.swipeTime = 2500;
        _this.swipeBounceTime = 500;
        _this.deceleration = 0.0015;
        _this.flickLimitTime = 200;
        _this.flickLimitDistance = 100;
        _this.resizePolling = 60;
        _this.probeType = 0 /* Default */;
        _this.stopPropagation = false;
        _this.preventDefault = true;
        _this.preventDefaultException = {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/,
        };
        _this.tagException = {
            tagName: /^TEXTAREA$/,
        };
        _this.HWCompositing = true;
        _this.useTransition = true;
        _this.bindToWrapper = false;
        _this.bindToTarget = false;
        _this.disableMouse = hasTouch;
        _this.disableTouch = !hasTouch;
        _this.autoBlur = true;
        _this.autoEndDistance = 5;
        _this.outOfBoundaryDampingFactor = 1 / 3;
        _this.specifiedIndexAsContent = 0;
        _this.quadrant = 1 /* First */;
        return _this;
    }
    OptionsConstructor.prototype.merge = function (options) {
        if (!options)
            return this;
        for (var key in options) {
            if (key === 'bounce') {
                this.bounce = this.resolveBounce(options[key]);
                continue;
            }
            this[key] = options[key];
        }
        return this;
    };
    OptionsConstructor.prototype.process = function () {
        this.translateZ =
            this.HWCompositing && hasPerspective ? ' translateZ(1px)' : '';
        this.useTransition = this.useTransition && hasTransition;
        this.preventDefault = !this.eventPassthrough && this.preventDefault;
        // If you want eventPassthrough I have to lock one of the axes
        this.scrollX =
            this.eventPassthrough === "horizontal" /* Horizontal */
                ? false
                : this.scrollX;
        this.scrollY =
            this.eventPassthrough === "vertical" /* Vertical */ ? false : this.scrollY;
        // With eventPassthrough we also need lockDirection mechanism
        this.freeScroll = this.freeScroll && !this.eventPassthrough;
        // force true when freeScroll is true
        this.scrollX = this.freeScroll ? true : this.scrollX;
        this.scrollY = this.freeScroll ? true : this.scrollY;
        this.directionLockThreshold = this.eventPassthrough
            ? 0
            : this.directionLockThreshold;
        return this;
    };
    OptionsConstructor.prototype.resolveBounce = function (bounceOptions) {
        var DEFAULT_BOUNCE = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
        var NEGATED_BOUNCE = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        };
        var ret;
        if (typeof bounceOptions === 'object') {
            ret = extend(DEFAULT_BOUNCE, bounceOptions);
        }
        else {
            ret = bounceOptions ? DEFAULT_BOUNCE : NEGATED_BOUNCE;
        }
        return ret;
    };
    return OptionsConstructor;
}(CustomOptions));

var ActionsHandler = /** @class */ (function () {
    function ActionsHandler(wrapper, options) {
        this.wrapper = wrapper;
        this.options = options;
        this.hooks = new EventEmitter([
            'beforeStart',
            'start',
            'move',
            'end',
            'click',
        ]);
        this.handleDOMEvents();
    }
    ActionsHandler.prototype.handleDOMEvents = function () {
        var _a = this.options, bindToWrapper = _a.bindToWrapper, disableMouse = _a.disableMouse, disableTouch = _a.disableTouch, click = _a.click;
        var wrapper = this.wrapper;
        var target = bindToWrapper ? wrapper : window;
        var wrapperEvents = [];
        var targetEvents = [];
        var shouldRegisterTouch = !disableTouch;
        var shouldRegisterMouse = !disableMouse;
        if (click) {
            wrapperEvents.push({
                name: 'click',
                handler: this.click.bind(this),
                capture: true,
            });
        }
        if (shouldRegisterTouch) {
            wrapperEvents.push({
                name: 'touchstart',
                handler: this.start.bind(this),
            });
            targetEvents.push({
                name: 'touchmove',
                handler: this.move.bind(this),
            }, {
                name: 'touchend',
                handler: this.end.bind(this),
            }, {
                name: 'touchcancel',
                handler: this.end.bind(this),
            });
        }
        if (shouldRegisterMouse) {
            wrapperEvents.push({
                name: 'mousedown',
                handler: this.start.bind(this),
            });
            targetEvents.push({
                name: 'mousemove',
                handler: this.move.bind(this),
            }, {
                name: 'mouseup',
                handler: this.end.bind(this),
            });
        }
        this.wrapperEventRegister = new EventRegister(wrapper, wrapperEvents);
        this.targetEventRegister = new EventRegister(target, targetEvents);
    };
    ActionsHandler.prototype.beforeHandler = function (e, type) {
        var _a = this.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
        var preventDefaultConditions = {
            start: function () {
                return (preventDefault &&
                    !preventDefaultExceptionFn(e.target, preventDefaultException));
            },
            end: function () {
                return (preventDefault &&
                    !preventDefaultExceptionFn(e.target, preventDefaultException));
            },
            move: function () {
                return preventDefault;
            },
        };
        if (preventDefaultConditions[type]()) {
            e.preventDefault();
        }
        if (stopPropagation) {
            e.stopPropagation();
        }
    };
    ActionsHandler.prototype.setInitiated = function (type) {
        if (type === void 0) { type = 0; }
        this.initiated = type;
    };
    ActionsHandler.prototype.start = function (e) {
        var _eventType = eventTypeMap[e.type];
        if (this.initiated && this.initiated !== _eventType) {
            return;
        }
        this.setInitiated(_eventType);
        // if textarea or other html tags in options.tagException is manipulated
        // do not make bs scroll
        if (tagExceptionFn(e.target, this.options.tagException)) {
            this.setInitiated();
            return;
        }
        // only allow mouse left button
        if (_eventType === 2 /* Mouse */ && e.button !== 0 /* Left */)
            return;
        if (this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
            return;
        }
        this.beforeHandler(e, 'start');
        var point = (e.touches ? e.touches[0] : e);
        this.pointX = point.pageX;
        this.pointY = point.pageY;
        this.hooks.trigger(this.hooks.eventTypes.start, e);
    };
    ActionsHandler.prototype.move = function (e) {
        if (eventTypeMap[e.type] !== this.initiated) {
            return;
        }
        this.beforeHandler(e, 'move');
        var point = (e.touches ? e.touches[0] : e);
        var deltaX = point.pageX - this.pointX;
        var deltaY = point.pageY - this.pointY;
        this.pointX = point.pageX;
        this.pointY = point.pageY;
        if (this.hooks.trigger(this.hooks.eventTypes.move, {
            deltaX: deltaX,
            deltaY: deltaY,
            e: e,
        })) {
            return;
        }
        // auto end when out of viewport
        var scrollLeft = document.documentElement.scrollLeft ||
            window.pageXOffset ||
            document.body.scrollLeft;
        var scrollTop = document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
        var pX = this.pointX - scrollLeft;
        var pY = this.pointY - scrollTop;
        var autoEndDistance = this.options.autoEndDistance;
        if (pX > document.documentElement.clientWidth - autoEndDistance ||
            pY > document.documentElement.clientHeight - autoEndDistance ||
            pX < autoEndDistance ||
            pY < autoEndDistance) {
            this.end(e);
        }
    };
    ActionsHandler.prototype.end = function (e) {
        if (eventTypeMap[e.type] !== this.initiated) {
            return;
        }
        this.setInitiated();
        this.beforeHandler(e, 'end');
        this.hooks.trigger(this.hooks.eventTypes.end, e);
    };
    ActionsHandler.prototype.click = function (e) {
        this.hooks.trigger(this.hooks.eventTypes.click, e);
    };
    ActionsHandler.prototype.setContent = function (content) {
        if (content !== this.wrapper) {
            this.wrapper = content;
            this.rebindDOMEvents();
        }
    };
    ActionsHandler.prototype.rebindDOMEvents = function () {
        this.wrapperEventRegister.destroy();
        this.targetEventRegister.destroy();
        this.handleDOMEvents();
    };
    ActionsHandler.prototype.destroy = function () {
        this.wrapperEventRegister.destroy();
        this.targetEventRegister.destroy();
        this.hooks.destroy();
    };
    return ActionsHandler;
}());

var translaterMetaData = {
    x: ['translateX', 'px'],
    y: ['translateY', 'px'],
};
var Translater = /** @class */ (function () {
    function Translater(content) {
        this.setContent(content);
        this.hooks = new EventEmitter(['beforeTranslate', 'translate']);
    }
    Translater.prototype.getComputedPosition = function () {
        var cssStyle = window.getComputedStyle(this.content, null);
        var matrix = cssStyle[style.transform].split(')')[0].split(', ');
        var x = +(matrix[12] || matrix[4]) || 0;
        var y = +(matrix[13] || matrix[5]) || 0;
        return {
            x: x,
            y: y,
        };
    };
    Translater.prototype.translate = function (point) {
        var transformStyle = [];
        Object.keys(point).forEach(function (key) {
            if (!translaterMetaData[key]) {
                return;
            }
            var transformFnName = translaterMetaData[key][0];
            if (transformFnName) {
                var transformFnArgUnit = translaterMetaData[key][1];
                var transformFnArg = point[key];
                transformStyle.push(transformFnName + "(" + transformFnArg + transformFnArgUnit + ")");
            }
        });
        this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, transformStyle, point);
        this.style[style.transform] = transformStyle.join(' ');
        this.hooks.trigger(this.hooks.eventTypes.translate, point);
    };
    Translater.prototype.setContent = function (content) {
        if (this.content !== content) {
            this.content = content;
            this.style = content.style;
        }
    };
    Translater.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return Translater;
}());

var Base = /** @class */ (function () {
    function Base(content, translater, options) {
        this.translater = translater;
        this.options = options;
        this.timer = 0;
        this.hooks = new EventEmitter([
            'move',
            'end',
            'beforeForceStop',
            'forceStop',
            'callStop',
            'time',
            'timeFunction',
        ]);
        this.setContent(content);
    }
    Base.prototype.translate = function (endPoint) {
        this.translater.translate(endPoint);
    };
    Base.prototype.setPending = function (pending) {
        this.pending = pending;
    };
    Base.prototype.setForceStopped = function (forceStopped) {
        this.forceStopped = forceStopped;
    };
    Base.prototype.setCallStop = function (called) {
        this.callStopWhenPending = called;
    };
    Base.prototype.setContent = function (content) {
        if (this.content !== content) {
            this.content = content;
            this.style = content.style;
            this.stop();
        }
    };
    Base.prototype.clearTimer = function () {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        }
    };
    Base.prototype.destroy = function () {
        this.hooks.destroy();
        cancelAnimationFrame(this.timer);
    };
    return Base;
}());

// iOS 13.6 - 14.x, window.getComputedStyle sometimes will get wrong transform value
// when bs use transition mode
// eg: translateY -100px -> -200px, when the last frame which is about to scroll to -200px
// window.getComputedStyle(this.content) will calculate transformY to be -100px(startPoint)
// it is weird
// so we should validate position caculated by 'window.getComputedStyle'
var isValidPostion = function (startPoint, endPoint, currentPos, prePos) {
    var computeDirection = function (endValue, startValue) {
        var delta = endValue - startValue;
        var direction = delta > 0
            ? -1 /* Negative */
            : delta < 0
                ? 1 /* Positive */
                : 0 /* Default */;
        return direction;
    };
    var directionX = computeDirection(endPoint.x, startPoint.x);
    var directionY = computeDirection(endPoint.y, startPoint.y);
    var deltaX = currentPos.x - prePos.x;
    var deltaY = currentPos.y - prePos.y;
    return directionX * deltaX <= 0 && directionY * deltaY <= 0;
};

var Transition = /** @class */ (function (_super) {
    __extends(Transition, _super);
    function Transition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transition.prototype.startProbe = function (startPoint, endPoint) {
        var _this = this;
        var prePos = startPoint;
        var probe = function () {
            var pos = _this.translater.getComputedPosition();
            if (isValidPostion(startPoint, endPoint, pos, prePos)) {
                _this.hooks.trigger(_this.hooks.eventTypes.move, pos);
            }
            // call bs.stop() should not dispatch end hook again.
            // forceStop hook will do this.
            /* istanbul ignore if  */
            if (!_this.pending) {
                if (_this.callStopWhenPending) {
                    _this.callStopWhenPending = false;
                }
                else {
                    // transition ends should dispatch end hook.
                    _this.hooks.trigger(_this.hooks.eventTypes.end, pos);
                }
            }
            prePos = pos;
            if (_this.pending) {
                _this.timer = requestAnimationFrame(probe);
            }
        };
        // when manually call bs.stop(), then bs.scrollTo()
        // we should reset callStopWhenPending to dispatch end hook
        if (this.callStopWhenPending) {
            this.setCallStop(false);
        }
        cancelAnimationFrame(this.timer);
        probe();
    };
    Transition.prototype.transitionTime = function (time) {
        if (time === void 0) { time = 0; }
        this.style[style.transitionDuration] = time + 'ms';
        this.hooks.trigger(this.hooks.eventTypes.time, time);
    };
    Transition.prototype.transitionTimingFunction = function (easing) {
        this.style[style.transitionTimingFunction] = easing;
        this.hooks.trigger(this.hooks.eventTypes.timeFunction, easing);
    };
    Transition.prototype.transitionProperty = function () {
        this.style[style.transitionProperty] = style.transform;
    };
    Transition.prototype.move = function (startPoint, endPoint, time, easingFn) {
        this.setPending(time > 0);
        this.transitionTimingFunction(easingFn);
        this.transitionProperty();
        this.transitionTime(time);
        this.translate(endPoint);
        var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
        if (time && isRealtimeProbeType) {
            this.startProbe(startPoint, endPoint);
        }
        // if we change content's transformY in a tick
        // such as: 0 -> 50px -> 0
        // transitionend will not be triggered
        // so we forceupdate by reflow
        if (!time) {
            this._reflow = this.content.offsetHeight;
            if (isRealtimeProbeType) {
                this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
            }
            this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
        }
    };
    Transition.prototype.doStop = function () {
        var pending = this.pending;
        this.setForceStopped(false);
        this.setCallStop(false);
        // still in transition
        if (pending) {
            this.setPending(false);
            cancelAnimationFrame(this.timer);
            var _a = this.translater.getComputedPosition(), x = _a.x, y = _a.y;
            this.transitionTime();
            this.translate({ x: x, y: y });
            this.setForceStopped(true);
            this.setCallStop(true);
            this.hooks.trigger(this.hooks.eventTypes.forceStop, { x: x, y: y });
        }
        return pending;
    };
    Transition.prototype.stop = function () {
        var stopFromTransition = this.doStop();
        if (stopFromTransition) {
            this.hooks.trigger(this.hooks.eventTypes.callStop);
        }
    };
    return Transition;
}(Base));

var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.prototype.move = function (startPoint, endPoint, time, easingFn) {
        // time is 0
        if (!time) {
            this.translate(endPoint);
            if (this.options.probeType === 3 /* Realtime */) {
                this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
            }
            this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
            return;
        }
        this.animate(startPoint, endPoint, time, easingFn);
    };
    Animation.prototype.animate = function (startPoint, endPoint, duration, easingFn) {
        var _this = this;
        var startTime = getNow();
        var destTime = startTime + duration;
        var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
        var step = function () {
            var now = getNow();
            // js animation end
            if (now >= destTime) {
                _this.translate(endPoint);
                if (isRealtimeProbeType) {
                    _this.hooks.trigger(_this.hooks.eventTypes.move, endPoint);
                }
                _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
                return;
            }
            now = (now - startTime) / duration;
            var easing = easingFn(now);
            var newPoint = {};
            Object.keys(endPoint).forEach(function (key) {
                var startValue = startPoint[key];
                var endValue = endPoint[key];
                newPoint[key] = (endValue - startValue) * easing + startValue;
            });
            _this.translate(newPoint);
            if (isRealtimeProbeType) {
                _this.hooks.trigger(_this.hooks.eventTypes.move, newPoint);
            }
            if (_this.pending) {
                _this.timer = requestAnimationFrame(step);
            }
            // call bs.stop() should not dispatch end hook again.
            // forceStop hook will do this.
            /* istanbul ignore if  */
            if (!_this.pending) {
                if (_this.callStopWhenPending) {
                    _this.callStopWhenPending = false;
                }
                else {
                    // raf ends should dispatch end hook.
                    _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
                }
            }
        };
        this.setPending(true);
        // when manually call bs.stop(), then bs.scrollTo()
        // we should reset callStopWhenPending to dispatch end hook
        if (this.callStopWhenPending) {
            this.setCallStop(false);
        }
        cancelAnimationFrame(this.timer);
        step();
    };
    Animation.prototype.doStop = function () {
        var pending = this.pending;
        this.setForceStopped(false);
        this.setCallStop(false);
        // still in requestFrameAnimation
        if (pending) {
            this.setPending(false);
            cancelAnimationFrame(this.timer);
            var pos = this.translater.getComputedPosition();
            this.setForceStopped(true);
            this.setCallStop(true);
            this.hooks.trigger(this.hooks.eventTypes.forceStop, pos);
        }
        return pending;
    };
    Animation.prototype.stop = function () {
        var stopFromAnimation = this.doStop();
        if (stopFromAnimation) {
            this.hooks.trigger(this.hooks.eventTypes.callStop);
        }
    };
    return Animation;
}(Base));

function createAnimater(element, translater, options) {
    var useTransition = options.useTransition;
    var animaterOptions = {};
    Object.defineProperty(animaterOptions, 'probeType', {
        enumerable: true,
        configurable: false,
        get: function () {
            return options.probeType;
        },
    });
    if (useTransition) {
        return new Transition(element, translater, animaterOptions);
    }
    else {
        return new Animation(element, translater, animaterOptions);
    }
}

var Behavior = /** @class */ (function () {
    function Behavior(wrapper, content, options) {
        this.wrapper = wrapper;
        this.options = options;
        this.hooks = new EventEmitter([
            'beforeComputeBoundary',
            'computeBoundary',
            'momentum',
            'end',
            'ignoreHasScroll'
        ]);
        this.refresh(content);
    }
    Behavior.prototype.start = function () {
        this.dist = 0;
        this.setMovingDirection(0 /* Default */);
        this.setDirection(0 /* Default */);
    };
    Behavior.prototype.move = function (delta) {
        delta = this.hasScroll ? delta : 0;
        this.setMovingDirection(delta);
        return this.performDampingAlgorithm(delta, this.options.outOfBoundaryDampingFactor);
    };
    Behavior.prototype.setMovingDirection = function (delta) {
        this.movingDirection =
            delta > 0
                ? -1 /* Negative */
                : delta < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
    };
    Behavior.prototype.setDirection = function (delta) {
        this.direction =
            delta > 0
                ? -1 /* Negative */
                : delta < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
    };
    Behavior.prototype.performDampingAlgorithm = function (delta, dampingFactor) {
        var newPos = this.currentPos + delta;
        // Slow down or stop if outside of the boundaries
        if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
            if ((newPos > this.minScrollPos && this.options.bounces[0]) ||
                (newPos < this.maxScrollPos && this.options.bounces[1])) {
                newPos = this.currentPos + delta * dampingFactor;
            }
            else {
                newPos =
                    newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos;
            }
        }
        return newPos;
    };
    Behavior.prototype.end = function (duration) {
        var momentumInfo = {
            duration: 0
        };
        var absDist = Math.abs(this.currentPos - this.startPos);
        // start momentum animation if needed
        if (this.options.momentum &&
            duration < this.options.momentumLimitTime &&
            absDist > this.options.momentumLimitDistance) {
            var wrapperSize = (this.direction === -1 /* Negative */ && this.options.bounces[0]) ||
                (this.direction === 1 /* Positive */ && this.options.bounces[1])
                ? this.wrapperSize
                : 0;
            momentumInfo = this.hasScroll
                ? this.momentum(this.currentPos, this.startPos, duration, this.maxScrollPos, this.minScrollPos, wrapperSize, this.options)
                : { destination: this.currentPos, duration: 0 };
        }
        else {
            this.hooks.trigger(this.hooks.eventTypes.end, momentumInfo);
        }
        return momentumInfo;
    };
    Behavior.prototype.momentum = function (current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
        if (options === void 0) { options = this.options; }
        var distance = current - start;
        var speed = Math.abs(distance) / time;
        var deceleration = options.deceleration, swipeBounceTime = options.swipeBounceTime, swipeTime = options.swipeTime;
        var duration = Math.min(swipeTime, (speed * 2) / deceleration);
        var momentumData = {
            destination: current + ((speed * speed) / deceleration) * (distance < 0 ? -1 : 1),
            duration: duration,
            rate: 15
        };
        this.hooks.trigger(this.hooks.eventTypes.momentum, momentumData, distance);
        if (momentumData.destination < lowerMargin) {
            momentumData.destination = wrapperSize
                ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - (wrapperSize / momentumData.rate) * speed)
                : lowerMargin;
            momentumData.duration = swipeBounceTime;
        }
        else if (momentumData.destination > upperMargin) {
            momentumData.destination = wrapperSize
                ? Math.min(upperMargin + wrapperSize / 4, upperMargin + (wrapperSize / momentumData.rate) * speed)
                : upperMargin;
            momentumData.duration = swipeBounceTime;
        }
        momentumData.destination = Math.round(momentumData.destination);
        return momentumData;
    };
    Behavior.prototype.updateDirection = function () {
        var absDist = this.currentPos - this.absStartPos;
        this.setDirection(absDist);
    };
    Behavior.prototype.refresh = function (content) {
        var _a = this.options.rect, size = _a.size, position = _a.position;
        var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
        // Force reflow
        var wrapperRect = getRect(this.wrapper);
        // use client is more fair than offset
        this.wrapperSize = this.wrapper[size === 'width' ? 'clientWidth' : 'clientHeight'];
        this.setContent(content);
        var contentRect = getRect(this.content);
        this.contentSize = contentRect[size];
        this.relativeOffset = contentRect[position];
        /* istanbul ignore if  */
        if (isWrapperStatic) {
            this.relativeOffset -= wrapperRect[position];
        }
        this.computeBoundary();
        this.setDirection(0 /* Default */);
    };
    Behavior.prototype.setContent = function (content) {
        if (content !== this.content) {
            this.content = content;
            this.resetState();
        }
    };
    Behavior.prototype.resetState = function () {
        this.currentPos = 0;
        this.startPos = 0;
        this.dist = 0;
        this.setDirection(0 /* Default */);
        this.setMovingDirection(0 /* Default */);
        this.resetStartPos();
    };
    Behavior.prototype.computeBoundary = function () {
        this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
        var boundary = {
            minScrollPos: 0,
            maxScrollPos: this.wrapperSize - this.contentSize
        };
        if (boundary.maxScrollPos < 0) {
            boundary.maxScrollPos -= this.relativeOffset;
            if (this.options.specifiedIndexAsContent === 0) {
                boundary.minScrollPos = -this.relativeOffset;
            }
        }
        this.hooks.trigger(this.hooks.eventTypes.computeBoundary, boundary);
        this.minScrollPos = boundary.minScrollPos;
        this.maxScrollPos = boundary.maxScrollPos;
        this.hasScroll =
            this.options.scrollable && this.maxScrollPos < this.minScrollPos;
        if (!this.hasScroll && this.minScrollPos < this.maxScrollPos) {
            this.maxScrollPos = this.minScrollPos;
            this.contentSize = this.wrapperSize;
        }
    };
    Behavior.prototype.updatePosition = function (pos) {
        this.currentPos = pos;
    };
    Behavior.prototype.getCurrentPos = function () {
        return this.currentPos;
    };
    Behavior.prototype.checkInBoundary = function () {
        var position = this.adjustPosition(this.currentPos);
        var inBoundary = position === this.getCurrentPos();
        return {
            position: position,
            inBoundary: inBoundary
        };
    };
    // adjust position when out of boundary
    Behavior.prototype.adjustPosition = function (pos) {
        if (!this.hasScroll &&
            !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll)) {
            pos = this.minScrollPos;
        }
        else if (pos > this.minScrollPos) {
            pos = this.minScrollPos;
        }
        else if (pos < this.maxScrollPos) {
            pos = this.maxScrollPos;
        }
        return pos;
    };
    Behavior.prototype.updateStartPos = function () {
        this.startPos = this.currentPos;
    };
    Behavior.prototype.updateAbsStartPos = function () {
        this.absStartPos = this.currentPos;
    };
    Behavior.prototype.resetStartPos = function () {
        this.updateStartPos();
        this.updateAbsStartPos();
    };
    Behavior.prototype.getAbsDist = function (delta) {
        this.dist += delta;
        return Math.abs(this.dist);
    };
    Behavior.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return Behavior;
}());

var _a, _b, _c, _d;
var PassthroughHandlers = (_a = {},
    _a["yes" /* Yes */] = function (e) {
        return true;
    },
    _a["no" /* No */] = function (e) {
        e.preventDefault();
        return false;
    },
    _a);
var DirectionMap = (_b = {},
    _b["horizontal" /* Horizontal */] = (_c = {},
        _c["yes" /* Yes */] = "horizontal" /* Horizontal */,
        _c["no" /* No */] = "vertical" /* Vertical */,
        _c),
    _b["vertical" /* Vertical */] = (_d = {},
        _d["yes" /* Yes */] = "vertical" /* Vertical */,
        _d["no" /* No */] = "horizontal" /* Horizontal */,
        _d),
    _b);
var DirectionLockAction = /** @class */ (function () {
    function DirectionLockAction(directionLockThreshold, freeScroll, eventPassthrough) {
        this.directionLockThreshold = directionLockThreshold;
        this.freeScroll = freeScroll;
        this.eventPassthrough = eventPassthrough;
        this.reset();
    }
    DirectionLockAction.prototype.reset = function () {
        this.directionLocked = "" /* Default */;
    };
    DirectionLockAction.prototype.checkMovingDirection = function (absDistX, absDistY, e) {
        this.computeDirectionLock(absDistX, absDistY);
        return this.handleEventPassthrough(e);
    };
    DirectionLockAction.prototype.adjustDelta = function (deltaX, deltaY) {
        if (this.directionLocked === "horizontal" /* Horizontal */) {
            deltaY = 0;
        }
        else if (this.directionLocked === "vertical" /* Vertical */) {
            deltaX = 0;
        }
        return {
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    DirectionLockAction.prototype.computeDirectionLock = function (absDistX, absDistY) {
        // If you are scrolling in one direction, lock it
        if (this.directionLocked === "" /* Default */ && !this.freeScroll) {
            if (absDistX > absDistY + this.directionLockThreshold) {
                this.directionLocked = "horizontal" /* Horizontal */; // lock horizontally
            }
            else if (absDistY >= absDistX + this.directionLockThreshold) {
                this.directionLocked = "vertical" /* Vertical */; // lock vertically
            }
            else {
                this.directionLocked = "none" /* None */; // no lock
            }
        }
    };
    DirectionLockAction.prototype.handleEventPassthrough = function (e) {
        var handleMap = DirectionMap[this.directionLocked];
        if (handleMap) {
            if (this.eventPassthrough === handleMap["yes" /* Yes */]) {
                return PassthroughHandlers["yes" /* Yes */](e);
            }
            else if (this.eventPassthrough === handleMap["no" /* No */]) {
                return PassthroughHandlers["no" /* No */](e);
            }
        }
        return false;
    };
    return DirectionLockAction;
}());

var applyQuadrantTransformation = function (deltaX, deltaY, quadrant) {
    if (quadrant === 2 /* Second */) {
        return [deltaY, -deltaX];
    }
    else if (quadrant === 3 /* Third */) {
        return [-deltaX, -deltaY];
    }
    else if (quadrant === 4 /* Forth */) {
        return [-deltaY, deltaX];
    }
    else {
        return [deltaX, deltaY];
    }
};
var ScrollerActions = /** @class */ (function () {
    function ScrollerActions(scrollBehaviorX, scrollBehaviorY, actionsHandler, animater, options) {
        this.hooks = new EventEmitter([
            'start',
            'beforeMove',
            'scrollStart',
            'scroll',
            'beforeEnd',
            'end',
            'scrollEnd',
            'contentNotMoved',
            'detectMovingDirection',
            'coordinateTransformation',
        ]);
        this.scrollBehaviorX = scrollBehaviorX;
        this.scrollBehaviorY = scrollBehaviorY;
        this.actionsHandler = actionsHandler;
        this.animater = animater;
        this.options = options;
        this.directionLockAction = new DirectionLockAction(options.directionLockThreshold, options.freeScroll, options.eventPassthrough);
        this.enabled = true;
        this.bindActionsHandler();
    }
    ScrollerActions.prototype.bindActionsHandler = function () {
        var _this = this;
        // [mouse|touch]start event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function (e) {
            if (!_this.enabled)
                return true;
            return _this.handleStart(e);
        });
        // [mouse|touch]move event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY, e = _a.e;
            if (!_this.enabled)
                return true;
            var _b = applyQuadrantTransformation(deltaX, deltaY, _this.options.quadrant), transformateDeltaX = _b[0], transformateDeltaY = _b[1];
            var transformateDeltaData = {
                deltaX: transformateDeltaX,
                deltaY: transformateDeltaY,
            };
            _this.hooks.trigger(_this.hooks.eventTypes.coordinateTransformation, transformateDeltaData);
            return _this.handleMove(transformateDeltaData.deltaX, transformateDeltaData.deltaY, e);
        });
        // [mouse|touch]end event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function (e) {
            if (!_this.enabled)
                return true;
            return _this.handleEnd(e);
        });
        // click
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function (e) {
            // handle native click event
            if (_this.enabled && !e._constructed) {
                _this.handleClick(e);
            }
        });
    };
    ScrollerActions.prototype.handleStart = function (e) {
        var timestamp = getNow();
        this.fingerMoved = false;
        this.contentMoved = false;
        this.startTime = timestamp;
        this.directionLockAction.reset();
        this.scrollBehaviorX.start();
        this.scrollBehaviorY.start();
        // force stopping last transition or animation
        this.animater.doStop();
        this.scrollBehaviorX.resetStartPos();
        this.scrollBehaviorY.resetStartPos();
        this.hooks.trigger(this.hooks.eventTypes.start, e);
    };
    ScrollerActions.prototype.handleMove = function (deltaX, deltaY, e) {
        if (this.hooks.trigger(this.hooks.eventTypes.beforeMove, e)) {
            return;
        }
        var absDistX = this.scrollBehaviorX.getAbsDist(deltaX);
        var absDistY = this.scrollBehaviorY.getAbsDist(deltaY);
        var timestamp = getNow();
        // We need to move at least momentumLimitDistance pixels
        // for the scrolling to initiate
        if (this.checkMomentum(absDistX, absDistY, timestamp)) {
            return true;
        }
        if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
            this.actionsHandler.setInitiated();
            return true;
        }
        var delta = this.directionLockAction.adjustDelta(deltaX, deltaY);
        var prevX = this.scrollBehaviorX.getCurrentPos();
        var newX = this.scrollBehaviorX.move(delta.deltaX);
        var prevY = this.scrollBehaviorY.getCurrentPos();
        var newY = this.scrollBehaviorY.move(delta.deltaY);
        if (this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
            return;
        }
        if (!this.fingerMoved) {
            this.fingerMoved = true;
        }
        var positionChanged = newX !== prevX || newY !== prevY;
        if (!this.contentMoved && !positionChanged) {
            this.hooks.trigger(this.hooks.eventTypes.contentNotMoved);
        }
        if (!this.contentMoved && positionChanged) {
            this.contentMoved = true;
            this.hooks.trigger(this.hooks.eventTypes.scrollStart);
        }
        if (this.contentMoved && positionChanged) {
            this.animater.translate({
                x: newX,
                y: newY,
            });
            this.dispatchScroll(timestamp);
        }
    };
    ScrollerActions.prototype.dispatchScroll = function (timestamp) {
        // dispatch scroll in interval time
        if (timestamp - this.startTime > this.options.momentumLimitTime) {
            // refresh time and starting position to initiate a momentum
            this.startTime = timestamp;
            this.scrollBehaviorX.updateStartPos();
            this.scrollBehaviorY.updateStartPos();
            if (this.options.probeType === 1 /* Throttle */) {
                this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
            }
        }
        // dispatch scroll all the time
        if (this.options.probeType > 1 /* Throttle */) {
            this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
        }
    };
    ScrollerActions.prototype.checkMomentum = function (absDistX, absDistY, timestamp) {
        return (timestamp - this.endTime > this.options.momentumLimitTime &&
            absDistY < this.options.momentumLimitDistance &&
            absDistX < this.options.momentumLimitDistance);
    };
    ScrollerActions.prototype.handleEnd = function (e) {
        if (this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
            return;
        }
        var currentPos = this.getCurrentPos();
        this.scrollBehaviorX.updateDirection();
        this.scrollBehaviorY.updateDirection();
        if (this.hooks.trigger(this.hooks.eventTypes.end, e, currentPos)) {
            return true;
        }
        currentPos = this.ensureIntegerPos(currentPos);
        this.animater.translate(currentPos);
        this.endTime = getNow();
        var duration = this.endTime - this.startTime;
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, currentPos, duration);
    };
    ScrollerActions.prototype.ensureIntegerPos = function (currentPos) {
        this.ensuringInteger = true;
        var x = currentPos.x, y = currentPos.y;
        var _a = this.scrollBehaviorX, minScrollPosX = _a.minScrollPos, maxScrollPosX = _a.maxScrollPos;
        var _b = this.scrollBehaviorY, minScrollPosY = _b.minScrollPos, maxScrollPosY = _b.maxScrollPos;
        x = x > 0 ? Math.ceil(x) : Math.floor(x);
        y = y > 0 ? Math.ceil(y) : Math.floor(y);
        x = between(x, maxScrollPosX, minScrollPosX);
        y = between(y, maxScrollPosY, minScrollPosY);
        return { x: x, y: y };
    };
    ScrollerActions.prototype.handleClick = function (e) {
        if (!preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    ScrollerActions.prototype.getCurrentPos = function () {
        return {
            x: this.scrollBehaviorX.getCurrentPos(),
            y: this.scrollBehaviorY.getCurrentPos(),
        };
    };
    ScrollerActions.prototype.refresh = function () {
        this.endTime = 0;
    };
    ScrollerActions.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return ScrollerActions;
}());

function createActionsHandlerOptions(bsOptions) {
    var options = [
        'click',
        'bindToWrapper',
        'disableMouse',
        'disableTouch',
        'preventDefault',
        'stopPropagation',
        'tagException',
        'preventDefaultException',
        'autoEndDistance',
    ].reduce(function (prev, cur) {
        prev[cur] = bsOptions[cur];
        return prev;
    }, {});
    return options;
}
function createBehaviorOptions(bsOptions, extraProp, bounces, rect) {
    var options = [
        'momentum',
        'momentumLimitTime',
        'momentumLimitDistance',
        'deceleration',
        'swipeBounceTime',
        'swipeTime',
        'outOfBoundaryDampingFactor',
        'specifiedIndexAsContent',
    ].reduce(function (prev, cur) {
        prev[cur] = bsOptions[cur];
        return prev;
    }, {});
    // add extra property
    options.scrollable = !!bsOptions[extraProp];
    options.bounces = bounces;
    options.rect = rect;
    return options;
}

function bubbling(source, target, events) {
    events.forEach(function (event) {
        var sourceEvent;
        var targetEvent;
        if (typeof event === 'string') {
            sourceEvent = targetEvent = event;
        }
        else {
            sourceEvent = event.source;
            targetEvent = event.target;
        }
        source.on(sourceEvent, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return target.trigger.apply(target, __spreadArrays([targetEvent], args));
        });
    });
}

function isSamePoint(startPoint, endPoint) {
    // keys of startPoint and endPoint should be equal
    var keys = Object.keys(startPoint);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (startPoint[key] !== endPoint[key])
            return false;
    }
    return true;
}

var MIN_SCROLL_DISTANCE = 1;
var Scroller = /** @class */ (function () {
    function Scroller(wrapper, content, options) {
        this.wrapper = wrapper;
        this.content = content;
        this.resizeTimeout = 0;
        this.hooks = new EventEmitter([
            'beforeStart',
            'beforeMove',
            'beforeScrollStart',
            'scrollStart',
            'scroll',
            'beforeEnd',
            'scrollEnd',
            'resize',
            'touchEnd',
            'end',
            'flick',
            'scrollCancel',
            'momentum',
            'scrollTo',
            'minDistanceScroll',
            'scrollToElement',
            'beforeRefresh',
        ]);
        this.options = options;
        var _a = this.options.bounce, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        // direction X
        this.scrollBehaviorX = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollX', [left, right], {
            size: 'width',
            position: 'left',
        }));
        // direction Y
        this.scrollBehaviorY = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollY', [top, bottom], {
            size: 'height',
            position: 'top',
        }));
        this.translater = new Translater(this.content);
        this.animater = createAnimater(this.content, this.translater, this.options);
        this.actionsHandler = new ActionsHandler(this.options.bindToTarget ? this.content : wrapper, createActionsHandlerOptions(this.options));
        this.actions = new ScrollerActions(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
        var resizeHandler = this.resize.bind(this);
        this.resizeRegister = new EventRegister(window, [
            {
                name: 'orientationchange',
                handler: resizeHandler,
            },
            {
                name: 'resize',
                handler: resizeHandler,
            },
        ]);
        this.registerTransitionEnd();
        this.init();
    }
    Scroller.prototype.init = function () {
        var _this = this;
        this.bindTranslater();
        this.bindAnimater();
        this.bindActions();
        // enable pointer events when scrolling ends
        this.hooks.on(this.hooks.eventTypes.scrollEnd, function () {
            _this.togglePointerEvents(true);
        });
    };
    Scroller.prototype.registerTransitionEnd = function () {
        this.transitionEndRegister = new EventRegister(this.content, [
            {
                name: style.transitionEnd,
                handler: this.transitionEnd.bind(this),
            },
        ]);
    };
    Scroller.prototype.bindTranslater = function () {
        var _this = this;
        var hooks = this.translater.hooks;
        hooks.on(hooks.eventTypes.beforeTranslate, function (transformStyle) {
            if (_this.options.translateZ) {
                transformStyle.push(_this.options.translateZ);
            }
        });
        // disable pointer events when scrolling
        hooks.on(hooks.eventTypes.translate, function (pos) {
            var prevPos = _this.getCurrentPos();
            _this.updatePositions(pos);
            // scrollEnd will dispatch when scroll is force stopping in touchstart handler
            // so in touchend handler, don't toggle pointer-events
            if (_this.actions.ensuringInteger === true) {
                _this.actions.ensuringInteger = false;
                return;
            }
            // a valid translate
            if (pos.x !== prevPos.x || pos.y !== prevPos.y) {
                _this.togglePointerEvents(false);
            }
        });
    };
    Scroller.prototype.bindAnimater = function () {
        var _this = this;
        // reset position
        this.animater.hooks.on(this.animater.hooks.eventTypes.end, function (pos) {
            if (!_this.resetPosition(_this.options.bounceTime)) {
                _this.animater.setPending(false);
                _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
            }
        });
        bubbling(this.animater.hooks, this.hooks, [
            {
                source: this.animater.hooks.eventTypes.move,
                target: this.hooks.eventTypes.scroll,
            },
            {
                source: this.animater.hooks.eventTypes.forceStop,
                target: this.hooks.eventTypes.scrollEnd,
            },
        ]);
    };
    Scroller.prototype.bindActions = function () {
        var _this = this;
        var actions = this.actions;
        bubbling(actions.hooks, this.hooks, [
            {
                source: actions.hooks.eventTypes.start,
                target: this.hooks.eventTypes.beforeStart,
            },
            {
                source: actions.hooks.eventTypes.start,
                target: this.hooks.eventTypes.beforeScrollStart,
            },
            {
                source: actions.hooks.eventTypes.beforeMove,
                target: this.hooks.eventTypes.beforeMove,
            },
            {
                source: actions.hooks.eventTypes.scrollStart,
                target: this.hooks.eventTypes.scrollStart,
            },
            {
                source: actions.hooks.eventTypes.scroll,
                target: this.hooks.eventTypes.scroll,
            },
            {
                source: actions.hooks.eventTypes.beforeEnd,
                target: this.hooks.eventTypes.beforeEnd,
            },
        ]);
        actions.hooks.on(actions.hooks.eventTypes.end, function (e, pos) {
            _this.hooks.trigger(_this.hooks.eventTypes.touchEnd, pos);
            if (_this.hooks.trigger(_this.hooks.eventTypes.end, pos)) {
                return true;
            }
            // check if it is a click operation
            if (!actions.fingerMoved) {
                _this.hooks.trigger(_this.hooks.eventTypes.scrollCancel);
                if (_this.checkClick(e)) {
                    return true;
                }
            }
            // reset if we are outside of the boundaries
            if (_this.resetPosition(_this.options.bounceTime, ease.bounce)) {
                _this.animater.setForceStopped(false);
                return true;
            }
        });
        actions.hooks.on(actions.hooks.eventTypes.scrollEnd, function (pos, duration) {
            var deltaX = Math.abs(pos.x - _this.scrollBehaviorX.startPos);
            var deltaY = Math.abs(pos.y - _this.scrollBehaviorY.startPos);
            if (_this.checkFlick(duration, deltaX, deltaY)) {
                _this.animater.setForceStopped(false);
                _this.hooks.trigger(_this.hooks.eventTypes.flick);
                return;
            }
            if (_this.momentum(pos, duration)) {
                _this.animater.setForceStopped(false);
                return;
            }
            if (actions.contentMoved) {
                _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
            }
            if (_this.animater.forceStopped) {
                _this.animater.setForceStopped(false);
            }
        });
    };
    Scroller.prototype.checkFlick = function (duration, deltaX, deltaY) {
        var flickMinMovingDistance = 1; // distinguish flick from click
        if (this.hooks.events.flick.length > 1 &&
            duration < this.options.flickLimitTime &&
            deltaX < this.options.flickLimitDistance &&
            deltaY < this.options.flickLimitDistance &&
            (deltaY > flickMinMovingDistance || deltaX > flickMinMovingDistance)) {
            return true;
        }
    };
    Scroller.prototype.momentum = function (pos, duration) {
        var meta = {
            time: 0,
            easing: ease.swiper,
            newX: pos.x,
            newY: pos.y,
        };
        // start momentum animation if needed
        var momentumX = this.scrollBehaviorX.end(duration);
        var momentumY = this.scrollBehaviorY.end(duration);
        meta.newX = isUndef(momentumX.destination)
            ? meta.newX
            : momentumX.destination;
        meta.newY = isUndef(momentumY.destination)
            ? meta.newY
            : momentumY.destination;
        meta.time = Math.max(momentumX.duration, momentumY.duration);
        this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this);
        // when x or y changed, do momentum animation now!
        if (meta.newX !== pos.x || meta.newY !== pos.y) {
            // change easing function when scroller goes out of the boundaries
            if (meta.newX > this.scrollBehaviorX.minScrollPos ||
                meta.newX < this.scrollBehaviorX.maxScrollPos ||
                meta.newY > this.scrollBehaviorY.minScrollPos ||
                meta.newY < this.scrollBehaviorY.maxScrollPos) {
                meta.easing = ease.swipeBounce;
            }
            this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing);
            return true;
        }
    };
    Scroller.prototype.checkClick = function (e) {
        var cancelable = {
            preventClick: this.animater.forceStopped,
        };
        // we scrolled less than momentumLimitDistance pixels
        if (this.hooks.trigger(this.hooks.eventTypes.checkClick)) {
            this.animater.setForceStopped(false);
            return true;
        }
        if (!cancelable.preventClick) {
            var _dblclick = this.options.dblclick;
            var dblclickTrigged = false;
            if (_dblclick && this.lastClickTime) {
                var _a = _dblclick.delay, delay = _a === void 0 ? 300 : _a;
                if (getNow() - this.lastClickTime < delay) {
                    dblclickTrigged = true;
                    dblclick(e);
                }
            }
            if (this.options.tap) {
                tap(e, this.options.tap);
            }
            if (this.options.click &&
                !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
                click(e);
            }
            this.lastClickTime = dblclickTrigged ? null : getNow();
            return true;
        }
        return false;
    };
    Scroller.prototype.resize = function () {
        var _this = this;
        if (!this.actions.enabled) {
            return;
        }
        // fix a scroll problem under Android condition
        /* istanbul ignore if  */
        if (isAndroid) {
            this.wrapper.scrollTop = 0;
        }
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(function () {
            _this.hooks.trigger(_this.hooks.eventTypes.resize);
        }, this.options.resizePolling);
    };
    /* istanbul ignore next */
    Scroller.prototype.transitionEnd = function (e) {
        if (e.target !== this.content || !this.animater.pending) {
            return;
        }
        var animater = this.animater;
        animater.transitionTime();
        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
            this.animater.setPending(false);
            if (this.options.probeType !== 3 /* Realtime */) {
                this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos());
            }
        }
    };
    Scroller.prototype.togglePointerEvents = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        var el = this.content.children.length
            ? this.content.children
            : [this.content];
        var pointerEvents = enabled ? 'auto' : 'none';
        for (var i = 0; i < el.length; i++) {
            var node = el[i];
            // ignore BetterScroll instance's wrapper DOM
            /* istanbul ignore if  */
            if (node.isBScrollContainer) {
                continue;
            }
            node.style.pointerEvents = pointerEvents;
        }
    };
    Scroller.prototype.refresh = function (content) {
        var contentChanged = this.setContent(content);
        this.hooks.trigger(this.hooks.eventTypes.beforeRefresh);
        this.scrollBehaviorX.refresh(content);
        this.scrollBehaviorY.refresh(content);
        if (contentChanged) {
            this.translater.setContent(content);
            this.animater.setContent(content);
            this.transitionEndRegister.destroy();
            this.registerTransitionEnd();
            if (this.options.bindToTarget) {
                this.actionsHandler.setContent(content);
            }
        }
        this.actions.refresh();
        this.wrapperOffset = offset(this.wrapper);
    };
    Scroller.prototype.setContent = function (content) {
        var contentChanged = content !== this.content;
        if (contentChanged) {
            this.content = content;
        }
        return contentChanged;
    };
    Scroller.prototype.scrollBy = function (deltaX, deltaY, time, easing) {
        if (time === void 0) { time = 0; }
        var _a = this.getCurrentPos(), x = _a.x, y = _a.y;
        easing = !easing ? ease.bounce : easing;
        deltaX += x;
        deltaY += y;
        this.scrollTo(deltaX, deltaY, time, easing);
    };
    Scroller.prototype.scrollTo = function (x, y, time, easing, extraTransform) {
        if (time === void 0) { time = 0; }
        if (easing === void 0) { easing = ease.bounce; }
        if (extraTransform === void 0) { extraTransform = {
            start: {},
            end: {},
        }; }
        var easingFn = this.options.useTransition ? easing.style : easing.fn;
        var currentPos = this.getCurrentPos();
        var startPoint = __assign({ x: currentPos.x, y: currentPos.y }, extraTransform.start);
        var endPoint = __assign({ x: x,
            y: y }, extraTransform.end);
        this.hooks.trigger(this.hooks.eventTypes.scrollTo, endPoint);
        // it is an useless move
        if (isSamePoint(startPoint, endPoint))
            return;
        var deltaX = Math.abs(endPoint.x - startPoint.x);
        var deltaY = Math.abs(endPoint.y - startPoint.y);
        // considering of browser compatibility for decimal transform value
        // force translating immediately
        if (deltaX < MIN_SCROLL_DISTANCE && deltaY < MIN_SCROLL_DISTANCE) {
            time = 0;
            this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll);
        }
        this.animater.move(startPoint, endPoint, time, easingFn);
    };
    Scroller.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
        var targetEle = getElement(el);
        var pos = offset(targetEle);
        var getOffset = function (offset, size, wrapperSize) {
            if (typeof offset === 'number') {
                return offset;
            }
            // if offsetX/Y are true we center the element to the screen
            return offset ? Math.round(size / 2 - wrapperSize / 2) : 0;
        };
        offsetX = getOffset(offsetX, targetEle.offsetWidth, this.wrapper.offsetWidth);
        offsetY = getOffset(offsetY, targetEle.offsetHeight, this.wrapper.offsetHeight);
        var getPos = function (pos, wrapperPos, offset, scrollBehavior) {
            pos -= wrapperPos;
            pos = scrollBehavior.adjustPosition(pos - offset);
            return pos;
        };
        pos.left = getPos(pos.left, this.wrapperOffset.left, offsetX, this.scrollBehaviorX);
        pos.top = getPos(pos.top, this.wrapperOffset.top, offsetY, this.scrollBehaviorY);
        if (this.hooks.trigger(this.hooks.eventTypes.scrollToElement, targetEle, pos)) {
            return;
        }
        this.scrollTo(pos.left, pos.top, time, easing);
    };
    Scroller.prototype.resetPosition = function (time, easing) {
        if (time === void 0) { time = 0; }
        if (easing === void 0) { easing = ease.bounce; }
        var _a = this.scrollBehaviorX.checkInBoundary(), x = _a.position, xInBoundary = _a.inBoundary;
        var _b = this.scrollBehaviorY.checkInBoundary(), y = _b.position, yInBoundary = _b.inBoundary;
        if (xInBoundary && yInBoundary) {
            return false;
        }
        /* istanbul ignore if  */
        if (isIOSBadVersion) {
            // fix ios 13.4 bouncing
            // see it in issues 982
            this.reflow();
        }
        // out of boundary
        this.scrollTo(x, y, time, easing);
        return true;
    };
    /* istanbul ignore next */
    Scroller.prototype.reflow = function () {
        this._reflow = this.content.offsetHeight;
    };
    Scroller.prototype.updatePositions = function (pos) {
        this.scrollBehaviorX.updatePosition(pos.x);
        this.scrollBehaviorY.updatePosition(pos.y);
    };
    Scroller.prototype.getCurrentPos = function () {
        return this.actions.getCurrentPos();
    };
    Scroller.prototype.enable = function () {
        this.actions.enabled = true;
    };
    Scroller.prototype.disable = function () {
        cancelAnimationFrame(this.animater.timer);
        this.actions.enabled = false;
    };
    Scroller.prototype.destroy = function () {
        var _this = this;
        var keys = [
            'resizeRegister',
            'transitionEndRegister',
            'actionsHandler',
            'actions',
            'hooks',
            'animater',
            'translater',
            'scrollBehaviorX',
            'scrollBehaviorY',
        ];
        keys.forEach(function (key) { return _this[key].destroy(); });
    };
    return Scroller;
}());

var BScrollConstructor = /** @class */ (function (_super) {
    __extends(BScrollConstructor, _super);
    function BScrollConstructor(el, options) {
        var _this = _super.call(this, [
            'refresh',
            'contentChanged',
            'enable',
            'disable',
            'beforeScrollStart',
            'scrollStart',
            'scroll',
            'scrollEnd',
            'scrollCancel',
            'touchEnd',
            'flick',
            'destroy'
        ]) || this;
        var wrapper = getElement(el);
        if (!wrapper) {
            warn('Can not resolve the wrapper DOM.');
            return _this;
        }
        _this.plugins = {};
        _this.options = new OptionsConstructor().merge(options).process();
        if (!_this.setContent(wrapper).valid) {
            return _this;
        }
        _this.hooks = new EventEmitter([
            'refresh',
            'enable',
            'disable',
            'destroy',
            'beforeInitialScrollTo',
            'contentChanged'
        ]);
        _this.init(wrapper);
        return _this;
    }
    BScrollConstructor.use = function (ctor) {
        var name = ctor.pluginName;
        var installed = BScrollConstructor.plugins.some(function (plugin) { return ctor === plugin.ctor; });
        if (installed)
            return BScrollConstructor;
        if (isUndef(name)) {
            warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
            return BScrollConstructor;
        }
        BScrollConstructor.pluginsMap[name] = true;
        BScrollConstructor.plugins.push({
            name: name,
            applyOrder: ctor.applyOrder,
            ctor: ctor
        });
        return BScrollConstructor;
    };
    BScrollConstructor.prototype.setContent = function (wrapper) {
        var contentChanged = false;
        var valid = true;
        var content = wrapper.children[this.options.specifiedIndexAsContent];
        if (!content) {
            warn('The wrapper need at least one child element to be content element to scroll.');
            valid = false;
        }
        else {
            contentChanged = this.content !== content;
            if (contentChanged) {
                this.content = content;
            }
        }
        return {
            valid: valid,
            contentChanged: contentChanged
        };
    };
    BScrollConstructor.prototype.init = function (wrapper) {
        var _this = this;
        this.wrapper = wrapper;
        // mark wrapper to recognize bs instance by DOM attribute
        wrapper.isBScrollContainer = true;
        this.scroller = new Scroller(wrapper, this.content, this.options);
        this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function () {
            _this.refresh();
        });
        this.eventBubbling();
        this.handleAutoBlur();
        this.enable();
        this.proxy(propertiesConfig);
        this.applyPlugins();
        // maybe boundary has changed, should refresh
        this.refreshWithoutReset(this.content);
        var _a = this.options, startX = _a.startX, startY = _a.startY;
        var position = {
            x: startX,
            y: startY
        };
        // maybe plugins want to control scroll position
        if (this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, position)) {
            return;
        }
        this.scroller.scrollTo(position.x, position.y);
    };
    BScrollConstructor.prototype.applyPlugins = function () {
        var _this = this;
        var options = this.options;
        BScrollConstructor.plugins
            .sort(function (a, b) {
            var _a;
            var applyOrderMap = (_a = {},
                _a["pre" /* Pre */] = -1,
                _a["post" /* Post */] = 1,
                _a);
            var aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0;
            var bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0;
            return aOrder - bOrder;
        })
            .forEach(function (item) {
            var ctor = item.ctor;
            if (options[item.name] && typeof ctor === 'function') {
                _this.plugins[item.name] = new ctor(_this);
            }
        });
    };
    BScrollConstructor.prototype.handleAutoBlur = function () {
        /* istanbul ignore if  */
        if (this.options.autoBlur) {
            this.on(this.eventTypes.beforeScrollStart, function () {
                var activeElement = document.activeElement;
                if (activeElement &&
                    (activeElement.tagName === 'INPUT' ||
                        activeElement.tagName === 'TEXTAREA')) {
                    activeElement.blur();
                }
            });
        }
    };
    BScrollConstructor.prototype.eventBubbling = function () {
        bubbling(this.scroller.hooks, this, [
            this.eventTypes.beforeScrollStart,
            this.eventTypes.scrollStart,
            this.eventTypes.scroll,
            this.eventTypes.scrollEnd,
            this.eventTypes.scrollCancel,
            this.eventTypes.touchEnd,
            this.eventTypes.flick
        ]);
    };
    BScrollConstructor.prototype.refreshWithoutReset = function (content) {
        this.scroller.refresh(content);
        this.hooks.trigger(this.hooks.eventTypes.refresh, content);
        this.trigger(this.eventTypes.refresh, content);
    };
    BScrollConstructor.prototype.proxy = function (propertiesConfig) {
        var _this = this;
        propertiesConfig.forEach(function (_a) {
            var key = _a.key, sourceKey = _a.sourceKey;
            propertiesProxy(_this, sourceKey, key);
        });
    };
    BScrollConstructor.prototype.refresh = function () {
        var _a = this.setContent(this.wrapper), contentChanged = _a.contentChanged, valid = _a.valid;
        if (valid) {
            var content = this.content;
            this.refreshWithoutReset(content);
            if (contentChanged) {
                this.hooks.trigger(this.hooks.eventTypes.contentChanged, content);
                this.trigger(this.eventTypes.contentChanged, content);
            }
            this.scroller.resetPosition();
        }
    };
    BScrollConstructor.prototype.enable = function () {
        this.scroller.enable();
        this.hooks.trigger(this.hooks.eventTypes.enable);
        this.trigger(this.eventTypes.enable);
    };
    BScrollConstructor.prototype.disable = function () {
        this.scroller.disable();
        this.hooks.trigger(this.hooks.eventTypes.disable);
        this.trigger(this.eventTypes.disable);
    };
    BScrollConstructor.prototype.destroy = function () {
        this.hooks.trigger(this.hooks.eventTypes.destroy);
        this.trigger(this.eventTypes.destroy);
        this.scroller.destroy();
    };
    BScrollConstructor.prototype.eventRegister = function (names) {
        this.registerType(names);
    };
    BScrollConstructor.plugins = [];
    BScrollConstructor.pluginsMap = {};
    return BScrollConstructor;
}(EventEmitter));
function createBScroll(el, options) {
    var bs = new BScrollConstructor(el, options);
    return bs;
}
createBScroll.use = BScrollConstructor.use;
createBScroll.plugins = BScrollConstructor.plugins;
createBScroll.pluginsMap = BScrollConstructor.pluginsMap;
var BScroll = createBScroll;

/* harmony default export */ var core_esm = (BScroll);


// CONCATENATED MODULE: ./node_modules/_@better-scroll_mouse-wheel@2.4.2@@better-scroll/mouse-wheel/dist/mouse-wheel.esm.js
/*!
 * better-scroll / mouse-wheel
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
function mouse_wheel_esm_warn(msg) {
    console.error("[BScroll warn]: " + msg);
}

// ssr support
var mouse_wheel_esm_inBrowser = typeof window !== 'undefined';
var mouse_wheel_esm_ua = mouse_wheel_esm_inBrowser && navigator.userAgent.toLowerCase();
!!(mouse_wheel_esm_ua && /wechatdevtools/.test(mouse_wheel_esm_ua));
mouse_wheel_esm_ua && mouse_wheel_esm_ua.indexOf('android') > 0;
/* istanbul ignore next */
((function () {
    if (typeof mouse_wheel_esm_ua === 'string') {
        var regex = /os (\d\d?_\d(_\d)?)/;
        var matches = regex.exec(mouse_wheel_esm_ua);
        if (!matches)
            return false;
        var parts = matches[1].split('_').map(function (item) {
            return parseInt(item, 10);
        });
        // ios version >= 13.4 issue 982
        return !!(parts[0] === 13 && parts[1] >= 4);
    }
    return false;
}))();
/* istanbul ignore next */
var mouse_wheel_esm_supportsPassive = false;
/* istanbul ignore next */
if (mouse_wheel_esm_inBrowser) {
    var mouse_wheel_esm_EventName = 'test-passive';
    try {
        var mouse_wheel_esm_opts = {};
        Object.defineProperty(mouse_wheel_esm_opts, 'passive', {
            get: function () {
                mouse_wheel_esm_supportsPassive = true;
            },
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener(mouse_wheel_esm_EventName, function () { }, mouse_wheel_esm_opts);
    }
    catch (e) { }
}

var mouse_wheel_esm_extend = function (target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};

var mouse_wheel_esm_elementStyle = (mouse_wheel_esm_inBrowser &&
    document.createElement('div').style);
var mouse_wheel_esm_vendor = (function () {
    /* istanbul ignore if  */
    if (!mouse_wheel_esm_inBrowser) {
        return false;
    }
    var transformNames = [
        {
            key: 'standard',
            value: 'transform',
        },
        {
            key: 'webkit',
            value: 'webkitTransform',
        },
        {
            key: 'Moz',
            value: 'MozTransform',
        },
        {
            key: 'O',
            value: 'OTransform',
        },
        {
            key: 'ms',
            value: 'msTransform',
        },
    ];
    for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
        var obj = transformNames_1[_i];
        if (mouse_wheel_esm_elementStyle[obj.value] !== undefined) {
            return obj.key;
        }
    }
    /* istanbul ignore next  */
    return false;
})();
/* istanbul ignore next  */
function mouse_wheel_esm_prefixStyle(style) {
    if (mouse_wheel_esm_vendor === false) {
        return style;
    }
    if (mouse_wheel_esm_vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return mouse_wheel_esm_vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
function mouse_wheel_esm_addEvent(el, type, fn, capture) {
    var useCapture = mouse_wheel_esm_supportsPassive
        ? {
            passive: false,
            capture: !!capture,
        }
        : !!capture;
    el.addEventListener(type, fn, useCapture);
}
function mouse_wheel_esm_removeEvent(el, type, fn, capture) {
    el.removeEventListener(type, fn, {
        capture: !!capture,
    });
}
mouse_wheel_esm_vendor && mouse_wheel_esm_vendor !== 'standard' ? '-' + mouse_wheel_esm_vendor.toLowerCase() + '-' : '';
var mouse_wheel_esm_transform = mouse_wheel_esm_prefixStyle('transform');
var mouse_wheel_esm_transition = mouse_wheel_esm_prefixStyle('transition');
mouse_wheel_esm_inBrowser && mouse_wheel_esm_prefixStyle('perspective') in mouse_wheel_esm_elementStyle;
({
    transform: mouse_wheel_esm_transform,
    transition: mouse_wheel_esm_transition,
    transitionTimingFunction: mouse_wheel_esm_prefixStyle('transitionTimingFunction'),
    transitionDuration: mouse_wheel_esm_prefixStyle('transitionDuration'),
    transitionDelay: mouse_wheel_esm_prefixStyle('transitionDelay'),
    transformOrigin: mouse_wheel_esm_prefixStyle('transformOrigin'),
    transitionEnd: mouse_wheel_esm_prefixStyle('transitionEnd'),
    transitionProperty: mouse_wheel_esm_prefixStyle('transitionProperty'),
});
function mouse_wheel_esm_preventDefaultExceptionFn(el, exceptions) {
    for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
            return true;
        }
    }
    return false;
}

var mouse_wheel_esm_EventRegister = /** @class */ (function () {
    function EventRegister(wrapper, events) {
        this.wrapper = wrapper;
        this.events = events;
        this.addDOMEvents();
    }
    EventRegister.prototype.destroy = function () {
        this.removeDOMEvents();
        this.events = [];
    };
    EventRegister.prototype.addDOMEvents = function () {
        this.handleDOMEvents(mouse_wheel_esm_addEvent);
    };
    EventRegister.prototype.removeDOMEvents = function () {
        this.handleDOMEvents(mouse_wheel_esm_removeEvent);
    };
    EventRegister.prototype.handleDOMEvents = function (eventOperation) {
        var _this = this;
        var wrapper = this.wrapper;
        this.events.forEach(function (event) {
            eventOperation(wrapper, event.name, _this, !!event.capture);
        });
    };
    EventRegister.prototype.handleEvent = function (e) {
        var eventType = e.type;
        this.events.some(function (event) {
            if (event.name === eventType) {
                event.handler(e);
                return true;
            }
            return false;
        });
    };
    return EventRegister;
}());

var MouseWheel = /** @class */ (function () {
    function MouseWheel(scroll) {
        this.scroll = scroll;
        this.wheelEndTimer = 0;
        this.wheelMoveTimer = 0;
        this.wheelStart = false;
        this.init();
    }
    MouseWheel.prototype.init = function () {
        this.handleBScroll();
        this.handleOptions();
        this.handleHooks();
        this.registerEvent();
    };
    MouseWheel.prototype.handleBScroll = function () {
        this.scroll.registerType([
            'alterOptions',
            'mousewheelStart',
            'mousewheelMove',
            'mousewheelEnd',
        ]);
    };
    MouseWheel.prototype.handleOptions = function () {
        var userOptions = (this.scroll.options.mouseWheel === true
            ? {}
            : this.scroll.options.mouseWheel);
        var defaultOptions = {
            speed: 20,
            invert: false,
            easeTime: 300,
            discreteTime: 400,
            throttleTime: 0,
            dampingFactor: 0.1,
        };
        this.mouseWheelOpt = mouse_wheel_esm_extend(defaultOptions, userOptions);
    };
    MouseWheel.prototype.handleHooks = function () {
        this.hooksFn = [];
        this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
    };
    MouseWheel.prototype.registerEvent = function () {
        this.eventRegister = new mouse_wheel_esm_EventRegister(this.scroll.scroller.wrapper, [
            {
                name: 'wheel',
                handler: this.wheelHandler.bind(this),
            },
            {
                name: 'mousewheel',
                handler: this.wheelHandler.bind(this),
            },
            {
                name: 'DOMMouseScroll',
                handler: this.wheelHandler.bind(this),
            },
        ]);
    };
    MouseWheel.prototype.registerHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    MouseWheel.prototype.wheelHandler = function (e) {
        if (!this.scroll.enabled) {
            return;
        }
        this.beforeHandler(e);
        // start
        if (!this.wheelStart) {
            this.wheelStartHandler(e);
            this.wheelStart = true;
        }
        // move
        var delta = this.getWheelDelta(e);
        this.wheelMoveHandler(delta);
        // end
        this.wheelEndDetector(delta);
    };
    MouseWheel.prototype.wheelStartHandler = function (e) {
        this.cleanCache();
        var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
        scrollBehaviorX.setMovingDirection(0 /* Default */);
        scrollBehaviorY.setMovingDirection(0 /* Default */);
        scrollBehaviorX.setDirection(0 /* Default */);
        scrollBehaviorY.setDirection(0 /* Default */);
        this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt);
        this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
    };
    MouseWheel.prototype.cleanCache = function () {
        this.deltaCache = [];
    };
    MouseWheel.prototype.wheelMoveHandler = function (delta) {
        var _this = this;
        var _a = this.mouseWheelOpt, throttleTime = _a.throttleTime, dampingFactor = _a.dampingFactor;
        if (throttleTime && this.wheelMoveTimer) {
            this.deltaCache.push(delta);
        }
        else {
            var cachedDelta = this.deltaCache.reduce(function (prev, current) {
                return {
                    x: prev.x + current.x,
                    y: prev.y + current.y,
                };
            }, { x: 0, y: 0 });
            this.cleanCache();
            var _b = this.scroll.scroller, scrollBehaviorX = _b.scrollBehaviorX, scrollBehaviorY = _b.scrollBehaviorY;
            scrollBehaviorX.setMovingDirection(-delta.directionX);
            scrollBehaviorY.setMovingDirection(-delta.directionY);
            scrollBehaviorX.setDirection(delta.x);
            scrollBehaviorY.setDirection(delta.y);
            // when out of boundary, perform a damping scroll
            var newX = scrollBehaviorX.performDampingAlgorithm(Math.round(delta.x) + cachedDelta.x, dampingFactor);
            var newY = scrollBehaviorY.performDampingAlgorithm(Math.round(delta.y) + cachedDelta.x, dampingFactor);
            if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
                x: newX,
                y: newY,
            })) {
                var easeTime = this.getEaseTime();
                if (newX !== this.scroll.x || newY !== this.scroll.y) {
                    this.scroll.scrollTo(newX, newY, easeTime);
                }
            }
            if (throttleTime) {
                this.wheelMoveTimer = window.setTimeout(function () {
                    _this.wheelMoveTimer = 0;
                }, throttleTime);
            }
        }
    };
    MouseWheel.prototype.wheelEndDetector = function (delta) {
        var _this = this;
        window.clearTimeout(this.wheelEndTimer);
        this.wheelEndTimer = window.setTimeout(function () {
            _this.wheelStart = false;
            window.clearTimeout(_this.wheelMoveTimer);
            _this.wheelMoveTimer = 0;
            _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
        }, this.mouseWheelOpt.discreteTime);
    };
    MouseWheel.prototype.getWheelDelta = function (e) {
        var _a = this.mouseWheelOpt, speed = _a.speed, invert = _a.invert;
        var wheelDeltaX = 0;
        var wheelDeltaY = 0;
        var direction = invert ? -1 /* Negative */ : 1 /* Positive */;
        switch (true) {
            case 'deltaX' in e:
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * speed;
                    wheelDeltaY = -e.deltaY * speed;
                }
                else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
                break;
            case 'wheelDeltaX' in e:
                wheelDeltaX = (e.wheelDeltaX / 120) * speed;
                wheelDeltaY = (e.wheelDeltaY / 120) * speed;
                break;
            case 'wheelDelta' in e:
                wheelDeltaX = wheelDeltaY = (e.wheelDelta / 120) * speed;
                break;
            case 'detail' in e:
                wheelDeltaX = wheelDeltaY = (-e.detail / 3) * speed;
                break;
        }
        wheelDeltaX *= direction;
        wheelDeltaY *= direction;
        if (!this.scroll.hasVerticalScroll) {
            if (Math.abs(wheelDeltaY) > Math.abs(wheelDeltaX)) {
                wheelDeltaX = wheelDeltaY;
            }
            wheelDeltaY = 0;
        }
        if (!this.scroll.hasHorizontalScroll) {
            wheelDeltaX = 0;
        }
        var directionX = wheelDeltaX > 0
            ? -1 /* Negative */
            : wheelDeltaX < 0
                ? 1 /* Positive */
                : 0 /* Default */;
        var directionY = wheelDeltaY > 0
            ? -1 /* Negative */
            : wheelDeltaY < 0
                ? 1 /* Positive */
                : 0 /* Default */;
        return {
            x: wheelDeltaX,
            y: wheelDeltaY,
            directionX: directionX,
            directionY: directionY,
        };
    };
    MouseWheel.prototype.beforeHandler = function (e) {
        var _a = this.scroll.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
        if (preventDefault &&
            !mouse_wheel_esm_preventDefaultExceptionFn(e.target, preventDefaultException)) {
            e.preventDefault();
        }
        if (stopPropagation) {
            e.stopPropagation();
        }
    };
    MouseWheel.prototype.getEaseTime = function () {
        var SAFE_EASETIME = 100;
        var easeTime = this.mouseWheelOpt.easeTime;
        // scrollEnd event will be triggered in every calling of scrollTo when easeTime is too small
        // easeTime needs to be greater than 100
        if (easeTime < SAFE_EASETIME) {
            mouse_wheel_esm_warn("easeTime should be greater than 100." +
                "If mouseWheel easeTime is too small," +
                "scrollEnd will be triggered many times.");
        }
        return Math.max(easeTime, SAFE_EASETIME);
    };
    MouseWheel.prototype.destroy = function () {
        this.eventRegister.destroy();
        window.clearTimeout(this.wheelEndTimer);
        window.clearTimeout(this.wheelMoveTimer);
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            hooks.off(hooksName, handlerFn);
        });
    };
    MouseWheel.pluginName = 'mouseWheel';
    MouseWheel.applyOrder = "pre" /* Pre */;
    return MouseWheel;
}());

/* harmony default export */ var mouse_wheel_esm = (MouseWheel);

// CONCATENATED MODULE: ./node_modules/_@better-scroll_pull-up@2.4.2@@better-scroll/pull-up/dist/pull-up.esm.js
/*!
 * better-scroll / pull-up
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
// ssr support
var pull_up_esm_inBrowser = typeof window !== 'undefined';
var pull_up_esm_ua = pull_up_esm_inBrowser && navigator.userAgent.toLowerCase();
!!(pull_up_esm_ua && /wechatdevtools/.test(pull_up_esm_ua));
pull_up_esm_ua && pull_up_esm_ua.indexOf('android') > 0;
/* istanbul ignore next */
((function () {
    if (typeof pull_up_esm_ua === 'string') {
        var regex = /os (\d\d?_\d(_\d)?)/;
        var matches = regex.exec(pull_up_esm_ua);
        if (!matches)
            return false;
        var parts = matches[1].split('_').map(function (item) {
            return parseInt(item, 10);
        });
        // ios version >= 13.4 issue 982
        return !!(parts[0] === 13 && parts[1] >= 4);
    }
    return false;
}))();
/* istanbul ignore next */
var pull_up_esm_supportsPassive = false;
/* istanbul ignore next */
if (pull_up_esm_inBrowser) {
    var pull_up_esm_EventName = 'test-passive';
    try {
        var pull_up_esm_opts = {};
        Object.defineProperty(pull_up_esm_opts, 'passive', {
            get: function () {
                pull_up_esm_supportsPassive = true;
            },
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener(pull_up_esm_EventName, function () { }, pull_up_esm_opts);
    }
    catch (e) { }
}

var pull_up_esm_extend = function (target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};

var pull_up_esm_elementStyle = (pull_up_esm_inBrowser &&
    document.createElement('div').style);
var pull_up_esm_vendor = (function () {
    /* istanbul ignore if  */
    if (!pull_up_esm_inBrowser) {
        return false;
    }
    var transformNames = [
        {
            key: 'standard',
            value: 'transform',
        },
        {
            key: 'webkit',
            value: 'webkitTransform',
        },
        {
            key: 'Moz',
            value: 'MozTransform',
        },
        {
            key: 'O',
            value: 'OTransform',
        },
        {
            key: 'ms',
            value: 'msTransform',
        },
    ];
    for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
        var obj = transformNames_1[_i];
        if (pull_up_esm_elementStyle[obj.value] !== undefined) {
            return obj.key;
        }
    }
    /* istanbul ignore next  */
    return false;
})();
/* istanbul ignore next  */
function pull_up_esm_prefixStyle(style) {
    if (pull_up_esm_vendor === false) {
        return style;
    }
    if (pull_up_esm_vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return pull_up_esm_vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
pull_up_esm_vendor && pull_up_esm_vendor !== 'standard' ? '-' + pull_up_esm_vendor.toLowerCase() + '-' : '';
var pull_up_esm_transform = pull_up_esm_prefixStyle('transform');
var pull_up_esm_transition = pull_up_esm_prefixStyle('transition');
pull_up_esm_inBrowser && pull_up_esm_prefixStyle('perspective') in pull_up_esm_elementStyle;
({
    transform: pull_up_esm_transform,
    transition: pull_up_esm_transition,
    transitionTimingFunction: pull_up_esm_prefixStyle('transitionTimingFunction'),
    transitionDuration: pull_up_esm_prefixStyle('transitionDuration'),
    transitionDelay: pull_up_esm_prefixStyle('transitionDelay'),
    transformOrigin: pull_up_esm_prefixStyle('transformOrigin'),
    transitionEnd: pull_up_esm_prefixStyle('transitionEnd'),
    transitionProperty: pull_up_esm_prefixStyle('transitionProperty'),
});

var sourcePrefix = 'plugins.pullUpLoad';
var propertiesMap = [
    {
        key: 'finishPullUp',
        name: 'finishPullUp'
    },
    {
        key: 'openPullUp',
        name: 'openPullUp'
    },
    {
        key: 'closePullUp',
        name: 'closePullUp'
    },
    {
        key: 'autoPullUpLoad',
        name: 'autoPullUpLoad'
    }
];
var pull_up_esm_propertiesConfig = propertiesMap.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix + "." + item.name
    };
});

var PULL_UP_HOOKS_NAME = 'pullingUp';
var PullUp = /** @class */ (function () {
    function PullUp(scroll) {
        this.scroll = scroll;
        this.pulling = false;
        this.watching = false;
        this.init();
    }
    PullUp.prototype.init = function () {
        this.handleBScroll();
        this.handleOptions(this.scroll.options.pullUpLoad);
        this.handleHooks();
        this.watch();
    };
    PullUp.prototype.handleBScroll = function () {
        this.scroll.registerType([PULL_UP_HOOKS_NAME]);
        this.scroll.proxy(pull_up_esm_propertiesConfig);
    };
    PullUp.prototype.handleOptions = function (userOptions) {
        if (userOptions === void 0) { userOptions = {}; }
        userOptions = (userOptions === true ? {} : userOptions);
        var defaultOptions = {
            threshold: 0,
        };
        this.options = pull_up_esm_extend(defaultOptions, userOptions);
        this.scroll.options.probeType = 3 /* Realtime */;
    };
    PullUp.prototype.handleHooks = function () {
        var _this = this;
        this.hooksFn = [];
        var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
        this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
            _this.finishPullUp();
        });
        this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
            // content is smaller than wrapper
            if (boundary.maxScrollPos > 0) {
                // allow scrolling when content is not full of wrapper
                boundary.maxScrollPos = -1;
            }
        });
    };
    PullUp.prototype.registerHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    PullUp.prototype.watch = function () {
        if (this.watching) {
            return;
        }
        this.watching = true;
        this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp);
    };
    PullUp.prototype.unwatch = function () {
        this.watching = false;
        this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
    };
    PullUp.prototype.checkPullUp = function (pos) {
        var _this = this;
        var threshold = this.options.threshold;
        if (this.scroll.movingDirectionY === 1 /* Positive */ &&
            pos.y <= this.scroll.maxScrollY + threshold) {
            this.pulling = true;
            // must reset pulling after scrollEnd
            this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
                _this.pulling = false;
            });
            this.unwatch();
            this.scroll.trigger(PULL_UP_HOOKS_NAME);
        }
    };
    PullUp.prototype.finishPullUp = function () {
        var _this = this;
        // reset Direction, fix #936
        this.scroll.scroller.scrollBehaviorY.setMovingDirection(0 /* Default */);
        if (this.pulling) {
            this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
                _this.watch();
            });
        }
        else {
            this.watch();
        }
    };
    // allow 'true' type is compat for beta version implements
    PullUp.prototype.openPullUp = function (config) {
        if (config === void 0) { config = {}; }
        this.handleOptions(config);
        this.watch();
    };
    PullUp.prototype.closePullUp = function () {
        this.unwatch();
    };
    PullUp.prototype.autoPullUpLoad = function () {
        var threshold = this.options.threshold;
        var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
        if (this.pulling || !this.watching) {
            return;
        }
        // simulate a pullUp action
        var NEGATIVE_VALUE = -1;
        var outOfBoundaryPos = scrollBehaviorY.maxScrollPos + threshold + NEGATIVE_VALUE;
        this.scroll.scroller.scrollBehaviorY.setMovingDirection(NEGATIVE_VALUE);
        this.scroll.scrollTo(this.scroll.x, outOfBoundaryPos, this.scroll.options.bounceTime);
    };
    PullUp.pluginName = 'pullUpLoad';
    return PullUp;
}());

/* harmony default export */ var pull_up_esm = (PullUp);

// CONCATENATED MODULE: ./node_modules/_@better-scroll_pull-down@2.4.2@@better-scroll/pull-down/dist/pull-down.esm.js
/*!
 * better-scroll / pull-down
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
// ssr support
var pull_down_esm_inBrowser = typeof window !== 'undefined';
var pull_down_esm_ua = pull_down_esm_inBrowser && navigator.userAgent.toLowerCase();
!!(pull_down_esm_ua && /wechatdevtools/.test(pull_down_esm_ua));
pull_down_esm_ua && pull_down_esm_ua.indexOf('android') > 0;
/* istanbul ignore next */
((function () {
    if (typeof pull_down_esm_ua === 'string') {
        var regex = /os (\d\d?_\d(_\d)?)/;
        var matches = regex.exec(pull_down_esm_ua);
        if (!matches)
            return false;
        var parts = matches[1].split('_').map(function (item) {
            return parseInt(item, 10);
        });
        // ios version >= 13.4 issue 982
        return !!(parts[0] === 13 && parts[1] >= 4);
    }
    return false;
}))();
/* istanbul ignore next */
var pull_down_esm_supportsPassive = false;
/* istanbul ignore next */
if (pull_down_esm_inBrowser) {
    var pull_down_esm_EventName = 'test-passive';
    try {
        var pull_down_esm_opts = {};
        Object.defineProperty(pull_down_esm_opts, 'passive', {
            get: function () {
                pull_down_esm_supportsPassive = true;
            },
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener(pull_down_esm_EventName, function () { }, pull_down_esm_opts);
    }
    catch (e) { }
}

var pull_down_esm_extend = function (target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};

var pull_down_esm_elementStyle = (pull_down_esm_inBrowser &&
    document.createElement('div').style);
var pull_down_esm_vendor = (function () {
    /* istanbul ignore if  */
    if (!pull_down_esm_inBrowser) {
        return false;
    }
    var transformNames = [
        {
            key: 'standard',
            value: 'transform',
        },
        {
            key: 'webkit',
            value: 'webkitTransform',
        },
        {
            key: 'Moz',
            value: 'MozTransform',
        },
        {
            key: 'O',
            value: 'OTransform',
        },
        {
            key: 'ms',
            value: 'msTransform',
        },
    ];
    for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
        var obj = transformNames_1[_i];
        if (pull_down_esm_elementStyle[obj.value] !== undefined) {
            return obj.key;
        }
    }
    /* istanbul ignore next  */
    return false;
})();
/* istanbul ignore next  */
function pull_down_esm_prefixStyle(style) {
    if (pull_down_esm_vendor === false) {
        return style;
    }
    if (pull_down_esm_vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return pull_down_esm_vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
pull_down_esm_vendor && pull_down_esm_vendor !== 'standard' ? '-' + pull_down_esm_vendor.toLowerCase() + '-' : '';
var pull_down_esm_transform = pull_down_esm_prefixStyle('transform');
var pull_down_esm_transition = pull_down_esm_prefixStyle('transition');
pull_down_esm_inBrowser && pull_down_esm_prefixStyle('perspective') in pull_down_esm_elementStyle;
({
    transform: pull_down_esm_transform,
    transition: pull_down_esm_transition,
    transitionTimingFunction: pull_down_esm_prefixStyle('transitionTimingFunction'),
    transitionDuration: pull_down_esm_prefixStyle('transitionDuration'),
    transitionDelay: pull_down_esm_prefixStyle('transitionDelay'),
    transformOrigin: pull_down_esm_prefixStyle('transformOrigin'),
    transitionEnd: pull_down_esm_prefixStyle('transitionEnd'),
    transitionProperty: pull_down_esm_prefixStyle('transitionProperty'),
});

var pull_down_esm_ease = {
    // easeOutQuint
    swipe: {
        style: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fn: function (t) {
            return 1 + --t * t * t * t * t;
        }
    },
    // easeOutQuard
    swipeBounce: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (t) {
            return t * (2 - t);
        }
    },
    // easeOutQuart
    bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function (t) {
            return 1 - --t * t * t * t;
        }
    }
};

var pull_down_esm_sourcePrefix = 'plugins.pullDownRefresh';
var pull_down_esm_propertiesMap = [
    {
        key: 'finishPullDown',
        name: 'finishPullDown'
    },
    {
        key: 'openPullDown',
        name: 'openPullDown'
    },
    {
        key: 'closePullDown',
        name: 'closePullDown'
    },
    {
        key: 'autoPullDownRefresh',
        name: 'autoPullDownRefresh'
    }
];
var pull_down_esm_propertiesConfig = pull_down_esm_propertiesMap.map(function (item) {
    return {
        key: item.key,
        sourceKey: pull_down_esm_sourcePrefix + "." + item.name
    };
});

var PULLING_DOWN_EVENT = 'pullingDown';
var ENTER_THRESHOLD_EVENT = 'enterThreshold';
var LEAVE_THRESHOLD_EVENT = 'leaveThreshold';
var PullDown = /** @class */ (function () {
    function PullDown(scroll) {
        this.scroll = scroll;
        this.pulling = 0 /* DEFAULT */;
        this.thresholdBoundary = 0 /* DEFAULT */;
        this.init();
    }
    PullDown.prototype.setPulling = function (status) {
        this.pulling = status;
    };
    PullDown.prototype.setThresholdBoundary = function (boundary) {
        this.thresholdBoundary = boundary;
    };
    PullDown.prototype.init = function () {
        this.handleBScroll();
        this.handleOptions(this.scroll.options.pullDownRefresh);
        this.handleHooks();
        this.watch();
    };
    PullDown.prototype.handleBScroll = function () {
        this.scroll.registerType([
            PULLING_DOWN_EVENT,
            ENTER_THRESHOLD_EVENT,
            LEAVE_THRESHOLD_EVENT,
        ]);
        this.scroll.proxy(pull_down_esm_propertiesConfig);
    };
    PullDown.prototype.handleOptions = function (userOptions) {
        if (userOptions === void 0) { userOptions = {}; }
        userOptions = (userOptions === true ? {} : userOptions);
        var defaultOptions = {
            threshold: 90,
            stop: 40,
        };
        this.options = pull_down_esm_extend(defaultOptions, userOptions);
        this.scroll.options.probeType = 3 /* Realtime */;
    };
    PullDown.prototype.handleHooks = function () {
        var _this = this;
        this.hooksFn = [];
        var scroller = this.scroll.scroller;
        var scrollBehaviorY = scroller.scrollBehaviorY;
        this.currentMinScrollY = this.cachedOriginanMinScrollY =
            scrollBehaviorY.minScrollPos;
        this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
            _this.finishPullDown();
        });
        this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
            // content is smaller than wrapper
            if (boundary.maxScrollPos > 0) {
                // allow scrolling when content is not full of wrapper
                boundary.maxScrollPos = -1;
            }
            boundary.minScrollPos = _this.currentMinScrollY;
        });
        // integrate with mousewheel
        if (this.hasMouseWheelPlugin()) {
            this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function (mouseWheelOptions) {
                var SANE_DISCRETE_TIME = 300;
                var SANE_EASE_TIME = 350;
                mouseWheelOptions.discreteTime = SANE_DISCRETE_TIME;
                // easeTime > discreteTime ensure goInto checkPullDown function
                mouseWheelOptions.easeTime = SANE_EASE_TIME;
            });
            this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function () {
                // mouseWheel need trigger checkPullDown manually
                scroller.hooks.trigger(scroller.hooks.eventTypes.end);
            });
        }
    };
    PullDown.prototype.registerHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    PullDown.prototype.hasMouseWheelPlugin = function () {
        return !!this.scroll.eventTypes.alterOptions;
    };
    PullDown.prototype.watch = function () {
        var scroller = this.scroll.scroller;
        this.watching = true;
        this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.end, this.checkPullDown);
        this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
        this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
        if (this.hasMouseWheelPlugin()) {
            this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
        }
    };
    PullDown.prototype.resetStateBeforeScrollStart = function () {
        // current fetching pulldownRefresh has ended
        if (!this.isFetchingStatus()) {
            this.setPulling(1 /* MOVING */);
            this.setThresholdBoundary(0 /* DEFAULT */);
        }
    };
    PullDown.prototype.checkLocationOfThresholdBoundary = function () {
        // pulldownRefresh is in the phase of Moving
        if (this.pulling === 1 /* MOVING */) {
            var scroll_1 = this.scroll;
            // enter threshold boundary
            var enteredThresholdBoundary = this.thresholdBoundary !== 1 /* INSIDE */ &&
                this.locateInsideThresholdBoundary();
            // leave threshold boundary
            var leftThresholdBoundary = this.thresholdBoundary !== 2 /* OUTSIDE */ &&
                !this.locateInsideThresholdBoundary();
            if (enteredThresholdBoundary) {
                this.setThresholdBoundary(1 /* INSIDE */);
                scroll_1.trigger(ENTER_THRESHOLD_EVENT);
            }
            if (leftThresholdBoundary) {
                this.setThresholdBoundary(2 /* OUTSIDE */);
                scroll_1.trigger(LEAVE_THRESHOLD_EVENT);
            }
        }
    };
    PullDown.prototype.locateInsideThresholdBoundary = function () {
        return this.scroll.y <= this.options.threshold;
    };
    PullDown.prototype.unwatch = function () {
        var scroll = this.scroll;
        var scroller = scroll.scroller;
        this.watching = false;
        scroller.hooks.off(scroller.hooks.eventTypes.end, this.checkPullDown);
        scroll.off(scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
        scroll.off(scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
        if (this.hasMouseWheelPlugin()) {
            scroll.off(scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
        }
    };
    PullDown.prototype.checkPullDown = function () {
        var _a = this.options, threshold = _a.threshold, stop = _a.stop;
        // check if a real pull down action
        if (this.scroll.y < threshold) {
            return false;
        }
        if (this.pulling === 1 /* MOVING */) {
            this.modifyBehaviorYBoundary(stop);
            this.setPulling(2 /* FETCHING */);
            this.scroll.trigger(PULLING_DOWN_EVENT);
        }
        this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, pull_down_esm_ease.bounce);
        return this.isFetchingStatus();
    };
    PullDown.prototype.isFetchingStatus = function () {
        return this.pulling === 2 /* FETCHING */;
    };
    PullDown.prototype.modifyBehaviorYBoundary = function (stopDistance) {
        var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
        // manually modify minScrollPos for a hang animation
        // to prevent from resetPosition
        this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
        this.currentMinScrollY = stopDistance;
        scrollBehaviorY.computeBoundary();
    };
    PullDown.prototype.finishPullDown = function () {
        if (this.isFetchingStatus()) {
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            // restore minScrollY since the hang animation has ended
            this.currentMinScrollY = this.cachedOriginanMinScrollY;
            scrollBehaviorY.computeBoundary();
            this.setPulling(0 /* DEFAULT */);
            this.scroll.resetPosition(this.scroll.options.bounceTime, pull_down_esm_ease.bounce);
        }
    };
    // allow 'true' type is compat for beta version implements
    PullDown.prototype.openPullDown = function (config) {
        if (config === void 0) { config = {}; }
        this.handleOptions(config);
        if (!this.watching) {
            this.watch();
        }
    };
    PullDown.prototype.closePullDown = function () {
        this.unwatch();
    };
    PullDown.prototype.autoPullDownRefresh = function () {
        var _a = this.options, threshold = _a.threshold, stop = _a.stop;
        if (this.isFetchingStatus() || !this.watching) {
            return;
        }
        this.modifyBehaviorYBoundary(stop);
        this.scroll.trigger(this.scroll.eventTypes.scrollStart);
        this.scroll.scrollTo(this.scroll.x, threshold);
        this.setPulling(2 /* FETCHING */);
        this.scroll.trigger(PULLING_DOWN_EVENT);
        this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, pull_down_esm_ease.bounce);
    };
    PullDown.pluginName = 'pullDownRefresh';
    return PullDown;
}());

/* harmony default export */ var pull_down_esm = (PullDown);

// CONCATENATED MODULE: ./node_modules/_@better-scroll_slide@2.4.2@@better-scroll/slide/dist/slide.esm.js
/*!
 * better-scroll / slide
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
function slide_esm_warn(msg) {
    console.error("[BScroll warn]: " + msg);
}

// ssr support
var slide_esm_inBrowser = typeof window !== 'undefined';
var slide_esm_ua = slide_esm_inBrowser && navigator.userAgent.toLowerCase();
!!(slide_esm_ua && /wechatdevtools/.test(slide_esm_ua));
slide_esm_ua && slide_esm_ua.indexOf('android') > 0;
/* istanbul ignore next */
((function () {
    if (typeof slide_esm_ua === 'string') {
        var regex = /os (\d\d?_\d(_\d)?)/;
        var matches = regex.exec(slide_esm_ua);
        if (!matches)
            return false;
        var parts = matches[1].split('_').map(function (item) {
            return parseInt(item, 10);
        });
        // ios version >= 13.4 issue 982
        return !!(parts[0] === 13 && parts[1] >= 4);
    }
    return false;
}))();
/* istanbul ignore next */
var slide_esm_supportsPassive = false;
/* istanbul ignore next */
if (slide_esm_inBrowser) {
    var slide_esm_EventName = 'test-passive';
    try {
        var slide_esm_opts = {};
        Object.defineProperty(slide_esm_opts, 'passive', {
            get: function () {
                slide_esm_supportsPassive = true;
            },
        }); // https://github.com/facebook/flow/issues/285
        window.addEventListener(slide_esm_EventName, function () { }, slide_esm_opts);
    }
    catch (e) { }
}

var slide_esm_extend = function (target, source) {
    for (var key in source) {
        target[key] = source[key];
    }
    return target;
};
function slide_esm_between(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }
    return x;
}

var slide_esm_elementStyle = (slide_esm_inBrowser &&
    document.createElement('div').style);
var slide_esm_vendor = (function () {
    /* istanbul ignore if  */
    if (!slide_esm_inBrowser) {
        return false;
    }
    var transformNames = [
        {
            key: 'standard',
            value: 'transform',
        },
        {
            key: 'webkit',
            value: 'webkitTransform',
        },
        {
            key: 'Moz',
            value: 'MozTransform',
        },
        {
            key: 'O',
            value: 'OTransform',
        },
        {
            key: 'ms',
            value: 'msTransform',
        },
    ];
    for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
        var obj = transformNames_1[_i];
        if (slide_esm_elementStyle[obj.value] !== undefined) {
            return obj.key;
        }
    }
    /* istanbul ignore next  */
    return false;
})();
/* istanbul ignore next  */
function slide_esm_prefixStyle(style) {
    if (slide_esm_vendor === false) {
        return style;
    }
    if (slide_esm_vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return slide_esm_vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
slide_esm_vendor && slide_esm_vendor !== 'standard' ? '-' + slide_esm_vendor.toLowerCase() + '-' : '';
var slide_esm_transform = slide_esm_prefixStyle('transform');
var slide_esm_transition = slide_esm_prefixStyle('transition');
slide_esm_inBrowser && slide_esm_prefixStyle('perspective') in slide_esm_elementStyle;
({
    transform: slide_esm_transform,
    transition: slide_esm_transition,
    transitionTimingFunction: slide_esm_prefixStyle('transitionTimingFunction'),
    transitionDuration: slide_esm_prefixStyle('transitionDuration'),
    transitionDelay: slide_esm_prefixStyle('transitionDelay'),
    transformOrigin: slide_esm_prefixStyle('transformOrigin'),
    transitionEnd: slide_esm_prefixStyle('transitionEnd'),
    transitionProperty: slide_esm_prefixStyle('transitionProperty'),
});
function prepend(el, target) {
    var firstChild = target.firstChild;
    if (firstChild) {
        before(el, firstChild);
    }
    else {
        target.appendChild(el);
    }
}
function before(el, target) {
    var parentNode = target.parentNode;
    parentNode.insertBefore(el, target);
}
function removeChild(el, child) {
    el.removeChild(child);
}

var slide_esm_ease = {
    // easeOutQuint
    swipe: {
        style: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fn: function (t) {
            return 1 + --t * t * t * t * t;
        }
    },
    // easeOutQuard
    swipeBounce: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (t) {
            return t * (2 - t);
        }
    },
    // easeOutQuart
    bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function (t) {
            return 1 - --t * t * t * t;
        }
    }
};

var PagesMatrix = /** @class */ (function () {
    function PagesMatrix(scroll) {
        this.scroll = scroll;
        this.init();
    }
    PagesMatrix.prototype.init = function () {
        var scroller = this.scroll.scroller;
        var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
        this.wrapperWidth = scrollBehaviorX.wrapperSize;
        this.wrapperHeight = scrollBehaviorY.wrapperSize;
        this.scrollerHeight = scrollBehaviorY.contentSize;
        this.scrollerWidth = scrollBehaviorX.contentSize;
        this.pages = this.buildPagesMatrix(this.wrapperWidth, this.wrapperHeight);
        this.pageLengthOfX = this.pages ? this.pages.length : 0;
        this.pageLengthOfY = this.pages && this.pages[0] ? this.pages[0].length : 0;
    };
    PagesMatrix.prototype.getPageStats = function (pageX, pageY) {
        return this.pages[pageX][pageY];
    };
    PagesMatrix.prototype.getNearestPageIndex = function (x, y) {
        var pageX = 0;
        var pageY = 0;
        var l = this.pages.length;
        for (; pageX < l - 1; pageX++) {
            if (x >= this.pages[pageX][0].cx) {
                break;
            }
        }
        l = this.pages[pageX].length;
        for (; pageY < l - 1; pageY++) {
            if (y >= this.pages[0][pageY].cy) {
                break;
            }
        }
        return {
            pageX: pageX,
            pageY: pageY,
        };
    };
    // (n x 1) matrix for horizontal scroll or
    // (1 * n) matrix for vertical scroll
    PagesMatrix.prototype.buildPagesMatrix = function (stepX, stepY) {
        var pages = [];
        var x = 0;
        var y;
        var cx;
        var cy;
        var i = 0;
        var l;
        var maxScrollPosX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
        var maxScrollPosY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
        cx = Math.round(stepX / 2);
        cy = Math.round(stepY / 2);
        while (x > -this.scrollerWidth) {
            pages[i] = [];
            l = 0;
            y = 0;
            while (y > -this.scrollerHeight) {
                pages[i][l] = {
                    x: Math.max(x, maxScrollPosX),
                    y: Math.max(y, maxScrollPosY),
                    width: stepX,
                    height: stepY,
                    cx: x - cx,
                    cy: y - cy,
                };
                y -= stepY;
                l++;
            }
            x -= stepX;
            i++;
        }
        return pages;
    };
    return PagesMatrix;
}());

var BASE_PAGE = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
};

var SlidePages = /** @class */ (function () {
    function SlidePages(scroll, slideOptions) {
        this.scroll = scroll;
        this.slideOptions = slideOptions;
        this.slideX = false;
        this.slideY = false;
        this.currentPage = slide_esm_extend({}, BASE_PAGE);
    }
    SlidePages.prototype.refresh = function () {
        this.pagesMatrix = new PagesMatrix(this.scroll);
        this.checkSlideLoop();
        this.currentPage = this.getAdjustedCurrentPage();
    };
    SlidePages.prototype.getAdjustedCurrentPage = function () {
        var _a = this.currentPage, pageX = _a.pageX, pageY = _a.pageY;
        // page index should be handled
        // because page counts may reduce
        pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 1);
        pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 1);
        // loop scene should also be respected
        // because clonedNode will cause pageLength increasing
        if (this.loopX) {
            pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 2);
        }
        if (this.loopY) {
            pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 2);
        }
        var _b = this.pagesMatrix.getPageStats(pageX, pageY), x = _b.x, y = _b.y;
        return { pageX: pageX, pageY: pageY, x: x, y: y };
    };
    SlidePages.prototype.setCurrentPage = function (newPage) {
        this.currentPage = newPage;
    };
    SlidePages.prototype.getInternalPage = function (pageX, pageY) {
        if (pageX >= this.pagesMatrix.pageLengthOfX) {
            pageX = this.pagesMatrix.pageLengthOfX - 1;
        }
        else if (pageX < 0) {
            pageX = 0;
        }
        if (pageY >= this.pagesMatrix.pageLengthOfY) {
            pageY = this.pagesMatrix.pageLengthOfY - 1;
        }
        else if (pageY < 0) {
            pageY = 0;
        }
        var _a = this.pagesMatrix.getPageStats(pageX, pageY), x = _a.x, y = _a.y;
        return {
            pageX: pageX,
            pageY: pageY,
            x: x,
            y: y,
        };
    };
    SlidePages.prototype.getInitialPage = function (showFirstPage, firstInitialised) {
        if (showFirstPage === void 0) { showFirstPage = false; }
        if (firstInitialised === void 0) { firstInitialised = false; }
        var _a = this.slideOptions, startPageXIndex = _a.startPageXIndex, startPageYIndex = _a.startPageYIndex;
        var firstPageX = this.loopX ? 1 : 0;
        var firstPageY = this.loopY ? 1 : 0;
        var pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
        var pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
        if (firstInitialised) {
            pageX = this.loopX ? startPageXIndex + 1 : startPageXIndex;
            pageY = this.loopY ? startPageYIndex + 1 : startPageYIndex;
        }
        else {
            pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
            pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
        }
        var _b = this.pagesMatrix.getPageStats(pageX, pageY), x = _b.x, y = _b.y;
        return {
            pageX: pageX,
            pageY: pageY,
            x: x,
            y: y,
        };
    };
    SlidePages.prototype.getExposedPage = function (page) {
        var exposedPage = slide_esm_extend({}, page);
        // only pageX or pageY need fix
        if (this.loopX) {
            exposedPage.pageX = this.fixedPage(exposedPage.pageX, this.pagesMatrix.pageLengthOfX - 2);
        }
        if (this.loopY) {
            exposedPage.pageY = this.fixedPage(exposedPage.pageY, this.pagesMatrix.pageLengthOfY - 2);
        }
        return exposedPage;
    };
    SlidePages.prototype.getExposedPageByPageIndex = function (pageIndexX, pageIndexY) {
        var page = {
            pageX: pageIndexX,
            pageY: pageIndexY,
        };
        if (this.loopX) {
            page.pageX = pageIndexX + 1;
        }
        if (this.loopY) {
            page.pageY = pageIndexY + 1;
        }
        var _a = this.pagesMatrix.getPageStats(page.pageX, page.pageY), x = _a.x, y = _a.y;
        return {
            x: x,
            y: y,
            pageX: pageIndexX,
            pageY: pageIndexY,
        };
    };
    SlidePages.prototype.getWillChangedPage = function (page) {
        page = slide_esm_extend({}, page);
        // Page need fix
        if (this.loopX) {
            page.pageX = this.fixedPage(page.pageX, this.pagesMatrix.pageLengthOfX - 2);
            page.x = this.pagesMatrix.getPageStats(page.pageX + 1, 0).x;
        }
        if (this.loopY) {
            page.pageY = this.fixedPage(page.pageY, this.pagesMatrix.pageLengthOfY - 2);
            page.y = this.pagesMatrix.getPageStats(0, page.pageY + 1).y;
        }
        return page;
    };
    SlidePages.prototype.fixedPage = function (page, realPageLen) {
        var pageIndex = [];
        for (var i = 0; i < realPageLen; i++) {
            pageIndex.push(i);
        }
        pageIndex.unshift(realPageLen - 1);
        pageIndex.push(0);
        return pageIndex[page];
    };
    SlidePages.prototype.getPageStats = function () {
        return this.pagesMatrix.getPageStats(this.currentPage.pageX, this.currentPage.pageY);
    };
    SlidePages.prototype.getValidPageIndex = function (x, y) {
        var lastX = this.pagesMatrix.pageLengthOfX - 1;
        var lastY = this.pagesMatrix.pageLengthOfY - 1;
        var firstX = 0;
        var firstY = 0;
        if (this.loopX) {
            x += 1;
            firstX = firstX + 1;
            lastX = lastX - 1;
        }
        if (this.loopY) {
            y += 1;
            firstY = firstY + 1;
            lastY = lastY - 1;
        }
        x = slide_esm_between(x, firstX, lastX);
        y = slide_esm_between(y, firstY, lastY);
        return {
            pageX: x,
            pageY: y,
        };
    };
    SlidePages.prototype.nextPageIndex = function () {
        return this.getPageIndexByDirection("positive" /* Positive */);
    };
    SlidePages.prototype.prevPageIndex = function () {
        return this.getPageIndexByDirection("negative" /* Negative */);
    };
    SlidePages.prototype.getNearestPage = function (x, y) {
        var pageIndex = this.pagesMatrix.getNearestPageIndex(x, y);
        var pageX = pageIndex.pageX, pageY = pageIndex.pageY;
        var newX = this.pagesMatrix.getPageStats(pageX, 0).x;
        var newY = this.pagesMatrix.getPageStats(0, pageY).y;
        return {
            x: newX,
            y: newY,
            pageX: pageX,
            pageY: pageY,
        };
    };
    SlidePages.prototype.getPageByDirection = function (page, directionX, directionY) {
        var pageX = page.pageX, pageY = page.pageY;
        if (pageX === this.currentPage.pageX) {
            pageX = slide_esm_between(pageX + directionX, 0, this.pagesMatrix.pageLengthOfX - 1);
        }
        if (pageY === this.currentPage.pageY) {
            pageY = slide_esm_between(pageY + directionY, 0, this.pagesMatrix.pageLengthOfY - 1);
        }
        var x = this.pagesMatrix.getPageStats(pageX, 0).x;
        var y = this.pagesMatrix.getPageStats(0, pageY).y;
        return {
            x: x,
            y: y,
            pageX: pageX,
            pageY: pageY,
        };
    };
    SlidePages.prototype.resetLoopPage = function () {
        if (this.loopX) {
            if (this.currentPage.pageX === 0) {
                return {
                    pageX: this.pagesMatrix.pageLengthOfX - 2,
                    pageY: this.currentPage.pageY,
                };
            }
            if (this.currentPage.pageX === this.pagesMatrix.pageLengthOfX - 1) {
                return {
                    pageX: 1,
                    pageY: this.currentPage.pageY,
                };
            }
        }
        if (this.loopY) {
            if (this.currentPage.pageY === 0) {
                return {
                    pageX: this.currentPage.pageX,
                    pageY: this.pagesMatrix.pageLengthOfY - 2,
                };
            }
            if (this.currentPage.pageY === this.pagesMatrix.pageLengthOfY - 1) {
                return {
                    pageX: this.currentPage.pageX,
                    pageY: 1,
                };
            }
        }
    };
    SlidePages.prototype.getPageIndexByDirection = function (direction) {
        var x = this.currentPage.pageX;
        var y = this.currentPage.pageY;
        if (this.slideX) {
            x = direction === "negative" /* Negative */ ? x - 1 : x + 1;
        }
        if (this.slideY) {
            y = direction === "negative" /* Negative */ ? y - 1 : y + 1;
        }
        return {
            pageX: x,
            pageY: y,
        };
    };
    SlidePages.prototype.checkSlideLoop = function () {
        this.wannaLoop = this.slideOptions.loop;
        if (this.pagesMatrix.pageLengthOfX > 1) {
            this.slideX = true;
        }
        else {
            this.slideX = false;
        }
        if (this.pagesMatrix.pages[0] && this.pagesMatrix.pageLengthOfY > 1) {
            this.slideY = true;
        }
        else {
            this.slideY = false;
        }
        this.loopX = this.wannaLoop && this.slideX;
        this.loopY = this.wannaLoop && this.slideY;
        if (this.slideX && this.slideY) {
            slide_esm_warn('slide does not support two direction at the same time.');
        }
    };
    return SlidePages;
}());

var slide_esm_sourcePrefix = 'plugins.slide';
var slide_esm_propertiesMap = [
    {
        key: 'next',
        name: 'next',
    },
    {
        key: 'prev',
        name: 'prev',
    },
    {
        key: 'goToPage',
        name: 'goToPage',
    },
    {
        key: 'getCurrentPage',
        name: 'getCurrentPage',
    },
    {
        key: 'startPlay',
        name: 'startPlay',
    },
    {
        key: 'pausePlay',
        name: 'pausePlay',
    },
];
var slide_esm_propertiesConfig = slide_esm_propertiesMap.map(function (item) {
    return {
        key: item.key,
        sourceKey: slide_esm_sourcePrefix + "." + item.name,
    };
});

var samePage = function (p1, p2) {
    return p1.pageX === p2.pageX && p1.pageY === p2.pageY;
};
var Slide = /** @class */ (function () {
    function Slide(scroll) {
        this.scroll = scroll;
        this.cachedClonedPageDOM = [];
        this.resetLooping = false;
        this.autoplayTimer = 0;
        if (!this.satisfyInitialization()) {
            return;
        }
        this.init();
    }
    Slide.prototype.satisfyInitialization = function () {
        if (this.scroll.scroller.content.children.length <= 0) {
            slide_esm_warn("slide need at least one slide page to be initialised." +
                "please check your DOM layout.");
            return false;
        }
        return true;
    };
    Slide.prototype.init = function () {
        this.willChangeToPage = slide_esm_extend({}, BASE_PAGE);
        this.handleBScroll();
        this.handleOptions();
        this.handleHooks();
        this.createPages();
    };
    Slide.prototype.createPages = function () {
        this.pages = new SlidePages(this.scroll, this.options);
    };
    Slide.prototype.handleBScroll = function () {
        this.scroll.registerType(['slideWillChange', 'slidePageChanged']);
        this.scroll.proxy(slide_esm_propertiesConfig);
    };
    Slide.prototype.handleOptions = function () {
        var userOptions = (this.scroll.options.slide === true
            ? {}
            : this.scroll.options.slide);
        var defaultOptions = {
            loop: true,
            threshold: 0.1,
            speed: 400,
            easing: slide_esm_ease.bounce,
            listenFlick: true,
            autoplay: true,
            interval: 3000,
            startPageXIndex: 0,
            startPageYIndex: 0,
        };
        this.options = slide_esm_extend(defaultOptions, userOptions);
    };
    Slide.prototype.handleLoop = function (prevSlideContent) {
        var loop = this.options.loop;
        var slideContent = this.scroll.scroller.content;
        var currentSlidePagesLength = slideContent.children.length;
        // only should respect loop scene
        if (loop) {
            if (slideContent !== prevSlideContent) {
                this.resetLoopChangedStatus();
                this.removeClonedSlidePage(prevSlideContent);
                currentSlidePagesLength > 1 &&
                    this.cloneFirstAndLastSlidePage(slideContent);
            }
            else {
                // many pages reduce to one page
                if (currentSlidePagesLength === 3 && this.initialised) {
                    this.removeClonedSlidePage(slideContent);
                    this.moreToOnePageInLoop = true;
                    this.oneToMorePagesInLoop = false;
                }
                else if (currentSlidePagesLength > 1) {
                    // one page increases to many page
                    if (this.initialised && this.cachedClonedPageDOM.length === 0) {
                        this.oneToMorePagesInLoop = true;
                        this.moreToOnePageInLoop = false;
                    }
                    else {
                        this.removeClonedSlidePage(slideContent);
                        this.resetLoopChangedStatus();
                    }
                    this.cloneFirstAndLastSlidePage(slideContent);
                }
                else {
                    this.resetLoopChangedStatus();
                }
            }
        }
    };
    Slide.prototype.resetLoopChangedStatus = function () {
        this.moreToOnePageInLoop = false;
        this.oneToMorePagesInLoop = false;
    };
    Slide.prototype.handleHooks = function () {
        var _this = this;
        var scrollHooks = this.scroll.hooks;
        var scrollerHooks = this.scroll.scroller.hooks;
        var listenFlick = this.options.listenFlick;
        this.prevContent = this.scroll.scroller.content;
        this.hooksFn = [];
        // scroll
        this.registerHooks(this.scroll, this.scroll.eventTypes.beforeScrollStart, this.pausePlay);
        this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.modifyCurrentPage);
        this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.startPlay);
        // for mousewheel event
        if (this.scroll.eventTypes.mousewheelMove) {
            this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelMove, function () {
                // prevent default action of mousewheelMove
                return true;
            });
            this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function (delta) {
                if (delta.directionX === 1 /* Positive */ ||
                    delta.directionY === 1 /* Positive */) {
                    _this.next();
                }
                if (delta.directionX === -1 /* Negative */ ||
                    delta.directionY === -1 /* Negative */) {
                    _this.prev();
                }
            });
        }
        // scrollHooks
        this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refreshHandler);
        this.registerHooks(scrollHooks, scrollHooks.eventTypes.destroy, this.destroy);
        // scroller
        this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.beforeRefresh, function () {
            _this.handleLoop(_this.prevContent);
            _this.setSlideInlineStyle();
        });
        this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.momentum, this.modifyScrollMetaHandler);
        this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.scroll, this.scrollHandler);
        // a click operation will clearTimer, so restart a new one
        this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.checkClick, this.startPlay);
        if (listenFlick) {
            this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.flick, this.flickHandler);
        }
    };
    Slide.prototype.startPlay = function () {
        var _this = this;
        var _a = this.options, interval = _a.interval, autoplay = _a.autoplay;
        if (autoplay) {
            clearTimeout(this.autoplayTimer);
            this.autoplayTimer = window.setTimeout(function () {
                _this.next();
            }, interval);
        }
    };
    Slide.prototype.pausePlay = function () {
        if (this.options.autoplay) {
            clearTimeout(this.autoplayTimer);
        }
    };
    Slide.prototype.setSlideInlineStyle = function () {
        var styleConfigurations = [
            {
                direction: 'scrollX',
                sizeType: 'offsetWidth',
                styleType: 'width',
            },
            {
                direction: 'scrollY',
                sizeType: 'offsetHeight',
                styleType: 'height',
            },
        ];
        var _a = this.scroll.scroller, slideContent = _a.content, slideWrapper = _a.wrapper;
        var scrollOptions = this.scroll.options;
        styleConfigurations.forEach(function (_a) {
            var direction = _a.direction, sizeType = _a.sizeType, styleType = _a.styleType;
            // wanna scroll in this direction
            if (scrollOptions[direction]) {
                var size = slideWrapper[sizeType];
                var children = slideContent.children;
                var length_1 = children.length;
                for (var i = 0; i < length_1; i++) {
                    var slidePageDOM = children[i];
                    slidePageDOM.style[styleType] = size + 'px';
                }
                slideContent.style[styleType] = size * length_1 + 'px';
            }
        });
    };
    Slide.prototype.next = function (time, easing) {
        var _a = this.pages.nextPageIndex(), pageX = _a.pageX, pageY = _a.pageY;
        this.goTo(pageX, pageY, time, easing);
    };
    Slide.prototype.prev = function (time, easing) {
        var _a = this.pages.prevPageIndex(), pageX = _a.pageX, pageY = _a.pageY;
        this.goTo(pageX, pageY, time, easing);
    };
    Slide.prototype.goToPage = function (pageX, pageY, time, easing) {
        var pageIndex = this.pages.getValidPageIndex(pageX, pageY);
        this.goTo(pageIndex.pageX, pageIndex.pageY, time, easing);
    };
    Slide.prototype.getCurrentPage = function () {
        return this.exposedPage || this.pages.getInitialPage(false, true);
    };
    Slide.prototype.setCurrentPage = function (page) {
        this.pages.setCurrentPage(page);
        this.exposedPage = this.pages.getExposedPage(page);
    };
    Slide.prototype.nearestPage = function (x, y) {
        var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
        var maxScrollPosX = scrollBehaviorX.maxScrollPos, minScrollPosX = scrollBehaviorX.minScrollPos;
        var maxScrollPosY = scrollBehaviorY.maxScrollPos, minScrollPosY = scrollBehaviorY.minScrollPos;
        return this.pages.getNearestPage(slide_esm_between(x, maxScrollPosX, minScrollPosX), slide_esm_between(y, maxScrollPosY, minScrollPosY));
    };
    Slide.prototype.satisfyThreshold = function (x, y) {
        var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
        var satisfied = true;
        if (Math.abs(x - scrollBehaviorX.absStartPos) <= this.thresholdX &&
            Math.abs(y - scrollBehaviorY.absStartPos) <= this.thresholdY) {
            satisfied = false;
        }
        return satisfied;
    };
    Slide.prototype.refreshHandler = function (content) {
        var _this = this;
        if (!this.satisfyInitialization()) {
            return;
        }
        this.pages.refresh();
        this.computeThreshold();
        var contentChanged = (this.contentChanged = this.prevContent !== content);
        if (contentChanged) {
            this.prevContent = content;
        }
        var initPage = this.pages.getInitialPage(this.oneToMorePagesInLoop || this.moreToOnePageInLoop, contentChanged || !this.initialised);
        if (this.initialised) {
            this.goTo(initPage.pageX, initPage.pageY, 0);
        }
        else {
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.beforeInitialScrollTo, function (position) {
                _this.initialised = true;
                position.x = initPage.x;
                position.y = initPage.y;
            });
        }
        this.startPlay();
    };
    Slide.prototype.computeThreshold = function () {
        var threshold = this.options.threshold;
        // Integer
        if (threshold % 1 === 0) {
            this.thresholdX = threshold;
            this.thresholdY = threshold;
        }
        else {
            // decimal
            var _a = this.pages.getPageStats(), width = _a.width, height = _a.height;
            this.thresholdX = Math.round(width * threshold);
            this.thresholdY = Math.round(height * threshold);
        }
    };
    Slide.prototype.cloneFirstAndLastSlidePage = function (slideContent) {
        var children = slideContent.children;
        var preprendDOM = children[children.length - 1].cloneNode(true);
        var appendDOM = children[0].cloneNode(true);
        prepend(preprendDOM, slideContent);
        slideContent.appendChild(appendDOM);
        this.cachedClonedPageDOM = [preprendDOM, appendDOM];
    };
    Slide.prototype.removeClonedSlidePage = function (slideContent) {
        // maybe slideContent has removed from DOM Tree
        var slidePages = (slideContent && slideContent.children) || [];
        if (slidePages.length) {
            this.cachedClonedPageDOM.forEach(function (el) {
                removeChild(slideContent, el);
            });
        }
        this.cachedClonedPageDOM = [];
    };
    Slide.prototype.modifyCurrentPage = function (point) {
        var _a = this.getCurrentPage(), prevExposedPageX = _a.pageX, prevExposedPageY = _a.pageY;
        var newPage = this.nearestPage(point.x, point.y);
        this.setCurrentPage(newPage);
        /* istanbul ignore if */
        if (this.contentChanged) {
            this.contentChanged = false;
            return true;
        }
        var _b = this.getCurrentPage(), currentExposedPageX = _b.pageX, currentExposedPageY = _b.pageY;
        this.pageWillChangeTo(newPage);
        // loop is true, and one page becomes many pages when call bs.refresh
        if (this.oneToMorePagesInLoop) {
            this.oneToMorePagesInLoop = false;
            return true;
        }
        // loop is true, and many page becomes one page when call bs.refresh
        // if prevPage > 0, dispatch slidePageChanged and scrollEnd events
        /* istanbul ignore if */
        if (this.moreToOnePageInLoop &&
            prevExposedPageX === 0 &&
            prevExposedPageY === 0) {
            this.moreToOnePageInLoop = false;
            return true;
        }
        if (prevExposedPageX !== currentExposedPageX ||
            prevExposedPageY !== currentExposedPageY) {
            // only trust pageX & pageY when loop is true
            var page = this.pages.getExposedPageByPageIndex(currentExposedPageX, currentExposedPageY);
            this.scroll.trigger(this.scroll.eventTypes.slidePageChanged, page);
        }
        // triggered by resetLoop
        if (this.resetLooping) {
            this.resetLooping = false;
            return;
        }
        var changePage = this.pages.resetLoopPage();
        if (changePage) {
            this.resetLooping = true;
            this.goTo(changePage.pageX, changePage.pageY, 0);
            // stop user's scrollEnd
            // since it is a seamless scroll
            return true;
        }
    };
    Slide.prototype.goTo = function (pageX, pageY, time, easing) {
        var newPage = this.pages.getInternalPage(pageX, pageY);
        var scrollEasing = easing || this.options.easing || slide_esm_ease.bounce;
        var x = newPage.x, y = newPage.y;
        var deltaX = x - this.scroll.scroller.scrollBehaviorX.currentPos;
        var deltaY = y - this.scroll.scroller.scrollBehaviorY.currentPos;
        /* istanbul ignore if */
        if (!deltaX && !deltaY) {
            this.scroll.scroller.togglePointerEvents(true);
            return;
        }
        time = time === undefined ? this.getEaseTime(deltaX, deltaY) : time;
        this.scroll.scroller.scrollTo(x, y, time, scrollEasing);
    };
    Slide.prototype.flickHandler = function () {
        var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
        var currentPosX = scrollBehaviorX.currentPos, startPosX = scrollBehaviorX.startPos, directionX = scrollBehaviorX.direction;
        var currentPosY = scrollBehaviorY.currentPos, startPosY = scrollBehaviorY.startPos, directionY = scrollBehaviorY.direction;
        var _b = this.pages.currentPage, pageX = _b.pageX, pageY = _b.pageY;
        var time = this.getEaseTime(currentPosX - startPosX, currentPosY - startPosY);
        this.goTo(pageX + directionX, pageY + directionY, time);
    };
    Slide.prototype.getEaseTime = function (deltaX, deltaY) {
        return (this.options.speed ||
            Math.max(Math.max(Math.min(Math.abs(deltaX), 1000), Math.min(Math.abs(deltaY), 1000)), 300));
    };
    Slide.prototype.modifyScrollMetaHandler = function (scrollMeta) {
        var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY, animater = _a.animater;
        var newX = scrollMeta.newX;
        var newY = scrollMeta.newY;
        var newPage = this.satisfyThreshold(newX, newY) || animater.forceStopped
            ? this.pages.getPageByDirection(this.nearestPage(newX, newY), scrollBehaviorX.direction, scrollBehaviorY.direction)
            : this.pages.currentPage;
        scrollMeta.time = this.getEaseTime(scrollMeta.newX - newPage.x, scrollMeta.newY - newPage.y);
        scrollMeta.newX = newPage.x;
        scrollMeta.newY = newPage.y;
        scrollMeta.easing = this.options.easing || slide_esm_ease.bounce;
    };
    Slide.prototype.scrollHandler = function (_a) {
        var x = _a.x, y = _a.y;
        if (this.satisfyThreshold(x, y)) {
            var newPage = this.nearestPage(x, y);
            this.pageWillChangeTo(newPage);
        }
    };
    Slide.prototype.pageWillChangeTo = function (newPage) {
        var changeToPage = this.pages.getWillChangedPage(newPage);
        if (!samePage(this.willChangeToPage, changeToPage)) {
            this.willChangeToPage = changeToPage;
            this.scroll.trigger(this.scroll.eventTypes.slideWillChange, this.willChangeToPage);
        }
    };
    Slide.prototype.registerHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    Slide.prototype.destroy = function () {
        var slideContent = this.scroll.scroller.content;
        var _a = this.options, loop = _a.loop, autoplay = _a.autoplay;
        if (loop) {
            this.removeClonedSlidePage(slideContent);
        }
        if (autoplay) {
            clearTimeout(this.autoplayTimer);
        }
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            if (hooks.eventTypes[hooksName]) {
                hooks.off(hooksName, handlerFn);
            }
        });
        this.hooksFn.length = 0;
    };
    Slide.pluginName = 'slide';
    return Slide;
}());

/* harmony default export */ var slide_esm = (Slide);

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/Calendar.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








core_esm.use(mouse_wheel_esm);
core_esm.use(pull_up_esm);
core_esm.use(pull_down_esm); // BScroll.use(Slide);

/* harmony default export */ var Calendarvue_type_script_lang_js_ = ({
  name: 'Calendar',
  props: {
    // 自定义调用
    customFunction: {
      type: Function,
      default: function _default() {}
    },
    // 最小可选日期
    minDate: {
      type: Date,
      default: null
    },
    // 最大可选日期
    maxDate: {
      type: Date,
      default: null
    },
    // 每月第一天的 className
    firstDayOfMonthClassName: {
      type: String,
      default: ''
    },
    // 操作栏高度
    calendarTitleHeight: {
      type: Number,
      default: 0
    },
    // 当天日期的 className
    todayClassName: {
      type: String,
      default: ''
    },
    // 日期被选中时的 className
    checkedDayClassName: {
      type: String,
      default: ''
    },
    // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
    notCurrentMonthDayClassName: {
      type: String,
      default: ''
    },
    // 日期被禁用时的 className
    disabledClassName: {
      type: String,
      default: ''
    },
    // 滑动的时候，是否触发改变日期
    scrollChangeDate: {
      type: Boolean,
      default: true
    },
    // 禁用周视图
    disabledWeekView: {
      type: Boolean,
      default: false
    },
    defaultDate: {
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    weekStart: {
      type: String,
      default: 'Sunday'
    },
    // 是否展示非本月日期
    isShowNotCurrentMonthDay: {
      type: Boolean,
      default: true
    },
    // 是否展示周视图
    isShowWeekView: {
      type: Boolean,
      default: false
    },
    // 日期下面的标记
    markDate: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 日期标记类型
    markType: {
      type: String,
      default: 'dot'
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
    },
    // 使用的语言包
    lang: {
      type: String,
      default: 'CN'
    }
  },
  data: function data() {
    return {
      language: {},
      // 使用的语言包
      currentChangeIsScroll: false,
      // 改变当前日期的方式是否为滑动事件
      yearOfCurrentShow: new Date().getFullYear(),
      // 当前日历展示的年份
      monthOfCurrentShow: new Date().getMonth(),
      // 当前日历展示的月份
      yearOfToday: new Date().getFullYear(),
      // 今天所在的年份
      monthOfToday: new Date().getMonth(),
      // 今天所在的月份
      dayOfToday: new Date().getDate(),
      // 今天所在的日期
      weekArray: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      // 星期数组
      calendarWeek: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      // 日历对应的星期
      calendarOfMonth: [],
      // 月份对应的日历表
      calendarOfMonthShow: [],
      // 月份对应的日历表
      calendarDaysTotalLength: 42,
      // 日历表展示的总天数  6行7列
      lastMonthYear: null,
      // 上个月的年份
      lastMonth: null,
      // 上个月的月份
      nextMonthYear: null,
      // 下个月的年份
      nextMonth: null,
      // 下个月的月份
      checkedDate: {},
      // 被选中的日期
      weekStartIndex: 0,
      // 日历第一天星期名称的index
      translateIndex: 0,
      // 用于计算上下偏移的距离
      transitionDuration: 0.3,
      // 动画持续时间
      touch: {
        x: 0,
        y: 0
      },
      // 本次touch事件，横向，纵向滑动的距离
      isTouching: false,
      // 是否正在滑动
      calendarGroupHeight: 0,
      calendarWeekTitleHeight: 0,
      calendarItemHeight: 0,
      touchStartPositionX: null,
      // 开始滑动x轴的值
      touchStartPositionY: null,
      // 开始滑动时y轴的值
      calendarY: 0,
      // 日历相对于Y轴的位置
      selectedDayIndex: 0,
      // 当前选中的日期，在这一周的第几天
      lastWeek: [],
      // 上一周的数据
      nextWeek: [],
      // 下一周的数据
      isLastWeekInCurrentMonth: false,
      // 上一周的数据是否在本月
      isNextWeekInCurrentMonth: false,
      // 下一周的数据是否在本月
      markDateColorObj: {},
      // 所有被标记的日期所对应的颜色
      markDateTypeObj: {},
      // 所有被标记的日期所对应的标记类型
      scrolldirect: 'x',
      currentPageIndex: 1,
      startmouse: 0,
      slideTouch: false,
      slidemove: true
    };
  },
  mounted: function mounted() {
    this.language = language["default"][this.lang.toUpperCase()];
    this.calendarWeek = this.language.WEEK;
    this.weekStartIndex = this.weekArray.indexOf(this.weekStart.toLowerCase());
    this.calendarWeek = [].concat(_toConsumableArray(this.calendarWeek.slice(this.weekStartIndex, this.calendarWeek.length)), _toConsumableArray(this.calendarWeek.slice(0, this.weekStartIndex)));
  },
  watch: {
    markDate: {
      handler: function handler(val) {
        var _this = this;

        val.forEach(function (item, index) {
          if (!item.color) {
            var obj = {};
            obj.color = '#1c71fb';

            if (typeof item === 'string' || typeof item === 'number') {
              item = [item];
            }

            obj.date = item || [];
            val[index] = obj;
          }

          val[index].type = item.type || _this.markType || '';
          val[index].date = _this.dateFormat(val[index].date);
        });
        this.markDateColorObj = {};
        this.markDateTypeObj = {};
        val.forEach(function (item) {
          item.date.forEach(function (date) {
            _this.$set(_this.markDateColorObj, date, item.color);

            _this.$set(_this.markDateTypeObj, date, item.type);
          });
        });
      },
      deep: true,
      immediate: true
    },
    weekStartIndex: function weekStartIndex() {
      console.log('weekStartIndex');
      this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month);
    },
    defaultDate: {
      handler: function handler(val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultDate must be date type!');
        }

        console.log('defaultDate');
        this.$set(this.checkedDate, 'year', val.getFullYear());
        this.$set(this.checkedDate, 'month', val.getMonth());
        this.$set(this.checkedDate, 'day', val.getDate());
        this.calculateCalendarOfThreeMonth(val.getFullYear(), val.getMonth());

        if (this.isShowWeek) {
          this.showWeek();
        }
      },
      immediate: true
    },
    checkedDate: {
      handler: function handler(val) {
        this.$emit('change', val);
      },
      deep: true,
      immediate: true
    },
    show: {
      handler: function handler(val) {
        if (val) {
          console.log('show'); // this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month)

          this.initDom();
        }
      },
      immediate: true
    },
    isShowWeek: {
      handler: function handler(val) {
        var _this2 = this;

        if (val) {
          this.$nextTick(function () {
            _this2.showWeek();
          });
        } else {
          console.log('isShowWeek', val);
          this.$nextTick(function () {
            _this2.showMonth();
          });
        }
      } // immediate: true

    },
    calendarGroupHeight: function calendarGroupHeight(val) {
      this.$emit('height', val + this.calendarWeekTitleHeight);
    },
    isShowWeekView: {
      handler: function handler(val) {
        if (val && this.disabledWeekView) {
          throw new Error('\'isShowWeekView\' and \'disabledWeekView\' can\'t be used at the same time');
        }
      },
      immediate: true
    },
    disabledWeekView: {
      handler: function handler(val) {
        if (val && this.isShowWeekView) {
          throw new Error('\'isShowWeekView\' and \'disabledWeekView\' can\'t be used at the same time');
        }
      },
      immediate: true
    }
  },
  computed: {
    ulTranslate3d: function ulTranslate3d() {
      return this.scrolldirect == 'y' ? "translate3d(0,".concat(-this.translateIndex * 100, "%, 0)") : "translate3d(".concat(-this.translateIndex * 100, "%,0, 0)");
    },
    liTranslate3d: function liTranslate3d(i) {
      var _this3 = this;

      return function (i) {
        return _this3.scrolldirect == 'y' ? "translate3d(".concat(_this3.calendarY, "px,").concat((i - 1 + _this3.translateIndex + (_this3.isTouching ? _this3.touch.x : 0)) * 100, "%, 0)") : "translate3d(".concat((i - 1 + _this3.translateIndex + (_this3.isTouching ? _this3.touch.x : 0)) * 100, "%,").concat(_this3.calendarY, "px, 0)");
      };
    },
    // 当前日历是否以星期方式展示
    isShowWeek: {
      get: function get() {
        return this.isShowWeekView;
      },
      set: function set(val) {
        this.$emit('update:isShowWeekView', val);
      }
    }
  },
  methods: {
    handlemouse: function handlemouse(e) {
      console.log('handlemouse', e.pageX);
      this.startmouse = e.pageX;
    },
    mousemove: function mousemove(e) {
      console.log('mousemove', e.pageX);
    },
    leave: function leave(e) {
      console.log('leave', e.pageX);
    },
    clickDoSome: function clickDoSome(event) {
      event.stopPropagation();
      event.preventDefault();
      console.log('clickDoSome', event);
    },
    // 初始化日历dom
    initDom: function initDom() {
      var _this4 = this;

      this.slidemove = false;
      this.$nextTick(function () {
        _this4.calendarItemHeight = _this4.$refs.calendarItem && _this4.$refs.calendarItem[0].offsetHeight + 12;
        _this4.calendarWeekTitleHeight = _this4.$refs.weekTitle.offsetHeight;
        var calendarItemGroup = _this4.$refs.calendarItem;
        calendarItemGroup.forEach(function (item) {
          item.style.height = "".concat(60, "px");
        });

        _this4.showMonth();

        _this4.calendarGroupHeight = _this4.calendarItemHeight * 6;

        _this4.$nextTick(function () {
          _this4.bscroll = new core_esm(_this4.$refs.calendar, {
            mouseWheel: {
              speed: 20,
              invert: false,
              easeTime: 30000
            },
            // scrollX: true,
            // scrollY: false,
            // slide: {
            //   loop: false,
            //   threshold: 0.1,
            //   speed: 400,
            //   listenFlick: true,
            //   autoplay: false,
            //   interval: 3000,
            //   startPageXIndex :1
            // },
            // momentum: false,
            // bounce: false,
            // probeType: 3,
            pullUpLoad: {
              threshold: -1,
              stop: 0
            },
            pullDownRefresh: {
              threshold: 0,
              stop: 0
            }
          });
          console.log('bscroll', _this4.bscroll); // this.bscroll.on('slideWillChange', (page) => {
          //   console.log(this.currentPageIndex,page);
          // })
          // this.bscroll.on('slidePageChanged', (page) => {
          //   console.log('slidePageChanged',page);
          // })

          _this4.bscroll.on('mousewheelStart', function (x, y, directionX, directionY) {
            console.log(x, y, directionX, directionY);
            console.log('mousewheelStart');
          });

          _this4.bscroll.on('mousewheelEnd', function (pos) {
            console.log('mousewheelEnd', pos);

            if (pos.directionY > 0) {
              console.log('pullingUp'); // this.isPullUpLoad = true
              // await this.requestData()

              _this4.isTouching = false;
              _this4.currentChangeIsScroll = true;

              _this4.$emit('slidechange', 'left');

              _this4.getNextMonth();

              if (_this4.isShowWeek) {
                setTimeout(function () {
                  _this4.isTouching = true;
                  _this4.currentChangeIsScroll = true;

                  _this4.getNextWeek();
                }, _this4.transitionDuration * 1000);
              } // this.bscroll.finishPullUp()
              // this.bscroll.refresh()
              // this.isPullUpLoad = false

            }
          }); //  this.bscroll.on('pullingUp', (pos) => {
          //     console.log('pullingUp',pos);
          //   // this.isPullUpLoad = true
          //   // await this.requestData()
          //      this.isTouching = false
          //      this.currentChangeIsScroll = true
          //     this.$emit('slidechange', 'left')
          //     this.getNextMonth()
          //     if (this.isShowWeek) {
          //       setTimeout(() => {
          //         this.isTouching = true
          //         this.currentChangeIsScroll = true
          //         this.getNextWeek()
          //       }, this.transitionDuration * 1000)
          //     }
          //   this.bscroll.finishPullUp()
          //   // this.bscroll.refresh()
          //   // this.isPullUpLoad = false
          //  })


          _this4.bscroll.on('pullingDown', function (pos) {
            console.log('pullingDown', pos); // this.isPullUpLoad = true
            // await this.requestData()

            _this4.isTouching = false;
            _this4.currentChangeIsScroll = true;

            _this4.$emit('slidechange', 'right');

            _this4.getLastMonth();

            if (_this4.isShowWeek) {
              setTimeout(function () {
                _this4.isTouching = true;
                _this4.currentChangeIsScroll = true;

                _this4.getLastWeek();
              }, _this4.transitionDuration * 1000);
            }

            _this4.bscroll.finishPullDown(); // this.bscroll.refresh()
            // this.isPullUpLoad = false

          });

          _this4.bscroll.on('scrollEnd', function (pos) {
            _this4.bscroll.finishPullUp();

            console.log('scrollEnd', pos); // this.touch = {
            //   x: 0,
            //   y: 0
            // }
            // console.log('scrollEnd', this.bscroll.y);
            // 滚动到底部
            // if (this.bscroll.y <= this.bscroll.maxScrollY + 50) {
            // }
          });
        }); // this.$forceUpdate();

      });
    },
    // 今天
    today: function today() {
      var _this5 = this;

      console.log('today');
      this.$set(this.checkedDate, 'day', new Date().getDate());
      this.yearOfCurrentShow = new Date().getFullYear(); // 当前日历展示的年份

      this.monthOfCurrentShow = new Date().getMonth(); // 当前日历展示的月份

      this.calculateCalendarOfThreeMonth();

      if (this.isShowWeek) {
        setTimeout(function () {
          _this5.isTouching = true;

          _this5.showWeek();
        }, this.transitionDuration * 1000);
      }
    },
    // 是否为当前月的第一天
    isFirstDayOfMonth: function isFirstDayOfMonth(date, i) {
      return date.day === 1 && !this.isNotCurrentMonthDay(date, i);
    },
    // 计算当前展示月份的前后月份日历信息 flag  -1:获取上个月日历信息   0:当月信息或者跨月展示日历信息  1:获取下个月日历信息
    calculateCalendarOfThreeMonth: function calculateCalendarOfThreeMonth() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth();
      this.lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份

      this.lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份

      this.nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份

      this.nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份

      var firstMonth = this.calculateCalendarOfMonth(this.lastMonthYear, this.lastMonth);
      var secondMonth = this.calculateCalendarOfMonth(year, month);
      var thirdMonth = this.calculateCalendarOfMonth(this.nextMonthYear, this.nextMonth);
      this.calendarOfMonth = [];
      this.calendarOfMonth.push(firstMonth, secondMonth, thirdMonth);
      this.calendarOfMonthShow = JSON.parse(JSON.stringify(this.calendarOfMonth));
      var obj = this.customFunction();
      console.log(obj);

      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false;
        return;
      } // 改变日期选择的日期


      var tempDate = {};
      var day = this.checkedDate.day;

      if (day > 30 || day > 28 && month === 1) {
        day = this.daysOfMonth(year)[month];
      }

      tempDate = {
        day: day,
        year: year,
        month: month
      };
      if (this.formatDisabledDate(tempDate)) return; // fix: change 事件会触发两次 https://github.com/TangSY/vue-hash-calendar/issues/47

      if (this.isShowWeek) return;
      this.$set(this.checkedDate, 'day', tempDate.day);
      this.$set(this.checkedDate, 'year', year);
      this.$set(this.checkedDate, 'month', month);
    },
    // 计算每个月的日历
    calculateCalendarOfMonth: function calculateCalendarOfMonth() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth();
      var calendarOfCurrentMonth = [];
      var lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份

      var lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份

      var nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份

      var nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份
      // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期

      var dayOfWeek = this.getDayOfWeek(year, month);
      var lastMonthDays = this.daysOfMonth(year)[lastMonth]; // 上个月的总天数

      if (dayOfWeek < this.weekStartIndex) {
        dayOfWeek = 7 - this.weekStartIndex + dayOfWeek;
      } else {
        dayOfWeek -= this.weekStartIndex;
      }

      var lastMonthDateObj;

      for (var i = 0; i < dayOfWeek; i++) {
        lastMonthDateObj = src_calendar.solar2lunar(lastMonthYear, lastMonth + 1, this.isShowNotCurrentMonthDay ? lastMonthDays - (dayOfWeek - 1 - i) : '');
        calendarOfCurrentMonth.push({
          year: lastMonthYear,
          month: lastMonth,
          day: this.isShowNotCurrentMonthDay ? lastMonthDays - (dayOfWeek - 1 - i) : '',
          astro: lastMonthDateObj.astro,
          // 星座
          animal: lastMonthDateObj.Animal,
          // 属相
          gzDay: lastMonthDateObj.gzDay,
          // 天干地支
          gzMonth: lastMonthDateObj.gzMonth,
          // 天干地支
          gzYear: lastMonthDateObj.gzYear,
          // 天干地支
          lunar: lastMonthDateObj.IDayCn,
          // 农历日
          lunarMonth: lastMonthDateObj.IMonthCn,
          // 农历月
          lunarFestival: lastMonthDateObj.lunarFestival,
          // 节日
          festival: lastMonthDateObj.festival,
          // 节日
          term: lastMonthDateObj.Term // 节气

        });
      } // 当月日期


      var dateObj;

      for (var _i = 0; _i < this.daysOfMonth(year)[month]; _i++) {
        dateObj = src_calendar.solar2lunar(year, month + 1, _i + 1);
        calendarOfCurrentMonth.push({
          year: year,
          month: month,
          day: _i + 1,
          astro: dateObj.astro,
          // 星座
          animal: dateObj.Animal,
          // 属相
          gzDay: dateObj.gzDay,
          // 天干地支
          gzMonth: dateObj.gzMonth,
          // 天干地支
          gzYear: dateObj.gzYear,
          // 天干地支
          lunar: dateObj.IDayCn,
          // 农历日
          lunarMonth: dateObj.IMonthCn,
          // 农历月
          lunarFestival: dateObj.lunarFestival,
          // 节日
          festival: dateObj.festival,
          // 节日
          term: dateObj.Term // 节气

        });
      } // 在日历后面填充下个月的日期，补齐6行7列


      var fillDays = this.calendarDaysTotalLength - calendarOfCurrentMonth.length;
      var nextMonthDateObj;

      for (var _i2 = 0; _i2 < fillDays; _i2++) {
        nextMonthDateObj = src_calendar.solar2lunar(nextMonthYear, nextMonth + 1, this.isShowNotCurrentMonthDay ? _i2 + 1 : '');
        calendarOfCurrentMonth.push({
          year: nextMonthYear,
          month: nextMonth,
          day: this.isShowNotCurrentMonthDay ? _i2 + 1 : '',
          astro: nextMonthDateObj.astro,
          // 星座
          animal: nextMonthDateObj.Animal,
          // 属相
          gzDay: nextMonthDateObj.gzDay,
          // 天干地支
          gzMonth: nextMonthDateObj.gzMonth,
          // 天干地支
          gzYear: nextMonthDateObj.gzYear,
          // 天干地支
          lunar: nextMonthDateObj.IDayCn,
          // 农历日
          lunarMonth: nextMonthDateObj.IMonthCn,
          // 农历月
          lunarFestival: nextMonthDateObj.lunarFestival,
          // 节日
          festival: nextMonthDateObj.festival,
          // 节日
          term: nextMonthDateObj.Term // 节气

        });
      }

      return calendarOfCurrentMonth;
    },
    daysOfMonth: function daysOfMonth(year) {
      return [31, 28 + this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    },
    // 判断是否为闰年
    isLeap: function isLeap(year) {
      return year % 4 === 0 ? year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0 : 0;
    },
    // 获取月份某一天是星期几
    getDayOfWeek: function getDayOfWeek() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getMonth();
      var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var dayOfMonth = new Date(year, month, day); // 获取当月的第day天

      var dayOfWeek = dayOfMonth.getDay(); // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)

      return dayOfWeek;
    },
    // 点击日历上的日期
    clickCalendarDay: function clickCalendarDay(date, e) {
      console.log('clickCalendarDay', this.slidemove);

      if (this.slidemove) {
        this.slidemove = false;
        return;
      }

      if (!date || !date.day) return;
      if (this.formatDisabledDate(date)) return; // this.touch = {
      //   x: 0,
      //   y: 0
      // }

      this.scrolldirect = 'x';
      this.isShowWeek = true;
      this.$set(this.checkedDate, 'year', date.year);
      this.$set(this.checkedDate, 'month', date.month);
      this.$set(this.checkedDate, 'day', date.day);

      if (date.month === this.lastMonth && date.year === this.lastMonthYear) {
        this.getLastMonth();
      }

      if (date.month === this.nextMonth && date.year === this.nextMonthYear) {
        this.getNextMonth();
      }

      if (this.isShowWeek) {
        this.showWeek();
      }

      this.$emit('click', this.checkedDate); // this.$emit('slidechange', 'up')
      // this.showWeek()
      // this.scrolldirect = 'x'

      this.bscroll.destroy();
    },
    // 该日期是否为今天
    isToday: function isToday(date) {
      return this.yearOfToday === date.year && this.monthOfToday === date.month && this.dayOfToday === date.day;
    },
    // 该日期是否为选中的日期
    isCheckedDay: function isCheckedDay(date) {
      if (this.formatDisabledDate(date)) return false;
      return this.checkedDate.year === date.year && this.checkedDate.month === date.month && this.checkedDate.day === date.day;
    },
    // 非本月日期
    isNotCurrentMonthDay: function isNotCurrentMonthDay(date, index) {
      var dateOfCurrentShow = this.calendarOfMonth[index][15]; // 本月中间的日期一定为本月

      return date.year !== dateOfCurrentShow.year || date.month !== dateOfCurrentShow.month;
    },
    // 监听手指开始滑动事件
    touchStart: function touchStart(event) {
      this.slideTouch = true;
      console.log('touchStart111', event);
      this.$emit('touchstart', event);
      this.touchStartPositionX = event.touches ? event.touches[0].clientX : event.clientX;
      this.touchStartPositionY = event.touches ? event.touches[0].clientY : event.clientY;
      this.touch = {
        x: 0
      };
      this.isTouching = true;
    },
    // 监听手指移动事件
    touchMove: function touchMove(event) {
      if (this.slideTouch) {
        this.slidemove = true;
        console.log('touchmove111', event);
        this.$emit('touchmove', event); // fix: 禁止切换周模式显示后，日历区域上下滑动，页面不能触发上下滑动了 #62

        if (!this.disabledWeekView) {
          event.stopPropagation();
          event.preventDefault();
        }

        var moveX = event.touches ? event.touches[0].clientX : event.clientX - this.touchStartPositionX;
        var moveY = event.touches ? event.touches[0].clientY : event.clientY - this.touchStartPositionY;

        if (Math.abs(moveX) > Math.abs(moveY)) {
          if (this.isDisabledHorizontalScroll(moveX < 0 ? 'left' : 'right')) return;
          this.touch = {
            x: moveX / this.$refs.calendar.offsetWidth,
            y: 0
          };
        } else {
          // 禁用周视图（禁止上下滑动）
          if (this.disabledWeekView) return;
          this.touch = {
            x: 0,
            y: moveY / this.$refs.calendar.offsetHeight
          };
        }

        this.setDisabledScrollDirection();
      }
    },
    // 监听touch结束事件
    touchEnd: function touchEnd(e) {
      var _this6 = this;

      this.slideTouch = false;
      console.log('touchEnd111', e);
      this.$emit('touchend', e);
      this.isTouching = false;

      if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x) > 0.2) {
        this.currentChangeIsScroll = true;

        if (this.touch.x > 0) {
          this.$emit('slidechange', 'right');
          this.getLastMonth();

          if (this.isShowWeek) {
            setTimeout(function () {
              _this6.isTouching = true;
              _this6.currentChangeIsScroll = true;

              _this6.getLastWeek();
            }, this.transitionDuration * 1000);
          }
        } else if (this.touch.x < 0) {
          this.$emit('slidechange', 'left');
          this.getNextMonth();

          if (this.isShowWeek) {
            setTimeout(function () {
              _this6.isTouching = true;
              _this6.currentChangeIsScroll = true;

              _this6.getNextWeek();
            }, this.transitionDuration * 1000);
          }
        }
      }

      if (Math.abs(this.touch.y) > Math.abs(this.touch.x) && Math.abs(this.touch.y * this.$refs.calendar.offsetHeight) > 50) {
        if (this.touch.y > 0 && this.isShowWeek) {
          this.$emit('slidechange', 'down');
          this.showMonth();
        } else if (this.touch.y < 0 && !this.isShowWeek) {
          this.$emit('slidechange', 'up');
          this.showWeek();
        }
      } else {
        this.touch = {
          x: 0,
          y: 0
        };
      }
    },
    // 日历以月份方式展示
    showMonth: function showMonth() {
      console.log('showMonth');
      this.calendarY = 0;
      this.isShowWeek = false;
      this.calendarGroupHeight = this.calendarItemHeight * 6;
      this.isLastWeekInCurrentMonth = false;
      this.isNextWeekInCurrentMonth = false;
      this.calculateCalendarOfThreeMonth(this.checkedDate.year, this.checkedDate.month);
    },
    // 日历以星期方式展示
    showWeek: function showWeek() {
      var _this$calendarOfMonth, _this$calendarOfMonth2;

      var checkedDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.checkedDate;
      var daysArr = [];
      this.calendarOfMonth[1].forEach(function (item) {
        daysArr.push(item.day);
      });
      var dayIndexOfMonth = daysArr.indexOf(checkedDate.day); // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf

      if (checkedDate.day > 15) {
        dayIndexOfMonth = daysArr.lastIndexOf(checkedDate.day);
      } // 计算当前日期在第几行


      var indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7);
      var lastLine = indexOfLine - 1;
      this.calendarY = -(this.calendarItemHeight * lastLine);
      this.isShowWeek = true;
      this.calendarGroupHeight = this.calendarItemHeight;
      var currentWeek = [];
      var sliceStart = lastLine * 7;
      var sliceEnd = sliceStart + 7;
      this.isLastWeekInCurrentMonth = false;
      currentWeek = this.calendarOfMonth[1].slice(sliceStart, sliceEnd);

      for (var i in currentWeek) {
        if (currentWeek[i].day === checkedDate.day) {
          this.selectedDayIndex = i;
        }
      }

      var firstDayOfCurrentWeek = currentWeek[0];
      var lastDayOfCurrentWeek = currentWeek[6];

      if (firstDayOfCurrentWeek.month !== checkedDate.month || firstDayOfCurrentWeek.day === 1) {
        if (this.calendarOfMonth[0].slice(28, 35)[6].month !== checkedDate.month) {
          this.lastWeek = this.calendarOfMonth[0].slice(28, 35);
        } else {
          this.lastWeek = this.calendarOfMonth[0].slice(21, 28);
        }
      } else {
        this.lastWeek = this.calendarOfMonth[1].slice(sliceStart - 7, sliceEnd - 7);

        if (this.lastWeek[this.selectedDayIndex] && this.lastWeek[this.selectedDayIndex].month === checkedDate.month) {
          this.isLastWeekInCurrentMonth = true;
        }
      }

      this.isNextWeekInCurrentMonth = false;

      if (lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day && lastDayOfCurrentWeek.month !== checkedDate.month) {
        this.nextWeek = this.calendarOfMonth[2].slice(7, 14);
      } else {
        if (lastDayOfCurrentWeek.day === this.daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]) {
          this.nextWeek = this.calendarOfMonth[2].slice(0, 7);
        } else {
          this.nextWeek = this.calendarOfMonth[1].slice(sliceStart + 7, sliceEnd + 7);

          if (this.nextWeek[this.selectedDayIndex].month === checkedDate.month) {
            this.isNextWeekInCurrentMonth = true;
          }
        }
      }

      (_this$calendarOfMonth = this.calendarOfMonthShow[0]).splice.apply(_this$calendarOfMonth, [sliceStart, 7].concat(_toConsumableArray(this.lastWeek)));

      (_this$calendarOfMonth2 = this.calendarOfMonthShow[2]).splice.apply(_this$calendarOfMonth2, [sliceStart, 7].concat(_toConsumableArray(this.nextWeek)));
    },
    // 显示上一周
    getLastWeek: function getLastWeek() {
      var checkedDate = this.lastWeek[this.selectedDayIndex];
      this.showWeek(checkedDate);
      if (this.formatDisabledDate(checkedDate)) return;

      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false;
        return;
      }

      this.checkedDate = checkedDate;
    },
    // 显示下一周
    getNextWeek: function getNextWeek() {
      var checkedDate = this.nextWeek[this.selectedDayIndex];
      this.showWeek(checkedDate);
      if (this.formatDisabledDate(checkedDate)) return;

      if (!this.scrollChangeDate && this.currentChangeIsScroll) {
        this.currentChangeIsScroll = false;
        return;
      }

      this.checkedDate = checkedDate;
    },
    // 获取上个月日历
    getLastMonth: function getLastMonth() {
      console.log('getLastMonth');
      this.translateIndex += 1;

      if (!this.isLastWeekInCurrentMonth) {
        this.yearOfCurrentShow = this.lastMonthYear;
        this.monthOfCurrentShow = this.lastMonth;
      }

      this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow);
    },
    // 获取下个月日历
    getNextMonth: function getNextMonth() {
      console.log('getNextMonth');
      this.translateIndex -= 1;

      if (!this.isNextWeekInCurrentMonth) {
        this.yearOfCurrentShow = this.nextMonthYear;
        this.monthOfCurrentShow = this.nextMonth;
      }

      this.calculateCalendarOfThreeMonth(this.yearOfCurrentShow, this.monthOfCurrentShow);
    },
    // 当前日期是否需要标记
    markDateColor: function markDateColor(date, type) {
      var dateString = "".concat(date.year, "/").concat(this.fillNumber(date.month + 1), "/").concat(this.fillNumber(date.day));
      var markDateTypeString = this.markDateTypeObj[dateString] || '';
      if (markDateTypeString.indexOf(type) === -1) return;
      return this.markDateColorObj[dateString];
    },
    formatDisabledDate: function formatDisabledDate(date) {
      if (!date.day) return;
      var fDate = new Date("".concat(date.year, "/").concat(date.month + 1, "/").concat(date.day));
      return this.disabledDate(fDate) || !isDateInRange(fDate, this.minDate, this.maxDate);
    },
    // 禁止继续往横向的当前方向滑动 （当设置 minDate 或 maxDate 时生效）
    isDisabledHorizontalScroll: function isDisabledHorizontalScroll(direc) {
      var minDate = this.minDate && this.minDate.getTime() - 24 * 60 * 60 * 1000;
      var maxDate = this.maxDate && this.maxDate.getTime();

      if (this.isShowWeek) {
        var lastWeekLastedDay = new Date("".concat(this.lastWeek[6].year, "/").concat(this.lastWeek[6].month + 1, "/").concat(this.lastWeek[6].day)).getTime();
        var nextWeekFirstDay = new Date("".concat(this.nextWeek[0].year, "/").concat(this.nextWeek[0].month + 1, "/").concat(this.nextWeek[0].day)).getTime();
        if (direc === 'left' && maxDate) return nextWeekFirstDay >= maxDate;
        if (direc === 'right' && minDate) return lastWeekLastedDay <= minDate;
      } else {
        var lastMonthLastedDay = new Date("".concat(this.lastMonthYear, "/").concat(this.lastMonth + 1, "/").concat(this.daysOfMonth(this.lastMonthYear)[this.lastMonth])).getTime();
        var nextMonthFirstDay = new Date("".concat(this.nextMonthYear, "/").concat(this.nextMonth + 1, "/1")).getTime();
        if (direc === 'left' && maxDate) return nextMonthFirstDay >= maxDate;
        if (direc === 'right' && minDate) return lastMonthLastedDay <= minDate;
      }

      return false;
    },
    // 小于10，在前面补0
    fillNumber: function fillNumber(val) {
      return val > 9 ? val : '0' + val;
    },
    // 日期格式转换
    dateFormat: function dateFormat(dateArr) {
      dateArr.forEach(function (date, index) {
        dateArr[index] = util_formatDate(date, 'YY/MM/DD');
      });
      return dateArr;
    },
    // 是否可以滑动
    isCanScroll: function isCanScroll(dire) {
      var _this7 = this;

      var scrollObj = {
        up: [true, 'up', 'vertical'],
        down: [true, 'down', 'vertical'],
        left: [true, 'left', 'horizontal'],
        right: [true, 'right', 'horizontal']
      };
      var checkedScrollArr = scrollObj[dire];
      return !checkedScrollArr.some(function (item) {
        return item === _this7.disabledScroll;
      });
    },
    // 设置禁止滑动的方向
    setDisabledScrollDirection: function setDisabledScrollDirection() {
      this.touch.x < 0 && !this.isCanScroll('left') && (this.touch.x = 0);
      this.touch.x > 0 && !this.isCanScroll('right') && (this.touch.x = 0);
      this.touch.y < 0 && !this.isCanScroll('up') && (this.touch.y = 0);
      this.touch.y > 0 && !this.isCanScroll('down') && (this.touch.y = 0);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/Calendar.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Calendarvue_type_script_lang_js_ = (Calendarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueVikingCalendar/src/Calendar.vue?vue&type=style&index=0&id=02c761b3&lang=stylus&scoped=true&
var Calendarvue_type_style_index_0_id_02c761b3_lang_stylus_scoped_true_ = __webpack_require__("28d3");

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.9.8@vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/Calendar.vue






/* normalize component */

var component = normalizeComponent(
  src_Calendarvue_type_script_lang_js_,
  Calendarvue_type_template_id_02c761b3_scoped_true_render,
  Calendarvue_type_template_id_02c761b3_scoped_true_staticRenderFns,
  false,
  null,
  "02c761b3",
  null
  
)

/* harmony default export */ var Calendar = (component.exports);
// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02032c06-vue-loader-template"}!./node_modules/_vue-loader@15.9.8@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/TimePicker.vue?vue&type=template&id=30a834a4&scoped=true&
var TimePickervue_type_template_id_30a834a4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"time_body"},[_c('div',{staticClass:"time_group"},_vm._l((_vm.timeArray),function(item,index){return _c('div',{key:index,staticClass:"time_content",attrs:{"id":_vm.hashID[index]},on:{"touchstart":_vm.timeTouchStart,"touchmove":function($event){return _vm.timeTouchMove($event, index)},"touchend":function($event){return _vm.timeTouchEnd($event, index)}}},_vm._l((item),function(time,j){return _c('div',{key:index + j,staticClass:"time_item",class:[{'time_item_show': _vm.isBeSelectedTime(time, index)}, _vm.hashClass, {'time-disabled': _vm.formatDisabledDate(time, index)}]},[_vm._v(_vm._s(_vm._f("fillNumber")(time))+"\n      ")])}),0)}),0)])}
var TimePickervue_type_template_id_30a834a4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/TimePicker.vue?vue&type=template&id=30a834a4&scoped=true&

// EXTERNAL MODULE: ./node_modules/_core-js@2.6.12@core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("fc02");

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/TimePicker.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TimePickervue_type_script_lang_js_ = ({
  name: 'TimePicker',
  props: {
    defaultTime: null,
    show: false,
    minuteStep: {
      type: Number,
      default: 1
    },
    selectableRange: {
      type: String | Array,
      default: ''
    },
    // 日历选中的时间 {year, month, day}
    calendarDate: null,
    // 禁用的日期
    disabledTime: {
      type: Function,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      hashID: [],
      // 用于生成随机ID
      hashClass: '',
      // 用于生成随机class
      timeRange: [],
      // 时间范围
      timeOptions: {
        minHours: 24,
        minMinutes: 59,
        maxHours: 0,
        maxMinutes: 0
      },
      checkedDate: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
      },
      // 被选中的日期
      timeHeight: 0,
      // 单个时间项的高度
      timeArray: [],
      // 时间选择器数据
      timeStartY: 0,
      // touchstart,Y轴坐标
      timeStartUp: 0 // 滑动开始前，时间控件dom与顶部的偏移量

    };
  },
  created: function created() {
    this.hashID = ["time".concat(parseInt(Math.random() * 1000000)), "time".concat(parseInt(Math.random() * 1000000))];
    this.hashClass = "time_item_".concat(parseInt(Math.random() * 1000000));
  },
  computed: {},
  watch: {
    defaultTime: {
      handler: function handler(val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultTime must be date type!');
        }

        this.$set(this.checkedDate, 'hours', val.getHours());
        this.$set(this.checkedDate, 'minutes', val.getMinutes());
      },
      immediate: true
    },
    checkedDate: {
      handler: function handler(val) {
        this.$emit('change', val);
      },
      deep: true,
      immediate: true
    },
    show: {
      handler: function handler(val) {
        if (val) {
          this.initTimeArray();
        }
      },
      immediate: true
    },
    minuteStep: {
      handler: function handler(val) {
        if (val <= 0 || val >= 60) {
          throw new Error("The minutes-step can't be: ".concat(val, "!"));
        }

        if (60 % val !== 0) {
          throw new Error('The minutes-step must be divided by 60!');
        }
      },
      immediate: true
    },
    selectableRange: {
      handler: function handler(val) {
        var _this = this;

        if (!val) return;
        this.timeRange = [];
        var formatPass = false;

        if (typeof val === 'string') {
          formatPass = this.checkTimeRange(val);
        } else if (val instanceof Array) {
          formatPass = val.every(function (item) {
            return _this.checkTimeRange(item);
          });
        }

        if (!formatPass) throw new Error('The format of selectableRange is error!');
      },
      immediate: true
    }
  },
  filters: {
    // 小于10，在前面补0
    fillNumber: function fillNumber(val) {
      return val > 9 ? val : '0' + val;
    }
  },
  methods: {
    // 初始化时间选择器数据
    initTimeArray: function initTimeArray() {
      var _this2 = this;

      var hours = [];
      this.timeArray = [];

      for (var i = 0; i < 24; i++) {
        hours.push(i);
      }

      var minutes = [];

      for (var _i = 0; _i < 60; _i++) {
        if (_i % this.minuteStep === 0) {
          minutes.push(_i);
        }
      }

      this.timeArray.push(hours, minutes);
      this.$nextTick(function () {
        var checkHours = _this2.checkedDate.hours;
        var checkMinutes = _this2.checkedDate.minutes;
        _this2.timeHeight = getComputedStyle(document.querySelector(".".concat(_this2.hashClass))).height || '';
        _this2.timeHeight = parseFloat(_this2.timeHeight.split('px')[0]);

        var hoursUp = (2 - parseFloat(checkHours)) * _this2.timeHeight;

        var minutesUp = (2 - parseFloat(checkMinutes) / _this2.minuteStep) * _this2.timeHeight;

        document.querySelector("#".concat(_this2.hashID[0])).style.webkitTransform = 'translate3d(0px,' + hoursUp + 'px,0px)';
        document.querySelector("#".concat(_this2.hashID[1])).style.webkitTransform = 'translate3d(0px,' + minutesUp + 'px,0px)';
      });
    },
    formatDisabledDate: function formatDisabledDate(time, index) {
      var hours = index === 0 ? time : this.checkedDate.hours;
      var minutes = index === 1 ? time : this.checkedDate.minutes;
      var dateStr = "".concat(this.calendarDate.year, "/").concat(this.calendarDate.month + 1, "/").concat(this.calendarDate.day, " ").concat(hours, ":").concat(minutes);
      var fDate = new Date(dateStr);
      return this.disabledTime(fDate);
    },
    timeTouchStart: function timeTouchStart(e) {
      e.preventDefault();
      this.timeStartY = e.changedTouches[0].pageY;
      var transform = e.currentTarget.style.webkitTransform;

      if (transform) {
        this.timeStartUp = parseFloat(transform.split(' ')[1].split('px')[0]);
      }
    },
    timeTouchMove: function timeTouchMove(e, index) {
      var moveEndY = e.changedTouches[0].pageY;
      var Y = moveEndY - this.timeStartY;
      e.currentTarget.style.webkitTransform = 'translate3d(0px,' + (Y + this.timeStartUp) + 'px,0px)';

      if (checkPlatform() === '2') {
        this.timeTouchEnd(e, index);
        return false;
      }
    },
    timeTouchEnd: function timeTouchEnd(e, index) {
      var transform = e.currentTarget.style.webkitTransform;
      var endUp = this.timeStartUp;

      if (transform) {
        endUp = parseFloat(e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0]);
      }

      var distance = Math.abs(endUp - this.timeStartUp);
      var upCount = Math.floor(distance / this.timeHeight) || 1;
      var halfWinWith = this.timeHeight / 2;
      var up = this.timeStartUp;

      if (endUp <= this.timeStartUp) {
        // 向上滑动 未过临界值
        if (distance <= halfWinWith) {
          up = this.timeStartUp;
        } else {
          up = this.timeStartUp - this.timeHeight * upCount;

          if (up < -(this.timeArray[index].length - 3) * this.timeHeight) {
            up = -(this.timeArray[index].length - 3) * this.timeHeight;
          }
        }
      } else {
        // 向下滑动 未过临界值
        if (distance <= halfWinWith) {
          up = this.timeStartUp;
        } else {
          up = this.timeStartUp + this.timeHeight * upCount;

          if (up > this.timeHeight * 2) {
            up = this.timeHeight * 2;
          }
        }
      }

      if (index === 0) {
        var hour = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight));

        if (this.formatDisabledDate(hour, index)) {
          up = this.timeStartUp;
        } else {
          this.$set(this.checkedDate, 'hours', hour);
        }
      } else {
        var minute = 2 - Math.round(parseFloat(up) / parseFloat(this.timeHeight));

        if (this.formatDisabledDate(minute, index)) {
          up = this.timeStartUp;
        } else {
          this.$set(this.checkedDate, 'minutes', minute * this.minuteStep);
        }
      }

      e.currentTarget.style.webkitTransition = 'transform 300ms';
      e.currentTarget.style.webkitTransform = 'translate3d(0px,' + up + 'px,0px)';
    },
    isBeSelectedTime: function isBeSelectedTime(time, index) {
      // 是否为当前选中的时间
      return index === 0 && time === this.checkedDate.hours || index === 1 && time === this.checkedDate.minutes;
    },
    isDisableTime: function isDisableTime(time, index) {
      // 是否禁用当前时间
      for (var i in this.timeRange) {
        for (var j in this.timeRange[i]) {
          if (index === 0) {
            var currentHours = this.timeRange[i][j].split(':')[0];

            if (currentHours > time) {
              this.timeOptions.minHours = currentHours;
              return true;
            }
          }
        }
      }

      return false;
    },
    // 校验时间范围
    checkTimeRange: function checkTimeRange(timeRange) {
      if (!timeRange) return;
      var timeArr = timeRange.split('-');
      if (timeArr.length === 0 || timeArr.length > 2) return false;
      this.timeRange.push(timeRange);
      return timeArr.every(function (time) {
        var mhArr = time.split(':');
        if (mhArr.length === 0 || mhArr.length > 2) return false; // 校验单个时间是否符合规范 00:00 - 24:00

        if (parseInt(mhArr[0]) < 0 || parseInt(mhArr[0]) > 24) return false;
        if (parseInt(mhArr[1]) < 0 || parseInt(mhArr[1]) > 59) return false;
        if (parseInt(mhArr[0]) === 24 && parseInt(mhArr[1]) > 0) return false;
        return true;
      });
    }
  }
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/TimePicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_TimePickervue_type_script_lang_js_ = (TimePickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueVikingCalendar/src/TimePicker.vue?vue&type=style&index=0&id=30a834a4&lang=stylus&scoped=true&
var TimePickervue_type_style_index_0_id_30a834a4_lang_stylus_scoped_true_ = __webpack_require__("83de");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/TimePicker.vue






/* normalize component */

var TimePicker_component = normalizeComponent(
  src_TimePickervue_type_script_lang_js_,
  TimePickervue_type_template_id_30a834a4_scoped_true_render,
  TimePickervue_type_template_id_30a834a4_scoped_true_staticRenderFns,
  false,
  null,
  "30a834a4",
  null
  
)

/* harmony default export */ var TimePicker = (TimePicker_component.exports);
// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02032c06-vue-loader-template"}!./node_modules/_vue-loader@15.9.8@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/YearMonthPicker.vue?vue&type=template&id=0a626a56&scoped=true&
var YearMonthPickervue_type_template_id_0a626a56_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(['year', 'yearRange', 'month'].includes(_vm.type)),expression:"['year', 'yearRange', 'month'].includes(type)"}],staticClass:"year-body",style:({'top': _vm.calendarTitleHeight + 'px', 'height': _vm.itemHeight * 4 + 'px'})},[_c('ScrollContainer',{attrs:{"calendarData":_vm.yearMonthShow,"disabledScroll":_vm.disabledScrollDirec},on:{"touchstart":_vm.touchStart,"touchmove":_vm.touchMove,"touchend":_vm.touchEnd,"slidechange":_vm.slideChange},scopedSlots:_vm._u([{key:"default",fn:function(scope){return _vm._l((scope.currArr),function(item,index){return _c('div',{key:index,staticClass:"year-body-item",class:[_vm.isDisabled(item, index) && (_vm.disabledClassName || 'is_disabled')],style:({'height': _vm.itemHeight + 'px'}),on:{"click":function($event){return _vm.dateClick(item, index)}}},[_c('p',{staticClass:"year-body-item-content",class:[_vm.isChecked(item, index) && (_vm.checkedDayClassName || 'is_checked'),
            _vm.isNotCurrent(index) && (_vm.notCurrentMonthDayClassName || 'is_not_current')],style:({'width': _vm.type === 'yearRange' ? '92px' : '60px'})},[_vm._v("\n          "+_vm._s(_vm.type === 'yearRange' ? ((item.s) + "-" + (item.e)) : _vm.type === 'month' ? _vm.language.MONTH[index] : item)+"\n        ")])])})}}])})],1)}
var YearMonthPickervue_type_template_id_0a626a56_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/YearMonthPicker.vue?vue&type=template&id=0a626a56&scoped=true&

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02032c06-vue-loader-template"}!./node_modules/_vue-loader@15.9.8@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/components/ScrollContainer.vue?vue&type=template&id=153808b4&scoped=true&
var ScrollContainervue_type_template_id_153808b4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{ref:"container",staticClass:"calendar_group_ul",staticStyle:{"height":"250px","overflow":"hidden","background":"#FFFFFF"},style:({'transform': ("translate3d(" + (-_vm.translateIndex*100) + "%, 0, 0)")}),on:{"mousedown":_vm.touchStart,"mousemove":_vm.touchMove,"mouseup":_vm.touchEnd,"mouseleave":_vm.touchEnd,"touchstart":_vm.touchStart,"touchmove":function($event){$event.stopPropagation();$event.preventDefault();return _vm.touchMove.apply(null, arguments)},"touchend":_vm.touchEnd}},_vm._l((_vm.calendarData),function(item,i){return _c('li',{key:i,staticClass:"calendar_group_li",style:({transform: ("translate3d(" + ((i-1+_vm.translateIndex + (_vm.isTouching ? _vm.touch.x : 0))*100) + "%, " + _vm.calendarY + "px, 0)"),transitionDuration: ((_vm.isTouching ? 0 : _vm.transitionDuration) + "s"),})},[_vm._t("default",null,{"currArr":item})],2)}),0)}
var ScrollContainervue_type_template_id_153808b4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./packages/vueVikingCalendar/components/ScrollContainer.vue?vue&type=template&id=153808b4&scoped=true&

// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/components/ScrollContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




core_esm.use(mouse_wheel_esm);
core_esm.use(pull_up_esm);
core_esm.use(pull_down_esm);
/* harmony default export */ var ScrollContainervue_type_script_lang_js_ = ({
  props: {
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
    },
    // 日历数据
    calendarData: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      translateIndex: 0,
      // 用于计算上下偏移的距离
      transitionDuration: 0.3,
      // 动画持续时间
      touch: {
        x: 0,
        y: 0
      },
      // 本次touch事件，横向，纵向滑动的距离
      isTouching: false,
      // 是否正在滑动
      touchStartPositionX: null,
      // 开始滑动x轴的值
      touchStartPositionY: null,
      // 开始滑动时y轴的值
      calendarY: 0,
      // 日历相对于Y轴的位置
      bscroll: null
    };
  },
  mounted: function mounted() {},
  methods: {
    // 监听手指开始滑动事件
    touchStart: function touchStart(event) {
      console.log('touchStart', event);
      this.$emit('touchstart', event);
      this.touchStartPositionX = event.touches ? event.touches[0].clientX : event.clientX;
      this.touchStartPositionY = event.touches ? event.touches[0].clientY : event.clientY;
      this.touch = {
        x: 0
      };
      this.isTouching = true;
    },
    // 监听手指移动事件
    touchMove: function touchMove(event) {
      this.$emit('touchmove', event);
      var moveX = event.touches ? event.touches[0].clientX : event.clientX - this.touchStartPositionX;
      var moveY = event.touches ? event.touches[0].clientY : event.clientY - this.touchStartPositionY;
      console.log('touchMove', Math.abs(moveX) > Math.abs(moveY));

      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.touch = {
          x: moveX / this.$refs.container.offsetWidth,
          y: 0
        };
      } else {
        this.touch = {
          x: 0,
          y: moveY / this.$refs.container.offsetHeight
        };
      }

      this.setDisabledScrollDirection();
    },
    // 监听touch结束事件
    touchEnd: function touchEnd(e) {
      console.log('touchEnd', Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x) > 0.2, this.touch.y > 0 && this.isShowWeek);
      this.$emit('touchend', e);
      this.isTouching = false;

      if (Math.abs(this.touch.x) > Math.abs(this.touch.y) && Math.abs(this.touch.x) > 0.2) {
        if (this.touch.x > 0) {
          this.$emit('slidechange', 'right');
          this.translateIndex += 1;
        } else if (this.touch.x < 0) {
          this.$emit('slidechange', 'left');
          this.translateIndex -= 1;
        }
      }

      if (Math.abs(this.touch.y) > Math.abs(this.touch.x) && Math.abs(this.touch.y * this.$refs.container.offsetHeight) > 50) {
        if (this.touch.y > 0 && this.isShowWeek) {
          this.$emit('slidechange', 'down');
        } else if (this.touch.y < 0 && !this.isShowWeek) {
          this.$emit('slidechange', 'up');
        }
      } else {
        this.touch = {
          x: 0,
          y: 0
        };
      }
    },
    // 是否可以滑动
    isCanScroll: function isCanScroll(dire) {
      var _this = this;

      var scrollObj = {
        up: [true, 'up', 'vertical'],
        down: [true, 'down', 'vertical'],
        left: [true, 'left', 'horizontal'],
        right: [true, 'right', 'horizontal']
      };
      var checkedScrollArr = scrollObj[dire];
      return !checkedScrollArr.some(function (item) {
        return item === _this.disabledScroll;
      });
    },
    // 设置禁止滑动的方向
    setDisabledScrollDirection: function setDisabledScrollDirection() {
      this.touch.x < 0 && !this.isCanScroll('left') && (this.touch.x = 0);
      this.touch.x > 0 && !this.isCanScroll('right') && (this.touch.x = 0);
      this.touch.y < 0 && !this.isCanScroll('up') && (this.touch.y = 0);
      this.touch.y > 0 && !this.isCanScroll('down') && (this.touch.y = 0);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/components/ScrollContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ScrollContainervue_type_script_lang_js_ = (ScrollContainervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueVikingCalendar/components/ScrollContainer.vue?vue&type=style&index=0&id=153808b4&lang=stylus&scoped=true&
var ScrollContainervue_type_style_index_0_id_153808b4_lang_stylus_scoped_true_ = __webpack_require__("6bbe");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/components/ScrollContainer.vue






/* normalize component */

var ScrollContainer_component = normalizeComponent(
  components_ScrollContainervue_type_script_lang_js_,
  ScrollContainervue_type_template_id_153808b4_scoped_true_render,
  ScrollContainervue_type_template_id_153808b4_scoped_true_staticRenderFns,
  false,
  null,
  "153808b4",
  null
  
)

/* harmony default export */ var ScrollContainer = (ScrollContainer_component.exports);
// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/YearMonthPicker.vue?vue&type=script&lang=js&









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var YearMonthPickervue_type_script_lang_js_ = ({
  components: {
    ScrollContainer: ScrollContainer
  },
  name: 'YearMonthPicker',
  props: {
    // 最小可选日期
    minDate: {
      type: Date,
      default: null
    },
    // 最大可选日期
    maxDate: {
      type: Date,
      default: null
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    // 滑动的时候，是否触发改变日期
    scrollChangeDate: {
      type: Boolean,
      default: true
    },
    // 日期被选中时的 className
    checkedDayClassName: {
      type: String,
      default: ''
    },
    // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
    notCurrentMonthDayClassName: {
      type: String,
      default: ''
    },
    // 日期被禁用时的 className
    disabledClassName: {
      type: String,
      default: ''
    },
    type: String,
    // 操作栏高度
    calendarTitleHeight: {
      type: Number,
      default: 0
    },
    // 日历内容区域高度
    calendarContentHeight: {
      type: Number,
      default: 0
    },
    // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
    disabledScroll: {
      type: [Boolean, String],
      default: false
    },
    // 日历选中的日期 {year, month, day}
    calendarDate: {
      type: Object,
      default: function _default() {
        return {
          year: new Date().getFullYear,
          month: new Date().getMonth,
          day: new Date().getDate
        };
      }
    },
    // 使用的语言包
    lang: {
      type: String,
      default: 'CN'
    }
  },
  data: function data() {
    return {
      language: {},
      // 使用的语言包
      yearRange: 10,
      disabledScrollDirec: false,
      yearMonthShow: [],
      selectType: ['single', 'mutiple', 'range'],
      calendarType: ['week', 'date', 'month', 'year', 'yearRange', 'datetime']
    };
  },
  mounted: function mounted() {
    this.language = language["default"][this.lang.toUpperCase()];
  },
  watch: {
    type: function type(val) {
      this.disabledScrollDirec = this.disabledScroll;

      if (val === 'month') {
        this.disabledScrollDirec = true;
        this.yearMonthShow = [this.language.MONTH, this.language.MONTH, this.language.MONTH];
      } else if (val === 'year') {
        this.yearMonthShow = this.getThreeYearArr();
      } else if (val === 'yearRange') {
        this.yearMonthShow = this.getThreeYearRangeArr();
      }
    }
  },
  computed: {
    itemHeight: function itemHeight() {
      return (this.calendarContentHeight - this.calendarTitleHeight) / 4;
    }
  },
  methods: {
    initYear: function initYear(year) {
      var yearArr = [];
      var currYear = "".concat(year || this.calendarDate.year);
      var yearStart = parseInt(currYear.substring(0, 3) + '0');

      for (var i = 0; i <= this.yearRange; i++) {
        yearArr.push(yearStart + i);
      }

      yearArr.unshift(yearStart - 1);
      return yearArr;
    },
    initYearRange: function initYearRange(year) {
      var yearRangeArr = [];
      var currYear = "".concat(year || this.calendarDate.year);
      var yearStart = parseInt(currYear.substring(0, 2) + '00');

      for (var i = 0; i <= this.yearRange; i++) {
        yearRangeArr.push({
          s: yearStart + i * 10,
          e: yearStart + i * 10 + 9
        });
      }

      yearRangeArr.unshift({
        s: yearStart - 10,
        e: yearStart - 1
      });
      return yearRangeArr;
    },
    slideChange: function slideChange(direc) {
      if (direc === 'left') {
        this.getNextOpitonData();
      } else if (direc === 'right') {
        this.getLastOptionData();
      }

      this.$emit('slidechange', direc);
    },
    getNextOpitonData: function getNextOpitonData() {
      if (this.type === 'year') {
        var year = this.yearMonthShow[2][1];
        this.yearMonthShow = this.getThreeYearArr(year);
      } else if (this.type === 'yearRange') {
        var _year = this.yearMonthShow[2][1].s;
        this.yearMonthShow = this.getThreeYearRangeArr(_year);
      }
    },
    getLastOptionData: function getLastOptionData() {
      if (this.type === 'year') {
        var year = this.yearMonthShow[0][1];
        this.yearMonthShow = this.getThreeYearArr(year);
      } else if (this.type === 'yearRange') {
        var _year2 = this.yearMonthShow[0][1].s;
        this.yearMonthShow = this.getThreeYearRangeArr(_year2);
      }
    },
    getThreeYearArr: function getThreeYearArr() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.calendarDate.year;
      year = year + '';
      var yearStartLast = parseInt(parseInt(year.substring(0, 3)) - 1 + '0');
      var yearStartCurr = parseInt(year.substring(0, 3) + '0');
      var yearStartNext = parseInt(parseInt(year.substring(0, 3)) + 1 + '0');
      return [this.initYear(yearStartLast), this.initYear(yearStartCurr), this.initYear(yearStartNext)];
    },
    getThreeYearRangeArr: function getThreeYearRangeArr() {
      var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.calendarDate.year;
      year = year + '';
      var yearStartLast = parseInt(parseInt(year.substring(0, 2)) - 1 + '00');
      var yearStartCurr = parseInt(year.substring(0, 2) + '00');
      var yearStartNext = parseInt(parseInt(year.substring(0, 2)) + 1 + '00');
      return [this.initYearRange(yearStartLast), this.initYearRange(yearStartCurr), this.initYearRange(yearStartNext)];
    },
    dateClick: function dateClick(date, index) {
      if (!index || !date) return;
      if (this.isDisabled(date, index)) return;

      var checkedDate = _objectSpread(_objectSpread({}, this.calendarDate), {}, {
        type: this.type
      });

      if (this.type === 'month') {
        checkedDate = _objectSpread(_objectSpread({}, checkedDate), {}, {
          month: index
        });
      }

      if (this.type === 'year') {
        checkedDate = _objectSpread(_objectSpread({}, checkedDate), {}, {
          year: date
        });
      }

      if (this.type === 'yearRange') {
        var yearArr = this.getRangeYear(date);
        checkedDate = _objectSpread(_objectSpread({}, checkedDate), {}, {
          year: yearArr.includes(checkedDate.year) ? checkedDate.year : date.s
        });
      }

      this.$emit('click', checkedDate);
    },
    isChecked: function isChecked(date, index) {
      if (this.type === 'month') {
        return index === this.calendarDate.month;
      }

      if (this.type === 'year') {
        return date === this.calendarDate.year;
      }

      if (this.type === 'yearRange') {
        return date.s <= this.calendarDate.year && date.e >= this.calendarDate.year;
      }
    },
    isNotCurrent: function isNotCurrent(index) {
      return (index === 0 || index === 11) && (this.type === 'year' || this.type === 'yearRange');
    },
    isDisabled: function isDisabled(date, index) {
      var _this = this;

      var fDate = new Date();

      if (this.type === 'month') {
        fDate = new Date("".concat(this.calendarDate.year, "/").concat(parseInt(index) + 1, "/").concat(this.calendarDate.day));
      } else if (this.type === 'year') {
        fDate = new Date("".concat(date, "/").concat(parseInt(this.calendarDate.month) + 1, "/").concat(this.calendarDate.day));
      } else if (this.type === 'yearRange') {
        var yearArr = this.getRangeYear(date);
        return yearArr.every(function (year) {
          fDate = new Date("".concat(year, "/").concat(parseInt(_this.calendarDate.month) + 1, "/").concat(_this.calendarDate.day));
          return _this.disabledDate(fDate) || !isDateInRange(fDate, _this.minDate, _this.maxDate);
        });
      }

      return this.disabledDate(fDate) || !isDateInRange(fDate, this.minDate, this.maxDate);
    },
    getRangeYear: function getRangeYear(date) {
      var yearStart = date.s;
      var yearEnd = date.e;
      var yearArr = [];

      for (var i = yearStart; i <= yearEnd; i++) {
        yearArr.push(i);
      }

      return yearArr;
    },
    // 监听手指开始滑动事件
    touchStart: function touchStart(event) {
      this.$emit('touchstart', event);
    },
    // 监听手指开始滑动事件
    touchMove: function touchMove(event) {
      this.$emit('touchmove', event);
    },
    // 监听手指开始滑动事件
    touchEnd: function touchEnd(event) {
      this.$emit('touchend', event);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/YearMonthPicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_YearMonthPickervue_type_script_lang_js_ = (YearMonthPickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueVikingCalendar/src/YearMonthPicker.vue?vue&type=style&index=0&id=0a626a56&lang=stylus&scoped=true&
var YearMonthPickervue_type_style_index_0_id_0a626a56_lang_stylus_scoped_true_ = __webpack_require__("0f99");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/YearMonthPicker.vue






/* normalize component */

var YearMonthPicker_component = normalizeComponent(
  src_YearMonthPickervue_type_script_lang_js_,
  YearMonthPickervue_type_template_id_0a626a56_scoped_true_render,
  YearMonthPickervue_type_template_id_0a626a56_scoped_true_staticRenderFns,
  false,
  null,
  "0a626a56",
  null
  
)

/* harmony default export */ var YearMonthPicker = (YearMonthPicker_component.exports);
// CONCATENATED MODULE: ./packages/vueVikingCalendar/constant/img.js
/**
 * @Description:    图片dataURI
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */
var ARROW_DOWN_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAOB0lEQVR4Xu2de4xcdRXHz5nZbgaLrekK/UNBi6I2K87OvVdDfP5LIqgQUwIFbMD4IEoFpJQQeUMhkfIUNTyCDxAlis+k/qEJGjHRe2e73a7VtNpoUEFstYuw0+3sHPODWamw273zm3Mf8/t959/9nfP7nc+5n/z2zn0MEz4gAAKLEmCwAQEQWJwABMHRAQJHIABBcHiAAATBMQACdgSwg9hxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ5QnBCCIJ41GmXYEIIgdN0R5QgCCeNJolGlHAILYcUOUJwQgiCeNRpl2BCCIHTdEeUIAgnjSaJRpRwCC2HFDlCcEIIgnjUaZdgQgiB03RHlCAIJ40miUaUcAgthxQ1ROBMbHx99DRMuY+fl2u/1UFEV/yWnqF6YpjSBxHL+KmdeJSIOZVxPRMURUJaInmfmxarW6rV6vP5cnHMxVDIEkSc4QkY8y84eIaPkCq9jGzPcFQfDdrFdYuCBTU1OrWq3WzUR09iIwDmfwSLVavWFsbGwqazDInz+B8fHxN3Y6na8T0fvSzC4iO5n59DAM96QZbzOmUEGSJDlZRB5l5tf3sngR2ToyMnLlmjVrWr3EYWx5CTSbzQs6nc5tzPzqXlYpIs9Wq9VzG43GD3qJSzu2MEGSJDmTiB5Ju9AFxu2pVCobGo3Gr/rIgdCCCUxMTBzbbrfvI6LT+lmKiKyLoujRfnIsFFuIIHEcf5CZf6xRDHYTDYrF5EiS5FQieqB7vtn3IkTk1CiKftJ3osMS5C6I+T9zbm5uFzPXFAvBbqIIM+tUU1NTR7darTuI6HzNuUTk7yMjIydo/uuduyBJknyTiNZrgpnPhd0kC6q6OZMkMSfg3yCiN+hmfjEbM28OguAWrdy5CjI5OXnc7Oxs1t9jYzfROjqU88RxfCszX6Kc9uXpdoRhWNeaI1dBkiT5JBF9RWvxR8jTIaI7V61adYXmdpvDup2cYmJi4u3tdvs7RLQ2jwKZ+dggCJ7RmCtvQcy3Vubbq1w+IvLHarX6MXzTlQvuBSeJ43gzM2/JeQWnhGH4U4058xbk10R0ssbCe8iB3aQHWFpD4zg+npm/RUTv1srZQ55zwzA057p9f3IVJI7jPcz8pr5XbZfAzH1eEARGUnwyJGAu+onI7UR0dIbTLJqamS8IgsB8fdz3J29Bmszc6HvV9gmwm9izWzKy2WweIyLmVpFTlhyc7YDB/BcrjuPvM/OHs2WTKjt2k1SY0g+K4/gjRHQvM782fVQ2I4eGho6r1+tPamTPdQdJkmQTEal9R90nAOwmfQI04d2LfncR0QaFdBopfheG4ahGIpMjb0HeQUQTWovXyINvuuwpNpvND5i7b5n5ePssupEicn0URVdpZc1VELPoJEkeJ6L3axWglAe7SQ8gp6amhmdmZm5i5ouJqNJDaKZDReSfRx111JrR0dH/aE2UuyDNZrMuItu1ClDOg3OTJYCa/nU6nYeYWe3fGK0emvPbIAh+qJUv93+x5hfebDY/KyJ3ahaimAu7yQIwRaSSJMnlzHwNEQ0r8tZKdW0YhmZtqp/cd5D51cdxfA8zf1q1GsVkODd5CeaOHTtOOHTokLnBsIiLfkt2VUTuj6Lo40sOtBhQmCBmrXEcX8jMX7JYd24hvt8hXPRFvxSNvjcMw0+kGGc1pFBBupIERPQwM7/VqoJ8gvZUq9X1Y2Njv8lnuuJnKdFFvwVhiMgBZv6M1i0lixEvXBCzMPOtSKvVulpEzP+45k0mZfx4c25invQTkQeZeaSMjSCiXzDzWUEQ/C3r9ZVCkMPOS7CbZN3xI+TfvXv3igMHDtxl7lkrcBmLTi0iM0S0OQxDs0bJY42lEmR+Nzl48OA1nU5nE3aTPA6BF+foPuln7r59XX6zpp9JRMbNe9OyfMXPQqspnSDYTdIfNBojuxf9tnQv+pXueBCRNjPfGATBDczc1qi5lxylA3L44k3zsJv00s7exub9pF9vq3th9O5KpbKu0WgUdmG51IJgN7E4pFKEiEi12WxeLiLXMPOyFCF5DxERuXtkZGRT0Y9MD4Qg8+cmMzMz1xLRZTg3sT9eJyYm1rTb7W8T0Tvts2Qa+VciOi8Mw59nOkvK5AMjCHaTlB09wrAkScwFta0p3oHc/2R2GR5asWLFhSeeeOK0Xbh+1MAJgt2k94Og7Bf9iOjf5iVyYRg+1nt12UYMpCDYTdIfFEmSnC4i5km/sl702zY8PLzhpJNOejp9VfmNHGhBDttNriOiz+Pc5KUDx1z0m56evpuIzs3vcOppJvNbL5eGYfjVnqJyHjzwgmA3eeURU/aLfkT0xNDQ0Dn1en1vzsd7z9M5Iwh2k//d02ae+d+Y9+PUKY+8WfPVchiGtzCzubet9B+nBPF5NxkfHx/rdDoP5/V6T4sje9fQ0NC6er2+0yK2sBAnBZnfTVqt1vUicqnL5ybdi36bReTqkl70MzvF1lqtduXo6OhsYUe65cTOCuLDbjIAF/3+3L0tfWDfZum8IK7uJs1m81Mi8sUSX/R7oFarbdR8w4jlJtBXmBeCuLSbTE5Orp6dnX2wBK/3XOzA+wcRXRCGocpP7PV1dCsEeyXIYbvJDSJyyaCdm5iLft3f9HuNQu+zSPGjWq22YXR0dH8WyYvI6Z0g85CTJAlFxLzfqdTPwovIOStXrtw1PT1tXm5xThEHyVJzisg0M28Mw9DsbE59vBVkvovNZvMmEbmizF0VkaeZeXVJ1/i4iJwXRVHWP61XSPneC2Kob9++/V1zc3MPEdGbC+nCAE4qIq1KpXJlo9G4La/nw4vABEG61Pfu3Vvbv3//9URkfmSyNO+bLeKgWGpO83w4EZ0dRdHvlxo76H+HIC/rIHaTxQ9pEZlj5puDIDBPIub+fHgRskGQBahjN3klFBH5U6VSOTMIgriIA7WoOSHIEchjN3kRjoh82TxOEEXR80UdqEXNC0GWIG92k3379plXzpTqtzDyOGBE5ClmXl+W58PzqPnlc0CQlNQ93E2+JyLnR1F0ICUiJ4dBkB7a6slu8i9mvjAIgkd6QOPsUAhi0VqHd5OfDQ8Pry/r8+EWreo7BIJYInRpNxERc/J9WRRF91jicDYMgvTZWgd2k98ODQ2dOQjPh/fZKqtwCGKF7f+DurvJjcz8uUG5Ci8ihyqVynWNRsO8uHpOAYOTKSCIYlsHaDfZValUzi7ypdCK2DNNBUGU8ZZ8NzE/OnN7rVbbPIjPhyu3KlU6CJIKU++DSribmJdCnxWG4S97r8bfCAiSYe+793Td1H1PVWF3CIvI11auXHlRmV4KnSF21dQQRBXnwsmK2k1EZB8zb3Dl+fAcWvWKKSBITtQL2E22mR/jDILgmZxKdHIaCJJzW7PeTUTk2UqlcnEQBPfnXJqT00GQAtra3U22ENFFytdNnhCRs1x9PryAVhEEKYJ6d07F3eQgEX0hCIJbB+Wl0AVi72lqCNITLv3B/e4mIjJJROt8eD5cn/7SGSHI0oxyGRHH8XuJ6C5mHks54XMisjWKoqtSjscwCwIQxAJaliFJkpxGRFcTUbjQPOYlbUR0x/Lly+9Yu3btvizXgtyEc5CyHgTdd/C+hYjexsyrOp3OzmXLlu2p1+t/KOuaXVwXdhAXu4qa1AhAEDWUSOQiAQjiYldRkxoBCKKGEolcJABBXOwqalIjAEHUUCKRiwQgiItdRU1qBCCIGkokcpEABHGxq6hJjQAEUUOJRC4SgCAudhU1qRGAIGookchFAhDExa6iJjUCEEQNJRK5SACCuNhV1KRGAIKooUQiFwlAEBe7iprUCEAQNZRI5CIBCOJiV1GTGgEIooYSiVwkAEFc7CpqUiMAQdRQIpGLBCCIi11FTWoEIIgaSiRykQAEcbGrqEmNAARRQ4lELhKAIC52FTWpEYAgaiiRyEUCEMTFrqImNQIQRA0lErlIAIK42FXUpEYAgqihRCIXCUAQF7uKmtQIQBA1lEjkIgEI4mJXUZMaAQiihhKJXCQAQVzsKmpSIwBB1FAikYsEIIiLXUVNagQgiBpKJHKRAARxsauoSY0ABFFDiUQuEoAgLnYVNakRgCBqKJHIRQIQxMWuoiY1AhBEDSUSuUgAgrjYVdSkRgCCqKFEIhcJQBAXu4qa1AhAEDWUSOQiAQjiYldRkxoBCKKGEolcJABBXOwqalIjAEHUUCKRiwT+CzbFHAVhdf5fAAAAAElFTkSuQmCC';
var ARROW_UP_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAANp0lEQVR4Xu2dbYwdZRXHz7m7l94LSsluKr6kwRqINQtsd2Y0kagxEqsfNFFJipSKTTUajRWKEcSWlhIltFhE40uCWAotGDDRDxg1kcQPSk3MzNysa1HTagMYI5WtvNTQ7C5zzFOngLAv954789y59/zna+c8z5zfmV/PnX3uM5cJBwiAwIIEGGxAAAQWJgBBcHeAwCIEIAhuDxCAILgHQEBHAB1Exw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAEI+FfuKJJ5pPPfXU2izLJk5PKyLP1Wq1XwRB8KjHS8FUbRKAIG2C6ua0NE3fmWXZ9US0lpmbC4x1hIgOjIyM7Fq1atXJbuZDbHEEIEhxLOcdKUmS3UT05XanEZG/Dg0NXTUxMXGw3RicVx4BCFIS28nJyQvn5uYeJKK3KabIROSO0dHRregmCnoFhkCQAmG6oUSkliTJdcy8k4jO6HL4I0NDQ1euWbPm912Og3AlAQiiBDdf2OTk5Kq5ubkDRHRJgcOimxQIs9OhIEinxBY4P0mSzxDRHiJ6TUFDvnIYdJOSwC42LATpEnqapitE5F4i+mCXQ7UT7rrJN0dHR7fh2aQdXN2fA0G6YJgkyUdF5AfMPNrFMJpQdBMNNUUMBFFAO3z48NnPPvvsd4logyK8qBB0k6JILjIOBOkQcpIk7yMi95HqTR2GlnU6uklZZIkIgrQJ9+jRo43p6eldzLy5gtwyIrp9ZGTkRjybtFnQNk+DIG2AarVaa7Isc4t+F7Rxei9PQTcpmD4EWQSoiAynabpVRLYx83DB7MsaDt2kQLIQZAGYSZKcLyIPMvOL37wtkLuPodBNCqAMQeaBmKbp5izL3PPGQt+8LQC9lyFcN9kzMjKyHc8mOt4Q5GXc0jR9Y77od6kOZ2WjjojI5VEUpZW9wopeGATJC5MkyZVE9B0iOqeiterqskTkBWa+vdFobBsbG5vpajBDweYFieN4OTPvJaKPWai7iPyFiNajm7RXbdOCJEnyARHZx8yvbw/XYJyVd5M9jUbjRnSTxWtqUpA4js90HzeI6LODccvrskA3WZqbOUHy/eEHmPktS+MZ/DPQTdBBThGI47heq9V2ZlnmdvsNDf6t31mG6Cbz8zLRQeI4Xk1EbtHvos5uG1tnu25CRN9oNpvb8Wzyv9oPtCD5/vBrmflrRLTM1u2uzxbd5CV2AytImqbnich+Inq3/lYpNfIYEb2u1Bm6HFxEdkVR9JUuh+nr8IEUJE3TTVmW3cHMr61iddxq/fLlyzefOHHiwizL7iOiN1fxOt01We8mAyVIvj/8h0T04SrecCIyzcwbwzD82enrc68jffLJJ2+t6D6TU5eZP5vc1mw2d1h7NhkYQZIk+VC+6Od7f3i7Lv6Sma8KguBf8wW0Wq1L0E3aRenvvL4XxO0Pf+aZZ77NzJ/0h62jmU4Q0ZfCMLxzqSh0k6UI+f/3vhYkSRL3AP6jCu0Pf2UFDw4PD28YHx8/2klp0U06oVXuuX0pyKFDh844efLkrUR0TRX/VC0is0S0IwxDt6fE7cno+OiXblKr1XYvW7bspkF9Nuk7QfL94fcrXwrd8Y2qCPjT8PDwuvHx8T8qYl8Vgm5SBEX9GH0jiIgMtVqtG7Is287MdX3KpUWKiNzebDa/WvT/pugmpdVsyYH7QpD8pdAPENHbl8yoNyc8RkSfCMPwN2VOj25SJt35x668IHEcf56IbmPmM/3jWXpGEbmn2Wx+YWxszP21qvQD3aR0xP83QWUFmZqaOndmZsatMldyf/h8i34+S4du4od2JQVxL4UmIrcNtqr7wxdd9PNTOqI+6SZzzLy70WjsLPrZzAfnSgnSarXOybLs+0T0cR/JK+Y4ISJboii6SxFbWki/dBNmXheG4R9KA1HCwJURxL0UWkTuq/D+8IMickUURY+XUIeuh+ynbiIiN0VR5NaKKn/0XJB8f/htROQexqt4zIiIW/TbrV3085lUn3STQ8y8vh+6SU8FSdM0yrLsgQrvDy900c+XKH3UTXaJyM4qd5OeCOJeCp0kyQ4iuqGi+8NPvQC60Whs7ccHy9Miopt0/1+Sd0Hy/eH3V/il0I8x8xVBEPyue7y9HwHdpLsaeBNERDhN02tE5BZmbnR32aVF72s0Gpt9LfqVlsU8A6Ob6Gh7ESR/KbT7Wvp7dJdZblSvF/3Kze6l0fulmxCR+6b2zVV4NildkDiO3UYmt6HpbF83QofzVGLRr8Nr7up0dJP28ZUmiPtNv+PHj+8josvbvxyvZ/6Hma8OgsDtYTd3uG5y7NixW/I9NZXNn5k/3csalSJI/vKEnxNRVEXyIvLbWq22IQgC9y1c04fblZnv5a/sq1jdOlQURTf3olCFC5L/CfcRZn5HLxJaYs4ZZt4+MTHhvh2s2ulXwZy6vqR+eDZxC4tBELjnWK9H4YLEcfwtZv6i1yzamExE/kxE66IommrjdJOnxHH8LmY+QETnVQ2AiJys1+sXjI+P/93ntRUqiNvYNDs7e7hii3+nfqcPv6zU3m1V8W5yZxiGXn+yolBB4ji+i5k/1V4pyj9LRB4fGhpaPzEx8Uj5sw3WDFXtJvV6feTiiy/+ty/ahQmSvyj66Qq97nNvo9G4ehAX/XzdHFXsJu79Z0EQ3OuLQWGCtFqt92ZZ9mtfF77QPCJyPH+950O9vpZBmb9i3eTuMAw3+WJbmCDuhdEi0us1hYfcR7yFXu/pC+ogzlOVbiIiv4qiaK0vxoUJkiTJViJyv8Ph/RCR52q12pZeLih5T7pHE1Zg3SQJw9Db+lqRgmxxXxHvQd0qvdOvBzxKn7LH3eThMAzfX3qS+QRFCrKOiNy7q3we14Vh6HYj4ugBAfdsQkT3eN7wtj8Mw6t8pVuYIFNTUytnZma87NcWkal6vb6+qNd7+oI9iPP0oJtsCsPwbl8sCxPEXXCSJI96eGfu7jAMr/cFCPO0R8BXN+nbdRCHMU3Ta0VkT3tIOz5roHb6dZx9HwR46Cb9vZLuvuI+PT39N2Z+Q8H13HvWWWdds3r16ucKHhfDlUCgjG4iIs/XarXzgyD4RwmXvOCQhX7EcrPEcfwRZv5pQUm4nytznzlf/E2/gsbFMCUTKGG/yWVhGP6k5Mt+1fCFC5I/i7g3ltzUZTIPNRqNjWNjY8e7HAfhPSRQ0O7FbWEYfr0XaZQiSN5JvsfMn1MkZXqnn4JX5UPyZxP3a1ubO7zYp4noWp9/tXrl9ZUmSP7Qfmn+9ZO29he4nxKo1Wo7sNOvw9uoT06P4/giZnafLi5b4pLdO5D35/fCvL8K7CvlUgU5nUSSJBuIaOMCP2VwREQertfruzv9sUtfkDBPsQQmJyffOjs7u5GZ1xBRk4heICInwj+ZOV2xYsWPV65c+Xyxs+pG8yLIyy8tTdPzarXauVmWnQiCwK2b4ACByhLwLkhlSeDCQGAeAhAEtwUILEIAguD2AAEIgnsABHQE0EF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhAAEMVJopKkjAEF03BBlhMB/AVyuZwXGIJM/AAAAAElFTkSuQmCC';
var ARROW_BACK_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAmFJREFUWEftmVFv0lAUx//nFgOxNQxNWEwXY2aij3wKIgPZm3wP9+jDTGS0gJ+ABHh10XeSfRQfYGJYfFITMswI7b3msjV0yEDbEu6i96VJQ3t++Z9z/uf2QgDQ6509I8YtIfhzAejy3qYWASMidiI4e727a36ibnfwFJrbEVw8YYxxAGxTcFdxOeecEaMuXC1PvX7/A3fFS0O/6zy4n4ppmrZRPtd18e37D+d89DPGNPpIvdP+OYj0HfMh7sRiG4Xzgk8cB4Ozr4AQI+qe9gUR4fGjHcirCksIgc9fBpBXCciJiBQFFLdCQeVT/G8Bcs6nzRam4eabJBIF5UvlCgPmOcjaACVcp9NBJpOBaZqXNhHAuiIF9CvXbrdxePgGhUIejUYjsKVGCihrjjGGZrOFarUKXTdQPipjv/hiswr6lWu1WrBtG7p+D7WajVwuBw88iIyRKLhIOdu2kM/vQQ78MJuOUIDzylUqFnRdR7VaQ6Gwh8lkciPcn9pPKMCZcs0pVCqVgmVVkM1mA9fcfBkEBvRsQzZEvf4OiUQcBwevUCqVMBwOp81y05LPxhMJbCWTK8syEOAMrolarQ7DMKapTKfTGI/HV9NjcWyZWsdxkExu4fj4PeLx+FLISAG3t9O4uJCADNc9+XKyeNNl7YAykNIp9tRQukk8Fb20SYNWzmZ+V3I24pQwav+WyK+kcqNumZLlo7fYLxYDG3cgm1lmwJ6SSm63/ClXcsO6qCZXzrIVP4g0xfOxlP1oCqua//m1KhgF6K0D/H949Ldpv5Zi5Q8wlT8CVv4QXdaHyn9D/AK1tfIF6zIgHQAAAABJRU5ErkJggg==';
var DOWN_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAACslJREFUeF7tnMmyHEcVhk/GfQHWsIIVgZc8RmWFtDLzjJnnecaSJ9nybMujPNuy5Z1UWRHa8ALsIVgRXvAGbCUl0Y66hGju0H1OdvepPp/W9Wed/P76Km9dhZSEPxCAwLEEEmwgAIHjCSAITwcETiCAIDweEEAQngEI6Ahwgui4kQpCAEGCFM02dQQQRMeNVBACCBKkaLapI4AgOm6kghBAkCBFs00dAQTRcSMVhACCBCmabeoIIIiOG6kgBBAkSNFsU0cAQXTcSAUhgCBBimabOgIIouNGKggBBAlSNNvUEUAQHTdSQQggSJCi2aaOAILouJEKQgBBghTNNnUEEETHjVQQAggSpGi2qSOAIDpupIIQQJAgRbNNHQEE0XEjFYQAggQpmm3qCCCIjhupIAQQJEjRbFNHAEF03EgFIYAgQYpmmzoCCKLjRioIAQQJUjTb1BFAEB03UkEIIEiQotmmjgCC6LiRCkIAQYIUzTZ1BBBEx41UEAIIEqRotqkjgCA6bqSCEECQIEWzTR0BBNFxIxWEAIIEKZpt6gggiI4bqSAEECRI0WxTRwBBdNxIBSGAIEGKZps6Agii40YqCAEECVI029QRQBAdN1JBCCBIkKLZpo4Agui4kQpCAEGCFM02dQQQRMeNVBACCBKkaLapI4AgOm6kghBAkCBFs00dAQTRcSMVhACCBCmabeoIIIiOG6kgBBAkSNFsU0cAQXTcSAUhgCBBimabOgIIouNGKggBBAlSNNvUEUAQHTdSQQggSJCi2aaOAILouJEKQgBBghTNNnUEEETHjVQQAggSpGi2qSOAIDpupIIQQJAgRbNNHYG9EaTruk+M4/hPHQZSLQn0ff/JYRj+0XLNXa01e0FyzveKyD0i8lERuXpwcHD+2rVrf98V0Mj3PXPmzKdu3bp1QUT6WusHKaU3SimLfmb7Z9aCTHL8eYn+3w4ODu5Gku0+k5Mc74vIXUt3PjdnSWYryDFyHHaDJFv04wQ5DqeYrSSzFOQUOZDElxyH09xbSjm3xdGa3Gp2gqwoB5I0eTxOXmSFk2N5gdmdJLMSZE05kGSDkijkmOWPW7MRJOf8MRH5l7JzvkmU4I6KGeT4cLmbN29+/MaNGx80HGljS81JkMWvC5d/Y7UOGCRZh9Yx11rlmJadzY9acxLEcoLw45YfOThBGnRx5BLKb5DltThJFAU1OjkWd57N6bEYdjYnyGGnSKJ4uo2RqHLMUpDF0H3fn6u1/snYOyfJCgBbyZFSOj8Mg+UbcoVp218yuxPkEEHf9+drrX80IkGSEwA2lOO+YRisLzRj1br4bAVZbDfnfJ+I/EG39f+mkOQIgK3kEJH7SynWF5mxYn181oIstt113f0ppd/rEXyYRJI7ALaSo9b6wDiO1heYsVpbfPaCIIntAVhOI8f/EtkLQaYP9wdqrb8zPi6hT5JWcqSUHhyGwXqqG6tsE98bQaZvkgdF5LdGNCElaSWHiDxUSrG+qIwVtovvlSCTJA+JyG+MiEJJ0lCOC6UU6wvKWF3b+N4JgiTrPSDIcTKvvRRk+ia5UGv99XqPy/9dvdcnSSs5UkoPD8NgPbWNVW0mvreCTCfJwyLyKyO6vZSklRwi8kgpxfoiMla0ufheCzJJ8oiI/NKIcK8kaSjHxVKK9QVkrGaz8b0XZPp7kosppV8YUe6FJMix3lMQQpDpm+RirTW0JK3kqLU+Oo6j9VRe70nd0dVhBJl+3HpURH5uZD3Lk6SVHCLyWCnF+qIxVrC9eChBJkkeE5GfGRHPSpKGcjxeSrG+YIzotxsPJ8j0TfJ4SumnRtSzkAQ5bC2HFCSKJK3kqLU+MY6j9dS1Pak7SocVZPpwf6LW+hMje5cnSSs5UkpPDsNgPW2NiHcXDy3I9E3ypIj82FiBK0laySEiT5VSrC8QI9rdxsMLMknylIj8yFiFC0kayvF0KcX64jAi3X0cQaYOcs6zlwQ52guFIHcw7fv+6VrrD42Yd3KStJIjpfTMMAzW09SI0E8cQZa6yDk/IyI/MFa0VUlaySEiz5ZSrC8IIzpfcQQ5oo+c87Mi8n1jVVuRpKEcl0op1heDEZm/OIIc00nXdZdSSt8zVrZRSZDD2M4KcQQ5AVLf95dqrS4laSVHrfW5cRytp+UKj9o8L0GQU3rr+/65Wut3jfU2PUlayZFSen4YBusLwIjGdxxBVugn5/y8iHxnhUtPuqSJJK3kEJEXSilW8Y1I/McRZMWOuq57IaX07RUvP+4ykySt5Ki1vjiOo1V4I4p5xBFkjZ52KQlyrFFUw0sRZE2Yfd+/WGv91pqx5cvXOklayZFSemkYBuspaNz6vOIIougr5/ySiNyjiN4ZWUmSVnKIyMulFKvYxi3PL44gys5yzi+LyDeV8cPYiZI0lONyKcUqtHGr84wjiKG3rusup5S+YVhiET1SEuQwUm0URxAjyL7vL9dazZKIyNdLKX9djNN13adTSm+IyF2W8VJKrwzDYD3lLCPMPosgDSrMOb+yeMAbLPUXEfm3iJxtsNarpRSruA3GmPcSCNKov5zzqyLytUbLWZd5rZTSQljrHLPPI0jDCruuey2l9NWGS2qWQg4NtWMyCNIQ5vT9sDNJaq2vj+Po5RRrTHY3yyHIBrj3ff96rfUrG1j62CUXH/XDMOz69NrmlrdyLwTZEOac8+K3UF/e0PLLy75ZStmqkFva185vgyAbrCDn/KaIfGmDt1gs/VYpZVsibngr/pZHkA13smFJkGPD/SHIhgEvlu/7/q1a6xdb3iql9PYwDJs+nVqOPMu1EGRLteWc3xaRLzS63TullKbCNZpr75ZBkC1WmnN+R0Q+b7zllVJKK9GMo+x/HEG23HHXdVdSSp9T3hY5lOC0MQTRkjPk+r6/UmtdS5KU0rvDMFhPH8PUMaMIsqPec87vishnV7z9e6WUtYRacV0uO4UAguzwEck5vycinzllhKullFVF2uFu9vPWCLLjXruuu5pSuvuoMWqt74/jeJpAO97Bft8eQRz0e5QkyOGgGBFBEB89LP4y8c7/LYX/SNpJLwjipIjFGGfPnv3I7du3b12/fn3xrwr544AAgjgogRH8EkAQv90wmQMCCOKgBEbwSwBB/HbDZA4IIIiDEhjBLwEE8dsNkzkggCAOSmAEvwQQxG83TOaAAII4KIER/BJAEL/dMJkDAgjioARG8EsAQfx2w2QOCCCIgxIYwS8BBPHbDZM5IIAgDkpgBL8EEMRvN0zmgACCOCiBEfwSQBC/3TCZAwII4qAERvBLAEH8dsNkDgggiIMSGMEvAQTx2w2TOSCAIA5KYAS/BBDEbzdM5oAAgjgogRH8EkAQv90wmQMCCOKgBEbwSwBB/HbDZA4IIIiDEhjBLwEE8dsNkzkggCAOSmAEvwQQxG83TOaAAII4KIER/BJAEL/dMJkDAgjioARG8EsAQfx2w2QOCCCIgxIYwS8BBPHbDZM5IIAgDkpgBL8EEMRvN0zmgACCOCiBEfwSQBC/3TCZAwII4qAERvBLAEH8dsNkDgggiIMSGMEvAQTx2w2TOSCAIA5KYAS/BBDEbzdM5oAAgjgogRH8EkAQv90wmQMCCOKgBEbwSwBB/HbDZA4IIIiDEhjBLwEE8dsNkzkggCAOSmAEvwQQxG83TOaAAII4KIER/BJAEL/dMJkDAv8Bjd9Q9pEUs6EAAAAASUVORK5CYII=';
// CONCATENATED MODULE: ./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@2.0.1@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.8@vue-loader/lib??vue-loader-options!./packages/vueVikingCalendar/src/DatetimePicker.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var defaultDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
};
/* harmony default export */ var DatetimePickervue_type_script_lang_js_ = ({
  props: {
    // 是否支持点击日期区域快速切换年份
    changeYearFast: {
      type: Boolean,
      default: false
    },
    // 是否显示 周月视图切换指示箭头，model 等于 inline 时生效
    isShowArrow: {
      type: Boolean,
      default: false
    },
    // 是否展示周视图
    isShowWeekView: {
      type: Boolean,
      default: false
    },
    // 是否显示日历组件
    visible: {
      type: Boolean,
      default: false
    },
    // 是否显示日历组件操作栏
    isShowAction: {
      type: Boolean,
      default: true
    },
    pickerType: {
      // 选择器类型 datetime：日期+时间   date：日期   time：时间
      type: String,
      default: 'datetime'
    },
    showTodayButton: {
      // 是否显示返回今日按钮
      type: Boolean,
      default: true
    },
    defaultDatetime: {
      // 默认时间
      type: Date,
      default: function _default() {
        return new Date();
      }
    },
    format: null,
    // 确认选择之后，返回的日期格式
    model: {
      type: String,
      default: 'inline'
    },
    // 日期下面的标记
    markDate: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    customFunction: {
      type: Function,
      default: function _default() {
        return false;
      }
    },
    // 使用的语言包
    lang: {
      type: String,
      default: 'CN'
    }
  },
  components: {
    YearMonthPicker: YearMonthPicker,
    TimePicker: TimePicker,
    Calendar: Calendar
  },
  name: 'vueVikingCalendar',
  data: function data() {
    return {
      arrowDownImg: ARROW_DOWN_IMG,
      arrowUpImg: ARROW_UP_IMG,
      arrowBackImg: ARROW_BACK_IMG,
      titleDownImg: DOWN_IMG,
      language: {},
      // 使用的语言包
      checkedDate: defaultDate,
      // 被选中的日期
      isShowWeek: false,
      isShowCalendar: false,
      // 是否显示日历选择控件
      calendarBodyHeight: 0,
      // 日历内容的高度
      calendarTitleHeight: 0,
      // 日历组件标题高度
      firstTimes: true,
      // 第一次触发
      currDateTime: new Date(),
      // 当前日期
      yearMonthType: 'date' // 年月选择面板默认展示类型

    };
  },
  mounted: function mounted() {
    if (this.model === 'inline') {
      this.isShowDatetimePicker = true;
    }

    this.language = language["default"][this.lang.toUpperCase()];
  },
  watch: {
    defaultDatetime: {
      handler: function handler(val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultDate must be date type!');
        }

        this.currDateTime = val;
      },
      immediate: true
    },
    pickerType: {
      handler: function handler(val) {
        if (val === 'time') {
          this.showTime();
        }
      },
      immediate: true
    },
    isShowAction: function isShowAction(flag) {
      var _this = this;

      if (!flag) {
        this.calendarTitleHeight = 0;
      } else {
        setTimeout(function () {
          _this.calendarTitleHeight = _this.$refs.calendarTitle ? _this.$refs.calendarTitle.offsetHeight : 0;
        });
      }
    },
    checkedDate: {
      handler: function handler() {
        var date = new Date("".concat(this.checkedDate.year, "/").concat(this.checkedDate.month + 1, "/").concat(this.checkedDate.day, " ").concat(this.checkedDate.hours, ":").concat(this.checkedDate.minutes));

        if (this.format) {
          date = util_formatDate(date, this.format, this.lang);
        }

        this.$emit('change', date);
      },
      deep: true
    },
    visible: {
      handler: function handler(val) {
        var _this2 = this;

        this.isShowCalendar = val;
        setTimeout(function () {
          _this2.calendarTitleHeight = _this2.$refs.calendarTitle ? _this2.$refs.calendarTitle.offsetHeight : 0;
        });
      },
      immediate: true
    },
    isShowWeekView: {
      handler: function handler(val) {
        this.isShowWeek = val;
      },
      immediate: true
    }
  },
  computed: {
    isShowArrowImg: function isShowArrowImg() {
      return this.isShowArrow && this.model === 'inline';
    },
    // 是否显示周视图 (为兼容旧版本，舍弃这种方式)
    // isShowWeek: {
    //   get() {
    //     return this.isShowWeekView
    //   },
    //   set(val) {
    //     this.$emit('update:isShowWeekView', val)
    //   }
    // },
    // 是否显示日期控件
    isShowDatetimePicker: {
      get: function get() {
        return this.visible;
      },
      set: function set(val) {
        this.$emit('update:visible', val);
      }
    },
    // 日历组件的高度
    calendarContentHeight: function calendarContentHeight() {
      return this.calendarBodyHeight + this.calendarTitleHeight;
    }
  },
  methods: {
    // 判断是否有插槽
    hasSlot: function hasSlot(slotName) {
      return !!this.$scopedSlots[slotName];
    },
    // 周视图开关
    toggleWeek: function toggleWeek() {
      this.isShowWeek = !this.isShowWeek;
      if (this.isShowWeek) this.slideChange('up');else this.slideChange('down');
    },
    today: function today() {
      if (this.disabledDate(new Date())) return;
      this.$refs.calendar.today();
    },
    dateChange: function dateChange(date) {
      date.hours = this.checkedDate.hours;
      date.minutes = this.checkedDate.minutes;
      this.checkedDate = date;
    },
    dateClick: function dateClick(date) {
      date.hours = this.checkedDate.hours;
      date.minutes = this.checkedDate.minutes;
      this.checkedDate = date;
      var fDate = new Date("".concat(this.checkedDate.year, "/").concat(this.checkedDate.month + 1, "/").concat(this.checkedDate.day, " ").concat(this.checkedDate.hours, ":").concat(this.checkedDate.minutes));

      if (this.format) {
        fDate = util_formatDate(fDate, this.format, this.lang);
      } // 控制点击之后进入下一选择面板


      if (date.type) {
        switch (date.type) {
          case 'yearRange':
            this.yearMonthType = 'year';
            break;

          case 'year':
            this.yearMonthType = 'month';
            break;

          case 'month':
            this.currDateTime = new Date(fDate);
            this.yearMonthType = 'date';
            break;
        }

        this.$emit('calendarTypeChange', this.yearMonthType);
      }

      this.$emit('click', fDate);
    },
    timeChange: function timeChange(date) {
      date.year = this.checkedDate.year;
      date.month = this.checkedDate.month;
      date.day = this.checkedDate.day;
      this.checkedDate = date;
    },
    // 确认选择时间
    confirm: function confirm() {
      var date = new Date("".concat(this.checkedDate.year, "/").concat(this.checkedDate.month + 1, "/").concat(this.checkedDate.day, " ").concat(this.checkedDate.hours, ":").concat(this.checkedDate.minutes));

      if (this.format) {
        date = util_formatDate(date, this.format, this.lang);
      }

      this.$emit('confirm', date);

      if (this.model === 'dialog') {
        this.close();
      }
    },
    show: function show() {
      this.isShowDatetimePicker = true;
    },
    close: function close() {
      this.isShowDatetimePicker = false;
    },
    // 小于10，在前面补0
    fillNumber: function fillNumber(val) {
      return val > 9 ? val : '0' + val;
    },
    formatDate: function formatDate(time, format) {
      return util_formatDate(time, format, this.lang);
    },
    // 显示日历控件
    showCalendar: function showCalendar() {
      if (this.isShowCalendar) {
        this.showYearMonthPicker();
      }

      this.isShowCalendar = true;
    },
    // 显示时间选择控件
    showTime: function showTime() {
      this.isShowCalendar = false; // 重置年月选择面板

      this.yearMonthType = 'date';
    },
    // 显示年月选择面板
    showYearMonthPicker: function showYearMonthPicker() {
      if (!this.changeYearFast) return;

      if (this.yearMonthType === 'date') {
        this.yearMonthType = 'month';
      } else if (this.yearMonthType === 'month') {
        this.yearMonthType = 'year';
      } else if (this.yearMonthType === 'year') {
        this.yearMonthType = 'yearRange';
      } else {
        this.yearMonthType = 'date';
      }

      this.$emit('calendarTypeChange', this.yearMonthType);
    },
    // 高度变化
    heightChange: function heightChange(height) {
      if (!this.firstTimes && this.model === 'dialog') return;
      this.calendarBodyHeight = height;
      this.firstTimes = false;
    },
    // 监听手指开始滑动事件
    touchStart: function touchStart(event) {
      this.$emit('touchstart', event);
    },
    // 监听手指开始滑动事件
    touchMove: function touchMove(event) {
      this.$emit('touchmove', event);
    },
    // 监听手指开始滑动事件
    touchEnd: function touchEnd(event) {
      this.$emit('touchend', event);
    },
    // 滑动方向改变
    slideChange: function slideChange(direction) {
      this.$emit('slidechange', direction);
    }
  }
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/DatetimePicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_DatetimePickervue_type_script_lang_js_ = (DatetimePickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./packages/vueVikingCalendar/src/DatetimePicker.vue?vue&type=style&index=0&id=6e0545b5&lang=stylus&scoped=true&
var DatetimePickervue_type_style_index_0_id_6e0545b5_lang_stylus_scoped_true_ = __webpack_require__("9413");

// CONCATENATED MODULE: ./packages/vueVikingCalendar/src/DatetimePicker.vue






/* normalize component */

var DatetimePicker_component = normalizeComponent(
  src_DatetimePickervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "6e0545b5",
  null
  
)

/* harmony default export */ var DatetimePicker = (DatetimePicker_component.exports);
// CONCATENATED MODULE: ./packages/vueVikingCalendar/index.js
/**
 * @Description:    导出datetimePicker
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */
// 导入组件，组件必须声明 name
 // 为组件提供 install 安装方法，供按需引入
// DatetimePicker = function (Vue) {
//     Vue.component(DatetimePicker.name, DatetimePicker)
// }
// 默认导出组件

/* harmony default export */ var vueVikingCalendar = (DatetimePicker);
// CONCATENATED MODULE: ./packages/index.js







function packages_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function packages_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { packages_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { packages_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @Description:    导出整个库
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */
 // 导入时间选择器组件

 // 存储组件列表

var components = [vueVikingCalendar]; // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册

var install = function install(Vue) {
  // 判断是否安装
  if (install.installed) return; // 遍历注册全局组件

  components.map(function (component) {
    return Vue.component(component.name, component);
  });
}; // 判断是否是直接引入文件


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var packages_0 = (packages_objectSpread({
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install: install
}, components));
// CONCATENATED MODULE: ./node_modules/_@vue_cli-service@3.12.1@@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (packages_0);



/***/ }),

/***/ "120f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("3d8a");
var $export = __webpack_require__("e99b");
var redefine = __webpack_require__("84e8");
var hide = __webpack_require__("065d");
var Iterators = __webpack_require__("953d");
var $iterCreate = __webpack_require__("3460");
var setToStringTag = __webpack_require__("bac3");
var getPrototypeOf = __webpack_require__("addc");
var ITERATOR = __webpack_require__("839a")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "1374":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("bb8b");
var createDesc = __webpack_require__("5edc");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "1663":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("212e");
var defined = __webpack_require__("3ab0");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "1b0b":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("a86f");
var aFunction = __webpack_require__("3250");
var SPECIES = __webpack_require__("839a")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "1b96":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("cea2");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "1bc7":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("25ba");
var getKeys = __webpack_require__("93ca");
var redefine = __webpack_require__("84e8");
var global = __webpack_require__("0b34");
var hide = __webpack_require__("065d");
var Iterators = __webpack_require__("953d");
var wks = __webpack_require__("839a");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "1e4d":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("3250");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "201c":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("212e");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "212e":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "21d9":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("3a4c");
var hiddenKeys = __webpack_require__("065e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "25ba":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("87b2");
var step = __webpack_require__("6fef");
var Iterators = __webpack_require__("953d");
var toIObject = __webpack_require__("3471");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("120f")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "264e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "26df":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("0926")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "285b":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("35d4");
var createDesc = __webpack_require__("5edc");
var toIObject = __webpack_require__("3471");
var toPrimitive = __webpack_require__("5d10");
var has = __webpack_require__("4fd4");
var IE8_DOM_DEFINE = __webpack_require__("83d3");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("26df") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "28d3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_Calendar_vue_vue_type_style_index_0_id_02c761b3_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7991");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_Calendar_vue_vue_type_style_index_0_id_02c761b3_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_Calendar_vue_vue_type_style_index_0_id_02c761b3_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "3250":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "32ea":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("8078");
var $keys = __webpack_require__("93ca");

__webpack_require__("b2be")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "3460":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("7ee3");
var descriptor = __webpack_require__("5edc");
var setToStringTag = __webpack_require__("bac3");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("065d")(IteratorPrototype, __webpack_require__("839a")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "3471":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("1b96");
var defined = __webpack_require__("3ab0");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "35d4":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "3a0d":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("baa7")('keys');
var uid = __webpack_require__("d8b3");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "3a4c":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("4fd4");
var toIObject = __webpack_require__("3471");
var arrayIndexOf = __webpack_require__("52a4")(false);
var IE_PROTO = __webpack_require__("3a0d")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "3ab0":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "3d8a":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "3f9e":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("bb8b");
var anObject = __webpack_require__("a86f");
var getKeys = __webpack_require__("93ca");

module.exports = __webpack_require__("26df") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "4057":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("de49");
var anObject = __webpack_require__("a86f");
var $flags = __webpack_require__("6bf8");
var DESCRIPTORS = __webpack_require__("26df");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("84e8")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("0926")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "43ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("1663")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "4d61":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4fd4":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "52a4":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("3471");
var toLength = __webpack_require__("201c");
var toAbsoluteIndex = __webpack_require__("732b");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "55fa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "581c":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("839a")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5d10":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("9cff");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "5dc3":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "5edc":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "6a0b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6bbe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_ScrollContainer_vue_vue_type_style_index_0_id_153808b4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("264e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_ScrollContainer_vue_vue_type_style_index_0_id_153808b4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_ScrollContainer_vue_vue_type_style_index_0_id_153808b4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "6bf8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("a86f");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "6fef":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "732b":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("212e");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "76e3":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "7991":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7c44":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7ee3":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("a86f");
var dPs = __webpack_require__("3f9e");
var enumBugKeys = __webpack_require__("065e");
var IE_PROTO = __webpack_require__("3a0d")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("e8d7")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("bbcc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "804d":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("9cff");
var cof = __webpack_require__("cea2");
var MATCH = __webpack_require__("839a")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "8078":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("3ab0");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "839a":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("baa7")('wks');
var uid = __webpack_require__("d8b3");
var Symbol = __webpack_require__("0b34").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "83d3":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("26df") && !__webpack_require__("0926")(function () {
  return Object.defineProperty(__webpack_require__("e8d7")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "83de":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_30a834a4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("55fa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_30a834a4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_TimePicker_vue_vue_type_style_index_0_id_30a834a4_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "84e8":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("0b34");
var hide = __webpack_require__("065d");
var has = __webpack_require__("4fd4");
var SRC = __webpack_require__("d8b3")('src');
var $toString = __webpack_require__("05fd");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("76e3").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "87b2":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("839a")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("065d")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "8dee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("a86f");
var toObject = __webpack_require__("8078");
var toLength = __webpack_require__("201c");
var toInteger = __webpack_require__("212e");
var advanceStringIndex = __webpack_require__("43ec");
var regExpExec = __webpack_require__("f417");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("c46f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "93ca":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("3a4c");
var enumBugKeys = __webpack_require__("065e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "9413":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_DatetimePicker_vue_vue_type_style_index_0_id_6e0545b5_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7c44");
/* harmony import */ var _node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_DatetimePicker_vue_vue_type_style_index_0_id_6e0545b5_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_0_8_2_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_1_0_1_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_15_9_8_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_3_0_2_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_2_0_1_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_8_vue_loader_lib_index_js_vue_loader_options_DatetimePicker_vue_vue_type_style_index_0_id_6e0545b5_lang_stylus_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "953d":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "982e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("e99b");
var context = __webpack_require__("db34");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("581c")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "9cff":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "a450":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("bb8b").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("26df") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "a83a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("9cff");
var setPrototypeOf = __webpack_require__("e0ff").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "a86f":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("9cff");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "a914":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./packages/vueVikingCalendar/language/cn.js
/**
 * @Description:   中文
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */
/* harmony default export */ var cn = ({
  CONFIRM: '确定',
  TODAY: '今天',
  WEEK: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  MONTH: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  DEFAULT_DATE_FORMAT: 'YY年MM月DD日',
  DEFAULT_DATE_YEARMONTH: 'YY年MM月',
  DEFAULT_TIME_FORMAT: 'hh:mm'
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/language/en.js
/**
 * @Description:   英文
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */
/* harmony default export */ var en = ({
  CONFIRM: 'CONFIRM',
  TODAY: 'TODAY',
  WEEK: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  MONTH: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  DEFAULT_DATE_FORMAT: 'MM DD,YY',
  DEFAULT_DATE_YEARMONTH: 'MM,YY',
  DEFAULT_TIME_FORMAT: 'at hh:mm F'
});
// CONCATENATED MODULE: ./packages/vueVikingCalendar/language/index.js
/**
 * @Description:    统一导出所有语言文件
 * @Author:         WXY
 * @CreateDate:     2021/8/11 15:30
 */


/* harmony default export */ var language = __webpack_exports__["default"] = ({
  CN: cn,
  EN: en
});

/***/ }),

/***/ "aa18":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("e99b");
var $includes = __webpack_require__("52a4")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("87b2")('includes');


/***/ }),

/***/ "ac67":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("e99b");
var ownKeys = __webpack_require__("e7c8");
var toIObject = __webpack_require__("3471");
var gOPD = __webpack_require__("285b");
var createProperty = __webpack_require__("1374");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "addc":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("4fd4");
var toObject = __webpack_require__("8078");
var IE_PROTO = __webpack_require__("3a0d")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "b2be":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("e99b");
var core = __webpack_require__("76e3");
var fails = __webpack_require__("0926");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "baa7":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("76e3");
var global = __webpack_require__("0b34");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("3d8a") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "bac3":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("bb8b").f;
var has = __webpack_require__("4fd4");
var TAG = __webpack_require__("839a")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "bb8b":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("a86f");
var IE8_DOM_DEFINE = __webpack_require__("83d3");
var toPrimitive = __webpack_require__("5d10");
var dP = Object.defineProperty;

exports.f = __webpack_require__("26df") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "bbcc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("0b34").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "bf73":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("0353");
__webpack_require__("e99b")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "c46f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("bf73");
var redefine = __webpack_require__("84e8");
var hide = __webpack_require__("065d");
var fails = __webpack_require__("0926");
var defined = __webpack_require__("3ab0");
var wks = __webpack_require__("839a");
var regexpExec = __webpack_require__("0353");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "cea2":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "d445":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("cea2");
var TAG = __webpack_require__("839a")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "d8b3":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "db34":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("804d");
var defined = __webpack_require__("3ab0");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "de49":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("26df") && /./g.flags != 'g') __webpack_require__("bb8b").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("6bf8")
});


/***/ }),

/***/ "e0ff":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("9cff");
var anObject = __webpack_require__("a86f");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("1e4d")(Function.call, __webpack_require__("285b").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "e67d":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "e680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("0b34");
var has = __webpack_require__("4fd4");
var cof = __webpack_require__("cea2");
var inheritIfRequired = __webpack_require__("a83a");
var toPrimitive = __webpack_require__("5d10");
var fails = __webpack_require__("0926");
var gOPN = __webpack_require__("21d9").f;
var gOPD = __webpack_require__("285b").f;
var dP = __webpack_require__("bb8b").f;
var $trim = __webpack_require__("eb34").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("7ee3")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("26df") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("84e8")(global, NUMBER, $Number);
}


/***/ }),

/***/ "e7c8":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("21d9");
var gOPS = __webpack_require__("0c29");
var anObject = __webpack_require__("a86f");
var Reflect = __webpack_require__("0b34").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "e8d7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("9cff");
var document = __webpack_require__("0b34").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "e99b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("0b34");
var core = __webpack_require__("76e3");
var hide = __webpack_require__("065d");
var redefine = __webpack_require__("84e8");
var ctx = __webpack_require__("1e4d");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "eb34":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("e99b");
var defined = __webpack_require__("3ab0");
var fails = __webpack_require__("0926");
var spaces = __webpack_require__("5dc3");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "f417":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("d445");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "fc02":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("804d");
var anObject = __webpack_require__("a86f");
var speciesConstructor = __webpack_require__("1b0b");
var advanceStringIndex = __webpack_require__("43ec");
var toLength = __webpack_require__("201c");
var callRegExpExec = __webpack_require__("f417");
var regexpExec = __webpack_require__("0353");
var fails = __webpack_require__("0926");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("c46f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ })

/******/ });
});
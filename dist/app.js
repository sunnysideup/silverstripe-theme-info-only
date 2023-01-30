<<<<<<< HEAD
(self.webpackChunkpublic=self.webpackChunkpublic||[]).push([[143],{453:function(){const e={bodyObject:null,init:function(){this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(t){e.bodyObject.classList.add("body-loaded"),e.bodyObject.classList.remove("body-unloaded"),"ontouchstart"in document.documentElement?e.bodyObject.classList.add("touch"):e.bodyObject.classList.add("no-touch"),e.addRocketMode()})),window.addEventListener("beforeunload",(function(){}))}};e.init()},825:function(){(function(){function e(e,s){[].forEach.call(e.getElementsByTagName("li"),(a=>{if(!s||e===a.parentNode){a.style.userSelect="none",a.style.MozUserSelect="none",a.style.msUserSelect="none",a.style.WebkitUserSelect="none";const e=a.getElementsByTagName("ul");if(e.length>0){const s=document.createElement("span");s.classList.add("open-close"),s.addEventListener("click",t.bind(null,a)),s.innerHTML='<i class="open">&nbsp;</i><i class="closed">↰</i>',(a.classList.contains("section")||a.classList.contains("current"))&&n(a),n(a),a.insertBefore(s,e[0])}}}))}function t(e,t){let s=t.target;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&n(e)}function n(e){const t=e.classList.contains("collapsibleListClosed"),n=e.getElementsByTagName("ul");[].forEach.call(n,(n=>{let s=n;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&(n.style.display=t?"block":"none")})),e.classList.remove("collapsibleListOpen"),e.classList.remove("collapsibleListClosed"),n.length>0&&e.classList.add("collapsibleList"+(t?"Open":"Closed"))}return{apply:function(t){[].forEach.call(document.getElementsByTagName("ul"),(n=>{n.classList.contains("collapsibleList")&&(e(n,!0),t||[].forEach.call(n.getElementsByTagName("ul"),(e=>{e.classList.add("collapsibleList")})))}))},applyTo:e}})().apply()},586:function(){for(var e=document.querySelectorAll("input, select, textarea"),t=e.length-1;t>=0;--t){e[t].addEventListener("change",s,!1),e[t].addEventListener("keyup",s,!1),e[t].addEventListener("focus",s,!1),e[t].addEventListener("blur",s,!1),e[t].addEventListener("mousedown",s,!1);var n=document.createEvent("HTMLEvents");n.initEvent("change",!1,!0),e[t].dispatchEvent(n)}function s(e){var t=e.target.value;t&&t.replace(/^\s+|\s+$/g,"")?e.target.classList.remove("no-value"):e.target.classList.add("no-value")}},438:function(){(()=>{const e=document.querySelectorAll(".typography img");for(let s=0;s<e.length;s++){const a=document.createElement("div");a.setAttribute("class","image-container");const l=e[s];n=a,(t=l).parentNode.insertBefore(n,t),n.appendChild(t)}var t,n})()},266:function(e,t,n){"use strict";n(453),n(825),n(586),n(438)}},function(e){var t;t=266,e(e.s=t)}]);
=======
(self["webpackChunkpublic"] = self["webpackChunkpublic"] || []).push([["app"],{

/***/ "../theme-info-only/src/js/body-class.js":
/*!***********************************************!*\
  !*** ../theme-info-only/src/js/body-class.js ***!
  \***********************************************/
/***/ (function() {

const bodyClass = {
  bodyObject: null,
  init: function () {
    this.addBasicBodyClassListeners();
  },
  addBasicBodyClassListeners: function () {
    document.addEventListener('DOMContentLoaded', function (event) {
      bodyClass.bodyObject.classList.add('body-loaded');
      bodyClass.bodyObject.classList.remove('body-unloaded');
      if ('ontouchstart' in document.documentElement) {
        bodyClass.bodyObject.classList.add('touch');
      } else {
        bodyClass.bodyObject.classList.add('no-touch');
      }
      bodyClass.addRocketMode();
    });
    window.addEventListener('beforeunload', function () {
      // bodyClass.bodyObject.classList.add('body-unloaded')
    });
  }
};
bodyClass.init();

/***/ }),

/***/ "../theme-info-only/src/js/collapsible-menu.js":
/*!*****************************************************!*\
  !*** ../theme-info-only/src/js/collapsible-menu.js ***!
  \*****************************************************/
/***/ (function() {

/*

CollapsibleLists.js

An object allowing lists to dynamically expand and collapse

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

const CollapsibleLists = function () {
  // Makes all lists with the class 'collapsibleList' collapsible. The
  // parameter is:
  //
  // doNotRecurse - true if sub-lists should not be made collapsible
  function apply(doNotRecurse) {
    [].forEach.call(document.getElementsByTagName('ul'), node => {
      if (node.classList.contains('collapsibleList')) {
        applyTo(node, true);
        if (!doNotRecurse) {
          [].forEach.call(node.getElementsByTagName('ul'), subnode => {
            subnode.classList.add('collapsibleList');
          });
        }
      }
    });
  }

  // Makes the specified list collapsible. The parameters are:
  //
  // node         - the list element
  // doNotRecurse - true if sub-lists should not be made collapsible
  function applyTo(node, doNotRecurse) {
    [].forEach.call(node.getElementsByTagName('li'), li => {
      if (!doNotRecurse || node === li.parentNode) {
        li.style.userSelect = 'none';
        li.style.MozUserSelect = 'none';
        li.style.msUserSelect = 'none';
        li.style.WebkitUserSelect = 'none';
        const ul = li.getElementsByTagName('ul');
        if (ul.length > 0) {
          const span = document.createElement('span');
          span.classList.add('open-close');
          span.addEventListener('click', handleClick.bind(null, li));
          span.innerHTML = '<i class="open">&nbsp;</i><i class="closed">↰</i>';
          // we need to toggle all of them, some twice
          if (li.classList.contains('section') || li.classList.contains('current')) {
            toggle(li);
          }
          toggle(li);
          li.insertBefore(span, ul[0]);
        }
      }
    });
  }

  // Handles a click. The parameter is:
  //
  // node - the node for which clicks are being handled
  function handleClick(node, e) {
    let li = e.target;
    while (li.nodeName !== 'LI') {
      li = li.parentNode;
    }
    if (li === node) {
      toggle(node);
    }
  }

  // Opens or closes the unordered list elements directly within the
  // specified node. The parameter is:
  //
  // node - the node containing the unordered list elements
  function toggle(node) {
    const open = node.classList.contains('collapsibleListClosed');
    const uls = node.getElementsByTagName('ul');
    [].forEach.call(uls, ul => {
      let li = ul;
      while (li.nodeName !== 'LI') {
        li = li.parentNode;
      }
      if (li === node) {
        ul.style.display = open ? 'block' : 'none';
      }
    });
    node.classList.remove('collapsibleListOpen');
    node.classList.remove('collapsibleListClosed');
    if (uls.length > 0) {
      node.classList.add('collapsibleList' + (open ? 'Open' : 'Closed'));
    }
  }
  return {
    apply,
    applyTo
  };
}();
CollapsibleLists.apply();

/***/ }),

/***/ "../theme-info-only/src/js/cookie.js":
/*!*******************************************!*\
  !*** ../theme-info-only/src/js/cookie.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myCookie": function() { return /* binding */ myCookie; }
/* harmony export */ });
const myCookie = {
  setCookie: function (name, value, days) {
    var expires = '';
    if (typeof days === 'undefined') {
      days = 14;
    }
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },
  eraseCookie: function (name) {
    myCookie.setCookie(name, null, 0);
  }
};


/***/ }),

/***/ "../theme-info-only/src/js/features/ShowHideCurrentSites.js":
/*!******************************************************************!*\
  !*** ../theme-info-only/src/js/features/ShowHideCurrentSites.js ***!
  \******************************************************************/
/***/ (function() {

const holder = document.getElementById('ShowHideCurrent');
if (holder) {
  holder.addEventListener('click', function () {
    const showCurrent = !holder.classList.contains('show-current');
    holder.classList.toggle('show-current');
    var sites = document.getElementsByClassName('site');
    for (var i = 0; i < sites.length; i++) {
      const site = sites[i];
      if (showCurrent && site.classList.contains('current') || !showCurrent) {
        site.style.display = 'block';
      } else {
        site.style.display = 'none';
      }
    }
  });
  holder.click();
}

/***/ }),

/***/ "../theme-info-only/src/js/features/fieldsToc.js":
/*!*******************************************************!*\
  !*** ../theme-info-only/src/js/features/fieldsToc.js ***!
  \*******************************************************/
/***/ (function() {

/**
 * if there is a div with ID fieldsToc
 * then it runs
 * It will look for all data-field and create a Fields Table of Contents
 *
 */

const fieldsToc = document.getElementById('fieldsToc');
if (fieldsToc) {
  const selectors = document.querySelectorAll('[data-field]');
  var arrayOfSelectors = [...selectors];
  // const items = arrayOfSelectors.filter((v, i, a) => a.indexOf(v) === i)
  const items = [];
  arrayOfSelectors.forEach(div => {
    const value = div.getAttribute('data-field').trim();
    if (items.indexOf(value) === -1) {
      items.push(value);
    }
    // console.log(value)
  });

  var currentSelection = [];
  const ulEl = document.createElement('ul');

  // for each of the items...
  items.forEach(value => {
    const listEl = document.createElement('li');
    const aEl = document.createElement('a');
    aEl.innerHTML = value;

    // on click
    aEl.addEventListener('click', function (event) {
      const test = this.innerHTML;
      this.classList.toggle('current');
      this.classList.toggle('link');
      const pos = currentSelection.indexOf(test);
      if (this.classList.contains('current')) {
        if (pos === -1) {
          currentSelection.push(value);
        }
      } else {
        if (pos !== -1) {
          currentSelection.splice(pos, 1);
        }
      }
      event.preventDefault();
      arrayOfSelectors.forEach(div => {
        const value = div.getAttribute('data-field').trim();
        const empty = currentSelection.length === 0;
        const posInCurrent = currentSelection.indexOf(value);
        if (empty || posInCurrent !== -1) {
          div.style.display = '';
        } else {
          div.style.display = 'none';
        }
      });
      return false;
    });
    aEl.href = '#';
    aEl.classList.add('link');

    // append
    listEl.appendChild(aEl);
    ulEl.appendChild(listEl);
    // console.log(listEl)
  });

  fieldsToc.appendChild(ulEl);
}

/***/ }),

/***/ "../theme-info-only/src/js/form.js":
/*!*****************************************!*\
  !*** ../theme-info-only/src/js/form.js ***!
  \*****************************************/
/***/ (function() {

var formfields = document.querySelectorAll('input, select, textarea');
for (var J = formfields.length - 1; J >= 0; --J) {
  formfields[J].addEventListener('change', adjustStyling, false);
  formfields[J].addEventListener('keyup', adjustStyling, false);
  formfields[J].addEventListener('focus', adjustStyling, false);
  formfields[J].addEventListener('blur', adjustStyling, false);
  formfields[J].addEventListener('mousedown', adjustStyling, false);
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', false, true);
  formfields[J].dispatchEvent(evt);
}
function adjustStyling(zEvent) {
  var inpVal = zEvent.target.value;
  if (inpVal && inpVal.replace(/^\s+|\s+$/g, '')) {
    zEvent.target.classList.remove('no-value');
  } else {
    zEvent.target.classList.add('no-value');
  }
}

/***/ }),

/***/ "../theme-info-only/src/main.js":
/*!**************************************!*\
  !*** ../theme-info-only/src/main.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cookie */ "../theme-info-only/src/js/cookie.js");
/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/body-class */ "../theme-info-only/src/js/body-class.js");
/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_body_class__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/collapsible-menu */ "../theme-info-only/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/form */ "../theme-info-only/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_features_fieldsToc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/features/fieldsToc */ "../theme-info-only/src/js/features/fieldsToc.js");
/* harmony import */ var _js_features_fieldsToc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_features_fieldsToc__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_features_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/features/ShowHideCurrentSites */ "../theme-info-only/src/js/features/ShowHideCurrentSites.js");
/* harmony import */ var _js_features_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_features_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_5__);
// // non-themed app
// import 'site/app/client/javascript/MyJavascriptFile';
//
//
// // vendor modules
// import 'site/vendor/myvendor/mypackage/client/javascript/MyJavascriptFile';
//
// // your themed app files
// import './js/partials/SomeOtherJavascriptFile';




// import './js/images'



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("../theme-info-only/src/main.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDOUQsTUFBTSxDQUFDakMsU0FBUyxDQUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzVDLENBQUMsTUFBTTtJQUNMNkYsTUFBTSxDQUFDOUQsTUFBTSxDQUFDakMsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQ3pDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ007QUFDWjtBQUNsQjtBQUNnQyIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvZmllbGRzVG9jLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5Q2xhc3MgPSB7XG5cbiAgYm9keU9iamVjdDogbnVsbCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gIH0sXG5cbiAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ0RPTUNvbnRlbnRMb2FkZWQnLFxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICB9XG4gICAgICAgIGJvZHlDbGFzcy5hZGRSb2NrZXRNb2RlKClcbiAgICAgIH1cbiAgICApXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnYmVmb3JldW5sb2FkJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICB9XG4gICAgKVxuICB9XG5cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiLypcblxuQ29sbGFwc2libGVMaXN0cy5qc1xuXG5BbiBvYmplY3QgYWxsb3dpbmcgbGlzdHMgdG8gZHluYW1pY2FsbHkgZXhwYW5kIGFuZCBjb2xsYXBzZVxuXG5DcmVhdGVkIGJ5IEthdGUgTW9ybGV5IC0gaHR0cDovL2NvZGUuaWFta2F0ZS5jb20vIC0gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtc1xub2YgdGhlIENDMCAxLjAgVW5pdmVyc2FsIGxlZ2FsIGNvZGU6XG5cbmh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9sZWdhbGNvZGVcblxuKi9cblxuY29uc3QgQ29sbGFwc2libGVMaXN0cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIE1ha2VzIGFsbCBsaXN0cyB3aXRoIHRoZSBjbGFzcyAnY29sbGFwc2libGVMaXN0JyBjb2xsYXBzaWJsZS4gVGhlXG4gIC8vIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5IChkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkge1xuICAgICAgICBhcHBseVRvKG5vZGUsIHRydWUpXG5cbiAgICAgICAgaWYgKCFkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgc3Vibm9kZSA9PiB7XG4gICAgICAgICAgICBzdWJub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBNYWtlcyB0aGUgc3BlY2lmaWVkIGxpc3QgY29sbGFwc2libGUuIFRoZSBwYXJhbWV0ZXJzIGFyZTpcbiAgLy9cbiAgLy8gbm9kZSAgICAgICAgIC0gdGhlIGxpc3QgZWxlbWVudFxuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHlUbyAobm9kZSwgZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksIGxpID0+IHtcbiAgICAgIGlmICghZG9Ob3RSZWN1cnNlIHx8IG5vZGUgPT09IGxpLnBhcmVudE5vZGUpIHtcbiAgICAgICAgbGkuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLm1zVXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5XZWJraXRVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGNvbnN0IHVsID0gbGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcbiAgICAgICAgaWYgKHVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBsaSkpXG4gICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+Jm5ic3A7PC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oawPC9pPidcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRvZ2dsZSBhbGwgb2YgdGhlbSwgc29tZSB0d2ljZVxuICAgICAgICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKSB8fCBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIHVsWzBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEhhbmRsZXMgYSBjbGljay4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGZvciB3aGljaCBjbGlja3MgYXJlIGJlaW5nIGhhbmRsZWRcbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKG5vZGUsIGUpIHtcbiAgICBsZXQgbGkgPSBlLnRhcmdldFxuICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgfVxuXG4gICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICB0b2dnbGUobm9kZSlcbiAgICB9XG4gIH1cblxuICAvLyBPcGVucyBvciBjbG9zZXMgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzIGRpcmVjdGx5IHdpdGhpbiB0aGVcbiAgLy8gc3BlY2lmaWVkIG5vZGUuIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50c1xuICBmdW5jdGlvbiB0b2dnbGUgKG5vZGUpIHtcbiAgICBjb25zdCBvcGVuID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgY29uc3QgdWxzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKTtcblxuICAgIFtdLmZvckVhY2guY2FsbCh1bHMsIHVsID0+IHtcbiAgICAgIGxldCBsaSA9IHVsXG4gICAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gKG9wZW4gPyAnYmxvY2snIDogJ25vbmUnKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgIGlmICh1bHMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnICsgKG9wZW4gPyAnT3BlbicgOiAnQ2xvc2VkJykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYXBwbHksIGFwcGx5VG8gfVxufSkoKVxuXG5Db2xsYXBzaWJsZUxpc3RzLmFwcGx5KClcbiIsImNvbnN0IG15Q29va2llID0ge1xuXG4gIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgdmFyIGV4cGlyZXMgPSAnJ1xuICAgIGlmICh0eXBlb2YgZGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRheXMgPSAxNFxuICAgIH1cbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKVxuICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKVxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSArIGV4cGlyZXMgKyAnOyBwYXRoPS8nXG4gIH0sXG5cbiAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JylcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNhW2ldXG4gICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIGVyYXNlQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIG15Q29va2llLnNldENvb2tpZShuYW1lLCBudWxsLCAwKVxuICB9XG59XG5cbmV4cG9ydCB7IG15Q29va2llIH1cbiIsImNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93SGlkZUN1cnJlbnQnKTtcbmlmKGhvbGRlcikge1xuICAgIGhvbGRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHNob3dDdXJyZW50ID0gIWhvbGRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctY3VycmVudCcpO1xuICAgICAgICAgICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctY3VycmVudCcpO1xuICAgICAgICAgICAgdmFyIHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlc1tpXTtcbiAgICAgICAgICAgICAgICBpZigoc2hvd0N1cnJlbnQgJiYgc2l0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkgfHwgIXNob3dDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gICAgaG9sZGVyLmNsaWNrKCk7XG59XG5cbiIsIi8qKlxuICogaWYgdGhlcmUgaXMgYSBkaXYgd2l0aCBJRCBmaWVsZHNUb2NcbiAqIHRoZW4gaXQgcnVuc1xuICogSXQgd2lsbCBsb29rIGZvciBhbGwgZGF0YS1maWVsZCBhbmQgY3JlYXRlIGEgRmllbGRzIFRhYmxlIG9mIENvbnRlbnRzXG4gKlxuICovXG5cbmNvbnN0IGZpZWxkc1RvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZHNUb2MnKVxuaWYgKGZpZWxkc1RvYykge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZpZWxkXScpXG4gICAgdmFyIGFycmF5T2ZTZWxlY3RvcnMgPSBbLi4uc2VsZWN0b3JzXVxuICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICBjb25zdCBpdGVtcyA9IFtdXG4gICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICBpZiAoaXRlbXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlKVxuICAgIH0pXG4gICAgdmFyIGN1cnJlbnRTZWxlY3Rpb24gPSBbXVxuXG4gICAgY29uc3QgdWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIC8vIGZvciBlYWNoIG9mIHRoZSBpdGVtcy4uLlxuICAgIGl0ZW1zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBhRWwuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgICAgICAvLyBvbiBjbGlja1xuICAgICAgICBhRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdjdXJyZW50JylcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodGVzdClcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5zcGxpY2UocG9zLCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NJbkN1cnJlbnQgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpXG4gICAgICAgICAgICAgICAgaWYgKGVtcHR5IHx8IHBvc0luQ3VycmVudCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgIGFFbC5jbGFzc0xpc3QuYWRkKCdsaW5rJylcblxuICAgICAgICAvLyBhcHBlbmRcbiAgICAgICAgbGlzdEVsLmFwcGVuZENoaWxkKGFFbClcbiAgICAgICAgdWxFbC5hcHBlbmRDaGlsZChsaXN0RWwpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3RFbClcbiAgICB9KVxuICAgIGZpZWxkc1RvYy5hcHBlbmRDaGlsZCh1bEVsKVxufVxuIiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiXG4vLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG4vLyBpbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcydcbiJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRSb2NrZXRNb2RlIiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm5vZGUiLCJjb250YWlucyIsImFwcGx5VG8iLCJzdWJub2RlIiwibGkiLCJwYXJlbnROb2RlIiwic3R5bGUiLCJ1c2VyU2VsZWN0IiwiTW96VXNlclNlbGVjdCIsIm1zVXNlclNlbGVjdCIsIldlYmtpdFVzZXJTZWxlY3QiLCJ1bCIsImxlbmd0aCIsInNwYW4iLCJjcmVhdGVFbGVtZW50IiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiaW5uZXJIVE1MIiwidG9nZ2xlIiwiaW5zZXJ0QmVmb3JlIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwib3BlbiIsInVscyIsImRpc3BsYXkiLCJteUNvb2tpZSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0Q29va2llIiwibmFtZUVRIiwiY2EiLCJzcGxpdCIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImVyYXNlQ29va2llIiwiaG9sZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNpdGUiLCJjbGljayIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsImN1cnJlbnRTZWxlY3Rpb24iLCJ1bEVsIiwibGlzdEVsIiwiYUVsIiwidGVzdCIsInBvcyIsInNwbGljZSIsInByZXZlbnREZWZhdWx0IiwiZW1wdHkiLCJwb3NJbkN1cnJlbnQiLCJocmVmIiwiYXBwZW5kQ2hpbGQiLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJyZXBsYWNlIl0sInNvdXJjZVJvb3QiOiIifQ==
>>>>>>> fixed

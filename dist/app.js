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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM5RCxNQUFNLENBQUNqQyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0w2RixNQUFNLENBQUM5RCxNQUFNLENBQUNqQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFDekM7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDTTtBQUNaO0FBQ2xCO0FBQ2dDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvYm9keS1jbGFzcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb2xsYXBzaWJsZS1tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHlDbGFzcyA9IHtcblxuICBib2R5T2JqZWN0OiBudWxsLFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgfSxcblxuICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnRE9NQ29udGVudExvYWRlZCcsXG4gICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS1sb2FkZWQnKVxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RvdWNoJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgIH1cbiAgICAgICAgYm9keUNsYXNzLmFkZFJvY2tldE1vZGUoKVxuICAgICAgfVxuICAgIClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdiZWZvcmV1bmxvYWQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgLy8gcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBzdWJub2RlID0+IHtcbiAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAvL1xuICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8IGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgIHRvZ2dsZShub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgbGV0IGxpID0gdWxcbiAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAob3BlbiA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dIaWRlQ3VycmVudCcpO1xuaWYoaG9sZGVyKSB7XG4gICAgaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdjbGljaycsXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3Qgc2hvd0N1cnJlbnQgPSAhaG9sZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1jdXJyZW50Jyk7XG4gICAgICAgICAgICBob2xkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1jdXJyZW50Jyk7XG4gICAgICAgICAgICB2YXIgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaXRlJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzW2ldO1xuICAgICAgICAgICAgICAgIGlmKChzaG93Q3VycmVudCAmJiBzaXRlLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB8fCAhc2hvd0N1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgICBob2xkZXIuY2xpY2soKTtcbn1cblxuIiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cbmNvbnN0IGZpZWxkc1RvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZHNUb2MnKVxuaWYgKGZpZWxkc1RvYykge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZpZWxkXScpXG4gICAgdmFyIGFycmF5T2ZTZWxlY3RvcnMgPSBbLi4uc2VsZWN0b3JzXVxuICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICBjb25zdCBpdGVtcyA9IFtdXG4gICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICBpZiAoaXRlbXMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlKVxuICAgIH0pXG4gICAgdmFyIGN1cnJlbnRTZWxlY3Rpb24gPSBbXVxuXG4gICAgY29uc3QgdWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgIC8vIGZvciBlYWNoIG9mIHRoZSBpdGVtcy4uLlxuICAgIGl0ZW1zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBhRWwuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgICAgICAvLyBvbiBjbGlja1xuICAgICAgICBhRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdjdXJyZW50JylcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodGVzdClcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5zcGxpY2UocG9zLCAxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5ID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NJbkN1cnJlbnQgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpXG4gICAgICAgICAgICAgICAgaWYgKGVtcHR5IHx8IHBvc0luQ3VycmVudCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9KVxuXG4gICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgIGFFbC5jbGFzc0xpc3QuYWRkKCdsaW5rJylcblxuICAgICAgICAvLyBhcHBlbmRcbiAgICAgICAgbGlzdEVsLmFwcGVuZENoaWxkKGFFbClcbiAgICAgICAgdWxFbC5hcHBlbmRDaGlsZChsaXN0RWwpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3RFbClcbiAgICB9KVxuICAgIGZpZWxkc1RvYy5hcHBlbmRDaGlsZCh1bEVsKVxufVxuIiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiXG4vLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG4vLyBpbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcydcbiJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRSb2NrZXRNb2RlIiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIm5vZGUiLCJjb250YWlucyIsImFwcGx5VG8iLCJzdWJub2RlIiwibGkiLCJwYXJlbnROb2RlIiwic3R5bGUiLCJ1c2VyU2VsZWN0IiwiTW96VXNlclNlbGVjdCIsIm1zVXNlclNlbGVjdCIsIldlYmtpdFVzZXJTZWxlY3QiLCJ1bCIsImxlbmd0aCIsInNwYW4iLCJjcmVhdGVFbGVtZW50IiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiaW5uZXJIVE1MIiwidG9nZ2xlIiwiaW5zZXJ0QmVmb3JlIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwib3BlbiIsInVscyIsImRpc3BsYXkiLCJteUNvb2tpZSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0Q29va2llIiwibmFtZUVRIiwiY2EiLCJzcGxpdCIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImVyYXNlQ29va2llIiwiaG9sZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNpdGUiLCJjbGljayIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsImN1cnJlbnRTZWxlY3Rpb24iLCJ1bEVsIiwibGlzdEVsIiwiYUVsIiwidGVzdCIsInBvcyIsInNwbGljZSIsInByZXZlbnREZWZhdWx0IiwiZW1wdHkiLCJwb3NJbkN1cnJlbnQiLCJocmVmIiwiYXBwZW5kQ2hpbGQiLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJyZXBsYWNlIl0sInNvdXJjZVJvb3QiOiIifQ==
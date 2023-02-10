(self["webpackChunkpublic"] = self["webpackChunkpublic"] || []).push([["app"],{

/***/ "../theme-info-only/src/js/body-class.js":
/*!***********************************************!*\
  !*** ../theme-info-only/src/js/body-class.js ***!
  \***********************************************/
/***/ (function() {

const bodyClass = {
  bodyObject: null,
  init: function () {
    bodyClass.bodyObject = document.getElementsByTagName('body')[0];
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showHideCurrentSitesInit": function() { return /* binding */ showHideCurrentSitesInit; }
/* harmony export */ });
function showHideCurrentSitesInit(onFirstInit) {
  const holder = document.getElementById('ShowHideCurrent');
  if (holder) {
    holder.removeEventListener('click', holderEventHandler, true);
    holder.addEventListener('click', holderEventHandler, true);
  }
  if (onFirstInit) {
    holder.click();
  }
}
function holderEventHandler(event) {
  const holder = event.currentTarget;
  const showCurrent = !holder.classList.contains('show-current');
  holder.classList.toggle('show-current');
  const sites = document.getElementsByClassName('site');
  for (var i = 0; i < sites.length; i++) {
    const site = sites[i];
    if (showCurrent && site.classList.contains('current') || !showCurrent) {
      site.style.display = 'block';
    } else {
      site.style.display = 'none';
    }
  }
}

/***/ }),

/***/ "../theme-info-only/src/js/features/addLink.js":
/*!*****************************************************!*\
  !*** ../theme-info-only/src/js/features/addLink.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLinkInit": function() { return /* binding */ addLinkInit; }
/* harmony export */ });
/* harmony import */ var _initFeatures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");

function addLinkInit() {
  const buttons = document.getElementsByClassName('addlinkbutton');
  //Adding event listeners
  for (var i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    //clear existing listeners just in case (eg for partial resets)
    button.removeEventListener('click', addLinkClick);
    button.addEventListener('click', addLinkClick);
  }
}
function addLinkClick(event) {
  const button = event.currentTarget;
  //so only one input is created
  if (button.dataset.inputactive == "false") {
    button.dataset.inputactive = "true";
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('addlinkinput');
    inputElement.style.width = "250px";
    inputElement.addEventListener("keyup", ({
      key
    }) => {
      if (key === "Enter") {
        if (inputElement.value != '') {
          inputLink(button, inputElement.value);
        }
        button.dataset.inputactive = "false";
        inputElement.remove();
      }
    });
    button.before(inputElement);
    inputElement.focus();
  }

  //input already exists, pressing button again submits
  else {
    button.dataset.inputactive = "false";
    const input = button.parentElement.getElementsByClassName('addlinkinput')[0];
    if (input.value != '') {
      inputLink(button, input.value);
    }
    input.remove();
  }
}
function inputLink(button, link) {
  // destination
  const proto = window.location.protocol;
  const hostname = window.location.hostname;
  const uri = button.dataset.url;
  const destination = proto + "//" + hostname + uri;

  // collate form
  const formData = new FormData();
  formData.append("link", link);

  // make request
  const request = new XMLHttpRequest();
  request.open("POST", destination);
  request.send(formData);

  // handle response
  request.onreadystatechange = function () {
    //after response
    if (request.readyState == 4 && request.status == 200) {
      const response = request.responseText;
      const site = button.parentElement.parentElement;
      site.outerHTML = response;
      //re-init here!
      (0,_initFeatures__WEBPACK_IMPORTED_MODULE_0__.siteInit)();
    }
  };
}

/***/ }),

/***/ "../theme-info-only/src/js/features/fieldsToc.js":
/*!*******************************************************!*\
  !*** ../theme-info-only/src/js/features/fieldsToc.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fieldsTocInit": function() { return /* binding */ fieldsTocInit; }
/* harmony export */ });
/**
 * if there is a div with ID fieldsToc
 * then it runs
 * It will look for all data-field and create a Fields Table of Contents
 *
 */
function fieldsTocInit(onFirstInit) {
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
    ulEl.id = 'filterUl';

    // for each of the items...
    items.forEach(value => {
      const listEl = document.createElement('li');
      const aEl = document.createElement('a');
      aEl.innerHTML = value;
      aEl.arrayOfSelectors = arrayOfSelectors;
      aEl.currentSelection = currentSelection;
      // on click
      aEl.addEventListener('click', aElEventHandler);
      aEl.href = '#';
      aEl.classList.add('link');

      // append
      listEl.appendChild(aEl);
      ulEl.appendChild(listEl);
      // console.log(listEl)
    });

    if (!onFirstInit) {
      document.getElementById('filterUl').remove();
    }
    fieldsToc.appendChild(ulEl);
  }
}
function aElEventHandler(event) {
  const arrayOfSelectors = event.currentTarget.arrayOfSelectors;
  const currentSelection = event.currentTarget.currentSelection;
  const value = event.currentTarget.innerHTML;
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
}

/***/ }),

/***/ "../theme-info-only/src/js/features/initFeatures.js":
/*!**********************************************************!*\
  !*** ../theme-info-only/src/js/features/initFeatures.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "siteInit": function() { return /* binding */ siteInit; }
/* harmony export */ });
/* harmony import */ var _addLink__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addLink */ "../theme-info-only/src/js/features/addLink.js");
/* harmony import */ var _ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShowHideCurrentSites */ "../theme-info-only/src/js/features/ShowHideCurrentSites.js");
/* harmony import */ var _fieldsToc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fieldsToc */ "../theme-info-only/src/js/features/fieldsToc.js");



siteInit(true);
function siteInit(firstInit = false) {
  (0,_addLink__WEBPACK_IMPORTED_MODULE_0__.addLinkInit)();
  (0,_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_1__.showHideCurrentSitesInit)(firstInit);
  (0,_fieldsToc__WEBPACK_IMPORTED_MODULE_2__.fieldsTocInit)(firstInit);
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
/* harmony import */ var _js_features_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/features/ShowHideCurrentSites */ "../theme-info-only/src/js/features/ShowHideCurrentSites.js");
/* harmony import */ var _js_features_addLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/features/addLink */ "../theme-info-only/src/js/features/addLink.js");
/* harmony import */ var _js_features_initFeatures__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/features/initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RXVJLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFFakUsSUFBSUMsR0FBRyxHQUFHM0ksUUFBUSxDQUFDNEksV0FBVyxDQUFDLFlBQVksQ0FBQztFQUM1Q0QsR0FBRyxDQUFDRSxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7RUFDcENMLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUNLLGFBQWEsQ0FBQ0gsR0FBRyxDQUFDO0FBQ2xDO0FBRUEsU0FBU0QsYUFBYSxDQUFFSyxNQUFNLEVBQUU7RUFDOUIsSUFBSUMsTUFBTSxHQUFHRCxNQUFNLENBQUMzRyxNQUFNLENBQUNRLEtBQUs7RUFDaEMsSUFBSW9HLE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzlDRixNQUFNLENBQUMzRyxNQUFNLENBQUMvQixTQUFTLENBQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0x3SSxNQUFNLENBQUMzRyxNQUFNLENBQUMvQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFDekM7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDTTtBQUNaO0FBQ2xCO0FBQ2dDO0FBQ1c7QUFDYiIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvYWRkTGluay5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5Q2xhc3MgPSB7XG5cbiAgYm9keU9iamVjdDogbnVsbCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG4gICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gIH0sXG5cbiAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIFxuICB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdET01Db250ZW50TG9hZGVkJyxcbiAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdiZWZvcmV1bmxvYWQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgLy8gcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBzdWJub2RlID0+IHtcbiAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAvL1xuICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8IGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgIHRvZ2dsZShub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgbGV0IGxpID0gdWxcbiAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAob3BlbiA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3dIaWRlQ3VycmVudFNpdGVzSW5pdChvbkZpcnN0SW5pdCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93SGlkZUN1cnJlbnQnKTtcbiAgICBpZihob2xkZXIpIHtcbiAgICAgICAgaG9sZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKG9uRmlyc3RJbml0KSB7XG4gICAgICAgIGhvbGRlci5jbGljaygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaG9sZGVyRXZlbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgaG9sZGVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBzaG93Q3VycmVudCA9ICFob2xkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWN1cnJlbnQnKTtcbiAgICBob2xkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1jdXJyZW50Jyk7XG4gICAgY29uc3Qgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaXRlJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzaXRlID0gc2l0ZXNbaV07XG4gICAgICAgIGlmKChzaG93Q3VycmVudCAmJiBzaXRlLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB8fCAhc2hvd0N1cnJlbnQpIHtcbiAgICAgICAgICAgIHNpdGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7c2l0ZUluaXR9IGZyb20gJy4vaW5pdEZlYXR1cmVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkTGlua0luaXQoKSB7XG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZGxpbmtidXR0b24nKTtcbiAgICAvL0FkZGluZyBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gYnV0dG9uc1tpXTtcbiAgICAgICAgLy9jbGVhciBleGlzdGluZyBsaXN0ZW5lcnMganVzdCBpbiBjYXNlIChlZyBmb3IgcGFydGlhbCByZXNldHMpXG4gICAgICAgIGJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZExpbmtDbGljayk7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZExpbmtDbGljayk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRMaW5rQ2xpY2soZXZlbnQpIHtcbiAgICBjb25zdCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIC8vc28gb25seSBvbmUgaW5wdXQgaXMgY3JlYXRlZFxuICAgIGlmIChidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcInRydWVcIjtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhZGRsaW5raW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIyNTBweFwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dExpbmsoYnV0dG9uLCBpbnB1dEVsZW1lbnQudmFsdWUpO31cbiAgICAgICAgICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJ1dHRvbi5iZWZvcmUoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2lucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0LnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbnB1dExpbmsoYnV0dG9uLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBidXR0b24uZGF0YXNldC51cmw7IFxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvdG8rXCIvL1wiK2hvc3RuYW1lK3VyaVxuXG4gICAgLy8gY29sbGF0ZSBmb3JtXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHNpdGUub3V0ZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAvL3JlLWluaXQgaGVyZSFcbiAgICAgICAgICAgIHNpdGVJbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufSIsIi8qKlxuICogaWYgdGhlcmUgaXMgYSBkaXYgd2l0aCBJRCBmaWVsZHNUb2NcbiAqIHRoZW4gaXQgcnVuc1xuICogSXQgd2lsbCBsb29rIGZvciBhbGwgZGF0YS1maWVsZCBhbmQgY3JlYXRlIGEgRmllbGRzIFRhYmxlIG9mIENvbnRlbnRzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmllbGRzVG9jSW5pdChvbkZpcnN0SW5pdCkge1xuICAgIGNvbnN0IGZpZWxkc1RvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZHNUb2MnKVxuICAgIGlmIChmaWVsZHNUb2MpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmllbGRdJylcbiAgICAgICAgdmFyIGFycmF5T2ZTZWxlY3RvcnMgPSBbLi4uc2VsZWN0b3JzXVxuICAgICAvLyBjb25zdCBpdGVtcyA9IGFycmF5T2ZTZWxlY3RvcnMuZmlsdGVyKCh2LCBpLCBhKSA9PiBhLmluZGV4T2YodikgPT09IGkpXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW11cbiAgICAgICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgICAgIGlmIChpdGVtcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpXG4gICAgICAgIH0pXG4gICAgICAgIHZhciBjdXJyZW50U2VsZWN0aW9uID0gW11cblxuICAgICAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICB1bEVsLmlkID0gJ2ZpbHRlclVsJ1xuXG4gICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZSBpdGVtcy4uLlxuICAgICAgICBpdGVtcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICAgICAgYUVsLmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAgICAgICAgIGFFbC5hcnJheU9mU2VsZWN0b3JzID0gYXJyYXlPZlNlbGVjdG9ycztcbiAgICAgICAgICAgIGFFbC5jdXJyZW50U2VsZWN0aW9uID0gY3VycmVudFNlbGVjdGlvbjtcbiAgICAgICAgICAgIC8vIG9uIGNsaWNrXG4gICAgICAgICAgICBhRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhRWxFdmVudEhhbmRsZXIpXG5cbiAgICAgICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgICAgICBhRWwuY2xhc3NMaXN0LmFkZCgnbGluaycpXG5cbiAgICAgICAgICAgIC8vIGFwcGVuZFxuICAgICAgICAgICAgbGlzdEVsLmFwcGVuZENoaWxkKGFFbClcbiAgICAgICAgICAgIHVsRWwuYXBwZW5kQ2hpbGQobGlzdEVsKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGlzdEVsKVxuICAgICAgICB9KVxuICAgICAgICBpZiAoIW9uRmlyc3RJbml0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyVWwnKS5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgICAgIGZpZWxkc1RvYy5hcHBlbmRDaGlsZCh1bEVsKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYUVsRXZlbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgYXJyYXlPZlNlbGVjdG9ycyA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuYXJyYXlPZlNlbGVjdG9yc1xuICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb24gPSBldmVudC5jdXJyZW50VGFyZ2V0LmN1cnJlbnRTZWxlY3Rpb25cbiAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuaW5uZXJIVE1MXG4gICAgY29uc3QgdGVzdCA9IHRoaXMuaW5uZXJIVE1MXG4gICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdjdXJyZW50JylcbiAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmsnKVxuICAgIGNvbnN0IHBvcyA9IGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih0ZXN0KVxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnB1c2godmFsdWUpXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5zcGxpY2UocG9zLCAxKVxuICAgICAgICB9XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGNvbnN0IGVtcHR5ID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGggPT09IDBcbiAgICAgICAgY29uc3QgcG9zSW5DdXJyZW50ID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHZhbHVlKVxuICAgICAgICBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZhbHNlXG59IiwiaW1wb3J0IHthZGRMaW5rSW5pdH0gZnJvbSAnLi9hZGRMaW5rJztcbmltcG9ydCB7c2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0fSBmcm9tICcuL1Nob3dIaWRlQ3VycmVudFNpdGVzJztcbmltcG9ydCB7ZmllbGRzVG9jSW5pdH0gZnJvbSAnLi9maWVsZHNUb2MnO1xuXG5zaXRlSW5pdCh0cnVlKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpdGVJbml0KGZpcnN0SW5pdD1mYWxzZSkge1xuICAgIGFkZExpbmtJbml0KCk7XG4gICAgc2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0KGZpcnN0SW5pdCk7XG4gICAgZmllbGRzVG9jSW5pdChmaXJzdEluaXQpO1xufSIsInZhciBmb3JtZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJ1xuKVxuZm9yICh2YXIgSiA9IGZvcm1maWVsZHMubGVuZ3RoIC0gMTsgSiA+PSAwOyAtLUopIHtcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuXG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpXG4gIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKVxuICBmb3JtZmllbGRzW0pdLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuXG5mdW5jdGlvbiBhZGp1c3RTdHlsaW5nICh6RXZlbnQpIHtcbiAgdmFyIGlucFZhbCA9IHpFdmVudC50YXJnZXQudmFsdWVcbiAgaWYgKGlucFZhbCAmJiBpbnBWYWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCduby12YWx1ZScpXG4gIH0gZWxzZSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCduby12YWx1ZScpXG4gIH1cbn1cbiIsIlxuLy8gLy8gbm9uLXRoZW1lZCBhcHBcbi8vIGltcG9ydCAnc2l0ZS9hcHAvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy9cbi8vIC8vIHZlbmRvciBtb2R1bGVzXG4vLyBpbXBvcnQgJ3NpdGUvdmVuZG9yL215dmVuZG9yL215cGFja2FnZS9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vLyAvLyB5b3VyIHRoZW1lZCBhcHAgZmlsZXNcbi8vIGltcG9ydCAnLi9qcy9wYXJ0aWFscy9Tb21lT3RoZXJKYXZhc2NyaXB0RmlsZSc7XG5pbXBvcnQgJy4vanMvY29va2llJ1xuaW1wb3J0ICcuL2pzL2JvZHktY2xhc3MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9mb3JtJ1xuLy8gaW1wb3J0ICcuL2pzL2ltYWdlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9maWVsZHNUb2MnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvYWRkTGluaydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9pbml0RmVhdHVyZXMnIl0sIm5hbWVzIjpbImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJpbml0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJub2RlIiwiY29udGFpbnMiLCJhcHBseVRvIiwic3Vibm9kZSIsImxpIiwicGFyZW50Tm9kZSIsInN0eWxlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJsZW5ndGgiLCJzcGFuIiwiY3JlYXRlRWxlbWVudCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsInRvZ2dsZSIsImluc2VydEJlZm9yZSIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsIm9wZW4iLCJ1bHMiLCJkaXNwbGF5IiwibXlDb29raWUiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWVFUSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJlcmFzZUNvb2tpZSIsInNob3dIaWRlQ3VycmVudFNpdGVzSW5pdCIsIm9uRmlyc3RJbml0IiwiaG9sZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaG9sZGVyRXZlbnRIYW5kbGVyIiwiY2xpY2siLCJjdXJyZW50VGFyZ2V0Iiwic2hvd0N1cnJlbnQiLCJzaXRlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzaXRlIiwic2l0ZUluaXQiLCJhZGRMaW5rSW5pdCIsImJ1dHRvbnMiLCJidXR0b24iLCJhZGRMaW5rQ2xpY2siLCJkYXRhc2V0IiwiaW5wdXRhY3RpdmUiLCJpbnB1dEVsZW1lbnQiLCJ0eXBlIiwid2lkdGgiLCJrZXkiLCJpbnB1dExpbmsiLCJiZWZvcmUiLCJmb2N1cyIsImlucHV0IiwicGFyZW50RWxlbWVudCIsImxpbmsiLCJwcm90byIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInVyaSIsInVybCIsImRlc3RpbmF0aW9uIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJvdXRlckhUTUwiLCJmaWVsZHNUb2NJbml0IiwiZmllbGRzVG9jIiwic2VsZWN0b3JzIiwicXVlcnlTZWxlY3RvckFsbCIsImFycmF5T2ZTZWxlY3RvcnMiLCJpdGVtcyIsImRpdiIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJwdXNoIiwiY3VycmVudFNlbGVjdGlvbiIsInVsRWwiLCJpZCIsImxpc3RFbCIsImFFbCIsImFFbEV2ZW50SGFuZGxlciIsImhyZWYiLCJhcHBlbmRDaGlsZCIsInRlc3QiLCJwb3MiLCJzcGxpY2UiLCJwcmV2ZW50RGVmYXVsdCIsImVtcHR5IiwicG9zSW5DdXJyZW50IiwiZmlyc3RJbml0IiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIiwicmVwbGFjZSJdLCJzb3VyY2VSb290IjoiIn0=
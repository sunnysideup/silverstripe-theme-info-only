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
function fieldsTocInit(onFirstInit, currentSelection) {
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

    const ulEl = document.createElement('ul');
    ulEl.id = 'filterUl';
    const els = [];

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
        filterIterate(arrayOfSelectors, currentSelection);
        return false;
      });
      aEl.href = '#';
      aEl.classList.add('link');
      els.push(aEl);

      // append
      listEl.appendChild(aEl);
      ulEl.appendChild(listEl);
      // console.log(listEl)
    });

    if (!onFirstInit) {
      document.getElementById('filterUl').remove();
      filterIterate(arrayOfSelectors, currentSelection);
      els.forEach(aEl => {
        if (currentSelection.includes(aEl.innerHTML)) {
          aEl.classList.toggle('current');
          aEl.classList.toggle('link');
        }
      });
    }
    fieldsToc.appendChild(ulEl);
  }
}
function filterIterate(arrayOfSelectors, currentSelection) {
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



let currentFieldsFilters = [];
siteInit(true);
function siteInit(firstInit = false) {
  (0,_addLink__WEBPACK_IMPORTED_MODULE_0__.addLinkInit)();
  (0,_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_1__.showHideCurrentSitesInit)(firstInit);
  (0,_fieldsToc__WEBPACK_IMPORTED_MODULE_2__.fieldsTocInit)(firstInit, currentFieldsFilters);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxDQUFDLENBQUMsQ0FBQ3pJLGdCQUFnQixDQUFDLE9BQU8sRUFBRTBJLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDN0RGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUN6SSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUwSSxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBQzVERixVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDekksZ0JBQWdCLENBQUMsV0FBVyxFQUFFMEksYUFBYSxFQUFFLEtBQUssQ0FBQztFQUVqRSxJQUFJQyxHQUFHLEdBQUc5SSxRQUFRLENBQUMrSSxXQUFXLENBQUMsWUFBWSxDQUFDO0VBQzVDRCxHQUFHLENBQUNFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQztFQUNwQ0wsVUFBVSxDQUFDQyxDQUFDLENBQUMsQ0FBQ0ssYUFBYSxDQUFDSCxHQUFHLENBQUM7QUFDbEM7QUFFQSxTQUFTRCxhQUFhLENBQUVLLE1BQU0sRUFBRTtFQUM5QixJQUFJQyxNQUFNLEdBQUdELE1BQU0sQ0FBQzlHLE1BQU0sQ0FBQ1EsS0FBSztFQUNoQyxJQUFJdUcsTUFBTSxJQUFJQSxNQUFNLENBQUNDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDOUNGLE1BQU0sQ0FBQzlHLE1BQU0sQ0FBQy9CLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFVBQVUsQ0FBQztFQUM1QyxDQUFDLE1BQU07SUFDTDJJLE1BQU0sQ0FBQzlHLE1BQU0sQ0FBQy9CLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztFQUN6QztBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0I7QUFDSTtBQUNNO0FBQ1o7QUFDbEI7QUFDZ0M7QUFDVztBQUNiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvYm9keS1jbGFzcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb2xsYXBzaWJsZS1tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9hZGRMaW5rLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9pbml0RmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHlDbGFzcyA9IHtcblxuICBib2R5T2JqZWN0OiBudWxsLFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cbiAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgfSxcblxuICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkgXG4gIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ0RPTUNvbnRlbnRMb2FkZWQnLFxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2JlZm9yZXVubG9hZCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgfVxuICAgIClcbiAgfVxuXG59XG5cbmJvZHlDbGFzcy5pbml0KClcbiIsIi8qXG5cbkNvbGxhcHNpYmxlTGlzdHMuanNcblxuQW4gb2JqZWN0IGFsbG93aW5nIGxpc3RzIHRvIGR5bmFtaWNhbGx5IGV4cGFuZCBhbmQgY29sbGFwc2VcblxuQ3JlYXRlZCBieSBLYXRlIE1vcmxleSAtIGh0dHA6Ly9jb2RlLmlhbWthdGUuY29tLyAtIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgdGVybXNcbm9mIHRoZSBDQzAgMS4wIFVuaXZlcnNhbCBsZWdhbCBjb2RlOlxuXG5odHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvbGVnYWxjb2RlXG5cbiovXG5cbmNvbnN0IENvbGxhcHNpYmxlTGlzdHMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBNYWtlcyBhbGwgbGlzdHMgd2l0aCB0aGUgY2xhc3MgJ2NvbGxhcHNpYmxlTGlzdCcgY29sbGFwc2libGUuIFRoZVxuICAvLyBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseSAoZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBub2RlID0+IHtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHtcbiAgICAgICAgYXBwbHlUbyhub2RlLCB0cnVlKVxuXG4gICAgICAgIGlmICghZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIHN1Ym5vZGUgPT4ge1xuICAgICAgICAgICAgc3Vibm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gTWFrZXMgdGhlIHNwZWNpZmllZCBsaXN0IGNvbGxhcHNpYmxlLiBUaGUgcGFyYW1ldGVycyBhcmU6XG4gIC8vXG4gIC8vIG5vZGUgICAgICAgICAtIHRoZSBsaXN0IGVsZW1lbnRcbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5VG8gKG5vZGUsIGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLCBsaSA9PiB7XG4gICAgICBpZiAoIWRvTm90UmVjdXJzZSB8fCBub2RlID09PSBsaS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGxpLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuTW96VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5tc1VzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuV2Via2l0VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBjb25zdCB1bCA9IGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG4gICAgICAgIGlmICh1bC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgbGkpKVxuICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPiZuYnNwOzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGsDwvaT4nXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byB0b2dnbGUgYWxsIG9mIHRoZW0sIHNvbWUgdHdpY2VcbiAgICAgICAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJykgfHwgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCB1bFswXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBIYW5kbGVzIGEgY2xpY2suIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBmb3Igd2hpY2ggY2xpY2tzIGFyZSBiZWluZyBoYW5kbGVkXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrIChub2RlLCBlKSB7XG4gICAgbGV0IGxpID0gZS50YXJnZXRcbiAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgdG9nZ2xlKG5vZGUpXG4gICAgfVxuICB9XG5cbiAgLy8gT3BlbnMgb3IgY2xvc2VzIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50cyBkaXJlY3RseSB3aXRoaW4gdGhlXG4gIC8vIHNwZWNpZmllZCBub2RlLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgY29udGFpbmluZyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHNcbiAgZnVuY3Rpb24gdG9nZ2xlIChub2RlKSB7XG4gICAgY29uc3Qgb3BlbiA9IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgIGNvbnN0IHVscyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwodWxzLCB1bCA9PiB7XG4gICAgICBsZXQgbGkgPSB1bFxuICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9IChvcGVuID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICBpZiAodWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JyArIChvcGVuID8gJ09wZW4nIDogJ0Nsb3NlZCcpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGFwcGx5LCBhcHBseVRvIH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJleHBvcnQgZnVuY3Rpb24gc2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0KG9uRmlyc3RJbml0KSB7XG4gICAgY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dIaWRlQ3VycmVudCcpO1xuICAgIGlmKGhvbGRlcikge1xuICAgICAgICBob2xkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBob2xkZXJFdmVudEhhbmRsZXIsIHRydWUpO1xuICAgICAgICBob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBob2xkZXJFdmVudEhhbmRsZXIsIHRydWUpO1xuICAgIH1cbiAgICBpZiAob25GaXJzdEluaXQpIHtcbiAgICAgICAgaG9sZGVyLmNsaWNrKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBob2xkZXJFdmVudEhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBob2xkZXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHNob3dDdXJyZW50ID0gIWhvbGRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctY3VycmVudCcpO1xuICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWN1cnJlbnQnKTtcbiAgICBjb25zdCBzaXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpdGUnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlc1tpXTtcbiAgICAgICAgaWYoKHNob3dDdXJyZW50ICYmIHNpdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHx8ICFzaG93Q3VycmVudCkge1xuICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtzaXRlSW5pdH0gZnJvbSAnLi9pbml0RmVhdHVyZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaW5rSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2J1dHRvbicpO1xuICAgIC8vQWRkaW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25zW2ldO1xuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nIGxpc3RlbmVycyBqdXN0IGluIGNhc2UgKGVnIGZvciBwYXJ0aWFsIHJlc2V0cylcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhldmVudCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgLy9zbyBvbmx5IG9uZSBpbnB1dCBpcyBjcmVhdGVkXG4gICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID09IFwiZmFsc2VcIikge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FkZGxpbmtpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjI1MHB4XCJcblxuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICh7a2V5fSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudC52YWx1ZSAhPSAnJykge2lucHV0TGluayhidXR0b24sIGlucHV0RWxlbWVudC52YWx1ZSk7fVxuICAgICAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnV0dG9uLmJlZm9yZShpbnB1dEVsZW1lbnQpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvL2lucHV0IGFscmVhZHkgZXhpc3RzLCBwcmVzc2luZyBidXR0b24gYWdhaW4gc3VibWl0c1xuICAgIGVsc2Uge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBidXR0b24ucGFyZW50RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRsaW5raW5wdXQnKVswXTtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICAgICAgICBpbnB1dExpbmsoYnV0dG9uLCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGlucHV0TGluayhidXR0b24sIGxpbmspIHtcbiAgICAvLyBkZXN0aW5hdGlvblxuICAgIGNvbnN0IHByb3RvID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgIGNvbnN0IGhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIGNvbnN0IHVyaSA9IGJ1dHRvbi5kYXRhc2V0LnVybDsgXG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm90bytcIi8vXCIraG9zdG5hbWUrdXJpXG5cbiAgICAvLyBjb2xsYXRlIGZvcm1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImxpbmtcIiwgbGluayk7XG5cbiAgICAvLyBtYWtlIHJlcXVlc3RcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBkZXN0aW5hdGlvbik7XG4gICAgcmVxdWVzdC5zZW5kKGZvcm1EYXRhKTtcblxuICAgIC8vIGhhbmRsZSByZXNwb25zZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vYWZ0ZXIgcmVzcG9uc2VcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgc2l0ZS5vdXRlckhUTUwgPSByZXNwb25zZTtcbiAgICAgICAgICAgIC8vcmUtaW5pdCBoZXJlIVxuICAgICAgICAgICAgc2l0ZUluaXQoKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZHNUb2NJbml0KG9uRmlyc3RJbml0LCBjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG4gICAgaWYgKGZpZWxkc1RvYykge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWVsZF0nKVxuICAgICAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgaWYgKGl0ZW1zLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICB1bEVsLmlkID0gJ2ZpbHRlclVsJ1xuXG4gICAgICAgIGNvbnN0IGVscyA9IFtdXG5cbiAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlIGl0ZW1zLi4uXG4gICAgICAgIGl0ZW1zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgY29uc3QgYUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgICAgICBhRWwuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgICAgICAgICAgLy8gb24gY2xpY2tcbiAgICAgICAgICAgIGFFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnY3VycmVudCcpXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rJylcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodGVzdClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24uc3BsaWNlKHBvcywgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgZmlsdGVySXRlcmF0ZShhcnJheU9mU2VsZWN0b3JzLCBjdXJyZW50U2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgICAgICBhRWwuY2xhc3NMaXN0LmFkZCgnbGluaycpXG4gICAgICAgICAgICBlbHMucHVzaChhRWwpO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmRcbiAgICAgICAgICAgIGxpc3RFbC5hcHBlbmRDaGlsZChhRWwpXG4gICAgICAgICAgICB1bEVsLmFwcGVuZENoaWxkKGxpc3RFbClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3RFbClcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFvbkZpcnN0SW5pdCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlclVsJykucmVtb3ZlKClcbiAgICAgICAgICAgIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbilcbiAgICAgICAgICAgIGVscy5mb3JFYWNoKGFFbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24uaW5jbHVkZXMoYUVsLmlubmVySFRNTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgICAgICBhRWwuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBmaWVsZHNUb2MuYXBwZW5kQ2hpbGQodWxFbClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbikge1xuICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgY29uc3QgZW1wdHkgPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCA9PT0gMFxuICAgICAgICBjb25zdCBwb3NJbkN1cnJlbnQgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpXG4gICAgICAgIGlmIChlbXB0eSB8fCBwb3NJbkN1cnJlbnQgIT09IC0xKSB7XG4gICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICB9XG4gICAgfSlcbn0iLCJpbXBvcnQge2FkZExpbmtJbml0fSBmcm9tICcuL2FkZExpbmsnO1xuaW1wb3J0IHtzaG93SGlkZUN1cnJlbnRTaXRlc0luaXR9IGZyb20gJy4vU2hvd0hpZGVDdXJyZW50U2l0ZXMnO1xuaW1wb3J0IHtmaWVsZHNUb2NJbml0fSBmcm9tICcuL2ZpZWxkc1RvYyc7XG5cbmxldCBjdXJyZW50RmllbGRzRmlsdGVycyA9IFtdO1xuXG5zaXRlSW5pdCh0cnVlKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpdGVJbml0KGZpcnN0SW5pdD1mYWxzZSkge1xuICAgIGFkZExpbmtJbml0KCk7XG4gICAgc2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0KGZpcnN0SW5pdCk7XG4gICAgZmllbGRzVG9jSW5pdChmaXJzdEluaXQsIGN1cnJlbnRGaWVsZHNGaWx0ZXJzKTtcbn0iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJcbi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbi8vIGltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvZmllbGRzVG9jJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2FkZExpbmsnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzJyJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsIndpbmRvdyIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImRvTm90UmVjdXJzZSIsImZvckVhY2giLCJjYWxsIiwibm9kZSIsImNvbnRhaW5zIiwiYXBwbHlUbyIsInN1Ym5vZGUiLCJsaSIsInBhcmVudE5vZGUiLCJzdHlsZSIsInVzZXJTZWxlY3QiLCJNb3pVc2VyU2VsZWN0IiwibXNVc2VyU2VsZWN0IiwiV2Via2l0VXNlclNlbGVjdCIsInVsIiwibGVuZ3RoIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJoYW5kbGVDbGljayIsImJpbmQiLCJpbm5lckhUTUwiLCJ0b2dnbGUiLCJpbnNlcnRCZWZvcmUiLCJlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJvcGVuIiwidWxzIiwiZGlzcGxheSIsIm15Q29va2llIiwic2V0Q29va2llIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJnZXRDb29raWUiLCJuYW1lRVEiLCJjYSIsInNwbGl0IiwiaSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZXJhc2VDb29raWUiLCJzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQiLCJvbkZpcnN0SW5pdCIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhvbGRlckV2ZW50SGFuZGxlciIsImNsaWNrIiwiY3VycmVudFRhcmdldCIsInNob3dDdXJyZW50Iiwic2l0ZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic2l0ZSIsInNpdGVJbml0IiwiYWRkTGlua0luaXQiLCJidXR0b25zIiwiYnV0dG9uIiwiYWRkTGlua0NsaWNrIiwiZGF0YXNldCIsImlucHV0YWN0aXZlIiwiaW5wdXRFbGVtZW50IiwidHlwZSIsIndpZHRoIiwia2V5IiwiaW5wdXRMaW5rIiwiYmVmb3JlIiwiZm9jdXMiLCJpbnB1dCIsInBhcmVudEVsZW1lbnQiLCJsaW5rIiwicHJvdG8iLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdG5hbWUiLCJ1cmkiLCJ1cmwiLCJkZXN0aW5hdGlvbiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0Iiwib3V0ZXJIVE1MIiwiZmllbGRzVG9jSW5pdCIsImN1cnJlbnRTZWxlY3Rpb24iLCJmaWVsZHNUb2MiLCJzZWxlY3RvcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYXJyYXlPZlNlbGVjdG9ycyIsIml0ZW1zIiwiZGl2IiwiZ2V0QXR0cmlidXRlIiwidHJpbSIsInB1c2giLCJ1bEVsIiwiaWQiLCJlbHMiLCJsaXN0RWwiLCJhRWwiLCJ0ZXN0IiwicG9zIiwic3BsaWNlIiwicHJldmVudERlZmF1bHQiLCJmaWx0ZXJJdGVyYXRlIiwiaHJlZiIsImFwcGVuZENoaWxkIiwiaW5jbHVkZXMiLCJlbXB0eSIsInBvc0luQ3VycmVudCIsImN1cnJlbnRGaWVsZHNGaWx0ZXJzIiwiZmlyc3RJbml0IiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIiwicmVwbGFjZSJdLCJzb3VyY2VSb290IjoiIn0=
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
/***/ (function() {

const holder = document.getElementById('ShowHideCurrent');
if (holder) {
  holder.addEventListener('click', function () {
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
  });
  holder.click();
}

/***/ }),

/***/ "../theme-info-only/src/js/features/addLink.js":
/*!*****************************************************!*\
  !*** ../theme-info-only/src/js/features/addLink.js ***!
  \*****************************************************/
/***/ (function() {

const sites = document.getElementsByClassName('site');
const buttons = document.getElementsByClassName('addlinkbutton');

//Adding event listeners
for (var i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  button.addEventListener('click', function () {
    addLinkClick(button);
  });
}
function addLinkClick(button) {
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
      updateSiteDOM(response, button);
    }
  };
}
function updateSiteDOM(DOMtext, button) {
  //get the old and new DOM
  const changedElem = document.createElement('div');
  changedElem.innerHTML = DOMtext;
  const changedDOM = changedElem.children[0].children;
  const site = button.parentElement.parentElement;
  const siteDOM = site.children;

  //find newly added elements
  let additions = getDOMAdditions(siteDOM, changedDOM);
  for (var i = 0; i < additions.length; i++) {
    //find the right place to add them

    const superparent = findEquivalentElement(siteDOM, additions[i].parentElement.parentElement);
    const parent = findEquivalentElement(superparent.children, additions[i].parentElement);

    //add the new elements to the current page
    parent.prepend(additions[i]);
  }
}
function getDOMAdditions(oldDOMCollection, newDOMCollection) {
  let additions = [];
  let oldI = 0;
  for (var i = 0; i < newDOMCollection.length; i++) {
    if (newDOMCollection[i].isEqualNode(oldDOMCollection[oldI])) {
      //no changes made in this element
      oldI++;
    } else {
      //there is a change here, does the expected thing occur later?
      if (doesHTMLCollectionContain(newDOMCollection, oldDOMCollection[oldI])) {
        //there is an addition here, or something changed in a child here
        //if not, this is entirely new/changed
        additions.push(newDOMCollection[i]);
      }
      //are they the same without children?
      //if so, the change is there instead
      else if (areElementsEqualWithoutChildren(oldDOMCollection[oldI], newDOMCollection[i])) {
        additions.push.apply(additions, getDOMAdditions(oldDOMCollection[oldI].children, newDOMCollection[i].children));
      } else {
        //there is a deletion here
        oldI++;
        i--;
      }
    }
  }
  return additions;
}
function doesHTMLCollectionContain(collection, element) {
  for (let item of collection) {
    if (item.isEqualNode(element)) {
      return true;
    }
  }
  return false;
}
function areElementsEqualWithoutChildren(element1, element2) {
  if (element1 === undefined || element2 === undefined) {
    return false;
  }
  const first = element1.cloneNode(true);
  first.textContent = '';
  const second = element2.cloneNode(true);
  second.textContent = '';
  return first.isEqualNode(second);
}
function findEquivalentElement(collection, element) {
  for (var i = 0; i < collection.length; i++) {
    if (areElementsEqualWithoutChildren(collection[i], element)) {
      return collection[i];
    } else {
      //check children
      const childCheck = findEquivalentElement(collection[i].children, element);
      if (childCheck !== false) {
        return childCheck;
      }
    }
  }
  return false;
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
/* harmony import */ var _js_features_addLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/features/addLink */ "../theme-info-only/src/js/features/addLink.js");
/* harmony import */ var _js_features_addLink__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_features_addLink__WEBPACK_IMPORTED_MODULE_6__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTSxDQUFDUSxLQUFLO0VBQ2hDLElBQUlxSCxNQUFNLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM5Q0YsTUFBTSxDQUFDNUgsTUFBTSxDQUFDL0IsU0FBUyxDQUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzVDLENBQUMsTUFBTTtJQUNMeUosTUFBTSxDQUFDNUgsTUFBTSxDQUFDL0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQ3pDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDTTtBQUNaO0FBQ2xCO0FBQ2dDO0FBQ1ciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2FkZExpbmsuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvZmllbGRzVG9jLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5Q2xhc3MgPSB7XG5cbiAgYm9keU9iamVjdDogbnVsbCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG4gICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gIH0sXG5cbiAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIFxuICB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdET01Db250ZW50TG9hZGVkJyxcbiAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdiZWZvcmV1bmxvYWQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgLy8gcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBzdWJub2RlID0+IHtcbiAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAvL1xuICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8IGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgIHRvZ2dsZShub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgbGV0IGxpID0gdWxcbiAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAob3BlbiA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dIaWRlQ3VycmVudCcpO1xuaWYoaG9sZGVyKSB7XG4gICAgaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdjbGljaycsXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3Qgc2hvd0N1cnJlbnQgPSAhaG9sZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1jdXJyZW50Jyk7XG4gICAgICAgICAgICBob2xkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1jdXJyZW50Jyk7XG4gICAgICAgICAgICBjb25zdCBzaXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpdGUnKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXRlID0gc2l0ZXNbaV07XG4gICAgICAgICAgICAgICAgaWYoKHNob3dDdXJyZW50ICYmIHNpdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHx8ICFzaG93Q3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBzaXRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xuICAgIGhvbGRlci5jbGljaygpO1xufVxuXG4iLCJjb25zdCBzaXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpdGUnKTtcbmNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRsaW5rYnV0dG9uJyk7XG5cbi8vQWRkaW5nIGV2ZW50IGxpc3RlbmVyc1xuZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gYnV0dG9uc1tpXVxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge2FkZExpbmtDbGljayhidXR0b24pO31cbiAgICApXG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhidXR0b24pIHtcbiAgICAvL3NvIG9ubHkgb25lIGlucHV0IGlzIGNyZWF0ZWRcbiAgICBpZiAoYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWRkbGlua2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIlxuXG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKHtrZXl9KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50LnZhbHVlICE9ICcnKSB7aW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXRFbGVtZW50LnZhbHVlKTt9XG4gICAgICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBidXR0b24uYmVmb3JlKGlucHV0RWxlbWVudCk7XG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8vaW5wdXQgYWxyZWFkeSBleGlzdHMsIHByZXNzaW5nIGJ1dHRvbiBhZ2FpbiBzdWJtaXRzXG4gICAgZWxzZSB7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJmYWxzZVwiO1xuICAgICAgICBjb25zdCBpbnB1dCA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZGxpbmtpbnB1dCcpWzBdO1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgICAgIGlucHV0TGluayhidXR0b24sIGlucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gaW5wdXRMaW5rKGJ1dHRvbiwgbGluaykge1xuICAgIC8vIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgY29uc3QgdXJpID0gYnV0dG9uLmRhdGFzZXQudXJsOyBcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHByb3RvK1wiLy9cIitob3N0bmFtZSt1cmlcblxuICAgIC8vIGNvbGxhdGUgZm9ybVxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKFwibGlua1wiLCBsaW5rKTtcblxuICAgIC8vIG1ha2UgcmVxdWVzdFxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIGRlc3RpbmF0aW9uKTtcbiAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpO1xuXG4gICAgLy8gaGFuZGxlIHJlc3BvbnNlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9hZnRlciByZXNwb25zZVxuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdXBkYXRlU2l0ZURPTShyZXNwb25zZSwgYnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNpdGVET00oRE9NdGV4dCwgYnV0dG9uKSB7XG4gICAgLy9nZXQgdGhlIG9sZCBhbmQgbmV3IERPTVxuICAgIGNvbnN0IGNoYW5nZWRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2hhbmdlZEVsZW0uaW5uZXJIVE1MID0gRE9NdGV4dDtcbiAgICBjb25zdCBjaGFuZ2VkRE9NID0gY2hhbmdlZEVsZW0uY2hpbGRyZW5bMF0uY2hpbGRyZW47XG4gICAgY29uc3Qgc2l0ZSA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3Qgc2l0ZURPTSA9IHNpdGUuY2hpbGRyZW47XG5cbiAgICAvL2ZpbmQgbmV3bHkgYWRkZWQgZWxlbWVudHNcbiAgICBsZXQgYWRkaXRpb25zID0gZ2V0RE9NQWRkaXRpb25zKHNpdGVET00sIGNoYW5nZWRET00pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy9maW5kIHRoZSByaWdodCBwbGFjZSB0byBhZGQgdGhlbVxuXG4gICAgICAgIGNvbnN0IHN1cGVycGFyZW50ID0gZmluZEVxdWl2YWxlbnRFbGVtZW50KHNpdGVET00sIGFkZGl0aW9uc1tpXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBmaW5kRXF1aXZhbGVudEVsZW1lbnQoc3VwZXJwYXJlbnQuY2hpbGRyZW4sIGFkZGl0aW9uc1tpXS5wYXJlbnRFbGVtZW50KTtcblxuICAgICAgICAvL2FkZCB0aGUgbmV3IGVsZW1lbnRzIHRvIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgcGFyZW50LnByZXBlbmQoYWRkaXRpb25zW2ldKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERPTUFkZGl0aW9ucyhvbGRET01Db2xsZWN0aW9uLCBuZXdET01Db2xsZWN0aW9uKSB7XG4gICAgbGV0IGFkZGl0aW9ucyA9IFtdO1xuXG4gICAgbGV0IG9sZEkgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3RE9NQ29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobmV3RE9NQ29sbGVjdGlvbltpXS5pc0VxdWFsTm9kZShvbGRET01Db2xsZWN0aW9uW29sZEldKSkge1xuICAgICAgICAgICAgLy9ubyBjaGFuZ2VzIG1hZGUgaW4gdGhpcyBlbGVtZW50XG4gICAgICAgICAgICBvbGRJKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL3RoZXJlIGlzIGEgY2hhbmdlIGhlcmUsIGRvZXMgdGhlIGV4cGVjdGVkIHRoaW5nIG9jY3VyIGxhdGVyP1xuICAgICAgICAgICAgaWYgKGRvZXNIVE1MQ29sbGVjdGlvbkNvbnRhaW4obmV3RE9NQ29sbGVjdGlvbiwgb2xkRE9NQ29sbGVjdGlvbltvbGRJXSkpIHtcbiAgICAgICAgICAgICAgICAvL3RoZXJlIGlzIGFuIGFkZGl0aW9uIGhlcmUsIG9yIHNvbWV0aGluZyBjaGFuZ2VkIGluIGEgY2hpbGQgaGVyZVxuICAgICAgICAgICAgICAgIC8vaWYgbm90LCB0aGlzIGlzIGVudGlyZWx5IG5ldy9jaGFuZ2VkXG4gICAgICAgICAgICAgICAgYWRkaXRpb25zLnB1c2gobmV3RE9NQ29sbGVjdGlvbltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2FyZSB0aGV5IHRoZSBzYW1lIHdpdGhvdXQgY2hpbGRyZW4/XG4gICAgICAgICAgICAvL2lmIHNvLCB0aGUgY2hhbmdlIGlzIHRoZXJlIGluc3RlYWRcbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZUVsZW1lbnRzRXF1YWxXaXRob3V0Q2hpbGRyZW4ob2xkRE9NQ29sbGVjdGlvbltvbGRJXSwgbmV3RE9NQ29sbGVjdGlvbltpXSkpIHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbnMucHVzaC5hcHBseShhZGRpdGlvbnMsIGdldERPTUFkZGl0aW9ucyhvbGRET01Db2xsZWN0aW9uW29sZEldLmNoaWxkcmVuLCBuZXdET01Db2xsZWN0aW9uW2ldLmNoaWxkcmVuKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoZXJlIGlzIGEgZGVsZXRpb24gaGVyZVxuICAgICAgICAgICAgICAgIG9sZEkrKztcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWRkaXRpb25zO1xufVxuXG5mdW5jdGlvbiBkb2VzSFRNTENvbGxlY3Rpb25Db250YWluKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcXVhbE5vZGUoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYXJlRWxlbWVudHNFcXVhbFdpdGhvdXRDaGlsZHJlbihlbGVtZW50MSwgZWxlbWVudDIpIHtcbiAgICBpZiAoZWxlbWVudDEgPT09IHVuZGVmaW5lZCB8fCBlbGVtZW50MiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZmlyc3QgPSBlbGVtZW50MS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgZmlyc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICBjb25zdCBzZWNvbmQgPSBlbGVtZW50Mi5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgc2Vjb25kLnRleHRDb250ZW50ID0gJyc7XG4gICAgcmV0dXJuIGZpcnN0LmlzRXF1YWxOb2RlKHNlY29uZCk7XG59XG5cbmZ1bmN0aW9uIGZpbmRFcXVpdmFsZW50RWxlbWVudChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmVFbGVtZW50c0VxdWFsV2l0aG91dENoaWxkcmVuKGNvbGxlY3Rpb25baV0sIGVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbltpXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vY2hlY2sgY2hpbGRyZW5cbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ2hlY2sgPSBmaW5kRXF1aXZhbGVudEVsZW1lbnQoY29sbGVjdGlvbltpXS5jaGlsZHJlbiwgZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoY2hpbGRDaGVjayAhPT0gZmFsc2UpIHtyZXR1cm4gY2hpbGRDaGVjazt9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufSIsIi8qKlxuICogaWYgdGhlcmUgaXMgYSBkaXYgd2l0aCBJRCBmaWVsZHNUb2NcbiAqIHRoZW4gaXQgcnVuc1xuICogSXQgd2lsbCBsb29rIGZvciBhbGwgZGF0YS1maWVsZCBhbmQgY3JlYXRlIGEgRmllbGRzIFRhYmxlIG9mIENvbnRlbnRzXG4gKlxuICovXG5jb25zdCBmaWVsZHNUb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmllbGRzVG9jJylcbmlmIChmaWVsZHNUb2MpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWVsZF0nKVxuICAgIHZhciBhcnJheU9mU2VsZWN0b3JzID0gWy4uLnNlbGVjdG9yc11cbiAgICAvLyBjb25zdCBpdGVtcyA9IGFycmF5T2ZTZWxlY3RvcnMuZmlsdGVyKCh2LCBpLCBhKSA9PiBhLmluZGV4T2YodikgPT09IGkpXG4gICAgY29uc3QgaXRlbXMgPSBbXVxuICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgaWYgKGl0ZW1zLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSlcbiAgICB9KVxuICAgIHZhciBjdXJyZW50U2VsZWN0aW9uID0gW11cblxuICAgIGNvbnN0IHVsRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICAvLyBmb3IgZWFjaCBvZiB0aGUgaXRlbXMuLi5cbiAgICBpdGVtcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBjb25zdCBhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICAgICAgYUVsLmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAgICAgLy8gb24gY2xpY2tcbiAgICAgICAgYUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCB0ZXN0ID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnY3VycmVudCcpXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmsnKVxuICAgICAgICAgICAgY29uc3QgcG9zID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHRlc3QpXG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24ucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24uc3BsaWNlKHBvcywgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eSA9IGN1cnJlbnRTZWxlY3Rpb24ubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zSW5DdXJyZW50ID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHZhbHVlKVxuICAgICAgICAgICAgICAgIGlmIChlbXB0eSB8fCBwb3NJbkN1cnJlbnQgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJydcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgICBhRWwuaHJlZiA9ICcjJ1xuICAgICAgICBhRWwuY2xhc3NMaXN0LmFkZCgnbGluaycpXG5cbiAgICAgICAgLy8gYXBwZW5kXG4gICAgICAgIGxpc3RFbC5hcHBlbmRDaGlsZChhRWwpXG4gICAgICAgIHVsRWwuYXBwZW5kQ2hpbGQobGlzdEVsKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsaXN0RWwpXG4gICAgfSlcbiAgICBmaWVsZHNUb2MuYXBwZW5kQ2hpbGQodWxFbClcbn1cbiIsInZhciBmb3JtZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJ1xuKVxuZm9yICh2YXIgSiA9IGZvcm1maWVsZHMubGVuZ3RoIC0gMTsgSiA+PSAwOyAtLUopIHtcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuXG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpXG4gIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKVxuICBmb3JtZmllbGRzW0pdLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuXG5mdW5jdGlvbiBhZGp1c3RTdHlsaW5nICh6RXZlbnQpIHtcbiAgdmFyIGlucFZhbCA9IHpFdmVudC50YXJnZXQudmFsdWVcbiAgaWYgKGlucFZhbCAmJiBpbnBWYWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCduby12YWx1ZScpXG4gIH0gZWxzZSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCduby12YWx1ZScpXG4gIH1cbn1cbiIsIlxuLy8gLy8gbm9uLXRoZW1lZCBhcHBcbi8vIGltcG9ydCAnc2l0ZS9hcHAvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy9cbi8vIC8vIHZlbmRvciBtb2R1bGVzXG4vLyBpbXBvcnQgJ3NpdGUvdmVuZG9yL215dmVuZG9yL215cGFja2FnZS9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vLyAvLyB5b3VyIHRoZW1lZCBhcHAgZmlsZXNcbi8vIGltcG9ydCAnLi9qcy9wYXJ0aWFscy9Tb21lT3RoZXJKYXZhc2NyaXB0RmlsZSc7XG5pbXBvcnQgJy4vanMvY29va2llJ1xuaW1wb3J0ICcuL2pzL2JvZHktY2xhc3MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9mb3JtJ1xuLy8gaW1wb3J0ICcuL2pzL2ltYWdlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9maWVsZHNUb2MnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvYWRkTGluayciXSwibmFtZXMiOlsiYm9keUNsYXNzIiwiYm9keU9iamVjdCIsImluaXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkb2N1bWVudEVsZW1lbnQiLCJ3aW5kb3ciLCJDb2xsYXBzaWJsZUxpc3RzIiwiYXBwbHkiLCJkb05vdFJlY3Vyc2UiLCJmb3JFYWNoIiwiY2FsbCIsIm5vZGUiLCJjb250YWlucyIsImFwcGx5VG8iLCJzdWJub2RlIiwibGkiLCJwYXJlbnROb2RlIiwic3R5bGUiLCJ1c2VyU2VsZWN0IiwiTW96VXNlclNlbGVjdCIsIm1zVXNlclNlbGVjdCIsIldlYmtpdFVzZXJTZWxlY3QiLCJ1bCIsImxlbmd0aCIsInNwYW4iLCJjcmVhdGVFbGVtZW50IiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiaW5uZXJIVE1MIiwidG9nZ2xlIiwiaW5zZXJ0QmVmb3JlIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwib3BlbiIsInVscyIsImRpc3BsYXkiLCJteUNvb2tpZSIsInNldENvb2tpZSIsIm5hbWUiLCJ2YWx1ZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwiZ2V0Q29va2llIiwibmFtZUVRIiwiY2EiLCJzcGxpdCIsImkiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImVyYXNlQ29va2llIiwiaG9sZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNpdGUiLCJjbGljayIsImJ1dHRvbnMiLCJidXR0b24iLCJhZGRMaW5rQ2xpY2siLCJkYXRhc2V0IiwiaW5wdXRhY3RpdmUiLCJpbnB1dEVsZW1lbnQiLCJ0eXBlIiwid2lkdGgiLCJrZXkiLCJpbnB1dExpbmsiLCJiZWZvcmUiLCJmb2N1cyIsImlucHV0IiwicGFyZW50RWxlbWVudCIsImxpbmsiLCJwcm90byIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInVyaSIsInVybCIsImRlc3RpbmF0aW9uIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJ1cGRhdGVTaXRlRE9NIiwiRE9NdGV4dCIsImNoYW5nZWRFbGVtIiwiY2hhbmdlZERPTSIsImNoaWxkcmVuIiwic2l0ZURPTSIsImFkZGl0aW9ucyIsImdldERPTUFkZGl0aW9ucyIsInN1cGVycGFyZW50IiwiZmluZEVxdWl2YWxlbnRFbGVtZW50IiwicGFyZW50IiwicHJlcGVuZCIsIm9sZERPTUNvbGxlY3Rpb24iLCJuZXdET01Db2xsZWN0aW9uIiwib2xkSSIsImlzRXF1YWxOb2RlIiwiZG9lc0hUTUxDb2xsZWN0aW9uQ29udGFpbiIsInB1c2giLCJhcmVFbGVtZW50c0VxdWFsV2l0aG91dENoaWxkcmVuIiwiY29sbGVjdGlvbiIsImVsZW1lbnQiLCJpdGVtIiwiZWxlbWVudDEiLCJlbGVtZW50MiIsInVuZGVmaW5lZCIsImZpcnN0IiwiY2xvbmVOb2RlIiwidGV4dENvbnRlbnQiLCJzZWNvbmQiLCJjaGlsZENoZWNrIiwiZmllbGRzVG9jIiwic2VsZWN0b3JzIiwicXVlcnlTZWxlY3RvckFsbCIsImFycmF5T2ZTZWxlY3RvcnMiLCJpdGVtcyIsImRpdiIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJjdXJyZW50U2VsZWN0aW9uIiwidWxFbCIsImxpc3RFbCIsImFFbCIsInRlc3QiLCJwb3MiLCJzcGxpY2UiLCJwcmV2ZW50RGVmYXVsdCIsImVtcHR5IiwicG9zSW5DdXJyZW50IiwiaHJlZiIsImFwcGVuZENoaWxkIiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIiwicmVwbGFjZSJdLCJzb3VyY2VSb290IjoiIn0=
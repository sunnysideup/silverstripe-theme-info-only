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

const buttonTemplate = '<button data-id="x" data-inputactive="false">+</button>';
const sites = document.getElementsByClassName('site');
for (var i = 0; i < sites.length; i++) {
  const site = sites[i];

  // create html div
  const newElement = document.createElement('div');
  newElement.innerHTML = buttonTemplate.replace('x', site.dataset.id);

  // find the appropriate place to add 
  site.children[0].before(newElement);

  // add listener
  site.children[0].children[0].addEventListener('click', function () {
    addLinkClick(site);
  });

  //add styling classes
  site.children[0].children[0].classList.add('AddLinkButton');
  newElement.classList.add('AddLinkDiv');
}
function addLinkClick(site) {
  const button = site.children[0].getElementsByClassName('AddLinkButton')[0];
  //so only one input is created
  if (button.dataset.inputactive == "false") {
    button.dataset.inputactive = "true";
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('AddLinkInput');
    inputElement.addEventListener("keyup", ({
      key
    }) => {
      if (key === "Enter") {
        if (inputElement.value != '') {
          inputLink(site, inputElement.value);
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
    const input = site.children[0].getElementsByClassName('AddLinkInput')[0];
    if (input.value != '') {
      inputLink(site, input.value);
    }
    input.remove();
  }
}
function inputLink(site, link) {
  // destination
  const proto = window.location.protocol;
  const hostname = window.location.hostname;
  const uri = document.getElementsByTagName('body')[0].dataset.link;
  const destination = proto + "//" + hostname + uri + "addlink";
  // values
  const id = site.dataset.id;
  // link is here already ..

  // collate form
  const formData = new FormData();
  formData.append("id", id);
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
      updateSiteDOM(id, response);
    }
  };
}
function updateSiteDOM(id, DOMtext) {
  let site;
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].dataset.id == id) {
      site = sites[i];
    }
  }
  site.innerHTML = DOMtext;
}

//CSS for button and input

const styles = `
    .AddLinkButton {
        appearance: none;
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
        margin-left:0.5em;
    }

    .AddLinkButton:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
    }

    .AddLinkButton:hover {
    background-color: #2c974b;
    }

    .AddLinkButton:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
    }

    .AddLinkButton:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
    }

    .AddLinkButton:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
    }

    .AddLinkDiv {
        float: right;
        margin-top: 1em;
    }
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ3RHLE1BQU0sQ0FBQy9CLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztFQUN6QztBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ007QUFDWjtBQUNsQjtBQUNnQztBQUNXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvYm9keS1jbGFzcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb2xsYXBzaWJsZS1tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9hZGRMaW5rLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mb3JtLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9keUNsYXNzID0ge1xuXG4gIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuICAgIHRoaXMuYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMoKVxuICB9LFxuXG4gIGFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSBcbiAge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnRE9NQ29udGVudExvYWRlZCcsXG4gICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS1sb2FkZWQnKVxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RvdWNoJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnYmVmb3JldW5sb2FkJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICB9XG4gICAgKVxuICB9XG5cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiLypcblxuQ29sbGFwc2libGVMaXN0cy5qc1xuXG5BbiBvYmplY3QgYWxsb3dpbmcgbGlzdHMgdG8gZHluYW1pY2FsbHkgZXhwYW5kIGFuZCBjb2xsYXBzZVxuXG5DcmVhdGVkIGJ5IEthdGUgTW9ybGV5IC0gaHR0cDovL2NvZGUuaWFta2F0ZS5jb20vIC0gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtc1xub2YgdGhlIENDMCAxLjAgVW5pdmVyc2FsIGxlZ2FsIGNvZGU6XG5cbmh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9sZWdhbGNvZGVcblxuKi9cblxuY29uc3QgQ29sbGFwc2libGVMaXN0cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIE1ha2VzIGFsbCBsaXN0cyB3aXRoIHRoZSBjbGFzcyAnY29sbGFwc2libGVMaXN0JyBjb2xsYXBzaWJsZS4gVGhlXG4gIC8vIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5IChkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkge1xuICAgICAgICBhcHBseVRvKG5vZGUsIHRydWUpXG5cbiAgICAgICAgaWYgKCFkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgc3Vibm9kZSA9PiB7XG4gICAgICAgICAgICBzdWJub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBNYWtlcyB0aGUgc3BlY2lmaWVkIGxpc3QgY29sbGFwc2libGUuIFRoZSBwYXJhbWV0ZXJzIGFyZTpcbiAgLy9cbiAgLy8gbm9kZSAgICAgICAgIC0gdGhlIGxpc3QgZWxlbWVudFxuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHlUbyAobm9kZSwgZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksIGxpID0+IHtcbiAgICAgIGlmICghZG9Ob3RSZWN1cnNlIHx8IG5vZGUgPT09IGxpLnBhcmVudE5vZGUpIHtcbiAgICAgICAgbGkuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLm1zVXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5XZWJraXRVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGNvbnN0IHVsID0gbGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcbiAgICAgICAgaWYgKHVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBsaSkpXG4gICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+Jm5ic3A7PC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oawPC9pPidcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRvZ2dsZSBhbGwgb2YgdGhlbSwgc29tZSB0d2ljZVxuICAgICAgICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKSB8fCBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIHVsWzBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEhhbmRsZXMgYSBjbGljay4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGZvciB3aGljaCBjbGlja3MgYXJlIGJlaW5nIGhhbmRsZWRcbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKG5vZGUsIGUpIHtcbiAgICBsZXQgbGkgPSBlLnRhcmdldFxuICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgfVxuXG4gICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICB0b2dnbGUobm9kZSlcbiAgICB9XG4gIH1cblxuICAvLyBPcGVucyBvciBjbG9zZXMgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzIGRpcmVjdGx5IHdpdGhpbiB0aGVcbiAgLy8gc3BlY2lmaWVkIG5vZGUuIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50c1xuICBmdW5jdGlvbiB0b2dnbGUgKG5vZGUpIHtcbiAgICBjb25zdCBvcGVuID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgY29uc3QgdWxzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKTtcblxuICAgIFtdLmZvckVhY2guY2FsbCh1bHMsIHVsID0+IHtcbiAgICAgIGxldCBsaSA9IHVsXG4gICAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gKG9wZW4gPyAnYmxvY2snIDogJ25vbmUnKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgIGlmICh1bHMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnICsgKG9wZW4gPyAnT3BlbicgOiAnQ2xvc2VkJykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYXBwbHksIGFwcGx5VG8gfVxufSkoKVxuXG5Db2xsYXBzaWJsZUxpc3RzLmFwcGx5KClcbiIsImNvbnN0IG15Q29va2llID0ge1xuXG4gIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgdmFyIGV4cGlyZXMgPSAnJ1xuICAgIGlmICh0eXBlb2YgZGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRheXMgPSAxNFxuICAgIH1cbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKVxuICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKVxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSArIGV4cGlyZXMgKyAnOyBwYXRoPS8nXG4gIH0sXG5cbiAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JylcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNhW2ldXG4gICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIGVyYXNlQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIG15Q29va2llLnNldENvb2tpZShuYW1lLCBudWxsLCAwKVxuICB9XG59XG5cbmV4cG9ydCB7IG15Q29va2llIH1cbiIsImNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93SGlkZUN1cnJlbnQnKTtcbmlmKGhvbGRlcikge1xuICAgIGhvbGRlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHNob3dDdXJyZW50ID0gIWhvbGRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3ctY3VycmVudCcpO1xuICAgICAgICAgICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctY3VycmVudCcpO1xuICAgICAgICAgICAgY29uc3Qgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaXRlJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzW2ldO1xuICAgICAgICAgICAgICAgIGlmKChzaG93Q3VycmVudCAmJiBzaXRlLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB8fCAhc2hvd0N1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbiAgICBob2xkZXIuY2xpY2soKTtcbn1cblxuIiwiY29uc3QgYnV0dG9uVGVtcGxhdGUgPSAgJzxidXR0b24gZGF0YS1pZD1cInhcIiBkYXRhLWlucHV0YWN0aXZlPVwiZmFsc2VcIj4rPC9idXR0b24+J1xuXG5jb25zdCBzaXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NpdGUnKTtcbmZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzaXRlID0gc2l0ZXNbaV07XG4gICAgXG4gICAgLy8gY3JlYXRlIGh0bWwgZGl2XG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gYnV0dG9uVGVtcGxhdGUucmVwbGFjZSgneCcsc2l0ZS5kYXRhc2V0LmlkKVxuICAgIFxuICAgIC8vIGZpbmQgdGhlIGFwcHJvcHJpYXRlIHBsYWNlIHRvIGFkZCBcbiAgICBzaXRlLmNoaWxkcmVuWzBdLmJlZm9yZShuZXdFbGVtZW50KVxuXG4gICAgLy8gYWRkIGxpc3RlbmVyXG4gICAgc2l0ZS5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLCBcbiAgICAgICAgZnVuY3Rpb24oKSB7YWRkTGlua0NsaWNrKHNpdGUpO31cbiAgICAgICAgKVxuICAgIFxuICAgIC8vYWRkIHN0eWxpbmcgY2xhc3Nlc1xuICAgIHNpdGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uY2xhc3NMaXN0LmFkZCgnQWRkTGlua0J1dHRvbicpO1xuICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnQWRkTGlua0RpdicpXG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhzaXRlKSB7XG4gICAgY29uc3QgYnV0dG9uID0gc2l0ZS5jaGlsZHJlblswXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdBZGRMaW5rQnV0dG9uJylbMF07XG4gICAgLy9zbyBvbmx5IG9uZSBpbnB1dCBpcyBjcmVhdGVkXG4gICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID09IFwiZmFsc2VcIikge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ0FkZExpbmtJbnB1dCcpO1xuXG4gICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKHtrZXl9KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRFbGVtZW50LnZhbHVlICE9ICcnKSB7aW5wdXRMaW5rKHNpdGUsIGlucHV0RWxlbWVudC52YWx1ZSk7fVxuICAgICAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnV0dG9uLmJlZm9yZShpbnB1dEVsZW1lbnQpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvL2lucHV0IGFscmVhZHkgZXhpc3RzLCBwcmVzc2luZyBidXR0b24gYWdhaW4gc3VibWl0c1xuICAgIGVsc2Uge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBzaXRlLmNoaWxkcmVuWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0FkZExpbmtJbnB1dCcpWzBdO1xuICAgICAgICBpZiAoaW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgICAgIGlucHV0TGluayhzaXRlLCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGlucHV0TGluayhzaXRlLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmRhdGFzZXQubGluaztcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHByb3RvK1wiLy9cIitob3N0bmFtZSt1cmkrXCJhZGRsaW5rXCJcbiAgICAvLyB2YWx1ZXNcbiAgICBjb25zdCBpZCA9IHNpdGUuZGF0YXNldC5pZFxuICAgIC8vIGxpbmsgaXMgaGVyZSBhbHJlYWR5IC4uXG5cbiAgICAvLyBjb2xsYXRlIGZvcm1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImlkXCIsIGlkKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuICAgIFxuICAgIC8vIG1ha2UgcmVxdWVzdFxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICByZXF1ZXN0Lm9wZW4oXCJQT1NUXCIsIGRlc3RpbmF0aW9uKTtcbiAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpO1xuXG4gICAgLy8gaGFuZGxlIHJlc3BvbnNlXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9hZnRlciByZXNwb25zZVxuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgdXBkYXRlU2l0ZURPTShpZCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l0ZURPTShpZCwgRE9NdGV4dCkge1xuICAgIGxldCBzaXRlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNpdGVzW2ldLmRhdGFzZXQuaWQgPT0gaWQpIHtcbiAgICAgICAgICAgIHNpdGU9c2l0ZXNbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaXRlLmlubmVySFRNTD1ET010ZXh0XG59XG5cbi8vQ1NTIGZvciBidXR0b24gYW5kIGlucHV0XG5cbmNvbnN0IHN0eWxlcyA9IGBcbiAgICAuQWRkTGlua0J1dHRvbiB7XG4gICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyZWE0NGY7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjcsIDMxLCAzNSwgLjE1KTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgICBib3gtc2hhZG93OiByZ2JhKDI3LCAzMSwgMzUsIC4xKSAwIDFweCAwO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLHN5c3RlbS11aSxcIlNlZ29lIFVJXCIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWYsXCJBcHBsZSBDb2xvciBFbW9qaVwiLFwiU2Vnb2UgVUkgRW1vamlcIjtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgcGFkZGluZzogNnB4IDE2cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6MC41ZW07XG4gICAgfVxuXG4gICAgLkFkZExpbmtCdXR0b246Zm9jdXM6bm90KDpmb2N1cy12aXNpYmxlKTpub3QoLmZvY3VzLXZpc2libGUpIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgfVxuXG4gICAgLkFkZExpbmtCdXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzk3NGI7XG4gICAgfVxuXG4gICAgLkFkZExpbmtCdXR0b246Zm9jdXMge1xuICAgIGJveC1zaGFkb3c6IHJnYmEoNDYsIDE2NCwgNzksIC40KSAwIDAgMCAzcHg7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG5cbiAgICAuQWRkTGlua0J1dHRvbjpkaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk0ZDNhMjtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjcsIDMxLCAzNSwgLjEpO1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIC44KTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgfVxuXG4gICAgLkFkZExpbmtCdXR0b246YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjk4ZTQ2O1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMjAsIDcwLCAzMiwgLjIpIDAgMXB4IDAgaW5zZXQ7XG4gICAgfVxuXG4gICAgLkFkZExpbmtEaXYge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgIG1hcmdpbi10b3A6IDFlbTtcbiAgICB9XG5gXG5jb25zdCBzdHlsZVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuc3R5bGVTaGVldC5pbm5lclRleHQgPSBzdHlsZXM7XG5kb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpIiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cblxuY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG5pZiAoZmllbGRzVG9jKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmllbGRdJylcbiAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgLy8gY29uc3QgaXRlbXMgPSBhcnJheU9mU2VsZWN0b3JzLmZpbHRlcigodiwgaSwgYSkgPT4gYS5pbmRleE9mKHYpID09PSBpKVxuICAgIGNvbnN0IGl0ZW1zID0gW11cbiAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGlmIChpdGVtcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpXG4gICAgfSlcbiAgICB2YXIgY3VycmVudFNlbGVjdGlvbiA9IFtdXG5cbiAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgLy8gZm9yIGVhY2ggb2YgdGhlIGl0ZW1zLi4uXG4gICAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgYUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGFFbC5pbm5lckhUTUwgPSB2YWx1ZVxuXG4gICAgICAgIC8vIG9uIGNsaWNrXG4gICAgICAgIGFFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc3QgdGVzdCA9IHRoaXMuaW5uZXJIVE1MXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rJylcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih0ZXN0KVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnB1c2godmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnNwbGljZShwb3MsIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc0luQ3VycmVudCA9IGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih2YWx1ZSlcbiAgICAgICAgICAgICAgICBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgYUVsLmhyZWYgPSAnIydcbiAgICAgICAgYUVsLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKVxuXG4gICAgICAgIC8vIGFwcGVuZFxuICAgICAgICBsaXN0RWwuYXBwZW5kQ2hpbGQoYUVsKVxuICAgICAgICB1bEVsLmFwcGVuZENoaWxkKGxpc3RFbClcbiAgICAgICAgLy8gY29uc29sZS5sb2cobGlzdEVsKVxuICAgIH0pXG4gICAgZmllbGRzVG9jLmFwcGVuZENoaWxkKHVsRWwpXG59XG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJcbi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbi8vIGltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvZmllbGRzVG9jJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2FkZExpbmsnIl0sIm5hbWVzIjpbImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJpbml0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJub2RlIiwiY29udGFpbnMiLCJhcHBseVRvIiwic3Vibm9kZSIsImxpIiwicGFyZW50Tm9kZSIsInN0eWxlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJsZW5ndGgiLCJzcGFuIiwiY3JlYXRlRWxlbWVudCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsInRvZ2dsZSIsImluc2VydEJlZm9yZSIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsIm9wZW4iLCJ1bHMiLCJkaXNwbGF5IiwibXlDb29raWUiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWVFUSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJlcmFzZUNvb2tpZSIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwic2hvd0N1cnJlbnQiLCJzaXRlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzaXRlIiwiY2xpY2siLCJidXR0b25UZW1wbGF0ZSIsIm5ld0VsZW1lbnQiLCJyZXBsYWNlIiwiZGF0YXNldCIsImlkIiwiY2hpbGRyZW4iLCJiZWZvcmUiLCJhZGRMaW5rQ2xpY2siLCJidXR0b24iLCJpbnB1dGFjdGl2ZSIsImlucHV0RWxlbWVudCIsInR5cGUiLCJrZXkiLCJpbnB1dExpbmsiLCJmb2N1cyIsImlucHV0IiwibGluayIsInByb3RvIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3RuYW1lIiwidXJpIiwiZGVzdGluYXRpb24iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsInVwZGF0ZVNpdGVET00iLCJET010ZXh0Iiwic3R5bGVzIiwic3R5bGVTaGVldCIsImlubmVyVGV4dCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsImN1cnJlbnRTZWxlY3Rpb24iLCJ1bEVsIiwibGlzdEVsIiwiYUVsIiwidGVzdCIsInBvcyIsInNwbGljZSIsInByZXZlbnREZWZhdWx0IiwiZW1wdHkiLCJwb3NJbkN1cnJlbnQiLCJocmVmIiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIl0sInNvdXJjZVJvb3QiOiIifQ==
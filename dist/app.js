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
  if (onFirstInit && document.getElementsByClassName('current').length > 0) {
    //automatically apply current filter if at least one site would be displayed
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
      site.classList.remove("hide-not-current");
    } else {
      site.classList.add("hide-not-current");
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
    inputElement.style.float = "right";
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

/***/ "../theme-info-only/src/js/features/menu.js":
/*!**************************************************!*\
  !*** ../theme-info-only/src/js/features/menu.js ***!
  \**************************************************/
/***/ (function() {

window.onload = function () {
  const menuItems = document.getElementsByClassName('menu-holder');
  for (var i = 0; i < menuItems.length; i++) {
    const menuItem = menuItems[i];
    menuItem.onclick = function (e) {
      if (e.target !== this) {
        return;
      }
      this.classList.toggle('on');
    };
  }
};
const source = document.getElementById('find-box');
const inputHandler = function (e) {
  const value = e.target.value;
  var sites = document.getElementsByClassName("site");
  let prefixMatches = [];
  let substringMatches = [];
  for (var i = 0; i < sites.length; i++) {
    const site = sites.item(i);
    const id = site.id;
    const res = id.substring(5).indexOf(value);
    if (!value) {
      site.classList.remove('show');
      site.classList.remove('hidden');
    } else if (res === 0) {
      //console.log(value + '=' + id + '- show' )
      prefixMatches.push(site);
    } else {
      //console.log(value + '=' + id + '- hide' )
      site.classList.remove('show');
      site.classList.add('hidden');
      if (res != -1) {
        substringMatches.push(site);
      }
    }
  }
  if (prefixMatches.length > 0) {
    for (var i = 0; i < prefixMatches.length; i++) {
      prefixMatches[i].classList.add('show');
      prefixMatches[i].classList.remove('hidden');
    }
  } else if (substringMatches.length > 0) {
    for (var i = 0; i < substringMatches.length; i++) {
      substringMatches[i].classList.add('show');
      substringMatches[i].classList.remove('hidden');
    }
  }

  //display xx/yy
  const resultDiv = document.getElementById("SearchResult");
  if (prefixMatches.length > 0) {
    resultDiv.innerHTML = prefixMatches.length + "/" + sites.length;
  } else if (substringMatches.length > 0) {
    resultDiv.innerHTML = substringMatches.length + "/" + sites.length;
  } else {
    resultDiv.innerHTML = "";
  }
};
source.addEventListener('input', inputHandler);

/***/ }),

/***/ "../theme-info-only/src/js/features/stats.js":
/*!***************************************************!*\
  !*** ../theme-info-only/src/js/features/stats.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "refreshStats": function() { return /* binding */ refreshStats; }
/* harmony export */ });
let calcStats = {};
refreshStats();
function refreshStats() {
  calculateStats();
  displayStats();
}
function calculateStats() {
  calcStats = {
    totalSites: 0,
    sitesWithCurrentProject: 0,
    totalProjects: 0,
    activeProjects: 0,
    projectHoursLeft: 0,
    projectDaysLeft: 0,
    completeDate: new Date()
  };
  //count site stats
  for (var i = 0; i < window.stats.sites.length; i++) {
    const site = window.stats.sites[i];
    calcStats.totalSites++;
    if (site.isCurrent) {
      calcStats.sitesWithCurrentProject++;
    }
  }
  //count project stats
  for (var i = 0; i < window.stats.projects.length; i++) {
    const project = window.stats.projects[i];
    calcStats.totalProjects++;
    calcStats.projectHoursLeft += project.HoursLeft;
    calcStats.projectDaysLeft = Math.round(calcStats.projectHoursLeft / 5);
    calcStats.completeDate = new Date(new Date().getTime() + calcStats.projectDaysLeft * 24 * 60 * 60 * 1000);
    if (project.isActive) {
      calcStats.activeProjects++;
    }
  }
}
function displayStats() {
  document.getElementById("stats-total-sites").innerHTML = calcStats.totalSites;
  document.getElementById("stats-current-sites").innerHTML = calcStats.sitesWithCurrentProject;
  document.getElementById("stats-inactive-sites").innerHTML = calcStats.totalSites - calcStats.sitesWithCurrentProject;
  document.getElementById("stats-total-projects").innerHTML = calcStats.totalProjects;
  document.getElementById("stats-active-projects").innerHTML = calcStats.activeProjects;
  document.getElementById("stats-past-projects").innerHTML = calcStats.totalProjects - calcStats.activeProjects;
  document.getElementById("stats-project-hours").innerHTML = Math.round(calcStats.projectHoursLeft).toLocaleString("en-US");
  document.getElementById("stats-project-days").innerHTML = calcStats.projectDaysLeft.toLocaleString("en-GB");
  document.getElementById("stats-completion-day").innerHTML = calcStats.completeDate.toLocaleDateString("en-GB");
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
/* harmony import */ var _js_features_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/features/menu */ "../theme-info-only/src/js/features/menu.js");
/* harmony import */ var _js_features_menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_features_menu__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_features_initFeatures__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/features/initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");
/* harmony import */ var _js_features_stats__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/features/stats */ "../theme-info-only/src/js/features/stats.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNNO0FBQ1o7QUFDbEI7QUFDZ0M7QUFDVztBQUNiO0FBQ0g7QUFDUSIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvYWRkTGluay5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvc3RhdHMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHlDbGFzcyA9IHtcblxuICBib2R5T2JqZWN0OiBudWxsLFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cbiAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgfSxcblxuICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkgXG4gIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ0RPTUNvbnRlbnRMb2FkZWQnLFxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2JlZm9yZXVubG9hZCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgfVxuICAgIClcbiAgfVxuXG59XG5cbmJvZHlDbGFzcy5pbml0KClcbiIsIi8qXG5cbkNvbGxhcHNpYmxlTGlzdHMuanNcblxuQW4gb2JqZWN0IGFsbG93aW5nIGxpc3RzIHRvIGR5bmFtaWNhbGx5IGV4cGFuZCBhbmQgY29sbGFwc2VcblxuQ3JlYXRlZCBieSBLYXRlIE1vcmxleSAtIGh0dHA6Ly9jb2RlLmlhbWthdGUuY29tLyAtIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgdGVybXNcbm9mIHRoZSBDQzAgMS4wIFVuaXZlcnNhbCBsZWdhbCBjb2RlOlxuXG5odHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvbGVnYWxjb2RlXG5cbiovXG5cbmNvbnN0IENvbGxhcHNpYmxlTGlzdHMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBNYWtlcyBhbGwgbGlzdHMgd2l0aCB0aGUgY2xhc3MgJ2NvbGxhcHNpYmxlTGlzdCcgY29sbGFwc2libGUuIFRoZVxuICAvLyBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseSAoZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBub2RlID0+IHtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHtcbiAgICAgICAgYXBwbHlUbyhub2RlLCB0cnVlKVxuXG4gICAgICAgIGlmICghZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIHN1Ym5vZGUgPT4ge1xuICAgICAgICAgICAgc3Vibm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gTWFrZXMgdGhlIHNwZWNpZmllZCBsaXN0IGNvbGxhcHNpYmxlLiBUaGUgcGFyYW1ldGVycyBhcmU6XG4gIC8vXG4gIC8vIG5vZGUgICAgICAgICAtIHRoZSBsaXN0IGVsZW1lbnRcbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5VG8gKG5vZGUsIGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLCBsaSA9PiB7XG4gICAgICBpZiAoIWRvTm90UmVjdXJzZSB8fCBub2RlID09PSBsaS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGxpLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuTW96VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5tc1VzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuV2Via2l0VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBjb25zdCB1bCA9IGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG4gICAgICAgIGlmICh1bC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgbGkpKVxuICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPiZuYnNwOzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGsDwvaT4nXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byB0b2dnbGUgYWxsIG9mIHRoZW0sIHNvbWUgdHdpY2VcbiAgICAgICAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJykgfHwgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCB1bFswXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBIYW5kbGVzIGEgY2xpY2suIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBmb3Igd2hpY2ggY2xpY2tzIGFyZSBiZWluZyBoYW5kbGVkXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrIChub2RlLCBlKSB7XG4gICAgbGV0IGxpID0gZS50YXJnZXRcbiAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgdG9nZ2xlKG5vZGUpXG4gICAgfVxuICB9XG5cbiAgLy8gT3BlbnMgb3IgY2xvc2VzIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50cyBkaXJlY3RseSB3aXRoaW4gdGhlXG4gIC8vIHNwZWNpZmllZCBub2RlLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgY29udGFpbmluZyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHNcbiAgZnVuY3Rpb24gdG9nZ2xlIChub2RlKSB7XG4gICAgY29uc3Qgb3BlbiA9IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgIGNvbnN0IHVscyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwodWxzLCB1bCA9PiB7XG4gICAgICBsZXQgbGkgPSB1bFxuICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9IChvcGVuID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICBpZiAodWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JyArIChvcGVuID8gJ09wZW4nIDogJ0Nsb3NlZCcpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGFwcGx5LCBhcHBseVRvIH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJleHBvcnQgZnVuY3Rpb24gc2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0KG9uRmlyc3RJbml0KSB7XG4gICAgY29uc3QgaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dIaWRlQ3VycmVudCcpO1xuICAgIGlmKGhvbGRlcikge1xuICAgICAgICBob2xkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBob2xkZXJFdmVudEhhbmRsZXIsIHRydWUpO1xuICAgICAgICBob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBob2xkZXJFdmVudEhhbmRsZXIsIHRydWUpO1xuICAgIH1cbiAgICBpZiAob25GaXJzdEluaXQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3VycmVudCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9hdXRvbWF0aWNhbGx5IGFwcGx5IGN1cnJlbnQgZmlsdGVyIGlmIGF0IGxlYXN0IG9uZSBzaXRlIHdvdWxkIGJlIGRpc3BsYXllZFxuICAgICAgICBob2xkZXIuY2xpY2soKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhvbGRlckV2ZW50SGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3Qgc2hvd0N1cnJlbnQgPSAhaG9sZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1jdXJyZW50Jyk7XG4gICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctY3VycmVudCcpO1xuICAgIGNvbnN0IHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzW2ldO1xuICAgICAgICBpZigoc2hvd0N1cnJlbnQgJiYgc2l0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkgfHwgIXNob3dDdXJyZW50KSB7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLW5vdC1jdXJyZW50XCIpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LmFkZChcImhpZGUtbm90LWN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtzaXRlSW5pdH0gZnJvbSAnLi9pbml0RmVhdHVyZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaW5rSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2J1dHRvbicpO1xuICAgIC8vQWRkaW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25zW2ldO1xuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nIGxpc3RlbmVycyBqdXN0IGluIGNhc2UgKGVnIGZvciBwYXJ0aWFsIHJlc2V0cylcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhldmVudCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgLy9zbyBvbmx5IG9uZSBpbnB1dCBpcyBjcmVhdGVkXG4gICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID09IFwiZmFsc2VcIikge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FkZGxpbmtpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjI1MHB4XCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmZsb2F0ID0gXCJyaWdodFwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dExpbmsoYnV0dG9uLCBpbnB1dEVsZW1lbnQudmFsdWUpO31cbiAgICAgICAgICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJ1dHRvbi5iZWZvcmUoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2lucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0LnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbnB1dExpbmsoYnV0dG9uLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBidXR0b24uZGF0YXNldC51cmw7IFxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvdG8rXCIvL1wiK2hvc3RuYW1lK3VyaVxuXG4gICAgLy8gY29sbGF0ZSBmb3JtXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHNpdGUub3V0ZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAvL3JlLWluaXQgaGVyZSFcbiAgICAgICAgICAgIHNpdGVJbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufSIsIi8qKlxuICogaWYgdGhlcmUgaXMgYSBkaXYgd2l0aCBJRCBmaWVsZHNUb2NcbiAqIHRoZW4gaXQgcnVuc1xuICogSXQgd2lsbCBsb29rIGZvciBhbGwgZGF0YS1maWVsZCBhbmQgY3JlYXRlIGEgRmllbGRzIFRhYmxlIG9mIENvbnRlbnRzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmllbGRzVG9jSW5pdChvbkZpcnN0SW5pdCwgY3VycmVudFNlbGVjdGlvbikge1xuICAgIGNvbnN0IGZpZWxkc1RvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWVsZHNUb2MnKVxuICAgIGlmIChmaWVsZHNUb2MpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmllbGRdJylcbiAgICAgICAgdmFyIGFycmF5T2ZTZWxlY3RvcnMgPSBbLi4uc2VsZWN0b3JzXVxuICAgICAvLyBjb25zdCBpdGVtcyA9IGFycmF5T2ZTZWxlY3RvcnMuZmlsdGVyKCh2LCBpLCBhKSA9PiBhLmluZGV4T2YodikgPT09IGkpXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW11cbiAgICAgICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgICAgIGlmIChpdGVtcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgdWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICAgICAgdWxFbC5pZCA9ICdmaWx0ZXJVbCdcblxuICAgICAgICBjb25zdCBlbHMgPSBbXVxuXG4gICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZSBpdGVtcy4uLlxuICAgICAgICBpdGVtcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICAgICAgYUVsLmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAgICAgICAgIC8vIG9uIGNsaWNrXG4gICAgICAgICAgICBhRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHRlc3QpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24ucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnNwbGljZShwb3MsIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhRWwuaHJlZiA9ICcjJ1xuICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKVxuICAgICAgICAgICAgZWxzLnB1c2goYUVsKTtcblxuICAgICAgICAgICAgLy8gYXBwZW5kXG4gICAgICAgICAgICBsaXN0RWwuYXBwZW5kQ2hpbGQoYUVsKVxuICAgICAgICAgICAgdWxFbC5hcHBlbmRDaGlsZChsaXN0RWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsaXN0RWwpXG4gICAgICAgIH0pXG4gICAgICAgIGlmICghb25GaXJzdEluaXQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXJVbCcpLnJlbW92ZSgpXG4gICAgICAgICAgICBmaWx0ZXJJdGVyYXRlKGFycmF5T2ZTZWxlY3RvcnMsIGN1cnJlbnRTZWxlY3Rpb24pXG4gICAgICAgICAgICBlbHMuZm9yRWFjaChhRWwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uLmluY2x1ZGVzKGFFbC5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFFbC5jbGFzc0xpc3QudG9nZ2xlKCdjdXJyZW50JylcbiAgICAgICAgICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmsnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZmllbGRzVG9jLmFwcGVuZENoaWxkKHVsRWwpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaWx0ZXJJdGVyYXRlKGFycmF5T2ZTZWxlY3RvcnMsIGN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGNvbnN0IGVtcHR5ID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGggPT09IDBcbiAgICAgICAgY29uc3QgcG9zSW5DdXJyZW50ID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHZhbHVlKVxuICAgICAgICBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG59IiwiaW1wb3J0IHthZGRMaW5rSW5pdH0gZnJvbSAnLi9hZGRMaW5rJztcbmltcG9ydCB7c2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0fSBmcm9tICcuL1Nob3dIaWRlQ3VycmVudFNpdGVzJztcbmltcG9ydCB7ZmllbGRzVG9jSW5pdH0gZnJvbSAnLi9maWVsZHNUb2MnO1xuXG5sZXQgY3VycmVudEZpZWxkc0ZpbHRlcnMgPSBbXTtcblxuc2l0ZUluaXQodHJ1ZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaXRlSW5pdChmaXJzdEluaXQ9ZmFsc2UpIHtcbiAgICBhZGRMaW5rSW5pdCgpO1xuICAgIHNob3dIaWRlQ3VycmVudFNpdGVzSW5pdChmaXJzdEluaXQpO1xuICAgIGZpZWxkc1RvY0luaXQoZmlyc3RJbml0LCBjdXJyZW50RmllbGRzRmlsdGVycyk7XG59Iiwid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaG9sZGVyJyk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG1lbnVJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZW51SXRlbSA9IG1lbnVJdGVtc1tpXTtcbiAgICAgICAgbWVudUl0ZW0ub25jbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnb24nKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZC1ib3gnKTtcblxuY29uc3QgaW5wdXRIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICB2YXIgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2l0ZVwiKTtcbiAgICBsZXQgcHJlZml4TWF0Y2hlcyA9IFtdO1xuICAgIGxldCBzdWJzdHJpbmdNYXRjaGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlcy5pdGVtKGkpXG4gICAgICAgIGNvbnN0IGlkID0gc2l0ZS5pZFxuICAgICAgICBjb25zdCByZXMgPSBpZC5zdWJzdHJpbmcoNSkuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmICghIHZhbHVlKSB7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9IGVsc2UgaWYocmVzID09PSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlICsgJz0nICsgaWQgKyAnLSBzaG93JyApXG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzLnB1c2goc2l0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUgKyAnPScgKyBpZCArICctIGhpZGUnIClcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICBpZihyZXMgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzdHJpbmdNYXRjaGVzLnB1c2goc2l0ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJlZml4TWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4TWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICAgIHByZWZpeE1hdGNoZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3Vic3RyaW5nTWF0Y2hlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICAgIHN1YnN0cmluZ01hdGNoZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vZGlzcGxheSB4eC95eVxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2VhcmNoUmVzdWx0XCIpO1xuICAgIGlmIChwcmVmaXhNYXRjaGVzLmxlbmd0aCA+IDApIHsgcmVzdWx0RGl2LmlubmVySFRNTCA9IHByZWZpeE1hdGNoZXMubGVuZ3RoK1wiL1wiK3NpdGVzLmxlbmd0aDt9XG4gICAgZWxzZSBpZiAoc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGggPiAwKSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCtcIi9cIitzaXRlcy5sZW5ndGg7fVxuICAgIGVsc2UgeyByZXN1bHREaXYuaW5uZXJIVE1MID0gXCJcIjsgfVxufVxuXG5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEhhbmRsZXIpO1xuIiwibGV0IGNhbGNTdGF0cyA9IHt9O1xuXG5yZWZyZXNoU3RhdHMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hTdGF0cygpIHtcbiAgICBjYWxjdWxhdGVTdGF0cygpO1xuICAgIGRpc3BsYXlTdGF0cygpO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTdGF0cygpIHtcbiAgICBjYWxjU3RhdHMgPSB7XG4gICAgICAgIHRvdGFsU2l0ZXM6IDAsXG4gICAgICAgIHNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0OiAwLFxuICAgICAgICB0b3RhbFByb2plY3RzOiAwLFxuICAgICAgICBhY3RpdmVQcm9qZWN0czogMCxcbiAgICAgICAgcHJvamVjdEhvdXJzTGVmdDogMCxcbiAgICAgICAgcHJvamVjdERheXNMZWZ0OiAwLFxuICAgICAgICBjb21wbGV0ZURhdGU6IG5ldyBEYXRlKClcbiAgICB9XG4gICAgLy9jb3VudCBzaXRlIHN0YXRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cuc3RhdHMuc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHdpbmRvdy5zdGF0cy5zaXRlc1tpXTtcbiAgICAgICAgY2FsY1N0YXRzLnRvdGFsU2l0ZXMrKztcbiAgICAgICAgaWYgKHNpdGUuaXNDdXJyZW50KSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuc2l0ZXNXaXRoQ3VycmVudFByb2plY3QrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvdW50IHByb2plY3Qgc3RhdHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5zdGF0cy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gd2luZG93LnN0YXRzLnByb2plY3RzW2ldO1xuICAgICAgICBjYWxjU3RhdHMudG90YWxQcm9qZWN0cysrO1xuICAgICAgICBjYWxjU3RhdHMucHJvamVjdEhvdXJzTGVmdCArPSBwcm9qZWN0LkhvdXJzTGVmdDtcbiAgICAgICAgY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdCA9IE1hdGgucm91bmQoY2FsY1N0YXRzLnByb2plY3RIb3Vyc0xlZnQvNSk7XG4gICAgICAgIGNhbGNTdGF0cy5jb21wbGV0ZURhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdCoyNCo2MCo2MCoxMDAwKSk7XG4gICAgICAgIGlmIChwcm9qZWN0LmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuYWN0aXZlUHJvamVjdHMrKztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVN0YXRzKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtdG90YWwtc2l0ZXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsU2l0ZXM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1jdXJyZW50LXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWluYWN0aXZlLXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFNpdGVzLWNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXRvdGFsLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtYWN0aXZlLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5hY3RpdmVQcm9qZWN0cztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXBhc3QtcHJvamVjdHNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsUHJvamVjdHMtY2FsY1N0YXRzLmFjdGl2ZVByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1ob3Vyc1wiKS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGNhbGNTdGF0cy5wcm9qZWN0SG91cnNMZWZ0KS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1kYXlzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5wcm9qZWN0RGF5c0xlZnQudG9Mb2NhbGVTdHJpbmcoXCJlbi1HQlwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWNvbXBsZXRpb24tZGF5XCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5jb21wbGV0ZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tR0JcIik7XG59IiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiXG4vLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG4vLyBpbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9hZGRMaW5rJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL21lbnUnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL3N0YXRzJyJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsIndpbmRvdyIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImRvTm90UmVjdXJzZSIsImZvckVhY2giLCJjYWxsIiwibm9kZSIsImNvbnRhaW5zIiwiYXBwbHlUbyIsInN1Ym5vZGUiLCJsaSIsInBhcmVudE5vZGUiLCJzdHlsZSIsInVzZXJTZWxlY3QiLCJNb3pVc2VyU2VsZWN0IiwibXNVc2VyU2VsZWN0IiwiV2Via2l0VXNlclNlbGVjdCIsInVsIiwibGVuZ3RoIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJoYW5kbGVDbGljayIsImJpbmQiLCJpbm5lckhUTUwiLCJ0b2dnbGUiLCJpbnNlcnRCZWZvcmUiLCJlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJvcGVuIiwidWxzIiwiZGlzcGxheSIsIm15Q29va2llIiwic2V0Q29va2llIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJnZXRDb29raWUiLCJuYW1lRVEiLCJjYSIsInNwbGl0IiwiaSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZXJhc2VDb29raWUiLCJzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQiLCJvbkZpcnN0SW5pdCIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhvbGRlckV2ZW50SGFuZGxlciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGljayIsImN1cnJlbnRUYXJnZXQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwic2l0ZSIsInNpdGVJbml0IiwiYWRkTGlua0luaXQiLCJidXR0b25zIiwiYnV0dG9uIiwiYWRkTGlua0NsaWNrIiwiZGF0YXNldCIsImlucHV0YWN0aXZlIiwiaW5wdXRFbGVtZW50IiwidHlwZSIsIndpZHRoIiwiZmxvYXQiLCJrZXkiLCJpbnB1dExpbmsiLCJiZWZvcmUiLCJmb2N1cyIsImlucHV0IiwicGFyZW50RWxlbWVudCIsImxpbmsiLCJwcm90byIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInVyaSIsInVybCIsImRlc3RpbmF0aW9uIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJvdXRlckhUTUwiLCJmaWVsZHNUb2NJbml0IiwiY3VycmVudFNlbGVjdGlvbiIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsInVsRWwiLCJpZCIsImVscyIsImxpc3RFbCIsImFFbCIsInRlc3QiLCJwb3MiLCJzcGxpY2UiLCJwcmV2ZW50RGVmYXVsdCIsImZpbHRlckl0ZXJhdGUiLCJocmVmIiwiYXBwZW5kQ2hpbGQiLCJpbmNsdWRlcyIsImVtcHR5IiwicG9zSW5DdXJyZW50IiwiY3VycmVudEZpZWxkc0ZpbHRlcnMiLCJmaXJzdEluaXQiLCJvbmxvYWQiLCJtZW51SXRlbXMiLCJtZW51SXRlbSIsIm9uY2xpY2siLCJzb3VyY2UiLCJpbnB1dEhhbmRsZXIiLCJwcmVmaXhNYXRjaGVzIiwic3Vic3RyaW5nTWF0Y2hlcyIsIml0ZW0iLCJyZXMiLCJyZXN1bHREaXYiLCJjYWxjU3RhdHMiLCJyZWZyZXNoU3RhdHMiLCJjYWxjdWxhdGVTdGF0cyIsImRpc3BsYXlTdGF0cyIsInRvdGFsU2l0ZXMiLCJzaXRlc1dpdGhDdXJyZW50UHJvamVjdCIsInRvdGFsUHJvamVjdHMiLCJhY3RpdmVQcm9qZWN0cyIsInByb2plY3RIb3Vyc0xlZnQiLCJwcm9qZWN0RGF5c0xlZnQiLCJjb21wbGV0ZURhdGUiLCJzdGF0cyIsImlzQ3VycmVudCIsInByb2plY3RzIiwicHJvamVjdCIsIkhvdXJzTGVmdCIsIk1hdGgiLCJyb3VuZCIsImlzQWN0aXZlIiwidG9Mb2NhbGVTdHJpbmciLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJyZXBsYWNlIl0sInNvdXJjZVJvb3QiOiIifQ==
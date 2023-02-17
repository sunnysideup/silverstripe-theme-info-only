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
  holder.classList.toggle('show-all');
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
  holder.classList.toggle('show-all');
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
    //catch for missing link section
    if (div.classList.contains('missing-links')) {
      //is this section actually missing?
      setMissingLinksDisplay(div, empty, currentSelection);
    } else if (empty || posInCurrent !== -1) {
      div.style.display = '';
    } else {
      div.style.display = 'none';
    }
  });
}
function setMissingLinksDisplay(div, empty, currentSelection) {
  //any links that don't have display: none?
  let shouldDisplay = false;
  const missingLinks = div.querySelectorAll('li');
  for (var i = 0; i < missingLinks.length; i++) {
    const value = missingLinks[i].getAttribute('data-field').trim();
    if (currentSelection.indexOf(value) !== -1) {
      shouldDisplay = true;
    }
  }
  if (shouldDisplay || empty) {
    div.style.display = '';
  } else {
    div.style.display = 'none';
  }
  //else, hide
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTUEsU0FBUyxHQUFHO0VBRWhCQyxVQUFVLEVBQUUsSUFBSTtFQUVoQkMsSUFBSSxFQUFFLFlBQVk7SUFDaEJGLFNBQVMsQ0FBQ0MsVUFBVSxHQUFHRSxRQUFRLENBQUNDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxJQUFJLENBQUNDLDBCQUEwQixFQUFFO0VBQ25DLENBQUM7RUFFREEsMEJBQTBCLEVBQUUsWUFDNUI7SUFDRUYsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FDdkIsa0JBQWtCLEVBQ2xCLFVBQVVDLEtBQUssRUFBRTtNQUNmUCxTQUFTLENBQUNDLFVBQVUsQ0FBQ08sU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO01BQ2pEVCxTQUFTLENBQUNDLFVBQVUsQ0FBQ08sU0FBUyxDQUFDRSxNQUFNLENBQUMsZUFBZSxDQUFDO01BQ3RELElBQUksY0FBYyxJQUFJUCxRQUFRLENBQUNRLGVBQWUsRUFBRTtRQUM5Q1gsU0FBUyxDQUFDQyxVQUFVLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUM3QyxDQUFDLE1BQU07UUFDTFQsU0FBUyxDQUFDQyxVQUFVLENBQUNPLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNoRDtJQUNGLENBQUMsQ0FDRjtJQUNERyxNQUFNLENBQUNOLGdCQUFnQixDQUNyQixjQUFjLEVBQ2QsWUFBWTtNQUNWO0lBQUEsQ0FDRCxDQUNGO0VBQ0g7QUFFRixDQUFDO0FBRUROLFNBQVMsQ0FBQ0UsSUFBSSxFQUFFOzs7Ozs7Ozs7O0FDakNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTVcsZ0JBQWdCLEdBQUksWUFBWTtFQUNwQztFQUNBO0VBQ0E7RUFDQTtFQUNBLFNBQVNDLEtBQUssQ0FBRUMsWUFBWSxFQUFFO0lBQzVCLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDQyxJQUFJLENBQUNkLFFBQVEsQ0FBQ0Msb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUVjLElBQUksSUFBSTtNQUMzRCxJQUFJQSxJQUFJLENBQUNWLFNBQVMsQ0FBQ1csUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDOUNDLE9BQU8sQ0FBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUNILFlBQVksRUFBRTtVQUNqQixFQUFFLENBQUNDLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDQyxJQUFJLENBQUNkLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFaUIsT0FBTyxJQUFJO1lBQzFEQSxPQUFPLENBQUNiLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1VBQzFDLENBQUMsQ0FBQztRQUNKO01BQ0Y7SUFDRixDQUFDLENBQUM7RUFDSjs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLFNBQVNXLE9BQU8sQ0FBRUYsSUFBSSxFQUFFSCxZQUFZLEVBQUU7SUFDcEMsRUFBRSxDQUFDQyxPQUFPLENBQUNDLElBQUksQ0FBQ0MsSUFBSSxDQUFDZCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRWtCLEVBQUUsSUFBSTtNQUNyRCxJQUFJLENBQUNQLFlBQVksSUFBSUcsSUFBSSxLQUFLSSxFQUFFLENBQUNDLFVBQVUsRUFBRTtRQUMzQ0QsRUFBRSxDQUFDRSxLQUFLLENBQUNDLFVBQVUsR0FBRyxNQUFNO1FBQzVCSCxFQUFFLENBQUNFLEtBQUssQ0FBQ0UsYUFBYSxHQUFHLE1BQU07UUFDL0JKLEVBQUUsQ0FBQ0UsS0FBSyxDQUFDRyxZQUFZLEdBQUcsTUFBTTtRQUM5QkwsRUFBRSxDQUFDRSxLQUFLLENBQUNJLGdCQUFnQixHQUFHLE1BQU07UUFDbEMsTUFBTUMsRUFBRSxHQUFHUCxFQUFFLENBQUNsQixvQkFBb0IsQ0FBQyxJQUFJLENBQUM7UUFDeEMsSUFBSXlCLEVBQUUsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUNqQixNQUFNQyxJQUFJLEdBQUc1QixRQUFRLENBQUM2QixhQUFhLENBQUMsTUFBTSxDQUFDO1VBQzNDRCxJQUFJLENBQUN2QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7VUFDaENzQixJQUFJLENBQUN6QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUyQixXQUFXLENBQUNDLElBQUksQ0FBQyxJQUFJLEVBQUVaLEVBQUUsQ0FBQyxDQUFDO1VBQzFEUyxJQUFJLENBQUNJLFNBQVMsR0FBRyxtREFBbUQ7VUFDcEU7VUFDQSxJQUFJYixFQUFFLENBQUNkLFNBQVMsQ0FBQ1csUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJRyxFQUFFLENBQUNkLFNBQVMsQ0FBQ1csUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hFaUIsTUFBTSxDQUFDZCxFQUFFLENBQUM7VUFDWjtVQUNBYyxNQUFNLENBQUNkLEVBQUUsQ0FBQztVQUNWQSxFQUFFLENBQUNlLFlBQVksQ0FBQ04sSUFBSSxFQUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUI7TUFDRjtJQUNGLENBQUMsQ0FBQztFQUNKOztFQUVBO0VBQ0E7RUFDQTtFQUNBLFNBQVNJLFdBQVcsQ0FBRWYsSUFBSSxFQUFFb0IsQ0FBQyxFQUFFO0lBQzdCLElBQUloQixFQUFFLEdBQUdnQixDQUFDLENBQUNDLE1BQU07SUFDakIsT0FBT2pCLEVBQUUsQ0FBQ2tCLFFBQVEsS0FBSyxJQUFJLEVBQUU7TUFDM0JsQixFQUFFLEdBQUdBLEVBQUUsQ0FBQ0MsVUFBVTtJQUNwQjtJQUVBLElBQUlELEVBQUUsS0FBS0osSUFBSSxFQUFFO01BQ2ZrQixNQUFNLENBQUNsQixJQUFJLENBQUM7SUFDZDtFQUNGOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBU2tCLE1BQU0sQ0FBRWxCLElBQUksRUFBRTtJQUNyQixNQUFNdUIsSUFBSSxHQUFHdkIsSUFBSSxDQUFDVixTQUFTLENBQUNXLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQztJQUM3RCxNQUFNdUIsR0FBRyxHQUFHeEIsSUFBSSxDQUFDZCxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7SUFFM0MsRUFBRSxDQUFDWSxPQUFPLENBQUNDLElBQUksQ0FBQ3lCLEdBQUcsRUFBRWIsRUFBRSxJQUFJO01BQ3pCLElBQUlQLEVBQUUsR0FBR08sRUFBRTtNQUNYLE9BQU9QLEVBQUUsQ0FBQ2tCLFFBQVEsS0FBSyxJQUFJLEVBQUU7UUFDM0JsQixFQUFFLEdBQUdBLEVBQUUsQ0FBQ0MsVUFBVTtNQUNwQjtNQUVBLElBQUlELEVBQUUsS0FBS0osSUFBSSxFQUFFO1FBQ2ZXLEVBQUUsQ0FBQ0wsS0FBSyxDQUFDbUIsT0FBTyxHQUFJRixJQUFJLEdBQUcsT0FBTyxHQUFHLE1BQU87TUFDOUM7SUFDRixDQUFDLENBQUM7SUFFRnZCLElBQUksQ0FBQ1YsU0FBUyxDQUFDRSxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDNUNRLElBQUksQ0FBQ1YsU0FBUyxDQUFDRSxNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFFOUMsSUFBSWdDLEdBQUcsQ0FBQ1osTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNsQlosSUFBSSxDQUFDVixTQUFTLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSWdDLElBQUksR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDcEU7RUFDRjtFQUVBLE9BQU87SUFBRTNCLEtBQUs7SUFBRU07RUFBUSxDQUFDO0FBQzNCLENBQUMsRUFBRztBQUVKUCxnQkFBZ0IsQ0FBQ0MsS0FBSyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7QUN4R3hCLE1BQU04QixRQUFRLEdBQUc7RUFFZkMsU0FBUyxFQUFFLFVBQVVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxJQUFJLEVBQUU7SUFDdEMsSUFBSUMsT0FBTyxHQUFHLEVBQUU7SUFDaEIsSUFBSSxPQUFPRCxJQUFJLEtBQUssV0FBVyxFQUFFO01BQy9CQSxJQUFJLEdBQUcsRUFBRTtJQUNYO0lBQ0EsSUFBSUEsSUFBSSxFQUFFO01BQ1IsSUFBSUUsSUFBSSxHQUFHLElBQUlDLElBQUksRUFBRTtNQUNyQkQsSUFBSSxDQUFDRSxPQUFPLENBQUNGLElBQUksQ0FBQ0csT0FBTyxFQUFFLEdBQUlMLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFLLENBQUM7TUFDM0RDLE9BQU8sR0FBRyxZQUFZLEdBQUdDLElBQUksQ0FBQ0ksV0FBVyxFQUFFO0lBQzdDO0lBQ0FuRCxRQUFRLENBQUNvRCxNQUFNLEdBQUdULElBQUksR0FBRyxHQUFHLElBQUlDLEtBQUssSUFBSSxFQUFFLENBQUMsR0FBR0UsT0FBTyxHQUFHLFVBQVU7RUFDckUsQ0FBQztFQUVETyxTQUFTLEVBQUUsVUFBVVYsSUFBSSxFQUFFO0lBQ3pCLElBQUlXLE1BQU0sR0FBR1gsSUFBSSxHQUFHLEdBQUc7SUFDdkIsSUFBSVksRUFBRSxHQUFHdkQsUUFBUSxDQUFDb0QsTUFBTSxDQUFDSSxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ25DLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixFQUFFLENBQUM1QixNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtNQUNsQyxJQUFJQyxDQUFDLEdBQUdILEVBQUUsQ0FBQ0UsQ0FBQyxDQUFDO01BQ2IsT0FBT0MsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzFCRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0UsU0FBUyxDQUFDLENBQUMsRUFBRUYsQ0FBQyxDQUFDL0IsTUFBTSxDQUFDO01BQzlCO01BQ0EsSUFBSStCLENBQUMsQ0FBQ0csT0FBTyxDQUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0IsT0FBT0ksQ0FBQyxDQUFDRSxTQUFTLENBQUNOLE1BQU0sQ0FBQzNCLE1BQU0sRUFBRStCLENBQUMsQ0FBQy9CLE1BQU0sQ0FBQztNQUM3QztJQUNGO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBQztFQUVEbUMsV0FBVyxFQUFFLFVBQVVuQixJQUFJLEVBQUU7SUFDM0JGLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztFQUNuQztBQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ00sU0FBU29CLHdCQUF3QixDQUFDQyxXQUFXLEVBQUU7RUFDbEQsTUFBTUMsTUFBTSxHQUFHakUsUUFBUSxDQUFDa0UsY0FBYyxDQUFDLGlCQUFpQixDQUFDO0VBQ3pERCxNQUFNLENBQUM1RCxTQUFTLENBQUM0QixNQUFNLENBQUMsVUFBVSxDQUFDO0VBQ25DLElBQUdnQyxNQUFNLEVBQUU7SUFDUEEsTUFBTSxDQUFDRSxtQkFBbUIsQ0FBQyxPQUFPLEVBQUVDLGtCQUFrQixFQUFFLElBQUksQ0FBQztJQUM3REgsTUFBTSxDQUFDOUQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFaUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO0VBQzlEO0VBQ0EsSUFBSUosV0FBVyxJQUFJaEUsUUFBUSxDQUFDcUUsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMxQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQ3RFO0lBQ0FzQyxNQUFNLENBQUNLLEtBQUssRUFBRTtFQUNsQjtBQUNKO0FBRUEsU0FBU0Ysa0JBQWtCLENBQUNoRSxLQUFLLEVBQUU7RUFDL0IsTUFBTTZELE1BQU0sR0FBRzdELEtBQUssQ0FBQ21FLGFBQWE7RUFDbEMsTUFBTUMsV0FBVyxHQUFHLENBQUNQLE1BQU0sQ0FBQzVELFNBQVMsQ0FBQ1csUUFBUSxDQUFDLGNBQWMsQ0FBQztFQUM5RGlELE1BQU0sQ0FBQzVELFNBQVMsQ0FBQzRCLE1BQU0sQ0FBQyxjQUFjLENBQUM7RUFDdkNnQyxNQUFNLENBQUM1RCxTQUFTLENBQUM0QixNQUFNLENBQUMsVUFBVSxDQUFDO0VBQ25DLE1BQU13QyxLQUFLLEdBQUd6RSxRQUFRLENBQUNxRSxzQkFBc0IsQ0FBQyxNQUFNLENBQUM7RUFDckQsS0FBSyxJQUFJWixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdnQixLQUFLLENBQUM5QyxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNaUIsSUFBSSxHQUFHRCxLQUFLLENBQUNoQixDQUFDLENBQUM7SUFDckIsSUFBSWUsV0FBVyxJQUFJRSxJQUFJLENBQUNyRSxTQUFTLENBQUNXLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSyxDQUFDd0QsV0FBVyxFQUFFO01BQ3BFRSxJQUFJLENBQUNyRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QyxDQUFDLE1BQU07TUFDSm1FLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDO0lBQzFDO0VBQ0o7QUFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzNCdUM7QUFFaEMsU0FBU3NFLFdBQVcsR0FBRztFQUMxQixNQUFNQyxPQUFPLEdBQUc3RSxRQUFRLENBQUNxRSxzQkFBc0IsQ0FBQyxlQUFlLENBQUM7RUFDaEU7RUFDQSxLQUFLLElBQUlaLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR29CLE9BQU8sQ0FBQ2xELE1BQU0sRUFBRThCLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU1xQixNQUFNLEdBQUdELE9BQU8sQ0FBQ3BCLENBQUMsQ0FBQztJQUN6QjtJQUNBcUIsTUFBTSxDQUFDWCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUVZLFlBQVksQ0FBQztJQUNqREQsTUFBTSxDQUFDM0UsZ0JBQWdCLENBQUMsT0FBTyxFQUFFNEUsWUFBWSxDQUFDO0VBQ2xEO0FBQ0o7QUFFQSxTQUFTQSxZQUFZLENBQUMzRSxLQUFLLEVBQUU7RUFDekIsTUFBTTBFLE1BQU0sR0FBRzFFLEtBQUssQ0FBQ21FLGFBQWE7RUFDbEM7RUFDQSxJQUFJTyxNQUFNLENBQUNFLE9BQU8sQ0FBQ0MsV0FBVyxJQUFJLE9BQU8sRUFBRTtJQUN2Q0gsTUFBTSxDQUFDRSxPQUFPLENBQUNDLFdBQVcsR0FBRyxNQUFNO0lBQ25DLE1BQU1DLFlBQVksR0FBR2xGLFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDcERxRCxZQUFZLENBQUNDLElBQUksR0FBRyxNQUFNO0lBQzFCRCxZQUFZLENBQUM3RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7SUFDMUM0RSxZQUFZLENBQUM3RCxLQUFLLENBQUMrRCxLQUFLLEdBQUcsT0FBTztJQUNsQ0YsWUFBWSxDQUFDN0QsS0FBSyxDQUFDZ0UsS0FBSyxHQUFHLE9BQU87SUFFbENILFlBQVksQ0FBQy9FLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO01BQUNtRjtJQUFHLENBQUMsS0FBSztNQUM5QyxJQUFJQSxHQUFHLEtBQUssT0FBTyxFQUFFO1FBQ2pCLElBQUlKLFlBQVksQ0FBQ3RDLEtBQUssSUFBSSxFQUFFLEVBQUU7VUFBQzJDLFNBQVMsQ0FBQ1QsTUFBTSxFQUFFSSxZQUFZLENBQUN0QyxLQUFLLENBQUM7UUFBQztRQUNyRWtDLE1BQU0sQ0FBQ0UsT0FBTyxDQUFDQyxXQUFXLEdBQUcsT0FBTztRQUNwQ0MsWUFBWSxDQUFDM0UsTUFBTSxFQUFFO01BQ3pCO0lBQ0osQ0FBQyxDQUFDO0lBQ0Z1RSxNQUFNLENBQUNVLE1BQU0sQ0FBQ04sWUFBWSxDQUFDO0lBQzNCQSxZQUFZLENBQUNPLEtBQUssRUFBRTtFQUN4Qjs7RUFFQTtFQUFBLEtBQ0s7SUFDRFgsTUFBTSxDQUFDRSxPQUFPLENBQUNDLFdBQVcsR0FBRyxPQUFPO0lBQ3BDLE1BQU1TLEtBQUssR0FBR1osTUFBTSxDQUFDYSxhQUFhLENBQUN0QixzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsSUFBSXFCLEtBQUssQ0FBQzlDLEtBQUssSUFBSSxFQUFFLEVBQUU7TUFDbkIyQyxTQUFTLENBQUNULE1BQU0sRUFBRVksS0FBSyxDQUFDOUMsS0FBSyxDQUFDO0lBQ2xDO0lBQ0E4QyxLQUFLLENBQUNuRixNQUFNLEVBQUU7RUFDbEI7QUFFSjtBQUVBLFNBQVNnRixTQUFTLENBQUNULE1BQU0sRUFBRWMsSUFBSSxFQUFFO0VBQzdCO0VBQ0EsTUFBTUMsS0FBSyxHQUFHcEYsTUFBTSxDQUFDcUYsUUFBUSxDQUFDQyxRQUFRO0VBQ3RDLE1BQU1DLFFBQVEsR0FBR3ZGLE1BQU0sQ0FBQ3FGLFFBQVEsQ0FBQ0UsUUFBUTtFQUN6QyxNQUFNQyxHQUFHLEdBQUduQixNQUFNLENBQUNFLE9BQU8sQ0FBQ2tCLEdBQUc7RUFDOUIsTUFBTUMsV0FBVyxHQUFHTixLQUFLLEdBQUMsSUFBSSxHQUFDRyxRQUFRLEdBQUNDLEdBQUc7O0VBRTNDO0VBQ0EsTUFBTUcsUUFBUSxHQUFHLElBQUlDLFFBQVEsRUFBRTtFQUMvQkQsUUFBUSxDQUFDRSxNQUFNLENBQUMsTUFBTSxFQUFFVixJQUFJLENBQUM7O0VBRTdCO0VBQ0EsTUFBTVcsT0FBTyxHQUFHLElBQUlDLGNBQWMsRUFBRTtFQUNwQ0QsT0FBTyxDQUFDakUsSUFBSSxDQUFDLE1BQU0sRUFBRTZELFdBQVcsQ0FBQztFQUNqQ0ksT0FBTyxDQUFDRSxJQUFJLENBQUNMLFFBQVEsQ0FBQzs7RUFFdEI7RUFDQUcsT0FBTyxDQUFDRyxrQkFBa0IsR0FBRyxZQUFXO0lBQ3BDO0lBQ0EsSUFBSUgsT0FBTyxDQUFDSSxVQUFVLElBQUksQ0FBQyxJQUFJSixPQUFPLENBQUNLLE1BQU0sSUFBSSxHQUFHLEVBQUU7TUFDbEQsTUFBTUMsUUFBUSxHQUFHTixPQUFPLENBQUNPLFlBQVk7TUFDckMsTUFBTXBDLElBQUksR0FBR0ksTUFBTSxDQUFDYSxhQUFhLENBQUNBLGFBQWE7TUFDL0NqQixJQUFJLENBQUNxQyxTQUFTLEdBQUdGLFFBQVE7TUFDekI7TUFDQWxDLHVEQUFRLEVBQUU7SUFDZDtFQUNKLENBQUM7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNxQyxhQUFhLENBQUNoRCxXQUFXLEVBQUVpRCxnQkFBZ0IsRUFBRTtFQUN6RCxNQUFNQyxTQUFTLEdBQUdsSCxRQUFRLENBQUNrRSxjQUFjLENBQUMsV0FBVyxDQUFDO0VBQ3RELElBQUlnRCxTQUFTLEVBQUU7SUFDWCxNQUFNQyxTQUFTLEdBQUduSCxRQUFRLENBQUNvSCxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7SUFDM0QsSUFBSUMsZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHRixTQUFTLENBQUM7SUFDeEM7SUFDRyxNQUFNRyxLQUFLLEdBQUcsRUFBRTtJQUNoQkQsZ0JBQWdCLENBQUN4RyxPQUFPLENBQUMwRyxHQUFHLElBQUk7TUFDNUIsTUFBTTNFLEtBQUssR0FBRzJFLEdBQUcsQ0FBQ0MsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDQyxJQUFJLEVBQUU7TUFDbkQsSUFBSUgsS0FBSyxDQUFDekQsT0FBTyxDQUFDakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDN0IwRSxLQUFLLENBQUNJLElBQUksQ0FBQzlFLEtBQUssQ0FBQztNQUNyQjtNQUNBO0lBQ0osQ0FBQyxDQUFDOztJQUVGLE1BQU0rRSxJQUFJLEdBQUczSCxRQUFRLENBQUM2QixhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ3pDOEYsSUFBSSxDQUFDQyxFQUFFLEdBQUcsVUFBVTtJQUVwQixNQUFNQyxHQUFHLEdBQUcsRUFBRTs7SUFFZDtJQUNBUCxLQUFLLENBQUN6RyxPQUFPLENBQUMrQixLQUFLLElBQUk7TUFDbkIsTUFBTWtGLE1BQU0sR0FBRzlILFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQyxJQUFJLENBQUM7TUFDM0MsTUFBTWtHLEdBQUcsR0FBRy9ILFFBQVEsQ0FBQzZCLGFBQWEsQ0FBQyxHQUFHLENBQUM7TUFDdkNrRyxHQUFHLENBQUMvRixTQUFTLEdBQUdZLEtBQUs7O01BRXJCO01BQ0FtRixHQUFHLENBQUM1SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVUMsS0FBSyxFQUFFO1FBQzNDLE1BQU00SCxJQUFJLEdBQUcsSUFBSSxDQUFDaEcsU0FBUztRQUMzQixJQUFJLENBQUMzQixTQUFTLENBQUM0QixNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQzVCLFNBQVMsQ0FBQzRCLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDN0IsTUFBTWdHLEdBQUcsR0FBR2hCLGdCQUFnQixDQUFDcEQsT0FBTyxDQUFDbUUsSUFBSSxDQUFDO1FBQzFDLElBQUksSUFBSSxDQUFDM0gsU0FBUyxDQUFDVyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7VUFDcEMsSUFBSWlILEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNaaEIsZ0JBQWdCLENBQUNTLElBQUksQ0FBQzlFLEtBQUssQ0FBQztVQUNoQztRQUNKLENBQUMsTUFBTTtVQUNILElBQUlxRixHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDWmhCLGdCQUFnQixDQUFDaUIsTUFBTSxDQUFDRCxHQUFHLEVBQUUsQ0FBQyxDQUFDO1VBQ25DO1FBQ0o7UUFDQTdILEtBQUssQ0FBQytILGNBQWMsRUFBRTtRQUN0QkMsYUFBYSxDQUFDZixnQkFBZ0IsRUFBRUosZ0JBQWdCLENBQUM7UUFDakQsT0FBTyxLQUFLO01BQ2hCLENBQUMsQ0FBQztNQUVGYyxHQUFHLENBQUNNLElBQUksR0FBRyxHQUFHO01BQ2ROLEdBQUcsQ0FBQzFILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUN6QnVILEdBQUcsQ0FBQ0gsSUFBSSxDQUFDSyxHQUFHLENBQUM7O01BRWI7TUFDQUQsTUFBTSxDQUFDUSxXQUFXLENBQUNQLEdBQUcsQ0FBQztNQUN2QkosSUFBSSxDQUFDVyxXQUFXLENBQUNSLE1BQU0sQ0FBQztNQUN4QjtJQUNKLENBQUMsQ0FBQzs7SUFDRixJQUFJLENBQUM5RCxXQUFXLEVBQUU7TUFDZGhFLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzNELE1BQU0sRUFBRTtNQUM1QzZILGFBQWEsQ0FBQ2YsZ0JBQWdCLEVBQUVKLGdCQUFnQixDQUFDO01BQ2pEWSxHQUFHLENBQUNoSCxPQUFPLENBQUNrSCxHQUFHLElBQUk7UUFDZixJQUFJZCxnQkFBZ0IsQ0FBQ3NCLFFBQVEsQ0FBQ1IsR0FBRyxDQUFDL0YsU0FBUyxDQUFDLEVBQUU7VUFDMUMrRixHQUFHLENBQUMxSCxTQUFTLENBQUM0QixNQUFNLENBQUMsU0FBUyxDQUFDO1VBQy9COEYsR0FBRyxDQUFDMUgsU0FBUyxDQUFDNEIsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQztNQUNKLENBQUMsQ0FBQztJQUNOO0lBQ0FpRixTQUFTLENBQUNvQixXQUFXLENBQUNYLElBQUksQ0FBQztFQUMvQjtBQUNKO0FBRUEsU0FBU1MsYUFBYSxDQUFDZixnQkFBZ0IsRUFBRUosZ0JBQWdCLEVBQUU7RUFDdkRJLGdCQUFnQixDQUFDeEcsT0FBTyxDQUFDMEcsR0FBRyxJQUFJO0lBQzVCLE1BQU0zRSxLQUFLLEdBQUcyRSxHQUFHLENBQUNDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO0lBQ25ELE1BQU1lLEtBQUssR0FBR3ZCLGdCQUFnQixDQUFDdEYsTUFBTSxLQUFLLENBQUM7SUFDM0MsTUFBTThHLFlBQVksR0FBR3hCLGdCQUFnQixDQUFDcEQsT0FBTyxDQUFDakIsS0FBSyxDQUFDO0lBQ3BEO0lBQ0EsSUFBSTJFLEdBQUcsQ0FBQ2xILFNBQVMsQ0FBQ1csUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO01BQ3pDO01BQ0EwSCxzQkFBc0IsQ0FBQ25CLEdBQUcsRUFBRWlCLEtBQUssRUFBRXZCLGdCQUFnQixDQUFDO0lBQ3hELENBQUMsTUFBTSxJQUFJdUIsS0FBSyxJQUFJQyxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDckNsQixHQUFHLENBQUNsRyxLQUFLLENBQUNtQixPQUFPLEdBQUcsRUFBRTtJQUMxQixDQUFDLE1BQU07TUFDSCtFLEdBQUcsQ0FBQ2xHLEtBQUssQ0FBQ21CLE9BQU8sR0FBRyxNQUFNO0lBQzlCO0VBQ0osQ0FBQyxDQUFDO0FBQ047QUFFQSxTQUFTa0csc0JBQXNCLENBQUNuQixHQUFHLEVBQUVpQixLQUFLLEVBQUV2QixnQkFBZ0IsRUFBRTtFQUMxRDtFQUNBLElBQUkwQixhQUFhLEdBQUcsS0FBSztFQUN6QixNQUFNQyxZQUFZLEdBQUdyQixHQUFHLENBQUNILGdCQUFnQixDQUFDLElBQUksQ0FBQztFQUMvQyxLQUFLLElBQUkzRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdtRixZQUFZLENBQUNqSCxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtJQUMxQyxNQUFNYixLQUFLLEdBQUdnRyxZQUFZLENBQUNuRixDQUFDLENBQUMsQ0FBQytELFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsSUFBSSxFQUFFO0lBQy9ELElBQUlSLGdCQUFnQixDQUFDcEQsT0FBTyxDQUFDakIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDeEMrRixhQUFhLEdBQUcsSUFBSTtJQUN4QjtFQUNKO0VBQ0EsSUFBSUEsYUFBYSxJQUFJSCxLQUFLLEVBQUU7SUFDeEJqQixHQUFHLENBQUNsRyxLQUFLLENBQUNtQixPQUFPLEdBQUcsRUFBRTtFQUMxQixDQUFDLE1BQ0k7SUFDRCtFLEdBQUcsQ0FBQ2xHLEtBQUssQ0FBQ21CLE9BQU8sR0FBRyxNQUFNO0VBQzlCO0VBQ0E7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0dzQztBQUMwQjtBQUN0QjtBQUUxQyxJQUFJcUcsb0JBQW9CLEdBQUcsRUFBRTtBQUU3QmxFLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFFUCxTQUFTQSxRQUFRLENBQUNtRSxTQUFTLEdBQUMsS0FBSyxFQUFFO0VBQ3RDbEUscURBQVcsRUFBRTtFQUNiYiwrRUFBd0IsQ0FBQytFLFNBQVMsQ0FBQztFQUNuQzlCLHlEQUFhLENBQUM4QixTQUFTLEVBQUVELG9CQUFvQixDQUFDO0FBQ2xEOzs7Ozs7Ozs7O0FDWkFwSSxNQUFNLENBQUNzSSxNQUFNLEdBQUcsWUFBVztFQUN2QixNQUFNQyxTQUFTLEdBQUdoSixRQUFRLENBQUNxRSxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7RUFDaEUsS0FBSSxJQUFJWixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUd1RixTQUFTLENBQUNySCxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtJQUN0QyxNQUFNd0YsUUFBUSxHQUFHRCxTQUFTLENBQUN2RixDQUFDLENBQUM7SUFDN0J3RixRQUFRLENBQUNDLE9BQU8sR0FBRyxVQUFTL0csQ0FBQyxFQUM3QjtNQUNJLElBQUlBLENBQUMsQ0FBQ0MsTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQjtNQUNKO01BQ0EsSUFBSSxDQUFDL0IsU0FBUyxDQUFDNEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMvQixDQUFDO0VBQ0w7QUFDSixDQUFDO0FBRUQsTUFBTWtILE1BQU0sR0FBR25KLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxVQUFVLENBQUM7QUFFbEQsTUFBTWtGLFlBQVksR0FBRyxVQUFTakgsQ0FBQyxFQUFFO0VBQzdCLE1BQU1TLEtBQUssR0FBR1QsQ0FBQyxDQUFDQyxNQUFNLENBQUNRLEtBQUs7RUFDNUIsSUFBSTZCLEtBQUssR0FBR3pFLFFBQVEsQ0FBQ3FFLHNCQUFzQixDQUFDLE1BQU0sQ0FBQztFQUNuRCxJQUFJZ0YsYUFBYSxHQUFHLEVBQUU7RUFDdEIsSUFBSUMsZ0JBQWdCLEdBQUcsRUFBRTtFQUV6QixLQUFLLElBQUk3RixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdnQixLQUFLLENBQUM5QyxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtJQUNuQyxNQUFNaUIsSUFBSSxHQUFHRCxLQUFLLENBQUM4RSxJQUFJLENBQUM5RixDQUFDLENBQUM7SUFDMUIsTUFBTW1FLEVBQUUsR0FBR2xELElBQUksQ0FBQ2tELEVBQUU7SUFDbEIsTUFBTTRCLEdBQUcsR0FBRzVCLEVBQUUsQ0FBQ2hFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDakIsS0FBSyxDQUFDO0lBQzFDLElBQUksQ0FBRUEsS0FBSyxFQUFFO01BQ1Q4QixJQUFJLENBQUNyRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFDN0JtRSxJQUFJLENBQUNyRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQyxNQUFNLElBQUdpSixHQUFHLEtBQUssQ0FBQyxFQUFFO01BQ2pCO01BQ0FILGFBQWEsQ0FBQzNCLElBQUksQ0FBQ2hELElBQUksQ0FBQztJQUM1QixDQUFDLE1BQU07TUFDSDtNQUNBQSxJQUFJLENBQUNyRSxTQUFTLENBQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFDN0JtRSxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDNUIsSUFBR2tKLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNWRixnQkFBZ0IsQ0FBQzVCLElBQUksQ0FBQ2hELElBQUksQ0FBQztNQUMvQjtJQUNKO0VBQ0o7RUFDQSxJQUFJMkUsYUFBYSxDQUFDMUgsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUMxQixLQUFLLElBQUk4QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc0RixhQUFhLENBQUMxSCxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtNQUMzQzRGLGFBQWEsQ0FBQzVGLENBQUMsQ0FBQyxDQUFDcEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQ3RDK0ksYUFBYSxDQUFDNUYsQ0FBQyxDQUFDLENBQUNwRCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDL0M7RUFDSixDQUFDLE1BQU0sSUFBSStJLGdCQUFnQixDQUFDM0gsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNwQyxLQUFLLElBQUk4QixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc2RixnQkFBZ0IsQ0FBQzNILE1BQU0sRUFBRThCLENBQUMsRUFBRSxFQUFFO01BQzlDNkYsZ0JBQWdCLENBQUM3RixDQUFDLENBQUMsQ0FBQ3BELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUN6Q2dKLGdCQUFnQixDQUFDN0YsQ0FBQyxDQUFDLENBQUNwRCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEQ7RUFDSjs7RUFFQTtFQUNBLE1BQU1rSixTQUFTLEdBQUd6SixRQUFRLENBQUNrRSxjQUFjLENBQUMsY0FBYyxDQUFDO0VBQ3pELElBQUltRixhQUFhLENBQUMxSCxNQUFNLEdBQUcsQ0FBQyxFQUFFO0lBQUU4SCxTQUFTLENBQUN6SCxTQUFTLEdBQUdxSCxhQUFhLENBQUMxSCxNQUFNLEdBQUMsR0FBRyxHQUFDOEMsS0FBSyxDQUFDOUMsTUFBTTtFQUFDLENBQUMsTUFDeEYsSUFBSTJILGdCQUFnQixDQUFDM0gsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUFFOEgsU0FBUyxDQUFDekgsU0FBUyxHQUFHc0gsZ0JBQWdCLENBQUMzSCxNQUFNLEdBQUMsR0FBRyxHQUFDOEMsS0FBSyxDQUFDOUMsTUFBTTtFQUFDLENBQUMsTUFDbkc7SUFBRThILFNBQVMsQ0FBQ3pILFNBQVMsR0FBRyxFQUFFO0VBQUU7QUFDckMsQ0FBQztBQUVEbUgsTUFBTSxDQUFDaEosZ0JBQWdCLENBQUMsT0FBTyxFQUFFaUosWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1RDlDLElBQUlNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFbEJDLFlBQVksRUFBRTtBQUVQLFNBQVNBLFlBQVksR0FBRztFQUMzQkMsY0FBYyxFQUFFO0VBQ2hCQyxZQUFZLEVBQUU7QUFDbEI7QUFFQSxTQUFTRCxjQUFjLEdBQUc7RUFDdEJGLFNBQVMsR0FBRztJQUNSSSxVQUFVLEVBQUUsQ0FBQztJQUNiQyx1QkFBdUIsRUFBRSxDQUFDO0lBQzFCQyxhQUFhLEVBQUUsQ0FBQztJQUNoQkMsY0FBYyxFQUFFLENBQUM7SUFDakJDLGdCQUFnQixFQUFFLENBQUM7SUFDbkJDLGVBQWUsRUFBRSxDQUFDO0lBQ2xCQyxZQUFZLEVBQUUsSUFBSXBILElBQUk7RUFDMUIsQ0FBQztFQUNEO0VBQ0EsS0FBSyxJQUFJUyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdoRCxNQUFNLENBQUM0SixLQUFLLENBQUM1RixLQUFLLENBQUM5QyxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtJQUNoRCxNQUFNaUIsSUFBSSxHQUFHakUsTUFBTSxDQUFDNEosS0FBSyxDQUFDNUYsS0FBSyxDQUFDaEIsQ0FBQyxDQUFDO0lBQ2xDaUcsU0FBUyxDQUFDSSxVQUFVLEVBQUU7SUFDdEIsSUFBSXBGLElBQUksQ0FBQzRGLFNBQVMsRUFBRTtNQUNoQlosU0FBUyxDQUFDSyx1QkFBdUIsRUFBRTtJQUN2QztFQUNKO0VBQ0E7RUFDQSxLQUFLLElBQUl0RyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdoRCxNQUFNLENBQUM0SixLQUFLLENBQUNFLFFBQVEsQ0FBQzVJLE1BQU0sRUFBRThCLENBQUMsRUFBRSxFQUFFO0lBQ25ELE1BQU0rRyxPQUFPLEdBQUcvSixNQUFNLENBQUM0SixLQUFLLENBQUNFLFFBQVEsQ0FBQzlHLENBQUMsQ0FBQztJQUN4Q2lHLFNBQVMsQ0FBQ00sYUFBYSxFQUFFO0lBQ3pCTixTQUFTLENBQUNRLGdCQUFnQixJQUFJTSxPQUFPLENBQUNDLFNBQVM7SUFDL0NmLFNBQVMsQ0FBQ1MsZUFBZSxHQUFHTyxJQUFJLENBQUNDLEtBQUssQ0FBQ2pCLFNBQVMsQ0FBQ1EsZ0JBQWdCLEdBQUMsQ0FBQyxDQUFDO0lBQ3BFUixTQUFTLENBQUNVLFlBQVksR0FBRyxJQUFJcEgsSUFBSSxDQUFDLElBQUlBLElBQUksRUFBRSxDQUFDRSxPQUFPLEVBQUUsR0FBRXdHLFNBQVMsQ0FBQ1MsZUFBZSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUssQ0FBQztJQUNqRyxJQUFJSyxPQUFPLENBQUNJLFFBQVEsRUFBRTtNQUNsQmxCLFNBQVMsQ0FBQ08sY0FBYyxFQUFFO0lBQzlCO0VBQ0o7QUFDSjtBQUVBLFNBQVNKLFlBQVksR0FBRztFQUNwQjdKLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDbEMsU0FBUyxHQUFHMEgsU0FBUyxDQUFDSSxVQUFVO0VBQzdFOUosUUFBUSxDQUFDa0UsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUNsQyxTQUFTLEdBQUcwSCxTQUFTLENBQUNLLHVCQUF1QjtFQUM1Ri9KLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDbEMsU0FBUyxHQUFHMEgsU0FBUyxDQUFDSSxVQUFVLEdBQUNKLFNBQVMsQ0FBQ0ssdUJBQXVCO0VBQ2xIL0osUUFBUSxDQUFDa0UsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUNsQyxTQUFTLEdBQUcwSCxTQUFTLENBQUNNLGFBQWE7RUFDbkZoSyxRQUFRLENBQUNrRSxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQ2xDLFNBQVMsR0FBRzBILFNBQVMsQ0FBQ08sY0FBYztFQUNyRmpLLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDbEMsU0FBUyxHQUFHMEgsU0FBUyxDQUFDTSxhQUFhLEdBQUNOLFNBQVMsQ0FBQ08sY0FBYztFQUMzR2pLLFFBQVEsQ0FBQ2tFLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDbEMsU0FBUyxHQUFHMEksSUFBSSxDQUFDQyxLQUFLLENBQUNqQixTQUFTLENBQUNRLGdCQUFnQixDQUFDLENBQUNXLGNBQWMsQ0FBQyxPQUFPLENBQUM7RUFDekg3SyxRQUFRLENBQUNrRSxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQ2xDLFNBQVMsR0FBRzBILFNBQVMsQ0FBQ1MsZUFBZSxDQUFDVSxjQUFjLENBQUMsT0FBTyxDQUFDO0VBQzNHN0ssUUFBUSxDQUFDa0UsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUNsQyxTQUFTLEdBQUcwSCxTQUFTLENBQUNVLFlBQVksQ0FBQ1Usa0JBQWtCLENBQUMsT0FBTyxDQUFDO0FBQ2xIOzs7Ozs7Ozs7O0FDbERBLElBQUlDLFVBQVUsR0FBRy9LLFFBQVEsQ0FBQ29ILGdCQUFnQixDQUN4Qyx5QkFBeUIsQ0FDMUI7QUFDRCxLQUFLLElBQUk0RCxDQUFDLEdBQUdELFVBQVUsQ0FBQ3BKLE1BQU0sR0FBRyxDQUFDLEVBQUVxSixDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUVBLENBQUMsRUFBRTtFQUMvQ0QsVUFBVSxDQUFDQyxDQUFDLENBQUMsQ0FBQzdLLGdCQUFnQixDQUFDLFFBQVEsRUFBRThLLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDOURGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUM3SyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU4SyxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBQzdERixVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDN0ssZ0JBQWdCLENBQUMsT0FBTyxFQUFFOEssYUFBYSxFQUFFLEtBQUssQ0FBQztFQUM3REYsVUFBVSxDQUFDQyxDQUFDLENBQUMsQ0FBQzdLLGdCQUFnQixDQUFDLE1BQU0sRUFBRThLLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDNURGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUM3SyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUU4SyxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBRWpFLElBQUlDLEdBQUcsR0FBR2xMLFFBQVEsQ0FBQ21MLFdBQVcsQ0FBQyxZQUFZLENBQUM7RUFDNUNELEdBQUcsQ0FBQ0UsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0VBQ3BDTCxVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDSyxhQUFhLENBQUNILEdBQUcsQ0FBQztBQUNsQztBQUVBLFNBQVNELGFBQWEsQ0FBRUssTUFBTSxFQUFFO0VBQzlCLElBQUlDLE1BQU0sR0FBR0QsTUFBTSxDQUFDbEosTUFBTSxDQUFDUSxLQUFLO0VBQ2hDLElBQUkySSxNQUFNLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM5Q0YsTUFBTSxDQUFDbEosTUFBTSxDQUFDL0IsU0FBUyxDQUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzVDLENBQUMsTUFBTTtJQUNMK0ssTUFBTSxDQUFDbEosTUFBTSxDQUFDL0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQ3pDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ007QUFDWjtBQUNsQjtBQUNnQztBQUNXO0FBQ2I7QUFDSDtBQUNRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvYm9keS1jbGFzcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb2xsYXBzaWJsZS1tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9hZGRMaW5rLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9pbml0RmVhdHVyZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9zdGF0cy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mb3JtLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9keUNsYXNzID0ge1xuXG4gIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXVxuICAgIHRoaXMuYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMoKVxuICB9LFxuXG4gIGFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSBcbiAge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnRE9NQ29udGVudExvYWRlZCcsXG4gICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS1sb2FkZWQnKVxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RvdWNoJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnYmVmb3JldW5sb2FkJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICB9XG4gICAgKVxuICB9XG5cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiLypcblxuQ29sbGFwc2libGVMaXN0cy5qc1xuXG5BbiBvYmplY3QgYWxsb3dpbmcgbGlzdHMgdG8gZHluYW1pY2FsbHkgZXhwYW5kIGFuZCBjb2xsYXBzZVxuXG5DcmVhdGVkIGJ5IEthdGUgTW9ybGV5IC0gaHR0cDovL2NvZGUuaWFta2F0ZS5jb20vIC0gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtc1xub2YgdGhlIENDMCAxLjAgVW5pdmVyc2FsIGxlZ2FsIGNvZGU6XG5cbmh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9sZWdhbGNvZGVcblxuKi9cblxuY29uc3QgQ29sbGFwc2libGVMaXN0cyA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIE1ha2VzIGFsbCBsaXN0cyB3aXRoIHRoZSBjbGFzcyAnY29sbGFwc2libGVMaXN0JyBjb2xsYXBzaWJsZS4gVGhlXG4gIC8vIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5IChkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkge1xuICAgICAgICBhcHBseVRvKG5vZGUsIHRydWUpXG5cbiAgICAgICAgaWYgKCFkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgc3Vibm9kZSA9PiB7XG4gICAgICAgICAgICBzdWJub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBNYWtlcyB0aGUgc3BlY2lmaWVkIGxpc3QgY29sbGFwc2libGUuIFRoZSBwYXJhbWV0ZXJzIGFyZTpcbiAgLy9cbiAgLy8gbm9kZSAgICAgICAgIC0gdGhlIGxpc3QgZWxlbWVudFxuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHlUbyAobm9kZSwgZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksIGxpID0+IHtcbiAgICAgIGlmICghZG9Ob3RSZWN1cnNlIHx8IG5vZGUgPT09IGxpLnBhcmVudE5vZGUpIHtcbiAgICAgICAgbGkuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLm1zVXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5XZWJraXRVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGNvbnN0IHVsID0gbGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcbiAgICAgICAgaWYgKHVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBsaSkpXG4gICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+Jm5ic3A7PC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oawPC9pPidcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRvZ2dsZSBhbGwgb2YgdGhlbSwgc29tZSB0d2ljZVxuICAgICAgICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKSB8fCBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIHVsWzBdKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEhhbmRsZXMgYSBjbGljay4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGZvciB3aGljaCBjbGlja3MgYXJlIGJlaW5nIGhhbmRsZWRcbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKG5vZGUsIGUpIHtcbiAgICBsZXQgbGkgPSBlLnRhcmdldFxuICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgfVxuXG4gICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICB0b2dnbGUobm9kZSlcbiAgICB9XG4gIH1cblxuICAvLyBPcGVucyBvciBjbG9zZXMgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzIGRpcmVjdGx5IHdpdGhpbiB0aGVcbiAgLy8gc3BlY2lmaWVkIG5vZGUuIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50c1xuICBmdW5jdGlvbiB0b2dnbGUgKG5vZGUpIHtcbiAgICBjb25zdCBvcGVuID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgY29uc3QgdWxzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKTtcblxuICAgIFtdLmZvckVhY2guY2FsbCh1bHMsIHVsID0+IHtcbiAgICAgIGxldCBsaSA9IHVsXG4gICAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gKG9wZW4gPyAnYmxvY2snIDogJ25vbmUnKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgIGlmICh1bHMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnICsgKG9wZW4gPyAnT3BlbicgOiAnQ2xvc2VkJykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYXBwbHksIGFwcGx5VG8gfVxufSkoKVxuXG5Db2xsYXBzaWJsZUxpc3RzLmFwcGx5KClcbiIsImNvbnN0IG15Q29va2llID0ge1xuXG4gIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgdmFyIGV4cGlyZXMgPSAnJ1xuICAgIGlmICh0eXBlb2YgZGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRheXMgPSAxNFxuICAgIH1cbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKVxuICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKVxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSArIGV4cGlyZXMgKyAnOyBwYXRoPS8nXG4gIH0sXG5cbiAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JylcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNhW2ldXG4gICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIGVyYXNlQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIG15Q29va2llLnNldENvb2tpZShuYW1lLCBudWxsLCAwKVxuICB9XG59XG5cbmV4cG9ydCB7IG15Q29va2llIH1cbiIsImV4cG9ydCBmdW5jdGlvbiBzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQob25GaXJzdEluaXQpIHtcbiAgICBjb25zdCBob2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0hpZGVDdXJyZW50Jyk7XG4gICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctYWxsJyk7XG4gICAgaWYoaG9sZGVyKSB7XG4gICAgICAgIGhvbGRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhvbGRlckV2ZW50SGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIGhvbGRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhvbGRlckV2ZW50SGFuZGxlciwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmIChvbkZpcnN0SW5pdCAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50JykubGVuZ3RoID4gMCkge1xuICAgICAgICAvL2F1dG9tYXRpY2FsbHkgYXBwbHkgY3VycmVudCBmaWx0ZXIgaWYgYXQgbGVhc3Qgb25lIHNpdGUgd291bGQgYmUgZGlzcGxheWVkXG4gICAgICAgIGhvbGRlci5jbGljaygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaG9sZGVyRXZlbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3QgaG9sZGVyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBzaG93Q3VycmVudCA9ICFob2xkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWN1cnJlbnQnKTtcbiAgICBob2xkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1jdXJyZW50Jyk7XG4gICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctYWxsJyk7XG4gICAgY29uc3Qgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaXRlJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzaXRlID0gc2l0ZXNbaV07XG4gICAgICAgIGlmKChzaG93Q3VycmVudCAmJiBzaXRlLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB8fCAhc2hvd0N1cnJlbnQpIHtcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LnJlbW92ZShcImhpZGUtbm90LWN1cnJlbnRcIik7XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QuYWRkKFwiaGlkZS1ub3QtY3VycmVudFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQge3NpdGVJbml0fSBmcm9tICcuL2luaXRGZWF0dXJlcydcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpbmtJbml0KCkge1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRsaW5rYnV0dG9uJyk7XG4gICAgLy9BZGRpbmcgZXZlbnQgbGlzdGVuZXJzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGJ1dHRvbnNbaV07XG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmcgbGlzdGVuZXJzIGp1c3QgaW4gY2FzZSAoZWcgZm9yIHBhcnRpYWwgcmVzZXRzKVxuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRMaW5rQ2xpY2spO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRMaW5rQ2xpY2spO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkTGlua0NsaWNrKGV2ZW50KSB7XG4gICAgY29uc3QgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAvL3NvIG9ubHkgb25lIGlucHV0IGlzIGNyZWF0ZWRcbiAgICBpZiAoYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWRkbGlua2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIlxuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUuZmxvYXQgPSBcInJpZ2h0XCJcblxuICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICh7a2V5fSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0RWxlbWVudC52YWx1ZSAhPSAnJykge2lucHV0TGluayhidXR0b24sIGlucHV0RWxlbWVudC52YWx1ZSk7fVxuICAgICAgICAgICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJmYWxzZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYnV0dG9uLmJlZm9yZShpbnB1dEVsZW1lbnQpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvL2lucHV0IGFscmVhZHkgZXhpc3RzLCBwcmVzc2luZyBidXR0b24gYWdhaW4gc3VibWl0c1xuICAgIGVsc2Uge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBidXR0b24ucGFyZW50RWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRsaW5raW5wdXQnKVswXTtcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlICE9ICcnKSB7XG4gICAgICAgICAgICBpbnB1dExpbmsoYnV0dG9uLCBpbnB1dC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIGlucHV0TGluayhidXR0b24sIGxpbmspIHtcbiAgICAvLyBkZXN0aW5hdGlvblxuICAgIGNvbnN0IHByb3RvID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgIGNvbnN0IGhvc3RuYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIGNvbnN0IHVyaSA9IGJ1dHRvbi5kYXRhc2V0LnVybDsgXG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm90bytcIi8vXCIraG9zdG5hbWUrdXJpXG5cbiAgICAvLyBjb2xsYXRlIGZvcm1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImxpbmtcIiwgbGluayk7XG5cbiAgICAvLyBtYWtlIHJlcXVlc3RcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBkZXN0aW5hdGlvbik7XG4gICAgcmVxdWVzdC5zZW5kKGZvcm1EYXRhKTtcblxuICAgIC8vIGhhbmRsZSByZXNwb25zZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vYWZ0ZXIgcmVzcG9uc2VcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBidXR0b24ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgc2l0ZS5vdXRlckhUTUwgPSByZXNwb25zZTtcbiAgICAgICAgICAgIC8vcmUtaW5pdCBoZXJlIVxuICAgICAgICAgICAgc2l0ZUluaXQoKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZHNUb2NJbml0KG9uRmlyc3RJbml0LCBjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG4gICAgaWYgKGZpZWxkc1RvYykge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWVsZF0nKVxuICAgICAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgaWYgKGl0ZW1zLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICB1bEVsLmlkID0gJ2ZpbHRlclVsJ1xuXG4gICAgICAgIGNvbnN0IGVscyA9IFtdXG5cbiAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlIGl0ZW1zLi4uXG4gICAgICAgIGl0ZW1zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgY29uc3QgYUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgICAgICBhRWwuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgICAgICAgICAgLy8gb24gY2xpY2tcbiAgICAgICAgICAgIGFFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnY3VycmVudCcpXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rJylcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodGVzdClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24uc3BsaWNlKHBvcywgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgZmlsdGVySXRlcmF0ZShhcnJheU9mU2VsZWN0b3JzLCBjdXJyZW50U2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgICAgICBhRWwuY2xhc3NMaXN0LmFkZCgnbGluaycpXG4gICAgICAgICAgICBlbHMucHVzaChhRWwpO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmRcbiAgICAgICAgICAgIGxpc3RFbC5hcHBlbmRDaGlsZChhRWwpXG4gICAgICAgICAgICB1bEVsLmFwcGVuZENoaWxkKGxpc3RFbClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3RFbClcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFvbkZpcnN0SW5pdCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlclVsJykucmVtb3ZlKClcbiAgICAgICAgICAgIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbilcbiAgICAgICAgICAgIGVscy5mb3JFYWNoKGFFbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24uaW5jbHVkZXMoYUVsLmlubmVySFRNTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgICAgICBhRWwuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBmaWVsZHNUb2MuYXBwZW5kQ2hpbGQodWxFbClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbikge1xuICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgY29uc3QgZW1wdHkgPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCA9PT0gMFxuICAgICAgICBjb25zdCBwb3NJbkN1cnJlbnQgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpXG4gICAgICAgIC8vY2F0Y2ggZm9yIG1pc3NpbmcgbGluayBzZWN0aW9uXG4gICAgICAgIGlmIChkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzaW5nLWxpbmtzJykpIHtcbiAgICAgICAgICAgIC8vaXMgdGhpcyBzZWN0aW9uIGFjdHVhbGx5IG1pc3Npbmc/XG4gICAgICAgICAgICBzZXRNaXNzaW5nTGlua3NEaXNwbGF5KGRpdiwgZW1wdHksIGN1cnJlbnRTZWxlY3Rpb24pXG4gICAgICAgIH0gZWxzZSBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNldE1pc3NpbmdMaW5rc0Rpc3BsYXkoZGl2LCBlbXB0eSwgY3VycmVudFNlbGVjdGlvbikge1xuICAgIC8vYW55IGxpbmtzIHRoYXQgZG9uJ3QgaGF2ZSBkaXNwbGF5OiBub25lP1xuICAgIGxldCBzaG91bGREaXNwbGF5ID0gZmFsc2U7XG4gICAgY29uc3QgbWlzc2luZ0xpbmtzID0gZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXNzaW5nTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBtaXNzaW5nTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgc2hvdWxkRGlzcGxheSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNob3VsZERpc3BsYXkgfHwgZW1wdHkpIHtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9XG4gICAgLy9lbHNlLCBoaWRlXG59IiwiaW1wb3J0IHthZGRMaW5rSW5pdH0gZnJvbSAnLi9hZGRMaW5rJztcbmltcG9ydCB7c2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0fSBmcm9tICcuL1Nob3dIaWRlQ3VycmVudFNpdGVzJztcbmltcG9ydCB7ZmllbGRzVG9jSW5pdH0gZnJvbSAnLi9maWVsZHNUb2MnO1xuXG5sZXQgY3VycmVudEZpZWxkc0ZpbHRlcnMgPSBbXTtcblxuc2l0ZUluaXQodHJ1ZSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaXRlSW5pdChmaXJzdEluaXQ9ZmFsc2UpIHtcbiAgICBhZGRMaW5rSW5pdCgpO1xuICAgIHNob3dIaWRlQ3VycmVudFNpdGVzSW5pdChmaXJzdEluaXQpO1xuICAgIGZpZWxkc1RvY0luaXQoZmlyc3RJbml0LCBjdXJyZW50RmllbGRzRmlsdGVycyk7XG59Iiwid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaG9sZGVyJyk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG1lbnVJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZW51SXRlbSA9IG1lbnVJdGVtc1tpXTtcbiAgICAgICAgbWVudUl0ZW0ub25jbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnb24nKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluZC1ib3gnKTtcblxuY29uc3QgaW5wdXRIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICB2YXIgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2l0ZVwiKTtcbiAgICBsZXQgcHJlZml4TWF0Y2hlcyA9IFtdO1xuICAgIGxldCBzdWJzdHJpbmdNYXRjaGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlcy5pdGVtKGkpXG4gICAgICAgIGNvbnN0IGlkID0gc2l0ZS5pZFxuICAgICAgICBjb25zdCByZXMgPSBpZC5zdWJzdHJpbmcoNSkuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmICghIHZhbHVlKSB7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9IGVsc2UgaWYocmVzID09PSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlICsgJz0nICsgaWQgKyAnLSBzaG93JyApXG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzLnB1c2goc2l0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUgKyAnPScgKyBpZCArICctIGhpZGUnIClcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICBpZihyZXMgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzdWJzdHJpbmdNYXRjaGVzLnB1c2goc2l0ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJlZml4TWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4TWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICAgIHByZWZpeE1hdGNoZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3Vic3RyaW5nTWF0Y2hlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93JylcbiAgICAgICAgICAgIHN1YnN0cmluZ01hdGNoZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vZGlzcGxheSB4eC95eVxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2VhcmNoUmVzdWx0XCIpO1xuICAgIGlmIChwcmVmaXhNYXRjaGVzLmxlbmd0aCA+IDApIHsgcmVzdWx0RGl2LmlubmVySFRNTCA9IHByZWZpeE1hdGNoZXMubGVuZ3RoK1wiL1wiK3NpdGVzLmxlbmd0aDt9XG4gICAgZWxzZSBpZiAoc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGggPiAwKSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCtcIi9cIitzaXRlcy5sZW5ndGg7fVxuICAgIGVsc2UgeyByZXN1bHREaXYuaW5uZXJIVE1MID0gXCJcIjsgfVxufVxuXG5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEhhbmRsZXIpO1xuIiwibGV0IGNhbGNTdGF0cyA9IHt9O1xuXG5yZWZyZXNoU3RhdHMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hTdGF0cygpIHtcbiAgICBjYWxjdWxhdGVTdGF0cygpO1xuICAgIGRpc3BsYXlTdGF0cygpO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTdGF0cygpIHtcbiAgICBjYWxjU3RhdHMgPSB7XG4gICAgICAgIHRvdGFsU2l0ZXM6IDAsXG4gICAgICAgIHNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0OiAwLFxuICAgICAgICB0b3RhbFByb2plY3RzOiAwLFxuICAgICAgICBhY3RpdmVQcm9qZWN0czogMCxcbiAgICAgICAgcHJvamVjdEhvdXJzTGVmdDogMCxcbiAgICAgICAgcHJvamVjdERheXNMZWZ0OiAwLFxuICAgICAgICBjb21wbGV0ZURhdGU6IG5ldyBEYXRlKClcbiAgICB9XG4gICAgLy9jb3VudCBzaXRlIHN0YXRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cuc3RhdHMuc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHdpbmRvdy5zdGF0cy5zaXRlc1tpXTtcbiAgICAgICAgY2FsY1N0YXRzLnRvdGFsU2l0ZXMrKztcbiAgICAgICAgaWYgKHNpdGUuaXNDdXJyZW50KSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuc2l0ZXNXaXRoQ3VycmVudFByb2plY3QrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvdW50IHByb2plY3Qgc3RhdHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5zdGF0cy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gd2luZG93LnN0YXRzLnByb2plY3RzW2ldO1xuICAgICAgICBjYWxjU3RhdHMudG90YWxQcm9qZWN0cysrO1xuICAgICAgICBjYWxjU3RhdHMucHJvamVjdEhvdXJzTGVmdCArPSBwcm9qZWN0LkhvdXJzTGVmdDtcbiAgICAgICAgY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdCA9IE1hdGgucm91bmQoY2FsY1N0YXRzLnByb2plY3RIb3Vyc0xlZnQvNSk7XG4gICAgICAgIGNhbGNTdGF0cy5jb21wbGV0ZURhdGUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSsoY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdCoyNCo2MCo2MCoxMDAwKSk7XG4gICAgICAgIGlmIChwcm9qZWN0LmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuYWN0aXZlUHJvamVjdHMrKztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVN0YXRzKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtdG90YWwtc2l0ZXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsU2l0ZXM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1jdXJyZW50LXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWluYWN0aXZlLXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFNpdGVzLWNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXRvdGFsLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtYWN0aXZlLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5hY3RpdmVQcm9qZWN0cztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXBhc3QtcHJvamVjdHNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsUHJvamVjdHMtY2FsY1N0YXRzLmFjdGl2ZVByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1ob3Vyc1wiKS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGNhbGNTdGF0cy5wcm9qZWN0SG91cnNMZWZ0KS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1kYXlzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5wcm9qZWN0RGF5c0xlZnQudG9Mb2NhbGVTdHJpbmcoXCJlbi1HQlwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWNvbXBsZXRpb24tZGF5XCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5jb21wbGV0ZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tR0JcIik7XG59IiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiXG4vLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG4vLyBpbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9hZGRMaW5rJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL21lbnUnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL3N0YXRzJyJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsIndpbmRvdyIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImRvTm90UmVjdXJzZSIsImZvckVhY2giLCJjYWxsIiwibm9kZSIsImNvbnRhaW5zIiwiYXBwbHlUbyIsInN1Ym5vZGUiLCJsaSIsInBhcmVudE5vZGUiLCJzdHlsZSIsInVzZXJTZWxlY3QiLCJNb3pVc2VyU2VsZWN0IiwibXNVc2VyU2VsZWN0IiwiV2Via2l0VXNlclNlbGVjdCIsInVsIiwibGVuZ3RoIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJoYW5kbGVDbGljayIsImJpbmQiLCJpbm5lckhUTUwiLCJ0b2dnbGUiLCJpbnNlcnRCZWZvcmUiLCJlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJvcGVuIiwidWxzIiwiZGlzcGxheSIsIm15Q29va2llIiwic2V0Q29va2llIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJnZXRDb29raWUiLCJuYW1lRVEiLCJjYSIsInNwbGl0IiwiaSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZXJhc2VDb29raWUiLCJzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQiLCJvbkZpcnN0SW5pdCIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhvbGRlckV2ZW50SGFuZGxlciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGljayIsImN1cnJlbnRUYXJnZXQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwic2l0ZSIsInNpdGVJbml0IiwiYWRkTGlua0luaXQiLCJidXR0b25zIiwiYnV0dG9uIiwiYWRkTGlua0NsaWNrIiwiZGF0YXNldCIsImlucHV0YWN0aXZlIiwiaW5wdXRFbGVtZW50IiwidHlwZSIsIndpZHRoIiwiZmxvYXQiLCJrZXkiLCJpbnB1dExpbmsiLCJiZWZvcmUiLCJmb2N1cyIsImlucHV0IiwicGFyZW50RWxlbWVudCIsImxpbmsiLCJwcm90byIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInVyaSIsInVybCIsImRlc3RpbmF0aW9uIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJvdXRlckhUTUwiLCJmaWVsZHNUb2NJbml0IiwiY3VycmVudFNlbGVjdGlvbiIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsInVsRWwiLCJpZCIsImVscyIsImxpc3RFbCIsImFFbCIsInRlc3QiLCJwb3MiLCJzcGxpY2UiLCJwcmV2ZW50RGVmYXVsdCIsImZpbHRlckl0ZXJhdGUiLCJocmVmIiwiYXBwZW5kQ2hpbGQiLCJpbmNsdWRlcyIsImVtcHR5IiwicG9zSW5DdXJyZW50Iiwic2V0TWlzc2luZ0xpbmtzRGlzcGxheSIsInNob3VsZERpc3BsYXkiLCJtaXNzaW5nTGlua3MiLCJjdXJyZW50RmllbGRzRmlsdGVycyIsImZpcnN0SW5pdCIsIm9ubG9hZCIsIm1lbnVJdGVtcyIsIm1lbnVJdGVtIiwib25jbGljayIsInNvdXJjZSIsImlucHV0SGFuZGxlciIsInByZWZpeE1hdGNoZXMiLCJzdWJzdHJpbmdNYXRjaGVzIiwiaXRlbSIsInJlcyIsInJlc3VsdERpdiIsImNhbGNTdGF0cyIsInJlZnJlc2hTdGF0cyIsImNhbGN1bGF0ZVN0YXRzIiwiZGlzcGxheVN0YXRzIiwidG90YWxTaXRlcyIsInNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0IiwidG90YWxQcm9qZWN0cyIsImFjdGl2ZVByb2plY3RzIiwicHJvamVjdEhvdXJzTGVmdCIsInByb2plY3REYXlzTGVmdCIsImNvbXBsZXRlRGF0ZSIsInN0YXRzIiwiaXNDdXJyZW50IiwicHJvamVjdHMiLCJwcm9qZWN0IiwiSG91cnNMZWZ0IiwiTWF0aCIsInJvdW5kIiwiaXNBY3RpdmUiLCJ0b0xvY2FsZVN0cmluZyIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInJlcGxhY2UiXSwic291cmNlUm9vdCI6IiJ9
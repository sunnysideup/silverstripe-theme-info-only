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
    holder.classList.toggle('show-all');
    //automatically apply current filter if at least one site would be displayed
    if (document.getElementsByClassName('current').length > 0) {
      holder.click();
    }
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

/***/ "../theme-info-only/src/js/features/addSite.js":
/*!*****************************************************!*\
  !*** ../theme-info-only/src/js/features/addSite.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addSiteInit": function() { return /* binding */ addSiteInit; }
/* harmony export */ });
/* harmony import */ var _initFeatures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");

function addSiteInit() {
  const button = document.getElementById('add-site-frontend');
  if (button) {
    button.removeEventListener('click', addSite);
    button.addEventListener('click', addSite);
  }
}
function addSite(event) {
  const button = event.currentTarget;
  if (button.dataset.inputactive == "false") {
    button.dataset.inputactive = "true";
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.classList.add('addsiteinput');
    inputElement.style.width = "250px";
    inputElement.style.float = "right";
    inputElement.style.fontSize = "2rem";
    inputElement.style.height = "3rem";
    inputElement.addEventListener("keyup", ({
      key
    }) => {
      if (key === "Enter") {
        if (inputElement.value != '') {
          inputSite(inputElement.value);
        }
        button.dataset.inputactive = "false";
        inputElement.remove();
      }
    });
    button.parentElement.append(inputElement);
    inputElement.focus();
  }

  //input already exists, pressing button again submits
  else {
    button.dataset.inputactive = "false";
    const input = button.parentElement.getElementsByClassName('addsiteinput')[0];
    if (input.value != '') {
      inputSite(input.value);
    }
    input.remove();
  }
}
function inputSite(value) {
  // destination
  const proto = window.location.protocol;
  const hostname = window.location.hostname;
  const destination = proto + "//" + hostname + "/our-sites/addsite/";

  // collate form
  const formData = new FormData();
  formData.append("link", value);

  // make request
  const request = new XMLHttpRequest();
  request.open("POST", destination);
  request.send(formData);

  // handle response
  request.onreadystatechange = function () {
    //after response
    if (request.readyState == 4 && request.status == 200) {
      const response = request.responseText;
      //do something to reactively add the new site to the DOM
      document.body.parentElement.innerHTML = response;
      //re-init here!
      (0,_initFeatures__WEBPACK_IMPORTED_MODULE_0__.siteInit)(true);
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
    } else if (div.classList.contains('missing-links')) {
      //is this section actually missing?
      setMissingLinksDisplay(div, empty, currentSelection);
    } else {
      //catch for missing links sections
      if (div.classList.contains('error') && currentSelection.indexOf('Missing') !== -1) {
        div.style.display = '';
      } else {
        div.style.display = 'none';
      }
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
/* harmony import */ var _updateValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateValues */ "../theme-info-only/src/js/features/updateValues.js");
/* harmony import */ var _stats__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stats */ "../theme-info-only/src/js/features/stats.js");
/* harmony import */ var _addSite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addSite */ "../theme-info-only/src/js/features/addSite.js");






let currentFieldsFilters = [];
siteInit(true);
function siteInit(firstInit = false) {
  (0,_addLink__WEBPACK_IMPORTED_MODULE_0__.addLinkInit)();
  (0,_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_1__.showHideCurrentSitesInit)(firstInit);
  (0,_fieldsToc__WEBPACK_IMPORTED_MODULE_2__.fieldsTocInit)(firstInit, currentFieldsFilters);
  (0,_updateValues__WEBPACK_IMPORTED_MODULE_3__.updateValuesInit)();
  (0,_addSite__WEBPACK_IMPORTED_MODULE_5__.addSiteInit)();
  (0,_stats__WEBPACK_IMPORTED_MODULE_4__.refreshStats)();
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
  const value = e.target.value.toLowerCase();
  const currentFilter = document.getElementById('ShowHideCurrent');
  const hr = document.getElementById('SearchFilterHR');
  var sites = document.getElementsByClassName("site");
  let prefixMatches = [];
  let substringMatches = [];
  for (var i = 0; i < sites.length; i++) {
    const site = sites.item(i);
    const id = site.id;
    const res = id.substring(5).indexOf(value);
    if (!value) {
      currentFilter.style.display = '';
      hr.style.display = '';
      site.classList.remove('show');
      site.classList.remove('hidden');
    } else if (res === 0) {
      //console.log(value + '=' + id + '- show' )
      currentFilter.style.display = 'none';
      hr.style.display = 'none';
      prefixMatches.push(site);
    } else {
      //console.log(value + '=' + id + '- hide' )
      currentFilter.style.display = 'none';
      hr.style.display = 'none';
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
  } else if (value.length > 0) {
    //no matches by site name, run a broad search
    broadSearch(sites, value);
  }
  //green/red color if find/not find site

  const resultDiv = document.getElementById("SearchResult");
  //display xx/yy
  if (value.length < 1) {
    resultDiv.innerHTML = "";
  } else if (prefixMatches.length > 0 || substringMatches.length > 0) {
    if (prefixMatches.length > 0) {
      resultDiv.innerHTML = prefixMatches.length + "/" + sites.length;
    } else if (substringMatches.length > 0) {
      resultDiv.innerHTML = substringMatches.length + "/" + sites.length;
    }
  }
};
function broadSearch(sites, searchTerm) {
  let matches = 0;
  for (var i = 0; i < sites.length; i++) {
    const match = elementTextSearch(sites[i], searchTerm);
    if (match) {
      matches++;
      sites[i].classList.add('show');
      sites[i].classList.remove('hidden');
    } else {
      sites[i].classList.remove('show');
      sites[i].classList.add('hidden');
    }
  }
  const resultDiv = document.getElementById("SearchResult");
  if (matches > 0) {
    resultDiv.innerHTML = matches + "/" + sites.length;
  } else {
    resultDiv.innerHTML = "0/" + sites.length;
  }
}
function elementTextSearch(element, term) {
  let match = false;
  const location = element.textContent.toLowerCase().indexOf(term);
  if (location !== -1) {
    match = true;
  } else if (recursiveLinkSearch(element, term)) {
    match = true;
  }
  return match;
}
function recursiveLinkSearch(element, term) {
  let match = false;
  if (element.tagName == "A") {
    const location = element.href.toLowerCase().indexOf(term);
    if (location !== -1) {
      match = true;
    }
  }
  for (const child of element.children) {
    if (recursiveLinkSearch(child, term)) {
      match = true;
    }
  }
  return match;
}
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
    if (project.isActive) {
      calcStats.activeProjects++;
      calcStats.projectHoursLeft += project.HoursLeft;
      calcStats.projectDaysLeft = Math.round(calcStats.projectHoursLeft / 5);
      calcStats.completeDate = new Date(new Date().getTime() + calcStats.projectDaysLeft * 24 * 60 * 60 * 1000);
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

/***/ "../theme-info-only/src/js/features/updateValues.js":
/*!**********************************************************!*\
  !*** ../theme-info-only/src/js/features/updateValues.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateValuesInit": function() { return /* binding */ updateValuesInit; }
/* harmony export */ });
/* harmony import */ var _initFeatures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");

function updateValuesInit() {
  const fields = document.getElementsByClassName('editable-field');
  const bars = document.getElementsByClassName('hour-graph');
  for (var i = 0; i < fields.length; i++) {
    const field = fields[i];
    field.removeEventListener('keydown', addEditing);
    field.addEventListener('keydown', addEditing);
  }
  for (var i = 0; i < bars.length; i++) {
    const bar = bars[i];
    bar.removeEventListener('click', selectField);
    bar.addEventListener('click', selectField);
  }
}
function selectField(event) {
  const bar = event.currentTarget;
  const field = bar.children[0].children[0];
  window.getSelection().selectAllChildren(field);
}
function addEditing(event) {
  if (event.key === "Enter") {
    //don't add newline
    event.preventDefault();
    //remove focus on field
    event.currentTarget.blur();
    window.getSelection().removeAllRanges();
    //get and submit new value
    const field = event.currentTarget;
    const newValue = field.innerHTML;

    // destination
    const proto = window.location.protocol;
    const hostname = window.location.hostname;
    const pm = field.parentElement.parentElement.parentElement.parentElement;
    const pmID = pm.dataset.id;
    const uri = "/our-sites/updateprojecthours/" + pmID + "/"; //project UUID 
    const destination = proto + "//" + hostname + uri;
    const formData = new FormData();
    formData.append("hours", newValue);
    const request = new XMLHttpRequest();
    request.open("POST", destination);
    request.send(formData);

    //response
    request.onreadystatechange = function () {
      //after response
      if (request.readyState == 4 && request.status == 200) {
        const response = request.responseText;
        const site = getParentSite(pm);
        site.outerHTML = response;
        //re-init here!
        updateStatHours(pmID, newValue);
        (0,_initFeatures__WEBPACK_IMPORTED_MODULE_0__.siteInit)();
        alert("Updated Hours");
      } else if (request.readyState == 4) {
        alert(request.status + " Error Updating Hours");
        field.innerHTML = window.stats.projects.filter(pr => pr.id == pmID)[0].CurrentHours;
      }
    };
  }
}
function getParentSite(elem) {
  if (elem.classList.contains("site")) {
    return elem;
  } else {
    return getParentSite(elem.parentElement);
  }
}
function updateStatHours(pmID, hours) {
  const project = window.stats.projects.filter(pr => pr.id == pmID);
  const left = document.querySelector('[data-id="' + pmID + '"]').dataset.hoursleft;
  project[0].CurrentHours = hours;
  project[0].HoursLeft = parseFloat(left);
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
/* harmony import */ var _js_features_updateValues__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/features/updateValues */ "../theme-info-only/src/js/features/updateValues.js");
/* harmony import */ var _js_features_addSite__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/features/addSite */ "../theme-info-only/src/js/features/addSite.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzlDRixNQUFNLENBQUNqTSxNQUFNLENBQUMvQixTQUFTLENBQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0w4TixNQUFNLENBQUNqTSxNQUFNLENBQUMvQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFDekM7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0I7QUFDSTtBQUNNO0FBQ1o7QUFDbEI7QUFDZ0M7QUFDVztBQUNiO0FBQ0g7QUFDUTtBQUNQO0FBQ08iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2FkZExpbmsuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvYWRkU2l0ZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL21lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvc3RhdHMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvdXBkYXRlVmFsdWVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5Q2xhc3MgPSB7XG5cbiAgYm9keU9iamVjdDogbnVsbCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG4gICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gIH0sXG5cbiAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIFxuICB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdET01Db250ZW50TG9hZGVkJyxcbiAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdiZWZvcmV1bmxvYWQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgLy8gcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBzdWJub2RlID0+IHtcbiAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAvL1xuICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8IGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgIHRvZ2dsZShub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgbGV0IGxpID0gdWxcbiAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAob3BlbiA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3dIaWRlQ3VycmVudFNpdGVzSW5pdChvbkZpcnN0SW5pdCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93SGlkZUN1cnJlbnQnKTtcbiAgICBpZihob2xkZXIpIHtcbiAgICAgICAgaG9sZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKG9uRmlyc3RJbml0KSB7XG4gICAgICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWFsbCcpO1xuICAgICAgICAvL2F1dG9tYXRpY2FsbHkgYXBwbHkgY3VycmVudCBmaWx0ZXIgaWYgYXQgbGVhc3Qgb25lIHNpdGUgd291bGQgYmUgZGlzcGxheWVkXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaG9sZGVyLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhvbGRlckV2ZW50SGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3Qgc2hvd0N1cnJlbnQgPSAhaG9sZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1jdXJyZW50Jyk7XG4gICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctY3VycmVudCcpO1xuICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWFsbCcpO1xuICAgIGNvbnN0IHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzW2ldO1xuICAgICAgICBpZigoc2hvd0N1cnJlbnQgJiYgc2l0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkgfHwgIXNob3dDdXJyZW50KSB7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLW5vdC1jdXJyZW50XCIpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LmFkZChcImhpZGUtbm90LWN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtzaXRlSW5pdH0gZnJvbSAnLi9pbml0RmVhdHVyZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaW5rSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2J1dHRvbicpO1xuICAgIC8vQWRkaW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25zW2ldO1xuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nIGxpc3RlbmVycyBqdXN0IGluIGNhc2UgKGVnIGZvciBwYXJ0aWFsIHJlc2V0cylcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhldmVudCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgLy9zbyBvbmx5IG9uZSBpbnB1dCBpcyBjcmVhdGVkXG4gICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID09IFwiZmFsc2VcIikge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FkZGxpbmtpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjI1MHB4XCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmZsb2F0ID0gXCJyaWdodFwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dExpbmsoYnV0dG9uLCBpbnB1dEVsZW1lbnQudmFsdWUpO31cbiAgICAgICAgICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJ1dHRvbi5iZWZvcmUoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2lucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0LnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbnB1dExpbmsoYnV0dG9uLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBidXR0b24uZGF0YXNldC51cmw7IFxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvdG8rXCIvL1wiK2hvc3RuYW1lK3VyaVxuXG4gICAgLy8gY29sbGF0ZSBmb3JtXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHNpdGUub3V0ZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAvL3JlLWluaXQgaGVyZSFcbiAgICAgICAgICAgIHNpdGVJbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufSIsImltcG9ydCB7c2l0ZUluaXR9IGZyb20gJy4vaW5pdEZlYXR1cmVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2l0ZUluaXQoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1zaXRlLWZyb250ZW5kJyk7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRTaXRlKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkU2l0ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRTaXRlKGV2ZW50KSB7XG4gICAgY29uc3QgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBpZiAoYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWRkc2l0ZWlucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIlxuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUuZmxvYXQgPSBcInJpZ2h0XCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIycmVtXCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiM3JlbVwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dFNpdGUoaW5wdXRFbGVtZW50LnZhbHVlKTt9XG4gICAgICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5hcHBlbmQoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkc2l0ZWlucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRTaXRlKGlucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5yZW1vdmUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlucHV0U2l0ZSh2YWx1ZSkge1xuICAgIC8vIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm90bytcIi8vXCIraG9zdG5hbWUrXCIvb3VyLXNpdGVzL2FkZHNpdGUvXCI7XG5cbiAgICAvLyBjb2xsYXRlIGZvcm1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImxpbmtcIiwgdmFsdWUpO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvL2RvIHNvbWV0aGluZyB0byByZWFjdGl2ZWx5IGFkZCB0aGUgbmV3IHNpdGUgdG8gdGhlIERPTVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgLy9yZS1pbml0IGhlcmUhXG4gICAgICAgICAgICBzaXRlSW5pdCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZHNUb2NJbml0KG9uRmlyc3RJbml0LCBjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG4gICAgaWYgKGZpZWxkc1RvYykge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWVsZF0nKVxuICAgICAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgaWYgKGl0ZW1zLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgICB1bEVsLmlkID0gJ2ZpbHRlclVsJ1xuXG4gICAgICAgIGNvbnN0IGVscyA9IFtdXG5cbiAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlIGl0ZW1zLi4uXG4gICAgICAgIGl0ZW1zLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgY29uc3QgYUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgICAgICBhRWwuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgICAgICAgICAgLy8gb24gY2xpY2tcbiAgICAgICAgICAgIGFFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRlc3QgPSB0aGlzLmlubmVySFRNTFxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnY3VycmVudCcpXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rJylcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodGVzdClcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlbGVjdGlvbi5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24uc3BsaWNlKHBvcywgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgZmlsdGVySXRlcmF0ZShhcnJheU9mU2VsZWN0b3JzLCBjdXJyZW50U2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFFbC5ocmVmID0gJyMnXG4gICAgICAgICAgICBhRWwuY2xhc3NMaXN0LmFkZCgnbGluaycpXG4gICAgICAgICAgICBlbHMucHVzaChhRWwpO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmRcbiAgICAgICAgICAgIGxpc3RFbC5hcHBlbmRDaGlsZChhRWwpXG4gICAgICAgICAgICB1bEVsLmFwcGVuZENoaWxkKGxpc3RFbClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxpc3RFbClcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFvbkZpcnN0SW5pdCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlclVsJykucmVtb3ZlKClcbiAgICAgICAgICAgIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbilcbiAgICAgICAgICAgIGVscy5mb3JFYWNoKGFFbCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24uaW5jbHVkZXMoYUVsLmlubmVySFRNTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgICAgICBhRWwuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBmaWVsZHNUb2MuYXBwZW5kQ2hpbGQodWxFbClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbikge1xuICAgIGFycmF5T2ZTZWxlY3RvcnMuZm9yRWFjaChkaXYgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgY29uc3QgZW1wdHkgPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCA9PT0gMFxuICAgICAgICBjb25zdCBwb3NJbkN1cnJlbnQgPSBjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpXG4gICAgICAgIGlmIChlbXB0eSB8fCBwb3NJbkN1cnJlbnQgIT09IC0xKSB7XG4gICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICAgIH0gZWxzZSBpZiAoZGl2LmNsYXNzTGlzdC5jb250YWlucygnbWlzc2luZy1saW5rcycpKSB7XG4gICAgICAgICAgICAvL2lzIHRoaXMgc2VjdGlvbiBhY3R1YWxseSBtaXNzaW5nP1xuICAgICAgICAgICAgc2V0TWlzc2luZ0xpbmtzRGlzcGxheShkaXYsIGVtcHR5LCBjdXJyZW50U2VsZWN0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9jYXRjaCBmb3IgbWlzc2luZyBsaW5rcyBzZWN0aW9uc1xuICAgICAgICAgICAgaWYgKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ2Vycm9yJykgJiYgY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKCdNaXNzaW5nJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2V0TWlzc2luZ0xpbmtzRGlzcGxheShkaXYsIGVtcHR5LCBjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgLy9hbnkgbGlua3MgdGhhdCBkb24ndCBoYXZlIGRpc3BsYXk6IG5vbmU/XG4gICAgbGV0IHNob3VsZERpc3BsYXkgPSBmYWxzZTtcbiAgICBjb25zdCBtaXNzaW5nTGlua3MgPSBkaXYucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1pc3NpbmdMaW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG1pc3NpbmdMaW5rc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKS50cmltKClcbiAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBzaG91bGREaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2hvdWxkRGlzcGxheSB8fCBlbXB0eSkge1xuICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH1cbiAgICAvL2Vsc2UsIGhpZGVcbn0iLCJpbXBvcnQge2FkZExpbmtJbml0fSBmcm9tICcuL2FkZExpbmsnO1xuaW1wb3J0IHtzaG93SGlkZUN1cnJlbnRTaXRlc0luaXR9IGZyb20gJy4vU2hvd0hpZGVDdXJyZW50U2l0ZXMnO1xuaW1wb3J0IHtmaWVsZHNUb2NJbml0fSBmcm9tICcuL2ZpZWxkc1RvYyc7XG5pbXBvcnQgeyB1cGRhdGVWYWx1ZXNJbml0IH0gZnJvbSAnLi91cGRhdGVWYWx1ZXMnO1xuaW1wb3J0IHsgcmVmcmVzaFN0YXRzIH0gZnJvbSAnLi9zdGF0cyc7XG5pbXBvcnQgeyBhZGRTaXRlSW5pdCB9IGZyb20gJy4vYWRkU2l0ZSc7XG5cbmxldCBjdXJyZW50RmllbGRzRmlsdGVycyA9IFtdO1xuXG5zaXRlSW5pdCh0cnVlKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNpdGVJbml0KGZpcnN0SW5pdD1mYWxzZSkge1xuICAgIGFkZExpbmtJbml0KCk7XG4gICAgc2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0KGZpcnN0SW5pdCk7XG4gICAgZmllbGRzVG9jSW5pdChmaXJzdEluaXQsIGN1cnJlbnRGaWVsZHNGaWx0ZXJzKTtcbiAgICB1cGRhdGVWYWx1ZXNJbml0KCk7XG4gICAgYWRkU2l0ZUluaXQoKTtcbiAgICByZWZyZXNoU3RhdHMoKTtcbn0iLCJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1ob2xkZXInKTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbWVudUl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtID0gbWVudUl0ZW1zW2ldO1xuICAgICAgICBtZW51SXRlbS5vbmNsaWNrID0gZnVuY3Rpb24oZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdvbicpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kLWJveCcpO1xuXG5jb25zdCBpbnB1dEhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0hpZGVDdXJyZW50Jyk7XG4gICAgY29uc3QgaHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2VhcmNoRmlsdGVySFInKTtcbiAgICB2YXIgc2l0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2l0ZVwiKTtcbiAgICBsZXQgcHJlZml4TWF0Y2hlcyA9IFtdO1xuICAgIGxldCBzdWJzdHJpbmdNYXRjaGVzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlcy5pdGVtKGkpXG4gICAgICAgIGNvbnN0IGlkID0gc2l0ZS5pZFxuICAgICAgICBjb25zdCByZXMgPSBpZC5zdWJzdHJpbmcoNSkuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmICghIHZhbHVlKSB7XG4gICAgICAgICAgICBjdXJyZW50RmlsdGVyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIGhyLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH0gZWxzZSBpZihyZXMgPT09IDApIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUgKyAnPScgKyBpZCArICctIHNob3cnIClcbiAgICAgICAgICAgIGN1cnJlbnRGaWx0ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGhyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzLnB1c2goc2l0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codmFsdWUgKyAnPScgKyBpZCArICctIGhpZGUnIClcbiAgICAgICAgICAgIGN1cnJlbnRGaWx0ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGhyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgaWYocmVzICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic3RyaW5nTWF0Y2hlcy5wdXNoKHNpdGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZWZpeE1hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeE1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByZWZpeE1hdGNoZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN1YnN0cmluZ01hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnN0cmluZ01hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnN0cmluZ01hdGNoZXNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgICAgICBzdWJzdHJpbmdNYXRjaGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAvL25vIG1hdGNoZXMgYnkgc2l0ZSBuYW1lLCBydW4gYSBicm9hZCBzZWFyY2hcbiAgICAgICAgYnJvYWRTZWFyY2goc2l0ZXMsIHZhbHVlKTtcbiAgICB9XG4gICAgLy9ncmVlbi9yZWQgY29sb3IgaWYgZmluZC9ub3QgZmluZCBzaXRlXG5cbiAgICBjb25zdCByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNlYXJjaFJlc3VsdFwiKTtcbiAgICAvL2Rpc3BsYXkgeHgveXlcbiAgICBpZiAodmFsdWUubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXN1bHREaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAocHJlZml4TWF0Y2hlcy5sZW5ndGggPiAwIHx8IHN1YnN0cmluZ01hdGNoZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAocHJlZml4TWF0Y2hlcy5sZW5ndGggPiAwKSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBwcmVmaXhNYXRjaGVzLmxlbmd0aCtcIi9cIitzaXRlcy5sZW5ndGg7fVxuICAgICAgICBlbHNlIGlmIChzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCA+IDApIHsgcmVzdWx0RGl2LmlubmVySFRNTCA9IHN1YnN0cmluZ01hdGNoZXMubGVuZ3RoK1wiL1wiK3NpdGVzLmxlbmd0aDt9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBicm9hZFNlYXJjaChzaXRlcywgc2VhcmNoVGVybSkge1xuICAgIGxldCBtYXRjaGVzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gZWxlbWVudFRleHRTZWFyY2goc2l0ZXNbaV0sIHNlYXJjaFRlcm0pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIG1hdGNoZXMrKztcbiAgICAgICAgICAgIHNpdGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgICAgIHNpdGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2l0ZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgICAgc2l0ZXNbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJTZWFyY2hSZXN1bHRcIik7XG4gICAgaWYgKG1hdGNoZXMgPiAwKSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBtYXRjaGVzK1wiL1wiK3NpdGVzLmxlbmd0aDt9XG4gICAgZWxzZSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBcIjAvXCIrc2l0ZXMubGVuZ3RoOyB9XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRUZXh0U2VhcmNoKGVsZW1lbnQsIHRlcm0pIHtcbiAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGVsZW1lbnQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRlcm0pO1xuICAgIGlmIChsb2NhdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZWN1cnNpdmVMaW5rU2VhcmNoKGVsZW1lbnQsIHRlcm0pKSB7XG4gICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoO1xufVxuXG5mdW5jdGlvbiByZWN1cnNpdmVMaW5rU2VhcmNoKGVsZW1lbnQsIHRlcm0pIHtcbiAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09IFwiQVwiKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZWxlbWVudC5ocmVmLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgZWxlbWVudC5jaGlsZHJlbikge1xuICAgICAgICBpZiAocmVjdXJzaXZlTGlua1NlYXJjaChjaGlsZCwgdGVybSkpIHtcbiAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2g7XG59XG5cbnNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0SGFuZGxlcik7XG4iLCJsZXQgY2FsY1N0YXRzID0ge307XG5cbnJlZnJlc2hTdGF0cygpO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaFN0YXRzKCkge1xuICAgIGNhbGN1bGF0ZVN0YXRzKCk7XG4gICAgZGlzcGxheVN0YXRzKCk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVN0YXRzKCkge1xuICAgIGNhbGNTdGF0cyA9IHtcbiAgICAgICAgdG90YWxTaXRlczogMCxcbiAgICAgICAgc2l0ZXNXaXRoQ3VycmVudFByb2plY3Q6IDAsXG4gICAgICAgIHRvdGFsUHJvamVjdHM6IDAsXG4gICAgICAgIGFjdGl2ZVByb2plY3RzOiAwLFxuICAgICAgICBwcm9qZWN0SG91cnNMZWZ0OiAwLFxuICAgICAgICBwcm9qZWN0RGF5c0xlZnQ6IDAsXG4gICAgICAgIGNvbXBsZXRlRGF0ZTogbmV3IERhdGUoKVxuICAgIH1cbiAgICAvL2NvdW50IHNpdGUgc3RhdHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5zdGF0cy5zaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzaXRlID0gd2luZG93LnN0YXRzLnNpdGVzW2ldO1xuICAgICAgICBjYWxjU3RhdHMudG90YWxTaXRlcysrO1xuICAgICAgICBpZiAoc2l0ZS5pc0N1cnJlbnQpIHtcbiAgICAgICAgICAgIGNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vY291bnQgcHJvamVjdCBzdGF0c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd2luZG93LnN0YXRzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB3aW5kb3cuc3RhdHMucHJvamVjdHNbaV07XG4gICAgICAgIGNhbGNTdGF0cy50b3RhbFByb2plY3RzKys7XG4gICAgICAgIGlmIChwcm9qZWN0LmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuYWN0aXZlUHJvamVjdHMrKztcbiAgICAgICAgICAgIGNhbGNTdGF0cy5wcm9qZWN0SG91cnNMZWZ0ICs9IHByb2plY3QuSG91cnNMZWZ0O1xuICAgICAgICAgICAgY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdCA9IE1hdGgucm91bmQoY2FsY1N0YXRzLnByb2plY3RIb3Vyc0xlZnQvNSk7XG4gICAgICAgICAgICBjYWxjU3RhdHMuY29tcGxldGVEYXRlID0gbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrKGNhbGNTdGF0cy5wcm9qZWN0RGF5c0xlZnQqMjQqNjAqNjAqMTAwMCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5U3RhdHMoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy10b3RhbC1zaXRlc1wiKS5pbm5lckhUTUwgPSBjYWxjU3RhdHMudG90YWxTaXRlcztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWN1cnJlbnQtc2l0ZXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtaW5hY3RpdmUtc2l0ZXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsU2l0ZXMtY2FsY1N0YXRzLnNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtdG90YWwtcHJvamVjdHNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsUHJvamVjdHM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1hY3RpdmUtcHJvamVjdHNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLmFjdGl2ZVByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcGFzdC1wcm9qZWN0c1wiKS5pbm5lckhUTUwgPSBjYWxjU3RhdHMudG90YWxQcm9qZWN0cy1jYWxjU3RhdHMuYWN0aXZlUHJvamVjdHM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1wcm9qZWN0LWhvdXJzXCIpLmlubmVySFRNTCA9IE1hdGgucm91bmQoY2FsY1N0YXRzLnByb2plY3RIb3Vyc0xlZnQpLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1wcm9qZWN0LWRheXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnByb2plY3REYXlzTGVmdC50b0xvY2FsZVN0cmluZyhcImVuLUdCXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtY29tcGxldGlvbi1kYXlcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLmNvbXBsZXRlRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1HQlwiKTtcbn0iLCJpbXBvcnQge3NpdGVJbml0fSBmcm9tICcuL2luaXRGZWF0dXJlcydcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlc0luaXQoKSB7XG4gICAgY29uc3QgZmllbGRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZWRpdGFibGUtZmllbGQnKTtcbiAgICBjb25zdCBiYXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaG91ci1ncmFwaCcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW2ldO1xuICAgICAgICBmaWVsZC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYWRkRWRpdGluZyk7XG4gICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBhZGRFZGl0aW5nKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJhciA9IGJhcnNbaV07XG4gICAgICAgIGJhci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEZpZWxkKTtcbiAgICAgICAgYmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VsZWN0RmllbGQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2VsZWN0RmllbGQoZXZlbnQpIHtcbiAgICBjb25zdCBiYXIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGZpZWxkID0gYmFyLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdO1xuICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5zZWxlY3RBbGxDaGlsZHJlbihmaWVsZCk7XG59XG5cbmZ1bmN0aW9uIGFkZEVkaXRpbmcoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgLy9kb24ndCBhZGQgbmV3bGluZVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvL3JlbW92ZSBmb2N1cyBvbiBmaWVsZFxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAvL2dldCBhbmQgc3VibWl0IG5ldyB2YWx1ZVxuICAgICAgICBjb25zdCBmaWVsZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZmllbGQuaW5uZXJIVE1MO1xuXG4gICAgICAgIC8vIGRlc3RpbmF0aW9uXG4gICAgICAgIGNvbnN0IHByb3RvID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgY29uc3QgcG0gPSBmaWVsZC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICAgIGNvbnN0IHBtSUQgPSBwbS5kYXRhc2V0LmlkO1xuICAgICAgICBjb25zdCB1cmkgPSBcIi9vdXItc2l0ZXMvdXBkYXRlcHJvamVjdGhvdXJzL1wiK3BtSUQrXCIvXCI7IC8vcHJvamVjdCBVVUlEIFxuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHByb3RvK1wiLy9cIitob3N0bmFtZSt1cmlcblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJob3Vyc1wiLCBuZXdWYWx1ZSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKFwiUE9TVFwiLCBkZXN0aW5hdGlvbik7XG4gICAgICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAgICAgLy9yZXNwb25zZVxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9hZnRlciByZXNwb25zZVxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2l0ZSA9IGdldFBhcmVudFNpdGUocG0pO1xuICAgICAgICAgICAgICAgIHNpdGUub3V0ZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgLy9yZS1pbml0IGhlcmUhXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdEhvdXJzKHBtSUQsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICBzaXRlSW5pdCgpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBkYXRlZCBIb3Vyc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQocmVxdWVzdC5zdGF0dXMgKyBcIiBFcnJvciBVcGRhdGluZyBIb3Vyc1wiKTtcbiAgICAgICAgICAgICAgICBmaWVsZC5pbm5lckhUTUwgPSB3aW5kb3cuc3RhdHMucHJvamVjdHMuZmlsdGVyKHByID0+IHByLmlkID09IHBtSUQpWzBdLkN1cnJlbnRIb3VycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudFNpdGUoZWxlbSkge1xuICAgIGlmIChlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcInNpdGVcIikpIHtcbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0UGFyZW50U2l0ZShlbGVtLnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RhdEhvdXJzKHBtSUQsIGhvdXJzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHdpbmRvdy5zdGF0cy5wcm9qZWN0cy5maWx0ZXIocHIgPT4gcHIuaWQgPT0gcG1JRCk7XG4gICAgY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlkPVwiJytwbUlEKydcIl0nKS5kYXRhc2V0LmhvdXJzbGVmdDtcbiAgICBwcm9qZWN0WzBdLkN1cnJlbnRIb3VycyA9IGhvdXJzO1xuICAgIHByb2plY3RbMF0uSG91cnNMZWZ0ID0gcGFyc2VGbG9hdChsZWZ0KTtcbn0iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJcbi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbi8vIGltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvZmllbGRzVG9jJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2FkZExpbmsnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvbWVudSdcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9pbml0RmVhdHVyZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvc3RhdHMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvdXBkYXRlVmFsdWVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2FkZFNpdGUnIl0sIm5hbWVzIjpbImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJpbml0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJub2RlIiwiY29udGFpbnMiLCJhcHBseVRvIiwic3Vibm9kZSIsImxpIiwicGFyZW50Tm9kZSIsInN0eWxlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJsZW5ndGgiLCJzcGFuIiwiY3JlYXRlRWxlbWVudCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsInRvZ2dsZSIsImluc2VydEJlZm9yZSIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsIm9wZW4iLCJ1bHMiLCJkaXNwbGF5IiwibXlDb29raWUiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWVFUSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJlcmFzZUNvb2tpZSIsInNob3dIaWRlQ3VycmVudFNpdGVzSW5pdCIsIm9uRmlyc3RJbml0IiwiaG9sZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaG9sZGVyRXZlbnRIYW5kbGVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNsaWNrIiwiY3VycmVudFRhcmdldCIsInNob3dDdXJyZW50Iiwic2l0ZXMiLCJzaXRlIiwic2l0ZUluaXQiLCJhZGRMaW5rSW5pdCIsImJ1dHRvbnMiLCJidXR0b24iLCJhZGRMaW5rQ2xpY2siLCJkYXRhc2V0IiwiaW5wdXRhY3RpdmUiLCJpbnB1dEVsZW1lbnQiLCJ0eXBlIiwid2lkdGgiLCJmbG9hdCIsImtleSIsImlucHV0TGluayIsImJlZm9yZSIsImZvY3VzIiwiaW5wdXQiLCJwYXJlbnRFbGVtZW50IiwibGluayIsInByb3RvIiwibG9jYXRpb24iLCJwcm90b2NvbCIsImhvc3RuYW1lIiwidXJpIiwidXJsIiwiZGVzdGluYXRpb24iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwic2VuZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIm91dGVySFRNTCIsImFkZFNpdGVJbml0IiwiYWRkU2l0ZSIsImZvbnRTaXplIiwiaGVpZ2h0IiwiaW5wdXRTaXRlIiwiYm9keSIsImZpZWxkc1RvY0luaXQiLCJjdXJyZW50U2VsZWN0aW9uIiwiZmllbGRzVG9jIiwic2VsZWN0b3JzIiwicXVlcnlTZWxlY3RvckFsbCIsImFycmF5T2ZTZWxlY3RvcnMiLCJpdGVtcyIsImRpdiIsImdldEF0dHJpYnV0ZSIsInRyaW0iLCJwdXNoIiwidWxFbCIsImlkIiwiZWxzIiwibGlzdEVsIiwiYUVsIiwidGVzdCIsInBvcyIsInNwbGljZSIsInByZXZlbnREZWZhdWx0IiwiZmlsdGVySXRlcmF0ZSIsImhyZWYiLCJhcHBlbmRDaGlsZCIsImluY2x1ZGVzIiwiZW1wdHkiLCJwb3NJbkN1cnJlbnQiLCJzZXRNaXNzaW5nTGlua3NEaXNwbGF5Iiwic2hvdWxkRGlzcGxheSIsIm1pc3NpbmdMaW5rcyIsInVwZGF0ZVZhbHVlc0luaXQiLCJyZWZyZXNoU3RhdHMiLCJjdXJyZW50RmllbGRzRmlsdGVycyIsImZpcnN0SW5pdCIsIm9ubG9hZCIsIm1lbnVJdGVtcyIsIm1lbnVJdGVtIiwib25jbGljayIsInNvdXJjZSIsImlucHV0SGFuZGxlciIsInRvTG93ZXJDYXNlIiwiY3VycmVudEZpbHRlciIsImhyIiwicHJlZml4TWF0Y2hlcyIsInN1YnN0cmluZ01hdGNoZXMiLCJpdGVtIiwicmVzIiwiYnJvYWRTZWFyY2giLCJyZXN1bHREaXYiLCJzZWFyY2hUZXJtIiwibWF0Y2hlcyIsIm1hdGNoIiwiZWxlbWVudFRleHRTZWFyY2giLCJlbGVtZW50IiwidGVybSIsInRleHRDb250ZW50IiwicmVjdXJzaXZlTGlua1NlYXJjaCIsInRhZ05hbWUiLCJjaGlsZCIsImNoaWxkcmVuIiwiY2FsY1N0YXRzIiwiY2FsY3VsYXRlU3RhdHMiLCJkaXNwbGF5U3RhdHMiLCJ0b3RhbFNpdGVzIiwic2l0ZXNXaXRoQ3VycmVudFByb2plY3QiLCJ0b3RhbFByb2plY3RzIiwiYWN0aXZlUHJvamVjdHMiLCJwcm9qZWN0SG91cnNMZWZ0IiwicHJvamVjdERheXNMZWZ0IiwiY29tcGxldGVEYXRlIiwic3RhdHMiLCJpc0N1cnJlbnQiLCJwcm9qZWN0cyIsInByb2plY3QiLCJpc0FjdGl2ZSIsIkhvdXJzTGVmdCIsIk1hdGgiLCJyb3VuZCIsInRvTG9jYWxlU3RyaW5nIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiZmllbGRzIiwiYmFycyIsImZpZWxkIiwiYWRkRWRpdGluZyIsImJhciIsInNlbGVjdEZpZWxkIiwiZ2V0U2VsZWN0aW9uIiwic2VsZWN0QWxsQ2hpbGRyZW4iLCJibHVyIiwicmVtb3ZlQWxsUmFuZ2VzIiwibmV3VmFsdWUiLCJwbSIsInBtSUQiLCJnZXRQYXJlbnRTaXRlIiwidXBkYXRlU3RhdEhvdXJzIiwiYWxlcnQiLCJmaWx0ZXIiLCJwciIsIkN1cnJlbnRIb3VycyIsImVsZW0iLCJob3VycyIsImxlZnQiLCJxdWVyeVNlbGVjdG9yIiwiaG91cnNsZWZ0IiwicGFyc2VGbG9hdCIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInJlcGxhY2UiXSwic291cmNlUm9vdCI6IiJ9
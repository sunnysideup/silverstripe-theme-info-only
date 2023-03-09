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

    //alphabetical order
    items.sort();
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
/* harmony import */ var _keyClickCopy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyClickCopy */ "../theme-info-only/src/js/features/keyClickCopy.js");







let currentFieldsFilters = [];
siteInit(true);
function siteInit(firstInit = false) {
  (0,_addLink__WEBPACK_IMPORTED_MODULE_0__.addLinkInit)();
  (0,_ShowHideCurrentSites__WEBPACK_IMPORTED_MODULE_1__.showHideCurrentSitesInit)(firstInit);
  (0,_fieldsToc__WEBPACK_IMPORTED_MODULE_2__.fieldsTocInit)(firstInit, currentFieldsFilters);
  (0,_updateValues__WEBPACK_IMPORTED_MODULE_3__.updateValuesInit)();
  (0,_addSite__WEBPACK_IMPORTED_MODULE_5__.addSiteInit)();
  (0,_keyClickCopy__WEBPACK_IMPORTED_MODULE_6__.keyClickCopyInit)();
  (0,_stats__WEBPACK_IMPORTED_MODULE_4__.refreshStats)();
}

/***/ }),

/***/ "../theme-info-only/src/js/features/keyClickCopy.js":
/*!**********************************************************!*\
  !*** ../theme-info-only/src/js/features/keyClickCopy.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "keyClickCopyInit": function() { return /* binding */ keyClickCopyInit; }
/* harmony export */ });
function keyClickCopyInit() {
  const keys = document.getElementsByClassName('password');
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    key.removeEventListener('click', clickCopy);
    key.addEventListener('click', clickCopy);
    key.title = "Click to copy to clipboard";
  }
}
function clickCopy(event) {
  const keyElem = event.currentTarget;
  const text = keyElem.innerText;

  // for compatibility
  if (!navigator.clipboard) {
    // compatibility fallback from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  } else {
    navigator.clipboard.writeText(text);
  }
}

/***/ }),

/***/ "../theme-info-only/src/js/features/menu.js":
/*!**************************************************!*\
  !*** ../theme-info-only/src/js/features/menu.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _urlParameters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./urlParameters */ "../theme-info-only/src/js/features/urlParameters.js");

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
  const urlSearch = (0,_urlParameters__WEBPACK_IMPORTED_MODULE_0__.getURLParam)('s');
  if (urlSearch !== null) {
    performSearch(urlSearch);
    source.value = urlSearch;
  }
};
const source = document.getElementById('find-box');
const inputHandler = function (e) {
  const value = e.target.value.toLowerCase();
  performSearch(value);
  (0,_urlParameters__WEBPACK_IMPORTED_MODULE_0__.setURLParam)("s", value);
};
function performSearch(value) {
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
}
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

/***/ "../theme-info-only/src/js/features/urlParameters.js":
/*!***********************************************************!*\
  !*** ../theme-info-only/src/js/features/urlParameters.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getURLParam": function() { return /* binding */ getURLParam; },
/* harmony export */   "setURLParam": function() { return /* binding */ setURLParam; }
/* harmony export */ });
const urlParams = new URLSearchParams(window.location.search);
function setURLParam(keyString, valueString) {
  if (valueString === '') {
    urlParams.delete(keyString);
  } else {
    urlParams.set(keyString, valueString);
  }
  var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
  window.history.pushState({
    path: newUrl
  }, '', newUrl);
}
function getURLParam(keyString) {
  return urlParams.get(keyString);
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
/* harmony import */ var _js_features_initFeatures__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/features/initFeatures */ "../theme-info-only/src/js/features/initFeatures.js");
/* harmony import */ var _js_features_stats__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/features/stats */ "../theme-info-only/src/js/features/stats.js");
/* harmony import */ var _js_features_updateValues__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/features/updateValues */ "../theme-info-only/src/js/features/updateValues.js");
/* harmony import */ var _js_features_addSite__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/features/addSite */ "../theme-info-only/src/js/features/addSite.js");
/* harmony import */ var _js_features_keyClickCopy__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/features/keyClickCopy */ "../theme-info-only/src/js/features/keyClickCopy.js");
/* harmony import */ var _js_features_urlParameters__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/features/urlParameters */ "../theme-info-only/src/js/features/urlParameters.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sRUFBRXVRLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDNURGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUN0USxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUV1USxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBRWpFLElBQUlDLEdBQUcsR0FBRzNRLFFBQVEsQ0FBQzRRLFdBQVcsQ0FBQyxZQUFZLENBQUM7RUFDNUNELEdBQUcsQ0FBQ0UsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0VBQ3BDTCxVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDSyxhQUFhLENBQUNILEdBQUcsQ0FBQztBQUNsQztBQUVBLFNBQVNELGFBQWEsQ0FBRUssTUFBTSxFQUFFO0VBQzlCLElBQUlDLE1BQU0sR0FBR0QsTUFBTSxDQUFDM08sTUFBTSxDQUFDUSxLQUFLO0VBQ2hDLElBQUlvTyxNQUFNLElBQUlBLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM5Q0YsTUFBTSxDQUFDM08sTUFBTSxDQUFDL0IsU0FBUyxDQUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzVDLENBQUMsTUFBTTtJQUNMd1EsTUFBTSxDQUFDM08sTUFBTSxDQUFDL0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0VBQ3pDO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ007QUFDWjtBQUNsQjtBQUNnQztBQUNXO0FBQ2I7QUFDSDtBQUNRO0FBQ1A7QUFDTztBQUNMO0FBQ0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2FkZExpbmsuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvYWRkU2l0ZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL2tleUNsaWNrQ29weS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL3N0YXRzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2ZlYXR1cmVzL3VwZGF0ZVZhbHVlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy91cmxQYXJhbWV0ZXJzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBib2R5Q2xhc3MgPSB7XG5cbiAgYm9keU9iamVjdDogbnVsbCxcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdXG4gICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gIH0sXG5cbiAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIFxuICB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdET01Db250ZW50TG9hZGVkJyxcbiAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdiZWZvcmV1bmxvYWQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgIH1cbiAgICApXG4gIH1cblxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgLy8gcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBzdWJub2RlID0+IHtcbiAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAvL1xuICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8IGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpKSB7XG4gICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICB9XG5cbiAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgIHRvZ2dsZShub2RlKVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgLy9cbiAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgbGV0IGxpID0gdWxcbiAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSAob3BlbiA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgICB9XG4gICAgfSlcblxuICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3dIaWRlQ3VycmVudFNpdGVzSW5pdChvbkZpcnN0SW5pdCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdTaG93SGlkZUN1cnJlbnQnKTtcbiAgICBpZihob2xkZXIpIHtcbiAgICAgICAgaG9sZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaG9sZGVyRXZlbnRIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG4gICAgaWYgKG9uRmlyc3RJbml0KSB7XG4gICAgICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWFsbCcpO1xuICAgICAgICAvL2F1dG9tYXRpY2FsbHkgYXBwbHkgY3VycmVudCBmaWx0ZXIgaWYgYXQgbGVhc3Qgb25lIHNpdGUgd291bGQgYmUgZGlzcGxheWVkXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjdXJyZW50JykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaG9sZGVyLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhvbGRlckV2ZW50SGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGhvbGRlciA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3Qgc2hvd0N1cnJlbnQgPSAhaG9sZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2hvdy1jdXJyZW50Jyk7XG4gICAgaG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctY3VycmVudCcpO1xuICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWFsbCcpO1xuICAgIGNvbnN0IHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHNpdGVzW2ldO1xuICAgICAgICBpZigoc2hvd0N1cnJlbnQgJiYgc2l0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkgfHwgIXNob3dDdXJyZW50KSB7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlLW5vdC1jdXJyZW50XCIpO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LmFkZChcImhpZGUtbm90LWN1cnJlbnRcIik7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtzaXRlSW5pdH0gZnJvbSAnLi9pbml0RmVhdHVyZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRMaW5rSW5pdCgpIHtcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2J1dHRvbicpO1xuICAgIC8vQWRkaW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBidXR0b25zW2ldO1xuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nIGxpc3RlbmVycyBqdXN0IGluIGNhc2UgKGVnIGZvciBwYXJ0aWFsIHJlc2V0cylcbiAgICAgICAgYnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkTGlua0NsaWNrKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFkZExpbmtDbGljayhldmVudCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgLy9zbyBvbmx5IG9uZSBpbnB1dCBpcyBjcmVhdGVkXG4gICAgaWYgKGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID09IFwiZmFsc2VcIikge1xuICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwidHJ1ZVwiO1xuICAgICAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FkZGxpbmtpbnB1dCcpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjI1MHB4XCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmZsb2F0ID0gXCJyaWdodFwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dExpbmsoYnV0dG9uLCBpbnB1dEVsZW1lbnQudmFsdWUpO31cbiAgICAgICAgICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJ1dHRvbi5iZWZvcmUoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2lucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0LnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbnB1dExpbmsoYnV0dG9uLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBidXR0b24uZGF0YXNldC51cmw7IFxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvdG8rXCIvL1wiK2hvc3RuYW1lK3VyaVxuXG4gICAgLy8gY29sbGF0ZSBmb3JtXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICBjb25zdCBzaXRlID0gYnV0dG9uLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHNpdGUub3V0ZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAvL3JlLWluaXQgaGVyZSFcbiAgICAgICAgICAgIHNpdGVJbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xufSIsImltcG9ydCB7c2l0ZUluaXR9IGZyb20gJy4vaW5pdEZlYXR1cmVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2l0ZUluaXQoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1zaXRlLWZyb250ZW5kJyk7XG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRTaXRlKTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkU2l0ZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRTaXRlKGV2ZW50KSB7XG4gICAgY29uc3QgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBpZiAoYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIGJ1dHRvbi5kYXRhc2V0LmlucHV0YWN0aXZlID0gXCJ0cnVlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWRkc2l0ZWlucHV0Jyk7XG4gICAgICAgIGlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMjUwcHhcIlxuICAgICAgICBpbnB1dEVsZW1lbnQuc3R5bGUuZmxvYXQgPSBcInJpZ2h0XCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIycmVtXCJcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiM3JlbVwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dFNpdGUoaW5wdXRFbGVtZW50LnZhbHVlKTt9XG4gICAgICAgICAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBidXR0b24ucGFyZW50RWxlbWVudC5hcHBlbmQoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkc2l0ZWlucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRTaXRlKGlucHV0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnB1dC5yZW1vdmUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlucHV0U2l0ZSh2YWx1ZSkge1xuICAgIC8vIGRlc3RpbmF0aW9uXG4gICAgY29uc3QgcHJvdG8gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm90bytcIi8vXCIraG9zdG5hbWUrXCIvb3VyLXNpdGVzL2FkZHNpdGUvXCI7XG5cbiAgICAvLyBjb2xsYXRlIGZvcm1cbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImxpbmtcIiwgdmFsdWUpO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvL2RvIHNvbWV0aGluZyB0byByZWFjdGl2ZWx5IGFkZCB0aGUgbmV3IHNpdGUgdG8gdGhlIERPTVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgLy9yZS1pbml0IGhlcmUhXG4gICAgICAgICAgICBzaXRlSW5pdCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG59IiwiLyoqXG4gKiBpZiB0aGVyZSBpcyBhIGRpdiB3aXRoIElEIGZpZWxkc1RvY1xuICogdGhlbiBpdCBydW5zXG4gKiBJdCB3aWxsIGxvb2sgZm9yIGFsbCBkYXRhLWZpZWxkIGFuZCBjcmVhdGUgYSBGaWVsZHMgVGFibGUgb2YgQ29udGVudHNcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWVsZHNUb2NJbml0KG9uRmlyc3RJbml0LCBjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG4gICAgaWYgKGZpZWxkc1RvYykge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1maWVsZF0nKVxuICAgICAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgIC8vIGNvbnN0IGl0ZW1zID0gYXJyYXlPZlNlbGVjdG9ycy5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSlcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXVxuICAgICAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1maWVsZCcpLnRyaW0oKVxuICAgICAgICAgICAgaWYgKGl0ZW1zLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICAvL2FscGhhYmV0aWNhbCBvcmRlclxuICAgICAgICBpdGVtcy5zb3J0KCk7XG5cbiAgICAgICAgY29uc3QgdWxFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcbiAgICAgICAgdWxFbC5pZCA9ICdmaWx0ZXJVbCdcblxuICAgICAgICBjb25zdCBlbHMgPSBbXVxuXG4gICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZSBpdGVtcy4uLlxuICAgICAgICBpdGVtcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGNvbnN0IGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICAgICAgYUVsLmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAgICAgICAgIC8vIG9uIGNsaWNrXG4gICAgICAgICAgICBhRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gdGhpcy5pbm5lckhUTUxcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnbGluaycpXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHRlc3QpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZWxlY3Rpb24ucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnNwbGljZShwb3MsIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIGZpbHRlckl0ZXJhdGUoYXJyYXlPZlNlbGVjdG9ycywgY3VycmVudFNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhRWwuaHJlZiA9ICcjJ1xuICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKVxuICAgICAgICAgICAgZWxzLnB1c2goYUVsKTtcblxuICAgICAgICAgICAgLy8gYXBwZW5kXG4gICAgICAgICAgICBsaXN0RWwuYXBwZW5kQ2hpbGQoYUVsKVxuICAgICAgICAgICAgdWxFbC5hcHBlbmRDaGlsZChsaXN0RWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsaXN0RWwpXG4gICAgICAgIH0pXG4gICAgICAgIGlmICghb25GaXJzdEluaXQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXJVbCcpLnJlbW92ZSgpXG4gICAgICAgICAgICBmaWx0ZXJJdGVyYXRlKGFycmF5T2ZTZWxlY3RvcnMsIGN1cnJlbnRTZWxlY3Rpb24pXG4gICAgICAgICAgICBlbHMuZm9yRWFjaChhRWwgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uLmluY2x1ZGVzKGFFbC5pbm5lckhUTUwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFFbC5jbGFzc0xpc3QudG9nZ2xlKCdjdXJyZW50JylcbiAgICAgICAgICAgICAgICAgICAgYUVsLmNsYXNzTGlzdC50b2dnbGUoJ2xpbmsnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZmllbGRzVG9jLmFwcGVuZENoaWxkKHVsRWwpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaWx0ZXJJdGVyYXRlKGFycmF5T2ZTZWxlY3RvcnMsIGN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGNvbnN0IGVtcHR5ID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGggPT09IDBcbiAgICAgICAgY29uc3QgcG9zSW5DdXJyZW50ID0gY3VycmVudFNlbGVjdGlvbi5pbmRleE9mKHZhbHVlKVxuICAgICAgICBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICB9IGVsc2UgaWYgKGRpdi5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3NpbmctbGlua3MnKSkge1xuICAgICAgICAgICAgLy9pcyB0aGlzIHNlY3Rpb24gYWN0dWFsbHkgbWlzc2luZz9cbiAgICAgICAgICAgIHNldE1pc3NpbmdMaW5rc0Rpc3BsYXkoZGl2LCBlbXB0eSwgY3VycmVudFNlbGVjdGlvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY2F0Y2ggZm9yIG1pc3NpbmcgbGlua3Mgc2VjdGlvbnNcbiAgICAgICAgICAgIGlmIChkaXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdlcnJvcicpICYmIGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZignTWlzc2luZycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNldE1pc3NpbmdMaW5rc0Rpc3BsYXkoZGl2LCBlbXB0eSwgY3VycmVudFNlbGVjdGlvbikge1xuICAgIC8vYW55IGxpbmtzIHRoYXQgZG9uJ3QgaGF2ZSBkaXNwbGF5OiBub25lP1xuICAgIGxldCBzaG91bGREaXNwbGF5ID0gZmFsc2U7XG4gICAgY29uc3QgbWlzc2luZ0xpbmtzID0gZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXNzaW5nTGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBtaXNzaW5nTGlua3NbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9uLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgICAgICAgc2hvdWxkRGlzcGxheSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNob3VsZERpc3BsYXkgfHwgZW1wdHkpIHtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9XG4gICAgLy9lbHNlLCBoaWRlXG59IiwiaW1wb3J0IHthZGRMaW5rSW5pdH0gZnJvbSAnLi9hZGRMaW5rJztcbmltcG9ydCB7c2hvd0hpZGVDdXJyZW50U2l0ZXNJbml0fSBmcm9tICcuL1Nob3dIaWRlQ3VycmVudFNpdGVzJztcbmltcG9ydCB7ZmllbGRzVG9jSW5pdH0gZnJvbSAnLi9maWVsZHNUb2MnO1xuaW1wb3J0IHsgdXBkYXRlVmFsdWVzSW5pdCB9IGZyb20gJy4vdXBkYXRlVmFsdWVzJztcbmltcG9ydCB7IHJlZnJlc2hTdGF0cyB9IGZyb20gJy4vc3RhdHMnO1xuaW1wb3J0IHsgYWRkU2l0ZUluaXQgfSBmcm9tICcuL2FkZFNpdGUnO1xuaW1wb3J0IHsga2V5Q2xpY2tDb3B5SW5pdCB9IGZyb20gJy4va2V5Q2xpY2tDb3B5JztcblxubGV0IGN1cnJlbnRGaWVsZHNGaWx0ZXJzID0gW107XG5cbnNpdGVJbml0KHRydWUpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2l0ZUluaXQoZmlyc3RJbml0PWZhbHNlKSB7XG4gICAgYWRkTGlua0luaXQoKTtcbiAgICBzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQoZmlyc3RJbml0KTtcbiAgICBmaWVsZHNUb2NJbml0KGZpcnN0SW5pdCwgY3VycmVudEZpZWxkc0ZpbHRlcnMpO1xuICAgIHVwZGF0ZVZhbHVlc0luaXQoKTtcbiAgICBhZGRTaXRlSW5pdCgpO1xuICAgIGtleUNsaWNrQ29weUluaXQoKTtcbiAgICByZWZyZXNoU3RhdHMoKTtcbn0iLCJleHBvcnQgZnVuY3Rpb24ga2V5Q2xpY2tDb3B5SW5pdCgpIHtcbiAgICBjb25zdCBrZXlzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGFzc3dvcmQnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgICAga2V5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDb3B5KTtcbiAgICAgICAga2V5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDb3B5KTtcbiAgICAgICAga2V5LnRpdGxlID0gXCJDbGljayB0byBjb3B5IHRvIGNsaXBib2FyZFwiXG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbGlja0NvcHkoZXZlbnQpIHtcbiAgICBjb25zdCBrZXlFbGVtID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCB0ZXh0ID0ga2V5RWxlbS5pbm5lclRleHQ7XG5cbiAgICAvLyBmb3IgY29tcGF0aWJpbGl0eVxuICAgIGlmICghbmF2aWdhdG9yLmNsaXBib2FyZCkge1xuICAgICAgICAvLyBjb21wYXRpYmlsaXR5IGZhbGxiYWNrIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAwMjEyL2hvdy1kby1pLWNvcHktdG8tdGhlLWNsaXBib2FyZC1pbi1qYXZhc2NyaXB0XG4gICAgICAgIHZhciB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuICAgICAgICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICB0ZXh0QXJlYS5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgICAgICAgdGV4dEFyZWEuZm9jdXMoKTtcbiAgICAgICAgdGV4dEFyZWEuc2VsZWN0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICAgICAgICAgIHZhciBtc2cgPSBzdWNjZXNzZnVsID8gJ3N1Y2Nlc3NmdWwnIDogJ3Vuc3VjY2Vzc2Z1bCc7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhbGxiYWNrOiBDb3B5aW5nIHRleHQgY29tbWFuZCB3YXMgJyArIG1zZyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhbGxiYWNrOiBPb3BzLCB1bmFibGUgdG8gY29weScsIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgfVxufSIsImltcG9ydCB7IGdldFVSTFBhcmFtLCBzZXRVUkxQYXJhbSB9IGZyb20gXCIuL3VybFBhcmFtZXRlcnNcIjtcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaG9sZGVyJyk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG1lbnVJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtZW51SXRlbSA9IG1lbnVJdGVtc1tpXTtcbiAgICAgICAgbWVudUl0ZW0ub25jbGljayA9IGZ1bmN0aW9uKGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnb24nKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHVybFNlYXJjaCA9IGdldFVSTFBhcmFtKCdzJyk7XG4gICAgaWYgKHVybFNlYXJjaCAhPT0gbnVsbCkge1xuICAgICAgICBwZXJmb3JtU2VhcmNoKHVybFNlYXJjaCk7XG4gICAgICAgIHNvdXJjZS52YWx1ZSA9IHVybFNlYXJjaDtcbiAgICB9XG59XG5cbmNvbnN0IHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5kLWJveCcpO1xuXG5jb25zdCBpbnB1dEhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIHBlcmZvcm1TZWFyY2godmFsdWUpO1xuICAgIHNldFVSTFBhcmFtKFwic1wiLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1TZWFyY2godmFsdWUpIHtcbiAgICBjb25zdCBjdXJyZW50RmlsdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Nob3dIaWRlQ3VycmVudCcpO1xuICAgIGNvbnN0IGhyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1NlYXJjaEZpbHRlckhSJyk7XG4gICAgdmFyIHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNpdGVcIik7XG4gICAgbGV0IHByZWZpeE1hdGNoZXMgPSBbXTtcbiAgICBsZXQgc3Vic3RyaW5nTWF0Y2hlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzaXRlID0gc2l0ZXMuaXRlbShpKVxuICAgICAgICBjb25zdCBpZCA9IHNpdGUuaWRcbiAgICAgICAgY29uc3QgcmVzID0gaWQuc3Vic3RyaW5nKDUpLmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoISB2YWx1ZSkge1xuICAgICAgICAgICAgY3VycmVudEZpbHRlci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICBoci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICBzaXRlLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9IGVsc2UgaWYocmVzID09PSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlICsgJz0nICsgaWQgKyAnLSBzaG93JyApXG4gICAgICAgICAgICBjdXJyZW50RmlsdGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBoci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgcHJlZml4TWF0Y2hlcy5wdXNoKHNpdGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHZhbHVlICsgJz0nICsgaWQgKyAnLSBoaWRlJyApXG4gICAgICAgICAgICBjdXJyZW50RmlsdGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBoci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgc2l0ZS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICAgIHNpdGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgICAgIGlmKHJlcyAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnN0cmluZ01hdGNoZXMucHVzaChzaXRlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwcmVmaXhNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXhNYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxuICAgICAgICAgICAgcHJlZml4TWF0Y2hlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzdWJzdHJpbmdNYXRjaGVzW2ldLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKVxuICAgICAgICAgICAgc3Vic3RyaW5nTWF0Y2hlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy9ubyBtYXRjaGVzIGJ5IHNpdGUgbmFtZSwgcnVuIGEgYnJvYWQgc2VhcmNoXG4gICAgICAgIGJyb2FkU2VhcmNoKHNpdGVzLCB2YWx1ZSk7XG4gICAgfVxuICAgIC8vZ3JlZW4vcmVkIGNvbG9yIGlmIGZpbmQvbm90IGZpbmQgc2l0ZVxuXG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJTZWFyY2hSZXN1bHRcIik7XG4gICAgLy9kaXNwbGF5IHh4L3l5XG4gICAgaWYgKHZhbHVlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmVzdWx0RGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHByZWZpeE1hdGNoZXMubGVuZ3RoID4gMCB8fCBzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHByZWZpeE1hdGNoZXMubGVuZ3RoID4gMCkgeyByZXN1bHREaXYuaW5uZXJIVE1MID0gcHJlZml4TWF0Y2hlcy5sZW5ndGgrXCIvXCIrc2l0ZXMubGVuZ3RoO31cbiAgICAgICAgZWxzZSBpZiAoc3Vic3RyaW5nTWF0Y2hlcy5sZW5ndGggPiAwKSB7IHJlc3VsdERpdi5pbm5lckhUTUwgPSBzdWJzdHJpbmdNYXRjaGVzLmxlbmd0aCtcIi9cIitzaXRlcy5sZW5ndGg7fVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYnJvYWRTZWFyY2goc2l0ZXMsIHNlYXJjaFRlcm0pIHtcbiAgICBsZXQgbWF0Y2hlcyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGVsZW1lbnRUZXh0U2VhcmNoKHNpdGVzW2ldLCBzZWFyY2hUZXJtKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBtYXRjaGVzKys7XG4gICAgICAgICAgICBzaXRlc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICBzaXRlc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpdGVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIHNpdGVzW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU2VhcmNoUmVzdWx0XCIpO1xuICAgIGlmIChtYXRjaGVzID4gMCkgeyByZXN1bHREaXYuaW5uZXJIVE1MID0gbWF0Y2hlcytcIi9cIitzaXRlcy5sZW5ndGg7fVxuICAgIGVsc2UgeyByZXN1bHREaXYuaW5uZXJIVE1MID0gXCIwL1wiK3NpdGVzLmxlbmd0aDsgfVxufVxuXG5mdW5jdGlvbiBlbGVtZW50VGV4dFNlYXJjaChlbGVtZW50LCB0ZXJtKSB7XG4gICAgbGV0IG1hdGNoID0gZmFsc2U7XG4gICAgY29uc3QgbG9jYXRpb24gPSBlbGVtZW50LnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXJtKTtcbiAgICBpZiAobG9jYXRpb24gIT09IC0xKSB7XG4gICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVjdXJzaXZlTGlua1NlYXJjaChlbGVtZW50LCB0ZXJtKSkge1xuICAgICAgICBtYXRjaCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaDtcbn1cblxuZnVuY3Rpb24gcmVjdXJzaXZlTGlua1NlYXJjaChlbGVtZW50LCB0ZXJtKSB7XG4gICAgbGV0IG1hdGNoID0gZmFsc2U7XG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PSBcIkFcIikge1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGVsZW1lbnQuaHJlZi50b0xvd2VyQ2FzZSgpLmluZGV4T2YodGVybSk7XG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGVsZW1lbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHJlY3Vyc2l2ZUxpbmtTZWFyY2goY2hpbGQsIHRlcm0pKSB7XG4gICAgICAgICAgICBtYXRjaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoO1xufVxuXG5zb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEhhbmRsZXIpO1xuIiwibGV0IGNhbGNTdGF0cyA9IHt9O1xuXG5yZWZyZXNoU3RhdHMoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hTdGF0cygpIHtcbiAgICBjYWxjdWxhdGVTdGF0cygpO1xuICAgIGRpc3BsYXlTdGF0cygpO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVTdGF0cygpIHtcbiAgICBjYWxjU3RhdHMgPSB7XG4gICAgICAgIHRvdGFsU2l0ZXM6IDAsXG4gICAgICAgIHNpdGVzV2l0aEN1cnJlbnRQcm9qZWN0OiAwLFxuICAgICAgICB0b3RhbFByb2plY3RzOiAwLFxuICAgICAgICBhY3RpdmVQcm9qZWN0czogMCxcbiAgICAgICAgcHJvamVjdEhvdXJzTGVmdDogMCxcbiAgICAgICAgcHJvamVjdERheXNMZWZ0OiAwLFxuICAgICAgICBjb21wbGV0ZURhdGU6IG5ldyBEYXRlKClcbiAgICB9XG4gICAgLy9jb3VudCBzaXRlIHN0YXRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5kb3cuc3RhdHMuc2l0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2l0ZSA9IHdpbmRvdy5zdGF0cy5zaXRlc1tpXTtcbiAgICAgICAgY2FsY1N0YXRzLnRvdGFsU2l0ZXMrKztcbiAgICAgICAgaWYgKHNpdGUuaXNDdXJyZW50KSB7XG4gICAgICAgICAgICBjYWxjU3RhdHMuc2l0ZXNXaXRoQ3VycmVudFByb2plY3QrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL2NvdW50IHByb2plY3Qgc3RhdHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5zdGF0cy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gd2luZG93LnN0YXRzLnByb2plY3RzW2ldO1xuICAgICAgICBjYWxjU3RhdHMudG90YWxQcm9qZWN0cysrO1xuICAgICAgICBpZiAocHJvamVjdC5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgY2FsY1N0YXRzLmFjdGl2ZVByb2plY3RzKys7XG4gICAgICAgICAgICBjYWxjU3RhdHMucHJvamVjdEhvdXJzTGVmdCArPSBwcm9qZWN0LkhvdXJzTGVmdDtcbiAgICAgICAgICAgIGNhbGNTdGF0cy5wcm9qZWN0RGF5c0xlZnQgPSBNYXRoLnJvdW5kKGNhbGNTdGF0cy5wcm9qZWN0SG91cnNMZWZ0LzUpO1xuICAgICAgICAgICAgY2FsY1N0YXRzLmNvbXBsZXRlRGF0ZSA9IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKyhjYWxjU3RhdHMucHJvamVjdERheXNMZWZ0KjI0KjYwKjYwKjEwMDApKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheVN0YXRzKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtdG90YWwtc2l0ZXNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsU2l0ZXM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGF0cy1jdXJyZW50LXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWluYWN0aXZlLXNpdGVzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFNpdGVzLWNhbGNTdGF0cy5zaXRlc1dpdGhDdXJyZW50UHJvamVjdDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXRvdGFsLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy50b3RhbFByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtYWN0aXZlLXByb2plY3RzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5hY3RpdmVQcm9qZWN0cztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLXBhc3QtcHJvamVjdHNcIikuaW5uZXJIVE1MID0gY2FsY1N0YXRzLnRvdGFsUHJvamVjdHMtY2FsY1N0YXRzLmFjdGl2ZVByb2plY3RzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1ob3Vyc1wiKS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGNhbGNTdGF0cy5wcm9qZWN0SG91cnNMZWZ0KS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHMtcHJvamVjdC1kYXlzXCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5wcm9qZWN0RGF5c0xlZnQudG9Mb2NhbGVTdHJpbmcoXCJlbi1HQlwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXRzLWNvbXBsZXRpb24tZGF5XCIpLmlubmVySFRNTCA9IGNhbGNTdGF0cy5jb21wbGV0ZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tR0JcIik7XG59IiwiaW1wb3J0IHtzaXRlSW5pdH0gZnJvbSAnLi9pbml0RmVhdHVyZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWYWx1ZXNJbml0KCkge1xuICAgIGNvbnN0IGZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2VkaXRhYmxlLWZpZWxkJyk7XG4gICAgY29uc3QgYmFycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hvdXItZ3JhcGgnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGZpZWxkc1tpXTtcbiAgICAgICAgZmllbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFkZEVkaXRpbmcpO1xuICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYWRkRWRpdGluZyk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBiYXIgPSBiYXJzW2ldO1xuICAgICAgICBiYXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZWxlY3RGaWVsZCk7XG4gICAgICAgIGJhci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbGVjdEZpZWxkKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlbGVjdEZpZWxkKGV2ZW50KSB7XG4gICAgY29uc3QgYmFyID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBmaWVsZCA9IGJhci5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcbiAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuc2VsZWN0QWxsQ2hpbGRyZW4oZmllbGQpO1xufVxuXG5mdW5jdGlvbiBhZGRFZGl0aW5nKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIC8vZG9uJ3QgYWRkIG5ld2xpbmVcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy9yZW1vdmUgZm9jdXMgb24gZmllbGRcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5ibHVyKCk7XG4gICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgLy9nZXQgYW5kIHN1Ym1pdCBuZXcgdmFsdWVcbiAgICAgICAgY29uc3QgZmllbGQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGZpZWxkLmlubmVySFRNTDtcblxuICAgICAgICAvLyBkZXN0aW5hdGlvblxuICAgICAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICAgICAgIGNvbnN0IHBtID0gZmllbGQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgICBjb25zdCBwbUlEID0gcG0uZGF0YXNldC5pZDtcbiAgICAgICAgY29uc3QgdXJpID0gXCIvb3VyLXNpdGVzL3VwZGF0ZXByb2plY3Rob3Vycy9cIitwbUlEK1wiL1wiOyAvL3Byb2plY3QgVVVJRCBcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm90bytcIi8vXCIraG9zdG5hbWUrdXJpXG5cbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwiaG91cnNcIiwgbmV3VmFsdWUpO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgICAgICByZXF1ZXN0LnNlbmQoZm9ybURhdGEpO1xuXG4gICAgICAgIC8vcmVzcG9uc2VcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vYWZ0ZXIgcmVzcG9uc2VcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBnZXRQYXJlbnRTaXRlKHBtKTtcbiAgICAgICAgICAgICAgICBzaXRlLm91dGVySFRNTCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIC8vcmUtaW5pdCBoZXJlIVxuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRIb3VycyhwbUlELCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgc2l0ZUluaXQoKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlVwZGF0ZWQgSG91cnNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KHJlcXVlc3Quc3RhdHVzICsgXCIgRXJyb3IgVXBkYXRpbmcgSG91cnNcIik7XG4gICAgICAgICAgICAgICAgZmllbGQuaW5uZXJIVE1MID0gd2luZG93LnN0YXRzLnByb2plY3RzLmZpbHRlcihwciA9PiBwci5pZCA9PSBwbUlEKVswXS5DdXJyZW50SG91cnM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXJlbnRTaXRlKGVsZW0pIHtcbiAgICBpZiAoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaXRlXCIpKSB7XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcmVudFNpdGUoZWxlbS5wYXJlbnRFbGVtZW50KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRIb3VycyhwbUlELCBob3Vycykge1xuICAgIGNvbnN0IHByb2plY3QgPSB3aW5kb3cuc3RhdHMucHJvamVjdHMuZmlsdGVyKHByID0+IHByLmlkID09IHBtSUQpO1xuICAgIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pZD1cIicrcG1JRCsnXCJdJykuZGF0YXNldC5ob3Vyc2xlZnQ7XG4gICAgcHJvamVjdFswXS5DdXJyZW50SG91cnMgPSBob3VycztcbiAgICBwcm9qZWN0WzBdLkhvdXJzTGVmdCA9IHBhcnNlRmxvYXQobGVmdCk7XG59IiwiY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVSTFBhcmFtKGtleVN0cmluZywgdmFsdWVTdHJpbmcpIHtcbiAgICBpZiAodmFsdWVTdHJpbmcgPT09ICcnKSB7XG4gICAgICAgIHVybFBhcmFtcy5kZWxldGUoa2V5U3RyaW5nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHVybFBhcmFtcy5zZXQoa2V5U3RyaW5nLCB2YWx1ZVN0cmluZyk7XG4gICAgfVxuICAgIHZhciBuZXdVcmwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luIFxuICAgICAgICAgICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lIFxuICAgICAgICAgICsgJz8nICsgdXJsUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHtwYXRoOm5ld1VybH0sJycsbmV3VXJsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVSTFBhcmFtKGtleVN0cmluZykge1xuICAgIHJldHVybiB1cmxQYXJhbXMuZ2V0KGtleVN0cmluZyk7XG59IiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiXG4vLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG4vLyBpbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2ZpZWxkc1RvYydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9TaG93SGlkZUN1cnJlbnRTaXRlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9hZGRMaW5rJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL21lbnUnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvaW5pdEZlYXR1cmVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL3N0YXRzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL3VwZGF0ZVZhbHVlcydcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy9hZGRTaXRlJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2tleUNsaWNrQ29weSdcbmltcG9ydCAnLi9qcy9mZWF0dXJlcy91cmxQYXJhbWV0ZXJzJyJdLCJuYW1lcyI6WyJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsIndpbmRvdyIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImRvTm90UmVjdXJzZSIsImZvckVhY2giLCJjYWxsIiwibm9kZSIsImNvbnRhaW5zIiwiYXBwbHlUbyIsInN1Ym5vZGUiLCJsaSIsInBhcmVudE5vZGUiLCJzdHlsZSIsInVzZXJTZWxlY3QiLCJNb3pVc2VyU2VsZWN0IiwibXNVc2VyU2VsZWN0IiwiV2Via2l0VXNlclNlbGVjdCIsInVsIiwibGVuZ3RoIiwic3BhbiIsImNyZWF0ZUVsZW1lbnQiLCJoYW5kbGVDbGljayIsImJpbmQiLCJpbm5lckhUTUwiLCJ0b2dnbGUiLCJpbnNlcnRCZWZvcmUiLCJlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJvcGVuIiwidWxzIiwiZGlzcGxheSIsIm15Q29va2llIiwic2V0Q29va2llIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJnZXRDb29raWUiLCJuYW1lRVEiLCJjYSIsInNwbGl0IiwiaSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZXJhc2VDb29raWUiLCJzaG93SGlkZUN1cnJlbnRTaXRlc0luaXQiLCJvbkZpcnN0SW5pdCIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhvbGRlckV2ZW50SGFuZGxlciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGljayIsImN1cnJlbnRUYXJnZXQiLCJzaG93Q3VycmVudCIsInNpdGVzIiwic2l0ZSIsInNpdGVJbml0IiwiYWRkTGlua0luaXQiLCJidXR0b25zIiwiYnV0dG9uIiwiYWRkTGlua0NsaWNrIiwiZGF0YXNldCIsImlucHV0YWN0aXZlIiwiaW5wdXRFbGVtZW50IiwidHlwZSIsIndpZHRoIiwiZmxvYXQiLCJrZXkiLCJpbnB1dExpbmsiLCJiZWZvcmUiLCJmb2N1cyIsImlucHV0IiwicGFyZW50RWxlbWVudCIsImxpbmsiLCJwcm90byIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInVyaSIsInVybCIsImRlc3RpbmF0aW9uIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJyZXNwb25zZVRleHQiLCJvdXRlckhUTUwiLCJhZGRTaXRlSW5pdCIsImFkZFNpdGUiLCJmb250U2l6ZSIsImhlaWdodCIsImlucHV0U2l0ZSIsImJvZHkiLCJmaWVsZHNUb2NJbml0IiwiY3VycmVudFNlbGVjdGlvbiIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwicHVzaCIsInNvcnQiLCJ1bEVsIiwiaWQiLCJlbHMiLCJsaXN0RWwiLCJhRWwiLCJ0ZXN0IiwicG9zIiwic3BsaWNlIiwicHJldmVudERlZmF1bHQiLCJmaWx0ZXJJdGVyYXRlIiwiaHJlZiIsImFwcGVuZENoaWxkIiwiaW5jbHVkZXMiLCJlbXB0eSIsInBvc0luQ3VycmVudCIsInNldE1pc3NpbmdMaW5rc0Rpc3BsYXkiLCJzaG91bGREaXNwbGF5IiwibWlzc2luZ0xpbmtzIiwidXBkYXRlVmFsdWVzSW5pdCIsInJlZnJlc2hTdGF0cyIsImtleUNsaWNrQ29weUluaXQiLCJjdXJyZW50RmllbGRzRmlsdGVycyIsImZpcnN0SW5pdCIsImtleXMiLCJjbGlja0NvcHkiLCJ0aXRsZSIsImtleUVsZW0iLCJ0ZXh0IiwiaW5uZXJUZXh0IiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwidGV4dEFyZWEiLCJ0b3AiLCJsZWZ0IiwicG9zaXRpb24iLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJyZW1vdmVDaGlsZCIsIndyaXRlVGV4dCIsImdldFVSTFBhcmFtIiwic2V0VVJMUGFyYW0iLCJvbmxvYWQiLCJtZW51SXRlbXMiLCJtZW51SXRlbSIsIm9uY2xpY2siLCJ1cmxTZWFyY2giLCJwZXJmb3JtU2VhcmNoIiwic291cmNlIiwiaW5wdXRIYW5kbGVyIiwidG9Mb3dlckNhc2UiLCJjdXJyZW50RmlsdGVyIiwiaHIiLCJwcmVmaXhNYXRjaGVzIiwic3Vic3RyaW5nTWF0Y2hlcyIsIml0ZW0iLCJyZXMiLCJicm9hZFNlYXJjaCIsInJlc3VsdERpdiIsInNlYXJjaFRlcm0iLCJtYXRjaGVzIiwibWF0Y2giLCJlbGVtZW50VGV4dFNlYXJjaCIsImVsZW1lbnQiLCJ0ZXJtIiwidGV4dENvbnRlbnQiLCJyZWN1cnNpdmVMaW5rU2VhcmNoIiwidGFnTmFtZSIsImNoaWxkIiwiY2hpbGRyZW4iLCJjYWxjU3RhdHMiLCJjYWxjdWxhdGVTdGF0cyIsImRpc3BsYXlTdGF0cyIsInRvdGFsU2l0ZXMiLCJzaXRlc1dpdGhDdXJyZW50UHJvamVjdCIsInRvdGFsUHJvamVjdHMiLCJhY3RpdmVQcm9qZWN0cyIsInByb2plY3RIb3Vyc0xlZnQiLCJwcm9qZWN0RGF5c0xlZnQiLCJjb21wbGV0ZURhdGUiLCJzdGF0cyIsImlzQ3VycmVudCIsInByb2plY3RzIiwicHJvamVjdCIsImlzQWN0aXZlIiwiSG91cnNMZWZ0IiwiTWF0aCIsInJvdW5kIiwidG9Mb2NhbGVTdHJpbmciLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJmaWVsZHMiLCJiYXJzIiwiZmllbGQiLCJhZGRFZGl0aW5nIiwiYmFyIiwic2VsZWN0RmllbGQiLCJnZXRTZWxlY3Rpb24iLCJzZWxlY3RBbGxDaGlsZHJlbiIsImJsdXIiLCJyZW1vdmVBbGxSYW5nZXMiLCJuZXdWYWx1ZSIsInBtIiwicG1JRCIsImdldFBhcmVudFNpdGUiLCJ1cGRhdGVTdGF0SG91cnMiLCJhbGVydCIsImZpbHRlciIsInByIiwiQ3VycmVudEhvdXJzIiwiZWxlbSIsImhvdXJzIiwicXVlcnlTZWxlY3RvciIsImhvdXJzbGVmdCIsInBhcnNlRmxvYXQiLCJ1cmxQYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJzZWFyY2giLCJrZXlTdHJpbmciLCJ2YWx1ZVN0cmluZyIsImRlbGV0ZSIsInNldCIsIm5ld1VybCIsIm9yaWdpbiIsInBhdGhuYW1lIiwidG9TdHJpbmciLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwicGF0aCIsImdldCIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInJlcGxhY2UiXSwic291cmNlUm9vdCI6IiJ9
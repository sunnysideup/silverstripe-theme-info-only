<<<<<<< HEAD
(self.webpackChunkpublic=self.webpackChunkpublic||[]).push([[143],{224:function(){const e={bodyObject:null,init:function(){e.bodyObject=document.getElementsByTagName("body")[0],this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(n){e.bodyObject.classList.add("body-loaded"),e.bodyObject.classList.remove("body-unloaded"),"ontouchstart"in document.documentElement?e.bodyObject.classList.add("touch"):e.bodyObject.classList.add("no-touch")})),window.addEventListener("beforeunload",(function(){}))}};e.init()},999:function(){(function(){function e(e,s){[].forEach.call(e.getElementsByTagName("li"),(o=>{if(!s||e===o.parentNode){o.style.userSelect="none",o.style.MozUserSelect="none",o.style.msUserSelect="none",o.style.WebkitUserSelect="none";const e=o.getElementsByTagName("ul");if(e.length>0){const s=document.createElement("span");s.classList.add("open-close"),s.addEventListener("click",n.bind(null,o)),s.innerHTML='<i class="open">&nbsp;</i><i class="closed">↰</i>',(o.classList.contains("section")||o.classList.contains("current"))&&t(o),t(o),o.insertBefore(s,e[0])}}}))}function n(e,n){let s=n.target;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&t(e)}function t(e){const n=e.classList.contains("collapsibleListClosed"),t=e.getElementsByTagName("ul");[].forEach.call(t,(t=>{let s=t;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&(t.style.display=n?"block":"none")})),e.classList.remove("collapsibleListOpen"),e.classList.remove("collapsibleListClosed"),t.length>0&&e.classList.add("collapsibleList"+(n?"Open":"Closed"))}return{apply:function(n){[].forEach.call(document.getElementsByTagName("ul"),(t=>{t.classList.contains("collapsibleList")&&(e(t,!0),n||[].forEach.call(t.getElementsByTagName("ul"),(e=>{e.classList.add("collapsibleList")})))}))},applyTo:e}})().apply()},255:function(){const e=document.getElementById("ShowHideCurrent");e&&(e.addEventListener("click",(function(){const n=!e.classList.contains("show-current");e.classList.toggle("show-current");const t=document.getElementsByClassName("site");for(var s=0;s<t.length;s++){const e=t[s];n&&e.classList.contains("current")||!n?e.style.display="block":e.style.display="none"}})),e.click())},189:function(){const e=document.getElementsByClassName("site");for(var n=0;n<e.length;n++){const s=e[n],o=document.createElement("div");o.innerHTML='<button data-id="ID_HERE" data-inputactive="false">+</button>'.replace("ID_HERE",s.dataset.id),s.children[0].before(o),s.children[0].children[0].addEventListener("click",(function(){t(s)})),s.children[0].children[0].classList.add("AddLinkButton"),o.classList.add("AddLinkDiv")}function t(e){const n=e.children[0].getElementsByClassName("AddLinkButton")[0];if("false"==n.dataset.inputactive){n.dataset.inputactive="true";const t=document.createElement("input");t.type="text",t.classList.add("AddLinkInput"),t.addEventListener("keyup",(({key:o})=>{"Enter"===o&&(""!=t.value&&s(e,t.value),n.dataset.inputactive="false",t.remove())})),n.before(t),t.focus()}else{n.dataset.inputactive="false";const t=e.children[0].getElementsByClassName("AddLinkInput")[0];""!=t.value&&s(e,t.value),t.remove()}}function s(n,t){const s=window.location.protocol+"//"+window.location.hostname+document.getElementsByTagName("body")[0].dataset.link+"addlink",o=n.dataset.id,a=new FormData;a.append("id",o),a.append("link",t);const i=new XMLHttpRequest;i.open("POST",s),i.send(a),i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){i.responseText;!function(n,t){let s;for(var o=0;o<e.length;o++)e[o].dataset.id==n&&(s=e[o])}(o)}}}const o=document.createElement("style");o.innerText='\n    .AddLinkButton {\n        appearance: none;\n        background-color: #2ea44f;\n        border: 1px solid rgba(27, 31, 35, .15);\n        border-radius: 6px;\n        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;\n        box-sizing: border-box;\n        color: #fff;\n        cursor: pointer;\n        display: inline-block;\n        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";\n        font-size: 14px;\n        font-weight: 600;\n        line-height: 20px;\n        padding: 6px 16px;\n        position: relative;\n        text-align: center;\n        text-decoration: none;\n        user-select: none;\n        -webkit-user-select: none;\n        touch-action: manipulation;\n        vertical-align: middle;\n        white-space: nowrap;\n        margin-left:0.5em;\n    }\n\n    .AddLinkButton:focus:not(:focus-visible):not(.focus-visible) {\n    box-shadow: none;\n    outline: none;\n    }\n\n    .AddLinkButton:hover {\n    background-color: #2c974b;\n    }\n\n    .AddLinkButton:focus {\n    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;\n    outline: none;\n    }\n\n    .AddLinkButton:disabled {\n    background-color: #94d3a2;\n    border-color: rgba(27, 31, 35, .1);\n    color: rgba(255, 255, 255, .8);\n    cursor: default;\n    }\n\n    .AddLinkButton:active {\n    background-color: #298e46;\n    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;\n    }\n\n    .AddLinkDiv {\n        float: right;\n        margin-top: 1em;\n    }\n',document.head.appendChild(o)},278:function(){const e=document.getElementById("fieldsToc");if(e){var n=[...document.querySelectorAll("[data-field]")];const s=[];n.forEach((e=>{const n=e.getAttribute("data-field").trim();-1===s.indexOf(n)&&s.push(n)}));var t=[];const o=document.createElement("ul");s.forEach((e=>{const s=document.createElement("li"),a=document.createElement("a");a.innerHTML=e,a.addEventListener("click",(function(s){const o=this.innerHTML;this.classList.toggle("current"),this.classList.toggle("link");const a=t.indexOf(o);return this.classList.contains("current")?-1===a&&t.push(e):-1!==a&&t.splice(a,1),s.preventDefault(),n.forEach((e=>{const n=e.getAttribute("data-field").trim(),s=0===t.length,o=t.indexOf(n);e.style.display=s||-1!==o?"":"none"})),!1})),a.href="#",a.classList.add("link"),s.appendChild(a),o.appendChild(s)})),e.appendChild(o)}},440:function(){for(var e=document.querySelectorAll("input, select, textarea"),n=e.length-1;n>=0;--n){e[n].addEventListener("change",s,!1),e[n].addEventListener("keyup",s,!1),e[n].addEventListener("focus",s,!1),e[n].addEventListener("blur",s,!1),e[n].addEventListener("mousedown",s,!1);var t=document.createEvent("HTMLEvents");t.initEvent("change",!1,!0),e[n].dispatchEvent(t)}function s(e){var n=e.target.value;n&&n.replace(/^\s+|\s+$/g,"")?e.target.classList.remove("no-value"):e.target.classList.add("no-value")}},432:function(e,n,t){"use strict";t(224),t(999),t(440),t(278),t(255),t(189)}},function(e){var n;n=432,e(e.s=n)}]);
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
  const changedElem = document.createElement('div');
  changedElem.innerHTML = DOMtext;
  const changedDOM = changedElem.children[0].children;
  const site = button.parentElement.parentElement;
  const siteDOM = site.children;
  let additions = getDOMAdditions(siteDOM, changedDOM);
  console.log(additions);
}

//based on https://gist.github.com/joshblack/81b61f33fdb6233c50eb
function getDOMAdditions(oldDOMCollection, newDOMCollection) {
  let additions = [];
  let oldI = 0;
  for (i = 0; i < newDOMCollection.length; i++) {
    if (oldDOMCollection[oldI] !== newDOMCollection[i]) {
      //difference 
      //does this still exist but elsewhere?
      if (newDOMCollection.indexOf(oldDOMCollection[oldI]) !== -1) {
        //if not, this node is entirely new!
        additions.push(newDOMCollection[i]);
      } else {
        //this means the node was deleted, check against the next
        oldI++;
        i--;
      }
    } else {
      //these align
      oldI++;
    }
  }
  return additions;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7RUFFakUsSUFBSUMsR0FBRyxHQUFHNUksUUFBUSxDQUFDNkksV0FBVyxDQUFDLFlBQVksQ0FBQztFQUM1Q0QsR0FBRyxDQUFDRSxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7RUFDcENMLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUNLLGFBQWEsQ0FBQ0gsR0FBRyxDQUFDO0FBQ2xDO0FBRUEsU0FBU0QsYUFBYSxDQUFFSyxNQUFNLEVBQUU7RUFDOUIsSUFBSUMsTUFBTSxHQUFHRCxNQUFNLENBQUM1RyxNQUFNLENBQUNRLEtBQUs7RUFDaEMsSUFBSXFHLE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzlDRixNQUFNLENBQUM1RyxNQUFNLENBQUMvQixTQUFTLENBQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0x5SSxNQUFNLENBQUM1RyxNQUFNLENBQUMvQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7RUFDekM7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0I7QUFDSTtBQUNNO0FBQ1o7QUFDbEI7QUFDZ0M7QUFDVyIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi90aGVtZS1pbmZvLW9ubHkvc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvU2hvd0hpZGVDdXJyZW50U2l0ZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZmVhdHVyZXMvYWRkTGluay5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9qcy9mZWF0dXJlcy9maWVsZHNUb2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3RoZW1lLWluZm8tb25seS9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vdGhlbWUtaW5mby1vbmx5L3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHlDbGFzcyA9IHtcblxuICBib2R5T2JqZWN0OiBudWxsLFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF1cbiAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgfSxcblxuICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkgXG4gIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ0RPTUNvbnRlbnRMb2FkZWQnLFxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2JlZm9yZXVubG9hZCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgfVxuICAgIClcbiAgfVxuXG59XG5cbmJvZHlDbGFzcy5pbml0KClcbiIsIi8qXG5cbkNvbGxhcHNpYmxlTGlzdHMuanNcblxuQW4gb2JqZWN0IGFsbG93aW5nIGxpc3RzIHRvIGR5bmFtaWNhbGx5IGV4cGFuZCBhbmQgY29sbGFwc2VcblxuQ3JlYXRlZCBieSBLYXRlIE1vcmxleSAtIGh0dHA6Ly9jb2RlLmlhbWthdGUuY29tLyAtIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgdGVybXNcbm9mIHRoZSBDQzAgMS4wIFVuaXZlcnNhbCBsZWdhbCBjb2RlOlxuXG5odHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvbGVnYWxjb2RlXG5cbiovXG5cbmNvbnN0IENvbGxhcHNpYmxlTGlzdHMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBNYWtlcyBhbGwgbGlzdHMgd2l0aCB0aGUgY2xhc3MgJ2NvbGxhcHNpYmxlTGlzdCcgY29sbGFwc2libGUuIFRoZVxuICAvLyBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICBmdW5jdGlvbiBhcHBseSAoZG9Ob3RSZWN1cnNlKSB7XG4gICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBub2RlID0+IHtcbiAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHtcbiAgICAgICAgYXBwbHlUbyhub2RlLCB0cnVlKVxuXG4gICAgICAgIGlmICghZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgICAgW10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIHN1Ym5vZGUgPT4ge1xuICAgICAgICAgICAgc3Vibm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gTWFrZXMgdGhlIHNwZWNpZmllZCBsaXN0IGNvbGxhcHNpYmxlLiBUaGUgcGFyYW1ldGVycyBhcmU6XG4gIC8vXG4gIC8vIG5vZGUgICAgICAgICAtIHRoZSBsaXN0IGVsZW1lbnRcbiAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gIGZ1bmN0aW9uIGFwcGx5VG8gKG5vZGUsIGRvTm90UmVjdXJzZSkge1xuICAgIFtdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLCBsaSA9PiB7XG4gICAgICBpZiAoIWRvTm90UmVjdXJzZSB8fCBub2RlID09PSBsaS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGxpLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuTW96VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBsaS5zdHlsZS5tc1VzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgbGkuc3R5bGUuV2Via2l0VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICBjb25zdCB1bCA9IGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG4gICAgICAgIGlmICh1bC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgbGkpKVxuICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPiZuYnNwOzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGsDwvaT4nXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byB0b2dnbGUgYWxsIG9mIHRoZW0sIHNvbWUgdHdpY2VcbiAgICAgICAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJykgfHwgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCB1bFswXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBIYW5kbGVzIGEgY2xpY2suIFRoZSBwYXJhbWV0ZXIgaXM6XG4gIC8vXG4gIC8vIG5vZGUgLSB0aGUgbm9kZSBmb3Igd2hpY2ggY2xpY2tzIGFyZSBiZWluZyBoYW5kbGVkXG4gIGZ1bmN0aW9uIGhhbmRsZUNsaWNrIChub2RlLCBlKSB7XG4gICAgbGV0IGxpID0gZS50YXJnZXRcbiAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgIH1cblxuICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgdG9nZ2xlKG5vZGUpXG4gICAgfVxuICB9XG5cbiAgLy8gT3BlbnMgb3IgY2xvc2VzIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50cyBkaXJlY3RseSB3aXRoaW4gdGhlXG4gIC8vIHNwZWNpZmllZCBub2RlLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAvL1xuICAvLyBub2RlIC0gdGhlIG5vZGUgY29udGFpbmluZyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHNcbiAgZnVuY3Rpb24gdG9nZ2xlIChub2RlKSB7XG4gICAgY29uc3Qgb3BlbiA9IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgIGNvbnN0IHVscyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwodWxzLCB1bCA9PiB7XG4gICAgICBsZXQgbGkgPSB1bFxuICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9IChvcGVuID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICBpZiAodWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JyArIChvcGVuID8gJ09wZW4nIDogJ0Nsb3NlZCcpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGFwcGx5LCBhcHBseVRvIH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJjb25zdCBob2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnU2hvd0hpZGVDdXJyZW50Jyk7XG5pZihob2xkZXIpIHtcbiAgICBob2xkZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBzaG93Q3VycmVudCA9ICFob2xkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93LWN1cnJlbnQnKTtcbiAgICAgICAgICAgIGhvbGRlci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWN1cnJlbnQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlc1tpXTtcbiAgICAgICAgICAgICAgICBpZigoc2hvd0N1cnJlbnQgJiYgc2l0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSkgfHwgIXNob3dDdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNpdGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2l0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gICAgaG9sZGVyLmNsaWNrKCk7XG59XG5cbiIsImNvbnN0IHNpdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2l0ZScpO1xuY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZGxpbmtidXR0b24nKTtcblxuLy9BZGRpbmcgZXZlbnQgbGlzdGVuZXJzXG5mb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBidXR0b24gPSBidXR0b25zW2ldXG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7YWRkTGlua0NsaWNrKGJ1dHRvbik7fVxuICAgIClcbn1cblxuZnVuY3Rpb24gYWRkTGlua0NsaWNrKGJ1dHRvbikge1xuICAgIC8vc28gb25seSBvbmUgaW5wdXQgaXMgY3JlYXRlZFxuICAgIGlmIChidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcInRydWVcIjtcbiAgICAgICAgY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhZGRsaW5raW5wdXQnKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gXCIyNTBweFwiXG5cbiAgICAgICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoe2tleX0pID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsdWUgIT0gJycpIHtpbnB1dExpbmsoYnV0dG9uLCBpbnB1dEVsZW1lbnQudmFsdWUpO31cbiAgICAgICAgICAgICAgICBidXR0b24uZGF0YXNldC5pbnB1dGFjdGl2ZSA9IFwiZmFsc2VcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJ1dHRvbi5iZWZvcmUoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLy9pbnB1dCBhbHJlYWR5IGV4aXN0cywgcHJlc3NpbmcgYnV0dG9uIGFnYWluIHN1Ym1pdHNcbiAgICBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmRhdGFzZXQuaW5wdXRhY3RpdmUgPSBcImZhbHNlXCI7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gYnV0dG9uLnBhcmVudEVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkbGlua2lucHV0JylbMF07XG4gICAgICAgIGlmIChpbnB1dC52YWx1ZSAhPSAnJykge1xuICAgICAgICAgICAgaW5wdXRMaW5rKGJ1dHRvbiwgaW5wdXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0LnJlbW92ZSgpO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiBpbnB1dExpbmsoYnV0dG9uLCBsaW5rKSB7XG4gICAgLy8gZGVzdGluYXRpb25cbiAgICBjb25zdCBwcm90byA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBjb25zdCB1cmkgPSBidXR0b24uZGF0YXNldC51cmw7IFxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcHJvdG8rXCIvL1wiK2hvc3RuYW1lK3VyaVxuXG4gICAgLy8gY29sbGF0ZSBmb3JtXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJsaW5rXCIsIGxpbmspO1xuXG4gICAgLy8gbWFrZSByZXF1ZXN0XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcXVlc3Qub3BlbihcIlBPU1RcIiwgZGVzdGluYXRpb24pO1xuICAgIHJlcXVlc3Quc2VuZChmb3JtRGF0YSk7XG5cbiAgICAvLyBoYW5kbGUgcmVzcG9uc2VcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2FmdGVyIHJlc3BvbnNlXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICB1cGRhdGVTaXRlRE9NKHJlc3BvbnNlLCBidXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2l0ZURPTShET010ZXh0LCBidXR0b24pIHtcbiAgICBjb25zdCBjaGFuZ2VkRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNoYW5nZWRFbGVtLmlubmVySFRNTCA9IERPTXRleHQ7XG4gICAgY29uc3QgY2hhbmdlZERPTSA9IGNoYW5nZWRFbGVtLmNoaWxkcmVuWzBdLmNoaWxkcmVuO1xuXG4gICAgY29uc3Qgc2l0ZSA9IGJ1dHRvbi5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgY29uc3Qgc2l0ZURPTSA9IHNpdGUuY2hpbGRyZW47XG5cbiAgICBsZXQgYWRkaXRpb25zID0gZ2V0RE9NQWRkaXRpb25zKHNpdGVET00sIGNoYW5nZWRET00pO1xuXG4gICAgY29uc29sZS5sb2coYWRkaXRpb25zKTtcbn1cblxuLy9iYXNlZCBvbiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qb3NoYmxhY2svODFiNjFmMzNmZGI2MjMzYzUwZWJcbmZ1bmN0aW9uIGdldERPTUFkZGl0aW9ucyhvbGRET01Db2xsZWN0aW9uLCBuZXdET01Db2xsZWN0aW9uKSB7XG4gICAgbGV0IGFkZGl0aW9ucyA9IFtdO1xuXG4gICAgbGV0IG9sZEkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuZXdET01Db2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChvbGRET01Db2xsZWN0aW9uW29sZEldICE9PSBuZXdET01Db2xsZWN0aW9uW2ldKSB7XG4gICAgICAgICAgICAvL2RpZmZlcmVuY2UgXG4gICAgICAgICAgICAvL2RvZXMgdGhpcyBzdGlsbCBleGlzdCBidXQgZWxzZXdoZXJlP1xuICAgICAgICAgICAgaWYgKG5ld0RPTUNvbGxlY3Rpb24uaW5kZXhPZihvbGRET01Db2xsZWN0aW9uW29sZEldKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvL2lmIG5vdCwgdGhpcyBub2RlIGlzIGVudGlyZWx5IG5ldyFcbiAgICAgICAgICAgICAgICBhZGRpdGlvbnMucHVzaChuZXdET01Db2xsZWN0aW9uW2ldKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWVhbnMgdGhlIG5vZGUgd2FzIGRlbGV0ZWQsIGNoZWNrIGFnYWluc3QgdGhlIG5leHRcbiAgICAgICAgICAgICAgICBvbGRJKys7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy90aGVzZSBhbGlnblxuICAgICAgICAgICAgb2xkSSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFkZGl0aW9ucztcbn0iLCIvKipcbiAqIGlmIHRoZXJlIGlzIGEgZGl2IHdpdGggSUQgZmllbGRzVG9jXG4gKiB0aGVuIGl0IHJ1bnNcbiAqIEl0IHdpbGwgbG9vayBmb3IgYWxsIGRhdGEtZmllbGQgYW5kIGNyZWF0ZSBhIEZpZWxkcyBUYWJsZSBvZiBDb250ZW50c1xuICpcbiAqL1xuY29uc3QgZmllbGRzVG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpZWxkc1RvYycpXG5pZiAoZmllbGRzVG9jKSB7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmllbGRdJylcbiAgICB2YXIgYXJyYXlPZlNlbGVjdG9ycyA9IFsuLi5zZWxlY3RvcnNdXG4gICAgLy8gY29uc3QgaXRlbXMgPSBhcnJheU9mU2VsZWN0b3JzLmZpbHRlcigodiwgaSwgYSkgPT4gYS5pbmRleE9mKHYpID09PSBpKVxuICAgIGNvbnN0IGl0ZW1zID0gW11cbiAgICBhcnJheU9mU2VsZWN0b3JzLmZvckVhY2goZGl2ID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgIGlmIChpdGVtcy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1zLnB1c2godmFsdWUpXG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUpXG4gICAgfSlcbiAgICB2YXIgY3VycmVudFNlbGVjdGlvbiA9IFtdXG5cbiAgICBjb25zdCB1bEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgLy8gZm9yIGVhY2ggb2YgdGhlIGl0ZW1zLi4uXG4gICAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgY29uc3QgYUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpXG4gICAgICAgIGFFbC5pbm5lckhUTUwgPSB2YWx1ZVxuXG4gICAgICAgIC8vIG9uIGNsaWNrXG4gICAgICAgIGFFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc3QgdGVzdCA9IHRoaXMuaW5uZXJIVE1MXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rJylcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih0ZXN0KVxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnB1c2godmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnNwbGljZShwb3MsIDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgYXJyYXlPZlNlbGVjdG9ycy5mb3JFYWNoKGRpdiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWZpZWxkJykudHJpbSgpXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc0luQ3VycmVudCA9IGN1cnJlbnRTZWxlY3Rpb24uaW5kZXhPZih2YWx1ZSlcbiAgICAgICAgICAgICAgICBpZiAoZW1wdHkgfHwgcG9zSW5DdXJyZW50ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgYUVsLmhyZWYgPSAnIydcbiAgICAgICAgYUVsLmNsYXNzTGlzdC5hZGQoJ2xpbmsnKVxuXG4gICAgICAgIC8vIGFwcGVuZFxuICAgICAgICBsaXN0RWwuYXBwZW5kQ2hpbGQoYUVsKVxuICAgICAgICB1bEVsLmFwcGVuZENoaWxkKGxpc3RFbClcbiAgICAgICAgLy8gY29uc29sZS5sb2cobGlzdEVsKVxuICAgIH0pXG4gICAgZmllbGRzVG9jLmFwcGVuZENoaWxkKHVsRWwpXG59XG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJcbi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbi8vIGltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvZmVhdHVyZXMvZmllbGRzVG9jJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL1Nob3dIaWRlQ3VycmVudFNpdGVzJ1xuaW1wb3J0ICcuL2pzL2ZlYXR1cmVzL2FkZExpbmsnIl0sIm5hbWVzIjpbImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJpbml0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZG9jdW1lbnRFbGVtZW50Iiwid2luZG93IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiZm9yRWFjaCIsImNhbGwiLCJub2RlIiwiY29udGFpbnMiLCJhcHBseVRvIiwic3Vibm9kZSIsImxpIiwicGFyZW50Tm9kZSIsInN0eWxlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJsZW5ndGgiLCJzcGFuIiwiY3JlYXRlRWxlbWVudCIsImhhbmRsZUNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsInRvZ2dsZSIsImluc2VydEJlZm9yZSIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsIm9wZW4iLCJ1bHMiLCJkaXNwbGF5IiwibXlDb29raWUiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWVFUSIsImNhIiwic3BsaXQiLCJpIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJlcmFzZUNvb2tpZSIsImhvbGRlciIsImdldEVsZW1lbnRCeUlkIiwic2hvd0N1cnJlbnQiLCJzaXRlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzaXRlIiwiY2xpY2siLCJidXR0b25zIiwiYnV0dG9uIiwiYWRkTGlua0NsaWNrIiwiZGF0YXNldCIsImlucHV0YWN0aXZlIiwiaW5wdXRFbGVtZW50IiwidHlwZSIsIndpZHRoIiwia2V5IiwiaW5wdXRMaW5rIiwiYmVmb3JlIiwiZm9jdXMiLCJpbnB1dCIsInBhcmVudEVsZW1lbnQiLCJsaW5rIiwicHJvdG8iLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdG5hbWUiLCJ1cmkiLCJ1cmwiLCJkZXN0aW5hdGlvbiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJyZXF1ZXN0IiwiWE1MSHR0cFJlcXVlc3QiLCJzZW5kIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwidXBkYXRlU2l0ZURPTSIsIkRPTXRleHQiLCJjaGFuZ2VkRWxlbSIsImNoYW5nZWRET00iLCJjaGlsZHJlbiIsInNpdGVET00iLCJhZGRpdGlvbnMiLCJnZXRET01BZGRpdGlvbnMiLCJjb25zb2xlIiwibG9nIiwib2xkRE9NQ29sbGVjdGlvbiIsIm5ld0RPTUNvbGxlY3Rpb24iLCJvbGRJIiwicHVzaCIsImZpZWxkc1RvYyIsInNlbGVjdG9ycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnJheU9mU2VsZWN0b3JzIiwiaXRlbXMiLCJkaXYiLCJnZXRBdHRyaWJ1dGUiLCJ0cmltIiwiY3VycmVudFNlbGVjdGlvbiIsInVsRWwiLCJsaXN0RWwiLCJhRWwiLCJ0ZXN0IiwicG9zIiwic3BsaWNlIiwicHJldmVudERlZmF1bHQiLCJlbXB0eSIsInBvc0luQ3VycmVudCIsImhyZWYiLCJhcHBlbmRDaGlsZCIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInJlcGxhY2UiXSwic291cmNlUm9vdCI6IiJ9
>>>>>>> c2b394174b90f0ea1a78e705c51dd8c22c4b2c1b

(self.webpackChunkpublic=self.webpackChunkpublic||[]).push([[143],{224:function(){const e={bodyObject:null,init:function(){e.bodyObject=document.getElementsByTagName("body")[0],this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(t){e.bodyObject.classList.add("body-loaded"),e.bodyObject.classList.remove("body-unloaded"),"ontouchstart"in document.documentElement?e.bodyObject.classList.add("touch"):e.bodyObject.classList.add("no-touch")})),window.addEventListener("beforeunload",(function(){}))}};e.init()},999:function(){(function(){function e(e,s){[].forEach.call(e.getElementsByTagName("li"),(o=>{if(!s||e===o.parentNode){o.style.userSelect="none",o.style.MozUserSelect="none",o.style.msUserSelect="none",o.style.WebkitUserSelect="none";const e=o.getElementsByTagName("ul");if(e.length>0){const s=document.createElement("span");s.classList.add("open-close"),s.addEventListener("click",t.bind(null,o)),s.innerHTML='<i class="open">&nbsp;</i><i class="closed">↰</i>',(o.classList.contains("section")||o.classList.contains("current"))&&n(o),n(o),o.insertBefore(s,e[0])}}}))}function t(e,t){let s=t.target;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&n(e)}function n(e){const t=e.classList.contains("collapsibleListClosed"),n=e.getElementsByTagName("ul");[].forEach.call(n,(n=>{let s=n;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&(n.style.display=t?"block":"none")})),e.classList.remove("collapsibleListOpen"),e.classList.remove("collapsibleListClosed"),n.length>0&&e.classList.add("collapsibleList"+(t?"Open":"Closed"))}return{apply:function(t){[].forEach.call(document.getElementsByTagName("ul"),(n=>{n.classList.contains("collapsibleList")&&(e(n,!0),t||[].forEach.call(n.getElementsByTagName("ul"),(e=>{e.classList.add("collapsibleList")})))}))},applyTo:e}})().apply()},646:function(){window.onload=function(){const e=document.getElementsByClassName("menu-holder");for(var t=0;t<e.length;t++){e[t].onclick=function(e){e.target===this&&this.classList.toggle("on")}}};document.getElementById("find-box").addEventListener("input",(function(e){const t=e.target.value;var n=document.getElementsByClassName("site");let s=[],o=[];for(var c=0;c<n.length;c++){const e=n.item(c),a=e.id.substring(5).indexOf(t);t?0===a?s.push(e):(e.classList.remove("show"),e.classList.add("hidden"),-1!=a&&o.push(e)):(e.classList.remove("show"),e.classList.remove("hidden"))}if(s.length>0)for(c=0;c<s.length;c++)s[c].classList.add("show"),s[c].classList.remove("hidden");else if(o.length>0)for(c=0;c<o.length;c++)o[c].classList.add("show"),o[c].classList.remove("hidden");const a=document.getElementById("SearchResult");s.length>0?a.innerHTML=s.length+"/"+n.length:o.length>0?a.innerHTML=o.length+"/"+n.length:a.innerHTML=""}))},440:function(){for(var e=document.querySelectorAll("input, select, textarea"),t=e.length-1;t>=0;--t){e[t].addEventListener("change",s,!1),e[t].addEventListener("keyup",s,!1),e[t].addEventListener("focus",s,!1),e[t].addEventListener("blur",s,!1),e[t].addEventListener("mousedown",s,!1);var n=document.createEvent("HTMLEvents");n.initEvent("change",!1,!0),e[t].dispatchEvent(n)}function s(e){var t=e.target.value;t&&t.replace(/^\s+|\s+$/g,"")?e.target.classList.remove("no-value"):e.target.classList.add("no-value")}},874:function(e,t,n){"use strict";n(224),n(999),n(440);function s(e){const t=e.currentTarget,n=!t.classList.contains("show-current");t.classList.toggle("show-current"),t.classList.toggle("show-all");const s=document.getElementsByClassName("site");for(var o=0;o<s.length;o++){const e=s[o];n&&e.classList.contains("current")||!n?e.classList.remove("hide-not-current"):e.classList.add("hide-not-current")}}function o(e,t){e.forEach((e=>{const n=e.getAttribute("data-field").trim(),s=0===t.length,o=t.indexOf(n);e.classList.contains("missing-links")?function(e,t,n){let s=!1;const o=e.querySelectorAll("li");for(var c=0;c<o.length;c++){const e=o[c].getAttribute("data-field").trim();-1!==n.indexOf(e)&&(s=!0)}e.style.display=s||t?"":"none"}(e,s,t):e.style.display=s||-1!==o?"":"none"}))}let c=[];function a(e=!1){!function(){const e=document.getElementsByClassName("addlinkbutton");for(var t=0;t<e.length;t++){const n=e[t];n.removeEventListener("click",i),n.addEventListener("click",i)}}(),function(e){const t=document.getElementById("ShowHideCurrent");t.classList.toggle("show-all"),t&&(t.removeEventListener("click",s,!0),t.addEventListener("click",s,!0)),e&&document.getElementsByClassName("current").length>0&&t.click()}(e),function(e,t){const n=document.getElementById("fieldsToc");if(n){var s=[...document.querySelectorAll("[data-field]")];const c=[];s.forEach((e=>{const t=e.getAttribute("data-field").trim();-1===c.indexOf(t)&&c.push(t)}));const a=document.createElement("ul");a.id="filterUl";const i=[];c.forEach((e=>{const n=document.createElement("li"),c=document.createElement("a");c.innerHTML=e,c.addEventListener("click",(function(n){const c=this.innerHTML;this.classList.toggle("current"),this.classList.toggle("link");const a=t.indexOf(c);return this.classList.contains("current")?-1===a&&t.push(e):-1!==a&&t.splice(a,1),n.preventDefault(),o(s,t),!1})),c.href="#",c.classList.add("link"),i.push(c),n.appendChild(c),a.appendChild(n)})),e||(document.getElementById("filterUl").remove(),o(s,t),i.forEach((e=>{t.includes(e.innerHTML)&&(e.classList.toggle("current"),e.classList.toggle("link"))}))),n.appendChild(a)}}(e,c)}function i(e){const t=e.currentTarget;if("false"==t.dataset.inputactive){t.dataset.inputactive="true";const e=document.createElement("input");e.type="text",e.classList.add("addlinkinput"),e.style.width="250px",e.style.float="right",e.addEventListener("keyup",(({key:n})=>{"Enter"===n&&(""!=e.value&&l(t,e.value),t.dataset.inputactive="false",e.remove())})),t.before(e),e.focus()}else{t.dataset.inputactive="false";const e=t.parentElement.getElementsByClassName("addlinkinput")[0];""!=e.value&&l(t,e.value),e.remove()}}function l(e,t){const n=window.location.protocol+"//"+window.location.hostname+e.dataset.url,s=new FormData;s.append("link",t);const o=new XMLHttpRequest;o.open("POST",n),o.send(s),o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){const t=o.responseText;e.parentElement.parentElement.outerHTML=t,a()}}}a(!0);n(646);let r={};(function(){r={totalSites:0,sitesWithCurrentProject:0,totalProjects:0,activeProjects:0,projectHoursLeft:0,projectDaysLeft:0,completeDate:new Date};for(var e=0;e<window.stats.sites.length;e++){const t=window.stats.sites[e];r.totalSites++,t.isCurrent&&r.sitesWithCurrentProject++}for(e=0;e<window.stats.projects.length;e++){const t=window.stats.projects[e];r.totalProjects++,r.projectHoursLeft+=t.HoursLeft,r.projectDaysLeft=Math.round(r.projectHoursLeft/5),r.completeDate=new Date((new Date).getTime()+24*r.projectDaysLeft*60*60*1e3),t.isActive&&r.activeProjects++}})(),document.getElementById("stats-total-sites").innerHTML=r.totalSites,document.getElementById("stats-current-sites").innerHTML=r.sitesWithCurrentProject,document.getElementById("stats-inactive-sites").innerHTML=r.totalSites-r.sitesWithCurrentProject,document.getElementById("stats-total-projects").innerHTML=r.totalProjects,document.getElementById("stats-active-projects").innerHTML=r.activeProjects,document.getElementById("stats-past-projects").innerHTML=r.totalProjects-r.activeProjects,document.getElementById("stats-project-hours").innerHTML=Math.round(r.projectHoursLeft).toLocaleString("en-US"),document.getElementById("stats-project-days").innerHTML=r.projectDaysLeft.toLocaleString("en-GB"),document.getElementById("stats-completion-day").innerHTML=r.completeDate.toLocaleDateString("en-GB")}},function(e){var t;t=874,e(e.s=t)}]);
(self.webpackChunkpublic=self.webpackChunkpublic||[]).push([[143],{224:function(){const e={bodyObject:null,init:function(){e.bodyObject=document.getElementsByTagName("body")[0],this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(t){e.bodyObject.classList.add("body-loaded"),e.bodyObject.classList.remove("body-unloaded"),"ontouchstart"in document.documentElement?e.bodyObject.classList.add("touch"):e.bodyObject.classList.add("no-touch")})),window.addEventListener("beforeunload",(function(){}))}};e.init()},999:function(){(function(){function e(e,s){[].forEach.call(e.getElementsByTagName("li"),(o=>{if(!s||e===o.parentNode){o.style.userSelect="none",o.style.MozUserSelect="none",o.style.msUserSelect="none",o.style.WebkitUserSelect="none";const e=o.getElementsByTagName("ul");if(e.length>0){const s=document.createElement("span");s.classList.add("open-close"),s.addEventListener("click",t.bind(null,o)),s.innerHTML='<i class="open">&nbsp;</i><i class="closed">↰</i>',(o.classList.contains("section")||o.classList.contains("current"))&&n(o),n(o),o.insertBefore(s,e[0])}}}))}function t(e,t){let s=t.target;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&n(e)}function n(e){const t=e.classList.contains("collapsibleListClosed"),n=e.getElementsByTagName("ul");[].forEach.call(n,(n=>{let s=n;for(;"LI"!==s.nodeName;)s=s.parentNode;s===e&&(n.style.display=t?"block":"none")})),e.classList.remove("collapsibleListOpen"),e.classList.remove("collapsibleListClosed"),n.length>0&&e.classList.add("collapsibleList"+(t?"Open":"Closed"))}return{apply:function(t){[].forEach.call(document.getElementsByTagName("ul"),(n=>{n.classList.contains("collapsibleList")&&(e(n,!0),t||[].forEach.call(n.getElementsByTagName("ul"),(e=>{e.classList.add("collapsibleList")})))}))},applyTo:e}})().apply()},646:function(){window.onload=function(){const e=document.getElementsByClassName("menu-holder");for(var t=0;t<e.length;t++){e[t].onclick=function(e){e.target===this&&this.classList.toggle("on")}}};function e(e,n){let s=!1;return(-1!==e.textContent.toLowerCase().indexOf(n)||t(e,n))&&(s=!0),s}function t(e,n){let s=!1;if("A"==e.tagName){-1!==e.href.toLowerCase().indexOf(n)&&(s=!0)}for(const o of e.children)t(o,n)&&(s=!0);return s}document.getElementById("find-box").addEventListener("input",(function(t){const n=t.target.value.toLowerCase(),s=document.getElementById("ShowHideCurrent"),o=document.getElementById("SearchFilterHR");var a=document.getElementsByClassName("site");let i=[],l=[];for(var c=0;c<a.length;c++){const e=a.item(c),t=e.id.substring(5).indexOf(n);n?0===t?(s.style.display="none",o.style.display="none",i.push(e)):(s.style.display="none",o.style.display="none",e.classList.remove("show"),e.classList.add("hidden"),-1!=t&&l.push(e)):(s.style.display="",o.style.display="",e.classList.remove("show"),e.classList.remove("hidden"))}if(i.length>0)for(c=0;c<i.length;c++)i[c].classList.add("show"),i[c].classList.remove("hidden");else if(l.length>0)for(c=0;c<l.length;c++)l[c].classList.add("show"),l[c].classList.remove("hidden");else n.length>0&&function(t,n){let s=0;for(var o=0;o<t.length;o++){e(t[o],n)?(s++,t[o].classList.add("show"),t[o].classList.remove("hidden")):(t[o].classList.remove("show"),t[o].classList.add("hidden"))}const a=document.getElementById("SearchResult");a.innerHTML=s>0?s+"/"+t.length:"0/"+t.length}(a,n);const r=document.getElementById("SearchResult");n.length<1?r.innerHTML="":(i.length>0||l.length>0)&&(i.length>0?r.innerHTML=i.length+"/"+a.length:l.length>0&&(r.innerHTML=l.length+"/"+a.length))}))},440:function(){for(var e=document.querySelectorAll("input, select, textarea"),t=e.length-1;t>=0;--t){e[t].addEventListener("change",s,!1),e[t].addEventListener("keyup",s,!1),e[t].addEventListener("focus",s,!1),e[t].addEventListener("blur",s,!1),e[t].addEventListener("mousedown",s,!1);var n=document.createEvent("HTMLEvents");n.initEvent("change",!1,!0),e[t].dispatchEvent(n)}function s(e){var t=e.target.value;t&&t.replace(/^\s+|\s+$/g,"")?e.target.classList.remove("no-value"):e.target.classList.add("no-value")}},11:function(e,t,n){"use strict";n(224),n(999),n(440);function s(e){const t=e.currentTarget,n=!t.classList.contains("show-current");t.classList.toggle("show-current"),t.classList.toggle("show-all");const s=document.getElementsByClassName("site");for(var o=0;o<s.length;o++){const e=s[o];n&&e.classList.contains("current")||!n?e.classList.remove("hide-not-current"):e.classList.add("hide-not-current")}}function o(e,t){e.forEach((e=>{const n=e.getAttribute("data-field").trim(),s=0===t.length,o=t.indexOf(n);s||-1!==o?e.style.display="":e.classList.contains("missing-links")?function(e,t,n){let s=!1;const o=e.querySelectorAll("li");for(var a=0;a<o.length;a++){const e=o[a].getAttribute("data-field").trim();-1!==n.indexOf(e)&&(s=!0)}e.style.display=s||t?"":"none"}(e,s,t):e.classList.contains("error")&&-1!==t.indexOf("Missing")?e.style.display="":e.style.display="none"}))}function a(e){const t=e.currentTarget.children[0].children[0];window.getSelection().selectAllChildren(t)}function i(e){if("Enter"===e.key){e.preventDefault(),e.currentTarget.blur(),window.getSelection().removeAllRanges();const t=e.currentTarget,n=t.innerHTML,s=window.location.protocol,o=window.location.hostname,a=t.parentElement.parentElement.parentElement.parentElement,i=a.dataset.id,c=s+"//"+o+("/our-sites/updateprojecthours/"+i+"/"),r=new FormData;r.append("hours",n);const d=new XMLHttpRequest;d.open("POST",c),d.send(r),d.onreadystatechange=function(){if(4==d.readyState&&200==d.status){const e=d.responseText;l(a).outerHTML=e,function(e,t){const n=window.stats.projects.filter((t=>t.id==e)),s=document.querySelector('[data-id="'+e+'"]').dataset.hoursleft;n[0].CurrentHours=t,n[0].HoursLeft=parseFloat(s)}(i,n),p(),alert("Updated Hours")}else 4==d.readyState&&(alert(d.status+" Error Updating Hours"),t.innerHTML=window.stats.projects.filter((e=>e.id==i))[0].CurrentHours)}}}function l(e){return e.classList.contains("site")?e:l(e.parentElement)}let c={};function r(){!function(){c={totalSites:0,sitesWithCurrentProject:0,totalProjects:0,activeProjects:0,projectHoursLeft:0,projectDaysLeft:0,completeDate:new Date};for(var e=0;e<window.stats.sites.length;e++){const t=window.stats.sites[e];c.totalSites++,t.isCurrent&&c.sitesWithCurrentProject++}for(e=0;e<window.stats.projects.length;e++){const t=window.stats.projects[e];c.totalProjects++,t.isActive&&(c.activeProjects++,c.projectHoursLeft+=t.HoursLeft,c.projectDaysLeft=Math.round(c.projectHoursLeft/5),c.completeDate=new Date((new Date).getTime()+24*c.projectDaysLeft*60*60*1e3))}}(),document.getElementById("stats-total-sites").innerHTML=c.totalSites,document.getElementById("stats-current-sites").innerHTML=c.sitesWithCurrentProject,document.getElementById("stats-inactive-sites").innerHTML=c.totalSites-c.sitesWithCurrentProject,document.getElementById("stats-total-projects").innerHTML=c.totalProjects,document.getElementById("stats-active-projects").innerHTML=c.activeProjects,document.getElementById("stats-past-projects").innerHTML=c.totalProjects-c.activeProjects,document.getElementById("stats-project-hours").innerHTML=Math.round(c.projectHoursLeft).toLocaleString("en-US"),document.getElementById("stats-project-days").innerHTML=c.projectDaysLeft.toLocaleString("en-GB"),document.getElementById("stats-completion-day").innerHTML=c.completeDate.toLocaleDateString("en-GB")}function d(e){const t=e.currentTarget;if("false"==t.dataset.inputactive){t.dataset.inputactive="true";const e=document.createElement("input");e.type="text",e.classList.add("addsiteinput"),e.style.width="250px",e.style.float="right",e.style.fontSize="2rem",e.style.height="3rem",e.addEventListener("keyup",(({key:n})=>{"Enter"===n&&(""!=e.value&&u(e.value),t.dataset.inputactive="false",e.remove())})),t.parentElement.append(e),e.focus()}else{t.dataset.inputactive="false";const e=t.parentElement.getElementsByClassName("addsiteinput")[0];""!=e.value&&u(e.value),e.remove()}}function u(e){const t=window.location.protocol+"//"+window.location.hostname+"/our-sites/addsite/",n=new FormData;n.append("link",e);const s=new XMLHttpRequest;s.open("POST",t),s.send(n),s.onreadystatechange=function(){if(4==s.readyState&&200==s.status){const e=s.responseText;document.body.parentElement.innerHTML=e,p(!0)}}}r();let m=[];function p(e=!1){!function(){const e=document.getElementsByClassName("addlinkbutton");for(var t=0;t<e.length;t++){const n=e[t];n.removeEventListener("click",f),n.addEventListener("click",f)}}(),function(e){const t=document.getElementById("ShowHideCurrent");t&&(t.removeEventListener("click",s,!0),t.addEventListener("click",s,!0)),e&&(t.classList.toggle("show-all"),document.getElementsByClassName("current").length>0&&t.click())}(e),function(e,t){const n=document.getElementById("fieldsToc");if(n){var s=[...document.querySelectorAll("[data-field]")];const a=[];s.forEach((e=>{const t=e.getAttribute("data-field").trim();-1===a.indexOf(t)&&a.push(t)}));const i=document.createElement("ul");i.id="filterUl";const l=[];a.forEach((e=>{const n=document.createElement("li"),a=document.createElement("a");a.innerHTML=e,a.addEventListener("click",(function(n){const a=this.innerHTML;this.classList.toggle("current"),this.classList.toggle("link");const i=t.indexOf(a);return this.classList.contains("current")?-1===i&&t.push(e):-1!==i&&t.splice(i,1),n.preventDefault(),o(s,t),!1})),a.href="#",a.classList.add("link"),l.push(a),n.appendChild(a),i.appendChild(n)})),e||(document.getElementById("filterUl").remove(),o(s,t),l.forEach((e=>{t.includes(e.innerHTML)&&(e.classList.toggle("current"),e.classList.toggle("link"))}))),n.appendChild(i)}}(e,m),function(){const e=document.getElementsByClassName("editable-field"),t=document.getElementsByClassName("hour-graph");for(var n=0;n<e.length;n++){const t=e[n];t.removeEventListener("keydown",i),t.addEventListener("keydown",i)}for(n=0;n<t.length;n++){const e=t[n];e.removeEventListener("click",a),e.addEventListener("click",a)}}(),function(){const e=document.getElementById("add-site-frontend");e&&(e.removeEventListener("click",d),e.addEventListener("click",d))}(),r()}function f(e){const t=e.currentTarget;if("false"==t.dataset.inputactive){t.dataset.inputactive="true";const e=document.createElement("input");e.type="text",e.classList.add("addlinkinput"),e.style.width="250px",e.style.float="right",e.addEventListener("keyup",(({key:n})=>{"Enter"===n&&(""!=e.value&&g(t,e.value),t.dataset.inputactive="false",e.remove())})),t.before(e),e.focus()}else{t.dataset.inputactive="false";const e=t.parentElement.getElementsByClassName("addlinkinput")[0];""!=e.value&&g(t,e.value),e.remove()}}function g(e,t){const n=window.location.protocol+"//"+window.location.hostname+e.dataset.url,s=new FormData;s.append("link",t);const o=new XMLHttpRequest;o.open("POST",n),o.send(s),o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){const t=o.responseText;e.parentElement.parentElement.outerHTML=t,p()}}}p(!0);n(646)}},function(e){var t;t=11,e(e.s=t)}]);
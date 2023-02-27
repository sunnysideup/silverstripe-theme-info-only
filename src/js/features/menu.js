window.onload = function() {
    const menuItems = document.getElementsByClassName('menu-holder');
    for(var i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        menuItem.onclick = function(e)
        {
            if (e.target !== this) {
                return;
            }
            this.classList.toggle('on')
        }
    }
}

const source = document.getElementById('find-box');

const inputHandler = function(e) {
    const value = e.target.value.toLowerCase();
    const currentFilter = document.getElementById('ShowHideCurrent');
    const hr = document.getElementById('SearchFilterHR');
    var sites = document.getElementsByClassName("site");
    let prefixMatches = [];
    let substringMatches = [];

    for (var i = 0; i < sites.length; i++) {
        const site = sites.item(i)
        const id = site.id
        const res = id.substring(5).indexOf(value);
        if (! value) {
            currentFilter.style.display = '';
            hr.style.display = '';
            site.classList.remove('show')
            site.classList.remove('hidden')
        } else if(res === 0) {
            //console.log(value + '=' + id + '- show' )
            currentFilter.style.display = 'none';
            hr.style.display = 'none';
            prefixMatches.push(site)
        } else {
            //console.log(value + '=' + id + '- hide' )
            currentFilter.style.display = 'none';
            hr.style.display = 'none';
            site.classList.remove('show')
            site.classList.add('hidden')
            if(res != -1) {
                substringMatches.push(site)
            }
        }
    }
    if (prefixMatches.length > 0) {
        for (var i = 0; i < prefixMatches.length; i++) {
            prefixMatches[i].classList.add('show')
            prefixMatches[i].classList.remove('hidden')
        }
    } else if (substringMatches.length > 0) {
        for (var i = 0; i < substringMatches.length; i++) {
            substringMatches[i].classList.add('show')
            substringMatches[i].classList.remove('hidden')
        }
    }
    else if (value.length > 0) {
        //no matches by site name, run a broad search
        broadSearch(sites, value);
    }
    //green/red color if find/not find site

    const resultDiv = document.getElementById("SearchResult");
    //display xx/yy
    if (value.length < 1) {
        resultDiv.innerHTML = "";
    }
    else if (prefixMatches.length > 0 || substringMatches.length > 0) {
        if (prefixMatches.length > 0) { resultDiv.innerHTML = prefixMatches.length+"/"+sites.length;}
        else if (substringMatches.length > 0) { resultDiv.innerHTML = substringMatches.length+"/"+sites.length;}
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
        }
        else {
            sites[i].classList.remove('show');
            sites[i].classList.add('hidden');
        }
    }
    const resultDiv = document.getElementById("SearchResult");
    if (matches > 0) { resultDiv.innerHTML = matches+"/"+sites.length;}
    else { resultDiv.innerHTML = "0/"+sites.length; }
}

function elementTextSearch(element, term) {
    let match = false;
    const location = element.textContent.toLowerCase().indexOf(term);
    if (location !== -1) {
        match = true;
    }
    else if (recursiveLinkSearch(element, term)) {
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

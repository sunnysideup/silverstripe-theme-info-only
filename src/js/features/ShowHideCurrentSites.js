export function showHideCurrentSitesInit(onFirstInit) {
    const holder = document.getElementById('ShowHideCurrent');
    if(holder) {
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
        if((showCurrent && site.classList.contains('current')) || !showCurrent) {
            site.classList.remove("hide-not-current");
         } else {
            site.classList.add("hide-not-current");
        }
    }
}
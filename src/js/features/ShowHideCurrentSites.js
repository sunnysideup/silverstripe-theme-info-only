export function showHideCurrentSitesInit(onFirstInit) {
    const holder = document.getElementById('ShowHideCurrent');
    if(holder) {
        holder.removeEventListener('click', holderEventHandler, true);
        holder.addEventListener('click', holderEventHandler, true);
    }
    if (onFirstInit) {
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
        if((showCurrent && site.classList.contains('current')) || !showCurrent) {
            site.style.display = 'block';
         } else {
            site.style.display = 'none';
        }
    }
}
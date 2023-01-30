const holder = document.getElementById('ShowHideCurrent');
if(holder) {
    holder.addEventListener(
        'click',
        function() {
            const showCurrent = !holder.classList.contains('show-current');
            holder.classList.toggle('show-current');
            var sites = document.getElementsByClassName('site');
            for (var i = 0; i < sites.length; i++) {
                const site = sites[i];
                if((showCurrent && site.classList.contains('current')) || !showCurrent) {
                    site.style.display = 'block';
                } else {
                    site.style.display = 'none';
                }
            }
        }
    );
    holder.click();
}


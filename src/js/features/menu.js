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
    const value = e.target.value
    var sites = document.getElementsByClassName("site");
    for (var i = 0; i < sites.length; i++) {
        const site = sites.item(i)
        const id = site.id
        if(id.indexOf(value) === 5 || ! value) {
            console.log(value + '=' + id + '- show' )
            site.classList.add('show')
            site.classList.remove('hidden')
        } else {
            console.log(value + '=' + id + '- hide' )
            site.classList.remove('show')
            site.classList.add('hidden')
        }
    }
}

source.addEventListener('input', inputHandler);

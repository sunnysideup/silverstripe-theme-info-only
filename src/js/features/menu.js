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
  value = e.target.value
}

source.addEventListener('input', inputHandler);

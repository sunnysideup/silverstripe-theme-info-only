const sites = document.getElementsByClassName('site');
const buttons = document.getElementsByClassName('addlinkbutton');

//Adding event listeners
for (var i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.addEventListener(
            'click',
            function() {addLinkClick(button);}
    )
}

function addLinkClick(button) {
    //so only one input is created
    if (button.dataset.inputactive == "false") {
        button.dataset.inputactive = "true";
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.classList.add('addlinkinput');
        inputElement.style.width = "250px"

        inputElement.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                if (inputElement.value != '') {inputLink(button, inputElement.value);}
                button.dataset.inputactive = "false";
                inputElement.remove();
            }
        })
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
    const destination = proto+"//"+hostname+uri

    // collate form
    const formData = new FormData();
    formData.append("link", link);

    // make request
    const request = new XMLHttpRequest();
    request.open("POST", destination);
    request.send(formData);

    // handle response
    request.onreadystatechange = function() {
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
        }
        else {
            //these align
            oldI++;
        }
    }

    return additions;
}
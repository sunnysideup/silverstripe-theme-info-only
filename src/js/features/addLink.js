import {siteInit} from './initFeatures'

export function addLinkInit() {
    const buttons = document.getElementsByClassName('addlinkbutton');
    //Adding event listeners
    for (var i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        //clear existing listeners just in case (eg for partial resets)
        button.removeEventListener('click', addLinkClick);
        button.addEventListener('click', addLinkClick);
    }
}

function addLinkClick(event) {
    const button = event.currentTarget;
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
            const site = button.parentElement.parentElement;
            site.outerHTML = response;
            //re-init here!
            siteInit();
        }
    };
}
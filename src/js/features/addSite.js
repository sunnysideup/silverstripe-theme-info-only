import {siteInit} from './initFeatures'

export function addSiteInit() {
    const button = document.getElementById('add-site-frontend');
    if (button) {
        button.removeEventListener('click', addSite);
        button.addEventListener('click', addSite);
    }
}

function addSite(event) {
    const button = event.currentTarget;
    if (button.dataset.inputactive == "false") {
        button.dataset.inputactive = "true";
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.classList.add('addsiteinput');
        inputElement.style.width = "250px"
        inputElement.style.float = "right"
        inputElement.style.fontSize = "2rem"
        inputElement.style.height = "3rem"

        inputElement.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                if (inputElement.value != '') {inputSite(inputElement.value);}
                button.dataset.inputactive = "false";
                inputElement.remove();
            }
        })
        button.parentElement.append(inputElement);
        inputElement.focus();
    }

    //input already exists, pressing button again submits
    else {
        button.dataset.inputactive = "false";
        const input = button.parentElement.getElementsByClassName('addsiteinput')[0];
        if (input.value != '') {
            inputSite(input.value);
        }
        input.remove();
    }
}

function inputSite(value) {
    // destination
    const proto = window.location.protocol;
    const hostname = window.location.hostname;
    const destination = proto+"//"+hostname+"/our-sites/addsite/";

    // collate form
    const formData = new FormData();
    formData.append("link", value);

    // make request
    const request = new XMLHttpRequest();
    request.open("POST", destination);
    request.send(formData);

    // handle response
    request.onreadystatechange = function() {
        //after response
        if (request.readyState == 4 && request.status == 200) {
            const response = request.responseText;
            //do something to reactively add the new site to the DOM
            document.body.parentElement.innerHTML = response;
            //re-init here!
            siteInit(true);
        }
    };
}
const buttonTemplate =  '<button data-id="x" data-inputactive="false">+</button>'

const sites = document.getElementsByClassName('site');
for (var i = 0; i < sites.length; i++) {
    const site = sites[i];
    
    // create html div
    const newElement = document.createElement('div');
    newElement.innerHTML = buttonTemplate.replace('x',site.dataset.id)
    
    // find the appropriate place to add 
    site.children[0].before(newElement)

    // add listener
    site.children[0].children[0].addEventListener(
        'click', 
        function() {addLinkClick(site);}
        )
    
    //add styling classes
    site.children[0].children[0].classList.add('AddLinkButton');
    newElement.classList.add('AddLinkDiv')
}

function addLinkClick(site) {
    const button = site.children[0].getElementsByClassName('AddLinkButton')[0];
    //so only one input is created
    if (button.dataset.inputactive == "false") {
        button.dataset.inputactive = "true";
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.classList.add('AddLinkInput');

        inputElement.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                if (inputElement.value != '') {inputLink(site, inputElement.value);}
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
        const input = site.children[0].getElementsByClassName('AddLinkInput')[0];
        if (input.value != '') {
            inputLink(site, input.value);
        }
        input.remove();
    }

}

function inputLink(site, link) {
    // destination
    const proto = window.location.protocol;
    const hostname = window.location.hostname;
    const uri = document.getElementsByTagName('body')[0].dataset.link;
    const destination = proto+"//"+hostname+uri+"addlink"
    // values
    const id = site.dataset.id
    // link is here already ..

    // collate form
    const formData = new FormData();
    formData.append("id", id);
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
            updateSiteDOM(id, response);
        }
    };
}

function updateSiteDOM(id, DOMtext) {
    let site;
    for (var i = 0; i < sites.length; i++) {
        if (sites[i].dataset.id == id) {
            site=sites[i];
        }
    }

    //site.innerHTML=DOMtext
    const diff = getSiteDOMDiff();
    //get the changes, iterate through and apply additions
    //this way event handlers etc shouldn't be overwritten
    //doesn't account for intentional deletions?
}

function getSiteDOMDiff() {
    //https://gist.github.com/joshblack/81b61f33fdb6233c50eb maybe this?
    return;
}

//CSS for button and input

const styles = `
    .AddLinkButton {
        appearance: none;
        background-color: #2ea44f;
        border: 1px solid rgba(27, 31, 35, .15);
        border-radius: 6px;
        box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 16px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        white-space: nowrap;
        margin-left:0.5em;
    }

    .AddLinkButton:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
    }

    .AddLinkButton:hover {
    background-color: #2c974b;
    }

    .AddLinkButton:focus {
    box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
    outline: none;
    }

    .AddLinkButton:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
    }

    .AddLinkButton:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
    }

    .AddLinkDiv {
        float: right;
        margin-top: 1em;
    }
`
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet)
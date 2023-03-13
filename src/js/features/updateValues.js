import {siteInit} from './initFeatures'

export function updateValuesInit() {
    const fields = document.getElementsByClassName('editable-field');
    const bars = document.getElementsByClassName('hour-graph');
    for (var i = 0; i < fields.length; i++) {
        const field = fields[i];
        field.removeEventListener('keydown', addEditing);
        field.addEventListener('keydown', addEditing);
    }
    for (var i = 0; i < bars.length; i++) {
        const bar = bars[i];
        bar.removeEventListener('click', selectField);
        bar.addEventListener('click', selectField);
    }
}

function selectField(event) {
    const bar = event.currentTarget;
    const field = bar.children[0].children[0];
    window.getSelection().selectAllChildren(field);
}

function addEditing(event) {
    if (event.key === "Enter") {
        //don't add newline
        event.preventDefault();
        //remove focus on field
        event.currentTarget.blur();
        window.getSelection().removeAllRanges();
        //get and submit new value
        const field = event.currentTarget;
        const newValue = field.innerHTML;

        // destination
        const proto = window.location.protocol;
        const hostname = window.location.hostname;
        const pm = field.parentElement.parentElement.parentElement.parentElement;
        const pmID = field.dataset.id;
        const uri = "/our-sites/updateprojecthours/"+pmID+"/"; //project UUID 
        const destination = proto+"//"+hostname+uri

        const formData = new FormData();
        formData.append("hours", newValue);
        const request = new XMLHttpRequest();
        request.open("POST", destination);
        request.send(formData);

        //response
        request.onreadystatechange = function() {
            //after response
            if (request.readyState == 4 && request.status == 200) {
                const response = request.responseText;
                const site = getParentSite(pm);
                site.outerHTML = response;
                //re-init here!
                updateStatHours(pmID, newValue);
                siteInit();
                alert("Updated Hours");
            }
            else if (request.readyState == 4) {
                alert(request.status + " Error Updating Hours");
                field.innerHTML = window.stats.projects.filter(pr => pr.id == pmID)[0].CurrentHours;
            }
        };
    }
}

function getParentSite(elem) {
    if (elem.classList.contains("site")) {
        return elem;
    }
    else {
        return getParentSite(elem.parentElement);
    }
}

function updateStatHours(pmID, hours) {
    const project = window.stats.projects.filter(pr => pr.id == pmID);
    const left = document.querySelector('[data-id="'+pmID+'"]').dataset.hoursleft;
    project[0].CurrentHours = hours;
    project[0].HoursLeft = parseFloat(left);
}
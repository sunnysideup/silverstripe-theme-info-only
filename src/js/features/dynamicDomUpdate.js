function updateSiteDOM(DOMtext, button) {
    //get the old and new DOM
    const changedElem = document.createElement('div');
    changedElem.innerHTML = DOMtext;
    const changedDOM = changedElem.children[0].children;
    const site = button.parentElement.parentElement;
    const siteDOM = site.children;

    //find newly added elements
    let additions = getDOMAdditions(siteDOM, changedDOM);

    for (var i = 0; i < additions.length; i++) {
        //find the right place to add them
        const superparent = findEquivalentElement(siteDOM, additions[i].parentElement.parentElement);
        const parent = findEquivalentElement(superparent.children, additions[i].parentElement);

        //add the new elements to the current page
        parent.prepend(additions[i]);
    }
}

function getDOMAdditions(oldDOMCollection, newDOMCollection) {
    let additions = [];

    let oldI = 0;
    for (var i = 0; i < newDOMCollection.length; i++) {
        if (newDOMCollection[i].isEqualNode(oldDOMCollection[oldI])) {
            //no changes made in this element
            oldI++;
        }
        else {
            //there is a change here, does the expected thing occur later?
            if (doesHTMLCollectionContain(newDOMCollection, oldDOMCollection[oldI])) {
                //there is an addition here, or something changed in a child here
                //if not, this is entirely new/changed
                additions.push(newDOMCollection[i]);
            }
            //are they the same without children?
            //if so, the change is there instead
            else if (areElementsEqualWithoutChildren(oldDOMCollection[oldI], newDOMCollection[i])) {
                additions.push.apply(additions, getDOMAdditions(oldDOMCollection[oldI].children, newDOMCollection[i].children));
            }
            else {
                //there is a deletion here
                //this function only updates additions, but a full system would address this
                oldI++;
                i--;
            }
        }
    }

    return additions;
}

function doesHTMLCollectionContain(collection, element) {
    for (let item of collection) {
        if (item.isEqualNode(element)) {
            return true;
        }
    }
    return false;
}

function areElementsEqualWithoutChildren(element1, element2) {
    if (element1 === undefined || element2 === undefined) {
        return false;
    }
    const first = element1.cloneNode(true);
    first.textContent = '';
    const second = element2.cloneNode(true);
    second.textContent = '';
    return first.isEqualNode(second);
}

function findEquivalentElement(collection, element) {
    for (var i = 0; i < collection.length; i++) {
        if (areElementsEqualWithoutChildren(collection[i], element)) {
            return collection[i];
        }
        else {
            //check children
            const childCheck = findEquivalentElement(collection[i].children, element);
            if (childCheck !== false) {return childCheck;}
        }
    }
    return false;
}
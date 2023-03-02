/**
 * if there is a div with ID fieldsToc
 * then it runs
 * It will look for all data-field and create a Fields Table of Contents
 *
 */
export function fieldsTocInit(onFirstInit, currentSelection) {
    const fieldsToc = document.getElementById('fieldsToc')
    if (fieldsToc) {
        const selectors = document.querySelectorAll('[data-field]')
        var arrayOfSelectors = [...selectors]
     // const items = arrayOfSelectors.filter((v, i, a) => a.indexOf(v) === i)
        const items = []
        arrayOfSelectors.forEach(div => {
            const value = div.getAttribute('data-field').trim()
            if (items.indexOf(value) === -1) {
                items.push(value)
            }
            // console.log(value)
        })

        //alphabetical order
        items.sort();

        const ulEl = document.createElement('ul')
        ulEl.id = 'filterUl'

        const els = []

        // for each of the items...
        items.forEach(value => {
            const listEl = document.createElement('li')
            const aEl = document.createElement('a')
            aEl.innerHTML = value

            // on click
            aEl.addEventListener('click', function (event) {
                const test = this.innerHTML
                this.classList.toggle('current')
                this.classList.toggle('link')
                const pos = currentSelection.indexOf(test)
                if (this.classList.contains('current')) {
                    if (pos === -1) {
                        currentSelection.push(value)
                    }
                } else {
                    if (pos !== -1) {
                        currentSelection.splice(pos, 1)
                    }
                }
                event.preventDefault()
                filterIterate(arrayOfSelectors, currentSelection);
                return false
            })

            aEl.href = '#'
            aEl.classList.add('link')
            els.push(aEl);

            // append
            listEl.appendChild(aEl)
            ulEl.appendChild(listEl)
            // console.log(listEl)
        })
        if (!onFirstInit) {
            document.getElementById('filterUl').remove()
            filterIterate(arrayOfSelectors, currentSelection)
            els.forEach(aEl => {
                if (currentSelection.includes(aEl.innerHTML)) {
                    aEl.classList.toggle('current')
                    aEl.classList.toggle('link')
                }
            })
        }
        fieldsToc.appendChild(ulEl)
    }
}

function filterIterate(arrayOfSelectors, currentSelection) {
    arrayOfSelectors.forEach(div => {
        const value = div.getAttribute('data-field').trim()
        const empty = currentSelection.length === 0
        const posInCurrent = currentSelection.indexOf(value)
        if (empty || posInCurrent !== -1) {
            div.style.display = ''
        } else if (div.classList.contains('missing-links')) {
            //is this section actually missing?
            setMissingLinksDisplay(div, empty, currentSelection)
        } else {
            //catch for missing links sections
            if (div.classList.contains('error') && currentSelection.indexOf('Missing') !== -1) {
                div.style.display = '';
            }
            else {
                div.style.display = 'none';
            }
        }
    })
}

function setMissingLinksDisplay(div, empty, currentSelection) {
    //any links that don't have display: none?
    let shouldDisplay = false;
    const missingLinks = div.querySelectorAll('li');
    for (var i = 0; i < missingLinks.length; i++) {
        const value = missingLinks[i].getAttribute('data-field').trim()
        if (currentSelection.indexOf(value) !== -1) {
            shouldDisplay = true;
        }
    }
    if (shouldDisplay || empty) {
        div.style.display = ''
    }
    else {
        div.style.display = 'none'
    }
    //else, hide
}
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
    console.log(value)
  })
  var currentSelection = []
  items.forEach(value => {
    const ulEl = document.createElement('ul')
    const listEl = document.createElement('li')
    const aEl = document.createElement('a')
    aEl.innerHTML = value
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
      arrayOfSelectors.forEach(div => {
        const value = div.getAttribute('data-field').trim()
        const empty = currentSelection.length === 0
        const posInCurrent = currentSelection.indexOf(value)
        if (empty || posInCurrent !== -1) {
          div.style.display = ''
        } else {
          div.style.display = 'none'
        }
      })
      return false
    })
    aEl.href = '#'
    aEl.classList.add('link')
    listEl.appendChild(aEl)
    ulEl.appendChild(listEl)
    fieldsToc.appendChild(ulEl)
    console.log(listEl)
  })
}

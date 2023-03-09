export function keyClickCopyInit() {
    const keys = document.getElementsByClassName('password');
    for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        key.removeEventListener('click', clickCopy);
        key.addEventListener('click', clickCopy);
        key.title = "Click to copy to clipboard"
    }
}

function clickCopy(event) {
    const keyElem = event.currentTarget;
    const text = keyElem.innerText;

    // for compatibility
    if (!navigator.clipboard) {
        // compatibility fallback from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
        var textArea = document.createElement("textarea");
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    } else {
        navigator.clipboard.writeText(text);
    }
}
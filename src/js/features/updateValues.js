export function updateValuesInit() {
    const fields = document.getElementsByClassName('editable-field');
    for (var i = 0; i < fields.length; i++) {
        const field = fields[i];
        field.removeEventListener('keydown', addEditing);
        field.addEventListener('keydown', addEditing);
    }
}

function addEditing(event) {
    if (event.key === "Enter") {
        //don't add newline
        event.preventDefault();
        //remove focus on field
        event.currentTarget.blur();
        window.getSelection().removeAllRanges();
        //get and submit new value
        const newValue = event.currentTarget.innerHTML;
    }
}
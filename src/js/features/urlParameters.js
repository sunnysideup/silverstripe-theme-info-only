const urlParams = new URLSearchParams(window.location.search);

export function setURLParam(keyString, valueString) {
    if (valueString === '') {
        urlParams.delete(keyString);
    }
    else {
        urlParams.set(keyString, valueString);
    }
    var newUrl = window.location.origin 
          + window.location.pathname 
          + '?' + urlParams.toString();
    window.history.pushState({path:newUrl},'',newUrl);
}

export function getURLParam(keyString) {
    return urlParams.get(keyString);
}
import {addLinkInit} from './addLink';
import {showHideCurrentSitesInit} from './ShowHideCurrentSites';
import {fieldsTocInit} from './fieldsToc';

siteInit(true);

export function siteInit(firstInit=false) {
    addLinkInit();
    showHideCurrentSitesInit(firstInit);
    fieldsTocInit(firstInit);
}
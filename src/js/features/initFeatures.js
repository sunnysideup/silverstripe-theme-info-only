import {addLinkInit} from './addLink';
import {showHideCurrentSitesInit} from './ShowHideCurrentSites';
import {fieldsTocInit} from './fieldsToc';
import { updateValuesInit } from './updateValues';

let currentFieldsFilters = [];

siteInit(true);

export function siteInit(firstInit=false) {
    addLinkInit();
    showHideCurrentSitesInit(firstInit);
    fieldsTocInit(firstInit, currentFieldsFilters);
    updateValuesInit();
}
import {addLinkInit} from './addLink';
import {showHideCurrentSitesInit} from './ShowHideCurrentSites';
import {fieldsTocInit} from './fieldsToc';
import { updateValuesInit } from './updateValues';
import { refreshStats } from './stats';
import { addSiteInit } from './addSite';
import { keyClickCopyInit } from './keyClickCopy';

let currentFieldsFilters = [];

siteInit(true);

export function siteInit(firstInit=false) {
    addLinkInit();
    showHideCurrentSitesInit(firstInit);
    fieldsTocInit(firstInit, currentFieldsFilters);
    updateValuesInit();
    addSiteInit();
    keyClickCopyInit();
    refreshStats();
}
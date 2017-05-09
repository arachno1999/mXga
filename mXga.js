// ==UserScript==
// @name        xing-send-document
// @namespace   arachno.de
// @description Dokumenten-Link an Xing-Kontakt senden
// @include     https://www.xing.com/*
// @include     http://www.xing.com/*
// @version     1
// @grant       none
// ==/UserScript==
window.addEventListener('load', function () {
  search = '/profile/';
  if (window.location.pathname.substr(0, search.length) == search) {
    taddon = [
    ];
    addon = [
    ];
    addoncount = 0;
    nodes = document.getElementsByClassName('profile-action-list');
    typen = [
    ];
    typen[0] = 'Mobil';
    typen[1] = 'Telefon';
    typen[2] = 'E-Mail';
    main = [
    ];
    main[0] = 'Geschäftlich';
    main[1] = 'Privat'
    for (m = 0; m < main.length; m++) {
      for (t = 0; t < typen.length; t++) {
        items = document.evaluate('//h3[.=\'' + main[m] + '\']/following-sibling::*/dt[.=\'' + typen[t] + '\']/following-sibling::*', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        item = items.iterateNext();
        if (item) {
          found = 0;
          for (s = 0; s < addon.length; s++) {
            if (addon[s] == item.innerHTML) {
              found = 1;
            }
          }
          if (found == 0) {
            taddon[addoncount] = typen[t].substr(0, 1);
            addon[addoncount++] = item.innerHTML;
          }
        }
      }
    }
    if (addoncount > 0) {
      element = document.createElement('li');
      icon = ' foundation-icon foundation-icon-core-phone';
      for (i = 0; i < addoncount; i++) {
        anchor = document.createElement('a');
        anchor.setAttribute('class', 'profile-action-list-link profile-action-list-link-message' + icon);
        icon = '';
        if (taddon[i] == 'E') {
          anchor.setAttribute('href', 'mailto:' + addon[i]);
        } else {
          anchor.setAttribute('href', 'tel://' + addon[i]);
        }
        anchor.setAttribute('title', addon[i]);
        anchor.innerHTML = '<span class="profile-action-list-link-underline">' + taddon[i] + '</span>';
        element.appendChild(anchor);
      }
      element.setAttribute('class', 'profile-action-list-item');
      nodes[0].appendChild(element);
    }
    element = document.createElement('li');
    anchor = document.createElement('a');
    du = 'false';
    anchor.setAttribute('class', 'profile-action-list-link profile-action-list-link-message foundation-icon foundation-icon-core-link');
    anchor.setAttribute('href', 'http://arachno.de');
    anchor.setAttribute('target', '_blank');
    anchor.innerHTML = '<span class="profile-action-list-link-underline">PDF-Link senden</span>';
    anchor.onclick = function () {
      tags = document.getElementsByClassName('tag-anchor');
      for (i = 0; i < tags.length; i++) {
        if (tags[i].innerHTML == 'du') {
          du = 'true';
        }
      }
      window.location = 'http://arachno.de/documents/createlink.php?p=' + encodeURIComponent(document.location) + '&du=' + du;
      return (false);
    }
    element.appendChild(anchor);
    element.setAttribute('class', 'profile-action-list-item');
    nodes[0].appendChild(element);
  }
}, false);

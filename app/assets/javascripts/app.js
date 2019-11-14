// === Wagon main javascript file ===
import "core-js/stable";
import "regenerator-runtime/runtime";

// Tell Webpack to load the style
import '../stylesheets/app.scss';
import * as Sections from './sections';
// Import the classes required to handle sections
import SectionsManager from './sections/_manager';
import 'unpoly';
var jQuery = require("jquery")
window.$ = jQuery;
window.jQuery = jQuery;
var $ = jQuery;

import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
var cookies = require('browser-cookies');
document.addEventListener('up:link:follow', event => {
  event.target.setAttribute("disabled", "disabled");
  var spinner = document.createElement('span');
  spinner.className = "spinner-border spinner-border-sm";
  if(event.target.classList.contains('btn')) {
    event.target.prepend(spinner);
  }
  else {
    event.target.classList.add('loader-element');
  }
});
document.addEventListener('DOMContentLoaded', event => {
  // Load all the sections
  const sectionsManager = new SectionsManager();

  // Register sections here. DO NOT REMOVE OR UPDATE THIS LINE
  sectionsManager.registerSection('algolia_faceting', Sections.AlgoliaFaceting);
  sectionsManager.registerSection('cart_address', Sections.CartAddress);
  sectionsManager.registerSection('cart_end', Sections.CartEnd);
  sectionsManager.registerSection('cart_checkout', Sections.CartCheckout);
  sectionsManager.registerSection('cart_delivery', Sections.CartDelivery);
  sectionsManager.registerSection('cart_login', Sections.CartLogin);
  sectionsManager.registerSection('cart_summary', Sections.CartSummary);
  sectionsManager.registerSection('cookies_manager', Sections.CookiesManager);
  sectionsManager.registerSection('dynamic_carousel', Sections.DynamicCarousel);
  sectionsManager.registerSection('carousel', Sections.Carousel);
  sectionsManager.registerSection('header', Sections.Header);
  sectionsManager.registerSection('searchkit_faceting', Sections.SearchkitFaceting);
  sectionsManager.start();
});

// === Wagon main javascript file ===

// Tell Webpack to load the style
import '../stylesheets/app.scss';
import * as Sections from './sections';
// Import the classes required to handle sections
import SectionsManager from './sections/_manager';
import 'unpoly';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import "~unpoly/dist/unpoly.css";
import style from '../stylesheets/sections/_test_section.scss';
document.addEventListener('DOMContentLoaded', event => {

  // Load all the sections
  const sectionsManager = new SectionsManager();
  // Register sections here. DO NOT REMOVE OR UPDATE THIS LINE

  sectionsManager.start();

});

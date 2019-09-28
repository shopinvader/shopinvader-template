// === Wagon main javascript file ===

// Tell Webpack to load the style
import '../stylesheets/app.scss';
import * as Sections from './sections';
// Import the classes required to handle sections
import SectionsManager from './sections/_manager';
//import 'unpoly';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
//import "~unpoly/dist/unpoly.git css";


document.addEventListener('DOMContentLoaded', event => {

  // Load all the sections
  const sectionsManager = new SectionsManager();
	/*up.animate('warning', 'fade-in', {
	  delay: 1000,
	  duration: 250,
	  easing: 'linear'
	});*/
  // Register sections here. DO NOT REMOVE OR UPDATE THIS LINE
  sectionsManager.registerSection('cookies_manager', Sections.CookiesManager);
  sectionsManager.registerSection('dynamic_carousel', Sections.DynamicCarousel);
  sectionsManager.registerSection('carousel', Sections.Carousel);
  sectionsManager.registerSection('header', Sections.Header);
  sectionsManager.registerSection('searchkit_faceting', Sections.SearchkitFaceting);
  sectionsManager.start();
});

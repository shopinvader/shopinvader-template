$(document).ready(function () {
	$(document).on('locomotive::section::load', 
		function(event) {
			console.log('load', event);
			$section = $(event.target);
			console.log($section);
			$section.addClass('section-selected');
		}
	);
	$(document).on('locomotive::section::select', 
		function(event) {
			console.log('event', event);
			$section = $(event.target);
			console.log($section);
			$section.addClass('section-selected');
		}
	);
	$(document).on('locomotive::section::deselect', 
		function(event) {
			console.log('event', event);
			$section = $(event.target);
			console.log($section);
			$section.removeClass('section-selected');
		}
	);
/*
	document.addEventListener('locomotive::section::load', event => {
	  console.log('load: ', event);
	});
	document.addEventListener('locomotive::section::unload', event => {
	  console.log('unload: ', event);
	});
	document.addEventListener('locomotive::section::select', event => {
	  console.log('select: ', event);
	});
	document.addEventListener('locomotive::section::deselect', event => {
	  console.log('deselect: ', event);
	});
	document.addEventListener('locomotive::section::reorder', event => {
	  console.log('reorder: ', event);
	});
	document.addEventListener('locomotive::section::block::select', event => {
	  console.log('blocks select: ', event);
	});
	document.addEventListener('locomotive::section::block::load', event => {
	  console.log('blocks load: ', event);
	});*/
});

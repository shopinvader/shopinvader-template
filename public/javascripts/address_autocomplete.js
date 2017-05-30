var placeSearch = null;
var autocomplete = null;

var componentForm = {
  street_number: 'short_name',
  sublocality_level_1: 'long_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'

};
function initAutocomplete() {
  $('[data-autocomplete=address]').each( function(i, element ) {
    initGooglePlace(element);
  });

}
function initGooglePlace(input_group) {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  var input_address = $(input_group).find('[data-toggle=autocomplete]')[0];
  var autocomplete = new google.maps.places.Autocomplete(
      input_address,
      {types: ['address']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed',
    function() {
      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();
      for (var component in componentForm) {
        $(input_group).find('[data-bind='+component+']').val("");
      }

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      var data=[];
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          data[addressType] = val;
        }

      }
      if(typeof(data['street_number']) != 'undefined') {
        data['route'] = data['street_number']+' '+data['route'];
      }
      else if(typeof(data['route']) == 'undefined') {
        data['route'] = data['sublocality_level_1'];
      }

      for(var addressType in data) {
        $(input_group).find('[data-bind='+addressType+']').val(data[addressType]);
      }
    });
}


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

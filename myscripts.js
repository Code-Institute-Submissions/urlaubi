var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'us' };
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';

var countries = {
  'au': {
    center: { lat: -25.3, lng: 133.8 },
    zoom: 4
  },
   'at': {
    center: {lat: 47.5, lng: 14.5},
    zoom: 6
  },
  'br': {
    center: { lat: -14.2, lng: -51.9 },
    zoom: 3
  },
  'be': {
    center: { lat: 50.5, lng: 4.5 },
    zoom: 6
  },
   'bg': {
    center: { lat: 42.7, lng: 25.4 },
    zoom: 6
  },
  'ca': {
    center: { lat: 62, lng: -110.0 },
    zoom: 3
  },
  'hr': {
    center: { lat: 45.1, lng: 15.2 },
    zoom: 6
  },
   'cy': {
    center: { lat: 35.1, lng: 33.5 },
    zoom: 6
  },
     'cz': {
    center: { lat: 49.8, lng: 15.4 },
    zoom: 6
  },
   'dk': {
    center: { lat: 56.2, lng: 9.5},
    zoom: 6
  },
   'ee': {
    center: { lat: 58.6, lng: 25},
    zoom: 6
  },
    'fi': {
    center: { lat: 61.9, lng: 25.7},
    zoom: 5
  },
    'fr': {
    center: { lat: 46.2, lng: 2.2 },
    zoom: 5
  },
  'de': {
    center: { lat: 51.2, lng: 10.4 },
    zoom: 5
  },
   'gr': {
    center: { lat: 39.1, lng: 21.9 },
    zoom: 6
  },
   'hu': {
    center: { lat: 47, lng: 19.5 },
    zoom: 6
  },
    'ie': {
    center: { lat: 53.3, lng: -6.2 },
    zoom: 6
  },
  'it': {
    center: { lat: 41.9, lng: 12.6 },
    zoom: 6
  },
   'lv': {
    center: { lat: 56.9, lng: 24.6 },
    zoom: 6
  },
   'lt': {
    center: { lat: 55.2, lng: 23.9 },
    zoom: 6
  },
   'lb': {
    center: { lat: 49.8, lng: 6.1 },
    zoom: 6
  },
   'mt': {
    center: { lat: 35.9, lng: 14.5 },
    zoom: 8
  },
   'mx': {
    center: { lat: 23.6, lng: -102.5 },
    zoom: 4
  },
    'nl': {
    center: { lat: 52.1, lng: 5.3 },
    zoom: 6
  },
  'nz': {
    center: { lat: -40.9, lng: 174.9 },
    zoom: 5
  },
    'no': {
    center: { lat: 60.5, lng: 8.5 },
    zoom: 5
  },
    'pt': {
    center: { lat: 39.4, lng: -8.2 },
    zoom: 6
  },
    'pl': {
    center: { lat: 51.9, lng: 19.1 },
    zoom: 5
  },
  'ro': {
    center: { lat: 45.9, lng: 25 },
    zoom: 6
  },
  
   'za': {
    center: { lat: -30.6, lng: 22.9 },
    zoom: 5
  },
  'es': {
    center: { lat: 40.5, lng: -3.7 },
    zoom: 6
    
  },
    'svk': {
    center: { lat: 48.6, lng: 19.6 },
    zoom: 6
    
  },
    'sl': {
    center: { lat: 46.2, lng: 15 },
    zoom: 7
    
  },
    'se': {
    center: { lat: 60.1, lng: 18.6 },
    zoom: 6
    
  },
    'ch': {
    center: { lat: 46.8, lng: 8.2 },
    zoom: 6
  },
    'uk': {
    center: { lat: 54.8, lng: -4.6 },
    zoom: 5
  },
   'us': {
    center: { lat: 37.1, lng: -95.7 },
    zoom: 3
  },
   'ie': {
    center: { lat: 53.3, lng: -6.2 },
    zoom: 6
  },
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1,
    center: new google.maps.LatLng(31.9, -10.1),
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: false,
    panControl: false,
  });


  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });

  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(
      document.getElementById('autocomplete')), {
      types: ['(cities)'],
      componentRestrictions: countryRestrict
    });
  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', onPlaceChanged);

  document.getElementById('country').addEventListener(
    'change', setAutocompleteCountry);
}

function setAutocompleteCountry() {
  var country = document.getElementById('country').value;
  if (country == 'all') {
    autocomplete.setComponentRestrictions({ 'country': [] });
    map.setCenter({ lat: 31.9, lng: -10.1 });
    map.setZoom(1);
  } else {
    autocomplete.setComponentRestrictions({ 'country': country });
    map.setZoom(countries[country].zoom);
    map.setCenter(countries[country].center);
  }
  clearResults();
  clearMarkers();
}

function search() {
  var search = {
    bounds: map.getBounds(),
    types: [document.getElementById("locationType").value]
  };

  places.nearbySearch(search, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearResults();
      clearMarkers();
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
    }
  });
}

function showInfoWindow() {
  var marker = this;
  places.getDetails({ placeId: marker.placeResult.place_id },
    function (place, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      infoWindow.open(map, marker);
      buildIWContent(place);
    });
}


function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(12);
    search();
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }
}

function setAutocompleteCountry() {
  var country = document.getElementById('country').value;
  if (country == 'all') {
    autocomplete.setComponentRestrictions({ 'country': [] });
    map.setCenter({ lat: 31.9, lng: -10.1 });
    map.setZoom(1);
  } else {
    autocomplete.setComponentRestrictions({ 'country': country });
    map.setZoom(countries[country].zoom);
    map.setCenter(countries[country].center);
  }
  clearResults();
  clearMarkers();
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

function addResult(result, i) {
  var results = document.getElementById('results');
  var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
  var markerIcon = MARKER_PATH + markerLetter + '.png';

  var tr = document.createElement('tr');
  tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  tr.onclick = function () {
    google.maps.event.trigger(markers[i], 'click');
  };

  var iconTd = document.createElement('td');
  var nameTd = document.createElement('td');
  var icon = document.createElement('img');
  icon.src = markerIcon;
  icon.setAttribute('class', 'placeIcon');
  icon.setAttribute('className', 'placeIcon');
  var name = document.createTextNode(result.name);
  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}


function buildIWContent(place) {
  document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
    'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
    '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;

  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = '';
    document.getElementById('iw-phone').textContent =
      place.formatted_phone_number;
  } else {
    document.getElementById('iw-phone-row').style.display = 'none';
  }

  if (place.rating) {
    var ratingHtml = '';
    for (var i = 0; i < 5; i++) {
      if (place.rating < (i + 0.5)) {
        ratingHtml += '&#10025;';
      } else {
        ratingHtml += '&#10029;';
      }
      document.getElementById('iw-rating-row').style.display = '';
      document.getElementById('iw-rating').innerHTML = ratingHtml;
    }
  } else {
    document.getElementById('iw-rating-row').style.display = 'none';
  }

  if (place.website) {
    var fullUrl = place.website;
    var website = hostnameRegexp.exec(place.website);
    if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
    }
    document.getElementById('iw-website-row').style.display = '';
    document.getElementById('iw-website').textContent = website;
  } else {
    document.getElementById('iw-website-row').style.display = 'none';
  }
}
document.getElementById("locationType").addEventListener('change',onPlaceChanged);

function clearResults() {
  var results = document.getElementById('results');
  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}
      function initMap() {
 	    var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: {lat: 47.608013, lng: -122.335167}
        });
        directionsDisplay.setMap(map);

        document.getElementById('submit').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);

		  location.hash = "#" + "fare";
		  
        });
		
		// Adding Autocomplete
		var pickup = document.getElementById('pickup');
		var options = {componentRestrictions: {country: 'US'}};
		autocomplete = new google.maps.places.Autocomplete(pickup, options);
		
		var dropoff = document.getElementById('dropoff');
		var options = {componentRestrictions: {country: 'US'}};
		autocomplete = new google.maps.places.Autocomplete(dropoff, options);		
		
		// End of Adding Autocomplete		
	  }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('pickup').value,
          destination: document.getElementById('dropoff').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
//              var routeSegment = i + 1;
//              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
//                  '</b><br>';

			  var dist = parseFloat(route.legs[i].distance.text);
			  var fare = dist * 2.50;
			  
			  summaryPanel.innerHTML += 'Distance: ' + dist + ' miles<br />';
			  
			  if (fare <= 5) {
			    fare = 5.00;
			    summaryPanel.innerHTML += 'Fare: $' + fare.toFixed(2) + ' (less than 2 miles)<br />';
			  }
			  else {
			    summaryPanel.innerHTML += 'Fare: $' + fare.toFixed(2) + '<br />';
			  }
			  			  
              summaryPanel.innerHTML += 'Pick-Up: ' + route.legs[i].start_address + '<br />';
              summaryPanel.innerHTML += 'Drop-Off: ' + route.legs[i].end_address + '<br />';
			  summaryPanel.innerHTML += 'Travel time: ' + route.legs[i].duration.text;			  			  			  
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
	  
	var map = null;
	var geocoder = null;
	var debug = true;

	function initialize() {
	      if (GBrowserIsCompatible()) {
	        map = new GMap2(document.getElementById("map_canvas"));
			var point = new GLatLng(37.235116, -121.949049)
	        map.setCenter(point, 13);
			map.enableContinuousZoom();
			map.enableScrollWheelZoom();
			// Create our "tiny" marker icon
		    var orangeIcon = new GIcon(G_DEFAULT_ICON);
		    orangeIcon.image = "http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/blank.png";
			// Set up our GMarkerOptions object
			markerOptions = { icon:orangeIcon };
			
			//var marker = new GMarker(point);
			//map.addOverlay(new GMarker(point, markerOptions))
			geocoder = new GClientGeocoder();
			
			addresses = new Array();
			
			
			
		
		//map.addOverlay(new GMarker(showAddress("15980 Los Gatos Boulevard Los Gatos, CA 95032-3424")));
		for (var i in addresses) {
			address = addresses[i];
				geocoder.getLatLng(
          			address,
          				function(point) {
            					if (!point) {
              						alert(address + " not found");
            					} else {
              						var marker = new GMarker(point);
              						map.addOverlay(marker);
              						//marker.openInfoWindowHtml(address);
            					}
          					}
        				);
		
			}// end of our for loop of addresses 
	    }
	}

	function plotAddresses() {
		// get the center 
		center_address = document.getElementById('center_address');
		alert(center_address.value());
		
		raw_addresses = document.getElementById('addresses');
		addresses = raw_addresses.value.split("\n");
		var error_message = "";
		for (var i in addresses) {
			address = addresses[i];
			if (console.log && debug) {
				console.log("i = %s, address: %s", i, address);
			}
			if (address == "") {
				break;
			}
				geocoder.getLatLng(
          			address,
          				function(point) {
            					if (!point) {
									error_message += address;
              						//alert(address + " not found");
            					} else {
              						var marker = new GMarker(point);
              						map.addOverlay(marker);
									if (console.log && debug) {
										console.log("just called addOverlay");
									}
              						//marker.openInfoWindowHtml(address);
            					}
          					}
        				);
		}
		
		if (error_message != "") {
			alert("The following addresses where not found:\n" + error_message);
		}
		return false;
	}

	
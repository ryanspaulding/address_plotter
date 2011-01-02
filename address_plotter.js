	var map = null;
	var geocoder = null;
	var debug = true;


	function initialize() {
		
			if (debug && window.console) {
					console.log("hostname: %s", document.domain);
			}
			
			// Google Maps API will only work with your registered domain, so any local dev will 
			// have to be without it. 
			if (document.domain == "spauldinghill-stage" || document.domain == "localhost") {
				return true;
			}
		
			// might want to remove this whole function not sure how useful it is anymore....
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
			
			var marker = new GMarker(point);
			map.addOverlay(new GMarker(point, markerOptions))
			
			geocoder = new GClientGeocoder();
			
			start_addresses = new Array();
			start_addresses.push("15980 Los Gatos Boulevard Los Gatos, CA 95032-3424");
			start_addresses.push("15466 Los Gatos Boulevard Los Gatos, CA 95032-2551");
	
		for (var i in start_addresses) {
			address = start_addresses[i];
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

		// clear out all the overlays
		map.clearOverlays();
		
		// get the center 
		var center_address = jQuery("#center_address");
		var raw_addresses = document.getElementById('addresses');	

		if (center_address.val() == "") {
			jQuery("#center_address_error").html("Enter the center address").fadeIn('slow');
			return false;
		} else {
			jQuery("#center_address_error").html("").fadeOut('slow');
		}

		if (jQuery("#addresses").val() == "") {
			jQuery("#addresses_error").html("Enter some address to plot").fadeIn('slow');
			return false;
		} else {
			jQuery("#addresses_error").html("").fadeOut('slow');
		}

		if (console.log && debug) {
			console.log("center address: %s", center_address.val());
		}

		
		
		addresses = new Array();
		

		var center_point = null;
		
		     try {
			geocoder.getLatLng(center_address.val(), function(point) {
					if (!point) {
						jQuery("#error_message").append("<p>" + address + " could not be found</p>").fadeIn('slow');
            			} else {
              			
						map.setCenter(point, 13);
						var orangeIcon = new GIcon(G_DEFAULT_ICON);
						orangeIcon.image = "http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/blank.png";
						// Set up our GMarkerOptions object
						markerOptions = { icon:orangeIcon };
              			map.addOverlay(new GMarker(point, markerOptions));
            			}
			});
			} catch(err) {
					alert(err);
			}

		addresses = raw_addresses.value.split("\n");
		
		for (var i in addresses) {
			address = addresses[i];
			if (console.log && debug) {
				console.log("i = %s, address: %s", i, address);
			}
		
			if (address == "") {
				break;
			}
			
			// Google Maps API will only work with your registered domain, so any local dev will 
			// have to be without it. 
			if (geocoder != null) {
				geocoder.getLatLng(
          			address,
          				function(point) {
            					if (!point) {
									if (console.log && debug) {
										console.log("adding %s to the error_messages var", address);
									}
									jQuery("#error_message").append("<p>" + address + " could not be found</p>").fadeIn('slow');
            					} else {
              						var marker = new GMarker(point);
              						map.addOverlay(marker);
									if (console.log && debug) {
										console.log("just called addOverlay");
									}
            					}
          					}
        				);
			} // end domain/hostname check 
		}

		return false;
	}

	
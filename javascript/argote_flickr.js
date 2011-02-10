// Author: Luis Edgardo Argote Bolio
// Author email: luis@luisargote.com

window.onload = init;

// These are variables that are used throughout the code
var API_key = '0b10ac3b8cc11da085d447ea647dbe67';
var json = '&format=json&jsoncallback=?';
var images = {};
var page = 1;
var currentRequest = 1;
var totalPhotos = 0;
var totalPages = 0;
var photosPerPage = 20;
var ajaxRequestsPerPhoto = 3;
var settingsOrder = 'titleSize&photoSize&description&dateTaken&cameraMake&cameraModel&lens&focalLength&mode&aperture&exposureTime&iso&equiv35mm&location&latitudeLongitude&map';

// These GM variables are for the Google Maps API
var GM_size = '400x400';
var GM_maptype = 'hybrid';

// This is a function that is called on load and initializes a few things
function init() {
	$('#photos').hide();
	$('#loader').hide();
	$('#locationSettings').hide();
}

// This function deletes the content of the user bar
function make_blank() {
	document.getElementById('user').value = "";
}

// This function updates the Photo Request Counter in the loadStatus section
function updatePhotoRequestCounter() {
	document.getElementById('loadStatus').innerHTML = 'Getting Information for Photos ' + (((page - 1) * photosPerPage) + 1)
		+ ' through ' + (page * photosPerPage > totalPhotos? totalPhotos : page * photosPerPage)
		+ ' (' + currentRequest + ' out of '
		+ ((page * photosPerPage > totalPhotos? totalPhotos : page * photosPerPage) * ajaxRequestsPerPhoto) + ' requests completed)';
}

// This adds the title section, if available and activated
function generateTitle(id) {
	if(document.getElementById('titleSize').value != 0 && images[id].title != "") {
		return ('[size=' + document.getElementById('titleSize').value + ']' + images[id].title + '[/size]');
	}
	return '';
}

// This adds the photo itself (in the specified size) and the link back to the Flickr page
function generatePhoto(id) {
	return ('[url=' + images[id].link + '][img]' + images[id].url + document.getElementById('photoSize').value +'[/img][/url]');
}

// This adds the comments, if available and activated
function generateComments(id) {
	if(document.getElementById('description').checked == true && images[id].description != "") {
		return (images[id].description + '');
	}
	return '';
}

// This adds the dateTaken, if available
function generateDateTaken(id) {
	if(document.getElementById('dateTaken').checked == true && images[id].dateTaken != "") {
		return ('Date Taken: ' + images[id].dateTaken);
	}
	return '';
}

// This adds the Location, if available, in [locality, county, region, country] format
function generateLocation(id) {
	var salida = '';
	if(document.getElementById('location').checked == true && (images[id].country != "" || images[id].county != "" || images[id].locality != "" || images[id].region != "")) {
		salida += 'Location: ';
		if(document.getElementById('locality').checked == true && images[id].locality != "") {
			salida += images[id].locality + ', ';
		}
		if(document.getElementById('county').checked == true && images[id].county != "") {
			salida += images[id].county + ', ';
		}
		if(document.getElementById('region').checked == true && images[id].region != "") {
			salida += images[id].region + ', ';
		}
		if(document.getElementById('country').checked == true && images[id].country != "") {
			salida += images[id].country;
		}
	}
	return salida;
}

// This adds the Latitude and Longitude, if available
function generateLatitudeLongitude(id) {
	if(document.getElementById('latitudeLongitude').checked == true && images[id].latitude != "" && images[id].logitude != "") {
		return ('Latitude/Longitude: ' + images[id].latitude + ', ' + images[id].longitude);
	}
	return '';
}

// This adds the Camera make/brand, if available
function generateCameraMake(id) {
	if(document.getElementById('cameraMake').checked == true && images[id].cameraMake != "") {
		return('Camera Make: ' + images[id].cameraMake);
	}
	return '';
}

// This adds the Camera model, if available
function generateCameraModel(id) {
	if(document.getElementById('cameraModel').checked == true && images[id].cameraModel != "") {
		return('Camera Model: ' + images[id].cameraModel);
	}
	return '';
}

// This adds the lens information, if available
function generateLens(id) {
	if(document.getElementById('lens').checked == true && images[id].lens != "") {
		return('Lens: ' + images[id].lens);
	}
	return '';
}

// This adds the focal length information, if available
function generateFocalLength(id) {
	if(document.getElementById('focalLength').checked == true && images[id].focalLength != "") {
		return('Focal Length: ' + images[id].focalLength);
	}
	return '';
}

// This adds the focal length equivalency in 35mm format, if available
function generateEquiv35mm(id) {
	if(document.getElementById('equiv35mm').checked == true && images[id].focalLength35 != "") {
		return('35mm Equivalent: ' + images[id].focalLength35);
	}
	return '';
}

// This adds the shooting mode, if available
function generateMode(id) {
	if(document.getElementById('mode').checked == true && images[id].mode != "") {
		return('Mode: ' + images[id].mode);
	}
	return '';
}

// This adds the aperture information, if available
function generateAperture(id) {
	if(document.getElementById('aperture').checked == true && images[id].aperture != "") {
		return('Aperture: ' + images[id].aperture);
	}
	return '';
}

// This adds the exposure time information, if available
function generateExposureTime(id) {
	if(document.getElementById('exposureTime').checked == true && images[id].exposureTime != "") {
		return('Exposure Time: ' + images[id].exposureTime);
	}
}

// This adds the ISO information, if available
function generateISO(id) {
	if(document.getElementById('iso').checked == true && images[id].iso != "") {
		return('ISO: ' + images[id].iso);
	}
}

// This adds the map image, if available
function generateMap(id) {
	if(document.getElementById('includeGoogleMaps').checked == true && images[id].GM_MapURL != "") {
		return('[img]' + images[id].GM_MapURL + '[/img]');
	}
	return "";
}

// This function generates the actual codes for each image give its ID and returns it in a string
// before calling this we must make sure that the images array is initialized with the pertinent data
function generateCode(id) {
	var salida = '';
	
	var order = settingsOrder.split("&");
	
	for(setting in order) {
		switch(order[setting]) {
		case 'titleSize':
			salida += generateTitle(id) + '<br />';
			break;
		case 'photoSize':	
			salida += generatePhoto(id) + '<br />';
			break;
		case 'description':
			salida += generateComments(id) + '<br />';
			break;
		case 'dateTaken':
			salida += '<br />' + generateDateTaken(id);
			break;
		case 'cameraMake':
			salida += '<br />' + generateCameraMake(id);
			break;
		case 'cameraModel':
			salida += '<br />' + generateCameraModel(id);
			break;
		case 'lens':
			salida += '<br />' + generateLens(id);
			break;
		case 'focalLength':
			salida += '<br />' + generateFocalLength(id);
			break;
		case 'mode':
			salida += '<br />' + generateMode(id);
			break;
		case 'aperture':
			salida += '<br />' + generateAperture(id);
			break;
		case 'exposureTime':
			salida += '<br />' + generateExposureTime(id);
			break;
		case 'iso':
			salida += '<br />' + generateISO(id);
			break;
		case 'equiv35mm':
			salida += '<br />' + generateEquiv35mm(id);
			break;
		case 'location':
			salida += '<br />' + generateLocation(id);
			break;
		case 'latitudeLongitude':
			salida += '<br />' + generateLatitudeLongitude(id);
			break;
		case 'map':
			salida += '<br /><br />' + generateMap(id);
			break;
		}
	}
	
	return salida
}

// This takes care of adding the photos to the table as well as hiding/showing some elements in the interface
function addPhotosToTable() {
	$("#moreRow").remove();

	// Add each of the images we have not added to the table yet	
	$.each(images, function(i, image) {
		var id = image.id;
		if(!(document.getElementById(id))) {
			$('<tr class=\"photorow\"><td class=\"photos\" height=\"240\" width=\"240\"><img src=\"' + images[id].url + '_m.jpg\"></td></tr>').attr("id", id).appendTo("#images");
			$('<td class=\"codigo\">' + generateCode(id) + '</td>').attr("id", 'c_' + id).appendTo('#' + id);
		}	
	});

	// This adds a new "More" button, it is deleted and re-added so that it is always at the bottom, but first we check if there are more pages
	if(page <= totalPages) { // We use <= rather than < since page is incremented before we reach this point
		$('<tr id=\"moreRow\"><td rowspan=\"2\"><input id=\"moreButton\" type=\"button\" value=\"Get More (Page ' + page + ' of ' + totalPages + ')\" onclick=\"getUserID()\" \/></td></tr>').attr("id", "moreRow").appendTo("#images");	
	}
		
	// This basically fades out the loader animation and, when it's done with that, fades in the photos
	$("#loader").fadeOut(600, function() {
		// Delete all text in load status to prepare for next load
		document.getElementById('loadStatus').innerHTML = "";
		$("#photos").fadeIn(2000);
	});
}

// This function adds the Title, Description and URLs to the images array for a given photo ID
function getInfo(id) {
	var Req_addr = 'http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + API_key + '&photo_id=' + id + json
	$.getJSON(Req_addr, function(data) {
		updatePhotoRequestCounter();
		if('title' in data.photo) {
			images[id].title = data.photo.title._content;
		}
		if('description' in data.photo) {
			images[id].description = data.photo.description._content;
		}
		if('urls' in data.photo) {
			images[id].link = data.photo.urls.url[0]._content;
		}
		if('dates' in data.photo) {
			if('taken' in data.photo.dates) {
				images[id].dateTaken = data.photo.dates.taken;
			}
		}
		if('location' in data.photo) {
			if('latitude' in data.photo.location) {
				images[id].latitude = data.photo.location.latitude;
			}
			if('longitude' in data.photo.location) {
				images[id].longitude = data.photo.location.longitude;
			}
			if('country' in data.photo.location) {
				images[id].country = data.photo.location.country._content;
			}
			if('county' in data.photo.location) {
				images[id].county = data.photo.location.county._content;
			}
			if('locality' in data.photo.location) {
				images[id].locality = data.photo.location.locality._content;
			}
			if('region' in data.photo.location) {
				images[id].region = data.photo.location.region._content;
			}
			if(images[id].latitude != "" && images[id].logitude != "") {
				images[id].GM_MapURL = getStaticGoogleMap(data.photo.location.latitude, data.photo.location.longitude, 15);
			}
		}
		currentRequest++;
	});
}

// This function obtains various EXIF information from a given photo ID and adds that data to the images array
function getEXIFData(id) {
	var Req_addr = 'http://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=' + API_key + '&photo_id=' + id + json
	$.getJSON(Req_addr, function(data) {
		updatePhotoRequestCounter();
		// This iterates through all of the EXIF information that Flickr returned and checks
		// each property to see if we care about it, if so, it adds it to the images array
		// several properties can have a "clean" and "raw" version, the clean one is given preference
		if('photo' in data) {
			$.each(data.photo.exif, function(i, exif) {
				if(exif.tag == 'Make') {
					images[id].cameraMake = exif.raw._content;
				}
				else if(exif.tag == 'Model') {
					images[id].cameraModel = exif.raw._content;
				}
				else if(exif.tag == 'Lens') {
					images[id].lens = exif.raw._content;
				}
				else if(exif.tag == 'ExposureProgram' && exif.tagspace == "ExifIFD") {
					images[id].mode = exif.raw._content;
				}
				else if(exif.tag == 'FocalLength') {
					if('clean' in exif) {
						images[id].focalLength = exif.clean._content;
					}
					else if(images[id].focalLength == "") {
						images[id].focalLength = exif.raw._content;
					}
				}
				else if(exif.tag == 'FocalLengthIn35mmFormat') {
					images[id].focalLength35 = exif.raw._content;
				}
				else if(exif.tag == 'FNumber') {
					if('clean' in exif) {
						images[id].aperture = exif.clean._content;
					}
					else if(images[id].aperture == "") {
						images[id].aperture = exif.raw._content;
					}
				}
				else if(exif.tag == 'ExposureTime') {
					if('clean' in exif) {
						images[id].exposureTime = exif.clean._content;
					}
					else if(images[id].exposureTime == "") {
						images[id].exposureTime = exif.raw._content;
					}
				}
				else if(exif.tag == 'ISO') {
					images[id].iso = exif.raw._content;
				}
			});
		}
		currentRequest++;
	});
}

// This function gets the data required for a given photo ID and adds it to the images array
// The size parameter is not really necessary as long as it doesn't get the original size image
// since the ending is trimmed anyway
function getData(id, fSize) {
	var Req_addr = 'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + API_key + '&photo_id=' + id + json
	$.getJSON(Req_addr, function(data) {
		updatePhotoRequestCounter();
		$.each(data.sizes.size, function(i, size) {
			if(size.label == fSize) {
				// This adds the pertinent data for this image ID to the images array
				images[id] = {
					id: id,
					url: size.source.substring(0, size.source.length - 4),
					title: "",
					description: "",
					cameraMake: "",
					cameraModel: "",
					lens: "",
					mode: "",
					focalLength: "",
					focalLength35: "",
					aperture: "",
					exposureTime: "",
					iso: "",
					link: "",
					dateTaken: "",
					latitude: "",
					longitude: "",
					country: "",
					county: "",
					locality: "",
					region: "",
					GM_MaxZoom: "",
					GM_MapURL: ""
				};

				// getInfo adds the Title, Description and URLs to the images array for a given photo ID		
				getInfo(id);

				// getEXIFData obtains various EXIF information from a given photo ID and adds that data to the images array
				getEXIFData(id);
			}
		});
		currentRequest++;
	});
}

// This gets data for the photos in the list up to the current limit, it also checks if it has gotten data
// for a particular photo before so that no duplicate calls are made
function getPhotoData(data) {
	$.each(data.photos.photo, function(i, photo) {
		// Breaks out if we exceed the number of photos we should get so far, this shouldn't happen as we have photosPerPage photos per page but the check is here anyway
		if (i >= photosPerPage) {
			return false;
		}

		// Gets data for an image only if we don't have it yet, this shouldn't happen as we query different pages but the check is here anyway
		if (!(photo.id in images)) {
			getData(photo.id, 'Medium');
		}
	});
}

// This initiates the process that gets photos for a particular user
function getPhotos(usr) {	
	// This initiates a request for the list of public photos from the user specified
	document.getElementById('loadStatus').innerHTML = "Getting Photo Data...";
	var Req_addr = 'http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&per_page=' + photosPerPage + '&page=' + page + '&api_key=' + API_key + '&user_id=' + usr + json
	$.getJSON(Req_addr, function(data) {
		totalPhotos = data.photos.total;
		totalPages = data.photos.pages;
		// Once it has gotten the list of the photos, data for each photo is requested
		getPhotoData(data);
	});
}

// This removes setting panels and gets the user ID from a given Flickr user page URL
function getUserID() {
	document.getElementById('loadStatus').innerHTML = "Getting User Data...";
	$("#moreRow").hide(350);
	
	var usr = document.getElementById('user').value
	var Req_addr = 'http://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=' + API_key + '&url=http%3A%2F%2Fflickr.com%2Fphotos%2F' + usr + json
	$.getJSON(Req_addr, function(data) {
		if(data.stat == 'ok' && 'id' in data.user) {
			// Once the user is known, data about its photos is requested
			getPhotos(data.user.id);
		}
		else {
			var error = "Error getting information for user \"" + usr + "\", please verify the username, it should be the same one shown in your Flickr URL." +
				"<br /><br />The page should reload automatically within 10 seconds.";
			$('<tr><td>' + error + '</td></tr>').appendTo("#images");
			setTimeout('window.location.reload()', 11350);
		}
	});

	// This hides the user data panel	
	$("#userInfo").hide(0);

	// This hides the settings panel	
	$("#settings").hide(0, function() {
		$("#loader").slideDown(750);
	});
}

// This function is executed when the page finishes loading, it does two things:
// 1. Loads the Table Drag and Drop library for the settings table
// 2. Establishes the ajaxStop global event that handles data displaying when the data querying
// for information on photos from Flickr is done, it is loaded and binded with the page
jQuery(document).ready(function($) {
	// This is what loads the Table Drag and Drop library for the settings table
	$("#settingsTable").tableDnD({
		onDrop: function(table, row) {
			settingsOrder = cleanOrder($.tableDnD.serialize());
		}
	});	
	
	// This is what displays the photos when all of the AJAX requests have received their responses (ajaxStop)
	$("#photos").ajaxStop(function() {
		// The page counter is incremented for the next page to be requested next time
		page += 1;

		// Add the data for the newly obtained photos to the table
		addPhotosToTable();
	});
});

// This function cleans the string returned by the Drag and Drop plugin which states the order of
// the rows on the table. This is for the string to be more easily useful.
function cleanOrder(str) {
	str = str.replace(/settingsTable\[\]=/g, ""); // Gets rid of the table name as that is not needed
	str = str.replace(/Row/g, ""); // Gets rid of the Row suffix to reference the inner element
	return str;
}

// This function shows/hides the location settings when the location checkbox selected/unselected
$('#location').live('click', function() {
	if ($('#location:checked').length) {
		$("#locationSettings").slideDown(200);
	}
	else {
		$("#locationSettings").slideUp(200);
	}
});

// This enables the ENTER key to be used in the user textbox - Does NOT work for some reason...
$('#user').keypress(function(e) {
	if(e.which == 13) { // 13 is the value for ENTER
		e.preventDefault();
		getUserID();
	}
});

// This gets a Google Maps static image with the given zoom level, size, map type and coordinates
// Example URL generated: http://maps.google.com/maps/api/staticmap?zoom=20&size=400x640&maptype=hybrid&markers=25.679841,-100.284286&sensor=false
function getStaticGoogleMap(latitude, longitude, zoom) {
	return "http://maps.google.com/maps/api/staticmap?zoom=" + zoom + "&size=" + GM_size + "&maptype=" + GM_maptype + "&markers=" + latitude + "," + longitude + "&sensor=false";
}

// This gets the Maximum Zoom available in Google Maps at a given location NOT IMPLEMENTED YET
function getMaxGoogleMapsZoomAtLocation(latitude, longitude) {
	// http://code.google.com/apis/maps/documentation/javascript/reference.html#MaxZoomService
	// getMaxZoomAtLatLng(latlng:LatLng, callback:function(MaxZoomResult)))
}


// http://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=0b10ac3b8cc11da085d447ea647dbe67&format=json

// http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json
// http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&per_page=20&page=1&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json

// http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// http://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// http://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=0b10ac3b8cc11da085d447ea647dbe67&url=http%3A%2F%2Fflickr.com%2Fphotos%2Fargote&format=json&jsoncallback=?

// http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json

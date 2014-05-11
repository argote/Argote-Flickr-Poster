// Author: Luis Edgardo Argote Bolio
// Author email: luis@argote.mx

// This file contains the functions which constitute the main flow of the program and make calls to APIs


// This function is executed when the page finishes loading, it does three things:
// 1. Hides some of the elements from view
// 2. Loads the Table Drag and Drop library for the settings table
// 3. Establishes the ajaxStop global event that handles data displaying when the data querying
// for information on photos from Flickr is done, it is loaded and binded with the page
jQuery(document).ready(function($) {
	$('#photos').hide();
	$('#loader').hide();
	$('#locationSettings').hide();
	
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
		prepareToAddPhotos();
		addPhotosToTable();
		readyInterface();
	});
});

// This takes care of adding the photos to the table
function addPhotosToTable() {
	// Add each of the images we have not added to the table yet	
	$.each(images, function(i, image) {
		var id = image.id;
		if(!(document.getElementById(id))) {
			$('<tr class=\"photorow\"><td class=\"photos\" height=\"240\" width=\"240\"><img src=\"' + images[id].url + '_m.jpg\"></td></tr>').attr("id", id).appendTo("#images");
			$('<td class=\"codigo\">' + generateCode(id) + '</td>').attr("id", 'c_' + id).appendTo('#' + id);
		}	
	});
}

// This function adds the Title, Description and URLs to the images array for a given photo ID
function getInfo(id) {
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=' + API_key + '&photo_id=' + id + json
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
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=' + API_key + '&photo_id=' + id + json
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
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + API_key + '&photo_id=' + id + json
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
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&per_page=' + photosPerPage + '&page=' + page + '&api_key=' + API_key + '&user_id=' + usr + json
	$.getJSON(Req_addr, function(data) {
		totalPhotos = data.photos.total;
		totalPages = data.photos.pages;
		// Once it has gotten the list of the photos, data for each photo is requested
		getPhotoData(data);
	});
}

// This gets the sets for a particular user
function getSets(usr) {
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getList' + '&api_key=' + API_key + '&user_id=' + usr + json
	$.getJSON(Req_addr, function(data) {
		$.each(data.photosets.photoset, function(i, set) {
			sets[i] = {
				id: set.id,
				photos: set.photos,
				title: set.title._content,
				description: set.description._content
			};
		});
	});
}

// This removes setting panels and gets the user ID from a given Flickr user page URL
function getUserID() {
	document.getElementById('loadStatus').innerHTML = "Getting User Data...";
	$("#moreRow").hide(350);
	
	var usr = document.getElementById('user').value
	var Req_addr = 'https://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=' + API_key + '&url=https%3A%2F%2Fflickr.com%2Fphotos%2F' + usr + json
	$.getJSON(Req_addr, function(data) {
		if(data.stat == 'ok' && 'id' in data.user) {
			// Once the user is known, data about its photos is requested
			getPhotos(data.user.id);
			getSets(data.user.id);
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


// https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=0b10ac3b8cc11da085d447ea647dbe67&format=json

// https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json
// https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&per_page=20&page=1&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json

// https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0b10ac3b8cc11da085d447ea647dbe67&photo_id=4775693677&format=json&jsoncallback=?

// https://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=0b10ac3b8cc11da085d447ea647dbe67&url=https%3A%2F%2Fflickr.com%2Fphotos%2Fargote&format=json&jsoncallback=?

// https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=0b10ac3b8cc11da085d447ea647dbe67&user_id=25184435%40N00&format=json&jsoncallback=?

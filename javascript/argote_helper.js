// Author: Luis Edgardo Argote Bolio
// Author email: luis@argote.mx

// This file contains functions which help generate or modify data for other functions but do not make any external calls


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

// This function cleans the string returned by the Drag and Drop plugin which states the order of
// the rows on the table. This is for the string to be more easily useful.
function cleanOrder(str) {
	str = str.replace(/settingsTable\[\]=/g, ""); // Gets rid of the table name as that is not needed
	str = str.replace(/Row/g, ""); // Gets rid of the Row suffix to reference the inner element
	return str;
}
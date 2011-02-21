// Author: Luis Edgardo Argote Bolio
// Author email: luis@argote.mx

// This file contains functions which take care of things related to the User Interface (UI)


// This takes care of hiding/showing some elements in the interface after photos have been added
function readyInterface() {
	// This adds a new "More" button, it is deleted and re-added so that it is always at the bottom
	// First checks if there are more pages
	if(page <= totalPages) { // Uses <= rather than < since page is incremented before we reach this point
		$('<tr id=\"moreRow\"><td rowspan=\"2\"><input id=\"moreButton\" type=\"button\" value=\"Get More (Page ' + page + ' of ' + totalPages + ')\" onclick=\"getUserID()\" \/></td></tr>').attr("id", "moreRow").appendTo("#images");	
	}
		
	// This fades out the loader animation and then fades in the photos
	$("#loader").fadeOut(600, function() {
		// Delete all text in load status to prepare for next load
		document.getElementById('loadStatus').innerHTML = "";
		$("#photos").fadeIn(2000);
	});
}

// This function deletes the content of the user bar
function make_blank() {
	document.getElementById('user').value = "";
}

// This function updates the Photo Request Counter in the loadStatus section
function updatePhotoRequestCounter() {
	document.getElementById('loadStatus').innerHTML = 'Getting Information for Photos ' + (((page - 1) * photosPerPage) + 1)
		+ ' through ' + (page * photosPerPage > totalPhotos ? totalPhotos : page * photosPerPage)
		+ ' (' + currentRequest + ' out of '
		+ ((page * photosPerPage > totalPhotos ? totalPhotos : page * photosPerPage) * ajaxRequestsPerPhoto) + ' requests completed)';
}

// This handles all interface changes in preparation to add more photos
function prepareToAddPhotos() {
	$("#moreRow").remove();	
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
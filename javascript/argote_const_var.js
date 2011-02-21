// Author: Luis Edgardo Argote Bolio
// Author email: luis@argote.mx

// This file contains constants and variables which are used throughout the other files


const API_key = '0b10ac3b8cc11da085d447ea647dbe67';
const json = '&format=json&jsoncallback=?';
const photosPerPage = 20; // Limited to 20 by the Flickr Terms of Use
const ajaxRequestsPerPhoto = 3;
var images = {};
var sets = {};
var page = 1;
var currentRequest = 1;
var totalPhotos = 0;
var totalPages = 0;
var settingsOrder = 'titleSize&photoSize&description&dateTaken&cameraMake&cameraModel&lens&focalLength&mode&aperture&exposureTime&iso&equiv35mm&location&latitudeLongitude&map';

// These variables are for the Google Maps API
var GM_size = '400x400';
var GM_maptype = 'hybrid';
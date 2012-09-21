<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="css/main.css" />
		<title>Argote's Flickr poster for IPB forums</title>
		<script type="text/javascript" src="javascript/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="javascript/jquery.tablednd_0_5.js"></script>
		<script type="text/javascript" src="javascript/argote_const_var.js"></script>
		<script type="text/javascript" src="javascript/argote_helper.js"></script>
		<script type="text/javascript" src="javascript/argote_ui.js"></script>
		<script type="text/javascript" src="javascript/argote_flickr.js"></script>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-20644762-2']);
			_gaq.push(['_trackPageview']);

			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</head>
	<body>
		<div id="contenido" class="content">
			<div class="title">Argote's Flickr poster for IPB forums <span class="beta">BETA</span></div>
			Version 0.4.6, last updated May 9th, 2012<br /><br />
			<fieldset id="userInfo">
				<legend class="legend">User Info</legend>
				<input id="user" type="text" value="Enter your Flickr username here (the one in your URL)" size="60" onclick="make_blank()" />
				<input id="find" type="button" value="Find my Photos" onclick="getUserID()" />
			</fieldset>
			<br />
			<fieldset id="settings">
				<legend class="legend">Settings</legend>
				<table id="settingsTable">
					<tr id="titleSizeRow" class="nodrag nodrop">
						<td class="dragLabel">
							&nbsp;
						</td>
						<td class="controlLabel">
							<label for="titleSize">Title Size</label>
						</td>
						<td>
							<select id="titleSize">
								<option value="0">No Title</option>
								<option value="2">2 (Smallest)</option>
								<option value="3">3</option>
								<option value="4" selected="selected">4</option>
								<option value="5">5</option>
								<option value="6">6 (Largest)</option>
							</select>
						</td>
					</tr>
					<tr id="photoSizeRow" class="nodrag nodrop">
						<td class="dragLabel">
							&nbsp;
						</td>
						<td class="controlLabel">
							<label for="photoSize">Photo Size</label>
						</td>
						<td>
							<select id="photoSize">
								<option value="_m.jpg">Small (240px)</option>
								<option value=".jpg">Old Medium (500px)</option>
								<option value="_z.jpg" selected="selected">New Medium (640px)</option>
								<option value="_b.jpg">Large (1024px)</option>
							</select>
						</td>
					</tr>
					<tr id="descriptionRow" class="nodrag nodrop">
						<td class="dragLabel">
							&nbsp;
						</td>
						<td class="controlLabel">
							<label for="description">Include Description</label>
						</td>
						<td>
							<input id="description" type="checkbox" value="Include Description" checked="checked" />
						</td>
					</tr>
					<tr id="dateTakenRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="dateTaken">Date Taken</label>
						</td>
						<td>
							<input id="dateTaken" type="checkbox" value="Date Taken" checked="checked" />
						</td>
					</tr>
					<tr id="cameraMakeRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="cameraMake">Camera Make</label>
						</td>
						<td>
							<input id="cameraMake" type="checkbox" value="Camera Make" checked="checked" />
						</td>
					</tr>
					<tr id="cameraModelRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="cameraModel">Camera Model</label>
						</td>
						<td>
							<input id="cameraModel" type="checkbox" value="Camera Model" checked="checked" />
						</td>
					</tr>
					<tr id="lensRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="lens">Lens</label>
						</td>
						<td>
							<input id="lens" type="checkbox" value="Lens" checked="checked" />
						</td>
					</tr>
					<tr id="focalLengthRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="focalLength">Focal Length</label>
						</td>
						<td>
							<input id="focalLength" type="checkbox" value="Focal Length" checked="checked" />
						</td>
					</tr>
					<tr id="modeRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="mode">Mode</label>
						</td>
						<td>
							<input id="mode" type="checkbox" value="Mode" checked="checked" />
						</td>
					</tr>
					<tr id="apertureRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="aperture">Aperture</label>
						</td>
						<td>
							<input id="aperture" type="checkbox" value="Aperture" checked="checked" />
						</td>
					</tr>
					<tr id="exposureTimeRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="exposureTime">Exposure Time</label>
						</td>
						<td>
							<input id="exposureTime" type="checkbox" value="Exposure Time" checked="checked" />
						</td>
					</tr>
					<tr id="isoRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="iso">ISO</label>
						</td>
						<td>
							<input id="iso" type="checkbox" value="ISO" checked="checked" />
						</td>
					</tr>
					<tr id="equiv35mmRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="equiv35mm">35mm Equivalent</label>
						</td>
						<td>
							<input id="equiv35mm" type="checkbox" value="35mm Equivalent" />
						</td>
					</tr>
					<tr id="locationRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="location">Location</label>
						</td>
						<td>
							<input id="location" type="checkbox" value="Location" />
							<div id="locationSettings">
								&nbsp; &#x21B3; <input id="locality" type="checkbox" value="Locality" checked="checked" /><label for="locality">Locality</label> &nbsp; &nbsp;
								<input id="county" type="checkbox" value="County" /><label for="county">County</label> &nbsp; &nbsp;
								<input id="region" type="checkbox" value="Region / State" checked="checked" /><label for="region">Region / State</label> &nbsp; &nbsp;
								<input id="country" type="checkbox" value="Country" checked="checked" /><label for="country">Country</label><br />
							</div>
						</td>
					</tr>
					<tr id="latitudeLongitudeRow">
						<td class="dragLabel">
							&#x21C5;
						</td>
						<td class="controlLabel">
							<label for="latitudeLongitude">Latitude / Longitude</label>
						</td>
						<td>
							<input id="latitudeLongitude" type="checkbox" value="Latitude / Longitude" />
						</td>
					</tr>
					<tr id="mapRow" class="nodrag nodrop">
						<td class="dragLabel">
							&nbsp;
						</td>
						<td class="controlLabel">
							<label for="includeGoogleMaps">Map</label>
						</td>
						<td>
							<input id="includeGoogleMaps" type="checkbox" value="Include Map" />(NOT supported on all forums)
						</td>
					</tr>
					<tr id="separatorRow" class="nodrag nodrop">
						<td class="dragLabel">
							&nbsp;
						</td>
						<td class="controlLabel">
							<label for="separator">Separator</label>
						</td>
						<td>
							<select id="separator">
								<option value="0" selected="selected">Newline</option>
								<option value="2">2 spaces</option>
								<option value="3">3 spaces</option>
								<option value="4">4 spaces</option>
								<option value="-1"> | </option>
							</select>
						</td>
					</tr>
				</table>
			</fieldset>
			<br />
			<fieldset id="photos">
				<legend class="legend">Your photos</legend>
				<table id="images">
					<tr>
						<th></th>	
					</tr>
					<tr id="moreRow">		
						<td rowspan="2">
							<input id="moreButton" type="button" value="Get More" onclick="getUserID()" />
						</td>
					</tr>
				</table>
			</fieldset>
			<div id="loader" class="loader">
				<img src="images/loader.gif" alt="Loading..." />
				<p id="loadStatus"></p>
			</div>
			<p class="footer"><a href="mailto:luis@argote.mx">Luis Edgardo Argote Bolio</a>, <?php
				// Set the timezone to use
				date_default_timezone_set('America/Monterrey');
				// Prints the current year
				echo date('Y');
			?><br />
			<a href="http://validator.w3.org/check?uri=referer" target="_blank">XHTML 1.0</a> | <a href="http://jigsaw.w3.org/css-validator/check/referer" target="_blank">CSS 2/3</a> | <a href="http://jquery.com/" target="_blank">jQuery</a> + <a href="http://www.isocra.com/2008/02/table-drag-and-drop-jquery-plugin/">Table drag and drop plugin</a></p>
		</div>
	</body>
</html>

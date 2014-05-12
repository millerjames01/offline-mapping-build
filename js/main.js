function onBodyLoad() {
	document.addEventListener("deviceready", go, false);
}

function go() {
	$('#button1').onclick(loadDatabase);
	$('#mapModal').modal("hide");
}

function loadDatabase() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		fs.root.getDirectory("databases", {create: true}, function(entry) {
			var ft = new FileTransfer();
			ft.download("https://www.dropbox.com/s/s6pxs03krkzzvba/Database.db", // the filesystem uri you mentioned
			entry.toURI() + "/Database.db", function(entry) {
				// do what you want with the entry here
				$('#button1').html("Display");
				$('#button1').click(function () {
				  $('#mapModal').modal('toggle');
				  buildMap();
				});
			}, function(error) {
				$('#information').html(
				  alertHtml("Error in dowloading the file from" + error.source + 
							"error target" + error.target + ": " + error.code)
				);
				console.log("error source " + error.source);
				console.log("error target " + error.target);
				console.log("error code " + error.code);
			}, false, null);
		}, function() {
			$('#information').html(alertHtml("Couldn't create a databases directory"));
		});
	}, null);
}

function buildMap() {
	var db = window.sqlitePlugin.openDatabase({
		name : "Database"
	});
/*	
var map = L.map('map').setView([51.505, -0.09], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
    .openPopup();	
*/
	var map = new L.Map('map', {
		center : new L.LatLng(41.311000, -72.927000),
		zoom : 14
	});

	var lyr = new L.TileLayer.MBTiles('', {
		maxZoom : 17,
		scheme : 'tms'
	}, db);
	
	map.addLayer(lyr);
}

function alertHtml(content) {
	return '<div class="alert alert-danger alert-dismissable">' +
	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + 
	'<strong>Warning!</strong>' + content + '</div>';
}

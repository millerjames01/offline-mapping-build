function onBodyLoad() {
	document.addEventListener("deviceready", go, false);
}

function go() {
	$('#button1').click(loadDatabase);
}

function success(entries) {
    var i;
    console.log(entries.length + " entries");
    for (i=0; i<entries.length; i++) {
    console.log(entries[i].name);
    }
}

function fail(error) {
    alert("Failed to list directory contents: " + error.code);
}

function onSuccess(fs) {
    var debugReader = fs.root.createReader();
    console.log("Reading from " + fs.root.fullPath);
    debugReader.readEntries(success, fail)
    window.resolveLocalFileSystemURL("cdvfile://localhost/persistent/../..",
      function(dirEntry) {
      	alert("Obtained that directory")
      }, function() {
      	alert("Couldn't resovle the URL")
      });
    fs.root.getDirectory("databases", { create: true }, function(dataEntry) {
        var ft = new FileTransfer();
        /* ft.download("https://dl.dropboxusercontent.com/s/s6pxs03krkzzvba/Database.db?dl=1&token_hash=AAEqMLcQ5aI2rjRa9kKzRHWtMYj-9shVJLncIwXi47gP3w&expiry=1399898530", // the filesystem uri you mentioned
            "file://../Database.db", function(entry) {
            // do what you want with the entry here
            $('#information').html(
                alertHtml("Successfully downloaded the file to " + entry.toURL()) 
            );
            $('#button1').unbind();
            $('#button1').html("Display");
            $('#button1').click(function () {
                $('#map').toggle();
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
        }, false, null);    */ 
    }, function() {
        $('#information').html(alertHtml("Couldn't create a databases directory"));
    });
}

function onError() {
    $('#information').html(alertHtml("couldn't retrieve local file system"));
}

function loadDatabase() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);
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
	return '<div class="alert alert-info alert-dismissable">' +
	'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + 
	'<strong>Info</strong>' + content + '</div>';
}

function onBodyLoad() {
	document.addEventListener("deviceready", go, false);
}

function go() {
	$('#button1').click(loadDatabase);
}

function onSuccess(fs) {
	fs.root.getDirectory("databases", { create: true }, function(dataEntry) {
		var ft = new FileTransfer();
		ft.download("https://www.dropbox.com/s/7okqinoe2u3ip7l/out.mbtiles",
			"cdvfile://localhost/persistent/../../databases/Database.db", function(entry) {
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
					"<br>error target" + error.target + ": " + error.code)
			);
			console.log("error source " + error.source);
			console.log("error target " + error.target);
			console.log("error code " + error.code);
		}, false, null);    
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

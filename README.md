Offline Mapping for Phonegap Build
==================================

The core web files for building an app that reads 
a local mbTiles database to display maps, which
are compiled and packaged by Phonegap Build

Requirements
------------
Having the [Android SDK](https://developer.android.com/sdk/index.html) 
is also necessary for using phone emulators, installing the app, and 
viewing the log.


Demo
----
Go to the app's 
[page](https://build.phonegap.com/apps/878115/builds "Offline Mapping") 
on Phonegap Build and download the .apk (Windows Phone and iPhone apps
are not yet supported, more on that below). Either
start an emulator or plug-in your Android device and wait
for it to be finished with start up processes.
Then type

    adb install /path/to/OfflineMapping-debug.apk

After installation, open the app and click "Download" to get the map
database. Once it is finished download, click "Display" to view a map
of Yale's campus.

If you have any difficuties, email me at miller.james01@gmail.com
with a description of the error, and I'll try to figure out what's going on.

Next Steps
----------
Developing an iOS version should be the next step,
and it shouldn't be all that difficult. All it requires
is checking the system the app is running on, with the 
Cordova API, and then set the source and target file
for transferring the database file to a place easily
accessibly by the SQLite plugin.

Because this is a proof-of-concept, I'm not sure how
many units there are that are easily testable, especially
because of the brevity of the code. Nevertheless,
dependably building a test to make sure file placement
is handled correctly depending on the phone and platform should
be a good gaol for the future
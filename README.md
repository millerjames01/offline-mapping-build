Offline Mapping for Phonegap Build
==================================

The core web files for building an app that reads 
a local mbTiles database to display maps, which
are compiled and packaged by Phonegap Build

Requirements
------------
Having the [Android SDK](https://developer.android.com/sdk/index.html) is also necessary for 
using phone emulators, installing the app, and 
viewing the log.


Demo
----
Go to the app's [page](https://build.phonegap.com/apps/878115/builds "Offline Mapping") on Phonegap Build
and download the .apk (Windows Phone and iPhone apps
are not yet supported, more on that below). Either
start an emulator or plug-in your Android device and wait
for it to be finished with start up processes.
Then type
`
adb install /path/to/OfflineMapping-debug.apk
`
After installation, and a few seconds of loading time,
a map of Yale's campus should appear on the screen

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
writing a javascript test file that does queries on the
database and tests file placement would be beneficial.
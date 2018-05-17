# animalparty-mobile

## Setup
### Setup - General
1. Clone repository
````
git clone https://github.com/anshuman64/animalparty-mobile.git
cd animalparty-mobile
````

2. Install modules
````
npm install
````

3. Fix mime-types module
````
open ./node_modules/mime-types/index.js
````
Edit ````var extname = require('path').extname```` to:
````
const extname = (path) => {
   if (!path || path.indexOf('.') === -1) { return '' }
   path = '.' + path.split('.').pop().toLowerCase()
   return /.*(\..*)/g.exec(path)[1] || ''
}
````

4. Fix react-native-video-player
````
open ./node_modules/react-native-video-player/index.js
````
Replace contents with this file: https://drive.google.com/file/d/1-99De6dgEY4WnHhBvfqVrp5ktRA5a6wg/view?usp=sharing

### Setup - Android
1. Add animalparty-android.keystore (ask Anshuman) to ````/android/app```` directory

### Setup - iOS
1. Install Pods
````
cd ios && pod install && cd ..
````

2. Fix search header for RCTBridgeModule.h
````
open ./node_modules/react-native/React/Base/RCTBridgeModule.h
````
Edit ````#import <React/RCTDefines.h>```` to ````#import "RCTDefines.h" ````

3. Open XCode application
4. ````File > Open > $ANIMALPARTY-MOBILE/ios````
5. Click on "Pods" in left panel
6. Select "react-native-amplitude-analytics" from the dropdown at the top
7. Click on "Header Search Paths"
8. Add ````"$(PODS_ROOT)/../../node_modules/react-native/React/"````
9. Set as "Recursive"


## Release
### Release - General
1. Comment all logging "console.", "debugger", and "Debug Test" lines
2. ENV_SETTING = ENV_TYPES.PRODUCTION in app_config.js
3. LoadingScreen inital={true} in App.js
4. Run the app on iOS simulator with these settings and log in with your phone number. Make sure everything works.

### CodePush Release
0. Make sure you follow the steps under "Release - General"!
1. Android
````
appcenter codepush release-react -a AnimalParty/AnimalParty-Android -d Production
````

2. iOS
````
appcenter codepush release-react -a AnimalParty/AnimalParty-iOS -d Production
````
Note: Add option ````---mandatory```` if the update should cause the app to refresh on start

### Full Release - Android
0. Make sure you follow the steps under "Release - General"!
1. Increment versionCode and versionName in android > app > build.gradle and AndroidManifest.xml
2. Generate signed release APK
````
cd android && ./gradlew assembleRelease && cd ..
````
3. Search for "app-release.apk" in ````animalparty-mobile/android/app/build/outputs/apk/release/app-release.apk```` and drag into Google Play Console

Note: If you want to test the signed release APK, run ````react-native run-android --variant=release````

### Full Release - iOS
0. Make sure you follow the steps under "Release - General"!
1. Increment Version and Build in XCode
2. Change CodePush deployment key from Staging to Production

3. Set build target to "Generic iOS Device"
4. Run ````Product > Archive````

### Post-Release
1. Assuming you were on "master" branch:
````
git checkout stable
git merge master
git tag vX.Y.Z
git push origin vX.Y.Z
git checkout master
````

### Change CodePush Deployment Key
1. Android
````
open ./android/app/src/res/values/strings.xml
````
Change "reactNativeCodePush_androidDeploymentKey" from Staging ````0wdFZMRaBt_InRdAh5wxwr0fjqHhHkRQlzrRf```` to Production ````xvilSQ5yrpfsfgT8yFTBDnzC56NFSJJEezHCz````

2. iOS
````
open ./ios/AnimalParty/Info.plist
````
Change "CodePushDeploymentKey" from Staging ````W5sHjCByju5UuUQ3Y1jY8EIhByDVrJOBlfH0z```` to Production ````vRilBQuM9jOuC4DGY_6xQ3HiqoDKB1dHxGB0G````

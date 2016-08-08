Salesforce Beacon Demo
=====================

A starting project for using Salesforce data while region monitoring with Estimote beacons.

This project was piggy-backed off the great [Cordova Proximity Plugin](https://github.com/petermetz/cordova-plugin-ibeacon) app built by Peter Metz.

* After launching the app, you can start ranging or region monitoring beacons by pressing the similarly named buttons on the
second and the third tabs of the application.

* The first tab will provide summary information given your selection above.
 
* The event log produced by iOS will get populated on the fourth tab.

* To see any of the aforementioned in action, you have to edit the properties of the ranged/monitored beacon on the
second/third tab, or by modifying the default values in the source code (see the .html files).

## Prerequisites

* [Buy estimotes](http://estimote.com/) :-)

* [Create a Salesforce Developer Org](https://developer.salesforce.com/signup)

* Import Salesforce Apex REST Service from [partner repository](https://github.com/scottbcovert/salesforce-beacon-demo-apex)

* [Setup Salesforce Apex REST Endpoint with Sites](http://www.wadewegner.com/2013/03/creating-anonymous-rest-apis-with-salesforce-com/)

* Install node and npm.

    ```
    # Install node either from [nodejs.org](http://nodejs.org) or homebrew
    brew install node
    # Update npm
    npm install -g npm
    ```

* Install necessary CLIs on your machine.
    
    ```
    # Install CLI dependencies
    npm install -g ionic ios-sim ios-deploy
    ```
    
## Usage

After a clean checkout, you should update HomeCtrl.js with your own custom REST Url and a corresponding contact id from your Salesforce org that is tied to an open opportunity. You can also update the Ranging.html and Monitoring.html pages to automatically load with default values that match your estimotes.
    
    # Setup proper custom REST endpoint and create a mock customer using the id of a Salesforce contact that relates to an opportunity in HomeCtrl.js

    # Install NPM dependencies
    npm install
    
    # Run the gulp install task which will run bower
    gulp install
    
    # Restore ionic state to add iOS as a platform to your project and install plugin dependencies
    ionic state restore
    
    # Build the iOS platform files
    ionic build ios

    # Run the app on a connected iOS device (You will need to have an [iOS Provisioning Profile](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/CreatingYourTeamProvisioningProfile/CreatingYourTeamProvisioningProfile.html) recognized by XCode)
    ionic run ios --device
    
## Development

After making a change to the Javascript/SCSS code, execute ``ionic prepare`` in order to compile your styles and copy your changes into the 
platform directories. This is necessary before you'll be able to see the changes on a device.
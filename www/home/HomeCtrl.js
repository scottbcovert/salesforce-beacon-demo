angular.module('co.tython.salesforce.beacon.demo.home').controller('HomeCtrl', ['$http', '$ionicPopup', '$log', '$scope', '$localForage', '$cordovaLocalNotification', function ($http, $ionicPopup, $log, $scope, $localForage, $cordovaLocalNotification) {

	$log.debug('HomeCtrl is loaded.');

	$scope.event = 'Waiting...';
	$scope.icon = 'ion-ios-clock-outline';

	$scope.sendPush = function(pushMessage,pushTitle) {
        var notificationTime = new Date();
        $cordovaLocalNotification.add({
            id: "1234",
            date: notificationTime,
            message: pushMessage,
            title: pushTitle,
            autoCancel: true,
            sound: "file://sounds/beep.caf"
        }).then(function () {
            console.log("The notification has been set");
        });
    };

	// Insert your custom REST Url here
	var restUrl = '';
	// Mock customer id using Salesforce contact id
	var contactId = '';
	var regionInfo;
	var regionEntered;
	var regionExited;
	var proximityImmediate;

	var alertPopup = function(elem){
		$ionicPopup.alert({
		    title: elem.Name,
		    template: elem.Description
		});
	}

	var callout = function(type, region){
		// Provide identifying info upon entering beacon region for tracking purposes
		regionInfo = ( type === 'entered' && typeof region !== 'undefined') ? '&uuid=' + region.uuid + '&major=' + region.major + '&minor=' + region.minor + '&identifier=' + region.identifier + '&type=' + type : '';
		$http.get(restUrl + '?contactId=' + contactId + regionInfo)
			.then(function(response)
			{
				if (response && type === 'popup'){
					alertPopup(response.data)
						.then(function(res){
							// Closed
						});
				}
				else if (response && type === 'entered'){
					$scope.sendPush(response.data.Description,'Entered: ' + response.data.Name);
				}
				else if (response && type === 'exited'){
					$scope.sendPush(response.data.Description,'Exited: ' + response.data.Name);
				}
			});
	}

	$scope.updateMonitoringEvent = function () {

		$log.debug('updateMonitoringEvent()');

		$localForage.getItem('monitoring_events').then(function (monitoringEvents) {
			
			if (monitoringEvents[monitoringEvents.length-1].state === 'CLRegionStateInside'){
				if (!regionEntered){
					callout('entered', monitoringEvents[monitoringEvents.length-1].region);
				}
				$scope.event = 'In range!';
				$scope.icon = 'ion-eye';	
				regionEntered = true;					
			}
			else {
				if (!regionExited){
					callout('exited');
				}
				$scope.event = 'Out of range :-(';
				$scope.icon = 'ion-eye-disabled';
				regionExited = true;
			}
		});
		
	};

	$scope.updateRangingEvent = function () {
		
		$log.debug('updateRangingEvent()');

		$localForage.getItem('ranging_events').then(function (rangingEvents) {
			$scope.event = rangingEvents[rangingEvents.length-1].beacons[0].proximity;
			if ($scope.event === 'ProximityImmediate'){
				$scope.icon = 'ion-volume-high';
				if (!proximityImmediate){
					callout('popup');	
				}
				proximityImmediate = true;
			}
			else if ($scope.event === 'ProximityNear'){
				$scope.icon = 'ion-volume-medium';
			}
			else if ($scope.event === 'ProximityFar'){
				$scope.icon = 'ion-volume-low';
			}
			else {
				// Unknown
				$scope.icon = 'ion-ios-help-outline';
			}
		});
		
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_events', $scope.updateMonitoringEvent);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_events', $scope.updateRangingEvent);

}]);
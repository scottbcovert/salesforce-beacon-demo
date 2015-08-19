angular.module('co.tython.salesforce.beacon.demo.home').controller('HomeCtrl', ['$http', '$ionicPopup', '$log', '$scope', '$localForage', function ($http, $ionicPopup, $log, $scope, $localForage) {

	$log.debug('HomeCtrl is loaded.');

	$scope.event = 'Waiting...';
	$scope.icon = 'ion-ios-clock-outline';

	// Insert your custom REST Url here
	var restUrl = '';
	// Mock customer id using Salesforce contact id
	var contactId = '';
	var regionEntered;
	var regionExited;
	var proximityImmediate;

	var alertPopup = function(elem){
		$ionicPopup.alert({
		    title: elem.Name,
		    template: elem.Description
		});
	}

	var callout = function(){
		$http.get(restUrl + '?contactId=' + contactId)
			.then(function(response)
			{
				if (response){
					alertPopup(response.data)
						.then(function(res){
							// Closed
						});
				}
			});
	}

	$scope.updateMonitoringEvent = function () {

		$log.debug('updateMonitoringEvent()');

		$localForage.getItem('monitoring_events').then(function (monitoringEvents) {
			
			if (monitoringEvents[monitoringEvents.length-1].state === 'CLRegionStateInside'){
				if (!regionEntered){
					callout();
				}
				$scope.event = 'In range!';
				$scope.icon = 'ion-eye';	
				regionEntered = true;					
			}
			else {
				if (!regionExited){
					callout();
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
					callout();	
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
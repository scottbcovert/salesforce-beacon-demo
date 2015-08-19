angular.module('com.unarin.cordova.proximity.quickstart.home').controller('HomeCtrl', ['$log', '$scope', '$localForage', function ($log, $scope, $localForage) {

	$log.debug('HomeCtrl is loaded.');

	$scope.event = 'Waiting...';

	$scope.updateMonitoringEvent = function () {

		$log.debug('updateMonitoringEvent()');

		$localForage.getItem('monitoring_events').then(function (monitoringEvents) {
			if (monitoringEvents[monitoringEvents.length-1].state === 'CLRegionStateInside'){
				$scope.event = 'Customer is nearby!';
			}
			else {
				$scope.event = 'Customer is not nearby :-(';
			}
		});
	};

	$scope.updateRangingEvent = function () {
		
		$log.debug('updateRangingEvent()');

		$localForage.getItem('ranging_events').then(function (rangingEvents) {
			$scope.event = rangingEvents[rangingEvents.length-1].beacons[0].proximity;
		});
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_events', $scope.updateMonitoringEvent);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_events', $scope.updateRangingEvent);

}]);
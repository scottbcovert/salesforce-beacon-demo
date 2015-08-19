angular.module('co.tython.beacon.demo.eventlog').controller('EventLogCtrl', ['$log', '$scope', '$localForage', function ($log, $scope, $localForage) {

	$log.debug('EventLogCtrl is loaded.');

	$scope.events = [];

	$scope.updateMonitoringEvents = function () {

		$log.debug('updateMonitoringEvents()');

		$localForage.getItem('monitoring_events').then(function (monitoringEvents) {
			$scope.events = monitoringEvents;
		});
	};

	$scope.updateRangingEvents = function () {
		
		$log.debug('updateRangingEvents()');

		$localForage.getItem('ranging_events').then(function (rangingEvents) {
			$scope.events = rangingEvents;
		});
	};

	$log.debug('Subscribing for updates of monitoring events.');
	$scope.$on('updated_monitoring_events', $scope.updateMonitoringEvents);

	$log.debug('Subscribing for updates of ranging events.');
	$scope.$on('updated_ranging_events', $scope.updateRangingEvents);

}]);
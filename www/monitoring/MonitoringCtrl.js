angular.module('co.tython.beacon.demo.monitoring')

	.controller('MonitoringCtrl', ['$log', '$rootScope', '$scope', '$window', '$localForage', function ($log, $rootScope, $scope, $window, $localForage) {

		$log.debug('MonitoringCtrl is loaded.');

		$scope.updateMonitoredRegions = function () {
			$window.cordova.plugins.locationManager.getMonitoredRegions().then(function (monitoredRegions) {
				$log.debug('Monitored regions:', JSON.stringify(monitoredRegions, null, '\t'));
				$scope.monitoredRegions = monitoredRegions;
			});
		};

		$scope.startMonitoring = function () {
			$log.debug('startMonitoring()');
			$window.cordova.plugins.locationManager.setDelegate(delegate);
			var beaconRegion = cordova.plugins.locationManager.Regions.fromJson($scope.region);
			$log.debug('Parsed BeaconRegion object:', JSON.stringify(beaconRegion, null, '\t'));

			$window.cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion);

			$window.cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
				.fail($log.error)
				.done();


		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didDetermineStateForRegion = function (pluginResult) {

			$log.debug('didDetermineStateForRegion()', pluginResult);
			pluginResult.id = new Date().getTime();
			pluginResult.timestamp = new Date();

			$localForage.getItem('monitoring_events')
				.then(function (monitoringEvents) {
					if (!angular.isArray(monitoringEvents)) {
						monitoringEvents = [];
					}

					monitoringEvents.push(pluginResult);
					return monitoringEvents;
				}).then(function (monitoringEvents) {
					$localForage.setItem('monitoring_events', monitoringEvents);

					$rootScope.$broadcast('updated_monitoring_events');
				});
		};

		delegate.didStartMonitoringForRegion = function (pluginResult) {
			$log.debug('didStartMonitoringForRegion:', pluginResult);
			$scope.updateMonitoredRegions();
		};


		//
		// Init
		//
		$window.cordova.plugins.locationManager.requestAlwaysAuthorization();
		
		$scope.region = {};

		$scope.updateMonitoredRegions();
	}]);
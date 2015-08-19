angular.module('co.tython.beacon.demo.ranging')

	.controller('RangingCtrl', ['$log', '$rootScope', '$scope', '$window', '$localForage', function ($log, $rootScope, $scope, $window, $localForage) {

		$log.debug('Loaded RangingCtrl successfully.');

		$scope.updateRangedRegions = function () {
			$window.cordova.plugins.locationManager.getRangedRegions().then(function (rangedRegions) {
				$log.debug('Ranged regions:', JSON.stringify(rangedRegions, null, '\t'));
				$scope.rangedRegions = rangedRegions;
			});
		};

		$scope.startRanging = function () {
			$log.debug('startRanging()');
			$window.cordova.plugins.locationManager.setDelegate(delegate);
			var beaconRegion = cordova.plugins.locationManager.Regions.fromJson($scope.region);
			$log.debug('Parsed BeaconRegion object:', JSON.stringify(beaconRegion, null, '\t'));

			$window.cordova.plugins.locationManager.stopMonitoringForRegion(beaconRegion);

			$window.cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
				.fail($log.error)
				.done();


		};

		var delegate = new cordova.plugins.locationManager.Delegate();

		delegate.didRangeBeaconsInRegion = function (pluginResult) {

			$log.debug('didRangeBeaconsInRegion()', pluginResult);
			pluginResult.id = new Date().getTime();
			pluginResult.timestamp = new Date();

			$localForage.getItem('ranging_events')
				.then(function (rangingEvents) {
					if (!angular.isArray(rangingEvents)) {
						rangingEvents = [];
					}

					rangingEvents.push(pluginResult);
					return rangingEvents;
				}).then(function (rangingEvents) {
					$localForage.setItem('ranging_events', rangingEvents);
					
					$rootScope.$broadcast('updated_ranging_events');					
				});
		};

		delegate.didStopMonitoringForRegion = function (pluginResult) {
			$log.debug('didStopMonitoringForRegion:', pluginResult);
			$scope.updateRangedRegions();
		};


		//
		// Init
		//
		$window.cordova.plugins.locationManager.requestWhenInUseAuthorization();

		$scope.region = {};

		$scope.updateRangedRegions();
	}]);
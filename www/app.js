angular.module('co.tython.salesforce.beacon.demo', [
	'ionic',
	'ngCordova',
	'co.tython.salesforce.beacon.demo.home',
	'co.tython.salesforce.beacon.demo.ranging',
	'co.tython.salesforce.beacon.demo.monitoring',
	'co.tython.salesforce.beacon.demo.eventlog'
]).config(function ($stateProvider, $urlRouterProvider) {

	window.console.debug('Configuring co.tython.salesforce.beacon.demo');

	$stateProvider
		.state('home', {
			url: '/home',
			views: {
				'home': {
					templateUrl: 'home/Home.html',
					controller: 'HomeCtrl'
				}
			}
		})

		.state('ranging', {
			url: '/ranging',
			views: {
				'ranging': {
					templateUrl: 'ranging/Ranging.html',
					controller: 'RangingCtrl'
				}
			}
		})

		.state('monitoring', {
			url: '/monitoring',
			views: {
				'monitoring': {
					templateUrl: 'monitoring/Monitoring.html',
					controller: 'MonitoringCtrl'
				}
			}
		})

		.state('eventlog', {
			url: '/eventlog',
			views: {
				'eventlog': {
					templateUrl: 'eventlog/EventLog.html',
					controller: 'EventLogCtrl'
				}
			}
		})

	$urlRouterProvider.otherwise('/home');

}).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
	console.debug('Running co.tython.salesforce.beacon.demo');

	// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
});

window.ionic.Platform.ready(function () {
	angular.bootstrap(document, ['co.tython.salesforce.beacon.demo']);
});

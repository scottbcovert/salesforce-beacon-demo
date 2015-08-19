angular.module('co.tython.beacon.demo', [
	'ionic',
	'co.tython.beacon.demo.home',
	'co.tython.beacon.demo.ranging',
	'co.tython.beacon.demo.monitoring',
	'co.tython.beacon.demo.eventlog'
]).config(function ($stateProvider, $urlRouterProvider) {

	window.console.debug('Configuring co.tython.beacon.demo');

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

}).run(function () {

	console.debug('Running co.tython.beacon.demo');

	if (window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	}
	if (window.StatusBar) {
		// Set the statusbar to use the default style, tweak this to
		// remove the status bar on iOS or change it to use white instead of dark colors.
		StatusBar.styleDefault();
	}

});

window.ionic.Platform.ready(function () {
	angular.bootstrap(document, ['co.tython.beacon.demo']);
});

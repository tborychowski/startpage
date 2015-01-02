angular.module('app', [ 'ngResource' ])
	.controller('appCtrl', function ($rootScope, $scope, Data) {
		'use strict';

		$scope.items = Data.query();



		angular.element(document.body).on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev });
		});

		angular.element(document.body).on('contextmenu', function (ev) {
			ev.preventDefault();
		});


	});



(function () {
	'use strict';

	var appCache = window.applicationCache,
		onUpdateReady = function () {
			window.alert('Cache updated, please reload');
		};

	appCache.addEventListener('updateready', onUpdateReady);
	if (appCache.status === appCache.UPDATEREADY) onUpdateReady();
}());

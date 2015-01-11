angular.module('app', [ 'ngResource' ])
	.controller('AppCtrl', function ($rootScope) {
		'use strict';

		var body = angular.element(document.body);
		body.on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev, target: ev.target });
		});

		body.on('contextmenu', function (ev) { ev.preventDefault(); });
	});



/* Appplication Cache */
(function () {
	'use strict';

	var appCache = window.applicationCache,
		onUpdateReady = function () {
			window.alert('Cache updated, please reload');
		};

	appCache.addEventListener('updateready', onUpdateReady);
	if (appCache.status === appCache.UPDATEREADY) onUpdateReady();
}());

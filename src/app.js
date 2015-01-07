angular.module('app', [ 'ngResource' ])
	.controller('appCtrl', function ($rootScope, $scope, Data) {
		'use strict';

		$scope.items = Data.query();



		/**
		 * jQuery "closest()" replacement
		 * @param  {object} element
		 * @param  {string} class name of the element or parents
		 */
		$rootScope.closest = function (el, cls) {
			var has = false;
			while (!has && el) {
				has = el && el.classList && el.classList.contains(cls);
				el = el.parentNode;
			}
			return has;
		};

		angular.element(document.body).on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev });
		});

		angular.element(document.body).on('contextmenu', function (ev) {
			ev.preventDefault();
		});

		$rootScope.$on('tiles-reload', function () {
			$scope.items = Data.query();
		});

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

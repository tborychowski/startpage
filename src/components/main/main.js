angular.module('app')
	.directive('main', function ($rootScope, Apps) {
		'use strict';

		return {
			restrict: 'EA',
			templateUrl: 'assets/main.html',
			replace: true,
			transclude: false,
			scope: {},
			link: function (scope/*, elem, attrs*/) {
				scope.apps = Apps.get();

			}
		};
	});

angular.module('app')
	.directive('sidebar', function () {
		'use strict';

		return {
			restrict: 'EA',
			templateUrl: 'assets/sidebar.html',
			replace: true,
			transclude: false,
			scope: {},
			link: function (/*scope, elem, attrs*/) {



			}
		};
	});

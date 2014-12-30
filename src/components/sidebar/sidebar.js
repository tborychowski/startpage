angular.module('app')
	.directive('sidebar', function () {
		'use strict';

		return {
			restrict: 'EA',
			template: '<div class="sidebar">settings</div>',
			replace: true,
			transclude: false,
			scope: {},
			link: function (/*scope, elem, attrs*/) {



			}
		};
	});

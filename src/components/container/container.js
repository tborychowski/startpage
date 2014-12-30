angular.module('app')
	.directive('container', function () {
		'use strict';

		return {
			restrict: 'EA',
			scope: {
				items: '='
			},
			template: '<div class="container" ng-class="layout">' +
							'<tile ng-repeat="app in items" data="app"></tile>' +
						'</div>',
			replace: true,
			transclude: false,
			link: function (scope, elem, attrs) {
				scope.layout = 'layout-' + (attrs.layout || 'list');


			}
		};
	});

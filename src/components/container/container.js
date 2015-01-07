angular.module('app')
	.directive('container', function ($rootScope, $compile) {
		'use strict';

		return {
			restrict: 'EA',
			scope: {
				items: '='
			},
			template: '<div class="container" ng-class="layout">' +
							'<tile ng-repeat="app in items" data="app"></tile>' +
							'<tile data="{}"></tile>' +
						'</div>',
			replace: true,
			transclude: false,
			link: function (scope, elem, attrs) {
				scope.layout = 'layout-' + (attrs.layout || 'list');

				scope.sortable = new window.Sortable(elem[0], {
					animation: 200,
					draggable: '.tile',
					group: 'apps',
					scroll: false
				});

				$rootScope.$on('tile-add-empty', function () {
					elem.append($compile('<tile data="{}"></tile>')(scope));
				});

			}
		};
	});

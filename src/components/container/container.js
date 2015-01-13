angular.module('app')
	.directive('container', function ($rootScope, $compile, Data) {
		'use strict';

		return {
			restrict: 'EA',
			// scope: true,
			template: '<div class="container" ng-class="layout">' +
							'<tile ng-repeat="app in items" data="app"></tile>' +
							'<tile data="{}"></tile>' +
						'</div>',
			replace: true,
			link: function (scope, elem, attrs) {
				scope.items = Data.query();
				scope.layout = 'layout-' + (attrs.layout || 'list');

				scope.sortable = new window.Sortable(elem[0], {
					animation: 200,
					draggable: '.tile',
					filter: '.tile-fixed',
					group: 'apps',
					scroll: false,
					store: {
						get: function () { return []; },
						set: function (sortable) {
							var ord = sortable.toArray(), l = scope.items.length;
							if (ord.length > l) ord = ord.slice(0, l);	// trim if added empty
							Data.reorder(ord);
						}
					}
				});


				$rootScope.$on('tile-add-empty', function () {
					elem.append($compile('<tile data="{}"></tile>')(scope));
				});
				$rootScope.$on('tiles-reload', function () {
					scope.items = Data.query();
				});
			}
		};
	});

angular.module('app')
	.directive('tileSettings', function ($rootScope) {
		'use strict';

		return {
			restrict: 'EA',
			// scope: {},
			template: '<div class="tile-settings">tile {{data.name}}</div>',
			replace: true,
			transclude: true,
			link: function (scope, elem/*, attrs*/) {
				scope.isVisible = false;
				scope.data = {};

				scope.toggle = function (show) {
					scope.isVisible = (typeof show === 'undefined' ? !scope.isVisible : show);
					elem.toggleClass('expanded', show);
					$rootScope.$broadcast('tile-settings', { visible: show });
				};

				$rootScope.$on('tile-select', function (ev, args) {
					scope.data = args.data;
					scope.toggle(args.selected);
					scope.$apply();
				});


			}
		};
	});

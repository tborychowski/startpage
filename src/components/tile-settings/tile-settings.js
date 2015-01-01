angular.module('app')
	.directive('tileSettings', function ($rootScope) {
		'use strict';

		return {
			restrict: 'EA',
			// scope: {},
			template: '<div class="tile-settings">tile {{data.name}}<br>url: {{data.url}}</div>',
			replace: true,
			transclude: true,
			link: function (scope, elem/*, attrs*/) {
				scope.isVisible = false;
				scope.data = {};

				scope.toggle = function (show) {
					scope.isVisible = (typeof show === 'undefined' ? !scope.isVisible : show);
					elem.toggleClass('expanded', scope.isVisible);
					document.body.classList.toggle('tile-settings-expanded', scope.isVisible);
					$rootScope.$broadcast('tile-settings', { visible: scope.isVisible });
				};

				$rootScope.$on('tile-select', function (ev, args) {
					scope.data = args.data;
					scope.toggle(args.selected);
					scope.$apply();
				});


			}
		};
	});

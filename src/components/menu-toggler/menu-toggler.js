angular.module('app')
	.directive('menuToggler', function ($rootScope) {
		'use strict';

		return {
			restrict: 'EA',
			template: '<a href="#" class="menu-toggler" ng-click="toggle()">' +
					'<span class="menu-toggler-inner"></span>' +
					'<span class="menu-toggler-inner"></span>' +
					'<span class="menu-toggler-inner"></span>' +
				'</a>',
			replace: true,
			transclude: true,
			scope: {},
			link: function (scope, elem, attrs) {
				var body = angular.element(document.body);
				scope.isVisible = false;

				scope.toggle = function (show) {
					scope.isVisible = (typeof show === 'undefined' ? !scope.isVisible : show);

					elem.toggleClass('open', scope.isVisible);
					body.toggleClass(attrs.toggleClass, scope.isVisible);

					$rootScope.$broadcast('menu', { visible: scope.isVisible });
				};


				// hide sidebar when body-click (but not on sidebar or menu btn)
				$rootScope.$on('body-mousedown', function (ev, args) {
					if (args && args.ev) {
						if ($rootScope.closest(args.ev.target, 'sidebar') ||
							$rootScope.closest(args.ev.target, 'menu-toggler')) return;
					}
					scope.toggle(false);
				});

					// hide sidebar when tile settings is up
				$rootScope.$on('tile-settings', function (ev, args) {
					if (args.visible) scope.toggle(false);
				});


			}
		};
	});

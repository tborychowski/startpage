angular.module('app')
	.directive('tileSettings', function ($rootScope, Data) {
		'use strict';

		return {
			restrict: 'EA',
			// scope: {},
			templateUrl: 'assets/tile-settings.html',
			replace: true,
			transclude: true,
			link: function (scope, elem/*, attrs*/) {
				scope.isVisible = false;
				scope.data = {};
				scope.tile = null;

				scope.onKeyPress = function (ev) {
					if (scope.isVisible) {
						if (ev.keyCode === 27 || ev.keyCode === 13) scope.toggle(false);
					}
				};

				scope.toggle = function (show) {
					scope.isVisible = (typeof show === 'undefined' ? !scope.isVisible : show);
					elem.toggleClass('expanded', scope.isVisible);
					document.body.classList.toggle('tile-settings-expanded', scope.isVisible);
					scope.$emit('tile-settings', { visible: scope.isVisible });

					// save on change
					if (!scope.isVisible) {
						scope.tile.removeClass('selected');
						if (!scope.tileForm.$pristine) Data.save(scope.data);
					}
					else {
						setTimeout(function () {
							elem[0].getElementsByTagName('input')[0].select();
						}, 0);
					}
				};

				$rootScope.$on('tile-select', function (ev, args) {
					if (args && args.selected) scope.data = args.data;
					scope.tile = args && args.el;
					scope.toggle(args.selected);
					scope.$apply();
				});


			}
		};
	});

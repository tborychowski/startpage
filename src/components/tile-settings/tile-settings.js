angular.module('app')
	.directive('tileSettings', function ($rootScope, $compile, Data) {
		'use strict';

		return {
			restrict: 'EA',
			// scope: {},
			templateUrl: 'assets/tile-settings.html',
			replace: true,
			transclude: true,
			link: function (scope, elem) {
				scope.isVisible = false;
				scope.data = {};
				scope.tile = null;

				scope.submit = function () {
					scope.toggle(false);
				};

				scope.delete = function () {
					if (window.confirm('Are you sure?')) {
						Data.delete(scope.data).$promise.then(function (resp) {
							if (resp.result === 'success') scope.$emit('tiles-reload');
						});
					}
				};

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
						scope.tile.removeClass('selected tile-new');
						if (!scope.tileForm.$pristine) {
							Data.save(scope.data).$promise.then(function (item) {
								if (!scope.data.id) {
									scope.data.id = item.id;

									// add new +tile
									$rootScope.$emit('tile-add-empty');
								}
							});
						}
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

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
							scope.data = null;
							scope.toggle(false, true);
							if (resp.result === 'success') $rootScope.$emit('tiles-reload');
						});
					}
				};

				scope.onKeyPress = function (ev) {
					if (scope.isVisible) {
						if (ev.keyCode === 27 || ev.keyCode === 13) scope.toggle(false);
					}
				};

				scope.addItem = function () {
					console.log('adding');
					var isNew = scope.tile.hasClass('tile-new');
					scope.tile.removeClass('selected tile-new');

					if ((!scope.data || !scope.data.name || !scope.data.url) && isNew) {
						scope.tile.addClass('tile-empty');
					}
					else {
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
				};

				scope.toggle = function (show, justToggle) {
					scope.isVisible = (typeof show === 'undefined' ? !scope.isVisible : show);
					elem.toggleClass('expanded', scope.isVisible);
					document.body.classList.toggle('tile-settings-expanded', scope.isVisible);
					scope.$emit('tile-settings', { visible: scope.isVisible });
					if (justToggle === true) return;

					// save on change
					if (!scope.isVisible) scope.addItem();
					else setTimeout(function () {
						elem[0].getElementsByTagName('input')[0].select();
					}, 0);
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

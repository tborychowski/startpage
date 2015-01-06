angular.module('app')
	.directive('tile', function ($rootScope) {
		'use strict';

		function unselectTiles (skipEl) {
			var sel = document.querySelectorAll('.tile.selected');
			angular.forEach(sel, function (el) {
				if (skipEl && skipEl === el) return;
				el = angular.element(el).removeClass('selected');
				$rootScope.$broadcast('tile-select', { el: el, selected: false });
			});
		}

		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			template: '<a class="{{data.url?\'tile\':\'tile-empty\'}}" href="#">{{data.name}}</a>',
			replace: true,
			transclude: true,
			link: function (scope, elem/*, attrs*/) {

				$rootScope.$on('body-mousedown', function (ev, args) {
					if (args && args.ev) {
						if ($rootScope.closest(args.ev.target, 'tile') ||
							$rootScope.closest(args.ev.target, 'tile-settings')) return;
					}
					unselectTiles();
				});

				$rootScope.$on('menu', function (ev, args) {
					if (args.visible) unselectTiles();
				});


				elem.on('mouseup', function () { elem.removeClass('pressed'); })
					.on('mousedown', function (ev) {
						unselectTiles(elem[0]);
						if (ev.which === 3 && !elem.hasClass('tile-empty')) {
							elem.addClass('pressed').toggleClass('selected');
							scope.$emit('tile-select', {
								el: elem,
								data: scope.data,
								selected: elem.hasClass('selected')
							});
						}
						else {
							scope.data.name = '';

							elem.removeClass('tile-empty')
								.addClass('pressed tile tile-new')
								.toggleClass('selected');

							scope.$emit('tile-select', {
								el: elem,
								data: scope.data,
								selected: elem.hasClass('selected')
							});
						}
					});

			}
		};
	});

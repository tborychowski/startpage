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
			scope: { data: '=' },
			template: '<a class="tile" href="#">{{data.name}}</a>',
			replace: true,
			transclude: true,
			link: function (scope, elem/*, attrs*/) {

				$rootScope.$on('body-mousedown', function (ev, args) {
					if (args.ev) {
						var cls = args.ev.target.classList;
						if (cls.contains('tile') || cls.contains('tile-settings')) return;
					}
					unselectTiles();
				});

				$rootScope.$on('menu', function (ev, args) {
					if (args.visible) unselectTiles();
				});

				elem.on('contextmenu', function (ev) { ev.preventDefault(); })
					.on('mouseup', function () { elem.removeClass('pressed'); })
					.on('mousedown', function (ev) {
						if (ev.which === 3) {
							unselectTiles(elem[0]);
							elem.addClass('pressed').toggleClass('selected');
							$rootScope.$broadcast('tile-select', {
								el: elem,
								data: scope.data,
								selected: elem.hasClass('selected')
							});
						}
					});

			}
		};
	});

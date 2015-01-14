angular.module('app')
	.directive('tile', function ($rootScope, tileSettingsService, sidebarService, Helper) {
		'use strict';

		function unselectTiles () {
			angular.element(document.querySelectorAll('.tile.selected')).removeClass('selected');
			tileSettingsService.toggle(false);
		}

		return {
			restrict: 'EA',
			scope: { data: '=' },
			template: '<a data-id="{{data.id}}" ng-class="cls">' +
				'<i class="fa {{data.icon}}"></i>' +
				'{{data.name}}</a>',
			replace: true,
			link: function (scope, elem/*, attrs*/) {
				scope.cls = (scope.data.url ? 'tile' : 'tile-empty tile-fixed') +
							(scope.data.icon ? ' has-icon' : '');

				$rootScope.$on('body-mousedown', function (ev, args) {
					if (Helper.isTargetIn(args.target, 'tile', 'tile-settings')) return;
					unselectTiles();
				});

				elem.on('mousedown', function (ev) {
						unselectTiles();
						sidebarService.toggle(false);

						// only right-click on normal tiles
						if (ev.which !== 3 && !elem.hasClass('tile-empty')) return;

						// any-click on empty tile
						if (elem.hasClass('tile-empty')) scope.data = { name: '', isNew: true };

						elem.removeClass('tile-empty').addClass('pressed tile selected');
						tileSettingsService.setData(elem, scope.data).toggle(true);
					});

				elem.on('mouseup', function () { elem.removeClass('pressed'); });

			}
		};
	});

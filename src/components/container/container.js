angular.module('app')
	.directive('container', function ($rootScope, $compile, Data) {
		'use strict';

		var _items = [],
			_store = {
				get: function () { return []; },
				set: function (sortable) {
					var ord = sortable.toArray(), l = _items.length;
					if (ord.length > l) ord = ord.slice(0, l);	// trim if added empty
					Data.reorder(ord);
				}
			},
			// _processData = function (data) {
			// 	var groups = {}, g;
			// 	data.forEach(function (item) {
			// 		g = item.group || 'default';
			// 		groups[g] = groups[g] || { items: [] };
			// 		groups[g].name = g;
			// 		groups[g].layout = (g === 'default' ? 'apps' : 'list');
			// 		groups[g].items.push(item);
			// 	});
			// 	return groups;
			// },
			// _initSortables = function () {
			// 	var conts = angular.element(document.querySelectorAll('.wrapper .container'));
			// 	angular.forEach(conts, function (c) {
			// 		_initSortable(c, c.getAttribute('data-layout'));
			// 	});
			// },

			_initSortable = function (el, layout) {
				el.classList.add('layout-' + (layout || 'apps'));
				return new window.Sortable(el, {
					animation: 200,
					draggable: '.tile',
					filter: '.tile-fixed',
					group: 'default',
					scroll: false,
					store: _store
				});
			};

		return {
			restrict: 'EA',
			// scope: true,
			template: '<div class="container">' +
							// 'data-group="{{group.name}}" ' +
							// 'data-layout="{{group.layout}}" ' +
							// 'ng-repeat="group in groups" ' +
							// 'ng-class="\'layout-\' + group.layout">' +
							'<tile ng-repeat="app in items" data="app"></tile>' +
							'<tile data="{}"></tile>' +
						'</div>',
			replace: true,
			link: function (scope, elem) {
				// scope.groups = {};

				Data.query().$promise.then(function (data) {
					scope.items = _items = data;
					// scope.groups = _processData(data);
					// setTimeout(_initSortables, 10);
					_initSortable(elem[0]);
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

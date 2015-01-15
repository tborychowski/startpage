(function () {
    'use strict';

	var
	_el = null,
	_form = null,
	_visible = false,

	_toggle = function (show) {
		var vis = (typeof show === 'undefined' ? !_visible : show);
		if (vis === _visible) return;
		_visible = vis;

		_el.classList.toggle('expanded', _visible);
		document.body.classList.toggle('tile-settings-expanded', _visible);
	},

	_init = function () {
		_el = $.qs('.tile-settings');
		_form = $.qs('form', _el);
		// console.log($.formParams(_form));
	};


	$.tileSettings = {
		toggle: _toggle
	};
	$.on('app/ready', _init);

})();


// angular.module('app')
// 	.directive('tileSettings', function ($rootScope, $compile, tileSettingsService, Data) {
// 		'use strict';

// 		return {
// 			restrict: 'EA',
// 			// scope: true,
// 			templateUrl: 'assets/tile-settings.html',
// 			replace: true,
// 			link: function (scope, elem) {
// 				scope.data = {};
// 				scope.tile = null;

// 				scope.onKeyPress = function (ev) {
// 					if (tileSettingsService.isVisible()) {
// 						if (ev.keyCode === 13) scope.submit();
// 						else if (ev.keyCode === 27) tileSettingsService.toggle(false);
// 					}
// 				};

// 				scope.submit = function () {
// 					if (scope.tileForm.$pristine && scope.tileForm.$valid) {
// 						tileSettingsService.toggle(false);
// 					}
// 					else if (scope.tileForm.$valid) {
// 						scope.data.save = true;
// 						tileSettingsService.toggle(false);
// 					}
// 				};

// 				scope.delete = function () {
// 					if (window.confirm('Are you sure?')) {
// 						Data.delete(scope.data).$promise.then(function (resp) {
// 							scope.data = {};
// 							tileSettingsService.toggle(false);
// 							if (resp.result === 'success') $rootScope.$emit('tiles-reload');
// 						});
// 					}
// 				};


// 				tileSettingsService.onChange(function (visible, tile, data) {
// 					elem.toggleClass('expanded', visible);
// 					document.body.classList.toggle('tile-settings-expanded', visible);
// 					if (visible) {
// 						if (tile) scope.tile = tile;
// 						if (data) scope.data = data;
// 						scope.$apply();
// 						setTimeout(function () {
// 							elem[0].getElementsByTagName('input')[0].select();
// 						}, 0);
// 					}
// 					else {
// 						if (scope.data.save) {
// 							delete scope.data.save;
// 							delete scope.data.isNew;
// 							Data.save(scope.data).$promise.then(function () {
// 								if (scope.data.id) return;
// 								scope.tile.remove();
// 								$rootScope.$emit('tiles-reload');
// 								$rootScope.$emit('tile-add-empty');	// add new +tile
// 							});
// 						}
// 						else if (scope.data.isNew) scope.tile.addClass('tile-empty');
// 						scope.tile.removeClass('selected');
// 					}
// 				});


// 			}
// 		};
// 	});

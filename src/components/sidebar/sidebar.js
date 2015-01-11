angular.module('app')
	.directive('sidebar', function (sidebarService) {
		'use strict';

		return {
			restrict: 'EA',
			template: '<div class="sidebar">settings</div>',
			scope: {},
			replace: true,
			link: function (scope, elem/*, attrs*/) {


				sidebarService.onChange(function (visible) {
					elem.toggleClass('expanded', visible);
				});


			}
		};
	});

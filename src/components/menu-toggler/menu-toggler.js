// angular.module('app')
// 	.directive('menuToggler', function ($rootScope, sidebarService, Helper) {
// 		'use strict';

// 		return {
// 			restrict: 'EA',
// 			template: '<a href="#" class="menu-toggler" ng-click="toggle()">' +
// 					'<span class="menu-toggler-inner"></span>' +
// 					'<span class="menu-toggler-inner"></span>' +
// 					'<span class="menu-toggler-inner"></span>' +
// 				'</a>',
// 			scope: {},
// 			replace: true,
// 			link: function (scope, elem/*, attrs*/) {

// 				scope.toggle = function () {
// 					sidebarService.toggle();
// 				};

// 				sidebarService.onChange(function (visible) {
// 					elem.toggleClass('open', visible);
// 				});

// 				// hide sidebar when body-click (but not on sidebar or menu btn)
// 				$rootScope.$on('body-mousedown', function (ev, args) {
// 					if (Helper.isTargetIn(args.target, 'sidebar', 'menu-toggler')) return;
// 					sidebarService.toggle(false);
// 				});
// 			}
// 		};
// 	});

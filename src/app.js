angular.module('app', [ 'ngResource' ])
	.controller('appCtrl', function ($rootScope) {


		angular.element(document.body).on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev });
		});


	});

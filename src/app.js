angular.module('app', [ 'ngResource' ])
	.controller('appCtrl', function ($rootScope, $scope, Apps) {

		$scope.apps = Apps.get();


		angular.element(document.body).on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev });
		});


	});

angular.module('app', [ 'ngResource' ])
	.controller('appCtrl', function ($rootScope, $scope, Data) {

		$scope.items = Data.query();

		angular.element(document.body).on('mousedown', function (ev) {
			$rootScope.$broadcast('body-mousedown', { ev: ev });
		});


	});

angular.module('app')
	.factory('Data', function ($resource) {
		'use strict';

		return $resource('data/index.php');
	});

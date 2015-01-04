angular.module('app')
	.factory('Data', function ($resource) {
		'use strict';

		return $resource('data/lists.php');

	});
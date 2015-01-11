angular.module('app')
	.service('Data', function ($resource) {
		'use strict';

		var data = $resource('data/index.php');

		return {
			query: function (params) {
				return data.query(params);
			},
			save: function (params) {
				return data.save(params);
			},
			delete: function (params) {
				return data.delete(params);
			},
			reorder: function (params) {
				return data.save(params);
			}
		};

	});

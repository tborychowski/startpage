angular.module('app')
	.factory('Apps', function () {
		'use strict';

		var apps = [
			{ name: 'Gmail' },
			{ name: 'Outlook' },
			{ name: 'RSS' },
			{ name: 'Gmail' },
			{ name: 'Outlook' },
			{ name: 'RSS' },
			{ name: 'Gmail' },
			{ name: 'Outlook' },
			{ name: 'RSS' },
			{ name: 'Gmail' },
			{ name: 'Outlook' },
			{ name: 'RSS' },
		];

		return {
			get: function () {
				return apps;
			}
		};


	});
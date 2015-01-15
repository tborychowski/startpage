/* Appplication Cache - update when change detected */
(function () {
	'use strict';

	var appCache = window.applicationCache,
		onUpdateReady = function () {
			window.alert('Cache updated, please reload');
		};

	appCache.addEventListener('updateready', onUpdateReady);
	if (appCache.status === appCache.UPDATEREADY) onUpdateReady();
}());

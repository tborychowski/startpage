/* Appplication Cache - update when change detected */
'use strict';

function _init () {
	var appCache = window.applicationCache,
		onUpdateReady = function () {
			window.alert('Cache updated, please reload');
		};

	appCache.addEventListener('updateready', onUpdateReady);
	if (appCache.status === appCache.UPDATEREADY) onUpdateReady();
}

module.exports = {
	init: _init
};
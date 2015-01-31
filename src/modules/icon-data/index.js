'use strict';

var $ = require('util'),
	_data,
	_dataPromise,
	load = function () {
		_dataPromise = $.ajax('data/icon-data.php')
			.then(function (data) {
				_data = data;
				return _data;
			});
		return _dataPromise;
	};

module.exports = {
	get: function (forceReload) {
		if (!forceReload && _dataPromise) return _dataPromise;
		return load();
	}
};

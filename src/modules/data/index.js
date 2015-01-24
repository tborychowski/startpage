'use strict';

var ajax = require('util').ajax,
	_data,
	_dataPromise,
	load = function () {
		_dataPromise = ajax('data/index.php')
			.then(function (data) {
				_data = data;
				return _data;
			});
		return _dataPromise;
	},
	groupData = function (data) {
		console.log(data);
		return data;

	};

module.exports = {
	group: groupData,
	get: function (forceReload) {
		if (!forceReload && _dataPromise) return _dataPromise;
		return load();
	},
	getById: function (id) {
		if (!_data) return null;
		for (var i = 0, item; item = _data[i++] ;) {
			if (id === item.id) return item;
		}
		return {};
	},
	save: function (params) {
		return ajax('data/index.php', params);
	},
	del: function (params) {
		return ajax({ url: 'data/index.php', data: params, type: 'json', method: 'DELETE' });
	},
	appendItem: function (item) {
		_data.push(item);
	}
};

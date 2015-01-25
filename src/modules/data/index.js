'use strict';

var $ = require('util'),
	_data,
	_dataPromise,
	load = function () {
		_dataPromise = $.ajax('data/index.php')
			.then(function (data) {
				_data = data;
				return _data;
			});
		return _dataPromise;
	},
	/**
	 * Convert format
	 *    from: [ { name: '1', group: 'g1' }, { name: '2', group: 'g2' } ]
	 *    to:   [ { name: 'g1', items: [ { name: '1', group: '1' }, { name: '2', group: '2' } ]} ]
	 * @param  {array} data - flat array of objects
	 * @return {array}      - nested array of groups
	 */
	groupData = function (data) {
		var groups = {}, g;
		data.forEach(function (item) {
			g = item.group || '0';
			groups[g] = groups[g] || { name: g, items: [] };
			groups[g].items.push(item);
		});
		data = [];
		$.each(groups, function (g) { data.push(g); });
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
		return $.ajax('data/index.php', params);
	},
	del: function (params) {
		return $.ajax({ url: 'data/index.php', data: params, type: 'json', method: 'DELETE' });
	},
	appendItem: function (item) {
		_data.push(item);
	}
};

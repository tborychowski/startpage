'use strict';

var $ = require('util'),
	_run = function (type, action, target) {
		$.trigger(type + '-action', action, target);
	};

module.exports = {
	body: {
		handler: function (action, target) { _run('group', action, target); },
		items: [
			{ name: 'Add new group', action: 'addGroup' },
			{ name: 'Refresh', action: 'refresh' }
		]
	},

	tile: {
		handler: function (action, target) { _run('tile', action, target); },
		items: [
			{ name: 'Edit tile', action: 'edit' },
			{ name: 'Delete tile', action: 'del' }
		]
	},

	group: {
		handler: function (action, target) {
			if (action === 'addTile') _run('tile', action, target);
			else if (action === 'addGroup') _run('group', action, target);
			else _run('group', action, target);
		},
		items: [
			{ name: 'Add new tile', action: 'addTile' },
			'-',
			{ name: 'Group settings', action: 'edit' },
			{ name: 'Delete group', action: 'del' },
			'-',
			{ name: 'Add new group', action: 'addGroup' }

		]
	}
};

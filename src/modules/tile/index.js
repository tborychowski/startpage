'use strict';

var $ = require('util'),
	tileSettings = require('tile-settings'),

	_actionHandler = function (action, target) {
		if (action === 'edit') tileSettings.show(target);
		else if (action === 'del') tileSettings.del(target);
		else if (action === 'addTile') tileSettings.add(target);
	},

	_init = function () {
		$.on('tile-action', _actionHandler);
	};

module.exports = {
	init: _init
};

'use strict';

var $ = require('util'),
	tileSettings = require('tile-settings'),

	_actionHandler = function (action, target) {
		if (action === 'edit') tileSettings.show(target);
		else if (action === 'del') setTimeout(function () { tileSettings.del(target); }, 10);
		else if (action === 'addTile') tileSettings.add(target);
	},

	_init = function () {
		$.on('tile-action', _actionHandler);
	};

module.exports = {
	init: _init
};

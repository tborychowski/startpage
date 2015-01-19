'use strict';

var util = require('util'),
	$ = util.sizzle,
	tileSettings = require('tile-settings');

$.on = util.pubsub.on;
// $.trigger = util.pubsub.trigger;


var
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

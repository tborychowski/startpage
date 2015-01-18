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

	_html = function (tile) {
		return '<div class="tile" data-id="' + tile.id + '" data-menu="tile">' +
				tile.name + '</div>';
	},

	_domEl = function (tile) {
		tile = tile || {};
		var el = document.createElement('div');
		el.className = 'tile';
		el.dataset.id = tile.id || '0';
		el.dataset.menu = 'tile';
		el.innerHTML = tile.name || 'new tile';
		return el;
	},

	_init = function () {
		$.on('tile-action', _actionHandler);
	};

module.exports = {
	init: _init,
	html: _html,
	domEl: _domEl
};

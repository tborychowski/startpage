'use strict';

var $ = require('util'),
	Padlock = require('padlock'),
	Settings = null,//require('tile-settings'),
	_tpl = {
		locked: require('tile/template.html'),
		unlocked: require('tile/template-unlocked.html')
	},


	_updateIcon = function (tile) {
		if (!tile.icon) return tile;
		tile.style = '';
		tile.iconEl = '';
		if (tile.icon.indexOf('fa-') === 0) {
			tile.iconEl = '<i class="fa ' + tile.icon + '"></i>';
			if (tile.group) tile.style = 'padding: 2px 10px 0 7px;';
			else tile.style = '';
		}
		else {
			tile.style = 'background-image: url(img/icons/' + tile.icon + '.png); ' +
				'padding-left:80px;';
			// if (tile.group) tile.style += ''; else tile.style += '';
		}
		return tile;
	},

	_getTemplate = function () {
		var type = (Padlock.isLocked() ? 'locked' : 'unlocked'), tpl = _tpl[type];
		return function (tile) {
			tile = _updateIcon(tile);
			return tpl(tile || {});
		};
	},

	_getTile = function (tile) { return $(_getTemplate()(tile))[0]; },

	_actionHandler = function (action, target) {
		if (action === 'edit') Settings.show(target);
		else if (action === 'del') setTimeout(function () { Settings.del(target); }, 10);
		else if (action === 'addTile') Settings.add(target);
	},

	_init = function () {
		Settings = require('tile-settings');
		$.on('tile-action', _actionHandler);
	};

module.exports = {
	init: _init,
	getTile: _getTile,
	getTemplate: _getTemplate
};

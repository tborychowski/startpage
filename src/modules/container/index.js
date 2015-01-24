'use strict';
var $ = require('util'),
	Data = require('data'),
	Padlock = require('padlock'),

	_data = null,
	_tileTpl = {
		locked: require('tile/template.html'),
		unlocked: require('tile/template-unlocked.html')
	},
	_el = null,
	_sortables = [],


	_initSortable = function (el) {
		return new window.Sortable(el, {
			animation: 200,
			draggable: '.tile',
			group: 'default',
			scroll: false,
			store: {
				get: function () { return []; },
				set: function (sortable) { Data.save(sortable.toArray()); }
			}
		});
	},

	_populate = function (data) {
		if (data) _data = data;
		var groups = [],
			tiles = [],
			tpl = _tileTpl[Padlock.isLocked() ? 'locked' : 'unlocked'];

		_data.forEach(function (tile) { tiles.push(tpl(tile)); });

		groups.push('<div class="container layout-apps" data-menu="group">' +
			tiles.join('') + '</div>');

		_el.innerHTML = groups.join('');
	},

	_enableEvents = function (enable) {
		_populate();
		if (enable) {
			var containers = $.qsa('.container', _el);
			$.forEach(containers, function () {

			});
			_sortables = _initSortable();
		}
		else {
			if (_sortables) _sortables.destroy();
		}
	},

	_init = function () {
		_el = $.qs('.wrapper');
		Data.get().then(Data.group).then(_populate);
		$.on('toggleLock', _enableEvents);
	};

module.exports = {
	init: _init
};

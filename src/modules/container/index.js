'use strict';
var $ = require('util').sizzle,
	Data = require('data'),
	Tile = require('tile'),

	_el = null,

	_initSortable = function (el) {
		return new window.Sortable(el, {
			animation: 200,
			draggable: '.tile',
			// filter: '.tile-fixed',
			group: 'default',
			scroll: false,
			store: {
				get: function () { return []; },
				set: function (sortable) { Data.save(sortable.toArray()); }
			}
		});
	},

	_populate = function (data) {
		var groups = [], tiles = [];
		data.forEach(function (tile) { tiles.push(Tile.html(tile)); });
		groups.push('<div class="container layout-apps" data-menu="group">' + tiles.join('') + '</div>');

		_el.innerHTML = groups.join('');
		_initSortable($.qs('.container', _el));
	},

	_init = function () {
		_el = $.qs('.wrapper');
		Data.get().then(_populate);
	};

module.exports = {
	init: _init
};

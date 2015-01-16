'use strict';
var $ = require('util').sizzle,
	Data = require('data'),

	_el = null,
	_store = {
		get: function () { return []; },
		set: function (sortable) { Data.save(sortable.toArray()); }
	},

	_initSortable = function (el) {
		return new window.Sortable(el, {
			animation: 200,
			draggable: '.tile',
			filter: '.tile-fixed',
			group: 'default',
			scroll: false,
			store: _store
		});
	},

	_getTileHtml = function (tile) {
		return '<div class="tile" data-id="' + tile.id + '">' + tile.name + '</div>';
	},

	_getContainerHtml = function (data) {
		var tiles = [];
		data.forEach(function (tile) {
			tiles.push(_getTileHtml(tile));
		});
		return '<div class="container layout-apps">' + tiles.join('') + '</div>';
	},

	_populate = function (data) {
		_el.innerHTML = _getContainerHtml(data);
		_initSortable($.qs('.container', _el));
	},

	_init = function () {
		_el = $.qs('.wrapper');
		Data.get().then(_populate);
	};

module.exports = _init;

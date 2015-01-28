'use strict';
var $ = require('util'),
	Data = require('data'),
	Padlock = require('padlock'),
	Sortable = require('sortable'),
	Tile = require('tile'),
	IMG = require('image'),

	_isReady = false,
	_data = null,
	_tpl = require('container/template.html'),
	_el = null,
	_sortables = [],
	_saveOrderTimeout = null,

	/*** HELPERS **********************************************************************************/
	_initSortable = function (el) {
		return new Sortable(el, {
			draggable: '.tile',
			group: 'default',
			scroll: false,
			animation: 200,
			onAdd: _tileGroupChanged,
			store: { set: _saveOrder, get: function () { return []; } }
		});
	},
	_initSortables = function () {
		$.each($.qsa('.container', _el), function (c) { _sortables.push(_initSortable(c)); });
	},
	_destroySortables = function () {
		_sortables.forEach(function (s) { s.destroy(); });
		_sortables = [];
	},
	_enableEvents = function (enable) {
		if (!enable) _destroySortables();
		_populate();
		if (enable) _initSortables();
	},
	_saveOrder = function () {
		if (_saveOrderTimeout) window.clearTimeout(_saveOrderTimeout);
		_saveOrderTimeout = window.setTimeout(function () {
			var order = [];
			_sortables.forEach(function (s) { order = order.concat(s.toArray()); });
			Data.save(order);
		}, 300);
	},
	_tileGroupChanged = function (ev) {
		var el = ev.item,
			group = $.closest(el, 'container'),
			item = Data.getById(el.dataset.id);
		if (!item) return;
		item.group = group.dataset.group;
		if (item.group === 'default') item.group = '';
		Data.save(item).then(_saveOrder);
	},
	_groupActionHandler = function (action) {
		if (action === 'refresh') _populate();
		if (action === 'addGroup') {
			var container = $.el(_tpl({
					name: $.qsa('.container', _el).length,
					layout: 'list',
					tiles: ''
				}));
			_el.appendChild(container);
			_sortables.push(_initSortable(container));
		}
	},
	/*** HELPERS **********************************************************************************/



	_populate = function (data) {
		if (data) _data = data;
		if (!_data) return;
		var tileTpl = Tile.getTemplate();

		_el.innerHTML = _data.map(function (group) {
			group.tiles = group.items.map(function (tile) { return tileTpl(tile); });
			return _tpl(group);
		}).join('');

		// update backgrounds
		var tiles = $.qsa('.tile', _el), img;
		$.each(tiles, function (tile) {
			img = tile.style.backgroundImage.slice(5, -2);
			if (img) IMG(img).then(function (c) { tile.style.backgroundColor = c; });
		});
	},


	_init = function () {
		if (_isReady) return;
		_el = $.qs('.wrapper');
		Data.get().then(Data.group).then(_populate).then(function () {
			if (!Padlock.isLocked()) _initSortables();
		});
		$.on('toggleLock', _enableEvents);
		$.on('group-action', _groupActionHandler);
		_isReady = true;
	};

module.exports = {
	init: _init
};

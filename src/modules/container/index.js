'use strict';
var $ = require('util'),
	Data = require('data'),
	Padlock = require('padlock'),
	Sortable = require('sortablejs'),
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
		_el.find('.container').forEach(function(c) {
			_sortables.push(_initSortable(c));
		});
	},
	_destroySortables = function () {
		_sortables.forEach(function (s) { s.destroy(); });
		_sortables = [];
	},
	_enableEvents = function (enable) {
		if (!enable) {
			_destroySortables();
			Data.get(true).then(Data.group).then(_populate);
		}
		else {
			_populate();
			_initSortables();
		}
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
			group = $(el).closest('.container'),
			item = Data.getById(el.dataset.id);
		if (!item) return;
		item.group = group.dataset.group;
		if (item.group === 'default') item.group = '';
		Data.save(item).then(_saveOrder);
	},
	_groupActionHandler = function (action) {
		if (action === 'refresh') _populate();
		if (action === 'addGroup') {
			var container = $(_tpl({
					name: _el.find('.container').length,
					layout: 'list',
					tiles: ''
				})).appendTo(_el);
			_sortables.push(_initSortable(container));
		}
	},
	/*** HELPERS **********************************************************************************/



	_populate = function (data) {
		if (data) _data = data;
		if (!_data) return;
		var tileTpl = Tile.getTemplate();

		_el[0].innerHTML = _data.map(function (group) {
			group.tiles = group.items.map(function (tile) { return tileTpl(tile); });
			return _tpl(group);
		}).join('');

		// update backgrounds
		var tiles = _el.find('.tile'), img;
		tiles.forEach(function (tile) {
			img = tile.style.backgroundImage.replace(/^url\("?/, '').replace(/"?\)$/, '');
			if (img) IMG(img).then(function (c) { tile.style.backgroundColor = c; });
		});
	},


	_init = function () {
		if (_isReady) return;
		_el = $('.wrapper');
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

import $ from 'util';
import Data from 'data';
import Padlock from 'padlock';
import Sortable from 'sortablejs';
import Tile from 'tile';
import IMG from 'image';

var _tpl = require('container/template.html'),
	_isReady = false,
	_data = null,
	_el = null,
	_sortables = [],
	_saveOrderTimeout = null;


/*** HELPERS **********************************************************************************/
function _initSortable (el) {
	return new Sortable(el, {
		draggable: '.tile',
		group: 'default',
		scroll: false,
		animation: 200,
		onAdd: _tileGroupChanged,
		store: { set: _saveOrder, get: () => [] }
	});
}

function _initSortables () {
	_el.find('.container').forEach((c) => _sortables.push(_initSortable(c)));
}

function _destroySortables () {
	_sortables.forEach((s) => s.destroy());
	_sortables = [];
}

function _enableEvents (enable) {
	if (!enable) {
		_destroySortables();
		Data.get(true).then(Data.group).then(_populate);
	}
	else {
		_populate();
		_initSortables();
	}
}

function _saveOrder () {
	if (_saveOrderTimeout) window.clearTimeout(_saveOrderTimeout);
	_saveOrderTimeout = window.setTimeout(() => {
		let order = _sortables.reduce((p, c) => p.concat(c.toArray()), []);
		Data.save(order);
	}, 300);
}

function _tileGroupChanged (ev) {
	var el = ev.item,
		group = $(el).closest('.container'),
		item = Data.getById(el.dataset.id);
	if (!item) return;
	item.group = group.dataset.group;
	if (item.group === 'default') item.group = '';
	Data.save(item).then(_saveOrder);
}

function _groupActionHandler (action) {
	if (action === 'refresh') _populate();
	if (action === 'addGroup') {
		var container = $(_tpl({
				name: _el.find('.container').length,
				layout: 'list',
				tiles: ''
			})).appendTo(_el);
		_sortables.push(_initSortable(container[0]));
	}
}
/*** HELPERS **********************************************************************************/



function _populate (data) {
	if (data) _data = data;
	if (!_data) return;
	var tileTpl = Tile.getTemplate();

	_el[0].innerHTML = _data.map((group) => {
		group.tiles = group.items.map((tile) => tileTpl(tile));
		return _tpl(group);
	}).join('');

	// update backgrounds
	var tiles = _el.find('.tile'), img;
	tiles.forEach((tile) => {
		img = tile.style.backgroundImage.replace(/^url\("?/, '').replace(/"?\)$/, '');
		if (img) IMG(img).then((c) => tile.style.backgroundColor = c);
	});
}


function init () {
	if (_isReady) return;
	_el = $('.wrapper');
	Data.get().then(Data.group).then(_populate).then(() => {
		if (!Padlock.isLocked()) _initSortables();
	});
	$.on('toggleLock', _enableEvents);
	$.on('group-action', _groupActionHandler);
	_isReady = true;
}

export default { init };

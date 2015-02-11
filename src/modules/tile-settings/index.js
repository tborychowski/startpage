import $ from 'util';
import IconSelector from 'icon-selector';
import Tile from 'tile';

import IMG from 'image';
import Data from 'data';
import Padlock from 'padlock';


var tpl = require('./template.html'),

	_el = null,
	_firstInput	 = null,
	_form = null,
	_target = { el: null, item: null },
	_visible = false,
	_isReady = false;



/*** EVENT HANDLERS ***************************************************************************/
function _mousedown (ev) {
	if (!$(ev.target).isIn('tile-settings', 'icon-selector')) _toggle(false);
}
function _keyDown (ev) {
	if (!_visible) return;
	if (ev.keyCode === 13) _formSubmit();
	else if (ev.keyCode === 27) _toggle(false);
}
function _formSubmit () {
	var newItem = _form.get(), tile, img;
	if (!newItem.name || !newItem.url) return;
	newItem = _sanitizeItem(newItem, ['name', 'url', 'icon']);
	Data.save(newItem).then(item => {
		if (!newItem.id) Data.appendItem(item);
		if (_target.el) {
			tile = Tile.getTile(item);
			_target.el.parentNode.replaceChild(tile, _target.el);
		}
		// color bg
		if (tile) img = tile.style.backgroundImage.replace(/^url\("?/, '').replace(/"?\)$/, '');
		if (img) IMG(img).then(c => tile.style.backgroundColor = c);

		_toggle(false);
	});
}

function _actionHandler (action, target) {
	if (action === 'edit') _show(target);
	else if (action === 'del') setTimeout(() => _deleteTile(target), 10);
	else if (action === 'addTile') _addTile(target);
}

/*** EVENT HANDLERS ***************************************************************************/



/*** HELPERS **********************************************************************************/
function _sanitizeItem (item, fields) {
	fields.forEach(f => item[f] = $.sanitize(item[f]));
	return item;
}
function _getTarget (target) {
	_target.el = target;
	_target.item = Data.getById(_target.el.dataset.id);
	_target.el.classList.add('selected');
}
function _enableEvents (enable) {
	if (enable) {
		$(document)
			.on('keydown', _keyDown)
			.on('mousedown', _mousedown);
	}
	else {
		$(document)
			.on('keydown', _keyDown)
			.on('mousedown', _mousedown);
	}
}
/*** HELPERS **********************************************************************************/



/*** API **************************************************************************************/
function _addTile (target) {
	var item = { name: 'new tile', id: 0, group: target.dataset.group };
	_target.el = Tile.getTile(item);
	$(target).append(_target.el);
	_show(_target.el, item);
}

function _deleteTile (target) {
	if (!_target.el) _getTarget(target);
	var el = _target.el;
	if (window.confirm('Are you sure you wish to delete "' + _target.item.name + '"?')) {
		Data.del(_target.item).then(() => el.remove());
	}
	_toggle(false, true);
}

function _show (target, item) {
	if (!target || !target.dataset.id) return;
	_getTarget(target);
	_form.set(item || _target.item, true);
	_toggle(true);
}

function _toggle (show, force) {
	if (!_isReady) _init();

	var vis = (typeof show === 'undefined' ? !_visible : show);
	if (vis === _visible && !force) return;
	_visible = vis;

	_el[0].classList.toggle('expanded', _visible);
	document.body.classList.toggle('tile-settings-expanded', _visible);
	_target.el.classList.toggle('selected', _visible);
	if (_visible) setTimeout(() => _firstInput.select(), 0);
	else {
		if (!_target.item.id) _target.el.remove();
		_target = {};
	}
	$.trigger('tile-settings/' + (_visible ? 'show' : 'hide'));
}
/*** API **************************************************************************************/


function _init () {
	if (_isReady) return;

	_el = $(tpl()).appendTo(document.body);
	_firstInput = _el.find('input')[0];
	_form = new $.form(_el[0]);

	_el.find('.btn-delete').on('click', _deleteTile);
	_el.find('form').on('submit', ev => {
		ev.preventDefault();
		_formSubmit();
	});

	$.on('toggleLock', _enableEvents);
	$.on('tile-action', _actionHandler);

	if (!Padlock.isLocked()) _enableEvents(true);

	IconSelector(_el.find('.icon-selector-target'));

	_isReady = true;
}


export default {
	init: _init,
	toggle: _toggle,
	show: _show,
	del: _deleteTile,
	add: _addTile
};

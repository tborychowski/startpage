'use strict';

var $ = require('util'),
	tpl = require('./template.html'),
	Data = require('data'),
	Padlock = require('padlock'),
	Tile = require('tile'),

	_el = null,
	_firstInput	 = null,
	_form = null,
	_target = { el: null, item: null },
	_visible = false,
	_isReady = false,



	/*** EVENT HANDLERS ***************************************************************************/
	_mousedown = function (ev) { if (!$.isIn(ev.target, 'tile-settings')) _toggle(false); },
	_keyDown = function (ev) {
		if (!_visible) return;
		if (ev.keyCode === 13) _formSubmit();
		else if (ev.keyCode === 27) _toggle(false);
	},
	_formSubmit = function () {
		var newItem = _form.get();
		if (!newItem.name || !newItem.url) return;
		Data.save(newItem).then(function (item) {
			if (!newItem.id) Data.appendItem(item);
			if (_target.el) _target.el.parentNode.replaceChild(Tile.getTile(item), _target.el);
			_toggle(false);
		});
	},
	/*** EVENT HANDLERS ***************************************************************************/



	/*** HELPERS **********************************************************************************/
	_getTarget = function (target) {
		_target.el = target;
		_target.item = Data.getById(_target.el.dataset.id);
		_target.el.classList.add('selected');
	},
	_enableEvents = function (enable) {
		if (enable) {
			document.addEventListener('keydown', _keyDown);
			document.addEventListener('mousedown', _mousedown);
		}
		else {
			document.removeEventListener('keydown', _keyDown);
			document.removeEventListener('mousedown', _mousedown);
		}
	},
	/*** HELPERS **********************************************************************************/



	/*** API **************************************************************************************/
	_addTile = function (target) {
		_target.el = Tile.getTile({ name: 'new tile', id: 0 });
		target.appendChild(_target.el);
		_show(_target.el);
	},

	_deleteTile = function (target) {
		if (!_target.el) _getTarget(target);
		var el = _target.el;
		if (window.confirm('Are you sure you wish to delete "' + _target.item.name + '"?')) {
			Data.del(_target.item).then(function () {
				el.remove();
			});
		}
		_toggle(false, true);
	},

	_show = function (target) {
		if (!target || !target.dataset.id) return;
		_getTarget(target);
		_form.set(_target.item, true);
		_toggle(true);
	},

	_toggle = function (show, force) {
		if (!_isReady) _init();

		var vis = (typeof show === 'undefined' ? !_visible : show);
		if (vis === _visible && !force) return;
		_visible = vis;

		_el.classList.toggle('expanded', _visible);
		document.body.classList.toggle('tile-settings-expanded', _visible);
		_target.el.classList.toggle('selected', _visible);
		if (_visible) setTimeout(function () { _firstInput.select(); }, 0);
		else {
			if (!_target.item.id) _target.el.remove();
			_target = {};
		}
	},
	/*** API **************************************************************************************/


	_init = function () {
		if (_isReady) return;

		_el = $.el(tpl());
		document.body.appendChild(_el);
		_firstInput = $.qs('input', _el);
		_form = new $.form(_el);

		$.qs('.btn-delete', _el).addEventListener('click', _deleteTile);
		$.qs('form', _el).addEventListener('submit', function (ev) {
			ev.preventDefault();
			_formSubmit();
		});

		$.on('toggleLock', _enableEvents);
		if (!Padlock.isLocked()) _enableEvents(true);

		_isReady = true;
	};


module.exports = {
	init: _init,
	toggle: _toggle,
	show: _show,
	del: _deleteTile,
	add: _addTile
};

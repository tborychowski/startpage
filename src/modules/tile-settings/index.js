'use strict';

var $ = require('util'),
	Data = require('data'),
	tileTpl = require('tile/template.html'),
	Form = $.form,

	_el = null,
	_firstInput	 = null,
	_form = null,
	_target = { el: null, item: null },
	_visible = false,
	_isReady = false,

	_mousedown = function (ev) { if (!$.isIn(ev.target, 'tile-settings')) _toggle(false); },
	_keyDown = function (ev) {
		if (!_visible) return;
		if (ev.keyCode === 13) _formSubmit();
		else if (ev.keyCode === 27) _toggle(false);
	},

	_getTarget = function (target) {
		_target.el = target;
		_target.item = Data.getById(_target.el.dataset.id);
		_target.el.classList.add('selected');
	},

	_add = function (target) {
		_target.el = $.el(tileTpl({ name: 'new tile', id: 0 }));
		target.appendChild(_target.el);
		_show(_target.el);
	},

	_delete = function (target) {
		if (!_target.el) _getTarget(target);
		//TODO: add confirm
		Data.del(_target.item).then(function () {
			_target.el.remove();
			_target = {};
		});
		_toggle(false);
	},

	_formSubmit = function () {
		var newItem = _form.get();
		Data.save(newItem).then(function (item) {
			if (!newItem.id) {
				_target.el.parentNode.replaceChild($.el(tileTpl(item)), _target.el);
				Data.appendItem(item);
				_toggle(false);
			}
		});
	},


	_show = function (target) {
		if (!target || !target.dataset.id) return;
		_getTarget(target);
		_form.set(_target.item, true);
		_toggle(true);
	},

	_toggle = function (show) {
		if (!_isReady) _init();

		var vis = (typeof show === 'undefined' ? !_visible : show);
		if (vis === _visible) return;
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

	_init = function () {
		_el = $.qs('.tile-settings', document.body);
		var formElem = $.qs('form', _el),
			btnDel = $.qs('.btn-delete', formElem);

		_firstInput = $.qs('input', formElem);
		_form = new Form(formElem);

		formElem.addEventListener('submit', function (ev) { ev.preventDefault(); });
		btnDel.addEventListener('click', _delete);

		$.on('toggleLock', _enableEvents);

		_isReady = true;
	};


module.exports = {
	init: _init,
	toggle: _toggle,
	show: _show,
	del: _delete,
	add: _add
};

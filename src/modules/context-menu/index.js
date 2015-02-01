'use strict';

var $ = require('util'),
	_menus = require('./config'),
	Padlock = require('padlock'),
	tpl = require('./template.html'),

	_el = null,
	_visible = false,
	_target = null,
	_type = null,
	_isReady = false,

	_mousedown = function (ev) {
		var target = $(ev.target);
		if (target.isIn('menu-item')) return _action(ev.target);
		if (target.isIn('context-menu')) return;
		_toggle(false);
	},

	_action = function (el) {
		if (!el) return;
		if (_menus[_type].handler(el.dataset.action, _target) !== false) _toggle(false);
	},

	_toggle = function (show) {
		if (!_isReady) _init();
		var vis = (typeof show === 'undefined' ? !_visible : show);
		if (vis === _visible) return;
		_visible = vis;
		_el[0].classList.toggle('open', _visible);
		if (!_visible) _position();
	},

	_hide = function () { _toggle(false); },
	_show = function (ev) {
		_target = ev.target;
		if (!_target.dataset.menu) _target = _target.parentNode;	//TODO: improve this!
		if (!_target.dataset.menu) return;
		if (_type !== _target.dataset.menu) {
			_type = _target.dataset.menu;
			if (_menus[_type]) _el[0].innerHTML = tpl(_menus[_type]);
		}
		ev.preventDefault();
		_position(ev);
		_toggle(true);
	},

	_position = function (ev) {
		if (!ev) ev = { clientX: -1000, clientY: -1000 };
		_el[0].style.left = ev.clientX + 'px';
		_el[0].style.top = ev.clientY + 'px';
	},

	_enableEvents = function (enable) {
		if (enable) {
			$(document)
				.on('contextmenu', _show)
				.on('mousedown', _mousedown);
			$('.main').on('scroll', _hide);
		}
		else {
			$(document)
				.off('contextmenu', _show)
				.off('mousedown', _mousedown);
			$('.main').off('scroll', _hide);
		}
	},

	_init = function () {
		if (_isReady) return;
		_el = $('<ul class="context-menu"></ul>').appendTo(document.body);
		$.on('toggleLock', _enableEvents);
		if (!Padlock.isLocked()) _enableEvents(true);
		_isReady = true;
	};


module.exports = {
	init: _init,
	toggle: _toggle
};


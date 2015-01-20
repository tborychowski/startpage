'use strict';

var $ = require('util').sizzle,
	_menus = require('./config'),

	_el = null,
	_body = null,
	_visible = false,
	_target = null,
	_type = null,
	_isReady = false,

	_mousedown = function (ev) {
		if ($.isIn(ev.target, 'menu-item')) return _action(ev.target);
		if ($.isIn(ev.target, 'context-menu')) return;
		ev.stopPropagation();
		_toggle(false);
	},

	_action = function (el) {
		if (!el) return;
		var action = el.dataset.action;
		if (_menus[_type].handler(action, _target) !== false) _toggle(false);
	},

	_toggle = function (show) {
		if (!_isReady) _init();

		var vis = (typeof show === 'undefined' ? !_visible : show);
		if (vis === _visible) return;
		_visible = vis;
		_el.classList.toggle('open', _visible);
		if (!_visible) _position();
	},

	_hide = function () { _toggle(false); },
	_show = function (ev) {
		_target = ev.target;
		if (!_target.dataset.menu) _target = _target.parentNode;	//TODO: improve this!
		if (!_target.dataset.menu) return;
		if (_type !== _target.dataset.menu) {
			_type = _target.dataset.menu;
			_populate();
		}
		ev.preventDefault();
		_position(ev);
		_toggle(true);
	},

	_position = function (ev) {
		if (!ev) ev = { clientX: -1000, clientY: -1000 };
		_el.style.left = ev.clientX + 'px';
		_el.style.top = ev.clientY + 'px';
	},

	_populate = function () {
		if (!_menus[_type]) return;
		var items = [];
		_menus[_type].items.forEach(function (item) {
			if (item === '-') items.push('<li class="menu-item separator"></li>');
			else items.push('<li class="menu-item" data-action="' + item.action + '">' +
				item.name + '</li>');
		});
		_el.innerHTML = items.join('');
	},

	_enableEvents = function (enable) {
		if (enable) {
			document.addEventListener('contextmenu', _show);
			document.addEventListener('mousedown', _mousedown);
			$.qs('.main').addEventListener('scroll', _hide);
		}
		else {
			document.removeEventListener('contextmenu', _show);
			document.removeEventListener('mousedown', _mousedown);
			$.qs('.main').removeEventListener('scroll', _hide);
		}
	},

	_init = function () {
		_body = document.body;
		_el = document.createElement('ul');
		_el.className = 'context-menu';
		_body.appendChild(_el);
		_populate();
		$.on('toggleLock', _enableEvents);
		_isReady = true;
	};


module.exports = {
	init: _init,
	toggle: _toggle
};


'use strict';

var $ = require('util'),
	IconData = require('icon-data'),
	tpl = require('./template.html'),
	_el = null,
	_target = null,
	_visible = false,
	_data = [],
	_isReady = false,

	_animCb = function () { if (!_visible) _el.style.display = 'none'; },

	_onClick = function (e) {
		if (!e || !e.target) return;
		if ($.isIn(e.target, 'icon') && e.target.dataset) {
			_target.value = e.target.dataset.name;
		}
		e.preventDefault();
		_target.focus();
	},

	_position = function () {
		var els = _el.getBoundingClientRect(), ts = _target.getBoundingClientRect();
		_el.style.top = (ts.top - els.height - 7) + 'px';
		_el.style.left = (ts.left + (ts.width - els.width) / 2) + 'px';
	},

	_toggle = function (show, force) {
		if (!_isReady) _init();
		var vis = (typeof show === 'boolean' ? show : !_visible);
		if (vis === _visible && !force) return;
		_visible = vis;
		_el.style.opacity = +_visible;
		if (_visible) {
			_el.style.display = 'block';
			_position();
		}
	},
	_show = function () { _toggle(true); },
	_hide = function () { _toggle(false); },

	_populate = function (data) {
		if (data) _data = data;
		var html = [];
		_data.forEach(function (theme) {
			html.push('<h1 class="header">' + theme.name + '</h1>');
			if (theme.icons) theme.icons.forEach(function (icon) {
				html.push(tpl(icon));
			});
		});
		html.push('<div class="footer"></div>');
		$.qs('.icon-selector-wrapper', _el).innerHTML = html.join('');
	},

	_init = function (target) {
		if (_isReady || !target) return;
		_target = target;
		_el = $.el('<div class="icon-selector"><div class="icon-selector-wrapper"></div></div>');
		document.body.appendChild(_el);
		IconData.get().then(_populate);

		_target.addEventListener('focus', _show);
		_target.addEventListener('blur', _hide);
		_el.addEventListener('mousedown', _onClick);
		_el.addEventListener('transitionend', _animCb);

		$.on('tile-settings/hide', _hide);

		_isReady = true;
	};


module.exports = {
	init: _init
};

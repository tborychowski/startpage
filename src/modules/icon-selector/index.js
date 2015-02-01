'use strict';

var $ = require('util'),
	IconData = require('data-icons'),
	tpl = require('./template.html'),
	_el = null,
	_target = null,
	_visible = false,
	_data = [],
	_isReady = false,

	_animCb = function () { if (!_visible) _el[0].style.display = 'none'; },

	_onClick = function (e) {
		if (!e || !e.target) return;
		if ($(e.target).isIn('icon') && e.target.dataset) {
			_target[0].value = e.target.dataset.name;
			_toggle(false);
		}
		e.preventDefault();
		_target[0].focus();
	},

	_position = function () {
		var els = _el[0].getBoundingClientRect(), ts = _target[0].getBoundingClientRect();
		_el[0].style.top = (ts.top - els.height - 7) + 'px';
		_el[0].style.left = (ts.left + (ts.width - els.width) / 2) + 'px';
	},

	_toggle = function (show, force) {
		if (!_isReady) _init();
		var vis = (typeof show === 'boolean' ? show : !_visible);
		if (vis === _visible && !force) return;
		_visible = vis;
		_el[0].style.opacity = +_visible;
		if (_visible) {
			_el[0].style.display = 'block';
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
		_el.find('.icon-selector-wrapper')[0].innerHTML = html.join('');
	},

	_init = function (target) {
		if (_isReady || !target) return;
		_target = target;
		_el = $('<div class="icon-selector"><div class="icon-selector-wrapper"></div></div>')
			.appendTo(document.body);

		IconData.get().then(_populate);

		_target
			.on('focus', _show)
			.on('click', _show)
			.on('blur', _hide);
		_el.on('mousedown', _onClick);
		_el.on('transitionend', _animCb);

		$.on('tile-settings/hide', _hide);

		_isReady = true;
	};


module.exports = {
	init: _init
};

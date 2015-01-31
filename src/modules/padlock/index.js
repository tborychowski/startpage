'use strict';

var $ = require('util'),
	Data = require('data-auth'),
	tpl = require('./template.html'),
	_el = null,
	_icon = null,
	_form = null,
	_isReady = false,
	_unlocked = false,
	_title = ['Unlock', 'Lock'],
	_iconTypes = {
		locked: 'fa fa-lock',
		unlocked: 'fa fa-unlock-alt',
		loading: 'loading'
	},


	_submit = function () {
		_setIcon('loading');
		Data.verify(_form.get()).then(function (resp) {
			if (resp.result === 'success') {
				_setIcon('unlocked');
				_toggle(true, true);
			}
			else _setIcon('locked');
		});
	},

	_onClick = function (e) {
		if ($.isIn(e.target, 'authbox')) return;
		if (_unlocked) return _toggle(false);

		Data.auth().then(function (resp) {
			_el.classList.add('open');
			if (resp.result === 'success') _toggle(true, true);
		});
	},

	_setIcon = function (type) {
		_icon.className = _iconTypes[type];
		_el.classList.toggle('unlocked', type === 'unlocked');
	},

	_toggle = function (unlock, force, initial) {
		if (!_isReady) _init();

		var unl = (typeof unlock === 'boolean' ? unlock : !_unlocked);
		if (unl === _unlocked && !force) return;
		_unlocked = unl;

		_el.title = _title[+_unlocked];
		_setIcon(_unlocked ? 'unlocked' : 'locked');
		document.body.classList.toggle('unlocked', _unlocked);
		if (!_unlocked) _el.classList.remove('open');
		if (!initial) $.trigger('toggleLock', _unlocked);
	},


	_init = function () {
		if (_isReady) return;
		_el = $.el(tpl());
		_form = new $.form(_el);
		_icon = $.qs('.fa', _el);

		$.qs('.main', document.body).appendChild(_el);

		_el.addEventListener('mousedown', _onClick);
		$.qs('.auth-form', _el).addEventListener('submit', function (e) {
			e.preventDefault();
			_submit();
		});

		_isReady = true;
		_toggle(_unlocked, true, true);
	};


module.exports = {
	init: _init,
	isLocked: function () { return !_unlocked; }
};

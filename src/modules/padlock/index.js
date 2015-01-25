'use strict';

var $ = require('util'),
	_el = null,
	_isReady = false,
	_unlocked = false,
	_title = ['Unlock', 'Lock'],
	_cls = ['fa fa-lock', 'fa fa-unlock-alt'],

	_toggle = function (unlock, force) {
		if (!_isReady) _init();

		var unl = (typeof unlock === 'boolean' ? unlock : !_unlocked);
		if (unl === _unlocked && !force) return;
		_unlocked = unl;

		_el.className = _cls[+_unlocked];
		_el.title = _title[+_unlocked];
		document.body.classList.toggle('unlocked', _unlocked);
		$.trigger('toggleLock', _unlocked);
	},

	_init = function () {
		if (_isReady) return;
		_el = $.el('<a id="padlock" href="#"><a>');
		$.qs('.main', document.body).appendChild(_el);
		_el.addEventListener('click', _toggle);

		_isReady = true;
		_toggle(_unlocked, true);
	};


module.exports = {
	init: _init,
	isLocked: function () { return !_unlocked; }
};

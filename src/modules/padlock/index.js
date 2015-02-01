'use strict';

var $ = require('util'),
	Data = require('data-auth'),
	tpl = require('./template.html'),

	_el = null,
	_btnLock = null,
	_form = null,
	_isReady = false,
	_unlocked = false,
	_opened = false,
	_iconTypes = {
		locked: 'fa fa-lock',
		unlocked: 'fa fa-unlock-alt',
		loading: 'loading'
	},



	/*** HELPERS **********************************************************************************/
	_setIcon = function (type) {
		_btnLock[0].className = _iconTypes[type];
		_el[0].classList.toggle('unlocked', type === 'unlocked');
	},

	_toggleBox = function (show) {
		_el[0].classList.toggle('open', show);
		_opened = show;
	},

	_toggleLock = function (unlock) {
		_unlocked = unlock;
		if (!_unlocked) _toggleBox(false);
		_el.title = (_unlocked ? 'Lock' : 'Unlock');
		_setIcon(_unlocked ? 'unlocked' : 'locked');
		document.body.classList.toggle('unlocked', _unlocked);
		$.trigger('toggleLock', _unlocked);
	},
	/*** HELPERS **********************************************************************************/




	/*** EVENT HANDLERS ***************************************************************************/
	_submit = function () {
		_setIcon('loading');
		Data.verify(_form.get()).then(function (resp) {
			_form.clear();
			if (resp.result === 'success') {
				_setIcon('unlocked');
				_toggleLock(true);
			}
			else {
				_setIcon('locked');
				_toggleLock(false);
			}
		});
	},

	_onLogout = function () {
		Data.logout().then(function () {
			_toggleLock(false);
		});
	},

	_onClick = function (e) {
		if (_opened) _toggleBox(false);
		if (_unlocked) return _toggleLock(false);

		if ($(e.target).closest('.authbox')) return;
		Data.auth().then(function (resp) {
			if (resp.msg === 'verify')_toggleBox(true);
			else _toggleLock(true);
		});
	},
	/*** EVENT HANDLERS ***************************************************************************/



	_init = function () {
		if (_isReady) return;
		_el = $(tpl()).appendTo($('.main'));
		_form = new $.form(_el[0]);
		_btnLock = _el.find('.fa-lock');

		// attach events
		_btnLock.on('click', _onClick);
		_el.find('.fa-sign-out').on('click', _onLogout);
		_el.find('.auth-form').on('submit', function (e) {
			e.preventDefault();
			_submit();
		});

		_isReady = true;
	};


module.exports = {
	init: _init,
	isLocked: function () { return !_unlocked; }
};

import $ from 'util';
import Auth from 'data-auth';

var tpl = require('./template.html'),
	_el = null,
	_btnLock = null,
	_isReady = false,
	_unlocked = false,
	_validated = false,
	_iconTypes = {
		locked: 'fa fa-lock',
		unlocked: 'fa fa-unlock-alt'
	};


function setIcon (type) {
	_btnLock[0].className = _iconTypes[type];
	_el[0].classList.toggle('unlocked', type === 'unlocked');
}

function toggleLock (unlock) {
	_unlocked = unlock;
	_el.title = (_unlocked ? 'Lock' : 'Unlock');
	setIcon(_unlocked ? 'unlocked' : 'locked');
	document.body.classList.toggle('unlocked', _unlocked);
	$.trigger('toggleLock', _unlocked);
}

function logout () { Auth.logout().then(() => toggleLock(_validated = false)); }

function login () {
	if (_unlocked) return toggleLock(false);
	if (_validated) return toggleLock(true);
	Auth.login().then(valid => {
		toggleLock(_validated = valid);
		if (!valid) console.error('Unknown user!');
	});
}

function checkOnline () { _el[0].classList.toggle('online', Auth.isOnline()); }

function init () {
	if (_isReady) return;
	_el = $(tpl()).appendTo($('.main'));
	_btnLock = _el.find('.fa-lock');

	_btnLock.on('click', login);
	_el.find('.fa-sign-out').on('click', logout);

	setTimeout(checkOnline, 1000);

	_isReady = true;
}


export default {
	init,
	isLocked: () => { return !_unlocked; }
};

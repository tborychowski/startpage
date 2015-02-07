import $ from 'util';
import Data from 'data-auth';

var tpl = require('./template.html'),

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
	};



/*** HELPERS **************************************************************************************/
function setIcon (type) {
	_btnLock[0].className = _iconTypes[type];
	_el[0].classList.toggle('unlocked', type === 'unlocked');
}

function toggleBox (show) {
	_el[0].classList.toggle('open', show);
	_opened = show;
}

function toggleLock (unlock) {
	_unlocked = unlock;
	if (!_unlocked) toggleBox(false);
	_el.title = (_unlocked ? 'Lock' : 'Unlock');
	setIcon(_unlocked ? 'unlocked' : 'locked');
	document.body.classList.toggle('unlocked', _unlocked);
	$.trigger('toggleLock', _unlocked);
}
/*** HELPERS **************************************************************************************/




/*** EVENT HANDLERS *******************************************************************************/
function submit () {
	setIcon('loading');
	Data.verify(_form.get()).then(resp => {
		_form.clear();
		if (resp.result === 'success') {
			setIcon('unlocked');
			toggleLock(true);
		}
		else {
			setIcon('locked');
			// toggleLock(false);
		}
	});
}

function onClick (e) {
	if (_unlocked) return toggleLock(false);
	if (_opened) return toggleBox(false);

	if ($(e.target).closest('.authbox')) return;
	Data.auth().then(resp => {
		if (resp.msg === 'verify') toggleBox(true);
		else if (resp.result === 'success') toggleLock(true);
		else toggleBox(true);
	});
}
/*** EVENT HANDLERS *******************************************************************************/



function init () {
	if (_isReady) return;
	_el = $(tpl()).appendTo($('.main'));
	_form = new $.form(_el[0]);
	_btnLock = _el.find('.fa-lock');

	// attach events
	_btnLock.on('click', onClick);
	_el.find('.fa-sign-out').on('click', () => { Data.logout().then(() => toggleLock(false)); });
	_el.find('.auth-form').on('submit', e => {
		e.preventDefault();
		submit();
	});

	_isReady = true;
}


export default {
	init,
	isLocked: () => { return !_unlocked; }
};

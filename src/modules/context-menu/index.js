import $ from 'util';
import Padlock from 'padlock';
import _menus from './config';

var tpl = require('./template.html'),
	_el = null,
	_visible = false,
	_target = null,
	_type = null,
	_isReady = false;


function mousedown (ev) {
	let target = $(ev.target);
	if (target.isIn('menu-item')) return action(ev.target);
	if (target.isIn('context-menu')) return;
	toggle(false);
}

function action (el) {
	if (!el) return;
	if (_menus[_type].handler(el.dataset.action, _target) !== false) toggle(false);
}

function toggle (show) {
	if (!_isReady) init();
	let vis = (typeof show === 'undefined' ? !_visible : show);
	if (vis === _visible) return;
	_visible = vis;
	_el[0].classList.toggle('open', _visible);
	if (!_visible) position();
}

function hide () { toggle(false); }
function show (ev) {
	_target = ev.target;
	if (!_target.dataset.menu) _target = _target.parentNode;	//TODO: improve this!
	if (!_target.dataset.menu) return;
	if (_type !== _target.dataset.menu) {
		_type = _target.dataset.menu;
		if (_menus[_type]) _el[0].innerHTML = tpl(_menus[_type]);
	}
	ev.preventDefault();
	position(ev);
	toggle(true);
}

function position (ev) {
	if (!ev) ev = { clientX: -1000, clientY: -1000 };
	_el[0].style.left = ev.clientX + 'px';
	_el[0].style.top = ev.clientY + 'px';
}

function enableEvents (enable) {
	if (enable) {
		$(document)
			.on('contextmenu', show)
			.on('mousedown', mousedown);
		$('.main').on('scroll', hide);
	}
	else {
		$(document)
			.off('contextmenu', show)
			.off('mousedown', mousedown);
		$('.main').off('scroll', hide);
	}
}

function init () {
	if (_isReady) return;
	_el = $('<ul class="context-menu"></ul>').appendTo(document.body);
	$.on('toggleLock', enableEvents);
	if (!Padlock.isLocked()) enableEvents(true);
	_isReady = true;
}


export default { init, toggle };

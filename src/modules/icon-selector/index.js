import $ from 'util';
import IconData from 'data-icons';

var tpl = require('./template.html'),
	_el = null,
	_target = null,
	_visible = false,
	_data = [],
	_isReady = false;

function onClick (e) {
	if (!e || !e.target) return;
	if ($(e.target).isIn('icon') && e.target.dataset) {
		_target[0].value = e.target.dataset.name;
		toggle(false);
	}
	e.preventDefault();
	_target[0].focus();
}

function position () {
	var els = _el[0].getBoundingClientRect(), ts = _target[0].getBoundingClientRect();
	_el[0].style.top = (ts.top - els.height - 7) + 'px';
	_el[0].style.left = (ts.left + (ts.width - els.width) / 2) + 'px';
}

function toggle (show, force) {
	if (!_isReady) init();
	var vis = (typeof show === 'boolean' ? show : !_visible);
	if (vis === _visible && !force) return;
	_visible = vis;
	_el[0].style.opacity = +_visible;
	if (_visible) {
		_el[0].style.display = 'block';
		position();
	}
}
function show () { toggle(true); }
function hide () { toggle(false); }

function populate (data) {
	if (data) _data = data;
	var html = [];
	_data.forEach(theme => {
		html.push('<h1 class="header">' + theme.name + '</h1>');
		if (theme.icons) theme.icons.forEach(icon => html.push(tpl(icon)));
	});
	html.push('<div class="footer"></div>');
	_el.find('.icon-selector-wrapper')[0].innerHTML = html.join('');
}

function init (target) {
	if (_isReady || !target) return;
	_target = target;
	_el = $('<div class="icon-selector"><div class="icon-selector-wrapper"></div></div>')
		.appendTo(document.body);

	IconData.get().then(populate);

	_target
		.on('focus', show)
		.on('click', show)
		.on('blur', hide);
	_el.on('mousedown', onClick);
	_el.on('transitionend', () => { if (!_visible) _el[0].style.display = 'none'; });

	$.on('tile-settings/hide', hide);

	_isReady = true;
}


export default init;

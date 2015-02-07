import $ from 'util';
import Padlock from 'padlock';

var _tpl = {
	locked: require('tile/template.html'),
	unlocked: require('tile/template-unlocked.html')
};


function updateIcon (tile) {
	if (!tile.icon) return tile;
	tile.style = '';
	tile.iconEl = '';
	if (tile.icon.indexOf('fa-') === 0) {
		tile.iconEl = `<i class="fa ${tile.icon}"></i>`;
		if (tile.group) tile.style = 'padding: 2px 10px 0 7px;';
		else tile.style = '';
	}
	else {
		tile.style = `background-image: url(img/icons/${tile.icon}.png); padding-left:80px;`;
		// if (tile.group) tile.style += ''; else tile.style += '';
	}
	return tile;
}

function getTemplate () {
	var type = (Padlock.isLocked() ? 'locked' : 'unlocked'), tpl = _tpl[type];
	return (tile) => tpl(updateIcon(tile) || {});
}


export default {
	getTile: (tile) => { return $(getTemplate()(tile))[0]; },
	getTemplate
};

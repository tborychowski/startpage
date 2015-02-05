import $ from 'util';

function _run (type, action, target) {
	$.trigger(type + '-action', action, target);
}

export default {
	body: {
		handler: (action, target) => _run('group', action, target),
		items: [
			{ name: 'Add new group', action: 'addGroup' },
			{ name: 'Refresh', action: 'refresh' }
		]
	},

	tile: {
		handler: (action, target) => _run('tile', action, target),
		items: [
			{ name: 'Edit tile', action: 'edit' },
			{ name: 'Delete tile', action: 'del' }
		]
	},

	group: {
		handler: (action, target) => {
			if (action === 'addTile') _run('tile', action, target);
			else if (action === 'addGroup') _run('group', action, target.parentNode);
			else _run('group', action, target);
		},
		items: [
			{ name: 'Add new tile', action: 'addTile' },
			// '-',
			// { name: 'Group settings', action: 'edit' },
			// { name: 'Delete group', action: 'del' },
			'-',
			{ name: 'Add new group', action: 'addGroup' }

		]
	}
};

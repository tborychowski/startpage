import $ from 'util';

const _url = 'data/index.php';
var _data, _dataPromise;

function load () {
	return _dataPromise = $.ajax(_url).then((data) => _data = data);
}
/**
 * Convert format
 *    from: [ { name: '1', group: 'g1' }, { name: '2', group: 'g2' } ]
 *    to:   [ { name: 'g1', items: [ { name: '1', group: '1' }, { name: '2', group: '2' } ]} ]
 * @param  {array} data - flat array of objects
 * @return {array}      - nested array of groups
 */
function group (data) {
	var groups = {}, g;
	data.forEach((item) => {
		g = item.group || '0';
		groups[g] = groups[g] || { name: g, items: [] };
		groups[g].items.push(item);
	});
	data = [];
	$.each(groups, (g) => data.push(g));
	return data;
}

function _get (forceReload) {
	if (!forceReload && _dataPromise) return _dataPromise;
	return load();
}

function getById (id) {
	if (!_data) return null;
	for (let item of _data) if (id === item.id) return item;
	return {};
}

function save (params) {
	return $.ajax(_url, params).then((data) => {
		load();			// update cached data on  save
		return data;	// return saved object
	});
}


export default {
	group,
	get: _get,
	getById,
	save,
	del: (params) => $.ajax({ url: _url, data: params, type: 'json', method: 'DELETE' }),
	appendItem: (item) => _data.push(item)
};
